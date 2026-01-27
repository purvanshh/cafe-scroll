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
            const loadedImages: HTMLImageElement[] = [];
            let loadedCount = 0;

            for (let i = 1; i <= FRAME_COUNT; i++) {
                const img = new Image();
                // Construct filename: ezgif-frame-001.jpg ... ezgif-frame-240.jpg
                const paddedIndex = i.toString().padStart(3, '0');
                img.src = `/silent-ocean-frames/ezgif-frame-${paddedIndex}.jpg`;

                await new Promise((resolve) => {
                    img.onload = () => {
                        loadedCount++;
                        console.log(`[CoffeeScroll] Loaded: ${img.src}`);
                        setLoadProgress((loadedCount / FRAME_COUNT) * 100);
                        resolve(true);
                    };
                    img.onerror = (e) => {
                        console.error(`[CoffeeScroll] Failed to load: ${img.src}`, e);
                        resolve(true);
                    };
                });
                loadedImages.push(img);
            }

            setImages(loadedImages);
            setIsLoaded(true);
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
    let positionClasses = "left-12 md:left-24 items-start text-left";
    if (position === "center") positionClasses = "left-1/2 -translate-x-1/2 items-center text-center";
    if (position === "right") positionClasses = "right-12 md:right-24 items-end text-right";

    return (
        <motion.div
            style={{ opacity, y }}
            className={`absolute top-1/2 -translate-y-1/2 flex flex-col pointer-events-none z-10 max-w-lg ${positionClasses}`}
        >
            <h2 className="text-5xl md:text-7xl font-medium tracking-tight text-white/90 mb-4 font-sans leading-tight">{title}</h2>
            <p className="text-xl md:text-2xl text-white/60 font-light tracking-wide leading-relaxed">{sub}</p>
            {isCta && (
                <div className="mt-8 px-8 py-4 border border-white/20 rounded-full text-white/80 text-sm uppercase tracking-widest bg-white/5 backdrop-blur-sm">
                    Enjoy
                </div>
            )}
        </motion.div>
    );
}
