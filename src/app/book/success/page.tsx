'use client'

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CheckCircle, Home, Mail } from "lucide-react";

const Success = () => {
  return (
    <div className="min-h-screen pt-20 flex items-center justify-center">
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl mx-auto text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="mb-8"
            >
              <CheckCircle className="h-24 w-24 text-primary mx-auto" />
            </motion.div>

            <h1 className="text-4xl md:text-5xl font-bold mb-6">Success!</h1>
            <p className="text-xl text-muted-foreground mb-8">
              Thank you for your order/registration. We're excited to have you join us
              on this transformative journey.
            </p>

            <div className="bg-card p-8 rounded-lg shadow-elegant mb-8">
              <Mail className="h-12 w-12 text-primary mx-auto mb-4" />
              <h2 className="text-2xl font-semibold mb-3">What's Next?</h2>
              <div className="space-y-3 text-left text-muted-foreground">
                <p className="flex items-start">
                  <span className="mr-2">✓</span>
                  <span>You'll receive a confirmation email shortly with all the details</span>
                </p>
                <p className="flex items-start">
                  <span className="mr-2">✓</span>
                  <span>We'll keep you updated on shipping/event information</span>
                </p>
                <p className="flex items-start">
                  <span className="mr-2">✓</span>
                  <span>Check your spam folder if you don't see our email within 24 hours</span>
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="gradient-primary shadow-elegant">
                <Link href="/">
                  <Home className="mr-2 h-5 w-5" />
                  Return to Home
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/book">Learn More About the Book</Link>
              </Button>
            </div>

            <div className="mt-12 p-6 bg-muted/30 rounded-lg">
              <p className="text-sm text-muted-foreground">
                Have questions? Contact us at{" "}
                <a
                  href="mailto:contact@princeadeola.com"
                  className="text-primary hover:underline"
                >
                  contact@princeadeola.com
                </a>
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Success;
