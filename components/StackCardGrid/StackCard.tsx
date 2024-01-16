import Image from "next/image"
import Link from "next/link"
import { FormattedStack } from "@/utils/querySupabase"

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default async function StackCard({ stack }: { stack: FormattedStack }) {
  return (
    <Link href={`/stack/${stack.id}`}>
      <Card className="flex flex-col justify-between hover:bg-secondary">
        <CardHeader className="space-y-1">
          <CardTitle>{stack.title}</CardTitle>
          <div className="flex justify-between text-sm text-muted-foreground">
            <h2>
              By{" "}
              <span className="text-card-foreground">
                {stack.user?.user_name}
              </span>
            </h2>
            <span>Updated {stack.updated_at}</span>
          </div>
        </CardHeader>
        <CardContent className="pb-2.5 text-sm text-muted-foreground">
          {stack.description}
        </CardContent>
        <CardFooter className="pb-4">
          <div className="flex items-center gap-4">
            {stack.language && (
              <Image
                src={`/icons/${stack.language.icon_path}/${stack.language.icon}`}
                alt={stack.language.title}
                width="24"
                height="24"
                className={stack.language.has_dark_icon ? "dark:invert" : ""}
              />
            )}
            {stack.framework && (
              <Image
                src={`/icons/${stack.framework.icon_path}/${stack.framework.icon}`}
                alt={stack.framework.title}
                width="24"
                height="24"
                className={stack.framework.has_dark_icon ? "dark:invert" : ""}
              />
            )}
            {stack.meta_framework && (
              <Image
                src={`/icons/${stack.meta_framework.icon_path}/${stack.meta_framework.icon}`}
                alt={stack.meta_framework.title}
                width="24"
                height="24"
                className={
                  stack.meta_framework.has_dark_icon ? "dark:invert" : ""
                }
              />
            )}
            {stack.styling && (
              <Image
                src={`/icons/${stack.styling.icon_path}/${stack.styling.icon}`}
                alt={stack.styling.title}
                width="24"
                height="24"
                className={stack.styling.has_dark_icon ? "dark:invert" : ""}
              />
            )}
            {stack.ui_library && (
              <Image
                src={`/icons/${stack.ui_library.icon_path}/${stack.ui_library.icon}`}
                alt={stack.ui_library.title}
                width="24"
                height="24"
                className={stack.ui_library.has_dark_icon ? "dark:invert" : ""}
              />
            )}
            {stack.database && (
              <Image
                src={`/icons/${stack.database.icon_path}/${stack.database.icon}`}
                alt={stack.database.title}
                width="24"
                height="24"
                className={stack.database.has_dark_icon ? "dark:invert" : ""}
              />
            )}
            {stack.backend_framework && (
              <Image
                src={`/icons/${stack.backend_framework.icon_path}/${stack.backend_framework.icon}`}
                alt={stack.backend_framework.title}
                width="24"
                height="24"
                className={
                  stack.backend_framework.has_dark_icon ? "dark:invert" : ""
                }
              />
            )}
            {stack.other_libraries &&
              stack.other_libraries.map((library) => (
                <Image
                  key={library.id}
                  src={`/icons/${library.icon_path}/${library.icon}`}
                  alt={library.title}
                  width="24"
                  height="24"
                  className={library.has_dark_icon ? "dark:invert" : ""}
                />
              ))}
          </div>
        </CardFooter>
      </Card>
    </Link>
  )
}
