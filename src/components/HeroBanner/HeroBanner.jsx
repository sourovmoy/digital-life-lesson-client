import { Carousel } from "react-responsive-carousel";

const bannerSlides = [
  {
    title: "Discover Life Lessons That Inspire",
    subtitle: "Explore personal growth insights and wisdom from our community.",
    buttonText: "Explore Lessons",
    bgGradient: "from-blue-600 to-indigo-700",
    buttonColor: "text-blue-700",
  },
  {
    title: "Grow, Reflect, and Share Your Wisdom",
    subtitle: "Learn from meaningful lessons and track your personal growth.",
    buttonText: "Start Learning",
    bgGradient: "from-green-500 to-teal-600",
    buttonColor: "text-green-600",
  },
  {
    title: "Join Our Community of Lifelong Learners",
    subtitle:
      "Connect, share, and grow with people passionate about life lessons.",
    buttonText: "Join Now",
    bgGradient: "from-purple-600 to-pink-600",
    buttonColor: "text-purple-600",
  },
];

const HeroBanner = () => {
  return (
    <section className="hero-banner mb-12 relative">
      <Carousel
        autoPlay
        infiniteLoop
        showThumbs={false}
        interval={5000}
        showStatus={false}
      >
        {bannerSlides.map((slide, index) => (
          <div
            key={index}
            className={`relative h-[500px] flex items-center justify-center bg-gradient-to-r ${slide.bgGradient} text-white`}
          >
            <div className="text-center px-4 md:px-0">
              <h2 className="text-4xl md:text-6xl font-extrabold mb-4">
                {slide.title}
              </h2>
              <p className="text-lg md:text-2xl mb-6">{slide.subtitle}</p>
              <button
                className={`bg-white ${slide.buttonColor} font-bold px-6 py-3 rounded-lg shadow-lg hover:bg-gray-100 transition`}
              >
                {slide.buttonText}
              </button>
            </div>
          </div>
        ))}
      </Carousel>
    </section>
  );
};

export default HeroBanner;
