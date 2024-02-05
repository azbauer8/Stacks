import { GetAuthUser } from "@/utils/querySupabase"
import { PlusCircleIcon } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { buttonVariants } from "@/components/ui/button"

import Login from "./Login"
import NavMenu from "./NavMenu"

export default async function Nav() {
  const user = await GetAuthUser()

  return (
    <nav className="flex h-16 w-full justify-center border-b border-b-foreground/10">
      <div className="flex w-full max-w-4xl items-center justify-between p-3 text-sm">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-1 text-xl font-bold">
            <Image src="/favicon.png" alt="Favicon" width={32} height={32} />
            <h1>Stacks</h1>
          </Link>
        </div>
        <div className="flex items-center gap-2">
          {user ? (
            <>
              <Link
                href="/new"
                className={buttonVariants({
                  variant: "ghost",
                  size: "icon",
                })}
              >
                <PlusCircleIcon className="size-6" />
              </Link>
              <Link href={`/${user.user_metadata.preferred_username}`}>
                <Avatar className="hover:brightness-50">
                  <AvatarImage src={user.user_metadata.avatar_url} />
                  <AvatarFallback>
                    {user.user_metadata.name.match(/\b(\w)/g).join("")}
                  </AvatarFallback>
                </Avatar>
              </Link>
            </>
          ) : (
            <Login />
          )}
          <NavMenu user={user} />
        </div>
      </div>
    </nav>
  )
}
