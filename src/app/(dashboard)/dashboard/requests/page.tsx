import { FC } from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { notFound } from "next/navigation";
import { fetchRedis } from "@/helpers/redis";
import FriendRequest from "@/components/FriendRequest";

const page = async ({}) => {
  const session = await getServerSession(authOptions);
  if (!session) notFound();
  const requestIds = (await fetchRedis(
    "smembers",
    `user:${session.user.id}:incoming_friend_requests`
  )) as string[];

  const requestEmail = await Promise.all(
    requestIds.map(async (senderId) => {
      const id = (await fetchRedis("get", `user:${senderId}`)) as string;
      const senderParsed = JSON.parse(id) as User;
      console.log(senderParsed);
      return {
        senderId,
        senderEmail: senderParsed.email,
        senderName: senderParsed.name,
        senderImage: senderParsed.image,
      };
    })
  );

  return (
    <div className="ml-[20px] w-[80%] max-w-[400px]">
      <h1 className="font-bold text-3xl mb-8">Your list friend requests</h1>
      <div className="flex flex-col gap-4">
        <FriendRequest
          sessionId={session.user.id}
          incomingFriendRequests={requestEmail}
        />
      </div>
    </div>
  );
};

export default page;
