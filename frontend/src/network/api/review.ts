import api from "../axiosInstance";

export async function getReview(productID: string) {
  const response = await api.get(`/review/review/${productID}`);
  return response.data;
}

export async function addReview({
  productID,
  title,
  review,
  clientUsername,
  rating,
  token,
}: {
  productID: string;
  title: string;
  review: string;
  clientUsername: string;
  rating: number;
  token: string;
}) {
  const response = await api.post(
    "/review/review",
    {
      productID,
      title,
      review,
      username: clientUsername,
      rating,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
}
