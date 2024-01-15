"use server"

import { cookies } from "next/headers"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"

import { Database, Tables } from "@/types/supabase"

export async function GetAuthUser() {
  const cookieStore = cookies()
  const supabase = createServerComponentClient<Database>({
    cookies: () => cookieStore,
  })

  const {
    data: { user },
  } = await supabase.auth.getUser()

  return user
}

export async function FindUser(username: string) {
  const cookieStore = cookies()
  const supabase = createServerComponentClient<Database>({
    cookies: () => cookieStore,
  })
  const { data: user } = await supabase
    .from("users")
    .select()
    .eq("user_name", username)

  return user?.length ? user[0] : undefined
}

export async function FindUserById(id: string) {
  const cookieStore = cookies()
  const supabase = createServerComponentClient<Database>({
    cookies: () => cookieStore,
  })
  const { data: user } = await supabase.from("users").select().eq("id", id)

  return user?.length ? user[0] : undefined
}

export async function GetStackById(id: string) {
  const cookieStore = cookies()
  const supabase = createServerComponentClient<Database>({
    cookies: () => cookieStore,
  })
  const { data: stack, error } = await supabase
    .from("stacks")
    .select(
      `*, users(*), use_cases(*), languages(*), frameworks(*), meta_frameworks(*), stylings(*), ui_libraries(*), backend_frameworks(*), databases(*), other_libraries(*, other_library_category(*))`
    )
    .eq("id", id)

  if (!stack?.length || error) return

  return formatStack(stack[0])
}

export async function GetUserStacks({
  user,
  personal,
}: {
  user: string
  personal?: boolean
}) {
  const cookieStore = cookies()
  const supabase = createServerComponentClient<Database>({
    cookies: () => cookieStore,
  })
  const { data: stacks, error } = personal
    ? await supabase
        .from("stacks")
        .select(
          `*, users(*), use_cases(*), languages(*), frameworks(*), meta_frameworks(*), stylings(*), ui_libraries(*), backend_frameworks(*), databases(*), other_libraries(*, other_library_category(*))`
        )
        .eq("user", user)
    : await supabase
        .from("stacks")
        .select(
          `*, users(*), use_cases(*), languages(*), frameworks(*), meta_frameworks(*), stylings(*), ui_libraries(*), backend_frameworks(*), databases(*), other_libraries(*, other_library_category(*))`
        )
        .eq("user", user)
        .eq("visibility", "public")

  if (!stacks?.length || error) return

  const formattedStacks: FormattedStack[] = []

  stacks.forEach((stack) => {
    formattedStacks.push(formatStack(stack))
  })

  return formattedStacks
}

export async function GetPublicStacks() {
  const cookieStore = cookies()
  const supabase = createServerComponentClient<Database>({
    cookies: () => cookieStore,
  })

  const { data: stacks, error } = await supabase
    .from("stacks")
    .select(
      `*, users(*), use_cases(*), languages(*), frameworks(*), meta_frameworks(*), stylings(*), ui_libraries(*), backend_frameworks(*), databases(*), other_libraries(*, other_library_category(*))`
    )
    .eq("visibility", "public")

  if (!stacks?.length || error) return

  const formattedStacks: FormattedStack[] = []

  stacks.forEach((stack) => {
    formattedStacks.push(formatStack(stack))
  })

  return formattedStacks
}

type PreformattedStack = Tables<"stacks"> & {
  users: Tables<"users"> | null
  use_cases: Tables<"use_cases"> | null
  languages: Tables<"languages"> | null
  frameworks: Tables<"frameworks"> | null
  meta_frameworks: Tables<"meta_frameworks"> | null
  stylings: Tables<"stylings"> | null
  ui_libraries: Tables<"ui_libraries"> | null
  backend_frameworks: Tables<"backend_frameworks"> | null
  databases: Tables<"databases"> | null
  other_libraries: (Tables<"other_libraries"> & {
    other_library_category: Tables<"other_library_category"> | null
  })[]
}

export type FormattedStack = {
  id: PreformattedStack["id"]
  visibility: PreformattedStack["visibility"]
  created_at: PreformattedStack["created_at"]
  updated_at: PreformattedStack["updated_at"]
  title: PreformattedStack["title"]
  description: PreformattedStack["description"]
  user: PreformattedStack["users"]
  use_case: PreformattedStack["use_cases"]
  language: PreformattedStack["languages"]
  framework: PreformattedStack["frameworks"]
  meta_framework: PreformattedStack["meta_frameworks"]
  styling: PreformattedStack["stylings"]
  ui_library: PreformattedStack["ui_libraries"]
  backend_framework: PreformattedStack["backend_frameworks"]
  database: PreformattedStack["databases"]
  other_libraries: PreformattedStack["other_libraries"]
}

function formatStack(stack: PreformattedStack) {
  const formattedStack: FormattedStack = {
    id: stack.id,
    visibility: stack.visibility,
    created_at: formatDate(stack.created_at),
    updated_at: formatDate(stack.updated_at),
    title: stack.title,
    description: stack.description,
    user: stack.users,
    use_case: stack.use_cases,
    language: stack.languages,
    framework: stack.frameworks,
    meta_framework: stack.meta_frameworks,
    styling: stack.stylings,
    ui_library: stack.ui_libraries,
    backend_framework: stack.backend_frameworks,
    database: stack.databases,
    other_libraries: stack.other_libraries.map((otherLibrary) => ({
      ...otherLibrary,
      other_library_category: otherLibrary.other_library_category,
    })),
  }
  return formattedStack
}

function formatDate(date: string) {
  const formattedDate = new Date(date)
  const dateOpt = {
    year: "2-digit" as "numeric" | "2-digit" | undefined,
    month: "short" as
      | "2-digit"
      | "numeric"
      | "long"
      | "short"
      | "narrow"
      | undefined,
    day: "numeric" as "numeric" | "2-digit" | undefined,
  }
  return formattedDate.toLocaleString("en-US", dateOpt)
}
