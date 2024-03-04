import { Card, CardBody, CardHeader, Skeleton } from "@nextui-org/react"

export default function Loading() {
  return (
    <div className="mx-auto px-0.5">
      <div className="mb-4 space-y-2">
        <div className="flex items-center justify-between">
          <Skeleton className="h-8 w-52 rounded-lg" />
        </div>
        <div className="flex flex-wrap items-center justify-between text-sm">
          <Skeleton className="h-6 w-32 rounded-lg" />
          <div className="w-12" />
          <Skeleton className="h-4 w-24 rounded-lg" />
        </div>
      </div>
      <div className="space-y-2.5">
        <Skeleton className="h-4 w-4/6 rounded-lg" />
        <Skeleton className="h-4 w-56 rounded-lg" />
      </div>
      <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2">
        <StackItemSkeleton />
        <StackItemSkeleton />
        <StackItemSkeleton />
        <StackItemSkeleton />
        <StackItemSkeleton />
        <StackItemSkeleton />
        <StackItemSkeleton />
      </div>
    </div>
  )
}

function StackItemSkeleton() {
  return (
    <Card className="h-full border-2 border-divider/10 p-1">
      <CardHeader className="flex-col items-start gap-2.5">
        <Skeleton className="h-5 w-20 rounded-lg" />
        <div className="flex items-center space-x-3">
          <Skeleton className="size-9 rounded-lg" />
          <Skeleton className="h-7 w-36 rounded-lg" />
        </div>
      </CardHeader>
      <CardBody className="px-3 pb-4">
        <Skeleton className="h-4 w-4/6 rounded-lg" />
      </CardBody>
    </Card>
  )
}
