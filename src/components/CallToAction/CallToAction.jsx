import { Link } from "react-router";
import { FaArrowRight, FaUsers, FaBookOpen, FaHeart } from "react-icons/fa";
import useAuth from "../../hooks/useAuth";

const CallToAction = () => {
  const { user } = useAuth();

  return (
    <section className="cta-section py-12 sm:py-16 bg-gradient-to-br from-primary/10 via-base-100 to-secondary/10">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-base-content mb-4 sm:mb-6">
            Ready to Share Your Wisdom?
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-base-content/70 mb-6 sm:mb-8 max-w-2xl mx-auto px-4">
            Join thousands of learners who are transforming lives through shared experiences. 
            Your story could be the lesson someone needs to hear today.
          </p>

          {/* Feature highlights */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-10">
            <div className="flex flex-col items-center p-4 sm:p-6 bg-base-200 rounded-xl border border-base-300">
              <FaUsers className="text-2xl sm:text-3xl text-primary mb-2 sm:mb-3" />
              <h3 className="font-semibold text-sm sm:text-base text-base-content mb-1 sm:mb-2">Join Community</h3>
              <p className="text-xs sm:text-sm text-base-content/70 text-center">
                Connect with like-minded learners from around the world
              </p>
            </div>
            
            <div className="flex flex-col items-center p-4 sm:p-6 bg-base-200 rounded-xl border border-base-300">
              <FaBookOpen className="text-2xl sm:text-3xl text-secondary mb-2 sm:mb-3" />
              <h3 className="font-semibold text-sm sm:text-base text-base-content mb-1 sm:mb-2">Share Lessons</h3>
              <p className="text-xs sm:text-sm text-base-content/70 text-center">
                Document and share your most valuable life experiences
              </p>
            </div>
            
            <div className="flex flex-col items-center p-4 sm:p-6 bg-base-200 rounded-xl border border-base-300 sm:col-span-2 md:col-span-1">
              <FaHeart className="text-2xl sm:text-3xl text-error mb-2 sm:mb-3" />
              <h3 className="font-semibold text-sm sm:text-base text-base-content mb-1 sm:mb-2">Make Impact</h3>
              <p className="text-xs sm:text-sm text-base-content/70 text-center">
                Help others learn and grow from your experiences
              </p>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
            {user ? (
              <>
                <Link
                  to="/dashboard/add-lesson"
                  className="w-full sm:w-auto bg-primary text-primary-content px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold text-base sm:text-lg hover:bg-secondary transition-colors flex items-center justify-center gap-2 shadow-lg"
                >
                  Share Your First Lesson
                  <FaArrowRight className="text-sm" />
                </Link>
                <Link
                  to="/public-lessons"
                  className="w-full sm:w-auto bg-base-200 text-base-content px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold text-base sm:text-lg hover:bg-base-300 transition-colors border border-base-300"
                >
                  Explore Lessons
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/signup"
                  className="w-full sm:w-auto bg-primary text-primary-content px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold text-base sm:text-lg hover:bg-secondary transition-colors flex items-center justify-center gap-2 shadow-lg"
                >
                  Get Started Free
                  <FaArrowRight className="text-sm" />
                </Link>
                <Link
                  to="/public-lessons"
                  className="w-full sm:w-auto bg-base-200 text-base-content px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold text-base sm:text-lg hover:bg-base-300 transition-colors border border-base-300"
                >
                  Browse Lessons
                </Link>
              </>
            )}
          </div>

          {/* Trust indicators */}
          <div className="mt-8 sm:mt-10 pt-6 sm:pt-8 border-t border-base-300">
            <p className="text-xs sm:text-sm text-base-content/60 mb-3 sm:mb-4">
              Trusted by learners worldwide
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-8 text-base-content/40">
              <span className="text-xs sm:text-sm">🔒 Secure & Private</span>
              <span className="text-xs sm:text-sm">✨ Community Moderated</span>
              <span className="text-xs sm:text-sm">🚀 Always Free to Start</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;