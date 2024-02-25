import StackGridWrapper from "@/components/StackCardGrid/StackGridWrapper"
import {
  LandingTitle,
  MotionLandingHeader,
} from "@/components/LandingHeader"
export default async function Home() {
  return (
    <>
      <MotionLandingHeader>
        <LandingTitle>
          A repository of web dev stacks for you to catalog and discover.
        </LandingTitle>
      </MotionLandingHeader>
      <StackGridWrapper title="Public Stacks" />
    </>
  )
}
