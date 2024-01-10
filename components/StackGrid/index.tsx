import { Tables } from "@/types/supabase"

import StackCard from "./StackCard"

export default function StackGrid({ stacks }: { stacks: Tables<"stacks">[] }) {
  return (
    <div className="grid grid-cols-1 gap-5 md:mx-5 md:grid-cols-2">
      {stacks.map((stack) => (
        <StackCard key={stack.id} stack={stack} />
      ))}
    </div>
  )
}
