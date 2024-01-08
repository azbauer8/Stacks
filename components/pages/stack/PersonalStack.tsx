import StackCard from "@/components/StackCard";
import { Tables } from "@/types/supabase";

export default async function EditableStack({ stack }: { stack: Tables<"stacks"> }) {
  return (
    <>
      <p>Hey, you made this!</p>
      <StackCard stack={stack} />
    </>
  );
}
