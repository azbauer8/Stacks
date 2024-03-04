import { Suspense } from "react"
import { Tables } from "@/supabase/dbTypes"

import StackCardGrid from "./StackCardGrid"
import StackGridLoader from "./StackGridLoader"

export default function StackGridWrapper({
  title,
  user,
}: {
  title: string
  user?: Tables<"users">
}) {
  return (
    <div className="space-y-3 md:mx-5">
      <h2 className="text-3xl font-bold leading-tight tracking-tighter">
        {title}
      </h2>
      <Suspense fallback={<StackGridLoader />}>
        <StackCardGrid user={user} />
      </Suspense>
    </div>
  )
}
