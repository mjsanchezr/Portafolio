/**
 * ProjectModal — Full-screen overlay modal showing project details.
 * Presentation component; receives data via props.
 */
import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Project } from '../../../core/types';

interface ProjectModalProps {
    project: Project | null;
    onClose: () => void;
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
    // Close on Escape key
    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
        document.addEventListener('keydown', handleKey);
        return () => document.removeEventListener('keydown', handleKey);
    }, [onClose]);

    // Prevent body scroll when modal is open
    useEffect(() => {
        if (project) document.body.style.overflow = 'hidden';
        else document.body.style.overflow = '';
        return () => { document.body.style.overflow = ''; };
    }, [project]);

    const statusMap: Record<Project['status'], { label: string; color: string }> = {
        completed: { label: 'Completed', color: 'text-green-400 bg-green-400/10 border-green-400/20' },
        'in-progress': { label: 'In Progress', color: 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20' },
        archived: { label: 'Archived', color: 'text-gray-400 bg-gray-400/10 border-gray-400/20' },
    };

    return (
        <AnimatePresence>
            {project && (
                <motion.div
                    className="fixed inset-0 z-50 flex items-center justify-center p-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                >
                    {/* Backdrop */}
                    <motion.div
                        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
                        onClick={onClose}
                    />

                    {/* Modal panel */}
                    <motion.div
                        id="project-modal"
                        className="relative z-10 w-full max-w-2xl max-h-[85vh] overflow-y-auto glass-card flex flex-col shadow-2xl shadow-black/50 no-scrollbar"
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                    >
                        {/* Sticky header/close area */}
                        <div className="sticky top-0 right-0 p-4 pb-0 flex justify-end z-[20] pointer-events-none">
                            <button
                                id="modal-close"
                                onClick={onClose}
                                className="pointer-events-auto p-2.5 rounded-full bg-slate-900/40 border border-white/10 hover:bg-slate-800/60 text-white shadow-lg backdrop-blur-md transition-all duration-200 transform hover:scale-105"
                                aria-label="Close modal"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        <div className="p-6 sm:p-10 pt-0">
                            {/* Header */}
                            <div className="mb-6">
                            <div className="flex items-start justify-between gap-4 mb-3 pr-8">
                                <h3 className="text-2xl font-bold text-white">{project.title}</h3>
                                <span className={`flex-shrink-0 px-3 py-1 rounded-full text-xs font-medium border ${statusMap[project.status].color}`}>
                                    {statusMap[project.status].label}
                                </span>
                            </div>
                            <div className="flex flex-wrap gap-3 text-sm font-mono">
                                <span className="text-indigo-400">{project.year}</span>
                                <span className="text-gray-600">·</span>
                                <span className="text-gray-400">{project.hoursSpent}h invested</span>
                                {project.language && (
                                    <>
                                        <span className="text-gray-600">·</span>
                                        <span className="text-cyan-400">{project.language}</span>
                                    </>
                                )}
                                {project.lastUpdated && (
                                    <>
                                        <span className="text-gray-600">·</span>
                                        <span className="text-gray-500">Updated {project.lastUpdated}</span>
                                    </>
                                )}
                            </div>
                        </div>

                        {/* Full description */}
                        <p className="text-gray-300 leading-relaxed mb-6">{project.fullDescription}</p>

                        {/* Technologies */}
                        <div className="mb-6">
                            <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-widest mb-3">Technologies</h4>
                            <div className="flex flex-wrap gap-2">
                                {project.technologies.map(tech => (
                                    <span key={tech.name} className={`tech-badge ${tech.color}`}>
                                        {tech.name}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Features list */}
                        <div className="mb-8">
                            <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-widest mb-3">Key Features</h4>
                            <ul className="flex flex-col gap-2">
                                {project.features.map((feature, i) => (
                                    <li key={i} className="flex items-start gap-3 text-gray-300 text-sm">
                                        <svg className="w-5 h-5 text-indigo-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Action links */}
                        <div className="flex flex-wrap gap-3">
                            {project.githubUrl && (
                                <a
                                    href={project.githubUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    id={`modal-github-${project.id}`}
                                    className="btn-outline text-sm py-2.5 px-5"
                                >
                                    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
                                        <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                                    </svg>
                                    View on GitHub
                                </a>
                            )}
                            {project.demoUrl && (
                                <a
                                    href={project.demoUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    id={`modal-demo-${project.id}`}
                                    className="btn-primary text-sm py-2.5 px-5"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                    </svg>
                                    Live Demo
                                </a>
                            )}
                                </div>
                            </div>
                        </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
