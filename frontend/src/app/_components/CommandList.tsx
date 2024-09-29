"use client";
import { convertAmount } from "@/helpers/formatCurrency";
import { useActualCurrency } from "@/hooks/useActualCurrency";
import Button from "@/utils/Button";
import Link from "next/link";
import { useEffect, useState } from "react";
import { paymentStripe } from "../_lib/actions";
import { redirect } from "next/navigation";

interface ProductProps {
  id: string;
  name: string;
  price: number;
  provider: string;
  quantity: number;
  currency: string;
}

export default function CommandList() {
  const { currency } = useActualCurrency();
  const [products, setProducts] = useState<ProductProps[] | null>(null);
  const [convertedPrices, setConvertedPrices] = useState<number[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedProducts = localStorage.getItem("cartProducts");
      const parsedProducts = JSON.parse(storedProducts || "[]");
      setProducts(parsedProducts);
    }
  }, []);

  useEffect(() => {
    if (products && currency) {
      const convertPrices = async () => {
        const pricePromises = products.map((product) =>
          convertAmount(product.price, product.currency, currency)
        );
        const converted = await Promise.all(pricePromises);
        setConvertedPrices(converted.map((price) => Number(price)));
        setTotalPrice(
          converted.reduce(
            (acc, price, index) => acc + +price * products[index].quantity,
            0
          )
        );
      };
      convertPrices();
    }
  }, [products, currency]);

  if (products?.length === 0) redirect("/electronix/1");
  return (
    <>
      <ul className="list-none">
        {products &&
          products.map((product, index) => (
            <li className="flex justify-between gap-9" key={index}>
              <div>
                {product.quantity} x {product.name}
              </div>
              <div>
                Price: {convertedPrices[index]?.toFixed(2)} {currency}
              </div>
            </li>
          ))}
        {products && products.length === 0 && <div>No products in cart</div>}
      </ul>
      <div>
        The total amount for your selected products is:{" "}
        <strong>
          {totalPrice.toFixed(2)} {currency}
        </strong>
      </div>
      <div className="flex gap-20">
        <Button onClick={() => paymentStripe(totalPrice, currency)}>
          Submit
        </Button>

        <Link href="/electronix/1">
          <Button>Go back</Button>
        </Link>
      </div>
    </>
  );
}
