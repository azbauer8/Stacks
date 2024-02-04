import { LoginButton } from "./LoginButton"
import { login } from "./action"

export default async function Login() {
	return (
		<form action={login}>
			<LoginButton />
		</form>
	)
}
