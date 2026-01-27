import Image from 'next/image';
import { Button } from '../ui/Button';

export const Features = () => {
    return (
        <section className="bg-bg-dark py-24 md:py-32 relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 md:px-12 grid md:grid-cols-2 gap-16 items-center">
                {/* Left Image */}
                <div className="relative group">
                    <div className="absolute inset-0 bg-blue-primary/10 rounded-2xl transform rotate-3 group-hover:rotate-2 transition-transform duration-500"></div>
                    <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden bg-white/5">
                        <Image
                            src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=2070&auto=format&fit=crop"
                            alt="Fresh coffee beans and cup"
                            fill
                            sizes="(max-width: 768px) 100vw, 50vw"
                            className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                        />
                    </div>
                </div>

                {/* Right Content */}
                <div className="flex flex-col gap-6 items-start">
                    <h2 className="text-4xl md:text-5xl text-text-light font-alfa">
                        Handmade Just For You
                    </h2>
                    <p className="text-text-light/70 text-lg leading-relaxed font-source max-w-lg">
                        Our organically grown coffee beans are roasted over an open flame in a one-of-a-kind, brick roaster. There's nothing quite like a cup of Brussels Brewery coffee.
                    </p>
                    <Button variant="outline" className="!text-text-light !border-text-light/30 hover:!bg-text-light hover:!text-bg-dark">
                        View our menu &rarr;
                    </Button>
                </div>
            </div>
        </section>
    );
};
