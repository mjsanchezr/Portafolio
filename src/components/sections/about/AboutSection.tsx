/**
 * AboutSection — Bio, profile photo, and skill badges.
 * Scroll-triggered animation with Framer Motion.
 */
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const QUICK_SKILLS = [
    'React 19', 'Electron', 'Node.js', 'SQL',
    'Capacitor', 'Java 21', 'SOLID', 'AI Ops',
];

function AboutCard({
    icon, title, value,
}: {
    icon: string; title: string; value: string;
}) {
    return (
        <div className="glass-card p-4 flex items-center gap-3">
            <span className="text-2xl">{icon}</span>
            <div>
                <p className="text-xs text-gray-500 uppercase tracking-wider">{title}</p>
                <p className="text-sm font-semibold text-white">{value}</p>
            </div>
        </div>
    );
}

export function AboutSection() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-80px' });

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
    };
    const itemVariants = {
        hidden: { opacity: 0, y: 24 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
    };

    return (
        <section id="about" className="py-24">
            <motion.div
                ref={ref}
                className="section-container"
                variants={containerVariants}
                initial="hidden"
                animate={isInView ? 'visible' : 'hidden'}
            >
                {/* Section header */}
                <motion.div variants={itemVariants} className="mb-12">
                    <h2 className="section-title">
                        About <span className="gradient-text">Me</span>
                    </h2>
                    <p className="section-subtitle">A little more about my journey and background</p>
                </motion.div>

                <div className="grid lg:grid-cols-5 gap-10 items-start">
                    {/* Left col — Profile photo + quick stats */}
                    <motion.div variants={itemVariants} className="lg:col-span-2 flex flex-col gap-4">
                        {/* Profile photo */}
                        <div className="relative w-full aspect-square max-w-xs mx-auto lg:mx-0 rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-indigo-500/10">
                            <img
                                src="perfil-new.jpg"
                                alt="Mario Sánchez — Front-end Developer"
                                className="w-full h-full object-cover object-center"
                            />
                            {/* Decorative corner accents */}
                            <div className="absolute top-3 right-3 w-16 h-16 border-t-2 border-r-2 border-indigo-500/60 rounded-tr-xl pointer-events-none" />
                            <div className="absolute bottom-3 left-3 w-16 h-16 border-b-2 border-l-2 border-cyan-500/60 rounded-bl-xl pointer-events-none" />
                            {/* Gradient overlay at bottom */}
                            <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#0a0a0f]/60 to-transparent pointer-events-none" />
                        </div>

                        {/* Quick stats */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <AboutCard icon="🎓" title="University" value="UCAB" />
                            <AboutCard icon="📚" title="Semester" value="5th — Comp. Eng." />
                            <AboutCard icon="🚀" title="Focus" value="Full Stack" />
                            <AboutCard icon="📍" title="Location" value="Venezuela" />
                        </div>
                    </motion.div>

                    {/* Right col — Bio + skills */}
                    <motion.div variants={itemVariants} className="lg:col-span-3 flex flex-col gap-8">
                        <div>
                            <h3 className="text-xl font-bold text-white mb-4">
                                Hey, I'm Mario 👋
                            </h3>
                             <div className="flex flex-col gap-4 text-gray-300 leading-relaxed">
                                <p>
                                    I am a <span className="text-white font-medium">5th-semester Computer Engineering student</span> at{' '}
                                    <span className="text-indigo-400 font-medium">UCAB</span> (Universidad Católica Andrés Bello),
                                    focused on architecting scalable software solutions that solve complex business challenges.
                                </p>
                                <p>
                                    My recent work includes architecting a **Hybrid Desktop Platform** (Electron/Node.js) for multi-channel
                                    automation and a **Native Android Financial Engine** (Capacitor 8) developed with an **AI-augmented workflow**
                                    for maximum precision and efficiency.
                                </p>
                                <p>
                                    I specialize in <span className="text-white font-medium">React 19, TypeScript, and Desktop/Logistics Automation</span>,
                                    leveraging modern architectural patterns to deliver high-impact, production-ready software.
                                </p>
                            </div>
                        </div>

                        {/* Skills badges */}
                        <div>
                            <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-widest mb-4">
                                Top Skills
                            </h4>
                            <div className="flex flex-wrap gap-2">
                                {QUICK_SKILLS.map(skill => (
                                    <motion.span
                                        key={skill}
                                        whileHover={{ scale: 1.05 }}
                                        className="px-4 py-2 rounded-xl text-sm font-medium bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 cursor-default select-none"
                                    >
                                        {skill}
                                    </motion.span>
                                ))}
                            </div>
                        </div>

                        {/* Contact CTA */}
                        <a
                            href="#contact"
                            onClick={e => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); }}
                            className="btn-outline self-start text-sm"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                            Get in touch for my CV
                        </a>
                    </motion.div>
                </div>
            </motion.div>
        </section>
    );
}
