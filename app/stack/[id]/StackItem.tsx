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
  title,
  description,
  link,
}: {
  header: string
  iconPath: string
  icon: string | null
  title: string
  description: string | null
  link: string | null
}) {
  return (
    <Card className="hover:bg-secondary">
      <Link href={link ? link : "/"}>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              {icon ? (
                <Image
                  src={`/icons/${iconPath}/${icon}`}
                  alt={title}
                  width="32"
                  height="32"
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
            <Badge className="w-fit rounded-md px-2 py-1 text-sm">
              {header}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <CardDescription>{description}</CardDescription>
        </CardContent>
      </Link>
    </Card>
  )
}
