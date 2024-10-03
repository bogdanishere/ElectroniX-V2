import InputField from "@/utils/InputField";
import Button from "@/utils/Button";
import { addAddress, checkAddress } from "../_lib/actions";
import { redirect } from "next/navigation";
import Link from "next/link";
import ErrorField from "../_components/ErrorField";

export const metadata = {
  title: "Electronix - Address",
  description: "Electronix - Please type your address",
};

export default async function Page({
  searchParams,
}: {
  searchParams: { error: string };
}) {
  const addressExist = await checkAddress();

  if (addressExist) return redirect("/commands");

  return (
    <div className="w-screen h-screen flex justify-center items-center flex-col bg-gray-50">
      <h1>Type your address location</h1>
      <form action={addAddress} className="grid grid-cols-1 w-[500px]">
        <InputField name="street" type="street" label="Street" />
        <InputField name="city" type="city" label="City" />
        <InputField name="country" type="country" label="Country" />
        <InputField name="postal_code" type="postal_code" label="Postal Code" />
        <InputField name="state" type="state" label="State" />
        <ErrorField error={searchParams.error} />
        <div className="flex justify-between">
          <Button type="submit">Submit</Button>
          <Link href="/electronix/1">
            <Button type="button">Go back</Button>
          </Link>
        </div>
      </form>
    </div>
  );
}
