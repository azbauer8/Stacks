"use server"

import { cookies, headers } from "next/headers"
import { redirect } from "next/navigation"

import { createClient } from "@/utils/supabase/actions"
import { revalidatePath } from "next/cache"

export async function login() {
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

export async function logout() {
	const cookieStore = cookies()
	const supabase = createClient(cookieStore)

	await supabase.auth.signOut()
	revalidatePath("/", "layout")
	return redirect("/")
}
