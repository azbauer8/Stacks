"use client"

import StackForm from "@/components/StackForm"
import { FormData } from "@/components/StackForm"
import { createClient } from "@/utils/supabase/client"
import { useMutation, useQuery } from "@tanstack/react-query"
import { useRouter } from "next/navigation"

export default function NewStack() {
	const router = useRouter()
	const supabase = createClient()
	const authUser = useQuery({
		queryKey: ["authUser"],
		queryFn: async () => await supabase.auth.getUser(),
	})

	if (authUser.data?.error) {
		return <div>You must be signed in to create a stack</div>
	}

	function onSubmit(values: FormData) {
		if (authUser.data?.data.user) {
			const preSubmitData = {
				...values,
				user: authUser.data.data.user.id,
			}
			createPostRequest.mutate(preSubmitData)
		}
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

	if (authUser.data?.data?.user) {
		return <StackForm type="Create" onSubmit={onSubmit} />
	}
}
