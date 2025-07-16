import React from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { LanguageProvider } from './contexts/LanguageContext';
import Header from './components/Layout/Header';
import AuthContainer from './components/Auth/AuthContainer';
import AdminDashboard from './components/Dashboard/AdminDashboard';
import StudentDashboard from './components/Dashboard/StudentDashboard';
import CourseRegistration from './components/Courses/CourseRegistration';
import ContactForm from './components/Contact/ContactForm';

const AppContent: React.FC = () => {
  const { user } = useAuth();
  const [currentView, setCurrentView] = React.useState<'dashboard' | 'courses' | 'contact'>('dashboard');

  if (!user) {
    return <AuthContainer />;
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
          <button
            onClick={() => setCurrentView('contact')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              currentView === 'contact'
                ? 'border-emerald-500 text-emerald-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Contact
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
        {currentView === 'contact' && <ContactForm />}
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