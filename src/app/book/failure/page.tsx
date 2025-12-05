//src/app/book/failure/page.tsx

'use client'

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { XCircle, Home, RefreshCw } from "lucide-react";

const Failure = () => {
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
              <XCircle className="h-24 w-24 text-red-500 mx-auto" />
            </motion.div>

            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-red-600">Payment Failed</h1>
            <p className="text-xl text-muted-foreground mb-8">
              We're sorry, but we couldn't process your payment at this time. Please try again.
            </p>

            <div className="bg-card p-8 rounded-lg shadow-elegant mb-8">
              <h2 className="text-2xl font-semibold mb-3">What can you do?</h2>
              <div className="space-y-3 text-left text-muted-foreground">
                <p className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Check your payment method and try again</span>
                </p>
                <p className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Ensure you have sufficient funds</span>
                </p>
                <p className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Contact your bank if the issue persists</span>
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="gradient-primary shadow-elegant">
                <Link href="/book/preorder">
                  <RefreshCw className="mr-2 h-5 w-5" />
                  Try Again
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/">
                  <Home className="mr-2 h-5 w-5" />
                  Return to Home
                </Link>
              </Button>
            </div>

            <div className="mt-12 p-6 bg-muted/30 rounded-lg">
              <p className="text-sm text-muted-foreground">
                Need help? Contact us at{" "}
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

export default Failure;

