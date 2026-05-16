'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ClipboardList, Users, FileText, Search, Filter, Plus, Eye, Edit,
  Trash2, ChevronRight, GraduationCap, ArrowUpRight, Clock,
  CheckCircle2, AlertTriangle, XCircle, Download, Upload, Phone,
  Mail, Calendar, BookOpen, IndianRupee, Activity, BarChart3,
  PieChart as PieChartIcon, Target, UserCheck, MessageSquare,
  TrendingUp, FileCheck, CreditCard, Seat, MapPin, Star,
  ChevronLeft, Printer, Send, Award, Shield, Briefcase,
  CircleDollarSign, BadgeCheck, FormInput, ListChecks, UserPlus,
  CalendarCheck, ClipboardCheck, FileBadge
} from 'lucide-react'
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Legend, PieChart, Pie, Cell
} from 'recharts'
import useAppStore from '@/store/useAppStore'

// ─── Animation Variants ─────────────────────────────────────────
const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.06 } },
}
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
}

// ─── Data ───────────────────────────────────────────────────────
const funnelData = [
  { name: 'New Applications', value: 85, color: '#22D3EE' },
  { name: 'Screening Scheduled', value: 42, color: '#C8A45C' },
  { name: 'Entrance Exam Cleared', value: 28, color: '#8B5CF6' },
  { name: 'Counselling Done', value: 22, color: '#10B981' },
  { name: 'Admitted', value: 310, color: '#0A1628' },
  { name: 'Waitlisted', value: 9, color: '#EF4444' },
]

const admissionFormFields = [
  { section: 'Personal Information', fields: ['Student Name', 'Date of Birth', 'Gender', 'Aadhaar Number', 'Blood Group', 'Nationality', 'Religion', 'Mother Tongue'] },
  { section: 'Parent Details', fields: ['Father\'s Name', 'Father\'s Occupation', 'Father\'s Mobile', 'Mother\'s Name', 'Mother\'s Occupation', 'Mother\'s Mobile', 'Email Address'] },
  { section: 'Academic Details', fields: ['Class Applied For', 'Previous School', 'Previous Class', 'Academic Year', 'Medium of Instruction'] },
  { section: 'Address', fields: ['Residential Address', 'City', 'State', 'PIN Code', 'Permanent Address'] },
]

const documentChecklist = [
  { name: 'Birth Certificate', status: 'verified', category: 'Identity', required: true },
  { name: 'Aadhaar Card (Student)', status: 'verified', category: 'Identity', required: true },
  { name: 'Aadhaar Card (Parent)', status: 'verified', category: 'Identity', required: true },
  { name: 'Transfer Certificate', status: 'pending', category: 'Academic', required: true },
  { name: 'Previous Marksheet', status: 'verified', category: 'Academic', required: true },
  { name: 'Character Certificate', status: 'pending', category: 'Academic', required: false },
  { name: 'Passport Size Photos (4)', status: 'verified', category: 'Identity', required: true },
  { name: 'Caste Certificate', status: 'not_applicable', category: 'Category', required: false },
  { name: 'Medical Fitness Certificate', status: 'verified', category: 'Health', required: true },
  { name: 'Migration Certificate', status: 'pending', category: 'Academic', required: false },
  { name: 'Address Proof', status: 'verified', category: 'Identity', required: true },
  { name: 'Income Certificate', status: 'not_applicable', category: 'Category', required: false },
]

const entranceExams = [
  { id: 'EE-2026-001', date: 'Mar 15, 2026', subject: 'Mathematics & Aptitude', class: 'VI', duration: '2 hrs', type: 'Written', venue: 'Main Campus - Hall A', status: 'Scheduled', cutOff: 60 },
  { id: 'EE-2026-002', date: 'Mar 18, 2026', subject: 'English & Reasoning', class: 'VII', duration: '2 hrs', type: 'Written', venue: 'Main Campus - Hall B', status: 'Scheduled', cutOff: 55 },
  { id: 'EE-2026-003', date: 'Mar 20, 2026', subject: 'Science & Aptitude', class: 'VIII', duration: '2.5 hrs', type: 'Written + Viva', venue: 'Main Campus - Hall A', status: 'Scheduled', cutOff: 65 },
  { id: 'EE-2026-004', date: 'Mar 22, 2026', subject: 'Comprehensive Assessment', class: 'IX', duration: '3 hrs', type: 'Written + Interview', venue: 'Main Campus - Hall C', status: 'Scheduled', cutOff: 70 },
  { id: 'EE-2026-005', date: 'Mar 25, 2026', subject: 'Board Readiness Test', class: 'XI - Science', duration: '3 hrs', type: 'Written + Interview', venue: 'Senior Block - Room 101', status: 'Scheduled', cutOff: 75 },
  { id: 'EE-2026-006', date: 'Mar 25, 2026', subject: 'Board Readiness Test', class: 'XI - Commerce', duration: '3 hrs', type: 'Written + Interview', venue: 'Senior Block - Room 102', status: 'Scheduled', cutOff: 65 },
]

