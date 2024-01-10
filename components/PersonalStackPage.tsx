import { Tables } from "@/types/supabase"
import StackCard from "@/components/StackCard"

export default async function PersonalStack({
  stack,
}: {
  stack: Tables<"stacks">
}) {
  return (
    <>
      <p>Hey, you made this!</p>
      <StackCard stack={stack} />
    </>
  )
}
