import Image from 'next/image';

export const ProductShowcase = () => {
    return (
        <section className="bg-bg-dark py-0 relative w-full overflow-hidden">
            {/* 
                User requested a "premium slow-motion product video".
                Since we cannot generate video, this is a high-quality placeholder 
                styled to look like a cinematic shot. 
             */}
            <div className="w-full h-[80vh] relative group">
                <Image
                    src="https://images.unsplash.com/photo-1541167760496-1628856ab772?q=80&w=2670&auto=format&fit=crop"
                    alt="Premium cold brew coffee pour"
                    fill
                    sizes="100vw"
                    className="object-cover object-center transform scale-100 group-hover:scale-105 transition-transform duration-[3s] ease-in-out"
                    priority
                />

                {/* Subtle Cinematic Vignette / Overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40 pointer-events-none"></div>

                {/* Optional subtle caption if needed, keeping it minimal as requested "No text" */}
                {/* <div className="absolute bottom-12 left-12 text-white/50 text-xs font-serif tracking-widest uppercase">
                    Pure Extraction
                </div> */}
            </div>
        </section>
    );
};
