import api from "../axiosInstance";

export async function loginClient(email: string, password: string) {
  const response = await api.post("/auth/login", { email, password });
  return response.data;
}

export async function registerClient(
  username: string,
  password: string,
  email: string,
  firstName: string,
  lastName: string
) {
  const response = await api.post("/auth/register", {
    username,
    password,
    email,
    firstName,
    lastName,
  });
  return response.data;
}

interface checkExistentAccountProps {
  message: string;
  existent: boolean;
}

export async function checkExistentClient(
  username: string
): Promise<checkExistentAccountProps | undefined> {
  const response = await api.post("/auth/existentClient", { username });
  return response.data;
}
