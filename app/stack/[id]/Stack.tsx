import { GetAuthUser, GetStackById } from "@/utils/querySupabase"

import GlobalStack from "@/app/stack/[id]/Global"
import PersonalStack from "@/app/stack/[id]/Personal"

export default async function Stack({ id }: { id: string }) {
  const stack = await GetStackById(id)

  if (stack?.length) {
    const authUser = await GetAuthUser()

    if (authUser && authUser.id === stack[0].user_id) {
      return <PersonalStack stack={stack[0]} />
    }

    return <GlobalStack stack={stack[0]} />
  } else {
    return <div>Stack not found</div>
  }
}
