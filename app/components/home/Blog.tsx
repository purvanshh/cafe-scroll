import Image from 'next/image';
import { Button } from '../ui/Button';

const blogPosts = [
    {
        title: "The Art of the Perfect Pour",
        excerpt: "Discover the techniques behind creating barista-quality pour-over coffee at home.",
        category: "Brewing Tips",
        date: "Jan 15, 2026",
        readTime: "5 min read",
        image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=800&auto=format&fit=crop"
    },
    {
        title: "From Farm to Cup: Ethiopia Edition",
        excerpt: "Join us on our journey to the highlands of Ethiopia to meet the farmers behind our beans.",
        category: "Origin Stories",
        date: "Jan 10, 2026",
        readTime: "8 min read",
        image: "https://images.unsplash.com/photo-1524350876685-274059332603?q=80&w=800&auto=format&fit=crop"
    },
    {
        title: "Cold Brew vs. Iced Coffee",
        excerpt: "What's the difference? We break down the science and taste profiles of each.",
        category: "Education",
        date: "Jan 5, 2026",
        readTime: "4 min read",
        image: "https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?q=80&w=800&auto=format&fit=crop"
    },
    {
        title: "Seasonal Specials: Winter Warmers",
        excerpt: "Introducing our new winter menu featuring spiced lattes and cozy flavors.",
        category: "News",
        date: "Dec 28, 2025",
        readTime: "3 min read",
        image: "https://images.unsplash.com/photo-1534778101976-62847782c213?q=80&w=800&auto=format&fit=crop"
    },
    {
        title: "The History of Espresso",
        excerpt: "From Italian cafes to global phenomenon: the fascinating journey of espresso.",
        category: "Culture",
        date: "Dec 20, 2025",
        readTime: "6 min read",
        image: "https://images.unsplash.com/photo-1510707577719-ae7c14805e3a?q=80&w=800&auto=format&fit=crop"
    },
    {
        title: "Sustainability in Coffee Farming",
        excerpt: "How our partners are leading the way in eco-friendly coffee production.",
        category: "Sustainability",
        date: "Dec 15, 2025",
        readTime: "7 min read",
        image: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?q=80&w=800&auto=format&fit=crop"
    }
];

export const Blog = () => {
    return (
        <section id="blog" className="bg-bg-light py-24 md:py-32">
            <div className="max-w-7xl mx-auto px-6 md:px-12">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-6xl font-alfa text-text-dark mb-4">
                        From the Roastery
                    </h2>
                    <p className="text-text-dark/70 text-lg max-w-2xl mx-auto font-source">
                        Stories, tips, and tales from the world of specialty coffee.
                    </p>
                </div>

                {/* Featured Post */}
                <div className="mb-16">
                    <div className="grid md:grid-cols-2 gap-8 bg-white rounded-3xl overflow-hidden shadow-xl group">
                        <div className="relative aspect-[4/3] md:aspect-auto">
                            <Image
                                src={blogPosts[0].image}
                                alt={blogPosts[0].title}
                                fill
                                sizes="(max-width: 768px) 100vw, 50vw"
                                className="object-cover group-hover:scale-105 transition-transform duration-700"
                            />
                        </div>
                        <div className="p-8 md:p-12 flex flex-col justify-center">
                            <span className="text-brown-primary text-sm font-bold uppercase tracking-wider mb-2">{blogPosts[0].category}</span>
                            <h3 className="text-3xl md:text-4xl font-alfa text-text-dark mb-4">{blogPosts[0].title}</h3>
                            <p className="text-text-dark/70 text-lg mb-6 font-source">{blogPosts[0].excerpt}</p>
                            <div className="flex items-center gap-4 text-sm text-text-dark/50 mb-6">
                                <span>{blogPosts[0].date}</span>
                                <span>•</span>
                                <span>{blogPosts[0].readTime}</span>
                            </div>
                            <Button variant="primary" className="w-fit">
                                Read Article &rarr;
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Blog Grid */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {blogPosts.slice(1).map((post, index) => (
                        <article
                            key={index}
                            className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300"
                        >
                            <div className="relative aspect-[16/10] overflow-hidden">
                                <Image
                                    src={post.image}
                                    alt={post.title}
                                    fill
                                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                                <div className="absolute top-4 left-4">
                                    <span className="bg-brown-primary text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                                        {post.category}
                                    </span>
                                </div>
                            </div>
                            <div className="p-6">
                                <h3 className="text-xl font-bold text-text-dark mb-2 font-archivo group-hover:text-brown-primary transition-colors">
                                    {post.title}
                                </h3>
                                <p className="text-text-dark/60 text-sm mb-4 font-source line-clamp-2">{post.excerpt}</p>
                                <div className="flex items-center gap-4 text-xs text-text-dark/40">
                                    <span>{post.date}</span>
                                    <span>•</span>
                                    <span>{post.readTime}</span>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>

                {/* View All Button */}
                <div className="text-center mt-12">
                    <Button variant="outline" className="!border-brown-primary !text-brown-primary hover:!bg-brown-primary hover:!text-white">
                        View All Posts &rarr;
                    </Button>
                </div>
            </div>
        </section>
    );
};
