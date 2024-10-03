import api from "../axiosInstance";

export async function getOrders({
  employee,
  token,
}: {
  employee: string;
  token: string;
}) {
  const response = await api.get(`/employee/orders?username=${employee}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}

export async function getBrandCount({
  numberOfBrands,
  employee,
  token,
}: {
  numberOfBrands: number;
  employee: string;
  token: string;
}) {
  const response = await api.get(
    `/employee/brandcount/${numberOfBrands}?username=${employee}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
}

export async function confirmOrder({
  orderID,
  employee,
  token,
}: {
  orderID: number;
  employee: string;
  token: string;
}) {
  const response = await api.patch(
    `/employee/confirmorder/${orderID}?username=${employee}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
}

export async function deleteOrder({
  orderID,
  token,
  username,
}: {
  orderID: number;
  token: string;
  username: string;
}) {
  const response = await api.delete(
    `/employee/deleteorder/${orderID}?username=${username}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
}

export async function addProvider(
  providerName: string,
  providerEmail: string,
  providerPassword: string,
  employeeUsername: string,
  token: string
) {
  const response = await api.post(
    `/employee/addprovider?username=${employeeUsername}`,
    {
      name: providerName,
      email: providerEmail,
      password: providerPassword,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
}
