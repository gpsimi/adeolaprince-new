import React from 'react'

import { motion } from "framer-motion";
import { UserCircle } from "lucide-react";
import { Button } from '@/components/ui/button';
import Link from 'next/link';



const AboutHero = () => {
  return (
    <section className="py-20 md:py-32 gradient-hero">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative max-w-md mx-auto lg:mx-0">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5 rounded-lg transform -rotate-3" />
              <div className="relative bg-card shadow-elegant rounded-lg p-12 aspect-square flex items-center justify-center">
                <UserCircle className="h-64 w-64 text-primary/30" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Adeola Prince</h1>
            <p className="text-xl text-muted-foreground mb-8">
              A global speaker, Astute saxophonists and Prolific Writer,
            </p>
            <p className="text-lg text-muted-foreground mb-8">
              Helps people stay focus  and shift  mindsets so they
              can see possibilities and become those possibilities
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="gradient-primary shadow-elegant">
                <Link href="/preorder">Preorder the Book</Link>
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