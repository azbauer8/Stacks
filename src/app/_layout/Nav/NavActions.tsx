import { Route } from "next"
import Link from "next/link"
import { GetAuthUser } from "@/utils/querySupabase"
import { Button } from "@nextui-org/react"
import { PlusIcon } from "lucide-react"

import { ThemeToggle } from "@/app/_layout/Nav/ThemeToggle"
import { signIn } from "@/app/auth/actions"

import NavMenu from "./NavMenu"
import { SignInButton } from "./SignInButton"

export default async function NavActions() {
  const user = await GetAuthUser()
  if (user) {
    return (
      <>
        <Button
          as={Link}
          isIconOnly
          size="sm"
          variant="ghost"
          aria-label="Theme toggle placeholder"
          href={"/new" as Route}
        >
          <PlusIcon className="size-[1.2rem]" />
        </Button>
        <NavMenu user={user} />
      </>
    )
  }
  return (
    <div className="flex items-center gap-2">
      <form action={signIn}>
        <SignInButton />
      </form>
      <ThemeToggle />
    </div>
  )
}
