import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import FractalBackground from './components/FractalBackground';
import Hero from './components/Hero';
import About from './components/About';
import TrainingFocus from './components/TrainingFocus';
import Coaches from './components/Coaches';
import Services from './components/Services';
import RegistrationForm from './components/RegistrationForm';
import Footer from './components/Footer';
import Legal from './components/Legal';
import SkillsPage from './components/SkillsPage';
import { AnimatePresence } from 'framer-motion';

// Main Landing Page Component
const Home: React.FC<{ onShowLegal: () => void }> = ({ onShowLegal }) => {
  const { hash } = useLocation();

  React.useEffect(() => {
    if (hash === '#registration') {
      const element = document.getElementById('registration');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [hash]);

  return (
    <>
      <Hero />
      <About />
      <Services />
      <TrainingFocus />
      <Coaches />
      <div id="registration"> {/* Ensuring the ID matches the hash */}
        <RegistrationForm />
      </div>
      <Footer onShowLegal={onShowLegal} />
    </>
  );
};

// Layout wrapper to handle global elements like background and modals
const AppContent: React.FC = () => {
  const [showLegal, setShowLegal] = useState(false);
  const location = useLocation();

  return (
    <main className="relative min-h-screen text-white">
      <FractalBackground />

      <div className="relative z-0">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home onShowLegal={() => setShowLegal(true)} />} />
          <Route path="/skills" element={<SkillsPage />} />
        </Routes>
      </div>

      <AnimatePresence>
        {showLegal && <Legal onClose={() => setShowLegal(false)} />}
      </AnimatePresence>
    </main>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;
