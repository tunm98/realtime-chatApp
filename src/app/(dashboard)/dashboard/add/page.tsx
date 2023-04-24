import AddfriendButton from "@/components/addFriendButton/AddfriendButton";
import { FC } from "react";

const page: FC = () => {
  return (
    <main className="mt-5 ml-5">
      <h1 className="text-[30px] font-bold mb-7">Add a friend</h1>
      <AddfriendButton />
    </main>
  );
};

export default page;
