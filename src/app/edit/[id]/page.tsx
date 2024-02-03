import { FormData } from "@/components/StackForm"
import { createClient } from "@/utils/supabase/server"
import { cookies } from "next/headers"
import { notFound } from "next/navigation"
import EditStack from "./edit.client"

export default async function EditStackPage({
	params: { id },
}: {
	params: { id: string }
}) {
	const cookieStore = cookies()
	const supabase = createClient(cookieStore)

	const stack = await supabase
		.from("stacks")
		.select("*, other_libraries(id)")
		.eq("id", id)

	if (!stack?.data?.length) {
		return notFound()
	}

	const stackData = stack.data[0]
	replaceNullWithUndefined(stackData)
	const other_libraries = stackData.other_libraries.map((obj) => obj.id)
	return (
		<EditStack
			id={id}
			initialData={{ ...stackData, other_libraries } as FormData}
		/>
	)
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
