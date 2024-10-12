import api from "../axiosInstance";

export async function searchProducts(
  page: string,
  productName: string,
  sort: string
) {
  if (sort === undefined || sort === null) {
    sort = "none";
  }
  const response = await api.get(
    `search/search/${page}/${productName}?sort=${sort}`
  );
  return response.data;
}
