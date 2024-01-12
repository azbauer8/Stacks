import { Suspense } from "react"

import StackLoader from "@/components/Loaders/StackLoader"
import Stack from "@/app/stack/[id]/Stack"

import StackModalWrapper from "./StackModalWrapper"

const StackModalPage = async ({
  params,
}: {
  params: {
    id: string
  }
}) => {
  return (
    <StackModalWrapper>
      <Suspense fallback={<StackLoader />}>
        <Stack id={params.id} />
      </Suspense>
    </StackModalWrapper>
  )
}

export default StackModalPage
