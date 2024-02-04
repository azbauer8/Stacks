import { User } from "@supabase/supabase-js"
import { MoreVerticalIcon } from "lucide-react"

import { UnstyledButton } from "@/components/ui/button"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { logout } from "../Login/action"
import { ThemeToggle } from "./ThemeToggle"

export default function NavMenu({ user }: { user: User | null }) {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger className="w-fit rounded-md px-1 py-2 hover:bg-accent hover:text-accent-foreground">
				<MoreVerticalIcon className="size-[1.3rem]" />
				<span className="sr-only">Dropdown menu</span>
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				<ThemeToggle />
				{user && (
					<>
						<DropdownMenuItem className="mx-0" action>
							<form action={logout} className="mx-0 w-full">
								<UnstyledButton className="w-full">Sign Out</UnstyledButton>
							</form>
						</DropdownMenuItem>
					</>
				)}
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
