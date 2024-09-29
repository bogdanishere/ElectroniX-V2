import Button from "@/utils/Button";
import Link from "next/link";
import ErrorComponent from "../_components/ErrorComponent";

export const metadata = {
  title: "Electronix - Cancel",
  description: "Electronix - Cancel",
};

export default function Page() {
  return (
    <ErrorComponent error="There was something wrong with payment">
      <Link href="/electronix/1">
        <Button>Please retry again</Button>
      </Link>
    </ErrorComponent>
  );
}
