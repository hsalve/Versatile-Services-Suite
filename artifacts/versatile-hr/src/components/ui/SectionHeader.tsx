import { motion } from "framer-motion";

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  center?: boolean;
  light?: boolean;
}

export function SectionHeader({
  eyebrow,
  title,
  subtitle,
  center = true,
  light = false,
}: SectionHeaderProps) {
  return (
    <motion.div
      className={center ? "text-center" : ""}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, ease: "easeOut" }}
    >
      {eyebrow && (
        <p
          className="text-xs font-bold uppercase tracking-[0.18em] mb-3"
          style={{ color: light ? "rgba(255,255,255,0.7)" : "#e8630a" }}
        >
          {eyebrow}
        </p>
      )}
      <h2
        className="text-3xl md:text-4xl font-bold leading-tight"
        style={{ color: light ? "white" : "#1a3a6b" }}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className="mt-4 text-base md:text-lg leading-relaxed max-w-2xl"
          style={{
            color: light ? "rgba(255,255,255,0.72)" : "#6b7a9c",
            margin: center ? "16px auto 0" : "16px 0 0",
          }}
        >
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
