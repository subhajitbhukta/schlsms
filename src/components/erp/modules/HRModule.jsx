'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Users, Briefcase, Clock, Calendar, IndianRupee, CheckCircle2,
  AlertTriangle, XCircle, TrendingUp, ArrowUpRight, Download,
  Printer, Eye, Plus, Search, Filter, Award, Star, Shield,
  Building2, FileText, ChevronRight, ChevronLeft, Send,
  Phone, Mail, MapPin, HeartPulse, UserCheck, ClipboardList,
  BarChart3, Target, MessageSquare, Upload, Settings, Zap,
  GraduationCap, BookOpen, Home, Globe, BadgeCheck, IdCard,
  Timer, UserPlus, Activity, PieChart as PieChartIcon
} from 'lucide-react'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Legend, PieChart, Pie, Cell, AreaChart, Area
} from 'recharts'
import useAppStore from '@/store/useAppStore'

// ─── Data ────────────────────────────────────────────────────────
const topStats = [
  { label: 'Total Staff', value: '186', change: '+4 this year', icon: Users, gradient: 'from-blue-900 to-blue-700', glow: 'shadow-blue-800/20' },
  { label: 'On Leave', value: '8', change: '3 pending approval', icon: Clock, gradient: 'from-amber-900 to-amber-600', glow: 'shadow-amber-800/20' },
  { label: 'Open Positions', value: '5', change: '2 urgent hires', icon: UserPlus, gradient: 'from-purple-900 to-purple-600', glow: 'shadow-purple-800/20' },
  { label: 'Payroll', value: '₹1.24Cr', change: 'Monthly', icon: IndianRupee, gradient: 'from-emerald-900 to-emerald-600', glow: 'shadow-emerald-800/20' },
]

const staffList = [
  { id: 'STF-001', name: 'Dr. Priya Menon', department: 'Mathematics', designation: 'HOD - Mathematics', type: 'Teaching', joined: 'Jul 2018', salary: '₹85,000', status: 'Active', phone: '+91 98765 12345', email: 'priya.menon@bom.edu.in', attendance: 97 },
  { id: 'STF-002', name: 'Mr. Rajesh Kumar', department: 'Physics', designation: 'Senior Teacher', type: 'Teaching', joined: 'Aug 2019', salary: '₹72,000', status: 'Active', phone: '+91 87654 23456', email: 'rajesh.kumar@bom.edu.in', attendance: 94 },
  { id: 'STF-003', name: 'Ms. Ananya Das', department: 'English', designation: 'Teacher', type: 'Teaching', joined: 'Jun 2020', salary: '₹58,000', status: 'On Leave', phone: '+91 76543 34567', email: 'ananya.das@bom.edu.in', attendance: 91 },
  { id: 'STF-004', name: 'Dr. Suresh Nair', department: 'Chemistry', designation: 'HOD - Science', type: 'Teaching', joined: 'Jan 2017', salary: '₹92,000', status: 'Active', phone: '+91 65432 45678', email: 'suresh.nair@bom.edu.in', attendance: 98 },
  { id: 'STF-005', name: 'Ms. Kavitha Reddy', department: 'Biology', designation: 'Teacher', type: 'Teaching', joined: 'Mar 2021', salary: '₹55,000', status: 'Active', phone: '+91 54321 56789', email: 'kavitha.reddy@bom.edu.in', attendance: 95 },
  { id: 'STF-006', name: 'Mr. Vikram Singh', department: 'Sports', designation: 'Sports Coordinator', type: 'Non-Teaching', joined: 'Sep 2019', salary: '₹48,000', status: 'Active', phone: '+91 43210 67890', email: 'vikram.singh@bom.edu.in', attendance: 96 },
  { id: 'STF-007', name: 'Mrs. Sunita Sharma', department: 'Administration', designation: 'Office Manager', type: 'Admin', joined: 'Apr 2016', salary: '₹62,000', status: 'Active', phone: '+91 32109 78901', email: 'sunita.sharma@bom.edu.in', attendance: 99 },
  { id: 'STF-008', name: 'Mr. Arjun Mehta', department: 'Computer Science', designation: 'Lab Administrator', type: 'Non-Teaching', joined: 'Nov 2022', salary: '₹42,000', status: 'Active', phone: '+91 21098 89012', email: 'arjun.mehta@bom.edu.in', attendance: 93 },
  { id: 'STF-009', name: 'Dr. Meera Krishnan', department: 'Hindi', designation: 'Senior Teacher', type: 'Teaching', joined: 'Jul 2020', salary: '₹60,000', status: 'Active', phone: '+91 10987 90123', email: 'meera.krishnan@bom.edu.in', attendance: 96 },
  { id: 'STF-010', name: 'Mr. Sanjay Gupta', department: 'Transport', designation: 'Transport Manager', type: 'Admin', joined: 'Feb 2018', salary: '₹45,000', status: 'Active', phone: '+91 09876 01234', email: 'sanjay.gupta@bom.edu.in', attendance: 94 },
]

const payrollByDepartment = [
  { department: 'Mathematics', staff: 12, total: 840000, avg: 70000 },
  { department: 'Science', staff: 18, total: 1380000, avg: 76667 },
  { department: 'English', staff: 14, total: 896000, avg: 64000 },
  { department: 'Hindi', staff: 8, total: 480000, avg: 60000 },
  { department: 'Social Science', staff: 10, total: 580000, avg: 58000 },
  { department: 'Computer Sc.', staff: 6, total: 360000, avg: 60000 },
  { department: 'Sports', staff: 5, total: 240000, avg: 48000 },
  { department: 'Administration', staff: 14, total: 840000, avg: 60000 },
  { department: 'Support', staff: 8, total: 280000, avg: 35000 },
  { department: 'Transport', staff: 12, total: 540000, avg: 45000 },
]

const leaveBalances = [
  { type: 'CL', label: 'Casual Leave', total: 12, used: 4, balance: 8, color: '#22D3EE' },
  { type: 'EL', label: 'Earned Leave', total: 15, used: 6, balance: 9, color: '#10B981' },
  { type: 'ML', label: 'Medical Leave', total: 10, used: 2, balance: 8, color: '#8B5CF6' },
  { type: 'SL', label: 'Special Leave', total: 5, used: 0, balance: 5, color: '#F59E0B' },
  { type: 'CLP', label: 'Comp. Leave', total: 3, used: 1, balance: 2, color: '#EF4444' },
]

