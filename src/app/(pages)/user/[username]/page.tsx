import Link from "next/link"
import { notFound } from "next/navigation"
import { findUser } from "@/supabase/queries"
import { Avatar, Chip } from "@nextui-org/react"
import { GithubIcon } from "lucide-react"

import StackGridWrapper from "@/components/StackCardGrid/StackGridWrapper"

export default async function Home({
  params,
}: {
  params: { username: string }
}) {
  const user = await findUser({ username: params.username })
  if (!user) {
    notFound()
  }
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-3">
        <Avatar
          classNames={{ base: "h-28 w-28" }}
          src={user.avatar as string}
          alt={user.name as string}
          showFallback
        />
        <div className="flex flex-col gap-2.5">
          <h1 className="text-4xl font-bold">{user.name}</h1>
          <Link
            href={`https://github.com/${user.user_name}`}
            target="_blank"
            rel="noreferrer"
          >
            <Chip
              startContent={<GithubIcon className="size-4" />}
              variant="faded"
              radius="sm"
              className="pl-2"
            >
              {user.user_name}
            </Chip>
          </Link>
        </div>
      </div>
      <StackGridWrapper
        title={`${user.name.split(" ")[0]}'s Stacks`}
        user={user}
      />
    </div>
  )
}
