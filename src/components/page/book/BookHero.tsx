import { MotionDiv, MotionSection } from '@/components/MotionWrapper'
import { Button } from '@/components/ui/button'
import { ArrowRight, BookOpen } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const BookHero = () => {
    return (
        <MotionSection className="py-20 md:py-32 gradient-hero">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <MotionDiv
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="relative max-w-md mx-auto lg:mx-0">
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5 rounded-lg transform rotate-3" />
                            <div className="relative bg-card shadow-elegant rounded-lg aspect-[2/3] flex items-center justify-center">
                                <Image
                                    src="/images/bookcover.jpg"
                                    alt="book-cover"
                                    width={500}
                                    height={300}
                                    className="rounded-lg object-cover w-full"
                                />
                            </div>
                        </div>
                    </MotionDiv>

                    <MotionDiv
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <h1 className="text-4xl md:text-6xl font-bold mb-2">Hello, I am Light</h1>
                        <p className="text-2xl md:text-2xl mb-6 font-bold text-muted-foreground mr-3">It&apos;s Light to meet you </p>
                        <p className="text-xl text-muted-foreground mb-8">
                            A transformative guide to discovering your authentic self and
                            walking in your divine purpose.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Button asChild size="lg" className="gradient-primary shadow-elegant group">
                                <Link href="/preorder">
                                    Preorder Now
                                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                                </Link>
                            </Button>
                            <Button asChild size="lg" variant="outline">
                                <Link href="/register">Join Launch Event</Link>
                            </Button>
                        </div>
                    </MotionDiv>
                </div>
            </div>
        </MotionSection>
    )
}

export default BookHero