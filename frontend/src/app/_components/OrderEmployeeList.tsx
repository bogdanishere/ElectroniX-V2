"use client";

import { formatDate } from "@/utils/formatDate";
import AcceptRejectCommandsByEmployee from "./AcceptRejectCommandsByEmployee";
import { useOptimistic } from "react";

interface OrdersProps {
  orders: OrdersProp[];
  message: string;
}

interface OrdersProp {
  orderEmployeeId: number;
  clientUsername: string;
  addressId: number;
  employeeUsername: string;
  dateCreated: string;
  employeeApproved: boolean;
}

export default function OrderEmployeeList({ orders }: { orders: OrdersProps }) {
  const [optimisticOrders, optimisticAcceptedOrderOperation] = useOptimistic<
    OrdersProp[],
    unknown
  >(orders.orders, (curOrders, orderId) => {
    return curOrders.filter((order) => order.orderEmployeeId !== orderId);
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
            key={order.orderEmployeeId}
            className="grid grid-cols-7 border-b p-2 items-center"
          >
            <div className="flex justify-center">{order.orderEmployeeId}</div>
            <div className="flex justify-center">{order.clientUsername}</div>
            <div className="flex justify-center">{order.addressId}</div>
            <div className="flex justify-center">{order.employeeUsername}</div>
            <div className="flex justify-center">
              {formatDate(order.dateCreated)}
            </div>
            <div className="flex justify-center">
              {order.employeeApproved ? "Yes" : "No"}
            </div>

            <AcceptRejectCommandsByEmployee
              orderId={order.orderEmployeeId}
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
