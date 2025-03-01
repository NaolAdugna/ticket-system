import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 flex flex-col items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-white mb-4">
          Welcome to the Ticketing System
        </h1>
        <p className="text-xl text-white mb-8">
          Efficiently manage and resolve support tickets with ease.
        </p>
        <div className="space-x-4">
          <Link
            href="/login"
            className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition duration-300"
          >
            Login
          </Link>
          <Link href="/signup">Sign Up</Link>
        </div>
      </div>
    </div>
  );
}
