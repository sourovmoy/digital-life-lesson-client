import { lazy, Suspense } from "react";
import { motion } from "framer-motion"; // eslint-disable-line
import HeroBanner from "../../components/HeroBanner/HeroBanner";
import LearningBenefits from "../../components/LearningBenifits/LearningBenefits";
import Container from "../../components/Shared/Container";
import FeaturedLessons from "../../components/FeaturedLessons/FeaturedLessons";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";

// Lazy load components that are below the fold
const MostSavedLessons = lazy(() => import("../../components/MostSavedLessons/MostSavedLessons"));
const TopContributors = lazy(() => import("../../components/TopContributors/TopContributors"));
const Statistics = lazy(() => import("../../components/Statistics/Statistics"));
const Testimonials = lazy(() => import("../../components/Testimonials/Testimonials"));
const Newsletter = lazy(() => import("../../components/Newsletter/Newsletter"));
const FAQ = lazy(() => import("../../components/FAQ/FAQ"));
const CallToAction = lazy(() => import("../../components/CallToAction/CallToAction"));

// Simple loading component for lazy loaded sections
const SectionLoader = () => (
  <motion.div 
    className="flex justify-center items-center py-16"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
  >
    <LoadingSpinner />
  </motion.div>
);

// Animation variants for page sections
const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const Home = () => {
  return (
    <motion.div 
      className="min-h-screen -mt-24 pt-24"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Hero Banner - Load immediately */}
      <motion.div 
        className="relative"
        variants={sectionVariants}
      >
        <HeroBanner />
      </motion.div>
      
      <Container>
        {/* Featured Lessons - Load immediately */}
        <motion.div variants={sectionVariants}>
          <FeaturedLessons />
        </motion.div>
        
        {/* Why Learning From Life Matters - Load immediately */}
        <motion.div variants={sectionVariants}>
          <LearningBenefits />
        </motion.div>
        
        {/* Lazy loaded components below the fold */}
        <motion.div variants={sectionVariants}>
          <Suspense fallback={<SectionLoader />}>
            <TopContributors />
          </Suspense>
        </motion.div>
        
        <motion.div variants={sectionVariants}>
          <Suspense fallback={<SectionLoader />}>
            <MostSavedLessons />
          </Suspense>
        </motion.div>
      </Container>
      
      {/* Statistics Section - Lazy loaded */}
      <motion.div variants={sectionVariants}>
        <Suspense fallback={<SectionLoader />}>
          <Statistics />
        </Suspense>
      </motion.div>
      
      {/* Testimonials - Lazy loaded */}
      <motion.div variants={sectionVariants}>
        <Suspense fallback={<SectionLoader />}>
          <Testimonials />
        </Suspense>
      </motion.div>
      
      {/* FAQ Section - Lazy loaded */}
      <motion.div variants={sectionVariants}>
        <Suspense fallback={<SectionLoader />}>
          <FAQ />
        </Suspense>
      </motion.div>
      
      {/* Newsletter Signup - Lazy loaded */}
      <motion.div variants={sectionVariants}>
        <Suspense fallback={<SectionLoader />}>
          <Newsletter />
        </Suspense>
      </motion.div>
      
      {/* Call to Action - Lazy loaded */}
      <motion.div variants={sectionVariants}>
        <Suspense fallback={<SectionLoader />}>
          <CallToAction />
        </Suspense>
      </motion.div>
    </motion.div>
  );
};

export default Home;
