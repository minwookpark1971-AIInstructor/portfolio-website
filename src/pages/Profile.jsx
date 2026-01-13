import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { HiAcademicCap, HiBriefcase, HiCheckCircle } from 'react-icons/hi';
import profileData from '../data/profile.json';

const Profile = () => {
  const [ref1, inView1] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [ref2, inView2] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [ref3, inView3] = useInView({ triggerOnce: true, threshold: 0.1 });

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
            프로필
          </h1>
          <p className="text-lg text-secondary-text">
            박민욱 강사의 학력, 경력 및 강의 특징
          </p>
        </motion.div>

        {/* Education Section */}
        <motion.section
          ref={ref1}
          initial={{ opacity: 0, y: 30 }}
          animate={inView1 ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="card">
            <div className="flex items-center mb-6">
              <HiAcademicCap className="w-8 h-8 text-primary-accent mr-3" />
              <h2 className="text-3xl font-bold text-primary-text">학력</h2>
            </div>
            <div className="space-y-4">
              {profileData.education.map((edu, index) => (
                <div
                  key={index}
                  className="border-l-4 border-primary-accent pl-6 py-2"
                >
                  <h3 className="text-xl font-semibold text-primary-text">
                    {edu.institution}
                  </h3>
                  <p className="text-secondary-text">{edu.degree}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Career Section */}
        <motion.section
          ref={ref2}
          initial={{ opacity: 0, y: 30 }}
          animate={inView2 ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="card">
            <div className="flex items-center mb-6">
              <HiBriefcase className="w-8 h-8 text-primary-accent mr-3" />
              <h2 className="text-3xl font-bold text-primary-text">주요 경력</h2>
            </div>

            {/* Company Experience */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-primary-text mb-4">
                기업 실무 경력
              </h3>
              {profileData.career.companies.map((company, index) => (
                <div
                  key={index}
                  className="border-l-4 border-primary-accent pl-6 py-4 mb-4"
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                    <h4 className="text-lg font-semibold text-primary-text">
                      {company.company}
                    </h4>
                    <span className="text-secondary-text text-sm">
                      {company.period}
                    </span>
                  </div>
                  <p className="text-secondary-text mb-2">{company.position}</p>
                  <p className="text-secondary-text text-sm">
                    {company.description}
                  </p>
                </div>
              ))}
            </div>

            {/* Current Position */}
            <div className="border-t pt-6">
              <h3 className="text-xl font-semibold text-primary-text mb-4">
                현재 활동
              </h3>
              <div className="border-l-4 border-secondary-accent pl-6 py-4">
                <h4 className="text-lg font-semibold text-primary-text mb-2">
                  {profileData.career.current.company}
                </h4>
                <p className="text-secondary-text mb-2">
                  {profileData.career.current.position}
                </p>
                <p className="text-secondary-text text-sm">
                  {profileData.career.current.description}
                </p>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Lecture Features */}
        <motion.section
          ref={ref3}
          initial={{ opacity: 0, y: 30 }}
          animate={inView3 ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="card">
            <div className="flex items-center mb-6">
              <HiCheckCircle className="w-8 h-8 text-primary-accent mr-3" />
              <h2 className="text-3xl font-bold text-primary-text">강의 특징</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {profileData.features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView3 ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex items-center space-x-3 p-4 bg-secondary-bg rounded-lg"
                >
                  <HiCheckCircle className="w-5 h-5 text-secondary-accent flex-shrink-0" />
                  <span className="text-secondary-text">{feature}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  );
};

export default Profile;


