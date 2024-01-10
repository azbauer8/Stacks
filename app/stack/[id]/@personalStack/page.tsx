import { cookies } from "next/headers"
import { createClient } from "@/utils/supabase/server"
import { SupabaseClient } from "@supabase/supabase-js"

import { Database } from "@/types/supabase"
import StackCard from "@/components/StackCard"

export default async function PersonalStack({
  params,
}: {
  params: { id: string }
}) {
  const cookieStore = cookies()
  const supabase: SupabaseClient<Database> = createClient(cookieStore)

  // check if stack exists
  const { data: findStack } = await supabase
    .from("stacks")
    .select()
    .eq("id", params.id)
  if (findStack?.length) {
    const stack = findStack[0]

    return (
      <>
        <p>Hey, you made this!</p>
        <StackCard stack={stack} />
      </>
    )
  }
}
