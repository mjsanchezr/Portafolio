/**
 * ProjectsSection — Container component orchestrating project cards and Recharts chart.
 * Uses the useProjects hook for all data and modal state (Container/Presentation pattern).
 */
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
    ResponsiveContainer, Cell, Legend,
} from 'recharts';
import { useProjects } from '../hooks/useProjects';
import { ProjectModal } from './ProjectModal';
import type { Project } from '../types';

// ---- Presentation: Single project card ----
interface ProjectCardProps {
    project: Project;
    onViewMore: (p: Project) => void;
    index: number;
}

function ProjectCard({ project, onViewMore, index }: ProjectCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ y: -4 }}
            className="glass-card p-6 flex flex-col gap-4 h-full"
        >
            {/* Card header */}
            <div className="flex items-start justify-between gap-3">
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-mono text-indigo-400">{project.year}</span>
                        {project.language && (
                            <span className="text-xs text-gray-600">· {project.language}</span>
                        )}
                    </div>
                    <h3 className="text-lg font-bold text-white leading-snug">{project.title}</h3>
                </div>
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-600/30 to-purple-600/20 flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                    </svg>
                </div>
            </div>

            {/* Description */}
            <p className="text-gray-400 text-sm leading-relaxed flex-1">{project.shortDescription}</p>

            {/* Tech badges */}
            <div className="flex flex-wrap gap-1.5">
                {project.technologies.slice(0, 5).map(tech => (
                    <span key={tech.name} className={`tech-badge text-xs ${tech.color}`}>
                        {tech.name}
                    </span>
                ))}
                {project.technologies.length > 5 && (
                    <span className="tech-badge text-xs bg-white/5 text-gray-400 border-white/10">
                        +{project.technologies.length - 5}
                    </span>
                )}
            </div>

            {/* Stats row */}
            <div className="flex items-center gap-4 py-2 border-t border-white/5">
                <div className="text-center">
                    <p className="text-lg font-bold text-indigo-400">{project.hoursSpent}h</p>
                    <p className="text-xs text-gray-500">invested</p>
                </div>
                <div className="text-center">
                    <p className="text-lg font-bold text-cyan-400">{project.technologies.length}</p>
                    <p className="text-xs text-gray-500">technologies</p>
                </div>
                <div className="text-center">
                    <p className="text-lg font-bold text-purple-400">{project.features.length}</p>
                    <p className="text-xs text-gray-500">features</p>
                </div>
                {project.lastUpdated && (
                    <div className="text-center ml-auto">
                        <p className="text-xs text-gray-500">Updated</p>
                        <p className="text-xs font-medium text-gray-400">{project.lastUpdated}</p>
                    </div>
                )}
            </div>

            {/* Action buttons */}
            <div className="flex items-center gap-2 mt-auto">
                <button
                    id={`project-more-${project.id}`}
                    onClick={() => onViewMore(project)}
                    className="btn-primary text-sm py-2 px-4 flex-1 justify-center"
                >
                    View Details
                </button>
                {project.githubUrl && (
                    <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        id={`project-github-${project.id}`}
                        className="btn-outline text-sm py-2 px-3"
                        title="View on GitHub"
                    >
                        <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
                            <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                        </svg>
                    </a>
                )}
                {project.demoUrl && (
                    <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        id={`project-demo-${project.id}`}
                        className="btn-outline text-sm py-2 px-3"
                        title="Live Demo"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                    </a>
                )}
            </div>
        </motion.div>
    );
}

// ---- Custom Tooltip for Recharts ----
interface CustomTooltipProps {
    active?: boolean;
    payload?: Array<{ name: string; value: number; color: string }>;
    label?: string;
}

function CustomTooltip({ active, payload, label }: CustomTooltipProps) {
    if (!active || !payload?.length) return null;
    return (
        <div className="glass-card !bg-[#1a1a28] p-3 text-sm shadow-xl">
            <p className="text-white font-semibold mb-1">{label}</p>
            {payload.map(p => (
                <p key={p.name} style={{ color: p.color }}>
                    {p.name === 'hours' ? '⏱' : '🔧'} {p.name === 'hours' ? `${p.value}h invested` : `${p.value} technologies`}
                </p>
            ))}
        </div>
    );
}

// ---- Container: Projects section ----
export function ProjectsSection() {
    const { projects, chartData, isLoading, selectedProject, openModal, closeModal } = useProjects();
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-80px' });

    return (
        <section id="projects" className="py-24 relative">
            <div className="absolute inset-0 bg-gradient-to-b from-indigo-600/3 via-transparent to-transparent pointer-events-none" />

            <div ref={ref} className="section-container">
                {/* Section header */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="mb-12"
                >
                    <h2 className="section-title">
                        My <span className="gradient-text">Projects</span>
                    </h2>
                    <p className="section-subtitle">Real-world projects built with passion and purpose</p>
                </motion.div>

                {/* Loading state */}
                {isLoading ? (
                    <div className="flex justify-center items-center py-20">
                        <div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
                    </div>
                ) : (
                    <>
                        {/* Project cards grid */}
                        <div className="grid md:grid-cols-2 gap-6 mb-14">
                            {projects.map((project, index) => (
                                <ProjectCard
                                    key={project.id}
                                    project={project}
                                    onViewMore={openModal}
                                    index={index}
                                />
                            ))}
                        </div>

                        {/* Recharts section */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-60px' }}
                            transition={{ duration: 0.7 }}
                            className="glass-card p-6 sm:p-8"
                        >
                            <h3 className="text-lg font-bold text-white mb-1">Project Statistics</h3>
                            <p className="text-sm text-gray-400 mb-6">Hours invested and technologies used per project</p>
                            <ResponsiveContainer width="100%" height={240}>
                                <BarChart
                                    data={chartData}
                                    margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
                                    barGap={8}
                                >
                                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
                                    <XAxis
                                        dataKey="name"
                                        stroke="#4b5563"
                                        tick={{ fill: '#9ca3af', fontSize: 13 }}
                                        axisLine={false}
                                        tickLine={false}
                                    />
                                    <YAxis
                                        stroke="#4b5563"
                                        tick={{ fill: '#9ca3af', fontSize: 12 }}
                                        axisLine={false}
                                        tickLine={false}
                                        width={36}
                                    />
                                    <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.03)' }} />
                                    <Legend
                                        formatter={v => <span style={{ color: '#9ca3af', fontSize: '12px' }}>{v === 'hours' ? 'Hours invested' : 'Technologies'}</span>}
                                    />
                                    <Bar dataKey="hours" name="hours" radius={[6, 6, 0, 0]} maxBarSize={60}>
                                        {chartData.map((entry, i) => (
                                            <Cell key={i} fill={entry.color} fillOpacity={0.9} />
                                        ))}
                                    </Bar>
                                    <Bar dataKey="technologies" name="technologies" radius={[6, 6, 0, 0]} fill="#22d3ee" fillOpacity={0.7} maxBarSize={60} />
                                </BarChart>
                            </ResponsiveContainer>
                        </motion.div>
                    </>
                )}
            </div>

            {/* Project detail modal */}
            <ProjectModal project={selectedProject} onClose={closeModal} />
        </section>
    );
}
