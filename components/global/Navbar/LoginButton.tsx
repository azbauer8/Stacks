import { cookies, headers } from "next/headers"
import { redirect } from "next/navigation"
import { createClient } from "@/utils/supabase/server"
import { GithubIcon } from "lucide-react"

import { Button } from "@/components/ui/button"

export default async function LoginButton() {
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
      <Button className="flex h-fit items-center gap-1 px-1.5 py-2">
        <GithubIcon className="size-5" />
        Sign In
      </Button>
    </form>
  )
}