const leaveRequests = [
  { id: 1, staff: 'Ms. Ananya Das', department: 'English', type: 'ML', from: 'Mar 1, 2026', to: 'Mar 5, 2026', days: 5, reason: 'Medical procedure', status: 'approved', approvedBy: 'Principal' },
  { id: 2, staff: 'Mr. Rajesh Kumar', department: 'Physics', type: 'EL', from: 'Mar 10, 2026', to: 'Mar 14, 2026', days: 5, reason: 'Family function', status: 'pending', approvedBy: '-' },
  { id: 3, staff: 'Mrs. Sunita Sharma', department: 'Admin', type: 'CL', from: 'Mar 8, 2026', to: 'Mar 8, 2026', days: 1, reason: 'Personal work', status: 'pending', approvedBy: '-' },
  { id: 4, staff: 'Mr. Vikram Singh', department: 'Sports', type: 'CL', from: 'Mar 12, 2026', to: 'Mar 13, 2026', days: 2, reason: 'Attending sports workshop', status: 'pending', approvedBy: '-' },
  { id: 5, staff: 'Dr. Meera Krishnan', department: 'Hindi', type: 'EL', from: 'Mar 20, 2026', to: 'Mar 25, 2026', days: 6, reason: 'Pilgrimage', status: 'approved', approvedBy: 'Vice Principal' },
  { id: 6, staff: 'Mr. Sanjay Gupta', department: 'Transport', type: 'SL', from: 'Mar 15, 2026', to: 'Mar 15, 2026', days: 1, reason: 'Vehicle registration work', status: 'rejected', approvedBy: 'Admin Head' },
]

const leaveCalendarData = [
  { day: 'Mon 3', present: 178, absent: 8, onLeave: 5, late: 4 },
  { day: 'Tue 4', present: 180, absent: 6, onLeave: 5, late: 3 },
  { day: 'Wed 5', present: 176, absent: 7, onLeave: 6, late: 5 },
  { day: 'Thu 6', present: 182, absent: 4, onLeave: 5, late: 2 },
  { day: 'Fri 7', present: 174, absent: 9, onLeave: 7, late: 6 },
  { day: 'Mon 10', present: 179, absent: 7, onLeave: 6, late: 3 },
  { day: 'Tue 11', present: 181, absent: 5, onLeave: 5, late: 4 },
]

const jobPostings = [
  { id: 'JOB-001', title: 'TGT Mathematics', department: 'Mathematics', vacancies: 1, applications: 34, shortlisted: 8, interviews: 3, status: 'Interviewing', posted: 'Feb 1, 2026', deadline: 'Mar 15, 2026' },
  { id: 'JOB-002', title: 'PGT Physics', department: 'Physics', vacancies: 1, applications: 28, shortlisted: 6, interviews: 2, status: 'Interviewing', posted: 'Feb 5, 2026', deadline: 'Mar 20, 2026' },
  { id: 'JOB-003', title: 'Lab Assistant - Chemistry', department: 'Science', vacancies: 1, applications: 45, shortlisted: 10, interviews: 0, status: 'Shortlisting', posted: 'Feb 15, 2026', deadline: 'Mar 25, 2026' },
  { id: 'JOB-004', title: 'School Counselor', department: 'Student Welfare', vacancies: 1, applications: 22, shortlisted: 5, interviews: 5, status: 'Offer Pending', posted: 'Jan 20, 2026', deadline: 'Feb 28, 2026' },
  { id: 'JOB-005', title: 'Accountant', department: 'Finance', vacancies: 1, applications: 38, shortlisted: 0, interviews: 0, status: 'Open', posted: 'Mar 1, 2026', deadline: 'Apr 10, 2026' },
]

const applicantPipeline = [
  { stage: 'Applied', count: 167, color: '#94a3b8' },
  { stage: 'Screened', count: 89, color: '#22D3EE' },
  { stage: 'Shortlisted', count: 29, color: '#C8A45C' },
  { stage: 'Interviewed', count: 10, color: '#8B5CF6' },
  { stage: 'Offered', count: 2, color: '#10B981' },
  { stage: 'Joined', count: 1, color: '#0A1628' },
]

const interviewSchedule = [
  { id: 1, candidate: 'Dr. Ramesh Iyer', position: 'PGT Physics', date: 'Mar 8, 2026', time: '10:00 AM', panel: 'Dr. Suresh Nair, Principal', round: 'Subject Expert', mode: 'In-Person' },
  { id: 2, candidate: 'Ms. Pooja Agarwal', position: 'TGT Mathematics', date: 'Mar 8, 2026', time: '11:30 AM', panel: 'Dr. Priya Menon, VP', round: 'Demo Class', mode: 'In-Person' },
  { id: 3, candidate: 'Mr. Ankit Verma', position: 'TGT Mathematics', date: 'Mar 9, 2026', time: '10:00 AM', panel: 'Dr. Priya Menon, VP', round: 'Demo Class', mode: 'In-Person' },
  { id: 4, candidate: 'Ms. Shreya Banerjee', position: 'Lab Assistant', date: 'Mar 10, 2026', time: '2:00 PM', panel: 'Dr. Suresh Nair, HOD', round: 'Technical', mode: 'Online' },
]

const performanceData = [
  { rating: 'Outstanding (5)', count: 18, percent: 10, color: '#0A1628' },
  { rating: 'Excellent (4)', count: 52, percent: 28, color: '#22D3EE' },
  { rating: 'Good (3)', count: 74, percent: 40, color: '#C8A45C' },
  { rating: 'Average (2)', count: 32, percent: 17, color: '#8B5CF6' },
  { rating: 'Below Avg (1)', count: 10, percent: 5, color: '#EF4444' },
]

const reviewCycles = [
  { id: 1, name: 'Annual Review 2025-26', period: 'Apr 2025 - Mar 2026', status: 'In Progress', completion: 68, dueDate: 'Mar 31, 2026', reviewsCompleted: '126/186' },
  { id: 2, name: 'Mid-Year Review 2025-26', period: 'Apr 2025 - Sep 2025', status: 'Completed', completion: 100, dueDate: 'Oct 31, 2025', reviewsCompleted: '186/186' },
  { id: 3, name: 'Annual Review 2024-25', period: 'Apr 2024 - Mar 2025', status: 'Completed', completion: 100, dueDate: 'Mar 31, 2025', reviewsCompleted: '178/178' },
]

const staffDocuments = [
  { category: 'Identity & Address', items: [
    { name: 'Aadhaar Card', required: true, verified: true, expiry: 'N/A' },
    { name: 'PAN Card', required: true, verified: true, expiry: 'N/A' },
    { name: 'Voter ID', required: false, verified: true, expiry: 'N/A' },
    { name: 'Passport', required: false, verified: false, expiry: 'N/A' },
  ]},
  { category: 'Academic & Professional', items: [
    { name: 'Degree Certificates', required: true, verified: true, expiry: 'N/A' },
    { name: 'B.Ed / D.El.Ed Certificate', required: true, verified: true, expiry: 'N/A' },
    { name: 'CTET / TET Certificate', required: true, verified: true, expiry: 'Mar 2028' },
    { name: 'Experience Letters', required: true, verified: true, expiry: 'N/A' },
  ]},
  { category: 'Employment', items: [
    { name: 'Offer Letter (Signed)', required: true, verified: true, expiry: 'N/A' },
    { name: 'Employment Agreement', required: true, verified: true, expiry: 'Mar 2027' },
    { name: 'NOC from Previous Employer', required: true, verified: true, expiry: 'N/A' },
    { name: 'PF Account Details', required: true, verified: true, expiry: 'N/A' },
  ]},
  { category: 'Health & Safety', items: [
    { name: 'Medical Fitness Certificate', required: true, verified: true, expiry: 'Sep 2026' },
    { name: 'COVID Vaccination Certificate', required: false, verified: true, expiry: 'N/A' },
    { name: 'Police Verification', required: true, verified: true, expiry: 'Mar 2028' },
  ]},
]

