import { verifyRestriction } from "@/helpers/verifyRestriction";

import FormProviderAddProduct from "@/app/_components/FormProviderAddProduct";
import { getProviderProducts, showOrdersProvider } from "@/app/_lib/actions";

import { Pagination } from "@/app/_components/Pagination";

import OrderProviderList from "@/app/_components/OrderProviderList";
import ProductListProvider from "@/app/_components/ProductListProvider";

export const dynamicParams = true;

interface OrdersProps {
  orders: OrdersProp[];
  message: string;
}

interface OrdersProp {
  order_detail_id: number;
  order_id: number;
  product_id: string;
  quantity: number;
  product_name: string;
  date_created: string;
  employee_approved: number;
  provider_username: string;
}

interface ProductsProps {
  products: ProductProps[];
}

interface ProductProps {
  product_id: string;
  price: string;
  currency: string;
  weight: string;
  name: string;
  brand: string;
  quantity: number;
  prices_availability: string;
  prices_condition: string;
  prices_merchant: string;
  prices_sourceURLs: string;
  categories: string;
  dateAdded: string;
  dateUpdated: string;
  imageurls: string;
  sourceURLs: string;
  rating: string;
  nr_rating: number;
  description: string;
  quality: string;
}

export default async function Page({ params }: { params: { page: string } }) {
  await verifyRestriction("provider");

  const orders: OrdersProps = await showOrdersProvider();

  const products: ProductsProps = await getProviderProducts(+params.page);

  return (
    <div className="p-9">
      <OrderProviderList orders={orders} params={params} />
      <div className="flex justify-center items-center text-2xl font-bold pt-5">
        Add your products to us
      </div>
      <FormProviderAddProduct page={params.page} />
      <div className="flex justify-center items-center text-2xl font-bold pt-5 pb-5">
        Your products are there
      </div>
      <ProductListProvider products={products} params={params} />

      <Pagination page={parseInt(params.page)} />
    </div>
  );
}
