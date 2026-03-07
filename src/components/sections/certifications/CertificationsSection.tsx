/**
 * CertificationsSection — IBM certification cards with gradient badges and skill chips.
 */
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import portfolioData from '../../../data/portfolioData.json';
import type { Certification } from '../../../core/types';

export function CertificationsSection() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-60px' });
    const certifications = portfolioData.certifications as Certification[];

    return (
        <section id="certifications" className="py-24 relative">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-600/3 to-transparent pointer-events-none" />

            <div ref={ref} className="section-container">
                {/* Section header */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="mb-12"
                >
                    <h2 className="section-title">
                        <span className="gradient-text">Certifications</span>
                    </h2>
                    <p className="section-subtitle">Credentials that validate my knowledge</p>
                </motion.div>

                {/* Cards grid */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {certifications.map((cert, i) => (
                        <motion.div
                            key={cert.id}
                            initial={{ opacity: 0, y: 30 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.5, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                            whileHover={{ y: -4 }}
                            className="glass-card p-6 flex flex-col gap-4"
                        >
                            {/* Badge */}
                            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${cert.badgeColor} flex items-center justify-center shadow-lg`}>
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                                </svg>
                            </div>

                            {/* Info */}
                            <div>
                                <div className="flex items-center gap-2 mb-1">
                                    <span className="text-xs font-mono text-gray-500">{cert.issuer} · {cert.date}</span>
                                </div>
                                <h3 className="font-bold text-white text-base leading-snug">{cert.title}</h3>
                            </div>

                            {/* Skills */}
                            <div className="flex flex-wrap gap-1.5">
                                {cert.skills.map(skill => (
                                    <span key={skill} className="px-2.5 py-1 rounded-md text-xs font-medium bg-white/5 border border-white/10 text-gray-400">
                                        {skill}
                                    </span>
                                ))}
                            </div>

                            {/* Verified badge */}
                            <div className="flex items-center gap-1.5 mt-auto pt-3 border-t border-white/5">
                                <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                <span className="text-xs text-green-400 font-medium">Verified credential</span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
