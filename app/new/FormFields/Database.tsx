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

export default function Database({ form }: { form: UseFormReturn<FormData> }) {
  const [open, setOpen] = React.useState(false)
  const supabase = createClient()
  const Databases = useQuery({
    queryKey: ["databases"],
    queryFn: async () => await supabase.from("databases").select("*"),
  })

  return (
    <FormField
      control={form.control}
      name="database"
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <FormLabel>Database</FormLabel>
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
                    ? Databases.data?.data?.find(
                        (database) => database.id === field.value?.id
                      )?.title
                    : "Select a database"}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
              <Command>
                <CommandGroup>
                  {Databases.data?.data &&
                    Databases.data?.data.map((database) => (
                      <CommandItem
                        value={database.title}
                        key={database.id}
                        onSelect={() => {
                          form.setValue(
                            "database",
                            field.value?.id === database.id
                              ? undefined
                              : database
                          )
                          setOpen(false)
                        }}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            database.id === field.value?.id
                              ? "opacity-100"
                              : "opacity-0"
                          )}
                        />
                        {database.title}
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
