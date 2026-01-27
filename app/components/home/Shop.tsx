import Image from 'next/image';
import { Button } from '../ui/Button';

const products = [
    {
        name: "Silent Ocean Blend",
        price: "$24.99",
        description: "Our signature dark roast with notes of chocolate and caramel.",
        image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=800&auto=format&fit=crop"
    },
    {
        name: "Morning Sunrise",
        price: "$19.99",
        description: "A light, fruity blend perfect for early mornings.",
        image: "https://images.unsplash.com/photo-1511920170033-f8396924c348?q=80&w=800&auto=format&fit=crop"
    },
    {
        name: "Espresso Reserve",
        price: "$29.99",
        description: "Intense and bold. For the true espresso connoisseur.",
        image: "https://images.unsplash.com/photo-1485808191679-5f86510681a2?q=80&w=800&auto=format&fit=crop"
    },
    {
        name: "Cold Brew Kit",
        price: "$34.99",
        description: "Everything you need to brew perfect cold coffee at home.",
        image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?q=80&w=800&auto=format&fit=crop"
    },
    {
        name: "Ceramic Pour Over",
        price: "$45.00",
        description: "Handcrafted ceramic dripper for the perfect pour.",
        image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=800&auto=format&fit=crop"
    },
    {
        name: "Brussels Mug Set",
        price: "$28.00",
        description: "Set of 4 artisan mugs with our signature logo.",
        image: "https://images.unsplash.com/photo-1572119865084-43c285814d63?q=80&w=800&auto=format&fit=crop"
    }
];

export const Shop = () => {
    return (
        <section id="shop" className="bg-bg-light py-24 md:py-32">
            <div className="max-w-7xl mx-auto px-6 md:px-12">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-6xl font-alfa text-text-dark mb-4">
                        Our Shop
                    </h2>
                    <p className="text-text-dark/70 text-lg max-w-2xl mx-auto font-source">
                        Bring the Brussels Brewery experience home with our premium selection of beans, equipment, and merchandise.
                    </p>
                </div>

                {/* Products Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {products.map((product, index) => (
                        <div
                            key={index}
                            className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300"
                        >
                            <div className="relative aspect-square overflow-hidden">
                                <Image
                                    src={product.image}
                                    alt={product.name}
                                    fill
                                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                            </div>
                            <div className="p-6">
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="text-xl font-bold text-text-dark font-archivo">{product.name}</h3>
                                    <span className="text-brown-primary font-bold font-archivo">{product.price}</span>
                                </div>
                                <p className="text-text-dark/60 text-sm mb-4 font-source">{product.description}</p>
                                <Button variant="primary" className="w-full">
                                    Add to Cart
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* View All Button */}
                <div className="text-center mt-12">
                    <Button variant="outline" className="!border-brown-primary !text-brown-primary hover:!bg-brown-primary hover:!text-white">
                        View All Products &rarr;
                    </Button>
                </div>
            </div>
        </section>
    );
};
