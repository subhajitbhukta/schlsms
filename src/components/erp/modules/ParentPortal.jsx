'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Users, BookOpen, Calendar, Clock, CheckCircle2, XCircle,
  FileText, BarChart3, MessageSquare, GraduationCap, ChevronRight,
  Send, Download, Search, Star, TrendingUp, AlertTriangle, Heart,
  Target, Award, Bus, MapPin, Phone, Shield, Activity, Stethoscope,
  Syringe, Bell, Eye, CreditCard, Receipt, IndianRupee, Route,
  Navigation, Timer, ThumbsUp, PenTool, ClipboardCheck, Mail,
  CircleDollarSign, CalendarCheck, UserCheck, Wifi, Fuel,
  Bookmark, CircleAlert, HeartPulse, Apple, Brain, Sparkles,
  MessageCircle, ArrowRight, ExternalLink, Info, Filter,
  BadgeCheck, CircleCheck, CircleX, Clock4, GalleryHorizontalEnd,
  LayoutGrid
} from 'lucide-react'
import {
  BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Legend, RadarChart, Radar,
  PolarGrid, PolarAngleAxis, PolarRadiusAxis, PieChart, Pie, Cell,
  AreaChart, Area
} from 'recharts'
import useAppStore from '@/store/useAppStore'

// ─── Data ────────────────────────────────────────────────────────
const studentProfile = {
  name: 'Aarav Sharma',
  class: 'X-A',
  rollNo: 5,
  admissionNo: 'BOMIS-2021-0045',
  dob: '15 March 2011',
  parent: 'Rajesh Kumar',
  mother: 'Sunita Kumari',
  phone: '+91 98765 43210',
  email: 'rajesh.kumar@email.com',
  address: '42, Green Park Colony, Singur, Hooghly',
  bloodGroup: 'B+',
  avatar: 'AS',
}

const topStats = [
  { label: "Child's Attendance", value: '96%', sub: 'This Month', icon: UserCheck, gradient: 'from-emerald-800 to-emerald-600' },
  { label: 'Pending Fees', value: '₹12,000', sub: 'Q4 Tuition', icon: IndianRupee, gradient: 'from-rose-800 to-rose-600' },
  { label: 'Upcoming Events', value: '3', sub: 'This Week', icon: Calendar, gradient: 'from-amber-800 to-amber-600' },
  { label: 'Messages', value: '5', sub: 'Unread', icon: MessageSquare, gradient: 'from-blue-900 to-blue-600' },
]

const notifications = [
  { id: 1, type: 'attendance', title: 'Attendance Marked', message: 'Aarav was marked present for all periods today', time: '2:30 PM', icon: UserCheck, color: 'text-emerald-500 bg-emerald-500/10' },
  { id: 2, type: 'grade', title: 'Mathematics Test Result', message: 'Aarav scored 88/100 in Unit Test 4 - Quadratic Equations', time: '1:15 PM', icon: Award, color: 'text-birla-gold bg-birla-gold/10' },
  { id: 3, type: 'event', title: 'Annual Day Invitation', message: 'Annual Day celebration on March 25, 2026 at School Auditorium', time: '11:00 AM', icon: Calendar, color: 'text-purple-500 bg-purple-500/10' },
  { id: 4, type: 'fee', title: 'Fee Reminder', message: 'Q4 tuition fee of ₹12,000 is due by March 31, 2026', time: '9:00 AM', icon: IndianRupee, color: 'text-rose-500 bg-rose-500/10' },
  { id: 5, type: 'homework', title: 'Homework Submitted', message: 'Aarav submitted Science homework - Light & Reflection', time: 'Yesterday', icon: CheckCircle2, color: 'text-blue-500 bg-blue-500/10' },
  { id: 6, type: 'transport', title: 'Bus Delayed', message: 'Route 3 bus running 10 minutes late due to traffic', time: 'Yesterday', icon: Bus, color: 'text-amber-500 bg-amber-500/10' },
  { id: 7, type: 'health', title: 'Health Checkup Due', message: 'Annual health checkup scheduled for March 20, 2026', time: '2 days ago', icon: Heart, color: 'text-pink-500 bg-pink-500/10' },
  { id: 8, type: 'remark', title: 'Teacher Remark', message: 'Mrs. Gupta: "Excellent performance in class discussion today!"', time: '2 days ago', icon: PenTool, color: 'text-teal-500 bg-teal-500/10' },
]

const feeBreakdown = [
  { id: 1, category: 'Tuition Fee (Q4)', amount: 12000, status: 'Pending', dueDate: '31 Mar 2026' },
  { id: 2, category: 'Tuition Fee (Q3)', amount: 12000, status: 'Paid', dueDate: '31 Dec 2025', paidDate: '28 Dec 2025', receipt: 'REC-2025-0342' },
  { id: 3, category: 'Transport Fee (Q4)', amount: 4500, status: 'Pending', dueDate: '31 Mar 2026' },
  { id: 4, category: 'Transport Fee (Q3)', amount: 4500, status: 'Paid', dueDate: '31 Dec 2025', paidDate: '25 Dec 2025', receipt: 'REC-2025-0341' },
  { id: 5, category: 'Lab Fee (Annual)', amount: 3000, status: 'Paid', dueDate: '30 Sep 2025', paidDate: '15 Sep 2025', receipt: 'REC-2025-0210' },
  { id: 6, category: 'Exam Fee (SA2)', amount: 2500, status: 'Pending', dueDate: '15 Apr 2026' },
  { id: 7, category: 'Library Fee (Annual)', amount: 1500, status: 'Paid', dueDate: '30 Apr 2025', paidDate: '20 Apr 2025', receipt: 'REC-2025-0098' },
  { id: 8, category: 'Sports Fee (Annual)', amount: 2000, status: 'Paid', dueDate: '30 Apr 2025', paidDate: '18 Apr 2025', receipt: 'REC-2025-0095' },
]

const paymentHistoryData = [
  { month: 'Apr', amount: 21500 },
  { month: 'May', amount: 3000 },
  { month: 'Jun', amount: 0 },
  { month: 'Jul', amount: 16500 },
  { month: 'Aug', amount: 2500 },
  { month: 'Sep', amount: 3000 },
  { month: 'Oct', amount: 16500 },
  { month: 'Nov', amount: 2000 },
  { month: 'Dec', amount: 16500 },
  { month: 'Jan', amount: 1000 },
  { month: 'Feb', amount: 500 },
  { month: 'Mar', amount: 0 },
]

const subjectGrades = [
  { subject: 'English', marks: 88, classAvg: 76, grade: 'A2', trend: 'up' },
  { subject: 'Hindi', marks: 82, classAvg: 72, grade: 'A2', trend: 'up' },
  { subject: 'Mathematics', marks: 92, classAvg: 68, grade: 'A1', trend: 'up' },
  { subject: 'Science', marks: 85, classAvg: 74, grade: 'A2', trend: 'stable' },
  { subject: 'Social Science', marks: 78, classAvg: 70, grade: 'B1', trend: 'up' },
  { subject: 'Sanskrit', marks: 90, classAvg: 75, grade: 'A1', trend: 'up' },
  { subject: 'IT/Computer', marks: 95, classAvg: 80, grade: 'A1', trend: 'up' },
]

const progressTrendData = [
  { exam: 'FA1', aarav: 82, classAvg: 70 },
  { exam: 'FA2', aarav: 85, classAvg: 72 },
  { exam: 'SA1', aarav: 88, classAvg: 71 },
  { exam: 'FA3', aarav: 86, classAvg: 73 },
  { exam: 'FA4', aarav: 90, classAvg: 74 },
  { exam: 'SA2', aarav: 91, classAvg: 72 },
]

const transportData = {
  routeNo: 3,
  routeName: 'Singur - Haripal Route',
  busNo: 'WB-12-AB-4523',
  driverName: 'Sunil Mondal',
  driverPhone: '+91 87654 32109',
  attendant: 'Mira Das',
  eta: '7:45 AM',
  currentLocation: 'Haripal More',
  status: 'On Time',
  pickupTime: '7:15 AM',
  pickupPoint: 'Green Park Colony Gate',
  dropTime: '2:45 PM',
  dropPoint: 'Green Park Colony Gate',
  stops: [
    { name: 'School Campus', time: '7:55 AM', type: 'start' },
    { name: 'Haripal More', time: '7:45 AM', type: 'passing' },
    { name: 'Green Park Colony', time: '7:15 AM', type: 'pickup' },
    { name: 'Singur Station', time: '7:05 AM', type: 'passing' },
    { name: 'Basubati More', time: '6:55 AM', type: 'end' },
  ],
}

