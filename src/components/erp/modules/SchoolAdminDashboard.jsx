'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Users, UserCheck, IndianRupee, Briefcase, TrendingUp, TrendingDown,
  GraduationCap, BookOpen, Calendar, Clock, AlertTriangle, CheckCircle2,
  BarChart3, Activity, Shield, FileText, ArrowUpRight, ArrowDownRight,
  Building2, Bus, Sparkles, ChevronRight, Hash, Plus, X,
  MessageSquare, PenTool, Target, Zap, Globe, ClipboardCheck,
  CreditCard, Award, Star, PieChart as PieChartIcon, Settings,
  UserPlus, Bell, HeartPulse, Stethoscope, Armchair
} from 'lucide-react'
import {
  BarChart, Bar, AreaChart, Area, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts'
import useAppStore from '@/store/useAppStore'

// ─── Mock Data ─────────────────────────────────────────────────
const statsCards = [
  { label: 'Total Students', value: '2,547', change: '+12.3%', up: true, icon: Users, gradient: 'from-[#0A1628] to-[#1A2D4A]', glow: 'shadow-[#0A1628]/20' },
  { label: 'Attendance Rate', value: '94.2%', change: '+2.1%', up: true, icon: UserCheck, gradient: 'from-emerald-800 to-emerald-600', glow: 'shadow-emerald-800/20' },
  { label: 'Fee Collection', value: '₹45.8L', change: '+8.7%', up: true, icon: IndianRupee, gradient: 'from-[#C8A45C] to-[#E8D5A0]', glow: 'shadow-[#C8A45C]/20' },
  { label: 'Total Staff', value: '186', change: '+5', up: true, icon: Briefcase, gradient: 'from-purple-800 to-purple-600', glow: 'shadow-purple-800/20' },
]

const studentStrengthData = [
  { class: 'Nursery', boys: 45, girls: 42 },
  { class: 'LKG', boys: 52, girls: 48 },
  { class: 'UKG', boys: 48, girls: 50 },
  { class: 'I', boys: 60, girls: 55 },
  { class: 'II', boys: 58, girls: 57 },
  { class: 'III', boys: 62, girls: 54 },
  { class: 'IV', boys: 55, girls: 58 },
  { class: 'V', boys: 65, girls: 52 },
  { class: 'VI', boys: 58, girls: 56 },
  { class: 'VII', boys: 54, girls: 50 },
  { class: 'VIII', boys: 60, girls: 48 },
  { class: 'IX', boys: 55, girls: 52 },
  { class: 'X', boys: 68, girls: 56 },
  { class: 'XI', boys: 48, girls: 45 },
  { class: 'XII', boys: 44, girls: 40 },
]

const feeCollectionData = [
  { month: 'Apr', collected: 38, pending: 8, target: 46 },
  { month: 'May', collected: 42, pending: 6, target: 48 },
  { month: 'Jun', collected: 35, pending: 12, target: 47 },
  { month: 'Jul', collected: 48, pending: 4, target: 52 },
  { month: 'Aug', collected: 45, pending: 5, target: 50 },
  { month: 'Sep', collected: 52, pending: 3, target: 55 },
  { month: 'Oct', collected: 40, pending: 7, target: 47 },
  { month: 'Nov', collected: 46, pending: 5, target: 51 },
  { month: 'Dec', collected: 50, pending: 4, target: 54 },
  { month: 'Jan', collected: 44, pending: 6, target: 50 },
  { month: 'Feb', collected: 48, pending: 3, target: 51 },
  { month: 'Mar', collected: 55, pending: 2, target: 57 },
]

const attendanceWeeklyData = [
  { week: 'W1 Jan', class6: 94, class7: 92, class8: 95, class9: 91, class10: 96 },
  { week: 'W2 Jan', class6: 92, class7: 93, class8: 94, class9: 90, class10: 95 },
  { week: 'W3 Jan', class6: 95, class7: 91, class8: 93, class9: 92, class10: 94 },
  { week: 'W4 Jan', class6: 93, class7: 94, class8: 96, class9: 93, class10: 97 },
  { week: 'W1 Feb', class6: 91, class7: 90, class8: 92, class9: 89, class10: 93 },
  { week: 'W2 Feb', class6: 94, class7: 92, class8: 95, class9: 91, class10: 96 },
  { week: 'W3 Feb', class6: 96, class7: 93, class8: 94, class9: 94, class10: 95 },
  { week: 'W4 Feb', class6: 93, class7: 95, class8: 97, class9: 92, class10: 98 },
]

const admissionFunnelData = [
  { name: 'Applications', value: 1200, color: '#0A1628' },
  { name: 'Screened', value: 850, color: '#142240' },
  { name: 'Interviewed', value: 520, color: '#0E4D6E' },
  { name: 'Admitted', value: 347, color: '#C8A45C' },
  { name: 'Enrolled', value: 310, color: '#22D3EE' },
]

const nepComplianceData = [
  { name: 'Foundational Literacy & Numeracy', progress: 88 },
  { name: 'Multilingual Education', progress: 75 },
  { name: 'Competency-Based Assessment', progress: 82 },
  { name: 'Holistic Progress Card', progress: 90 },
  { name: 'Vocational Integration', progress: 65 },
  { name: 'Digital Infrastructure', progress: 95 },
]

const cbseAssessmentData = [
  { subject: 'Mathematics', avgScore: 78, passRate: 92 },
  { subject: 'Science', avgScore: 75, passRate: 89 },
  { subject: 'English', avgScore: 82, passRate: 95 },
  { subject: 'Hindi', avgScore: 70, passRate: 88 },
  { subject: 'Social Science', avgScore: 72, passRate: 90 },
  { subject: 'Sanskrit', avgScore: 68, passRate: 85 },
  { subject: 'Computer Science', avgScore: 80, passRate: 94 },
]

const performanceIndicators = [
  { name: 'Academic Excellence', value: 87, color: '#22D3EE' },
  { name: 'Co-Curricular', value: 92, color: '#C8A45C' },
  { name: 'Sports Achievement', value: 78, color: '#10B981' },
  { name: 'Digital Readiness', value: 95, color: '#8B5CF6' },
]

const recentActivities = [
  { id: 1, text: 'New admission batch processed for Grade VI', time: '5 min ago', icon: GraduationCap, type: 'success' },
  { id: 2, text: 'Fee reminder sent to 45 parents', time: '18 min ago', icon: IndianRupee, type: 'info' },
  { id: 3, text: 'Attendance anomaly flagged in Class IX-B', time: '32 min ago', icon: AlertTriangle, type: 'warning' },
  { id: 4, text: 'CBSE Board exam schedule uploaded', time: '1 hr ago', icon: FileText, type: 'info' },
  { id: 5, text: 'Teacher evaluation completed for Q3', time: '2 hrs ago', icon: CheckCircle2, type: 'success' },
  { id: 6, text: 'Transport Route 7 updated', time: '3 hrs ago', icon: Bus, type: 'info' },
]

const upcomingEvents = [
  { id: 1, name: 'Annual Sports Day', date: 'Mar 15', type: 'Sports', color: 'bg-emerald-500' },
  { id: 2, name: 'Parent-Teacher Meeting', date: 'Mar 18', type: 'Meeting', color: 'bg-blue-500' },
  { id: 3, name: 'Science Exhibition', date: 'Mar 22', type: 'Academic', color: 'bg-purple-500' },
  { id: 4, name: 'CBSE Board Exams Begin', date: 'Mar 25', type: 'Exam', color: 'bg-red-500' },
  { id: 5, name: 'Annual Day Celebration', date: 'Apr 5', type: 'Cultural', color: 'bg-amber-500' },
]

const quickActions = [
  { label: 'New Admission', icon: UserPlus, color: 'text-emerald-500 bg-emerald-500/10' },
  { label: 'Mark Attendance', icon: UserCheck, color: 'text-blue-500 bg-blue-500/10' },
  { label: 'Fee Receipt', icon: IndianRupee, color: 'text-amber-500 bg-amber-500/10' },
  { label: 'Send Circular', icon: MessageSquare, color: 'text-purple-500 bg-purple-500/10' },
  { label: 'Create Event', icon: Calendar, color: 'text-red-500 bg-red-500/10' },
  { label: 'Generate Report', icon: BarChart3, color: 'text-cyan-500 bg-cyan-500/10' },
  { label: 'Staff Leave', icon: Clock, color: 'text-orange-500 bg-orange-500/10' },
  { label: 'ID Cards', icon: CreditCard, color: 'text-pink-500 bg-pink-500/10' },
]

// ─── Report Data ───────────────────────────────────────────────
const studentStrengthReport = [
  { class: 'Nursery', boys: 45, girls: 42, total: 87 },
  { class: 'LKG', boys: 52, girls: 48, total: 100 },
  { class: 'UKG', boys: 48, girls: 50, total: 98 },
  { class: 'I', boys: 60, girls: 55, total: 115 },
  { class: 'II', boys: 58, girls: 57, total: 115 },
  { class: 'III', boys: 62, girls: 54, total: 116 },
  { class: 'IV', boys: 55, girls: 58, total: 113 },
  { class: 'V', boys: 65, girls: 52, total: 117 },
  { class: 'VI', boys: 58, girls: 56, total: 114 },
  { class: 'VII', boys: 54, girls: 50, total: 104 },
  { class: 'VIII', boys: 60, girls: 48, total: 108 },
  { class: 'IX', boys: 55, girls: 52, total: 107 },
  { class: 'X', boys: 68, girls: 56, total: 124 },
  { class: 'XI', boys: 48, girls: 45, total: 93 },
  { class: 'XII', boys: 44, girls: 40, total: 84 },
]

const attendanceReportData = [
  { day: 'Mon', present: 2380, absent: 167, late: 45 },
  { day: 'Tue', present: 2350, absent: 180, late: 52 },
  { day: 'Wed', present: 2400, absent: 120, late: 38 },
  { day: 'Thu', present: 2320, absent: 195, late: 60 },
  { day: 'Fri', present: 2390, absent: 130, late: 42 },
]

const attendanceWeeklyReport = [
  { week: 'Week 1', avgAttendance: 93.2, avgAbsent: 6.8 },
  { week: 'Week 2', avgAttendance: 94.1, avgAbsent: 5.9 },
  { week: 'Week 3', avgAttendance: 92.8, avgAbsent: 7.2 },
  { week: 'Week 4', avgAttendance: 95.3, avgAbsent: 4.7 },
  { week: 'Week 5', avgAttendance: 93.9, avgAbsent: 6.1 },
  { week: 'Week 6', avgAttendance: 94.6, avgAbsent: 5.4 },
]

const feeCollectionReport = [
  { month: 'Apr', collected: 380000, pending: 80000, total: 460000 },
  { month: 'May', collected: 420000, pending: 60000, total: 480000 },
  { month: 'Jun', collected: 350000, pending: 120000, total: 470000 },
  { month: 'Jul', collected: 480000, pending: 40000, total: 520000 },
  { month: 'Aug', collected: 450000, pending: 50000, total: 500000 },
  { month: 'Sep', collected: 520000, pending: 30000, total: 550000 },
  { month: 'Oct', collected: 400000, pending: 70000, total: 470000 },
  { month: 'Nov', collected: 460000, pending: 50000, total: 510000 },
  { month: 'Dec', collected: 500000, pending: 40000, total: 540000 },
  { month: 'Jan', collected: 440000, pending: 60000, total: 500000 },
  { month: 'Feb', collected: 480000, pending: 30000, total: 510000 },
  { month: 'Mar', collected: 550000, pending: 20000, total: 570000 },
]

const feePaymentModeData = [
  { name: 'UPI', value: 42, color: '#22D3EE' },
  { name: 'Net Banking', value: 28, color: '#0A1628' },
  { name: 'Cash', value: 15, color: '#C8A45C' },
  { name: 'Card', value: 10, color: '#8B5CF6' },
  { name: 'Cheque', value: 5, color: '#10B981' },
]

const staffReportData = [
  { department: 'Science', count: 32, color: '#0A1628' },
  { department: 'Mathematics', count: 28, color: '#22D3EE' },
  { department: 'Languages', count: 35, color: '#C8A45C' },
  { department: 'Social Science', count: 22, color: '#8B5CF6' },
  { department: 'Physical Ed', count: 15, color: '#10B981' },
  { department: 'Arts & Music', count: 18, color: '#F59E0B' },
  { department: 'Administration', count: 24, color: '#EF4444' },
  { department: 'Support Staff', count: 12, color: '#6366F1' },
]

const examPerformanceData = [
  { subject: 'Mathematics', avgScore: 78, passRate: 92, distinction: 28 },
  { subject: 'Science', avgScore: 75, passRate: 89, distinction: 24 },
  { subject: 'English', avgScore: 82, passRate: 95, distinction: 35 },
  { subject: 'Hindi', avgScore: 70, passRate: 88, distinction: 18 },
  { subject: 'Social Science', avgScore: 72, passRate: 90, distinction: 22 },
  { subject: 'Sanskrit', avgScore: 68, passRate: 85, distinction: 15 },
  { subject: 'Computer Science', avgScore: 80, passRate: 94, distinction: 32 },
]

const nepReportData = [
  { category: 'Foundational Literacy & Numeracy', progress: 88, target: 100 },
  { category: 'Multilingual Education', progress: 75, target: 100 },
  { category: 'Competency-Based Assessment', progress: 82, target: 100 },
  { category: 'Holistic Progress Card', progress: 90, target: 100 },
  { category: 'Vocational Integration', progress: 65, target: 100 },
  { category: 'Digital Infrastructure', progress: 95, target: 100 },
]

const udiseComplianceReport = [
  { class: 'Nursery', total: 87, bspAssigned: 82, penAssigned: 70, upparAssigned: 58, bspPct: 94.3, penPct: 80.5, upparPct: 66.7 },
  { class: 'LKG', total: 100, bspAssigned: 95, penAssigned: 78, upparAssigned: 65, bspPct: 95.0, penPct: 78.0, upparPct: 65.0 },
  { class: 'UKG', total: 98, bspAssigned: 92, penAssigned: 76, upparAssigned: 62, bspPct: 93.9, penPct: 77.6, upparPct: 63.3 },
  { class: 'I', total: 115, bspAssigned: 110, penAssigned: 90, upparAssigned: 75, bspPct: 95.7, penPct: 78.3, upparPct: 65.2 },
  { class: 'II', total: 115, bspAssigned: 108, penAssigned: 88, upparAssigned: 72, bspPct: 93.9, penPct: 76.5, upparPct: 62.6 },
  { class: 'III', total: 116, bspAssigned: 112, penAssigned: 92, upparAssigned: 78, bspPct: 96.6, penPct: 79.3, upparPct: 67.2 },
  { class: 'IV', total: 113, bspAssigned: 105, penAssigned: 86, upparAssigned: 70, bspPct: 92.9, penPct: 76.1, upparPct: 61.9 },
  { class: 'V', total: 117, bspAssigned: 110, penAssigned: 90, upparAssigned: 74, bspPct: 94.0, penPct: 76.9, upparPct: 63.2 },
  { class: 'VI', total: 114, bspAssigned: 108, penAssigned: 92, upparAssigned: 80, bspPct: 94.7, penPct: 80.7, upparPct: 70.2 },
  { class: 'VII', total: 104, bspAssigned: 98, penAssigned: 82, upparAssigned: 68, bspPct: 94.2, penPct: 78.8, upparPct: 65.4 },
  { class: 'VIII', total: 108, bspAssigned: 102, penAssigned: 85, upparAssigned: 72, bspPct: 94.4, penPct: 78.7, upparPct: 66.7 },
  { class: 'IX', total: 107, bspAssigned: 100, penAssigned: 84, upparAssigned: 70, bspPct: 93.5, penPct: 78.5, upparPct: 65.4 },
  { class: 'X', total: 124, bspAssigned: 118, penAssigned: 100, upparAssigned: 88, bspPct: 95.2, penPct: 80.6, upparPct: 71.0 },
  { class: 'XI', total: 93, bspAssigned: 88, penAssigned: 74, upparAssigned: 62, bspPct: 94.6, penPct: 79.6, upparPct: 66.7 },
  { class: 'XII', total: 84, bspAssigned: 80, penAssigned: 68, upparAssigned: 56, bspPct: 95.2, penPct: 81.0, upparPct: 66.7 },
]

const admissionReportData = [
  { month: 'Jan', applications: 120, admitted: 45 },
  { month: 'Feb', applications: 180, admitted: 62 },
  { month: 'Mar', applications: 250, admitted: 88 },
  { month: 'Apr', applications: 320, admitted: 110 },
  { month: 'May', applications: 280, admitted: 95 },
  { month: 'Jun', applications: 150, admitted: 52 },
  { month: 'Jul', applications: 80, admitted: 28 },
  { month: 'Aug', applications: 45, admitted: 15 },
]

const transportReportData = [
  { route: 'Route 1 - Singur', students: 52, capacity: 60, utilization: 86.7 },
  { route: 'Route 2 - Chandannagar', students: 48, capacity: 55, utilization: 87.3 },
  { route: 'Route 3 - Srirampore', students: 55, capacity: 60, utilization: 91.7 },
  { route: 'Route 4 - Konnagar', students: 42, capacity: 50, utilization: 84.0 },
  { route: 'Route 5 - Rishra', students: 38, capacity: 45, utilization: 84.4 },
  { route: 'Route 6 - Serampore', students: 45, capacity: 50, utilization: 90.0 },
  { route: 'Route 7 - Bandel', students: 50, capacity: 55, utilization: 90.9 },
  { route: 'Route 8 - Chinsurah', students: 44, capacity: 50, utilization: 88.0 },
]

const cbseBoardExamData = [
  { subject: 'Mathematics', appeared: 124, passed: 116, distinction: 42, avgScore: 78, passRate: 93.5 },
  { subject: 'Physics', appeared: 88, passed: 82, distinction: 28, avgScore: 75, passRate: 93.2 },
  { subject: 'Chemistry', appeared: 88, passed: 84, distinction: 30, avgScore: 76, passRate: 95.5 },
  { subject: 'Biology', appeared: 36, passed: 34, distinction: 12, avgScore: 80, passRate: 94.4 },
  { subject: 'English', appeared: 124, passed: 120, distinction: 48, avgScore: 82, passRate: 96.8 },
  { subject: 'Hindi', appeared: 84, passed: 78, distinction: 22, avgScore: 72, passRate: 92.9 },
  { subject: 'Computer Science', appeared: 44, passed: 42, distinction: 18, avgScore: 84, passRate: 95.5 },
  { subject: 'Social Science', appeared: 124, passed: 118, distinction: 38, avgScore: 74, passRate: 95.2 },
]

// ─── Animation ──────────────────────────────────────────────────
const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.06 } },
}
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
}

