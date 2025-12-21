'use client'

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import TestimonialCard from "@/components/ui/testimonial-card";

const testimonials = [
  {
    name: "Peter Adeola",
    role: "Retired Finance General Manager - Nigerian Civil Aviation Authority of Nigeria",
    text: "A deeply instructive book with compelling illustrations that aid logical reasoning and critical thinking. It's no doubt worth the time of any reader who has genuine quest for knowledge expansion and increasing mind illumination with fresh and new intellectual perspectives on the subject matter which has been carefully explored and succinctly explained.",
  },
  {
    name: "Pst Ayanfe Dideoluwa",
    role: "Ministry Leader",
    text: "Prince surely has received something from on high and has been sent by the Power of the Highest, to his generation and indeed all who will come across his works. This piece is a very rich mosaic of literary beauty, with words striking simply yet powerfully upon each reader's heart. Its pages convey the depths of light and wisdom needed to sharpen your perspectives towards life. No one will think the same way after traveling through its pages. My desire is to see this book represented in every household of the world.",
  },
  {
    name: "Blessing Jeremiah",
    role: "Prolofic Writer",
    text: "Prince Adeola has written a book far beyond his years. Wise, reflective, and deeply enlightening. As an ardent follower of his work, I continue to be amazed by the clarity and maturity of his delivery. Hello, I'm Light truly lives up to its name. It's a rich collection of insight, truth, and revelation. The juxtaposition of words, real-life scenarios, and thoughtfully selected case studies all come together in a style that is both subtle and deeply impactful. What strikes me most is how this book causes my mind to revisit the past, not to dwell there, but to gain perspective, to understand who I am now, and to see clearly the path to who I can become. This is more than a book.It's a life guide. I highly recommend Hello, I'm Light,  to readers of all. Disclaimer: You might need to keep a dictionary nearby, and that's one of the things I love most about it. It stretches the mind and feeds the soul. A complete and brilliant delivery. Well done, Prince!",
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
            <TestimonialCard
              key={testimonial.name}
              testimonial={testimonial}
              isInView={isInView}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;