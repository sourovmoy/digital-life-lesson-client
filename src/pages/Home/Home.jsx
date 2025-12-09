import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import HeroBanner from "../../components/HeroBanner/HeroBanner";
import LearningBenefits from "../../components/LearningBenifits/LearningBenefits";
import Container from "../../components/Shared/Container";
import FeaturedLessons from "../../components/FeaturedLessons/FeaturedLessons";
import MostSavedLessons from "../../components/MostSavedLessons/MostSavedLessons";
import TopContributors from "../../components/TopContributors/TopContributors";

const Home = () => {
  return (
    <div className="">
      {/* Hero Banner / Carousel */}
      <HeroBanner />
      <Container>
        {/* Featured Lessons */}
        <FeaturedLessons />
        {/* Why Learning From Life Matters */}
        <LearningBenefits />
        {/* Top Contributors */}
        <TopContributors />
        {/* Most Saved Lessons */}
        <MostSavedLessons />
      </Container>
    </div>
  );
};

export default Home;
