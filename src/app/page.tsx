import { db } from "@/lib/db";
import Button from "@/components/ui/Button";
import Link from "next/link";

export default async function Home() {
  await db.set("hello", "tumanhnguyen");
  return (
    <Link href="/dashboard">
      <Button className="mt-[20px] ml-[20px]" variant="default" size="lg">
        Go to Dashboard
      </Button>
    </Link>
  );
}
