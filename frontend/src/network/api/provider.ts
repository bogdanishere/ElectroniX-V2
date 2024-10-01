import api from "../axiosInstance";

export async function getProviderOrders(username: string, token: string) {
  const response = await api.get(`/provider/orders?username=${username}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}

export async function getProviderProducts(
  username: string,
  token: string,
  page: number
) {
  const response = await api.get(
    `/provider/products/${page}?username=${username}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
}

export async function deleteProviderProduct(
  productId: string,
  token: string,
  username: string
) {
  const response = await api.delete(
    `/provider/deleteproduct/${productId}?username=${username}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
}

export async function confirmProviderOrder(
  orderDetailId: number,
  token: string,
  username: string
) {
  const response = await api.patch(
    `/provider/confirmorder/${orderDetailId}?username=${username}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
}

export async function deleteProviderOrder(
  orderDetailId: number,
  token: string,
  username: string
) {
  const response = await api.delete(
    `/provider/deleteorder/${orderDetailId}?username=${username}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
}

export async function addProviderProduct(
  formData: FormData,
  token: string,
  username: string
) {
  const response = await api.post(
    `/provider/addproduct?username=${username}`,
    formData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
}
