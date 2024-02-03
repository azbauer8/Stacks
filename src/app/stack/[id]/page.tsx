import { GetAuthUser, GetStackById } from "@/utils/querySupabase"
import { LinkIcon, LockIcon } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"

import { badgeVariants } from "@/components/ui/badge"
import { Button, buttonVariants } from "@/components/ui/button"
import { Tables } from "@/types/supabase"

import DeleteStack from "./DeleteStack"
import StackItem from "./StackItem"

type StackElement = Tables<"frameworks"> & { header: string }

export default async function StackPage({
	params,
}: {
	params: { id: string }
}) {
	const { id } = params
	const stack = await GetStackById({ id })

	if (stack) {
		const authUser = await GetAuthUser()
		const allStackElements = [
			{ type: "language", header: "Language" },
			{ type: "framework", header: "Framework" },
			{ type: "meta_framework", header: "Meta Framework" },
			{ type: "styling", header: "Styling" },
			{ type: "ui_library", header: "UI Library" },
			{ type: "backend_framework", header: "Backend Framework" },
			{ type: "database", header: "Database" },
			{ type: "other_libraries", header: "Other Libraries" },
		]
		const stackElements: StackElement[] = []
		for (const stackElement of allStackElements) {
			// TODO: figure out how to do this without surpressing ts errors
			// @ts-ignore
			if (stack[stackElement.type]) {
				if (stackElement.type === "other_libraries") {
					// @ts-ignore
					stack[stackElement.type].map((other_library) => {
						stackElements.push({
							...other_library,
							header: other_library.other_library_category?.title
								? other_library.other_library_category.title
								: "Misc. Library",
						})
					})
				} else {
					stackElements.push({
						// @ts-ignore
						...stack[stackElement.type],
						header: stackElement.header,
					})
				}
			}
		}
		return (
			<div className="mx-auto px-0.5">
				{authUser?.id === stack.user?.id && (
					<div className="flex justify-end pb-3 space-x-2.5">
						<Link
							href={`/edit/${stack.id}`}
							className={buttonVariants({ variant: "outline", size: "sm" })}
						>
							Edit
						</Link>
						<DeleteStack
							user={authUser?.user_metadata.user_name}
							stackId={stack.id}
						/>
					</div>
				)}
				<div className="flex items-center justify-between">
					<h2 className="text-3xl font-bold leading-none tracking-tight">
						{stack.title}
					</h2>
					{stack.visibility === "private" && <LockIcon />}
				</div>
				<div className="mt-2 flex flex-wrap items-center justify-between gap-1 text-sm">
					<Link
						href={`/${stack.user?.user_name}`}
						className={`${badgeVariants({
							variant: "default",
						})} w-fit`}
					>
						<h2>{stack.user?.user_name}</h2>
					</Link>
					<div className="w-12" />
					<div className="text-right text-muted-foreground">
						Updated <span className="font-medium">{stack.updated_at}</span>
					</div>
				</div>
				<p className="mt-4 text-sm">{stack.description}</p>
				{stack.link && (
					<Link
						href={stack.link}
						className={`${buttonVariants({
							variant: "link",
						})} gap-1 pl-0`}
					>
						<LinkIcon className="size-4" />
						{stack.link}
					</Link>
				)}
				<div className="grid grid-cols-1 gap-3 md:grid-cols-2">
					{stackElements.map((stackElement) => (
						<StackItem
							key={stackElement.id}
							header={stackElement.header}
							icon={stackElement.icon}
							hasDarkIcon={stackElement.has_dark_icon}
							title={stackElement.title}
							description={stackElement.description}
							link={stackElement.link}
						/>
					))}
				</div>
			</div>
		)
	}
	return notFound()
}
