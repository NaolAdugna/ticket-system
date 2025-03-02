"use client"; // Ensure the component runs on the client side
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signupUser } from "@/src/redux/slices/authSlice"; // Make sure to add a signup action in your Redux slice
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast"; // Import hot-toast

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState(""); // Optional: You can add a dropdown or input to select the role if needed
  const dispatch = useDispatch();
  const router = useRouter();

  const { loading, error, token } = useSelector((state) => state.auth); // Use `token` instead of `user`

  useEffect(() => {
    // Redirect to dashboard after successful signup
    if (token) {
      toast.success("Signup successful! Redirecting..."); // Success toast
      setTimeout(() => {
        router.push("/dashboard");
      }, 1500); // Small delay for better UX
    }
  }, [token, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await dispatch(signupUser({ name, email, password, role }));

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
      <div className="bg-white rounded-lg shadow-2xl p-8 w-full max-w-md transform transition-all hover:scale-105">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Create an Account
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
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
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300"
              required
            />
          </div>
          <div>
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
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300"
              required
            />
          </div>
          <div>
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
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-300"
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
      </div>
    </div>
  );
}
