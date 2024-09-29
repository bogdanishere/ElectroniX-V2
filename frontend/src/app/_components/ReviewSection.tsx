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
    <div className="w-full p-8 flex flex-col gap-4 text-2xl">
      {reviews.review.length > 0 ? (
        <>
          <h1 className="text-center">
            Cum este văzut de către alți utilizatori
          </h1>
          {reviews.review.map((review, index) => {
            return (
              <div
                key={index}
                className="flex flex-col gap-4 p-8 border border-gray-300 rounded-lg"
              >
                <h2>{review.title}</h2>
                <h3>{review.review}</h3>
                <StarRating
                  size={32}
                  disableHoverEffect={true}
                  defaultRating={Number(review.rating)}
                  disableRatingMessage={true}
                  color={"#3b82f6"}
                  cursor="default"
                />
                <h3>{formatDate(review.date_added)}</h3>
                <h3>Review By: {review.client_username}</h3>
              </div>
            );
          })}
        </>
      ) : (
        <h1 className="text-center">
          Momentan nu avem review-uri la acest produs
        </h1>
      )}
    </div>
  );
}
