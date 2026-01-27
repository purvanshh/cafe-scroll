import Image from 'next/image';

const images = [
    "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?q=80&w=800&auto=format&fit=crop", // Coffee Drinks
    "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=800&auto=format&fit=crop", // Latte Art
    "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=800&auto=format&fit=crop", // Brewing
    "https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=800&auto=format&fit=crop"  // Croissants/Pastry
];

export const Gallery = () => {
    return (
        <section className="bg-bg-dark w-full overflow-hidden">
            <div className="grid grid-cols-2 md:grid-cols-4 w-full">
                {images.map((src, index) => (
                    <div key={index} className="relative aspect-square md:aspect-[4/5] w-full overflow-hidden group">
                        <Image
                            src={src}
                            alt="Gallery image"
                            fill
                            className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                            sizes="(max-width: 768px) 50vw, 25vw"
                        />
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500"></div>
                    </div>
                ))}
            </div>
        </section>
    );
};
