import { motion } from "framer-motion";

const variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function Reveal({
  children,
  delay = 0,
  className = "",
  as: Component = motion.div,
  once = true,
  amount = 0.2,
  ...rest
}) {
  return (
    <Component
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
      custom={delay}
      className={className}
      {...rest}
    >
      {children}
    </Component>
  );
}
