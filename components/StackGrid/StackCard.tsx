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
      <Card className="h-full w-full max-w-md">
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
        <CardContent className="text-sm text-muted-foreground">
          {stack.description}
        </CardContent>
        <CardFooter>
          <div className="flex items-center gap-4">
            {stack.language && (
              <Image
                src={`/icons/languages/${stack.language.icon}`}
                alt="Language"
                width="24"
                height="24"
              />
            )}
            {stack.framework && (
              <Image
                src={`/icons/frameworks/${stack.framework.icon}`}
                alt="Framework"
                width="24"
                height="24"
              />
            )}
            {stack.meta_framework && (
              <Image
                src={`/icons/meta_frameworks/${stack.meta_framework.icon}`}
                alt="Meta Framework"
                width="24"
                height="24"
              />
            )}
            {stack.styling && (
              <Image
                src={`/icons/stylings/${stack.styling.icon}`}
                alt="Styling"
                width="24"
                height="24"
              />
            )}
            {stack.ui_library && (
              <Image
                src={`/icons/ui_libraries/${stack.ui_library.icon}`}
                alt="UI Library"
                width="24"
                height="24"
              />
            )}
            {stack.database && (
              <Image
                src={`/icons/databases/${stack.database.icon}`}
                alt="Database"
                width="24"
                height="24"
              />
            )}
            {stack.backend_framework && (
              <Image
                src={`/icons/backend_frameworks/${stack.backend_framework.icon}`}
                alt="Backend Framework"
                width="24"
                height="24"
              />
            )}
            {stack.other_libraries &&
              stack.other_libraries.map((library) => (
                <Image
                  key={library.id}
                  src={`/icons/other_libraries/${library.icon}`}
                  alt="Backend Framework"
                  width="24"
                  height="24"
                />
              ))}
          </div>
        </CardFooter>
      </Card>
    </Link>
  )
}
