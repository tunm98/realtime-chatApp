"use client";
import { FC, useState } from "react";
import Button from "./ui/Button";
import { toast } from "react-hot-toast";
import { signOut } from "next-auth/react";
import { ButtonHTMLAttributes } from "react";
import { Loader2, LogOut } from "lucide-react";

interface SignOutButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

const SignOutButton: FC<SignOutButtonProps> = ({ ...props }) => {
  const [isSignOut, setIsSignOut] = useState<boolean>(false);

  const handleSignOut = async () => {
    setIsSignOut(true);
    try {
      await signOut();
    } catch (error) {
      toast.error("Something went wrong with your sign out.");
    } finally {
      setIsSignOut(false);
    }
  };

  return (
    <Button {...props} variant="ghost" className="" onClick={handleSignOut}>
      {isSignOut ? (
        <Loader2 className="animate-spin h-4 w-4" />
      ) : (
        <LogOut className="w-4 h-4" />
      )}
    </Button>
  );
};

export default SignOutButton;
