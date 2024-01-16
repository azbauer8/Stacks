import { Suspense } from "react"

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

import StackCardGrid from "."

export default function CardGridLoader({
  user,
  personal,
}: {
  user?: string
  personal?: boolean
}) {
  return (
    <div>
      <Suspense fallback={<Loading />}>
        <StackCardGrid user={user} personal={personal} />
      </Suspense>
    </div>
  )
}

export function Loading() {
  return (
    <div className="grid grid-cols-1 gap-5 md:mx-5 md:grid-cols-2">
      <Card className="flex h-full w-full flex-col justify-between">
        <CardHeader className="space-y-2">
          <CardTitle>
            <Skeleton className="h-6 w-[120px] rounded-xl" />
          </CardTitle>
          <div className="flex justify-between text-sm text-muted-foreground">
            <Skeleton className="h-3 w-[70px] rounded-xl" />
            <Skeleton className="h-3 w-[100px] rounded-xl" />
          </div>
        </CardHeader>
        <CardContent className="pb-2.5 text-sm text-muted-foreground">
          <Skeleton className="h-4 w-64 rounded-xl" />
        </CardContent>
        <CardFooter className="pb-4">
          <div className="flex items-center gap-4">
            <Skeleton className="h-8 w-8 rounded-full" />
            <Skeleton className="h-8 w-8 rounded-full" />
            <Skeleton className="h-8 w-8 rounded-full" />
            <Skeleton className="h-8 w-8 rounded-full" />
            <Skeleton className="h-8 w-8 rounded-full" />
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
