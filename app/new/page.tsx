"use client"

import { useRouter } from "next/navigation"
import { createClient } from "@/utils/supabase/client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQuery } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"

import BackendFramework from "./FormFields/BackendFramework"
import BasicInfo from "./FormFields/BasicInfo"
import Database from "./FormFields/Database"
import Framework from "./FormFields/Framework"
import Language from "./FormFields/Language"
import MetaFramework from "./FormFields/MetaFramework"
import { OtherLibraries } from "./FormFields/OtherLibraries"
import Styling from "./FormFields/Styling"
import UILibrary from "./FormFields/UILibrary"
import UseCase from "./FormFields/UseCase"
import { formSchema } from "./formSchema"

export type FormData = z.infer<typeof formSchema>

export default function NewStack() {
  const router = useRouter()
  const supabase = createClient()
  // use this to assign the created stack to the user
  const authUser = useQuery({
    queryKey: ["authUser"],
    queryFn: async () => await supabase.auth.getUser(),
  })

  // 1. Define your form.
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      visibility: "public",
    },
  })

  // 2. Define a submit handler.
  function onSubmit(values: FormData) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    if (authUser.data?.data.user) {
      const preSubmitData = {
        ...values,
        user: authUser.data.data.user.id,
      }
      createPostRequest.mutate(preSubmitData)
    }
  }

  const createPostRequest = useMutation({
    mutationFn: async (newStackData: any) => {
      const { other_libraries, ...submitData } = newStackData
      const newStack = await supabase.from("stacks").insert(submitData).select()
      if (newStack.data && other_libraries) {
        await supabase.from("stack_other_libraries").insert(
          other_libraries.map((other_library: any) => ({
            stack_id: newStack.data[0].id,
            other_library_id: other_library,
          }))
        )

        return newStack
      }
    },
  })

  createPostRequest.isError && console.log(createPostRequest.error)

  if (createPostRequest.isSuccess && createPostRequest.data) {
    router.push(`/${authUser.data?.data.user?.user_metadata.user_name}`)
    setTimeout(() => {
      router.push(`/stack/${createPostRequest.data?.data[0].id}`)
    }, 300)
  }

  if (authUser.data?.error) {
    return <div>You must be signed in to create a stack</div>
  }

  if (authUser.data?.data?.user) {
    return (
      <div className="space-y-5">
        <h1 className="text-4xl font-bold">Create a Stack</h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <BasicInfo form={form} />
            <div className="grid grid-cols-1 gap-5 md:grid-cols-3 lg:grid-cols-3 ">
              <UseCase form={form} />
              <Language form={form} />
              <Framework form={form} />
              <MetaFramework form={form} />

              <Styling form={form} />
              <UILibrary form={form} />

              <Database form={form} />
              <BackendFramework form={form} />
            </div>
            <OtherLibraries form={form} />
            <Button type="submit">Create Stack</Button>
          </form>
        </Form>
      </div>
    )
  }
}
