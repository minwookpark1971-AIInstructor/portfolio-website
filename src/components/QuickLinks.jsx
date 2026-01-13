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
      <div className="container mx-auto max-w-4xl">
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {links.map((link, index) => (
            <motion.div
              key={link.path}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link
                to={link.path}
                className="block text-center py-4 px-8 rounded-lg font-semibold transition-all duration-300 border-2 border-sky-300 text-sky-600 hover:bg-sky-100 hover:border-sky-400"
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


