import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { type CookieOptions, createServerClient } from "@supabase/ssr";
import { Database } from "@/types/supabase";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/";

  if (code) {
    const cookieStore = cookies();
    const supabase = createServerClient<Database>(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) {
            return cookieStore.get(name)?.value;
          },
          set(name: string, value: string, options: CookieOptions) {
            cookieStore.set({ name, value, ...options });
          },
          remove(name: string, options: CookieOptions) {
            cookieStore.delete({ name, ...options });
          },
        },
      }
    );
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      // TODO: check if user exists in users table
      // if exists, check if any data is outdated and update it if so
      // else, create new user in users table
      const {
        data: { user },
      } = await supabase.auth.getUser();
      const { data: authUser } = await supabase
        .from("users")
        .select()
        .eq("id", user?.id as string);

      if (authUser?.length) {
        const storedUserData = authUser[0];
        console.log("user already exists in database, checking for outdated data");
        if (
          storedUserData.user_name !== user?.user_metadata.user_name ||
          storedUserData.name !== user?.user_metadata.full_name ||
          storedUserData.email !== user?.user_metadata.email ||
          storedUserData.avatar !== user?.user_metadata.avatar_url
        ) {
          console.log("user data is outdated, updating it");
          const { error } = await supabase
            .from("users")
            .update({
              user_name: user?.user_metadata.user_name,
              name: user?.user_metadata.full_name,
              email: user?.user_metadata.email,
              avatar: user?.user_metadata.avatar_url,
            })
            .eq("id", user?.id as string);
          if (error) {
            console.log(error);
          }
        } else {
          console.log("user data is up to date");
        }
      } else {
        console.log("user does not exist in database, creating new user");
        const { error } = await supabase.from("users").insert({
          id: user?.id as string,
          user_name: user?.user_metadata.user_name,
          name: user?.user_metadata.full_name,
          email: user?.user_metadata.email,
          avatar: user?.user_metadata.avatar_url,
        });

        if (error) {
          console.log(error);
        }
      }

      return NextResponse.redirect(`${origin}${next}`);
    }
  }

  return NextResponse.redirect(`${origin}/auth/auth-code-error`);
}
