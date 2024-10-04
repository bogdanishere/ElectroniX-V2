"use client";

import { FaHeart } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import StarRating from "@/utils/StarRating";
import { convertAmount, formatCurrency } from "@/helpers/formatCurrency";
import { useActualCurrency } from "@/hooks/useActualCurrency";
import { handleAddToCart } from "@/helpers/addToCard";
import { handleAddToWishlist } from "@/helpers/addToWishlist";

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
  imageurls: string[];
  sourceURLs: string;
  rating: string;
  nr_rating: number;
  description: string;
  quality: string;
}

export default function ProductCard({
  dataProduct,
}: {
  dataProduct: ProductProps;
}) {
  const {
    product_id,
    imageurls: images,
    name,
    rating,
    nr_rating: numberOfRatings,
    prices_merchant: provider,
    price,
    currency,
  } = dataProduct;

  const { currency: currencySelectedByUser } = useActualCurrency();

  const [currencyPrice, setCurrencyPrice] = useState(price);

  const [imageSrc, setImageSrc] = useState(() => {
    if (typeof images === "string") {
      // @ts-expect-error - images is a string
      return images.split(",").map((url) => url.trim());
    } else if (Array.isArray(images)) {
      return images;
    } else {
      return [];
    }
  });

  function handleImageError() {
    setImageSrc("https://via.placeholder.com/300");
  }

  useEffect(() => {
    convertAmount(+price, currency, currencySelectedByUser).then((data) => {
      setCurrencyPrice(data.toString());
    });
  }, [currency, currencySelectedByUser, price]);

  return (
    <div className="flex flex-col gap-2 w-full">
      <div className="w-full max-w-xs mx-auto border border-gray-300 rounded-lg overflow-hidden font-sans shadow-md hover:shadow-lg transition-shadow duration-300">
        <div className="text-center bg-white">
          <Link href={`/product/${product_id}`}>
            <Image
              src={imageSrc[0].length === 1 ? imageSrc : imageSrc[0]}
              alt={name}
              width={300}
              height={300}
              className="w-full h-48 sm:h-56 md:h-64 lg:h-72 p-4 object-contain"
              onError={handleImageError}
            />
          </Link>
        </div>
        <div className="p-2 flex justify-between items-center">
          <span className="bg-red-500 text-white text-xs flex justify-center items-center py-1 px-2 rounded-full truncate max-w-[70%]">
            {provider.slice(0, 17).toUpperCase()}
          </span>
          <FaHeart
            className="text-xl sm:text-2xl cursor-pointer text-gray-400 hover:text-red-500 transition-colors duration-300"
            onClick={() =>
              handleAddToWishlist(product_id, name, provider, price)
            }
          />
        </div>
        <div className="relative flex justify-center group px-2">
          <span className="group-hover:block hidden absolute bottom-full mb-2 p-2 bg-gray-800 text-white text-xs sm:text-sm rounded z-10 max-w-[90%] truncate">
            {name}
          </span>
          <p className="text-sm sm:text-base truncate">{name}</p>
        </div>
        <div className="flex items-center justify-center gap-2 my-2">
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
          <span className="text-gray-600 text-xs sm:text-sm">
            {rating} ({numberOfRatings})
          </span>
        </div>
        <div className="flex items-center justify-center mb-2">
          <span className="text-red-500 text-base sm:text-lg font-bold">
            {formatCurrency(+currencyPrice, currencySelectedByUser)}
          </span>
        </div>
        <div className="p-2 bg-gray-100 text-center">
          <button
            className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-full transition-all duration-300 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 text-sm sm:text-base"
            onClick={() => handleAddToCart(product_id, name, provider, price)}
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
}
