"use client";
import { FC, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { hrefChat } from "@/lib/utils";

interface SidebarChatProps {
  friendList: User[];
  userId: string;
}

const SidebarChat: FC<SidebarChatProps> = ({ friendList, userId }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [unseenMessages, setUnseenMessages] = useState<Message[]>([]);

  useEffect(() => {
    if (pathname?.includes("chat")) {
      setUnseenMessages((prev) => {
        return prev.filter((msg) => !pathname.includes(msg.senderId));
      });
    }
  }, [pathname]);
  return (
    <ul
      role="list"
      className="max-h-[25rem] box-border overflow-y-auto w-full -mx-2 space-y-1"
    >
      {friendList.map((friend) => {
        // const lastMessage = friend.lastMessage as Message;
        const isUnseen = unseenMessages.some(
          (msg) => msg.senderId === friend.id
        );
        return (
          <li
            key={friend.id}
            className={`hover:cursor-pointer text-gray-700 hover:text-indigo-600 hover:bg-gray-200 group flex gap-3 rounded-md box-border p-2 text-sm leading-6 font-semibold ${
              isUnseen ? "bg-gray-200" : ""
            }`}
            onClick={() =>
              router.push(`/dashboard/chat/${hrefChat(userId, friend.id)}`)
            }
          >
            <div className="flex items-center rounded-full relative h-8 w-8">
              <Image
                fill
                referrerPolicy="no-referrer"
                className="rounded-full"
                alt="Your profile picture"
                src={friend.image || ""}
              />
            </div>
            <div className="flex flex-col ml-2">
              <div className="flex items-center gap-4 font-bold">
                {friend.name}
              </div>
              {/* <div className="flex items-center gap-4 text-[12px] italic">
                {lastMessage?.text}
              </div> */}
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default SidebarChat;
