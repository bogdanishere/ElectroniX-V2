"use client";

import { formatDate } from "@/utils/formatDate";
import AcceptRejectCommandsByEmployee from "./AcceptRejectCommandsByEmployee";
import { useOptimistic } from "react";

interface OrdersProps {
  orders: OrdersProp[];
  message: string;
}

interface OrdersProp {
  order_id: number;
  client_username: string;
  address_id: number;
  employee_username: string;
  date_created: string;
  employee_approved: boolean;
}

export default function OrderEmployeeList({ orders }: { orders: OrdersProps }) {
  const [optimisticOrders, optimisticAcceptedOrderOperation] = useOptimistic<
    OrdersProp[],
    unknown
  >(orders.orders, (curOrders, orderId) => {
    return curOrders.filter((order) => order.order_id !== orderId);
  });
  return (
    <>
      <div className="grid grid-cols-7 font-bold bg-gray-200 p-5">
        <div className="flex justify-center">Order ID</div>
        <div className="flex justify-center">Client Username</div>
        <div className="flex justify-center">Address ID</div>
        <div className="flex justify-center">Employee Username</div>
        <div className="flex justify-center">Date Created</div>
        <div className="flex justify-center">Employee Approved</div>
        <div className="flex justify-center">Actions</div>
      </div>
      {optimisticOrders.length > 0 ? (
        optimisticOrders.map((order) => (
          <div
            key={order.order_id}
            className="grid grid-cols-7 border-b p-2 items-center"
          >
            <div className="flex justify-center">{order.order_id}</div>
            <div className="flex justify-center">{order.client_username}</div>
            <div className="flex justify-center">{order.address_id}</div>
            <div className="flex justify-center">{order.employee_username}</div>
            <div className="flex justify-center">
              {formatDate(order.date_created)}
            </div>
            <div className="flex justify-center">
              {order.employee_approved ? "Yes" : "No"}
            </div>

            <AcceptRejectCommandsByEmployee
              orderId={order.order_id}
              optimisticAcceptedOrderOperation={
                optimisticAcceptedOrderOperation
              }
            />
          </div>
        ))
      ) : (
        <div className="flex justify-center items-center p-2">
          There are no orders needed to be verified.
        </div>
      )}
    </>
  );
}
