"use client"

import { useRouter } from "next/navigation"

import { Dialog, DialogContent } from "@/components/ui/dialog"

const StackModalWrapper = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter()

  const handleOnOpenChange = (open: boolean) => {
    if (!open) {
      router.back()
    }
  }

  return (
    <Dialog open onOpenChange={handleOnOpenChange}>
      <DialogContent>{children}</DialogContent>
    </Dialog>
  )
}

export default StackModalWrapper
