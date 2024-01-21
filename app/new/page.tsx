"use client"

import { createClient } from "@/utils/supabase/client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useQuery } from "@tanstack/react-query"
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
import Styling from "./FormFields/Styling"
import UILibrary from "./FormFields/UILibrary"
import UseCase from "./FormFields/UseCase"
import { formSchema } from "./formSchema"

export type FormData = z.infer<typeof formSchema>

export default function ProfileForm() {
  const supabase = createClient()
  // use this to assign the created stack to the user
  const query = useQuery({
    queryKey: ["authUser"],
    queryFn: async () => await supabase.auth.getUser(),
  })

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      visibility: "public",
    },
  })

  console.log(form.getValues())
  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
  }

  return (
    <div className="space-y-5">
      <h1 className="text-4xl font-bold">Create a Stack</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <BasicInfo form={form} />
          <UseCase form={form} />
          <Language form={form} />
          <Framework form={form} />
          <MetaFramework form={form} />
          <Styling form={form} />
          <UILibrary form={form} />
          <Database form={form} />
          <BackendFramework form={form} />
          <Button type="submit">Create Stack</Button>
        </form>
      </Form>
    </div>
  )
}
