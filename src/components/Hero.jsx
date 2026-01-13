import { useState, useEffect, Suspense, lazy } from 'react';
import { motion } from 'framer-motion';
import profileData from '../data/profile.json';
import scene from '../assets/scene.splinecode';

// Spline 컴포넌트를 lazy loading으로 변경하여 초기 로딩 블로킹 방지
const Spline = lazy(() =>
  import('@splinetool/react-spline').catch(() => {
    // Spline 로딩 실패 시 fallback 컴포넌트 반환
    return { default: () => null };
  })
);

// Spline 래퍼 컴포넌트로 에러 핸들링 강화
const SplineWrapper = ({ scene, onError, onLoad }) => {
  useEffect(() => {
    // 컴포넌트가 마운트된 후에도 에러가 발생할 수 있으므로
    // 전역 에러 핸들러 설정
    const handleError = (event) => {
      if (event.error && event.error.message && event.error.message.includes('spline')) {
        onError(event.error);
      }
    };

    window.addEventListener('error', handleError);
    return () => window.removeEventListener('error', handleError);
  }, [onError]);

  return (
    <Spline
      scene={scene}
      onError={onError}
      onLoad={onLoad}
    />
  );
};

// 프로필 이미지 표시 컴포넌트
const ProfileImageDisplay = ({ name }) => {
  const [imageError, setImageError] = useState(false);
  const basePath = import.meta.env.BASE_URL || '/';
  const imageSrc = `${basePath}images/profile.png`.replace(/\/\//g, '/');

  if (!imageError) {
    return (
      <div className="w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden shadow-lg border-4 border-white">
        <img
          src={imageSrc}
          alt={name}
          className="w-full h-full object-cover"
          onError={() => setImageError(true)}
        />
      </div>
    );
  }

  return (
    <div className="w-48 h-48 md:w-64 md:h-64 rounded-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center overflow-hidden shadow-lg border-4 border-white">
      <span className="text-6xl md:text-8xl">👨‍🏫</span>
    </div>
  );
};

const Hero = () => {
  const [splineError, setSplineError] = useState(false);
  const [splineLoaded, setSplineLoaded] = useState(false);

  // 타임아웃 제거 - Spline이 계속 로딩되도록 유지
  // 에러가 발생했을 때만 fallback 표시
  const handleSplineError = (error) => {
    console.error('Spline loading error:', error);
    setSplineError(true);
  };

  const handleSplineLoad = () => {
    setSplineLoaded(true);
  };

  return (
    <>
      {/* Spline 3D Background - 상단에만 표시 */}
      <section className="relative w-full h-[60vh] md:h-[70vh] overflow-hidden bg-black">
        <div className="absolute inset-0 z-0 w-full h-full">
          {!splineError ? (
            <Suspense fallback={
              <div className="w-full h-full bg-black flex items-center justify-center">
                <div className="w-8 h-8 border-4 border-gray-600 border-t-white rounded-full animate-spin"></div>
              </div>
            }>
              <SplineWrapper
                scene={scene}
                onError={handleSplineError}
                onLoad={handleSplineLoad}
              />
            </Suspense>
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-gray-900 to-black" />
          )}
        </div>
      </section>

      {/* Content Area - Spline 아래에 일반 흐름으로 배치 */}
      <section className="relative w-full bg-white py-12 md:py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center space-y-6"
          >
            {/* Profile Image */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex justify-center mb-8"
            >
              <ProfileImageDisplay name={profileData.name} />
            </motion.div>

            {/* Name */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-4xl md:text-6xl font-bold text-gray-900"
            >
              {profileData.name}
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-xl md:text-2xl text-sky-600 font-bold"
            >
              {profileData.title}
            </motion.p>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-lg text-gray-800 font-medium max-w-2xl mx-auto"
            >
              {profileData.subtitle}
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="text-base text-sky-600 font-medium max-w-2xl mx-auto"
            >
              SK텔레콤 11년 경력 | 전국 주요 대학 출강 | 정부기관 프로젝트 다수 수행
            </motion.p>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Hero;
