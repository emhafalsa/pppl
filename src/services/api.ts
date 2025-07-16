const API_BASE_URL = 'http://localhost:3001/api';

// Generic API request function
async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const config: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(url, config);
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
}

// User API functions
export const userApi = {
  // Get all users
  getUsers: () => apiRequest<{ users: any[] }>('/users'),
  
  // Create new user
  createUser: (userData: { name: string; email: string; role?: string }) =>
    apiRequest<{ success: boolean; user: any }>('/users', {
      method: 'POST',
      body: JSON.stringify(userData),
    }),
  
  // Login user
  login: (credentials: { email: string; password: string }) =>
    apiRequest<{ success: boolean; user?: any; message?: string }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    }),
};

// Message API functions
export const messageApi = {
  // Get all messages
  getMessages: () => apiRequest<{ messages: any[] }>('/messages'),
  
  // Create new message
  createMessage: (messageData: { name: string; email: string; message: string }) =>
    apiRequest<{ success: boolean; message: any }>('/messages', {
      method: 'POST',
      body: JSON.stringify(messageData),
    }),
};

// Course registration API functions
export const registrationApi = {
  // Get all registrations
  getRegistrations: () => apiRequest<{ registrations: any[] }>('/registrations'),
  
  // Create new registration
  createRegistration: (registrationData: {
    user_name: string;
    email: string;
    phone?: string;
    course_id: string;
    course_title: string;
    experience?: string;
    goals?: string;
  }) =>
    apiRequest<{ success: boolean; registration: any }>('/registrations', {
      method: 'POST',
      body: JSON.stringify(registrationData),
    }),
};

// Health check
export const healthApi = {
  check: () => apiRequest<{ status: string; timestamp: string }>('/health'),
};