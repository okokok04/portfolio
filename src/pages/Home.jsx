import AboutSection from '@/components/portfolio/AboutSection';
import Backdrop from '@/components/portfolio/Backdrop';
import ContactSection from '@/components/portfolio/ContactSection';
import CvSection from '@/components/portfolio/CvSection';
import Hero from '@/components/portfolio/Hero';
import Nav from '@/components/portfolio/Nav';
import PhotoGrid from '@/components/portfolio/PhotoGrid';
import ProjectsSection from '@/components/portfolio/ProjectsSection';
import TocSection from '@/components/portfolio/TocSection';
import WorkflowSection from '@/components/portfolio/WorkflowSection';

export default function Home() {
  return (
    <div className="relative min-h-screen">
      <Backdrop />
      <Nav />
      <main>
        <Hero />
        <AboutSection />
        <CvSection />
        <TocSection />
        <ProjectsSection />
        <WorkflowSection />
        <PhotoGrid />
      </main>
      <ContactSection />
    </div>
  );
}
