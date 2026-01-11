import { motion } from "framer-motion";

const FloatingElements = () => {
  const floatingVariants = {
    animate: {
      y: [-20, 20, -20],
      rotate: [0, 5, -5, 0],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const pulseVariants = {
    animate: {
      scale: [1, 1.1, 1],
      opacity: [0.7, 1, 0.7],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Floating circles */}
      <motion.div
        className="absolute top-20 left-10 w-20 h-20 bg-primary/10 rounded-full blur-xl"
        variants={floatingVariants}
        animate="animate"
        style={{ animationDelay: "0s" }}
      />
      
      <motion.div
        className="absolute top-40 right-20 w-32 h-32 bg-secondary/10 rounded-full blur-xl"
        variants={floatingVariants}
        animate="animate"
        style={{ animationDelay: "2s" }}
      />
      
      <motion.div
        className="absolute bottom-40 left-20 w-24 h-24 bg-success/10 rounded-full blur-xl"
        variants={floatingVariants}
        animate="animate"
        style={{ animationDelay: "4s" }}
      />
      
      <motion.div
        className="absolute bottom-20 right-10 w-16 h-16 bg-warning/10 rounded-full blur-xl"
        variants={floatingVariants}
        animate="animate"
        style={{ animationDelay: "1s" }}
      />

      {/* Pulsing elements */}
      <motion.div
        className="absolute top-1/3 left-1/4 w-2 h-2 bg-primary rounded-full"
        variants={pulseVariants}
        animate="animate"
        style={{ animationDelay: "0s" }}
      />
      
      <motion.div
        className="absolute top-2/3 right-1/3 w-3 h-3 bg-secondary rounded-full"
        variants={pulseVariants}
        animate="animate"
        style={{ animationDelay: "1.5s" }}
      />
      
      <motion.div
        className="absolute top-1/2 left-3/4 w-1 h-1 bg-success rounded-full"
        variants={pulseVariants}
        animate="animate"
        style={{ animationDelay: "3s" }}
      />
    </div>
  );
};

export default FloatingElements;