import { Suspense } from "react"

import UserLoader from "@/components/Loaders/UserLoader"
import UserPage from "@/app/[username]/User"

export default async function UserPageLayout({
  params,
}: {
  params: { username: string }
}) {
  return (
    <Suspense fallback={<UserLoader />}>
      <UserPage username={params.username} />
    </Suspense>
  )
}
