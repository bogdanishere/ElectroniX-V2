"use client";

import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { addProvider } from "../_lib/actions";
import Button from "@/utils/Button";

type FormValues = {
  providerName: string;
  providerEmail: string;
  providerPassword: string;
  confirmPassword: string;
};

interface ResponseProps {
  success: boolean;
  error?: string;
}

export default function AddProvider() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>();

  const [serverError, setServerError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setServerError(null);
    setSuccessMessage(null);

    const formData = new FormData();
    formData.append("providerName", data.providerName);
    formData.append("providerEmail", data.providerEmail);
    formData.append("providerPassword", data.providerPassword);
    formData.append("confirmPassword", data.confirmPassword);

    const response: ResponseProps = await addProvider(formData);

    if (response.success) {
      setSuccessMessage("Provider added successfully!");
    } else {
      setServerError(response.error || "An error occurred");
    }
  };

  return (
    <div className=" flex  justify-center py-6 px-2 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Add Provider
          </h2>
        </div>

        {serverError && (
          <div
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
            role="alert"
          >
            <span className="block sm:inline">{serverError}</span>
          </div>
        )}

        {successMessage && (
          <div
            className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative"
            role="alert"
          >
            <span className="block sm:inline">{successMessage}</span>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="providerName" className="sr-only">
                Provider Name
              </label>
              <input
                {...register("providerName", {
                  required: "Provider name is required",
                })}
                id="providerName"
                type="text"
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Provider Name"
              />
              {errors.providerName && (
                <p
                  className="mt-2 text-sm text-red-600"
                  id="providerName-error"
                >
                  {errors.providerName.message}
                </p>
              )}
            </div>
            <div>
              <label htmlFor="providerEmail" className="sr-only">
                Provider Email
              </label>
              <input
                {...register("providerEmail", {
                  required: "Provider email is required",
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "Invalid email address",
                  },
                })}
                id="providerEmail"
                type="email"
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Provider Email"
              />
              {errors.providerEmail && (
                <p
                  className="mt-2 text-sm text-red-600"
                  id="providerEmail-error"
                >
                  {errors.providerEmail.message}
                </p>
              )}
            </div>
            <div>
              <label htmlFor="providerPassword" className="sr-only">
                Provider Password
              </label>
              <input
                {...register("providerPassword", {
                  required: "Provider password is required",
                })}
                id="providerPassword"
                type="password"
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Provider Password"
              />
              {errors.providerPassword && (
                <p
                  className="mt-2 text-sm text-red-600"
                  id="providerPassword-error"
                >
                  {errors.providerPassword.message}
                </p>
              )}
            </div>
            <div>
              <label htmlFor="confirmPassword" className="sr-only">
                Confirm Password
              </label>
              <input
                {...register("confirmPassword", {
                  required: "Please confirm your password",
                  validate: (value, { providerPassword }) =>
                    value === providerPassword || "Passwords do not match",
                })}
                id="confirmPassword"
                type="password"
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Confirm Password"
              />
              {errors.confirmPassword && (
                <p
                  className="mt-2 text-sm text-red-600"
                  id="confirmPassword-error"
                >
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>
          </div>

          <div>
            <LoadingButton isLoading={isSubmitting} type="submit">
              Add Provider
            </LoadingButton>
          </div>
        </form>
      </div>
    </div>
  );
}

interface LoadingButtonProps {
  isLoading: boolean;
}

function LoadingButton({
  children,
  isLoading,
  ...props
}: LoadingButtonProps & React.ComponentProps<typeof Button>) {
  return (
    <>
      {!isLoading ? (
        <Button {...props}>{children}</Button>
      ) : (
        <Button>{isLoading && <>Loading ...</>}</Button>
      )}
    </>
  );
}
