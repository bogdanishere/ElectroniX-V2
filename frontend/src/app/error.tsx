"use client";

import Button from "@/utils/Button";
import { useRouter } from "next/navigation";
import ErrorComponent from "./_components/ErrorComponent";

export default function Error() {
  const router = useRouter();

  const customError = "There was an error. Please try again later.";

  return (
    <ErrorComponent error={customError}>
      <Button onClick={router.back}>Go back to main page</Button>
    </ErrorComponent>
  );
}
