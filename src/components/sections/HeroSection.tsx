"use client"

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Phone, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

const HeroSection = () => {
  const [open, setOpen] = useState(false);

    const imageSrc = "/images/hero-portrait-3.jpg";

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      </div> */}

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-28 md:py-36">
        <div className="flex flex-col-reverse lg:flex-row gap-8 items-center ">
          <div className="max-w-2xl">

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-balance leading-tight text-center lg:text-left"
            >
              <span className="font-italics">Hi,</span> I&apos;m Prince Adeola
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg md:text-xl text-muted-foreground mb-8 max-w-xl text-balance text-center lg:text-left"
            >
              A global speaker, astute saxophonists and prolific Writer,
              who is focused on shifting people&apos;s mindsets so they
              can see possibilities and become those possibilities.
            </motion.p>


            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-start items-center w-full sm:w-auto"
            >
              <Button asChild size="lg" className="gradient-primary shadow-elegant group min-w-[180px] w-full sm:w-auto">
                <Link href="/about">
                  About Me
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="min-w-[180px] w-full sm:w-auto">
                <Link href="/contact">
                  <Phone className="mr-2 h-5 w-5" />
                    Book Me
                </Link>
              </Button>
            </motion.div>
          </div>

          {/* Right column: Portrait image or fallback card */}
          <div className="flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="relative w-72 h-96 md:w-96 md:h-[520px] rounded-lg overflow-hidden shadow-elegant"
            >
              {/* Image from public folder. If missing, browser will show broken image — we overlay fallback content below. */}
              {/* <Image
                src={imageSrc}
                alt="Prince Adeola portrait"
                fill
                style={{ objectFit: 'cover' }}
                sizes="(min-width: 1024px) 420px, (min-width: 768px) 360px, 280px w-full"
                priority
                className="cursor-zoom-in"
                onClick={() => setOpen(true)}
              /> */}
              <Image
                src={imageSrc}
                alt="Prince Adeola portrait"
                priority
                width={1000}
                height={1000}
                className="cursor-zoom-in w-full h-full object-cover"
                onClick={() => setOpen(true)}
              />

         
            </motion.div>
          </div>
        </div>
      </div>

      {/* Lightbox modal */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
          <button
            aria-label="Close image"
            className="absolute top-6 right-6 text-white z-50 p-2 rounded-full hover:bg-white/10"
            onClick={() => setOpen(false)}
          >
            <X className="h-6 w-6" />
          </button>

          <div className="relative w-full max-w-4xl h-[80vh]">
            <Image src={imageSrc} alt="Prince Adeola portrait enlarged" fill style={{ objectFit: 'contain' }} priority />
          </div>
        </div>
      )}
    </section>
  );
};

export default HeroSection;