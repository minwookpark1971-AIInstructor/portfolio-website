import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import profileData from '../data/profile.json';

const FeaturedVideo = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section ref={ref} className="py-20 px-4 bg-secondary-bg">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h3 className="text-3xl md:text-4xl font-bold text-primary-text mb-8">
            {profileData.featuredVideo.title}
          </h3>
          <div className="aspect-video rounded-lg overflow-hidden shadow-xl">
            <iframe
              width="100%"
              height="100%"
              src={profileData.featuredVideo.url}
              title={profileData.featuredVideo.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            ></iframe>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedVideo;


