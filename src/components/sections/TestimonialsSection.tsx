'use client'

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Quote } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Adeola",
    role: "Ministry Leader",
    text: "This book has transformed my understanding of spiritual growth. Adeola Prince's insights are profound yet practical, guiding me step by step on my journey.",
  },
  {
    name: "Michael Olubakin",
    role: "Pastor",
    text: "A must-read for anyone seeking authentic transformation. The wisdom in these pages will challenge and inspire you to embrace your true calling.",
  },
  {
    name: "Grace Okonkwo",
    role: "Faith Coach",
    text: "I've recommended this book to countless people. It's a beautiful blend of biblical truth and practical application that truly changes lives.",
  },
];

const TestimonialsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-20 md:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-6">What Readers Are Saying</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Join thousands who have been transformed by this powerful message
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="bg-card p-8 rounded-lg shadow-soft hover:shadow-elegant transition-shadow"
            >
              <Quote className="h-10 w-10 text-primary/30 mb-4" />
              <p className="text-muted-foreground mb-6 italic">"{testimonial.text}"</p>
              <div className="border-t border-border pt-4">
                <p className="font-semibold">{testimonial.name}</p>
                <p className="text-sm text-muted-foreground">{testimonial.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;