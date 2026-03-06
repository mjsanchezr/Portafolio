/**
 * Navbar — Fixed top navigation with smooth scroll and active section highlight.
 * Uses useScrollSpy to detect the current section in view.
 */
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useScrollSpy } from '../hooks/useScrollSpy';
import { scrollToSection } from '../utils/helpers';

const NAV_LINKS = [
    { id: 'hero', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'projects', label: 'Projects' },
    { id: 'skills', label: 'Skills' },
    { id: 'certifications', label: 'Certifications' },
    { id: 'contact', label: 'Contact' },
];

export function Navbar() {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const activeSection = useScrollSpy(NAV_LINKS.map(l => l.id));

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    // Lock body scroll when mobile menu is open
    useEffect(() => {
        if (mobileOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => { document.body.style.overflow = ''; };
    }, [mobileOpen]);

    const handleNavClick = (id: string) => {
        setMobileOpen(false);
        // Small delay to ensure the menu closing doesn't interfere with the scroll start
        setTimeout(() => {
            scrollToSection(id);
        }, 100);
    };

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${scrolled
                ? 'bg-[#0a0a0f]/90 backdrop-blur-xl border-b border-white/5 shadow-lg shadow-black/20'
                : 'bg-transparent'
                }`}
        >
            <nav className="section-container flex items-center justify-between h-20 md:h-16">
                {/* Logo */}
                <button
                    onClick={() => handleNavClick('hero')}
                    className="font-mono font-bold text-lg p-2 -ml-2"
                >
                    <span className="gradient-text">MS</span>
                    <span className="text-white/40 ml-1">{'<dev/>'}</span>
                </button>

                {/* Desktop links */}
                <ul className="hidden md:flex items-center gap-1">
                    {NAV_LINKS.map(link => (
                        <li key={link.id}>
                            <button
                                id={`nav-${link.id}`}
                                onClick={() => handleNavClick(link.id)}
                                className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${activeSection === link.id
                                    ? 'text-white'
                                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                                    }`}
                            >
                                {activeSection === link.id && (
                                    <motion.span
                                        layoutId="nav-indicator"
                                        className="absolute inset-0 rounded-lg bg-indigo-500/15 border border-indigo-500/30"
                                        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                                    />
                                )}
                                <span className="relative z-10">{link.label}</span>
                            </button>
                        </li>
                    ))}
                </ul>

                {/* CTA button desktop */}
                <button
                    onClick={() => handleNavClick('contact')}
                    className="hidden md:inline-flex btn-primary text-sm py-2 px-5"
                >
                    Hire Me
                </button>

                {/* Hamburger */}
                <button
                    id="nav-mobile-toggle"
                    onClick={() => setMobileOpen(v => !v)}
                    className="md:hidden p-4 -mr-4 rounded-lg text-gray-300 transition-colors z-[110]"
                    aria-label="Toggle menu"
                >
                    <div className="w-6 flex flex-col gap-1.5 focus:outline-none">
                        <span className={`block h-0.5 w-full bg-current rounded transition-all duration-300 ${mobileOpen ? 'rotate-45 translate-y-2' : ''}`} />
                        <span className={`block h-0.5 w-full bg-current rounded transition-all duration-300 ${mobileOpen ? 'opacity-0' : ''}`} />
                        <span className={`block h-0.5 w-full bg-current rounded transition-all duration-300 ${mobileOpen ? '-rotate-45 -translate-y-2' : ''}`} />
                    </div>
                </button>
            </nav>

            {/* Mobile menu - Full screen overlay */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: '100%' }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="fixed inset-0 z-[105] bg-[#0a0a0f] md:hidden flex flex-col pt-24 px-6 h-screen"
                    >
                        <div className="absolute inset-x-0 top-0 h-20 border-b border-white/5 bg-[#0a0a0f]" />

                        <ul className="flex flex-col gap-2">
                            {NAV_LINKS.map((link, i) => (
                                <motion.li
                                    key={link.id}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.05 }}
                                >
                                    <button
                                        onClick={() => handleNavClick(link.id)}
                                        className={`w-full text-left px-6 py-4 rounded-2xl text-lg font-semibold transition-all ${activeSection === link.id
                                            ? 'text-white bg-indigo-500/15 border border-indigo-500/30'
                                            : 'text-gray-400 hover:text-white hover:bg-white/5'
                                            }`}
                                    >
                                        {link.label}
                                    </button>
                                </motion.li>
                            ))}
                        </ul>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="mt-8"
                        >
                            <button
                                onClick={() => handleNavClick('contact')}
                                className="btn-primary w-full justify-center text-lg py-5"
                            >
                                Hire Me
                            </button>
                        </motion.div>

                        <div className="mt-auto pb-12 text-center text-sm text-gray-500 font-mono">
                            MS <span className="text-white/20">{'<dev/>'}</span> 2026
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}
