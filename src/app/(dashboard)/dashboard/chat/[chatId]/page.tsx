import { fetchRedis } from "@/helpers/redis";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { messageArrayValidator } from "@/lib/validations/message";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import Image from "next/image";
import Messages from "@/components/Messages";
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

  const [userId1, userId2] = chatId.split("--");
  if (userId1 !== user.id && userId2 !== user.id) notFound();

  const chatPartnerId = user.id === userId1 ? userId2 : userId1;
  const chatPartnerRaw = (await fetchRedis(
    "get",
    `user:${chatPartnerId}`
  )) as string;
  const chatPartnerInfor = JSON.parse(chatPartnerRaw) as User;

  const chatMessages = await getChatMessages(chatId);

  return (
    <div className="flex-1 justify-between flex flex-col h-full max-h-[calc(100vh-6rem)]">
      <div className="flex sm:items-center justify-between py-3 border-b-2 border-gray-200">
        <div className="  ml-3 relative flex items-center space-x-4">
          <div className="relative">
            <div className="relative w-8 sm:w-12 h-8 sm:h-12">
              <Image
                fill
                referrerPolicy="no-referrer"
                src={chatPartnerInfor.image}
                alt={`${chatPartnerInfor.name} profile picture`}
                className="rounded-full"
              />
            </div>
          </div>

          <div className="flex flex-col leading-tight">
            <div className="text-xl flex items-center">
              <span className="text-gray-700 mr-3 font-semibold">
                {chatPartnerInfor.name}
              </span>
            </div>

            <span className="text-sm text-gray-600">
              {chatPartnerInfor.email}
            </span>
          </div>
        </div>
      </div>

      <Messages
        chatId={chatId}
        chatPartner={chatPartnerInfor}
        sessionImg={session?.user?.image}
        sessionId={session?.user?.id}
        initialMessages={chatMessages}
      />
      {/* <ChatInput chatId={chatId} chatPartner={chatPartner} /> */}
    </div>
  );
};

export default page;
