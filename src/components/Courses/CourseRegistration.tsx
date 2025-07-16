import React, { useState } from 'react';
import { Search, Filter, Calendar, Users, Clock, Star, ChevronRight } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { mockCourses } from '../../data/mockData';
import { Course } from '../../types';
import { registrationApi } from '../../services/api';

const CourseRegistration: React.FC = () => {
  const { language } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState<'all' | 'arabic' | 'english'>('all');
  const [selectedLevel, setSelectedLevel] = useState<'all' | 'beginner' | 'intermediate' | 'advanced'>('all');
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [showRegistrationModal, setShowRegistrationModal] = useState(false);

  const translations = {
    en: {
      title: 'Course Registration',
      searchPlaceholder: 'Search courses...',
      filterByLanguage: 'Filter by Language',
      filterByLevel: 'Filter by Level',
      allLanguages: 'All Languages',
      arabic: 'Arabic',
      english: 'English',
      allLevels: 'All Levels',
      beginner: 'Beginner',
      intermediate: 'Intermediate',
      advanced: 'Advanced',
      instructor: 'Instructor',
      duration: 'Duration',
      schedule: 'Schedule',
      price: 'Price',
      enrolled: 'Enrolled',
      capacity: 'Capacity',
      availableSpots: 'Available Spots',
      registerNow: 'Register Now',
      viewDetails: 'View Details',
      courseFull: 'Course Full',
      registrationForm: 'Registration Form',
      personalInfo: 'Personal Information',
      fullName: 'Full Name',
      email: 'Email Address',
      phone: 'Phone Number',
      experience: 'Previous Experience',
      experienceOptions: [
        'Complete Beginner',
        'Some Basic Knowledge',
        'Intermediate Level',
        'Advanced Level'
      ],
      goals: 'Learning Goals',
      submitRegistration: 'Submit Registration',
      cancel: 'Cancel',
      registrationSuccess: 'Registration submitted successfully!',
      close: 'Close'
    },
    ar: {
      title: 'تسجيل الدورات',
      searchPlaceholder: 'البحث عن الدورات...',
      filterByLanguage: 'تصفية حسب اللغة',
      filterByLevel: 'تصفية حسب المستوى',
      allLanguages: 'جميع اللغات',
      arabic: 'العربية',
      english: 'الإنجليزية',
      allLevels: 'جميع المستويات',
      beginner: 'مبتدئ',
      intermediate: 'متوسط',
      advanced: 'متقدم',
      instructor: 'المدرب',
      duration: 'المدة',
      schedule: 'الجدول',
      price: 'السعر',
      enrolled: 'المسجلين',
      capacity: 'السعة',
      availableSpots: 'الأماكن المتاحة',
      registerNow: 'سجل الآن',
      viewDetails: 'عرض التفاصيل',
      courseFull: 'الدورة مكتملة',
      registrationForm: 'نموذج التسجيل',
      personalInfo: 'المعلومات الشخصية',
      fullName: 'الاسم الكامل',
      email: 'البريد الإلكتروني',
      phone: 'رقم الهاتف',
      experience: 'الخبرة السابقة',
      experienceOptions: [
        'مبتدئ تماماً',
        'معرفة أساسية',
        'مستوى متوسط',
        'مستوى متقدم'
      ],
      goals: 'أهداف التعلم',
      submitRegistration: 'إرسال التسجيل',
      cancel: 'إلغاء',
      registrationSuccess: 'تم إرسال التسجيل بنجاح!',
      close: 'إغلاق'
    }
  };

  const t = translations[language];

  const filteredCourses = mockCourses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.titleAr.includes(searchTerm) ||
                         course.instructor.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesLanguage = selectedLanguage === 'all' || course.language === selectedLanguage;
    const matchesLevel = selectedLevel === 'all' || course.level === selectedLevel;
    
    return matchesSearch && matchesLanguage && matchesLevel;
  });

  const getLevelTranslation = (level: string) => {
    switch (level) {
      case 'beginner':
        return t.beginner;
      case 'intermediate':
        return t.intermediate;
      case 'advanced':
        return t.advanced;
      default:
        return level;
    }
  };

  const RegistrationModal = () => {
    const [formData, setFormData] = useState({
      fullName: '',
      email: '',
      phone: '',
      experience: '',
      goals: ''
    });
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      
      if (!selectedCourse) return;
      
      // Submit registration to backend
      registrationApi.createRegistration({
        user_name: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        course_id: selectedCourse.id,
        course_title: selectedCourse.title,
        experience: formData.experience,
        goals: formData.goals
      }).then(() => {
        setIsSubmitted(true);
      }).catch((error) => {
        console.error('Registration error:', error);
        // Handle error (you could add error state here)
      });
    };

    if (!selectedCourse) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-90vh overflow-y-auto">
          {!isSubmitted ? (
            <>
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-gray-900">{t.registrationForm}</h3>
                <button
                  onClick={() => setShowRegistrationModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ×
                </button>
              </div>

              <div className="mb-6 p-4 bg-emerald-50 rounded-lg">
                <h4 className="font-medium text-emerald-900">
                  {language === 'ar' ? selectedCourse.titleAr : selectedCourse.title}
                </h4>
                <p className="text-sm text-emerald-700">{selectedCourse.instructor}</p>
                <p className="text-sm text-emerald-700">{t.price}: ${selectedCourse.price}</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <h4 className="text-lg font-medium text-gray-900 mb-4">{t.personalInfo}</h4>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">{t.fullName}</label>
                      <input
                        type="text"
                        required
                        value={formData.fullName}
                        onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 px-3 py-2 border"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700">{t.email}</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 px-3 py-2 border"
                      />
                    </div>
                  </div>

                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700">{t.phone}</label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 px-3 py-2 border"
                    />
                  </div>

                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700">{t.experience}</label>
                    <select
                      required
                      value={formData.experience}
                      onChange={(e) => setFormData({...formData, experience: e.target.value})}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 px-3 py-2 border"
                    >
                      <option value="">Select your experience level</option>
                      {t.experienceOptions.map((option, index) => (
                        <option key={index} value={option}>{option}</option>
                      ))}
                    </select>
                  </div>

                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700">{t.goals}</label>
                    <textarea
                      rows={3}
                      value={formData.goals}
                      onChange={(e) => setFormData({...formData, goals: e.target.value})}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 px-3 py-2 border"
                      placeholder="What do you hope to achieve with this course?"
                    />
                  </div>
                </div>

                <div className="flex justify-end space-x-4 rtl:space-x-reverse pt-4">
                  <button
                    type="button"
                    onClick={() => setShowRegistrationModal(false)}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-300 rounded-md hover:bg-gray-400"
                  >
                    {t.cancel}
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-sm font-medium text-white bg-emerald-600 rounded-md hover:bg-emerald-700"
                  >
                    {t.submitRegistration}
                  </button>
                </div>
              </form>
            </>
          ) : (
            <div className="text-center py-8">
              <div className="bg-green-100 rounded-full p-3 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Star className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{t.registrationSuccess}</h3>
              <p className="text-gray-600 mb-6">
                We'll contact you soon with further details about your course.
              </p>
              <button
                onClick={() => {
                  setShowRegistrationModal(false);
                  setIsSubmitted(false);
                  setSelectedCourse(null);
                }}
                className="px-6 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700"
              >
                {t.close}
              </button>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">{t.title}</h1>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-3 rtl:left-auto rtl:right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder={t.searchPlaceholder}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 rtl:pl-3 rtl:pr-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            />
          </div>

          <div>
            <select
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value as any)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            >
              <option value="all">{t.allLanguages}</option>
              <option value="arabic">{t.arabic}</option>
              <option value="english">{t.english}</option>
            </select>
          </div>

          <div>
            <select
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value as any)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            >
              <option value="all">{t.allLevels}</option>
              <option value="beginner">{t.beginner}</option>
              <option value="intermediate">{t.intermediate}</option>
              <option value="advanced">{t.advanced}</option>
            </select>
          </div>
        </div>
      </div>

      {/* Course Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map((course) => {
          const availableSpots = course.capacity - course.enrolled;
          const isFull = availableSpots <= 0;

          return (
            <div key={course.id} className="bg-white rounded-lg shadow overflow-hidden hover:shadow-lg transition-shadow">
              <img
                src={course.image}
                alt={course.title}
                className="w-full h-48 object-cover"
              />
              
              <div className="p-6">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-lg font-bold text-gray-900">
                    {language === 'ar' ? course.titleAr : course.title}
                  </h3>
                  <span className="text-xs bg-emerald-100 text-emerald-800 px-2 py-1 rounded-full">
                    {getLevelTranslation(course.level)}
                  </span>
                </div>

                <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                  {language === 'ar' ? course.descriptionAr : course.description}
                </p>

                <div className="space-y-2 text-sm text-gray-600 mb-4">
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-2 rtl:mr-0 rtl:ml-2" />
                    <span>{t.instructor}: {course.instructor}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-2 rtl:mr-0 rtl:ml-2" />
                    <span>{t.duration}: {course.duration}</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2 rtl:mr-0 rtl:ml-2" />
                    <span>{t.schedule}: {course.schedule}</span>
                  </div>
                </div>

                <div className="flex justify-between items-center mb-4">
                  <div>
                    <span className="text-2xl font-bold text-emerald-600">${course.price}</span>
                  </div>
                  <div className="text-right rtl:text-left">
                    <p className="text-sm text-gray-600">
                      {course.enrolled}/{course.capacity} {t.enrolled.toLowerCase()}
                    </p>
                    <p className="text-xs text-gray-500">
                      {availableSpots} {t.availableSpots.toLowerCase()}
                    </p>
                  </div>
                </div>

                <div className="flex space-x-2 rtl:space-x-reverse">
                  <button
                    onClick={() => {
                      setSelectedCourse(course);
                      setShowRegistrationModal(true);
                    }}
                    disabled={isFull}
                    className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
                      isFull
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        : 'bg-emerald-600 text-white hover:bg-emerald-700'
                    }`}
                  >
                    {isFull ? t.courseFull : t.registerNow}
                  </button>
                  <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 text-sm">
                    {t.viewDetails}
                  </button>
                </div>

                {!isFull && (
                  <div className="mt-3">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-emerald-600 h-2 rounded-full transition-all"
                        style={{ width: `${(course.enrolled / course.capacity) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {filteredCourses.length === 0 && (
        <div className="text-center py-12">
          <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">No courses found matching your criteria.</p>
        </div>
      )}

      {showRegistrationModal && <RegistrationModal />}
    </div>
  );
};

export default CourseRegistration;