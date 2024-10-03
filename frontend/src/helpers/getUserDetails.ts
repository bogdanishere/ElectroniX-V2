import { auth } from "@/auth";
import { cookies } from "next/headers";

export async function getTokenUsernameProfilePic() {
  const session = await auth();

  const cookiesLogin = cookies().get("login")?.value;

  const cookiesImage = cookiesLogin ? JSON.parse(cookiesLogin).image : null;

  const cookiesUsername = cookiesLogin ? JSON.parse(cookiesLogin).user : null;

  const cookiesToken = cookiesLogin ? JSON.parse(cookiesLogin).token : null;

  const username: string = session?.user?.name || cookiesUsername;

  const sessionImage = session?.user?.image;

  const imageProfile = cookiesImage ? cookiesImage : sessionImage;

  console.log("cookiesImage", cookiesImage);

  console.log("profileImage", imageProfile);

  // @ts-expect-error Property 'jwt' does exist on type 'Session'.
  const token: string = session?.jwt || cookiesToken;

  return { token, username, imageProfile };
}
