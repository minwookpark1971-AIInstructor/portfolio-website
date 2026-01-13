import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import portfolioData from '../data/portfolio.json';

const Universities = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-secondary-bg py-12 md:py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Page Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-primary-text mb-4">
            대학 실적
          </h1>
          <p className="text-lg text-secondary-text">
            대학 출강 실적 및 교육 프로그램
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="space-y-8">
          {portfolioData.timeline.map((item, index) => {
            const [ref, inView] = useInView({
              triggerOnce: true,
              threshold: 0.1,
            });

            // 대학 실적만 필터링
            const universityEvents = item.events.filter(event => event.type === '대학');

            if (universityEvents.length === 0) return null;

            return (
              <motion.div
                key={item.month}
                ref={ref}
                initial={{ opacity: 0, x: -30 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="flex flex-col md:flex-row"
              >
                {/* Date */}
                <div className="md:w-32 flex-shrink-0 mb-4 md:mb-0">
                  <div className="sticky top-20">
                      <h3 className="text-xl font-bold text-sky-600">
                      {item.month}
                    </h3>
                  </div>
                </div>

                {/* Events */}
                <div className="flex-1 space-y-4">
                  {universityEvents.map((event, eventIndex) => (
                    <motion.div
                      key={eventIndex}
                      initial={{ opacity: 0, y: 20 }}
                      animate={inView ? { opacity: 1, y: 0 } : {}}
                      transition={{
                        duration: 0.5,
                        delay: index * 0.1 + eventIndex * 0.1,
                      }}
                        className="card bg-white relative pl-8 border-l-4 border-sky-400 hover:shadow-lg transition-shadow"
                    >
                        <span className="absolute -left-2 top-4 w-4 h-4 bg-sky-400 rounded-full border border-sky-500"></span>
                      <h4 className="text-xl font-semibold text-primary-text mb-2">
                        {event.title}
                      </h4>
                      <p className="text-secondary-text mb-3">
                        {event.description}
                      </p>
                      {event.details && event.details.length > 0 && (
                        <ul className="space-y-2 mb-3">
                          {event.details.map((detail, detailIndex) => (
                            <li
                              key={detailIndex}
                              className="flex items-start text-sm text-secondary-text"
                            >
                                <span className="text-sky-500 mr-2">•</span>
                              <span>{detail}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                      <div className="flex flex-wrap gap-2">
                          <span className="px-3 py-1 bg-sky-100 text-sky-600 rounded-full text-sm font-semibold border border-sky-300">
                          {event.type}
                        </span>
                        <span className="px-3 py-1 bg-sky-100 text-secondary-text rounded-full text-sm">
                          {event.location}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Universities;
