"use client"

import { UseFormReturn } from "react-hook-form"

import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

import { FormData } from "../"

export default function BasicInfo({ form }: { form: UseFormReturn<FormData> }) {
	return (
		<>
			<FormField
				control={form.control}
				name="visibility"
				render={({ field }) => (
					<FormItem className="space-y-3">
						<FormLabel>Visibility</FormLabel>
						<div className="flex items-center space-x-2">
							<FormControl>
								<Switch
									id="visibility"
									checked={field.value === "public"}
									onCheckedChange={(checked) => {
										form.setValue("visibility", checked ? "public" : "private")
									}}
								/>
							</FormControl>
							<Label htmlFor="visibility">
								{form.getValues("visibility") === "public"
									? "Public"
									: "Private"}
							</Label>
						</div>
						<FormMessage />
					</FormItem>
				)}
			/>
			<FormField
				control={form.control}
				name="title"
				render={({ field }) => (
					<FormItem>
						<FormLabel>Title</FormLabel>
						<FormControl>
							<Input
								placeholder="Enter a title"
								{...field}
								className="w-full flex-1"
							/>
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>
			<FormField
				control={form.control}
				name="description"
				render={({ field }) => (
					<FormItem>
						<FormLabel>Description</FormLabel>
						<FormControl>
							<Input placeholder="Enter a description" {...field} />
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>
			<FormField
				control={form.control}
				name="link"
				render={({ field }) => (
					<FormItem>
						<FormLabel>Link</FormLabel>
						<FormControl>
							<Input placeholder="Include a link" {...field} />
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>
		</>
	)
}
