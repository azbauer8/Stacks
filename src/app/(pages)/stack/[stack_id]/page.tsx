import { Route } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { GetAuthUser, GetStackById } from "@/utils/querySupabase"
import { Button, Chip, Link as NextUILink } from "@nextui-org/react"
import { LockIcon } from "lucide-react"

import { Tables } from "@/types/supabase"

import DeleteStack from "./DeleteStack"
import StackItem from "./StackItem"

type StackElement = Tables<"frameworks"> & { header: string }

export default async function StackPage({
  params,
}: {
  params: { stack_id: string }
}) {
  const stack = await GetStackById({ id: params.stack_id })

  if (stack) {
    const authUser = await GetAuthUser()
    const allStackElements = [
      { type: "language", header: "Language" },
      { type: "framework", header: "Framework" },
      { type: "meta_framework", header: "Meta Framework" },
      { type: "styling", header: "Styling" },
      { type: "ui_library", header: "UI Library" },
      { type: "backend_framework", header: "Backend Framework" },
      { type: "database", header: "Database" },
      { type: "other_libraries", header: "Other Libraries" },
    ]
    const stackElements: StackElement[] = []
    for (const stackElement of allStackElements) {
      // TODO: figure out how to do this without surpressing ts errors
      // @ts-expect-error: this is a hack to get around the fact that the types are not correct
      if (stack[stackElement.type]) {
        if (stackElement.type === "other_libraries") {
          stack[stackElement.type].map((other_library) => {
            stackElements.push({
              ...other_library,
              header: other_library.other_library_category?.title
                ? other_library.other_library_category.title
                : "Misc. Library",
            })
          })
        } else {
          stackElements.push({
            // @ts-expect-error: this is a hack to get around the fact that the types are not correct
            ...stack[stackElement.type],
            header: stackElement.header,
          })
        }
      }
    }
    return (
      <div className="mx-auto px-0.5">
        {authUser?.id === stack.user?.id && (
          <div className="flex justify-end space-x-2.5 pb-3">
            <Button
              as={Link}
              href={`/edit/${stack.id}`}
              size="sm"
              variant="ghost"
              className="font-medium"
            >
              Edit
            </Button>
            <DeleteStack
              user={authUser?.user_metadata.user_name}
              stackId={stack.id}
            />
          </div>
        )}
        <div className="mb-4 space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-bold leading-none tracking-tight">
              {stack.title}
            </h2>
            {stack.visibility === "private" && <LockIcon />}
          </div>
          <div className="flex flex-wrap items-center justify-between text-sm">
            <Link href={`/user/${stack.user?.user_name}` as Route}>
              <Chip
                variant="faded"
                radius="sm"
                className="hover:bg-default-200"
              >
                {stack.user?.user_name}
              </Chip>
            </Link>
            <div className="w-12" />
            <div className="text-right text-default-500">
              Updated <span className="font-medium">{stack.updated_at}</span>
            </div>
          </div>
        </div>
        <p className="text-sm">{stack.description}</p>
        {stack.link && (
          <NextUILink
            href={stack.link}
            color="foreground"
            isExternal
            showAnchorIcon
            className="mt-2"
          >
            {stack.link}
          </NextUILink>
        )}
        <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2">
          {stackElements.map((stackElement) => (
            <StackItem
              key={stackElement.id}
              header={stackElement.header}
              icon={stackElement.icon}
              hasDarkIcon={stackElement.has_dark_icon}
              title={stackElement.title}
              description={stackElement.description}
              link={stackElement.link}
            />
          ))}
        </div>
      </div>
    )
  }
  return notFound()
}
