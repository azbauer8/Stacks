import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { Database } from "@/types/supabase";
import { SupabaseClient } from "@supabase/supabase-js";
import StackGrid from "@/components/StackGrid";

export default async function PublicStacks() {
  const cookieStore = cookies();
  const supabase: SupabaseClient<Database> = createClient(cookieStore);
  const { data: stacks } = await supabase.from("stacks").select().eq("visibility", "public");

  if (stacks) return <StackGrid stacks={stacks} />;
}
