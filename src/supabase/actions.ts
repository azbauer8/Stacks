"use server"

import { redirect } from "next/navigation"

import { createClient } from "./clients/server"
import { formatFormData } from "./helpers"
import { FormFieldOptions, stackColQuery } from "./queries"

export async function deleteStack(stackId: number, username: string) {
  const supabase = createClient()
  const { error } = await supabase.from("stacks").delete().eq("id", stackId)
  if (!error) {
    redirect(`/user/${username}`)
  }
}

export async function createStack(
  {
    user_id,
    formFieldOptions,
  }: {
    user_id: string
    formFieldOptions: FormFieldOptions
  },
  formData: FormData
) {
  const supabase = createClient()

  const stackData = formatFormData(formData, formFieldOptions, user_id)

  const newStack = await supabase
    .from("stacks")
    // @ts-expect-error complains that the user prop may be missing since it's included conditionally, but it will always be included here since we pass the prop above
    .insert(stackData)
    .select(stackColQuery)
    .single()

  console.log(newStack)

  if (newStack.data) {
    const otherLibraries = formData
      .getAll("otherLibraries")
      ?.map((library) => parseInt(library?.valueOf().toString() ?? ""))

    if (otherLibraries?.length > 0) {
      await supabase.from("stack_other_libraries").insert(
        otherLibraries.map((other_library) => ({
          stack_id: newStack.data.id,
          other_library_id: other_library,
        }))
      )
    }

    redirect(`/stack/${newStack.data.id}`)
  }
}

export async function editStack(
  {
    stackId,
    formFieldOptions,
  }: {
    stackId: string
    formFieldOptions: FormFieldOptions
  },
  formData: FormData
) {
  const supabase = createClient()

  const stackData = formatFormData(formData, formFieldOptions)

  await supabase.from("stacks").update(stackData).eq("id", stackId)
  const stack_other_libraries = await supabase
    .from("stack_other_libraries")
    .select("*")
    .eq("stack_id", stackId)

  const other_libraries = formData
    .getAll("otherLibraries")
    ?.map((library) => parseInt(library?.valueOf().toString() ?? ""))

  if (other_libraries) {
    const other_libraries_to_remove = stack_other_libraries?.data
      ?.filter(
        ({ other_library_id }) => !other_libraries.includes(other_library_id)
      )
      .map(({ other_library_id }) => other_library_id)
    if (other_libraries_to_remove && other_libraries_to_remove.length > 0) {
      other_libraries_to_remove.forEach(async (library) => {
        await supabase
          .from("stack_other_libraries")
          .delete()
          .eq("stack_id", stackId)
          .eq("other_library_id", library)
          .select("*")
      })
    }
    const other_libraries_to_add = other_libraries.filter(
      (library) =>
        !stack_other_libraries?.data?.some(
          ({ other_library_id }) => other_library_id === library
        )
    )
    if (other_libraries_to_add && other_libraries_to_add.length > 0) {
      other_libraries_to_add.forEach(async (library) => {
        await supabase.from("stack_other_libraries").insert({
          stack_id: parseInt(stackId),
          other_library_id: library,
        })
      })
    }
  }
  redirect(`/stack/${stackId}`)
}
