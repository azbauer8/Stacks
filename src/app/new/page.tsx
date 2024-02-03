import { GetAuthUser } from "@/utils/querySupabase"
import NewStack from "./new.client"

export default async function NewStackPage() {
	const user = await GetAuthUser()

	if (!user) {
		return <p>You must be signed in to create a stack.</p>
	}

	return <NewStack user={user.user_metadata.user_name} />
}
