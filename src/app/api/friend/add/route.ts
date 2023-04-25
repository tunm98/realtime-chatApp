import addFriendValidator from "@/lib/validations/add-friend";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

// import fetchRedis from "@/lib/fetchredis";
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email: emailToAdd } = addFriendValidator.parse(body.email);
    // const idToAdd = (await fetchRedis(
    //   "get",
    //   `user:email:${emailToAdd}`
    // )) as string;
    const RESTResponse = await fetch(
      `${process.env.UPSTASH_REDIS_REST_URL}/get/user:email:${emailToAdd}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.UPSTASH_REDIS_REST_TOKEN}`,
        },
        cache: "no-store",
      }
    );
    const data = (await RESTResponse.json()) as { result: string };
    const idToAdd = data.result;
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
  } catch (error) {}
}
