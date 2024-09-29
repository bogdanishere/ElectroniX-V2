import ErrorComponent from "@/app/_components/ErrorComponent";
import { Pagination } from "@/app/_components/Pagination";
import ProductList from "@/app/_components/ProductList";
import { searchProducts } from "@/app/_lib/actions";
import Button from "@/utils/Button";
import Spinner from "@/utils/Spinner";
import Link from "next/link";
import { Suspense } from "react";

export async function generateMetadata({
  searchParams,
}: {
  searchParams: { productName: string; error?: string };
}) {
  return {
    title: `Electronix ${searchParams.productName || searchParams.error}`,
    description: `Search ${searchParams.productName || searchParams.error}`,
  };
}

export default async function Page({
  searchParams,
  params,
}: {
  searchParams: { productName: string; error?: string; sort?: string };
  params: { page: string };
}) {
  const { productName, error, sort } = searchParams;
  const { page } = params;

  const searchProduct = await searchProducts(page, productName, sort || "none");

  if (error) {
    return (
      <ErrorComponent error={error}>
        <Link href={`/electronix/1`}>
          <Button>Go back</Button>
        </Link>
      </ErrorComponent>
    );
  }

  return (
    <main className="p-16 px-20 pb-24 bg-gray-100">
      <Suspense fallback={<Spinner />}>
        <ProductList dataProducts={searchProduct} />
      </Suspense>

      <Pagination page={parseInt(params.page)} />
    </main>
  );
}
