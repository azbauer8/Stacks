import { Avatar, Skeleton } from "@nextui-org/react"

export default function Loading() {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-3">
        <Avatar classNames={{ base: "h-28 w-28" }} showFallback />
        <div className="flex flex-col gap-2.5">
          <Skeleton className="h-10 w-52 rounded-lg" />
          <Skeleton className="h-8 w-24 rounded-lg" />
        </div>
      </div>
    </div>
  )
}
