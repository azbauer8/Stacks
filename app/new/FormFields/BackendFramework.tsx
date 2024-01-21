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

export default function BackendFramework({
  form,
}: {
  form: UseFormReturn<FormData>
}) {
  const [open, setOpen] = React.useState(false)
  const supabase = createClient()
  const BackendFrameworks = useQuery({
    queryKey: ["backend_frameworks"],
    queryFn: async () => await supabase.from("backend_frameworks").select("*"),
  })

  return (
    <FormField
      control={form.control}
      name="backend_framework"
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <FormLabel>Backend Framework</FormLabel>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant="outline"
                  role="combobox"
                  className={cn(
                    "w-[250px] justify-between",
                    !field.value && "text-muted-foreground"
                  )}
                >
                  {field.value
                    ? BackendFrameworks.data?.data?.find(
                        (backend_framework) =>
                          backend_framework.id === field.value?.id
                      )?.title
                    : "Select a backend framework"}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-[250px] p-0">
              <Command>
                <CommandGroup>
                  {BackendFrameworks.data?.data &&
                    BackendFrameworks.data?.data.map((backend_framework) => (
                      <CommandItem
                        value={backend_framework.title}
                        key={backend_framework.id}
                        onSelect={() => {
                          form.setValue(
                            "backend_framework",
                            field.value?.id === backend_framework.id
                              ? undefined
                              : backend_framework
                          )
                          setOpen(false)
                        }}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            backend_framework.id === field.value?.id
                              ? "opacity-100"
                              : "opacity-0"
                          )}
                        />
                        {backend_framework.title}
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
