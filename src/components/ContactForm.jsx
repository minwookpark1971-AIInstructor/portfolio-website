import { useState } from 'react';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organization: '',
    purpose: '',
    date: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // EmailJS 설정 필요 - 실제 사용 시 환경 변수로 관리
      // const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
      // const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
      // const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

      // await emailjs.send(serviceId, templateId, formData, publicKey);

      // 임시로 성공 메시지 표시 (실제 연동 시 위 코드 사용)
      setTimeout(() => {
        setSubmitStatus('success');
        setIsSubmitting(false);
        setFormData({
          name: '',
          email: '',
          organization: '',
          purpose: '',
          date: '',
          message: '',
        });
      }, 1000);
    } catch (error) {
      setSubmitStatus('error');
      setIsSubmitting(false);
    }
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      onSubmit={handleSubmit}
      className="card space-y-6"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-semibold text-primary-text mb-2"
          >
            이름 <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-400 focus:border-transparent outline-none transition-all"
            placeholder="이름을 입력하세요"
          />
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-semibold text-primary-text mb-2"
          >
            이메일 <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-400 focus:border-transparent outline-none transition-all"
            placeholder="email@example.com"
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="organization"
          className="block text-sm font-semibold text-primary-text mb-2"
        >
          소속
        </label>
        <input
          type="text"
          id="organization"
          name="organization"
          value={formData.organization}
          onChange={handleChange}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-400 focus:border-transparent outline-none transition-all"
          placeholder="소속 기관 또는 회사명"
        />
      </div>

      <div>
        <label
          htmlFor="purpose"
          className="block text-sm font-semibold text-primary-text mb-2"
        >
          강의 목적 <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="purpose"
          name="purpose"
          value={formData.purpose}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-400 focus:border-transparent outline-none transition-all"
          placeholder="예: AI 교육, 취업 컨설팅 등"
        />
      </div>

      <div>
        <label
          htmlFor="date"
          className="block text-sm font-semibold text-primary-text mb-2"
        >
          희망 일정
        </label>
        <input
          type="text"
          id="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-400 focus:border-transparent outline-none transition-all"
          placeholder="예: 2024년 3월 중순"
        />
      </div>

      <div>
        <label
          htmlFor="message"
          className="block text-sm font-semibold text-primary-text mb-2"
        >
          상세 내용 <span className="text-red-500">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          rows="6"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-400 focus:border-gray-500 outline-none transition-all resize-none"
          placeholder="강의 목적, 대상자, 예상 인원 등 상세 내용을 입력하세요"
        />
      </div>

      {submitStatus === 'success' && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 bg-green-50 border border-green-200 rounded-lg text-green-800"
        >
          문의가 성공적으로 전송되었습니다. 빠른 시일 내에 연락드리겠습니다.
        </motion.div>
      )}

      {submitStatus === 'error' && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-800"
        >
          전송 중 오류가 발생했습니다. 다시 시도해주세요.
        </motion.div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? '전송 중...' : '전송하기'}
      </button>
    </motion.form>
  );
};

export default ContactForm;


