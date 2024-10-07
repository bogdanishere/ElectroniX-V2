import { Pagination } from "@/app/_components/Pagination";
import ProductList from "@/app/_components/ProductList";
import Spinner from "@/utils/Spinner";
import * as api from "@/network/api/products";
import { Suspense } from "react";
import { restrictionAdmins } from "@/helpers/restrictionAdmins";
import { notFound } from "next/navigation";

interface SearchParamsProp {
  sort: "asc" | "desc" | "none";
}

// export async function generateStaticParams() {
//   return [{ page: "1" }, { page: "2" }, { page: "3" }];
// }

export const dynamicParams = true;

export async function generateMetadata({
  params,
}: {
  params: { page: string };
}) {
  return {
    title: `Electronix Page ${params.page}`,
    description: `Page ${params.page} of products`,
  };
}

export default async function Client({
  params,
  searchParams,
}: {
  params: { page: string };
  searchParams: SearchParamsProp;
}) {
  await restrictionAdmins();

  const pageNumber = parseInt(params.page, 10);

  if (isNaN(pageNumber) || pageNumber < 1) {
    notFound();
  }

  const products = await api.getProducts({
    page: parseInt(params.page),
    sort: searchParams.sort,
  });

  return (
    <main className="p-16 px-20 pb-24 bg-gray-100">
      <Suspense fallback={<Spinner />}>
        <ProductList dataProducts={products} />
      </Suspense>

      <Pagination page={parseInt(params.page)} />
    </main>
  );
}
