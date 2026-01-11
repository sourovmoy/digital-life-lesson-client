import { Link } from "react-router";
import { FaArrowRight, FaUsers, FaBookOpen, FaHeart } from "react-icons/fa";
import useAuth from "../../hooks/useAuth";

const CallToAction = () => {
  const { user } = useAuth();

  return (
    <section className="cta-section py-16 bg-gradient-to-br from-primary/10 via-base-100 to-secondary/10">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-base-content mb-6">
            Ready to Share Your Wisdom?
          </h2>
          <p className="text-lg md:text-xl text-base-content/70 mb-8 max-w-2xl mx-auto">
            Join thousands of learners who are transforming lives through shared experiences. 
            Your story could be the lesson someone needs to hear today.
          </p>

          {/* Feature highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <div className="flex flex-col items-center p-6 bg-base-200 rounded-xl border border-base-300">
              <FaUsers className="text-3xl text-primary mb-3" />
              <h3 className="font-semibold text-base-content mb-2">Join Community</h3>
              <p className="text-sm text-base-content/70 text-center">
                Connect with like-minded learners from around the world
              </p>
            </div>
            
            <div className="flex flex-col items-center p-6 bg-base-200 rounded-xl border border-base-300">
              <FaBookOpen className="text-3xl text-secondary mb-3" />
              <h3 className="font-semibold text-base-content mb-2">Share Lessons</h3>
              <p className="text-sm text-base-content/70 text-center">
                Document and share your most valuable life experiences
              </p>
            </div>
            
            <div className="flex flex-col items-center p-6 bg-base-200 rounded-xl border border-base-300">
              <FaHeart className="text-3xl text-error mb-3" />
              <h3 className="font-semibold text-base-content mb-2">Make Impact</h3>
              <p className="text-sm text-base-content/70 text-center">
                Help others learn and grow from your experiences
              </p>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            {user ? (
              <>
                <Link
                  to="/dashboard/add-lesson"
                  className="bg-primary text-primary-content px-8 py-4 rounded-lg font-semibold text-lg hover:bg-secondary transition-colors flex items-center gap-2 shadow-lg"
                >
                  Share Your First Lesson
                  <FaArrowRight />
                </Link>
                <Link
                  to="/public-lessons"
                  className="bg-base-200 text-base-content px-8 py-4 rounded-lg font-semibold text-lg hover:bg-base-300 transition-colors border border-base-300"
                >
                  Explore Lessons
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/signup"
                  className="bg-primary text-primary-content px-8 py-4 rounded-lg font-semibold text-lg hover:bg-secondary transition-colors flex items-center gap-2 shadow-lg"
                >
                  Get Started Free
                  <FaArrowRight />
                </Link>
                <Link
                  to="/public-lessons"
                  className="bg-base-200 text-base-content px-8 py-4 rounded-lg font-semibold text-lg hover:bg-base-300 transition-colors border border-base-300"
                >
                  Browse Lessons
                </Link>
              </>
            )}
          </div>

          {/* Trust indicators */}
          <div className="mt-10 pt-8 border-t border-base-300">
            <p className="text-sm text-base-content/60 mb-4">
              Trusted by learners worldwide
            </p>
            <div className="flex justify-center items-center gap-8 text-base-content/40">
              <span className="text-sm">🔒 Secure & Private</span>
              <span className="text-sm">✨ Community Moderated</span>
              <span className="text-sm">🚀 Always Free to Start</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;