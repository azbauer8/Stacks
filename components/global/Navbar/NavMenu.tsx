import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { createServerActionClient } from "@supabase/auth-helpers-nextjs"
import { User } from "@supabase/supabase-js"
import { MoreVerticalIcon } from "lucide-react"

import { Database } from "@/types/supabase"
import { UnstyledButton } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { ThemeToggle } from "./ThemeToggle"

export default function NavMenu({ user }: { user: User | null }) {
  const signOut = async () => {
    "use server"

    const cookieStore = cookies()
    const supabase = createServerActionClient<Database>({
      cookies: () => cookieStore,
    })
    await supabase.auth.signOut()
    return redirect("/")
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="w-fit rounded-md px-1 py-2 hover:bg-accent hover:text-accent-foreground">
        <MoreVerticalIcon className="size-[1.3rem]" />
        <span className="sr-only">Toggle theme</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <ThemeToggle />
        {user && (
          <>
            <DropdownMenuItem className="mx-0" action>
              <form action={signOut} className="mx-0 w-full">
                <UnstyledButton className="w-full">Sign Out</UnstyledButton>
              </form>
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
