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
  orderProviderId: number;
  orderEmployeeId: number;
  productId: string;
  providerUsername: string;
  providerApproved: boolean;
  quantity: number;
  arrivalDate: string;
  status: string;
}

interface ProductsProps {
  products: ProductProps[];
}

interface ProductProps {
  productId: string;
  price: number;
  currency: string;
  weight: string;
  name: string;
  brand: string;
  quantity: number;
  pricesAvailability: string;
  pricesMerchant: string;
  categories: string;
  dateAdded: string;
  dateUpdated: string;
  imageUrls: string;
  rating: number;
  nrOfRatings: number;
  description: string;
  quality: number;
}

export default async function Page({ params }: { params: { page: string } }) {
  await verifyRestriction("PROVIDER");

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
