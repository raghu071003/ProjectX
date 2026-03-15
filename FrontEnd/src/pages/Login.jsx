import { useDispatch, useSelector } from "react-redux";
import { loginUser, googleLogin } from "../store/slices/authSlice";
import React, { useEffect } from "react";
import { useState } from "react";

export default function Login() {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validationErrors, setValidationErrors] = useState({});

  useEffect(() => {
    const attemptInit = setInterval(() => {
      if (window.google) {
        clearInterval(attemptInit);
        window.google.accounts.id.initialize({
          client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
          callback: (response) => {
            dispatch(googleLogin(response.credential));
          },
        });

        const btnContainer = document.getElementById("google-signin-btn-login");
        if (btnContainer) {
          window.google.accounts.id.renderButton(btnContainer, {
            theme: "filled_black",
            size: "large",
            shape: "rectangular",
            text: "continue_with",
            logo_alignment: "left",
          });
        }
      }
    }, 100);

    return () => clearInterval(attemptInit);
  }, [dispatch]);

  const validateForm = () => {
    const errors = {};
    if (!email) {
      errors.email = "Email is required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
      errors.email = "Invalid email address";
    }

    if (!password) {
      errors.password = "Password is required";
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const submit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      dispatch(loginUser({ email, password }));
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="bg-gray-800 border border-gray-700 rounded-2xl shadow-2xl p-8 w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-600 rounded-2xl mb-4 shadow-lg shadow-indigo-500/30">
            <svg
              className="w-8 h-8 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
              />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
          <p className="text-gray-400">Continue your DSA journey</p>
        </div>

        {/* Form */}
        <div className="space-y-5">
          {/* Email Input */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Email Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg
                  className="h-5 w-5 text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                  />
                </svg>
              </div>
              <input
                type="email"
                className={`block w-full pl-10 pr-3 py-3 bg-gray-900 border ${validationErrors.email ? "border-red-500 focus:ring-red-500" : "border-gray-600 focus:ring-indigo-500"
                  } rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:border-transparent transition duration-200 outline-none`}
                placeholder="you@example.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (validationErrors.email) setValidationErrors({ ...validationErrors, email: "" });
                }}
                required
              />
            </div>
            {validationErrors.email && (
              <p className="mt-1 text-sm text-red-500">{validationErrors.email}</p>
            )}
          </div>

          {/* Password Input */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg
                  className="h-5 w-5 text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>
              <input
                type="password"
                className={`block w-full pl-10 pr-3 py-3 bg-gray-900 border ${validationErrors.password ? "border-red-500 focus:ring-red-500" : "border-gray-600 focus:ring-indigo-500"
                  } rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:border-transparent transition duration-200 outline-none`}
                placeholder="••••••••"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (validationErrors.password) setValidationErrors({ ...validationErrors, password: "" });
                }}
                required
              />
            </div>
            {validationErrors.password && (
              <p className="mt-1 text-sm text-red-500">{validationErrors.password}</p>
            )}
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-900/30 border border-red-700 rounded-lg p-3 flex items-start">
              <svg
                className="h-5 w-5 text-red-500 mr-2 flex-shrink-0 mt-0.5"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
              <p className="text-sm text-red-400">{error}</p>
            </div>
          )}

          {/* Remember Me & Forgot Password */}
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="w-4 h-4 bg-gray-900 border-gray-600 text-indigo-500 rounded focus:ring-indigo-500 focus:ring-offset-gray-800"
              />
              <span className="ml-2 text-gray-300">Remember me</span>
            </label>
            <button
              type="button"
              onClick={() => { }}
              className="text-indigo-400 hover:text-indigo-300 font-medium"
            >
              Forgot password?
            </button>
          </div>

          {/* Submit Button */}
          <button
            type="button"
            onClick={submit}
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:bg-indigo-800 text-white font-semibold py-3 rounded-lg transition duration-200 transform hover:scale-[1.02] active:scale-[0.98] disabled:cursor-not-allowed disabled:transform-none shadow-lg shadow-indigo-500/30"
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg
                  className="animate-spin h-5 w-5 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Logging in...
              </span>
            ) : (
              "Login"
            )}
          </button>
        </div>

        {/* Sign Up Link */}
        <div className="mt-6 text-center">
          <p className="text-gray-400">
            Don't have an account?{" "}
            <button
              type="button"
              onClick={() => { }}
              className="text-indigo-400 hover:text-indigo-300 font-semibold"
            >
              Sign up for free
            </button>
          </p>
        </div>

        {/* Social Login Options */}
        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-700"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-gray-800 text-gray-500">
                Or continue with
              </span>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-1 gap-3">
            <div id="google-signin-btn-login" className="flex justify-center h-[42px] rounded-lg w-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
