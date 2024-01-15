import Image from "next/image"
import Link from "next/link"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default function StackItem({
  header,
  iconPath,
  icon,
  hasDarkIcon,
  title,
  description,
  link,
}: {
  header: string
  iconPath: string | null
  icon: string | null
  hasDarkIcon: boolean
  title: string
  description: string | null
  link: string | null
}) {
  return (
    <Card className="hover:bg-secondary">
      <Link href={link ? link : "/"}>
        <CardHeader className="pb-2.5">
          <div className="flex items-center space-x-3">
            {icon ? (
              <Image
                src={`/icons/${iconPath}/${icon}`}
                alt={title}
                width="32"
                height="32"
                className={hasDarkIcon ? "dark:invert" : ""}
              />
            ) : (
              <Avatar className="size-8">
                <AvatarFallback>
                  {title.match(/\b(\w)/g)?.join("")}
                </AvatarFallback>
              </Avatar>
            )}
            <CardTitle>{title}</CardTitle>
          </div>
          <Badge className="ml-11 w-fit rounded-md px-1.5 text-sm">
            {header}
          </Badge>
        </CardHeader>
        <CardContent className="pb-4">
          <CardDescription>{description}</CardDescription>
        </CardContent>
      </Link>
    </Card>
  )
}