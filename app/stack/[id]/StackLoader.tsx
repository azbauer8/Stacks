import { Suspense } from "react"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

import StackPage from "./StackPage"

export default function StackLoader({ id }: { id: string }) {
  return (
    <>
      <Suspense fallback={<Loading />}>
        <StackPage id={id} />
      </Suspense>
    </>
  )
}

function Loading() {
  return (
    <div className="mx-auto mt-6 space-y-8 px-0.5">
      <div>
        <Skeleton className="h-8 w-[170px] rounded-xl" />
        <div className="mb-2 mt-1 flex items-center justify-between space-y-1.5 text-sm">
          <Skeleton className="h-5 w-20 rounded-xl" />
          <div className="text-right text-muted-foreground">
            <Skeleton className="h-5 w-32 rounded-xl" />
          </div>
        </div>
        <Skeleton className="h-4 w-96 rounded-xl" />
      </div>
      <div className="space-y-3">
        <Card className="hover:bg-secondary">
          <CardHeader className="pb-2.5">
            <div className="flex items-center space-x-3">
              <Skeleton className="h-10 w-10 rounded-full" />
              <CardTitle>
                <Skeleton className="h-6 w-[130px] rounded-xl" />
              </CardTitle>
            </div>
            <Skeleton className="ml-14 h-5 w-20 rounded-md px-1.5" />
          </CardHeader>
          <CardContent className="pb-4">
            <CardDescription>
              <Skeleton className="h-4 w-96 rounded-xl" />
            </CardDescription>
          </CardContent>
        </Card>
        <Card className="hover:bg-secondary">
          <CardHeader className="pb-2.5">
            <div className="flex items-center space-x-3">
              <Skeleton className="h-10 w-10 rounded-full" />
              <CardTitle>
                <Skeleton className="h-6 w-[130px] rounded-xl" />
              </CardTitle>
            </div>
            <Skeleton className="ml-14 h-5 w-20 rounded-md px-1.5" />
          </CardHeader>
          <CardContent className="pb-4">
            <CardDescription>
              <Skeleton className="h-4 w-96 rounded-xl" />
            </CardDescription>
          </CardContent>
        </Card>
        <Card className="hover:bg-secondary">
          <CardHeader className="pb-2.5">
            <div className="flex items-center space-x-3">
              <Skeleton className="h-10 w-10 rounded-full" />
              <CardTitle>
                <Skeleton className="h-6 w-[130px] rounded-xl" />
              </CardTitle>
            </div>
            <Skeleton className="ml-14 h-5 w-20 rounded-md px-1.5" />
          </CardHeader>
          <CardContent className="pb-4">
            <CardDescription>
              <Skeleton className="h-4 w-96 rounded-xl" />
            </CardDescription>
          </CardContent>
        </Card>
        <Card className="hover:bg-secondary">
          <CardHeader className="pb-2.5">
            <div className="flex items-center space-x-3">
              <Skeleton className="h-10 w-10 rounded-full" />
              <CardTitle>
                <Skeleton className="h-6 w-[130px] rounded-xl" />
              </CardTitle>
            </div>
            <Skeleton className="ml-14 h-5 w-20 rounded-md px-1.5" />
          </CardHeader>
          <CardContent className="pb-4">
            <CardDescription>
              <Skeleton className="h-4 w-96 rounded-xl" />
            </CardDescription>
          </CardContent>
        </Card>
        <Card className="hover:bg-secondary">
          <CardHeader className="pb-2.5">
            <div className="flex items-center space-x-3">
              <Skeleton className="h-10 w-10 rounded-full" />
              <CardTitle>
                <Skeleton className="h-6 w-[130px] rounded-xl" />
              </CardTitle>
            </div>
            <Skeleton className="ml-14 h-5 w-20 rounded-md px-1.5" />
          </CardHeader>
          <CardContent className="pb-4">
            <CardDescription>
              <Skeleton className="h-4 w-96 rounded-xl" />
            </CardDescription>
          </CardContent>
        </Card>
        <div />
      </div>
    </div>
  )
}
