import axios from "axios";
import {
  BadRequestError,
  UnauthorizedError,
  NotFoundError,
  ConflictError,
  TooManyRequestsError,
  ForbiddenError,
} from "./http-errors";

const axiosInstance = axios.create({
  baseURL: process.env.BACKEND_URL,
  timeout: 10_000,
  withCredentials: true,
});

axiosInstance.interceptors.response.use(null, (error) => {
  if (axios.isAxiosError(error)) {
    const errorMessage = error.response?.data?.error;

    switch (error.response?.status) {
      case 400:
        throw new BadRequestError(errorMessage);
      case 401:
        throw new UnauthorizedError(errorMessage);
      case 403:
        throw new ForbiddenError(errorMessage);
      case 404:
        throw new NotFoundError(errorMessage);
      case 409:
        throw new ConflictError(errorMessage);
      case 429:
        throw new TooManyRequestsError(errorMessage);
    }
  }

  throw error;
});

export default axiosInstance;
