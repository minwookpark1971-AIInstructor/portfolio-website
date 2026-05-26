import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import portfolioData from '../data/portfolio.json';

const useCountUp = (target, duration = 1400, start = false) => {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!start) return;
    const startTime = performance.now();
    let rafId;

    const tick = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(target * eased));
      if (progress < 1) {
        rafId = requestAnimationFrame(tick);
      }
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [target, duration, start]);

  return value;
};

const Stat = ({ value, suffix, label, inView, delay }) => {
  const animated = useCountUp(value, 1400, inView);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay }}
      className="text-center"
    >
      <div className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-sky-600 tracking-tight">
        {animated.toLocaleString()}
        <span className="text-sky-500">{suffix}</span>
      </div>
      <p className="text-xs md:text-sm text-secondary-text mt-2 font-medium">{label}</p>
    </motion.div>
  );
};

const NumbersBar = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.3 });
  const s = portfolioData.statistics;

  const stats = [
    { value: 11, suffix: '년', label: 'SK텔레콤 실무 경력' },
    { value: s.totalUniversities, suffix: '+', label: '출강 대학·기관' },
    { value: s.totalStudents, suffix: '+', label: '누적 수강생' },
    { value: s.satisfactionRate, suffix: '%', label: '수강생 만족도' },
  ];

  return (
    <section ref={ref} className="bg-secondary-bg py-12 md:py-16 border-y border-gray-100">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 max-w-5xl mx-auto">
          {stats.map((stat, i) => (
            <Stat
              key={stat.label}
              value={stat.value}
              suffix={stat.suffix}
              label={stat.label}
              inView={inView}
              delay={i * 0.1}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default NumbersBar;
