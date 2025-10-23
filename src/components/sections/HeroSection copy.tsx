'use client'

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpen } from "lucide-react";
import Link from "next/link";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden gradient-hero">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-2 mb-6 text-sm font-medium text-primary bg-primary/10 rounded-full">
              Now Available for Preorder
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-balance leading-tight"
          >
            Hello, I am Light
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto text-balance"
          >
            A transformative journey through faith, purpose, and spiritual growth.
            Discover your authentic self and step into your divine calling.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-base md:text-lg mb-10 text-muted-foreground/80"
          >
            By <span className="font-semibold text-foreground">Adeola Prince</span>
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Button asChild size="lg" className="gradient-primary shadow-elegant group min-w-[180px]">
              <Link href="/preorder">
                Preorder Now
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="min-w-[180px]">
              <Link href="/book">
                <BookOpen className="mr-2 h-5 w-5" />
                Learn More
              </Link>
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-16 flex justify-center"
          >
            <div className="relative w-64 h-96 md:w-80 md:h-[480px]">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5 rounded-lg transform rotate-3" />
              <div className="absolute inset-0 bg-card shadow-elegant rounded-lg flex items-center justify-center">
                <div className="text-center p-8">
                  <BookOpen className="h-16 w-16 mx-auto mb-4 text-primary" />
                  <p className="text-2xl font-serif font-bold">The Path of</p>
                  <p className="text-3xl font-serif font-bold text-primary">Becoming</p>
                  <p className="mt-4 text-sm text-muted-foreground">Adeola Prince</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;