import { headers, cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";

export default async function LoginButton() {
  const signInWithGithub = async () => {
    "use server";
    const origin = headers().get("origin");
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: `${origin}/auth/callback`,
      },
    });

    if (error) {
      console.error(error);
      return redirect("/");
    }

    redirect(data.url);
  };

  return (
    <form action={signInWithGithub}>
      <Button className="px-1.5 py-2 h-fit">Sign In with Github</Button>
    </form>
  );
}
