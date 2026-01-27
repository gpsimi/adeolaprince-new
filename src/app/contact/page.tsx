import ContactForm from "@/components/forms/ContactForm";
import ContactHero from "@/components/page/contact/ContactHero";

export const metadata = {
  title: "Contact - Prince Adeola",
  description: "Get in touch with Prince Adeola for bookings and collaborations.",
};

export default function ContactPage() {
  return (
    
    <div className="min-h-screen pt-20">
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto">
            
            <ContactHero />

            <div className="bg-card p-8 rounded-lg shadow-elegant">
              <ContactForm />
            </div>




          </div>
        </div>
      </section>
    </div>


  );
}
