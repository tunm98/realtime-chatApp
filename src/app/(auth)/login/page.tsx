"use client";
import { FC } from "react";
import { useState } from "react";
import Button from "../../../components/ui/Button";
import GoogleLogo from "../../../../public/icons/googleLogo.svg";
import Logo from "../../../../public/icons/livechat-vector-logo.svg";
import { toast } from "react-hot-toast";
import Image from "next/image";
import { signIn } from "next-auth/react";
import { Icons } from "../../../../public/icons/Icons";
interface pageProps {}

const Page: FC<pageProps> = ({}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const loginWithGoogle = async () => {
    setIsLoading(true);
    try {
      //   throw new Error("doesn't matter");
      await signIn("google");
    } catch (error) {
      toast.error("Something went wrong with your login.");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full flex flex-col items-center max-w-md space-y-8">
          <div className="flex flex-col items-center gap-8">
            <Icons.LiveChat className="h-[100px] scale-100" />
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
              Sign in to your account
            </h2>
          </div>

          <Button
            isLoading={isLoading}
            type="button"
            className="max-w-sm mx-auto w-full"
            onClick={loginWithGoogle}
          >
            {isLoading ? null : <Icons.Google className="w-6 h-6 mr-2" />}
            Sign in with Google
          </Button>
        </div>
      </div>
    </>
  );
};

export default Page;
