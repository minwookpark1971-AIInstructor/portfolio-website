import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Link, useLocation } from 'react-router-dom';
import { HiStar, HiAcademicCap, HiUsers, HiChartBar } from 'react-icons/hi';
import portfolioData from '../data/portfolio.json';

const Portfolio = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('main');

  const tabs = [
    { id: 'main', label: '주요 강의이력', path: '/portfolio' },
    { id: 'universities', label: '대학', path: '/portfolio/universities' },
    { id: 'public-enterprise', label: '공공기관 & 기업', path: '/portfolio/public-enterprise' },
  ];

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
            주요 강의이력
          </h1>
          <p className="text-lg text-secondary-text">
            출강 이력 및 수강생 피드백
          </p>
        </motion.div>

        {/* Statistics Cards */}
        {portfolioData.statistics && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
          >
            <div className="card bg-white text-center">
              <HiAcademicCap className="w-8 h-8 text-sky-500 mx-auto mb-2" />
              <div className="text-3xl font-bold text-primary-text">
                {portfolioData.statistics.totalUniversities}
              </div>
              <div className="text-sm text-secondary-text">출강 대학</div>
            </div>
            <div className="card bg-white text-center">
              <HiChartBar className="w-8 h-8 text-sky-500 mx-auto mb-2" />
              <div className="text-3xl font-bold text-primary-text">
                {portfolioData.statistics.totalPrograms}
              </div>
              <div className="text-sm text-secondary-text">교육 프로그램</div>
            </div>
            <div className="card bg-white text-center">
              <HiUsers className="w-8 h-8 text-sky-500 mx-auto mb-2" />
              <div className="text-3xl font-bold text-primary-text">
                {portfolioData.statistics.totalStudents}+
              </div>
              <div className="text-sm text-secondary-text">수강생</div>
            </div>
            <div className="card bg-white text-center">
              <HiStar className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
              <div className="text-3xl font-bold text-primary-text">
                {portfolioData.statistics.satisfactionRate}%
              </div>
              <div className="text-sm text-secondary-text">만족도</div>
            </div>
          </motion.div>
        )}

        {/* Tab Navigation */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {tabs.map((tab) => (
            <Link
              key={tab.id}
              to={tab.path}
              className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                location.pathname === tab.path
                  ? 'bg-sky-500 text-white shadow-lg border border-sky-600'
                  : 'bg-white text-secondary-text hover:bg-sky-100 shadow-md'
              }`}
            >
              {tab.label}
            </Link>
          ))}
        </div>

        {/* Main Achievements Tab */}
        {activeTab === 'main' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-12"
          >
            {portfolioData.mainAchievements && portfolioData.mainAchievements.map((achievement, index) => {
              const [ref, inView] = useInView({
                triggerOnce: true,
                threshold: 0.1,
              });

              return (
                <motion.div
                  key={achievement.id}
                  ref={ref}
                  initial={{ opacity: 0, y: 30 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="card bg-white hover:shadow-xl transition-all"
                >
                  <div className="flex flex-col md:flex-row gap-6">
                    {/* Achievement Info */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-2xl font-bold text-primary-text mb-2">
                            {achievement.title}
                          </h3>
                          <p className="text-lg text-secondary-text mb-2">
                            {achievement.description}
                          </p>
                        </div>
                        <div className="flex flex-col items-end">
                          <span className="px-3 py-1 bg-sky-100 text-sky-600 rounded-full text-sm font-semibold mb-2 border border-sky-300">
                            {achievement.type}
                          </span>
                          <span className="text-sm text-secondary-text">
                            {achievement.date}
                          </span>
                        </div>
                      </div>
                      {achievement.details && achievement.details.length > 0 && (
                        <ul className="space-y-2 mb-6">
                          {achievement.details.map((detail, detailIndex) => (
                            <li
                              key={detailIndex}
                              className="flex items-start text-sm text-secondary-text"
                            >
                              <span className="text-primary-accent mr-2">•</span>
                              <span>{detail}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                      <div className="text-sm text-secondary-text">
                        <span className="font-semibold">위치:</span> {achievement.location}
                      </div>
                    </div>
                  </div>

                  {/* Testimonial */}
                  {achievement.testimonial && (
                    <div className="mt-6 pt-6 border-t border-gray-200">
                      <div className="bg-gray-50 rounded-lg p-6">
                        <div className="flex items-center mb-4">
                          <div className="text-3xl text-sky-500">"</div>
                          {achievement.testimonial.rating && (
                            <div className="flex ml-auto">
                              {[...Array(achievement.testimonial.rating)].map((_, i) => (
                                <HiStar
                                  key={i}
                                  className="w-5 h-5 text-yellow-500"
                                />
                              ))}
                            </div>
                          )}
                        </div>
                        <blockquote className="text-secondary-text mb-4 leading-relaxed">
                          {achievement.testimonial.quote}
                        </blockquote>
                        <div className="border-t border-gray-200 pt-4">
                          <cite className="text-sm font-semibold text-primary-text not-italic block mb-1">
                            {achievement.testimonial.author}
                          </cite>
                          <p className="text-xs text-secondary-text">
                            {achievement.testimonial.date}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </motion.div>
        )}

        {/* Universities Tab - 대학 실적만 필터링 */}
        {activeTab === 'universities' && (
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
                                <span className="text-primary-accent mr-2">•</span>
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
          </motion.div>
        )}

        {/* Public & Enterprise Tab - 공공기관 & 기업 실적만 필터링 */}
        {activeTab === 'public-enterprise' && (
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

              // 공공기관 & 기업 실적만 필터링
              const publicEnterpriseEvents = item.events.filter(
                event => event.type === '정부기관' || event.type === '기업'
              );

              if (publicEnterpriseEvents.length === 0) return null;

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
                    {publicEnterpriseEvents.map((event, eventIndex) => (
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
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Portfolio;
