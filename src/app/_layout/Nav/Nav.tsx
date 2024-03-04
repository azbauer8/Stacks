import { Suspense } from "react"
import { Route } from "next"
import Image from "next/image"
import NextLink from "next/link"
import { siteConfig } from "@/config"
import { getAuthUser } from "@/supabase/queries"
import { Button, NavbarBrand, NavbarContent, Skeleton } from "@nextui-org/react"
import { PlusIcon } from "lucide-react"

import { ThemeToggle } from "@/app/_layout/Nav/ThemeToggle"
import { signIn } from "@/app/auth/actions"

import NavLinks from "./NavLinks"
import NavMenu from "./NavMenu"
import NavWrapper from "./NavWrapper"
import { SignInButton } from "./SignInButton"

export default function Nav() {
  return (
    <NavWrapper>
      <NavbarContent justify="start">
        <NavbarBrand className="min-w-max grow-0">
          <NextLink className="flex items-center gap-1" href="/">
            <Image
              src={siteConfig.favicon}
              priority
              width={22}
              height={22}
              alt="Site logo"
            />
            <p className="hidden text-lg font-bold md:block">
              {siteConfig.title}
            </p>
          </NextLink>
        </NavbarBrand>
        <NavLinks />
      </NavbarContent>

      <NavbarContent justify="end">
        <Suspense fallback={<NavActionSkeleton />}>
          <NavActions />
        </Suspense>
      </NavbarContent>
    </NavWrapper>
  )
}

function NavActionSkeleton() {
  return (
    <div className="flex items-center gap-2.5">
      <Skeleton className="size-8 rounded-lg" />
      <Skeleton className="size-10 rounded-full" />
    </div>
  )
}

async function NavActions() {
  const user = await getAuthUser()
  if (user) {
    return (
      <>
        <Button
          as={NextLink}
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
