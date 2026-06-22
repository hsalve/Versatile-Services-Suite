import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useVideoPlayer } from '@/lib/video';
import { Scene1 } from './video_scenes/Scene1';
import { Scene2 } from './video_scenes/Scene2';
import { Scene3 } from './video_scenes/Scene3';
import { Scene4 } from './video_scenes/Scene4';
import { Scene5 } from './video_scenes/Scene5';

export const SCENE_DURATIONS: Record<string, number> = {
  intro: 4000,
  modules: 4500,
  payroll: 4500,
  workforce: 4500,
  outro: 4000,
};

const SCENE_COMPONENTS: Record<string, React.ComponentType> = {
  intro: Scene1,
  modules: Scene2,
  payroll: Scene3,
  workforce: Scene4,
  outro: Scene5,
};

export default function VideoTemplate({
  durations = SCENE_DURATIONS,
  loop = true,
  onSceneChange,
}: {
  durations?: Record<string, number>;
  loop?: boolean;
  onSceneChange?: (sceneKey: string) => void;
} = {}) {
  const { currentScene, currentSceneKey } = useVideoPlayer({ durations, loop });

  useEffect(() => {
    onSceneChange?.(currentSceneKey);
  }, [currentSceneKey, onSceneChange]);

  const baseSceneKey = currentSceneKey.replace(/_r[12]$/, '') as keyof typeof SCENE_DURATIONS;
  const sceneIndex = Object.keys(SCENE_DURATIONS).indexOf(baseSceneKey);
  const SceneComponent = SCENE_COMPONENTS[baseSceneKey];

  return (
    <div className="relative w-full h-screen overflow-hidden bg-[#0A192F]">
      {/* Persistent Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute w-[800px] h-[800px] rounded-full opacity-20 blur-3xl"
          style={{ background: 'radial-gradient(circle, #FF6B00, transparent)' }}
          animate={{
            x: ['-20%', '80%', '10%'],
            y: ['-10%', '60%', '20%'],
            scale: [1, 1.2, 0.8],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute w-[600px] h-[600px] rounded-full opacity-30 blur-3xl right-0 bottom-0"
          style={{ background: 'radial-gradient(circle, #1e3a8a, transparent)' }}
          animate={{
            x: ['10%', '-50%', '5%'],
            y: ['10%', '-30%', '-10%'],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      {/* Persistent midground accent — shifts position per scene */}
      <motion.div
        className="absolute w-1 bg-[#FF6B00]/60"
        style={{ top: 0, bottom: 0 }}
        animate={{
          left: ['8%', '15%', '85%', '72%', '50%'][sceneIndex] ?? '50%',
          opacity: [0.4, 0.6, 0.6, 0.5, 0.3][sceneIndex] ?? 0.4,
        }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      />

      <AnimatePresence mode="popLayout">
        {SceneComponent && <SceneComponent key={currentSceneKey} />}
      </AnimatePresence>
    </div>
  );
}
