import { formattedStack } from "@/utils/querySupabase"

import { Tables } from "@/types/supabase"
import StackCard from "@/components/StackGrid/StackCard"

export default async function GlobalStack({
  stack,
}: {
  stack: formattedStack
}) {
  return (
    <>
      Yo
      {/* <StackCard stack={stack} /> */}
    </>
  )
}
