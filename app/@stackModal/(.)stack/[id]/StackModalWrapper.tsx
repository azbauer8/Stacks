"use client"

import { useRouter } from "next/navigation"
import { useMediaQuery } from "@/utils/useMediaQuery"

import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Drawer, DrawerContent } from "@/components/ui/drawer"

const StackModalWrapper = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter()
  const isDesktop = useMediaQuery("(min-width: 768px)")

  const handleOnOpenChange = (open: boolean) => {
    if (!open) {
      router.back()
    }
  }

  if (isDesktop) {
    return (
      <Dialog open onOpenChange={handleOnOpenChange}>
        <DialogContent>{children}</DialogContent>
      </Dialog>
    )
  }

  return (
    <Drawer open onOpenChange={handleOnOpenChange}>
      <DrawerContent>{children}</DrawerContent>
    </Drawer>
  )
}

export default StackModalWrapper
