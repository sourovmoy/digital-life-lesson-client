import { motion } from 'framer-motion' // eslint-disable-line

const LoadingSpinner = ({ smallHeight, message = "Loading...", size = "default" }) => {
  // Responsive sizing based on screen size and size prop
  const getSizeClasses = () => {
    switch(size) {
      case 'small':
        return {
          container: 'w-8 h-8 sm:w-10 sm:h-10',
          border: 'border-2',
          dot: 'w-1.5 h-1.5',
          glow: 'w-16 h-16 sm:w-20 sm:h-20'
        }
      case 'large':
        return {
          container: 'w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28',
          border: 'border-4 sm:border-6',
          dot: 'w-4 h-4 sm:w-5 sm:h-5',
          glow: 'w-40 h-40 sm:w-48 sm:h-48'
        }
      default:
        return {
          container: 'w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20',
          border: 'border-3 sm:border-4',
          dot: 'w-2 h-2 sm:w-3 sm:h-3',
          glow: 'w-24 h-24 sm:w-32 sm:h-32'
        }
    }
  }

  const sizeClasses = getSizeClasses()

  return (
    <div
      className={`${smallHeight ? 'h-[200px] sm:h-[250px]' : 'h-[50vh] sm:h-[60vh] md:h-[70vh]'} 
      flex 
      flex-col 
      justify-center 
      items-center 
      gap-3 sm:gap-4 md:gap-6 
      px-2 sm:px-4`}
    >
      {/* Main Spinner Container */}
      <div className="relative">
        {/* Outer Ring */}
        <motion.div
          className={`${sizeClasses.container} ${sizeClasses.border} border-[#DDA15E]/30 rounded-full`}
          animate={{ rotate: 360 }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        
        {/* Inner Spinning Ring */}
        <motion.div
          className={`absolute top-0 left-0 ${sizeClasses.container} ${sizeClasses.border} border-transparent border-t-[#BC6C25] border-r-[#BC6C25] rounded-full`}
          animate={{ rotate: 360 }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        
        {/* Center Pulsing Dot */}
        <motion.div
          className={`absolute top-1/2 left-1/2 ${sizeClasses.dot} bg-[#BC6C25] rounded-full transform -translate-x-1/2 -translate-y-1/2`}
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.7, 1, 0.7]
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      {/* Loading Text */}
      <motion.div
        className="text-center max-w-xs sm:max-w-sm px-2"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <p className="text-[#BC6C25] font-semibold text-sm sm:text-base md:text-lg mb-2">{message}</p>
        
        {/* Animated Dots */}
        <div className="flex justify-center gap-1">
          {[0, 1, 2].map((index) => (
            <motion.div
              key={index}
              className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-[#DDA15E] rounded-full"
              animate={{
                y: [0, -6, 0],
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
      </motion.div>

      {/* Background Glow Effect */}
      <div className="absolute inset-0 flex justify-center items-center pointer-events-none">
        <motion.div
          className={`${sizeClasses.glow} bg-gradient-to-r from-[#BC6C25]/10 to-[#DDA15E]/10 rounded-full blur-xl`}
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>
    </div>
  )
}

export default LoadingSpinner
