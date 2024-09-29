import NavBar from "./NavBar";
import NavbarLoginOptions from "./NavbarLoginOptions";
import { auth } from "@/auth";
import { cookies } from "next/headers";

export default async function FullNavbar() {
  const session = await auth();

  const cookiesLogin = cookies().get("login");
  return (
    <NavBar>
      <NavbarLoginOptions cookiesLogin={cookiesLogin} session={session} />
    </NavBar>
  );
}
