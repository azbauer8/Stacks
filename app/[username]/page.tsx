import Link from "next/link"
import { notFound } from "next/navigation"
import { FindUser, GetAuthUser } from "@/utils/querySupabase"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { badgeVariants } from "@/components/ui/badge"
import StackGridLoader from "@/components/StackGrid/StackGridLoader"

export default async function UserPageLayout({
  params,
}: {
  params: { username: string }
}) {
  const username = params.username
  const user = await FindUser({ clientType: "server", username })
  const authUser = await GetAuthUser({ clientType: "server" })

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
        <StackGridLoader user={user.id} personal={user.id === authUser?.id} />
      </div>
    )
  } else {
    return notFound()
  }
}
