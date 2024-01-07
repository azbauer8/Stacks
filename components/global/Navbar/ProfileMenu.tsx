import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { User } from "@supabase/supabase-js";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ThemeToggleSub } from "./ThemeToggleSub";
import { Button, UnstyledButton } from "@/components/ui/button";

export default async function ProfileMenu({ user }: { user: User }) {
  const signOut = async () => {
    "use server";

    const cookieStore = cookies();
    const supabase = createClient(cookieStore);
    await supabase.auth.signOut();
    return redirect("/");
  };

  const goToProfile = async () => {
    "use server";
    return redirect(`/user/${user.user_metadata.preferred_username}`);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage src={user.user_metadata.avatar_url} />
          <AvatarFallback>{user.user_metadata.name.match(/\b(\w)/g).join("")}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem className="mx-0" action>
          <form action={goToProfile} className="w-full mx-0">
            <UnstyledButton className="w-full">Profile</UnstyledButton>
          </form>
        </DropdownMenuItem>
        <ThemeToggleSub />
        <DropdownMenuItem className="mx-0" action>
          <form action={signOut} className="w-full mx-0">
            <UnstyledButton className="w-full">Sign Out</UnstyledButton>
          </form>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
