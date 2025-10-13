'use client'

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ShoppingCart, Users } from "lucide-react";

interface CTASectionProps {
  variant?: "primary" | "secondary";
}

const CTASection = ({ variant = "primary" }: CTASectionProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  if (variant === "secondary") {
    return (
      <section ref={ref} className="py-20 md:py-32 gradient-hero">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Join the Launch Event</h2>
            <p className="text-lg text-muted-foreground mb-8 text-balance">
              Be part of an unforgettable experience as we celebrate the release of
              "The Path of Becoming." Connect with like-minded believers and receive
              exclusive insights from the author.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="gradient-primary shadow-elegant min-w-[200px]">
                <Link href="/book/register">
                  <Users className="mr-2 h-5 w-5" />
                  Register for Event
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section ref={ref} className="py-20 md:py-32 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Begin Your Journey Today</h2>
          <p className="text-lg mb-8 opacity-90 text-balance">
            Don't miss your chance to be among the first to experience this
            life-changing book. Preorder now and take the first step on your
            path of becoming.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="secondary" className="min-w-[200px] shadow-elegant">
              <Link href="/preorder">
                <ShoppingCart className="mr-2 h-5 w-5" />
                Preorder Your Copy
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="min-w-[200px] bg-transparent text-primary-foreground border-primary-foreground hover:bg-primary-foreground/10">
              <Link href="/book">
                Learn More
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;