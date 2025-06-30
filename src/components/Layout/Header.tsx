import React from 'react';
import { Languages, LogOut, User, BookOpen } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useLanguage } from '../../contexts/LanguageContext';

const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const { language, setLanguage, isRTL } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ar' : 'en');
  };

  const translations = {
    en: {
      welcome: 'Welcome',
      logout: 'Logout',
      languageCenter: 'Language Learning Center'
    },
    ar: {
      welcome: 'مرحباً',
      logout: 'خروج',
      languageCenter: 'مركز تعلم اللغات'
    }
  };

  const t = translations[language];

  return (
    <header className="bg-gradient-to-r from-emerald-600 to-emerald-800 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-3 rtl:space-x-reverse">
            <BookOpen className="h-8 w-8 text-yellow-300" />
            <h1 className="text-xl font-bold">{t.languageCenter}</h1>
          </div>

          <div className="flex items-center space-x-4 rtl:space-x-reverse">
            <button
              onClick={toggleLanguage}
              className="flex items-center space-x-2 rtl:space-x-reverse px-3 py-2 rounded-lg bg-emerald-700 hover:bg-emerald-600 transition-colors"
            >
              <Languages className="h-4 w-4" />
              <span className="text-sm font-medium">
                {language === 'en' ? 'العربية' : 'English'}
              </span>
            </button>

            {user && (
              <div className="flex items-center space-x-4 rtl:space-x-reverse">
                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                  <User className="h-5 w-5" />
                  <span className="text-sm">
                    {t.welcome}, {user.name}
                  </span>
                </div>
                <button
                  onClick={logout}
                  className="flex items-center space-x-2 rtl:space-x-reverse px-3 py-2 rounded-lg bg-red-600 hover:bg-red-700 transition-colors"
                >
                  <LogOut className="h-4 w-4" />
                  <span className="text-sm">{t.logout}</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;