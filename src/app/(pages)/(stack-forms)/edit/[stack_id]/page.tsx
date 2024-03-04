import { Suspense } from "react"
import { notFound } from "next/navigation"
import { editStack } from "@/supabase/actions"
import {
  getAuthUser,
  getFormFieldOptions,
  getStackById,
} from "@/supabase/queries"

import { textVariant } from "@/components/general/Typography"
import StackForm from "@/app/(pages)/(stack-forms)/StackForm"
import StackFormLoader from "@/app/(pages)/(stack-forms)/StackFormLoader"

export default function EditStackPage({
  params,
}: {
  params: { stack_id: string }
}) {
  return (
    <div className="space-y-5">
      <h1 className={textVariant({ variant: "h1" })}>Edit Stack</h1>
      <Suspense fallback={<StackFormLoader />}>
        <EditStack stackId={params.stack_id} />
      </Suspense>
    </div>
  )
}

async function EditStack({ stackId }: { stackId: string }) {
  const authUserFn = getAuthUser()
  const stackDataFn = getStackById({ id: stackId })
  const [authUser, stackData] = await Promise.all([authUserFn, stackDataFn])

  if (
    !authUser ||
    !stackData ||
    stackData?.user?.user_name !== authUser.user_metadata?.user_name
  ) {
    return notFound()
  }
  const formFields = await getFormFieldOptions()
  const submitAction = editStack.bind(null, {
    stackId,
    formFieldOptions: formFields,
  })

  return (
    <StackForm
      fieldOptions={formFields}
      initialData={stackData}
      submitAction={submitAction}
    />
  )
}
