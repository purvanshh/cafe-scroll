"use client";

import React, { useEffect, useRef, useState } from "react";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ImageProps } from "next/image";
import { ArrowLeft, ArrowRight, Quote, X } from "lucide-react";

import { cn } from "@/lib/utils";

// ===== Types and Interfaces =====
export interface iTestimonial {
    name: string;
    designation: string;
    description: string;
    profileImage: string;
}

interface iCarouselProps {
    items: React.ReactElement<{
        testimonial: iTestimonial;
        index: number;
        layout?: boolean;
        onCardClose: () => void;
    }>[];
    initialScroll?: number;
}

// ===== Custom Hooks =====
const useOutsideClick = (
    ref: React.RefObject<HTMLDivElement | null>,
    onOutsideClick: () => void,
) => {
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent | TouchEvent) => {
            if (!ref.current || ref.current.contains(event.target as Node)) {
                return;
            }
            onOutsideClick();
        };

        document.addEventListener("mousedown", handleClickOutside);
        document.addEventListener("touchstart", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("touchstart", handleClickOutside);
        };
    }, [ref, onOutsideClick]);
};

// ===== Components =====
const Carousel = ({ items, initialScroll = 0 }: iCarouselProps) => {
    const carouselRef = React.useRef<HTMLDivElement>(null);
    const [canScrollLeft, setCanScrollLeft] = React.useState(false);
    const [canScrollRight, setCanScrollRight] = React.useState(true);

    const checkScrollability = () => {
        if (carouselRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
            setCanScrollLeft(scrollLeft > 0);
            setCanScrollRight(scrollLeft < scrollWidth - clientWidth);
        }
    };

    const isMobile = () => {
        return typeof window !== "undefined" && window.innerWidth < 768;
    };

    const handleScrollLeft = () => {
        if (carouselRef.current) {
            const scrollAmount = isMobile() ? 260 : 400;
            carouselRef.current.scrollBy({ left: -scrollAmount, behavior: "smooth" });
        }
    };

    const handleScrollRight = () => {
        if (carouselRef.current) {
            const scrollAmount = isMobile() ? 260 : 400;
            carouselRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
        }
    };

    const handleCardClose = (index: number) => {
        if (carouselRef.current) {
            const cardWidth = isMobile() ? 260 : 384;
            const gap = isMobile() ? 12 : 16;
            const scrollPosition = (cardWidth + gap) * (index + 1);
            carouselRef.current.scrollTo({
                left: scrollPosition,
                behavior: "smooth",
            });
        }
    };

    useEffect(() => {
        if (carouselRef.current) {
            carouselRef.current.scrollLeft = initialScroll;
            checkScrollability();
        }
    }, [initialScroll]);

    return (
        <div className="relative w-full mt-6 sm:mt-10">
            <div
                className="flex w-full overflow-x-scroll overscroll-x-auto scroll-smooth [scrollbar-width:none] py-4 sm:py-5 -mx-4 px-4 sm:mx-0 sm:px-0"
                ref={carouselRef}
                onScroll={checkScrollability}
            >
                <div
                    className={cn(
                        "absolute right-0 z-[1000] h-auto w-[5%] overflow-hidden bg-gradient-to-l",
                    )}
                />
                <div
                    className={cn(
                        "flex flex-row justify-start gap-3 sm:gap-4",
                        "max-w-5xl mx-auto",
                    )}
                >
                    {items.map((item, index) => {
                        return (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{
                                    opacity: 1,
                                    y: 0,
                                    transition: {
                                        duration: 0.5,
                                        delay: 0.1 * index,
                                        ease: "easeOut",
                                    },
                                }}
                                key={`card-${index}`}
                                className="last:pr-4 sm:last:pr-[5%] md:last:pr-[33%] rounded-3xl flex-shrink-0"
                            >
                                {React.cloneElement(item, {
                                    onCardClose: () => {
                                        return handleCardClose(index);
                                    },
                                })}
                            </motion.div>
                        );
                    })}
                </div>
            </div>
            {/* Navigation buttons - larger touch targets on mobile */}
            <div className="flex justify-center sm:justify-end gap-3 sm:gap-2 mt-4 sm:mt-4">
                <button
                    className="relative z-40 h-12 w-12 sm:h-10 sm:w-10 rounded-full bg-[#4b3f33] flex items-center justify-center disabled:opacity-50 hover:bg-[#4b3f33]/80 active:scale-95 transition-all duration-200"
                    onClick={handleScrollLeft}
                    disabled={!canScrollLeft}
                    aria-label="Scroll left"
                >
                    <ArrowLeft className="h-5 w-5 sm:h-6 sm:w-6 text-[#f2f0eb]" />
                </button>
                <button
                    className="relative z-40 h-12 w-12 sm:h-10 sm:w-10 rounded-full bg-[#4b3f33] flex items-center justify-center disabled:opacity-50 hover:bg-[#4b3f33]/80 active:scale-95 transition-all duration-200"
                    onClick={handleScrollRight}
                    disabled={!canScrollRight}
                    aria-label="Scroll right"
                >
                    <ArrowRight className="h-5 w-5 sm:h-6 sm:w-6 text-[#f2f0eb]" />
                </button>
            </div>
        </div>
    );
};

