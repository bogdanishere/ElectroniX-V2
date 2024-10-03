import Button from "@/utils/Button";
import Image from "next/image";
import { loginEmail, loginGoogle } from "../_lib/actions";
import InputField from "@/utils/InputField";
import Link from "next/link";
import { getTokenUsernameProfilePic } from "@/helpers/getUserDetails";
import ErrorField from "../_components/ErrorField";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Electronix - Login",
  description: "Electronix - Login",
};

export default async function Page({
  searchParams,
}: {
  searchParams: { error?: string };
}) {
  const { username } = await getTokenUsernameProfilePic();

  if (username) {
    return redirect("/electronix/1");
  }

  return (
    <div className="w-screen h-screen flex justify-center items-center flex-col bg-gray-50">
      <form action={loginEmail} className="grid grid-cols-1 w-[500px]">
        <InputField name="email" type="email" label="Email" />
        {searchParams.error && <ErrorField error={searchParams.error} />}

        <InputField name="password" type="password" label="Password" />
        {searchParams.error && <ErrorField error={searchParams.error} />}

        <div className="flex justify-between">
          <Button type="submit" className="w-24">
            Submit
          </Button>
          <Link href="/register">
            <Button className="text-primary-300">Create an account</Button>
          </Link>
        </div>
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
  );
}
