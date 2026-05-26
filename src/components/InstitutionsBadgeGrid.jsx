import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const INSTITUTIONS = [
  '건강보험심사평가원',
  '육군본부',
  '단국대학교',
  '세종대학교',
  '나사렛대학교',
  '경상대학교',
  '우송대학교',
  '한국산업기술대',
  '인하공업전문대',
  '대구가톨릭대',
  '서울50플러스',
  '서울창업지원센터',
];

const InstitutionsBadgeGrid = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section ref={ref} className="py-16 md:py-20 px-4 bg-white">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 md:mb-12"
        >
          <p className="text-sm md:text-base text-sky-600 font-semibold tracking-wide mb-2">
            TRUSTED BY
          </p>
          <h2 className="text-2xl md:text-4xl font-bold text-primary-text">
            전국 주요 기관에서 출강하고 있습니다
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-4">
          {INSTITUTIONS.map((name, i) => (
            <motion.div
              key={name}
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: i * 0.04 }}
              className="px-3 py-4 md:py-5 rounded-lg border border-gray-200 bg-white text-center text-sm md:text-base font-semibold text-secondary-text hover:border-sky-400 hover:text-sky-700 hover:-translate-y-0.5 hover:shadow-md transition-all duration-300"
            >
              {name}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InstitutionsBadgeGrid;
