/**
 * useProjects — Container hook that loads and manages project data from portfolioData.json.
 * Follows the Container/Presentation pattern: logic lives here, not in the component.
 */
import { useState, useEffect } from 'react';
import type { Project, ChartDataPoint } from '../../../core/types';

// Dynamically import the JSON to simulate async data loading (easy to swap for a real API)
import portfolioData from '../../../data/portfolioData.json';

interface UseProjectsReturn {
    projects: Project[];
    chartData: ChartDataPoint[];
    isLoading: boolean;
    selectedProject: Project | null;
    openModal: (project: Project) => void;
    closeModal: () => void;
}

export function useProjects(): UseProjectsReturn {
    const [projects, setProjects] = useState<Project[]>([]);
    const [chartData, setChartData] = useState<ChartDataPoint[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);

    useEffect(() => {
        // Simulate async data fetch (replace with fetch('/api/projects') in production)
        const timer = setTimeout(() => {
            setProjects(portfolioData.projects as Project[]);
            setChartData(portfolioData.chartData as ChartDataPoint[]);
            setIsLoading(false);
        }, 400);

        return () => clearTimeout(timer);
    }, []);

    const openModal = (project: Project) => setSelectedProject(project);
    const closeModal = () => setSelectedProject(null);

    return { projects, chartData, isLoading, selectedProject, openModal, closeModal };
}
