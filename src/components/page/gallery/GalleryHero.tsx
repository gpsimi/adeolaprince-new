import { Camera } from 'lucide-react'
const GalleryHero = () => {
    return (
        <section className="bg-muted/30">
            <div className="container mx-auto px-4 sm:px-6 lg:px-24 py-28 text-center">
                <Camera className="h-16 w-16 text-primary mx-auto mb-4" />
                <h1 className="text-4xl md:text-5xl font-bold mb-4">My Gallery</h1>
                <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                    Dive into a curated visual experience, showcasing inspiration, key events, and our vibrant community.
                </p>
            </div>
        </section>
    )
}

export default GalleryHero