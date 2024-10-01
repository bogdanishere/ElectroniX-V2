import api from "../axiosInstance";

export async function paymentStripe(
  price: number,
  currency: string,
  token: string,
  username: string
) {
  const response = await api.post(
    "/payment/payment",
    { price, currency, username },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
}

interface ObjectProducts {
  products: ProductsProp[];
}

interface ProductsProp {
  productId: string;
  providerUsername: string;
  quantity: number;
}

export async function addCommand(
  clientUsername: string,
  products: ObjectProducts,
  sessionId: string,
  token: string,
  username: string
) {
  const response = await api.post(
    "/command/command",
    {
      clientUsername,
      products,
      sessionId,
      username,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
}

export async function getOrders(username: string, token: string) {
  const response = await api.get(`/order/order?username=${username}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}
