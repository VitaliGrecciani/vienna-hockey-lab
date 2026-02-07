import React, { useState } from 'react';
import FractalBackground from './components/FractalBackground';
import Hero from './components/Hero';
import About from './components/About';
import TrainingFocus from './components/TrainingFocus';
import Coaches from './components/Coaches';
import RegistrationForm from './components/RegistrationForm';
import Footer from './components/Footer';
import Legal from './components/Legal';
import { AnimatePresence } from 'framer-motion';

const App: React.FC = () => {
  const [showLegal, setShowLegal] = useState(false);

  return (
    <main className="relative min-h-screen text-white">
      <FractalBackground />
      
      <div className="relative z-0">
        <Hero />
        <About />
        <TrainingFocus />
        <Coaches />
        <RegistrationForm />
        <Footer onShowLegal={() => setShowLegal(true)} />
      </div>

      <AnimatePresence>
        {showLegal && <Legal onClose={() => setShowLegal(false)} />}
      </AnimatePresence>
    </main>
  );
};

export default App;
