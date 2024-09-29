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
    <div className="flex flex-col justify-center w-screen">
      <FullNavbar />
      <div className="flex flex-col gap-10 justify-center items-center pt-5">
        <h1 className="text-3xl">
          Your cart is here, make sure you don&apos;t miss one of your products
        </h1>
        <CommandList />
      </div>
    </div>
  );
}
