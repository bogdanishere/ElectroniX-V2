"use client";

import Button from "@/utils/Button";
import { confirmOrder, deleteOrder } from "../_lib/actions";

export default function AcceptRejectCommandsByEmployee({
  orderId,
}: {
  orderId: number;
}) {
  async function hanleAccept(orderId: number) {
    await confirmOrder({ orderID: orderId });
  }
  async function hanleReject(orderId: number) {
    await deleteOrder({ orderID: orderId });
  }
  return (
    <div className="flex gap-2">
      <Button onClick={() => hanleAccept(orderId)}>Accept</Button>
      <Button onClick={() => hanleReject(orderId)}>Reject</Button>
    </div>
  );
}
