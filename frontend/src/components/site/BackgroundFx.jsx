import { motion, useScroll, useSpring } from "framer-motion";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 25,
    mass: 0.2,
  });

  return (
    <motion.div
      style={{ scaleX, transformOrigin: "0% 50%" }}
      className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-cyan-500 via-cyan-300 to-blue-400 z-[60]"
      data-testid="scroll-progress"
    />
  );
}

export function AnimatedBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      data-testid="animated-background"
    >
      {/* Aurora orb 1 */}
      <motion.div
        initial={{ x: -200, y: -100 }}
        animate={{
          x: [-200, 100, -150, -200],
          y: [-100, 50, 200, -100],
        }}
        transition={{
          duration: 28,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-[10%] left-[5%] w-[500px] h-[500px] rounded-full bg-cyan-500/[0.07] blur-[120px]"
      />

      {/* Aurora orb 2 */}
      <motion.div
        initial={{ x: 100, y: 100 }}
        animate={{
          x: [100, -150, 200, 100],
          y: [100, 300, 50, 100],
        }}
        transition={{
          duration: 34,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-[40%] right-[5%] w-[600px] h-[600px] rounded-full bg-blue-500/[0.06] blur-[140px]"
      />

      {/* Aurora orb 3 */}
      <motion.div
        initial={{ x: 0, y: 0 }}
        animate={{
          x: [0, 150, -100, 0],
          y: [0, -200, 150, 0],
        }}
        transition={{
          duration: 40,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute bottom-[10%] left-[40%] w-[450px] h-[450px] rounded-full bg-teal-500/[0.05] blur-[130px]"
      />

      {/* Subtle scan line */}
      <motion.div
        initial={{ y: "-100%" }}
        animate={{ y: "100vh" }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent"
      />
    </div>
  );
}
