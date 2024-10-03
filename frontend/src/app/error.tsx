"use client";

import Button from "@/utils/Button";
import { useRouter } from "next/navigation";
import ErrorComponent from "./_components/ErrorComponent";
import { InternalServerError } from "@/network/http-errors";

export default function Error({ error }: { error: Error }) {
  const router = useRouter();

  return (
    <>
      {error instanceof InternalServerError ? (
        <div>
          <ErrorComponent
            error={
              "We have a problem with our website. Please try again later :("
            }
          >
            <Button onClick={router.back}>Go back to main page</Button>
          </ErrorComponent>
        </div>
      ) : (
        <ErrorComponent error={`There is a problem with ${error.message}`}>
          <Button onClick={router.back}>Go back to main page</Button>
        </ErrorComponent>
      )}
    </>
  );
}
