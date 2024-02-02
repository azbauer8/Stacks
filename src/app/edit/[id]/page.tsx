"use client"

import { createClient } from "@/utils/supabase/client"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { notFound, useRouter } from "next/navigation"

import StackForm from "@/components/StackForm"
import { FormData } from "@/components/StackForm"
import { useEffect } from "react"

export default function EditStack({
	params: { id },
}: {
	params: { id: string }
}) {
	const router = useRouter()
	const supabase = createClient()
	const queryClient = useQueryClient()

	const stack = useQuery({
		queryKey: [id, "stack"],
		queryFn: async () => await supabase.from("stacks").select("*").eq("id", id),
	})

	const stackOtherLibraries = useQuery({
		queryKey: [id, "otherLibraries"],
		queryFn: async () =>
			await supabase
				.from("stack_other_libraries")
				.select("*")
				.eq("stack_id", id),
	})

	// biome-ignore lint/correctness/useExhaustiveDependencies: it works
	useEffect(() => {
		if (stack.isSuccess && !stack.data.data?.length) {
			return notFound()
		}
		if (stack.isSuccess) {
			console.log(stack.data.data?.[0])
		}
	}, [stack.isSuccess])

	function onSubmit(values: FormData) {
		createEditRequest.mutate(values)
	}

	const createEditRequest = useMutation({
		mutationFn: async (data: FormData) => {
			const { other_libraries, ...submitData } = data
			await supabase.from("stacks").update(submitData).eq("id", id)
			const stack_other_libraries = await supabase
				.from("stack_other_libraries")
				.select("*")
				.eq("stack_id", id)

			if (other_libraries) {
				const other_libraries_to_remove = stack_other_libraries?.data
					?.filter(
						({ other_library_id }) =>
							!other_libraries.includes(other_library_id),
					)
					.map(({ other_library_id }) => other_library_id)
				if (other_libraries_to_remove && other_libraries_to_remove.length > 0) {
					other_libraries_to_remove.forEach(async (library) => {
						await supabase
							.from("stack_other_libraries")
							.delete()
							.eq("stack_id", id)
							.eq("other_library_id", library)
							.select("*")
					})
				}
				const other_libraries_to_add = other_libraries.filter(
					(library) =>
						!stack_other_libraries?.data?.some(
							({ other_library_id }) => other_library_id === library,
						),
				)
				if (other_libraries_to_add && other_libraries_to_add.length > 0) {
					other_libraries_to_add.forEach(async (library) => {
						await supabase.from("stack_other_libraries").insert({
							stack_id: parseInt(id),
							other_library_id: library,
						})
					})
				}
			}
		},
	})

	if (createEditRequest.isSuccess) {
		queryClient.invalidateQueries({ queryKey: [id, "stack"] })
		router.push(`/stack/${id}`)
		router.refresh()
	}

	if (stack?.data?.data && stackOtherLibraries?.data?.data) {
		const other_libraries = stackOtherLibraries.data.data.map(
			({ other_library_id }) => other_library_id,
		)
		const stackData = stack.data.data[0]
		replaceNullWithUndefined(stackData)
		const initialData = {
			...stackData,
			other_libraries,
		}
		return (
			<StackForm
				type="Edit"
				initialData={initialData as FormData}
				onSubmit={onSubmit}
			/>
		)
	}
}

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
function replaceNullWithUndefined(obj: any): void {
	for (const key in obj) {
		// biome-ignore lint/suspicious/noPrototypeBuiltins: <explanation>
		if (obj.hasOwnProperty(key)) {
			if (obj[key] === null) {
				obj[key] = undefined
			} else if (typeof obj[key] === "object") {
				replaceNullWithUndefined(obj[key])
			}
		}
	}
}
