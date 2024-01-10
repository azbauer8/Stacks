"use server"

import { cookies } from "next/headers"
import { createClient } from "@/utils/supabase/server"
import { SupabaseClient } from "@supabase/supabase-js"

import { Database } from "@/types/supabase"

export async function GetAuthUser() {
  const cookieStore = cookies()
  const supabase: SupabaseClient<Database> = createClient(cookieStore)

  const {
    data: { user },
  } = await supabase.auth.getUser()

  return user
}

export async function FindUser(username: string) {
  const cookieStore = cookies()
  const supabase: SupabaseClient<Database> = createClient(cookieStore)
  const { data: user } = await supabase
    .from("users")
    .select()
    .eq("user_name", username)

  return user
}

export async function GetStackById(id: string) {
  const cookieStore = cookies()
  const supabase: SupabaseClient<Database> = createClient(cookieStore)
  const { data: stacks } = await supabase.from("stacks").select().eq("id", id)
  return stacks
}

export async function GetUserStacks(user_id: string) {
  const cookieStore = cookies()
  const supabase: SupabaseClient<Database> = createClient(cookieStore)
  const { data: stacks } = await supabase
    .from("stacks")
    .select()
    .eq("user_id", user_id)
  return stacks
}

export async function GetPublicStacks() {
  const cookieStore = cookies()
  const supabase: SupabaseClient<Database> = createClient(cookieStore)
  const { data: stacks } = await supabase
    .from("stacks")
    .select()
    .eq("visibility", "public")
  return stacks
}
