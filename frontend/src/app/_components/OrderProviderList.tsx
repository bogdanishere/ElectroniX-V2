"use client";

import { formatDate } from "@/utils/formatDate";
import AcceptRejectCommandsByProvider from "./AcceptRejectCommandsByProvider";
import { useOptimistic } from "react";

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

export default function OrderProviderList({
  orders,
  params,
}: {
  orders: OrdersProps;
  params: { page: string };
}) {
  const [optimisticOrders, optimisticAcceptedOrderOperation] = useOptimistic<
    OrdersProp[],
    unknown
  >(orders.orders, (curOrders, orderId) => {
    return curOrders.filter((order) => order.order_detail_id !== orderId);
  });

  return (
    <div className="w-full h-auto">
      <div className="min-w-[640px]">
        <div className="grid grid-cols-7 gap-4 bg-gray-200 p-4 font-semibold text-sm">
          <div>Order ID</div>
          <div>Product ID</div>
          <div>Quantity</div>
          <div>Product Name</div>
          <div>Date Created</div>
          <div>Employee Approved</div>
          <div>Actions</div>
        </div>
        {optimisticOrders.length > 0 ? (
          optimisticOrders.map((order: OrdersProp) => (
            <div
              key={order.order_detail_id}
              className="grid grid-cols-7 gap-4 p-4 border-b hover:bg-gray-50"
            >
              <div>{order.order_detail_id}</div>
              <div>{order.product_id}</div>
              <div>{order.quantity}</div>
              <div className="relative group">
                <span className="cursor-pointer">
                  {order.product_name.slice(0, 10)}...
                </span>
                <span className="absolute left-0 top-full mt-2 w-48 p-2 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                  {order.product_name}
                </span>
              </div>
              <div>{formatDate(order.date_created)}</div>
              <div>{order.employee_approved ? "Yes" : "No"}</div>
              <div>
                <AcceptRejectCommandsByProvider
                  orderId={order.order_detail_id}
                  page={params.page}
                  optimisticAcceptedOrderOperation={
                    optimisticAcceptedOrderOperation
                  }
                />
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-7 p-4 text-center text-lg font-semibold">
            You are up to date with the orders
          </div>
        )}
      </div>
    </div>
  );
}
