"use client";

import { logout } from "@/actions/auth";
import { Loading } from "@/app/_components/loading";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { use, useEffect, useRef, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
const HeadeUserSession = () => {
  const { data: session, status, update } = useSession();
  const [signoutState, action] = useFormState(logout, undefined);
  const router = useRouter();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const mobile = session?.user?.mobile || undefined;
  useEffect(() => {
    if (signoutState?.isSuccess) {
      const fetchSession = async () => await getSelection();
      fetchSession();
      location.reload();
      router.push("/");
    }
  }, [signoutState, router, status, update, session]);
  const handleClickOutside = (event: any) => {
    if (dropdownRef.current) {
      setDropdownOpen(false);
    }
  };

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
        <div className="relative" ref={dropdownRef}>
          <Image
            src={""}
            // src={session?.user?.picture}
            alt="Avatar"
            className="w-8 h-8 rounded-full cursor-pointer"
            // onClick={() => setDropdownOpen(!dropdownOpen)}
            onMouseOver={() => setDropdownOpen(!dropdownOpen)}
          />
          {mobile}
          {dropdownOpen && (
            <div
              className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 z-50"
              onMouseLeave={() => setDropdownOpen(!dropdownOpen)}
            >
              <Link href="/profile">My Profile</Link>
              <form action={action as () => void}>
                <LogoutButton />
              </form>
            </div>
          )}
        </div>
      )}
    </>
  );
};
const LogoutButton = () => {
  const { pending, data } = useFormStatus();
  return (
    <button className="">
      {pending && <Loading size="tiny" />}
      خروج از حساب کازبری
    </button>
  );
};

export default HeadeUserSession;
