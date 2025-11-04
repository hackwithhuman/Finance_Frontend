import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import img from "../assets/finance-landing-image.jpg";
const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-gray-100 flex flex-col">
      {/* ===== Navbar ===== */}
      <nav className="flex justify-between items-center px-8 py-5 backdrop-blur-lg bg-white/5 border-b border-white/10">
        <h1 className="text-2xl font-bold text-green-400">💸 Expense Tracker</h1>
        <div className="space-x-6">
          <Link to="/login" className="text-gray-200 hover:text-green-400 transition">Login</Link>
          <Link to="/signup" className="text-gray-200 hover:text-green-400 transition">Sign Up</Link>
        </div>
      </nav>

      {/* ===== Hero Section ===== */}
      <section className="flex flex-col md:flex-row items-center justify-between flex-grow px-8 md:px-16 lg:px-24 py-16">
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex-1 space-y-6"
        >
          <h2 className="text-5xl md:text-6xl font-extrabold text-green-400 leading-tight">
            Track. Save. Grow.
          </h2>
          <p className="text-gray-300 text-lg max-w-md">
            Take full control of your finances with our modern Expense Tracker. 
            Manage your incomes and expenses, visualize your cash flow, and stay on top of your goals — effortlessly.
          </p>
          <div className="space-x-4">
            <Link
              to="/signup"
              className="bg-green-500 hover:bg-green-600 px-6 py-3 rounded-lg font-semibold text-white transition-transform hover:scale-105"
            >
              Get Started
            </Link>
            <Link
              to="/login"
              className="border border-green-400 px-6 py-3 rounded-lg font-semibold text-green-400 hover:bg-green-400/10 transition-transform hover:scale-105"
            >
              Demo Login
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex-1 flex justify-center mt-10 md:mt-0"
        >
          <img
            src={img}
            alt="Finance illustration"
            className=" w-4/5 md:w-3/5 "
          />
        </motion.div>
      </section>

      {/* ===== Features Section ===== */}
      <section className="px-8 md:px-16 lg:px-24 py-16 bg-white/5 backdrop-blur-lg border-t border-white/10">
        <h3 className="text-3xl font-bold text-center text-green-400 mb-12">Why Choose Us</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "Smart Analytics",
              desc: "Get detailed charts and insights on your spending patterns.",
              icon: "📊",
            },
            {
              title: "Secure & Private",
              desc: "Your financial data is encrypted and protected with JWT auth.",
              icon: "🔒",
            },
            {
              title: "Cloud Synced",
              desc: "Access your tracker anytime, anywhere — from any device.",
              icon: "☁️",
            },
          ].map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="p-6 bg-white/10 rounded-2xl shadow-xl border border-white/10 hover:bg-white/20 transition-all"
            >
              <div className="text-4xl mb-3">{feature.icon}</div>
              <h4 className="text-xl font-semibold text-green-300 mb-2">{feature.title}</h4>
              <p className="text-gray-300 text-sm">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ===== Footer ===== */}
      <footer className="py-6 text-center text-gray-400 text-sm border-t border-white/10 bg-black/30">
        © {new Date().getFullYear()} Expense Tracker — Built with ❤️ Sachin Dev
      </footer>
    </div>
  );
};

export default LandingPage;