const entranceResults = [
  { name: 'Aarav Mishra', class: 'VI', score: 88, maxScore: 100, status: 'Passed', rank: 1 },
  { name: 'Diya Verma', class: 'VI', score: 82, maxScore: 100, status: 'Passed', rank: 2 },
  { name: 'Kabir Saxena', class: 'VII', score: 79, maxScore: 100, status: 'Passed', rank: 1 },
  { name: 'Anvi Reddy', class: 'VIII', score: 91, maxScore: 100, status: 'Passed', rank: 1 },
  { name: 'Ishaan Joshi', class: 'IX', score: 73, maxScore: 100, status: 'Passed', rank: 2 },
  { name: 'Riya Kulkarni', class: 'XI - Science', score: 85, maxScore: 100, status: 'Passed', rank: 1 },
  { name: 'Arjun Nair', class: 'XI - Commerce', score: 68, maxScore: 100, status: 'Passed', rank: 1 },
  { name: 'Meera Pillai', class: 'VI', score: 54, maxScore: 100, status: 'Waitlisted', rank: 8 },
]

const leads = [
  { id: 'LD-001', name: 'Vikram Malhotra', class: 'VI', source: 'Website', status: 'New', score: 85, followUp: 'Mar 5, 2026', phone: '+91 98765 43210', email: 'vikram.m@email.com' },
  { id: 'LD-002', name: 'Sneha Dasgupta', class: 'VII', source: 'Referral', status: 'Contacted', score: 72, followUp: 'Mar 3, 2026', phone: '+91 87654 32109', email: 'sneha.d@email.com' },
  { id: 'LD-003', name: 'Arjun Krishnan', class: 'IX', source: 'Walk-in', status: 'Exam Scheduled', score: 90, followUp: 'Mar 10, 2026', phone: '+91 76543 21098', email: 'arjun.k@email.com' },
  { id: 'LD-004', name: 'Priya Choudhury', class: 'XI - Science', source: 'Website', status: 'Counselling', score: 78, followUp: 'Mar 8, 2026', phone: '+91 65432 10987', email: 'priya.c@email.com' },
  { id: 'LD-005', name: 'Rohan Bhat', class: 'VIII', source: 'Social Media', status: 'New', score: 65, followUp: 'Mar 12, 2026', phone: '+91 54321 09876', email: 'rohan.b@email.com' },
  { id: 'LD-006', name: 'Ananya Rao', class: 'VI', source: 'Referral', status: 'Admitted', score: 95, followUp: 'Completed', phone: '+91 43210 98765', email: 'ananya.r@email.com' },
  { id: 'LD-007', name: 'Kunal Mehta', class: 'XI - Commerce', source: 'Website', status: 'Contacted', score: 60, followUp: 'Mar 15, 2026', phone: '+91 32109 87654', email: 'kunal.m@email.com' },
  { id: 'LD-008', name: 'Shreya Gupta', class: 'VII', source: 'Walk-in', status: 'Exam Scheduled', score: 82, followUp: 'Mar 7, 2026', phone: '+91 21098 76543', email: 'shreya.g@email.com' },
]

const counsellingSessions = [
  { id: 'CS-001', parent: 'Mr. & Mrs. Malhotra', child: 'Vikram Malhotra', class: 'VI', date: 'Mar 5, 2026', time: '10:00 AM', counsellor: 'Dr. Sunita Rao', mode: 'In-Person', status: 'Scheduled' },
  { id: 'CS-002', parent: 'Mrs. Dasgupta', child: 'Sneha Dasgupta', class: 'VII', date: 'Mar 3, 2026', time: '11:30 AM', counsellor: 'Mr. Rakesh Pandey', mode: 'Online', status: 'Scheduled' },
  { id: 'CS-003', parent: 'Mr. Krishnan', child: 'Arjun Krishnan', class: 'IX', date: 'Mar 10, 2026', time: '2:00 PM', counsellor: 'Dr. Sunita Rao', mode: 'In-Person', status: 'Confirmed' },
  { id: 'CS-004', parent: 'Mr. & Mrs. Choudhury', child: 'Priya Choudhury', class: 'XI', date: 'Mar 8, 2026', time: '3:30 PM', counsellor: 'Mrs. Kavitha Sharma', mode: 'In-Person', status: 'Confirmed' },
  { id: 'CS-005', parent: 'Mr. Bhat', child: 'Rohan Bhat', class: 'VIII', date: 'Mar 12, 2026', time: '10:30 AM', counsellor: 'Mr. Rakesh Pandey', mode: 'Online', status: 'Pending' },
  { id: 'CS-006', parent: 'Mrs. Rao', child: 'Ananya Rao', class: 'VI', date: 'Feb 28, 2026', time: '9:00 AM', counsellor: 'Dr. Sunita Rao', mode: 'In-Person', status: 'Completed' },
]

