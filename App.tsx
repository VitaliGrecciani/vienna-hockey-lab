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
import EishockeyTrainingWien from './components/EishockeyTrainingWien';
import { IndividualTraining, HockeyIQ, SkatingMechanics } from './components/NichePages';
import { ContactPage, CoachesPage, ServicesPage } from './components/SitePages';
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
        <Routes>
          <Route path="/" element={<Home onShowLegal={() => setShowLegal(true)} />} />
          <Route path="/skills" element={<SkillsPage />} />
          
          {/* Niche SEO Pages */}
          <Route path="/individual-training" element={<IndividualTraining onShowLegal={() => setShowLegal(true)} />} />
          <Route path="/hockey-iq" element={<HockeyIQ onShowLegal={() => setShowLegal(true)} />} />
          <Route path="/skating-mechanics" element={<SkatingMechanics onShowLegal={() => setShowLegal(true)} />} />

          {/* Main Site Pages */}
          <Route path="/services" element={<ServicesPage onShowLegal={() => setShowLegal(true)} />} />
          <Route path="/coaches" element={<CoachesPage onShowLegal={() => setShowLegal(true)} />} />
          <Route path="/contact" element={<ContactPage onShowLegal={() => setShowLegal(true)} />} />

          {/* German SEO Landing Page */}
          <Route path="/de" element={<EishockeyTrainingWien onShowLegal={() => setShowLegal(true)} />} />
          <Route path="/DE" element={<EishockeyTrainingWien onShowLegal={() => setShowLegal(true)} />} />
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
