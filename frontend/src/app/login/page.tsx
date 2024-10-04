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
    <div className="w-screen h-screen flex justify-center items-center bg-gray-50 p-4 flex-col">
      <form
        action={loginEmail}
        className="bg-white shadow-md rounded-lg p-6 w-full max-w-md sm:max-w-lg lg:max-w-xl"
      >
        <h2 className="text-2xl font-semibold mb-6 text-center">
          Login to Electronix
        </h2>
        <InputField name="email" type="email" label="Email" className="mb-4" />
        {searchParams.error && <ErrorField error={searchParams.error} />}

        <InputField
          name="password"
          type="password"
          label="Password"
          className="mb-4"
        />
        {searchParams.error && <ErrorField error={searchParams.error} />}

        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <Button type="submit" className="w-full sm:w-1/3">
            Submit
          </Button>
          <Link href="/register" className="w-full sm:w-1/3">
            <Button className="w-full text-primary-300">
              Create an account
            </Button>
          </Link>
        </div>
      </form>

      <form action={loginGoogle} className="pt-6">
        <Button className="flex items-center gap-4 sm:gap-6 text-lg border border-primary-300 px-6 py-3 rounded-md font-medium shadow-md">
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
