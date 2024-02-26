import { LandingHeader, LandingTitle } from "@/components/LandingHeader"
import StackGridWrapper from "@/components/StackCardGrid/StackGridWrapper"

export default async function Home() {
  return (
    <>
      <LandingHeader>
        <LandingTitle>
          A repository of web dev stacks for you to catalog and discover.
        </LandingTitle>
      </LandingHeader>
      <StackGridWrapper title="Public Stacks" />
    </>
  )
}
