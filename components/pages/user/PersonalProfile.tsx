import { cookies } from "next/headers"
import { createClient } from "@/utils/supabase/server"
import { SupabaseClient } from "@supabase/supabase-js"

import { Database, Tables } from "@/types/supabase"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import StackGrid from "@/components/StackGrid"

export default async function PersonalProfile({
  user,
}: {
  user: Tables<"users">
}) {
  const cookieStore = cookies()
  const supabase: SupabaseClient<Database> = createClient(cookieStore)
  const { data: stacks } = await supabase
    .from("stacks")
    .select()
    .eq("user_id", user.id)
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-3">
        <Avatar className="size-28">
          <AvatarImage src={user.avatar as string} alt={user.name as string} />
          <AvatarFallback>
            {user.name.match(/\b(\w)/g)?.join("")}
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col gap-1">
          <h1 className="text-4xl font-bold">{user.name}</h1>
          <h2>@{user.user_name}</h2>
        </div>
      </div>
      <p>This is your page</p>
      {stacks && <StackGrid stacks={stacks} isPersonal />}
    </div>
  )
}
