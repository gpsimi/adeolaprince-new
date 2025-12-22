import ComeSoonHero from "@/components/sections/ComeSoonHero";

export const metadata = {
  title: "C.O.A.P — Chronicles of a Prince",
  description: "Weekly newsletter from Prince Adeola.",
};


export default function BlogPage() {
  return (
    <main className=" pt-18">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 ">
        <ComeSoonHero />
      </div>
    </main>
  );
}
