import { Suspense } from "react"
import { Metadata, ResolvingMetadata } from "next"
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

export async function generateMetadata({
  params,
}: {
  params: { stack_id: string }
}): Promise<Metadata> {
  const stack_id = params.stack_id

  const authUserFn = getAuthUser()
  const stackDataFn = getStackById({ id: stack_id })
  const [authUser, stackData] = await Promise.all([authUserFn, stackDataFn])
  return {
    title:
      authUser && stackData && stackData?.user?.id === authUser.id
        ? `Edit ${stackData.title}`
        : "Not Found",
  }
}

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

  if (!authUser || !stackData || stackData?.user?.id !== authUser.id) {
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
