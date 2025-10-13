'use client'

import { useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";

const images = [
  "/placeholder.svg",
  "/favicon.png",
  "/placeholder.svg",
  "/favicon.png",
  "/placeholder.svg",
  "/favicon.png",
];

export default function GalleryPage() {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  const openAt = (i: number) => {
    setIndex(i);
    setOpen(true);
  };

  return (
    <main className="min-h-screen pt-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-serif font-bold">Gallery</h1>
          <p className="text-muted-foreground mt-4">Photos and highlights from performances, talks, and events.</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {images.map((src, i) => (
            <button key={i} onClick={() => openAt(i)} className="group block overflow-hidden rounded-lg">
              <div className="relative w-full aspect-square bg-muted">
                <Image src={src} alt={`Gallery ${i + 1}`} fill className="object-cover transition-transform group-hover:scale-105" />
              </div>
            </button>
          ))}
        </div>

        {/* Lightbox */}
        {open && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
            <div className="relative max-w-[90vw] max-h-[90vh] w-full">
              <button onClick={() => setOpen(false)} className="absolute right-2 top-2 z-20 p-2 rounded-full bg-background/80">
                <X className="h-5 w-5" />
              </button>
              <div className="w-full h-full rounded">
                <Image src={images[index]} alt={`Gallery ${index + 1}`} width={1200} height={800} className="object-contain mx-auto" />
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
