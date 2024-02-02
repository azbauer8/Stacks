"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { useEffect } from "react"
import BackendFramework from "./FormFields/BackendFramework"
import BasicInfo from "./FormFields/BasicInfo"
import Database from "./FormFields/Database"
import Framework from "./FormFields/Framework"
import Language from "./FormFields/Language"
import MetaFramework from "./FormFields/MetaFramework"
import { OtherLibraries } from "./FormFields/OtherLibraries"
import Styling from "./FormFields/Styling"
import UILibrary from "./FormFields/UILibrary"
import UseCase from "./FormFields/UseCase"
import { formSchema } from "./formSchema"

export type FormData = z.infer<typeof formSchema>

export default function StackForm({
	type,
	initialData,
	onSubmit,
}: {
	type: "Create" | "Edit"
	initialData?: FormData
	onSubmit: (data: FormData) => void
}) {
	const form = useForm<FormData>({
		resolver: zodResolver(formSchema),
		defaultValues: { visibility: "public" },
	})

	useEffect(() => {
		if (initialData) {
			form.reset(initialData)
		}
	}, [initialData, form.reset])

	return (
		<div className="space-y-5">
			<h1 className="text-4xl font-bold">{type} Stack</h1>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
					<BasicInfo form={form} />
					<div className="grid grid-cols-1 gap-5 md:grid-cols-3 lg:grid-cols-3 ">
						<UseCase form={form} />
						<Language form={form} />
						<Framework form={form} />
						<MetaFramework form={form} />

						<Styling form={form} />
						<UILibrary form={form} />

						<Database form={form} />
						<BackendFramework form={form} />
					</div>
					<OtherLibraries
						form={form}
						initialData={initialData?.other_libraries}
					/>
					<Button type="submit" className="w-full md:w-fit">
						{type} Stack
					</Button>
				</form>
			</Form>
		</div>
	)
}
