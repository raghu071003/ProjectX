import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../store/slices/authSlice";
import React from "react";
import { useState } from "react";

export default function Login() {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submit = (e) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }));
  };

  return (
    <form onSubmit={submit} className="p-6 max-w-sm mx-auto">
      <h1 className="text-xl font-bold mb-4">Login</h1>

      <input
        className="border p-2 w-full mb-3"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        className="border p-2 w-full mb-3"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <button
        className="bg-black text-white px-4 py-2 w-full"
        disabled={loading}
      >
        {loading ? "Logging in..." : "Login"}
      </button>
    </form>
  );
}
