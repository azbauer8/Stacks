import { Tables } from "@/types/supabase"
import StackCard from "@/components/StackGrid/StackCard"

export default async function GlobalStack({
  stack,
}: {
  stack: Tables<"stacks">
}) {
  return (
    <>
      Yo
      {/* <StackCard stack={stack} /> */}
    </>
  )
}
