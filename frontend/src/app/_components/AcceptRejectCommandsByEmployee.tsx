"use client";

import Button from "@/utils/Button";
import { confirmOrder, deleteOrder } from "../_lib/actions";

export default function AcceptRejectCommandsByEmployee({
  orderId,
  optimisticAcceptedOrderOperation,
}: {
  orderId: number;
  optimisticAcceptedOrderOperation: (orderId: number) => void;
}) {
  async function hanleAccept(orderId: number) {
    optimisticAcceptedOrderOperation(orderId);
    await confirmOrder({ orderID: orderId });
  }
  async function hanleReject(orderId: number) {
    optimisticAcceptedOrderOperation(orderId);
    await deleteOrder({ orderID: orderId });
  }
  return (
    <div className="flex gap-2">
      <Button onClick={() => hanleAccept(orderId)}>Accept</Button>
      <Button onClick={() => hanleReject(orderId)}>Reject</Button>
    </div>
  );
}
