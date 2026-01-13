import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';
import { HiChevronDown, HiChevronUp, HiChevronRight } from 'react-icons/hi';
import expertiseData from '../data/expertise.json';

const Expertise = () => {
  const [expandedCategory, setExpandedCategory] = useState(null);
  const [expandedPrograms, setExpandedPrograms] = useState({});

  const toggleCategory = (categoryId) => {
    setExpandedCategory(expandedCategory === categoryId ? null : categoryId);
  };

  const toggleProgram = (categoryId, programIndex) => {
    const key = `${categoryId}-${programIndex}`;
    setExpandedPrograms(prev => ({
      ...prev,
      [key]: prev[key] ? null : key
    }));
  };

  // 프로그램별 상세 정보 (Notion 페이지 내용 기반)
  const programDetails = {
    'ai-education-0': {
      title: 'AI 데이터 분석 상세',
      content: [
        'ChatGPT와 Claude를 활용한 데이터 분석 기초부터 고급 기법까지',
        '엑셀 데이터를 AI로 분석하여 인사이트 도출하는 실전 방법',
        '대용량 데이터 처리 및 시각화 기법',
        '비즈니스 의사결정을 위한 데이터 분석 리포트 작성',
        '실무 프로젝트 기반 학습으로 즉시 활용 가능한 스킬 습득'
      ]
    },
    'ai-education-1': {
      title: 'AI 업무자동화 상세',
      content: [
        '반복적인 업무를 AI로 자동화하는 실전 솔루션',
        '이메일 자동 응답 및 문서 작성 자동화',
        '데이터 입력 및 정리 작업 자동화',
        '회의록 작성 및 요약 자동화',
        '업무 효율성을 3배 이상 향상시키는 구체적인 방법'
      ]
    },
    'ai-education-2': {
      title: 'AI 비즈니스 전략 상세',
      content: [
        'AI를 활용한 새로운 비즈니스 모델 설계',
        '기존 비즈니스에 AI를 접목하는 전략 수립',
        'AI 기반 제품 및 서비스 기획',
        '시장 분석 및 경쟁 우위 확보 전략',
        'AI 투자 대비 효과 측정 및 ROI 분석'
      ]
    },
    'ai-education-3': {
      title: 'AI 영상 크리에이터 상세',
      content: [
        'Sora2를 활용한 고품질 AI 영상 제작',
        'Runway, Pika 등 다양한 AI 영상 도구 활용법',
        '텍스트 프롬프트로 영상 생성하는 전문 기법',
        'AI 영상 편집 및 후처리 기술',
        '상업적 활용을 위한 AI 영상 제작 워크플로우'
      ]
    },
    'career-consulting-0': {
      title: '공기업 vs 사기업 취업전략 상세',
      content: [
        '공기업과 사기업의 채용 프로세스 차이점 분석',
        '각 기업 유형별 맞춤 취업 전략 수립',
        '공기업 필기시험 대비 전략 및 노하우',
        '사기업 면접 및 인성검사 대비 방법',
        '합격률을 높이는 기업별 맞춤 전략'
      ]
    },
    'career-consulting-1': {
      title: '자기소개서 실전 작성 상세',
      content: [
        '합격률을 높이는 자기소개서 작성 노하우',
        '지원 기업에 맞는 맞춤형 자기소개서 작성법',
        'AI를 활용한 자기소개서 개선 및 최적화',
        '구체적이고 설득력 있는 경험 기술 방법',
        '자기소개서 검토 및 피드백 제공'
      ]
    },
    'career-consulting-2': {
      title: '면접 완벽 대비 상세',
      content: [
        '실전 면접 시뮬레이션 및 대응 전략',
        '면접관이 원하는 답변 구조 및 스토리텔링',
        '인성면접, 기술면접, 임원면접 각각의 대비법',
        '면접 질문 예상 및 모범 답안 작성',
        '면접 당일 체크리스트 및 준비사항'
      ]
    },
    'career-consulting-3': {
      title: '대기업 합격 전략 상세',
      content: [
        '대기업 채용 프로세스 완벽 이해',
        '서류전형부터 최종면접까지 전략적 접근',
        '대기업이 원하는 인재상 분석 및 매칭',
        '네트워킹 및 인턴십 활용 전략',
        '합격 사례 분석 및 성공 전략'
      ]
    },
    'video-production-0': {
      title: 'AI 영상 편집 상세',
      content: [
        'CapCut과 Premiere Pro를 활용한 전문 영상 편집',
        'AI 자동 편집 기능 활용법',
        '컷 편집, 전환 효과, 자막 삽입 기법',
        '색보정 및 음향 편집',
        '상업용 영상 제작 워크플로우'
      ]
    },
    'video-production-1': {
      title: '전문 영상 촬영 상세',
      content: [
        '프로페셔널 영상 촬영 기법 및 장비 활용',
        '카메라 설정 및 조명 활용법',
        '구도 및 프레이밍 기법',
        '안정적인 촬영을 위한 기법',
        '다양한 장르별 촬영 노하우'
      ]
    },
    'video-production-2': {
      title: '홍보영상 제작 상세',
      content: [
        '기업 및 기관 홍보영상 기획 및 제작',
        '스토리보드 작성 및 기획안 작성',
        '브랜드 아이덴티티를 반영한 영상 제작',
        '타겟 고객에 맞는 영상 콘텐츠 기획',
        '효과적인 홍보영상 제작 사례 분석'
      ]
    },
    'startup-marketing-0': {
      title: '스타트업 사업기획 상세',
      content: [
        '사업 모델 설계 및 사업계획서 작성',
        '시장 조사 및 경쟁 분석 방법론',
        '수익 모델 설계 및 재무 계획',
        '투자 유치를 위한 사업계획서 작성',
        '실제 투자받은 사업계획서 사례 분석'
      ]
    },
    'startup-marketing-1': {
      title: '온라인 마케팅 상세',
      content: [
        '디지털 마케팅 전략 및 실행 방법론',
        '소셜미디어 마케팅 전략',
        '콘텐츠 마케팅 및 SEO 최적화',
        '광고 집행 및 성과 측정',
        'ROI 극대화를 위한 마케팅 전략'
      ]
    },
    'startup-marketing-2': {
      title: 'AI 시장조사 상세',
      content: [
        'AI 도구를 활용한 시장 조사 및 분석',
        '경쟁사 분석 및 벤치마킹',
        '고객 니즈 조사 및 분석',
        '시장 트렌드 예측 및 기회 발굴',
        '데이터 기반 의사결정 지원'
      ]
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-secondary-bg py-12 md:py-20 px-4">
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
                className="card bg-white cursor-pointer"
                onClick={() => toggleCategory(category.id)}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-primary-text mb-2">
                      {category.title}
                    </h2>
                    <p className="text-secondary-text">{category.description}</p>
                  </div>
                  <motion.div
                    animate={{ rotate: isExpanded ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {isExpanded ? (
                      <HiChevronUp className="w-6 h-6 text-sky-500" />
                    ) : (
                      <HiChevronDown className="w-6 h-6 text-sky-500" />
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
                      {category.programs.map((program, programIndex) => {
                        const programKey = `${category.id}-${programIndex}`;
                        const isProgramExpanded = expandedPrograms[programKey] === programKey;
                        const details = programDetails[programKey];

                        return (
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
                            className="p-5 bg-secondary-bg rounded-lg hover:shadow-md transition-all"
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleProgram(category.id, programIndex);
                            }}
                          >
                            <h3 className="text-lg font-semibold text-primary-text mb-2">
                              {program.name}
                            </h3>
                            <p className="text-sm text-secondary-text mb-4">
                              {program.description}
                            </p>
                            
                            {/* 상세하게 보기 버튼 */}
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleProgram(category.id, programIndex);
                              }}
                              className="flex items-center space-x-2 text-sky-600 hover:text-sky-700 font-semibold text-sm transition-colors border border-sky-300 px-3 py-1 rounded hover:bg-sky-100"
                            >
                              <span>상세하게 보기</span>
                              <motion.div
                                animate={{ rotate: isProgramExpanded ? 90 : 0 }}
                                transition={{ duration: 0.3 }}
                              >
                                <HiChevronRight className="w-4 h-4" />
                              </motion.div>
                            </button>

                            {/* 상세 내용 슬라이드 다운 */}
                            <AnimatePresence>
                              {isProgramExpanded && details && (
                                <motion.div
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: 'auto', opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  transition={{ duration: 0.3 }}
                                  className="overflow-hidden"
                                >
                                  <div className="mt-4 pt-4 border-t border-sky-300">
                                    <h4 className="font-bold text-primary-text mb-3">
                                      {details.title}
                                    </h4>
                                    <ul className="space-y-2">
                                      {details.content.map((item, itemIndex) => (
                                        <li
                                          key={itemIndex}
                                          className="flex items-start text-sm text-secondary-text"
                                        >
                                          <span className="text-sky-500 mr-2 mt-1">•</span>
                                          <span>{item}</span>
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
            <p className="mb-6 text-sky-200">
              기관 및 기업의 특성에 맞는 커스터마이징 강의를 제공합니다.
            </p>
            <Link
              to="/contact"
              className="inline-block bg-white text-sky-600 px-8 py-3 rounded-lg font-semibold hover:bg-sky-100 transition-colors border-2 border-sky-400"
            >
              강의 문의하기
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Expertise;
