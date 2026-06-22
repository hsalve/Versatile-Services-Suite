import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { sceneTransitions } from '@/lib/video/animations';

export function Scene1() {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 300),
      setTimeout(() => setPhase(2), 800),
      setTimeout(() => setPhase(3), 1500),
      setTimeout(() => setPhase(4), 2800),
    ];
    return () => timers.forEach(t => clearTimeout(t));
  }, []);

  return (
    <motion.div 
      className="absolute inset-0 flex flex-col items-center justify-center bg-[#0A192F]"
      {...sceneTransitions.fadeBlur}
    >
      <div className="absolute inset-0 z-0">
        <video 
          src={`${import.meta.env.BASE_URL}videos/data_bg.mp4`}
          className="w-full h-full object-cover opacity-30"
          autoPlay muted loop playsInline
        />
        <div className="absolute inset-0 bg-[#0A192F]/60" />
      </div>

      <div className="relative z-10 text-center flex flex-col items-center max-w-4xl px-8">
        <motion.div
          className="w-24 h-24 mb-8 rounded-2xl bg-gradient-to-tr from-[#FF6B00] to-[#FF8C33] flex items-center justify-center shadow-[0_0_40px_rgba(255,107,0,0.4)]"
          initial={{ opacity: 0, scale: 0, rotate: -45 }}
          animate={phase >= 1 ? { opacity: 1, scale: 1, rotate: 0 } : { opacity: 0, scale: 0, rotate: -45 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        >
          <svg className="w-12 h-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
        </motion.div>

        <h1 className="text-[5vw] font-bold text-white leading-tight font-display tracking-tight mb-6">
          <span className="block overflow-hidden">
            <motion.span 
              className="block"
              initial={{ y: "100%" }}
              animate={phase >= 2 ? { y: 0 } : { y: "100%" }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              Versatile Services
            </motion.span>
          </span>
          <span className="block overflow-hidden text-[#FF6B00]">
            <motion.span 
              className="block"
              initial={{ y: "100%" }}
              animate={phase >= 3 ? { y: 0 } : { y: "100%" }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              HR & Payroll
            </motion.span>
          </span>
        </h1>
      </div>
    </motion.div>
  );
}
