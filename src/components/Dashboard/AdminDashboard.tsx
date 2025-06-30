import React, { useState } from 'react';
import { Users, BookOpen, Calendar, TrendingUp, Plus, Eye, Edit, Trash2 } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { mockStudents, mockCourses, mockAttendance } from '../../data/mockData';
import { Student, Course } from '../../types';

const AdminDashboard: React.FC = () => {
  const { language } = useLanguage();
  const [activeTab, setActiveTab] = useState<'overview' | 'students' | 'courses' | 'attendance'>('overview');
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [showStudentModal, setShowStudentModal] = useState(false);

  const translations = {
    en: {
      dashboard: 'Admin Dashboard',
      overview: 'Overview',
      students: 'Students',
      courses: 'Courses',
      attendance: 'Attendance',
      totalStudents: 'Total Students',
      activeCourses: 'Active Courses',
      todayAttendance: 'Today\'s Attendance',
      revenue: 'Monthly Revenue',
      recentStudents: 'Recent Students',
      studentDetails: 'Student Details',
      name: 'Name',
      email: 'Email',
      phone: 'Phone',
      joinDate: 'Join Date',
      enrolledCourses: 'Enrolled Courses',
      attendanceRate: 'Attendance Rate',
      actions: 'Actions',
      view: 'View',
      edit: 'Edit',
      delete: 'Delete',
      close: 'Close',
      addStudent: 'Add Student',
      courseTitle: 'Course Title',
      instructor: 'Instructor',
      enrolled: 'Enrolled',
      capacity: 'Capacity',
      schedule: 'Schedule',
      status: 'Status',
      present: 'Present',
      absent: 'Absent',
      late: 'Late',
      date: 'Date',
      student: 'Student'
    },
    ar: {
      dashboard: 'لوحة التحكم الإدارية',
      overview: 'نظرة عامة',
      students: 'الطلاب',
      courses: 'الدورات',
      attendance: 'الحضور',
      totalStudents: 'إجمالي الطلاب',
      activeCourses: 'الدورات النشطة',
      todayAttendance: 'حضور اليوم',
      revenue: 'الإيرادات الشهرية',
      recentStudents: 'الطلاب الجدد',
      studentDetails: 'تفاصيل الطالب',
      name: 'الاسم',
      email: 'البريد الإلكتروني',
      phone: 'الهاتف',
      joinDate: 'تاريخ الانضمام',
      enrolledCourses: 'الدورات المسجلة',
      attendanceRate: 'نسبة الحضور',
      actions: 'الإجراءات',
      view: 'عرض',
      edit: 'تعديل',
      delete: 'حذف',
      close: 'إغلاق',
      addStudent: 'إضافة طالب',
      courseTitle: 'عنوان الدورة',
      instructor: 'المدرب',
      enrolled: 'المسجلين',
      capacity: 'السعة',
      schedule: 'الجدول',
      status: 'الحالة',
      present: 'حاضر',
      absent: 'غائب',
      late: 'متأخر',
      date: 'التاريخ',
      student: 'الطالب'
    }
  };

  const t = translations[language];

  const stats = [
    {
      title: t.totalStudents,
      value: mockStudents.length.toString(),
      icon: Users,
      color: 'bg-blue-500',
      change: '+12%'
    },
    {
      title: t.activeCourses,
      value: mockCourses.length.toString(),
      icon: BookOpen,
      color: 'bg-emerald-500',
      change: '+3%'
    },
    {
      title: t.todayAttendance,
      value: '85%',
      icon: Calendar,
      color: 'bg-yellow-500',
      change: '+5%'
    },
    {
      title: t.revenue,
      value: '$12,450',
      icon: TrendingUp,
      color: 'bg-purple-500',
      change: '+18%'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'present':
        return 'bg-green-100 text-green-800';
      case 'absent':
        return 'bg-red-100 text-red-800';
      case 'late':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const StudentModal = () => {
    if (!selectedStudent) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-90vh overflow-y-auto">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-gray-900">{t.studentDetails}</h3>
            <button
              onClick={() => setShowStudentModal(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              ×
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">{t.name}</label>
              <p className="mt-1 text-sm text-gray-900">{selectedStudent.name}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">{t.email}</label>
              <p className="mt-1 text-sm text-gray-900">{selectedStudent.email}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">{t.phone}</label>
              <p className="mt-1 text-sm text-gray-900">{selectedStudent.phone}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">{t.joinDate}</label>
              <p className="mt-1 text-sm text-gray-900">{selectedStudent.joinDate}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">{t.attendanceRate}</label>
              <p className="mt-1 text-sm text-gray-900">
                {Math.round((selectedStudent.attendedClasses / selectedStudent.totalClasses) * 100)}%
              </p>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">{t.enrolledCourses}</label>
            <div className="space-y-2">
              {selectedStudent.enrolledCourses.map((course) => (
                <div key={course.id} className="p-3 bg-gray-50 rounded-lg">
                  <p className="font-medium">{language === 'ar' ? course.titleAr : course.title}</p>
                  <p className="text-sm text-gray-600">{course.instructor}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 flex justify-end">
            <button
              onClick={() => setShowStudentModal(false)}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
            >
              {t.close}
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">{t.dashboard}</h1>
      </div>

      {/* Navigation Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8 rtl:space-x-reverse">
          {[
            { key: 'overview', label: t.overview },
            { key: 'students', label: t.students },
            { key: 'courses', label: t.courses },
            { key: 'attendance', label: t.attendance }
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as any)}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab.key
                  ? 'border-emerald-500 text-emerald-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
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

          {/* Recent Students */}
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900">{t.recentStudents}</h2>
            </div>
            <div className="divide-y divide-gray-200">
              {mockStudents.slice(0, 3).map((student) => (
                <div key={student.id} className="px-6 py-4 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{student.name}</p>
                    <p className="text-sm text-gray-500">{student.email}</p>
                  </div>
                  <div className="text-right rtl:text-left">
                    <p className="text-sm text-gray-500">{student.joinDate}</p>
                    <p className="text-sm font-medium text-gray-900">
                      {student.enrolledCourses.length} {t.courses.toLowerCase()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Students Tab */}
      {activeTab === 'students' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-gray-900">{t.students}</h2>
            <button className="flex items-center space-x-2 rtl:space-x-reverse bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700">
              <Plus className="h-4 w-4" />
              <span>{t.addStudent}</span>
            </button>
          </div>

          <div className="bg-white rounded-lg shadow overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left rtl:text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {t.name}
                  </th>
                  <th className="px-6 py-3 text-left rtl:text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {t.email}
                  </th>
                  <th className="px-6 py-3 text-left rtl:text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {t.enrolledCourses}
                  </th>
                  <th className="px-6 py-3 text-left rtl:text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {t.attendanceRate}
                  </th>
                  <th className="px-6 py-3 text-left rtl:text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {t.actions}
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {mockStudents.map((student) => (
                  <tr key={student.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {student.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {student.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {student.enrolledCourses.length}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {Math.round((student.attendedClasses / student.totalClasses) * 100)}%
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2 rtl:space-x-reverse">
                        <button
                          onClick={() => {
                            setSelectedStudent(student);
                            setShowStudentModal(true);
                          }}
                          className="text-emerald-600 hover:text-emerald-900"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        <button className="text-blue-600 hover:text-blue-900">
                          <Edit className="h-4 w-4" />
                        </button>
                        <button className="text-red-600 hover:text-red-900">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Courses Tab */}
      {activeTab === 'courses' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-gray-900">{t.courses}</h2>
            <button className="flex items-center space-x-2 rtl:space-x-reverse bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700">
              <Plus className="h-4 w-4" />
              <span>Add Course</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockCourses.map((course) => (
              <div key={course.id} className="bg-white rounded-lg shadow overflow-hidden">
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    {language === 'ar' ? course.titleAr : course.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">{course.instructor}</p>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-sm text-gray-500">
                      {course.enrolled}/{course.capacity} {t.enrolled.toLowerCase()}
                    </span>
                    <span className="text-lg font-bold text-emerald-600">
                      ${course.price}
                    </span>
                  </div>
                  <div className="flex space-x-2 rtl:space-x-reverse">
                    <button className="flex-1 bg-emerald-600 text-white py-2 px-4 rounded-lg hover:bg-emerald-700">
                      {t.view}
                    </button>
                    <button className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-300">
                      {t.edit}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Attendance Tab */}
      {activeTab === 'attendance' && (
        <div className="space-y-6">
          <h2 className="text-xl font-bold text-gray-900">{t.attendance}</h2>

          <div className="bg-white rounded-lg shadow overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left rtl:text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {t.student}
                  </th>
                  <th className="px-6 py-3 text-left rtl:text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {t.courseTitle}
                  </th>
                  <th className="px-6 py-3 text-left rtl:text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {t.date}
                  </th>
                  <th className="px-6 py-3 text-left rtl:text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {t.status}
                  </th>
                  <th className="px-6 py-3 text-left rtl:text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {t.actions}
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {mockAttendance.map((record) => (
                  <tr key={record.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {record.studentName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {record.courseName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {record.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(record.status)}`}>
                        {t[record.status as keyof typeof t] || record.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button className="text-blue-600 hover:text-blue-900">
                        <Edit className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {showStudentModal && <StudentModal />}
    </div>
  );
};

export default AdminDashboard;