import {
  Avatar,
  AvatarGroup,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Skeleton,
} from "@nextui-org/react"

export default function StackGridLoader() {
  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
    </div>
  )
}

function SkeletonCard() {
  return (
    <Card className="h-full border-2 border-divider/10 p-1 hover:border-divider hover:bg-default-100">
      <CardHeader className="flex-col items-start gap-2">
        <Skeleton className="h-8 w-40 rounded-lg" />
        <div className="flex w-full flex-wrap justify-between text-sm text-default-500">
          <Skeleton className="h-5 w-24 rounded-lg" />
          <div className="w-12" />

          <Skeleton className="h-5 w-28 rounded-lg" />
        </div>
      </CardHeader>
      <CardBody className="space-y-2.5">
        <Skeleton className="h-4 w-4/5 rounded-lg" />

        <Skeleton className="h-4 w-3/5 rounded-lg" />
      </CardBody>
      <CardFooter>
        <AvatarGroup isBordered size="sm" max={6} className="pl-3">
          <Avatar icon={<Skeleton />} />
          <Avatar icon={<Skeleton />} />
          <Avatar icon={<Skeleton />} />
          <Avatar icon={<Skeleton />} />
          <Avatar icon={<Skeleton />} />
          <Avatar icon={<Skeleton />} />
        </AvatarGroup>
      </CardFooter>
    </Card>
  )
}
