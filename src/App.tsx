import { Navigation } from './sections/Navigation';
import { Hero } from './sections/Hero';
import { Projects } from './sections/Projects';
import { Services } from './sections/Services';
import { About } from './sections/About';
import { Experience } from './sections/Experience';
import { Bastidores } from './sections/Bastidores';
import { Contact } from './sections/Contact';
import { Footer } from './sections/Footer';

function App() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-md focus:outline-none"
      >
        Pular para o conteúdo principal
      </a>

      <Navigation />
      <main id="main-content">
        <Hero />
        <Projects />
        <Services />
        <About />
        <Experience />
        <Bastidores />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
