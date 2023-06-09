import { FC } from "react";

interface MessagesProps {
  initialMessages: Message[];
  chatPartner: User;
  sessionImg: string;
  sessionId: string;
}

const Messages: FC<MessagesProps> = ({
  initialMessages,
  chatPartner,
  sessionImg,
  sessionId,
}) => {
  return (
    <div
      id="messages"
      className="flex h-full flex-1 flex-col-reverse gap-4 p-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch"
    >
      Messages
    </div>
  );
};

export default Messages;
