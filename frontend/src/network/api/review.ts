import api from "../axiosInstance";

export async function getReview(productID: string) {
  const response = await api.get(`/review/review/${productID}`);
  return response.data;
}

export async function addReview({
  productID,
  title,
  review,
  username,
  rating,
  token,
}: {
  productID: string;
  title: string;
  review: string;
  username: string;
  rating: number;
  token: string;
}) {
  const response = await api.post(
    "/review/review",
    {
      productID,
      title,
      review,
      username,
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
