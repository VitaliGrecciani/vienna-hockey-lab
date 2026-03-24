import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RegistrationData } from '../types';
import { submitLead } from '../services/leadService';

interface Props {
  lang?: 'en' | 'de';
}

const RegistrationForm: React.FC<Props> = ({ lang = 'en' }) => {
  const isDe = lang === 'de';
  const [formData, setFormData] = useState<RegistrationData & { gdprConsent: boolean, honeypot: string }>({
    name: '',
    email: '',
    phone: '',
    age: '',
    yearsInHockey: '',
    skillLevel: '',
    gdprConsent: false,
    honeypot: '' // Hidden field for spam bots
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [insight, setInsight] = useState<string | null>(null);
  const [submissionStatus, setSubmissionStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  useEffect(() => {
    const age = Number(formData.age);
    const years = Number(formData.yearsInHockey);

    if (formData.age !== '' && formData.yearsInHockey !== '') {
      let message = "Focus: Reactive agility and high-speed puck control.";

      if (age < 10 && years > 3) {
        message = "🌟 Prodigy Path: Rare early development. Focus on advanced biomechanics.";
      } else if (age <= 12 && years >= 4) {
        message = "Elite Path: Advanced edge-work and high-tempo decision making.";
      } else if (age < 10) {
        message = "Foundational: Mechanical skating efficiency and coordination.";
      } else if (years > 10 && formData.skillLevel === 'Pro') {
        message = "Pro Optimization: Micro-adjustments for elite game situations.";
      } else if (years > 5 && formData.skillLevel === 'Amateur') {
        message = "Breakthrough: Converting experience into explosive game impact.";
      }

      setInsight(message);
    } else {
      setInsight(null);
    }
  }, [formData.age, formData.yearsInHockey, formData.skillLevel]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    // Handle honeypot separately (it doesn't need validation logic)
    if (name === 'honeypot') {
      setFormData(prev => ({ ...prev, [name]: value }));
      return;
    }

    const val = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;

    if (name === 'name') {
      const filtered = value.replace(/[^a-zA-Zа-яА-ЯёЁ\s-]/g, '');
      setFormData(prev => ({ ...prev, [name]: filtered }));
      if (errors.name) setErrors(prev => ({ ...prev, name: '' }));
      return;
    }

    if (name === 'email') {
      setFormData(prev => ({ ...prev, [name]: value }));
      if (errors.email) setErrors(prev => ({ ...prev, email: '' }));
      return;
    }

    if (name === 'phone') {
      const filtered = value.replace(/[^\d+()\-\s]/g, '');
      setFormData(prev => ({ ...prev, [name]: filtered }));
      if (errors.phone) setErrors(prev => ({ ...prev, phone: '' }));
      return;
    }

    if (name === 'age' || name === 'yearsInHockey') {
      const filtered = value.replace(/\D/g, '').slice(0, 2);
      setFormData(prev => ({ ...prev, [name]: filtered }));
      if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
      return;
    }

    if (name === 'skillLevel' && errors.skillLevel) {
      setErrors(prev => ({ ...prev, skillLevel: '' }));
    }

    if (name === 'gdprConsent' && errors.gdprConsent) {
      setErrors(prev => ({ ...prev, gdprConsent: '' }));
    }

    setFormData(prev => ({ ...prev, [name]: val }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Spam Check
    if (formData.honeypot) {
      console.warn("Spam bot detected via honeypot.");
      setSubmissionStatus('success');
      return;
    }

    // Manual Validation
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = isDe ? "Name ist erforderlich" : "Full Name is required";
    if (!formData.email.trim()) newErrors.email = isDe ? "E-Mail ist erforderlich" : "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = isDe ? "Ungültiges E-Mail-Format" : "Invalid email format";
    if (!formData.phone.trim()) newErrors.phone = isDe ? "Telefonnummer ist erforderlich" : "Phone number is required";
    if (!formData.age) newErrors.age = isDe ? "Alter ist erforderlich" : "Age is required";
    if (!formData.yearsInHockey) newErrors.yearsInHockey = isDe ? "Erfahrung ist erforderlich" : "Years in Hockey is required";
    if (!formData.skillLevel) newErrors.skillLevel = isDe ? "Bitte wähle ein Niveau" : "Please select a skill level";
    if (!formData.gdprConsent) newErrors.gdprConsent = isDe ? "Du musst der Datenschutzerklärung zustimmen" : "You must agree to the Privacy Policy";

    // Logic Validation
    if (formData.phone && formData.phone.replace(/\D/g, '').length < 7) {
      newErrors.phone = "Phone number is too short";
    }
    if (formData.age && formData.yearsInHockey) {
      const age = Number(formData.age);
      const years = Number(formData.yearsInHockey);
      if (years >= age) newErrors.yearsInHockey = "Years cannot exceed age";
      else if (age - years < 3) newErrors.yearsInHockey = "Check years of experience";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setSubmissionStatus('submitting');

    // Split Name for CRM/Automation
    const nameParts = formData.name.trim().split(' ');
    const firstName = nameParts[0];
    const lastName = nameParts.slice(1).join(' ') || '';

    // Placeholder URL for n8n Webhook
    // Production URL for n8n Webhook via localtunnel
    const WEBHOOK_URL = "https://n8n.viennahockeylab.com/webhook/vhl-lead";

    const submitWithRetry = async (retries = 3, delay = 1000) => {
      for (let i = 0; i < retries; i++) {
        try {
          const response = await fetch(WEBHOOK_URL, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              firstName,
              lastName,
              email: formData.email,
              phone: formData.phone,
              age: formData.age,
              yearsInHockey: formData.yearsInHockey,
              skillLevel: formData.skillLevel,
              aiInsight: insight || "N/A",
              source: "vienna-hockey-lab-landing",
              timestamp: new Date().toISOString()
            }),
          });

          if (response.ok) return true;
        } catch (err) {
          console.warn(`Submission attempt ${i + 1} failed:`, err);
          if (i < retries - 1) await new Promise(res => setTimeout(res, delay));
        }
      }
      return false;
    };

    try {
      const success = await submitWithRetry();

      if (success) {
        setSubmissionStatus('success');
        setFormData({
          name: '',
          email: '',
          phone: '',
          age: '',
          yearsInHockey: '',
          skillLevel: '',
          gdprConsent: false,
          honeypot: ''
        });
        setInsight('');
      } else {
        setSubmissionStatus('error');
      }
    } catch (error) {
      console.error('Submission error:', error);
      setSubmissionStatus('error');
    } finally {
      // Small delay before allowing another attempt to prevent double-clicks
      setTimeout(() => {
        if (submissionStatus === 'submitting') setSubmissionStatus('idle');
      }, 2000);
    }
  };

  const inputClasses = `w-full bg-black/50 border border-white/10 rounded-lg p-4 text-white placeholder-gray-500 focus:border-red-600 focus:bg-black/80 focus:outline-none transition-all`;

  return (
    <section id="registration" className="py-24 px-4 bg-transparent relative overflow-hidden">
      <div className="max-w-3xl mx-auto relative z-10">

        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-black mb-4 text-white uppercase italic tracking-tighter">
            {isDe ? "ZUR" : "Join The"} <span className="text-red-600">{isDe ? "ANMELDUNG" : "Lab"}</span>
          </h2>
          <p className="text-gray-500 font-mono text-xs tracking-widest uppercase font-bold">
            {isDe ? "JETZT BUCHEN" : "Start Your Transformation"}
          </p>
        </div>

        {submissionStatus === 'success' ? (
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="p-12 bg-white/5 backdrop-blur-xl border border-white/10 text-center rounded-2xl shadow-2xl">
            <div className="text-6xl mb-6">✅</div>
            <h3 className="text-3xl font-black text-white mb-4 uppercase italic">{isDe ? "Bewerbung gesendet" : "Application Sent"}</h3>
            <p className="text-gray-400 mb-8 text-lg font-medium">{isDe ? "Unser Team wird dein Profil prüfen und sich in Kürze über WhatsApp melden." : "Our staff will review your profile and contact you shortly via WhatsApp."}</p>
            <button onClick={() => {
              setSubmissionStatus('idle');
              setFormData({ name: '', phone: '', age: '', yearsInHockey: '', skillLevel: '', gdprConsent: false, honeypot: '' });
            }} className="text-red-600 hover:text-white underline text-sm uppercase tracking-widest transition-colors font-bold">
              {isDe ? "Weiteren Spieler eintragen" : "Submit Another Player"}
            </button>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} noValidate className="space-y-6 bg-white/5 backdrop-blur-xl p-8 md:p-12 border border-white/10 rounded-2xl shadow-2xl relative">

            {/* Honeypot field - hidden from humans */}
            <input
              type="text"
              name="honeypot"
              value={formData.honeypot}
              onChange={handleChange}
              style={{ display: 'none' }}
              autoComplete="off"
            />

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-gray-500 text-[10px] uppercase tracking-[0.2em] mb-2 font-bold">{isDe ? "Vor- und Nachname" : "Full Name"}</label>
                <input id="name" type="text" name="name" value={formData.name} onChange={handleChange} className={`${inputClasses} ${errors.name ? 'border-red-600' : ''}`} placeholder="ALEX OVECHKIN" />
                {errors.name && <p className="text-red-600 text-[10px] mt-1 uppercase italic font-bold">{errors.name}</p>}
              </div>
              <div>
                <label htmlFor="email" className="block text-gray-500 text-[10px] uppercase tracking-[0.2em] mb-2 font-bold">{isDe ? "E-Mail Adresse" : "Email Address"}</label>
                <input id="email" type="email" name="email" value={formData.email} onChange={handleChange} className={`${inputClasses} ${errors.email ? 'border-red-600' : ''}`} placeholder="alex8@caps.com" />
                {errors.email && <p className="text-red-600 text-[10px] mt-1 uppercase italic font-bold">{errors.email}</p>}
              </div>
            </div>

            <div>
              <label htmlFor="phone" className="block text-gray-500 text-[10px] uppercase tracking-[0.2em] mb-2 font-bold">{isDe ? "Telefonnummer (WhatsApp)" : "Phone (WhatsApp)"}</label>
              <input id="phone" type="tel" name="phone" value={formData.phone} onChange={handleChange} className={`${inputClasses} ${errors.phone ? 'border-red-600' : ''}`} placeholder="+43 660 123 4567" />
              {errors.phone && <p className="text-red-600 text-[10px] mt-1 uppercase italic font-bold">{errors.phone}</p>}
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="age" className="block text-gray-500 text-[10px] uppercase tracking-[0.2em] mb-2 font-bold">{isDe ? "Alter" : "Age"}</label>
                <input id="age" type="text" inputMode="numeric" name="age" value={formData.age} onChange={handleChange} className={`w-full bg-white/5 border ${errors.age ? 'border-red-600' : 'border-white/10'} rounded-lg p-4 text-white focus:border-red-600 focus:bg-white/10 focus:outline-none transition-all`} placeholder="12" />
                {errors.age && <p className="text-red-600 text-[10px] mt-1 uppercase italic font-bold">{errors.age}</p>}
              </div>
              <div>
                <label htmlFor="yearsInHockey" className="block text-gray-500 text-[10px] uppercase tracking-[0.2em] mb-2 font-bold">{isDe ? "Jahre Eishockey" : "Years Playing"}</label>
                <input id="yearsInHockey" type="text" inputMode="numeric" name="yearsInHockey" value={formData.yearsInHockey} onChange={handleChange} className={`w-full bg-white/5 border ${errors.yearsInHockey ? 'border-red-600' : 'border-white/10'} rounded-lg p-4 text-white focus:border-red-600 focus:bg-white/10 focus:outline-none transition-all`} placeholder="5" />
                {errors.yearsInHockey && <p className="text-red-600 text-[10px] mt-1 uppercase italic font-bold">{errors.yearsInHockey}</p>}
              </div>
            </div>

            <AnimatePresence>
              {insight && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}>
                  <div className="p-4 mt-2 border border-red-600/30 bg-red-600/10 rounded-lg">
                    <h4 className="text-red-600 text-[10px] font-bold uppercase mb-1 tracking-widest">AI Performance Insight</h4>
                    <p className="text-white text-sm italic font-medium leading-relaxed">{insight}</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div>
              <label htmlFor="skillLevel" className="block text-gray-500 text-[10px] uppercase tracking-[0.2em] mb-2 font-bold">{isDe ? "Niveau Auswählen" : "Current Skill Level"}</label>
              <select id="skillLevel" name="skillLevel" value={formData.skillLevel} onChange={handleChange} className={`w-full bg-white/5 border ${errors.skillLevel ? 'border-red-600' : 'border-white/10'} rounded-lg p-4 text-white focus:border-red-600 focus:bg-white/10 focus:outline-none transition-all cursor-pointer appearance-none`}>
                <option value="" className="bg-black text-white">{isDe ? "NIVEAU AUSWÄHLEN..." : "SELECT LEVEL..."}</option>
                <option value="Beginner" className="bg-black text-white">{isDe ? "Anfänger (0-2 Jahre)" : "Beginner (0-2 years)"}</option>
                <option value="Amateur" className="bg-black text-white">{isDe ? "Amateur / Hobbyliga" : "Amateur (League Play)"}</option>
                <option value="Pro" className="bg-black text-white">{isDe ? "Profi / Elite Nachwuchs" : "Pro / Elite Prospect"}</option>
              </select>
              {errors.skillLevel && <p className="text-red-600 text-[10px] mt-1 uppercase italic font-bold">{errors.skillLevel}</p>}
            </div>

            <div className="flex flex-col gap-1 mt-4">
              <div className="flex items-start gap-3">
                <input id="gdprConsent" type="checkbox" name="gdprConsent" checked={formData.gdprConsent} onChange={handleChange} className="mt-1 accent-red-600 w-4 h-4 cursor-pointer" />
                <label htmlFor="gdprConsent" className="text-gray-500 text-[10px] uppercase leading-tight font-medium cursor-pointer">
                  {isDe ? "Ich stimme der " : "I agree to the "}
                  <a href="#" className="text-red-600 hover:underline">{isDe ? "Datenschutzerklärung" : "Privacy Policy"}</a>
                  {isDe ? " und Datenverarbeitung zu." : " and data processing."}
                </label>
              </div>
              {errors.gdprConsent && <p className="text-red-600 text-[10px] uppercase italic font-bold pl-7">{errors.gdprConsent}</p>}
            </div>

            <button
              type="submit"
              disabled={submissionStatus === 'submitting'}
              style={{ clipPath: "polygon(15px 0, 100% 0, 100% calc(100% - 15px), calc(100% - 15px) 100%, 0 100%, 0 15px)" }}
              className={`w-full py-5 ${submissionStatus === 'submitting' ? 'bg-gray-800' : 'bg-red-600 hover:bg-white'} text-black font-black font-orbitron text-xl uppercase tracking-widest transition-all duration-500 shadow-xl`}
            >
              {submissionStatus === 'submitting' ? (isDe ? 'WIRD GESENDET...' : 'TRANSMITTING...') : (isDe ? 'JETZT BUCHEN' : 'BOOK A SESSION')}
            </button>

            {submissionStatus === 'error' && (
              <p className="text-red-500 text-center font-bold mt-4">Network Error. Please try again or contact us directly.</p>
            )}

          </form>
        )}
      </div>
    </section>
  );
};

export default RegistrationForm;
