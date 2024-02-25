import {
  LandingDescription,
  LandingTitle,
  MotionLandingHeader,
} from "@/components/LandingHeader"
import { GetAuthUser } from "@/utils/querySupabase"

export default async function NewUserMsg() {
  const user = await GetAuthUser()

  if (user) return

  return (
    <MotionLandingHeader>
      <LandingTitle>
        A repository of web dev stacks for you to catalog and discover.
      </LandingTitle>
      <LandingDescription>Sign in to create your own!</LandingDescription>
    </MotionLandingHeader>
  )
}
