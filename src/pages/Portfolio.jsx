import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import portfolioData from '../data/portfolio.json';

const Portfolio = () => {
  const [activeTab, setActiveTab] = useState('timeline');

  const tabs = [
    { id: 'timeline', label: '2024년 실적' },
    { id: 'universities', label: '대학' },
    { id: 'testimonials', label: '피드백' },
  ];

  return (
    <div className="min-h-screen bg-white py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Page Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-primary-text mb-4">
            실적
          </h1>
          <p className="text-lg text-secondary-text">
            출강 실적 및 수강생 피드백
          </p>
        </motion.div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                activeTab === tab.id
                  ? 'bg-primary-accent text-white shadow-lg'
                  : 'bg-secondary-bg text-secondary-text hover:bg-gray-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Timeline Tab */}
        {activeTab === 'timeline' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            {portfolioData.timeline.map((item, index) => {
              const [ref, inView] = useInView({
                triggerOnce: true,
                threshold: 0.1,
              });

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
                      <h3 className="text-xl font-bold text-primary-accent">
                        {item.month}
                      </h3>
                    </div>
                  </div>

                  {/* Events */}
                  <div className="flex-1 space-y-4">
                    {item.events.map((event, eventIndex) => (
                      <motion.div
                        key={eventIndex}
                        initial={{ opacity: 0, y: 20 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{
                          duration: 0.5,
                          delay: index * 0.1 + eventIndex * 0.1,
                        }}
                        className="card relative pl-8 border-l-4 border-primary-accent"
                      >
                        <span className="absolute -left-2 top-4 w-4 h-4 bg-primary-accent rounded-full"></span>
                        <h4 className="text-xl font-semibold text-primary-text mb-2">
                          {event.title}
                        </h4>
                        <p className="text-secondary-text mb-3">
                          {event.description}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          <span className="px-3 py-1 bg-blue-100 text-primary-accent rounded-full text-sm font-semibold">
                            {event.type}
                          </span>
                          <span className="px-3 py-1 bg-gray-100 text-secondary-text rounded-full text-sm">
                            {event.location}
                          </span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        )}

        {/* Universities Tab */}
        {activeTab === 'universities' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {portfolioData.universities.map((university, index) => {
              const [ref, inView] = useInView({
                triggerOnce: true,
                threshold: 0.1,
              });

              return (
                <motion.div
                  key={index}
                  ref={ref}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="card text-center"
                >
                  <div className="text-4xl mb-4">🏫</div>
                  <h3 className="text-xl font-bold text-primary-text">
                    {university}
                  </h3>
                </motion.div>
              );
            })}
          </motion.div>
        )}

        {/* Testimonials Tab */}
        {activeTab === 'testimonials' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {portfolioData.testimonials.map((testimonial, index) => {
              const [ref, inView] = useInView({
                triggerOnce: true,
                threshold: 0.1,
              });

              return (
                <motion.div
                  key={index}
                  ref={ref}
                  initial={{ opacity: 0, y: 30 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="card"
                >
                  <div className="text-4xl text-primary-accent mb-4">"</div>
                  <blockquote className="text-secondary-text mb-4 leading-relaxed">
                    {testimonial.quote}
                  </blockquote>
                  <cite className="text-sm font-semibold text-primary-text not-italic">
                    — {testimonial.author}
                  </cite>
                  <p className="text-xs text-secondary-text mt-2">
                    {testimonial.date}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Portfolio;


