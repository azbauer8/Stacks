"use client"

import { createClient } from "@/utils/supabase/client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useQuery } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"

import BasicInfo from "./FormFields/BasicInfo"
import UseCases from "./FormFields/UseCase"

const formSchema = z.object({
  title: z.string().min(1, {
    message: "Title must be at least 1 character.",
  }),
  description: z.string().optional(),
  link: z.string().url().optional(),
  visibility: z.enum(["public", "private"], {
    required_error: "You need to select a visibility type.",
  }),
  use_case: z.object({ id: z.number(), title: z.string() }).optional(),
})

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
      title: "",
      description: undefined,
      link: undefined,
      visibility: "public",
      use_case: undefined,
    },
  })

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <BasicInfo form={form} />
        <UseCases form={form} />
        <Button type="submit">Create</Button>
      </form>
    </Form>
  )
}
