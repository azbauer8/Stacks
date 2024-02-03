"use client"

import StackForm from "@/components/StackForm"
import { FormData } from "@/components/StackForm"
import { createClient } from "@/utils/supabase/client"
import { useMutation } from "@tanstack/react-query"
import { useRouter } from "next/navigation"

export default function NewStack({ user }: { user: string }) {
	const router = useRouter()
	const supabase = createClient()

	function onSubmit(values: FormData) {
		const preSubmitData = {
			...values,
			user: user,
		}
		createPostRequest.mutate(preSubmitData)
	}

	const createPostRequest = useMutation({
		mutationFn: async (
			newStackData: FormData & {
				user: string
			},
		) => {
			const { other_libraries, ...submitData } = newStackData
			const newStack = await supabase.from("stacks").insert(submitData).select()
			if (newStack.data && other_libraries) {
				await supabase.from("stack_other_libraries").insert(
					other_libraries.map((other_library) => ({
						stack_id: newStack.data[0].id,
						other_library_id: other_library,
					})),
				)

				return newStack
			}
		},
	})

	createPostRequest.isError && console.log(createPostRequest.error)

	if (createPostRequest.isSuccess && createPostRequest.data) {
		router.push(`/stack/${createPostRequest.data?.data[0].id}`)
	}

	return <StackForm type="Create" onSubmit={onSubmit} />
}
