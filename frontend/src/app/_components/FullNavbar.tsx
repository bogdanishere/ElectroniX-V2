// import { getTokenUsernameProfilePic } from "@/helpers/getUserDetails";
import NavBar from "./NavBar";
import NavbarLoginOptions from "./NavbarLoginOptions";
import { auth } from "@/auth";
import { cookies } from "next/headers";

export default async function FullNavbar() {
  const session = await auth();

  const cookiesLogin = cookies().get("login");

  // const {
  //   token,
  //   clientUsername: username,
  //   imageProfile,
  // } = await getTokenUsernameProfilePic();

  return (
    <NavBar>
      <NavbarLoginOptions cookiesLogin={cookiesLogin} session={session} />
    </NavBar>
  );
}
