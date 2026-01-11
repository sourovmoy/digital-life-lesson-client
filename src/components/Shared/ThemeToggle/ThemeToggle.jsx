import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaSun, FaMoon } from "react-icons/fa";
import { useTheme } from "../../../providers/ThemeContext";

const ThemeToggle = ({ className = "", size = "normal" }) => {
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className={`w-12 h-6 bg-base-300 rounded-full ${className}`}></div>
    );
  }

  const isDark = theme === "dark";
  
  const sizeClasses = {
    small: "w-10 h-5",
    normal: "w-12 h-6",
    large: "w-14 h-7"
  };

  const circleClasses = {
    small: "w-4 h-4",
    normal: "w-5 h-5", 
    large: "w-6 h-6"
  };

  const iconClasses = {
    small: "text-xs",
    normal: "text-sm",
    large: "text-base"
  };

  const translateClasses = {
    small: isDark ? "translate-x-5" : "translate-x-0.5",
    normal: isDark ? "translate-x-6" : "translate-x-0.5",
    large: isDark ? "translate-x-7" : "translate-x-0.5"
  };

  return (
    <motion.button
      onClick={toggleTheme}
      className={`
        ${sizeClasses[size]} 
        relative inline-flex items-center rounded-full 
        transition-all duration-300 ease-in-out
        ${isDark 
          ? 'bg-primary' 
          : 'bg-base-300'
        }
        hover:shadow-md focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 focus:ring-offset-base-100
        ${className}
      `}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {/* Toggle Circle */}
      <motion.span
        className={`
          ${circleClasses[size]}
          inline-block rounded-full bg-white shadow-md
          flex items-center justify-center
        `}
        animate={{
          x: isDark ? (size === 'small' ? 20 : size === 'large' ? 28 : 24) : 2
        }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
      >
        <motion.div
          key={isDark ? 'moon' : 'sun'}
          initial={{ rotate: -180, opacity: 0 }}
          animate={{ rotate: 0, opacity: 1 }}
          exit={{ rotate: 180, opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {isDark ? (
            <FaMoon className={`${iconClasses[size]} text-primary`} />
          ) : (
            <FaSun className={`${iconClasses[size]} text-secondary`} />
          )}
        </motion.div>
      </motion.span>
    </motion.button>
  );
};

export default ThemeToggle;