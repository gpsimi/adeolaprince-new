import ContactForm from "@/components/forms/ContactForm";

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
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Me</h1>
              <p className="text-lg text-muted-foreground">
                For inquiries regarding bookings, speaking engagements, or collaborations, please leave a message below.
              </p>
            </div>


            <div className="bg-card p-8 rounded-lg shadow-elegant">
              <ContactForm />
            </div>




          </div>
        </div>
      </section>
    </div>


  );
}
