"use client";

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';

// --- STATIC CONFIGURATION (Optimized: Moved outside component) ---
const SLIDER_CONFIG: any = {
    settings: {
        transitionDuration: 2.5, autoSlideSpeed: 5000, currentEffect: "wood", currentEffectPreset: "Default",
        globalIntensity: 1.0, speedMultiplier: 1.0, distortionStrength: 1.0, colorEnhancement: 1.0,
        glassRefractionStrength: 1.0, glassChromaticAberration: 1.0, glassBubbleClarity: 1.0, glassEdgeGlow: 1.0, glassLiquidFlow: 1.0,
        frostIntensity: 1.5, frostCrystalSize: 1.0, frostIceCoverage: 1.0, frostTemperature: 1.0, frostTexture: 1.0,
        rippleFrequency: 25.0, rippleAmplitude: 0.08, rippleWaveSpeed: 1.0, rippleRippleCount: 1.0, rippleDecay: 1.0,
        plasmaIntensity: 1.2, plasmaSpeed: 0.8, plasmaEnergyIntensity: 0.4, plasmaContrastBoost: 0.3, plasmaTurbulence: 1.0,
        timeshiftDistortion: 1.6, timeshiftBlur: 1.5, timeshiftFlow: 1.4, timeshiftChromatic: 1.5, timeshiftTurbulence: 1.4
    },
    effectPresets: {
        glass: { Subtle: { glassRefractionStrength: 0.6, glassChromaticAberration: 0.5, glassBubbleClarity: 1.3, glassEdgeGlow: 0.7, glassLiquidFlow: 0.8 }, Default: { glassRefractionStrength: 1.0, glassChromaticAberration: 1.0, glassBubbleClarity: 1.0, glassEdgeGlow: 1.0, glassLiquidFlow: 1.0 }, Crystal: { glassRefractionStrength: 1.5, glassChromaticAberration: 1.8, glassBubbleClarity: 0.7, glassEdgeGlow: 1.4, glassLiquidFlow: 0.5 }, Liquid: { glassRefractionStrength: 0.8, glassChromaticAberration: 0.4, glassBubbleClarity: 1.2, glassEdgeGlow: 0.8, glassLiquidFlow: 1.8 } },
        frost: { Light: { frostIntensity: 0.8, frostCrystalSize: 1.3, frostIceCoverage: 0.6, frostTemperature: 0.7, frostTexture: 0.8 }, Default: { frostIntensity: 1.5, frostCrystalSize: 1.0, frostIceCoverage: 1.0, frostTemperature: 1.0, frostTexture: 1.0 }, Heavy: { frostIntensity: 2.2, frostCrystalSize: 0.7, frostIceCoverage: 1.4, frostTemperature: 1.5, frostTexture: 1.3 }, Arctic: { frostIntensity: 2.8, frostCrystalSize: 0.5, frostIceCoverage: 1.8, frostTemperature: 2.0, frostTexture: 1.6 } },
        ripple: { Gentle: { rippleFrequency: 15.0, rippleAmplitude: 0.05, rippleWaveSpeed: 0.7, rippleRippleCount: 0.8, rippleDecay: 1.2 }, Default: { rippleFrequency: 25.0, rippleAmplitude: 0.08, rippleWaveSpeed: 1.0, rippleRippleCount: 1.0, rippleDecay: 1.0 }, Strong: { rippleFrequency: 35.0, rippleAmplitude: 0.12, rippleWaveSpeed: 1.4, rippleRippleCount: 1.3, rippleDecay: 0.8 }, Tsunami: { rippleFrequency: 45.0, rippleAmplitude: 0.18, rippleWaveSpeed: 1.8, rippleRippleCount: 1.6, rippleDecay: 0.6 } },
        plasma: { Calm: { plasmaIntensity: 0.8, plasmaSpeed: 0.5, plasmaEnergyIntensity: 0.2, plasmaContrastBoost: 0.1, plasmaTurbulence: 0.6 }, Default: { plasmaIntensity: 1.2, plasmaSpeed: 0.8, plasmaEnergyIntensity: 0.4, plasmaContrastBoost: 0.3, plasmaTurbulence: 1.0 }, Storm: { plasmaIntensity: 1.8, plasmaSpeed: 1.3, plasmaEnergyIntensity: 0.7, plasmaContrastBoost: 0.5, plasmaTurbulence: 1.5 }, Nuclear: { plasmaIntensity: 2.5, plasmaSpeed: 1.8, plasmaEnergyIntensity: 1.0, plasmaContrastBoost: 0.8, plasmaTurbulence: 2.0 } },
        timeshift: { Subtle: { timeshiftDistortion: 0.5, timeshiftBlur: 0.6, timeshiftFlow: 0.5, timeshiftChromatic: 0.4, timeshiftTurbulence: 0.6 }, Default: { timeshiftDistortion: 1.6, timeshiftBlur: 1.5, timeshiftFlow: 1.4, timeshiftChromatic: 1.5, timeshiftTurbulence: 1.4 }, Intense: { timeshiftDistortion: 2.2, timeshiftBlur: 2.0, timeshiftFlow: 2.0, timeshiftChromatic: 2.2, timeshiftTurbulence: 2.0 }, Dreamlike: { timeshiftDistortion: 2.8, timeshiftBlur: 2.5, timeshiftFlow: 2.5, timeshiftChromatic: 2.6, timeshiftTurbulence: 2.5 } }
    }
};

