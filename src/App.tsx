import { Navigation } from './sections/Navigation';
import { Hero } from './sections/Hero';
import { About } from './sections/About';
import { Automation } from './sections/Automation';
import { Experience } from './sections/Experience';
import { Skills } from './sections/Skills';
import { Projects } from './sections/Projects';
import { Contact } from './sections/Contact';
import { Footer } from './sections/Footer';

function App() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navigation />
      <main>
        <Hero />
        <About />
        <Automation />
        <Experience />
        <Skills />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
