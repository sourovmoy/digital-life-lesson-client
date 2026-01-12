import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Link } from "react-router";
import { motion } from "framer-motion";
import useAuth from "../../hooks/useAuth";
import { useState } from "react";

const bannerSlides = [
  {
    title: "Discover Life Lessons That Inspire",
    subtitle: "Explore personal growth insights and wisdom from our community of learners.",
    buttonText: "Explore Lessons",
    buttonLink: "/public-lessons",
    bgGradient: "from-primary via-primary/90 to-secondary",
    icon: "🌟",
    stats: { lessons: "1000+", users: "500+" },
    features: ["Personal Growth", "Community Wisdom", "Expert Insights"]
  },
  {
    title: "Grow, Reflect, and Share Your Wisdom",
    subtitle: "Learn from meaningful lessons and track your personal development journey.",
    buttonText: "Start Learning",
    buttonLink: "/signup",
    bgGradient: "from-secondary via-secondary/90 to-accent",
    icon: "🚀",
    stats: { growth: "Daily", impact: "Life-changing" },
    features: ["Track Progress", "Share Stories", "Build Habits"]
  },
  {
    title: "Join Our Community of Lifelong Learners",
    subtitle: "Connect with passionate individuals and grow together through shared experiences.",
    buttonText: "Join Community",
    buttonLink: "/about",
    bgGradient: "from-accent via-accent/90 to-primary",
    icon: "🤝",
    stats: { community: "Global", support: "24/7" },
    features: ["Connect & Share", "Learn Together", "Support Network"]
  },
];

const FloatingElement = ({ children, delay = 0, duration = 3 }) => (
  <motion.div
    animate={{
      y: [0, -10, 0],
      rotate: [0, 2, -2, 0],
    }}
    transition={{
      duration,
      repeat: Infinity,
      delay,
      ease: "easeInOut"
    }}
  >
    {children}
  </motion.div>
);

