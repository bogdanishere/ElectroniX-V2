"use client";

import Image from "next/image";
import { startTransition, useEffect, useState } from "react";
import StarRating from "@/utils/StarRating";
import { convertAmount, formatCurrency } from "@/helpers/formatCurrency";
import { useActualCurrency } from "@/hooks/useActualCurrency";
import Button from "@/utils/Button";
import { deleteProviderProduct } from "../_lib/actions";

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

export default function ProductCardProvider({
  dataProduct,
  optimisticDeleteProductOperation,
  page,
}: {
  dataProduct: ProductProps;
  optimisticDeleteProductOperation: (action: {
    type: string;
    product?: ProductProps;
    productId?: string;
  }) => void;
  page: number | string;
}) {
  const {
    productId,
    imageUrls: images,
    name,
    rating,
    nrOfRatings: numberOfRatings,
    price,
    currency,
  } = dataProduct;

  const { currency: currencySelectedByUser } = useActualCurrency();

  const [currencyPrice, setCurrencyPrice] = useState(price);

  const [imageSrc, setImageSrc] = useState(images);

  async function handleDeleteProduct(productId: string) {
    startTransition(() => {
      optimisticDeleteProductOperation({
        type: "delete",
        productId: productId,
      });
    });

    try {
      await deleteProviderProduct(productId, page);
    } catch (error) {
      startTransition(() => {
        optimisticDeleteProductOperation({
          type: "revertDelete",
          product: dataProduct,
        });
      });
    }
  }

  function handleImageError() {
    setImageSrc("https://via.placeholder.com/300");
  }

  useEffect(() => {
    convertAmount(+price, currency, currencySelectedByUser).then((data) => {
      setCurrencyPrice(data.toString());
    });
  }, [currency, currencySelectedByUser, price]);

  return (
    <div className="flex flex-col gap-2">
      <div className="max-w-xs border border-gray-300 rounded-lg overflow-hidden font-sans">
        <div className="text-center bg-white">
          <Image
            src={imageSrc}
            alt={name}
            width={300}
            height={300}
            className="w-72 h-72 p-8 object-contain"
            onError={handleImageError}
          />
        </div>
        <div className="relative flex justify-center group">
          <span className="group-hover:block hidden absolute bottom-full mb-2 p-2 bg-gray-800 text-white text-sm rounded">
            {name}
          </span>
          {name.slice(0, 20)}...
        </div>
        <div className="flex items-center justify-center gap-2">
          <span className="text-yellow-500">
            <StarRating
              size={16}
              disableHoverEffect={true}
              defaultRating={Number(rating)}
              disableRatingMessage={true}
              color="#3b82f6"
              cursor="default"
            />
          </span>
          <span className="text-gray-600 text-sm">
            {rating} ({numberOfRatings})
          </span>
        </div>
        <div className="flex items-center justify-center">
          <span className="text-red-500 text-lg font-bold">
            {formatCurrency(+currencyPrice, currencySelectedByUser)}
          </span>
        </div>
        <div className="p-2 bg-gray-100 text-center">
          <Button onClick={() => handleDeleteProduct(productId)}>
            Delete product
          </Button>
        </div>
      </div>
    </div>
  );
}
