import { supabase } from "@/lib/supabase";
import Image from "next/image";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";

export const revalidate = 300; // Revalidate the page every 5 minutes

interface GalleryImage {
    id: string;
    created_at: string;
    image_url: string;
    title: string | null;
    description: string | null;
}


const GalleryCard = async () => {
    const { data: images, error } = await supabase
        .from("gallery")
        .select("*")
        .order("created_at", { ascending: false }); // Newest first

    if (error) {
        console.error("Error fetching gallery images:", error);
        return (
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-24">
                <Alert variant="destructive">
                    <AlertTriangle className="h-4 w-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>
                        Could not load gallery images at this time. Please try again later.
                    </AlertDescription>
                </Alert>
            </div>
        );
    }


    return (
        <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-32">
            {images && images.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-8">
                    {images.map((image) => (
                        <div key={image.id} className="relative aspect-[3/4] w-full overflow-hidden rounded-lg shadow-md transition-all duration-300 hover:scale-[1.02]">
                            <Image
                                src={image.image_url}
                                alt={image.title || "Gallery Image"}
                                fill
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                                className="object-cover"
                            />
                            {image.title && (
                                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-4 text-white">
                                    <h3 className="text-lg font-semibold drop-shadow-md">{image.title}</h3>
                                    {image.description && <p className="text-sm opacity-80 drop-shadow-md">{image.description}</p>}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center py-16 border-2 border-dashed rounded-lg">
                    <h2 className="text-2xl font-semibold">No Images Yet</h2>
                    <p className="text-muted-foreground mt-2">
                        The gallery is empty. New images will appear here soon
                    </p>
                </div>
            )}
        </main>
    )
}

export default GalleryCard