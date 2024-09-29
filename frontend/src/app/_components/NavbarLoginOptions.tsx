"use client";

import Button from "@/utils/Button";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { logout } from "../_lib/actions";

import defaultImage from "@/app/images/default_profile.jpg";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { Session } from "next-auth";

export default function NavbarLoginOptions({
  cookiesLogin,
  session,
}: {
  cookiesLogin: RequestCookie | undefined;
  session: Session | null;
}) {
  const [isClient, setIsClient] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [logoutClicked, setLogoutClicked] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsClient(true);

      const token = JSON.parse(cookiesLogin?.value || "{}").token;

      const isLoggedIn = !!session?.user || !!token;

      setIsConnected(isLoggedIn);
      setLogoutClicked(false);
    }
  }, [session, logoutClicked, cookiesLogin]);

  function handleLogout() {
    setLogoutClicked(true);
    logout();
  }

  if (!isClient) return null;

  return (
    <>
      {isConnected ? (
        <>
          <div className="flex items-center justify-center pl-10">
            <Image
              src={session?.user?.image ?? defaultImage}
              alt="user"
              width={59}
              height={59}
              className="rounded-full"
            />
          </div>
          <div className="pl-5">
            <Button onClick={handleLogout} className="w-32">
              Logout
            </Button>
          </div>
        </>
      ) : (
        <Link href="/login">
          <div className="pl-10 w-32">
            <Button type="button" className="w-32">
              Login
            </Button>
          </div>
        </Link>
      )}
    </>
  );
}
