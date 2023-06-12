"use client";

import { FC, useRef, useState } from "react";

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
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const scrollDownRef = useRef<HTMLDivElement | null>(null);
  return (
    <div
      id="messages"
      className="flex h-full flex-1 flex-col-reverse gap-4 p-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch"
    >
      <div ref={scrollDownRef}></div>
      <div>
        {messages?.map((message) => {
          const isMe = message.senderId === sessionId;
          const isPartner = message.senderId === chatPartner.id;
          return (
            <div
              key={message.id}
              className={`flex flex-col ${isMe ? "items-end" : "items-start"}`}
            >
              <div className="flex items-center">
                {!isMe && (
                  <div className="relative">
                    <div className="relative w-8 h-8">
                      <img
                        src={chatPartner.image}
                        alt={`${chatPartner.name} profile picture`}
                        className="rounded-full"
                      />
                    </div>
                  </div>
                )}
                <div
                  className={`${
                    isMe ? "bg-blue-600" : "bg-gray-100"
                  } px-4 py-2 rounded-lg max-w-[70%]`}
                >
                  <p
                    className={`${
                      isMe ? "text-white" : "text-gray-900"
                    } whitespace-pre-wrap break-words`}
                  >
                    {message.text}
                  </p>
                </div>
              </div>
              {/* <div className="text-xs text-gray-500">
                {new Date(message.createdAt).toLocaleString()}
              </div> */}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Messages;
