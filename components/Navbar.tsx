import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';

const Navbar: React.FC = () => {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close mobile menu on route change
    useEffect(() => {
        setMobileMenuOpen(false);
    }, [location.pathname]);

    const links = [
        { name: "Home", path: "/" },
        { name: "Einzeltraining Wien (DE)", path: "/de" },
        { name: "Services", path: "/services" },
        { name: "Coaches", path: "/coaches" },
        { name: "Contact", path: "/contact" }
    ];

    return (
        <nav className={`fixed top-0 w-full z-[100] transition-all duration-300 ${scrolled ? 'bg-black/80 backdrop-blur-md border-b border-white/10 py-3' : 'bg-transparent py-5'}`}>
            <div className="max-w-7xl mx-auto px-4 md:px-8 flex justify-between items-center">
                <Link to="/" className="flex items-center gap-3 group z-50">
                    <img src="/logo.jpg" alt="Vienna Hockey Lab Logo" className="w-10 h-10 rounded-full border border-red-600 mix-blend-screen" />
                    <span className="text-white font-black italic uppercase tracking-widest text-lg group-hover:text-red-500 transition-colors">VHL</span>
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center gap-8">
                    {links.map((link, i) => (
                        <Link 
                            key={i} 
                            to={link.path} 
                            className={`text-xs font-bold uppercase tracking-widest transition-colors ${location.pathname === link.path ? 'text-red-600' : 'text-gray-400 hover:text-white'}`}
                        >
                            {link.name}
                        </Link>
                    ))}
                    <Link to="/contact" className="ml-4 px-6 py-2 bg-red-600 text-white font-black uppercase text-xs tracking-widest hover:bg-white hover:text-red-600 transition-colors" style={{ clipPath: "polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)" }}>
                        Book Now
                    </Link>
                </div>

                {/* Mobile Hamburger */}
                <button 
                    className="md:hidden text-white z-50 p-2"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        {mobileMenuOpen ? (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        ) : (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        )}
                    </svg>
                </button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div 
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="absolute top-0 left-0 w-full h-screen bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center gap-8 md:hidden"
                    >
                        {links.map((link, i) => (
                            <Link 
                                key={i} 
                                to={link.path} 
                                className={`text-2xl font-black italic uppercase tracking-widest ${location.pathname === link.path ? 'text-red-600' : 'text-white'}`}
                            >
                                {link.name}
                            </Link>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
