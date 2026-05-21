"use client";

import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../redux/slices/authSlice";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Navbar() {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const router = useRouter();
  // Prevent SSR/client mismatch: don't render auth UI until after mount
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    router.push("/");
  };

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black/70 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
        <Link href="/" className="text-2xl font-black text-white">
          Rohit Kumar
        </Link>

        <nav className="hidden md:flex gap-8 text-zinc-300 text-sm items-center">
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <Link href="/services" className="hover:text-white transition-colors">Services</Link>
          <Link href="/projects" className="hover:text-white transition-colors">Projects</Link>
          <Link href="/contact" className="hover:text-white transition-colors">Contact</Link>

          <div className="w-px h-4 bg-white/20 mx-2"></div>

          {/* Only render auth-dependent UI after client mount to avoid hydration mismatch */}
          {mounted && (
            user ? (
              <>
                <Link
                  href={user.role === "admin" ? "/admin/dashboard" : "/dashboard"}
                  className="text-white font-medium hover:text-zinc-300 transition-colors"
                >
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="bg-white/10 text-white px-4 py-2 rounded-lg hover:bg-white/20 transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link href="/login" className="hover:text-white transition-colors">Login</Link>
                <Link
                  href="/signup"
                  className="bg-white text-black px-4 py-2 rounded-lg font-medium hover:bg-zinc-200 transition-colors"
                >
                  Sign Up
                </Link>
              </>
            )
          )}
        </nav>
      </div>
    </header>
  );
}