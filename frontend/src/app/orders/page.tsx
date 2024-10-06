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
  status: "preparing" | "in_transit";
  arrival_time: null;
}

export default async function Page() {
  const { token } = await getTokenUsernameProfilePic();

  if (!token) {
    redirect("/login");
  }

  const orders = (await getOrders()) as OrdersProps;

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 p-4 sm:p-6 md:p-8">
      <div className="flex flex-col gap-6 sm:gap-8 md:gap-10 justify-center items-center pt-5 max-w-4xl mx-auto w-full">
        {orders.orders.length === 0 ? (
          <h1 className="text-2xl sm:text-3xl md:text-4xl text-center font-bold text-gray-800">
            You haven&apos;t shopped with us before.
          </h1>
        ) : (
          <h1 className="text-2xl sm:text-3xl md:text-4xl text-center font-bold text-gray-800">
            Products that you ordered before
          </h1>
        )}

        <div className="w-full sm:w-auto">
          <Link href="/electronix/1">
            <Button className="w-full sm:w-auto">Back to main page</Button>
          </Link>
        </div>
        {orders.orders.length > 0 && <OrderList orders={orders.orders} />}
      </div>
    </div>
  );
}

function OrderList({ orders }: OrdersProps) {
  return (
    <ul className="list-none w-full space-y-4">
      {orders.map((order, index) => (
        <li
          key={order.product_id + index}
          className="bg-white border border-gray-200 rounded-lg shadow-md transition-all duration-300 hover:shadow-lg"
        >
          <div className="p-4 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <Link href={`/product/${order.product_id}`} className="flex-grow">
              <div className="text-base sm:text-lg font-bold flex items-center">
                <div className="relative group">
                  <span className="hidden group-hover:block absolute left-0 bottom-full mb-2 p-2 bg-gray-800 text-white text-xs rounded z-10 w-64 sm:w-80">
                    {order.quantity} x {order.product_name}
                  </span>
                  <p className="text-sm sm:text-base truncate max-w-xs sm:max-w-sm">
                    {order.quantity} x{" "}
                    {order.product_name.length > 20
                      ? `${order.product_name.slice(0, 20)}...`
                      : order.product_name}
                  </p>
                </div>
              </div>
            </Link>
            <div className="text-sm text-gray-700 flex items-center">
              Price: {order.price} {order.currency}
            </div>
            <div className="text-sm text-gray-500 flex items-center">
              {order.status === "in_transit" ? (
                <span>Arrival: {formatDate(order.arrival_time || "")}</span>
              ) : (
                <span>Status: {order.status}</span>
              )}
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
