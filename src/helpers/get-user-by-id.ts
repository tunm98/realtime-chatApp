import { fetchRedis } from "@/helpers/redis";

export async function getUserById(userId: string) {
  const friendIdList = (await fetchRedis(
    "smembers",
    `user:${userId}:friends`
  )) as User[];

  const friends = await Promise.all(
    friendIdList.map(async (friendId) => {
      const friend = (await fetchRedis("get", `user:${friendId}`)) as string;
      const friendData = JSON.parse(friend) as User;
      return friendData;
    })
  );
  return friends;
}
