import { Suspense } from "react"
import { Metadata } from "next"
import { notFound } from "next/navigation"
import { createStack } from "@/supabase/actions"
import { getAuthUser, getFormFieldOptions } from "@/supabase/queries"

import { textVariant } from "@/components/general/Typography"
import StackForm from "@/app/(pages)/(stack-forms)/StackForm"
import StackFormLoader from "@/app/(pages)/(stack-forms)/StackFormLoader"

export const metadata: Metadata = {
  title: "New",
}

export default function NewStackPage() {
  return (
    <div className="space-y-5">
      <h1 className={textVariant({ variant: "h1" })}>Create Stack</h1>
      <Suspense fallback={<StackFormLoader />}>
        <NewStack />
      </Suspense>
    </div>
  )
}

async function NewStack() {
  const authUser = await getAuthUser()
  if (!authUser) {
    return notFound()
  }
  const formFields = await getFormFieldOptions()
  const submitAction = createStack.bind(null, {
    user_id: authUser.id,
    formFieldOptions: formFields,
  })

  return <StackForm fieldOptions={formFields} submitAction={submitAction} />
}
