import { FindUser, GetAuthUser } from "@/utils/querySupabase"

export default async function UserPageLayout({
  globalProfile,
  personalProfile,
  params,
}: {
  globalProfile: React.ReactNode
  personalProfile: React.ReactNode
  params: { username: string }
}) {
  const user = await FindUser(params.username)

  if (user?.length) {
    const authUser = await GetAuthUser()

    if (authUser && authUser.id === user[0].id) {
      // show separate page for current user (has editing features)
      return <>{personalProfile}</>
    }
    // show global profile if not current user
    return <>{globalProfile}</>
  } else {
    // TODO: show error page if not found
    return <div>User not found</div>
  }
}
