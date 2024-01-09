import { cookies } from "next/headers"
import { createClient } from "@/utils/supabase/server"
import { SupabaseClient } from "@supabase/supabase-js"

import { Database } from "@/types/supabase"

export default async function StackPage({
  globalStack,
  personalStack,
  params,
}: {
  globalStack: React.ReactNode
  personalStack: React.ReactNode
  params: { id: string }
}) {
  const cookieStore = cookies()
  const supabase: SupabaseClient<Database> = createClient(cookieStore)

  // check if stack exists
  const { data: stack } = await supabase
    .from("stacks")
    .select()
    .eq("id", params.id)

  if (stack?.length) {
    const { data: authUser } = await supabase.auth.getUser()

    if (authUser.user && authUser.user.id === stack[0].user_id) {
      // show separate page for current user (has editing features)
      return <>{personalStack}</>
    }

    return <>{globalStack}</>
  } else {
    return <div>Stack not found</div>
  }
}
