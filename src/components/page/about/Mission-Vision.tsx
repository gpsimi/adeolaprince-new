
import { motion } from "framer-motion";
import { Heart, BookOpen, Users} from "lucide-react";



const MissionVision = () => {
  return (
    <section className="py-20 md:py-32 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Mission & Vision</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Bringing light to a dark alleys, minds, systems, and cultures of the world. Making the world a better place than we met it, one person at a time. 
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-card p-8 rounded-lg shadow-soft text-center"
            >
              <Heart className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3">Heart for Transformation</h3>
              <p className="text-muted-foreground">
                Passionate about bringing illumination to the dark alleys of the mind 
                through the accurate display of Truth.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-card p-8 rounded-lg shadow-soft text-center"
            >
              <BookOpen className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3">Biblical Foundation</h3>
              <p className="text-muted-foreground">
                Anchored in orthodox (original) faith just as it was handed down 
                to the Apostles and the Apostolic Fathers. Walking the narrow line 
                between unwavering fidelity to original doctrine and a strong 
                emphasis on its practical application.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-card p-8 rounded-lg shadow-soft text-center"
            >
              <Users className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3">Global Impact</h3>
              <p className="text-muted-foreground">
                Beaming light throughout the cosmos and its inhabitants through 
                teaching, writing, training, and deploying individuals and nations 
                who are uncompromisingly true to objective Truth and who transcend 
                the borders of culture and religion.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
  )
}

export default MissionVision