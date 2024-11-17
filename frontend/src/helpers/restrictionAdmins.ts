import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const restrictionAdmins = async () => {
  const cookiesLogin = cookies().get("login")?.value;
  const type = cookiesLogin ? JSON.parse(cookiesLogin).type : null;

  if (type === "EMPLOYEE") {
    return redirect("/employee");
  }

  if (type === "PROVIDER") {
    return redirect("/provider/1");
  }

  return;
};
