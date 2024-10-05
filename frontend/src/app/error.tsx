"use client";

import Button from "@/utils/Button";
import { useRouter } from "next/navigation";
import ErrorComponent from "./_components/ErrorComponent";

export default function Error({ error }: { error: Error }) {
  const router = useRouter();

  return (
    <ErrorComponent error={`There is a problem with ${error.message}`}>
      <Button onClick={router.back}>Go back to main page</Button>
    </ErrorComponent>
  );
}
