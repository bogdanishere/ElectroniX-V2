"use client";

import Button from "@/utils/Button";
import ErrorComponent from "./ErrorComponent";
import { useRouter } from "next/navigation";

export default function ErrorPage({ error }: { error: string }) {
  const router = useRouter();
  return (
    <ErrorComponent error={error}>
      <Button onClick={() => router.back()}>Please retry again</Button>
    </ErrorComponent>
  );
}
