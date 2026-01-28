import Image from 'next/image';

const values = [
    { title: "Sustainability", description: "Every bean is ethically sourced from farmers we know by name." },
    { title: "Quality", description: "Small-batch roasting ensures peak freshness in every cup." },
    { title: "Community", description: "Our cafes are gathering places for neighbors and friends." }
];

export const About = () => {
    return (
        <section id="about" className="bg-bg-dark py-24 md:py-32">
            <div className="max-w-7xl mx-auto px-6 md:px-12">
                {/* Hero Section */}
                <div className="grid md:grid-cols-2 gap-12 items-center mb-24">
                    <div>
                        <h2 className="text-4xl md:text-6xl font-alfa text-text-light mb-6">
                            Our Story
                        </h2>
                        <p className="text-text-light/70 text-lg leading-relaxed font-source mb-6">
                            Brussels Brewery was born in 2015 from a simple belief: coffee should be an experience, not just a drink. What started as a small roastery in a converted warehouse has grown into a beloved community of coffee lovers.
                        </p>
                        <p className="text-text-light/70 text-lg leading-relaxed font-source">
                            We travel the world to find the finest beans, build relationships with farmers, and bring back flavors that tell a story. Every cup we serve is a chapter in that journey.
                        </p>
                    </div>
                    <div className="relative">
                        <div className="absolute inset-0 bg-brown-primary/20 rounded-2xl transform -rotate-3"></div>
                        <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
                            <Image
                                src="https://images.unsplash.com/photo-1442512595331-e89e73853f31?q=80&w=1200&auto=format&fit=crop"
                                alt="Coffee roasting process"
                                fill
                                sizes="(max-width: 768px) 100vw, 50vw"
                                className="object-cover"
                            />
                        </div>
                    </div>
                </div>

                {/* Values Section */}
                <div>
                    <h3 className="text-3xl md:text-4xl font-alfa text-text-light text-center mb-12">
                        What We Stand For
                    </h3>
                    <div className="grid md:grid-cols-3 gap-8">
                        {values.map((value, index) => (
                            <div key={index} className="text-center p-8 border border-white/10 rounded-2xl hover:border-brown-primary/50 transition-colors">
                                <h4 className="text-2xl font-alfa text-text-light mb-4">{value.title}</h4>
                                <p className="text-text-light/60 font-source">{value.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};
