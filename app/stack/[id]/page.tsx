import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { Database } from "@/types/supabase";
import { SupabaseClient } from "@supabase/supabase-js";
import EditableStack from "@/components/pages/stack/PersonalStack";
import Stack from "@/components/pages/stack";

export default async function StackPage({ params }: { params: { id: string } }) {
  const cookieStore = cookies();
  const supabase: SupabaseClient<Database> = createClient(cookieStore);

  // check if stack exists
  const { data: stack } = await supabase.from("stacks").select().eq("id", params.id);

  if (stack?.length) {
    const { data: authUser } = await supabase.auth.getUser();

    if (authUser.user && authUser.user.id === stack[0].user_id) {
      // show separate page for current user (has editing features)
      return <EditableStack stack={stack[0]} />;
    }

    return <Stack stack={stack[0]} />;
  } else {
    return <div>Stack not found</div>;
  }
}
