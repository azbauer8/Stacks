"use server"

import { cookies } from "next/headers"
import { createClient } from "@/utils/supabase/server"
import { SupabaseClient } from "@supabase/supabase-js"

import { Database, Tables } from "@/types/supabase"

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

  return user?.length ? user[0] : undefined
}

export async function FindUserById(id: string) {
  const cookieStore = cookies()
  const supabase: SupabaseClient<Database> = createClient(cookieStore)
  const { data: user } = await supabase.from("users").select().eq("id", id)

  return user?.length ? user[0] : undefined
}

export async function GetStackById(id: string) {
  const cookieStore = cookies()
  const supabase: SupabaseClient<Database> = createClient(cookieStore)
  const { data: stack } = await supabase.from("stacks").select().eq("id", id)

  return stack?.length ? await formatStack(stack[0], supabase) : null
}

export async function GetUserStacks(user: string) {
  const cookieStore = cookies()
  const supabase: SupabaseClient<Database> = createClient(cookieStore)
  const { data: stacks } = await supabase
    .from("stacks")
    .select()
    .eq("user", user)

  if (stacks) {
    const formattedStacks: formattedStack[] = []
    for (const stack in stacks) {
      formattedStacks.push(await formatStack(stacks[stack], supabase))
    }
    return formattedStacks
  }
  return null
}

export async function GetPublicStacks() {
  const cookieStore = cookies()
  const supabase: SupabaseClient<Database> = createClient(cookieStore)
  const { data: stacks } = await supabase
    .from("stacks")
    .select()
    .eq("visibility", "public")
  if (stacks) {
    const formattedStacks: formattedStack[] = []
    for (const stack in stacks) {
      formattedStacks.push(await formatStack(stacks[stack], supabase))
    }
    return formattedStacks
  }
  return null
}

export type formattedStack = Tables<"stacks"> & {
  user: Tables<"users"> | null | undefined
  language: Tables<"languages"> | null | undefined
  framework: Tables<"frameworks"> | null | undefined
  meta_framework: Tables<"meta_frameworks"> | null | undefined
  styling: Tables<"stylings"> | null | undefined
  ui_library: Tables<"ui_libraries"> | null | undefined
  database: Tables<"databases"> | null | undefined
  backend_framework: Tables<"backend_frameworks"> | null | undefined
}

async function formatStack(
  stack: Tables<"stacks">,
  supabase: SupabaseClient<Database>
) {
  const user = await FindUserById(stack.user)
  const language = stack.language
    ? await supabase.from("languages").select().eq("id", stack.language)
    : undefined
  const framework = stack.framework
    ? await supabase.from("frameworks").select().eq("id", stack.framework)
    : undefined
  const meta_framework = stack.meta_framework
    ? await supabase
        .from("meta_frameworks")
        .select()
        .eq("id", stack.meta_framework)
    : undefined
  const styling = stack.styling
    ? await supabase.from("stylings").select().eq("id", stack.styling)
    : undefined
  const ui_library = stack.ui_library
    ? await supabase.from("ui_libraries").select().eq("id", stack.ui_library)
    : undefined
  const database = stack.database
    ? await supabase.from("databases").select().eq("id", stack.database)
    : undefined
  const backend_framework = stack.backend_framework
    ? await supabase
        .from("backend_frameworks")
        .select()
        .eq("id", stack.backend_framework)
    : undefined
  return {
    ...stack,
    user,
    language: language?.data,
    framework: framework?.data,
    meta_framework: meta_framework?.data,
    styling: styling?.data,
    ui_library: ui_library?.data,
    database: database?.data,
    backend_framework: backend_framework?.data,
  } as formattedStack
}