const TestimonialCard = ({
    testimonial,
    index,
    layout = false,
    onCardClose = () => { },
    backgroundImage = "https://images.unsplash.com/photo-1686806372726-388d03ff49c8?q=80&w=3087&auto=format&fit=crop",
}: {
    testimonial: iTestimonial;
    index: number;
    layout?: boolean;
    onCardClose?: () => void;
    backgroundImage?: string;
}) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const handleExpand = () => {
        return setIsExpanded(true);
    };
    const handleCollapse = () => {
        setIsExpanded(false);
        onCardClose();
    };

    useEffect(() => {
        const handleEscapeKey = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                handleCollapse();
            }
        };

        if (isExpanded) {
            const scrollY = window.scrollY;
            document.body.style.position = "fixed";
            document.body.style.top = `-${scrollY}px`;
            document.body.style.width = "100%";
            document.body.style.overflow = "hidden";
            document.body.dataset.scrollY = scrollY.toString();
        } else {
            const scrollY = parseInt(document.body.dataset.scrollY || "0", 10);
            document.body.style.position = "";
            document.body.style.top = "";
            document.body.style.width = "";
            document.body.style.overflow = "";
            window.scrollTo({ top: scrollY, behavior: "instant" });
        }

        window.addEventListener("keydown", handleEscapeKey);
        return () => {
            return window.removeEventListener("keydown", handleEscapeKey);
        };
    }, [isExpanded]);

    useOutsideClick(containerRef, handleCollapse);

    return (
        <>
            <AnimatePresence>
                {isExpanded && (
                    <div className="fixed inset-0 h-screen overflow-auto z-50">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="bg-black/60 backdrop-blur-lg h-full w-full fixed inset-0"
                        />
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 20 }}
                            ref={containerRef}
                            layoutId={layout ? `card-${testimonial.name}` : undefined}
                            className="w-full max-w-5xl mx-auto bg-gradient-to-b from-[#f2f0eb] to-[#fff9eb] min-h-screen md:min-h-0 md:h-auto z-[60] p-4 sm:p-6 md:p-10 md:rounded-3xl relative md:mt-10 md:mb-10"
                        >
                            {/* Close button - larger touch target on mobile */}
                            <button
                                className="sticky top-4 h-10 w-10 sm:h-8 sm:w-8 right-0 ml-auto rounded-full flex items-center justify-center bg-[#4b3f33] active:scale-95 transition-transform"
                                onClick={handleCollapse}
                                aria-label="Close"
                            >
                                <X className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                            </button>
                            <motion.p
                                layoutId={layout ? `category-${testimonial.name}` : undefined}
                                className="px-0 sm:px-4 md:px-20 text-[#1f1b1d]/70 text-base sm:text-lg font-thin underline underline-offset-8"
                            >
                                {testimonial.designation}
                            </motion.p>
                            <motion.p
                                layoutId={layout ? `title-${testimonial.name}` : undefined}
                                className="px-0 sm:px-4 md:px-20 text-xl sm:text-2xl md:text-4xl font-normal italic text-[#1f1b1d]/70 mt-3 sm:mt-4 lowercase"
                            >
                                {testimonial.name}
                            </motion.p>
                            <div className="py-6 sm:py-8 text-[#1f1b1d]/70 px-0 sm:px-4 md:px-20 text-xl sm:text-2xl md:text-3xl lowercase font-thin leading-snug tracking-wide">
                                <Quote className="h-5 w-5 sm:h-6 sm:w-6 text-[#1f1b1d]/70 mb-2" />
                                {testimonial.description}
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
            <motion.button
                layoutId={layout ? `card-${testimonial.name}` : undefined}
                onClick={handleExpand}
                className="touch-manipulation"
                whileHover={{
                    rotateX: 2,
                    rotateY: 2,
                    rotate: 3,
                    scale: 1.02,
                    transition: { duration: 0.3, ease: "easeOut" },
                }}
                whileTap={{ scale: 0.98 }}
            >
                <div
                    className={`${index % 2 === 0 ? "rotate-0" : "-rotate-0"} rounded-2xl sm:rounded-3xl bg-gradient-to-b from-[#f2f0eb] to-[#fff9eb] h-[420px] sm:h-[500px] md:h-[550px] w-[260px] sm:w-80 md:w-96 overflow-hidden flex flex-col items-center justify-center relative z-10 shadow-md`}
                >
                    <div className="absolute opacity-30" style={{ inset: "-1px 0 0" }}>
                        <div className="absolute inset-0">
                            <Image
                                className="block w-full h-full object-center object-cover"
                                src={backgroundImage}
                                alt="Background layer"
                                fill
                                sizes="(max-width: 640px) 260px, (max-width: 768px) 320px, 384px"
                            />
                        </div>
                    </div>
                    <ProfileImage src={testimonial.profileImage} alt={testimonial.name} />
                    <motion.p
                        layoutId={layout ? `title-${testimonial.name}` : undefined}
                        className="text-[#1f1b1d]/70 text-lg sm:text-xl md:text-2xl font-normal text-center [text-wrap:balance] mt-3 sm:mt-4 lowercase px-3 sm:px-4"
                    >
                        {testimonial.description.length > 80
                            ? `${testimonial.description.slice(0, 80)}...`
                            : testimonial.description}
                    </motion.p>
                    <motion.p
                        layoutId={layout ? `category-${testimonial.name}` : undefined}
                        className="text-[#1f1b1d]/70 text-lg sm:text-xl md:text-2xl font-thin italic text-center mt-4 sm:mt-5 lowercase"
                    >
                        {testimonial.name}.
                    </motion.p>
                    <motion.p
                        className="text-[#1f1b1d]/70 text-sm sm:text-base font-thin italic text-center mt-1 lowercase underline underline-offset-8 decoration-1"
                    >
                        {testimonial.designation.length > 20
                            ? `${testimonial.designation.slice(0, 20)}...`
                            : testimonial.designation}
                    </motion.p>
                </div>
            </motion.button>
        </>
    );
};

const ProfileImage = ({ src, alt, ...rest }: ImageProps) => {
    const [isLoading, setLoading] = useState(true);

    return (
        <div className="w-[80px] h-[80px] sm:w-[100px] sm:h-[100px] md:w-[150px] md:h-[150px] opacity-80 overflow-hidden rounded-full border-2 sm:border-[3px] border-solid border-[rgba(59,59,59,0.6)] aspect-[1/1] flex-none saturate-[0.2] sepia-[0.46] relative">
            <Image
                className={cn(
                    "transition duration-300 absolute top-0 inset-0 rounded-full object-cover z-50",
                    isLoading ? "blur-sm" : "blur-0",
                )}
                onLoad={() => {
                    return setLoading(false);
                }}
                src={src}
                width={150}
                height={150}
                loading="lazy"
                decoding="async"
                blurDataURL={typeof src === "string" ? src : undefined}
                alt={alt || "Profile image"}
                {...rest}
            />
        </div>
    );
};

// Export the components
export { Carousel, TestimonialCard, ProfileImage };
