import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const restrictionAdmins = async () => {
  const cookiesLogin = cookies().get("login")?.value;
  const type = cookiesLogin ? JSON.parse(cookiesLogin).type : null;

  if (type === "employee") {
    return redirect("/employee");
  }

  if (type === "provider") {
    return redirect("/provider/1");
  }

  return;
};
