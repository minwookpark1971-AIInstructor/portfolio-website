import { motion } from 'framer-motion';
import Spline from '@splinetool/react-spline';
import profileData from '../data/profile.json';
import scene from '../assets/scene.splinecode';

const Hero = () => {
  return (
    <section className="relative min-h-screen w-full flex flex-col justify-end items-center overflow-hidden bg-white pb-32">
      {/* Spline 3D Background */}
      <div className="absolute inset-0 z-0">
        <Spline scene={scene} />
      </div>

      {/* Overlay Content */}
      <div className="relative z-10 container mx-auto text-center px-4 pointer-events-none">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6 backdrop-blur-sm bg-white/30 p-8 rounded-2xl shadow-lg border border-white/20 inline-block"
        >
          {/* Profile Image */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex justify-center mb-8"
          >
            <div className="w-48 h-48 md:w-64 md:h-64 rounded-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center overflow-hidden shadow-lg border-4 border-white">
              <span className="text-6xl md:text-8xl">👨‍🏫</span>
            </div>
          </motion.div>

          {/* Name */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-4xl md:text-6xl font-bold text-gray-900 drop-shadow-md"
          >
            {profileData.name}
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-xl md:text-2xl text-blue-700 font-bold drop-shadow-sm"
          >
            {profileData.title}
          </motion.p>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-lg text-gray-800 font-medium max-w-2xl mx-auto drop-shadow-sm"
          >
            {profileData.subtitle}
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-base text-gray-700 font-medium max-w-2xl mx-auto"
          >
            SK텔레콤 11년 경력 | 전국 주요 대학 출강 | 정부기관 프로젝트 다수 수행
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;


