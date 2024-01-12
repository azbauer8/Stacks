import { Suspense } from "react"

import StackGrid from "@/components/StackGrid"

export default async function Index() {
  return (
    <Suspense fallback={<div />}>
      <StackGrid />
    </Suspense>
  )
}
