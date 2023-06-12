import { FC, useState } from "react";
import Button from "../../../components/ui/Button";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import Link from "next/link";
const Page = async ({}) => {
  const session = await getServerSession(authOptions);
  return (
    <div className="flex flex-col">
      {/* <Link href="/">
        <Button className="mt-[20px] ml-[20px]" variant="default" size="lg"> */}
      Welcome to chat app!
      {/* </Button>
      </Link> */}
    </div>
  );
};

export default Page;
