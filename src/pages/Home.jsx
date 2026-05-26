import Hero from '../components/Hero';
import NumbersBar from '../components/NumbersBar';
import AboutSection from '../components/AboutSection';
import InstitutionsBadgeGrid from '../components/InstitutionsBadgeGrid';
import QuickLinks from '../components/QuickLinks';
import FeaturedTestimonials from '../components/FeaturedTestimonials';
import FeaturedVideo from '../components/FeaturedVideo';

const Home = () => {
  return (
    <div>
      <Hero />
      <NumbersBar />
      <AboutSection />
      <InstitutionsBadgeGrid />
      <QuickLinks />
      <FeaturedTestimonials />
      <FeaturedVideo />
    </div>
  );
};

export default Home;
