'use client';

import Link from "next/link";
import { motion } from "framer-motion";
import { Frown } from "lucide-react"; // Importing an icon for visual appeal

const NotFound = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4 py-12 text-center sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md"
      >
        <Frown className="mx-auto h-24 w-24 text-primary" /> {/* Visually appealing icon */}
        <h1 className="mt-4 text-6xl font-extrabold tracking-tight text-foreground sm:text-7xl">
          404
        </h1>
        <p className="mt-4 text-xl text-muted-foreground sm:text-2xl">
          Oops! The page you're looking for doesn't exist.
        </p>
        <div className="mt-8">
          <Link href="/" className="inline-flex items-center rounded-md gradient-primary px-6 py-3 text-lg font-medium text-primary-foreground shadow-lg transition-all hover:scale-105">
            Return to Home
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default NotFound;