const HeroBanner = () => {
  const { user } = useAuth();
  const [currentSlide, setCurrentSlide] = useState(0);

  return (
    <section className="hero-banner mb-12 relative h-[50vh] sm:h-[55vh] md:h-[60vh] lg:h-[65vh] min-h-[400px] max-h-[600px] overflow-hidden">
      <Carousel
        autoPlay
        infiniteLoop
        showThumbs={false}
        interval={6000}
        showStatus={false}
        showArrows={true}
        onChange={(index) => setCurrentSlide(index)}
        className="h-full carousel-container"
        renderArrowPrev={(onClickHandler, hasPrev, label) =>
          hasPrev && (
            <motion.button
              whileHover={{ scale: 1.1, x: -5 }}
              whileTap={{ scale: 0.9 }}
              type="button"
              onClick={onClickHandler}
              title={label}
              className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 z-20 bg-base-100/20 backdrop-blur-sm hover:bg-base-100/30 text-white p-2 sm:p-3 rounded-full transition-all duration-300 border border-white/20 shadow-lg"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </motion.button>
          )
        }
        renderArrowNext={(onClickHandler, hasNext, label) =>
          hasNext && (
            <motion.button
              whileHover={{ scale: 1.1, x: 5 }}
              whileTap={{ scale: 0.9 }}
              type="button"
              onClick={onClickHandler}
              title={label}
              className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 z-20 bg-base-100/20 backdrop-blur-sm hover:bg-base-100/30 text-white p-2 sm:p-3 rounded-full transition-all duration-300 border border-white/20 shadow-lg"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </motion.button>
          )
        }
      >
        {bannerSlides.map((slide, index) => (
          <div
            key={index}
            className={`relative h-[50vh] sm:h-[55vh] md:h-[60vh] lg:h-[65vh] min-h-[400px] max-h-[600px] flex items-center justify-center bg-gradient-to-br ${slide.bgGradient} text-white overflow-hidden`}
          >
            {/* Animated Background Pattern */}
            <div className="absolute inset-0">
              {/* Geometric shapes */}
              <FloatingElement delay={0} duration={4}>
                <div className="absolute top-16 left-8 w-16 h-16 bg-white/10 rounded-2xl rotate-45 blur-sm"></div>
              </FloatingElement>
              <FloatingElement delay={1} duration={5}>
                <div className="absolute top-24 right-16 w-24 h-24 bg-white/5 rounded-full blur-xl"></div>
              </FloatingElement>
              <FloatingElement delay={2} duration={3}>
                <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-white/8 rounded-full blur-lg"></div>
              </FloatingElement>
              <FloatingElement delay={1.5} duration={6}>
                <div className="absolute bottom-16 right-1/3 w-20 h-20 bg-white/6 rounded-2xl rotate-12 blur-lg"></div>
              </FloatingElement>
              
              {/* Subtle grid pattern */}
              <div className="absolute inset-0 opacity-5">
                <div className="w-full h-full" style={{
                  backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
                  backgroundSize: '40px 40px'
                }}></div>
              </div>
            </div>

            {/* Main Content */}
            <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-8 items-center">
              {/* Left Content */}
              <motion.div 
                className="lg:col-span-7 text-center lg:text-left"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                {/* Icon & Title Container */}
                <div className="flex items-center justify-center lg:justify-start gap-2 sm:gap-4 mb-3 sm:mb-4">
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="text-3xl sm:text-4xl lg:text-5xl"
                  >
                    {slide.icon}
                  </motion.div>
                  
                  <motion.h1 
                    className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                  >
                    <span className="bg-gradient-to-r from-white via-white/95 to-white/90 bg-clip-text text-transparent">
                      {slide.title}
                    </span>
                  </motion.h1>
                </div>

                {/* Subtitle */}
                <motion.p 
                  className="text-base sm:text-lg md:text-xl mb-4 sm:mb-6 opacity-90 leading-relaxed max-w-2xl mx-auto lg:mx-0"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                >
                  {slide.subtitle}
                </motion.p>

                {/* Features */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1 }}
                  className="flex flex-wrap gap-1.5 sm:gap-2 mb-4 sm:mb-6 justify-center lg:justify-start"
                >
                  {slide.features.map((feature, idx) => (
                    <motion.span
                      key={idx}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4, delay: 1.2 + idx * 0.1 }}
                      whileHover={{ scale: 1.05 }}
                      className="bg-white/20 backdrop-blur-sm px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium border border-white/30 hover:bg-white/30 transition-all duration-300"
                    >
                      ✨ {feature}
                    </motion.span>
                  ))}
                </motion.div>

                {/* CTA Button */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 1.4 }}
                >
                  <Link
                    to={user && slide.buttonLink === "/signup" ? "/dashboard" : slide.buttonLink}
                    className="group relative inline-flex items-center gap-2 sm:gap-3 bg-base-100 text-base-content font-bold px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl shadow-2xl hover:shadow-3xl transition-all duration-300 text-sm sm:text-base overflow-hidden"
                  >
                    <span className="relative z-10">
                      {user && slide.buttonLink === "/signup" ? "Go to Dashboard" : slide.buttonText}
                    </span>
                    <motion.svg 
                      className="w-3 h-3 sm:w-4 sm:h-4 relative z-10"
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                      whileHover={{ x: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </motion.svg>
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </Link>
                </motion.div>
              </motion.div>

              {/* Right Content - Compact Stats & Visual - Hidden on mobile and tablet */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="lg:col-span-5 hidden xl:flex flex-col items-center justify-center"
              >
                {/* Compact Stats */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                  {Object.entries(slide.stats).map(([key, value], idx) => (
                    <motion.div
                      key={key}
                      initial={{ opacity: 0, y: 20, scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ duration: 0.5, delay: 1.6 + idx * 0.2 }}
                      whileHover={{ scale: 1.05, y: -3 }}
                      className="bg-white/15 backdrop-blur-sm rounded-xl p-3 text-center border border-white/20 shadow-lg hover:bg-white/20 transition-all duration-300"
                    >
                      <div className="text-xl font-bold mb-1">{value}</div>
                      <div className="text-xs opacity-80 capitalize">{key}</div>
                    </motion.div>
                  ))}
                </div>

                {/* Compact Decorative Element */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                  className="w-28 h-28 border-2 border-white/20 rounded-full flex items-center justify-center relative"
                >
                  <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/20">
                    <span className="text-xl">{slide.icon}</span>
                  </div>
                  {/* Smaller orbiting elements */}
                  <motion.div
                    animate={{ rotate: -360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0"
                  >
                    <div className="absolute top-0 left-1/2 w-2 h-2 bg-white/60 rounded-full transform -translate-x-1/2"></div>
                    <div className="absolute bottom-0 left-1/2 w-1.5 h-1.5 bg-white/40 rounded-full transform -translate-x-1/2"></div>
                    <div className="absolute left-0 top-1/2 w-1.5 h-1.5 bg-white/50 rounded-full transform -translate-y-1/2"></div>
                    <div className="absolute right-0 top-1/2 w-2 h-2 bg-white/70 rounded-full transform -translate-y-1/2"></div>
                  </motion.div>
                </motion.div>
              </motion.div>

              {/* Mobile Stats Display - Only visible on mobile/tablet */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.8 }}
                className="xl:hidden flex justify-center gap-4 mt-4"
              >
                {Object.entries(slide.stats).map(([key, value], idx) => (
                  <motion.div
                    key={key}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: 2 + idx * 0.1 }}
                    className="bg-white/15 backdrop-blur-sm rounded-lg px-3 py-2 text-center border border-white/20"
                  >
                    <div className="text-sm font-bold">{value}</div>
                    <div className="text-xs opacity-80 capitalize">{key}</div>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            {/* Enhanced Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-black/10 via-transparent to-black/10"></div>
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/20"></div>
          </div>
        ))}
      </Carousel>
      
      {/* Enhanced Slide Indicators */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2 z-20">
        {bannerSlides.map((_, index) => (
          <motion.div
            key={index}
            className={`h-1 rounded-full transition-all duration-300 ${
              currentSlide === index ? 'bg-white w-8' : 'bg-white/50 w-4'
            }`}
            whileHover={{ scale: 1.2 }}
          />
        ))}
      </div>

      {/* Compact Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 2 }}
        className="absolute bottom-2 sm:bottom-4 right-3 sm:right-6 z-10"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center text-white/60"
        >
          <span className="text-xs mb-1 font-medium hidden sm:block">Scroll</span>
          <div className="w-4 sm:w-5 h-6 sm:h-8 border border-white/40 rounded-full flex justify-center relative">
            <motion.div 
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="w-0.5 h-1.5 sm:h-2 bg-white/60 rounded-full mt-1"
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroBanner;
