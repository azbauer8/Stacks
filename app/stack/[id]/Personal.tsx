import { formattedStack } from "@/utils/querySupabase"

import { Tables } from "@/types/supabase"
import StackCard from "@/components/StackGrid/StackCard"

export default async function PersonalStack({
  stack,
}: {
  stack: formattedStack
}) {
  return (
    <>
      <p>Hey, you made this!</p>
      {/* <StackCard stack={stack} /> */}
    </>
  )
}
