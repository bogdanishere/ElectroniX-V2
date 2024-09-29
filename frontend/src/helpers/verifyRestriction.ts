import { cookies } from "next/headers";
import { redirect } from "next/navigation";

type TypeUser = "client" | "employee" | "provider";

export const verifyRestriction = async (typeUser: TypeUser) => {
  const cookiesLogin = cookies().get("login")?.value;
  const type = cookiesLogin ? JSON.parse(cookiesLogin).type : null;

  console.log("type", type);

  if (!type) return redirect("/electronix/1");

  if (type !== typeUser) {
    redirect("/electronix/1");
  }

  return;
};
