import { Course, Student, AttendanceRecord } from '../types';

export const mockCourses: Course[] = [
  {
    id: '1',
    title: 'Arabic for Beginners',
    titleAr: 'العربية للمبتدئين',
    language: 'arabic',
    level: 'beginner',
    instructor: 'Dr. Fatima Al-Zahra',
    duration: '3 months',
    schedule: 'Mon, Wed, Fri - 6:00 PM',
    price: 299,
    enrolled: 18,
    capacity: 25,
    description: 'Learn Arabic from scratch with native speakers. Perfect for complete beginners.',
    descriptionAr: 'تعلم اللغة العربية من الصفر مع متحدثين أصليين. مثالي للمبتدئين تماماً.',
    image: 'https://images.pexels.com/photos/256417/pexels-photo-256417.jpeg',
    startDate: '2024-02-01'
  },
  {
    id: '2',
    title: 'Business English',
    titleAr: 'الإنجليزية التجارية',
    language: 'english',
    level: 'intermediate',
    instructor: 'Prof. Sarah Johnson',
    duration: '4 months',
    schedule: 'Tue, Thu - 7:00 PM',
    price: 399,
    enrolled: 22,
    capacity: 30,
    description: 'Master professional English for business communication and presentations.',
    descriptionAr: 'أتقن الإنجليزية المهنية للتواصل التجاري والعروض التقديمية.',
    image: 'https://images.pexels.com/photos/7688336/pexels-photo-7688336.jpeg',
    startDate: '2024-02-15'
  },
  {
    id: '3',
    title: 'Advanced Arabic Literature',
    titleAr: 'الأدب العربي المتقدم',
    language: 'arabic',
    level: 'advanced',
    instructor: 'Dr. Omar Al-Mansouri',
    duration: '6 months',
    schedule: 'Sat, Sun - 10:00 AM',
    price: 499,
    enrolled: 12,
    capacity: 20,
    description: 'Dive deep into classical and modern Arabic literature and poetry.',
    descriptionAr: 'تعمق في الأدب والشعر العربي الكلاسيكي والحديث.',
    image: 'https://images.pexels.com/photos/694740/pexels-photo-694740.jpeg',
    startDate: '2024-03-01'
  },
  {
    id: '4',
    title: 'English Conversation Club',
    titleAr: 'نادي المحادثة الإنجليزية',
    language: 'english',
    level: 'beginner',
    instructor: 'Ms. Emma Wilson',
    duration: '2 months',
    schedule: 'Daily - 5:00 PM',
    price: 199,
    enrolled: 28,
    capacity: 35,
    description: 'Practice speaking English in a friendly, supportive environment.',
    descriptionAr: 'مارس التحدث بالإنجليزية في بيئة ودية وداعمة.',
    image: 'https://images.pexels.com/photos/5212345/pexels-photo-5212345.jpeg',
    startDate: '2024-01-20'
  }
];

export const mockStudents: Student[] = [
  {
    id: '1',
    name: 'Ahmed Hassan',
    email: 'ahmed@email.com',
    phone: '+1234567890',
    enrolledCourses: [mockCourses[0], mockCourses[1]],
    joinDate: '2024-01-15',
    totalClasses: 45,
    attendedClasses: 42
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    email: 'sarah@email.com',
    phone: '+1234567891',
    enrolledCourses: [mockCourses[2]],
    joinDate: '2024-01-10',
    totalClasses: 30,
    attendedClasses: 28
  },
  {
    id: '3',
    name: 'Mohammed Al-Rashid',
    email: 'mohammed@email.com',
    phone: '+1234567892',
    enrolledCourses: [mockCourses[3]],
    joinDate: '2024-01-20',
    totalClasses: 20,
    attendedClasses: 19
  }
];

export const mockAttendance: AttendanceRecord[] = [
  {
    id: '1',
    studentId: '1',
    courseId: '1',
    date: '2024-01-22',
    status: 'present',
    studentName: 'Ahmed Hassan',
    courseName: 'Arabic for Beginners'
  },
  {
    id: '2',
    studentId: '2',
    courseId: '2',
    date: '2024-01-22',
    status: 'absent',
    studentName: 'Sarah Johnson',
    courseName: 'Business English'
  },
  {
    id: '3',
    studentId: '3',
    courseId: '3',
    date: '2024-01-22',
    status: 'late',
    studentName: 'Mohammed Al-Rashid',
    courseName: 'Advanced Arabic Literature'
  }
];