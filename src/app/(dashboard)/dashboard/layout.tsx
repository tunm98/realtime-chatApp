import { FC } from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { notFound } from "next/navigation";
import { Icons } from "../../../../public/icons/Icons";
import Link from "next/link";
interface LayoutProps {
  children: React.ReactNode;
}

const Layout = async ({ children }: LayoutProps) => {
  const session = await getServerSession(authOptions);
  if (!session) notFound();
  return (
    <div className="flex p-[50px] h-screen">
      <div className="w-[200px] border-r-black">
        <Link href="/dashboard" className="flex h-16 shrink-0 items-center">
          <Icons.LiveChat className="h-8 w-auto text-indigo-600" />
        </Link>
      </div>
      {children}
    </div>
  );
};

export default Layout;
