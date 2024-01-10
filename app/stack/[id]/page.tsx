import { GetAuthUser, GetStackById } from "@/utils/querySupabase"

import GlobalStack from "@/components/GlobalStackPage"
import PersonalStack from "@/components/PersonalStackPage"

export default async function StackPage({
  params,
}: {
  params: { id: string }
}) {
  // check if stack exists
  const stack = await GetStackById(params.id)

  if (stack?.length) {
    const authUser = await GetAuthUser()

    if (authUser && authUser.id === stack[0].user_id) {
      // show separate page for current user (has editing features)
      return <PersonalStack stack={stack[0]} />
    }

    return <GlobalStack stack={stack[0]} />
  } else {
    return <div>Stack not found</div>
  }
}
