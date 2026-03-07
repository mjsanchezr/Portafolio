/**
 * Footer — Minimal footer with year and tech credits.
 */
import { getCurrentYear } from '../../core/utils/helpers';

export function Footer() {
    return (
        <footer className="py-8 border-t border-white/5">
            <div className="section-container flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-gray-500">
                <p>© {getCurrentYear()} Mario Sánchez. All rights reserved.</p>

                <div className="flex items-center gap-1.5">
                    <span>Portfolio built with</span>
                    <span className="font-mono text-indigo-400">React</span>
                    <span>+</span>
                    <span className="font-mono text-cyan-400">TypeScript</span>
                    <span>+</span>
                    <span className="font-mono text-teal-400">Tailwind</span>
                </div>
            </div>
        </footer>
    );
}
