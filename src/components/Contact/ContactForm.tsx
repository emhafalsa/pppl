import React, { useState } from 'react';
import { Send, Mail, User, MessageSquare, CheckCircle } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { messageApi } from '../../services/api';

const ContactForm: React.FC = () => {
  const { language } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const translations = {
    en: {
      title: 'Contact Us',
      subtitle: 'Get in touch with our language learning experts',
      name: 'Full Name',
      email: 'Email Address',
      message: 'Your Message',
      messagePlaceholder: 'Tell us how we can help you with your language learning journey...',
      submit: 'Send Message',
      submitting: 'Sending...',
      success: 'Message sent successfully!',
      successSubtitle: 'We\'ll get back to you within 24 hours.',
      error: 'Failed to send message. Please try again.',
      required: 'This field is required'
    },
    ar: {
      title: 'اتصل بنا',
      subtitle: 'تواصل مع خبراء تعلم اللغات لدينا',
      name: 'الاسم الكامل',
      email: 'البريد الإلكتروني',
      message: 'رسالتك',
      messagePlaceholder: 'أخبرنا كيف يمكننا مساعدتك في رحلة تعلم اللغة...',
      submit: 'إرسال الرسالة',
      submitting: 'جاري الإرسال...',
      success: 'تم إرسال الرسالة بنجاح!',
      successSubtitle: 'سنتواصل معك خلال 24 ساعة.',
      error: 'فشل في إرسال الرسالة. يرجى المحاولة مرة أخرى.',
      required: 'هذا الحقل مطلوب'
    }
  };

  const t = translations[language];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      await messageApi.createMessage(formData);
      setIsSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
    } catch (err) {
      setError(t.error);
      console.error('Contact form error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  if (isSubmitted) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
          <div className="bg-green-100 rounded-full p-4 w-20 h-20 mx-auto mb-6 flex items-center justify-center">
            <CheckCircle className="h-10 w-10 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">{t.success}</h2>
          <p className="text-gray-600 mb-6">{t.successSubtitle}</p>
          <button
            onClick={() => setIsSubmitted(false)}
            className="bg-emerald-600 text-white px-6 py-3 rounded-lg hover:bg-emerald-700 transition-colors"
          >
            Send Another Message
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">{t.title}</h1>
        <p className="text-gray-600">{t.subtitle}</p>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                {t.name}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none rtl:left-auto rtl:right-0 rtl:pr-3">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="block w-full pl-10 rtl:pl-3 rtl:pr-10 px-3 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  placeholder="John Doe"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                {t.email}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none rtl:left-auto rtl:right-0 rtl:pr-3">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="block w-full pl-10 rtl:pl-3 rtl:pr-10 px-3 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  placeholder="john@example.com"
                />
              </div>
            </div>
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
              {t.message}
            </label>
            <div className="relative">
              <div className="absolute top-3 left-3 pointer-events-none rtl:left-auto rtl:right-3">
                <MessageSquare className="h-5 w-5 text-gray-400" />
              </div>
              <textarea
                id="message"
                name="message"
                rows={6}
                required
                value={formData.message}
                onChange={handleChange}
                className="block w-full pl-10 rtl:pl-3 rtl:pr-10 px-3 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                placeholder={t.messagePlaceholder}
              />
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full flex justify-center items-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-gradient-to-r from-emerald-600 to-emerald-800 hover:from-emerald-700 hover:to-emerald-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
          >
            <Send className="h-5 w-5 mr-2 rtl:mr-0 rtl:ml-2" />
            {isSubmitting ? t.submitting : t.submit}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;