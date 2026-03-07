
import React from 'react';

const Button = ({ children, className = "", ...props }) => {
  return (
    <button
      {...props}
      className={`px-3 py-1 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-lg shadow-lg shadow-indigo-500/30 disabled:opacity-50 disabled:cursor-not-allowed hover:cursor-pointer disabled:bg-gray-700 disabled:shadow-none transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] disabled:transform-none ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;