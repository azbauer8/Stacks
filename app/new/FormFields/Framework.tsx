"use client"

import * as React from "react"
import { createClient } from "@/utils/supabase/client"
import { useQuery } from "@tanstack/react-query"
import { Check, ChevronsUpDown } from "lucide-react"
import { UseFormReturn } from "react-hook-form"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "@/components/ui/command"
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

import { FormData } from "../page"

export default function Framework({ form }: { form: UseFormReturn<FormData> }) {
  const [open, setOpen] = React.useState(false)
  const supabase = createClient()
  const Frameworks = useQuery({
    queryKey: ["frameworks"],
    queryFn: async () => await supabase.from("frameworks").select("*"),
  })

  return (
    <FormField
      control={form.control}
      name="framework"
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <FormLabel>Framework</FormLabel>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant="outline"
                  role="combobox"
                  className={cn(
                    "w-[200px] justify-between",
                    !field.value && "text-muted-foreground"
                  )}
                >
                  {field.value
                    ? Frameworks.data?.data?.find(
                        (framework) => framework.id === field.value?.id
                      )?.title
                    : "Select a framework"}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
              <Command>
                <CommandGroup>
                  {Frameworks.data?.data &&
                    Frameworks.data?.data.map((framework) => (
                      <CommandItem
                        value={framework.title}
                        key={framework.id}
                        onSelect={() => {
                          form.setValue(
                            "framework",
                            field.value?.id === framework.id
                              ? undefined
                              : framework
                          )
                          setOpen(false)
                        }}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            framework.id === field.value?.id
                              ? "opacity-100"
                              : "opacity-0"
                          )}
                        />
                        {framework.title}
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
