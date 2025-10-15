

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
              <h2 className="text-3xl md:text-5xl font-bold mb-6">About Prince Adeola</h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="space-y-6 text-lg text-muted-foreground leading-relaxed"
            >
              <p>
                Prince Adeola is a passionate minister and teacher with a heart for
                transformation. With years of ministry experience and a deep commitment
                to biblical truth, he has dedicated his life to helping believers discover
                their authentic identity in Christ and step fully into their God-given purpose.
              </p>

              <p>
                His teaching ministry has touched countless lives across the globe, bringing
                clarity, revelation, and practical wisdom to those seeking genuine spiritual
                growth. Known for his ability to make profound truths accessible and applicable,
                Prince Adeola combines scriptural depth with real-world relevance.
              </p>

              <p>
                Through his ministry, he emphasizes the importance of authentic transformation
                over mere religious activity. He believes that true spiritual growth comes from
                encountering God's truth, embracing one's divine identity, and walking in the
                fullness of one's calling.
              </p>

              <p>
                "Hello, I am Light" represents years of spiritual insight, ministerial
                experience, and divine revelation distilled into a powerful guide for those
                ready to embark on a journey of genuine transformation.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
  )
}

export default AboutBio