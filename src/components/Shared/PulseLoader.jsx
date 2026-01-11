import { motion } from 'framer-motion' // eslint-disable-line

const PulseLoader = ({ count = 3, size = "md", color = "primary" }) => {
  const sizeClasses = {
    sm: "w-2 h-2",
    md: "w-3 h-3",
    lg: "w-4 h-4"
  }

  const colorClasses = {
    primary: "bg-[#BC6C25]",
    secondary: "bg-[#DDA15E]",
    gray: "bg-gray-400"
  }

  return (
    <div className="flex items-center justify-center gap-1">
      {Array.from({ length: count }).map((_, index) => (
        <motion.div
          key={index}
          className={`${sizeClasses[size]} ${colorClasses[color]} rounded-full`}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 1, 0.5]
          }}
          transition={{
            duration: 1.2,
            repeat: Infinity,
            delay: index * 0.2,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  )
}

export default PulseLoader