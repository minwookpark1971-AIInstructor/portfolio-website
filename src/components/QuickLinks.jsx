import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';

const QuickLinks = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const links = [
    { path: '/profile', label: '프로필 보기', variant: 'primary' },
    { path: '/expertise', label: '강의분야', variant: 'secondary' },
    { path: '/portfolio', label: '실적', variant: 'secondary' },
    { path: '/contact', label: '강의 문의', variant: 'accent' },
  ];

  return (
    <section ref={ref} className="py-20 px-4 bg-white">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-primary-text mb-4">
            빠른 링크
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {links.map((link, index) => (
            <motion.div
              key={link.path}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link
                to={link.path}
                className="block text-center py-6 px-4 rounded-lg font-semibold transition-all duration-300 bg-white border-2 border-gray-300 text-primary-text shadow-sm hover:bg-gray-100 hover:border-gray-500 hover:shadow-md hover:-translate-y-0.5"
              >
                {link.label}
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default QuickLinks;


