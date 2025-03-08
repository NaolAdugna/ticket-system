"use client";
import Link from "next/link";
import { useState, useEffect } from "react";

export function Hero() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token); // Check if the token exists to set the authenticated state
  }, []);

  return (
    <div className="relative">
      <div className="absolute inset-0 bg-[#ede7ff] dark:from-purple-950 dark:to-indigo-950" />
      <div className="relative mx-auto max-w-5xl px-6 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl text-black ">
            Effortless Ticket Management for Seamless Operations
          </h1>
          <p className="mt-6 text-lg leading-8 text-muted-foreground text-black ">
            Streamline ticket management with our efficient, user-friendly, and automated solution for seamless issue tracking.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            {!isAuthenticated && (
              <>
                <Link href="/signup">
                  <button className="px-6 py-2 text-lg hover:cursor-pointer font-semibold text-white bg-blue-600 rounded-full hover:bg-blue-700">
                    Get Started
                  </button>
                </Link>
                <Link href="/login">
                  <button className="px-6 py-2 hover:cursor-pointer text-lg font-semibold border border-blue-600 rounded-full text-blue-600 hover:bg-blue-50 dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-950">
                    Login
                  </button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}