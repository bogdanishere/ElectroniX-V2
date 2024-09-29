import { auth } from "@/auth";
import Button from "@/utils/Button";
import Image from "next/image";
import { register, loginGoogle } from "../_lib/actions";
import InputField from "@/utils/InputField";
import Link from "next/link";
import ErrorLogin from "../_components/ErrorLogin";
import { cookies } from "next/headers";
import ErrorComponent from "../_components/ErrorComponent";

export const metadata = {
  title: "Electronix - Register",
  description: "Electronix - Register",
};

export default async function Page() {
  const session = await auth();
  const user = session?.user;
  const cookiesLogin = cookies().get("login")?.value;

  const isConnected = !!user || !!cookiesLogin;

  return (
    <div>
      {!isConnected ? (
        <div className="w-screen h-screen flex justify-center items-center flex-col bg-gray-50">
          <form action={register} className="grid grid-cols-1 w-[500px]">
            <InputField name="firstName" type="firstName" label="First Name" />
            <InputField name="lastName" type="lastName" label="Last Name" />
            <InputField name="username" type="username" label="Username" />
            <InputField name="email" type="email" label="Email" />
            <InputField name="password" type="password" label="Password" />
            <div className="flex justify-between">
              <Button type="submit" className="w-24">
                Submit
              </Button>
              <Link href="/login">
                <Button className="text-primary-300">
                  Connect with your account
                </Button>
              </Link>
            </div>
            <ErrorLogin />
          </form>
          <form action={loginGoogle} className="pt-9">
            <Button className="flex items-center gap-6 text-lg border border-primary-300 px-10 py-4 font-medium">
              <Image
                src="https://authjs.dev/img/providers/google.svg"
                alt="Google logo"
                height={24}
                width={24}
              />
              <span>Continue with Google</span>
            </Button>
          </form>
        </div>
      ) : (
        <ErrorComponent error={`You are already connected, ${user?.name}`}>
          <Link href="/electronix/1">
            <Button>Please go back to the main page</Button>
          </Link>
        </ErrorComponent>
      )}
    </div>
  );
}
