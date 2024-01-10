"use client"

import { useRouter } from "next/navigation"
import { User } from "@supabase/supabase-js"

import { Tables } from "@/types/supabase"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import GlobalStack from "@/components/StackPage/GlobalStackPage"
import PersonalStack from "@/components/StackPage/PersonalStackPage"

const StackModal = ({
  stack,
  authUser,
}: {
  stack: Tables<"stacks">
  authUser: User | null
}) => {
  const router = useRouter()

  const handleOnOpenChange = (open: boolean) => {
    if (!open) {
      router.back()
    }
  }

  return (
    <Dialog open onOpenChange={handleOnOpenChange}>
      <DialogContent>
        {authUser && authUser.id === stack.user_id ? (
          <PersonalStack stack={stack} />
        ) : (
          <GlobalStack stack={stack} />
        )}
      </DialogContent>
    </Dialog>
  )
}

export default StackModal
