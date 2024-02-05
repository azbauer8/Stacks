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

export default function Language({ form }: { form: UseFormReturn<FormData> }) {
  const [open, setOpen] = React.useState(false)
  const supabase = createClient()
  const Languages = useQuery({
    queryKey: ["languages"],
    queryFn: async () => await supabase.from("languages").select("*"),
  })

  return (
    <FormField
      control={form.control}
      name="language"
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <FormLabel>Language</FormLabel>
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
                    ? Languages.data?.data?.find(
                        (language) => language.id === field.value,
                      )?.title
                    : "Select a language"}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-[calc(100vw-3.5rem)] p-0 md:w-[290px] md:max-w-[29vw]">
              <Command>
                <CommandGroup>
                  {Languages.data?.data?.map((language) => (
                    <CommandItem
                      value={language.id.toString()}
                      key={language.id}
                      onSelect={() => {
                        form.setValue(
                          "language",
                          field.value === language.id ? undefined : language.id,
                        )
                        setOpen(false)
                      }}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          language.id === field.value
                            ? "opacity-100"
                            : "opacity-0",
                        )}
                      />
                      {language.title}
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
