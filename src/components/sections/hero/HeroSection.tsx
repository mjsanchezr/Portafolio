/**
 * HeroSection — Landing section with animated name, title, description, CTA buttons,
 * and social links. Uses Framer Motion for staggered entrance.
 */
import { motion } from 'framer-motion';
import { scrollToSection } from '../../../core/utils/helpers';

const GitHubIcon = () => (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
        <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
    </svg>
);

const LinkedInIcon = () => (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
);

const SOCIAL_LINKS = [
    {
        name: 'GitHub',
        url: 'https://github.com/mjsanchezr',
        icon: <GitHubIcon />,
        hoverClass: 'hover:text-white hover:border-white/40',
    },
    {
        name: 'LinkedIn',
        url: 'https://www.linkedin.com/in/mario-sanchez-ab2030370',
        icon: <LinkedInIcon />,
        hoverClass: 'hover:text-[#0A66C2] hover:border-[#0A66C2]/40',
    },
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.15, delayChildren: 0.2 },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
};

export function HeroSection() {
    return (
        <section
            id="hero"
            className="relative min-h-screen flex items-center justify-center overflow-hidden"
        >
            {/* Grid background */}
            <div className="absolute inset-0 grid-bg opacity-40 pointer-events-none" />

            {/* Radial glow blobs */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-cyan-500/8 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1.5s' }} />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-600/5 rounded-full blur-3xl" />
            </div>

            <motion.div
                className="section-container relative z-10 text-center pt-20 pb-16"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                {/* Status badge */}
                <motion.div variants={itemVariants} className="mb-6 flex justify-center">
                    <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium bg-indigo-500/10 border border-indigo-500/20 text-indigo-300">
                        <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                        Available for work
                    </span>
                </motion.div>

                {/* Name */}
                <motion.h1
                    variants={itemVariants}
                    className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-black tracking-tight mb-4"
                >
                    <span className="text-white">Mario </span>
                    <span className="gradient-text text-glow">Sánchez</span>
                </motion.h1>

                {/* Title */}
                <motion.div variants={itemVariants} className="mb-6">
                    <p className="text-xl sm:text-2xl lg:text-3xl font-semibold text-gray-300">
                        Full Stack Developer
                    </p>
                    <div className="flex flex-wrap justify-center gap-2 mt-2">
                        {['React', 'Electron', 'TypeScript', 'Node.js'].map(tech => (
                            <span
                                key={tech}
                                className="font-mono text-sm text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 px-3 py-1 rounded-md"
                            >
                                {tech}
                            </span>
                        ))}
                    </div>
                </motion.div>

                {/* Description */}
                <motion.p
                    variants={itemVariants}
                    className="text-base sm:text-lg text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed"
                >
                    5th Semester Computer Engineering Student at UCAB
                </motion.p>

                {/* CTA Buttons */}
                <motion.div
                    variants={itemVariants}
                    className="flex flex-col sm:flex-row gap-4 justify-center mb-10"
                >
                    <button
                        id="hero-cta-projects"
                        onClick={() => scrollToSection('projects')}
                        className="btn-primary text-base px-8 py-4"
                    >
                        View Projects
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                    </button>
                    <button
                        id="hero-cta-contact"
                        onClick={() => scrollToSection('contact')}
                        className="btn-outline text-base px-8 py-4"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        Contact Me
                    </button>
                </motion.div>

                {/* Social links */}
                <motion.div variants={itemVariants} className="flex justify-center gap-3">
                    {SOCIAL_LINKS.map(link => (
                        <a
                            key={link.name}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            id={`hero-social-${link.name.toLowerCase()}`}
                            title={link.name}
                            className={`p-3 rounded-xl border border-white/10 text-gray-400 transition-all duration-300 hover:scale-110 hover:-translate-y-1 ${link.hoverClass}`}
                        >
                            {link.icon}
                        </a>
                    ))}
                </motion.div>

                {/* Scroll indicator */}
                <motion.div variants={itemVariants} className="mt-16 flex justify-center">
                    <motion.button
                        onClick={() => scrollToSection('about')}
                        className="text-gray-600 hover:text-gray-400 transition-colors"
                        animate={{ y: [0, 8, 0] }}
                        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    </motion.button>
                </motion.div>
            </motion.div>
        </section>
    );
}
