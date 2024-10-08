import { Home, PenSquare, Search, User } from "lucide-react";
import Link from "next/link";
import React from "react";
import { buttonVariants } from "./ui/button";
import clsx from "clsx";
import { getAuthSession } from "@/lib/auth";

export const Footer = async () => {
  const session = await getAuthSession()
  
  if(!session) return
  return (
    <div className="py-2 flex justify-between container gap-1 fixed bottom-0 left-0 right-0 bg-background w-full m-auto border-t border-accent">
      <Link
        href="/"
        className={clsx(
          buttonVariants({
            variant: "ghost",
          }),
          'flex-1'
        )}
      >
        <Home size={16} />
      </Link>
      <Link
        href="/write"
        className={clsx(
          buttonVariants({
            variant: "ghost",
          }),
          'flex-1'
        )}
      >
        <PenSquare size={16} />
      </Link>
      <Link
        href="/profile"
        className={clsx(
          buttonVariants({
            variant: "ghost",
          }),
          'flex-1'
        )}
      >
        <User size={16} />
      </Link>
      <Link
        href="/search"
        className={clsx(
          buttonVariants({
            variant: "ghost",
          }),
          'flex-1'
        )}
      >
        <Search size={16} />
      </Link>
    </div>
  );
};
