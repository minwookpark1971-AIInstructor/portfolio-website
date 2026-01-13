import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { HiMenu, HiX } from 'react-icons/hi';
import { motion, AnimatePresence } from 'framer-motion';
import profileData from '../data/profile.json';

// 로고 이미지 표시 컴포넌트
const LogoDisplay = () => {
  const [logoError, setLogoError] = useState(false);
  const basePath = import.meta.env.BASE_URL || '/';
  const logoSrc = `${basePath}images/logo.png`.replace(/\/\//g, '/');

  if (!logoError) {
    return (
      <img 
        src={logoSrc} 
        alt={`${profileData.name} - ${profileData.title}`}
        className="h-12 md:h-14 w-auto object-contain"
        onError={() => setLogoError(true)}
      />
    );
  }

  // 이미지가 없으면 텍스트 로고 표시
  return (
    <div className="flex flex-col">
      <span className="text-xl font-bold text-primary-text">
        {profileData.name}
      </span>
      <span className="text-sm text-secondary-text">
        {profileData.title}
      </span>
    </div>
  );
};

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const menuItems = [
    { path: '/', label: '홈' },
    { path: '/profile', label: '프로필' },
    { path: '/expertise', label: '강의분야' },
    { path: '/portfolio', label: '주요 강의이력' },
    { path: '/contact', label: '문의하기' },
  ];

  const isActive = (path) => {
    if (path === '/portfolio') {
      return location.pathname.startsWith('/portfolio');
    }
    return location.pathname === path;
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <LogoDisplay />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-4 py-2 rounded-lg transition-colors duration-200 ${
                  isActive(item.path)
                    ? 'text-sky-700 font-semibold bg-sky-100 border border-sky-300'
                    : 'text-secondary-text hover:text-sky-600 hover:bg-sky-50'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-primary-text"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="메뉴 토글"
          >
            {isMenuOpen ? (
              <HiX className="w-6 h-6" />
            ) : (
              <HiMenu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden mt-4 pb-4"
            >
              <div className="flex flex-col space-y-2">
                {menuItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsMenuOpen(false)}
                    className={`px-4 py-3 rounded-lg transition-colors duration-200 ${
                      isActive(item.path)
                        ? 'text-gray-700 font-semibold bg-gray-100 border border-gray-300'
                        : 'text-secondary-text hover:text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
};

export default Header;


