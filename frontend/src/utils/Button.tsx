import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit" | "reset";
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  className,
  type,
  ...props
}) => {
  return (
    <button
      className={`
        w-auto
        h-auto
        bg-blue-500
        text-white
        border-none
        rounded-full
        text-lg
        p-4
        font-bold
        cursor-pointer
        transition-all
        duration-300
        hover:bg-blue-400
      ${className}
        `}
      onClick={onClick}
      {...props}
      type={type}
    >
      {children}
    </button>
  );
};

export default Button;
