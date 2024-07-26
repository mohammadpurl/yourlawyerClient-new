"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";

const HeadeUserSession = () => {
  const { data: session } = useSession();
  console.log(session?.user?.mobile);
  return (
    <>
      {!session?.user ? (
        <Link
          href="/signin"
          className="bg-inherit text-black  hover:bg-accent/90"
        >
          ورود
        </Link>
      ) : (
        session?.user?.mobile
      )}
    </>
  );
};

export default HeadeUserSession;
