import addFriendValidator from "@/lib/validations/add-friend";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { fetchRedis } from "@/helpers/redis";
import { z } from "zod";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const idDeny = z.object({
      id: z.string(),
    });

    const { id: idToAdd } = idDeny.parse(body);

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

    return new Response("OK");
  } catch (error) {
    console.log(error);
  }
}
