import { Tables } from "@/types/supabase";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default function StackCard({ stack, isPersonal }: { stack: Tables<"stacks">; isPersonal?: boolean }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <Link href={`/stack/${stack.id}`} className="hover:underline underline-offset-4">
            {stack.title}
          </Link>
        </CardTitle>
        <CardDescription>{stack.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Card Content</p>
      </CardContent>
      <CardFooter>
        <p>Card Footer</p>
      </CardFooter>
    </Card>
  );
}
