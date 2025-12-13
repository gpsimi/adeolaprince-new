import { MotionDiv, MotionSection } from '@/components/MotionWrapper'
import { learnings } from '@/constants'
import { Check } from 'lucide-react'

const Discover = () => {
    return (
        <MotionSection className="py-20 md:py-32 bg-muted/30">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <MotionDiv
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-5xl font-bold mb-6">What You'll Discover</h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        This book will equip you with transformative insights and practical wisdom
                    </p>
                </MotionDiv>

                <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
                    {learnings.map((learning, index) => (
                        <MotionDiv
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="flex items-start space-x-4 bg-card p-6 rounded-lg shadow-soft"
                        >
                            <div className="flex-shrink-0 mt-1">
                                <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center">
                                    <Check className="h-4 w-4 text-primary" />
                                </div>
                            </div>
                            <p className="text-foreground">{learning}</p>
                        </MotionDiv>
                    ))}
                </div>
            </div>
        </MotionSection>
    )
}

export default Discover