export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'student';
  avatar?: string;
  enrolledCourses?: string[];
}

export interface Course {
  id: string;
  title: string;
  titleAr: string;
  language: 'arabic' | 'english';
  level: 'beginner' | 'intermediate' | 'advanced';
  instructor: string;
  duration: string;
  schedule: string;
  price: number;
  enrolled: number;
  capacity: number;
  description: string;
  descriptionAr: string;
  image: string;
  startDate: string;
}

export interface AttendanceRecord {
  id: string;
  studentId: string;
  courseId: string;
  date: string;
  status: 'present' | 'absent' | 'late';
  studentName: string;
  courseName: string;
}

export interface Student {
  id: string;
  name: string;
  email: string;
  phone: string;
  enrolledCourses: Course[];
  joinDate: string;
  totalClasses: number;
  attendedClasses: number;
}