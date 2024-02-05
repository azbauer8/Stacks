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
  icon,
  hasDarkIcon,
  title,
  description,
  link,
}: {
  header: string
  icon: string | null
  hasDarkIcon: boolean
  title: string
  description: string | null
  link: string | null
}) {
  return (
    <Card className="hover:bg-accent shadow-md">
      <Link href={link ? link : "/"}>
        <CardHeader className="space-y-2 p-3">
          <Badge
            variant={"secondary"}
            className="w-fit rounded-md px-1.5 text-xs"
          >
            {header}
          </Badge>
          <div className="flex items-center space-x-3">
            {icon ? (
              <Image
                src={icon}
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
            <CardTitle className="text-xl">{title}</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="px-3 pb-2">
          <CardDescription>{description}</CardDescription>
        </CardContent>
      </Link>
    </Card>
  )
}
