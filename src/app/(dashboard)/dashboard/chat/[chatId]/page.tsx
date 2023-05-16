import { fetchRedis } from "@/helpers/redis";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { messageArrayValidator } from "@/lib/validations/message";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";

interface PageProps {
  params: {
    chatId: string;
  };
}

const page = async ({ params }: PageProps) => {
  const { chatId } = params;
  const session = await getServerSession(authOptions);
  if (!session) notFound();
  const { user } = session;

  const getChatMessages = async (chatId: string) => {
    try {
      const conversation = (await fetchRedis(
        "zrange",
        `chat:${chatId}:messages`,
        "0",
        "-1"
      )) as string[];

      const dbMessages = conversation.map(
        (message) => JSON.parse(message) as Message
      );
      //vi minh can nhung tin nhan moi nhat hien o bottm nen can reverse lai

      const reversedMessages = dbMessages.reverse();
      const messages = messageArrayValidator.parse(reversedMessages);
      return messages;
    } catch (error) {
      notFound();
    }
  };

  const [userId1, userId2] = chatId.split("_");
  if (userId1 !== user.id && userId2 !== user.id) notFound();

  const chatPartnerId = user.id === userId1 ? userId2 : userId1;
  const chatPartnerInfor = (await db.get(`users/${chatPartnerId}`)) as User;
  const chatMessages = await getChatMessages(chatId);

  return <div>{params.chatId}</div>;
};

export default page;
