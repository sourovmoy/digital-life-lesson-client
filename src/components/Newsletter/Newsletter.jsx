import { useState } from "react";
import { FaEnvelope, FaCheckCircle } from "react-icons/fa";
import toast from "react-hot-toast";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email) {
      toast.error("Please enter your email address");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubscribed(true);
      setIsLoading(false);
      toast.success("Successfully subscribed to our newsletter!");
      setEmail("");
    }, 1000);
  };

  if (isSubscribed) {
    return (
      <section className="newsletter-section py-12 sm:py-16 bg-gradient-to-r from-primary to-secondary">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <div className="max-w-2xl mx-auto">
            <FaCheckCircle className="text-4xl sm:text-5xl md:text-6xl text-primary-content mx-auto mb-4 sm:mb-6" />
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary-content mb-3 sm:mb-4">
              Thank You for Subscribing!
            </h2>
            <p className="text-base sm:text-lg text-primary-content/90 mb-4 sm:mb-6 px-4">
              You'll receive our weekly digest of the most inspiring life lessons and community highlights.
            </p>
            <button
              onClick={() => setIsSubscribed(false)}
              className="bg-primary-content text-primary px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg font-semibold hover:bg-primary-content/90 transition-colors text-sm sm:text-base"
            >
              Subscribe Another Email
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="newsletter-section py-12 sm:py-16 bg-gradient-to-r from-primary to-secondary">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-2xl mx-auto text-center">
          <FaEnvelope className="text-3xl sm:text-4xl md:text-5xl text-primary-content mx-auto mb-4 sm:mb-6" />
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary-content mb-3 sm:mb-4">
            Stay Inspired Weekly
          </h2>
          <p className="text-base sm:text-lg text-primary-content/90 mb-6 sm:mb-8 px-4">
            Get the best life lessons, community highlights, and personal growth tips delivered to your inbox every week.
          </p>
          
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 sm:gap-4 max-w-lg mx-auto">
            <div className="flex-1">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg bg-primary-content text-primary placeholder-primary/60 focus:outline-none focus:ring-2 focus:ring-primary-content/50 border-2 border-transparent text-sm sm:text-base"
                disabled={isLoading}
              />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="px-4 sm:px-6 py-2.5 sm:py-3 bg-primary-content text-primary font-semibold rounded-lg hover:bg-primary-content/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm sm:text-base whitespace-nowrap"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-3 w-3 sm:h-4 sm:w-4 border-2 border-primary border-t-transparent"></div>
                  <span className="hidden sm:inline">Subscribing...</span>
                  <span className="sm:hidden">...</span>
                </>
              ) : (
                "Subscribe"
              )}
            </button>
          </form>
          
          <p className="text-xs sm:text-sm text-primary-content/70 mt-3 sm:mt-4 px-4">
            No spam, unsubscribe at any time. We respect your privacy.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;