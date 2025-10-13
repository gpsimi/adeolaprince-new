import HeroSection from "@/components/sections/HeroSection";
import AboutBookSection from "@/components/sections/AboutBookSection";
import AuthorSection from "@/components/sections/AuthorSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import CTASection from "@/components/sections/CTASection";
import NewsletterSection from "@/components/sections/NewsletterSection";

const Home = () => {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <AboutBookSection />
      <AuthorSection />
      <TestimonialsSection />
      <CTASection />
      <CTASection variant="secondary" />
    </div>
  );
};

export default Home;
