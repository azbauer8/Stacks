import { notFound } from "next/navigation"
import { GetAuthUser, GetStackById } from "@/utils/querySupabase"

import StackModal from "@/components/StackPage/StackModal"

interface ModalPageProps {
  params: {
    id: string
  }
}

const StackModalPage = async ({ params }: ModalPageProps) => {
  const stack = await GetStackById(params.id)
  const authUser = await GetAuthUser()
  if (stack?.length) return <StackModal stack={stack[0]} authUser={authUser} />
  else return notFound()
}

export default StackModalPage
