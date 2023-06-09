const upstashRedisRestUrl = process.env.UPSTASH_REDIS_REST_URL;
const authToken = process.env.UPSTASH_REDIS_REST_TOKEN;

type Command = "zrange" | "sismember" | "get" | "smembers";

export async function fetchRedis(
  command: Command,
  ...args: string[] | number[]
) {
  const commandUrl = `${upstashRedisRestUrl}/${command}/${args.join("/")}`;
  const RESTResponse = await fetch(commandUrl, {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
    cache: "no-store",
  });

  if (!RESTResponse.ok) {
    throw new Error(
      `Error executing Redis command: ${RESTResponse.statusText}`
    );
  }
  const data = await RESTResponse.json();
  // console.log(data);
  return data.result;
}
