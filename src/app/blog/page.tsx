import ComeSoonHero from "@/components/sections/ComeSoonHero";

export const metadata = {
  title: "C.O.A.P — Chronicles of a Prince",
  description: "Weekly newsletter from Adeola Prince",
};


export default function BlogPage() {
  return (
    <main className="min-h-screen pt-24 bg-gradient-to-b from-white via-slate-50 to-slate-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <ComeSoonHero />
      </div>
    </main>
  );
}
