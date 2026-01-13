import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  HiAcademicCap, 
  HiBriefcase, 
  HiCheckCircle, 
  HiUser,
  HiOfficeBuilding,
  HiSparkles,
  HiChevronDown,
  HiChevronUp
} from 'react-icons/hi';
import profileData from '../data/profile.json';

// 핵심가치 아이콘 매핑 함수
const getCoreValueIcon = (title) => {
  switch (title) {
    case '실무 중심':
      return <HiBriefcase className="w-12 h-12 mx-auto text-sky-500" />;
    case '맞춤형 교육':
      return <HiAcademicCap className="w-12 h-12 mx-auto text-sky-500" />;
    case '최신 트렌드':
      return <HiSparkles className="w-12 h-12 mx-auto text-sky-500" />;
    case '검증된 실적':
      return <HiCheckCircle className="w-12 h-12 mx-auto text-sky-500" />;
    default:
      return <HiCheckCircle className="w-12 h-12 mx-auto text-sky-500" />;
  }
};

// 프로필 이미지 표시 컴포넌트
const ProfileImageDisplay = ({ name }) => {
  const [imageSrc, setImageSrc] = useState(null);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    const extensions = ['png', 'jpg', 'jpeg', 'webp'];
    let found = false;
    let checkedCount = 0;
    
    extensions.forEach((ext) => {
      if (found) return;
      
      const imgPath = `/images/profile.${ext}`;
      const img = new Image();
      
      img.onload = () => {
        if (!found) {
          found = true;
          setImageSrc(imgPath);
          setImageError(false);
        }
      };
      
      img.onerror = () => {
        checkedCount++;
        if (checkedCount === extensions.length && !found) {
          setImageError(true);
        }
      };
      
      img.src = imgPath;
    });
  }, []);

  if (imageSrc && !imageError) {
    return (
      <div className="w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden shadow-xl border-4 border-white mx-auto">
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
    <div className="w-48 h-48 md:w-64 md:h-64 rounded-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center overflow-hidden shadow-xl border-4 border-white mx-auto">
      <span className="text-6xl md:text-8xl">👨‍🏫</span>
    </div>
  );
};

