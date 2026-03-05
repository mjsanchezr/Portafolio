/**
 * SkillsSection — Displays skill categories in a color-coded grid.
 */
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import portfolioData from '../data/portfolioData.json';
import type { SkillCategory } from '../types';

const CATEGORY_COLORS: Record<string, string> = {
    'Languages': 'from-indigo-600/20 to-purple-600/10 border-indigo-500/20',
    'Frameworks & Libraries': 'from-cyan-600/20 to-teal-600/10 border-cyan-500/20',
    'Tools': 'from-orange-600/20 to-amber-600/10 border-orange-500/20',
    'Databases': 'from-green-600/20 to-emerald-600/10 border-green-500/20',
    'Concepts': 'from-pink-600/20 to-rose-600/10 border-pink-500/20',
};

const BADGE_COLORS: Record<string, string> = {
    'Languages': 'bg-indigo-500/10 text-indigo-300 border-indigo-500/20',
    'Frameworks & Libraries': 'bg-cyan-500/10 text-cyan-300 border-cyan-500/20',
    'Tools': 'bg-orange-500/10 text-orange-300 border-orange-500/20',
    'Databases': 'bg-green-500/10 text-green-300 border-green-500/20',
    'Concepts': 'bg-pink-500/10 text-pink-300 border-pink-500/20',
};

export function SkillsSection() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-60px' });
    const categories = portfolioData.skillCategories as SkillCategory[];

    return (
        <section id="skills" className="py-24">
            <div ref={ref} className="section-container">
                {/* Section header */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="mb-12"
                >
                    <h2 className="section-title">
                        Skills &amp; <span className="gradient-text">Technologies</span>
                    </h2>
                    <p className="section-subtitle">My current technical toolkit</p>
                </motion.div>

                {/* Grid of skill categories */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {categories.map((cat, i) => (
                        <motion.div
                            key={cat.category}
                            initial={{ opacity: 0, y: 30 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.5, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                            className={`rounded-2xl p-5 bg-gradient-to-br border ${CATEGORY_COLORS[cat.category] ?? 'from-white/5 to-transparent border-white/10'}`}
                        >
                            {/* Category header */}
                            <div className="flex items-center gap-2.5 mb-4">
                                <span className="text-2xl">{cat.icon}</span>
                                <h3 className="font-bold text-white text-base">{cat.category}</h3>
                            </div>

                            {/* Skill badges */}
                            <div className="flex flex-wrap gap-2">
                                {cat.skills.map(skill => (
                                    <motion.span
                                        key={skill}
                                        whileHover={{ scale: 1.05 }}
                                        className={`px-3 py-1.5 rounded-lg text-xs font-medium border select-none cursor-default ${BADGE_COLORS[cat.category] ?? 'bg-white/5 text-gray-300 border-white/10'}`}
                                    >
                                        {skill}
                                    </motion.span>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
