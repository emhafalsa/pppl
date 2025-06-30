import React from 'react';
import { BookOpen, Calendar, Clock, TrendingUp, Star, Users } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useAuth } from '../../contexts/AuthContext';
import { mockCourses } from '../../data/mockData';

const StudentDashboard: React.FC = () => {
  const { language } = useLanguage();
  const { user } = useAuth();

  const translations = {
    en: {
      welcome: 'Welcome back',
      dashboard: 'Student Dashboard',
      myCourses: 'My Courses',
      upcomingClasses: 'Upcoming Classes',
      progress: 'Progress',
      achievements: 'Achievements',
      viewAll: 'View All',
      continueLesson: 'Continue Lesson',
      nextClass: 'Next Class',
      today: 'Today',
      attendanceRate: 'Attendance Rate',
      coursesCompleted: 'Courses Completed',
      hoursLearned: 'Hours Learned',
      streakDays: 'Day Streak',
      level: 'Level',
      beginner: 'Beginner',
      intermediate: 'Intermediate',
      advanced: 'Advanced',
      enrolledStudents: 'Students'
    },
    ar: {
      welcome: 'مرحباً بعودتك',
      dashboard: 'لوحة الطالب',
      myCourses: 'دوراتي',
      upcomingClasses: 'الفصول القادمة',
      progress: 'التقدم',
      achievements: 'الإنجازات',
      viewAll: 'عرض الكل',
      continueLesson: 'متابعة الدرس',
      nextClass: 'الفصل التالي',
      today: 'اليوم',
      attendanceRate: 'نسبة الحضور',
      coursesCompleted: 'الدورات المكتملة',
      hoursLearned: 'ساعات التعلم',
      streakDays: 'أيام متتالية',
      level: 'المستوى',
      beginner: 'مبتدئ',
      intermediate: 'متوسط',
      advanced: 'متقدم',
      enrolledStudents: 'طلاب'
    }
  };

  const t = translations[language];

  // Mock user enrolled courses
  const enrolledCourses = mockCourses.filter(course => 
    user?.enrolledCourses?.includes(course.id)
  );

  const stats = [
    {
      title: t.attendanceRate,
      value: '92%',
      icon: Calendar,
      color: 'bg-green-500',
      change: '+5%'
    },
    {
      title: t.coursesCompleted,
      value: '3',
      icon: BookOpen,
      color: 'bg-blue-500',
      change: '+1'
    },
    {
      title: t.hoursLearned,
      value: '127',
      icon: Clock,
      color: 'bg-purple-500',
      change: '+12'
    },
    {
      title: t.streakDays,
      value: '15',
      icon: TrendingUp,
      color: 'bg-orange-500',
      change: '+1'
    }
  ];

  const upcomingClasses = [
    {
      id: '1',
      course: 'Arabic for Beginners',
      courseAr: 'العربية للمبتدئين',
      time: '6:00 PM',
      date: 'Today',
      instructor: 'Dr. Fatima Al-Zahra'
    },
    {
      id: '2',
      course: 'Business English',
      courseAr: 'الإنجليزية التجارية',
      time: '7:00 PM',
      date: 'Tomorrow',
      instructor: 'Prof. Sarah Johnson'
    }
  ];

  const achievements = [
    { id: '1', title: 'First Week Complete', titleAr: 'إكمال الأسبوع الأول', icon: Star },
    { id: '2', title: '50 Hours Studied', titleAr: '50 ساعة دراسة', icon: Clock },
    { id: '3', title: 'Perfect Attendance', titleAr: 'حضور مثالي', icon: Calendar }
  ];

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

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-emerald-600 to-emerald-800 rounded-lg p-6 text-white">
        <h1 className="text-2xl font-bold">
          {t.welcome}, {user?.name}!
        </h1>
        <p className="text-emerald-100 mt-2">
          Continue your language learning journey
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className={`${stat.color} p-3 rounded-lg`}>
                <stat.icon className="h-6 w-6 text-white" />
              </div>
              <div className="ml-4 rtl:ml-0 rtl:mr-4">
                <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                <div className="flex items-center">
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <span className="ml-2 rtl:ml-0 rtl:mr-2 text-sm text-green-600">{stat.change}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* My Courses */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
            <h2 className="text-lg font-medium text-gray-900">{t.myCourses}</h2>
            <button className="text-emerald-600 hover:text-emerald-800 text-sm font-medium">
              {t.viewAll}
            </button>
          </div>
          <div className="p-6 space-y-4">
            {enrolledCourses.map((course) => (
              <div key={course.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">
                      {language === 'ar' ? course.titleAr : course.title}
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">{course.instructor}</p>
                    <div className="flex items-center mt-2">
                      <span className="text-xs bg-emerald-100 text-emerald-800 px-2 py-1 rounded-full">
                        {getLevelTranslation(course.level)}
                      </span>
                      <span className="text-xs text-gray-500 ml-2 rtl:ml-0 rtl:mr-2">
                        {course.enrolled} {t.enrolledStudents.toLowerCase()}
                      </span>
                    </div>
                  </div>
                  <button className="bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-emerald-700">
                    {t.continueLesson}
                  </button>
                </div>
                <div className="mt-4">
                  <div className="flex justify-between text-sm text-gray-600 mb-1">
                    <span>{t.progress}</span>
                    <span>75%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-emerald-600 h-2 rounded-full" style={{ width: '75%' }}></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Classes */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">{t.upcomingClasses}</h2>
          </div>
          <div className="p-6 space-y-4">
            {upcomingClasses.map((classItem) => (
              <div key={classItem.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center">
                  <div className="bg-emerald-100 p-2 rounded-lg">
                    <BookOpen className="h-5 w-5 text-emerald-600" />
                  </div>
                  <div className="ml-3 rtl:ml-0 rtl:mr-3">
                    <p className="text-sm font-medium text-gray-900">
                      {language === 'ar' ? classItem.courseAr : classItem.course}
                    </p>
                    <p className="text-sm text-gray-500">{classItem.instructor}</p>
                  </div>
                </div>
                <div className="text-right rtl:text-left">
                  <p className="text-sm font-medium text-gray-900">{classItem.time}</p>
                  <p className="text-sm text-gray-500">{classItem.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Achievements */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">{t.achievements}</h2>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {achievements.map((achievement) => (
              <div key={achievement.id} className="flex items-center p-4 bg-yellow-50 rounded-lg">
                <div className="bg-yellow-500 p-2 rounded-full">
                  <achievement.icon className="h-5 w-5 text-white" />
                </div>
                <div className="ml-3 rtl:ml-0 rtl:mr-3">
                  <p className="text-sm font-medium text-gray-900">
                    {language === 'ar' ? achievement.titleAr : achievement.title}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;