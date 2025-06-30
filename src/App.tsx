import React from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { LanguageProvider } from './contexts/LanguageContext';
import Header from './components/Layout/Header';
import LoginForm from './components/Auth/LoginForm';
import AdminDashboard from './components/Dashboard/AdminDashboard';
import StudentDashboard from './components/Dashboard/StudentDashboard';
import CourseRegistration from './components/Courses/CourseRegistration';

const AppContent: React.FC = () => {
  const { user } = useAuth();
  const [currentView, setCurrentView] = React.useState<'dashboard' | 'courses' | 'attendance'>('dashboard');

  if (!user) {
    return <LoginForm />;
  }

  const Navigation = () => (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex space-x-8 rtl:space-x-reverse">
          <button
            onClick={() => setCurrentView('dashboard')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              currentView === 'dashboard'
                ? 'border-emerald-500 text-emerald-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Dashboard
          </button>
          <button
            onClick={() => setCurrentView('courses')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              currentView === 'courses'
                ? 'border-emerald-500 text-emerald-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Courses
          </button>
        </div>
      </div>
    </nav>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Navigation />
      
      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {currentView === 'dashboard' && (
          user.role === 'admin' ? <AdminDashboard /> : <StudentDashboard />
        )}
        {currentView === 'courses' && <CourseRegistration />}
      </main>
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <LanguageProvider>
        <AppContent />
      </LanguageProvider>
    </AuthProvider>
  );
}

export default App;