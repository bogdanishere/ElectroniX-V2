"use client";

import { useOptimistic } from "react";
import ProductCardProvider from "./ProductCardProvider";

interface ProductsProps {
  products: ProductProps[];
}

interface ProductProps {
  productId: string;
  price: number;
  currency: string;
  weight: string;
  name: string;
  brand: string;
  quantity: number;
  pricesAvailability: string;
  pricesMerchant: string;
  categories: string;
  dateAdded: string;
  dateUpdated: string;
  imageUrls: string;
  rating: number;
  nrOfRatings: number;
  description: string;
  quality: number;
}

export default function ProductListProvider({
  products,
  params,
}: {
  products: ProductsProps;
  params: { page: string };
}) {
  const [optimisticProducts, updateOptimisticProducts] = useOptimistic<
    ProductProps[],
    { type: string; product?: ProductProps; productId?: string }
  >(products.products, (state, action) => {
    switch (action.type) {
      case "delete":
        return state.filter(
          (product) => product.productId !== action.productId
        );
      case "revertDelete":
        return action.product ? [...state, action.product] : state;
      default:
        return state;
    }
  });

  return (
    <div className="max-w-screen-xl mx-auto grid grid-rows-auto grid-cols-4 gap-5 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 pt-5">
      {optimisticProducts.length > 0 ? (
        optimisticProducts.map((product: ProductProps) => (
          <ProductCardProvider
            key={product.productId}
            dataProduct={product}
            optimisticDeleteProductOperation={updateOptimisticProducts}
            page={params.page}
          />
        ))
      ) : (
        <div className=" w-screen text-center text-2xl font-bold pt-5 pb-5">
          You didn&apos;t add any products yet. Please add some products to your
          list.
        </div>
      )}
    </div>
  );
}
