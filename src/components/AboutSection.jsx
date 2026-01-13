import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import profileData from '../data/profile.json';
import ValueCard from './ValueCard';

const AboutSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section ref={ref} className="py-20 px-4 bg-secondary-bg">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-primary-text mb-6">
            강사 소개
          </h2>
          <p className="text-lg text-secondary-text max-w-3xl mx-auto leading-relaxed">
            {profileData.description}
          </p>
        </motion.div>

        {/* Core Values */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          {profileData.coreValues.map((value, index) => (
            <ValueCard
              key={index}
              value={value}
              index={index}
              inView={inView}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;


