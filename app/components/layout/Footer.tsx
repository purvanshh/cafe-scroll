import Link from 'next/link';

export const Footer = () => {
    return (
        <footer className="bg-bg-dark text-text-light py-10 md:py-16 px-6 md:px-12 border-t border-white/5">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">

                {/* Brand */}
                <div className="col-span-1 md:col-span-1">
                    <div className="flex items-center gap-2 mb-6">
                        <div className="w-8 h-8 rounded-full border border-text-light/50 flex items-center justify-center overflow-hidden">
                            <svg viewBox="0 0 24 24" className="w-5 h-5 text-text-light fill-current">
                                <path d="M18.5,4h-13c-1.1,0-2,0.9-2,2v10c0,1.1,0.9,2,2,2h13c1.1,0,2-0.9,2-2V6C20.5,4.9,19.6,4,18.5,4z M6,12l0-4 c0,0,1,2,2,2s2-2,2-2s2,2,2,2s2-2,2-2l0,4H6z M16,14c0,0-1,2-2,2s-2-2-2-2s-2,2-2,2s-2-2-2-2l0-4h8L16,14z" opacity="0.8" />
                            </svg>
                        </div>
                        <span className="font-alfa text-lg tracking-tight uppercase">Brussels Brewery</span>
                    </div>
                    <p className="text-sm opacity-60 leading-relaxed font-source">
                        Brewed To Perfection, Served With Love.
                    </p>
                </div>

                {/* Links */}
                <div className="hidden md:block"></div> {/* Spacer */}

                {/* Newsletter */}
                <div className="col-span-1 md:col-span-2 flex flex-col items-start md:items-end">
                    <p className="text-sm font-bold uppercase tracking-widest mb-4">Join our newsletter to receive exclusive updates, and news!</p>
                    <div className="flex flex-col sm:flex-row w-full md:w-auto gap-3">
                        <input
                            type="email"
                            placeholder="Enter Your Email"
                            className="bg-transparent border border-white/20 px-4 py-3 rounded-md text-sm text-text-light placeholder:text-white/20 focus:outline-none focus:border-brown-primary w-full md:w-64"
                        />
                        <button className="bg-text-light text-bg-dark px-6 py-3 rounded-md text-sm font-bold uppercase hover:bg-white transition-colors w-full sm:w-auto">
                            Subscribe
                        </button>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto mt-12 md:mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-xs opacity-40 font-source gap-4">
                <div className="flex items-center gap-4">
                    {/* Social Icons Placeholder */}
                    <div className="w-6 h-6 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 cursor-pointer">IG</div>
                    <div className="w-6 h-6 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 cursor-pointer">FB</div>
                    <div className="w-6 h-6 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 cursor-pointer">G+</div>
                </div>
                <div className="flex items-center gap-6">
                    <Link href="/" className="hover:text-white transition-colors">Privacy</Link>
                    <Link href="/" className="hover:text-white transition-colors">Terms</Link>
                    <Link href="/" className="hover:text-white transition-colors">Cookies</Link>
                </div>
                <p className="hidden md:block">© 2026 Brussels Brewery. All Rights Reserved.</p>
                <p className="md:hidden text-center">© 2026 Brussels Brewery.<br />All Rights Reserved.</p>
                <p>Powered by <span className="font-bold">Antigravity</span></p>
            </div>
        </footer>
    );
};
