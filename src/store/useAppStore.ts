import { create } from 'zustand'

const NAV_ITEMS = [
  { id: 'dashboard', label: 'Dashboard', icon: 'LayoutDashboard', category: 'main' },
  { id: 'super-admin', label: 'Super Admin', icon: 'Shield', category: 'admin' },
  { id: 'sis', label: 'Student Info System', icon: 'Users', category: 'academic' },
  { id: 'lms', label: 'LMS', icon: 'GraduationCap', category: 'academic' },
  { id: 'teacher', label: 'Teacher Portal', icon: 'BookOpen', category: 'academic' },
  { id: 'student', label: 'Student Portal', icon: 'UserCheck', category: 'academic' },
  { id: 'parent', label: 'Parent Portal', icon: 'Heart', category: 'academic' },
  { id: 'admission', label: 'Admissions', icon: 'ClipboardList', category: 'admin' },
  { id: 'examination', label: 'Examinations', icon: 'FileText', category: 'academic' },
  { id: 'finance', label: 'Finance & Fees', icon: 'IndianRupee', category: 'admin' },
  { id: 'hr', label: 'HR & Payroll', icon: 'Briefcase', category: 'admin' },
  { id: 'transport', label: 'Transport', icon: 'Bus', category: 'campus' },
  { id: 'library', label: 'Library', icon: 'Library', category: 'campus' },
  { id: 'hostel', label: 'Hostel', icon: 'Building2', category: 'campus' },
  { id: 'health', label: 'Health & Wellness', icon: 'HeartPulse', category: 'campus' },
  { id: 'communication', label: 'Communication', icon: 'MessageSquare', category: 'campus' },
  { id: 'analytics', label: 'AI Analytics', icon: 'Brain', category: 'intelligence' },
  { id: 'id-cards', label: 'Smart ID Cards', icon: 'CreditCard', category: 'campus' },
]

const useAppStore = create((set, get) => ({
  // Navigation
  activeView: 'dashboard',
  sidebarOpen: true,
  sidebarCollapsed: false,
  darkMode: false,
  isLoggedIn: false,
  currentUser: null,
  searchOpen: false,
  notificationOpen: false,
  aiAssistantOpen: false,
  activeRole: 'admin',

  setActiveView: (view) => set({ activeView: view }),
  setSidebarOpen: (open) => set({ sidebarOpen: open }),
  setSidebarCollapsed: (collapsed) => set({ sidebarCollapsed: collapsed }),
  toggleDarkMode: () => set((state) => {
    const newDark = !state.darkMode
    if (typeof document !== 'undefined') {
      document.documentElement.classList.toggle('dark', newDark)
    }
    return { darkMode: newDark }
  }),
  setDarkMode: (dark) => {
    if (typeof document !== 'undefined') {
      document.documentElement.classList.toggle('dark', dark)
    }
    set({ darkMode: dark })
  },
  login: (role) => set({
    isLoggedIn: true,
    activeRole: role || 'admin',
    currentUser: {
      name: role === 'student' ? 'Aarav Sharma' : role === 'teacher' ? 'Dr. Priya Menon' : role === 'parent' ? 'Rajesh Kumar' : 'Admin User',
      role: role || 'admin',
      avatar: null,
      campus: 'Birla Open Minds International School, Singur'
    }
  }),
  logout: () => set({ isLoggedIn: false, activeView: 'dashboard', currentUser: null }),
  setSearchOpen: (open) => set({ searchOpen: open }),
  setNotificationOpen: (open) => set({ notificationOpen: open }),
  setAiAssistantOpen: (open) => set({ aiAssistantOpen: open }),

  // Notifications data
  notifications: [
    { id: 1, title: 'New Admission Application', message: '5 new applications pending review', time: '2 min ago', type: 'info', read: false },
    { id: 2, title: 'Fee Payment Received', message: '₹45,000 received from Class X-A students', time: '15 min ago', type: 'success', read: false },
    { id: 3, title: 'Attendance Alert', message: '12 students absent in Grade VIII-B today', time: '1 hr ago', type: 'warning', read: false },
    { id: 4, title: 'Board Exam Schedule', message: 'CBSE Board exam schedule published', time: '3 hrs ago', type: 'info', read: true },
    { id: 5, title: 'Transport Delay', message: 'Bus Route 7 delayed by 15 minutes', time: '4 hrs ago', type: 'warning', read: true },
  ],

  navItems: NAV_ITEMS,
}))

export default useAppStore
