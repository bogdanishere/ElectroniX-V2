"use client";

import { formatDate } from "@/utils/formatDate";
import AcceptRejectCommandsByProvider from "./AcceptRejectCommandsByProvider";
import { useOptimistic } from "react";

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
    return curOrders.filter((order) => order.orderProviderId !== orderId);
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
              key={order.orderProviderId}
              className="grid grid-cols-7 gap-4 p-4 border-b hover:bg-gray-50"
            >
              <div>{order.orderProviderId}</div>
              <div>{order.productId}</div>
              <div>{order.quantity}</div>
              <div className="relative group">
                <span className="cursor-pointer">
                  {order.status.slice(0, 10)}...
                </span>
                <span className="absolute left-0 top-full mt-2 w-48 p-2 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                  {order.status}
                </span>
              </div>
              <div>{formatDate(order.arrivalDate)}</div>
              <div>{order.providerApproved ? "Yes" : "No"}</div>
              <div>
                <AcceptRejectCommandsByProvider
                  orderId={order.orderProviderId}
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
