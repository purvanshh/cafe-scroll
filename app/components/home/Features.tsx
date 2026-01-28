'use client';

import { useEffect, useRef, useState } from 'react';
import { useScroll, useTransform, motion, useSpring } from 'framer-motion';
import { Button } from '../ui/Button';

const FRAME_COUNT = 90;

export const Features = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [images, setImages] = useState<HTMLImageElement[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [loadProgress, setLoadProgress] = useState(0);

    // Scroll progress for the container
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    // Smooth spring for fluid frame interpolation
    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 200,
        damping: 30,
        restDelta: 0.001
    });

    // Map scroll (0-1) to frame index (0-89)
    const frameIndex = useTransform(smoothProgress, [0, 1], [0, FRAME_COUNT - 1]);

    // Text animations
    const textOpacity = useTransform(smoothProgress, [0.2, 0.4, 0.6, 0.8], [0, 1, 1, 0]);
    const textY = useTransform(smoothProgress, [0.2, 0.4, 0.6, 0.8], [50, 0, 0, -50]);

    useEffect(() => {
        const loadImages = async () => {
            let loadedCount = 0;

            const imagePromises = Array.from({ length: FRAME_COUNT }, (_, i) => {
                return new Promise<HTMLImageElement>((resolve, reject) => {
                    const img = new Image();
                    const paddedIndex = (i + 1).toString().padStart(3, '0');
                    img.src = `/Ezgif Image/ezgif-frame-${paddedIndex}.webp`;

                    img.onload = () => {
                        loadedCount++;
                        setLoadProgress((loadedCount / FRAME_COUNT) * 100);
                        resolve(img);
                    };

                    img.onerror = (e) => {
                        console.error(`[Features] Failed to load: ${img.src}`, e);
                        reject(e);
                    };
                });
            });

            try {
                const loadedImages = await Promise.all(imagePromises);
                setImages(loadedImages);
                setIsLoaded(true);
            } catch (error) {
                console.error("Some images failed to load", error);
            }
        };

        loadImages();
    }, []);

    useEffect(() => {
        if (!isLoaded || images.length === 0) return;

        const render = () => {
            const canvas = canvasRef.current;
            if (!canvas) return;

            const ctx = canvas.getContext('2d');
            if (!ctx) return;

            // Handle Device Pixel Ratio for sharpness
            const dpr = window.devicePixelRatio || 1;
            const rect = canvas.getBoundingClientRect();

            // Only resize if dimensions change
            if (canvas.width !== rect.width * dpr || canvas.height !== rect.height * dpr) {
                canvas.width = rect.width * dpr;
                canvas.height = rect.height * dpr;
                ctx.scale(dpr, dpr);
            }

            // Calculate current frame
            const currentFrame = Math.min(
                FRAME_COUNT - 1,
                Math.max(0, Math.round(frameIndex.get()))
            );

            const img = images[currentFrame];

            if (img && img.complete && img.naturalHeight !== 0) {
                // "cover" fit logic
                const hRatio = rect.width / img.width;
                const vRatio = rect.height / img.height;
                const ratio = Math.max(hRatio, vRatio);

                const centerShift_x = (rect.width - img.width * ratio) / 2;
                const centerShift_y = (rect.height - img.height * ratio) / 2;

                ctx.clearRect(0, 0, rect.width, rect.height);

                // Draw background color to ensure no gaps
                ctx.fillStyle = '#1A1A1A';
                ctx.fillRect(0, 0, rect.width, rect.height);

                ctx.drawImage(
                    img,
                    0, 0, img.width, img.height,
                    centerShift_x, centerShift_y, img.width * ratio, img.height * ratio
                );
            }

            requestAnimationFrame(render);
        };

        const animationId = requestAnimationFrame(render);
        return () => cancelAnimationFrame(animationId);
    }, [isLoaded, images, frameIndex]);

    return (
        <section ref={containerRef} className="relative h-[400vh] bg-bg-dark">
            {/* Sticky container for the animation */}
            <div className="sticky top-0 h-screen w-full overflow-hidden">
                {/* Loading state */}
                {!isLoaded && (
                    <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-bg-dark">
                        <div className="w-48 h-1 bg-white/10 rounded-full overflow-hidden">
                            <motion.div
                                className="h-full bg-blue-primary rounded-full"
                                style={{ width: `${loadProgress}%` }}
                            />
                        </div>
                        <p className="text-white/40 text-xs mt-4 font-mono">Loading... {Math.round(loadProgress)}%</p>
                    </div>
                )}

                {/* Canvas for frame animation */}
                <div className="absolute inset-0 z-0">
                    <canvas
                        ref={canvasRef}
                        className={`w-full h-full object-cover ${isLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-500`}
                        style={{ width: '100%', height: '100%' }}
                    />
                    {/* Gradient overlay for better text readability */}
                    <div className="absolute inset-0 bg-gradient-to-r from-bg-dark/50 via-bg-dark/20 to-transparent" />
                </div>

                {/* Text Content Overlay */}
                <motion.div
                    className="absolute inset-0 z-10 flex items-center pointer-events-none"
                    style={{ opacity: textOpacity }}
                >
                    <div className="max-w-7xl mx-auto px-6 md:px-12 w-full">
                        <motion.div
                            className="flex flex-col gap-6 items-start max-w-xl"
                            style={{ y: textY }}
                        >
                            <h2 className="text-4xl md:text-5xl lg:text-6xl text-text-light font-alfa leading-tight">
                                Crafted With
                                <br />
                                <span className="text-blue-primary">Passion</span>
                            </h2>
                            <p className="text-text-light/70 text-lg md:text-xl leading-relaxed font-source">
                                Our organically grown coffee beans are roasted over an open flame in a one-of-a-kind, brick roaster. There&apos;s nothing quite like a cup of Brussels Brewery coffee.
                            </p>
                            <Button
                                variant="outline"
                                className="!text-text-light !border-text-light/30 hover:!bg-text-light hover:!text-bg-dark pointer-events-auto"
                            >
                                View our menu &rarr;
                            </Button>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};
