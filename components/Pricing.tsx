import React from 'react';
import { motion } from 'framer-motion';

const Pricing: React.FC = () => {
  const plans = [
    {
      title: "Skills Training",
      price: "From €25",
      subtitle: "per session",
      features: [
        "Small group dynamics",
        "Puck control & agility",
        "High-intensity reps",
      ],
      highlight: false
    },
    {
      title: "Individual 1-on-1",
      price: "From €70",
      subtitle: "60 minutes",
      features: [
        "Surgical deconstruction",
        "Video analysis included",
        "Customized development plan",
        "Direct coach feedback"
      ],
      highlight: true
    },
    {
      title: "Off-Ice / Video Analysis",
      price: "From €40",
      subtitle: "per session",
      features: [
        "Hockey IQ development",
        "Biomechanical breakdown",
        "Positional positioning"
      ],
      highlight: false
    }
  ];

  return (
    <section className="py-24 px-4 bg-transparent relative z-10" id="pricing">
      <div className="max-w-7xl mx-auto">
        <motion.h2 
          className="text-4xl md:text-6xl font-bold text-center mb-16 uppercase italic font-black text-white tracking-wider"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Training <span className="text-red-600">Rates</span>
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`relative p-8 rounded-2xl flex flex-col bg-white/5 backdrop-blur-md border ${plan.highlight ? 'border-red-600 shadow-[0_0_30px_rgba(255,0,0,0.3)]' : 'border-white/10'} hover:border-red-500 transition-all duration-300`}
            >
              {plan.highlight && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-red-600 text-white px-4 py-1 text-xs font-bold uppercase tracking-widest rounded-full">
                  Most Requested
                </div>
              )}
              <h3 className="text-2xl font-black italic uppercase mb-2 text-white text-center">
                {plan.title}
              </h3>
              <div className="text-center mb-6 border-b border-gray-800 pb-6">
                <span className="text-4xl font-black text-red-600">{plan.price}</span>
                <span className="block text-gray-500 text-sm uppercase mt-1 tracking-widest">{plan.subtitle}</span>
              </div>
              <ul className="flex-grow space-y-4 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center text-sm font-medium text-gray-300">
                    <span className="text-red-600 mr-3">✔</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
        
        <p className="text-center text-gray-500 text-sm mt-12 mb-8 italic">
          * Prices are indicative and may vary based on ice rental and specific coaching requirements.
        </p>
      </div>
    </section>
  );
};

export default Pricing;
