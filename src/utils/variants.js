export const fadeIn = (direction, distance = 20, duration = 0.2, delay = 0) => {
  return {
    hidden: {
      opacity: 0,
      y: direction === "up" ? distance : direction === "down" ? -distance : 0,
      x:
        direction === "left" ? distance : direction === "right" ? -distance : 0,
    },
    show: {
      y: 0,
      x: 0,
      opacity: 1,
      transition: {
        type: "tween",
        duration: duration,
        delay: delay,
        ease: [0, 0, 1, 1],
      },
    },
  };
};
