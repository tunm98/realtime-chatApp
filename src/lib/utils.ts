import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function hrefChat(id1: string, id2: string) {
  const [first, second] = [id1, id2].sort();
  return `${first}--${second}`;
}
