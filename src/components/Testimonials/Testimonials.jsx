import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion"; // eslint-disable-line
import { FaQuoteLeft, FaChevronLeft, FaChevronRight } from "react-icons/fa";

const testimonials = [
  {
    id: 1,
    name: "Sourov Dash",
    role: "Life Coach",
    image: "https://i.ibb.co/xqB3P6fG/149400531-2863964833880191-365399902058522801-n-removebg-preview.png",
    content: "This platform has transformed how I approach personal growth. The lessons shared here are genuine, practical, and deeply meaningful.",
    rating: 5
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    role: "Teacher",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=150&h=150&q=80",
    content: "The diversity of perspectives and the quality of lessons on this platform is amazing. It's become my go-to resource for personal development.",
    rating: 5
  },
  {
    id: 4,
    name: "David Thompson",
    role: "Student",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=150&h=150&q=80",
    content: "As a student, I find the life lessons here incredibly relevant. They've helped me navigate challenges and make better decisions.",
    rating: 5
  }
];

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section className="testimonials-section py-16 bg-base-100">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-base-content mb-4">
            What Our Community Says
          </h2>
          <p className="text-lg text-base-content/70 max-w-2xl mx-auto">
            Hear from learners who have transformed their lives through shared wisdom and experiences.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <motion.div 
            className="bg-base-200 rounded-2xl p-8 md:p-12 shadow-lg border border-base-300 relative"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <FaQuoteLeft className="text-4xl text-primary/30 absolute top-6 left-6" />
            </motion.div>
            
            <AnimatePresence mode="wait">
              <motion.div 
                key={currentIndex}
                className="text-center"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
              >
                <motion.img
                  src={currentTestimonial.image}
                  alt={currentTestimonial.name}
                  className="w-20 h-20 rounded-full mx-auto mb-6 border-4 border-primary/20"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                />
                
                <motion.blockquote 
                  className="text-lg md:text-xl text-base-content/80 mb-6 italic leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                >
                  "{currentTestimonial.content}"
                </motion.blockquote>
                
                <motion.div 
                  className="flex justify-center mb-4"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                >
                  {[...Array(currentTestimonial.rating)].map((_, i) => (
                    <motion.span 
                      key={i} 
                      className="text-secondary text-xl"
                      initial={{ opacity: 0, rotate: -180 }}
                      animate={{ opacity: 1, rotate: 0 }}
                      transition={{ delay: 0.5 + i * 0.1, duration: 0.3 }}
                    >
                      ⭐
                    </motion.span>
                  ))}
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                >
                  <h4 className="text-xl font-semibold text-base-content">
                    {currentTestimonial.name}
                  </h4>
                  <p className="text-base-content/70">
                    {currentTestimonial.role}
                  </p>
                </motion.div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation */}
            <motion.div 
              className="flex justify-between items-center mt-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.7, duration: 0.5 }}
            >
              <motion.button
                onClick={prevTestimonial}
                className="p-3 rounded-full bg-primary text-primary-content hover:bg-secondary transition-colors"
                aria-label="Previous testimonial"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <FaChevronLeft />
              </motion.button>
              
              <div className="flex space-x-2">
                {testimonials.map((_, index) => (
                  <motion.button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-3 h-3 rounded-full transition-colors ${
                      index === currentIndex ? 'bg-primary' : 'bg-base-300'
                    }`}
                    aria-label={`Go to testimonial ${index + 1}`}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.8 }}
                  />
                ))}
              </div>
              
              <motion.button
                onClick={nextTestimonial}
                className="p-3 rounded-full bg-primary text-primary-content hover:bg-secondary transition-colors"
                aria-label="Next testimonial"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <FaChevronRight />
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;