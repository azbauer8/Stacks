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

import { FormData } from "../"

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
										"w-full justify-between",
										!field.value && "text-muted-foreground",
									)}
								>
									{field.value
										? Databases.data?.data?.find(
												(database) => database.id === field.value,
										  )?.title
										: "Select a database"}
									<ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
								</Button>
							</FormControl>
						</PopoverTrigger>
						<PopoverContent className="w-[calc(100vw-3.5rem)] p-0 md:w-[290px] md:max-w-[29vw]">
							<Command>
								<CommandGroup>
									{Databases.data?.data?.map((database) => (
										<CommandItem
											value={database.id.toString()}
											key={database.id}
											onSelect={() => {
												form.setValue(
													"database",
													field.value === database.id ? undefined : database.id,
												)
												setOpen(false)
											}}
										>
											<Check
												className={cn(
													"mr-2 h-4 w-4",
													database.id === field.value
														? "opacity-100"
														: "opacity-0",
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