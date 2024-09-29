"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import StarRating from "@/utils/StarRating";
import { convertAmount, formatCurrency } from "@/helpers/formatCurrency";
import { useActualCurrency } from "@/hooks/useActualCurrency";
import Button from "@/utils/Button";
import { deleteProviderProduct } from "../_lib/actions";

interface ProductProps {
  product_id: string;
  price: string;
  currency: string;
  weight: string;
  name: string;
  brand: string;
  quantity: number;
  prices_availability: string;
  prices_condition: string;
  prices_merchant: string;
  prices_sourceURLs: string;
  categories: string;
  dateAdded: string;
  dateUpdated: string;
  imageURLs: string;
  sourceURLs: string;
  rating: string;
  nr_rating: number;
  description: string;
  quality: string;
}

export default function ProductCardProvider({
  dataProduct,
  page,
}: {
  dataProduct: ProductProps;
  page: number | string;
}) {
  const {
    product_id,
    imageURLs: images,
    name,
    rating,
    nr_rating: numberOfRatings,
    price,
    currency,
  } = dataProduct;

  const { currency: currencySelectedByUser } = useActualCurrency();

  const [currencyPrice, setCurrencyPrice] = useState(price);

  const [imageSrc, setImageSrc] = useState(() => {
    if (typeof images === "string") {
      return images.split(",").map((url) => url.trim());
    } else if (Array.isArray(images)) {
      return images;
    } else {
      return [];
    }
  });

  async function handleDeleteProduct(product_id: string) {
    await deleteProviderProduct(product_id, page);
  }

  function handleImageError() {
    setImageSrc(["https://via.placeholder.com/300"]);
  }

  useEffect(() => {
    convertAmount(+price, currency, currencySelectedByUser).then((data) => {
      setCurrencyPrice(data.toString());
    });
  }, [currency, currencySelectedByUser, price]);

  // imageSrc[0].length === 1 ? imageSrc : imageSrc[0]

  return (
    <div className="flex flex-col gap-2">
      <div className="max-w-xs border border-gray-300 rounded-lg overflow-hidden font-sans">
        <div className="text-center bg-white">
          <Image
            src={imageSrc[0]}
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
          <Button onClick={() => handleDeleteProduct(product_id)}>
            Delete product
          </Button>
        </div>
      </div>
    </div>
  );
}
