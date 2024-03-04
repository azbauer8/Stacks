import { cache } from "react"
import { createClient as createServerClient } from "@/supabase/clients/server"

import "server-only"

import { Tables } from "./dbTypes"
import { formatStack } from "./helpers"

export const getAuthUser = cache(async () => {
  const supabase = createServerClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  return user
})

export const findUser = cache(async ({ username }: { username: string }) => {
  const supabase = createServerClient()
  const { data: user } = await supabase
    .from("users")
    .select()
    .eq("user_name", username)

  return user?.length ? user[0] : undefined
})

export const stackColQuery =
  "*, users(*), use_cases(*), languages(*), frameworks(*), meta_frameworks(*), stylings(*), ui_libraries(*), backend_frameworks(*), databases(*), other_libraries(*, other_library_category(*))"

export const getStackById = cache(async ({ id }: { id: string }) => {
  const supabase = createServerClient()
  const { data: stack, error } = await supabase
    .from("stacks")
    .select(stackColQuery)
    .eq("id", id)

  if (!stack?.length || error) return

  return formatStack(stack[0])
})

export const getStacks = cache(async ({ user }: { user?: string }) => {
  const supabase = createServerClient()
  const { data: stacks, error } = user
    ? await supabase.from("stacks").select(stackColQuery).eq("user", user)
    : await supabase.from("stacks").select(stackColQuery)

  if (!stacks?.length || error) return

  return stacks.map((stack) => formatStack(stack))
})

export const getFormFieldOptions = cache(async () => {
  const supabase = createServerClient()
  const { data: useCases } = await supabase.from("use_cases").select()
  const { data: languages } = await supabase.from("languages").select()
  const { data: frameworks } = await supabase.from("frameworks").select()
  const { data: metaFrameworks } = await supabase
    .from("meta_frameworks")
    .select()
  const { data: stylings } = await supabase.from("stylings").select()
  const { data: uiLibraries } = await supabase.from("ui_libraries").select()
  const { data: databases } = await supabase.from("databases").select()
  const { data: backendFrameworks } = await supabase
    .from("backend_frameworks")
    .select()
  const { data: otherLibraries } = await supabase
    .from("other_libraries")
    .select("*, other_library_category(*)")
  return {
    useCases,
    languages,
    frameworks,
    metaFrameworks,
    stylings,
    uiLibraries,
    databases,
    backendFrameworks,
    otherLibraries,
  } as FormFieldOptions
})

export type FormFieldOptions = {
  useCases: Tables<"use_cases">[]
  languages: Tables<"languages">[]
  frameworks: Tables<"frameworks">[]
  metaFrameworks: Tables<"meta_frameworks">[]
  stylings: Tables<"stylings">[]
  uiLibraries: Tables<"ui_libraries">[]
  databases: Tables<"databases">[]
  backendFrameworks: Tables<"backend_frameworks">[]
  otherLibraries: (Tables<"other_libraries"> & {
    other_library_category: Tables<"other_library_category"> | null
  })[]
}
