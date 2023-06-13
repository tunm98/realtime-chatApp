"use client";
import { FC, useRef, useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
interface ChatInputProps {
  chatPartner: User;
  chatId: string;
}
import { Loader2, Send } from "lucide-react";
import { set } from "zod";
import axios from "axios";
import { toast } from "react-hot-toast";

const ChatInput: FC<ChatInputProps> = ({ chatId, chatPartner }) => {
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);
  console.log(textAreaRef.current);
  const [message, setMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const sendMessage = async () => {
    setIsLoading(true);
    try {
      await axios
        .post("/api/message/send", { message, chatId })
        .then((res) => {});
      setMessage("");
    } catch (error) {
      toast.error("Something went wrong, please try it later");
    }
  };
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };
  return (
    <div className="flex gap-3 justify-between items-center border-t border-gray-200 px-4 pt-4 mb-2 sm:mb-0">
      <div className="relative flex-1 overflow-hidden rounded-lg shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-indigo-600">
        <TextareaAutosize
          ref={textAreaRef}
          value={message}
          rows={1}
          onKeyDown={(e) => handleKeyDown(e)}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Enter your messages"
          className="block w-full resize-none border-0 bg-transparent text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:py-3 sm:px-4  sm:text-base sm:leading-6"
        />
        {/* <div
          onClick={() => textAreaRef.current?.focus()}
          className="py-2"
          aria-hidden="true"
        >
          <div className="py-px">
            <div className="h-9" />
          </div>
        </div> */}
      </div>
      {isLoading ? (
        <Loader2 className="animate-spin h-7 w-7" />
      ) : (
        <Send
          className="h-6 w-6 rotate-25 cursor-pointer"
          onClick={sendMessage}
        />
      )}
    </div>
  );
};

export default ChatInput;
