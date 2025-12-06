import React from 'react'

import { motion } from "framer-motion";

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';



const AboutHero = () => {
  return (
    <section className="py-20 md:py-32 gradient-hero">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 ">
        <div className="flex lg:flex-row flex-col items-center justify-center gap-6">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full lg:w-1/2"
          >
            <div className="relative max-w-md mx-auto lg:mx-0">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5 rounded-lg transform -rotate-3" />
              <div className="relative bg-card shadow-elegant rounded-lg aspect-square flex items-center justify-center">
                <Image
                  src="/images/about.PNG"
                  alt="Adeola Prince"
                  width={500}
                  height={500}
                  className="rounded-lg object-cover w-full"
                />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-full lg:w-1/2"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Adeola Prince</h1>
            <p className="text-xl text-muted-foreground mb-8">
              A global speaker, Astute saxophonists and Prolific Writer,
            </p>
            <p className="text-lg text-muted-foreground mb-8">
              He balances a career in aircraft engineering, music, and a profound
              passion for illuminating life's biggest questions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="gradient-primary shadow-elegant">
                <Link href="/book/preorder">Preorder the Book</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/book">About the Book</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default AboutHero