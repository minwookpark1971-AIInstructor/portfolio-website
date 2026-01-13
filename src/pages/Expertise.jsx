import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { HiChevronDown, HiChevronUp } from 'react-icons/hi';
import expertiseData from '../data/expertise.json';

const Expertise = () => {
  const [expandedCategory, setExpandedCategory] = useState(null);

  const toggleCategory = (categoryId) => {
    setExpandedCategory(expandedCategory === categoryId ? null : categoryId);
  };

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
            강의분야
          </h1>
          <p className="text-lg text-secondary-text">
            전문 분야별 맞춤형 교육 프로그램
          </p>
        </motion.div>

        {/* Categories */}
        <div className="space-y-6">
          {expertiseData.categories.map((category, index) => {
            const [ref, inView] = useInView({
              triggerOnce: true,
              threshold: 0.1,
            });
            const isExpanded = expandedCategory === category.id;

            return (
              <motion.div
                key={category.id}
                ref={ref}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="card cursor-pointer"
                onClick={() => toggleCategory(category.id)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <span className="text-4xl">{category.icon}</span>
                    <div>
                      <h2 className="text-2xl font-bold text-primary-text mb-2">
                        {category.title}
                      </h2>
                      <p className="text-secondary-text">{category.description}</p>
                    </div>
                  </div>
                  <motion.div
                    animate={{ rotate: isExpanded ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {isExpanded ? (
                      <HiChevronUp className="w-6 h-6 text-primary-accent" />
                    ) : (
                      <HiChevronDown className="w-6 h-6 text-primary-accent" />
                    )}
                  </motion.div>
                </div>

                {/* Expanded Content */}
                <motion.div
                  initial={false}
                  animate={{
                    height: isExpanded ? 'auto' : 0,
                    opacity: isExpanded ? 1 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {category.programs.map((program, programIndex) => (
                        <motion.div
                          key={programIndex}
                          initial={{ opacity: 0, y: 10 }}
                          animate={
                            isExpanded
                              ? { opacity: 1, y: 0 }
                              : { opacity: 0, y: 10 }
                          }
                          transition={{
                            duration: 0.3,
                            delay: programIndex * 0.1,
                          }}
                          className="p-4 bg-secondary-bg rounded-lg"
                        >
                          <h3 className="text-lg font-semibold text-primary-text mb-2">
                            {program.name}
                          </h3>
                          <p className="text-sm text-secondary-text">
                            {program.description}
                          </p>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16 text-center"
        >
          <div className="card bg-gradient-to-r from-primary-accent to-blue-600 text-white">
            <h3 className="text-2xl font-bold mb-4">
              맞춤형 강의 프로그램이 필요하신가요?
            </h3>
            <p className="mb-6 text-blue-100">
              기관 및 기업의 특성에 맞는 커스터마이징 강의를 제공합니다.
            </p>
            <a
              href="/contact"
              className="inline-block bg-white text-primary-accent px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
            >
              강의 문의하기
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Expertise;


