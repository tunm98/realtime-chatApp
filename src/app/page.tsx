import { db } from "@/lib/db";
import Button from "@/components/ui/Button";

export default async function Home() {
  await db.set("hello", "tumanhnguyen");
  return (
    <Button className="mt-[20px] ml-[20px]" variant="default" size="lg">
      Hello
    </Button>
  );
}
