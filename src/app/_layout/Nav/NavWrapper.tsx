"use client"

import { Navbar as NextUINavbar } from "@nextui-org/react"

import { useWindowScroll } from "@uidotdev/usehooks"

export default function NavWrapper({
  children,
}: { children: React.ReactNode }) {
  const [{ y }] = useWindowScroll()
  return (
    <NextUINavbar
      maxWidth="xl"
      position="sticky"
      isBlurred={true}
      classNames={{
        base: "bg-transparent",
        wrapper: `transition-all ease-in-out duration-300 rounded-3xl bg-transparent ${
          y &&
          y > 50 &&
          "mt-1 mx-2.5 bg-default/40 dark:bg-default/20 backdrop-blur-2xl shadow-lg"
        }`,
      }}
    >
      {children}
    </NextUINavbar>
  )
}
