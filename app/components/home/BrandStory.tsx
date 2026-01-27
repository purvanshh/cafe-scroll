import Image from 'next/image';
import { Button } from '../ui/Button';

export const BrandStory = () => {
    return (
        <section className="bg-bg-dark py-24 md:py-32 border-t border-white/5">
            <div className="max-w-7xl mx-auto px-6 md:px-12 grid md:grid-cols-2 gap-16 items-center">
                {/* Left Content */}
                <div className="order-2 md:order-1 flex flex-col gap-8 items-start">
                    <h2 className="text-4xl md:text-5xl text-text-light font-alfa leading-tight">
                        Made In Brussels
                    </h2>
                    <div className="space-y-6 text-text-light/70 font-source text-lg leading-relaxed">
                        <p>
                            Brussels Brewery wasn't born in a boardroom. It started in a small kitchen with a passion for roasting and a dream to bring people together.
                        </p>
                        <p>
                            We believe coffee is more than just a drink—it’s a ritual, a moment of pause, and a catalyst for connection. Every bean we source tells a story of the farmers who grew it.
                        </p>
                    </div>
                    <Button variant="outline" className="mt-4 !text-text-light !border-text-light/30 hover:!bg-text-light hover:!text-bg-dark">
                        Learn more &rarr;
                    </Button>
                </div>

                {/* Right Image */}
                <div className="order-1 md:order-2 relative aspect-video md:aspect-square w-full rounded-lg overflow-hidden grayscale hover:grayscale-0 transition-all duration-700 ease-in-out">
                    <Image
                        src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=1000&auto=format&fit=crop"
                        alt="Interior of a warm cafe with wooden tables and soft lighting"
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover"
                    />
                    <div className="absolute inset-0 bg-bg-dark/50"></div>
                </div>
            </div>
        </section>
    );
};
