import { Link } from 'react-router-dom';
import { HiMail, HiPhone, HiLocationMarker } from 'react-icons/hi';
import profileData from '../data/profile.json';

const Footer = () => {
  return (
    <footer className="bg-secondary-bg border-t border-gray-200">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold text-primary-text mb-4">연락처</h3>
            <div className="space-y-3 text-secondary-text">
              <div className="flex items-center space-x-2">
                <HiMail className="w-5 h-5 text-sky-500" />
                <a
                  href={`mailto:${profileData.contact.email}`}
                  className="hover:text-sky-600 transition-colors"
                >
                  {profileData.contact.email}
                </a>
              </div>
              <div className="flex items-center space-x-2">
                <HiPhone className="w-5 h-5 text-sky-500" />
                <a
                  href={`tel:${profileData.contact.phone}`}
                  className="hover:text-sky-600 transition-colors"
                >
                  {profileData.contact.phone}
                </a>
              </div>
              <div className="flex items-start space-x-2">
                <HiLocationMarker className="w-5 h-5 text-sky-500 mt-1" />
                <span>{profileData.contact.address}</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold text-primary-text mb-4">빠른 링크</h3>
            <div className="flex flex-col space-y-2">
              <Link
                to="/profile"
                className="text-secondary-text hover:text-sky-600 transition-colors"
              >
                프로필
              </Link>
              <Link
                to="/expertise"
                className="text-secondary-text hover:text-sky-600 transition-colors"
              >
                강의분야
              </Link>
              <Link
                to="/portfolio"
                className="text-secondary-text hover:text-sky-600 transition-colors"
              >
                실적
              </Link>
              <Link
                to="/contact"
                className="text-secondary-text hover:text-sky-600 transition-colors"
              >
                연락
              </Link>
            </div>
          </div>

          {/* About */}
          <div>
            <h3 className="text-xl font-bold text-primary-text mb-4">소개</h3>
            <p className="text-secondary-text text-sm leading-relaxed">
              {profileData.description.substring(0, 100)}...
            </p>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200 text-center text-secondary-text text-sm">
          <p>© 2024 {profileData.name}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

