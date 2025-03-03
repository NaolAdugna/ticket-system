"use client";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "@/src/redux/slices/authSlice";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const router = useRouter();

  const { loading, token } = useSelector((state) => state.auth);

  useEffect(() => {
    if (token) {
      toast.success("Login successful! Redirecting to dashboard...");
      setTimeout(() => {
        router.push("/dashboard");
      }, 500);
    }
  }, [token, router]);

  const validateInputs = () => {
    let errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!password.trim()) {
      errors.password = "Password is required";
      toast.error("Password is required");
    } else if (password.length < 6) {
      errors.password = "Password must be at least 6 characters long";
      toast.error("Password must be at least 6 characters long");
    }

    if (!email.trim()) {
      errors.email = "Email is required";
      toast.error("Email is required");
    } else if (!emailRegex.test(email)) {
      errors.email = "Invalid email format";
      toast.error("Invalid email format");
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateInputs()) return;

    const result = await dispatch(loginUser({ email, password }));

    if (loginUser.fulfilled.match(result)) {
      toast.success("Login successful! Redirecting...");
    } else {
      toast.error(result.payload?.message || "Login failed! Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center p-4">
      <motion.div
        className="bg-white rounded-lg shadow-2xl p-8 w-full max-w-md transform transition-all "
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Welcome Back!
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-900"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`mt-1 block w-full px-4 py-2 border ${
                errors.email ? "border-red-500" : "border-gray-300"
              } rounded-lg text-gray-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300`}
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`mt-1 block w-full px-4 py-2 border ${
                errors.password ? "border-red-500" : "border-gray-300"
              } rounded-lg shadow-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300`}
            />
          </motion.div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:cursor-pointer hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-300"
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <svg
                  className="animate-spin h-5 w-5 mr-3 text-white"
                  xmlns="http://www.w3.org/2000/svg"
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
              </div>
            ) : (
              "Login"
            )}
          </button>
        </form>
        <p className="text-center text-gray-600 mt-6">
          Don't have an account?{" "}
          <a
            href="/signup"
            className="text-blue-600 hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Sign Up
          </a>
        </p>
      </motion.div>
    </div>
  );
}