const monthlyAnalytics = [
  { month: 'Apr', applications: 12, admissions: 8, rate: 66.7 },
  { month: 'May', applications: 18, admissions: 14, rate: 77.8 },
  { month: 'Jun', applications: 25, admissions: 18, rate: 72.0 },
  { month: 'Jul', applications: 32, admissions: 22, rate: 68.8 },
  { month: 'Aug', applications: 20, admissions: 15, rate: 75.0 },
  { month: 'Sep', applications: 15, admissions: 10, rate: 66.7 },
  { month: 'Oct', applications: 22, admissions: 16, rate: 72.7 },
  { month: 'Nov', applications: 35, admissions: 28, rate: 80.0 },
  { month: 'Dec', applications: 45, admissions: 35, rate: 77.8 },
  { month: 'Jan', applications: 58, admissions: 42, rate: 72.4 },
  { month: 'Feb', applications: 65, admissions: 50, rate: 76.9 },
  { month: 'Mar', applications: 85, admissions: 52, rate: 61.2 },
]

const paymentData = [
  { id: 'PAY-001', student: 'Ananya Rao', class: 'VI', amount: 45000, status: 'Paid', date: 'Feb 28, 2026', method: 'Online (UPI)', txnId: 'TXN7890123456' },
  { id: 'PAY-002', student: 'Vikram Malhotra', class: 'VI', amount: 45000, status: 'Pending', date: 'Mar 5, 2026', method: 'Bank Transfer', txnId: '—' },
  { id: 'PAY-003', student: 'Sneha Dasgupta', class: 'VII', amount: 48000, status: 'Paid', date: 'Feb 25, 2026', method: 'Online (Card)', txnId: 'TXN7890123457' },
  { id: 'PAY-004', student: 'Arjun Krishnan', class: 'IX', amount: 52000, status: 'Partial', date: 'Mar 1, 2026', method: 'Cash', txnId: '—' },
  { id: 'PAY-005', student: 'Priya Choudhury', class: 'XI', amount: 58000, status: 'Overdue', date: 'Feb 20, 2026', method: '—', txnId: '—' },
  { id: 'PAY-006', student: 'Kabir Saxena', class: 'VII', amount: 48000, status: 'Paid', date: 'Feb 22, 2026', method: 'Online (UPI)', txnId: 'TXN7890123458' },
]

const seatAllocation = [
  { class: 'I', capacity: 40, filled: 38, available: 2 },
  { class: 'II', capacity: 40, filled: 36, available: 4 },
  { class: 'III', capacity: 40, filled: 40, available: 0 },
  { class: 'IV', capacity: 40, filled: 37, available: 3 },
  { class: 'V', capacity: 40, filled: 39, available: 1 },
  { class: 'VI', capacity: 45, filled: 40, available: 5 },
  { class: 'VII', capacity: 45, filled: 42, available: 3 },
  { class: 'VIII', capacity: 45, filled: 44, available: 1 },
  { class: 'IX', capacity: 45, filled: 45, available: 0 },
  { class: 'X', capacity: 45, filled: 43, available: 2 },
  { class: 'XI - Sci', capacity: 40, filled: 35, available: 5 },
  { class: 'XI - Comm', capacity: 40, filled: 32, available: 8 },
  { class: 'XII - Sci', capacity: 40, filled: 38, available: 2 },
  { class: 'XII - Comm', capacity: 40, filled: 36, available: 4 },
]

