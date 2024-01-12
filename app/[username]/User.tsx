import { Suspense } from "react"
import Link from "next/link"
import { notFound } from "next/navigation"
import { FindUser } from "@/utils/querySupabase"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { badgeVariants } from "@/components/ui/badge"
import StackGrid from "@/components/StackGrid"

export default async function UserPage({ username }: { username: string }) {
  const user = await FindUser(username)

  if (user) {
    return (
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <Avatar className="size-28">
            <AvatarImage
              src={user.avatar as string}
              alt={user.name as string}
            />
            <AvatarFallback>
              {user.name.match(/\b(\w)/g)?.join("")}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col gap-2.5">
            <h1 className="text-4xl font-bold">{user.name}</h1>
            <Link
              href={`https://github.com/${user.user_name}`}
              className={`${badgeVariants({
                variant: "default",
              })} w-fit items-center text-[13px]`}
            >
              <h2>@{user.user_name}</h2>
            </Link>
          </div>
        </div>
        <Suspense fallback={<p>Loading...</p>}>
          <StackGrid user={user.id} />
        </Suspense>
      </div>
    )
  } else {
    return notFound()
  }
}
