"use client"

import { deleteStack } from "@/supabase/actions"
import {
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@nextui-org/react"
import { useFormStatus } from "react-dom"

export default function DeleteStack({
  user,
  stackId,
}: {
  user: string
  stackId: number
}) {
  return (
    <Popover placement="bottom-end">
      <PopoverTrigger>
        <Button
          size="sm"
          variant="ghost"
          color="danger"
          className="font-medium"
        >
          Delete
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <div className="w-full px-1 py-2">
          <p className="text-small font-bold text-foreground">Are you sure?</p>
          <div className="mt-2 flex w-full flex-col gap-2">
            This action cannot be undone.
            <form
              action={async () => await deleteStack(stackId, user)}
              className="ml-auto"
            >
              <DeleteButton />
            </form>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}

function DeleteButton() {
  const { pending } = useFormStatus()

  return (
    <Button
      type="submit"
      isLoading={pending}
      size="sm"
      variant="ghost"
      color="danger"
      className=" w-fit font-medium"
    >
      Delete Stack
    </Button>
  )
}