const ptmSlots = [
  { id: 1, teacher: 'Mrs. Anjali Gupta', subject: 'Mathematics', date: 'Mar 22, 2026', slots: [
    { time: '9:00 AM', status: 'available' },
    { time: '9:15 AM', status: 'available' },
    { time: '9:30 AM', status: 'booked' },
    { time: '9:45 AM', status: 'available' },
    { time: '10:00 AM', status: 'available' },
  ]},
  { id: 2, teacher: 'Mr. Rakesh Sinha', subject: 'Science', date: 'Mar 22, 2026', slots: [
    { time: '9:00 AM', status: 'available' },
    { time: '9:15 AM', status: 'available' },
    { time: '9:30 AM', status: 'available' },
    { time: '9:45 AM', status: 'booked' },
    { time: '10:00 AM', status: 'available' },
  ]},
  { id: 3, teacher: 'Mrs. Priya Das', subject: 'English', date: 'Mar 22, 2026', slots: [
    { time: '9:00 AM', status: 'booked' },
    { time: '9:15 AM', status: 'available' },
    { time: '9:30 AM', status: 'available' },
    { time: '9:45 AM', status: 'available' },
    { time: '10:00 AM', status: 'booked' },
  ]},
  { id: 4, teacher: 'Mr. Vikram Roy', subject: 'Social Science', date: 'Mar 23, 2026', slots: [
    { time: '9:00 AM', status: 'available' },
    { time: '9:15 AM', status: 'available' },
    { time: '9:30 AM', status: 'available' },
    { time: '9:45 AM', status: 'available' },
    { time: '10:00 AM', status: 'available' },
  ]},
]

const homeworkData = [
  { id: 1, subject: 'Mathematics', title: 'Quadratic Equations - Exercise 4.3', dueDate: 'Mar 14, 2026', status: 'completed', submittedDate: 'Mar 13, 2026', grade: 'A2' },
  { id: 2, subject: 'Science', title: 'Light - Ray Diagrams Worksheet', dueDate: 'Mar 15, 2026', status: 'completed', submittedDate: 'Mar 14, 2026', grade: 'A1' },
  { id: 3, subject: 'English', title: 'Essay - Impact of Technology', dueDate: 'Mar 16, 2026', status: 'pending', submittedDate: null, grade: null },
  { id: 4, subject: 'Hindi', title: 'पद्यांश - कविता विश्लेषण', dueDate: 'Mar 14, 2026', status: 'overdue', submittedDate: null, grade: null },
  { id: 5, subject: 'Social Science', title: 'Map Work - Indian Resources', dueDate: 'Mar 17, 2026', status: 'pending', submittedDate: null, grade: null },
  { id: 6, subject: 'Sanskrit', title: 'Shabda Roop - Practice Sheet', dueDate: 'Mar 13, 2026', status: 'completed', submittedDate: 'Mar 12, 2026', grade: 'B1' },
  { id: 7, subject: 'IT/Computer', title: 'Python Program - Sorting Algorithms', dueDate: 'Mar 18, 2026', status: 'pending', submittedDate: null, grade: null },
]

const healthData = {
  wellnessScore: 88,
  bmi: '18.2',
  bmiStatus: 'Normal',
  height: '158 cm',
  weight: '45.5 kg',
  vision: '6/6 (Normal)',
  lastCheckup: 'Sep 15, 2025',
  nextCheckup: 'Mar 20, 2026',
  vaccinations: [
    { name: 'BCG', date: 'At Birth', status: 'Completed' },
    { name: 'DPT Booster', date: 'Jul 2019', status: 'Completed' },
    { name: 'MMR', date: 'Mar 2018', status: 'Completed' },
    { name: 'Hepatitis B', date: 'Aug 2019', status: 'Completed' },
    { name: 'Typhoid', date: 'Jan 2024', status: 'Completed' },
    { name: 'COVID-19 (1st Dose)', date: 'Mar 2023', status: 'Completed' },
    { name: 'COVID-19 (2nd Dose)', date: 'Apr 2023', status: 'Completed' },
    { name: 'Flu Vaccine', date: 'Nov 2025', status: 'Completed' },
  ],
  medicalVisits: [
    { date: 'Feb 10, 2026', reason: 'Seasonal Cold & Cough', doctor: 'Dr. S. Mukherjee', prescription: 'Antihistamines + Rest' },
    { date: 'Nov 22, 2025', reason: 'Sports Injury - Ankle Sprain', doctor: 'Dr. R. Banerjee', prescription: 'Rest + Ice + Compression' },
    { date: 'Sep 15, 2025', reason: 'Annual Health Checkup', doctor: 'School Medical Team', prescription: 'All parameters normal' },
    { date: 'Jul 08, 2025', reason: 'Food Poisoning', doctor: 'Dr. S. Mukherjee', prescription: 'ORS + Light Diet' },
  ],
  allergies: ['Dust Mite (Mild)', 'Peanuts (Moderate)'],
  conditions: 'None',
}

const circulars = [
  { id: 1, title: 'Annual Day Celebration - Schedule & Guidelines', date: 'Mar 14, 2026', category: 'Event', read: false, priority: 'high' },
  { id: 2, title: 'SA2 Examination Timetable - Class X', date: 'Mar 12, 2026', category: 'Exam', read: false, priority: 'high' },
  { id: 3, title: 'Parent-Teacher Meeting - March 22-23', date: 'Mar 10, 2026', category: 'PTM', read: true, priority: 'medium' },
  { id: 4, title: 'Summer Vacation Homework Distribution', date: 'Mar 8, 2026', category: 'Academic', read: true, priority: 'low' },
  { id: 5, title: 'Fee Payment Deadline Reminder - Q4', date: 'Mar 7, 2026', category: 'Finance', read: true, priority: 'high' },
  { id: 6, title: 'Sports Day Practice Schedule', date: 'Mar 5, 2026', category: 'Sports', read: true, priority: 'low' },
  { id: 7, title: 'Health Checkup Camp - March 20', date: 'Mar 3, 2026', category: 'Health', read: false, priority: 'medium' },
  { id: 8, title: 'Bus Route Change - Route 3 Temporary Diversion', date: 'Mar 1, 2026', category: 'Transport', read: true, priority: 'medium' },
  { id: 9, title: 'CBSE Board Exam Admit Card Collection', date: 'Feb 28, 2026', category: 'Exam', read: true, priority: 'high' },
  { id: 10, title: 'World Water Day - Poster Making Competition', date: 'Feb 25, 2026', category: 'Activity', read: true, priority: 'low' },
]

const conversations = [
  { id: 1, teacher: 'Mrs. Anjali Gupta', subject: 'Mathematics', lastMessage: 'Aarav is showing excellent improvement in Algebra. Please encourage him to practice more word problems.', time: 'Today, 1:30 PM', unread: 2 },
  { id: 2, teacher: 'Mr. Rakesh Sinha', subject: 'Science', lastMessage: 'Aarav\'s project on Solar Energy was outstanding. He got the highest marks in class.', time: 'Yesterday', unread: 1 },
  { id: 3, teacher: 'Mrs. Priya Das', subject: 'English', lastMessage: 'Please ensure Aarav submits the essay by Friday. He has been given an extension.', time: 'Mar 10', unread: 0 },
  { id: 4, teacher: 'Mr. Vikram Roy', subject: 'Social Science', lastMessage: 'Aarav performed well in the map work test. Keep up the practice at home.', time: 'Mar 8', unread: 0 },
  { id: 5, teacher: 'Ms. Nandini Ghosh', subject: 'Hindi', lastMessage: 'Aarav needs to focus on Hindi grammar. I have shared some practice sheets.', time: 'Mar 5', unread: 0 },
]

const diaryEntries = [
  { id: 1, date: 'Mar 13, 2026', teacher: 'Mrs. Anjali Gupta', subject: 'Mathematics', remark: 'Excellent participation in class discussion on quadratic equations. Solved complex problems on the board confidently.', type: 'positive' },
  { id: 2, date: 'Mar 13, 2026', teacher: 'Mr. Rakesh Sinha', subject: 'Science', remark: 'Completed lab experiment on light refraction with precision. Good observation skills.', type: 'positive' },
  { id: 3, date: 'Mar 12, 2026', teacher: 'Mrs. Priya Das', subject: 'English', remark: 'Essay writing needs more structured arguments. Please practice organizing thoughts before writing.', type: 'improvement' },
  { id: 4, date: 'Mar 12, 2026', teacher: 'Ms. Nandini Ghosh', subject: 'Hindi', remark: 'Hindi homework not submitted. Please ensure completion by tomorrow.', type: 'concern' },
  { id: 5, date: 'Mar 11, 2026', teacher: 'Mr. Vikram Roy', subject: 'Social Science', remark: 'Good performance in map quiz. Identified all Indian river systems correctly.', type: 'positive' },
  { id: 6, date: 'Mar 10, 2026', teacher: 'Mrs. Anjali Gupta', subject: 'Mathematics', remark: 'Aarav helped his peer understand the discriminant concept. Shows leadership and empathy.', type: 'positive' },
  { id: 7, date: 'Mar 9, 2026', teacher: 'Sports Teacher', subject: 'Physical Education', remark: 'Participated actively in cricket practice. Shows good sportsmanship.', type: 'positive' },
  { id: 8, date: 'Mar 8, 2026', teacher: 'Class Teacher', subject: 'General', remark: 'Came late to school. Third instance this month. Please ensure punctuality.', type: 'concern' },
]

