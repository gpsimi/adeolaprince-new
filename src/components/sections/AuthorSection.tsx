'use client'

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { UserCircle, ArrowRight } from "lucide-react";
import Image from "next/image";
import ImageCanvas from "../ImageCanvas";

const AuthorSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-20 md:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5 rounded-lg transform -rotate-3" />
              <div className="relative bg-card shadow-elegant rounded-lg flex items-center justify-center aspect-square">
                {/* <Image
                  src="/images/hero-portrait-1.jpg"
                  alt="Author Prince Adeola"
                  width={500}
                  height={400}
                  className="rounded-lg object-cover w-full md:h-[640px]"
                /> */}
                <ImageCanvas src="/images/hero-portrait-1.jpg" alt="Author Prince Adeola" className="rounded-lg object-cover w-full md:h-[640px]" />
                
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Meet the Author</h2>
            <h3 className="text-2xl font-semibold text-primary mb-4">Prince Adeola</h3>
            <p className="text-lg text-muted-foreground mb-6">
              A passionate minister, teacher, and spiritual guide dedicated to helping
              believers discover their true identity in Christ and walk in their divine
              purpose.
            </p>
            <p className="text-muted-foreground mb-6">
              With years of ministry experience and a heart for transformation,
              Prince Adeola brings profound spiritual insights combined with
              practical wisdom. His teaching has impacted countless lives, helping
              people navigate their spiritual journey with clarity and confidence.
            </p>
            <p className="text-muted-foreground mb-8">
              Through "The Path of Becoming," he shares transformative principles
              that will empower you to step fully into your God-given destiny.
            </p>
            <Button asChild size="lg" variant="outline" className="group">
              <Link href="/about">
                Learn More About the Author
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AuthorSection;