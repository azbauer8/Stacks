import { textVariant } from "@/components/general/Typography"

export default function NewStackAuthError() {
  return (
    <div>
      <h1 className={textVariant({ variant: "h2" })}>
        You must be signed in to create a stack.
      </h1>
    </div>
  )
}
