import { verifyRestriction } from "@/helpers/verifyRestriction";

import { formatDate } from "@/utils/formatDate";
import AcceptRejectCommandsByProvider from "@/app/_components/AcceptRejectCommandsByProvider";
import FormProviderAddProduct from "@/app/_components/FormProviderAddProduct";
import { getProviderProducts, showOrdersProvider } from "@/app/_lib/actions";

import { Pagination } from "@/app/_components/Pagination";

import ProductCardProvider from "@/app/_components/ProductCardProvider";

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
      <div className="grid grid-cols-7 font-bold bg-gray-200 p-5">
        <div className="flex justify-center">Order ID</div>
        <div className="flex justify-center">Product ID</div>
        <div className="flex justify-center">Quantity</div>
        <div className="flex justify-center">Product Name</div>
        <div className="flex justify-center">Date Created</div>
        <div className="flex justify-center">Employee Approved</div>
        <div className="flex justify-center">Actions</div>
      </div>
      {orders.orders.length > 0 ? (
        orders.orders.map((order) => (
          <div
            key={order.order_detail_id}
            className="grid grid-cols-7 p-5 border-b"
          >
            <div className="flex justify-center">{order.order_detail_id}</div>
            <div className="flex justify-center">{order.product_id}</div>
            <div className="flex justify-center">{order.quantity}</div>
            <div className="relative flex justify-center group">
              <span className="group-hover:block hidden absolute bottom-full mb-2 p-2 bg-gray-800 text-white text-sm rounded">
                {order.product_name}
              </span>
              {order.product_name.slice(0, 10)}...
            </div>

            <div className="flex justify-center">
              {formatDate(order.date_created)}
            </div>
            <div className="flex justify-center">
              {order.employee_approved ? "yes" : " no"}
            </div>
            <AcceptRejectCommandsByProvider
              orderId={order.order_detail_id}
              page={params.page}
            />
          </div>
        ))
      ) : (
        <div className="flex justify-center items-center text-2xl font-bold pt-5">
          You are up to date with the orders
        </div>
      )}
      <div className="flex justify-center items-center text-2xl font-bold pt-5">
        Add your products to us
      </div>
      <FormProviderAddProduct page={params.page} />
      <div className="flex justify-center items-center text-2xl font-bold pt-5 pb-5">
        Your products are there
      </div>
      <div className="max-w-screen-xl mx-auto grid grid-rows-auto grid-cols-4 gap-5 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 pt-5">
        {products.products.map((product) => (
          <ProductCardProvider
            key={product.product_id}
            dataProduct={product}
            page={params.page}
          />
        ))}
      </div>

      <Pagination page={parseInt(params.page)} />
    </div>
  );
}
