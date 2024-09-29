import { Pagination } from "@/app/_components/Pagination";
import ProductList from "@/app/_components/ProductList";
import Spinner from "@/utils/Spinner";
import * as api from "@/network/api/products";
import { Suspense } from "react";
import { restrictionAdmins } from "@/helpers/restrictionAdmins";

interface SearchParamsProp {
  sort: "asc" | "desc" | "none";
}

// generateStaticParams() // This function is used to generate static paths for the page

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
  const products = await api.getProducts({
    page: parseInt(params.page),
    sort: searchParams.sort,
    limit: 5,
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
