"use client"

import { createClient } from "@/utils/supabase-clients/client"
import { useQuery } from "@tanstack/react-query"
import { Check, ChevronsUpDown } from "lucide-react"
import * as React from "react"
import { UseFormReturn } from "react-hook-form"

import { Button } from "@/components/ui/button"
import { Command, CommandGroup, CommandItem } from "@/components/ui/command"
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"

import { FormData } from "../"

export default function MetaFramework({
  form,
}: {
  form: UseFormReturn<FormData>
}) {
  const [open, setOpen] = React.useState(false)
  const supabase = createClient()
  const MetaFrameworks = useQuery({
    queryKey: ["meta_frameworks"],
    queryFn: async () => await supabase.from("meta_frameworks").select("*"),
  })

  return (
    <FormField
      control={form.control}
      name="meta_framework"
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <FormLabel>Meta Framework</FormLabel>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant="outline"
                  role="combobox"
                  className={cn(
                    "w-full justify-between",
                    !field.value && "text-muted-foreground",
                  )}
                >
                  {field.value
                    ? MetaFrameworks.data?.data?.find(
                        (meta_framework) => meta_framework.id === field.value,
                      )?.title
                    : "Select a meta framework"}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-[calc(100vw-3.5rem)] p-0 md:w-[290px] md:max-w-[29vw]">
              <Command>
                <CommandGroup>
                  {MetaFrameworks.data?.data?.map((meta_framework) => (
                    <CommandItem
                      value={meta_framework.id.toString()}
                      key={meta_framework.id}
                      onSelect={() => {
                        form.setValue(
                          "meta_framework",
                          field.value === meta_framework.id
                            ? undefined
                            : meta_framework.id,
                        )
                        setOpen(false)
                      }}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          meta_framework.id === field.value
                            ? "opacity-100"
                            : "opacity-0",
                        )}
                      />
                      {meta_framework.title}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </Command>
            </PopoverContent>
          </Popover>

          <FormMessage />
        </FormItem>
      )}
    />
  )
}
