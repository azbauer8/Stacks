"use client"

import { useEffect, useState } from "react"
import { usePathname, useRouter } from "next/navigation"
import { useMediaQuery } from "@/utils/useMediaQuery"

import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Drawer, DrawerContent } from "@/components/ui/drawer"
import { ScrollArea } from "@/components/ui/scroll-area"

const StackModalWrapper = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter()
  const pathname = usePathname()
  const isDesktop = useMediaQuery("(min-width: 768px)")
  const [isOpen, setIsOpen] = useState(false)

  const handleOpenChange = (open: boolean) => {
    if (pathname.includes("/stack/")) {
      setIsOpen(true)
    }
    if (!open && pathname.includes("/stack/")) {
      router.back()
    }
  }
  useEffect(() => {
    if (!pathname.includes("/stack/")) {
      setIsOpen(false)
    } else {
      setIsOpen(true)
    }
  }, [pathname])

  if (isDesktop) {
    return (
      <Dialog open={isOpen} onOpenChange={handleOpenChange}>
        <DialogContent className="max-w-3xl">
          <ScrollArea className="max-h-[75vh] pb-5 pr-4">{children}</ScrollArea>
        </DialogContent>
      </Dialog>
    )
  }
  return (
    <Drawer open={isOpen} onOpenChange={handleOpenChange}>
      <DrawerContent className="mx-2 outline-none focus:outline-none">
        <ScrollArea className="h-[65vh] px-5 pb-5">{children}</ScrollArea>
      </DrawerContent>
    </Drawer>
  )
}

export default StackModalWrapper
