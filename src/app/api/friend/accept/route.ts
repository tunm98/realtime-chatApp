import addFriendValidator from "@/lib/validations/add-friend";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { fetchRedis } from "@/helpers/redis";
import { z } from "zod";
import { db } from "@/lib/db";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const idAccept = z.object({
      id: z.string(),
    });

    const { id: idToAdd } = idAccept.parse(body);

    const session = await getServerSession(authOptions);

    if (!session) {
      return new Response("Unauthorized yet", { status: 400 });
    }

    const isAlreadyFriends = await fetchRedis(
      "sismember",
      `user:${session.user.id}:friends`,
      idToAdd
    );

    if (isAlreadyFriends) {
      return new Response("Already friends", { status: 400 });
    }

    const hasFriendRequest = await fetchRedis(
      "sismember",
      `user:${session.user.id}:incoming_friend_requests`,
      idToAdd
    );

    if (!hasFriendRequest) {
      return new Response("No friend request", { status: 400 });
    }
    await db.sadd(`user:${session.user.id}:friends`, idToAdd);
    // await db.sadd(`user:${idToAdd}:incoming_friend_requests`, session.user.id);
    return new Response("OK");
  } catch (error) {
    console.log(error);
  }
}
