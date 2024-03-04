import { notFound } from "next/navigation"
import { NextResponse } from "next/server"
import { createClient } from "@/supabase/clients/server"
import { findUser, getAuthUser } from "@/supabase/queries"

export async function GET(request: Request) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get("code")

  if (code) {
    const supabase = createClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    if (!error) {
      const user = await getAuthUser()
      const authUser = await findUser({
        username: user?.user_metadata.user_name,
      })

      // check if user exists in users table
      // if exists, check if any data is outdated and update it if so
      // else, create new user in users table
      if (authUser) {
        if (
          authUser.user_name !== user?.user_metadata.user_name ||
          authUser.name !== user?.user_metadata.full_name ||
          authUser.email !== user?.user_metadata.email ||
          authUser.avatar !== user?.user_metadata.avatar_url
        ) {
          const { error } = await supabase
            .from("users")
            .update({
              user_name: user?.user_metadata.user_name,
              name: user?.user_metadata.full_name,
              email: user?.user_metadata.email,
              avatar: user?.user_metadata.avatar_url,
            })
            .eq("id", user?.id as string)
          if (error) {
            console.log(error)
          }
        }
      } else {
        const { error } = await supabase.from("users").insert({
          id: user?.id as string,
          user_name: user?.user_metadata.user_name,
          name: user?.user_metadata.full_name,
          email: user?.user_metadata.email,
          avatar: user?.user_metadata.avatar_url,
        })

        if (error) {
          console.log(error)
        }
      }

      return NextResponse.redirect(requestUrl.origin)
    }
  }

  return notFound()
}
