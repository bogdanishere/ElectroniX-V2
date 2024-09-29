import api from "../axiosInstance";

export async function checkAddress({
  username,
  token,
}: {
  username: string;
  token: string;
}) {
  try {
    const response = await api.post(
      "/address/checkAddress",
      { username },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function addAddress({
  username,
  street,
  city,
  country,
  postal_code,
  token,
  state,
}: {
  username: string;
  street: string;
  city: string;
  country: string;
  postal_code: string;
  token: string;
  state: string;
}) {
  try {
    const response = await api.post(
      "/address/address",
      { username, street, city, country, postal_code, state },
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
