import { Suspense } from "react"

import { Skeleton } from "@/components/ui/skeleton"

import StackController from "./StackController"

export default function StackLoader({ id }: { id: string }) {
  return (
    <Suspense fallback={<Loading />}>
      <StackController id={id} />
    </Suspense>
  )
}

function Loading() {
  return (
    <>
      <div className="space-y-2">
        <Skeleton className="h-6 w-[90px] rounded-xl" />

        <Skeleton className="h-4 w-56 rounded-xl" />
      </div>

      <div className="flex justify-between text-sm text-muted-foreground">
        <Skeleton className="h-5 w-[90px] rounded-xl" />
        <Skeleton className="h-5 w-32 rounded-xl" />
      </div>
    </>
  )
}
