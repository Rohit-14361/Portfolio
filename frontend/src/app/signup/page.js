"use client";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginStart, loginSuccess, loginFailure } from "../../redux/slices/authSlice";
import api from "../../utils/axios";
import Link from "next/link";
import Navbar from "../components/Navbar";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const router = useRouter();

  const { user, loading, error } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user) {
      router.push("/dashboard");
    }
  }, [user, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(loginStart());
    try {
      const response = await api.post('/auth/register', { name, email, password });
      dispatch(loginSuccess(response.data));
    } catch (error) {
      dispatch(loginFailure(error.response?.data?.message || error.message));
    }
  };

  return (
    <main className="bg-black min-h-screen">
      <Navbar />
      <div className="flex items-center justify-center min-h-[80vh] px-6">
        <div className="w-full max-w-md p-8 rounded-[2rem] border border-white/10 bg-white/5">
          <h2 className="text-3xl font-bold text-white mb-6 text-center">Sign Up</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-2xl border border-white/10 bg-black/30 px-5 py-4 text-white"
              required
            />
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-2xl border border-white/10 bg-black/30 px-5 py-4 text-white"
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-2xl border border-white/10 bg-black/30 px-5 py-4 text-white"
              required
            />
            <button
              type="submit"
              className="w-full rounded-2xl bg-white text-black py-4 font-semibold"
            >
              Sign Up
            </button>
          </form>
          <p className="text-zinc-400 text-center mt-6">
            Already have an account?{" "}
            <Link href="/login" className="text-white hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