const onboardingSteps = [
  { step: 1, label: 'Offer Letter', status: 'completed', icon: FileText },
  { step: 2, label: 'Document Collection', status: 'completed', icon: Upload },
  { step: 3, label: 'Background Verification', status: 'completed', icon: Shield },
  { step: 4, label: 'System Access Setup', status: 'current', icon: IdCard },
  { step: 5, label: 'Orientation Program', status: 'upcoming', icon: BookOpen },
  { step: 6, label: 'Class Allocation', status: 'upcoming', icon: GraduationCap },
  { step: 7, label: 'Mentor Assignment', status: 'upcoming', icon: Users },
  { step: 8, label: 'Onboarding Complete', status: 'upcoming', icon: CheckCircle2 },
]

const attendanceGrid = [
  { name: 'Dr. Priya Menon', dept: 'Math', days: { Mon: 'P', Tue: 'P', Wed: 'P', Thu: 'P', Fri: 'P' }, summary: '5/5' },
  { name: 'Mr. Rajesh Kumar', dept: 'Physics', days: { Mon: 'P', Tue: 'P', Wed: 'L', Thu: 'P', Fri: 'P' }, summary: '4/5' },
  { name: 'Ms. Ananya Das', dept: 'English', days: { Mon: 'L', Tue: 'L', Wed: 'L', Thu: 'L', Fri: 'L' }, summary: '0/5' },
  { name: 'Dr. Suresh Nair', dept: 'Chemistry', days: { Mon: 'P', Tue: 'P', Wed: 'P', Thu: 'P', Fri: 'P' }, summary: '5/5' },
  { name: 'Ms. Kavitha Reddy', dept: 'Biology', days: { Mon: 'P', Tue: 'P', Wed: 'P', Thu: 'A', Fri: 'P' }, summary: '4/5' },
  { name: 'Mr. Vikram Singh', dept: 'Sports', days: { Mon: 'P', Tue: 'P', Wed: 'P', Thu: 'P', Fri: 'L' }, summary: '4/5' },
  { name: 'Mrs. Sunita Sharma', dept: 'Admin', days: { Mon: 'P', Tue: 'P', Wed: 'P', Thu: 'P', Fri: 'P' }, summary: '5/5' },
  { name: 'Mr. Arjun Mehta', dept: 'Comp Sc.', days: { Mon: 'P', Tue: 'P', Wed: 'P', Thu: 'P', Fri: 'P' }, summary: '5/5' },
  { name: 'Dr. Meera Krishnan', dept: 'Hindi', days: { Mon: 'P', Tue: 'P', Wed: 'P', Thu: 'P', Fri: 'P' }, summary: '5/5' },
  { name: 'Mr. Sanjay Gupta', dept: 'Transport', days: { Mon: 'L', Tue: 'P', Wed: 'P', Thu: 'P', Fri: 'P' }, summary: '4/5' },
]

const feedbackData = [
  { id: 1, reviewer: 'Principal', reviewee: 'Dr. Priya Menon', type: 'Annual', rating: 4.5, feedback: 'Exemplary leadership in Mathematics department. Innovative teaching methods have improved student outcomes by 15%.', status: 'Completed' },
  { id: 2, reviewer: 'Vice Principal', reviewee: 'Mr. Rajesh Kumar', type: 'Annual', rating: 4.0, feedback: 'Strong subject knowledge and good classroom management. Needs to improve on assignment turnaround time.', status: 'Completed' },
  { id: 3, reviewer: 'HOD Science', reviewee: 'Ms. Kavitha Reddy', type: 'Annual', rating: 3.5, feedback: 'Good engagement with students. Should focus more on practical demonstrations and lab integration.', status: 'In Review' },
  { id: 4, reviewer: 'Admin Head', reviewee: 'Mr. Sanjay Gupta', type: 'Mid-Year', rating: 3.8, feedback: 'Efficient transport management. Route optimization has saved costs. Needs to improve parent communication.', status: 'Completed' },
]

