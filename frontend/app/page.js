"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if token exists in localStorage
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token); // Convert to boolean
  }, []);

  // Animation variants for Framer Motion
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const scaleUp = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-600 to-purple-700">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/10 backdrop-blur-md shadow-lg">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link href="/" className="text-2xl font-bold text-white">
              🎟️ Ticketing System
            </Link>
          </motion.div>
          <nav className="space-x-6">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="flex space-x-6"
            >
              <Link
                href="#about"
                className="text-white hover:text-blue-200 transition duration-300"
              >
                About
              </Link>
              <Link
                href="#services"
                className="text-white hover:text-blue-200 transition duration-300"
              >
                Services
              </Link>
              <Link
                href="#contact"
                className="text-white hover:text-blue-200 transition duration-300"
              >
                Contact
              </Link>
              {isAuthenticated ? (
                <Link
                  href="/dashboard"
                  className="bg-white text-blue-600 px-4 py-2 rounded-lg font-semibold hover:bg-blue-50 transition duration-300"
                >
                  Dashboard
                </Link>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="bg-white text-blue-600 px-4 py-2 rounded-lg font-semibold hover:bg-blue-50 transition duration-300"
                  >
                    Login
                  </Link>
                  <Link
                    href="/signup"
                    className="bg-white text-blue-600 px-4 py-2 rounded-lg font-semibold hover:bg-blue-50 transition duration-300"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </motion.div>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="min-h-screen flex flex-col items-center justify-center text-center px-4">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center"
        >
          <motion.h1
            variants={fadeInUp}
            className="text-6xl font-bold text-white mb-4"
          >
            Revolutionize Your Support Workflow 🚀
          </motion.h1>
          <motion.p
            variants={fadeInUp}
            className="text-xl text-white mb-8 max-w-2xl mx-auto"
          >
            Our ticketing system is designed to streamline your support process,
            improve team productivity, and deliver exceptional customer
            experiences.
          </motion.p>
          <motion.div variants={fadeInUp} className="space-x-4">
            {isAuthenticated ? (
              <Link
                href="/dashboard"
                className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition duration-300"
              >
                Go to Dashboard
              </Link>
            ) : (
              <>
                <Link
                  href="/login"
                  className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition duration-300"
                >
                  Login
                </Link>
                <Link
                  href="/signup"
                  className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition duration-300"
                >
                  Sign Up
                </Link>
              </>
            )}
          </motion.div>
        </motion.div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center"
          >
            <motion.h2
              variants={fadeInUp}
              className="text-4xl font-bold text-blue-600 mb-6"
            >
              About Us
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-gray-700 max-w-2xl mx-auto"
            >
              We are a team of passionate developers and support specialists
              dedicated to building tools that make your life easier. Our
              ticketing system is trusted by thousands of businesses worldwide.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center"
          >
            <motion.h2
              variants={fadeInUp}
              className="text-4xl font-bold text-blue-600 mb-6"
            >
              Our Services
            </motion.h2>
            <motion.div
              variants={staggerContainer}
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
            >
              <motion.div
                variants={scaleUp}
                className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <h3 className="text-xl font-bold text-blue-600 mb-4">
                  Ticket Management
                </h3>
                <p className="text-gray-700">
                  Organize, prioritize, and resolve tickets efficiently with our
                  intuitive dashboard.
                </p>
              </motion.div>
              <motion.div
                variants={scaleUp}
                className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <h3 className="text-xl font-bold text-blue-600 mb-4">
                  Real-Time Analytics
                </h3>
                <p className="text-gray-700">
                  Track performance metrics and gain actionable insights in
                  real-time.
                </p>
              </motion.div>
              <motion.div
                variants={scaleUp}
                className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <h3 className="text-xl font-bold text-blue-600 mb-4">
                  Automation Tools
                </h3>
                <p className="text-gray-700">
                  Automate repetitive tasks and focus on what matters most.
                </p>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center"
          >
            <motion.h2
              variants={fadeInUp}
              className="text-4xl font-bold text-blue-600 mb-6"
            >
              Contact Us
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-gray-700 max-w-2xl mx-auto mb-8"
            >
              Have questions or need support? We’re here to help!
            </motion.p>
            <motion.form
              variants={fadeInUp}
              className="max-w-lg mx-auto space-y-4"
            >
              <input
                type="text"
                placeholder="Your Name"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
              <input
                type="email"
                placeholder="Your Email"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
              <textarea
                placeholder="Your Message"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
                rows="4"
              ></textarea>
              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300"
              >
                Send Message
              </button>
            </motion.form>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-6 text-center">
          <p>&copy; 2023 Ticketing System. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
