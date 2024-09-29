"use client";

import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { ReactNode } from "react";

type FilterProps = "asc" | "desc" | "none";

export default function Filter() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  function handleFilter(filter: FilterProps) {
    const params = new URLSearchParams(searchParams);
    if (
      filter !== "none" &&
      filter !== "asc" &&
      filter !== "desc" &&
      !params.get("sort")
    ) {
      filter = "none";
    }

    params.set("sort", filter);
    router.replace(`${pathname}?${params.toString()}`);
  }

  const activeFilter = (searchParams.get("sort") as FilterProps) ?? "none";

  return (
    <div>
      <Button
        filter="asc"
        activeFilter={activeFilter}
        handleFilter={handleFilter}
      >
        Sort Asc
      </Button>
      <Button
        filter="desc"
        activeFilter={activeFilter}
        handleFilter={handleFilter}
      >
        Sort Desc
      </Button>
      <Button
        filter="none"
        activeFilter={activeFilter}
        handleFilter={handleFilter}
      >
        Sort None
      </Button>
    </div>
  );
}

function Button({
  children,
  filter,
  activeFilter,
  handleFilter,
}: {
  children: ReactNode;
  filter: FilterProps;
  activeFilter: FilterProps;
  handleFilter: (filter: FilterProps) => void;
}) {
  return (
    <button
      className={`w-full h-auto text-grey-700 border-none rounded-full text-sm p-4 font-bold cursor-pointer transition duration-300
          ${filter === activeFilter ? "bg-slate-100 text-primary-50" : ""}
          `}
      onClick={() => handleFilter(filter)}
    >
      {children}
    </button>
  );
}
