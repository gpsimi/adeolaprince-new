'use client'

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { BookMarked, Heart, Lightbulb, TrendingUp } from "lucide-react";

const features = [
  {
    icon: BookMarked,
    title: "Biblical Foundation",
    description: "Rooted in timeless spiritual truths and scriptural wisdom",
  },
  {
    icon: Heart,
    title: "Authentic Growth",
    description: "Practical guidance for genuine transformation and purpose",
  },
  {
    icon: Lightbulb,
    title: "Divine Insight",
    description: "Revelation and clarity for your spiritual journey",
  },
  {
    icon: TrendingUp,
    title: "Progressive Steps",
    description: "A clear path to becoming who you're meant to be",
  },
];

const AboutBookSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-20 md:py-32 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-6">About the Book</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto text-balance">
            In a dark world where objective truth is on the verge of extinction, "Hello, I Am Light"
            is a playbook for the curriculum of light.
            This curriculum offers a fine blend of logic, science, and faith, providing
            you with the recipe not just for personal illumination, but to become a
            catalyst to bring light to everything you touch and every room you enter.
            Making the world a luminous place with luminous people, one encounter at a time.
            Enroll in the curriculum, and Join me on a trip to where light resides.
            Are you ready?
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-card p-6 rounded-lg shadow-soft hover:shadow-elegant transition-shadow"
            >
              <feature.icon className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutBookSection;