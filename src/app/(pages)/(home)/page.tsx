import StackGridWrapper from "@/components/StackCardGrid/StackGridWrapper"
import { Suspense } from "react"
import NewUserMsg from "./NewUserMsg"

export default async function Home() {
  return (
    <>
      <Suspense fallback={<div />}>
        <NewUserMsg />
      </Suspense>
      <StackGridWrapper title="Public Stacks" />
    </>
  )
}
