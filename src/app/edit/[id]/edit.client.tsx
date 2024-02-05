"use client"

import { createClient } from "@/utils/supabase-clients/client"
import { useMutation } from "@tanstack/react-query"
import { useRouter } from "next/navigation"

import StackForm from "@/components/StackForm"
import { FormData } from "@/components/StackForm"
import { useEffect } from "react"

export default function EditStack({
  id,
  initialData,
}: {
  id: string
  initialData: FormData
}) {
  const router = useRouter()
  const supabase = createClient()

  function onSubmit(values: FormData) {
    createEditRequest.mutate(values)
  }

  const createEditRequest = useMutation({
    mutationFn: async (data: FormData) => {
      const { other_libraries, ...submitData } = data
      replaceUndefinedWithNull(submitData)
      await supabase.from("stacks").update(submitData).eq("id", id)
      const stack_other_libraries = await supabase
        .from("stack_other_libraries")
        .select("*")
        .eq("stack_id", id)

      if (other_libraries) {
        const other_libraries_to_remove = stack_other_libraries?.data
          ?.filter(
            ({ other_library_id }) =>
              !other_libraries.includes(other_library_id),
          )
          .map(({ other_library_id }) => other_library_id)
        if (other_libraries_to_remove && other_libraries_to_remove.length > 0) {
          other_libraries_to_remove.forEach(async (library) => {
            await supabase
              .from("stack_other_libraries")
              .delete()
              .eq("stack_id", id)
              .eq("other_library_id", library)
              .select("*")
          })
        }
        const other_libraries_to_add = other_libraries.filter(
          (library) =>
            !stack_other_libraries?.data?.some(
              ({ other_library_id }) => other_library_id === library,
            ),
        )
        if (other_libraries_to_add && other_libraries_to_add.length > 0) {
          other_libraries_to_add.forEach(async (library) => {
            await supabase.from("stack_other_libraries").insert({
              stack_id: parseInt(id),
              other_library_id: library,
            })
          })
        }
      }
    },
  })

  useEffect(() => {
    if (createEditRequest.isSuccess) {
      router.push(`/stack/${id}`)
      router.refresh()
    }
  }, [id, createEditRequest.isSuccess, router.push, router.refresh])

  return (
    <StackForm
      type="Edit"
      initialData={initialData as FormData}
      onSubmit={onSubmit}
    />
  )
}
// biome-ignore lint/suspicious/noExplicitAny: <explanation>
function replaceUndefinedWithNull(obj: any): void {
  for (const key in obj) {
    if (obj[key] === undefined) {
      obj[key] = null
    } else if (typeof obj[key] === "object") {
      replaceUndefinedWithNull(obj[key])
    }
  }
}
