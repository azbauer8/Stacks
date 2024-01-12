import { Skeleton } from "@/components/ui/skeleton"

export default function StackLoader() {
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
