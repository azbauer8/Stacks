"use client"

import { useMediaQuery } from "@/utils/useMediaQuery"
import { useAtom } from "jotai"

import { createStackModalOpen } from "@/lib/state"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Drawer, DrawerContent } from "@/components/ui/drawer"
import { ScrollArea } from "@/components/ui/scroll-area"

import CreateStackForm from "./CreateStackForm"

const CreateStack = () => {
  const isDesktop = useMediaQuery("(min-width: 768px)")
  const [open, setOpen] = useAtom(createStackModalOpen)
  console.log(open)

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-3xl">
          <ScrollArea className="max-h-[75vh] pb-5 pr-4">
            <CreateStackForm />
          </ScrollArea>
        </DialogContent>
      </Dialog>
    )
  }
  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerContent className="mx-2 outline-none focus:outline-none">
        <ScrollArea className="h-[65vh] px-5 pb-5">
          <CreateStackForm />
        </ScrollArea>
      </DrawerContent>
    </Drawer>
  )
}

export default CreateStack
