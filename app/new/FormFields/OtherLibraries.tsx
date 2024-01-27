"use client"

import { createClient } from "@/utils/supabase/client"
import { useQuery } from "@tanstack/react-query"
import { Command as CommandPrimitive } from "cmdk"
import { X } from "lucide-react"
import * as React from "react"
import { UseFormReturn } from "react-hook-form"

import { Badge } from "@/components/ui/badge"
import { Command, CommandGroup, CommandItem } from "@/components/ui/command"
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form"
import { Tables } from "@/types/supabase"

import { FormData } from "../page"

export function OtherLibraries({ form }: { form: UseFormReturn<FormData> }) {
	const inputRef = React.useRef<HTMLInputElement>(null)
	const [open, setOpen] = React.useState(false)
	const [selected, setSelected] = React.useState<Tables<"other_libraries">[]>(
		[],
	)
	const [inputValue, setInputValue] = React.useState("")

	const supabase = createClient()
	const OtherLibraries = useQuery({
		queryKey: ["other_libraries"],
		queryFn: async () =>
			await supabase
				.from("other_libraries")
				.select("*, other_library_category(*)"),
	})

	const handleUnselect = React.useCallback(
		(library: Tables<"other_libraries">) => {
			setSelected((prev) => prev.filter((s) => s.id !== library.id))
		},
		[],
	)

	const handleKeyDown = React.useCallback(
		(e: React.KeyboardEvent<HTMLDivElement>) => {
			const input = inputRef.current
			if (input) {
				if (e.key === "Delete" || e.key === "Backspace") {
					if (input.value === "") {
						setSelected((prev) => {
							const newSelected = [...prev]
							newSelected.pop()
							return newSelected
						})
					}
				}
				// This is not a default behaviour of the <input /> field
				if (e.key === "Escape") {
					input.blur()
				}
			}
		},
		[],
	)

	React.useEffect(() => {
		form.setValue(
			"other_libraries",
			selected.map((s) => s.id),
		)
	}, [form, selected])

	const selectables: Tables<"other_libraries">[] | undefined =
		OtherLibraries.data?.data?.filter((library) => !selected.includes(library))

	return (
		<FormField
			control={form.control}
			name="other_libraries"
			render={() => (
				<FormItem>
					<FormLabel>Other Libraries</FormLabel>
					<Command
						onKeyDown={handleKeyDown}
						className="overflow-visible bg-transparent"
					>
						<FormControl>
							<div className="group rounded-md border border-input px-3 py-2 text-sm ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
								<div className="flex flex-wrap gap-1">
									{selected.map((library) => {
										return (
											<Badge key={library.id} variant="outline">
												{library.title}
												<button
													type="button"
													className="ml-1 rounded-full outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2"
													onKeyDown={(e) => {
														if (e.key === "Enter") {
															handleUnselect(library)
														}
													}}
													onMouseDown={(e) => {
														e.preventDefault()
														e.stopPropagation()
													}}
													onClick={() => handleUnselect(library)}
												>
													<X className="h-3 w-3 text-foreground hover:text-muted-foreground" />
												</button>
											</Badge>
										)
									})}
									{/* Avoid having the "Search" Icon */}
									<CommandPrimitive.Input
										ref={inputRef}
										value={inputValue}
										onValueChange={setInputValue}
										onBlur={() => setOpen(false)}
										onFocus={() => setOpen(true)}
										placeholder={
											selected.length ? undefined : "Select libraries"
										}
										className="ml-2 flex-1 bg-transparent outline-none placeholder:text-muted-foreground"
									/>
								</div>
							</div>
						</FormControl>
						<div className="relative mt-2">
							{open && selectables && selectables.length > 0 ? (
								<div className="absolute top-0 z-10 w-full rounded-md border bg-popover text-popover-foreground shadow-md outline-none animate-in">
									<CommandGroup className="max-h-72 overflow-auto">
										{selectables.map((library) => {
											return (
												<CommandItem
													key={library.id}
													onMouseDown={(e) => {
														e.preventDefault()
														e.stopPropagation()
													}}
													onSelect={() => {
														setInputValue("")
														setSelected((prev) => [...prev, library])
													}}
													className={"cursor-pointer"}
												>
													{library.title}
												</CommandItem>
											)
										})}
									</CommandGroup>
								</div>
							) : null}
						</div>
					</Command>
					<FormMessage />
				</FormItem>
			)}
		/>
	)
}
