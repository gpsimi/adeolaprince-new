import { BlogGrid } from "@/components/page/blog";


export const metadata = {
  title: "C.O.A.P — Chronicles of a Prince",
  description: "Weekly newsletter from Adeola Prince",
};


export default function BlogPage() {
  return (
    <main className="min-h-screen pt-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-serif font-bold">C.O.A.P — Chronicles of a Prince</h1>
          <p className="text-muted-foreground mt-4">Weekly reflections, essays, and creative pieces.</p>
        </div>

        <BlogGrid />

        
      </div>
    </main>
  );
}
