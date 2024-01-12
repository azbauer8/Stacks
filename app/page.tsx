import { Suspense } from "react"

import StackGridLoader from "@/components/Loaders/StackGridLoader"
import StackGrid from "@/components/StackGrid"

export default async function Index() {
  return (
    <Suspense fallback={<StackGridLoader />}>
      <StackGrid />
    </Suspense>
  )
}
