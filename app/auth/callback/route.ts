import { cookies } from "next/headers"
import { NextResponse } from "next/server"
import { FindUser, GetAuthUser } from "@/utils/querySupabase"
import { createServerClient, type CookieOptions } from "@supabase/ssr"

import { Database } from "@/types/supabase"

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get("code")
  const next = searchParams.get("next") ?? "/"

  if (code) {
    const cookieStore = cookies()
    const supabase = createServerClient<Database>(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) {
            return cookieStore.get(name)?.value
          },
          set(name: string, value: string, options: CookieOptions) {
            cookieStore.set({ name, value, ...options })
          },
          remove(name: string, options: CookieOptions) {
            cookieStore.delete({ name, ...options })
          },
        },
      }
    )
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    if (!error) {
      // TODO: check if user exists in users table
      // if exists, check if any data is outdated and update it if so
      // else, create new user in users table
      const user = await GetAuthUser()
      const authUser = await FindUser(user?.user_metadata.user_name)

      if (authUser) {
        if (
          authUser.user_name !== user?.user_metadata.user_name ||
          authUser.name !== user?.user_metadata.full_name ||
          authUser.email !== user?.user_metadata.email ||
          authUser.avatar !== user?.user_metadata.avatar_url
        ) {
          console.log("user data is outdated, updating it")
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

      return NextResponse.redirect(`${origin}${next}`)
    }
  }

  return NextResponse.redirect(`${origin}/auth/auth-code-error`)
}
