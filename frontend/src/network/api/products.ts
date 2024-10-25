import api from "../axiosInstance";

interface GetProductsProps {
  page: number;
  sort: "asc" | "desc" | "none";
}

export async function getProducts({ page, sort }: GetProductsProps) {
  if (sort === undefined || sort === null) {
    sort = "none";
  }

  const response = await api.get(
    `/products/products?page=${+page}&sort=${sort}&limit=4`
  );
  return response.data;
}

export async function getProductByID(productID: string) {
  const response = await api.get(`/products/product/${productID}`);
  return response.data;
}
