"use client";

import { useState } from "react";
import { Quote } from "lucide-react";
import { motion } from "framer-motion";

interface Testimonial {
  name: string;
  role: string;
  text: string;
}

interface TestimonialCardProps {
  testimonial: Testimonial;
  isInView: boolean;
  index: number;
}

const TestimonialCard = ({ testimonial, isInView, index }: TestimonialCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const words = testimonial.text.split(" ");
  const isLongText = words.length > 25;
  const truncatedText = isLongText ? words.slice(0, 25).join(" ") + "..." : testimonial.text;

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <motion.div
      key={testimonial.name}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className="bg-card p-8 rounded-lg shadow-soft hover:shadow-elegant transition-shadow flex flex-col"
    >
      <Quote className="h-10 w-10 text-primary/30 mb-4" />
      <div className="flex-grow">
        <p className="text-muted-foreground mb-6 italic">
          "{isExpanded
            ? testimonial.text
            : truncatedText}"
          {isLongText && (
            <button
              onClick={toggleExpanded}
              className="text-primary/80 font-semibold hover:underline ml-1 text-sm"
            >
              {isExpanded ? "See less" : "See more"}
            </button>
          )}
        </p>
      </div>
      <div className="border-t border-border pt-4">
        <p className="font-semibold">{testimonial.name}</p>
        <p className="text-sm text-muted-foreground">{testimonial.role}</p>
      </div>
    </motion.div>
  );
};

export default TestimonialCard;
