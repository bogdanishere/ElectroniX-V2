import CommandList from "@/app/_components/CommandList";
import FullNavbar from "@/app/_components/FullNavbar";

import { checkAddress } from "../_lib/actions";

export const metadata = {
  title: "Electronix - Commands",
  description: "Electronix - Commands",
};

export default async function Page() {
  await checkAddress();

  return (
    <div className="flex flex-col justify-center w-full px-4">
      <FullNavbar />
      <div className="flex flex-col gap-6 justify-center items-center pt-5">
        <h1 className="text-2xl text-center">
          Your cart is here, make sure you don&apos;t miss one of your products
        </h1>
        <CommandList />
      </div>
    </div>
  );
}
