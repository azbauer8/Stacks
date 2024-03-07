import { Tables } from "@/supabase/dbTypes"

import { FormFieldOptions } from "./queries"

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

export function formatFormData(
  formData: FormData,
  formFieldOptions: FormFieldOptions,
  user_id?: string
) {
  const sharedFormat = {
    title: formData.get("title")?.valueOf() as string,
    description: formData.get("description")?.valueOf() as string,
    link: formData.get("link")?.valueOf() as string,
    use_case: formFieldOptions.useCases.find(
      (useCase) => useCase.title === formData.get("useCase")
    )?.id,
    language: formFieldOptions.languages.find(
      (language) => language.title === formData.get("language")
    )?.id,
    framework: formFieldOptions.frameworks.find(
      (framework) => framework.title === formData.get("framework")
    )?.id,
    meta_framework: formFieldOptions.metaFrameworks.find(
      (metaFrameworks) => metaFrameworks.title === formData.get("metaFramework")
    )?.id,
    styling: formFieldOptions.stylings.find(
      (styling) => styling.title === formData.get("styling")
    )?.id,
    ui_library: formFieldOptions.uiLibraries.find(
      (uiLibrary) => uiLibrary.title === formData.get("uiLibrary")
    )?.id,
    database: formFieldOptions.databases.find(
      (database) => database.title === formData.get("database")
    )?.id,
    backend_framework: formFieldOptions.backendFrameworks.find(
      (backendFramework) =>
        backendFramework.title === formData.get("backendFramework")
    )?.id,
  }
  if (user_id) {
    return {
      ...sharedFormat,
      user_id,
    }
  }
  return sharedFormat
}
