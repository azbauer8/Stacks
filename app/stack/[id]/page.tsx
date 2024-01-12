import { Suspense } from "react"

import Stack from "./Stack"

export default async function StackPage({
  params,
}: {
  params: { id: string }
}) {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <Stack id={params.id} />
    </Suspense>
  )
}
