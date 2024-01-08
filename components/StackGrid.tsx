import { Tables } from "@/types/supabase";
import StackCard from "./StackCard";

export default function StackGrid({ stacks, isPersonal }: { stacks: Tables<"stacks">[]; isPersonal?: boolean }) {
  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
      {stacks.map((stack) => (
        <StackCard key={stack.id} stack={stack} {...{ isPersonal }} />
      ))}
    </div>
  );
}
