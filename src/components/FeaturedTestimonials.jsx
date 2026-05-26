import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { HiStar } from 'react-icons/hi';
import portfolioData from '../data/portfolio.json';

const FeaturedTestimonials = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const items = (portfolioData.testimonials || []).slice(0, 3);

  if (items.length === 0) return null;

  return (
    <section ref={ref} className="py-16 md:py-20 px-4 bg-secondary-bg">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 md:mb-12"
        >
          <p className="text-sm md:text-base text-sky-600 font-semibold tracking-wide mb-2">
            TESTIMONIALS
          </p>
          <h2 className="text-2xl md:text-4xl font-bold text-primary-text">
            수강생들의 진솔한 후기
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {items.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-white rounded-2xl p-6 md:p-8 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col"
            >
              <div className="flex gap-0.5 mb-4">
                {Array.from({ length: t.rating || 5 }).map((_, idx) => (
                  <HiStar key={idx} className="w-5 h-5 text-yellow-400" />
                ))}
              </div>
              <blockquote className="text-primary-text leading-relaxed text-sm md:text-base flex-1">
                <span className="text-sky-400 text-3xl leading-none align-top mr-1">“</span>
                {t.quote}
              </blockquote>
              <footer className="mt-5 pt-4 border-t border-gray-100">
                <p className="font-semibold text-primary-text text-sm">{t.author}</p>
                {t.date && (
                  <p className="text-xs text-secondary-text mt-0.5">{t.date}</p>
                )}
              </footer>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedTestimonials;
