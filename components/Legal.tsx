import React from 'react';
import { motion } from 'framer-motion';

const Legal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl overflow-y-auto p-6 md:p-12 text-gray-300 font-sans"
    >
      <div className="max-w-4xl mx-auto relative">
        <button
          onClick={onClose}
          className="fixed top-8 right-8 text-white hover:text-red-600 text-4xl z-[110]"
        >
          ×
        </button>

        <section className="mb-16">
          <h1 className="text-4xl font-black text-white mb-8 italic uppercase tracking-tighter">
            Legal <span className="text-red-600">Notice</span> (Impressum)
          </h1>
          <div className="space-y-4 text-sm leading-relaxed">
            <p><strong>Information according to § 5 ECG and § 25 MedienG.</strong></p>
            <p>
              <strong>Name of Association:</strong> Vienna Hockey Lab<br />
              <strong>ZVR-Zahl:</strong> 1999424312<br />
              <strong>Legal Form:</strong> Verein (Association)<br />
              <strong>Address (Sitz):</strong> Dresdner Straße 107/4.04, 1200 Wien, Österreich<br />
              <br />
              <strong>Statutory Representatives (Vorstand):</strong><br />
              Dmitry Tabatadze, Sofiia Grechanaia (Joint representation)<br />
              <br />
              <strong>Contact:</strong><br />
              Email: office@viennahockeylab.com<br />
              Web: viennahockeylab.com<br />
              <br />
              <span className="italic text-gray-500">Note: Currently relocating our main office. Please contact us via email for official correspondence.</span>
            </p>
            <p>
              <strong>Competent Authority (Aufsichtsbehörde):</strong><br />
              Landespolizeidirektion Wien, Referat Vereins-, Versammlungs- und Medienrechtsangelegenheiten
            </p>
            <p className="pt-4 italic border-t border-gray-800">
              <strong>Disclaimer:</strong> The content of this website has been created with the greatest possible care. However, we do not guarantee the accuracy, completeness, or timeliness of the content provided.
            </p>
          </div>
        </section>

        <section className="pb-24">
          <h1 className="text-4xl font-black text-white mb-8 italic uppercase tracking-tighter">
            Privacy <span className="text-red-600">Policy</span> (DSGVO)
          </h1>
          <div className="space-y-6 text-sm leading-relaxed">
            <div>
              <h3 className="text-white font-bold mb-2 uppercase">1. Data Collection and Purpose</h3>
              <p>When you use our "Join the Lab" form, we collect the following data: Name, Phone Number, Age, Years in Hockey, Skill Level. The purpose of this collection is to process your registration and provide a "Performance Insight" analysis.</p>
            </div>
            <div>
              <h3 className="text-white font-bold mb-2 uppercase">2. Legal Basis</h3>
              <p>Data processing is based on Art. 6 Para. 1 lit. b DSGVO (performance of a contract or pre-contractual measures).</p>
            </div>
            <div>
              <h3 className="text-white font-bold mb-2 uppercase">3. Automated Processing (AI Insight)</h3>
              <p>The website uses a local script to analyze your age and experience to provide an immediate training recommendation. This data is processed locally and then transmitted to our staff via Telegram API for final review.</p>
            </div>
            <div>
              <h3 className="text-white font-bold mb-2 uppercase">4. Data Transfer</h3>
              <p>Your data is transmitted securely to our coaching staff (Dmitry Tabatadze, Kirill Kurochkin, Vladimir Bondorenko). We do not sell or share your data with third parties for marketing purposes.</p>
            </div>
            <div>
              <h3 className="text-white font-bold mb-2 uppercase">5. Storage Duration</h3>
              <p>Data is stored only as long as necessary to process your request or until you request its deletion.</p>
            </div>
            <div>
              <h3 className="text-white font-bold mb-2 uppercase">6. Your Rights</h3>
              <p>According to the GDPR, you have the right to access, rectification, erasure, and restriction of processing of your personal data. To exercise these rights, contact us at office@viennahockeylab.com.</p>
            </div>
          </div>
        </section>
      </div>
    </motion.div>
  );
};

export default Legal;