export default function AdmissionModule() {
  const { darkMode } = useAppStore()
  const [activeTab, setActiveTab] = useState('overview')
  const [searchQuery, setSearchQuery] = useState('')
  const [filterStatus, setFilterStatus] = useState('All')

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'applications', label: 'Applications', icon: FileText },
    { id: 'entrance', label: 'Entrance Exam', icon: GraduationCap },
    { id: 'counselling', label: 'Counselling', icon: MessageSquare },
    { id: 'analytics', label: 'Analytics', icon: Activity },
  ]

  const filteredLeads = leads.filter((lead) => {
    const matchesSearch = lead.name.toLowerCase().includes(searchQuery.toLowerCase()) || lead.id.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = filterStatus === 'All' || lead.status === filterStatus
    return matchesSearch && matchesStatus
  })

  const tooltipStyle = {
    contentStyle: {
      backgroundColor: darkMode ? '#1A2D4A' : '#fff',
      border: `1px solid ${darkMode ? 'rgba(255,255,255,0.1)' : '#e2e8f0'}`,
      borderRadius: '12px',
      fontSize: '12px',
      color: darkMode ? '#e2e8f0' : '#1e293b',
    },
  }

  const totalSeats = seatAllocation.reduce((sum, s) => sum + s.capacity, 0)
  const totalFilled = seatAllocation.reduce((sum, s) => sum + s.filled, 0)
  const totalAvailable = seatAllocation.reduce((sum, s) => sum + s.available, 0)

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

      {/* ─── OVERVIEW TAB ────────────────────────────────── */}
      {activeTab === 'overview' && (
        <motion.div variants={itemVariants} className="space-y-6">
          {/* Top Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { label: 'New Applications', value: '85', icon: FileText, color: 'text-cyan-500 bg-cyan-500/10', trend: '+12%' },
              { label: 'Screening Scheduled', value: '42', icon: CalendarCheck, color: 'text-amber-500 bg-amber-500/10', trend: '+8%' },
              { label: 'Admitted', value: '310', icon: UserCheck, color: 'text-emerald-500 bg-emerald-500/10', trend: '+5%' },
              { label: 'Conversion Rate', value: '36.2%', icon: TrendingUp, color: 'text-purple-500 bg-purple-500/10', trend: '+2.3%' },
            ].map((stat) => {
              const Icon = stat.icon
              return (
                <div key={stat.label} className="rounded-2xl border border-border bg-card p-4 hover:shadow-sm transition-all">
                  <div className="flex items-center justify-between mb-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${stat.color}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="flex items-center gap-0.5 text-[10px] font-medium text-emerald-500">
                      <ArrowUpRight className="w-3 h-3" /> {stat.trend}
                    </span>
                  </div>
                  <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                  <p className="text-[10px] text-muted-foreground mt-0.5">{stat.label}</p>
                </div>
              )
            })}
          </div>

          {/* Admission Funnel + Lead Sources */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Admission Funnel PieChart */}
            <div className="rounded-2xl border border-border bg-card p-5">
              <h4 className="text-sm font-semibold text-foreground mb-1 flex items-center gap-2">
                <PieChartIcon className="w-4 h-4 text-birla-cyan" />
                Admission Funnel
              </h4>
              <p className="text-[10px] text-muted-foreground mb-3">Current academic session 2025-26</p>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={funnelData}
                      cx="50%"
                      cy="50%"
                      innerRadius={55}
                      outerRadius={90}
                      paddingAngle={3}
                      dataKey="value"
                    >
                      {funnelData.map((entry, idx) => (
                        <Cell key={idx} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip {...tooltipStyle} />
                    <Legend iconType="circle" wrapperStyle={{ fontSize: '10px' }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Seat Allocation */}
            <div className="rounded-2xl border border-border bg-card p-5">
              <h4 className="text-sm font-semibold text-foreground mb-1 flex items-center gap-2">
                <Target className="w-4 h-4 text-birla-gold" />
                Seat Allocation Overview
              </h4>
              <p className="text-[10px] text-muted-foreground mb-3">Total: {totalSeats} seats &bull; Filled: {totalFilled} &bull; Available: {totalAvailable}</p>
              <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
                {seatAllocation.map((seat) => {
                  const pct = Math.round((seat.filled / seat.capacity) * 100)
                  const barColor = pct >= 95 ? '#EF4444' : pct >= 80 ? '#F59E0B' : '#10B981'
                  return (
                    <div key={seat.class} className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/20 transition-colors">
                      <span className="text-xs font-medium text-foreground w-16 flex-shrink-0">Class {seat.class}</span>
                      <div className="flex-1">
                        <div className="w-full h-2 rounded-full bg-muted overflow-hidden">
                          <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, backgroundColor: barColor }} />
                        </div>
                      </div>
                      <span className="text-[10px] text-muted-foreground w-16 text-right">{seat.filled}/{seat.capacity}</span>
                      <span className={`text-[10px] font-medium w-8 text-right ${seat.available === 0 ? 'text-red-500' : 'text-emerald-500'}`}>
                        {seat.available === 0 ? 'Full' : seat.available}
                      </span>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Document Uploads + Payment Workflow */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Document Verification Status */}
            <div className="rounded-2xl border border-border bg-card p-5">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-sm font-semibold text-foreground flex items-center gap-2">
                  <FileCheck className="w-4 h-4 text-purple-500" />
                  Document Verification Status
                </h4>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[10px] font-medium">
                  {documentChecklist.filter(d => d.status === 'verified').length}/{documentChecklist.length} Verified
                </span>
              </div>
              <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
                {documentChecklist.map((doc, idx) => (
                  <div key={idx} className="flex items-center justify-between p-2.5 rounded-xl bg-muted/20 hover:bg-muted/30 transition-colors">
                    <div className="flex items-center gap-2.5">
                      {doc.status === 'verified' ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                      ) : doc.status === 'pending' ? (
                        <Clock className="w-4 h-4 text-amber-500" />
                      ) : (
                        <XCircle className="w-4 h-4 text-muted-foreground" />
                      )}
                      <div>
                        <p className="text-xs font-medium text-foreground">{doc.name}</p>
                        <p className="text-[10px] text-muted-foreground">{doc.category} {doc.required && '• Required'}</p>
                      </div>
                    </div>
                    <span className={`px-2 py-0.5 rounded-full text-[9px] font-medium ${
                      doc.status === 'verified' ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' :
                      doc.status === 'pending' ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400' :
                      'bg-muted text-muted-foreground'
                    }`}>
                      {doc.status === 'verified' ? 'Verified' : doc.status === 'pending' ? 'Pending' : 'N/A'}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Payment Workflow */}
            <div className="rounded-2xl border border-border bg-card p-5">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-sm font-semibold text-foreground flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-birla-gold" />
                  Admission Fee Payment Tracking
                </h4>
                <span className="text-[10px] text-muted-foreground">
                  Total: ₹{paymentData.reduce((s, p) => s + p.amount, 0).toLocaleString('en-IN')}
                </span>
              </div>
              <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
                {paymentData.map((pay) => (
                  <div key={pay.id} className="p-3 rounded-xl bg-muted/20 hover:bg-muted/30 transition-colors">
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg gradient-birla-gold flex items-center justify-center text-[10px] font-bold text-birla-blue">
                          ₹
                        </div>
                        <div>
                          <p className="text-xs font-medium text-foreground">{pay.student}</p>
                          <p className="text-[10px] text-muted-foreground">Class {pay.class} • {pay.id}</p>
                        </div>
                      </div>
                      <span className={`px-2 py-0.5 rounded-full text-[9px] font-medium ${
                        pay.status === 'Paid' ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' :
                        pay.status === 'Pending' ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400' :
                        pay.status === 'Partial' ? 'bg-blue-500/10 text-blue-600 dark:text-blue-400' :
                        'bg-red-500/10 text-red-600 dark:text-red-400'
                      }`}>
                        {pay.status}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-[10px] text-muted-foreground">
                      <span>₹{pay.amount.toLocaleString('en-IN')} • {pay.method}</span>
                      <span>{pay.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* ─── APPLICATIONS TAB ──────────────────────────────── */}
      {activeTab === 'applications' && (
        <motion.div variants={itemVariants} className="space-y-4">
          {/* Online Admission Forms */}
          <div className="rounded-2xl border border-border bg-card p-5">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-sm font-semibold text-foreground flex items-center gap-2">
                <FormInput className="w-4 h-4 text-birla-cyan" />
                Online Admission Form Builder
              </h4>
              <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg gradient-birla text-white text-xs font-medium">
                <Plus className="w-3.5 h-3.5" /> Add Section
              </button>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {admissionFormFields.map((section) => (
                <div key={section.section} className="rounded-xl border border-border bg-muted/20 p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h5 className="text-xs font-semibold text-foreground">{section.section}</h5>
                    <span className="text-[10px] text-muted-foreground">{section.fields.length} fields</span>
                  </div>
                  <div className="space-y-1.5">
                    {section.fields.map((field) => (
                      <div key={field} className="flex items-center gap-2 p-2 rounded-lg bg-background border border-border/50">
                        <div className="w-1.5 h-1.5 rounded-full bg-birla-cyan" />
                        <span className="text-xs text-foreground">{field}</span>
                        <span className="ml-auto text-[9px] text-muted-foreground bg-muted px-1.5 py-0.5 rounded">Required</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Lead Management Table */}
          <div className="rounded-2xl border border-border bg-card p-5">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4">
              <h4 className="text-sm font-semibold text-foreground flex items-center gap-2">
                <Target className="w-4 h-4 text-birla-gold" />
                Lead Management
              </h4>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search leads..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9 pr-3 py-1.5 rounded-lg border border-input bg-background text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-birla-gold/40 w-48"
                  />
                </div>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-2 py-1.5 rounded-lg border border-input bg-background text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-birla-gold/40"
                >
                  {['All', 'New', 'Contacted', 'Exam Scheduled', 'Counselling', 'Admitted', 'Lost'].map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border bg-muted/30">
                    <th className="text-left px-3 py-2.5 text-[10px] font-semibold text-muted-foreground">ID</th>
                    <th className="text-left px-3 py-2.5 text-[10px] font-semibold text-muted-foreground">Name</th>
                    <th className="text-left px-3 py-2.5 text-[10px] font-semibold text-muted-foreground">Class</th>
                    <th className="text-left px-3 py-2.5 text-[10px] font-semibold text-muted-foreground">Source</th>
                    <th className="text-left px-3 py-2.5 text-[10px] font-semibold text-muted-foreground">Status</th>
                    <th className="text-left px-3 py-2.5 text-[10px] font-semibold text-muted-foreground">Score</th>
                    <th className="text-left px-3 py-2.5 text-[10px] font-semibold text-muted-foreground">Follow-up</th>
                    <th className="text-right px-3 py-2.5 text-[10px] font-semibold text-muted-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredLeads.map((lead) => (
                    <tr key={lead.id} className="border-b border-border/50 hover:bg-muted/20 transition-colors">
                      <td className="px-3 py-2.5 text-[10px] font-mono text-birla-cyan">{lead.id}</td>
                      <td className="px-3 py-2.5">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-full gradient-birla-gold flex items-center justify-center text-[10px] font-bold text-birla-blue flex-shrink-0">
                            {lead.name.charAt(0)}
                          </div>
                          <div>
                            <p className="text-xs font-medium text-foreground">{lead.name}</p>
                            <p className="text-[9px] text-muted-foreground">{lead.phone}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-3 py-2.5 text-xs text-foreground">{lead.class}</td>
                      <td className="px-3 py-2.5">
                        <span className="px-1.5 py-0.5 rounded-md bg-muted text-[9px] text-muted-foreground">{lead.source}</span>
                      </td>
                      <td className="px-3 py-2.5">
                        <span className={`px-2 py-0.5 rounded-full text-[9px] font-medium ${
                          lead.status === 'New' ? 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400' :
                          lead.status === 'Contacted' ? 'bg-blue-500/10 text-blue-600 dark:text-blue-400' :
                          lead.status === 'Exam Scheduled' ? 'bg-purple-500/10 text-purple-600 dark:text-purple-400' :
                          lead.status === 'Counselling' ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400' :
                          lead.status === 'Admitted' ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' :
                          'bg-red-500/10 text-red-600 dark:text-red-400'
                        }`}>
                          {lead.status}
                        </span>
                      </td>
                      <td className="px-3 py-2.5">
                        <div className="flex items-center gap-1.5">
                          <div className="w-10 h-1.5 rounded-full bg-muted overflow-hidden">
                            <div
                              className="h-full rounded-full"
                              style={{
                                width: `${lead.score}%`,
                                backgroundColor: lead.score >= 80 ? '#10B981' : lead.score >= 60 ? '#F59E0B' : '#EF4444',
                              }}
                            />
                          </div>
                          <span className="text-[10px] text-foreground font-medium">{lead.score}</span>
                        </div>
                      </td>
                      <td className="px-3 py-2.5 text-[10px] text-muted-foreground">{lead.followUp}</td>
                      <td className="px-3 py-2.5">
                        <div className="flex items-center justify-end gap-1">
                          <button className="p-1 rounded hover:bg-muted text-muted-foreground hover:text-foreground transition-colors" title="View">
                            <Eye className="w-3 h-3" />
                          </button>
                          <button className="p-1 rounded hover:bg-muted text-muted-foreground hover:text-foreground transition-colors" title="Edit">
                            <Edit className="w-3 h-3" />
                          </button>
                          <button className="p-1 rounded hover:bg-muted text-muted-foreground hover:text-foreground transition-colors" title="Call">
                            <Phone className="w-3 h-3" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>
      )}

      {/* ─── ENTRANCE EXAM TAB ─────────────────────────────── */}
      {activeTab === 'entrance' && (
        <motion.div variants={itemVariants} className="space-y-4">
          {/* Exam Schedule */}
          <div className="rounded-2xl border border-border bg-card p-5">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-sm font-semibold text-foreground flex items-center gap-2">
                <Calendar className="w-4 h-4 text-birla-cyan" />
                Entrance Exam Schedule 2026-27
              </h4>
              <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg gradient-birla text-white text-xs font-medium">
                <Plus className="w-3.5 h-3.5" /> Schedule Exam
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border bg-muted/30">
                    <th className="text-left px-3 py-2.5 text-[10px] font-semibold text-muted-foreground">Exam ID</th>
                    <th className="text-left px-3 py-2.5 text-[10px] font-semibold text-muted-foreground">Date</th>
                    <th className="text-left px-3 py-2.5 text-[10px] font-semibold text-muted-foreground">Subject</th>
                    <th className="text-left px-3 py-2.5 text-[10px] font-semibold text-muted-foreground">Class</th>
                    <th className="text-left px-3 py-2.5 text-[10px] font-semibold text-muted-foreground">Duration</th>
                    <th className="text-left px-3 py-2.5 text-[10px] font-semibold text-muted-foreground">Type</th>
                    <th className="text-left px-3 py-2.5 text-[10px] font-semibold text-muted-foreground">Venue</th>
                    <th className="text-left px-3 py-2.5 text-[10px] font-semibold text-muted-foreground">Cut-off</th>
                    <th className="text-left px-3 py-2.5 text-[10px] font-semibold text-muted-foreground">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {entranceExams.map((exam) => (
                    <tr key={exam.id} className="border-b border-border/50 hover:bg-muted/20 transition-colors">
                      <td className="px-3 py-2.5 text-[10px] font-mono text-birla-cyan">{exam.id}</td>
                      <td className="px-3 py-2.5 text-xs text-foreground flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-muted-foreground" />
                        {exam.date}
                      </td>
                      <td className="px-3 py-2.5 text-xs text-foreground">{exam.subject}</td>
                      <td className="px-3 py-2.5 text-xs text-foreground">{exam.class}</td>
                      <td className="px-3 py-2.5 text-[10px] text-muted-foreground">{exam.duration}</td>
                      <td className="px-3 py-2.5">
                        <span className="px-1.5 py-0.5 rounded-md bg-muted text-[9px] text-muted-foreground">{exam.type}</span>
                      </td>
                      <td className="px-3 py-2.5 text-[10px] text-muted-foreground">{exam.venue}</td>
                      <td className="px-3 py-2.5 text-xs font-medium text-foreground">{exam.cutOff}%</td>
                      <td className="px-3 py-2.5">
                        <span className="px-2 py-0.5 rounded-full text-[9px] font-medium bg-cyan-500/10 text-cyan-600 dark:text-cyan-400">
                          {exam.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Exam Results */}
          <div className="rounded-2xl border border-border bg-card p-5">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-sm font-semibold text-foreground flex items-center gap-2">
                <Award className="w-4 h-4 text-birla-gold" />
                Entrance Exam Results
              </h4>
              <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border text-xs font-medium hover:bg-muted transition-colors">
                <Download className="w-3.5 h-3.5" /> Export Results
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {entranceResults.map((result, idx) => (
                <div key={idx} className="rounded-xl border border-border bg-muted/20 p-3 hover:shadow-sm transition-all">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold ${
                        result.rank <= 3 ? 'gradient-birla-gold text-birla-blue' : 'bg-muted text-muted-foreground'
                      }`}>
                        #{result.rank}
                      </div>
                      <div>
                        <p className="text-xs font-medium text-foreground">{result.name}</p>
                        <p className="text-[9px] text-muted-foreground">Class {result.class}</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-lg font-bold text-foreground">{result.score}<span className="text-[10px] text-muted-foreground">/{result.maxScore}</span></p>
                    </div>
                    <span className={`px-2 py-0.5 rounded-full text-[9px] font-medium ${
                      result.status === 'Passed' ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' :
                      'bg-amber-500/10 text-amber-600 dark:text-amber-400'
                    }`}>
                      {result.status}
                    </span>
                  </div>
                  <div className="mt-2 w-full h-1.5 rounded-full bg-muted overflow-hidden">
                    <div className="h-full rounded-full" style={{ width: `${result.score}%`, backgroundColor: result.score >= 75 ? '#10B981' : '#F59E0B' }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* ─── COUNSELLING TAB ─────────────────────────────────── */}
      {activeTab === 'counselling' && (
        <motion.div variants={itemVariants} className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-semibold text-foreground flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-birla-cyan" />
              Counselling Scheduling
            </h4>
            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg gradient-birla text-white text-xs font-medium">
              <Plus className="w-3.5 h-3.5" /> Schedule Session
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
            {[
              { label: 'Upcoming Sessions', value: '4', icon: Calendar, color: 'text-cyan-500 bg-cyan-500/10' },
              { label: 'Completed This Month', value: '12', icon: CheckCircle2, color: 'text-emerald-500 bg-emerald-500/10' },
              { label: 'Counsellors Available', value: '3', icon: Users, color: 'text-purple-500 bg-purple-500/10' },
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

          <div className="rounded-2xl border border-border bg-card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border bg-muted/30">
                    <th className="text-left px-4 py-3 text-[10px] font-semibold text-muted-foreground">ID</th>
                    <th className="text-left px-4 py-3 text-[10px] font-semibold text-muted-foreground">Parent</th>
                    <th className="text-left px-4 py-3 text-[10px] font-semibold text-muted-foreground">Child</th>
                    <th className="text-left px-4 py-3 text-[10px] font-semibold text-muted-foreground">Class</th>
                    <th className="text-left px-4 py-3 text-[10px] font-semibold text-muted-foreground">Date & Time</th>
                    <th className="text-left px-4 py-3 text-[10px] font-semibold text-muted-foreground">Counsellor</th>
                    <th className="text-left px-4 py-3 text-[10px] font-semibold text-muted-foreground">Mode</th>
                    <th className="text-left px-4 py-3 text-[10px] font-semibold text-muted-foreground">Status</th>
                    <th className="text-right px-4 py-3 text-[10px] font-semibold text-muted-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {counsellingSessions.map((session) => (
                    <tr key={session.id} className="border-b border-border/50 hover:bg-muted/20 transition-colors">
                      <td className="px-4 py-3 text-[10px] font-mono text-birla-cyan">{session.id}</td>
                      <td className="px-4 py-3 text-xs text-foreground">{session.parent}</td>
                      <td className="px-4 py-3 text-xs text-foreground">{session.child}</td>
                      <td className="px-4 py-3 text-xs text-foreground">{session.class}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3 text-muted-foreground" />
                          <span className="text-xs text-foreground">{session.date}</span>
                          <span className="text-[10px] text-muted-foreground">{session.time}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-xs text-foreground">{session.counsellor}</td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-0.5 rounded-full text-[9px] font-medium ${
                          session.mode === 'In-Person' ? 'bg-blue-500/10 text-blue-600 dark:text-blue-400' :
                          'bg-purple-500/10 text-purple-600 dark:text-purple-400'
                        }`}>
                          {session.mode}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-0.5 rounded-full text-[9px] font-medium ${
                          session.status === 'Completed' ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' :
                          session.status === 'Confirmed' ? 'bg-blue-500/10 text-blue-600 dark:text-blue-400' :
                          session.status === 'Scheduled' ? 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400' :
                          'bg-amber-500/10 text-amber-600 dark:text-amber-400'
                        }`}>
                          {session.status}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center justify-end gap-1">
                          <button className="p-1 rounded hover:bg-muted text-muted-foreground hover:text-foreground transition-colors" title="View">
                            <Eye className="w-3 h-3" />
                          </button>
                          <button className="p-1 rounded hover:bg-muted text-muted-foreground hover:text-foreground transition-colors" title="Reschedule">
                            <Calendar className="w-3 h-3" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>
      )}

      {/* ─── ANALYTICS TAB ─────────────────────────────────── */}
      {activeTab === 'analytics' && (
        <motion.div variants={itemVariants} className="space-y-4">
          {/* Monthly Applications vs Admissions */}
          <div className="rounded-2xl border border-border bg-card p-5">
            <h4 className="text-sm font-semibold text-foreground mb-1 flex items-center gap-2">
              <Activity className="w-4 h-4 text-birla-cyan" />
              Monthly Applications vs Admissions
            </h4>
            <p className="text-[10px] text-muted-foreground mb-3">Academic Session 2025-26</p>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyAnalytics} barGap={4}>
                  <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'} />
                  <XAxis dataKey="month" tick={{ fontSize: 10 }} stroke={darkMode ? '#64748b' : '#94a3b8'} />
                  <YAxis tick={{ fontSize: 10 }} stroke={darkMode ? '#64748b' : '#94a3b8'} />
                  <Tooltip {...tooltipStyle} />
                  <Legend iconType="circle" wrapperStyle={{ fontSize: '11px' }} />
                  <Bar dataKey="applications" fill="#22D3EE" radius={[4, 4, 0, 0]} name="Applications" />
                  <Bar dataKey="admissions" fill="#C8A45C" radius={[4, 4, 0, 0]} name="Admissions" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Conversion Rate Trend + Source Analysis */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Conversion Rate Trend */}
            <div className="rounded-2xl border border-border bg-card p-5">
              <h4 className="text-sm font-semibold text-foreground mb-1 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-emerald-500" />
                Conversion Rate Trend
              </h4>
              <p className="text-[10px] text-muted-foreground mb-3">Monthly conversion rate percentage</p>
              <div className="h-56">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={monthlyAnalytics}>
                    <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'} />
                    <XAxis dataKey="month" tick={{ fontSize: 10 }} stroke={darkMode ? '#64748b' : '#94a3b8'} />
                    <YAxis tick={{ fontSize: 10 }} stroke={darkMode ? '#64748b' : '#94a3b8'} domain={[50, 90]} />
                    <Tooltip {...tooltipStyle} formatter={(val) => [`${val}%`, 'Conversion Rate']} />
                    <Line type="monotone" dataKey="rate" stroke="#10B981" strokeWidth={2} dot={{ r: 3, fill: '#10B981' }} name="Conversion %" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Lead Source Analysis */}
            <div className="rounded-2xl border border-border bg-card p-5">
              <h4 className="text-sm font-semibold text-foreground mb-1 flex items-center gap-2">
                <Target className="w-4 h-4 text-birla-gold" />
                Lead Source Analysis
              </h4>
              <p className="text-[10px] text-muted-foreground mb-3">Distribution of admission leads by source</p>
              <div className="space-y-3">
                {[
                  { source: 'Website', count: 38, pct: 35, color: '#22D3EE' },
                  { source: 'Referral', count: 28, pct: 26, color: '#C8A45C' },
                  { source: 'Walk-in', count: 22, pct: 20, color: '#8B5CF6' },
                  { source: 'Social Media', count: 12, pct: 11, color: '#10B981' },
                  { source: 'Newspaper', count: 5, pct: 5, color: '#F59E0B' },
                  { source: 'Others', count: 3, pct: 3, color: '#EF4444' },
                ].map((item) => (
                  <div key={item.source} className="flex items-center gap-3">
                    <span className="text-xs text-foreground w-24 flex-shrink-0">{item.source}</span>
                    <div className="flex-1 h-2 rounded-full bg-muted overflow-hidden">
                      <div className="h-full rounded-full" style={{ width: `${item.pct}%`, backgroundColor: item.color }} />
                    </div>
                    <span className="text-[10px] font-medium text-foreground w-8 text-right">{item.count}</span>
                    <span className="text-[10px] text-muted-foreground w-8 text-right">{item.pct}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Seat Availability Heatmap */}
          <div className="rounded-2xl border border-border bg-card p-5">
            <h4 className="text-sm font-semibold text-foreground mb-1 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-purple-500" />
              Class-wise Seat Availability
            </h4>
            <p className="text-[10px] text-muted-foreground mb-3">Green = Available &bull; Amber = Limited &bull; Red = Full</p>
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
              {seatAllocation.map((seat) => {
                const pct = Math.round((seat.filled / seat.capacity) * 100)
                const bgColor = pct >= 100 ? 'bg-red-500/10 border-red-500/30' : pct >= 90 ? 'bg-amber-500/10 border-amber-500/30' : 'bg-emerald-500/10 border-emerald-500/30'
                const textColor = pct >= 100 ? 'text-red-600 dark:text-red-400' : pct >= 90 ? 'text-amber-600 dark:text-amber-400' : 'text-emerald-600 dark:text-emerald-400'
                return (
                  <div key={seat.class} className={`rounded-xl border p-3 text-center ${bgColor}`}>
                    <p className="text-xs font-semibold text-foreground">Class {seat.class}</p>
                    <p className={`text-xl font-bold mt-1 ${textColor}`}>{seat.available}</p>
                    <p className="text-[9px] text-muted-foreground">of {seat.capacity}</p>
                    <p className="text-[9px] text-muted-foreground mt-0.5">{seat.filled} filled</p>
                  </div>
                )
              })}
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  )
}
