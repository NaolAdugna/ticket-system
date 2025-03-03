"use client"; // Ensure the component runs on the client side
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signupUser } from "@/src/redux/slices/authSlice"; // Ensure to add a signup action in your Redux slice
import { useRouter } from "next/navigation";
import toast from "react-hot-toast"; // Import hot-toast
import { motion } from "framer-motion";

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user"); // State for role selection
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const router = useRouter();

  const { loading, error, token } = useSelector((state) => state.auth); // Use `token` instead of `user`

  useEffect(() => {
    // Redirect to dashboard after successful signup
    if (token) {
      toast.success("Signup successful! Redirecting..."); // Success toast
      setTimeout(() => {
        router.push("/dashboard");
      }, 500); // Small delay for better UX
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

    if (!name.trim()) {
      errors.name = "Name is required";
      toast.error("Name is required");
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateInputs()) return;

    const result = await dispatch(signupUser({ name, email, password, role })); // Include role

    if (signupUser.fulfilled.match(result)) {
      toast.success("Signup successful! Redirecting...");
    } else {
      toast.error(
        result.payload?.message || "Signup failed! Please try again."
      );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center p-4">
      <motion.div
        className="bg-white rounded-lg shadow-2xl p-8 w-full max-w-md transform transition-all"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Create an Account
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={`mt-1 block w-full px-4 py-2 border ${
                errors.name ? "border-red-500" : "border-gray-300"
              } rounded-lg shadow-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300`}
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
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
              } rounded-lg shadow-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300`}
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
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
              } rounded-lg shadow-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300`}
            />
          </motion.div>

          {/* Role Selection Dropdown */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <label
              htmlFor="role"
              className="block text-sm font-medium text-gray-700"
            >
              Role
            </label>
            <select
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300"
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </motion.div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:cursor-pointer text-white py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-300"
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
                Signing up...
              </div>
            ) : (
              "Sign Up"
            )}
          </button>
          {error && (
            <p className="text-red-500 text-sm text-center mt-4">
              {error.message}
            </p>
          )}
        </form>
        <p className="text-center text-gray-600 mt-6">
          Already have an account?{" "}
          <a
            href="/login"
            className="text-blue-600 hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Login
          </a>
        </p>
      </motion.div>
    </div>
  );
}
