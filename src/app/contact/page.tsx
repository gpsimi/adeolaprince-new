import ContactForm from "@/components/forms/ContactForm";

export const metadata = {
  title: "Contact - Prince Adeola",
  description: "Get in touch with Prince Adeola for bookings and collaborations.",
};

export default function ContactPage() {
  return (
    <main className="min-h-screen pt-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-serif font-bold">Contact</h1>
          <p className="text-muted-foreground mt-4">
            For bookings, speaking engagements or collaborations, send a message below.
          </p>
        </div>

        <div className="mx-auto container max-w-4xl justify-center items-center">
          <ContactForm />
        </div>

        
      </div>
    </main>
  );
}
