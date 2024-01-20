"use client"

import * as React from "react"
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

// TODO: fetch these from database instead
// Also figure out how to use supabase types for validation instead of having to manually define them
const use_cases = [
  { title: "Blog", id: 1 },
  { title: "Dashboard", id: 2 },
  { title: "Portfolio", id: 3 },
  { title: "Personal", id: 4 },
  { title: "E-Commerce", id: 5 },
  { title: "Documentation", id: 6 },
  { title: "Business", id: 7 },
  { title: "Other", id: 8 },
] as const

export default function UseCases({ form }: { form: UseFormReturn<FormData> }) {
  const [open, setOpen] = React.useState(false)

  return (
    <FormField
      control={form.control}
      name="use_case"
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <FormLabel>Use Case</FormLabel>
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
                    ? use_cases.find(
                        (use_case) => use_case.id === field.value?.id
                      )?.title
                    : "Select a use case"}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
              <Command>
                <CommandEmpty>No use cases found.</CommandEmpty>
                <CommandGroup>
                  {use_cases.map((use_case) => (
                    <CommandItem
                      value={use_case.title}
                      key={use_case.id}
                      onSelect={() => {
                        form.setValue(
                          "use_case",
                          field.value?.id === use_case.id ? undefined : use_case
                        )
                        setOpen(false)
                      }}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          use_case.id === field.value?.id
                            ? "opacity-100"
                            : "opacity-0"
                        )}
                      />
                      {use_case.title}
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
