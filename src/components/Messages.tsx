"use client";

import Image from "next/image";
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
  const ms = [
    {
      id: "1",
      senderId: "21c89ba7-5a7b-465c-855d-4d8bf457ab05",
      receiverId: "f4e1de1c-086f-4254-9c8e-a40e62127f02",
      text: "hello, what's up?",
      timestamp: "2023-06-13 15:30:45",
    },
    {
      id: "2",
      senderId: "f4e1de1c-086f-4254-9c8e-a40e62127f02",
      receiverId: "21c89ba7-5a7b-465c-855d-4d8bf457ab05",
      text: "how are you? I want to ask something, do you mind??????????????????????",
      timestamp: "2023-06-13 15:32:45",
    },
    {
      id: "3",
      senderId: "f4e1de1c-086f-4254-9c8e-a40e62127f02",
      receiverId: "21c89ba7-5a7b-465c-855d-4d8bf457ab05",
      text: "Do you know how to use this app?",
      timestamp: "2023-06-13 15:32:46",
    },
    {
      id: "3",
      senderId: "f4e1de1c-086f-4254-9c8e-a40e62127f02",
      receiverId: "21c89ba7-5a7b-465c-855d-4d8bf457ab05",
      text: "Im confused",
      timestamp: "2023-06-13 15:33:46",
    },
    {
      id: "1",
      senderId: "21c89ba7-5a7b-465c-855d-4d8bf457ab05",
      receiverId: "f4e1de1c-086f-4254-9c8e-a40e62127f02",
      text: "let me see",
      timestamp: "2023-06-13 15:34:45",
    },
  ];
  const scrollDownRef = useRef<HTMLDivElement | null>(null);
  return (
    <div
      id="messages"
      className="flex h-full flex-1 flex-col-reverse gap-4 p-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch"
    >
      <div ref={scrollDownRef}></div>
      <div>
        {ms?.map((message, index) => {
          const isMe = message.senderId === sessionId;
          const isPartner = message.senderId === chatPartner.id;
          const hasNextMessage = ms[index - 1]?.senderId === message.senderId;
          return (
            <div
              key={`${message.id}-${message.timestamp}}`}
              className={`flex mb-2 flex-col ${
                isMe ? "items-end" : "items-start"
              }`}
            >
              <div
                className={`flex items-center max-w-[50%] w-auto ${
                  isMe ? "justify-end" : "justify-start"
                }`}
              >
                {
                  <div className="relative">
                    <div className="relative w-8 h-8">
                      {!isMe && !hasNextMessage && (
                        <Image
                          src={chatPartner.image}
                          alt={`${chatPartner.name} profile picture`}
                          className="rounded-full"
                          referrerPolicy="no-referrer"
                          fill
                        />
                      )}
                    </div>
                  </div>
                }
                <div
                  className={`${
                    isMe ? "bg-blue-600" : "bg-gray-100 ml-3"
                  } px-4 py-2 rounded-lg max-w-[100%] `}
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
              {/* <div className=" mt-2 text-xs text-gray-500">
                {new Date(message.timestamp).toLocaleString()}
              </div> */}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Messages;
