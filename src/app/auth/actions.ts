"use server"

import { cookies, headers } from "next/headers"
import { redirect } from "next/navigation"

import { createClient } from "@/utils/supabase-clients/actions"
import { revalidatePath } from "next/cache"

export async function signIn() {
  const origin = headers().get("origin")
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "github",
    options: {
      redirectTo: `${origin}/auth/callback`,
    },
  })

  if (error) {
    console.error(error)
    return redirect("/")
  }

  redirect(data.url)
}

export async function signOut() {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  await supabase.auth.signOut()
  revalidatePath("/", "layout")
  return redirect("/")
}
