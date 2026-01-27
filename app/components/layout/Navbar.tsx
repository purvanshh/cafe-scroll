'use client';

import { Button } from '../ui/Button';
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Shop', href: '#shop' },
    { name: 'About', href: '#about' },
    { name: 'Blog', href: '#blog' },
    { name: 'Locations', href: '#locations' },
];

export const Navbar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        e.preventDefault();
        setIsMobileMenuOpen(false);

        if (href === '#home') {
            // Scroll to top of page
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
            // Scroll to section
            const element = document.querySelector(href);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }
    };

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 w-full px-6 py-4 md:px-12 md:py-6 flex items-center justify-between backdrop-blur-md bg-bg-dark/20 border-b border-white/5 transition-all duration-300">
            {/* Logo */}
            <a
                href="#home"
                onClick={(e) => handleNavClick(e, '#home')}
                className="flex items-center gap-2 z-50 relative cursor-pointer"
            >
                {/* Placeholder Icon */}
                <div className="w-8 h-8 rounded-full border border-text-dark flex items-center justify-center overflow-hidden">
                    <svg viewBox="0 0 24 24" className="w-5 h-5 text-text-dark fill-current">
                        <path d="M18.5,4h-13c-1.1,0-2,0.9-2,2v10c0,1.1,0.9,2,2,2h13c1.1,0,2-0.9,2-2V6C20.5,4.9,19.6,4,18.5,4z M6,12l0-4 c0,0,1,2,2,2s2-2,2-2s2,2,2,2s2-2,2-2l0,4H6z M16,14c0,0-1,2-2,2s-2-2-2-2s-2,2-2,2s-2-2-2-2l0-4h8L16,14z" opacity="0.8" />
                    </svg>
                </div>
                <span className="font-alfa text-xl tracking-tight text-white uppercase">Brussels Brewery</span>
            </a>

            {/* Desktop Links */}
            <div className="hidden md:flex items-center gap-8">
                {navLinks.map((item) => (
                    <a
                        key={item.name}
                        href={item.href}
                        onClick={(e) => handleNavClick(e, item.href)}
                        className="text-text-dark text-xs font-bold uppercase tracking-widest hover:text-brown-primary transition-colors cursor-pointer"
                    >
                        {item.name}
                    </a>
                ))}
                <a href="#shop" onClick={(e) => handleNavClick(e, '#shop')}>
                    <Button variant="secondary" className="!px-5 !py-2 text-[10px]">
                        Order Online
                    </Button>
                </a>
            </div>

            {/* Mobile Menu Toggle */}
            <div className="md:hidden z-50 relative">
                <button
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="flex flex-col items-end justify-center gap-[6px] w-8 h-8 focus:outline-none"
                >
                    <span className={`block w-6 h-[2px] bg-white transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-[8px]' : ''}`} />
                    <span className={`block w-4 h-[2px] bg-white transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`} />
                    <span className={`block w-6 h-[2px] bg-white transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-[8px]' : ''}`} />
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="fixed inset-0 z-40 bg-bg-dark/95 backdrop-blur-xl flex flex-col items-center justify-center md:hidden"
                    >
                        <div className="flex flex-col items-center gap-8">
                            {navLinks.map((item) => (
                                <a
                                    key={item.name}
                                    href={item.href}
                                    onClick={(e) => handleNavClick(e, item.href)}
                                    className="text-white text-2xl font-alfa uppercase tracking-wider hover:text-brown-primary transition-colors cursor-pointer"
                                >
                                    {item.name}
                                </a>
                            ))}
                            <a href="#shop" onClick={(e) => handleNavClick(e, '#shop')}>
                                <Button variant="secondary" className="!px-8 !py-3 text-sm mt-4">
                                    Order Online
                                </Button>
                            </a>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};


