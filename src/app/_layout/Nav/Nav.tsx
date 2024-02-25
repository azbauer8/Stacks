import { siteConfig } from "@/config"
import { NavbarBrand, NavbarContent } from "@nextui-org/react"
import Image from "next/image"
import NextLink from "next/link"
import NavWrapper from "./NavWrapper"

import { Suspense } from "react"
import NavActions from "./NavActions"

export default function Nav() {
  return (
    <NavWrapper>
      <NavbarContent as="div" justify="start">
        <NavbarBrand>
          <NextLink className="flex items-center gap-1" href="/">
            <Image
              src={siteConfig.favicon}
              priority
              width={22}
              height={22}
              alt="Site logo"
            />
            <p className="font-bold text-lg">{siteConfig.title}</p>
          </NextLink>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent justify="end">
        <Suspense fallback={<div />}>
          <NavActions />
        </Suspense>
      </NavbarContent>
    </NavWrapper>
  )
}
