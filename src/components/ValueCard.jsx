import { motion } from 'framer-motion';
import { 
  HiBriefcase, 
  HiAcademicCap, 
  HiSparkles, 
  HiCheckCircle 
} from 'react-icons/hi';

// 아이콘 매핑 함수
const getIcon = (title) => {
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

const ValueCard = ({ value, index, inView }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="card text-center"
    >
      <div className="mb-4 flex justify-center">
        {getIcon(value.title)}
      </div>
      <h3 className="text-xl font-bold text-primary-text mb-2">
        {value.title}
      </h3>
      <p className="text-secondary-text">{value.description}</p>
    </motion.div>
  );
};

export default ValueCard;


