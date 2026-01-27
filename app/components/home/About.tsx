import Image from 'next/image';

const teamMembers = [
    {
        name: "Elena Rodriguez",
        role: "Head Roaster",
        image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=600&auto=format&fit=crop"
    },
    {
        name: "Marcus Chen",
        role: "Master Barista",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop"
    },
    {
        name: "Sarah Williams",
        role: "Sourcing Director",
        image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=600&auto=format&fit=crop"
    }
];

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
                <div className="mb-24">
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

                {/* Team Section */}
                <div>
                    <h3 className="text-3xl md:text-4xl font-alfa text-text-light text-center mb-12">
                        Meet the Team
                    </h3>
                    <div className="grid md:grid-cols-3 gap-8">
                        {teamMembers.map((member, index) => (
                            <div key={index} className="group text-center">
                                <div className="relative w-48 h-48 mx-auto mb-6 rounded-full overflow-hidden border-4 border-brown-primary/30 group-hover:border-brown-primary transition-colors">
                                    <Image
                                        src={member.image}
                                        alt={member.name}
                                        fill
                                        sizes="192px"
                                        className="object-cover"
                                    />
                                </div>
                                <h4 className="text-xl font-bold text-text-light font-archivo">{member.name}</h4>
                                <p className="text-text-light/60 font-source">{member.role}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};
