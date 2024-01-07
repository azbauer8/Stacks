import { Tables } from "@/types/supabase";

export default async function EditableStack({ stack }: { stack: Tables<"stacks"> }) {
  return (
    <>
      <p>Hey, you made this!</p>
      <pre>{JSON.stringify(stack, null, 2)}</pre>
    </>
  );
}
