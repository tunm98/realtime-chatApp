"use client";
import { FC, useEffect, useState } from "react";
import Button from "./ui/Button";
import Link from "next/link";
import { User } from "lucide-react";

interface FriendRequestProps {
  sessionId: string;
  unseenRequests: number;
}

const FriendRequestSidebar: FC<FriendRequestProps> = ({
  sessionId,
  unseenRequests,
}) => {
  const [unseenRequestNumber, setUnseenRequestNumber] =
    useState<number>(unseenRequests);

  useEffect(() => {
    setUnseenRequestNumber(unseenRequests);
  }, [unseenRequests]);

  return (
    <Link
      href="/dashboard/requests"
      className="text-gray-700 hover:text-indigo-600 hover:bg-gray-50 group flex items-center gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
    >
      <div className="text-gray-400 border-gray-200 group-hover:border-indigo-600 group-hover:text-indigo-600 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border text-[0.625rem] font-medium bg-white">
        <User className="h-4 w-4" />
      </div>
      <p className="truncate"> See Friend requests</p>
      {unseenRequestNumber > 0 ? (
        <div className="rounded-full w-5 h-5 text-xs flex justify-center items-center text-white bg-red-600">
          {unseenRequestNumber}
        </div>
      ) : null}
    </Link>
  );
};

export default FriendRequestSidebar;
