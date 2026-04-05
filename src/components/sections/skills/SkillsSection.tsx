/**
 * SkillsSection — Displays skill categories in a color-coded grid.
 */
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import * as Icons from 'lucide-react';
import portfolioData from '../../../data/portfolioData.json';
import type { SkillCategory } from '../../../core/types';

const CATEGORY_COLORS: Record<string, string> = {
    'Programming Languages': 'from-indigo-600/20 to-slate-600/10 border-indigo-500/10',
    'Frontend Architecture': 'from-blue-600/20 to-slate-600/10 border-blue-500/10',
    'Backend & Desktop': 'from-slate-600/20 to-slate-800/10 border-slate-500/10',
    'Automation & APIs': 'from-indigo-600/20 to-blue-600/10 border-indigo-500/10',
    'Databases & Persistence': 'from-blue-600/20 to-indigo-600/10 border-blue-500/10',
    'DevOps & Distribution': 'from-slate-600/20 to-indigo-600/10 border-slate-500/10',
    'System Design': 'from-indigo-600/20 to-indigo-600/10 border-indigo-500/10',
};

const BADGE_COLORS: Record<string, string> = {
    'Programming Languages': 'bg-indigo-500/5 text-indigo-200 border-indigo-500/10',
    'Frontend Architecture': 'bg-blue-500/5 text-blue-200 border-blue-500/10',
    'Backend & Desktop': 'bg-slate-500/5 text-slate-200 border-slate-500/10',
    'Automation & APIs': 'bg-indigo-500/5 text-indigo-200 border-indigo-500/10',
    'Databases & Persistence': 'bg-blue-500/5 text-blue-200 border-blue-500/10',
    'DevOps & Distribution': 'bg-slate-500/5 text-slate-200 border-slate-500/10',
    'System Design': 'bg-indigo-500/5 text-indigo-200 border-indigo-500/10',
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
