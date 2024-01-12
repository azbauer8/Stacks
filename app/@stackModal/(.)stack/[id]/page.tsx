import { Suspense } from "react"

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
      <Suspense fallback={<p>Loading...</p>}>
        <Stack id={params.id} />
      </Suspense>
    </StackModalWrapper>
  )
}

export default StackModalPage
