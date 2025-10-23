'use client'

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
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
                  alt="Author Adeola Prince"
                  width={500}
                  height={400}
                  className="rounded-lg object-cover w-full md:h-[640px]"
                /> */}
                <ImageCanvas src="/images/hero-portrait-1.jpg" alt="Author Adeola Prince" className="rounded-lg object-cover w-full md:h-[640px]" />

              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Meet the Author</h2>
            {/* <h3 className="text-2xl font-semibold text-primary mb-4">Adeola Prince</h3> */}
            <p className="text-lg text-muted-foreground mb-6">
              <span className="font-extrabold text-primary">Adeola Prince</span> is a polymath with a first-class degree in avionics engineering
              from National Aviation University, Kyiv Ukraine. He balances a career in aircraft
              engineering, music, and a profound passion for illuminating life's biggest questions.
            </p>
            <p className="text-muted-foreground mb-6">
              Prince's unique path which includes escaping the Russian-Ukrainian war to
              pursue his calling fuels his desire to inspire change.
            </p>
            <p className="text-muted-foreground mb-8">
              Through thought-provoking talks and letters, he inspires young adults on the powerful
              intersection of faith, logic, and science. His email newsletter, <span className="font-extrabold">Chronicles of A. Prince</span>,
              is a catalyst that has ignited change in the lives of many across different continents by
              challenging pop culture and driving deeper thought. Whether writing or playing soul-stirring
              music on his saxophone, Prince is driven by a passion for  human behavioral science, apologetics,
              and truth to answer life's questions: Who are we, why are we here, what should we do while we are here,
              and where are we going to?
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