import { MotionDiv, MotionSection } from '@/components/MotionWrapper'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

const BookCTA = () => {
  return (
    <MotionSection className="py-20 md:py-32 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <MotionDiv
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Ready to Begin Your Journey?
            </h2>
            <p className="text-lg mb-8 opacity-90 text-balance">
              Preorder your copy today and be among the first to experience this
              transformative message. Your path of becoming starts here.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" variant="secondary" className="min-w-[200px] shadow-elegant">
                <Link href="/book/preorder">Preorder Your Copy</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="min-w-[200px] bg-transparent text-primary-foreground border-primary-foreground hover:bg-primary-foreground/10"
              >
                <Link href="/about">Meet the Author</Link>
              </Button>
            </div>
          </MotionDiv>
        </div>
      </MotionSection>
  )
}

export default BookCTA