import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { fetchRedis } from "@/helpers/redis";
import { z } from "zod";
import { db } from "@/lib/db";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const session = await getServerSession(authOptions);
  } catch (error) {}
}
