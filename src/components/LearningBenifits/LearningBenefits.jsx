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
    icon: <FaRegLightbulb className="text-4xl text-indigo-500 mb-4 mx-auto" />,
  },
  {
    title: "Community Wisdom",
    description: "Explore lessons shared by others and gain new perspectives.",
    icon: <FaUsers className="text-4xl text-green-500 mb-4 mx-auto" />,
  },
  {
    title: "Track Progress",
    description:
      "Keep track of your learning journey and see your growth over time.",
    icon: <FaChartLine className="text-4xl text-yellow-500 mb-4 mx-auto" />,
  },
  {
    title: "Personal Insights",
    description:
      "Create, store, and revisit your personal life lessons anytime.",
    icon: <FaBookOpen className="text-4xl text-pink-500 mb-4 mx-auto" />,
  },
];

const LearningBenefits = () => {
  return (
    <section className="learning-benefit mb-16">
      <h3 className="text-2xl font-bold mb-4 text-center">
        Why Learning From Life Matters
      </h3>
      <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
        Life lessons are everywhere. Discover, reflect, and grow with insights
        shared by our community of lifelong learners.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {benefits.map((benefit, index) => (
          <div
            key={index}
            className="benefit-card p-8 bg-white rounded-xl shadow-lg text-center transition-transform transform hover:-translate-y-3 hover:shadow-2xl duration-300"
          >
            {benefit.icon}
            <h4 className="font-bold text-xl mb-3 text-gray-800">
              {benefit.title}
            </h4>
            <p className="text-gray-600">{benefit.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default LearningBenefits;
