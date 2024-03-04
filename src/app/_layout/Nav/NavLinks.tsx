"use client"

import { Route } from "next"
import { usePathname } from "next/navigation"
import { Button, Link, NavbarItem } from "@nextui-org/react"

type Link = {
  label: string
  href: Route
}

const links: Link[] = [
  {
    label: "Home",
    href: "/",
  },
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
            as={Link}
            href={link.href}
            variant={path === link.href ? "bordered" : "light"}
          >
            {link.label}
          </Button>
        </NavbarItem>
      ))}
    </div>
  )
}
