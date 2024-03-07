"use client"

import { Route } from "next"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button, NavbarItem } from "@nextui-org/react"

type Link = {
  label: string
  href: Route
}

const links: Link[] = [
  {
    label: "Guide",
    href: "/guide",
  },
]

export default function NavLinks() {
  const path = usePathname()
  return (
    <div className="flex items-center gap-1.5">
      {links.map((link) => (
        <NavbarItem as="div" key={link.label}>
          <Button
            href={link.href}
            as={Link}
            variant={path === link.href ? "bordered" : "light"}
            disableRipple
          >
            {link.label}
          </Button>
        </NavbarItem>
      ))}
    </div>
  )
}
