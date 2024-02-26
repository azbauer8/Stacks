"use client"

import { Route } from "next"
import { useRouter } from "next/navigation"
import { createClient } from "@/utils/supabase-clients/client"
import {
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@nextui-org/react"

export default function DeleteStack({
  user,
  stackId,
}: {
  user: string
  stackId: number
}) {
  const router = useRouter()
  const supabase = createClient()

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
            <Button
              size="sm"
              variant="ghost"
              color="danger"
              className="ml-auto w-fit font-medium"
              onClick={async () => {
                const { error } = await supabase
                  .from("stacks")
                  .delete()
                  .eq("id", stackId)
                if (!error) {
                  router.push(`/${user}` as Route)
                  router.refresh()
                }
              }}
            >
              Delete Stack
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
