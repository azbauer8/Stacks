import { cookies } from "next/headers";
import LoginButton from "./LoginButton";
import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import ProfileMenu from "./ProfileMenu";

export default async function Nav() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
      <div className="w-full max-w-4xl flex justify-between items-center p-3 text-sm">
        <Link href="/">Stacks</Link>
        <div>{user ? <ProfileMenu /> : <LoginButton />}</div>
      </div>
    </nav>
  );
}
