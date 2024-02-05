import { FormattedStack } from "@/types/stack"
import Image from "next/image"
import Link from "next/link"

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Tables } from "@/types/supabase"

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
  let count = 0
  const COUNT_LIMIT = 6
  for (const type of iconPool) {
    if (count === COUNT_LIMIT) break
    // @ts-ignore
    if (stack[type]) {
      // @ts-ignore
      icons.push(stack[type])
      count = count + 1
    }
  }
  if (count < COUNT_LIMIT && stack.other_libraries) {
    stack.other_libraries.map((other_library) => {
      if (count === COUNT_LIMIT) return
      icons.push(other_library)
      count = count + 1
    })
  }

  return (
    <Link href={`/stack/${stack.id}`}>
      <Card className="flex h-full flex-col hover:bg-accent drop-shadow-md">
        <CardHeader className="space-y-1">
          <CardTitle>{stack.title}</CardTitle>
          <div className="flex flex-wrap justify-between gap-1 text-sm text-muted-foreground">
            <h2>
              By{" "}
              <span className="text-card-foreground">
                {stack.user?.user_name}
              </span>
            </h2>
            <div className="w-12" />

            <span>Updated {stack.updated_at}</span>
          </div>
        </CardHeader>
        <div className="flex h-full flex-col justify-between">
          <CardContent className="pb-2.5 text-sm text-muted-foreground">
            {stack.description}
          </CardContent>
          <CardFooter className="pb-4">
            <div className="flex items-center gap-4">
              {icons.map((icon) => (
                <Image
                  key={icon.title}
                  src={icon.icon as string}
                  alt={icon.title}
                  width="24"
                  height="24"
                  className={icon.has_dark_icon ? "dark:invert" : ""}
                />
              ))}
            </div>
          </CardFooter>
        </div>
      </Card>
    </Link>
  )
}
