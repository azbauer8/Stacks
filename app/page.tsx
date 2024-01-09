import { cookies } from "next/headers"
import { createClient } from "@/utils/supabase/server"
import { SupabaseClient } from "@supabase/supabase-js"

import { Database } from "@/types/supabase"
import StackGrid from "@/components/StackGrid"

export default async function Index() {
  const cookieStore = cookies()
  const supabase: SupabaseClient<Database> = createClient(cookieStore)
  const { data: stacks } = await supabase
    .from("stacks")
    .select()
    .eq("visibility", "public")

  if (stacks)
    return (
      <div className="flex flex-col gap-2">
        <StackGrid stacks={stacks} />
      </div>
    )
}
