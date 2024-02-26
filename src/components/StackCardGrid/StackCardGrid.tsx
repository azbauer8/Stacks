import { notFound } from "next/navigation"
import { GetAllStacks, GetUserStacks } from "@/utils/querySupabase"

import { Tables } from "@/types/supabase"

import StackCard from "./StackCard"

export default async function StackCardGrid({
  user,
}: {
  user?: Tables<"users">
}) {
  const stacks = user
    ? await GetUserStacks({ user: user.id })
    : await GetAllStacks()

  if (!stacks) return notFound()

  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
      {stacks.map((stack) => (
        <StackCard key={stack.id} stack={stack} />
      ))}
    </div>
  )
}
