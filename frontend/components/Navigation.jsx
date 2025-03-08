"use client";

import { Menu } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, []);

  const handleAuthClick = () => {
    if (isAuthenticated) {
      router.push("/dashboard");
    } else {
      router.push("/login");
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/90 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center pl-20  justify-between">
        <div className="flex items-center justify-between gap-12">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className=" font-bold sm:inline-block text-black">
              TicketFlow
            </span>
          </Link>
          <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
            <Link href="#aboutus" className="transition-colors hover:text-foreground/80 text-black">
              About Us
            </Link>
            <Link href="#features" className="transition-colors hover:text-foreground/80 text-black">
              Features
            </Link>
         

          </nav>
        </div>

        {/* Mobile Menu Button */}
        <div >
        <button
          className="md:hidden p-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <Menu className="h-6 w-6 text-black hover:cursor-pointer" />
        </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="absolute top-16 left-0 w-full bg-white shadow-md border-b p-4 md:hidden">
            <nav className="flex flex-col space-y-4 text-sm font-medium">
              <Link href="#aboutus" className="hover:text-foreground/80 text-black">
                About Us
              </Link>
              <hr className="bg-black text-black" />
              <Link href="#features" className="hover:text-foreground/80 text-black">
                Features
              </Link>
              <button
            className="px-6 py-1 hover:cursor-pointer text-[16px] font-medium border border-gray-600 rounded-full text-gray-600 hover:bg-gray-900 hover:text-white dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-950"
            onClick={handleAuthClick}
          >
            {isAuthenticated ? "Dashboard" : "Login"}
          </button>
             
            </nav>
          </div>
        )}

        <div className="flex items-center hidden  sm:inline-block space-x-2">
          <button
            className="px-6 py-1 hover:cursor-pointer text-[16px] font-medium border border-gray-600 rounded-full text-gray-600 hover:bg-gray-900 hover:text-white dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-950"
            onClick={handleAuthClick}
          >
            {isAuthenticated ? "Dashboard" : "Login"}
          </button>
        </div>
      </div>
    </header>
  );
}