"use client"

import { useState } from "react"
import Link from "next/link"
import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  User,
} from "@nextui-org/react"
import { User as AuthUser } from "@supabase/supabase-js"
import { MoonIcon, SunIcon, SunMoonIcon } from "lucide-react"
import { useTheme } from "next-themes"

import { signOut } from "@/app/auth/actions"

export default function NavMenu({ user }: { user: AuthUser }) {
  const { theme, setTheme } = useTheme()
  const [isOpen, setOpen] = useState(false)

  function toggleTheme() {
    if (theme === "system") {
      setTheme("light")
    } else if (theme === "light") {
      setTheme("dark")
    } else {
      setTheme("system")
    }
  }

  const icon =
    theme === "system" ? (
      <SunMoonIcon className="size-[1.2rem]" />
    ) : theme === "light" ? (
      <SunIcon className="size-[1.2rem]" />
    ) : (
      <MoonIcon className="size-[1.2rem]" />
    )

  const text =
    theme === "system" ? "System" : theme === "light" ? "Light" : "Dark"

  return (
    <Dropdown
      radius="sm"
      classNames={{
        base: "before:bg-default-200",
        content: "p-0 border-small border-divider bg-background",
      }}
      isOpen={isOpen}
      onOpenChange={setOpen}
      closeOnSelect={false}
    >
      <DropdownTrigger>
        <Avatar
          className="cursor-pointer hover:brightness-90"
          src={user.user_metadata.avatar_url}
          showFallback
        />
      </DropdownTrigger>
      <DropdownMenu
        aria-label="Custom item styles"
        className="p-3"
        itemClasses={{
          base: [
            "rounded-md",
            "text-default-500",
            "transition-opacity",
            "data-[hover=true]:text-foreground",
            "data-[hover=true]:bg-default-100",
            "dark:data-[hover=true]:bg-default-50",
            "data-[selectable=true]:focus:bg-default-50",
            "data-[pressed=true]:opacity-70",
            "data-[focus-visible=true]:ring-default-500",
          ],
        }}
      >
        <DropdownItem
          key="profile"
          textValue={user.user_metadata.user_name}
          as={Link}
          href={`/user/${user.user_metadata.preferred_username}`}
        >
          <User
            name={user.user_metadata.full_name}
            description={`@${user.user_metadata.user_name}`}
            classNames={{
              name: "text-default-600",
              description: "text-default-500",
            }}
            avatarProps={{
              className: "hidden",
            }}
          />
        </DropdownItem>
        <DropdownItem
          key="theme"
          textValue="Theme"
          onPress={toggleTheme}
          startContent={icon}
        >
          {text}
        </DropdownItem>
        <DropdownItem
          key="signout"
          textValue="Sign Out"
          onPress={async () => await signOut()}
        >
          Sign Out
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  )
}
