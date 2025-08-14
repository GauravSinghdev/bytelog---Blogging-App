"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { signIn, useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "../ui/button";
import { DropdownMenuCheckboxes } from "./Dropdown";

export function UserBtn() {
  const { data: session, status } = useSession(); // `status` tells us whether session is loading or available
  let name = "";
  const pathname = usePathname();

//   console.log("avatar is : ", session?.user?.image);

  // If the user's name exists in the session data, extract the initials.
  if (session?.user?.name) {
    name = session.user.name.split(" ")[0][0];
  }

  // Handle the loading state for session data
  if (status === "loading") {
    return (
      <Avatar>
        <AvatarFallback>{name}</AvatarFallback>
      </Avatar>
    ); // Optionally show a loading spinner or placeholder
  }

  return (
    <motion.div
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{
        type: "spring",
        stiffness: 60, // Adds a spring effect
        damping: 15, // Controls the bounciness
      }}
      className="flex items-center tracking-wider"
    >
      {session?.user ? (
        <DropdownMenuCheckboxes
          name={session?.user.name ?? ""}
          avatarUrl={session?.user.image ?? ""}
          id={session?.user.id}
        />
      ) : (
        pathname !== "/login" && (
          <Button onClick={() => signIn()}>
            <span className="hover:text-gray-200 lg:px-2">Login</span>
          </Button>
        )
      )}
    </motion.div>
  );
}