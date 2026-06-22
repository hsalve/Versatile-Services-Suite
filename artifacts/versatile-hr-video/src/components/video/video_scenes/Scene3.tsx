import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { sceneTransitions } from '@/lib/video/animations';

export function Scene3() {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 200),
      setTimeout(() => setPhase(2), 700),
      setTimeout(() => setPhase(3), 1500),
    ];
    return () => timers.forEach(t => clearTimeout(t));
  }, []);

  return (
    <motion.div 
      className="absolute inset-0 bg-[#0A192F] flex flex-col items-center justify-center"
      {...sceneTransitions.clipPolygon}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,107,0,0.1),transparent_70%)]" />

      <motion.div 
        className="w-[80vw] h-[60vh] bg-[#112240] rounded-3xl border border-white/10 relative overflow-hidden flex"
        initial={{ y: 100, opacity: 0, rotateX: -20 }}
        animate={phase >= 1 ? { y: 0, opacity: 1, rotateX: 0 } : { y: 100, opacity: 0, rotateX: -20 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
      >
        <div className="w-1/2 p-16 flex flex-col justify-center relative z-10 bg-gradient-to-r from-[#112240] to-transparent">
          <h2 className="text-5xl font-bold font-display text-white mb-6">
            Flawless <span className="text-[#FF6B00]">Payroll</span>
          </h2>
          <p className="text-2xl text-[#94A3B8] mb-12">
            Automated processing, transparent structures, and print-ready payslips.
          </p>

          <div className="flex gap-4">
            {[1, 2, 3].map((i) => (
              <motion.div
                key={i}
                className="h-2 bg-[#FF6B00] rounded-full"
                initial={{ width: 0 }}
                animate={phase >= 2 ? { width: i === 2 ? 60 : 40 } : { width: 0 }}
                transition={{ duration: 0.8, delay: i * 0.1 }}
              />
            ))}
          </div>
        </div>

        <div className="absolute right-0 top-0 bottom-0 w-2/3">
          <motion.img 
            src={`${import.meta.env.BASE_URL}images/office_hr.jpg`}
            className="w-full h-full object-cover opacity-40 mix-blend-luminosity"
            alt="HR Office"
            initial={{ scale: 1.2, x: 50 }}
            animate={phase >= 2 ? { scale: 1, x: 0 } : { scale: 1.2, x: 50 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          />
          <div className="absolute inset-0 bg-gradient-to-l from-transparent to-[#112240]" />
        </div>
      </motion.div>
    </motion.div>
  );
}
