import StackLoader from "@/app/stack/[id]/StackLoader"

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
      <StackLoader id={params.id} />
    </StackModalWrapper>
  )
}

export default StackModalPage
