import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi';
import { PROFILE_GALLERY_TOTAL_PAGES } from '../data/galleryConfig';

const ProfileGallery = () => {
  const [page, setPage] = useState(1);
  const [direction, setDirection] = useState(1);
  const [imageError, setImageError] = useState(false);

  const basePath = import.meta.env.BASE_URL || '/';
  const imgSrc = `${basePath}images/profile-gallery/page-${String(page).padStart(2, '0')}.png`.replace(/\/\//g, '/');

  const goPrev = () => {
    setDirection(-1);
    setImageError(false);
    setPage((p) => (p === 1 ? PROFILE_GALLERY_TOTAL_PAGES : p - 1));
  };

  const goNext = () => {
    setDirection(1);
    setImageError(false);
    setPage((p) => (p === PROFILE_GALLERY_TOTAL_PAGES ? 1 : p + 1));
  };

  return (
    <section className="mb-12 md:mb-16">
      <div className="text-center mb-6">
        <h2 className="text-2xl md:text-3xl font-bold text-primary-text mb-2">
          강사 상세 프로필
        </h2>
        <p className="text-sm md:text-base text-secondary-text">
          좌우 버튼으로 페이지를 넘겨보세요
        </p>
      </div>

      <div className="relative max-w-4xl mx-auto">
        {/* Image card - 16:9 ratio */}
        <div className="relative bg-white rounded-lg shadow-xl overflow-hidden aspect-video">
          <AnimatePresence initial={false} mode="wait" custom={direction}>
            {!imageError ? (
              <motion.img
                key={page}
                src={imgSrc}
                alt={`강사 프로필 ${page} / ${PROFILE_GALLERY_TOTAL_PAGES}`}
                initial={{ opacity: 0, x: direction * 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -direction * 30 }}
                transition={{ duration: 0.35 }}
                className="absolute inset-0 w-full h-full object-cover bg-secondary-bg"
                onError={() => setImageError(true)}
              />
            ) : (
              <motion.div
                key={`fallback-${page}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35 }}
                className="absolute inset-0 flex flex-col items-center justify-center bg-secondary-bg text-secondary-text px-6 text-center"
              >
                <div className="text-5xl mb-3">📄</div>
                <p className="text-base md:text-lg font-medium">프로필 자료 준비 중</p>
                <p className="text-xs md:text-sm mt-1">
                  page-{String(page).padStart(2, '0')}.png
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Prev / Next buttons - desktop overlay */}
        <button
          type="button"
          onClick={goPrev}
          aria-label="이전 페이지"
          className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-5 w-12 h-12 rounded-full bg-white shadow-lg items-center justify-center text-primary-text hover:text-sky-600 hover:shadow-xl transition-all duration-300"
        >
          <HiChevronLeft className="w-7 h-7" />
        </button>
        <button
          type="button"
          onClick={goNext}
          aria-label="다음 페이지"
          className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-5 w-12 h-12 rounded-full bg-white shadow-lg items-center justify-center text-primary-text hover:text-sky-600 hover:shadow-xl transition-all duration-300"
        >
          <HiChevronRight className="w-7 h-7" />
        </button>

        {/* Mobile controls + counter */}
        <div className="flex items-center justify-between mt-4 md:mt-6">
          <button
            type="button"
            onClick={goPrev}
            aria-label="이전 페이지"
            className="md:hidden flex w-10 h-10 rounded-full bg-white shadow items-center justify-center text-primary-text hover:text-sky-600 transition-colors"
          >
            <HiChevronLeft className="w-6 h-6" />
          </button>

          <p className="flex-1 text-center text-sm md:text-base text-secondary-text font-medium">
            <span className="text-primary-text font-bold">{page}</span>
            <span className="mx-1">/</span>
            <span>{PROFILE_GALLERY_TOTAL_PAGES}</span>
          </p>

          <button
            type="button"
            onClick={goNext}
            aria-label="다음 페이지"
            className="md:hidden flex w-10 h-10 rounded-full bg-white shadow items-center justify-center text-primary-text hover:text-sky-600 transition-colors"
          >
            <HiChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProfileGallery;
