import { Tables } from "@/supabase/dbTypes"

export type PreformattedStack = Tables<"stacks"> & {
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
  link: PreformattedStack["link"]
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
