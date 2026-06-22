import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { sceneTransitions } from '@/lib/video/animations';

export function Scene2() {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 200),
      setTimeout(() => setPhase(2), 600),
      setTimeout(() => setPhase(3), 1000),
      setTimeout(() => setPhase(4), 1400),
    ];
    return () => timers.forEach(t => clearTimeout(t));
  }, []);

  return (
    <motion.div 
      className="absolute inset-0 flex items-center bg-[#0A192F]"
      {...sceneTransitions.wipe}
    >
      <div className="w-1/2 h-full flex flex-col justify-center px-20 z-10">
        <motion.h2 
          className="text-6xl font-bold text-white font-display mb-12"
          initial={{ opacity: 0, x: -50 }}
          animate={phase >= 1 ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          Enterprise <br/>
          <span className="text-[#FF6B00]">Management</span>
        </motion.h2>

        <div className="space-y-6">
          {[
            { title: "Admin Dashboard", desc: "Complete oversight" },
            { title: "Employee Portal", desc: "Self-service access" },
            { title: "Public Platform", desc: "Corporate presence" }
          ].map((item, i) => (
            <motion.div 
              key={i}
              className="flex items-center space-x-6"
              initial={{ opacity: 0, x: -30 }}
              animate={phase >= i + 2 ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <div className="w-12 h-12 rounded-full bg-[#112240] border border-[#FF6B00]/30 flex items-center justify-center">
                <div className="w-4 h-4 rounded-full bg-[#FF6B00]" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">{item.title}</h3>
                <p className="text-[#94A3B8] text-lg">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="absolute right-0 top-0 bottom-0 w-1/2 z-0">
        <motion.div 
          className="w-full h-full"
          initial={{ opacity: 0, scale: 1.1 }}
          animate={phase >= 1 ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 1.1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          <img 
            src={`${import.meta.env.BASE_URL}images/dashboard_abstract.png`}
            className="w-full h-full object-cover opacity-60"
            alt="Dashboard"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0A192F] via-[#0A192F]/50 to-transparent" />
        </motion.div>
      </div>
    </motion.div>
  );
}
