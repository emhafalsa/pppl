import React, { useState } from 'react';
import { User, Lock, LogIn, BookOpen } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useLanguage } from '../../contexts/LanguageContext';

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login, isLoading } = useAuth();
  const { language } = useLanguage();

  const translations = {
    en: {
      title: 'Welcome Back',
      subtitle: 'Sign in to your language learning account',
      email: 'Email Address',
      password: 'Password',
      loginButton: 'Sign In',
      loginError: 'Invalid email or password',
      demoCredentials: 'Demo Credentials:',
      adminLogin: 'Admin: admin@language.com / admin123',
      studentLogin: 'Student: student@language.com / student123'
    },
    ar: {
      title: 'مرحباً بعودتك',
      subtitle: 'سجل الدخول إلى حساب تعلم اللغة',
      email: 'البريد الإلكتروني',
      password: 'كلمة المرور',
      loginButton: 'تسجيل الدخول',
      loginError: 'البريد الإلكتروني أو كلمة المرور غير صحيحة',
      demoCredentials: 'بيانات تجريبية:',
      adminLogin: 'مدير: admin@language.com / admin123',
      studentLogin: 'طالب: student@language.com / student123'
    }
  };

  const t = translations[language];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    const success = await login(email, password);
    if (!success) {
      setError(t.loginError);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-blue-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="flex justify-center">
            <div className="bg-gradient-to-r from-emerald-600 to-emerald-800 p-3 rounded-full">
              <BookOpen className="h-12 w-12 text-white" />
            </div>
          </div>
          <h2 className="mt-6 text-3xl font-bold text-gray-900">
            {t.title}
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            {t.subtitle}
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                {t.email}
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none rtl:left-auto rtl:right-0 rtl:pr-3">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-10 rtl:pl-3 rtl:pr-10 px-3 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  placeholder="admin@language.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                {t.password}
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none rtl:left-auto rtl:right-0 rtl:pr-3">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-10 rtl:pl-3 rtl:pr-10 px-3 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  placeholder="••••••••"
                />
              </div>
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-gradient-to-r from-emerald-600 to-emerald-800 hover:from-emerald-700 hover:to-emerald-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
          >
            <span className="absolute left-0 inset-y-0 flex items-center pl-3 rtl:left-auto rtl:right-0 rtl:pr-3">
              <LogIn className="h-5 w-5 text-emerald-500 group-hover:text-emerald-400" />
            </span>
            {isLoading ? 'Signing in...' : t.loginButton}
          </button>

          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <p className="text-sm font-medium text-blue-800 mb-2">{t.demoCredentials}</p>
            <p className="text-xs text-blue-600">{t.adminLogin}</p>
            <p className="text-xs text-blue-600">{t.studentLogin}</p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;