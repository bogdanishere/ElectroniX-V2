import { getTokenUsernameProfilePic } from "@/helpers/getUserDetails";
import Logo from "./Logo";
import NavbarLoginOptions from "./NavbarLoginOptions";
import { auth } from "@/auth";
import { cookies } from "next/headers";

export default async function NavbarAdmins() {
  const session = await auth();

  const cookiesLogin = cookies().get("login");

  const { imageProfile } = await getTokenUsernameProfilePic();
  return (
    <nav className="bg-gray-50 shadow-md h-20">
      <div className="grid grid-cols-3">
        <div className="flex justify-center items-center">
          <Logo />
        </div>

        <div className="flex justify-center items-center text-2xl font-bold">
          Welcome back
        </div>

        <div className="flex items-center justify-center">
          <NavbarLoginOptions
            session={session}
            cookiesLogin={cookiesLogin}
            imageProfile={imageProfile}
          />
        </div>
      </div>
    </nav>
  );
}
