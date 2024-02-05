import { Tables } from "./supabase"

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
