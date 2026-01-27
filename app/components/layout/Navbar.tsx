import Link from 'next/link';
import { Button } from '../ui/Button';

export const Navbar = () => {
    return (
        <nav className="fixed top-0 left-0 right-0 z-50 w-full px-6 py-4 md:px-12 md:py-6 flex items-center justify-between backdrop-blur-md bg-bg-dark/20 border-b border-white/5 transition-all duration-300">
            {/* Logo */}
            <div className="flex items-center gap-2">
                {/* Placeholder Icon */}
                <div className="w-8 h-8 rounded-full border border-text-dark flex items-center justify-center overflow-hidden">
                    <svg viewBox="0 0 24 24" className="w-5 h-5 text-text-dark fill-current">
                        <path d="M18.5,4h-13c-1.1,0-2,0.9-2,2v10c0,1.1,0.9,2,2,2h13c1.1,0,2-0.9,2-2V6C20.5,4.9,19.6,4,18.5,4z M6,12l0-4 c0,0,1,2,2,2s2-2,2-2s2,2,2,2s2-2,2-2l0,4H6z M16,14c0,0-1,2-2,2s-2-2-2-2s-2,2-2,2s-2-2-2-2l0-4h8L16,14z" opacity="0.8" />
                    </svg>
                </div>
                <span className="font-alfa text-xl tracking-tight text-white uppercase">Brussels Brewery</span>
            </div>

            {/* Desktop Links */}
            <div className="hidden md:flex items-center gap-8">
                {['Shop', 'About', 'Blog', 'Locations', 'Contact'].map((item) => (
                    <Link
                        key={item}
                        href={`#${item.toLowerCase()}`}
                        className="text-text-dark text-xs font-bold uppercase tracking-widest hover:text-brown-primary transition-colors"
                    >
                        {item}
                    </Link>
                ))}
                <Button variant="secondary" className="!px-5 !py-2 text-[10px]">
                    Order Online
                </Button>
            </div>

            {/* Mobile Menu Placeholder */}
            <div className="md:hidden">
                <Button variant="secondary" className="!px-3 !py-1 text-[10px]">Menu</Button>
            </div>
        </nav>
    );
};
