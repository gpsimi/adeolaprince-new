

import { motion } from "framer-motion";


const AboutBio = () => {
  return (
    <section className="py-20 md:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6">About Adeola Prince</h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-6 text-lg text-muted-foreground leading-relaxed"
          >
            <p>
              Adeola Prince is a polymath with a first-class degree in avionics
              engineering from National Aviation University, Kyiv Ukraine.
              He balances a career in aircraft engineering, music, and a profound
              passion for illuminating life's biggest questions. Prince's unique path
              which includes escaping the Russian-Ukrainian war to pursue his calling
              fuels his desire to inspire change.
            </p>

            <p>
              Through thought-provoking talks and letters, he inspires young adults
              on the powerful intersection of faith, logic, and science. His email
              newsletter, <span className="font-extrabold">Chronicles of A. Prince, </span>
              is a catalyst that has ignited change in the lives of many across different
              continents by challenging pop culture and driving deeper thought. Whether writing
              or playing soul-stirring music on his saxophone, Prince is driven by a passion for
              human behavioral science, apologetics, and truth to answer life's questions: Who are we,
              why are we here, what should we do while we are here, and where are we going to?
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default AboutBio