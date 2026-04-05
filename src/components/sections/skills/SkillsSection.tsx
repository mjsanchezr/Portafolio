/**
 * SkillsSection — Displays skill categories in a color-coded grid.
 */
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import * as Icons from 'lucide-react';
import portfolioData from '../../../data/portfolioData.json';
import type { SkillCategory } from '../../../core/types';

const CATEGORY_COLORS: Record<string, string> = {
    'Programming Languages': 'from-indigo-600/20 to-purple-600/10 border-indigo-500/20',
    'Frontend Architecture': 'from-cyan-600/20 to-teal-600/10 border-cyan-500/20',
    'Backend & Desktop': 'from-orange-600/20 to-amber-600/10 border-orange-500/20',
    'Automation & APIs': 'from-green-600/20 to-emerald-600/10 border-green-500/20',
    'Databases & Persistence': 'from-blue-600/20 to-cyan-600/10 border-blue-500/20',
    'DevOps & Distribution': 'from-pink-600/20 to-rose-600/10 border-pink-500/20',
    'System Design': 'from-purple-600/20 to-indigo-600/10 border-purple-500/20',
};

const BADGE_COLORS: Record<string, string> = {
    'Programming Languages': 'bg-indigo-500/10 text-indigo-300 border-indigo-500/20',
    'Frontend Architecture': 'bg-cyan-500/10 text-cyan-300 border-cyan-500/20',
    'Backend & Desktop': 'bg-orange-500/10 text-orange-300 border-orange-500/20',
    'Automation & APIs': 'bg-green-500/10 text-green-300 border-green-500/20',
    'Databases & Persistence': 'bg-blue-500/10 text-blue-300 border-blue-500/20',
    'DevOps & Distribution': 'bg-pink-500/10 text-pink-300 border-pink-500/20',
    'System Design': 'bg-purple-500/10 text-purple-300 border-purple-500/20',
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
                    {categories.map((cat, i) => {
                        const IconNode = (Icons as any)[cat.icon] || Icons.HelpCircle;

                        return (
                            <motion.div
                                key={cat.category}
                                initial={{ opacity: 0, y: 30 }}
                                animate={isInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.5, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                                className={`rounded-2xl p-5 bg-gradient-to-br border ${CATEGORY_COLORS[cat.category] ?? 'from-white/5 to-transparent border-white/10'}`}
                            >
                                {/* Category header */}
                                <div className="flex items-center gap-2.5 mb-4">
                                    <div className="text-indigo-400">
                                        <IconNode size={22} strokeWidth={2} />
                                    </div>
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
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
