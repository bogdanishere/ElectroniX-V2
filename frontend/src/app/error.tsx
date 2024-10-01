"use client";

import Button from "@/utils/Button";
import { useRouter } from "next/navigation";
import ErrorComponent from "./_components/ErrorComponent";

export default function Error({ error }: { error: Error }) {
  const router = useRouter();
  return (
    <div>
      {error.message}
      <ErrorComponent
        error={"We have a problem with our website. Please try again later :("}
      >
        <Button onClick={router.back}>Go back to main page</Button>
      </ErrorComponent>
    </div>
  );
}
