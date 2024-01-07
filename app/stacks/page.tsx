import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { Database } from "@/types/supabase";
import { SupabaseClient } from "@supabase/supabase-js";

export default async function PublicStacks() {
  const cookieStore = cookies();
  const supabase: SupabaseClient<Database> = createClient(cookieStore);
  const { data: stacks } = await supabase.from("stacks").select().eq("visibility", "public");

  return <pre>{JSON.stringify(stacks, null, 2)}</pre>;
}
