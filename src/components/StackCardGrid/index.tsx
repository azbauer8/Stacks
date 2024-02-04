import { GetAllStacks, GetUserStacks } from "@/utils/querySupabase"

import StackCard from "./StackCard"

export default async function StackCardGrid({
	user,
}: {
	user?: string
}) {
	const stacks = user ? await GetUserStacks({ user }) : await GetAllStacks()

	if (stacks) {
		return (
			<>
				{/* <pre>{JSON.stringify(stacks, null, 2)}</pre> */}
				<div className="grid grid-cols-1 gap-5 md:mx-5 md:grid-cols-2">
					{stacks.map((stack) => (
						<StackCard key={stack.id} stack={stack} />
					))}
				</div>
			</>
		)
	}
}
