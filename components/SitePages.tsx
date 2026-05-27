import React from 'react';
import RegistrationForm from './RegistrationForm';
import Coaches from './Coaches';
import Services from './Services';
import Pricing from './Pricing';
import Footer from './Footer';
import SEO from './SEO';

export const ContactPage: React.FC<{ onShowLegal: () => void }> = ({ onShowLegal }) => (
    <main className="relative min-h-screen text-white overflow-hidden bg-transparent pb-0">
        <SEO 
            title="Book a Session | Vienna Hockey Lab"
            description="Contact professional ice hockey coaches in Vienna. Book individual or group sessions at EisRing Süd. Start your elite performance engineering today."
            canonical="https://www.viennahockeylab.com/contact"
        />
        <div className="pt-24 min-h-[90vh] relative z-10 flex flex-col justify-center">
            <RegistrationForm />
        </div>
        <Footer onShowLegal={onShowLegal} />
    </main>
);

export const CoachesPage: React.FC<{ onShowLegal: () => void }> = ({ onShowLegal }) => (
    <main className="relative min-h-screen text-white overflow-hidden bg-transparent pb-0">
        <SEO 
            title="Our Coaches | Vienna Hockey Lab"
            description="Meet the elite coaching staff at Vienna Hockey Lab. Ex-pros from KHL, VHL, MHL and European leagues bringing professional development to Vienna."
            canonical="https://www.viennahockeylab.com/coaches"
        />
        <div className="pt-24 relative z-10">
            <Coaches />
        </div>
        <Footer onShowLegal={onShowLegal} />
    </main>
);

export const ServicesPage: React.FC<{ onShowLegal: () => void }> = ({ onShowLegal }) => (
    <main className="relative min-h-screen text-white overflow-hidden bg-transparent pb-0">
        <SEO 
            title="Hockey Training Services & Rates | Vienna Hockey Lab"
            description="Explore our hockey training services in Vienna. Small group dynamics, 1-on-1 surgical deconstruction, and off-ice analysis."
            canonical="https://www.viennahockeylab.com/services"
        />
        <div className="pt-24 relative z-10">
            <Services />
            <Pricing />
        </div>
        <Footer onShowLegal={onShowLegal} />
    </main>
);
