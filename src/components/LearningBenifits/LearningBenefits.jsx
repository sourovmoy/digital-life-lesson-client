import {
  FaRegLightbulb,
  FaUsers,
  FaChartLine,
  FaBookOpen,
} from "react-icons/fa";

const benefits = [
  {
    title: "Reflect & Grow",
    description:
      "Preserve your experiences and grow with meaningful reflection.",
    icon: <FaRegLightbulb className="text-indigo-500" />,
  },
  {
    title: "Community Wisdom",
    description: "Explore lessons shared by others and gain new perspectives.",
    icon: <FaUsers className="text-green-500" />,
  },
  {
    title: "Track Progress",
    description:
      "Keep track of your learning journey and see your growth over time.",
    icon: <FaChartLine className="text-yellow-500" />,
  },
  {
    title: "Personal Insights",
    description:
      "Create, store, and revisit your personal life lessons anytime.",
    icon: <FaBookOpen className="text-pink-500" />,
  },
];

const LearningBenefits = () => {
  return (
    <section className="learning-benefit mb-12 sm:mb-16">
      <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-center">
        Why Learning From Life Matters
      </h3>
      <p className="text-center text-sm sm:text-base text-base-content/70 mb-8 sm:mb-12 max-w-2xl mx-auto px-4">
        Life lessons are everywhere. Discover, reflect, and grow with insights
        shared by our community of lifelong learners.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
        {benefits.map((benefit, index) => (
          <div
            key={index}
            className="benefit-card p-4 sm:p-6 lg:p-8 bg-base-200 rounded-xl shadow-lg text-center transition-transform transform hover:-translate-y-3 hover:shadow-2xl hover:bg-secondary/10 duration-300 border border-base-300"
          >
            <div className="text-2xl sm:text-3xl lg:text-4xl mb-3 sm:mb-4 mx-auto">
              {benefit.icon}
            </div>
            <h4 className="font-bold text-lg sm:text-xl mb-2 sm:mb-3 text-base-content">
              {benefit.title}
            </h4>
            <p className="text-sm sm:text-base text-base-content/70">{benefit.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default LearningBenefits;
