"use client"

import { createClient } from "@/utils/supabase-clients/client"
import { useQuery } from "@tanstack/react-query"
import { Check, ChevronsUpDown } from "lucide-react"
import * as React from "react"
import { UseFormReturn } from "react-hook-form"

import { Button } from "@/components/ui/button"
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
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
import { cn } from "@/lib/utils"

import { FormData } from "../"

export default function UILibrary({ form }: { form: UseFormReturn<FormData> }) {
	const [open, setOpen] = React.useState(false)
	const supabase = createClient()
	const UILibraries = useQuery({
		queryKey: ["ui_libraries"],
		queryFn: async () => await supabase.from("ui_libraries").select("*"),
	})

	return (
		<FormField
			control={form.control}
			name="ui_library"
			render={({ field }) => (
				<FormItem className="flex flex-col">
					<FormLabel>UI Library</FormLabel>
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
										? UILibraries.data?.data?.find(
												(ui_library) => ui_library.id === field.value,
										  )?.title
										: "Select a ui library"}
									<ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
								</Button>
							</FormControl>
						</PopoverTrigger>
						<PopoverContent className="w-[calc(100vw-3.5rem)] p-0 md:w-[290px] md:max-w-[29vw]">
							<Command>
								<CommandGroup>
									{UILibraries.data?.data?.map((ui_library) => (
										<CommandItem
											value={ui_library.id.toString()}
											key={ui_library.id}
											onSelect={() => {
												form.setValue(
													"ui_library",
													field.value === ui_library.id
														? undefined
														: ui_library.id,
												)
												setOpen(false)
											}}
										>
											<Check
												className={cn(
													"mr-2 h-4 w-4",
													ui_library.id === field.value
														? "opacity-100"
														: "opacity-0",
												)}
											/>
											{ui_library.title}
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
