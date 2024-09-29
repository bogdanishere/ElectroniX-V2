"use client";

import Button from "@/utils/Button";
import { confirmProviderOrder, deleteProviderOrder } from "../_lib/actions";

export default function AcceptRejectCommandsByProvider({
  orderId,
  page,
}: {
  orderId: number;
  page: number | string;
}) {
  async function hanleAccept(orderId: number, page: number | string) {
    await confirmProviderOrder(orderId, page);
  }
  async function hanleReject(orderId: number, page: number | string) {
    await deleteProviderOrder(orderId, page);
  }
  return (
    <div className="flex gap-2">
      <Button onClick={() => hanleAccept(orderId, page)}>Accept</Button>
      <Button onClick={() => hanleReject(orderId, page)}>Reject</Button>
    </div>
  );
}
