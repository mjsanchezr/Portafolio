/**
 * App.tsx — Root component that stitches together all sections.
 * Applies page-level layout and smooth scroll behavior.
 */
import { Navbar } from './components/layout/Navbar';
import { HeroSection } from './components/sections/hero/HeroSection';
import { AboutSection } from './components/sections/about/AboutSection';
import { ProjectsSection } from './components/sections/projects/ProjectsSection';
import { SkillsSection } from './components/sections/skills/SkillsSection';
import { CertificationsSection } from './components/sections/certifications/CertificationsSection';
import { ContactSection } from './components/sections/contact/ContactSection';
import { Footer } from './components/layout/Footer';

function App() {
    return (
        <div className="min-h-screen bg-[#0a0a0f] text-gray-100 font-sans">
            {/* Fixed navigation bar */}
            <Navbar />

            {/* Main content */}
            <main>
                <HeroSection />
                <AboutSection />
                <ProjectsSection />
                <SkillsSection />
                <CertificationsSection />
                <ContactSection />
            </main>

            {/* Footer */}
            <Footer />
        </div>
    );
}

export default App;
