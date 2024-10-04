"use client";

import Button from "@/utils/Button";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { logout } from "../_lib/actions";

import defaultImage from "@/app/images/default_profile.jpg";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { Session } from "next-auth";
import { useButtonsFunctionality } from "@/hooks/useButtonsFunctionality";

export default function NavbarLoginOptions({
  cookiesLogin,
  session,
  imageProfile,
}: {
  cookiesLogin: RequestCookie | undefined;
  session: Session | null;
  imageProfile: string;
}) {
  const { setOpenModifyProfilePicture } = useButtonsFunctionality();
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
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-4">
          <div className="w-12 h-auto sm:w-20 sm:h-20 rounded-full overflow-hidden">
            <Image
              src={imageProfile ?? defaultImage}
              alt="user"
              onClick={() => setOpenModifyProfilePicture(true)}
              width={60}
              height={60}
              className="object-cover p-5 w-full h-full"
            />
          </div>
          <div className="pl-0 sm:pl-5">
            <Button onClick={handleLogout} className="w-full sm:w-32">
              Logout
            </Button>
          </div>
        </div>
      ) : (
        <div className="flex flex-row items-center justify-center gap-4 pl-4 py-5 sm:py-0">
          {" "}
          <Link href="/login">
            <Button type="button" className="w-auto">
              Login
            </Button>
          </Link>
          <Link href="/register">
            <Button type="button" className="w-auto">
              Register
            </Button>
          </Link>
        </div>
      )}
    </>
  );
}
