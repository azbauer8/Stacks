import { Tables } from "@/supabase/dbTypes"
import { getStacks } from "@/supabase/queries"

import StackCard from "./StackCard"

export default async function StackCardGrid({
  user,
}: {
  user?: Tables<"users">
}) {
  const stacks = user
    ? await getStacks({ user_id: user.id })
    : await getStacks({})

  if (!stacks) return

  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
      {stacks.map((stack) => (
        <StackCard key={stack.id} stack={stack} />
      ))}
    </div>
  )
}
