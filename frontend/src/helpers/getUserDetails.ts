import { auth } from "@/auth";
import { cookies } from "next/headers";

export async function getTokenUsernameProfilePic() {
  const session = await auth();

  const cookiesLogin = cookies().get("login")?.value;

  const cookiesImage = cookiesLogin ? JSON.parse(cookiesLogin).image : null;

  const cookiesUsername = cookiesLogin ? JSON.parse(cookiesLogin).user : null;

  const cookiesToken = cookiesLogin ? JSON.parse(cookiesLogin).token : null;

  const clientUsername = session?.user?.name || cookiesUsername;

  const sessionImage = session?.user?.image;

  const imageProfile = sessionImage || cookiesImage;

  // @ts-expect-error Property 'jwt' does exist on type 'Session'.
  const token = session?.jwt || cookiesToken;

  return { token, clientUsername, imageProfile };
}
