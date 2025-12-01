import { MotionProps } from "motion/react";

export const fadeInUp = {
  hidden: { opacity: 0, y: 70 },
  visible: { opacity: 1, y: 0 },
};
export const fadeInLeft = {
  hidden: { opacity: 0, x: -70 },
  visible: { opacity: 1, x: 0 },
};

export const fadeInRight = {
  hidden: { opacity: 0, x: 70 },
  visible: { opacity: 1, x: 0 },
};

export const fadeInScale = {
  hidden: { opacity: 0, scale: 0.75 },
  visible: { opacity: 1, scale: 1 },
};

export const defaultMotion: MotionProps = {
  initial: "hidden",
  whileInView: "visible",
  viewport: { once: true, amount: 0.3 },
  transition: { duration: 0.8 },
};
