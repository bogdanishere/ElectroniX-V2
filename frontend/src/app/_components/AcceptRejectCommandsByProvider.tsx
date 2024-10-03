"use client";

import Button from "@/utils/Button";
import { confirmProviderOrder, deleteProviderOrder } from "../_lib/actions";
import { useRouter } from "next/navigation";

export default function AcceptRejectCommandsByProvider({
  orderId,
  page,
}: {
  orderId: number;
  page: number | string;
}) {
  const router = useRouter();
  async function hanleAccept(orderId: number, page: number | string) {
    try {
      await confirmProviderOrder(orderId, page);
    } catch (error) {
      router.push("/errorpage?error=InvalidData");
    }
  }
  async function hanleReject(orderId: number, page: number | string) {
    try {
      await deleteProviderOrder(orderId, page);
    } catch (error) {
      router.push("/error?error=This product has an order");
    }
  }
  return (
    <div className="flex gap-2">
      <Button onClick={() => hanleAccept(orderId, page)}>Accept</Button>
      <Button onClick={() => hanleReject(orderId, page)}>Reject</Button>
    </div>
  );
}