const tooltipStyle = (darkMode) => ({
  backgroundColor: darkMode ? '#1A2D4A' : '#fff',
  border: `1px solid ${darkMode ? 'rgba(255,255,255,0.1)' : '#e2e8f0'}`,
  borderRadius: '12px',
  fontSize: '12px',
  color: darkMode ? '#e2e8f0' : '#1e293b',
})

export default function SchoolAdminDashboard() {
  const { darkMode } = useAppStore()
  const [activeTab, setActiveTab] = useState('overview')

  // ─── Form States ──────────────────────────────────────
  const [studentForm, setStudentForm] = useState({
    firstName: '', lastName: '', dob: '', gender: '', class: '', section: '',
    bspId: '', penNo: '', upparId: '', bloodGroup: '',
    fatherName: '', fatherPhone: '', motherName: '', motherPhone: '',
    address: '', city: '', state: 'West Bengal', pincode: '',
    birthCert: false, aadhaar: false, tc: false, marksheet: false,
    photos: false, medical: false, parentId: false, addressProof: false,
  })
  const [feeForm, setFeeForm] = useState({
    student: '', feeType: '', amount: '', paymentMode: '', transactionId: '', date: '', remarks: '',
  })
  const [attendanceForm, setAttendanceForm] = useState({
    class: '', date: '',
  })
  const [attendanceStudents, setAttendanceStudents] = useState([
    { id: 'BOM-001', name: 'Aarav Sharma', bspId: 'BSP/WB/2023/00012', status: 'present' },
    { id: 'BOM-002', name: 'Priya Gupta', bspId: 'BSP/WB/2023/00034', status: 'present' },
    { id: 'BOM-003', name: 'Arjun Reddy', bspId: 'BSP/WB/2023/00056', status: 'absent' },
    { id: 'BOM-004', name: 'Ananya Iyer', bspId: 'BSP/WB/2023/00078', status: 'present' },
    { id: 'BOM-005', name: 'Rohan Patel', bspId: '', status: 'late' },
    { id: 'BOM-006', name: 'Ishita Banerjee', bspId: 'BSP/WB/2023/00102', status: 'present' },
    { id: 'BOM-007', name: 'Vikram Singh', bspId: 'BSP/WB/2023/00115', status: 'present' },
    { id: 'BOM-008', name: 'Meera Nair', bspId: '', status: 'absent' },
  ])
  const [circularForm, setCircularForm] = useState({
    title: '', category: '', targetAudience: '', message: '', priority: '', date: '', attachment: false,
  })
  const [eventForm, setEventForm] = useState({
    eventName: '', eventType: '', date: '', time: '', venue: '', description: '', organizer: '', targetClass: '',
  })
  const [announcementForm, setAnnouncementForm] = useState({
    title: '', message: '', audience: '', priority: '', expiryDate: '',
  })

  // ─── Active form state ────────────────────────────────
  const [activeForm, setActiveForm] = useState(null)
  const [activeReport, setActiveReport] = useState(null)

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'forms', label: 'Forms', icon: PenTool },
    { id: 'reports', label: 'Reports', icon: Activity },
  ]

  const forms = [
    { id: 'student', label: 'Student Registration', icon: UserPlus },
    { id: 'fee', label: 'Fee Collection', icon: IndianRupee },
    { id: 'attendance', label: 'Attendance Marking', icon: UserCheck },
    { id: 'circular', label: 'Circular', icon: MessageSquare },
    { id: 'event', label: 'Event Creation', icon: Calendar },
    { id: 'announcement', label: 'Announcement', icon: Bell },
  ]

  const reports = [
    { id: 'studentStrength', label: 'Student Strength', icon: Users },
    { id: 'attendance', label: 'Attendance', icon: UserCheck },
    { id: 'feeCollection', label: 'Fee Collection', icon: IndianRupee },
    { id: 'staff', label: 'Staff', icon: Briefcase },
    { id: 'examPerformance', label: 'Exam Performance', icon: Award },
    { id: 'nepCompliance', label: 'NEP Compliance', icon: Shield },
    { id: 'udiseCompliance', label: 'UDISE+ Compliance', icon: Hash },
    { id: 'admission', label: 'Admission', icon: GraduationCap },
    { id: 'transport', label: 'Transport', icon: Bus },
    { id: 'cbseBoard', label: 'CBSE Board Exam', icon: FileText },
  ]

  const inputClass = 'w-full px-3 py-2 rounded-xl border border-border bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-[#C8A45C]/30'
  const labelClass = 'text-xs font-medium text-muted-foreground mb-1.5 block'

  const toggleAttendance = (id, status) => {
    setAttendanceStudents(prev => prev.map(s => s.id === id ? { ...s, status } : s))
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="p-4 lg:p-6 space-y-6 max-w-[1600px] mx-auto"
    >
      {/* ─── Top Stats ────────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statsCards.map((card) => {
          const Icon = card.icon
          return (
            <motion.div
              key={card.label}
              variants={itemVariants}
              className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${card.gradient} p-5 text-white shadow-xl ${card.glow}`}
            >
              <div className="absolute top-0 right-0 w-24 h-24 rounded-full bg-white/5 -translate-y-6 translate-x-6" />
              <div className="absolute bottom-0 left-0 w-16 h-16 rounded-full bg-white/5 translate-y-4 -translate-x-4" />
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 rounded-xl bg-white/15 backdrop-blur-sm flex items-center justify-center">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className={`inline-flex items-center gap-0.5 text-xs font-medium px-2 py-0.5 rounded-full ${card.up ? 'bg-emerald-500/20 text-emerald-200' : 'bg-red-500/20 text-red-200'}`}>
                    {card.up ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                    {card.change}
                  </span>
                </div>
                <p className="text-2xl font-bold">{card.value}</p>
                <p className="text-sm text-white/70 mt-0.5">{card.label}</p>
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* ─── Tab Navigation ───────────────────────────────── */}
      <motion.div variants={itemVariants} className="flex items-center gap-2 overflow-x-auto pb-2">
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

      {/* ═══════════════════════════════════════════════════════
          OVERVIEW TAB
          ═══════════════════════════════════════════════════════ */}
      {activeTab === 'overview' && (
        <>
          {/* Student Strength + Fee Collection Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-5">
              <h3 className="text-base font-semibold text-foreground flex items-center gap-2 mb-4">
                <Users className="w-4 h-4 text-[#22D3EE]" />
                Student Strength (Class-wise)
              </h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={studentStrengthData}>
                    <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'} />
                    <XAxis dataKey="class" tick={{ fontSize: 9 }} stroke={darkMode ? '#64748b' : '#94a3b8'} />
                    <YAxis tick={{ fontSize: 10 }} stroke={darkMode ? '#64748b' : '#94a3b8'} />
                    <Tooltip contentStyle={tooltipStyle(darkMode)} />
                    <Legend iconType="circle" wrapperStyle={{ fontSize: '11px' }} />
                    <Bar dataKey="boys" fill="#0A1628" radius={[3,3,0,0]} name="Boys" />
                    <Bar dataKey="girls" fill="#C8A45C" radius={[3,3,0,0]} name="Girls" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-5">
              <h3 className="text-base font-semibold text-foreground flex items-center gap-2 mb-4">
                <IndianRupee className="w-4 h-4 text-[#C8A45C]" />
                Fee Collection (Monthly)
              </h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={feeCollectionData}>
                    <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'} />
                    <XAxis dataKey="month" tick={{ fontSize: 10 }} stroke={darkMode ? '#64748b' : '#94a3b8'} />
                    <YAxis tick={{ fontSize: 10 }} stroke={darkMode ? '#64748b' : '#94a3b8'} tickFormatter={(v) => `₹${v}L`} />
                    <Tooltip contentStyle={tooltipStyle(darkMode)} formatter={(v) => [`₹${v}L`, '']} />
                    <Legend iconType="circle" wrapperStyle={{ fontSize: '11px' }} />
                    <Area type="monotone" dataKey="collected" stackId="1" stroke="#22D3EE" fill="#22D3EE" fillOpacity={0.3} name="Collected" />
                    <Area type="monotone" dataKey="pending" stackId="2" stroke="#C8A45C" fill="#C8A45C" fillOpacity={0.3} name="Pending" />
                    <Area type="monotone" dataKey="target" stroke="#0A1628" fill="none" strokeDasharray="5 5" name="Target" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </motion.div>
          </div>

          {/* Attendance Line + Admission Pie */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-5">
              <h3 className="text-base font-semibold text-foreground flex items-center gap-2 mb-4">
                <UserCheck className="w-4 h-4 text-emerald-500" />
                Attendance (Weekly)
              </h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={attendanceWeeklyData}>
                    <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'} />
                    <XAxis dataKey="week" tick={{ fontSize: 9 }} stroke={darkMode ? '#64748b' : '#94a3b8'} />
                    <YAxis tick={{ fontSize: 10 }} stroke={darkMode ? '#64748b' : '#94a3b8'} domain={[85, 100]} />
                    <Tooltip contentStyle={tooltipStyle(darkMode)} />
                    <Legend iconType="circle" wrapperStyle={{ fontSize: '11px' }} />
                    <Line type="monotone" dataKey="class6" stroke="#0A1628" strokeWidth={2} name="Class VI" dot={false} />
                    <Line type="monotone" dataKey="class7" stroke="#C8A45C" strokeWidth={2} name="Class VII" dot={false} />
                    <Line type="monotone" dataKey="class8" stroke="#22D3EE" strokeWidth={2} name="Class VIII" dot={false} />
                    <Line type="monotone" dataKey="class9" stroke="#8B5CF6" strokeWidth={2} name="Class IX" dot={false} />
                    <Line type="monotone" dataKey="class10" stroke="#10B981" strokeWidth={2} name="Class X" dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-5">
              <h3 className="text-base font-semibold text-foreground flex items-center gap-2 mb-4">
                <GraduationCap className="w-4 h-4 text-purple-500" />
                Admission Funnel
              </h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={admissionFunnelData} cx="50%" cy="50%" innerRadius={50} outerRadius={90} dataKey="value" label={({ name, value }) => `${name}: ${value}`}>
                      {admissionFunnelData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={tooltipStyle(darkMode)} />
                    <Legend iconType="circle" wrapperStyle={{ fontSize: '11px' }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </motion.div>
          </div>

          {/* CBSE Assessment BarChart */}
          <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-5">
            <h3 className="text-base font-semibold text-foreground flex items-center gap-2 mb-4">
              <Award className="w-4 h-4 text-[#C8A45C]" />
              CBSE Assessment Overview
            </h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={cbseAssessmentData}>
                  <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'} />
                  <XAxis dataKey="subject" tick={{ fontSize: 10 }} stroke={darkMode ? '#64748b' : '#94a3b8'} />
                  <YAxis tick={{ fontSize: 10 }} stroke={darkMode ? '#64748b' : '#94a3b8'} />
                  <Tooltip contentStyle={tooltipStyle(darkMode)} />
                  <Legend iconType="circle" wrapperStyle={{ fontSize: '11px' }} />
                  <Bar dataKey="avgScore" fill="#0A1628" radius={[3,3,0,0]} name="Avg Score" />
                  <Bar dataKey="passRate" fill="#22D3EE" radius={[3,3,0,0]} name="Pass Rate %" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* NEP 2020 + Performance Indicators */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-semibold text-foreground flex items-center gap-2">
                  <Shield className="w-4 h-4 text-emerald-500" />
                  NEP 2020 Compliance
                </h3>
                <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-medium">82.5%</span>
              </div>
              <div className="space-y-3">
                {nepComplianceData.map((item) => (
                  <div key={item.name}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-muted-foreground">{item.name}</span>
                      <span className="text-xs font-semibold text-foreground">{item.progress}%</span>
                    </div>
                    <div className="h-2 rounded-full bg-muted overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${item.progress}%` }}
                        transition={{ duration: 1, delay: 0.2, ease: 'easeOut' }}
                        className="h-full rounded-full"
                        style={{
                          background: item.progress >= 85
                            ? 'linear-gradient(90deg, #10B981, #22D3EE)'
                            : item.progress >= 70
                              ? 'linear-gradient(90deg, #C8A45C, #E8D5A0)'
                              : 'linear-gradient(90deg, #EF4444, #F59E0B)',
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-5">
              <h3 className="text-base font-semibold text-foreground flex items-center gap-2 mb-4">
                <Target className="w-4 h-4 text-[#22D3EE]" />
                Performance Indicators
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {performanceIndicators.map((ind) => (
                  <div key={ind.name} className="flex flex-col items-center p-3 rounded-xl border border-border">
                    <div className="relative w-16 h-16 mb-2">
                      <svg className="w-16 h-16 -rotate-90" viewBox="0 0 36 36">
                        <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke={darkMode ? 'rgba(255,255,255,0.1)' : '#e2e8f0'} strokeWidth="3" />
                        <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke={ind.color} strokeWidth="3" strokeDasharray={`${ind.value}, 100`} strokeLinecap="round" />
                      </svg>
                      <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-foreground">{ind.value}%</span>
                    </div>
                    <p className="text-[11px] text-muted-foreground text-center">{ind.name}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Activities + Events + Quick Actions */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-5">
              <h3 className="text-base font-semibold text-foreground flex items-center gap-2 mb-4">
                <Activity className="w-4 h-4 text-[#C8A45C]" />
                Recent Activities
              </h3>
              <div className="space-y-2 max-h-72 overflow-y-auto">
                {recentActivities.map((activity) => {
                  const Icon = activity.icon
                  const typeColors = { success: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400', info: 'bg-blue-500/10 text-blue-600 dark:text-blue-400', warning: 'bg-amber-500/10 text-amber-600 dark:text-amber-400' }
                  return (
                    <div key={activity.id} className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-muted/30 transition-colors">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${typeColors[activity.type]}`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-foreground">{activity.text}</p>
                        <p className="text-[10px] text-muted-foreground mt-0.5">{activity.time}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-5">
              <h3 className="text-base font-semibold text-foreground flex items-center gap-2 mb-4">
                <Calendar className="w-4 h-4 text-purple-500" />
                Upcoming Events
              </h3>
              <div className="space-y-2.5">
                {upcomingEvents.map((event) => (
                  <div key={event.id} className="flex items-center gap-3 p-3 rounded-xl border border-border hover:bg-muted/30 transition-colors group">
                    <div className={`w-10 h-10 rounded-xl ${event.color} text-white flex items-center justify-center text-xs font-bold flex-shrink-0`}>
                      {event.date.split(' ')[1]}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">{event.name}</p>
                      <p className="text-[11px] text-muted-foreground">{event.date} &bull; {event.type}</p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-5">
              <h3 className="text-base font-semibold text-foreground flex items-center gap-2 mb-4">
                <Zap className="w-4 h-4 text-[#22D3EE]" />
                Quick Actions
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {quickActions.map((action) => {
                  const Icon = action.icon
                  return (
                    <button key={action.label} onClick={() => { setActiveTab('forms') }} className="flex flex-col items-center gap-1.5 p-3 rounded-xl border border-border hover:bg-muted/30 transition-colors">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${action.color}`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="text-[10px] font-medium text-foreground text-center">{action.label}</span>
                    </button>
                  )
                })}
              </div>
            </motion.div>
          </div>
        </>
      )}

      {/* ═══════════════════════════════════════════════════════
          FORMS TAB
          ═══════════════════════════════════════════════════════ */}
      {activeTab === 'forms' && (
        <motion.div variants={itemVariants} className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {forms.map((f) => {
              const Icon = f.icon
              return (
                <button
                  key={f.id}
                  onClick={() => setActiveForm(activeForm === f.id ? null : f.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    activeForm === f.id
                      ? 'gradient-birla text-white shadow-md'
                      : 'border border-border text-muted-foreground hover:bg-muted hover:text-foreground'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {f.label}
                </button>
              )
            })}
          </div>

          {/* ─── 1. Student Registration Form ─────────────────── */}
          {activeForm === 'student' && (
            <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-5">
              <h3 className="text-base font-semibold mb-4 flex items-center gap-2">
                <UserPlus className="w-4 h-4 text-[#22D3EE]" /> Student Registration Form
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div><label className={labelClass}>First Name</label><input type="text" value={studentForm.firstName} onChange={(e) => setStudentForm({...studentForm, firstName: e.target.value})} className={inputClass} placeholder="Enter first name" /></div>
                <div><label className={labelClass}>Last Name</label><input type="text" value={studentForm.lastName} onChange={(e) => setStudentForm({...studentForm, lastName: e.target.value})} className={inputClass} placeholder="Enter last name" /></div>
                <div><label className={labelClass}>Date of Birth</label><input type="date" value={studentForm.dob} onChange={(e) => setStudentForm({...studentForm, dob: e.target.value})} className={inputClass} /></div>
                <div><label className={labelClass}>Gender</label><select value={studentForm.gender} onChange={(e) => setStudentForm({...studentForm, gender: e.target.value})} className={inputClass}><option value="">Select</option><option>Male</option><option>Female</option><option>Other</option></select></div>
                <div><label className={labelClass}>Class</label><select value={studentForm.class} onChange={(e) => setStudentForm({...studentForm, class: e.target.value})} className={inputClass}><option value="">Select Class</option>{['Nursery','LKG','UKG','I','II','III','IV','V','VI','VII','VIII','IX','X','XI','XII'].map(c => <option key={c}>{c}</option>)}</select></div>
                <div><label className={labelClass}>Section</label><select value={studentForm.section} onChange={(e) => setStudentForm({...studentForm, section: e.target.value})} className={inputClass}><option value="">Select</option><option>A</option><option>B</option><option>C</option></select></div>
                <div><label className={labelClass}>BSP ID</label><input type="text" value={studentForm.bspId} onChange={(e) => setStudentForm({...studentForm, bspId: e.target.value})} className={inputClass} placeholder="BSP/WB/2023/XXXXX" /></div>
                <div><label className={labelClass}>PEN No</label><input type="text" value={studentForm.penNo} onChange={(e) => setStudentForm({...studentForm, penNo: e.target.value})} className={inputClass} placeholder="PEN-XXXX-XXXX" /></div>
                <div><label className={labelClass}>Uppar ID</label><input type="text" value={studentForm.upparId} onChange={(e) => setStudentForm({...studentForm, upparId: e.target.value})} className={inputClass} placeholder="UPPR-WB-XXXXXX" /></div>
                <div><label className={labelClass}>Blood Group</label><select value={studentForm.bloodGroup} onChange={(e) => setStudentForm({...studentForm, bloodGroup: e.target.value})} className={inputClass}><option value="">Select</option>{['A+','A-','B+','B-','AB+','AB-','O+','O-'].map(b => <option key={b}>{b}</option>)}</select></div>
                <div><label className={labelClass}>Father&apos;s Name</label><input type="text" value={studentForm.fatherName} onChange={(e) => setStudentForm({...studentForm, fatherName: e.target.value})} className={inputClass} placeholder="Enter father's name" /></div>
                <div><label className={labelClass}>Father&apos;s Phone</label><input type="tel" value={studentForm.fatherPhone} onChange={(e) => setStudentForm({...studentForm, fatherPhone: e.target.value})} className={inputClass} placeholder="+91 XXXXX XXXXX" /></div>
                <div><label className={labelClass}>Mother&apos;s Name</label><input type="text" value={studentForm.motherName} onChange={(e) => setStudentForm({...studentForm, motherName: e.target.value})} className={inputClass} placeholder="Enter mother's name" /></div>
                <div><label className={labelClass}>Mother&apos;s Phone</label><input type="tel" value={studentForm.motherPhone} onChange={(e) => setStudentForm({...studentForm, motherPhone: e.target.value})} className={inputClass} placeholder="+91 XXXXX XXXXX" /></div>
                <div className="md:col-span-2 lg:col-span-3"><label className={labelClass}>Address</label><input type="text" value={studentForm.address} onChange={(e) => setStudentForm({...studentForm, address: e.target.value})} className={inputClass} placeholder="Full address" /></div>
                <div><label className={labelClass}>City</label><input type="text" value={studentForm.city} onChange={(e) => setStudentForm({...studentForm, city: e.target.value})} className={inputClass} placeholder="City" /></div>
                <div><label className={labelClass}>State</label><input type="text" value={studentForm.state} onChange={(e) => setStudentForm({...studentForm, state: e.target.value})} className={inputClass} /></div>
                <div><label className={labelClass}>Pincode</label><input type="text" value={studentForm.pincode} onChange={(e) => setStudentForm({...studentForm, pincode: e.target.value})} className={inputClass} placeholder="712XXX" /></div>
              </div>
              <div className="mt-4">
                <label className={labelClass}>Documents Submitted</label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {[
                    { key: 'birthCert', label: 'Birth Certificate' },
                    { key: 'aadhaar', label: 'Aadhaar Card' },
                    { key: 'tc', label: 'Transfer Certificate' },
                    { key: 'marksheet', label: 'Previous Marksheet' },
                    { key: 'photos', label: 'Passport Photos' },
                    { key: 'medical', label: 'Medical Certificate' },
                    { key: 'parentId', label: 'Parent ID Proof' },
                    { key: 'addressProof', label: 'Address Proof' },
                  ].map((doc) => (
                    <label key={doc.key} className="flex items-center gap-2 p-2 rounded-lg border border-border hover:bg-muted/30 cursor-pointer">
                      <input type="checkbox" checked={studentForm[doc.key]} onChange={(e) => setStudentForm({...studentForm, [doc.key]: e.target.checked})} className="accent-[#C8A45C]" />
                      <span className="text-xs text-foreground">{doc.label}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-3 mt-4">
                <button className="px-4 py-2 rounded-xl gradient-birla text-white text-sm font-medium">Submit Registration</button>
                <button onClick={() => setActiveForm(null)} className="px-4 py-2 rounded-xl border border-border text-sm text-muted-foreground">Cancel</button>
              </div>
            </motion.div>
          )}

          {/* ─── 2. Fee Collection Entry Form ─────────────────── */}
          {activeForm === 'fee' && (
            <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-5">
              <h3 className="text-base font-semibold mb-4 flex items-center gap-2">
                <IndianRupee className="w-4 h-4 text-[#C8A45C]" /> Fee Collection Entry Form
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div><label className={labelClass}>Student</label><input type="text" value={feeForm.student} onChange={(e) => setFeeForm({...feeForm, student: e.target.value})} className={inputClass} placeholder="Search by name or ID..." /></div>
                <div><label className={labelClass}>Fee Type</label><select value={feeForm.feeType} onChange={(e) => setFeeForm({...feeForm, feeType: e.target.value})} className={inputClass}><option value="">Select Fee Type</option><option>Tuition</option><option>Development</option><option>Transport</option><option>Lab</option><option>Exam</option></select></div>
                <div><label className={labelClass}>Amount (₹)</label><input type="number" value={feeForm.amount} onChange={(e) => setFeeForm({...feeForm, amount: e.target.value})} className={inputClass} placeholder="Enter amount" /></div>
                <div><label className={labelClass}>Payment Mode</label><select value={feeForm.paymentMode} onChange={(e) => setFeeForm({...feeForm, paymentMode: e.target.value})} className={inputClass}><option value="">Select Mode</option><option>Cash</option><option>UPI</option><option>NetBanking</option><option>Card</option><option>Cheque</option></select></div>
                <div><label className={labelClass}>Transaction ID</label><input type="text" value={feeForm.transactionId} onChange={(e) => setFeeForm({...feeForm, transactionId: e.target.value})} className={inputClass} placeholder="TXN-XXXXXXX" /></div>
                <div><label className={labelClass}>Date</label><input type="date" value={feeForm.date} onChange={(e) => setFeeForm({...feeForm, date: e.target.value})} className={inputClass} /></div>
                <div className="md:col-span-2 lg:col-span-3"><label className={labelClass}>Remarks</label><textarea rows={2} value={feeForm.remarks} onChange={(e) => setFeeForm({...feeForm, remarks: e.target.value})} className={`${inputClass} resize-none`} placeholder="Optional remarks..." /></div>
              </div>
              <div className="flex items-center gap-3 mt-4">
                <button className="px-4 py-2 rounded-xl gradient-birla-gold text-[#0A1628] text-sm font-medium">Collect & Generate Receipt</button>
                <button onClick={() => setActiveForm(null)} className="px-4 py-2 rounded-xl border border-border text-sm text-muted-foreground">Cancel</button>
              </div>
            </motion.div>
          )}

          {/* ─── 3. Attendance Marking Form ────────────────────── */}
          {activeForm === 'attendance' && (
            <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-5">
              <h3 className="text-base font-semibold mb-4 flex items-center gap-2">
                <UserCheck className="w-4 h-4 text-emerald-500" /> Attendance Marking Form
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div><label className={labelClass}>Class</label><select value={attendanceForm.class} onChange={(e) => setAttendanceForm({...attendanceForm, class: e.target.value})} className={inputClass}><option value="">Select Class</option>{['Nursery','LKG','UKG','I','II','III','IV','V','VI','VII','VIII','IX','X','XI','XII'].map(c => <option key={c}>{c}</option>)}</select></div>
                <div><label className={labelClass}>Date</label><input type="date" value={attendanceForm.date} onChange={(e) => setAttendanceForm({...attendanceForm, date: e.target.value})} className={inputClass} /></div>
              </div>
              <div className="rounded-xl border border-border overflow-hidden">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border bg-muted/30">
                      <th className="text-left px-4 py-2 text-xs font-semibold text-muted-foreground">ID</th>
                      <th className="text-left px-4 py-2 text-xs font-semibold text-muted-foreground">BSP ID</th>
                      <th className="text-left px-4 py-2 text-xs font-semibold text-muted-foreground">Student Name</th>
                      <th className="text-left px-4 py-2 text-xs font-semibold text-muted-foreground">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {attendanceStudents.map((s) => (
                      <tr key={s.id} className="border-b border-border/50">
                        <td className="px-4 py-2 text-xs font-mono text-[#22D3EE]">{s.id}</td>
                        <td className="px-4 py-2 text-xs font-mono text-muted-foreground">{s.bspId || <span className="text-red-400">Not Assigned</span>}</td>
                        <td className="px-4 py-2 text-sm text-foreground">{s.name}</td>
                        <td className="px-4 py-2">
                          <div className="flex items-center gap-1.5">
                            {['present', 'absent', 'late'].map((st) => (
                              <button
                                key={st}
                                onClick={() => toggleAttendance(s.id, st)}
                                className={`px-2.5 py-1 rounded-lg text-[10px] font-medium capitalize transition-all ${
                                  s.status === st
                                    ? st === 'present' ? 'bg-emerald-500 text-white' : st === 'absent' ? 'bg-red-500 text-white' : 'bg-amber-500 text-white'
                                    : 'border border-border text-muted-foreground hover:bg-muted'
                                }`}
                              >
                                {st}
                              </button>
                            ))}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="flex items-center gap-3 mt-4">
                <button className="px-4 py-2 rounded-xl gradient-birla text-white text-sm font-medium">Submit Attendance</button>
                <button onClick={() => setActiveForm(null)} className="px-4 py-2 rounded-xl border border-border text-sm text-muted-foreground">Cancel</button>
              </div>
            </motion.div>
          )}

          {/* ─── 4. Circular Form ──────────────────────────────── */}
          {activeForm === 'circular' && (
            <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-5">
              <h3 className="text-base font-semibold mb-4 flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-purple-500" /> Circular Form
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div><label className={labelClass}>Title</label><input type="text" value={circularForm.title} onChange={(e) => setCircularForm({...circularForm, title: e.target.value})} className={inputClass} placeholder="Enter circular title" /></div>
                <div><label className={labelClass}>Category</label><select value={circularForm.category} onChange={(e) => setCircularForm({...circularForm, category: e.target.value})} className={inputClass}><option value="">Select Category</option><option>Academic</option><option>Event</option><option>Fee</option><option>Transport</option><option>Health</option><option>General</option></select></div>
                <div><label className={labelClass}>Target Audience</label><select value={circularForm.targetAudience} onChange={(e) => setCircularForm({...circularForm, targetAudience: e.target.value})} className={inputClass}><option value="">Select Audience</option><option>All</option><option>Class</option><option>Staff</option><option>Parents</option></select></div>
                <div><label className={labelClass}>Priority</label><select value={circularForm.priority} onChange={(e) => setCircularForm({...circularForm, priority: e.target.value})} className={inputClass}><option value="">Select Priority</option><option>Normal</option><option>High</option><option>Urgent</option></select></div>
                <div><label className={labelClass}>Date</label><input type="date" value={circularForm.date} onChange={(e) => setCircularForm({...circularForm, date: e.target.value})} className={inputClass} /></div>
                <div><label className="flex items-center gap-2 mt-5 cursor-pointer"><input type="checkbox" checked={circularForm.attachment} onChange={(e) => setCircularForm({...circularForm, attachment: e.target.checked})} className="accent-[#C8A45C]" /><span className="text-xs text-foreground">Has Attachment</span></label></div>
                <div className="md:col-span-2"><label className={labelClass}>Message</label><textarea rows={4} value={circularForm.message} onChange={(e) => setCircularForm({...circularForm, message: e.target.value})} className={`${inputClass} resize-none`} placeholder="Enter circular message..." /></div>
              </div>
              <div className="flex items-center gap-3 mt-4">
                <button className="px-4 py-2 rounded-xl gradient-birla text-white text-sm font-medium">Publish Circular</button>
                <button onClick={() => setActiveForm(null)} className="px-4 py-2 rounded-xl border border-border text-sm text-muted-foreground">Cancel</button>
              </div>
            </motion.div>
          )}

          {/* ─── 5. Event Creation Form ────────────────────────── */}
          {activeForm === 'event' && (
            <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-5">
              <h3 className="text-base font-semibold mb-4 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-amber-500" /> Event Creation Form
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div><label className={labelClass}>Event Name</label><input type="text" value={eventForm.eventName} onChange={(e) => setEventForm({...eventForm, eventName: e.target.value})} className={inputClass} placeholder="Enter event name" /></div>
                <div><label className={labelClass}>Event Type</label><select value={eventForm.eventType} onChange={(e) => setEventForm({...eventForm, eventType: e.target.value})} className={inputClass}><option value="">Select Type</option><option>Academic</option><option>Sports</option><option>Cultural</option><option>Meeting</option><option>Holiday</option></select></div>
                <div><label className={labelClass}>Date</label><input type="date" value={eventForm.date} onChange={(e) => setEventForm({...eventForm, date: e.target.value})} className={inputClass} /></div>
                <div><label className={labelClass}>Time</label><input type="time" value={eventForm.time} onChange={(e) => setEventForm({...eventForm, time: e.target.value})} className={inputClass} /></div>
                <div><label className={labelClass}>Venue</label><input type="text" value={eventForm.venue} onChange={(e) => setEventForm({...eventForm, venue: e.target.value})} className={inputClass} placeholder="Enter venue" /></div>
                <div><label className={labelClass}>Target Class</label><select value={eventForm.targetClass} onChange={(e) => setEventForm({...eventForm, targetClass: e.target.value})} className={inputClass}><option value="">All Classes</option>{['Nursery','LKG','UKG','I','II','III','IV','V','VI','VII','VIII','IX','X','XI','XII'].map(c => <option key={c}>{c}</option>)}</select></div>
                <div><label className={labelClass}>Organizer</label><input type="text" value={eventForm.organizer} onChange={(e) => setEventForm({...eventForm, organizer: e.target.value})} className={inputClass} placeholder="Organizer name" /></div>
                <div className="md:col-span-2 lg:col-span-2"><label className={labelClass}>Description</label><textarea rows={3} value={eventForm.description} onChange={(e) => setEventForm({...eventForm, description: e.target.value})} className={`${inputClass} resize-none`} placeholder="Event description..." /></div>
              </div>
              <div className="flex items-center gap-3 mt-4">
                <button className="px-4 py-2 rounded-xl gradient-birla text-white text-sm font-medium">Create Event</button>
                <button onClick={() => setActiveForm(null)} className="px-4 py-2 rounded-xl border border-border text-sm text-muted-foreground">Cancel</button>
              </div>
            </motion.div>
          )}

          {/* ─── 6. Announcement Form ──────────────────────────── */}
          {activeForm === 'announcement' && (
            <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-5">
              <h3 className="text-base font-semibold mb-4 flex items-center gap-2">
                <Bell className="w-4 h-4 text-red-500" /> Announcement Form
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div><label className={labelClass}>Title</label><input type="text" value={announcementForm.title} onChange={(e) => setAnnouncementForm({...announcementForm, title: e.target.value})} className={inputClass} placeholder="Announcement title" /></div>
                <div><label className={labelClass}>Audience</label><select value={announcementForm.audience} onChange={(e) => setAnnouncementForm({...announcementForm, audience: e.target.value})} className={inputClass}><option value="">Select Audience</option><option>All Students</option><option>All Parents</option><option>All Staff</option><option>Class Specific</option></select></div>
                <div><label className={labelClass}>Priority</label><select value={announcementForm.priority} onChange={(e) => setAnnouncementForm({...announcementForm, priority: e.target.value})} className={inputClass}><option value="">Select Priority</option><option>Normal</option><option>High</option><option>Urgent</option></select></div>
                <div><label className={labelClass}>Expiry Date</label><input type="date" value={announcementForm.expiryDate} onChange={(e) => setAnnouncementForm({...announcementForm, expiryDate: e.target.value})} className={inputClass} /></div>
                <div className="md:col-span-2"><label className={labelClass}>Message</label><textarea rows={4} value={announcementForm.message} onChange={(e) => setAnnouncementForm({...announcementForm, message: e.target.value})} className={`${inputClass} resize-none`} placeholder="Announcement message..." /></div>
              </div>
              <div className="flex items-center gap-3 mt-4">
                <button className="px-4 py-2 rounded-xl gradient-birla text-white text-sm font-medium">Post Announcement</button>
                <button onClick={() => setActiveForm(null)} className="px-4 py-2 rounded-xl border border-border text-sm text-muted-foreground">Cancel</button>
              </div>
            </motion.div>
          )}

          {!activeForm && (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="w-16 h-16 rounded-2xl gradient-birla flex items-center justify-center mb-4">
                <PenTool className="w-8 h-8 text-[#C8A45C]" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-1">Select a Form</h3>
              <p className="text-sm text-muted-foreground">Choose a form from the buttons above to begin data entry.</p>
            </div>
          )}
        </motion.div>
      )}

      {/* ═══════════════════════════════════════════════════════
          REPORTS TAB
          ═══════════════════════════════════════════════════════ */}
      {activeTab === 'reports' && (
        <motion.div variants={itemVariants} className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {reports.map((r) => {
              const Icon = r.icon
              return (
                <button
                  key={r.id}
                  onClick={() => setActiveReport(activeReport === r.id ? null : r.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    activeReport === r.id
                      ? 'gradient-birla text-white shadow-md'
                      : 'border border-border text-muted-foreground hover:bg-muted hover:text-foreground'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {r.label}
                </button>
              )
            })}
          </div>

          {/* ─── 1. Student Strength Report ────────────────────── */}
          {activeReport === 'studentStrength' && (
            <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-5">
              <h3 className="text-base font-semibold mb-4 flex items-center gap-2">
                <Users className="w-4 h-4 text-[#22D3EE]" /> Student Strength Report
              </h3>
              <div className="overflow-x-auto mb-4">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border bg-muted/30">
                      <th className="text-left px-4 py-2 text-xs font-semibold text-muted-foreground">Class</th>
                      <th className="text-right px-4 py-2 text-xs font-semibold text-muted-foreground">Boys</th>
                      <th className="text-right px-4 py-2 text-xs font-semibold text-muted-foreground">Girls</th>
                      <th className="text-right px-4 py-2 text-xs font-semibold text-muted-foreground">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {studentStrengthReport.map((r) => (
                      <tr key={r.class} className="border-b border-border/50 hover:bg-muted/20">
                        <td className="px-4 py-2 text-sm font-medium text-foreground">{r.class}</td>
                        <td className="px-4 py-2 text-sm text-right text-foreground">{r.boys}</td>
                        <td className="px-4 py-2 text-sm text-right text-foreground">{r.girls}</td>
                        <td className="px-4 py-2 text-sm text-right font-semibold text-[#C8A45C]">{r.total}</td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr className="border-t-2 border-border bg-muted/20">
                      <td className="px-4 py-2 text-sm font-bold text-foreground">Grand Total</td>
                      <td className="px-4 py-2 text-sm text-right font-bold text-foreground">{studentStrengthReport.reduce((a,b) => a + b.boys, 0)}</td>
                      <td className="px-4 py-2 text-sm text-right font-bold text-foreground">{studentStrengthReport.reduce((a,b) => a + b.girls, 0)}</td>
                      <td className="px-4 py-2 text-sm text-right font-bold text-[#C8A45C]">{studentStrengthReport.reduce((a,b) => a + b.total, 0)}</td>
                    </tr>
                  </tfoot>
                </table>
              </div>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={studentStrengthReport}>
                    <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'} />
                    <XAxis dataKey="class" tick={{ fontSize: 9 }} stroke={darkMode ? '#64748b' : '#94a3b8'} />
                    <YAxis tick={{ fontSize: 10 }} stroke={darkMode ? '#64748b' : '#94a3b8'} />
                    <Tooltip contentStyle={tooltipStyle(darkMode)} />
                    <Legend iconType="circle" wrapperStyle={{ fontSize: '11px' }} />
                    <Bar dataKey="boys" fill="#0A1628" radius={[3,3,0,0]} name="Boys" />
                    <Bar dataKey="girls" fill="#C8A45C" radius={[3,3,0,0]} name="Girls" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </motion.div>
          )}

          {/* ─── 2. Attendance Report ──────────────────────────── */}
          {activeReport === 'attendance' && (
            <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-5">
              <h3 className="text-base font-semibold mb-4 flex items-center gap-2">
                <UserCheck className="w-4 h-4 text-emerald-500" /> Attendance Report
              </h3>
              <div className="overflow-x-auto mb-4">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border bg-muted/30">
                      <th className="text-left px-4 py-2 text-xs font-semibold text-muted-foreground">Day</th>
                      <th className="text-right px-4 py-2 text-xs font-semibold text-muted-foreground">Present</th>
                      <th className="text-right px-4 py-2 text-xs font-semibold text-muted-foreground">Absent</th>
                      <th className="text-right px-4 py-2 text-xs font-semibold text-muted-foreground">Late</th>
                      <th className="text-right px-4 py-2 text-xs font-semibold text-muted-foreground">Attendance %</th>
                    </tr>
                  </thead>
                  <tbody>
                    {attendanceReportData.map((r) => (
                      <tr key={r.day} className="border-b border-border/50 hover:bg-muted/20">
                        <td className="px-4 py-2 text-sm font-medium text-foreground">{r.day}</td>
                        <td className="px-4 py-2 text-sm text-right text-emerald-500 font-medium">{r.present}</td>
                        <td className="px-4 py-2 text-sm text-right text-red-500 font-medium">{r.absent}</td>
                        <td className="px-4 py-2 text-sm text-right text-amber-500 font-medium">{r.late}</td>
                        <td className="px-4 py-2 text-sm text-right font-semibold text-foreground">{((r.present / 2547) * 100).toFixed(1)}%</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={attendanceWeeklyReport}>
                    <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'} />
                    <XAxis dataKey="week" tick={{ fontSize: 10 }} stroke={darkMode ? '#64748b' : '#94a3b8'} />
                    <YAxis tick={{ fontSize: 10 }} stroke={darkMode ? '#64748b' : '#94a3b8'} domain={[88, 98]} />
                    <Tooltip contentStyle={tooltipStyle(darkMode)} />
                    <Legend iconType="circle" wrapperStyle={{ fontSize: '11px' }} />
                    <Line type="monotone" dataKey="avgAttendance" stroke="#22D3EE" strokeWidth={2} name="Avg Attendance %" dot={{ r: 4 }} />
                    <Line type="monotone" dataKey="avgAbsent" stroke="#EF4444" strokeWidth={2} name="Avg Absent %" dot={{ r: 4 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </motion.div>
          )}

          {/* ─── 3. Fee Collection Report ──────────────────────── */}
          {activeReport === 'feeCollection' && (
            <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-5">
              <h3 className="text-base font-semibold mb-4 flex items-center gap-2">
                <IndianRupee className="w-4 h-4 text-[#C8A45C]" /> Fee Collection Report
              </h3>
              <div className="overflow-x-auto mb-4">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border bg-muted/30">
                      <th className="text-left px-4 py-2 text-xs font-semibold text-muted-foreground">Month</th>
                      <th className="text-right px-4 py-2 text-xs font-semibold text-muted-foreground">Collected</th>
                      <th className="text-right px-4 py-2 text-xs font-semibold text-muted-foreground">Pending</th>
                      <th className="text-right px-4 py-2 text-xs font-semibold text-muted-foreground">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {feeCollectionReport.map((r) => (
                      <tr key={r.month} className="border-b border-border/50 hover:bg-muted/20">
                        <td className="px-4 py-2 text-sm font-medium text-foreground">{r.month}</td>
                        <td className="px-4 py-2 text-sm text-right text-emerald-500 font-medium">₹{(r.collected/1000).toFixed(0)}K</td>
                        <td className="px-4 py-2 text-sm text-right text-red-500 font-medium">₹{(r.pending/1000).toFixed(0)}K</td>
                        <td className="px-4 py-2 text-sm text-right font-semibold text-[#C8A45C]">₹{(r.total/1000).toFixed(0)}K</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={feeCollectionReport}>
                      <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'} />
                      <XAxis dataKey="month" tick={{ fontSize: 10 }} stroke={darkMode ? '#64748b' : '#94a3b8'} />
                      <YAxis tick={{ fontSize: 10 }} stroke={darkMode ? '#64748b' : '#94a3b8'} tickFormatter={(v) => `₹${v/1000}K`} />
                      <Tooltip contentStyle={tooltipStyle(darkMode)} formatter={(v) => [`₹${(v/1000).toFixed(0)}K`, '']} />
                      <Legend iconType="circle" wrapperStyle={{ fontSize: '11px' }} />
                      <Area type="monotone" dataKey="collected" stroke="#22D3EE" fill="#22D3EE" fillOpacity={0.3} name="Collected" />
                      <Area type="monotone" dataKey="pending" stroke="#EF4444" fill="#EF4444" fillOpacity={0.2} name="Pending" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={feePaymentModeData} cx="50%" cy="50%" innerRadius={45} outerRadius={80} dataKey="value" label={({ name, value }) => `${name}: ${value}%`}>
                        {feePaymentModeData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip contentStyle={tooltipStyle(darkMode)} />
                      <Legend iconType="circle" wrapperStyle={{ fontSize: '11px' }} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </motion.div>
          )}

          {/* ─── 4. Staff Report ───────────────────────────────── */}
          {activeReport === 'staff' && (
            <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-5">
              <h3 className="text-base font-semibold mb-4 flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-purple-500" /> Staff Report
              </h3>
              <div className="overflow-x-auto mb-4">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border bg-muted/30">
                      <th className="text-left px-4 py-2 text-xs font-semibold text-muted-foreground">Department</th>
                      <th className="text-right px-4 py-2 text-xs font-semibold text-muted-foreground">Staff Count</th>
                      <th className="text-right px-4 py-2 text-xs font-semibold text-muted-foreground">% of Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {staffReportData.map((r) => (
                      <tr key={r.department} className="border-b border-border/50 hover:bg-muted/20">
                        <td className="px-4 py-2 text-sm font-medium text-foreground">{r.department}</td>
                        <td className="px-4 py-2 text-sm text-right text-foreground">{r.count}</td>
                        <td className="px-4 py-2 text-sm text-right text-muted-foreground">{((r.count / 186) * 100).toFixed(1)}%</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={staffReportData} cx="50%" cy="50%" innerRadius={50} outerRadius={90} dataKey="count" label={({ department, count }) => `${department}: ${count}`}>
                      {staffReportData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={tooltipStyle(darkMode)} />
                    <Legend iconType="circle" wrapperStyle={{ fontSize: '11px' }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </motion.div>
          )}

          {/* ─── 5. Exam Performance Report ────────────────────── */}
          {activeReport === 'examPerformance' && (
            <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-5">
              <h3 className="text-base font-semibold mb-4 flex items-center gap-2">
                <Award className="w-4 h-4 text-[#C8A45C]" /> Exam Performance Report
              </h3>
              <div className="overflow-x-auto mb-4">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border bg-muted/30">
                      <th className="text-left px-4 py-2 text-xs font-semibold text-muted-foreground">Subject</th>
                      <th className="text-right px-4 py-2 text-xs font-semibold text-muted-foreground">Avg Score</th>
                      <th className="text-right px-4 py-2 text-xs font-semibold text-muted-foreground">Pass Rate %</th>
                      <th className="text-right px-4 py-2 text-xs font-semibold text-muted-foreground">Distinction</th>
                    </tr>
                  </thead>
                  <tbody>
                    {examPerformanceData.map((r) => (
                      <tr key={r.subject} className="border-b border-border/50 hover:bg-muted/20">
                        <td className="px-4 py-2 text-sm font-medium text-foreground">{r.subject}</td>
                        <td className="px-4 py-2 text-sm text-right text-foreground">{r.avgScore}</td>
                        <td className="px-4 py-2 text-sm text-right text-emerald-500 font-medium">{r.passRate}%</td>
                        <td className="px-4 py-2 text-sm text-right text-[#C8A45C] font-medium">{r.distinction}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={examPerformanceData}>
                    <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'} />
                    <XAxis dataKey="subject" tick={{ fontSize: 10 }} stroke={darkMode ? '#64748b' : '#94a3b8'} />
                    <YAxis tick={{ fontSize: 10 }} stroke={darkMode ? '#64748b' : '#94a3b8'} />
                    <Tooltip contentStyle={tooltipStyle(darkMode)} />
                    <Legend iconType="circle" wrapperStyle={{ fontSize: '11px' }} />
                    <Bar dataKey="avgScore" fill="#0A1628" radius={[3,3,0,0]} name="Avg Score" />
                    <Bar dataKey="passRate" fill="#22D3EE" radius={[3,3,0,0]} name="Pass Rate %" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </motion.div>
          )}

          {/* ─── 6. NEP Compliance Report ──────────────────────── */}
          {activeReport === 'nepCompliance' && (
            <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-5">
              <h3 className="text-base font-semibold mb-4 flex items-center gap-2">
                <Shield className="w-4 h-4 text-emerald-500" /> NEP 2020 Compliance Report
              </h3>
              <div className="overflow-x-auto mb-4">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border bg-muted/30">
                      <th className="text-left px-4 py-2 text-xs font-semibold text-muted-foreground">Category</th>
                      <th className="text-right px-4 py-2 text-xs font-semibold text-muted-foreground">Progress</th>
                      <th className="text-right px-4 py-2 text-xs font-semibold text-muted-foreground">Target</th>
                      <th className="text-left px-4 py-2 text-xs font-semibold text-muted-foreground">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {nepReportData.map((r) => (
                      <tr key={r.category} className="border-b border-border/50 hover:bg-muted/20">
                        <td className="px-4 py-2 text-sm font-medium text-foreground">{r.category}</td>
                        <td className="px-4 py-2 text-sm text-right font-semibold text-foreground">{r.progress}%</td>
                        <td className="px-4 py-2 text-sm text-right text-muted-foreground">{r.target}%</td>
                        <td className="px-4 py-2">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${
                            r.progress >= 85 ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' :
                            r.progress >= 70 ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400' :
                            'bg-red-500/10 text-red-600 dark:text-red-400'
                          }`}>
                            {r.progress >= 85 ? 'On Track' : r.progress >= 70 ? 'Needs Attention' : 'Critical'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="space-y-3">
                {nepReportData.map((item) => (
                  <div key={item.category}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-muted-foreground">{item.category}</span>
                      <span className="text-xs font-semibold text-foreground">{item.progress}%</span>
                    </div>
                    <div className="h-2.5 rounded-full bg-muted overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${item.progress}%` }}
                        transition={{ duration: 1, ease: 'easeOut' }}
                        className="h-full rounded-full"
                        style={{
                          background: item.progress >= 85
                            ? 'linear-gradient(90deg, #10B981, #22D3EE)'
                            : item.progress >= 70
                              ? 'linear-gradient(90deg, #C8A45C, #E8D5A0)'
                              : 'linear-gradient(90deg, #EF4444, #F59E0B)',
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* ─── 7. UDISE+ Compliance Report ───────────────────── */}
          {activeReport === 'udiseCompliance' && (
            <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-5">
              <h3 className="text-base font-semibold mb-4 flex items-center gap-2">
                <Hash className="w-4 h-4 text-[#22D3EE]" /> UDISE+ Compliance Report (BSP ID / PEN No / Uppar ID)
              </h3>
              <div className="overflow-x-auto mb-4">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border bg-muted/30">
                      <th className="text-left px-3 py-2 text-xs font-semibold text-muted-foreground">Class</th>
                      <th className="text-right px-3 py-2 text-xs font-semibold text-muted-foreground">Total</th>
                      <th className="text-right px-3 py-2 text-xs font-semibold text-muted-foreground">BSP ID</th>
                      <th className="text-right px-3 py-2 text-xs font-semibold text-muted-foreground">BSP %</th>
                      <th className="text-right px-3 py-2 text-xs font-semibold text-muted-foreground">PEN No</th>
                      <th className="text-right px-3 py-2 text-xs font-semibold text-muted-foreground">PEN %</th>
                      <th className="text-right px-3 py-2 text-xs font-semibold text-muted-foreground">Uppar ID</th>
                      <th className="text-right px-3 py-2 text-xs font-semibold text-muted-foreground">Uppar %</th>
                      <th className="text-right px-3 py-2 text-xs font-semibold text-muted-foreground">Overall %</th>
                    </tr>
                  </thead>
                  <tbody>
                    {udiseComplianceReport.map((r) => (
                      <tr key={r.class} className="border-b border-border/50 hover:bg-muted/20">
                        <td className="px-3 py-2 text-sm font-medium text-foreground">{r.class}</td>
                        <td className="px-3 py-2 text-sm text-right text-foreground">{r.total}</td>
                        <td className="px-3 py-2 text-sm text-right text-foreground">{r.bspAssigned}</td>
                        <td className="px-3 py-2 text-sm text-right text-emerald-500 font-medium">{r.bspPct}%</td>
                        <td className="px-3 py-2 text-sm text-right text-foreground">{r.penAssigned}</td>
                        <td className="px-3 py-2 text-sm text-right text-amber-500 font-medium">{r.penPct}%</td>
                        <td className="px-3 py-2 text-sm text-right text-foreground">{r.upparAssigned}</td>
                        <td className="px-3 py-2 text-sm text-right text-red-500 font-medium">{r.upparPct}%</td>
                        <td className="px-3 py-2 text-sm text-right font-bold text-[#22D3EE]">{((r.bspPct + r.penPct + r.upparPct) / 3).toFixed(1)}%</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={udiseComplianceReport}>
                    <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'} />
                    <XAxis dataKey="class" tick={{ fontSize: 9 }} stroke={darkMode ? '#64748b' : '#94a3b8'} />
                    <YAxis tick={{ fontSize: 10 }} stroke={darkMode ? '#64748b' : '#94a3b8'} domain={[0, 100]} tickFormatter={(v) => `${v}%`} />
                    <Tooltip contentStyle={tooltipStyle(darkMode)} formatter={(v) => [`${v}%`, '']} />
                    <Legend iconType="circle" wrapperStyle={{ fontSize: '11px' }} />
                    <Bar dataKey="bspPct" fill="#0A1628" radius={[3,3,0,0]} name="BSP ID %" />
                    <Bar dataKey="penPct" fill="#C8A45C" radius={[3,3,0,0]} name="PEN No %" />
                    <Bar dataKey="upparPct" fill="#22D3EE" radius={[3,3,0,0]} name="Uppar ID %" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </motion.div>
          )}

          {/* ─── 8. Admission Report ───────────────────────────── */}
          {activeReport === 'admission' && (
            <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-5">
              <h3 className="text-base font-semibold mb-4 flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-purple-500" /> Admission Report
              </h3>
              <div className="overflow-x-auto mb-4">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border bg-muted/30">
                      <th className="text-left px-4 py-2 text-xs font-semibold text-muted-foreground">Month</th>
                      <th className="text-right px-4 py-2 text-xs font-semibold text-muted-foreground">Applications</th>
                      <th className="text-right px-4 py-2 text-xs font-semibold text-muted-foreground">Admitted</th>
                      <th className="text-right px-4 py-2 text-xs font-semibold text-muted-foreground">Conversion %</th>
                    </tr>
                  </thead>
                  <tbody>
                    {admissionReportData.map((r) => (
                      <tr key={r.month} className="border-b border-border/50 hover:bg-muted/20">
                        <td className="px-4 py-2 text-sm font-medium text-foreground">{r.month}</td>
                        <td className="px-4 py-2 text-sm text-right text-foreground">{r.applications}</td>
                        <td className="px-4 py-2 text-sm text-right text-emerald-500 font-medium">{r.admitted}</td>
                        <td className="px-4 py-2 text-sm text-right text-[#C8A45C] font-medium">{((r.admitted / r.applications) * 100).toFixed(1)}%</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={admissionReportData}>
                    <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'} />
                    <XAxis dataKey="month" tick={{ fontSize: 10 }} stroke={darkMode ? '#64748b' : '#94a3b8'} />
                    <YAxis tick={{ fontSize: 10 }} stroke={darkMode ? '#64748b' : '#94a3b8'} />
                    <Tooltip contentStyle={tooltipStyle(darkMode)} />
                    <Legend iconType="circle" wrapperStyle={{ fontSize: '11px' }} />
                    <Bar dataKey="applications" fill="#0A1628" radius={[3,3,0,0]} name="Applications" />
                    <Bar dataKey="admitted" fill="#C8A45C" radius={[3,3,0,0]} name="Admitted" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </motion.div>
          )}

          {/* ─── 9. Transport Report ───────────────────────────── */}
          {activeReport === 'transport' && (
            <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-5">
              <h3 className="text-base font-semibold mb-4 flex items-center gap-2">
                <Bus className="w-4 h-4 text-amber-500" /> Transport Report
              </h3>
              <div className="overflow-x-auto mb-4">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border bg-muted/30">
                      <th className="text-left px-4 py-2 text-xs font-semibold text-muted-foreground">Route</th>
                      <th className="text-right px-4 py-2 text-xs font-semibold text-muted-foreground">Students</th>
                      <th className="text-right px-4 py-2 text-xs font-semibold text-muted-foreground">Capacity</th>
                      <th className="text-right px-4 py-2 text-xs font-semibold text-muted-foreground">Utilization %</th>
                    </tr>
                  </thead>
                  <tbody>
                    {transportReportData.map((r) => (
                      <tr key={r.route} className="border-b border-border/50 hover:bg-muted/20">
                        <td className="px-4 py-2 text-sm font-medium text-foreground">{r.route}</td>
                        <td className="px-4 py-2 text-sm text-right text-foreground">{r.students}</td>
                        <td className="px-4 py-2 text-sm text-right text-muted-foreground">{r.capacity}</td>
                        <td className="px-4 py-2 text-sm text-right">
                          <span className={`font-medium ${r.utilization >= 90 ? 'text-red-500' : r.utilization >= 85 ? 'text-amber-500' : 'text-emerald-500'}`}>{r.utilization}%</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={transportReportData}>
                    <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'} />
                    <XAxis dataKey="route" tick={{ fontSize: 8 }} stroke={darkMode ? '#64748b' : '#94a3b8'} />
                    <YAxis tick={{ fontSize: 10 }} stroke={darkMode ? '#64748b' : '#94a3b8'} />
                    <Tooltip contentStyle={tooltipStyle(darkMode)} />
                    <Legend iconType="circle" wrapperStyle={{ fontSize: '11px' }} />
                    <Bar dataKey="students" fill="#0A1628" radius={[3,3,0,0]} name="Students" />
                    <Bar dataKey="capacity" fill="#C8A45C" radius={[3,3,0,0]} name="Capacity" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </motion.div>
          )}

          {/* ─── 10. CBSE Board Exam Report ────────────────────── */}
          {activeReport === 'cbseBoard' && (
            <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-5">
              <h3 className="text-base font-semibold mb-4 flex items-center gap-2">
                <FileText className="w-4 h-4 text-red-500" /> CBSE Board Exam Report
              </h3>
              <div className="overflow-x-auto mb-4">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border bg-muted/30">
                      <th className="text-left px-4 py-2 text-xs font-semibold text-muted-foreground">Subject</th>
                      <th className="text-right px-4 py-2 text-xs font-semibold text-muted-foreground">Appeared</th>
                      <th className="text-right px-4 py-2 text-xs font-semibold text-muted-foreground">Passed</th>
                      <th className="text-right px-4 py-2 text-xs font-semibold text-muted-foreground">Distinction</th>
                      <th className="text-right px-4 py-2 text-xs font-semibold text-muted-foreground">Avg Score</th>
                      <th className="text-right px-4 py-2 text-xs font-semibold text-muted-foreground">Pass Rate</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cbseBoardExamData.map((r) => (
                      <tr key={r.subject} className="border-b border-border/50 hover:bg-muted/20">
                        <td className="px-4 py-2 text-sm font-medium text-foreground">{r.subject}</td>
                        <td className="px-4 py-2 text-sm text-right text-foreground">{r.appeared}</td>
                        <td className="px-4 py-2 text-sm text-right text-emerald-500 font-medium">{r.passed}</td>
                        <td className="px-4 py-2 text-sm text-right text-[#C8A45C] font-medium">{r.distinction}</td>
                        <td className="px-4 py-2 text-sm text-right text-foreground">{r.avgScore}</td>
                        <td className="px-4 py-2 text-sm text-right font-bold text-[#22D3EE]">{r.passRate}%</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={cbseBoardExamData}>
                    <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'} />
                    <XAxis dataKey="subject" tick={{ fontSize: 10 }} stroke={darkMode ? '#64748b' : '#94a3b8'} />
                    <YAxis tick={{ fontSize: 10 }} stroke={darkMode ? '#64748b' : '#94a3b8'} />
                    <Tooltip contentStyle={tooltipStyle(darkMode)} />
                    <Legend iconType="circle" wrapperStyle={{ fontSize: '11px' }} />
                    <Bar dataKey="appeared" fill="#0A1628" radius={[3,3,0,0]} name="Appeared" />
                    <Bar dataKey="passed" fill="#10B981" radius={[3,3,0,0]} name="Passed" />
                    <Bar dataKey="distinction" fill="#C8A45C" radius={[3,3,0,0]} name="Distinction" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </motion.div>
          )}

          {!activeReport && (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="w-16 h-16 rounded-2xl gradient-birla flex items-center justify-center mb-4">
                <BarChart3 className="w-8 h-8 text-[#22D3EE]" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-1">Select a Report</h3>
              <p className="text-sm text-muted-foreground">Choose a report from the buttons above to view data and charts.</p>
            </div>
          )}
        </motion.div>
      )}
    </motion.div>
  )
}
