import { z } from "zod";

const messageValidator = z.object({
  id: z.string(),
  senderId: z.string(),
  receiverId: z.string(),
  text: z.string(),
  timestamp: z.number(),
});
export default messageValidator;

export const messageArrayValidator = z.array(messageValidator);

export type Message = z.infer<typeof messageValidator>;
