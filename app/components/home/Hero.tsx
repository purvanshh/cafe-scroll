import Image from 'next/image';
import { Button } from '../ui/Button';

export const Hero = () => {
    return (
        <section className="relative min-h-screen flex items-center bg-bg-light overflow-hidden pt-20 md:pt-0">
            <div className="max-w-7xl mx-auto px-6 md:px-12 w-full grid md:grid-cols-2 gap-12 items-center">
                {/* Left Content */}
                <div className="order-2 md:order-1 flex flex-col items-start gap-8 z-10">
                    <h1 className="text-5xl md:text-7xl lg:text-8xl leading-[0.9] text-text-dark font-alfa text-balance">
                        Brewed To Perfection, <br />
                        Served With Love
                    </h1>
                    <p className="text-lg md:text-xl text-text-dark/80 max-w-md font-source leading-relaxed">
                        Indulge in handcrafted coffee, freshly baked pastries, and a welcoming atmosphere designed to inspire and unwind.
                    </p>
                    <div className="flex flex-wrap gap-4">
                        <Button variant="primary">Order Online</Button>
                        <Button variant="outline">Find a Location</Button>
                    </div>
                </div>

                {/* Right Image */}
                <div className="order-1 md:order-2 relative h-[50vh] md:h-screen w-full flex items-center justify-center">
                    {/* Shadow Element */}
                    <div className="absolute w-[80%] h-[80%] bg-brown-primary/20 blur-[100px] rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0 pointer-events-none"></div>

                    <div className="relative w-full aspect-square max-w-[500px] z-10 rounded-full overflow-hidden border-8 border-white/20 shadow-2xl">
                        <Image
                            src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=1000&auto=format&fit=crop"
                            alt="Top down view of artisanal coffee cup"
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};
