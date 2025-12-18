'use client'

import { motion } from "framer-motion";

import PreorderForm from "@/components/forms/PreorderForm";
import { ShoppingCart } from "lucide-react";
import Image from "next/image";



const Preorder = () => {


  return (
    <div className="min-h-screen pt-20">
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl mx-auto"
          >
            <div className="text-center mb-12">
              <ShoppingCart className="h-16 w-16 text-primary mx-auto mb-6" />
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Preorder Your Copy</h1>
              <p className="text-lg text-muted-foreground">
                Secure your copy of "Hello, I am Light" today. Be among the first to
                embark on this transformative journey.
              </p>
            </div>

            <div className="bg-card p-8 rounded-lg shadow-elegant">

              <div className="mb-8 p-6 bg-primary/5 rounded-lg border border-primary/20 flex flex-col-reverse md:flex-row items-center justify-between gap-6">
                <div>
                  <h3 className="font-semibold text-lg mb-2">Book Details</h3>
                  <p className="text-muted-foreground mb-3">
                    Hello, I am Light by Adeola Prince
                  </p>
                  <p className="text-2xl font-bold text-primary">₦8,000 Preorder price</p>
                  <p className="text-muted-foreground text-lg mb-1">
                    <span className="line-through">₦10,000</span>
                  </p>
                </div>
                <div>
                  <Image
                    src="/images/3d-cover.jpg"
                    alt="Book Cover - Hello, I am Light"
                    width={250}
                    height={250}
                    className="object-cover max-md:w-full rounded-lg shadow-lg"
                  />
                </div>
              </div>






              <PreorderForm />

            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Preorder;
