import Image from "next/image"
import { MoreVerticalIcon, PlusCircleIcon } from "lucide-react"

import { buttonVariants } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"

export default function NavLoader() {
  return (
    <nav className="flex h-16 w-full justify-center border-b border-b-foreground/10">
      <div className="flex w-full max-w-4xl items-center justify-between p-3 text-sm">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 text-xl font-bold">
            <Image src="/favicon.png" alt="Favicon" width={32} height={32} />
            <h1>Stacks</h1>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <>
            <div
              className={buttonVariants({
                variant: "ghost",
                size: "icon",
              })}
            >
              <PlusCircleIcon className="size-6" />
            </div>
            <Skeleton className="h-8 w-8 rounded-full" />
          </>

          <div className="w-fit rounded-md px-1 py-2 hover:bg-accent hover:text-accent-foreground">
            <MoreVerticalIcon className="size-[1.3rem]" />
          </div>
        </div>
      </div>
    </nav>
  )
}
