import Link from "next/link";
import { getOrders } from "../_lib/actions";
import Button from "@/utils/Button";

import { redirect } from "next/navigation";
import { formatDate } from "@/utils/formatDate";
import { getTokenUsernameProfilePic } from "@/helpers/getUserDetails";

interface OrdersProps {
  orders: OrdersProp[];
}

interface OrdersProp {
  client_username: string;
  date_created: string;
  employee_approved: boolean;
  quantity: number;
  product_id: string;
  product_name: string;
  brand: string;
  price: string;
  currency: "USD";
  provider_approved: boolean;
  employee_username: string;
  status: "in pregatire";
  arrival_time: null;
}

export default async function Page() {
  const { token } = await getTokenUsernameProfilePic();

  if (!token) {
    redirect("/login");
  }

  const orders = (await getOrders()) as OrdersProps;

  console.log("orders", orders);

  return (
    <div className="flex flex-col justify-center">
      <div className="flex flex-col gap-10 justify-center items-center pt-5">
        {orders.orders.length === 0 ? (
          <h1 className="text-3xl">You didn&apos;t shop from us before.</h1>
        ) : (
          <h1 className="text-3xl">Products that you order before</h1>
        )}

        <div>
          <Link href="/electronix/1">
            <Button>Back to main page</Button>
          </Link>
        </div>
        {orders.orders.length > 0 && <OrderList orders={orders.orders} />}
      </div>
    </div>
  );
}

function OrderList({ orders }: OrdersProps) {
  return (
    <ul className="list-none">
      {orders.map((order, index) => (
        <li
          key={order.product_id + index}
          className="grid grid-cols-3 gap-5 border p-4 rounded-md shadow-md items-center"
        >
          <Link href={`/product/${order.product_id}`}>
            <div className="text-lg font-bold flex  items-center">
              {order.quantity} x {order.product_name}
            </div>
          </Link>
          <div className="text-sm text-gray-700 flex justify-center">
            Price: {order.price} {order.currency}
          </div>
          <div>
            {order.arrival_time ? (
              <div className="text-sm text-gray-500 flex justify-center">
                Arrival time: {formatDate(order.arrival_time)}
              </div>
            ) : (
              <div className="text-sm text-gray-500 flex justify-center">
                Status: {order.status}
              </div>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
}
