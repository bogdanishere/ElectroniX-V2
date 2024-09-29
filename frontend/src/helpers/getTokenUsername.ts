import { auth } from "@/auth";
import { cookies } from "next/headers";

export async function getTokenUsername() {
  const session = await auth();

  const cookiesLogin = cookies().get("login")?.value;

  const cookiesUsername = cookiesLogin ? JSON.parse(cookiesLogin).user : null;

  const cookiesToken = cookiesLogin ? JSON.parse(cookiesLogin).token : null;

  const clientUsername = session?.user?.name || cookiesUsername;

  // @ts-expect-error Property 'jwt' does exist on type 'Session'.
  const token = session?.jwt || cookiesToken;

  return { token, clientUsername };
}
