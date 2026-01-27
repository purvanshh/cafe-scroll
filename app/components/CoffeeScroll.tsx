'use client';

import { useEffect, useRef, useState } from 'react';
import { useScroll, useTransform, motion, useSpring } from 'framer-motion';
import { Loader } from './ui/Loader';

const FRAME_COUNT = 218;

export const CoffeeScroll = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [images, setImages] = useState<HTMLImageElement[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [loadProgress, setLoadProgress] = useState(0);

    // Scroll progress for the entire container
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    // Smooth spring for fluid frame interpolation
    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 200, // Reduced stiffness for smoother scrubbing
        damping: 30,    // Higher damping to prevent oscillation
        restDelta: 0.001
    });

    // Map scroll (0-1) to frame index (0-239)
    const frameIndex = useTransform(smoothProgress, [0, 1], [0, FRAME_COUNT - 1]);

    useEffect(() => {
        const loadImages = async () => {
            let loadedCount = 0;

            const imagePromises = Array.from({ length: FRAME_COUNT }, (_, i) => {
                return new Promise<HTMLImageElement>((resolve, reject) => {
                    const img = new Image();
                    const paddedIndex = (i + 1).toString().padStart(3, '0');
                    img.src = `/silent-ocean-frames/ezgif-frame-${paddedIndex}.webp`;

                    img.onload = () => {
                        loadedCount++;
                        setLoadProgress((loadedCount / FRAME_COUNT) * 100);
                        resolve(img);
                    };

                    img.onerror = (e) => {
                        console.error(`[CoffeeScroll] Failed to load: ${img.src}`, e);
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
        <div ref={containerRef} className="relative h-[600vh] bg-bg-dark">
            {!isLoaded && (
                <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-bg-dark text-white/90">
                    <Loader />
                    <p className="text-white/40 text-xs mt-8 font-mono">{Math.round(loadProgress)}%</p>
                </div>
            )}

            <div className="sticky top-0 h-screen w-full overflow-hidden bg-bg-dark">
                {/* Background Canvas */}
                <div className="absolute inset-0 z-0">
                    <canvas
                        ref={canvasRef}
                        className={`w-full h-full object-cover ${isLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-500`}
                        style={{ width: '100%', height: '100%' }}
                    />
                </div>

                {/* Text Overlays */}
                <div className="relative z-10 h-full w-full pointer-events-none">
                    <OverlayText progress={smoothProgress} range={[0.0, 0.25]} title="Brussels Brewery." sub="Crafted with care." position="center" />
                    <OverlayText progress={smoothProgress} range={[0.3, 0.55]} title="Silent Ocean Blend." sub="Waves of flavor." position="left" />
                    <OverlayText progress={smoothProgress} range={[0.6, 0.85]} title="Pure Extraction." sub="Cold brewed perfection." position="right" />
                    <OverlayText progress={smoothProgress} range={[0.9, 1.0]} title="Ready to Sip." sub="Experience the depth." isCta position="center" />
                </div>
            </div>
        </div>
    );
};

// Helper Component for Text Behaviours
const OverlayText = ({
    progress,
    range,
    title,
    sub,
    isCta = false,
    position = "left"
}: {
    progress: any,
    range: [number, number],
    title: string,
    sub: string,
    isCta?: boolean,
    position?: "left" | "center" | "right"
}) => {
    // Fade in faster, stay visible longer, fade out fast
    // Reduced buffer from 0.1 to 0.05 to increase "holding" time
    const opacity = useTransform(progress, [range[0], range[0] + 0.05, range[1] - 0.05, range[1]], [0, 1, 1, 0]);
    const y = useTransform(progress, [range[0], range[0] + 0.05, range[1] - 0.05, range[1]], [20, 0, 0, -20]);

    // Positioning Classes
    // Mobile: Always center text or use smaller margins. 
    // Defaulting to slightly different mobile positions but keeping directional intent where possible.
    let positionClasses = "left-6 md:left-24 items-start text-left";
    if (position === "center") positionClasses = "left-1/2 -translate-x-1/2 items-center text-center w-full px-6";
    if (position === "right") positionClasses = "right-6 md:right-24 items-end text-right";

    return (
        <motion.div
            style={{ opacity, y }}
            className={`absolute top-1/2 -translate-y-1/2 flex flex-col pointer-events-none z-10 max-w-[90%] md:max-w-lg ${positionClasses}`}
        >
            <h2 className="text-3xl md:text-5xl lg:text-7xl font-medium tracking-tight text-white/90 mb-3 md:mb-4 font-sans leading-tight shadow-black/50 drop-shadow-lg">{title}</h2>
            <p className="text-lg md:text-xl lg:text-2xl text-white/80 font-light tracking-wide leading-relaxed drop-shadow-md">{sub}</p>
            {isCta && (
                <div className="mt-6 md:mt-8 px-6 md:px-8 py-3 md:py-4 border border-white/20 rounded-full text-white/90 text-xs md:text-sm uppercase tracking-widest bg-white/10 backdrop-blur-sm pointer-events-auto cursor-pointer hover:bg-white/20 transition-colors">
                    Enjoy
                </div>
            )}
        </motion.div>
    );
}
