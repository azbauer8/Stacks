"use client"

import * as React from "react"
import { createClient } from "@/utils/supabase/client"
import { useQuery } from "@tanstack/react-query"
import { Check, ChevronsUpDown } from "lucide-react"
import { UseFormReturn } from "react-hook-form"

import { cn } from "@/lib/utils"
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

import { FormData } from "../page"

export default function Styling({ form }: { form: UseFormReturn<FormData> }) {
  const [open, setOpen] = React.useState(false)
  const supabase = createClient()
  const Stylings = useQuery({
    queryKey: ["stylings"],
    queryFn: async () => await supabase.from("stylings").select("*"),
  })

  return (
    <FormField
      control={form.control}
      name="styling"
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <FormLabel>Styling</FormLabel>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant="outline"
                  role="combobox"
                  className={cn(
                    "w-[220px] justify-between",
                    !field.value && "text-muted-foreground"
                  )}
                >
                  {field.value
                    ? Stylings.data?.data?.find(
                        (styling) => styling.id === field.value?.id
                      )?.title
                    : "Select a styling library"}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-[220px] p-0">
              <Command>
                <CommandGroup>
                  {Stylings.data?.data &&
                    Stylings.data?.data.map((styling) => (
                      <CommandItem
                        value={styling.title}
                        key={styling.id}
                        onSelect={() => {
                          form.setValue(
                            "styling",
                            field.value?.id === styling.id ? undefined : styling
                          )
                          setOpen(false)
                        }}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            styling.id === field.value?.id
                              ? "opacity-100"
                              : "opacity-0"
                          )}
                        />
                        {styling.title}
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
