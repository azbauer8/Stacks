import { GetPublicStacks } from "@/utils/querySupabase"

import StackGrid from "@/components/StackGrid"

export default async function Index() {
  const stacks = await GetPublicStacks()

  if (stacks) return <StackGrid stacks={stacks} />
}
