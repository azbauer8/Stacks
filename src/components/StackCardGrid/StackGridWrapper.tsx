import { Tables } from "@/types/supabase"
import { Suspense } from "react"
import Loader from "../Loader"
import StackCardGrid from "./StackCardGrid"

export default function StackGridWrapper({
  title,
  user,
}: { title: string; user?: Tables<"users"> }) {
  return (
    <div className="md:mx-5 space-y-3">
      <h2 className="text-3xl font-bold leading-tight tracking-tighter">
        {title}
      </h2>
      <Suspense fallback={<Loader />}>
        <StackCardGrid user={user} />
      </Suspense>
    </div>
  )
}
