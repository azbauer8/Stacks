import StackCard from "@/components/StackCard";
import { Tables } from "@/types/supabase";

export default async function Stack({ stack }: { stack: Tables<"stacks"> }) {
  return <StackCard stack={stack} />;
}
