"use client";
import { FC, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { hrefChat } from "@/lib/utils";
import Link from "next/link";

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
      {friendList.sort().map((friend) => {
        // const lastMessage = friend.lastMessage as Message;
        const isUnseen = unseenMessages.some(
          (msg) => msg.senderId === friend.id
        );
        return (
          <li key={friend.id}>
            <Link
              href={`/dashboard/chat/${hrefChat(userId, friend.id)}`}
              className={`hover:cursor-pointer items-center text-gray-700 hover:text-indigo-600 hover:bg-gray-200 group flex gap-3 rounded-md box-border p-2 text-sm leading-6 font-semibold ${
                isUnseen ? "bg-gray-200" : ""
              }`}
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
                {unseenMessages.length > 0 ? (
                  <div className="bg-indigo-600 font-medium text-xs text-white w-4 h-4 rounded-full flex justify-center items-center">
                    {unseenMessages.map((msg, index) => (
                      <p key={index}>
                        {msg.senderId === friend.id ? msg.text : null}
                      </p>
                    ))}
                  </div>
                ) : null}
              </div>
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default SidebarChat;