const Profile = () => {
  const [ref1, inView1] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [ref2, inView2] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [ref3, inView3] = useInView({ triggerOnce: true, threshold: 0.1 });
  
  // 주요경력 확장 상태 관리
  const [expandedCareer, setExpandedCareer] = useState(null);
  
  // 핵심가치 호버 상태 관리
  const [hoveredValue, setHoveredValue] = useState(null);

  // 경력 상세 정보 (Notion 페이지 내용을 기반으로 확장 가능)
  const careerDetails = {
    'SK텔레콤': {
      title: 'SK텔레콤 상세 경력',
      details: [
        '모바일사업부 상품기획 및 전략마케팅 전문가',
        '11년간의 풍부한 실무 경험',
        '다양한 모바일 서비스 기획 및 출시',
        '시장 분석 및 경쟁 전략 수립',
        '신규 비즈니스 모델 개발',
        '고객 니즈 분석 및 제품 기획',
        '마케팅 전략 수립 및 실행'
      ]
    },
    '이룸아카데미': {
      title: '이룸아카데미 상세 활동',
      details: [
        'AI 교육 및 취업 컨설팅 전문 교육기관 운영',
        '대학 및 기관 대상 맞춤형 교육 프로그램 제공',
        'AI 활용 교육 커리큘럼 개발',
        '취업 컨설팅 및 경력 개발 프로그램 운영',
        '영상 제작 교육 프로그램 제공'
      ]
    }
  };

  // 핵심가치 상세 정보
  const coreValueDetails = {
    '실무 중심': {
      description: '현장 노하우 전수',
      details: [
        '11년간의 SK텔레콤 실무 경험 기반',
        '실제 업무에서 바로 활용 가능한 노하우',
        '실무 사례 중심의 교육 내용',
        '현장에서 검증된 방법론 제시'
      ]
    },
    '맞춤형 교육': {
      description: '커스터마이징 설계',
      details: [
        '기관 및 기업의 특성에 맞는 프로그램',
        '수강생 수준에 따른 차별화된 교육',
        '요구사항 분석을 통한 맞춤 설계',
        '유연한 커리큘럼 조정'
      ]
    },
    '최신 트렌드': {
      description: 'AI 역량 교육',
      details: [
        '최신 AI 도구 및 기술 교육',
        'ChatGPT, Claude 등 실무 활용법',
        'AI 영상 제작 도구 (Sora2, Runway)',
        '업계 트렌드 반영 교육'
      ]
    },
    '검증된 실적': {
      description: '전국 대학 출강',
      details: [
        '고려대학교, 서울시립대학교 등 주요 대학 출강',
        '경상대학교, 한국산업기술대학교 등 다수 대학',
        '정부기관 프로젝트 수행',
        '수강생 만족도 높은 강의 실적'
      ]
    }
  };

  const toggleCareer = (companyName) => {
    setExpandedCareer(expandedCareer === companyName ? null : companyName);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-secondary-bg py-12 md:py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Hero Section with Profile Image */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="mb-8">
            <ProfileImageDisplay name={profileData.name} />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-primary-text mb-3">
            {profileData.name}
          </h1>
          <p className="text-xl md:text-2xl text-sky-600 font-semibold mb-4">
            {profileData.title}
          </p>
          <p className="text-lg text-secondary-text max-w-3xl mx-auto leading-relaxed">
            {profileData.description}
          </p>
        </motion.div>

        {/* Education Section */}
        <motion.section
          ref={ref1}
          initial={{ opacity: 0, y: 30 }}
          animate={inView1 ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="card bg-white shadow-lg">
            <div className="flex items-center mb-6 pb-4 border-b border-gray-200">
              <div className="p-3 bg-sky-100 rounded-lg mr-4 border border-sky-300">
                <HiAcademicCap className="w-8 h-8 text-sky-500" />
              </div>
              <h2 className="text-3xl font-bold text-primary-text">학력</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {profileData.education.map((edu, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView1 ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="p-6 bg-gradient-to-br from-gray-50 to-white rounded-xl border-l-4 border-sky-400 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start">
                    <HiOfficeBuilding className="w-6 h-6 text-sky-500 mr-3 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="text-xl font-bold text-primary-text mb-1">
                        {edu.institution}
                      </h3>
                      <p className="text-secondary-text font-medium">{edu.degree}</p>
                      {edu.period && (
                        <p className="text-sm text-secondary-text mt-1">{edu.period}</p>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Career Section with Slide Down */}
        <motion.section
          ref={ref2}
          initial={{ opacity: 0, y: 30 }}
          animate={inView2 ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="card bg-white shadow-lg">
            <div className="flex items-center mb-6 pb-4 border-b border-gray-200">
              <div className="p-3 bg-sky-100 rounded-lg mr-4 border border-sky-300">
                <HiBriefcase className="w-8 h-8 text-sky-500" />
              </div>
              <h2 className="text-3xl font-bold text-primary-text">주요 경력</h2>
            </div>

            {/* Company Experience */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-primary-text mb-6 flex items-center">
                <HiOfficeBuilding className="w-5 h-5 text-sky-500 mr-2" />
                기업 실무 경력
              </h3>
              <div className="space-y-4">
                {profileData.career.companies.map((company, index) => {
                  const isExpanded = expandedCareer === company.company;
                  const details = careerDetails[company.company];

                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={inView2 ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="p-6 bg-gradient-to-r from-gray-50 to-white rounded-xl border-l-4 border-sky-400 hover:shadow-md transition-all"
                    >
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3">
                        <h4 className="text-xl font-bold text-primary-text mb-2 md:mb-0">
                          {company.company}
                        </h4>
                        <span className="px-4 py-1 bg-sky-500 text-white rounded-full text-sm font-semibold inline-block w-fit mb-2 md:mb-0 border border-sky-600">
                          {company.period}
                        </span>
                      </div>
                      <p className="text-lg text-secondary-text font-medium mb-2">
                        {company.position}
                      </p>
                      <p className="text-secondary-text mb-4">
                        {company.description}
                      </p>
                      
                      {/* 상세보기 버튼 */}
                      <button
                        onClick={() => toggleCareer(company.company)}
                        className="flex items-center space-x-2 text-sky-600 hover:text-sky-700 font-semibold transition-colors"
                      >
                        <span>상세보기</span>
                        <motion.div
                          animate={{ rotate: isExpanded ? 180 : 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <HiChevronDown className="w-5 h-5" />
                        </motion.div>
                      </button>

                      {/* 상세 내용 슬라이드 다운 */}
                      <AnimatePresence>
                        {isExpanded && details && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                          >
                            <div className="mt-4 pt-4 border-t border-gray-200">
                              <h5 className="font-bold text-primary-text mb-3">
                                {details.title}
                              </h5>
                              <ul className="space-y-2">
                                {details.details.map((detail, detailIndex) => (
                                  <li
                                    key={detailIndex}
                                    className="flex items-start text-secondary-text"
                                  >
                                    <HiCheckCircle className="w-5 h-5 text-sky-500 mr-2 mt-0.5 flex-shrink-0" />
                                    <span>{detail}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Current Position */}
            <div className="border-t pt-8">
              <h3 className="text-xl font-semibold text-primary-text mb-6 flex items-center">
                <HiSparkles className="w-5 h-5 text-sky-500 mr-2" />
                현재 활동
              </h3>
              {(() => {
                const current = profileData.career.current;
                const isExpanded = expandedCareer === current.company;
                const details = careerDetails[current.company];

                return (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={inView2 ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="p-6 bg-gradient-to-r from-gray-50 to-white rounded-xl border-l-4 border-sky-400 hover:shadow-md transition-all"
                  >
                    <h4 className="text-xl font-bold text-primary-text mb-2">
                      {current.company}
                    </h4>
                    <p className="text-lg text-secondary-text font-medium mb-2">
                      {current.position}
                    </p>
                    <p className="text-secondary-text mb-4">
                      {current.description}
                    </p>

                    {/* 상세보기 버튼 */}
                    <button
                      onClick={() => toggleCareer(current.company)}
                      className="flex items-center space-x-2 text-sky-600 hover:text-sky-700 font-semibold transition-colors"
                    >
                      <span>상세보기</span>
                      <motion.div
                        animate={{ rotate: isExpanded ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <HiChevronDown className="w-5 h-5" />
                      </motion.div>
                    </button>

                    {/* 상세 내용 슬라이드 다운 */}
                    <AnimatePresence>
                      {isExpanded && details && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="mt-4 pt-4 border-t border-gray-200">
                            <h5 className="font-bold text-primary-text mb-3">
                              {details.title}
                            </h5>
                            <ul className="space-y-2">
                              {details.details.map((detail, detailIndex) => (
                                <li
                                  key={detailIndex}
                                  className="flex items-start text-secondary-text"
                                >
                                  <HiCheckCircle className="w-5 h-5 text-secondary-accent mr-2 mt-0.5 flex-shrink-0" />
                                  <span>{detail}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })()}
            </div>
          </div>
        </motion.section>

        {/* Core Values with Hover Slide Down */}
        <motion.section
          ref={ref3}
          initial={{ opacity: 0, y: 30 }}
          animate={inView3 ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="card bg-sky-100 shadow-lg">
            <div className="text-center mb-8">
              <HiUser className="w-12 h-12 mx-auto mb-4 text-sky-500" />
              <h2 className="text-3xl font-bold text-primary-text mb-4">핵심 가치</h2>
              <p className="text-secondary-text text-lg">
                박민욱 강사가 추구하는 교육 철학과 가치
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {profileData.coreValues.map((value, index) => {
                const isHovered = hoveredValue === index;
                const details = coreValueDetails[value.title];

                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={inView3 ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="relative bg-white rounded-xl p-6 text-center shadow-md hover:shadow-xl transition-all cursor-pointer"
                    onMouseEnter={() => setHoveredValue(index)}
                    onMouseLeave={() => setHoveredValue(null)}
                  >
                    <div className="mb-3 flex justify-center">
                      {getCoreValueIcon(value.title)}
                    </div>
                    <h3 className="text-lg font-bold text-primary-text mb-2">
                      {value.title}
                    </h3>
                    <p className="text-secondary-text text-sm mb-4">
                      {value.description}
                    </p>

                    {/* 호버 시 상세 내용 슬라이드 다운 */}
                    <AnimatePresence>
                      {isHovered && details && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="mt-4 pt-4 border-t border-gray-200 text-left">
                            <ul className="space-y-2">
                              {details.details.map((detail, detailIndex) => (
                                <li
                                  key={detailIndex}
                                  className="flex items-start text-secondary-text text-sm"
                                >
                                  <HiCheckCircle className="w-4 h-4 text-secondary-accent mr-2 mt-0.5 flex-shrink-0" />
                                  <span>{detail}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  );
};

export default Profile;
