import { FormattedStack } from "@/types/stack"
import Link from "next/link"

import { Tables } from "@/types/supabase"
import {
  Avatar,
  AvatarGroup,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
} from "@nextui-org/react"
import { Tooltip } from "@nextui-org/react"
import { Route } from "next"

export default async function StackCard({ stack }: { stack: FormattedStack }) {
  const iconPool = [
    "language",
    "framework",
    "meta_framework",
    "styling",
    "ui_library",
    "backend_framework",
    "database",
  ]
  const icons: Tables<"frameworks">[] = []
  for (const type of iconPool) {
    // @ts-ignore
    if (stack[type]) {
      // @ts-ignore
      icons.push(stack[type])
    }
  }
  if (stack.other_libraries) {
    stack.other_libraries.map((other_library) => {
      icons.push(other_library)
    })
  }

  return (
    <Link href={`/stack/${stack.id}` as Route}>
      <Card className="h-full p-1 border-2 border-transparent hover:border-divider hover:bg-default-100">
        <CardHeader className="flex-col items-start gap-1.5">
          <h1 className="text-2xl font-semibold leading-none tracking-tight">
            {stack.title}
          </h1>
          <div className="flex flex-wrap justify-between text-sm text-default-500 w-full">
            <h2>
              By{" "}
              <span className="text-foreground">{stack.user?.user_name}</span>
            </h2>
            <div className="w-12" />

            <span>Updated {stack.updated_at}</span>
          </div>
        </CardHeader>
        <CardBody className="text-sm text-default-500">
          {stack.description}
        </CardBody>
        <CardFooter>
          <AvatarGroup isBordered max={6} size="sm" className="pl-3">
            {icons.map((icon) => (
              <Tooltip key={icon.title} content={icon.title}>
                <Avatar
                  src={icon.icon as string}
                  classNames={{
                    img: `${icon.has_dark_icon && "dark:invert"}`,
                  }}
                  imgProps={{
                    loading: "eager",
                  }}
                />
              </Tooltip>
            ))}
          </AvatarGroup>
        </CardFooter>
      </Card>
    </Link>
  )
}
