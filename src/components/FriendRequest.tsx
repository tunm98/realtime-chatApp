"use client";
import { UserPlus, Check, X, Loader2 } from "lucide-react";
import { FC, useState } from "react";
import Image from "next/image";
import axios from "axios";
import { useRouter } from "next/navigation";
interface FriendRequestProps {
  sessionId: string;
  incomingFriendRequests?: incomingFriendRequest[];
}

const FriendRequest: FC<FriendRequestProps> = ({
  sessionId,
  incomingFriendRequests,
}) => {
  const router = useRouter();
  // const [isLoading, setIsLoading] = useState(false);

  const [friendRequests, setFriendRequests] = useState(incomingFriendRequests);
  const acceptFriend = async (senderId: string) => {
    // setIsLoading(true);
    await axios.post("/api/friend/accept", { id: senderId });
    // setIsLoading(false);
    setFriendRequests((prev) =>
      prev?.filter((request) => request.senderId !== senderId)
    );
    router.refresh();
  };

  const denyFriend = async (senderId: string) => {
    // setIsLoading(true);
    await axios.post("/api/friend/deny", { id: senderId });
    // setIsLoading(false);
    setFriendRequests((prev) =>
      prev?.filter((request) => request.senderId !== senderId)
    );
    router.refresh();
  };
  return (
    <div className="">
      {friendRequests && friendRequests.length > 0 ? (
        friendRequests.map((request) => (
          <div className="flex items-center mt-[25px] " key={request.senderId}>
            <div className=" basis-[30px]">
              <UserPlus className="h-6 w-6" />
            </div>
            <div className="flex gap-2 items-center ml-[20px]">
              <div className="flex items-center rounded-full relative h-8 w-8">
                <Image
                  fill
                  referrerPolicy="no-referrer"
                  className="rounded-full"
                  alt="Your profile picture"
                  src={request.senderImage || ""}
                />
              </div>
              <div className="flex flex-col ml-2">
                <div className="flex items-center gap-4 font-bold">
                  {request.senderName}
                </div>
                <div className="flex items-center gap-4 text-[12px] italic">
                  {request.senderEmail}
                </div>
              </div>
            </div>
            <div className="flex gap-3 ml-auto">
              <button
                onClick={() => acceptFriend(request.senderId)}
                aria-label="accept friend"
                className="w-7 h-7 bg-indigo-600 hover:bg-indigo-700 flex justify-center items-center rounded-full transition hover:shadow-md"
              >
                {/* {isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin text-white" />
                ) : (
                  <Check className="font-semibold text-white w-3/4 h-3/4" />
                )} */}
                <Check className="font-semibold text-white w-3/4 h-3/4" />
              </button>
              <button
                onClick={() => denyFriend(request.senderId)}
                aria-label="deny friend"
                className="w-7 h-7 bg-red-600 hover:bg-red-700 grid place-items-center rounded-full transition hover:shadow-md"
              >
                {/* {isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin text-white" />
                ) : (
                  <X className="font-semibold text-white w-3/4 h-3/4" />
                )} */}
                <X className="font-semibold text-white w-3/4 h-3/4" />
              </button>
            </div>
          </div>
        ))
      ) : (
        <p>There is nothing to show</p>
      )}
    </div>
  );
};

export default FriendRequest;
