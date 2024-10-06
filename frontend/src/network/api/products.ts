import api from "../axiosInstance";

interface GetProductsProps {
  page: number;
  sort: "asc" | "desc" | "none";
  limit: number;
}

export async function getProducts({ page, sort, limit }: GetProductsProps) {
  if (sort === undefined || sort === null) {
    sort = "none";
    limit = 5;
  }

  const response = await api.get(
    `/products/products?page=${+page}&sort=${sort}&limit=${limit}`
  );
  return response.data;
}

export async function getProductByID(productID: string) {
  const response = await api.get(`/products/product/${productID}`);
  return response.data;
}
