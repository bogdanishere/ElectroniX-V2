import Button from "@/utils/Button";
import ErrorComponent from "../_components/ErrorComponent";
import Link from "next/link";

export default function Page() {
  return (
    <ErrorComponent
      error={"We have a problem with our website. Please try again later :("}
    >
      <Link href="/electronix/1">
        <Button>Go back to main page</Button>
      </Link>
    </ErrorComponent>
  );
}
