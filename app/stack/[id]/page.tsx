import { Suspense } from "react"

import StackLoader from "@/components/Loaders/StackLoader"

import Stack from "./Stack"

export default async function StackPage({
  params,
}: {
  params: { id: string }
}) {
  return (
    <Suspense fallback={<StackLoader />}>
      <Stack id={params.id} />
    </Suspense>
  )
}
