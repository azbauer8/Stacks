import { cookies, headers } from "next/headers"
import { redirect } from "next/navigation"
import { createClient } from "@/utils/supabase/server"

import { LoginButton } from "./LoginButton"

export default async function Login() {
  const signInWithGithub = async () => {
    "use server"
    const origin = headers().get("origin")
    const cookieStore = cookies()
    const supabase = createClient(cookieStore)

    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: `${origin}/auth/callback`,
      },
    })

    if (error) {
      console.error(error)
      return redirect("/")
    }

    redirect(data.url)
  }

  return (
    <form action={signInWithGithub}>
      <LoginButton />
    </form>
  )
}
