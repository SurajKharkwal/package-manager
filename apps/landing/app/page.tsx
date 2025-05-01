"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  CheckIcon,
  ChevronRightIcon,
  QrCodeIcon,
  UsersIcon,
  BarChartIcon as ChartBarIcon,
} from "lucide-react";
import { BackgroundBeams } from "../components/ui/background-beams";
import { SparklesCore } from "@/components/ui/sparkles";
import { PricingCards } from "@/components/pricing-card";
import { CardHoverEffect } from "@/components/card";

export default function Home() {
  const features = [
    {
      title: "Admin QR Code Generation",
      description:
        "Admins can easily generate QR codes for products in their shop inventory.",
      icon: <QrCodeIcon className="h-10 w-10 text-primary" />,
    },
    {
      title: "User Scanning",
      description:
        "Users scan QR codes to track stock movement in and out of inventory.",
      icon: <UsersIcon className="h-10 w-10 text-primary" />,
    },
    {
      title: "Manager Dashboard",
      description:
        "Managers get a comprehensive dashboard to monitor inventory and team performance.",
      icon: <ChartBarIcon className="h-10 w-10 text-primary" />,
    },
  ];

  const cards = [
    {
      title: "QR Code Generation",
      description:
        "Generate unique QR codes for each product in your inventory with just a few clicks.",
    },
    {
      title: "Real-time Tracking",
      description:
        "Track stock movement in real-time as users scan products in and out of inventory.",
    },
    {
      title: "Team Management",
      description:
        "Manage your team members, assign roles, and track individual performance.",
    },
    {
      title: "Comprehensive Dashboard",
      description:
        "Get insights into your inventory with our powerful analytics dashboard.",
    },
    {
      title: "Profile Management",
      description:
        "Customize your profile and settings to match your business needs.",
    },
    {
      title: "Pricing Options",
      description:
        "Choose from flexible pricing options that scale with your business.",
    },
  ];

  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="relative h-screen flex flex-col items-center justify-center overflow-hidden bg-black">
        <div className="absolute inset-0 w-full h-full">
          <SparklesCore
            id="tsparticlesfullpage"
            background="transparent"
            minSize={0.6}
            maxSize={1.4}
            particleDensity={100}
            className="w-full h-full"
            particleColor="#FFFFFF"
          />
        </div>
        <div className="relative z-10 text-center px-6 md:px-10 lg:px-20 max-w-5xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6"
          >
            Inventory Manager
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl md:text-2xl text-gray-300 mb-8"
          >
            Streamline your inventory management with QR code tracking
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              href="https://pck-mgr-web.vercel.app/manager/dashboard"
              className="bg-primary hover:bg-primary/90 text-white font-medium py-3 px-6 rounded-lg flex items-center justify-center"
            >
              Visit Website
              <ChevronRightIcon className="ml-2 h-5 w-5" />
            </Link>
            <Link
              href="#features"
              className="bg-white/10 hover:bg-white/20 text-white font-medium py-3 px-6 rounded-lg"
            >
              Learn More
            </Link>
          </motion.div>
        </div>
        <BackgroundBeams className="absolute inset-0" />
      </section>

      {/* About Section */}
      <section
        id="about"
        className="py-20 bg-gradient-to-b from-black to-background"
      >
        <div className="container mx-auto px-6 md:px-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              What is Inventory Manager?
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Inventory Manager is a comprehensive inventory management system
              that uses QR codes to track products in and out of stock.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-card p-8 rounded-xl shadow-lg"
              >
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Roles Section */}
      <section id="roles" className="py-20 bg-background">
        <div className="container mx-auto px-6 md:px-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">User Roles</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Inventory Manager supports three distinct user roles, each with
              specific responsibilities.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-card p-8 rounded-xl shadow-lg border border-border"
            >
              <h3 className="text-xl font-semibold mb-4">Admin</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <CheckIcon className="h-5 w-5 text-primary mr-2 mt-0.5" />
                  <span>Generate QR codes for products</span>
                </li>
                <li className="flex items-start">
                  <CheckIcon className="h-5 w-5 text-primary mr-2 mt-0.5" />
                  <span>Manage inventory database</span>
                </li>
                <li className="flex items-start">
                  <CheckIcon className="h-5 w-5 text-primary mr-2 mt-0.5" />
                  <span>Oversee all system operations</span>
                </li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-card p-8 rounded-xl shadow-lg border border-border"
            >
              <h3 className="text-xl font-semibold mb-4">User</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <CheckIcon className="h-5 w-5 text-primary mr-2 mt-0.5" />
                  <span>Scan QR codes of products</span>
                </li>
                <li className="flex items-start">
                  <CheckIcon className="h-5 w-5 text-primary mr-2 mt-0.5" />
                  <span>Submit stock in/out requests</span>
                </li>
                <li className="flex items-start">
                  <CheckIcon className="h-5 w-5 text-primary mr-2 mt-0.5" />
                  <span>Track product movement</span>
                </li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
              className="bg-card p-8 rounded-xl shadow-lg border border-border"
            >
              <h3 className="text-xl font-semibold mb-4">Manager</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <CheckIcon className="h-5 w-5 text-primary mr-2 mt-0.5" />
                  <span>Access comprehensive dashboard</span>
                </li>
                <li className="flex items-start">
                  <CheckIcon className="h-5 w-5 text-primary mr-2 mt-0.5" />
                  <span>Manage team members</span>
                </li>
                <li className="flex items-start">
                  <CheckIcon className="h-5 w-5 text-primary mr-2 mt-0.5" />
                  <span>Configure settings and profiles</span>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-muted/50">
        <div className="container mx-auto px-6 md:px-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Key Features
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Discover the powerful features that make Inventory Manager the
              ideal solution for your inventory management needs.
            </p>
          </div>

          <CardHoverEffect items={cards} />
        </div>
      </section>

      {/* Pages Section */}
      <section id="pages" className="py-20 bg-background">
        <div className="container mx-auto px-6 md:px-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Explore Our Pages
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Inventory Manager offers a variety of pages to help you manage
              your inventory efficiently.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-card p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow"
            >
              <h3 className="text-xl font-semibold mb-2">Dashboard</h3>
              <p className="text-muted-foreground mb-4">
                Get a comprehensive overview of your inventory and track
                performance metrics.
              </p>
              <Link
                href="https://pck-mgr-web.vercel.app/manager/dashboard"
                className="text-primary hover:underline flex items-center"
              >
                View Dashboard
                <ChevronRightIcon className="ml-1 h-4 w-4" />
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-card p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow"
            >
              <h3 className="text-xl font-semibold mb-2">Team Management</h3>
              <p className="text-muted-foreground mb-4">
                Manage your team members, assign roles, and track individual
                performance.
              </p>
              <Link
                href="https://pck-mgr-web.vercel.app/manager/team"
                className="text-primary hover:underline flex items-center"
              >
                Manage Team
                <ChevronRightIcon className="ml-1 h-4 w-4" />
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              className="bg-card p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow"
            >
              <h3 className="text-xl font-semibold mb-2">Profile</h3>
              <p className="text-muted-foreground mb-4">
                Manage your profile information and account preferences.
              </p>
              <Link
                href="https://pck-mgr-web.vercel.app/manager/profile"
                className="text-primary hover:underline flex items-center"
              >
                View Profile
                <ChevronRightIcon className="ml-1 h-4 w-4" />
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
              className="bg-card p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow"
            >
              <h3 className="text-xl font-semibold mb-2">Pricing</h3>
              <p className="text-muted-foreground mb-4">
                Explore our flexible pricing options that scale with your
                business needs.
              </p>
              <Link
                href="https://pck-mgr-web.vercel.app/manager/billing"
                className="text-primary hover:underline flex items-center"
              >
                View Pricing
                <ChevronRightIcon className="ml-1 h-4 w-4" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-muted">
        <div className="container mx-auto px-6 md:px-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Pricing Plans
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Choose the perfect plan for your business needs with our flexible
              pricing options.
            </p>
          </div>

          <PricingCards />
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-16">
        <div className="container mx-auto px-6 md:px-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
            <div className="col-span-1 md:col-span-2">
              <h3 className="text-2xl font-bold mb-4">Inventory Manager</h3>
              <p className="text-gray-400 mb-6 max-w-md">
                Streamline your inventory management with our powerful QR code
                tracking system. Perfect for businesses of all sizes.
              </p>
              <div className="flex space-x-4">
                <a
                  href="https://github.com/SurajKharkwal"
                  className="text-gray-400 hover:text-white"
                >
                  <span className="sr-only">GitHub</span>
                  <svg
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
              </div>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Home
                  </a>
                </li>
                <li>
                  <a href="#about" className="text-gray-400 hover:text-white">
                    About
                  </a>
                </li>
                <li>
                  <a
                    href="#features"
                    className="text-gray-400 hover:text-white"
                  >
                    Features
                  </a>
                </li>
                <li>
                  <a href="#pricing" className="text-gray-400 hover:text-white">
                    Pricing
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact</h4>
              <ul className="space-y-2">
                <li className="text-gray-400">
                  Email: kharkwalsuraj13@gmail.com
                </li>
                <li className="text-gray-400">
                  Address: Wakanaghat, Shimla, Himanchal Pradesh
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>
              &copy; {new Date().getFullYear()} Inventory Manager. All rights
              reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
