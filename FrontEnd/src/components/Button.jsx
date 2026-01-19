
import React from 'react';

const Button = ({ children, ...props }) => {
  return (
    <button
      {...props}
      className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold rounded-lg shadow-lg shadow-indigo-500/30 disabled:opacity-50 disabled:cursor-not-allowed hover:cursor-pointer disabled:from-gray-700 disabled:to-gray-700 disabled:shadow-none transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] disabled:transform-none"
    >
      {children}
    </button>
  );
};
export default Button;