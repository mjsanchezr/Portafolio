// TypeScript interfaces and types for the portfolio app
// All data shapes are defined here to ensure end-to-end type safety.

export interface Technology {
    name: string;
    color: string; // Tailwind bg color class
}

export interface Project {
    id: string;
    title: string;
    shortDescription: string;
    fullDescription: string;
    technologies: Technology[];
    demoUrl?: string;
    githubUrl?: string;
    hoursSpent: number;
    features: string[];
    status: 'completed' | 'in-progress' | 'archived';
    year: number;
    language?: string;
    repoSize?: string;
    lastUpdated?: string;
}

export interface SkillCategory {
    category: string;
    icon: string; // emoji icon
    skills: string[];
}

export interface Certification {
    id: string;
    title: string;
    issuer: string;
    date: string;
    credentialId?: string;
    badgeColor: string; // Tailwind gradient classes
    skills: string[];
}

export interface ContactFormData {
    name: string;
    email: string;
    subject: string;
    message: string;
}

export interface SocialLink {
    name: string;
    url: string;
    icon: string; // SVG path or identifier
}

export interface ChartDataPoint {
    name: string;
    hours: number;
    technologies: number;
    color: string;
}
