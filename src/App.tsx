/**
 * App.tsx — Root component that stitches together all sections.
 * Applies page-level layout and smooth scroll behavior.
 */
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { ProjectsSection } from './components/ProjectsSection';
import { SkillsSection } from './components/SkillsSection';
import { CertificationsSection } from './components/CertificationsSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';

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
