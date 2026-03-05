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

    const handleNavClick = (id: string) => {
        scrollToSection(id);
        setMobileOpen(false);
    };

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
                    ? 'bg-[#0a0a0f]/90 backdrop-blur-xl border-b border-white/5 shadow-lg shadow-black/20'
                    : 'bg-transparent'
                }`}
        >
            <nav className="section-container flex items-center justify-between h-16">
                {/* Logo */}
                <button
                    onClick={() => handleNavClick('hero')}
                    className="font-mono font-bold text-lg"
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
                    className="md:hidden p-2 rounded-lg hover:bg-white/10 text-gray-300 transition-colors"
                    aria-label="Toggle menu"
                >
                    <div className="w-5 flex flex-col gap-1">
                        <span className={`block h-0.5 bg-current rounded transition-all duration-300 ${mobileOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
                        <span className={`block h-0.5 bg-current rounded transition-all duration-300 ${mobileOpen ? 'opacity-0' : ''}`} />
                        <span className={`block h-0.5 bg-current rounded transition-all duration-300 ${mobileOpen ? '-rotate-45 -translate-y-1.5' : ''}`} />
                    </div>
                </button>
            </nav>

            {/* Mobile menu */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25 }}
                        className="md:hidden overflow-hidden bg-[#0a0a0f]/95 backdrop-blur-xl border-b border-white/5"
                    >
                        <ul className="section-container py-4 flex flex-col gap-1">
                            {NAV_LINKS.map(link => (
                                <li key={link.id}>
                                    <button
                                        onClick={() => handleNavClick(link.id)}
                                        className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-colors ${activeSection === link.id
                                                ? 'text-white bg-indigo-500/15 border border-indigo-500/30'
                                                : 'text-gray-400 hover:text-white hover:bg-white/5'
                                            }`}
                                    >
                                        {link.label}
                                    </button>
                                </li>
                            ))}
                            <li className="pt-2">
                                <button
                                    onClick={() => handleNavClick('contact')}
                                    className="btn-primary w-full justify-center text-sm"
                                >
                                    Hire Me
                                </button>
                            </li>
                        </ul>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}