const payslipPreview = {
  employee: 'Dr. Priya Menon',
  empId: 'STF-001',
  designation: 'HOD - Mathematics',
  department: 'Mathematics',
  bank: 'SBI A/C XXXX4523',
  pfNo: 'PF/WB/123456',
  month: 'March 2026',
  earnings: [
    { component: 'Basic Salary', amount: '₹42,500' },
    { component: 'HRA', amount: '₹17,000' },
    { component: 'Special Allowance', amount: '₹12,500' },
    { component: 'Transport Allowance', amount: '₹3,200' },
    { component: 'Medical Allowance', amount: '₹2,500' },
    { component: 'HOD Allowance', amount: '₹5,000' },
    { component: 'DA', amount: '₹2,300' },
  ],
  deductions: [
    { component: 'PF (Employee)', amount: '₹5,100' },
    { component: 'Professional Tax', amount: '₹200' },
    { component: 'TDS', amount: '₹8,400' },
    { component: 'Group Insurance', amount: '₹1,200' },
  ],
  grossEarnings: '₹85,000',
  totalDeductions: '₹14,900',
  netPay: '₹70,100',
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

export default function HRModule() {
  const { darkMode } = useAppStore()
  const [activeTab, setActiveTab] = useState('overview')
  const [searchQuery, setSearchQuery] = useState('')

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'payroll', label: 'Payroll', icon: IndianRupee },
    { id: 'leave', label: 'Leave', icon: Calendar },
    { id: 'recruitment', label: 'Recruitment', icon: UserPlus },
    { id: 'performance', label: 'Performance', icon: Target },
  ]

  const tooltipStyle = {
    backgroundColor: darkMode ? '#1A2D4A' : '#fff',
    border: `1px solid ${darkMode ? 'rgba(255,255,255,0.1)' : '#e2e8f0'}`,
    borderRadius: '12px',
    fontSize: '12px',
    color: darkMode ? '#e2e8f0' : '#1e293b',
  }

  const filteredStaff = staffList.filter((s) => {
    const q = searchQuery.toLowerCase()
    return s.name.toLowerCase().includes(q) || s.department.toLowerCase().includes(q) || s.id.toLowerCase().includes(q)
  })

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="p-4 lg:p-6 space-y-6 max-w-[1600px] mx-auto"
    >
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

      {/* ─── Overview Tab ─────────────────────────────────── */}
      {activeTab === 'overview' && (
        <motion.div variants={itemVariants} className="space-y-6">
          {/* Top Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {topStats.map((card) => {
              const Icon = card.icon
              return (
                <motion.div
                  key={card.label}
                  variants={itemVariants}
                  className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${card.gradient} p-5 text-white shadow-xl ${card.glow}`}
                >
                  <div className="absolute top-0 right-0 w-24 h-24 rounded-full bg-white/5 -translate-y-6 translate-x-6" />
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-3">
                      <div className="w-10 h-10 rounded-xl bg-white/15 backdrop-blur-sm flex items-center justify-center">
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="inline-flex items-center gap-0.5 text-xs font-medium px-2 py-0.5 rounded-full bg-white/10 text-white/80">
                        <ArrowUpRight className="w-3 h-3" />
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

          {/* Staff Onboarding + Quick Attendance */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Staff Onboarding */}
            <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-semibold text-foreground flex items-center gap-2">
                  <UserPlus className="w-4 h-4 text-purple-500" />
                  Staff Onboarding
                </h3>
                <span className="text-xs px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 font-medium">
                  New Hire: Ms. Pooja Agarwal
                </span>
              </div>
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm text-foreground">Progress: <span className="font-semibold text-birla-cyan">Step 4 of 8</span></p>
                  <span className="text-xs text-muted-foreground">37.5% Complete</span>
                </div>
                <div className="w-full h-2 rounded-full bg-muted overflow-hidden">
                  <div className="h-full rounded-full gradient-birla-cyan" style={{ width: '37.5%' }} />
                </div>
              </div>
              <div className="relative">
                <div className="flex items-start justify-between relative">
                  {onboardingSteps.map((step, idx) => {
                    const Icon = step.icon
                    const isFirst = idx === 0
                    const isLast = idx === onboardingSteps.length - 1
                    return (
                      <div key={step.step} className="flex flex-col items-center text-center" style={{ width: `${100 / onboardingSteps.length}%` }}>
                        <div className={`w-9 h-9 rounded-full flex items-center justify-center mb-1.5 z-10 ${
                          step.status === 'completed' ? 'bg-emerald-500 text-white' :
                          step.status === 'current' ? 'bg-birla-gold text-white animate-pulse-glow' :
                          'bg-muted text-muted-foreground'
                        }`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <p className="text-[9px] font-medium text-foreground leading-tight">{step.label}</p>
                        <p className="text-[8px] text-muted-foreground mt-0.5 capitalize">{step.status}</p>
                      </div>
                    )
                  })}
                </div>
              </div>
              {/* New Hire Checklist */}
              <div className="mt-4 p-3 rounded-xl border border-border bg-muted/20">
                <h4 className="text-xs font-semibold text-foreground mb-2">New Hire Checklist</h4>
                <div className="space-y-1.5">
                  {[
                    { item: 'Offer letter signed & filed', done: true },
                    { item: 'Educational certificates verified', done: true },
                    { item: 'Background verification completed', done: true },
                    { item: 'Email & ERP access configured', done: false },
                    { item: 'ID card issued', done: false },
                    { item: 'Bank details collected for payroll', done: false },
                    { item: 'Orientation scheduled', done: false },
                    { item: 'Mentor assigned', done: false },
                  ].map((check, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs">
                      <div className={`w-4 h-4 rounded flex items-center justify-center flex-shrink-0 ${
                        check.done ? 'bg-emerald-500 text-white' : 'border border-border'
                      }`}>
                        {check.done && <CheckCircle2 className="w-3 h-3" />}
                      </div>
                      <span className={check.done ? 'text-muted-foreground line-through' : 'text-foreground'}>{check.item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Attendance Quick View */}
            <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-semibold text-foreground flex items-center gap-2">
                  <Activity className="w-4 h-4 text-emerald-500" />
                  Attendance - This Week
                </h3>
                <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-medium">
                  96.2% Avg
                </span>
              </div>
              <div className="h-52">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={leaveCalendarData}>
                    <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'} />
                    <XAxis dataKey="day" tick={{ fontSize: 9 }} stroke={darkMode ? '#64748b' : '#94a3b8'} />
                    <YAxis tick={{ fontSize: 9 }} stroke={darkMode ? '#64748b' : '#94a3b8'} domain={[0, 200]} />
                    <Tooltip contentStyle={tooltipStyle} />
                    <Legend iconType="circle" wrapperStyle={{ fontSize: '10px' }} />
                    <Area type="monotone" dataKey="present" stroke="#10B981" fill="rgba(16,185,129,0.08)" strokeWidth={2} name="Present" />
                    <Area type="monotone" dataKey="absent" stroke="#EF4444" fill="rgba(239,68,68,0.08)" strokeWidth={2} name="Absent" />
                    <Area type="monotone" dataKey="onLeave" stroke="#F59E0B" fill="rgba(245,158,11,0.08)" strokeWidth={2} name="On Leave" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              {/* Attendance Summary */}
              <div className="grid grid-cols-4 gap-2 mt-3">
                {[
                  { label: 'Present', value: 178, color: 'text-emerald-600 dark:text-emerald-400', bg: 'bg-emerald-500/10' },
                  { label: 'Absent', value: 6, color: 'text-red-600 dark:text-red-400', bg: 'bg-red-500/10' },
                  { label: 'On Leave', value: 5, color: 'text-amber-600 dark:text-amber-400', bg: 'bg-amber-500/10' },
                  { label: 'Late', value: 3, color: 'text-purple-600 dark:text-purple-400', bg: 'bg-purple-500/10' },
                ].map((s) => (
                  <div key={s.label} className={`p-2 rounded-lg ${s.bg} text-center`}>
                    <p className={`text-lg font-bold ${s.color}`}>{s.value}</p>
                    <p className="text-[9px] text-muted-foreground">{s.label}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Staff Directory Quick */}
          <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-semibold text-foreground flex items-center gap-2">
                <Users className="w-4 h-4 text-birla-cyan" />
                Staff Directory
                <span className="px-2 py-0.5 rounded-full bg-muted text-xs text-muted-foreground">{staffList.length} records</span>
              </h3>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search staff..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9 pr-3 py-1.5 rounded-lg border border-input bg-background text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-birla-gold/40 focus:border-birla-gold transition-all w-44"
                  />
                </div>
                <button className="flex items-center gap-1 px-3 py-1.5 rounded-lg gradient-birla text-white text-xs font-medium">
                  <Plus className="w-3 h-3" /> Add Staff
                </button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border bg-muted/30">
                    <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Staff ID</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Name</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Department</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Designation</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Type</th>
                    <th className="text-center px-4 py-3 text-xs font-semibold text-muted-foreground">Attendance</th>
                    <th className="text-center px-4 py-3 text-xs font-semibold text-muted-foreground">Status</th>
                    <th className="text-right px-4 py-3 text-xs font-semibold text-muted-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredStaff.map((staff) => (
                    <tr key={staff.id} className="border-b border-border/50 hover:bg-muted/20 transition-colors">
                      <td className="px-4 py-3 text-xs font-mono text-birla-cyan">{staff.id}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full gradient-birla-gold flex items-center justify-center text-xs font-bold text-birla-blue flex-shrink-0">
                            {staff.name.charAt(0)}
                          </div>
                          <div>
                            <p className="text-sm font-medium text-foreground">{staff.name}</p>
                            <p className="text-[10px] text-muted-foreground">{staff.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm text-foreground">{staff.department}</td>
                      <td className="px-4 py-3 text-xs text-foreground">{staff.designation}</td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${
                          staff.type === 'Teaching' ? 'bg-blue-500/10 text-blue-600 dark:text-blue-400' :
                          staff.type === 'Admin' ? 'bg-purple-500/10 text-purple-600 dark:text-purple-400' :
                          'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                        }`}>
                          {staff.type}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center justify-center gap-2">
                          <div className="w-12 h-1.5 rounded-full bg-muted overflow-hidden">
                            <div
                              className="h-full rounded-full"
                              style={{
                                width: `${staff.attendance}%`,
                                backgroundColor: staff.attendance >= 95 ? '#10B981' : staff.attendance >= 85 ? '#F59E0B' : '#EF4444',
                              }}
                            />
                          </div>
                          <span className="text-xs text-foreground">{staff.attendance}%</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${
                          staff.status === 'Active' ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' : 'bg-amber-500/10 text-amber-600 dark:text-amber-400'
                        }`}>
                          {staff.status}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center justify-end gap-1">
                          <button className="p-1.5 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors" title="View">
                            <Eye className="w-3.5 h-3.5" />
                          </button>
                          <button className="p-1.5 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors" title="Message">
                            <Mail className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>

          {/* Staff Document Management */}
          <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-semibold text-foreground flex items-center gap-2">
                <FileText className="w-4 h-4 text-birla-gold" />
                Staff Document Management
              </h3>
              <div className="flex items-center gap-2">
                <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-medium">
                  12/15 Verified
                </span>
                <button className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-border text-xs font-medium hover:bg-muted transition-colors">
                  <Upload className="w-3 h-3" /> Upload
                </button>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {staffDocuments.map((category) => (
                <div key={category.category} className="rounded-xl border border-border gradient-card-blue p-4">
                  <h4 className="text-xs font-semibold text-foreground mb-3 flex items-center gap-1.5">
                    <BadgeCheck className="w-3.5 h-3.5 text-birla-cyan" />
                    {category.category}
                  </h4>
                  <div className="space-y-2">
                    {category.items.map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between text-xs">
                        <span className={item.verified ? 'text-foreground' : 'text-amber-600 dark:text-amber-400'}>{item.name}</span>
                        <div className="flex items-center gap-1">
                          {item.expiry !== 'N/A' && (
                            <span className="text-[9px] text-muted-foreground">Exp: {item.expiry}</span>
                          )}
                          {item.verified ? (
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                          ) : (
                            <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* ─── Payroll Tab ──────────────────────────────────── */}
      {activeTab === 'payroll' && (
        <motion.div variants={itemVariants} className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-semibold text-foreground flex items-center gap-2">
              <IndianRupee className="w-5 h-5 text-birla-gold" />
              Payroll Dashboard - March 2026
            </h3>
            <div className="flex items-center gap-2">
              <select className="px-3 py-1.5 rounded-lg border border-input bg-background text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-birla-gold/40">
                <option>March 2026</option>
                <option>February 2026</option>
                <option>January 2026</option>
              </select>
              <button className="flex items-center gap-1 px-3 py-1.5 rounded-lg gradient-birla text-white text-xs font-medium">
                <Download className="w-3 h-3" /> Process Payroll
              </button>
            </div>
          </div>

          {/* Payroll Summary */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { label: 'Gross Payroll', value: '₹1.24Cr', icon: IndianRupee, color: 'text-emerald-500 bg-emerald-500/10' },
              { label: 'Total Deductions', value: '₹24.8L', icon: TrendingUp, color: 'text-red-500 bg-red-500/10' },
              { label: 'Net Disbursement', value: '₹99.2L', icon: CheckCircle2, color: 'text-blue-500 bg-blue-500/10' },
              { label: 'Staff Processed', value: '186/186', icon: Users, color: 'text-purple-500 bg-purple-500/10' },
            ].map((stat) => {
              const Icon = stat.icon
              return (
                <div key={stat.label} className="rounded-xl border border-border bg-card p-4 flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${stat.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-lg font-bold text-foreground">{stat.value}</p>
                    <p className="text-[10px] text-muted-foreground">{stat.label}</p>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Salary Breakdown Chart + Payslip Preview */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-5">
              <h4 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-birla-cyan" />
                Salary Distribution by Department
              </h4>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={payrollByDepartment} barGap={2}>
                    <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'} />
                    <XAxis dataKey="department" tick={{ fontSize: 8 }} stroke={darkMode ? '#64748b' : '#94a3b8'} angle={-30} textAnchor="end" height={60} />
                    <YAxis tick={{ fontSize: 9 }} stroke={darkMode ? '#64748b' : '#94a3b8'} tickFormatter={(v) => `₹${(v / 100000).toFixed(1)}L`} />
                    <Tooltip contentStyle={tooltipStyle} formatter={(value) => [`₹${(value / 100000).toFixed(1)}L`, '']} />
                    <Bar dataKey="total" fill="#0A1628" radius={[4, 4, 0, 0]} name="Total Payroll" />
                    <Bar dataKey="avg" fill="#22D3EE" radius={[4, 4, 0, 0]} name="Avg Salary" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </motion.div>

            {/* Payslip Preview */}
            <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-5">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-sm font-semibold text-foreground flex items-center gap-2">
                  <FileText className="w-4 h-4 text-birla-gold" />
                  Payslip Preview
                </h4>
                <div className="flex items-center gap-2">
                  <button className="flex items-center gap-1 px-2.5 py-1 rounded-lg border border-border text-[10px] font-medium hover:bg-muted transition-colors">
                    <Download className="w-3 h-3" /> PDF
                  </button>
                  <button className="flex items-center gap-1 px-2.5 py-1 rounded-lg border border-border text-[10px] font-medium hover:bg-muted transition-colors">
                    <Printer className="w-3 h-3" /> Print
                  </button>
                  <button className="flex items-center gap-1 px-2.5 py-1 rounded-lg border border-border text-[10px] font-medium hover:bg-muted transition-colors">
                    <Send className="w-3 h-3" /> Email
                  </button>
                </div>
              </div>

              <div className="border-2 border-dashed border-birla-gold/30 rounded-2xl p-4 gradient-card-blue">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h4 className="text-sm font-bold text-foreground">Birla Open Minds International School</h4>
                    <p className="text-[9px] text-muted-foreground">Pay Slip for the month of {payslipPreview.month}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[9px] font-mono text-birla-cyan">{payslipPreview.empId}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-x-4 gap-y-1 mb-3 text-[10px]">
                  <div><span className="text-muted-foreground">Name:</span> <span className="font-medium text-foreground">{payslipPreview.employee}</span></div>
                  <div><span className="text-muted-foreground">Designation:</span> <span className="font-medium text-foreground">{payslipPreview.designation}</span></div>
                  <div><span className="text-muted-foreground">Department:</span> <span className="font-medium text-foreground">{payslipPreview.department}</span></div>
                  <div><span className="text-muted-foreground">Bank:</span> <span className="font-medium text-foreground">{payslipPreview.bank}</span></div>
                  <div><span className="text-muted-foreground">PF No:</span> <span className="font-medium text-foreground">{payslipPreview.pfNo}</span></div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 mb-1.5">Earnings</p>
                    {payslipPreview.earnings.map((e, idx) => (
                      <div key={idx} className="flex justify-between text-[10px] py-0.5">
                        <span className="text-muted-foreground">{e.component}</span>
                        <span className="text-foreground">{e.amount}</span>
                      </div>
                    ))}
                    <div className="flex justify-between text-[10px] font-semibold pt-1 mt-1 border-t border-border">
                      <span className="text-foreground">Gross Earnings</span>
                      <span className="text-emerald-600 dark:text-emerald-400">{payslipPreview.grossEarnings}</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-[10px] font-semibold text-red-600 dark:text-red-400 mb-1.5">Deductions</p>
                    {payslipPreview.deductions.map((d, idx) => (
                      <div key={idx} className="flex justify-between text-[10px] py-0.5">
                        <span className="text-muted-foreground">{d.component}</span>
                        <span className="text-foreground">{d.amount}</span>
                      </div>
                    ))}
                    <div className="flex justify-between text-[10px] font-semibold pt-1 mt-1 border-t border-border">
                      <span className="text-foreground">Total Deductions</span>
                      <span className="text-red-600 dark:text-red-400">{payslipPreview.totalDeductions}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-3 pt-2 border-t-2 border-birla-gold/50 flex justify-between items-center">
                  <span className="text-xs font-bold text-foreground">Net Pay</span>
                  <span className="text-lg font-bold text-birla-gold">{payslipPreview.netPay}</span>
                </div>
              </div>

              {/* Bulk Payslip */}
              <div className="mt-3 p-3 rounded-xl border border-border bg-muted/20">
                <h4 className="text-xs font-semibold text-foreground mb-2">Bulk Payslip Generation</h4>
                <div className="flex items-center gap-2 flex-wrap">
                  <select className="px-2.5 py-1.5 rounded-lg border border-input bg-background text-[10px] text-foreground focus:outline-none focus:ring-1 focus:ring-birla-gold/40">
                    <option>All Staff</option>
                    <option>Teaching Staff Only</option>
                    <option>Non-Teaching Staff Only</option>
                    <option>Admin Staff Only</option>
                  </select>
                  <button className="flex items-center gap-1 px-3 py-1.5 rounded-lg gradient-birla text-white text-[10px] font-medium">
                    <Download className="w-3 h-3" /> Generate All
                  </button>
                  <button className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-border text-[10px] font-medium hover:bg-muted transition-colors">
                    <Send className="w-3 h-3" /> Email All
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}

      {/* ─── Leave Tab ────────────────────────────────────── */}
      {activeTab === 'leave' && (
        <motion.div variants={itemVariants} className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-semibold text-foreground flex items-center gap-2">
              <Calendar className="w-5 h-5 text-amber-500" />
              Leave Management
            </h3>
            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg gradient-birla text-white text-xs font-medium">
              <Plus className="w-3.5 h-3.5" /> Apply Leave
            </button>
          </div>

          {/* Leave Balance */}
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
            {leaveBalances.map((lb) => (
              <div key={lb.type} className="rounded-xl border border-border bg-card p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-medium" style={{ backgroundColor: `${lb.color}15`, color: lb.color }}>
                    {lb.type}
                  </span>
                  <span className="text-xs font-medium text-foreground">{lb.balance}/{lb.total}</span>
                </div>
                <p className="text-[10px] text-muted-foreground mb-2">{lb.label}</p>
                <div className="w-full h-2 rounded-full bg-muted overflow-hidden">
                  <div className="h-full rounded-full transition-all" style={{ width: `${(lb.used / lb.total) * 100}%`, backgroundColor: lb.color }} />
                </div>
                <div className="flex justify-between mt-1.5 text-[9px] text-muted-foreground">
                  <span>Used: {lb.used}</span>
                  <span>Balance: {lb.balance}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Leave Calendar + Pending Approvals */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Leave Calendar */}
            <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-5">
              <h4 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-blue-500" />
                Attendance & Leave Calendar - Week View
              </h4>
              <div className="h-56">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={leaveCalendarData} barGap={2}>
                    <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'} />
                    <XAxis dataKey="day" tick={{ fontSize: 9 }} stroke={darkMode ? '#64748b' : '#94a3b8'} />
                    <YAxis tick={{ fontSize: 9 }} stroke={darkMode ? '#64748b' : '#94a3b8'} />
                    <Tooltip contentStyle={tooltipStyle} />
                    <Legend iconType="circle" wrapperStyle={{ fontSize: '10px' }} />
                    <Bar dataKey="present" stackId="a" fill="#10B981" name="Present" />
                    <Bar dataKey="onLeave" stackId="a" fill="#F59E0B" name="On Leave" />
                    <Bar dataKey="absent" stackId="a" fill="#EF4444" name="Absent" />
                    <Bar dataKey="late" stackId="a" fill="#8B5CF6" name="Late" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </motion.div>

            {/* Pending Leave Approvals */}
            <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-5">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-sm font-semibold text-foreground flex items-center gap-2">
                  <ClipboardList className="w-4 h-4 text-amber-500" />
                  Pending Approvals
                </h4>
                <span className="text-xs px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 font-medium">
                  {leaveRequests.filter(l => l.status === 'pending').length} Pending
                </span>
              </div>
              <div className="space-y-3 max-h-72 overflow-y-auto">
                {leaveRequests.filter(l => l.status === 'pending').map((leave) => (
                  <div key={leave.id} className="p-3 rounded-xl border border-border gradient-card-blue hover:shadow-sm transition-all">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-amber-500/10 text-amber-600 dark:text-amber-400">
                        {leave.type} Leave
                      </span>
                      <span className="text-[10px] text-muted-foreground">{leave.days} day{leave.days > 1 ? 's' : ''}</span>
                    </div>
                    <p className="text-sm font-semibold text-foreground">{leave.staff}</p>
                    <p className="text-[11px] text-muted-foreground">{leave.department} &bull; {leave.from} - {leave.to}</p>
                    <p className="text-[10px] text-muted-foreground mt-1">Reason: {leave.reason}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <button className="px-3 py-1 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[10px] font-medium hover:bg-emerald-500/20 transition-colors">
                        <CheckCircle2 className="w-3 h-3 inline mr-1" />Approve
                      </button>
                      <button className="px-3 py-1 rounded-lg bg-red-500/10 text-red-600 dark:text-red-400 text-[10px] font-medium hover:bg-red-500/20 transition-colors">
                        <XCircle className="w-3 h-3 inline mr-1" />Reject
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Attendance Grid */}
          <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-5">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-sm font-semibold text-foreground flex items-center gap-2">
                <UserCheck className="w-4 h-4 text-emerald-500" />
                Staff Attendance Grid - This Week
              </h4>
              <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-medium">
                Week Mar 3-7
              </span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border bg-muted/30">
                    <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Staff</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Dept</th>
                    <th className="text-center px-4 py-3 text-xs font-semibold text-muted-foreground">Mon</th>
                    <th className="text-center px-4 py-3 text-xs font-semibold text-muted-foreground">Tue</th>
                    <th className="text-center px-4 py-3 text-xs font-semibold text-muted-foreground">Wed</th>
                    <th className="text-center px-4 py-3 text-xs font-semibold text-muted-foreground">Thu</th>
                    <th className="text-center px-4 py-3 text-xs font-semibold text-muted-foreground">Fri</th>
                    <th className="text-center px-4 py-3 text-xs font-semibold text-muted-foreground">Summary</th>
                  </tr>
                </thead>
                <tbody>
                  {attendanceGrid.map((row, idx) => (
                    <tr key={idx} className="border-b border-border/50 hover:bg-muted/20 transition-colors">
                      <td className="px-4 py-2.5 text-sm font-medium text-foreground">{row.name}</td>
                      <td className="px-4 py-2.5 text-xs text-muted-foreground">{row.dept}</td>
                      {['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].map((day) => (
                        <td key={day} className="px-4 py-2.5 text-center">
                          <span className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-[10px] font-bold ${
                            row.days[day] === 'P' ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' :
                            row.days[day] === 'L' ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400' :
                            'bg-red-500/10 text-red-600 dark:text-red-400'
                          }`}>
                            {row.days[day]}
                          </span>
                        </td>
                      ))}
                      <td className="px-4 py-2.5 text-center">
                        <span className={`text-xs font-semibold ${
                          row.summary === '5/5' ? 'text-emerald-600 dark:text-emerald-400' :
                          parseInt(row.summary) >= 4 ? 'text-amber-600 dark:text-amber-400' :
                          'text-red-600 dark:text-red-400'
                        }`}>
                          {row.summary}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex items-center gap-4 mt-3 text-[10px] text-muted-foreground">
              <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-emerald-500/10 border border-emerald-500/30" /> P = Present</span>
              <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-amber-500/10 border border-amber-500/30" /> L = Leave</span>
              <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-red-500/10 border border-red-500/30" /> A = Absent</span>
            </div>
          </motion.div>

          {/* All Leave Requests */}
          <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card overflow-hidden">
            <div className="p-4 border-b border-border bg-muted/30">
              <h4 className="text-sm font-semibold text-foreground flex items-center gap-2">
                <Clock className="w-4 h-4 text-purple-500" />
                All Leave Requests
              </h4>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border bg-muted/20">
                    <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Staff</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Dept</th>
                    <th className="text-center px-4 py-3 text-xs font-semibold text-muted-foreground">Type</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Duration</th>
                    <th className="text-center px-4 py-3 text-xs font-semibold text-muted-foreground">Days</th>
                    <th className="text-center px-4 py-3 text-xs font-semibold text-muted-foreground">Status</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Approved By</th>
                  </tr>
                </thead>
                <tbody>
                  {leaveRequests.map((leave) => (
                    <tr key={leave.id} className="border-b border-border/50 hover:bg-muted/20 transition-colors">
                      <td className="px-4 py-3 text-sm font-medium text-foreground">{leave.staff}</td>
                      <td className="px-4 py-3 text-xs text-muted-foreground">{leave.department}</td>
                      <td className="px-4 py-3 text-center">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-blue-500/10 text-blue-600 dark:text-blue-400">
                          {leave.type}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-xs text-foreground">{leave.from} - {leave.to}</td>
                      <td className="px-4 py-3 text-center text-xs text-foreground">{leave.days}</td>
                      <td className="px-4 py-3 text-center">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${
                          leave.status === 'approved' ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' :
                          leave.status === 'pending' ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400' :
                          'bg-red-500/10 text-red-600 dark:text-red-400'
                        }`}>
                          {leave.status.charAt(0).toUpperCase() + leave.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-xs text-muted-foreground">{leave.approvedBy}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* ─── Recruitment Tab ───────────────────────────────── */}
      {activeTab === 'recruitment' && (
        <motion.div variants={itemVariants} className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-semibold text-foreground flex items-center gap-2">
              <UserPlus className="w-5 h-5 text-purple-500" />
              Recruitment Workflow
            </h3>
            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg gradient-birla text-white text-xs font-medium">
              <Plus className="w-3.5 h-3.5" /> New Job Posting
            </button>
          </div>

          {/* Applicant Pipeline */}
          <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-5">
            <h4 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
              <Target className="w-4 h-4 text-birla-cyan" />
              Applicant Pipeline
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              {applicantPipeline.map((stage) => (
                <div key={stage.stage} className="rounded-xl border border-border gradient-card-blue p-4 text-center">
                  <div className="w-10 h-10 rounded-full mx-auto mb-2 flex items-center justify-center text-white text-sm font-bold" style={{ backgroundColor: stage.color }}>
                    {stage.count}
                  </div>
                  <p className="text-xs font-semibold text-foreground">{stage.stage}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Job Postings */}
          <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card overflow-hidden">
            <div className="p-4 border-b border-border bg-muted/30">
              <h4 className="text-sm font-semibold text-foreground flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-birla-gold" />
                Active Job Postings
              </h4>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border bg-muted/20">
                    <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Job ID</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Position</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Department</th>
                    <th className="text-center px-4 py-3 text-xs font-semibold text-muted-foreground">Apps</th>
                    <th className="text-center px-4 py-3 text-xs font-semibold text-muted-foreground">Shortlisted</th>
                    <th className="text-center px-4 py-3 text-xs font-semibold text-muted-foreground">Interviews</th>
                    <th className="text-center px-4 py-3 text-xs font-semibold text-muted-foreground">Status</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Deadline</th>
                  </tr>
                </thead>
                <tbody>
                  {jobPostings.map((job) => (
                    <tr key={job.id} className="border-b border-border/50 hover:bg-muted/20 transition-colors">
                      <td className="px-4 py-3 text-xs font-mono text-birla-cyan">{job.id}</td>
                      <td className="px-4 py-3 text-sm font-medium text-foreground">{job.title}</td>
                      <td className="px-4 py-3 text-xs text-muted-foreground">{job.department}</td>
                      <td className="px-4 py-3 text-center text-xs text-foreground">{job.applications}</td>
                      <td className="px-4 py-3 text-center text-xs text-foreground">{job.shortlisted}</td>
                      <td className="px-4 py-3 text-center text-xs text-foreground">{job.interviews}</td>
                      <td className="px-4 py-3 text-center">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${
                          job.status === 'Interviewing' ? 'bg-purple-500/10 text-purple-600 dark:text-purple-400' :
                          job.status === 'Shortlisting' ? 'bg-blue-500/10 text-blue-600 dark:text-blue-400' :
                          job.status === 'Offer Pending' ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' :
                          'bg-muted text-muted-foreground'
                        }`}>
                          {job.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-xs text-muted-foreground">{job.deadline}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>

          {/* Interview Schedule */}
          <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-5">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-sm font-semibold text-foreground flex items-center gap-2">
                <Calendar className="w-4 h-4 text-rose-500" />
                Upcoming Interviews
              </h4>
              <span className="text-xs px-2 py-0.5 rounded-full bg-rose-500/10 text-rose-600 dark:text-rose-400 font-medium">
                {interviewSchedule.length} Scheduled
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {interviewSchedule.map((interview) => (
                <div key={interview.id} className="p-4 rounded-xl border border-border gradient-card-blue hover:shadow-sm transition-all">
                  <div className="flex items-center justify-between mb-2">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${
                      interview.mode === 'In-Person' ? 'bg-blue-500/10 text-blue-600 dark:text-blue-400' : 'bg-purple-500/10 text-purple-600 dark:text-purple-400'
                    }`}>
                      {interview.mode}
                    </span>
                    <span className="text-[10px] text-muted-foreground">{interview.round}</span>
                  </div>
                  <p className="text-sm font-semibold text-foreground">{interview.candidate}</p>
                  <p className="text-[11px] text-muted-foreground">{interview.position}</p>
                  <div className="mt-2 space-y-1 text-xs text-muted-foreground">
                    <p className="flex items-center gap-1.5"><Calendar className="w-3 h-3" /> {interview.date} at {interview.time}</p>
                    <p className="flex items-center gap-1.5"><Users className="w-3 h-3" /> {interview.panel}</p>
                  </div>
                  <div className="flex items-center gap-2 mt-3">
                    <button className="px-2.5 py-1 rounded-lg gradient-birla text-white text-[10px] font-medium hover:opacity-90 transition-opacity">
                      View Profile
                    </button>
                    <button className="px-2.5 py-1 rounded-lg border border-border text-[10px] font-medium hover:bg-muted transition-colors">
                      Reschedule
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* ─── Performance Tab ───────────────────────────────── */}
      {activeTab === 'performance' && (
        <motion.div variants={itemVariants} className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-semibold text-foreground flex items-center gap-2">
              <Target className="w-5 h-5 text-emerald-500" />
              Performance Reviews
            </h3>
            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg gradient-birla text-white text-xs font-medium">
              <Plus className="w-3.5 h-3.5" /> Initiate Review
            </button>
          </div>

          {/* Review Cycles */}
          <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-5">
            <h4 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
              <ClipboardList className="w-4 h-4 text-birla-gold" />
              Review Cycles
            </h4>
            <div className="space-y-3">
              {reviewCycles.map((cycle) => (
                <div key={cycle.id} className="p-4 rounded-xl border border-border gradient-card-blue hover:shadow-sm transition-all">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-semibold text-foreground">{cycle.name}</p>
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${
                          cycle.status === 'In Progress' ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400' : 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                        }`}>
                          {cycle.status}
                        </span>
                      </div>
                      <p className="text-[11px] text-muted-foreground mt-0.5">{cycle.period} &bull; Due: {cycle.dueDate}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-foreground font-medium">{cycle.reviewsCompleted} reviews</span>
                      {cycle.status === 'In Progress' && (
                        <button className="px-2.5 py-1 rounded-lg gradient-birla text-white text-[10px] font-medium hover:opacity-90 transition-opacity">
                          Send Reminders
                        </button>
                      )}
                    </div>
                  </div>
                  <div className="w-full h-2 rounded-full bg-muted overflow-hidden">
                    <div
                      className="h-full rounded-full gradient-birla-cyan"
                      style={{ width: `${cycle.completion}%` }}
                    />
                  </div>
                  <p className="text-[10px] text-muted-foreground mt-1.5">{cycle.completion}% complete</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Rating Distribution + Feedback Summary */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Rating Distribution */}
            <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-5">
              <h4 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
                <Star className="w-4 h-4 text-birla-gold" />
                Rating Distribution
              </h4>
              <div className="h-56">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={performanceData} layout="vertical" barGap={4}>
                    <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'} horizontal={false} />
                    <XAxis type="number" tick={{ fontSize: 9 }} stroke={darkMode ? '#64748b' : '#94a3b8'} />
                    <YAxis type="category" dataKey="rating" tick={{ fontSize: 8 }} stroke={darkMode ? '#64748b' : '#94a3b8'} width={90} />
                    <Tooltip contentStyle={tooltipStyle} />
                    <Bar dataKey="count" radius={[0, 6, 6, 0]} name="Staff Count">
                      {performanceData.map((entry, idx) => (
                        <Cell key={idx} fill={entry.color} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="flex items-center justify-center gap-4 mt-3 text-[10px] text-muted-foreground">
                <span>186 staff rated &bull; Avg: 3.21/5.0</span>
              </div>
            </motion.div>

            {/* Feedback Summary */}
            <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-5">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-sm font-semibold text-foreground flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-purple-500" />
                  Recent Feedback
                </h4>
                <span className="text-xs px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 font-medium">
                  {feedbackData.length} Reviews
                </span>
              </div>
              <div className="space-y-3 max-h-80 overflow-y-auto">
                {feedbackData.map((fb) => (
                  <div key={fb.id} className="p-3 rounded-xl border border-border gradient-card-blue hover:shadow-sm transition-all">
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-purple-500/10 text-purple-600 dark:text-purple-400">
                          {fb.type}
                        </span>
                        <div className="flex items-center gap-0.5">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star key={star} className={`w-3 h-3 ${star <= Math.round(fb.rating) ? 'text-birla-gold fill-birla-gold' : 'text-muted-foreground/30'}`} />
                          ))}
                          <span className="text-[10px] font-medium text-foreground ml-1">{fb.rating}</span>
                        </div>
                      </div>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${
                        fb.status === 'Completed' ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' : 'bg-amber-500/10 text-amber-600 dark:text-amber-400'
                      }`}>
                        {fb.status}
                      </span>
                    </div>
                    <p className="text-xs font-medium text-foreground">{fb.reviewee} <span className="text-muted-foreground font-normal">reviewed by</span> {fb.reviewer}</p>
                    <p className="text-[11px] text-muted-foreground mt-1 line-clamp-2">{fb.feedback}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Performance Rating Pie */}
          <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-5">
            <h4 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
              <PieChartIcon className="w-4 h-4 text-birla-cyan" />
              Performance Overview
            </h4>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={performanceData} cx="50%" cy="50%" outerRadius={90} innerRadius={50} dataKey="count" label={({ rating, percent }) => `${rating}: ${percent}%`} labelLine={true} paddingAngle={2}>
                      {performanceData.map((entry, idx) => (
                        <Cell key={idx} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={tooltipStyle} formatter={(value, name, props) => [`${value} staff (${props.payload.percent}%)`, props.payload.rating]} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-3">
                <h5 className="text-xs font-semibold text-foreground">Key Performance Indicators</h5>
                {[
                  { label: 'Staff with Outstanding Rating', value: '18 (10%)', color: '#0A1628' },
                  { label: 'Staff meeting expectations', value: '144 (77%)', color: '#22D3EE' },
                  { label: 'Staff needing improvement', value: '42 (23%)', color: '#EF4444' },
                  { label: 'Average Training Hours', value: '24 hrs/year', color: '#C8A45C' },
                  { label: 'Promotion Rate', value: '12%', color: '#10B981' },
                  { label: 'Retention Rate', value: '94.6%', color: '#8B5CF6' },
                ].map((kpi) => (
                  <div key={kpi.label} className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: kpi.color }} />
                      <span className="text-muted-foreground">{kpi.label}</span>
                    </div>
                    <span className="font-semibold text-foreground">{kpi.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  )
}
