import api from "../axiosInstance";

export async function searchProducts(
  page: string,
  productName: string,
  sort: string
) {
  try {
    if (sort === undefined || sort === null) {
      sort = "none";
    }
    const response = await api.get(`search/search/${page}/${productName}`, {
      params: { sort },
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
}
