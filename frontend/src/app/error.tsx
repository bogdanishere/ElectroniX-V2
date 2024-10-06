"use client";

import Button from "@/utils/Button";
import { useRouter } from "next/navigation";
import ErrorComponent from "./_components/ErrorComponent";

export default function Error({ error }: { error: Error }) {
  const router = useRouter();

  let customError = "";
  if (error.message === "429") {
    customError = "Too many requests. Please try again later.";
  } else if (error.message === "500") {
    customError = "Network Error. Please check your internet connection.";
  } else if (error.message === "401") {
    customError =
      "Unauthorized. You are not authorized to access this resource";
  } else if (error.message === "404") {
    customError = "Not Found. The resource you are looking for does not exist";
  } else if (error.message === "409") {
    customError =
      "Conflict. Probably you are trying to create a resource that already exists.";
  } else if (error.message === "400") {
    customError = "Bad Request. The request is invalid";
  } else {
    customError = "There is a problem with the request";
  }

  return (
    <ErrorComponent error={customError}>
      <Button onClick={router.back}>Go back to main page</Button>
    </ErrorComponent>
  );
}
