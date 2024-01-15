import { GetAuthUser, GetStackById } from "@/utils/querySupabase"

import GlobalStack from "@/app/stack/[id]/Global"
import PersonalStack from "@/app/stack/[id]/Personal"

export default async function StackController({ id }: { id: string }) {
  const stack = await GetStackById({ clientType: "server", id })

  if (stack) {
    const authUser = await GetAuthUser({ clientType: "server" })

    if (authUser && authUser.id === stack.user?.id) {
      return <PersonalStack stack={stack} />
    }

    return <GlobalStack stack={stack} />
  } else {
    return <div>Stack not found</div>
  }
}
