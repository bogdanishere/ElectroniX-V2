// http://localhost:5000/employee/orders?employee=test_employee

import api from "../axiosInstance";

export async function getOrders({
  employee,
  token,
}: {
  employee: string;
  token: string;
}) {
  try {
    const response = await api.get(`/employee/orders?username=${employee}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// http://localhost:5000/employee/brandcount/4

export async function getBrandCount({
  numberOfBrands,
  employee,
  token,
}: {
  numberOfBrands: number;
  employee: string;
  token: string;
}) {
  try {
    console.log("brandcount", numberOfBrands);
    const response = await api.get(
      `/employee/brandcount/${numberOfBrands}?username=${employee}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// http://localhost:5000/employee/confirmorder/184?username=test_employee

export async function confirmOrder({
  orderID,
  employee,
  token,
}: {
  orderID: number;
  employee: string;
  token: string;
}) {
  try {
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
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// http://localhost:5000/employee/deleteorder/183

export async function deleteOrder({
  orderID,
  token,
  username,
}: {
  orderID: number;
  token: string;
  username: string;
}) {
  try {
    const response = await api.delete(
      `/employee/deleteorder/${orderID}?username=${username}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
