import { notFound } from "next/navigation"
import { getAllStacks, getUserStacks } from "@/utils/querySupabase"

import { Tables } from "@/types/supabase"

import StackCard from "./StackCard"

export default async function StackCardGrid({
  user,
}: {
  user?: Tables<"users">
}) {
  const stacks = user
    ? await getUserStacks({ user: user.id })
    : await getAllStacks()

  if (!stacks) return notFound()

  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
      {stacks.map((stack) => (
        <StackCard key={stack.id} stack={stack} />
      ))}
    </div>
  )
}
