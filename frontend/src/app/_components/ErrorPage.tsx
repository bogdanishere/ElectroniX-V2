"use client";

import Button from "@/utils/Button";
import ErrorComponent from "./ErrorComponent";
import { useRouter } from "next/navigation";
import { logout } from "../_lib/actions";

export default function ErrorPage({ error }: { error: string }) {
  const router = useRouter();

  async function handleRetry() {
    await logout();
    router.back();
  }

  return (
    <ErrorComponent error={error}>
      <Button onClick={handleRetry}>Go back</Button>
    </ErrorComponent>
  );
}
