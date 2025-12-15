// src/app/gallery/page.tsx
import { GalleryCard, GalleryHero } from "@/components/page/gallery";



const GalleryPage = async () => {
  

  return (
    <div className="min-h-screen">
      <GalleryHero />
      <GalleryCard />
    </div>
  );
};

export default GalleryPage;