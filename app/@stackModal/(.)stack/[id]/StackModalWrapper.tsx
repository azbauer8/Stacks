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
  const [open, setOpen] = useState(true)

  const handleOnOpenChange = (open: boolean) => {
    setOpen(!open)
    if (!open) {
      router.back()
    }
  }

  useEffect(() => {
    if (!pathname.includes("/stack/")) {
      setOpen(false)
    } else {
      setOpen(true)
    }
  }, [pathname])

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={handleOnOpenChange}>
        <DialogContent className="max-w-3xl">
          <ScrollArea className="h-[65vh] pb-5 pr-4">{children}</ScrollArea>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Drawer open onOpenChange={handleOnOpenChange}>
      <DrawerContent>
        <ScrollArea className="h-[65vh] pb-5">{children}</ScrollArea>
      </DrawerContent>
    </Drawer>
  )
}

export default StackModalWrapper
