import Link from "next/link"
import { FindUserById } from "@/utils/querySupabase"

import { Tables } from "@/types/supabase"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default async function StackCard({
  stack,
}: {
  stack: Tables<"stacks">
}) {
  const user = await FindUserById(stack.user_id)

  return (
    <>
      <Link href={`/stack/${stack.id}`}>
        <Card>
          <CardHeader>
            <div className="space-y-1.5">
              <CardTitle>{stack.title}</CardTitle>
              <CardDescription>{stack.description}</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between text-sm text-muted-foreground">
              <Badge className="tracking-wide" variant={"outline"}>
                @{user?.user_name}
              </Badge>
              <div>Updated {new Date(stack.updated_at).toDateString()}</div>
            </div>
          </CardContent>
        </Card>
      </Link>
    </>
  )
}
