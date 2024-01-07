import { Tables } from "@/types/supabase";

export default async function Stack({ stack }: { stack: Tables<"stacks"> }) {
  return (
    <>
      <pre>{JSON.stringify(stack, null, 2)}</pre>
    </>
  );
}
