import { motion } from 'framer-motion' // eslint-disable-line

const InlineSpinner = ({ size = "sm", color = "primary" }) => {
  const sizeClasses = {
    xs: "w-4 h-4 border-2",
    sm: "w-6 h-6 border-2", 
    md: "w-8 h-8 border-2",
    lg: "w-12 h-12 border-3"
  }

  const colorStyles = {
    primary: { borderTopColor: '#BC6C25', borderRightColor: '#BC6C25' },
    secondary: { borderTopColor: '#DDA15E', borderRightColor: '#DDA15E' },
    white: { borderTopColor: '#ffffff', borderRightColor: '#ffffff' },
    gray: { borderTopColor: '#9ca3af', borderRightColor: '#9ca3af' }
  }

  return (
    <motion.div
      className={`${sizeClasses[size]} border-transparent rounded-full inline-block`}
      style={colorStyles[color]}
      animate={{ rotate: 360 }}
      transition={{
        duration: 1,
        repeat: Infinity,
        ease: "linear"
      }}
    />
  )
}

export default InlineSpinner