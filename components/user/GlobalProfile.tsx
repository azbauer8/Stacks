import { Database, Tables } from "@/types/supabase";
import { createClient } from "@/utils/supabase/server";
import { SupabaseClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default async function GlobalProfile({ user }: { user: Tables<"users"> }) {
  const cookieStore = cookies();
  const supabase: SupabaseClient<Database> = createClient(cookieStore);
  const { data: stacks } = await supabase.from("stacks").select().eq("user_id", user.id).eq("visibility", "public");
  return (
    <div className="flex flex-col gap-3">
      <div className="flex gap-3 items-center">
        <Avatar className="size-28">
          <AvatarImage src={user.avatar as string} alt={user.name as string} />
          <AvatarFallback>{user.name.match(/\b(\w)/g)?.join("")}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col gap-1">
          <h1 className="text-4xl font-bold">{user.name}</h1>
          <h2>@{user.user_name}</h2>
        </div>
      </div>
      <pre>{JSON.stringify(stacks, null, 2)}</pre>
    </div>
  );
}
