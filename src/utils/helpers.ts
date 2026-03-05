/**
 * Utility functions for the portfolio app.
 */

/**
 * Smooth scroll to a section by its ID.
 * @param id - The HTML element id of the target section.
 */
export function scrollToSection(id: string): void {
    const el = document.getElementById(id);
    if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

/**
 * Returns the current year as a number. Used in the Footer.
 */
export function getCurrentYear(): number {
    return new Date().getFullYear();
}

/**
 * Truncates a string to a maximum length and appends an ellipsis.
 */
export function truncate(text: string, maxLength: number): string {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength).trimEnd() + '…';
}
