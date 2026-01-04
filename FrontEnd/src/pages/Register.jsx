import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../store/slices/authSlice";
import React from "react";
export default function Register() {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const onChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submit = (e) => {
    e.preventDefault();
    dispatch(registerUser(form));
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form
        onSubmit={submit}
        className="w-full max-w-sm p-6 border rounded space-y-4"
      >
        <h1 className="text-xl font-bold text-center">Create Account</h1>

        <input
          name="name"
          placeholder="Name"
          className="border p-2 w-full"
          value={form.name}
          onChange={onChange}
        />

        <input
          name="email"
          placeholder="Email"
          className="border p-2 w-full"
          value={form.email}
          onChange={onChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          className="border p-2 w-full"
          value={form.password}
          onChange={onChange}
        />

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button
          disabled={loading}
          className="bg-black text-white py-2 w-full"
        >
          {loading ? "Creating..." : "Register"}
        </button>
      </form>
    </div>
  );
}
