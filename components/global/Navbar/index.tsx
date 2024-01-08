import { cookies } from "next/headers"
import Link from "next/link"
import { createClient } from "@/utils/supabase/server"

import { Button } from "@/components/ui/button"

import LoginButton from "./LoginButton"
import ProfileMenu from "./ProfileMenu"
import { ThemeToggle } from "./ThemeToggle"

export default async function Nav() {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  const {
    data: { user },
  } = await supabase.auth.getUser()

  return (
    <nav className="flex h-16 w-full justify-center border-b border-b-foreground/10">
      <div className="flex w-full max-w-4xl items-center justify-between p-3 text-sm">
        <div className="flex items-center gap-2">
          <Link href="/" className="text-xl font-bold">
            📚 Stacks
          </Link>
          <Button variant={"link"}>
            <Link href="/stacks">Public</Link>
          </Button>
        </div>
        {user ? (
          <ProfileMenu user={user} />
        ) : (
          <div className="flex items-center gap-1.5">
            <ThemeToggle />
            <LoginButton />
          </div>
        )}
      </div>
    </nav>
  )
}
