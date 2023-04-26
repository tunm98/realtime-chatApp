import addFriendValidator from "@/lib/validations/add-friend";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { fetchRedis } from "@/helpers/redis";
import { db } from "@/lib/db";
import { z } from "zod";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email: emailToAdd } = addFriendValidator.parse(body.email);
    const idToAdd = (await fetchRedis(
      "get",
      `user:email:${emailToAdd}`
    )) as string;
    console.log("🚀 ~ file: route.ts:16 ~ POST ~ idToAdd:", !idToAdd);

    if (!idToAdd) {
      return new Response("This person does not exist.", { status: 400 });
    }
    const session = await getServerSession(authOptions);
    if (!session) {
      return new Response("Unauthorized yet", { status: 400 });
    }

    if (idToAdd === session.user.id) {
      return new Response("cannot add yourself to listfriend", { status: 400 });
    }
    //check if already added
    const isAlreadyAdded = (await fetchRedis(
      "sismember",
      `user:${idToAdd}:incoming_request`,
      session.user.id
    )) as 0 | 1;
    console.log(
      "🚀 ~ file: route.ts:35 ~ POST ~ isAlreadyAdded:",
      isAlreadyAdded
    );

    if (isAlreadyAdded) {
      return new Response("already add this user", { status: 400 });
    }

    const isAlreadyFriend = (await fetchRedis(
      "sismember",
      `user:${session.user.id}:friends`,
      idToAdd
    )) as 0 | 1;
    if (isAlreadyFriend) {
      return new Response("already friends", { status: 400 });
    }
    await db.sadd(`user:${idToAdd}:incoming_friend_requests`, session.user.id);

    return new Response("OK");
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response("Invalid request payload", { status: 422 });
    }
    return new Response("Invalid request", { status: 400 });
  }
}
