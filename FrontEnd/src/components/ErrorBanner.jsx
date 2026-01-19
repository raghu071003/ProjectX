import React from 'react';

export const ErrorBanner = ({ message }) => {
  if (!message) return null;

  return (
    <div className="mb-4 p-4 border border-red-500/50 bg-red-900/20 rounded-lg backdrop-blur-sm">
      <div className="flex items-start">
        <div className="flex-shrink-0">
          <svg className="w-5 h-5 text-red-400 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
        </div>
        <p className="ml-3 text-sm text-red-300 leading-relaxed">
          {message}
        </p>
      </div>
    </div>
  );
};