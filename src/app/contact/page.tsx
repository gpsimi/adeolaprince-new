import ContactForm from "@/components/forms/ContactForm";

export const metadata = {
  title: "Contact - Adeola Prince",
  description: "Get in touch with Adeola Prince for bookings and collaborations.",
};

export default function ContactPage() {
  return (
    // <main className="min-h-screen pt-24">
    //   <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
    //     <div className="max-w-3xl mx-auto text-center mb-12">
    // <h1 className="text-4xl md:text-5xl font-serif font-bold">Contact</h1>
    // <p className="text-muted-foreground mt-4">
    //   For bookings, speaking engagements or collaborations, send a message below.
    // </p>
    //     </div>

    //     <div className="mx-auto container max-w-4xl justify-center items-center">
    //       <ContactForm />
    //     </div>
    //   </div>
    // </main>
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
