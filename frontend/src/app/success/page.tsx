import Link from "next/link";
import CommandSended from "../_components/CommandSended";
import Button from "@/utils/Button";

interface SearchParamsProp {
  session_id: string;
}

export const metadata = {
  title: "Electronix - Success",
  description: "Electronix - Success",
};

export default async function Page({
  searchParams,
}: {
  searchParams: SearchParamsProp;
}) {
  const { session_id: sessionId } = searchParams;

  return (
    <div className="bg-gray-50 border border-grey-100 rounded-md p-12 flex flex-col justify-center items-center gap-9 h-screen w-screen">
      <div className="font-bold text-5xl">Congratulation!</div>
      <CommandSended sessionId={sessionId} />
      <Link href="/electronix/1">
        <Button>Go back</Button>
      </Link>
    </div>
  );
}
