import { motion } from 'framer-motion';

const ValueCard = ({ value, index, inView }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="card text-center"
    >
      <div className="text-4xl mb-4">{value.icon}</div>
      <h3 className="text-xl font-bold text-primary-text mb-2">
        {value.title}
      </h3>
      <p className="text-secondary-text">{value.description}</p>
    </motion.div>
  );
};

export default ValueCard;


