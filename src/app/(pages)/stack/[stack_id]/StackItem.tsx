import { Route } from "next"
import Image from "next/image"
import Link from "next/link"
import { Avatar, Card, CardBody, CardHeader, Chip } from "@nextui-org/react"

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
    <Card className="h-full border-2 border-transparent p-1 hover:border-divider hover:bg-default-100">
      <Link href={link ? (link as Route) : "/"}>
        <CardHeader className="flex-col items-start gap-2.5">
          <Chip variant="flat" size="sm" radius="sm">
            {header}
          </Chip>
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
              <Avatar size="lg" name={title.match(/\b(\w)/g)?.join("")} />
            )}
            <h1 className="text-xl font-medium">{title}</h1>
          </div>
        </CardHeader>
        <CardBody className="px-3">{description}</CardBody>
      </Link>
    </Card>
  )
}
