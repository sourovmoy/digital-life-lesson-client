import { motion } from 'framer-motion' // eslint-disable-line

const LoadingSpinner = ({ smallHeight, message = "Loading..." }) => {
  return (
    <div
      className={`${smallHeight ? 'h-[250px]' : 'h-[70vh]'} 
      flex 
      flex-col 
      justify-center 
      items-center 
      gap-6`}
    >
      {/* Main Spinner Container */}
      <div className="relative">
        {/* Outer Ring */}
        <motion.div
          className="w-16 h-16 border-4 border-[#DDA15E]/30 rounded-full"
          animate={{ rotate: 360 }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        
        {/* Inner Spinning Ring */}
        <motion.div
          className="absolute top-0 left-0 w-16 h-16 border-4 border-transparent border-t-[#BC6C25] border-r-[#BC6C25] rounded-full"
          animate={{ rotate: 360 }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        
        {/* Center Pulsing Dot */}
        <motion.div
          className="absolute top-1/2 left-1/2 w-3 h-3 bg-[#BC6C25] rounded-full transform -translate-x-1/2 -translate-y-1/2"
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
        className="text-center"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <p className="text-[#BC6C25] font-semibold text-lg mb-2">{message}</p>
        
        {/* Animated Dots */}
        <div className="flex justify-center gap-1">
          {[0, 1, 2].map((index) => (
            <motion.div
              key={index}
              className="w-2 h-2 bg-[#DDA15E] rounded-full"
              animate={{
                y: [0, -8, 0],
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
          className="w-32 h-32 bg-gradient-to-r from-[#BC6C25]/10 to-[#DDA15E]/10 rounded-full blur-xl"
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
