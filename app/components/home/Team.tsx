"use client";

import { Carousel, TestimonialCard, iTestimonial } from "@/app/components/ui/retro-testimonial";

type TeamMemberDetails = {
    [key: string]: iTestimonial & { id: string };
};

const teamData = {
    ids: [
        "team-001",
        "team-002",
        "team-003",
        "team-004",
        "team-005",
        "team-006",
    ],
    details: {
        "team-001": {
            id: "team-001",
            description:
                "With over 15 years of experience in specialty coffee, I founded Brussels Brewery to share my passion for the perfect cup. Every bean tells a story, and I'm here to help you discover it.",
            profileImage:
                "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
            name: "Marcus Chen",
            designation: "Founder & Head Roaster",
        },
        "team-002": {
            id: "team-002",
            description:
                "I believe coffee is more than a drink—it's an experience. As our lead barista, I craft each cup with precision and care, ensuring every sip brings joy to our guests.",
            profileImage:
                "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop&crop=face",
            name: "Elena Rodriguez",
            designation: "Lead Barista",
        },
        "team-003": {
            id: "team-003",
            description:
                "Sourcing the finest beans from sustainable farms around the world is my mission. Building relationships with farmers ensures quality from seed to cup.",
            profileImage:
                "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face",
            name: "David Okonkwo",
            designation: "Green Coffee Buyer",
        },
        "team-004": {
            id: "team-004",
            description:
                "The art of roasting coffee is like conducting a symphony. Each batch is carefully monitored to bring out the unique flavor profiles our customers love.",
            profileImage:
                "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop&crop=face",
            name: "Sophie Laurent",
            designation: "Roast Master",
        },
        "team-005": {
            id: "team-005",
            description:
                "Our pastry kitchen is where magic happens. I create handcrafted treats that perfectly complement our coffee, from buttery croissants to decadent cakes.",
            profileImage:
                "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop&crop=face",
            name: "James Morrison",
            designation: "Head Pastry Chef",
        },
        "team-006": {
            id: "team-006",
            description:
                "Creating a warm and welcoming atmosphere is what I do best. From the moment you walk in, I want you to feel at home in our little coffee haven.",
            profileImage:
                "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
            name: "Aria Nakamura",
            designation: "Guest Experience Manager",
        },
    } as TeamMemberDetails,
};

// Create team cards
const teamCards = teamData.ids.map((memberId: string, index: number) => {
    return (
        <TestimonialCard
            key={memberId}
            testimonial={teamData.details[memberId]}
            index={index}
            backgroundImage="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=2070&auto=format&fit=crop"
        />
    );
});

export const Team = () => {
    return (
        <section className="bg-bg-dark py-16 sm:py-20 md:py-24 lg:py-32">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
                {/* Section Header */}
                <div className="text-center mb-6 sm:mb-8">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-text-light font-alfa mb-3 sm:mb-4">
                        Meet The Team
                    </h2>
                    <p className="text-text-light/70 text-base sm:text-lg md:text-xl font-source max-w-2xl mx-auto px-2">
                        The passionate people behind every perfect cup at Brussels Brewery
                    </p>
                </div>

                {/* Carousel */}
                <Carousel items={teamCards} />
            </div>
        </section>
    );
};
