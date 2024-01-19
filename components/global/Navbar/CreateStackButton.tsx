"use client"

import { useAtom } from "jotai"
import { PlusCircleIcon } from "lucide-react"

import { createStackModalOpen } from "@/lib/state"
import { buttonVariants } from "@/components/ui/button"

export default function CreateStackButton() {
  const [open, setOpen] = useAtom(createStackModalOpen)
  return (
    <div
      className={buttonVariants({
        variant: "ghost",
        size: "icon",
      })}
      onClick={() => setOpen(true)}
    >
      <PlusCircleIcon className="size-6" />
    </div>
  )
}
