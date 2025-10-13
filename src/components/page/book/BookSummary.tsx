import { MotionDiv, MotionSection } from '@/components/MotionWrapper'
import React from 'react'

const BookSummary = () => {
    return (
        <MotionSection className="py-20 md:py-32">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">
                    <MotionDiv
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl md:text-5xl font-bold mb-6">About This Book</h2>
                    </MotionDiv>

                    <MotionDiv
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="prose prose-lg max-w-none"
                    >
                        <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                            In a world full of noise and distraction, "The Path of Becoming" offers
                            clarity and direction for those seeking authentic spiritual transformation.
                            This isn't just another self-help book—it's a biblically-grounded roadmap
                            to discovering who God created you to be and living fully in that reality.
                        </p>

                        <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                            Prince Adeola draws from years of ministry experience, deep scriptural
                            insight, and profound spiritual revelation to guide you through a journey
                            of genuine transformation. Each chapter unveils powerful truths that will
                            challenge your perspectives, deepen your faith, and empower you to step
                            boldly into your divine calling.
                        </p>

                        <p className="text-lg text-muted-foreground leading-relaxed">
                            Whether you're just beginning your spiritual journey or seeking to go
                            deeper in your walk with God, this book provides the wisdom, encouragement,
                            and practical tools you need to navigate the path of becoming who you're
                            truly meant to be.
                        </p>
                    </MotionDiv>
                </div>
            </div>
        </MotionSection>
    )
}

export default BookSummary