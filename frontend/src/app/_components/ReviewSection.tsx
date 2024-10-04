import React from "react";
import * as api from "@/network/api/review";
import StarRating from "@/utils/StarRating";
import { formatDate } from "@/utils/formatDate";

interface ReviewProps {
  review: ReviewProp[];
  status: string;
}

interface ReviewProp {
  client_username: string;
  product_id: string;
  rating: string;
  date_added: string;
  title: string;
  review: string;
}

export default async function ReviewSection({
  productID,
}: {
  productID: string;
}) {
  const reviews: ReviewProps = await api.getReview(productID);
  return (
    <div className="w-full p-4 sm:p-6 md:p-8 flex flex-col gap-4 text-base sm:text-lg">
      {reviews.review.length > 0 ? (
        <>
          <h1 className="text-center text-xl sm:text-2xl mb-4 sm:mb-6">
            Cum este văzut de către alți utilizatori
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {reviews.review.map((review, index) => {
              return (
                <div
                  key={index}
                  className="flex flex-col gap-4 p-4 sm:p-6 md:p-8 border border-gray-300 rounded-lg"
                >
                  <h2 className="text-lg sm:text-xl font-semibold">
                    {review.title}
                  </h2>
                  <p className="text-sm sm:text-base">{review.review}</p>
                  <StarRating
                    size={24}
                    disableHoverEffect={true}
                    defaultRating={Number(review.rating)}
                    disableRatingMessage={true}
                    color={"#3b82f6"}
                    cursor="default"
                  />
                  <p className="text-xs sm:text-sm text-gray-500">
                    {formatDate(review.date_added)}
                  </p>
                  <p className="text-xs sm:text-sm text-gray-500">
                    Review By: {review.client_username}
                  </p>
                </div>
              );
            })}
          </div>
        </>
      ) : (
        <h1 className="text-center text-xl sm:text-2xl">
          Momentan nu avem review-uri la acest produs
        </h1>
      )}
    </div>
  );
}
