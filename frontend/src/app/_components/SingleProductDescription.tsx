"use client";

import Image from "next/image";

import { Suspense, useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/utils/Button";
import StarRating from "@/utils/StarRating";
import { handleAddToCart } from "@/helpers/addToCard";
import { handleAddToWishlist } from "@/helpers/addToWishlist";
import Spinner from "@/utils/Spinner";
import { useButtonsFunctionality } from "@/hooks/useButtonsFunctionality";

interface ProductDetails {
  product_id: string;
  name: string;
  brand: string;
  price: string;
  currency: string;
  categories: string;
  dateAdded: string;
  dateUpdated: string;
  description: string;
  imageURLs: string[];
  rating: string;
  nr_rating: number;
  prices_availability: string;
  prices_condition: string;
  prices_merchant: string;
  prices_sourceURLs: string;
  quality: string;
  quantity: number;
  weight: string;
}

interface ProductStatus {
  product: ProductDetails;
  status: string;
}

export default function SingleProductDescription({
  children,
  dataProduct,
}: {
  children: React.ReactNode;
  dataProduct: ProductStatus;
}) {
  const router = useRouter();
  const { setOpenReview } = useButtonsFunctionality();

  const {
    product_id,
    prices_merchant: provider,
    price,
    imageURLs,
    name,
    description,
    rating,
    nr_rating: nrRating,
  } = dataProduct.product;

  const [imageSrc, setImageSrc] = useState(imageURLs[0]);
  function handleImageError() {
    setImageSrc("https://via.placeholder.com/300");
  }

  return (
    <div className="flex flex-col gap-32">
      <div className="grid grid-cols-2 gap-5">
        <div className="flex flex-col gap-5">
          <h1 className="text-4xl font-bold">{name}</h1>
          <h2 className="text-2xl">{description}</h2>
        </div>
        <div className="relative flex justify-center items-center">
          <Image
            src={imageSrc}
            alt={name}
            className="object-cover"
            width={450}
            height={450}
            onError={handleImageError}
          />
          <div className="absolute top-0 right-20">
            <Button className="w-32" onClick={() => router.back()}>
              Back
            </Button>
          </div>
        </div>
      </div>

      <div>
        <ol className="flex justify-around text-2xl">
          <li className="flex justify-center flex-col gap-5">
            <div>Adaugati-va produsul acum</div>
            <div className="text-center">
              <Button
                className="w-64"
                onClick={() =>
                  handleAddToCart(product_id, name, provider, price)
                }
              >
                Adauga in cos
              </Button>
            </div>
            <div className="text-center">
              <Button
                className="w-64"
                onClick={() =>
                  handleAddToWishlist(product_id, name, provider, price)
                }
              >
                Adauga la Favorite
              </Button>
            </div>
          </li>
          <li className="flex flex-col gap-5">
            <div>Notele acordate de catre utilizatori</div>
            <div className="flex gap-4 justify-center">
              <StarRating
                size={32}
                disableHoverEffect={true}
                defaultRating={Number(rating) || 0}
                disableRatingMessage={true}
                color={"#3b82f6"}
                cursor="default"
              />
              <h1>
                {rating} ({nrRating})
              </h1>
            </div>
          </li>
          <li className="flex flex-col gap-5 text-center">
            <div>Detii sau ai utilizat produsul?</div>
            <div>Spune-ti parerea acordand o nota produsului</div>
            <div className="text-center">
              <Button className="w-64" onClick={() => setOpenReview(true)}>
                Adauga un review
              </Button>
            </div>
          </li>
        </ol>
      </div>

      <Suspense fallback={<Spinner />}>{children}</Suspense>
    </div>
  );
}
