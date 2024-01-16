import { Skeleton } from "@/components/ui/skeleton"
import { Loading } from "@/components/StackCardGrid/CardGridLoader"

export default function UserLoading() {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-3">
        <Skeleton className="size-28 rounded-full" />
        <div className="flex flex-col gap-2.5">
          <Skeleton className="h-10 w-[200px]" />
          <Skeleton className="h-5 w-[90px] rounded-xl" />
        </div>
      </div>
      <Loading />
    </div>
  )
}
