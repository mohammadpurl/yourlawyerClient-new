"use client";

import { SessionProvider } from "next-auth/react";
import HeadeUserSession from "./Heade-user-session";

const ParentComponent = () => {
  return (
    <SessionProvider>
      <HeadeUserSession />
    </SessionProvider>
  );
};
