"use client";
import Button from "@/utils/Button";
import { useRouter, useSearchParams } from "next/navigation";

export function Pagination({ page }: { page: number }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  function handlePrevious() {
    if (page <= 1) return;
    router.replace(`${page - 1}?${searchParams.toString()}`);
  }

  function handleNext() {
    router.replace(`${page + 1}?${searchParams.toString()}`);
  }
  return (
    <div className="flex flex-row justify-center items-center gap-4 pt-5">
      <Button className="w-28" onClick={handlePrevious}>
        Previous
      </Button>
      <Button className="border-none cursor-default hover:bg-blue-500">
        {page}
      </Button>
      <Button onClick={handleNext}>Next</Button>
    </div>
  );
}