const SLIDES = [
    { title: "Pure Extraction", description: "Precision brewing for the perfect cup.", media: "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?q=80&w=2671&auto=format&fit=crop" },
    { title: "Artisan Roast", description: "Small batches, mastered daily.", media: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?q=80&w=2561&auto=format&fit=crop" },
    { title: "Cold Brew", description: "Steeped for 24 hours of smoothness.", media: "https://images.unsplash.com/photo-1504630083234-14187a9df0f5?q=80&w=2670&auto=format&fit=crop" },
    { title: "Morning Light", description: "Start your day with golden perfection.", media: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=2070&auto=format&fit=crop" },
    { title: "Espresso Art", description: "A canvas of crema and contrast.", media: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=2574&auto=format&fit=crop" },
    { title: "Bean Journey", description: "From farm to cup, handled with care.", media: "https://images.unsplash.com/photo-1559496417-e7f25cb247f3?q=80&w=2574&auto=format&fit=crop" }
];

// --- SHADERS ---
const VERTEX_SHADER = `varying vec2 vUv; void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`;
const FRAGMENT_SHADER = `
    uniform sampler2D uTexture1, uTexture2;
    uniform float uProgress;
    uniform vec2 uResolution, uTexture1Size, uTexture2Size;
    uniform int uEffectType;
    uniform float uGlobalIntensity, uSpeedMultiplier, uDistortionStrength, uColorEnhancement;
    uniform float uGlassRefractionStrength, uGlassChromaticAberration, uGlassBubbleClarity, uGlassEdgeGlow, uGlassLiquidFlow;
    varying vec2 vUv;

    vec2 getCoverUV(vec2 uv, vec2 textureSize) {
        vec2 s = uResolution / textureSize;
        float scale = max(s.x, s.y);
        vec2 scaledSize = textureSize * scale;
        vec2 offset = (uResolution - scaledSize) * 0.5;
        return (uv * uResolution - offset) / scaledSize;
    }
    float noise(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
    
    vec4 glassEffect(vec2 uv, float progress) {
        float time = progress * 5.0 * uSpeedMultiplier;
        vec2 uv1 = getCoverUV(uv, uTexture1Size); vec2 uv2 = getCoverUV(uv, uTexture2Size);
        float maxR = length(uResolution) * 0.85; float br = progress * maxR;
        vec2 p = uv * uResolution; vec2 c = uResolution * 0.5;
        float d = length(p - c); float nd = d / max(br, 0.001);
        float param = smoothstep(br + 3.0, br - 3.0, d); // Inside circle
        vec4 img;
        if (param > 0.0) {
                float ro = 0.08 * uGlassRefractionStrength * uDistortionStrength * uGlobalIntensity * pow(smoothstep(0.3 * uGlassBubbleClarity, 1.0, nd), 1.5);
                vec2 dir = (d > 0.0) ? (p - c) / d : vec2(0.0);
                vec2 distUV = uv2 - dir * ro;
                distUV += vec2(sin(time + nd * 10.0), cos(time * 0.8 + nd * 8.0)) * 0.015 * uGlassLiquidFlow * uSpeedMultiplier * nd * param;
                float ca = 0.02 * uGlassChromaticAberration * uGlobalIntensity * pow(smoothstep(0.3, 1.0, nd), 1.2);
                img = vec4(texture2D(uTexture2, distUV + dir * ca * 1.2).r, texture2D(uTexture2, distUV + dir * ca * 0.2).g, texture2D(uTexture2, distUV - dir * ca * 0.8).b, 1.0);
                if (uGlassEdgeGlow > 0.0) {
                float rim = smoothstep(0.95, 1.0, nd) * (1.0 - smoothstep(1.0, 1.01, nd));
                img.rgb += rim * 0.08 * uGlassEdgeGlow * uGlobalIntensity;
                }
        } else { img = texture2D(uTexture2, uv2); }
        vec4 oldImg = texture2D(uTexture1, uv1);
        if (progress > 0.95) img = mix(img, texture2D(uTexture2, uv2), (progress - 0.95) / 0.05);
        return mix(oldImg, img, param);
    }
    
    vec4 frostEffect(vec2 uv, float progress) { return mix(texture2D(uTexture1, getCoverUV(uv, uTexture1Size)), texture2D(uTexture2, getCoverUV(uv, uTexture2Size)), progress); }
    vec4 rippleEffect(vec2 uv, float progress) { return mix(texture2D(uTexture1, getCoverUV(uv, uTexture1Size)), texture2D(uTexture2, getCoverUV(uv, uTexture2Size)), progress); }
    vec4 plasmaEffect(vec2 uv, float progress) { return mix(texture2D(uTexture1, getCoverUV(uv, uTexture1Size)), texture2D(uTexture2, getCoverUV(uv, uTexture2Size)), progress); }
    vec4 timeshiftEffect(vec2 uv, float progress) { return mix(texture2D(uTexture1, getCoverUV(uv, uTexture1Size)), texture2D(uTexture2, getCoverUV(uv, uTexture2Size)), progress); }

    void main() {
        if (uEffectType == 0) gl_FragColor = glassEffect(vUv, uProgress);
        else if (uEffectType == 1) gl_FragColor = frostEffect(vUv, uProgress);
        else if (uEffectType == 2) gl_FragColor = rippleEffect(vUv, uProgress);
        else if (uEffectType == 3) gl_FragColor = plasmaEffect(vUv, uProgress);
        else gl_FragColor = timeshiftEffect(vUv, uProgress);
    }
`;

export function Component() {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // --- GLOBAL STATE ---
        let currentSlideIndex = 0;
        let isTransitioning = false;
        let shaderMaterial: any, renderer: any, scene: any, camera: any;
        let slideTextures: any[] = [];
        let texturesLoaded = false;
        let autoSlideTimer: any = null;
        let progressAnimation: any = null;
        let sliderEnabled = false;

        // Use current settings from manual trigger or defaults
        const SLIDE_DURATION = () => SLIDER_CONFIG.settings.autoSlideSpeed;
        const PROGRESS_UPDATE_INTERVAL = 50;
        const TRANSITION_DURATION = () => SLIDER_CONFIG.settings.transitionDuration;

        // --- CORE FUNCTIONS ---
        const getEffectIndex = (n: string) => ({ glass: 0, frost: 1, ripple: 2, plasma: 3, timeshift: 4 } as any)[n] || 0;

        const updateShaderUniforms = () => {
            if (!shaderMaterial) return;
            const s = SLIDER_CONFIG.settings, u = shaderMaterial.uniforms;
            for (const key in s) {
                const uName = 'u' + key.charAt(0).toUpperCase() + key.slice(1);
                if (u[uName]) u[uName].value = s[key];
            }
            u.uEffectType.value = getEffectIndex(s.currentEffect);
        };

        const splitText = (text: string) => {
            return text.split('').map(char => `<span style="display: inline-block; opacity: 0;">${char === ' ' ? '&nbsp;' : char}</span>`).join('');
        };

        const updateContent = (idx: number) => {
            const titleEl = document.getElementById('mainTitle');
            const descEl = document.getElementById('mainDesc');
            if (titleEl && descEl) {
                // Universal animate out (fade up)
                gsap.to(titleEl.children, { y: -20, opacity: 0, duration: 0.5, stagger: 0.02, ease: "power2.in" });
                gsap.to(descEl, { y: -10, opacity: 0, duration: 0.4, ease: "power2.in" });

                setTimeout(() => {
                    // Set new content
                    titleEl.innerHTML = splitText(SLIDES[idx].title);
                    descEl.textContent = SLIDES[idx].description;

                    // Reset state (general reset, specific animations might override)
                    gsap.set(titleEl.children, { opacity: 0 });
                    gsap.set(descEl, { y: 20, opacity: 0 });

                    // Animations
                    const children = titleEl.children;
                    switch (idx) {
                        case 0: // Stagger Up
                            gsap.set(children, { y: 20 });
                            gsap.to(children, { y: 0, opacity: 1, duration: 0.8, stagger: 0.03, ease: "power3.out" });
                            gsap.to(descEl, { y: 0, opacity: 1, duration: 0.8, delay: 0.2, ease: "power3.out" });
                            break;
                        case 1: // Stagger Down
                            gsap.set(children, { y: -20 });
                            gsap.to(children, { y: 0, opacity: 1, duration: 0.8, stagger: 0.03, ease: "back.out(1.7)" });
                            gsap.to(descEl, { y: 0, opacity: 1, duration: 0.8, delay: 0.2, ease: "power3.out" });
                            break;
                        case 2: // Blur Reveal
                            gsap.set(children, { filter: "blur(10px)", scale: 1.5, y: 0 });
                            gsap.to(children, { filter: "blur(0px)", scale: 1, opacity: 1, duration: 1, stagger: { amount: 0.5, from: "random" }, ease: "power2.out" });
                            gsap.to(descEl, { y: 0, opacity: 1, duration: 1, delay: 0.3, ease: "power2.out" });
                            break;
                        default: // Fallback
                            gsap.set(children, { y: 20 });
                            gsap.to(children, { y: 0, opacity: 1, duration: 0.8, stagger: 0.03, ease: "power3.out" });
                            gsap.to(descEl, { y: 0, opacity: 1, duration: 0.8, delay: 0.2, ease: "power3.out" });
                    }

                }, 500);
            }
        };

        const navigateToSlide = (targetIndex: number) => {
            if (isTransitioning || targetIndex === currentSlideIndex) return;
            stopAutoSlideTimer();
            quickResetProgress(currentSlideIndex);

            const currentTexture = slideTextures[currentSlideIndex];
            const targetTexture = slideTextures[targetIndex];
            if (!currentTexture || !targetTexture) return;

            isTransitioning = true;
            shaderMaterial.uniforms.uTexture1.value = currentTexture;
            shaderMaterial.uniforms.uTexture2.value = targetTexture;
            shaderMaterial.uniforms.uTexture1Size.value = currentTexture.userData.size;
            shaderMaterial.uniforms.uTexture2Size.value = targetTexture.userData.size;

            updateContent(targetIndex);

            currentSlideIndex = targetIndex;
            updateCounter(currentSlideIndex);
            updateNavigationState(currentSlideIndex);

            gsap.fromTo(shaderMaterial.uniforms.uProgress,
                { value: 0 },
                {
                    value: 1,
                    duration: TRANSITION_DURATION(),
                    ease: "power2.inOut",
                    onComplete: () => {
                        shaderMaterial.uniforms.uProgress.value = 0;
                        shaderMaterial.uniforms.uTexture1.value = targetTexture;
                        shaderMaterial.uniforms.uTexture1Size.value = targetTexture.userData.size;
                        isTransitioning = false;
                        safeStartTimer(100);
                    }
                }
            );
        };

        const handleSlideChange = () => {
            if (isTransitioning || !texturesLoaded || !sliderEnabled) return;
            navigateToSlide((currentSlideIndex + 1) % SLIDES.length);
        };

        const createSlidesNavigation = () => {
            const nav = document.getElementById("slidesNav"); if (!nav) return;
            nav.innerHTML = "";
            SLIDES.forEach((slide, i) => {
                const item = document.createElement("div");
                item.className = `slide-nav-item${i === 0 ? " active" : ""}`;
                item.dataset.slideIndex = String(i);
                item.innerHTML = `<div class="slide-progress-line"><div class="slide-progress-fill"></div></div><div class="slide-nav-title">${slide.title}</div>`;
                item.addEventListener("click", (e) => {
                    e.stopPropagation();
                    if (!isTransitioning && i !== currentSlideIndex) {
                        stopAutoSlideTimer();
                        quickResetProgress(currentSlideIndex);
                        navigateToSlide(i);
                    }
                });
                nav.appendChild(item);
            });
        };

        const updateNavigationState = (idx: number) => document.querySelectorAll(".slide-nav-item").forEach((el, i) => el.classList.toggle("active", i === idx));
        const updateSlideProgress = (idx: number, prog: number) => { const el = document.querySelectorAll(".slide-nav-item")[idx]?.querySelector(".slide-progress-fill") as HTMLElement; if (el) { el.style.width = `${prog}%`; el.style.opacity = '1'; } };
        const fadeSlideProgress = (idx: number) => { const el = document.querySelectorAll(".slide-nav-item")[idx]?.querySelector(".slide-progress-fill") as HTMLElement; if (el) { el.style.opacity = '0'; setTimeout(() => el.style.width = "0%", 300); } };
        const quickResetProgress = (idx: number) => { const el = document.querySelectorAll(".slide-nav-item")[idx]?.querySelector(".slide-progress-fill") as HTMLElement; if (el) { el.style.transition = "width 0.2s ease-out"; el.style.width = "0%"; setTimeout(() => el.style.transition = "width 0.1s ease, opacity 0.3s ease", 200); } };
        const updateCounter = (idx: number) => {
            const sn = document.getElementById("slideNumber"); if (sn) sn.textContent = String(idx + 1).padStart(2, "0");
            const st = document.getElementById("slideTotal"); if (st) st.textContent = String(SLIDES.length).padStart(2, "0");
        };

        const startAutoSlideTimer = () => {
            if (!texturesLoaded || !sliderEnabled) return;
            stopAutoSlideTimer();
            let progress = 0;
            const increment = (100 / SLIDE_DURATION()) * PROGRESS_UPDATE_INTERVAL;
            progressAnimation = setInterval(() => {
                if (!sliderEnabled) { stopAutoSlideTimer(); return; }
                progress += increment;
                updateSlideProgress(currentSlideIndex, progress);
                if (progress >= 100) {
                    clearInterval(progressAnimation); progressAnimation = null;
                    fadeSlideProgress(currentSlideIndex);
                    if (!isTransitioning) handleSlideChange();
                }
            }, PROGRESS_UPDATE_INTERVAL);
        };
        const stopAutoSlideTimer = () => { if (progressAnimation) clearInterval(progressAnimation); if (autoSlideTimer) clearTimeout(autoSlideTimer); progressAnimation = null; autoSlideTimer = null; };
        const safeStartTimer = (delay = 0) => { stopAutoSlideTimer(); if (sliderEnabled && texturesLoaded) { if (delay > 0) autoSlideTimer = setTimeout(startAutoSlideTimer, delay); else startAutoSlideTimer(); } };

        // --- OPTIMIZATION: Dynamic Image Loading ---
        const getOptimizedSrc = (src: string) => {
            if (typeof window !== 'undefined') {
                // Breakpoints for optimization:
                // < 768px (Mobile) -> w=800
                // < 1280px (Tablet/Laptop) -> w=1200
                // >= 1280px (Desktop) -> w=1920 (max for reasonable quality/size ratio)
                const width = window.innerWidth;
                let targetWidth = 1920;
                if (width < 768) targetWidth = 800;
                else if (width < 1280) targetWidth = 1200;

                return src.replace(/w=\d+/, `w=${targetWidth}`);
            }
            return src;
        };

        const loadImageTexture = (src: string) => new Promise<any>((resolve, reject) => {
            const l = new THREE.TextureLoader();
            const optimizedSrc = getOptimizedSrc(src);

            l.load(
                optimizedSrc,
                (t: any) => {
                    t.minFilter = t.magFilter = THREE.LinearFilter;
                    t.userData = { size: new THREE.Vector2(t.image.width, t.image.height) };
                    resolve(t);
                },
                undefined,
                (err) => {
                    console.warn("Failed texture", err);
                    reject(err);
                }
            );
        });

        const initRenderer = async () => {
            const canvas = document.querySelector(".webgl-canvas") as HTMLCanvasElement; if (!canvas) return;
            scene = new THREE.Scene();
            camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
            renderer = new THREE.WebGLRenderer({ canvas, antialias: false, alpha: false });
            renderer.setSize(window.innerWidth, window.innerHeight);

            // --- OPTIMIZATION: DPR Capping ---
            // Cap DPR at 1.5 for mobile/dense screens to save GPU
            renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));

            shaderMaterial = new THREE.ShaderMaterial({
                uniforms: {
                    uTexture1: { value: null }, uTexture2: { value: null }, uProgress: { value: 0 },
                    uResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
                    uTexture1Size: { value: new THREE.Vector2(1, 1) }, uTexture2Size: { value: new THREE.Vector2(1, 1) },
                    uEffectType: { value: 0 },
                    uGlobalIntensity: { value: 1.0 }, uSpeedMultiplier: { value: 1.0 }, uDistortionStrength: { value: 1.0 }, uColorEnhancement: { value: 1.0 },
                    uGlassRefractionStrength: { value: 1.0 }, uGlassChromaticAberration: { value: 1.0 }, uGlassBubbleClarity: { value: 1.0 }, uGlassEdgeGlow: { value: 1.0 }, uGlassLiquidFlow: { value: 1.0 },
                    // Init others defaults
                    uFrostIntensity: { value: 1.0 }, uFrostCrystalSize: { value: 1.0 }, uFrostIceCoverage: { value: 1.0 }, uFrostTemperature: { value: 1.0 }, uFrostTexture: { value: 1.0 },
                    uRippleFrequency: { value: 25.0 }, uRippleAmplitude: { value: 0.08 }, uRippleWaveSpeed: { value: 1.0 }, uRippleRippleCount: { value: 1.0 }, uRippleDecay: { value: 1.0 },
                    uPlasmaIntensity: { value: 1.2 }, uPlasmaSpeed: { value: 0.8 }, uPlasmaEnergyIntensity: { value: 0.4 }, uPlasmaContrastBoost: { value: 0.3 }, uPlasmaTurbulence: { value: 1.0 },
                    uTimeshiftDistortion: { value: 1.6 }, uTimeshiftBlur: { value: 1.5 }, uTimeshiftFlow: { value: 1.4 }, uTimeshiftChromatic: { value: 1.5 }, uTimeshiftTurbulence: { value: 1.4 }
                },
                vertexShader: VERTEX_SHADER,
                fragmentShader: FRAGMENT_SHADER
            });
            scene.add(new THREE.Mesh(new THREE.PlaneGeometry(2, 2), shaderMaterial));

            // Load all textures
            for (const s of SLIDES) {
                try {
                    slideTextures.push(await loadImageTexture(s.media));
                } catch {
                    console.warn("Failed texture (skip)");
                }
            }

            if (slideTextures.length >= 1) {
                shaderMaterial.uniforms.uTexture1.value = slideTextures[0];
                shaderMaterial.uniforms.uTexture2.value = slideTextures[1] || slideTextures[0];
                shaderMaterial.uniforms.uTexture1Size.value = slideTextures[0].userData.size;
                shaderMaterial.uniforms.uTexture2Size.value = slideTextures[1] ? slideTextures[1].userData.size : slideTextures[0].userData.size;
                texturesLoaded = true;
                sliderEnabled = true;
                updateShaderUniforms(); // Apply config
                document.querySelector(".slider-wrapper")?.classList.add("loaded"); // Fade in immediately
                safeStartTimer(500);
            }

            const render = () => {
                requestAnimationFrame(render);
                renderer.render(scene, camera);
            };
            render();
        };

        createSlidesNavigation();
        updateCounter(0);

        // Init text content
        const tEl = document.getElementById('mainTitle');
        const dEl = document.getElementById('mainDesc');
        if (tEl && dEl) {
            tEl.innerHTML = splitText(SLIDES[0].title);
            dEl.textContent = SLIDES[0].description;
            // animate initial in
            gsap.fromTo(tEl.children, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 1, stagger: 0.03, ease: "power3.out", delay: 0.5 });
            gsap.fromTo(dEl, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 0.8 });
        }

        // Start everything
        initRenderer();

        // Arrow button handlers
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');
        prevBtn?.addEventListener('click', () => {
            const prevIndex = (currentSlideIndex - 1 + SLIDES.length) % SLIDES.length;
            navigateToSlide(prevIndex);
        });
        nextBtn?.addEventListener('click', () => {
            const nextIndex = (currentSlideIndex + 1) % SLIDES.length;
            navigateToSlide(nextIndex);
        });

        // Listeners
        const handleVis = () => document.hidden ? stopAutoSlideTimer() : (!isTransitioning && safeStartTimer());
        const handleResize = () => {
            if (renderer) {
                renderer.setSize(window.innerWidth, window.innerHeight);
                shaderMaterial.uniforms.uResolution.value.set(window.innerWidth, window.innerHeight);
            }
        };
        document.addEventListener("visibilitychange", handleVis);
        window.addEventListener("resize", handleResize);

        // cleanup
        return () => {
            stopAutoSlideTimer();
            document.removeEventListener("visibilitychange", handleVis);
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        <div className="relative w-full h-full min-h-[80vh] bg-black text-white overflow-hidden font-sans">
            <main className="slider-wrapper absolute inset-0 transition-opacity duration-1000" ref={containerRef}>
                <canvas className="webgl-canvas absolute inset-0 w-full h-full block z-0"></canvas>
                <span className="slide-number absolute top-8 left-8 text-xs font-mono tracking-widest z-10" id="slideNumber">01</span>
                <span className="slide-total absolute top-8 left-16 text-xs font-mono tracking-widest text-white/50 z-10" id="slideTotal">06</span>

                <div className="slide-content absolute bottom-12 left-8 md:left-24 z-10 max-w-lg pointer-events-none">
                    <h1 className="slide-title text-5xl md:text-7xl font-light mb-4 leading-none" id="mainTitle"></h1>
                    <p className="slide-description text-sm md:text-base text-white/70 max-w-sm" id="mainDesc"></p>
                </div>

                <nav className="slides-navigation absolute bottom-8 right-8 z-20 flex flex-col gap-3 text-sm tracking-widest" id="slidesNav"></nav>

                {/* Arrow Buttons */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-4" id="arrowNav">
                    <button className="arrow-btn w-12 h-12 rounded-full border border-white/30 flex items-center justify-center hover:bg-white/10 transition-colors" id="prevBtn">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
                    </button>
                    <button className="arrow-btn w-12 h-12 rounded-full border border-white/30 flex items-center justify-center hover:bg-white/10 transition-colors" id="nextBtn">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                    </button>
                </div>
            </main>
            {/* Scope styles */}
            <style jsx global>{`
        .slide-nav-item { cursor: pointer; display: flex; align-items: center; justify-content: flex-end; gap: 12px; opacity: 0.5; transition: opacity 0.3s; padding: 6px 0; }
        .slide-nav-item:hover, .slide-nav-item.active { opacity: 1; }
        .slide-progress-line { width: 40px; height: 2px; background: rgba(255,255,255,0.2); position: relative; border-radius: 1px; }
        .slide-progress-fill { height: 100%; background: #fff; width: 0%; position: absolute; left: 0; top: 0; border-radius: 1px; }
        .slide-nav-item.active .slide-progress-fill { width: 100%; transition: width 0.3s ease; }
        .slide-title span { display: inline-block; }
        .slide-nav-title { font-size: 14px; font-weight: 500; text-transform: uppercase; letter-spacing: 0.08em; }
      `}</style>
        </div>
    );
}
