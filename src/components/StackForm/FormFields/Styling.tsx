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
										"w-full justify-between",
										!field.value && "text-muted-foreground",
									)}
								>
									{field.value
										? Stylings.data?.data?.find(
												(styling) => styling.id === field.value,
										  )?.title
										: "Select a styling library"}
									<ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
								</Button>
							</FormControl>
						</PopoverTrigger>
						<PopoverContent className="w-[calc(100vw-3.5rem)] p-0 md:w-[290px] md:max-w-[29vw]">
							<Command>
								<CommandGroup>
									{Stylings.data?.data?.map((styling) => (
										<CommandItem
											value={styling.id.toString()}
											key={styling.id}
											onSelect={() => {
												form.setValue(
													"styling",
													field.value === styling.id ? undefined : styling.id,
												)
												setOpen(false)
											}}
										>
											<Check
												className={cn(
													"mr-2 h-4 w-4",
													styling.id === field.value
														? "opacity-100"
														: "opacity-0",
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
