import React, { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  description: string;
}

export default function Button({ description, ...props }: ButtonProps) {
  return (
    <button
      {...props}
      className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded transition-colors duration-300"
    >
      {description}
    </button>
  );
}
