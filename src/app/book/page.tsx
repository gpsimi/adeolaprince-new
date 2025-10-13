import { BookCTA, BookHero, BookSummary, Discover } from "@/components/page/book";
import TestimonialsSection from "@/components/sections/TestimonialsSection";

const Book = () => {

  return (
    <div className="min-h-screen pt-20">
      <BookHero />
      <BookSummary />
      <Discover />
      <TestimonialsSection />
      <BookCTA />    
    </div>
  );
};

export default Book;