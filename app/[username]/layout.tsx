import { cookies } from "next/headers"
import { createClient } from "@/utils/supabase/server"
import { SupabaseClient } from "@supabase/supabase-js"

import { Database } from "@/types/supabase"

export default async function UserPageLayout({
  globalProfile,
  personalProfile,
  params,
}: {
  globalProfile: React.ReactNode
  personalProfile: React.ReactNode
  params: { username: string }
}) {
  const cookieStore = cookies()
  const supabase: SupabaseClient<Database> = createClient(cookieStore)
  const { data: user } = await supabase
    .from("users")
    .select()
    .eq("user_name", params.username)

  if (user?.length) {
    const { data: authUser } = await supabase.auth.getUser()

    if (authUser.user && authUser.user.id === user[0].id) {
      // show separate page for current user (has editing features)
      return <>{personalProfile}</>
    }
    // show global profile if not current user
    return <>{globalProfile}</>
  } else {
    // TODO: show error page if not found
    return <div>User not found</div>
  }
}