const reportCard = {
  academicYear: '2025-26',
  term: 'SA1',
  student: 'Aarav Sharma',
  class: 'X-A',
  rollNo: 5,
  overallGrade: 'A2',
  overallPercentage: 87.1,
  scholastic: [
    { subject: 'English', fa: 42, sa: 46, total: 88, grade: 'A2', gp: 9 },
    { subject: 'Hindi', fa: 38, sa: 44, total: 82, grade: 'A2', gp: 9 },
    { subject: 'Mathematics', fa: 45, sa: 47, total: 92, grade: 'A1', gp: 10 },
    { subject: 'Science', fa: 40, sa: 45, total: 85, grade: 'A2', gp: 9 },
    { subject: 'Social Science', fa: 36, sa: 42, total: 78, grade: 'B1', gp: 8 },
    { subject: 'Sanskrit', fa: 43, sa: 47, total: 90, grade: 'A1', gp: 10 },
    { subject: 'IT/Computer', fa: 46, sa: 49, total: 95, grade: 'A1', gp: 10 },
  ],
  coScholastic: [
    { area: 'Work Education', grade: 'A', descriptor: 'Excellent' },
    { area: 'Art Education', grade: 'A', descriptor: 'Excellent' },
    { area: 'Health & Physical Education', grade: 'B+', descriptor: 'Good' },
    { area: 'Discipline', grade: 'A', descriptor: 'Excellent' },
  ],
  competencies: [
    { area: 'Critical Thinking', level: 4, maxLevel: 5 },
    { area: 'Creativity', level: 4, maxLevel: 5 },
    { area: 'Communication', level: 3, maxLevel: 5 },
    { area: 'Collaboration', level: 4, maxLevel: 5 },
    { area: 'Problem Solving', level: 5, maxLevel: 5 },
    { area: 'Digital Literacy', level: 5, maxLevel: 5 },
  ],
  classTeacher: 'Mrs. Anjali Gupta',
  principal: 'Dr. Sunita Sharma',
}

// ─── Animation variants ──────────────────────────────────────────
const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.06 } },
}
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
}

