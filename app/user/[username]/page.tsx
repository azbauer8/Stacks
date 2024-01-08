import GlobalProfile from "@/components/pages/user";
import PersonalProfile from "@/components/pages/user/PersonalProfile";
import { Database } from "@/types/supabase";
import { createClient } from "@/utils/supabase/server";
import { SupabaseClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";

export default async function UserProfile({ params }: { params: { username: string } }) {
  const cookieStore = cookies();
  const supabase: SupabaseClient<Database> = createClient(cookieStore);

  // check if user exists
  const { data: user } = await supabase.from("users").select().eq("user_name", params.username);

  if (user?.length) {
    const { data: authUser } = await supabase.auth.getUser();

    if (authUser.user && authUser.user.id === user[0].id) {
      // show separate page for current user (has editing features)
      return <PersonalProfile user={user[0]} />;
    }

    // show global profile if not current user
    return <GlobalProfile user={user[0]} />;
  } else {
    // show error page if not found
    return <div>User not found</div>;
  }
}
