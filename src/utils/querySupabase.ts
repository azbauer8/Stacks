import { createClient as createServerClient } from "@/utils/supabase-clients/server"
import { cookies } from "next/headers"

import { FormattedStack, PreformattedStack } from "@/types/stack"

export async function GetAuthUser() {
  const cookieStore = cookies()
  const supabase = createServerClient(cookieStore)

  const {
    data: { user },
  } = await supabase.auth.getUser()

  return user
}

export async function FindUser({ username }: { username: string }) {
  const cookieStore = cookies()
  const supabase = createServerClient(cookieStore)
  const { data: user } = await supabase
    .from("users")
    .select()
    .eq("user_name", username)

  return user?.length ? user[0] : undefined
}

export async function GetStackById({ id }: { id: string }) {
  const cookieStore = cookies()
  const supabase = createServerClient(cookieStore)
  const { data: stack, error } = await supabase
    .from("stacks")
    .select(
      "*, users(*), use_cases(*), languages(*), frameworks(*), meta_frameworks(*), stylings(*), ui_libraries(*), backend_frameworks(*), databases(*), other_libraries(*, other_library_category(*))",
    )
    .eq("id", id)

  if (!stack?.length || error) return

  return formatStack(stack[0])
}

export async function GetUserStacks({
  user,
}: {
  user: string
}) {
  const cookieStore = cookies()
  const supabase = createServerClient(cookieStore)
  const { data: stacks, error } = await supabase
    .from("stacks")
    .select(
      "*, users(*), use_cases(*), languages(*), frameworks(*), meta_frameworks(*), stylings(*), ui_libraries(*), backend_frameworks(*), databases(*), other_libraries(*, other_library_category(*))",
    )
    .eq("user", user)

  if (!stacks?.length || error) return

  const formattedStacks: FormattedStack[] = []

  for (const stack of stacks) {
    formattedStacks.push(formatStack(stack))
  }

  return formattedStacks
}

export async function GetAllStacks() {
  const cookieStore = cookies()
  const supabase = createServerClient(cookieStore)

  const { data: stacks, error } = await supabase
    .from("stacks")
    .select(
      "*, users(*), use_cases(*), languages(*), frameworks(*), meta_frameworks(*), stylings(*), ui_libraries(*), backend_frameworks(*), databases(*), other_libraries(*, other_library_category(*))",
    )

  if (!stacks?.length || error) return

  const formattedStacks: FormattedStack[] = []

  for (const stack of stacks) {
    formattedStacks.push(formatStack(stack))
  }

  return formattedStacks
}

export function formatStack(stack: PreformattedStack) {
  const formattedStack: FormattedStack = {
    id: stack.id,
    visibility: stack.visibility,
    created_at: formatDate(stack.created_at),
    updated_at: formatDate(stack.updated_at),
    title: stack.title,
    description: stack.description,
    link: stack.link,
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
    year: "numeric" as "numeric" | "2-digit" | undefined,
    month: "short" as
      | "2-digit"
      | "numeric"
      | "long"
      | "short"
      | "narrow"
      | undefined,
  }
  return formattedDate.toLocaleString("en-US", dateOpt)
}
