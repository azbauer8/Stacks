import StackGridWrapper from "@/components/StackCardGrid/StackGridWrapper"
import NewUserMsg from "./NewUserMsg"

export default async function Home() {
  return (
    <>
      <NewUserMsg />
      <StackGridWrapper title="Public Stacks" />
    </>
  )
}
