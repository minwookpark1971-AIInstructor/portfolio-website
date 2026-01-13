import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { HiMail, HiPhone, HiLocationMarker, HiCheckCircle } from 'react-icons/hi';
import profileData from '../data/profile.json';
import ContactForm from '../components/ContactForm';

const Contact = () => {
  const [ref1, inView1] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [ref2, inView2] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [ref3, inView3] = useInView({ triggerOnce: true, threshold: 0.1 });

  const processSteps = [
    '문의 및 상담',
    '맞춤 제안',
    '계약 및 일정 확정',
    '강의 준비',
    '강의 진행',
    '사후 관리',
  ];

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
            연락
          </h1>
          <p className="text-lg text-secondary-text">
            강의 문의 및 상담 신청
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Contact Info & Process */}
          <div className="lg:col-span-1 space-y-8">
            {/* Contact Info */}
            <motion.section
              ref={ref1}
              initial={{ opacity: 0, x: -30 }}
              animate={inView1 ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="card"
            >
              <h2 className="text-2xl font-bold text-primary-text mb-6">
                연락처 정보
              </h2>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <HiMail className="w-6 h-6 text-primary-accent mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-secondary-text mb-1">이메일</p>
                    <a
                      href={`mailto:${profileData.contact.email}`}
                      className="text-primary-text hover:text-primary-accent transition-colors font-semibold"
                    >
                      {profileData.contact.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <HiPhone className="w-6 h-6 text-primary-accent mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-secondary-text mb-1">전화번호</p>
                    <a
                      href={`tel:${profileData.contact.phone}`}
                      className="text-primary-text hover:text-primary-accent transition-colors font-semibold"
                    >
                      {profileData.contact.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <HiLocationMarker className="w-6 h-6 text-primary-accent mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-secondary-text mb-1">주소</p>
                    <p className="text-primary-text font-semibold">
                      {profileData.contact.address}
                    </p>
                  </div>
                </div>
              </div>
            </motion.section>

            {/* Process Steps */}
            <motion.section
              ref={ref2}
              initial={{ opacity: 0, x: -30 }}
              animate={inView2 ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="card"
            >
              <h2 className="text-2xl font-bold text-primary-text mb-6">
                강의 의뢰 프로세스
              </h2>
              <div className="space-y-4">
                {processSteps.map((step, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={inView2 ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                    className="flex items-start space-x-3"
                  >
                    <div className="flex-shrink-0 w-8 h-8 bg-primary-accent text-white rounded-full flex items-center justify-center font-bold text-sm">
                      {index + 1}
                    </div>
                    <p className="text-secondary-text pt-1">{step}</p>
                  </motion.div>
                ))}
              </div>
            </motion.section>
          </div>

          {/* Right Column - Contact Form */}
          <motion.div
            ref={ref3}
            initial={{ opacity: 0, x: 30 }}
            animate={inView3 ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2"
          >
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-primary-text mb-2">
                문의 폼
              </h2>
              <p className="text-secondary-text">
                아래 양식을 작성해주시면 빠른 시일 내에 연락드리겠습니다.
              </p>
            </div>
            <ContactForm />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;


