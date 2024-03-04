import { textVariant } from "@/components/general/Typography"

export default function NewStackAuthError() {
  return (
    <div>
      <h1 className={textVariant({ variant: "h2" })}>
        You are not authorized to edit this stack.
      </h1>
    </div>
  )
}
