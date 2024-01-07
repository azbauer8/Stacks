import { cookies } from "next/headers";
import LoginButton from "./LoginButton";
import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import ProfileMenu from "./ProfileMenu";
import { ThemeToggle } from "./ThemeToggle";
import { Button } from "@/components/ui/button";

export default async function Nav() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
      <div className="w-full max-w-4xl flex justify-between items-center p-3 text-sm">
        <div className="flex gap-2 items-center">
          <Link href="/" className="font-bold text-xl">
            📚 Stacks
          </Link>
          <Button variant={"link"}>
            <Link href="/stacks">Public</Link>
          </Button>
        </div>
        {user ? (
          <ProfileMenu user={user} />
        ) : (
          <div className="flex gap-1.5 items-center">
            <ThemeToggle />
            <LoginButton />
          </div>
        )}
      </div>
    </nav>
  );
}
