import { cookies } from "next/headers"
import Link from "next/link"
import { createClient } from "@/utils/supabase/server"
import { SupabaseClient } from "@supabase/supabase-js"

import { Database } from "@/types/supabase"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { badgeVariants } from "@/components/ui/badge"
import StackGrid from "@/components/StackGrid"

export default async function PersonalProfile({
  params,
}: {
  params: { username: string }
}) {
  const cookieStore = cookies()
  const supabase: SupabaseClient<Database> = createClient(cookieStore)
  const { data: findUser } = await supabase
    .from("users")
    .select()
    .eq("user_name", params.username)
  if (findUser?.length) {
    const user = findUser[0]
    const { data: stacks } = await supabase
      .from("stacks")
      .select()
      .eq("user_id", user.id)
    return (
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <Avatar className="size-28">
            <AvatarImage
              src={user.avatar as string}
              alt={user.name as string}
            />
            <AvatarFallback>
              {user.name.match(/\b(\w)/g)?.join("")}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col gap-2.5">
            <h1 className="text-4xl font-bold">{user.name}</h1>
            <Link
              href={`https://github.com/${user.user_name}`}
              className={`${badgeVariants({
                variant: "default",
              })} w-fit items-center text-[13px]`}
            >
              <h2>@{user.user_name}</h2>
            </Link>
          </div>
        </div>
        <p>This is your page</p>
        {stacks && <StackGrid stacks={stacks} isPersonal />}
      </div>
    )
  }
}