// ─── Component ────────────────────────────────────────────────────
export default function ParentPortal() {
  const { darkMode } = useAppStore()
  const [activeTab, setActiveTab] = useState('overview')
  const [selectedPTMTeacher, setSelectedPTMTeacher] = useState(0)
  const [selectedPTMSlot, setSelectedPTMSlot] = useState(null)
  const [messageText, setMessageText] = useState('')
  const [selectedConversation, setSelectedConversation] = useState(null)
  const [circularFilter, setCircularFilter] = useState('all')

  const tabs = [
    { id: 'overview', label: 'Overview', icon: LayoutGrid },
    { id: 'academics', label: 'Academics', icon: GraduationCap },
    { id: 'fees', label: 'Fees', icon: IndianRupee },
    { id: 'transport', label: 'Transport', icon: Bus },
    { id: 'health', label: 'Health', icon: HeartPulse },
    { id: 'communication', label: 'Communication', icon: MessageCircle },
  ]

  const totalFees = feeBreakdown.reduce((sum, f) => sum + f.amount, 0)
  const paidFees = feeBreakdown.filter(f => f.status === 'Paid').reduce((sum, f) => sum + f.amount, 0)
  const pendingFees = feeBreakdown.filter(f => f.status === 'Pending').reduce((sum, f) => sum + f.amount, 0)
  const homeworkCompleted = homeworkData.filter(h => h.status === 'completed').length
  const homeworkOverdue = homeworkData.filter(h => h.status === 'overdue').length
  const homeworkCompletionRate = Math.round((homeworkCompleted / homeworkData.length) * 100)

  const chartTooltipStyle = {
    contentStyle: {
      backgroundColor: darkMode ? '#1A2D4A' : '#fff',
      border: `1px solid ${darkMode ? 'rgba(255,255,255,0.1)' : '#e2e8f0'}`,
      borderRadius: '12px',
      fontSize: '12px',
      color: darkMode ? '#e2e8f0' : '#1e293b',
    },
  }

  const getCBSEGrade = (marks) => {
    if (marks >= 91) return 'A1'
    if (marks >= 81) return 'A2'
    if (marks >= 71) return 'B1'
    if (marks >= 61) return 'B2'
    if (marks >= 51) return 'C1'
    if (marks >= 41) return 'C2'
    if (marks >= 33) return 'D'
    if (marks >= 21) return 'E1'
    return 'E2'
  }

  const filteredCirculars = circularFilter === 'all'
    ? circulars
    : circularFilter === 'unread'
      ? circulars.filter(c => !c.read)
      : circulars.filter(c => c.category.toLowerCase() === circularFilter.toLowerCase())

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="p-4 lg:p-6 space-y-6 max-w-[1600px] mx-auto"
    >
      {/* ─── Student Profile Header ─────────────────────────── */}
      <motion.div variants={itemVariants} className="rounded-2xl gradient-birla p-5 text-white">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-white/15 flex items-center justify-center text-xl font-bold">
              {studentProfile.avatar}
            </div>
            <div>
              <h2 className="text-lg font-bold">{studentProfile.name}</h2>
              <p className="text-xs text-white/70">Class {studentProfile.class} &bull; Roll No. {studentProfile.rollNo} &bull; Admission: {studentProfile.admissionNo}</p>
            </div>
          </div>
          <div className="sm:ml-auto flex items-center gap-3">
            <div className="text-right">
              <p className="text-xs text-white/60">Parent</p>
              <p className="text-sm font-semibold">{studentProfile.parent}</p>
            </div>
            <div className="w-px h-8 bg-white/20" />
            <div className="text-right">
              <p className="text-xs text-white/60">Contact</p>
              <p className="text-sm font-semibold">{studentProfile.phone}</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* ─── Tab Navigation ──────────────────────────────── */}
      <motion.div variants={itemVariants} className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
        {tabs.map((tab) => {
          const Icon = tab.icon
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                activeTab === tab.id
                  ? 'gradient-birla text-white shadow-md'
                  : 'border border-border text-muted-foreground hover:bg-muted hover:text-foreground'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              {tab.label}
            </button>
          )
        })}
      </motion.div>

      {/* ─── Overview Tab ──────────────────────────────────── */}
      {activeTab === 'overview' && (
        <motion.div variants={itemVariants} className="space-y-6">
          {/* Top Stats Row */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {topStats.map((stat) => {
              const Icon = stat.icon
              return (
                <div key={stat.label} className={`rounded-2xl bg-gradient-to-br ${stat.gradient} p-4 text-white hover:shadow-lg transition-shadow`}>
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-white/15 flex items-center justify-center">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-xl font-bold">{stat.value}</p>
                      <p className="text-[10px] text-white/70">{stat.label}</p>
                      <p className="text-[9px] text-white/50">{stat.sub}</p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Real-time Notifications */}
            <div className="lg:col-span-2 rounded-2xl border border-border bg-card p-5">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-sm font-semibold text-foreground flex items-center gap-2">
                  <Bell className="w-4 h-4 text-birla-gold" />
                  Real-time Notifications
                </h4>
                <span className="text-[9px] px-2 py-0.5 rounded-full bg-birla-cyan/10 text-birla-cyan font-medium">Live</span>
              </div>
              <div className="space-y-2.5 max-h-[400px] overflow-y-auto">
                {notifications.map((notif) => {
                  const Icon = notif.icon
                  return (
                    <div key={notif.id} className="flex items-start gap-3 p-3 rounded-xl border border-border gradient-card-blue hover:shadow-sm transition-all cursor-pointer">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${notif.color}`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <p className="text-xs font-semibold text-foreground">{notif.title}</p>
                          <span className="text-[9px] text-muted-foreground whitespace-nowrap">{notif.time}</span>
                        </div>
                        <p className="text-[10px] text-muted-foreground mt-0.5 line-clamp-2">{notif.message}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Quick Actions + Upcoming Events */}
            <div className="space-y-4">
              <div className="rounded-2xl border border-border bg-card p-5">
                <h4 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-birla-gold" />
                  Quick Actions
                </h4>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { label: 'Pay Fees', icon: CreditCard, color: 'text-rose-500 bg-rose-500/10' },
                    { label: 'Track Bus', icon: Bus, color: 'text-blue-500 bg-blue-500/10' },
                    { label: 'Book PTM', icon: CalendarCheck, color: 'text-emerald-500 bg-emerald-500/10' },
                    { label: 'Message', icon: Send, color: 'text-purple-500 bg-purple-500/10' },
                    { label: 'Report Card', icon: Award, color: 'text-birla-gold bg-birla-gold/10' },
                    { label: 'Health', icon: HeartPulse, color: 'text-pink-500 bg-pink-500/10' },
                  ].map((action) => {
                    const Icon = action.icon
                    return (
                      <button key={action.label} className="flex flex-col items-center gap-1.5 p-3 rounded-xl border border-border hover:bg-muted transition-colors">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${action.color}`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <span className="text-[10px] font-medium text-foreground">{action.label}</span>
                      </button>
                    )
                  })}
                </div>
              </div>

              <div className="rounded-2xl border border-border bg-card p-5">
                <h4 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-purple-500" />
                  Upcoming Events
                </h4>
                <div className="space-y-2.5">
                  {[
                    { title: 'Annual Day Celebration', date: 'Mar 25', time: '5:00 PM', type: 'event' },
                    { title: 'SA2 Examination Begins', date: 'Apr 1', time: '8:00 AM', type: 'exam' },
                    { title: 'Parent-Teacher Meeting', date: 'Mar 22', time: '9:00 AM', type: 'ptm' },
                  ].map((event, idx) => (
                    <div key={idx} className="flex items-center gap-3 p-2.5 rounded-xl border border-border gradient-card-blue">
                      <div className={`w-9 h-9 rounded-lg flex flex-col items-center justify-center text-[9px] font-bold ${
                        event.type === 'exam' ? 'bg-rose-500/10 text-rose-600 dark:text-rose-400' :
                        event.type === 'ptm' ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' :
                        'bg-purple-500/10 text-purple-600 dark:text-purple-400'
                      }`}>
                        <span className="text-[8px] leading-none">{event.date.split(' ')[0]}</span>
                        <span className="text-xs leading-none">{event.date.split(' ')[1]}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[11px] font-semibold text-foreground truncate">{event.title}</p>
                        <p className="text-[9px] text-muted-foreground">{event.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Attendance & Homework Summary */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-2xl border border-border bg-card p-5">
              <h4 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                <UserCheck className="w-4 h-4 text-emerald-500" />
                Attendance Summary
              </h4>
              <div className="flex items-center gap-6">
                <div className="relative w-28 h-28 flex-shrink-0">
                  <svg className="w-28 h-28 -rotate-90" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="8" fill="none" className="text-muted/30" />
                    <circle cx="50" cy="50" r="40" stroke="#10B981" strokeWidth="8" fill="none" strokeDasharray={`${96 * 2.51} ${100 * 2.51}`} strokeLinecap="round" />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-xl font-bold text-foreground">96%</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-emerald-500" />
                    <span className="text-xs text-foreground">Present: 173 days</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-rose-500" />
                    <span className="text-xs text-foreground">Absent: 7 days</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-amber-500" />
                    <span className="text-xs text-foreground">Late: 3 days</span>
                  </div>
                  <p className="text-[10px] text-emerald-600 dark:text-emerald-400 font-medium mt-1">Above 90% threshold</p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-card p-5">
              <h4 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                <ClipboardCheck className="w-4 h-4 text-blue-500" />
                Homework Completion
              </h4>
              <div className="flex items-center gap-6">
                <div className="relative w-28 h-28 flex-shrink-0">
                  <svg className="w-28 h-28 -rotate-90" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="8" fill="none" className="text-muted/30" />
                    <circle cx="50" cy="50" r="40" stroke="#3B82F6" strokeWidth="8" fill="none" strokeDasharray={`${homeworkCompletionRate * 2.51} ${100 * 2.51}`} strokeLinecap="round" />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-xl font-bold text-foreground">{homeworkCompletionRate}%</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                    <span className="text-xs text-foreground">Completed: {homeworkCompleted}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-amber-500" />
                    <span className="text-xs text-foreground">Pending: {homeworkData.filter(h => h.status === 'pending').length}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="w-3.5 h-3.5 text-rose-500" />
                    <span className="text-xs text-foreground">Overdue: {homeworkOverdue}</span>
                  </div>
                  {homeworkOverdue > 0 && (
                    <p className="text-[10px] text-rose-600 dark:text-rose-400 font-medium mt-1">{homeworkOverdue} assignment(s) need attention</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* ─── Academics Tab ─────────────────────────────────── */}
      {activeTab === 'academics' && (
        <motion.div variants={itemVariants} className="space-y-6">
          {/* Student Progress */}
          <div className="rounded-2xl border border-border bg-card p-5">
            <h4 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-emerald-500" />
              Academic Performance - Subject-wise Grades
            </h4>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-border">
                    <th className="pb-2 text-[10px] font-semibold text-muted-foreground">Subject</th>
                    <th className="pb-2 text-[10px] font-semibold text-muted-foreground text-center">Aarav&apos;s Marks</th>
                    <th className="pb-2 text-[10px] font-semibold text-muted-foreground text-center">Class Avg</th>
                    <th className="pb-2 text-[10px] font-semibold text-muted-foreground text-center">Grade</th>
                    <th className="pb-2 text-[10px] font-semibold text-muted-foreground text-center">Trend</th>
                  </tr>
                </thead>
                <tbody>
                  {subjectGrades.map((subj) => (
                    <tr key={subj.subject} className="border-b border-border/50 last:border-0">
                      <td className="py-2.5 text-xs font-medium text-foreground">{subj.subject}</td>
                      <td className="py-2.5 text-center">
                        <span className="text-xs font-bold text-foreground">{subj.marks}</span>
                      </td>
                      <td className="py-2.5 text-center">
                        <span className="text-xs text-muted-foreground">{subj.classAvg}</span>
                      </td>
                      <td className="py-2.5 text-center">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          subj.grade === 'A1' ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' :
                          subj.grade === 'A2' ? 'bg-blue-500/10 text-blue-600 dark:text-blue-400' :
                          'bg-amber-500/10 text-amber-600 dark:text-amber-400'
                        }`}>
                          {subj.grade}
                        </span>
                      </td>
                      <td className="py-2.5 text-center">
                        <TrendingUp className={`w-3.5 h-3.5 inline ${
                          subj.trend === 'up' ? 'text-emerald-500' :
                          subj.trend === 'down' ? 'text-rose-500' :
                          'text-amber-500'
                        }`} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Performance Trend Chart */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="rounded-2xl border border-border bg-card p-5">
              <h4 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-birla-cyan" />
                Performance Trend vs Class Average
              </h4>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={progressTrendData}>
                    <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? 'rgba(255,255,255,0.08)' : '#e2e8f0'} />
                    <XAxis dataKey="exam" tick={{ fontSize: 10, fill: darkMode ? '#94a3b8' : '#64748b' }} />
                    <YAxis domain={[60, 100]} tick={{ fontSize: 10, fill: darkMode ? '#94a3b8' : '#64748b' }} />
                    <Tooltip {...chartTooltipStyle} />
                    <Legend wrapperStyle={{ fontSize: '10px' }} />
                    <Line type="monotone" dataKey="aarav" stroke="#22D3EE" strokeWidth={2.5} dot={{ r: 4 }} name="Aarav" />
                    <Line type="monotone" dataKey="classAvg" stroke="#C8A45C" strokeWidth={2} strokeDasharray="5 5" dot={{ r: 3 }} name="Class Average" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-card p-5">
              <h4 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
                <Target className="w-4 h-4 text-birla-gold" />
                Competency Indicators
              </h4>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={reportCard.competencies.map(c => ({ area: c.area, level: c.level, max: c.maxLevel }))}>
                    <PolarGrid stroke={darkMode ? 'rgba(255,255,255,0.1)' : '#e2e8f0'} />
                    <PolarAngleAxis dataKey="area" tick={{ fontSize: 9, fill: darkMode ? '#94a3b8' : '#64748b' }} />
                    <PolarRadiusAxis domain={[0, 5]} tick={{ fontSize: 8, fill: darkMode ? '#94a3b8' : '#64748b' }} />
                    <Radar name="Level" dataKey="level" stroke="#22D3EE" fill="#22D3EE" fillOpacity={0.25} strokeWidth={2} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Homework Monitoring */}
          <div className="rounded-2xl border border-border bg-card p-5">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-sm font-semibold text-foreground flex items-center gap-2">
                <ClipboardCheck className="w-4 h-4 text-blue-500" />
                Homework Monitoring
              </h4>
              <div className="flex items-center gap-2">
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-medium">{homeworkCompleted} Completed</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 font-medium">{homeworkData.filter(h => h.status === 'pending').length} Pending</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-rose-500/10 text-rose-600 dark:text-rose-400 font-medium">{homeworkOverdue} Overdue</span>
              </div>
            </div>
            <div className="space-y-2 max-h-80 overflow-y-auto">
              {homeworkData.map((hw) => (
                <div key={hw.id} className={`flex items-center gap-3 p-3 rounded-xl border transition-all ${
                  hw.status === 'overdue' ? 'border-rose-500/30 bg-rose-500/5' :
                  hw.status === 'completed' ? 'border-emerald-500/20 bg-emerald-500/5' :
                  'border-border gradient-card-blue'
                }`}>
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                    hw.status === 'completed' ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' :
                    hw.status === 'overdue' ? 'bg-rose-500/10 text-rose-600 dark:text-rose-400' :
                    'bg-amber-500/10 text-amber-600 dark:text-amber-400'
                  }`}>
                    {hw.status === 'completed' ? <CheckCircle2 className="w-4 h-4" /> :
                     hw.status === 'overdue' ? <AlertTriangle className="w-4 h-4" /> :
                     <Clock className="w-4 h-4" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-foreground">{hw.title}</p>
                    <p className="text-[10px] text-muted-foreground">{hw.subject} &bull; Due: {hw.dueDate}</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    {hw.status === 'completed' ? (
                      <div>
                        <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400">Grade: {hw.grade}</span>
                        <p className="text-[9px] text-muted-foreground">Submitted: {hw.submittedDate}</p>
                      </div>
                    ) : hw.status === 'overdue' ? (
                      <span className="text-[10px] font-bold text-rose-600 dark:text-rose-400">OVERDUE</span>
                    ) : (
                      <span className="text-[10px] font-medium text-amber-600 dark:text-amber-400">PENDING</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Digital Diary */}
          <div className="rounded-2xl border border-border bg-card p-5">
            <h4 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-purple-500" />
              Digital Diary - Teacher Remarks
            </h4>
            <div className="space-y-2.5 max-h-96 overflow-y-auto">
              {diaryEntries.map((entry) => (
                <div key={entry.id} className={`p-3 rounded-xl border ${
                  entry.type === 'positive' ? 'border-emerald-500/20 bg-emerald-500/5' :
                  entry.type === 'concern' ? 'border-rose-500/20 bg-rose-500/5' :
                  'border-amber-500/20 bg-amber-500/5'
                }`}>
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${
                        entry.type === 'positive' ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' :
                        entry.type === 'concern' ? 'bg-rose-500/10 text-rose-600 dark:text-rose-400' :
                        'bg-amber-500/10 text-amber-600 dark:text-amber-400'
                      }`}>
                        {entry.type === 'positive' ? '★ Positive' : entry.type === 'concern' ? '⚠ Concern' : '↗ Improvement'}
                      </span>
                      <span className="text-[10px] font-medium text-foreground">{entry.teacher}</span>
                    </div>
                    <span className="text-[9px] text-muted-foreground">{entry.date}</span>
                  </div>
                  <p className="text-[11px] text-foreground mt-1">{entry.remark}</p>
                  <p className="text-[9px] text-muted-foreground mt-1">{entry.subject}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Report Card View */}
          <div className="rounded-2xl border-2 border-birla-gold/30 bg-card p-5">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-sm font-semibold text-foreground flex items-center gap-2">
                <Award className="w-4 h-4 text-birla-gold" />
                Report Card - {reportCard.term} ({reportCard.academicYear})
              </h4>
              <div className="flex items-center gap-2">
                <span className={`text-sm font-bold px-3 py-1 rounded-full ${
                  reportCard.overallGrade === 'A1' ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' :
                  'bg-blue-500/10 text-blue-600 dark:text-blue-400'
                }`}>
                  Overall: {reportCard.overallGrade} ({reportCard.overallPercentage}%)
                </span>
              </div>
            </div>

            {/* Scholastic Areas */}
            <div className="mb-4">
              <p className="text-xs font-semibold text-muted-foreground mb-2 uppercase tracking-wide">Scholastic Areas</p>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="pb-2 text-[10px] font-semibold text-muted-foreground">Subject</th>
                      <th className="pb-2 text-[10px] font-semibold text-muted-foreground text-center">FA (50)</th>
                      <th className="pb-2 text-[10px] font-semibold text-muted-foreground text-center">SA (50)</th>
                      <th className="pb-2 text-[10px] font-semibold text-muted-foreground text-center">Total (100)</th>
                      <th className="pb-2 text-[10px] font-semibold text-muted-foreground text-center">Grade</th>
                      <th className="pb-2 text-[10px] font-semibold text-muted-foreground text-center">GP</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reportCard.scholastic.map((subj) => (
                      <tr key={subj.subject} className="border-b border-border/50 last:border-0">
                        <td className="py-2 text-xs font-medium text-foreground">{subj.subject}</td>
                        <td className="py-2 text-center text-xs text-foreground">{subj.fa}</td>
                        <td className="py-2 text-center text-xs text-foreground">{subj.sa}</td>
                        <td className="py-2 text-center text-xs font-bold text-foreground">{subj.total}</td>
                        <td className="py-2 text-center">
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                            subj.grade === 'A1' ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' :
                            subj.grade === 'A2' ? 'bg-blue-500/10 text-blue-600 dark:text-blue-400' :
                            'bg-amber-500/10 text-amber-600 dark:text-amber-400'
                          }`}>{subj.grade}</span>
                        </td>
                        <td className="py-2 text-center text-xs font-semibold text-foreground">{subj.gp}</td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr className="border-t-2 border-birla-gold/30">
                      <td className="pt-2 text-xs font-bold text-foreground">Total / CGPA</td>
                      <td className="pt-2" />
                      <td className="pt-2" />
                      <td className="pt-2 text-center text-xs font-bold text-foreground">{reportCard.scholastic.reduce((s, x) => s + x.total, 0)}</td>
                      <td className="pt-2" />
                      <td className="pt-2 text-center text-xs font-bold text-birla-gold">
                        {(reportCard.scholastic.reduce((s, x) => s + x.gp, 0) / reportCard.scholastic.length).toFixed(1)}
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>

            {/* Co-Scholastic Areas */}
            <div className="mb-4">
              <p className="text-xs font-semibold text-muted-foreground mb-2 uppercase tracking-wide">Co-Scholastic Areas</p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {reportCard.coScholastic.map((area) => (
                  <div key={area.area} className="p-2.5 rounded-xl border border-border gradient-card-blue text-center">
                    <p className="text-[10px] text-muted-foreground">{area.area}</p>
                    <p className="text-sm font-bold text-foreground">{area.grade}</p>
                    <p className="text-[9px] text-muted-foreground">{area.descriptor}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Signatures */}
            <div className="flex items-center justify-between pt-3 border-t border-border">
              <div className="text-center">
                <p className="text-[10px] text-muted-foreground">Class Teacher</p>
                <p className="text-xs font-semibold text-foreground">{reportCard.classTeacher}</p>
              </div>
              <div className="text-center">
                <p className="text-[10px] text-muted-foreground">Parent Signature</p>
                <p className="text-xs text-muted-foreground">_________________</p>
              </div>
              <div className="text-center">
                <p className="text-[10px] text-muted-foreground">Principal</p>
                <p className="text-xs font-semibold text-foreground">{reportCard.principal}</p>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* ─── Fees Tab ─────────────────────────────────────── */}
      {activeTab === 'fees' && (
        <motion.div variants={itemVariants} className="space-y-6">
          {/* Fee Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="rounded-2xl bg-gradient-to-br from-blue-900 to-blue-700 p-5 text-white">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center">
                  <CircleDollarSign className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-2xl font-bold">₹{totalFees.toLocaleString()}</p>
                  <p className="text-[10px] text-white/70">Total Fees (Annual)</p>
                </div>
              </div>
            </div>
            <div className="rounded-2xl bg-gradient-to-br from-emerald-800 to-emerald-600 p-5 text-white">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-2xl font-bold">₹{paidFees.toLocaleString()}</p>
                  <p className="text-[10px] text-white/70">Paid</p>
                </div>
              </div>
            </div>
            <div className="rounded-2xl bg-gradient-to-br from-rose-800 to-rose-600 p-5 text-white">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center">
                  <AlertTriangle className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-2xl font-bold">₹{pendingFees.toLocaleString()}</p>
                  <p className="text-[10px] text-white/70">Pending</p>
                </div>
              </div>
            </div>
          </div>

          {/* Fee Breakdown Table */}
          <div className="rounded-2xl border border-border bg-card p-5">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-sm font-semibold text-foreground flex items-center gap-2">
                <Receipt className="w-4 h-4 text-birla-gold" />
                Fee Breakdown
              </h4>
              <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg gradient-birla-gold text-birla-blue text-xs font-bold hover:shadow-md transition-shadow">
                <CreditCard className="w-3.5 h-3.5" />
                Pay ₹{pendingFees.toLocaleString()} Online
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-border">
                    <th className="pb-2 text-[10px] font-semibold text-muted-foreground">Fee Category</th>
                    <th className="pb-2 text-[10px] font-semibold text-muted-foreground text-center">Amount</th>
                    <th className="pb-2 text-[10px] font-semibold text-muted-foreground text-center">Due Date</th>
                    <th className="pb-2 text-[10px] font-semibold text-muted-foreground text-center">Status</th>
                    <th className="pb-2 text-[10px] font-semibold text-muted-foreground text-center">Receipt</th>
                  </tr>
                </thead>
                <tbody>
                  {feeBreakdown.map((fee) => (
                    <tr key={fee.id} className="border-b border-border/50 last:border-0">
                      <td className="py-2.5 text-xs font-medium text-foreground">{fee.category}</td>
                      <td className="py-2.5 text-center text-xs font-semibold text-foreground">₹{fee.amount.toLocaleString()}</td>
                      <td className="py-2.5 text-center text-xs text-muted-foreground">{fee.dueDate}</td>
                      <td className="py-2.5 text-center">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          fee.status === 'Paid' ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' : 'bg-rose-500/10 text-rose-600 dark:text-rose-400'
                        }`}>
                          {fee.status}
                        </span>
                      </td>
                      <td className="py-2.5 text-center">
                        {fee.status === 'Paid' ? (
                          <button className="flex items-center gap-1 text-[10px] text-birla-cyan hover:underline mx-auto">
                            <Download className="w-3 h-3" /> {fee.receipt}
                          </button>
                        ) : (
                          <span className="text-[10px] text-muted-foreground">—</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Payment History Chart */}
          <div className="rounded-2xl border border-border bg-card p-5">
            <h4 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-birla-cyan" />
              Monthly Payment History (2025-26)
            </h4>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={paymentHistoryData}>
                  <defs>
                    <linearGradient id="payGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#22D3EE" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#22D3EE" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? 'rgba(255,255,255,0.08)' : '#e2e8f0'} />
                  <XAxis dataKey="month" tick={{ fontSize: 10, fill: darkMode ? '#94a3b8' : '#64748b' }} />
                  <YAxis tick={{ fontSize: 10, fill: darkMode ? '#94a3b8' : '#64748b' }} tickFormatter={(v) => `₹${(v/1000).toFixed(0)}k`} />
                  <Tooltip {...chartTooltipStyle} formatter={(v) => [`₹${v.toLocaleString()}`, 'Amount Paid']} />
                  <Area type="monotone" dataKey="amount" stroke="#22D3EE" strokeWidth={2.5} fill="url(#payGrad)" name="Amount Paid" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Recent Payment Receipts */}
          <div className="rounded-2xl border border-border bg-card p-5">
            <h4 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
              <FileText className="w-4 h-4 text-emerald-500" />
              Recent Receipts
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {feeBreakdown.filter(f => f.status === 'Paid').map((fee) => (
                <div key={fee.id} className="p-3 rounded-xl border border-emerald-500/20 bg-emerald-500/5">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400">{fee.receipt}</span>
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  </div>
                  <p className="text-xs font-semibold text-foreground">{fee.category}</p>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-[10px] text-muted-foreground">Paid: {fee.paidDate}</span>
                    <span className="text-xs font-bold text-foreground">₹{fee.amount.toLocaleString()}</span>
                  </div>
                  <button className="mt-2 w-full flex items-center justify-center gap-1 px-2 py-1 rounded-lg border border-border text-[10px] font-medium text-muted-foreground hover:bg-muted transition-colors">
                    <Download className="w-3 h-3" /> Download Receipt
                  </button>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* ─── Transport Tab ────────────────────────────────── */}
      {activeTab === 'transport' && (
        <motion.div variants={itemVariants} className="space-y-6">
          {/* GPS Bus Tracking */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Map Placeholder / Live Location */}
            <div className="lg:col-span-2 rounded-2xl border border-border bg-card p-5">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-sm font-semibold text-foreground flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-birla-cyan" />
                  Live Bus Tracking
                </h4>
                <span className="flex items-center gap-1 text-[10px] font-medium text-emerald-600 dark:text-emerald-400">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> Live
                </span>
              </div>
              {/* Map Placeholder */}
              <div className="relative h-64 sm:h-80 rounded-xl bg-gradient-to-br from-blue-900/20 to-emerald-900/20 border border-border overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 rounded-2xl gradient-birla flex items-center justify-center mx-auto mb-3 animate-pulse-glow">
                      <Bus className="w-8 h-8 text-white" />
                    </div>
                    <p className="text-xs font-semibold text-foreground">Bus Route 3 - Live</p>
                    <p className="text-[10px] text-muted-foreground mt-1">Currently at: {transportData.currentLocation}</p>
                    <div className="flex items-center justify-center gap-2 mt-2">
                      <span className="text-[9px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-medium">{transportData.status}</span>
                      <span className="text-[9px] px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 font-medium">ETA: {transportData.eta}</span>
                    </div>
                  </div>
                </div>
                {/* Route visualization dots */}
                <div className="absolute top-4 left-4 right-4">
                  <div className="flex items-center justify-between">
                    {transportData.stops.map((stop, idx) => (
                      <div key={idx} className="flex flex-col items-center">
                        <div className={`w-4 h-4 rounded-full border-2 ${
                          stop.type === 'pickup' ? 'border-emerald-500 bg-emerald-500/30' :
                          stop.type === 'start' ? 'border-blue-500 bg-blue-500/30' :
                          stop.type === 'end' ? 'border-rose-500 bg-rose-500/30' :
                          'border-birla-gold bg-birla-gold/30'
                        }`} />
                        <p className="text-[8px] text-muted-foreground mt-1 text-center max-w-[60px]">{stop.name}</p>
                        <p className="text-[7px] text-muted-foreground">{stop.time}</p>
                      </div>
                    ))}
                  </div>
                  <div className="h-0.5 bg-gradient-to-r from-blue-500 via-emerald-500 to-rose-500 mt-1 rounded-full" />
                </div>
              </div>
            </div>

            {/* Driver & Route Info */}
            <div className="space-y-4">
              <div className="rounded-2xl border border-border bg-card p-5">
                <h4 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                  <Route className="w-4 h-4 text-birla-gold" />
                  Route Information
                </h4>
                <div className="space-y-3">
                  {[
                    { label: 'Route No', value: transportData.routeNo, icon: Route },
                    { label: 'Route Name', value: transportData.routeName, icon: Navigation },
                    { label: 'Bus No', value: transportData.busNo, icon: Bus },
                    { label: 'Status', value: transportData.status, icon: Wifi },
                  ].map((item) => {
                    const Icon = item.icon
                    return (
                      <div key={item.label} className="flex items-center gap-3">
                        <div className="w-7 h-7 rounded-lg bg-birla-gold/10 flex items-center justify-center flex-shrink-0">
                          <Icon className="w-3.5 h-3.5 text-birla-gold" />
                        </div>
                        <div>
                          <p className="text-[9px] text-muted-foreground">{item.label}</p>
                          <p className="text-xs font-semibold text-foreground">{item.value}</p>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

              <div className="rounded-2xl border border-border bg-card p-5">
                <h4 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                  <Users className="w-4 h-4 text-purple-500" />
                  Driver & Staff
                </h4>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl gradient-birla flex items-center justify-center text-white text-sm font-bold">SM</div>
                    <div>
                      <p className="text-xs font-semibold text-foreground">{transportData.driverName}</p>
                      <p className="text-[10px] text-muted-foreground">Driver</p>
                      <div className="flex items-center gap-1 mt-0.5">
                        <Phone className="w-3 h-3 text-emerald-500" />
                        <span className="text-[9px] text-emerald-600 dark:text-emerald-400">{transportData.driverPhone}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 pt-2 border-t border-border">
                    <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-600 dark:text-purple-400 text-sm font-bold">MD</div>
                    <div>
                      <p className="text-xs font-semibold text-foreground">{transportData.attendant}</p>
                      <p className="text-[10px] text-muted-foreground">Bus Attendant</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-border bg-card p-5">
                <h4 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                  <Clock4 className="w-4 h-4 text-birla-cyan" />
                  Pickup / Drop Schedule
                </h4>
                <div className="space-y-3">
                  <div className="p-2.5 rounded-xl border border-emerald-500/20 bg-emerald-500/5">
                    <div className="flex items-center gap-2 mb-1">
                      <Navigation className="w-3.5 h-3.5 text-emerald-500" />
                      <span className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400">PICKUP</span>
                    </div>
                    <p className="text-xs font-bold text-foreground">{transportData.pickupTime}</p>
                    <p className="text-[10px] text-muted-foreground">{transportData.pickupPoint}</p>
                  </div>
                  <div className="p-2.5 rounded-xl border border-blue-500/20 bg-blue-500/5">
                    <div className="flex items-center gap-2 mb-1">
                      <MapPin className="w-3.5 h-3.5 text-blue-500" />
                      <span className="text-[10px] font-semibold text-blue-600 dark:text-blue-400">DROP</span>
                    </div>
                    <p className="text-xs font-bold text-foreground">{transportData.dropTime}</p>
                    <p className="text-[10px] text-muted-foreground">{transportData.dropPoint}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Route Stops Detail */}
          <div className="rounded-2xl border border-border bg-card p-5">
            <h4 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
              <Navigation className="w-4 h-4 text-birla-gold" />
              Route Stops - Route 3
            </h4>
            <div className="flex flex-col sm:flex-row sm:items-stretch gap-3">
              {transportData.stops.map((stop, idx) => (
                <div key={idx} className={`flex-1 p-3 rounded-xl border ${
                  stop.type === 'pickup' ? 'border-emerald-500/30 bg-emerald-500/5' :
                  stop.type === 'start' ? 'border-blue-500/30 bg-blue-500/5' :
                  stop.type === 'end' ? 'border-rose-500/30 bg-rose-500/5' :
                  'border-border gradient-card-blue'
                }`}>
                  <div className="flex items-center gap-2 mb-1">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[9px] font-bold ${
                      stop.type === 'pickup' ? 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400' :
                      stop.type === 'start' ? 'bg-blue-500/20 text-blue-600 dark:text-blue-400' :
                      stop.type === 'end' ? 'bg-rose-500/20 text-rose-600 dark:text-rose-400' :
                      'bg-birla-gold/20 text-birla-gold'
                    }`}>
                      {idx + 1}
                    </div>
                    <span className={`text-[9px] font-bold uppercase ${
                      stop.type === 'pickup' ? 'text-emerald-600 dark:text-emerald-400' :
                      stop.type === 'start' ? 'text-blue-600 dark:text-blue-400' :
                      stop.type === 'end' ? 'text-rose-600 dark:text-rose-400' :
                      'text-birla-gold'
                    }`}>{stop.type}</span>
                  </div>
                  <p className="text-xs font-semibold text-foreground">{stop.name}</p>
                  <p className="text-[10px] text-muted-foreground">{stop.time}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* ─── Health Tab ───────────────────────────────────── */}
      {activeTab === 'health' && (
        <motion.div variants={itemVariants} className="space-y-6">
          {/* Wellness Score & Vitals */}
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="col-span-2 lg:col-span-1 rounded-2xl bg-gradient-to-br from-emerald-800 to-emerald-600 p-5 text-white flex flex-col items-center justify-center">
              <Heart className="w-6 h-6 mb-2 text-white/70" />
              <p className="text-3xl font-bold">{healthData.wellnessScore}</p>
              <p className="text-[10px] text-white/70">Wellness Score</p>
              <p className="text-[9px] text-white/50 mt-1">Out of 100</p>
            </div>
            {[
              { label: 'Height', value: healthData.height, icon: Activity, color: 'from-blue-800 to-blue-600' },
              { label: 'Weight', value: healthData.weight, icon: Activity, color: 'from-purple-800 to-purple-600' },
              { label: 'BMI', value: `${healthData.bmi} (${healthData.bmiStatus})`, icon: Target, color: 'from-amber-800 to-amber-600' },
              { label: 'Vision', value: healthData.vision, icon: Eye, color: 'from-teal-800 to-teal-600' },
            ].map((stat) => {
              const Icon = stat.icon
              return (
                <div key={stat.label} className={`rounded-2xl bg-gradient-to-br ${stat.color} p-4 text-white`}>
                  <div className="flex items-center gap-2 mb-1">
                    <Icon className="w-4 h-4 text-white/70" />
                    <p className="text-[10px] text-white/70">{stat.label}</p>
                  </div>
                  <p className="text-sm font-bold">{stat.value}</p>
                </div>
              )
            })}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Vaccination Status */}
            <div className="rounded-2xl border border-border bg-card p-5">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-sm font-semibold text-foreground flex items-center gap-2">
                  <Syringe className="w-4 h-4 text-emerald-500" />
                  Vaccination Status
                </h4>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-medium">
                  {healthData.vaccinations.length}/{healthData.vaccinations.length} Complete
                </span>
              </div>
              <div className="space-y-2 max-h-72 overflow-y-auto">
                {healthData.vaccinations.map((vax, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-2.5 rounded-xl border border-emerald-500/20 bg-emerald-500/5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-foreground">{vax.name}</p>
                      <p className="text-[9px] text-muted-foreground">{vax.date}</p>
                    </div>
                    <span className="text-[9px] font-bold text-emerald-600 dark:text-emerald-400">{vax.status}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Medical Visits */}
            <div className="rounded-2xl border border-border bg-card p-5">
              <h4 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
                <Stethoscope className="w-4 h-4 text-rose-500" />
                Recent Medical Visits
              </h4>
              <div className="space-y-2.5 max-h-72 overflow-y-auto">
                {healthData.medicalVisits.map((visit, idx) => (
                  <div key={idx} className="p-3 rounded-xl border border-border gradient-card-blue">
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-xs font-semibold text-foreground">{visit.reason}</p>
                      <span className="text-[9px] text-muted-foreground">{visit.date}</span>
                    </div>
                    <p className="text-[10px] text-muted-foreground">Doctor: {visit.doctor}</p>
                    <p className="text-[10px] text-muted-foreground mt-0.5">Prescription: {visit.prescription}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Allergies & Conditions + Next Checkup */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-2xl border border-border bg-card p-5">
              <h4 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                <Shield className="w-4 h-4 text-amber-500" />
                Allergies & Conditions
              </h4>
              <div className="space-y-3">
                <div>
                  <p className="text-[10px] text-muted-foreground mb-1.5">Known Allergies</p>
                  <div className="flex flex-wrap gap-2">
                    {healthData.allergies.map((allergy, idx) => (
                      <span key={idx} className="text-[10px] px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 font-medium border border-amber-500/20">
                        ⚠ {allergy}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-[10px] text-muted-foreground mb-1.5">Pre-existing Conditions</p>
                  <span className="text-[10px] px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-medium">
                    ✓ {healthData.conditions}
                  </span>
                </div>
                <div>
                  <p className="text-[10px] text-muted-foreground mb-1.5">Blood Group</p>
                  <span className="text-xs font-bold text-rose-600 dark:text-rose-400 bg-rose-500/10 px-3 py-1 rounded-full">
                    {studentProfile.bloodGroup}
                  </span>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-card p-5">
              <h4 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                <CalendarCheck className="w-4 h-4 text-blue-500" />
                Health Checkup Schedule
              </h4>
              <div className="space-y-4">
                <div className="p-3 rounded-xl border border-muted bg-muted/30">
                  <p className="text-[10px] text-muted-foreground">Last Checkup</p>
                  <p className="text-sm font-bold text-foreground">{healthData.lastCheckup}</p>
                  <p className="text-[10px] text-emerald-600 dark:text-emerald-400">All parameters normal</p>
                </div>
                <div className="p-3 rounded-xl border border-birla-cyan/30 bg-birla-cyan/5">
                  <p className="text-[10px] text-muted-foreground">Next Checkup</p>
                  <p className="text-sm font-bold text-foreground">{healthData.nextCheckup}</p>
                  <p className="text-[10px] text-birla-cyan">Annual Health Checkup Camp</p>
                </div>
                <div className="p-3 rounded-xl border border-border gradient-card-blue">
                  <p className="text-[10px] text-muted-foreground">Wellness Score Breakdown</p>
                  <div className="mt-2 space-y-1.5">
                    {[
                      { label: 'Physical Fitness', score: 90 },
                      { label: 'Nutrition', score: 85 },
                      { label: 'Mental Wellness', score: 88 },
                      { label: 'Sleep Quality', score: 92 },
                    ].map((item) => (
                      <div key={item.label} className="flex items-center gap-2">
                        <span className="text-[9px] text-muted-foreground w-24">{item.label}</span>
                        <div className="flex-1 h-2 rounded-full bg-muted">
                          <div className="h-2 rounded-full bg-gradient-to-r from-birla-cyan to-emerald-500" style={{ width: `${item.score}%` }} />
                        </div>
                        <span className="text-[9px] font-bold text-foreground w-6 text-right">{item.score}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* ─── Communication Tab ────────────────────────────── */}
      {activeTab === 'communication' && (
        <motion.div variants={itemVariants} className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Conversation List */}
            <div className="rounded-2xl border border-border bg-card p-5">
              <h4 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-purple-500" />
                Messages
              </h4>
              <div className="space-y-2 max-h-[500px] overflow-y-auto">
                {conversations.map((conv) => (
                  <div
                    key={conv.id}
                    onClick={() => setSelectedConversation(conv.id)}
                    className={`p-3 rounded-xl border cursor-pointer transition-all ${
                      selectedConversation === conv.id ? 'border-birla-cyan/40 bg-birla-cyan/5' : 'border-border gradient-card-blue hover:shadow-sm'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl gradient-birla flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                        {conv.teacher.split(' ').map(n => n[0]).join('').slice(0, 2)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-1">
                          <p className="text-[11px] font-semibold text-foreground truncate">{conv.teacher}</p>
                          {conv.unread > 0 && (
                            <span className="w-4 h-4 rounded-full bg-rose-500 text-white text-[8px] flex items-center justify-center flex-shrink-0">{conv.unread}</span>
                          )}
                        </div>
                        <p className="text-[9px] text-muted-foreground">{conv.subject}</p>
                        <p className="text-[9px] text-muted-foreground truncate mt-0.5">{conv.lastMessage}</p>
                        <p className="text-[8px] text-muted-foreground mt-0.5">{conv.time}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Message Area */}
            <div className="lg:col-span-2 rounded-2xl border border-border bg-card p-5">
              {selectedConversation ? (
                <div className="flex flex-col h-full min-h-[400px]">
                  <div className="flex items-center gap-3 pb-3 border-b border-border">
                    <div className="w-9 h-9 rounded-xl gradient-birla flex items-center justify-center text-white text-xs font-bold">
                      {conversations.find(c => c.id === selectedConversation)?.teacher.split(' ').map(n => n[0]).join('').slice(0, 2)}
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-foreground">{conversations.find(c => c.id === selectedConversation)?.teacher}</p>
                      <p className="text-[9px] text-muted-foreground">{conversations.find(c => c.id === selectedConversation)?.subject} Teacher</p>
                    </div>
                  </div>

                  {/* Chat messages */}
                  <div className="flex-1 py-4 space-y-3 overflow-y-auto">
                    <div className="flex justify-start">
                      <div className="max-w-[80%] p-3 rounded-xl rounded-tl-sm bg-muted">
                        <p className="text-xs text-foreground">{conversations.find(c => c.id === selectedConversation)?.lastMessage}</p>
                        <p className="text-[9px] text-muted-foreground mt-1">{conversations.find(c => c.id === selectedConversation)?.time}</p>
                      </div>
                    </div>
                    <div className="flex justify-end">
                      <div className="max-w-[80%] p-3 rounded-xl rounded-tr-sm gradient-birla text-white">
                        <p className="text-xs">Thank you for the update, Ma&apos;am. We will ensure Aarav practices more at home.</p>
                        <p className="text-[9px] text-white/60 mt-1">Today, 2:15 PM</p>
                      </div>
                    </div>
                    <div className="flex justify-start">
                      <div className="max-w-[80%] p-3 rounded-xl rounded-tl-sm bg-muted">
                        <p className="text-xs text-foreground">That&apos;s great to hear, Mr. Kumar. I also wanted to mention that Aarav has been selected for the Mathematics Olympiad. Please confirm his participation.</p>
                        <p className="text-[9px] text-muted-foreground mt-1">Today, 2:20 PM</p>
                      </div>
                    </div>
                  </div>

                  {/* Quick messages + compose */}
                  <div className="pt-3 border-t border-border space-y-2">
                    <div className="flex flex-wrap gap-1.5">
                      {['Thank you', 'Noted, Ma\'am', 'Will follow up', 'Please schedule a meeting'].map((quick) => (
                        <button
                          key={quick}
                          onClick={() => setMessageText(quick)}
                          className="px-2.5 py-1 rounded-full border border-border text-[9px] font-medium text-muted-foreground hover:bg-muted transition-colors"
                        >
                          {quick}
                        </button>
                      ))}
                    </div>
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={messageText}
                        onChange={(e) => setMessageText(e.target.value)}
                        placeholder="Type a message..."
                        className="flex-1 px-3 py-2 rounded-lg border border-input bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-birla-gold/40"
                      />
                      <button className="flex items-center justify-center w-9 h-9 rounded-lg gradient-birla text-white hover:shadow-md transition-shadow">
                        <Send className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center h-64">
                  <div className="text-center">
                    <MessageCircle className="w-12 h-12 text-muted-foreground/30 mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">Select a conversation to start messaging</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* PTM Booking */}
          <div className="rounded-2xl border border-border bg-card p-5">
            <h4 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
              <CalendarCheck className="w-4 h-4 text-emerald-500" />
              Parent-Teacher Meeting Booking
            </h4>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {/* Teacher Selection */}
              <div className="space-y-3">
                {ptmSlots.map((teacher, idx) => (
                  <div
                    key={teacher.id}
                    onClick={() => { setSelectedPTMTeacher(idx); setSelectedPTMSlot(null) }}
                    className={`p-3 rounded-xl border cursor-pointer transition-all ${
                      selectedPTMTeacher === idx ? 'border-birla-cyan/40 bg-birla-cyan/5' : 'border-border gradient-card-blue hover:shadow-sm'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl gradient-birla flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                        {teacher.teacher.split(' ').map(n => n[0]).join('').slice(0, 2)}
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-foreground">{teacher.teacher}</p>
                        <p className="text-[10px] text-muted-foreground">{teacher.subject} &bull; {teacher.date}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Slot Selection */}
              <div>
                <p className="text-xs font-semibold text-foreground mb-3">Available Slots - {ptmSlots[selectedPTMTeacher].teacher}</p>
                <div className="grid grid-cols-2 gap-2">
                  {ptmSlots[selectedPTMTeacher].slots.map((slot, idx) => (
                    <button
                      key={idx}
                      disabled={slot.status === 'booked'}
                      onClick={() => setSelectedPTMSlot(idx)}
                      className={`p-3 rounded-xl border text-center transition-all ${
                        slot.status === 'booked'
                          ? 'border-border bg-muted/30 cursor-not-allowed'
                          : selectedPTMSlot === idx
                            ? 'border-emerald-500/50 bg-emerald-500/10'
                            : 'border-border gradient-card-blue hover:shadow-sm cursor-pointer'
                      }`}
                    >
                      <p className="text-xs font-semibold text-foreground">{slot.time}</p>
                      <p className={`text-[9px] font-medium ${
                        slot.status === 'booked' ? 'text-muted-foreground' : 'text-emerald-600 dark:text-emerald-400'
                      }`}>
                        {slot.status === 'booked' ? 'Already Booked' : 'Available'}
                      </p>
                    </button>
                  ))}
                </div>
                {selectedPTMSlot !== null && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-4 p-4 rounded-xl border border-emerald-500/30 bg-emerald-500/5">
                    <div className="flex items-center gap-3 mb-3">
                      <CalendarCheck className="w-5 h-5 text-emerald-500" />
                      <div>
                        <p className="text-xs font-semibold text-foreground">Booking Summary</p>
                        <p className="text-[10px] text-muted-foreground">
                          {ptmSlots[selectedPTMTeacher].teacher} &bull; {ptmSlots[selectedPTMTeacher].date} &bull; {ptmSlots[selectedPTMTeacher].slots[selectedPTMSlot].time}
                        </p>
                      </div>
                    </div>
                    <button className="w-full flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg gradient-birla text-white text-xs font-medium hover:shadow-md transition-shadow">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Confirm Booking
                    </button>
                  </motion.div>
                )}
              </div>
            </div>
          </div>

          {/* Circulars */}
          <div className="rounded-2xl border border-border bg-card p-5">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-sm font-semibold text-foreground flex items-center gap-2">
                <Bell className="w-4 h-4 text-amber-500" />
                Circulars & Announcements
              </h4>
              <div className="flex items-center gap-1.5">
                {['all', 'unread', 'Exam', 'Event', 'Finance'].map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setCircularFilter(filter)}
                    className={`px-2.5 py-1 rounded-lg text-[9px] font-medium transition-all ${
                      circularFilter === filter
                        ? 'gradient-birla text-white'
                        : 'border border-border text-muted-foreground hover:bg-muted'
                    }`}
                  >
                    {filter === 'all' ? 'All' : filter === 'unread' ? 'Unread' : filter}
                  </button>
                ))}
              </div>
            </div>
            <div className="space-y-2 max-h-80 overflow-y-auto">
              {filteredCirculars.map((circular) => (
                <div key={circular.id} className={`flex items-start gap-3 p-3 rounded-xl border transition-all cursor-pointer ${
                  !circular.read ? 'border-birla-gold/30 bg-birla-gold/5' : 'border-border gradient-card-blue'
                }`}>
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                    circular.priority === 'high' ? 'bg-rose-500/10 text-rose-600 dark:text-rose-400' :
                    circular.priority === 'medium' ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400' :
                    'bg-blue-500/10 text-blue-600 dark:text-blue-400'
                  }`}>
                    {circular.priority === 'high' ? <CircleAlert className="w-4 h-4" /> :
                     circular.priority === 'medium' ? <Info className="w-4 h-4" /> :
                     <Bookmark className="w-4 h-4" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      {!circular.read && <span className="w-1.5 h-1.5 rounded-full bg-birla-gold flex-shrink-0" />}
                      <p className={`text-xs ${!circular.read ? 'font-bold text-foreground' : 'font-medium text-foreground'}`}>{circular.title}</p>
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <span className={`text-[9px] px-1.5 py-0.5 rounded-full font-medium ${
                        circular.category === 'Exam' ? 'bg-rose-500/10 text-rose-600 dark:text-rose-400' :
                        circular.category === 'Event' ? 'bg-purple-500/10 text-purple-600 dark:text-purple-400' :
                        circular.category === 'Finance' ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400' :
                        circular.category === 'PTM' ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' :
                        circular.category === 'Health' ? 'bg-pink-500/10 text-pink-600 dark:text-pink-400' :
                        circular.category === 'Transport' ? 'bg-blue-500/10 text-blue-600 dark:text-blue-400' :
                        'bg-muted text-muted-foreground'
                      }`}>
                        {circular.category}
                      </span>
                      <span className="text-[9px] text-muted-foreground">{circular.date}</span>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  )
}


