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
                    "w-[200px] justify-between",
                    !field.value && "text-muted-foreground"
                  )}
                >
                  {field.value
                    ? Languages.data?.data?.find(
                        (language) => language.id === field.value?.id
                      )?.title
                    : "Select a language"}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
              <Command>
                <CommandGroup>
                  {Languages.data?.data &&
                    Languages.data?.data.map((language) => (
                      <CommandItem
                        value={language.title}
                        key={language.id}
                        onSelect={() => {
                          form.setValue(
                            "language",
                            field.value?.id === language.id
                              ? undefined
                              : language
                          )
                          setOpen(false)
                        }}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            language.id === field.value?.id
                              ? "opacity-100"
                              : "opacity-0"
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
