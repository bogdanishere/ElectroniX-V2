"use client";

import { useEffect, useState } from "react";
import { commandConfirm } from "../_lib/actions";

interface ProductProps {
  id: string;
  name: string;
  price: number;
  provider: string;
  quantity: number;
  currency: string;
}

export default function CommandSended({ sessionId }: { sessionId: string }) {
  const [products, setProducts] = useState<ProductProps[] | null>(null);

  useEffect(() => {
    const loadProducts = () => {
      if (typeof window !== "undefined") {
        const storedProducts = localStorage.getItem("cartProducts");
        const parsedProducts = JSON.parse(storedProducts || "[]");
        setProducts(parsedProducts);
      }
    };

    loadProducts();
  }, []);

  useEffect(() => {
    if (products && products.length > 0) {
      const handleCommand = async (products: ProductProps[]) => {
        const sendCommand = {
          products: products.map((product) => ({
            productId: product.id,
            providerUsername: product.provider,
            quantity: product.quantity,
          })),
        };

        try {
          await commandConfirm(sendCommand, sessionId);

          localStorage.removeItem("cartProducts");
        } catch (error) {}
      };

      handleCommand(products);
    }
  }, [products, sessionId]);

  return (
    <div>
      <h1>Command was successfully sended</h1>
    </div>
  );
}
