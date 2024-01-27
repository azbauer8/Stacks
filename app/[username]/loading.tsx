import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

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
			<div className="grid grid-cols-1 gap-5 md:mx-5 md:grid-cols-2">
				<SkeletonCard />
				<SkeletonCard />
				<SkeletonCard />
				<SkeletonCard />
			</div>
		</div>
	)
}

function SkeletonCard() {
	return (
		<Card className="flex flex-col justify-between">
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
	)
}
