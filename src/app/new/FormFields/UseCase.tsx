"use client"

import { createClient } from "@/utils/supabase/client"
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

import { FormData } from "../page"

export default function UseCase({ form }: { form: UseFormReturn<FormData> }) {
	const [open, setOpen] = React.useState(false)
	const supabase = createClient()
	const useCases = useQuery({
		queryKey: ["useCases"],
		queryFn: async () => await supabase.from("use_cases").select("*"),
	})

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
										"w-full justify-between",
										!field.value && "text-muted-foreground",
									)}
								>
									{field.value
										? useCases.data?.data?.find(
												(use_case) => use_case.id === field.value,
										  )?.title
										: "Select a use case"}
									<ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
								</Button>
							</FormControl>
						</PopoverTrigger>
						<PopoverContent className="w-[calc(100vw-3.5rem)] p-0 md:w-[290px] md:max-w-[29vw]">
							<Command>
								<CommandGroup>
									{useCases.data?.data?.map((use_case) => (
										<CommandItem
											value={use_case.id.toString()}
											key={use_case.id}
											onSelect={() => {
												form.setValue(
													"use_case",
													field.value === use_case.id ? undefined : use_case.id,
												)
												setOpen(false)
											}}
										>
											<Check
												className={cn(
													"mr-2 h-4 w-4",
													use_case.id === field.value
														? "opacity-100"
														: "opacity-0",
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
