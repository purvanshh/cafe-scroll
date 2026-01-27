export const Locations = () => {
    const locations = [
        {
            city: "Brussels",
            address: "Rue du Midi 46, 1000\nBruxelles, Belgium",
            phone: "+32 2 555 0101"
        },
        {
            city: "Anderlecht",
            address: "Pl. De Linde 27, 1070\nAnderlecht, Belgium",
            phone: "+32 2 555 0102"
        },
        {
            city: "Machelen",
            address: "Dorpsplein 2, 1830\nMachelen, Belgium",
            phone: "+32 2 555 0103"
        }
    ];

    return (
        <section className="bg-bg-dark py-24 md:py-32 border-t border-white/5" id="locations">
            <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col items-center">
                <h2 className="text-4xl md:text-5xl text-text-light font-alfa mb-16 text-center">
                    Locations
                </h2>

                <div className="grid md:grid-cols-3 gap-12 w-full text-center md:text-left">
                    {locations.map((loc) => (
                        <div key={loc.city} className="flex flex-col gap-4 group">
                            <h3 className="text-2xl font-bold text-text-light/90 border-b border-white/10 pb-4 group-hover:border-brown-primary transition-colors duration-300">
                                {loc.city}
                            </h3>
                            <p className="text-text-light/60 whitespace-pre-line font-source leading-relaxed">
                                {loc.address}
                            </p>
                            <p className="text-brown-primary text-sm font-bold mt-2">
                                {loc.phone}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
