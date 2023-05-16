import { fetchRedis } from "@/helpers/redis";

export async function getUserById(userId: string) {
  const friendIdList = (await fetchRedis(
    "smembers",
    `user:${userId}:friends`
  )) as string[];

  const friends = await Promise.all(
    friendIdList.map(async (friendId) => {
      const friend = (await fetchRedis("get", `user:${friendId}`)) as User;
      return friend;
    })
  );
  return friends;
}
