import { ComponentProps } from "react";

interface InputFieldProps {
  name: string;
  label?: string;
  error?: string;
  inputGroupElement?: JSX.Element;
  type: string;
}

export default function InputField({
  name,
  label,
  error,
  type,
  inputGroupElement,
  ...props
}: InputFieldProps & ComponentProps<"input">) {
  return (
    <div className="mb-4">
      {label && (
        <label htmlFor={name} className="inline-block pl-3">
          {label}
        </label>
      )}
      <div className="relative mt-1 flex items-center rounded-md shadow-sm">
        <input
          type={type}
          name={name}
          id={name}
          {...props}
          className={`pl-3 inline-block w-full px-3 py-2 rounded-md border ${
            error
              ? "border-red-500 focus:border-red-500 focus:ring-red-500"
              : "border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
          } shadow-sm focus:ring-1 sm:text-sm transition duration-200 ease-in-out`}
          aria-invalid={!!error}
        />
        {inputGroupElement && (
          <span className="inline-flex items-center px-3 py-1 rounded-r-md border border-l-0 border-gray-300 bg-gray-100 text-gray-500 text-sm">
            {inputGroupElement}
          </span>
        )}
      </div>
      {error && (
        <p className="mt-2 text-sm text-red-600" id="error-message">
          {error}
        </p>
      )}
    </div>
  );
}
