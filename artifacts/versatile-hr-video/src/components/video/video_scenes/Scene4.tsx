import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { sceneTransitions } from '@/lib/video/animations';

export function Scene4() {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 100),
      setTimeout(() => setPhase(2), 600),
      setTimeout(() => setPhase(3), 1200),
    ];
    return () => timers.forEach(t => clearTimeout(t));
  }, []);

  return (
    <motion.div 
      className="absolute inset-0 flex items-center bg-[#0A192F]"
      {...sceneTransitions.slideLeft}
    >
      <div className="absolute inset-0">
        <motion.img 
          src={`${import.meta.env.BASE_URL}images/facility_worker.jpg`}
          className="w-full h-full object-cover"
          alt="Facility Worker"
          initial={{ scale: 1.1 }}
          animate={phase >= 1 ? { scale: 1 } : { scale: 1.1 }}
          transition={{ duration: 4, ease: "linear" }}
        />
        <div className="absolute inset-0 bg-[#0A192F]/80 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A192F] via-transparent to-transparent" />
      </div>

      <div className="relative z-10 w-full px-20">
        <motion.div
          className="max-w-3xl"
          initial={{ opacity: 0, y: 50 }}
          animate={phase >= 2 ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="inline-block px-4 py-2 bg-[#FF6B00]/20 border border-[#FF6B00]/50 rounded-full mb-6">
            <span className="text-[#FF6B00] font-bold text-sm tracking-wider uppercase">Facility Management</span>
          </div>
          <h2 className="text-[6vw] font-black text-white leading-none font-display mb-8">
            Empowering<br/>Your Workforce
          </h2>
          <p className="text-2xl text-white/80 max-w-xl">
            Built specifically for the dynamic needs of facility management teams across Pune and beyond.
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}
