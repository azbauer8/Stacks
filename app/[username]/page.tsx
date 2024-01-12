import { Suspense } from "react"

import UserPage from "@/app/[username]/User"

export default async function UserPageLayout({
  params,
}: {
  params: { username: string }
}) {
  return (
    <Suspense fallback={<div />}>
      <UserPage username={params.username} />
    </Suspense>
  )
}
