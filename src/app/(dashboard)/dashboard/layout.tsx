import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { notFound } from "next/navigation";
import { Icon, Icons } from "../../../../public/icons/Icons";
import Link from "next/link";
import Image from "next/image";
import SignOutButton from "@/components/SignOutButton";
import { fetchRedis } from "@/helpers/redis";
import FriendRequestSidebar from "@/components/FriendRequestSidebar";
import { getUserById } from "@/helpers/get-user-by-id";
import SidebarChat from "@/components/SidebarChat";
interface LayoutProps {
  children: React.ReactNode;
}
interface SidebarOption {
  id: number;
  name: string;
  href: string;
  Icon: Icon;
}

const SidebarOptions: SidebarOption[] = [
  {
    id: 1,
    name: "Add friend",
    href: "/dashboard/add",
    Icon: "UserPlus",
  },
];

const Layout = async ({ children }: LayoutProps) => {
  const session = await getServerSession(authOptions);
  if (!session) notFound();
  const unseenRequestNumber = (
    (await fetchRedis(
      "smembers",
      `user:${session.user.id}:incoming_friend_requests`
    )) as string[]
  )?.length;
  const friendList = (await getUserById(session.user.id)) as User[];

  return (
    <div className="flex px-[30px] h-screen">
      <div className="w-[300px] flex flex-col border-r-black border-r-[1px]">
        <Link href="/dashboard" className="flex h-16 shrink-0 items-center">
          <Icons.LiveChat className="h-8 w-auto text-indigo-600" />
        </Link>
        {friendList.length > 0 && (
          <div className="text-xs font-semibold leading-6 text-gray-400">
            Your chats
          </div>
        )}
        <nav className="flex flex-1 flex-col">
          <ul role="list" className="flex flex-1 flex-col gap-y-7">
            <li>
              <SidebarChat userId={session.user.id} friendList={friendList} />
            </li>
            <li>
              <div className="text-xs font-semibold leading-6 text-gray-400">
                Overview
              </div>
              <ul
                role="list"
                className="-mx-2 mt-2 space-y-1 box-border w-full"
              >
                {SidebarOptions.map((option) => {
                  const Icon = Icons[option.Icon];
                  return (
                    <li key={option.id}>
                      <Link
                        href={option.href}
                        className="text-gray-700 hover:text-indigo-600 hover:bg-gray-200 group flex gap-3 rounded-md box-border p-2 text-sm leading-6 font-semibold"
                      >
                        <span className="text-gray-400 border-gray-200 group-hover:border-indigo-600 group-hover:text-indigo-600 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border text-[0.625rem] font-medium bg-white">
                          <Icon className="h-4 w-4" />
                        </span>
                        <span className="truncate">{option.name}</span>
                      </Link>
                    </li>
                  );
                })}
                <li>
                  <FriendRequestSidebar
                    sessionId={session.user.id}
                    unseenRequests={unseenRequestNumber}
                  />
                </li>
              </ul>
            </li>

            <li className="-mx-6 mt-auto flex items-center">
              <div className="flex flex-1 items-center gap-x-4 px-6 py-3 text-sm font-semibold leading-6 text-gray-900">
                <div className="relative h-8 w-8 bg-gray-50">
                  <Image
                    fill
                    referrerPolicy="no-referrer"
                    className="rounded-full"
                    src={session.user.image || ""}
                    alt="Your profile picture"
                  />
                </div>
                <span className="sr-only">Your profile</span>
                <div className="flex flex-col">
                  <span aria-hidden="true">{session.user.name}</span>
                  <span className="text-xs text-zinc-400" aria-hidden="true">
                    {session.user.email}
                  </span>
                </div>
                <SignOutButton className=" h-full aspect-square" />
              </div>
            </li>
          </ul>
        </nav>
      </div>
      {children}
    </div>
  );
};

export default Layout;
