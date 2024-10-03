import api from "../axiosInstance";

export async function updateProfile(
  username: string,
  token: string,
  profileImage: FormData
) {
  const response = await api.patch(
    `update/profile?username=${username}`,
    profileImage,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
}
