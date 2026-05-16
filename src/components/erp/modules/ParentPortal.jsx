'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Heart, IndianRupee, Bus, Stethoscope, MessageSquare, BookOpen,
  BarChart3, TrendingUp, Calendar, CreditCard, Phone, MapPin,
  Plus, X, Shield, FileText, Activity, Star, Users, Clock,
  ArrowUpRight, AlertCircle, CheckCircle2, UserCheck, Award,
  GraduationCap, ClipboardList, Send, HeartPulse, Navigation
} from 'lucide-react'
import {
  BarChart, Bar, AreaChart, Area, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  Legend, LineChart, Line, RadarChart, Radar, PolarGrid,
  PolarAngleAxis, PolarRadiusAxis
} from 'recharts'
import useAppStore from '@/store/useAppStore'

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.06 } },
}
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
}

const CHART_COLORS = ['#1A2D4A', '#22D3EE', '#C8A45C', '#8B5CF6', '#10B981', '#EF4444']

const currentStudent = {
  name: 'Aarav Sharma', class: 'X', section: 'A', rollNo: '01',
  bspId: 'BSP/WB/2023/00001', penNo: 'PEN-1234-5678', upparId: 'UPPR-WB-000001'
}
const parentInfo = { name: 'Rajesh Kumar', phone: '+91 98765 43210', email: 'rajesh.kumar@email.com' }

const feePaymentHistory = [
  { month: 'Apr 2025', tuition: 15000, transport: 3500, lab: 2000, total: 20500, status: 'Paid' },
  { month: 'May 2025', tuition: 15000, transport: 3500, lab: 0, total: 18500, status: 'Paid' },
  { month: 'Jun 2025', tuition: 15000, transport: 3500, lab: 0, total: 18500, status: 'Paid' },
  { month: 'Jul 2025', tuition: 15000, transport: 3500, lab: 2000, total: 20500, status: 'Paid' },
  { month: 'Aug 2025', tuition: 15000, transport: 3500, lab: 0, total: 18500, status: 'Paid' },
  { month: 'Sep 2025', tuition: 15000, transport: 3500, lab: 0, total: 18500, status: 'Paid' },
  { month: 'Oct 2025', tuition: 15000, transport: 3500, lab: 2000, total: 20500, status: 'Paid' },
  { month: 'Nov 2025', tuition: 15000, transport: 3500, lab: 0, total: 18500, status: 'Paid' },
  { month: 'Dec 2025', tuition: 15000, transport: 3500, lab: 0, total: 18500, status: 'Paid' },
  { month: 'Jan 2026', tuition: 15000, transport: 3500, lab: 2000, total: 20500, status: 'Paid' },
  { month: 'Feb 2026', tuition: 15000, transport: 3500, lab: 0, total: 18500, status: 'Pending' },
  { month: 'Mar 2026', tuition: 15000, transport: 3500, lab: 0, total: 18500, status: 'Pending' },
]

const monthlyPaymentData = feePaymentHistory.map(f => ({ month: f.month.split(' ')[0], amount: f.total }))

const academicProgressData = [
  { term: 'Term 1', Mathematics: 72, Science: 68, English: 75, Hindi: 65, Social: 70 },
  { term: 'Term 2', Mathematics: 76, Science: 72, English: 78, Hindi: 68, Social: 73 },
  { term: 'Mid Term', Mathematics: 80, Science: 76, English: 82, Hindi: 72, Social: 76 },
  { term: 'Term 3', Mathematics: 84, Science: 80, English: 85, Hindi: 75, Social: 79 },
]

const attendanceData = [
  { name: 'Present', value: 185, color: '#10B981' },
  { name: 'Absent', value: 12, color: '#EF4444' },
  { name: 'Late', value: 8, color: '#F59E0B' },
  { name: 'Leave', value: 5, color: '#8B5CF6' },
]

const transportRouteData = [
  { date: '01 Mar', pickup: '7:15 AM', drop: '3:45 PM', status: 'On Time' },
  { date: '02 Mar', pickup: '7:18 AM', drop: '3:50 PM', status: 'Delayed' },
  { date: '03 Mar', pickup: '7:12 AM', drop: '3:42 PM', status: 'On Time' },
  { date: '04 Mar', pickup: '7:14 AM', drop: '3:44 PM', status: 'On Time' },
  { date: '05 Mar', pickup: '7:20 AM', drop: '3:55 PM', status: 'Delayed' },
  { date: '06 Mar', pickup: '-', drop: '-', status: 'Holiday' },
  { date: '07 Mar', pickup: '7:16 AM', drop: '3:46 PM', status: 'On Time' },
]

const healthData = {
  lastCheckup: '15 Jan 2026',
  height: '165 cm',
  weight: '52 kg',
  bmi: '19.1',
  vision: '6/6',
  bloodGroup: 'B+',
  wellnessScore: 85,
  parameters: [
    { name: 'General Health', score: 90, status: 'Good' },
    { name: 'Vision', score: 95, status: 'Excellent' },
    { name: 'Hearing', score: 88, status: 'Good' },
    { name: 'Dental', score: 75, status: 'Fair' },
    { name: 'BMI', score: 82, status: 'Good' },
    { name: 'Posture', score: 85, status: 'Good' },
  ]
}

const teachers = ['Dr. Priya Menon', 'Mr. Rajesh Kumar', 'Ms. Anita Desai', 'Mr. Suresh Patel', 'Mrs. Kavita Sharma']
const routes = ['Route 1 - Singur', 'Route 2 - Chandannagar', 'Route 3 - Hooghly', 'Route 4 - Serampore', 'Route 5 - Bansberia']

export default function ParentPortal() {
  const { darkMode } = useAppStore()
  const [activeTab, setActiveTab] = useState('overview')
  const [showForm, setShowForm] = useState(null)

  const [feePaymentForm, setFeePaymentForm] = useState({
    studentName: currentStudent.name, feeType: '', amount: '', paymentMode: 'UPI', upiId: '', cardNumber: ''
  })
  const [ptmBookingForm, setPtmBookingForm] = useState({
    teacher: '', preferredDate: '', preferredTime: '', agenda: '', mode: 'In-Person'
  })
  const [leaveRequestForm, setLeaveRequestForm] = useState({
    studentName: currentStudent.name, leaveType: 'Casual', fromDate: '', toDate: '', reason: '', parentSignature: false
  })
  const [transportChangeForm, setTransportChangeForm] = useState({
    currentRoute: 'Route 1 - Singur', requestedRoute: '', reason: '', effectiveDate: ''
  })
  const [medicalUpdateForm, setMedicalUpdateForm] = useState({
    studentName: currentStudent.name, condition: '', medication: '', doctorName: '', duration: '', notes: ''
  })
  const [feedbackForm, setFeedbackForm] = useState({
    category: 'Academic', rating: 3, comments: ''
  })

  const tooltipStyle = {
    backgroundColor: darkMode ? '#1A2D4A' : '#fff',
    border: '1px solid ' + (darkMode ? 'rgba(255,255,255,0.1)' : '#e2e8f0'),
    borderRadius: '12px', fontSize: '12px', color: darkMode ? '#e2e8f0' : '#1e293b'
  }

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'academics', label: 'Academics', icon: BookOpen },
    { id: 'fees', label: 'Fees', icon: IndianRupee },
    { id: 'transport', label: 'Transport', icon: Bus },
    { id: 'health', label: 'Health', icon: HeartPulse },
    { id: 'communication', label: 'Communication', icon: MessageSquare },
    { id: 'forms', label: 'Forms', icon: FileText },
    { id: 'reports', label: 'Reports', icon: Activity },
  ]

  const forms = [
    { id: 'feePayment', label: 'Fee Payment', icon: IndianRupee },
    { id: 'ptmBooking', label: 'PTM Booking', icon: Calendar },
    { id: 'leaveRequest', label: 'Leave Request', icon: ClipboardList },
    { id: 'transportChange', label: 'Transport Change', icon: Bus },
    { id: 'medicalUpdate', label: 'Medical Update', icon: Stethoscope },
    { id: 'feedback', label: 'Feedback', icon: MessageSquare },
  ]

  const handleSubmit = () => setShowForm(null)

  const inputClass = `w-full px-3 py-2 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-birla-cyan/30`
  const labelClass = 'block text-xs font-medium text-muted-foreground mb-1'

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="show" className="p-4 lg:p-6 space-y-6 max-w-[1600px] mx-auto">
      {/* Header */}
      <motion.div variants={itemVariants} className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <Heart className="w-7 h-7 text-birla-gold" />Parent Portal
          </h1>
          <p className="text-sm text-muted-foreground mt-1">Welcome, {parentInfo.name} &bull; Parent of {currentStudent.name}</p>
          <div className="flex flex-wrap gap-2 mt-2">
            <span className="px-2 py-0.5 rounded-lg bg-birla-blue/10 text-birla-blue dark:text-birla-cyan text-[10px] font-mono font-medium">BSP: {currentStudent.bspId}</span>
            <span className="px-2 py-0.5 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[10px] font-mono font-medium">PEN: {currentStudent.penNo}</span>
            <span className="px-2 py-0.5 rounded-lg bg-purple-500/10 text-purple-600 dark:text-purple-400 text-[10px] font-mono font-medium">UPPR: {currentStudent.upparId}</span>
          </div>
        </div>
        <div className="flex gap-1 p-1 rounded-xl bg-muted/50 border border-border overflow-x-auto">
          {tabs.map((tab) => {
            const Icon = tab.icon
            return (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[11px] font-medium whitespace-nowrap transition-all ${activeTab === tab.id ? 'gradient-birla text-white shadow-md' : 'text-muted-foreground hover:text-foreground'}`}>
                <Icon className="w-3.5 h-3.5" />{tab.label}
              </button>
            )
          })}
        </div>
      </motion.div>

      {/* Stats */}
      <motion.div variants={itemVariants} className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Fee Paid', value: '₹1,85,500', change: 'On Track', icon: IndianRupee, color: 'from-emerald-800 to-emerald-600' },
          { label: 'Attendance', value: '93%', change: '+1.8%', icon: Calendar, color: 'from-blue-900 to-blue-700' },
          { label: 'Academic Rank', value: '5th', change: '+2', icon: Award, color: 'from-amber-800 to-amber-600' },
          { label: 'Health Score', value: '85/100', change: 'Good', icon: HeartPulse, color: 'from-purple-800 to-purple-600' },
        ].map((card) => {
          const Icon = card.icon
          return (
            <div key={card.label} className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${card.color} p-4 text-white shadow-xl`}>
              <div className="absolute top-0 right-0 w-20 h-20 rounded-full bg-white/5 -translate-y-6 translate-x-6" />
              <div className="flex items-center justify-between mb-2">
                <div className="w-9 h-9 rounded-xl bg-white/15 backdrop-blur-sm flex items-center justify-center"><Icon className="w-4 h-4" /></div>
                <span className="inline-flex items-center gap-0.5 text-[10px] font-medium px-1.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-200">{card.change}</span>
              </div>
              <p className="text-xl font-bold">{card.value}</p>
              <p className="text-[11px] text-white/70 mt-0.5">{card.label}</p>
            </div>
          )
        })}
      </motion.div>

      {/* ====== OVERVIEW TAB ====== */}
      {activeTab === 'overview' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-5">
              <h3 className="text-base font-semibold text-foreground flex items-center gap-2 mb-1">
                <TrendingUp className="w-4 h-4 text-birla-cyan" />Academic Progress
              </h3>
              <p className="text-xs text-muted-foreground mb-3">Term-wise performance trend</p>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={academicProgressData}>
                    <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'} />
                    <XAxis dataKey="term" tick={{ fontSize: 10 }} stroke={darkMode ? '#64748b' : '#94a3b8'} />
                    <YAxis tick={{ fontSize: 10 }} stroke={darkMode ? '#64748b' : '#94a3b8'} domain={[50, 100]} />
                    <Tooltip contentStyle={tooltipStyle} />
                    <Legend iconType="circle" wrapperStyle={{ fontSize: '11px' }} />
                    <Area type="monotone" dataKey="Mathematics" stroke="#1A2D4A" fill="rgba(26,45,74,0.1)" strokeWidth={2} />
                    <Area type="monotone" dataKey="Science" stroke="#22D3EE" fill="rgba(34,211,238,0.08)" strokeWidth={2} />
                    <Area type="monotone" dataKey="English" stroke="#C8A45C" fill="rgba(200,164,92,0.08)" strokeWidth={2} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </motion.div>
            <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-5">
              <h3 className="text-base font-semibold text-foreground flex items-center gap-2 mb-1">
                <IndianRupee className="w-4 h-4 text-emerald-500" />Fee Status
              </h3>
              <p className="text-xs text-muted-foreground mb-3">Payment overview for 2025-26</p>
              <div className="space-y-2">
                <div className="flex justify-between items-center p-3 rounded-xl border border-border bg-muted/20">
                  <span className="text-sm text-foreground">Total Fee</span>
                  <span className="text-sm font-bold text-foreground">₹2,22,000</span>
                </div>
                <div className="flex justify-between items-center p-3 rounded-xl border border-border bg-emerald-500/5">
                  <span className="text-sm text-foreground">Paid</span>
                  <span className="text-sm font-bold text-emerald-600">₹1,85,500</span>
                </div>
                <div className="flex justify-between items-center p-3 rounded-xl border border-border bg-amber-500/5">
                  <span className="text-sm text-foreground">Pending</span>
                  <span className="text-sm font-bold text-amber-600">₹37,000</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      )}

      {/* ====== ACADEMICS TAB ====== */}
      {activeTab === 'academics' && (
        <motion.div variants={itemVariants} className="space-y-4">
          <div className="rounded-2xl border border-border bg-card p-5">
            <h3 className="text-base font-semibold text-foreground flex items-center gap-2 mb-1">
              <BookOpen className="w-4 h-4 text-birla-cyan" />Academic Overview
            </h3>
            <div className="flex items-center gap-2 mb-3">
              <Shield className="w-3 h-3 text-birla-blue dark:text-birla-cyan" />
              <span className="text-[10px] font-mono text-muted-foreground">BSP: {currentStudent.bspId} | PEN: {currentStudent.penNo} | UPPR: {currentStudent.upparId}</span>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={academicProgressData}>
                  <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'} />
                  <XAxis dataKey="term" tick={{ fontSize: 10 }} stroke={darkMode ? '#64748b' : '#94a3b8'} />
                  <YAxis tick={{ fontSize: 10 }} stroke={darkMode ? '#64748b' : '#94a3b8'} domain={[50, 100]} />
                  <Tooltip contentStyle={tooltipStyle} />
                  <Legend iconType="circle" wrapperStyle={{ fontSize: '11px' }} />
                  <Line type="monotone" dataKey="Mathematics" stroke="#1A2D4A" strokeWidth={2} name="Mathematics" dot={{ r: 3 }} />
                  <Line type="monotone" dataKey="Science" stroke="#22D3EE" strokeWidth={2} name="Science" dot={{ r: 3 }} />
                  <Line type="monotone" dataKey="English" stroke="#C8A45C" strokeWidth={2} name="English" dot={{ r: 3 }} />
                  <Line type="monotone" dataKey="Hindi" stroke="#8B5CF6" strokeWidth={2} name="Hindi" dot={{ r: 3 }} />
                  <Line type="monotone" dataKey="Social" stroke="#10B981" strokeWidth={2} name="Social Science" dot={{ r: 3 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
            {[
              { subject: 'Mathematics', score: 84, grade: 'A2' },
              { subject: 'Science', score: 80, grade: 'A2' },
              { subject: 'English', score: 85, grade: 'A1' },
              { subject: 'Hindi', score: 75, grade: 'B1' },
              { subject: 'Social Science', score: 79, grade: 'B2' },
            ].map(s => (
              <div key={s.subject} className="rounded-2xl border border-border bg-card p-4 text-center">
                <p className="text-xs text-muted-foreground">{s.subject}</p>
                <p className="text-2xl font-bold text-foreground mt-1">{s.score}%</p>
                <span className="text-xs font-medium px-2 py-0.5 rounded-lg bg-birla-gold/10 text-birla-gold">{s.grade}</span>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* ====== FEES TAB ====== */}
      {activeTab === 'fees' && (
        <motion.div variants={itemVariants} className="space-y-4">
          <div className="rounded-2xl border border-border bg-card p-5">
            <h3 className="text-base font-semibold text-foreground flex items-center gap-2 mb-3">
              <IndianRupee className="w-4 h-4 text-emerald-500" />Fee Payment History
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border bg-muted/30">
                    <th className="text-left px-3 py-2 text-[10px] font-semibold text-muted-foreground">Month</th>
                    <th className="text-left px-3 py-2 text-[10px] font-semibold text-muted-foreground">Tuition</th>
                    <th className="text-left px-3 py-2 text-[10px] font-semibold text-muted-foreground">Transport</th>
                    <th className="text-left px-3 py-2 text-[10px] font-semibold text-muted-foreground">Lab</th>
                    <th className="text-left px-3 py-2 text-[10px] font-semibold text-muted-foreground">Total</th>
                    <th className="text-left px-3 py-2 text-[10px] font-semibold text-muted-foreground">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {feePaymentHistory.map((f, i) => (
                    <tr key={i} className="border-b border-border/50 hover:bg-muted/20">
                      <td className="px-3 py-2 text-xs text-foreground">{f.month}</td>
                      <td className="px-3 py-2 text-xs text-foreground">₹{f.tuition.toLocaleString()}</td>
                      <td className="px-3 py-2 text-xs text-foreground">₹{f.transport.toLocaleString()}</td>
                      <td className="px-3 py-2 text-xs text-foreground">{f.lab ? `₹${f.lab.toLocaleString()}` : '-'}</td>
                      <td className="px-3 py-2 text-xs font-semibold text-foreground">₹{f.total.toLocaleString()}</td>
                      <td className="px-3 py-2">
                        <span className={`px-2 py-0.5 rounded-lg text-[10px] font-medium ${f.status === 'Paid' ? 'bg-emerald-500/10 text-emerald-600' : 'bg-amber-500/10 text-amber-600'}`}>{f.status}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>
      )}

      {/* ====== TRANSPORT TAB ====== */}
      {activeTab === 'transport' && (
        <motion.div variants={itemVariants} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="rounded-2xl border border-border bg-card p-4">
              <p className="text-xs text-muted-foreground">Current Route</p>
              <p className="text-sm font-semibold text-foreground mt-1">Route 1 - Singur</p>
            </div>
            <div className="rounded-2xl border border-border bg-card p-4">
              <p className="text-xs text-muted-foreground">Bus Number</p>
              <p className="text-sm font-semibold text-foreground mt-1">WB-12-AB-1234</p>
            </div>
            <div className="rounded-2xl border border-border bg-card p-4">
              <p className="text-xs text-muted-foreground">Driver Contact</p>
              <p className="text-sm font-semibold text-foreground mt-1">+91 87654 32109</p>
            </div>
          </div>
          <div className="rounded-2xl border border-border bg-card p-5">
            <h3 className="text-base font-semibold text-foreground flex items-center gap-2 mb-3">
              <Navigation className="w-4 h-4 text-birla-cyan" />Pickup/Drop Log
            </h3>
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {transportRouteData.map((t, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-xl border border-border bg-muted/20">
                  <span className="text-xs font-medium text-foreground w-20">{t.date}</span>
                  <span className="text-xs text-muted-foreground">🚐 {t.pickup} → {t.drop}</span>
                  <span className={`px-2 py-0.5 rounded-lg text-[10px] font-medium ${t.status === 'On Time' ? 'bg-emerald-500/10 text-emerald-600' : t.status === 'Delayed' ? 'bg-amber-500/10 text-amber-600' : 'bg-muted text-muted-foreground'}`}>{t.status}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* ====== HEALTH TAB ====== */}
      {activeTab === 'health' && (
        <motion.div variants={itemVariants} className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { label: 'Blood Group', value: healthData.bloodGroup },
              { label: 'BMI', value: healthData.bmi },
              { label: 'Vision', value: healthData.vision },
              { label: 'Last Checkup', value: healthData.lastCheckup },
            ].map(h => (
              <div key={h.label} className="rounded-2xl border border-border bg-card p-4 text-center">
                <p className="text-[10px] text-muted-foreground">{h.label}</p>
                <p className="text-sm font-bold text-foreground mt-1">{h.value}</p>
              </div>
            ))}
          </div>
          <div className="rounded-2xl border border-border bg-card p-5">
            <h3 className="text-base font-semibold text-foreground flex items-center gap-2 mb-3">
              <HeartPulse className="w-4 h-4 text-red-500" />Health Parameters
            </h3>
            <div className="space-y-3">
              {healthData.parameters.map(p => (
                <div key={p.name}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-muted-foreground">{p.name}</span>
                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] font-medium ${p.status === 'Excellent' ? 'text-emerald-600' : p.status === 'Good' ? 'text-blue-600' : 'text-amber-600'}`}>{p.status}</span>
                      <span className="text-xs font-semibold text-foreground">{p.score}%</span>
                    </div>
                  </div>
                  <div className="h-2 rounded-full bg-muted overflow-hidden">
                    <div className="h-full rounded-full" style={{ width: `${p.score}%`, background: p.score >= 85 ? 'linear-gradient(90deg, #10B981, #22D3EE)' : p.score >= 70 ? 'linear-gradient(90deg, #C8A45C, #E8D5A0)' : 'linear-gradient(90deg, #EF4444, #F59E0B)' }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* ====== COMMUNICATION TAB ====== */}
      {activeTab === 'communication' && (
        <motion.div variants={itemVariants} className="space-y-4">
          <div className="rounded-2xl border border-border bg-card p-5">
            <h3 className="text-base font-semibold text-foreground flex items-center gap-2 mb-3">
              <MessageSquare className="w-4 h-4 text-birla-cyan" />Messages from School
            </h3>
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {[
                { title: 'Annual Day Celebration', message: 'Annual Day will be held on 25th March 2026. All parents are invited.', date: '10 Mar 2026', type: 'Event' },
                { title: 'Fee Reminder', message: 'Fee for Feb and Mar 2026 is pending. Please pay before 20th March.', date: '08 Mar 2026', type: 'Fee' },
                { title: 'Parent-Teacher Meeting', message: 'PTM scheduled for 15th March 2026 from 9 AM to 1 PM.', date: '05 Mar 2026', type: 'PTM' },
                { title: 'Sports Day', message: 'Sports Day on 20th March 2026. Students should report at 8 AM.', date: '01 Mar 2026', type: 'Event' },
                { title: 'Holiday Notice', message: 'School will remain closed on 14th March (Holi).', date: '28 Feb 2026', type: 'Holiday' },
              ].map((msg, i) => (
                <div key={i} className="p-3 rounded-xl border border-border bg-muted/20 hover:bg-muted/40 transition-colors">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-foreground">{msg.title}</span>
                    <span className="text-[10px] text-muted-foreground">{msg.date}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">{msg.message}</p>
                  <span className="inline-block mt-1 px-2 py-0.5 rounded-lg bg-birla-cyan/10 text-birla-cyan text-[10px] font-medium">{msg.type}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* ====== FORMS TAB ====== */}
      {activeTab === 'forms' && (
        <div className="space-y-4">
          <motion.div variants={itemVariants} className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {forms.map((form) => {
              const Icon = form.icon
              return (
                <button key={form.id} onClick={() => setShowForm(form.id)}
                  className={`flex flex-col items-center gap-2 p-4 rounded-2xl border border-border hover:border-birla-gold/30 hover:shadow-lg transition-all group ${showForm === form.id ? 'border-birla-gold/50 shadow-lg bg-birla-gold/5' : ''}`}>
                  <div className="w-10 h-10 rounded-xl bg-birla-blue/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Icon className="w-5 h-5 text-birla-blue dark:text-birla-cyan" />
                  </div>
                  <span className="text-[11px] text-muted-foreground group-hover:text-foreground text-center">{form.label}</span>
                </button>
              )
            })}
          </motion.div>

          {/* Fee Payment Form */}
          {showForm === 'feePayment' && (
            <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-semibold text-foreground flex items-center gap-2">
                  <IndianRupee className="w-5 h-5 text-emerald-500" />Fee Payment Form
                </h3>
                <button onClick={() => setShowForm(null)} className="w-8 h-8 rounded-lg border border-border flex items-center justify-center hover:bg-muted/50"><X className="w-4 h-4" /></button>
              </div>
              <div className="flex flex-wrap gap-2 mb-4 p-2 rounded-xl bg-muted/20">
                <span className="px-2 py-0.5 rounded-lg bg-birla-blue/10 text-birla-blue dark:text-birla-cyan text-[10px] font-mono">BSP: {currentStudent.bspId}</span>
                <span className="px-2 py-0.5 rounded-lg bg-emerald-500/10 text-emerald-600 text-[10px] font-mono">PEN: {currentStudent.penNo}</span>
                <span className="px-2 py-0.5 rounded-lg bg-purple-500/10 text-purple-600 text-[10px] font-mono">UPPR: {currentStudent.upparId}</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>Student Name *</label>
                  <input type="text" value={feePaymentForm.studentName} onChange={(e) => setFeePaymentForm({...feePaymentForm, studentName: e.target.value})} className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Fee Type *</label>
                  <select value={feePaymentForm.feeType} onChange={(e) => setFeePaymentForm({...feePaymentForm, feeType: e.target.value})} className={inputClass}>
                    <option value="">Select Fee Type</option>
                    <option value="Tuition">Tuition Fee</option>
                    <option value="Transport">Transport Fee</option>
                    <option value="Lab">Lab Fee</option>
                    <option value="Exam">Exam Fee</option>
                    <option value="Library">Library Fee</option>
                    <option value="Sports">Sports Fee</option>
                  </select>
                </div>
                <div>
                  <label className={labelClass}>Amount (₹) *</label>
                  <input type="number" value={feePaymentForm.amount} onChange={(e) => setFeePaymentForm({...feePaymentForm, amount: e.target.value})} className={inputClass} placeholder="Enter amount" />
                </div>
                <div>
                  <label className={labelClass}>Payment Mode *</label>
                  <select value={feePaymentForm.paymentMode} onChange={(e) => setFeePaymentForm({...feePaymentForm, paymentMode: e.target.value})} className={inputClass}>
                    <option value="UPI">UPI</option>
                    <option value="Card">Card</option>
                    <option value="NetBanking">Net Banking</option>
                    <option value="Cash">Cash</option>
                  </select>
                </div>
                {(feePaymentForm.paymentMode === 'UPI') && (
                  <div>
                    <label className={labelClass}>UPI ID</label>
                    <input type="text" value={feePaymentForm.upiId} onChange={(e) => setFeePaymentForm({...feePaymentForm, upiId: e.target.value})} className={inputClass} placeholder="yourname@upi" />
                  </div>
                )}
                {(feePaymentForm.paymentMode === 'Card') && (
                  <div>
                    <label className={labelClass}>Card Number (last 4 digits)</label>
                    <input type="text" value={feePaymentForm.cardNumber} onChange={(e) => setFeePaymentForm({...feePaymentForm, cardNumber: e.target.value})} className={inputClass} placeholder="XXXX" maxLength={4} />
                  </div>
                )}
              </div>
              <div className="flex justify-end gap-3 mt-4">
                <button onClick={() => setShowForm(null)} className="px-4 py-2 rounded-xl border border-border text-sm text-muted-foreground hover:bg-muted/50">Cancel</button>
                <button onClick={handleSubmit} className="px-4 py-2 rounded-xl gradient-birla text-white text-sm font-medium hover:shadow-lg transition-all">Pay Now</button>
              </div>
            </motion.div>
          )}

          {/* PTM Booking Form */}
          {showForm === 'ptmBooking' && (
            <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-semibold text-foreground flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-birla-gold" />PTM Booking Form
                </h3>
                <button onClick={() => setShowForm(null)} className="w-8 h-8 rounded-lg border border-border flex items-center justify-center hover:bg-muted/50"><X className="w-4 h-4" /></button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>Teacher *</label>
                  <select value={ptmBookingForm.teacher} onChange={(e) => setPtmBookingForm({...ptmBookingForm, teacher: e.target.value})} className={inputClass}>
                    <option value="">Select Teacher</option>
                    {teachers.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
                <div>
                  <label className={labelClass}>Preferred Date *</label>
                  <input type="date" value={ptmBookingForm.preferredDate} onChange={(e) => setPtmBookingForm({...ptmBookingForm, preferredDate: e.target.value})} className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Preferred Time *</label>
                  <input type="time" value={ptmBookingForm.preferredTime} onChange={(e) => setPtmBookingForm({...ptmBookingForm, preferredTime: e.target.value})} className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Mode *</label>
                  <select value={ptmBookingForm.mode} onChange={(e) => setPtmBookingForm({...ptmBookingForm, mode: e.target.value})} className={inputClass}>
                    <option value="In-Person">In-Person</option>
                    <option value="Online">Online</option>
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className={labelClass}>Agenda</label>
                  <textarea value={ptmBookingForm.agenda} onChange={(e) => setPtmBookingForm({...ptmBookingForm, agenda: e.target.value})} rows={3} className={inputClass + ' resize-none'} placeholder="Topics you'd like to discuss..." />
                </div>
              </div>
              <div className="flex justify-end gap-3 mt-4">
                <button onClick={() => setShowForm(null)} className="px-4 py-2 rounded-xl border border-border text-sm text-muted-foreground hover:bg-muted/50">Cancel</button>
                <button onClick={handleSubmit} className="px-4 py-2 rounded-xl gradient-birla text-white text-sm font-medium hover:shadow-lg transition-all">Book PTM</button>
              </div>
            </motion.div>
          )}

          {/* Leave Request Form */}
          {showForm === 'leaveRequest' && (
            <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-semibold text-foreground flex items-center gap-2">
                  <ClipboardList className="w-5 h-5 text-purple-500" />Leave Request Form
                </h3>
                <button onClick={() => setShowForm(null)} className="w-8 h-8 rounded-lg border border-border flex items-center justify-center hover:bg-muted/50"><X className="w-4 h-4" /></button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>Student Name *</label>
                  <input type="text" value={leaveRequestForm.studentName} onChange={(e) => setLeaveRequestForm({...leaveRequestForm, studentName: e.target.value})} className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Leave Type *</label>
                  <select value={leaveRequestForm.leaveType} onChange={(e) => setLeaveRequestForm({...leaveRequestForm, leaveType: e.target.value})} className={inputClass}>
                    <option value="Casual">Casual Leave</option>
                    <option value="Sick">Sick Leave</option>
                    <option value="Emergency">Emergency Leave</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label className={labelClass}>From Date *</label>
                  <input type="date" value={leaveRequestForm.fromDate} onChange={(e) => setLeaveRequestForm({...leaveRequestForm, fromDate: e.target.value})} className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>To Date *</label>
                  <input type="date" value={leaveRequestForm.toDate} onChange={(e) => setLeaveRequestForm({...leaveRequestForm, toDate: e.target.value})} className={inputClass} />
                </div>
                <div className="md:col-span-2">
                  <label className={labelClass}>Reason *</label>
                  <textarea value={leaveRequestForm.reason} onChange={(e) => setLeaveRequestForm({...leaveRequestForm, reason: e.target.value})} rows={3} className={inputClass + ' resize-none'} placeholder="Reason for leave..." />
                </div>
                <div className="md:col-span-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" checked={leaveRequestForm.parentSignature} onChange={(e) => setLeaveRequestForm({...leaveRequestForm, parentSignature: e.target.checked})} className="w-4 h-4 rounded accent-[#C8A45C]" />
                    <span className="text-xs text-muted-foreground">I, {parentInfo.name}, approve this leave request</span>
                  </label>
                </div>
              </div>
              <div className="flex justify-end gap-3 mt-4">
                <button onClick={() => setShowForm(null)} className="px-4 py-2 rounded-xl border border-border text-sm text-muted-foreground hover:bg-muted/50">Cancel</button>
                <button onClick={handleSubmit} className="px-4 py-2 rounded-xl gradient-birla text-white text-sm font-medium hover:shadow-lg transition-all">Submit Request</button>
              </div>
            </motion.div>
          )}

          {/* Transport Change Request Form */}
          {showForm === 'transportChange' && (
            <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-semibold text-foreground flex items-center gap-2">
                  <Bus className="w-5 h-5 text-birla-cyan" />Transport Change Request Form
                </h3>
                <button onClick={() => setShowForm(null)} className="w-8 h-8 rounded-lg border border-border flex items-center justify-center hover:bg-muted/50"><X className="w-4 h-4" /></button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>Current Route</label>
                  <input type="text" value={transportChangeForm.currentRoute} onChange={(e) => setTransportChangeForm({...transportChangeForm, currentRoute: e.target.value})} className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Requested Route *</label>
                  <select value={transportChangeForm.requestedRoute} onChange={(e) => setTransportChangeForm({...transportChangeForm, requestedRoute: e.target.value})} className={inputClass}>
                    <option value="">Select Route</option>
                    {routes.map(r => <option key={r} value={r}>{r}</option>)}
                  </select>
                </div>
                <div>
                  <label className={labelClass}>Effective Date *</label>
                  <input type="date" value={transportChangeForm.effectiveDate} onChange={(e) => setTransportChangeForm({...transportChangeForm, effectiveDate: e.target.value})} className={inputClass} />
                </div>
                <div className="md:col-span-2">
                  <label className={labelClass}>Reason *</label>
                  <textarea value={transportChangeForm.reason} onChange={(e) => setTransportChangeForm({...transportChangeForm, reason: e.target.value})} rows={3} className={inputClass + ' resize-none'} placeholder="Reason for route change..." />
                </div>
              </div>
              <div className="flex justify-end gap-3 mt-4">
                <button onClick={() => setShowForm(null)} className="px-4 py-2 rounded-xl border border-border text-sm text-muted-foreground hover:bg-muted/50">Cancel</button>
                <button onClick={handleSubmit} className="px-4 py-2 rounded-xl gradient-birla text-white text-sm font-medium hover:shadow-lg transition-all">Submit Request</button>
              </div>
            </motion.div>
          )}

          {/* Medical Update Form */}
          {showForm === 'medicalUpdate' && (
            <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-semibold text-foreground flex items-center gap-2">
                  <Stethoscope className="w-5 h-5 text-red-500" />Medical Update Form
                </h3>
                <button onClick={() => setShowForm(null)} className="w-8 h-8 rounded-lg border border-border flex items-center justify-center hover:bg-muted/50"><X className="w-4 h-4" /></button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>Student Name *</label>
                  <input type="text" value={medicalUpdateForm.studentName} onChange={(e) => setMedicalUpdateForm({...medicalUpdateForm, studentName: e.target.value})} className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Condition *</label>
                  <input type="text" value={medicalUpdateForm.condition} onChange={(e) => setMedicalUpdateForm({...medicalUpdateForm, condition: e.target.value})} className={inputClass} placeholder="e.g., Asthma, Allergies" />
                </div>
                <div>
                  <label className={labelClass}>Medication</label>
                  <input type="text" value={medicalUpdateForm.medication} onChange={(e) => setMedicalUpdateForm({...medicalUpdateForm, medication: e.target.value})} className={inputClass} placeholder="Current medication details" />
                </div>
                <div>
                  <label className={labelClass}>Doctor Name</label>
                  <input type="text" value={medicalUpdateForm.doctorName} onChange={(e) => setMedicalUpdateForm({...medicalUpdateForm, doctorName: e.target.value})} className={inputClass} placeholder="Attending doctor" />
                </div>
                <div>
                  <label className={labelClass}>Duration</label>
                  <input type="text" value={medicalUpdateForm.duration} onChange={(e) => setMedicalUpdateForm({...medicalUpdateForm, duration: e.target.value})} className={inputClass} placeholder="e.g., 2 weeks" />
                </div>
                <div className="md:col-span-2">
                  <label className={labelClass}>Additional Notes</label>
                  <textarea value={medicalUpdateForm.notes} onChange={(e) => setMedicalUpdateForm({...medicalUpdateForm, notes: e.target.value})} rows={3} className={inputClass + ' resize-none'} placeholder="Any additional medical information..." />
                </div>
              </div>
              <div className="flex justify-end gap-3 mt-4">
                <button onClick={() => setShowForm(null)} className="px-4 py-2 rounded-xl border border-border text-sm text-muted-foreground hover:bg-muted/50">Cancel</button>
                <button onClick={handleSubmit} className="px-4 py-2 rounded-xl gradient-birla text-white text-sm font-medium hover:shadow-lg transition-all">Update Medical Info</button>
              </div>
            </motion.div>
          )}

          {/* Feedback Form */}
          {showForm === 'feedback' && (
            <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-semibold text-foreground flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-birla-gold" />Feedback Form
                </h3>
                <button onClick={() => setShowForm(null)} className="w-8 h-8 rounded-lg border border-border flex items-center justify-center hover:bg-muted/50"><X className="w-4 h-4" /></button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>Category *</label>
                  <select value={feedbackForm.category} onChange={(e) => setFeedbackForm({...feedbackForm, category: e.target.value})} className={inputClass}>
                    <option value="Academic">Academic</option>
                    <option value="Infrastructure">Infrastructure</option>
                    <option value="Transport">Transport</option>
                    <option value="Food">Food</option>
                    <option value="Safety">Safety</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label className={labelClass}>Rating (1-5) *</label>
                  <div className="flex gap-2 mt-1">
                    {[1,2,3,4,5].map(r => (
                      <button key={r} onClick={() => setFeedbackForm({...feedbackForm, rating: r})}
                        className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold transition-all ${feedbackForm.rating >= r ? 'bg-birla-gold text-white' : 'border border-border text-muted-foreground hover:border-birla-gold/30'}`}>
                        {r}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="md:col-span-2">
                  <label className={labelClass}>Comments</label>
                  <textarea value={feedbackForm.comments} onChange={(e) => setFeedbackForm({...feedbackForm, comments: e.target.value})} rows={3} className={inputClass + ' resize-none'} placeholder="Share your feedback..." />
                </div>
              </div>
              <div className="flex justify-end gap-3 mt-4">
                <button onClick={() => setShowForm(null)} className="px-4 py-2 rounded-xl border border-border text-sm text-muted-foreground hover:bg-muted/50">Cancel</button>
                <button onClick={handleSubmit} className="px-4 py-2 rounded-xl gradient-birla text-white text-sm font-medium hover:shadow-lg transition-all">Submit Feedback</button>
              </div>
            </motion.div>
          )}

          {!showForm && (
            <motion.div variants={itemVariants} className="flex flex-col items-center justify-center py-16 text-center">
              <div className="w-16 h-16 rounded-2xl gradient-birla flex items-center justify-center mb-4"><Plus className="w-8 h-8 text-white" /></div>
              <h3 className="text-lg font-semibold text-foreground mb-1">Select a Form</h3>
              <p className="text-sm text-muted-foreground">Choose a form from above to start</p>
            </motion.div>
          )}
        </div>
      )}

      {/* ====== REPORTS TAB ====== */}
      {activeTab === 'reports' && (
        <div className="space-y-4">
          {/* 1. Fee Payment History Report */}
          <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-5">
            <div className="flex items-center gap-2 mb-1">
              <Shield className="w-4 h-4 text-birla-blue dark:text-birla-cyan" />
              <span className="text-xs font-mono text-muted-foreground">BSP: {currentStudent.bspId} | PEN: {currentStudent.penNo} | UPPR: {currentStudent.upparId}</span>
            </div>
            <h3 className="text-base font-semibold text-foreground flex items-center gap-2 mb-1">
              <IndianRupee className="w-4 h-4 text-emerald-500" />Fee Payment History Report
            </h3>
            <p className="text-xs text-muted-foreground mb-3">Monthly payment tracking</p>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={monthlyPaymentData}>
                  <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'} />
                  <XAxis dataKey="month" tick={{ fontSize: 10 }} stroke={darkMode ? '#64748b' : '#94a3b8'} />
                  <YAxis tick={{ fontSize: 10 }} stroke={darkMode ? '#64748b' : '#94a3b8'} />
                  <Tooltip contentStyle={tooltipStyle} />
                  <Area type="monotone" dataKey="amount" stroke="#10B981" fill="rgba(16,185,129,0.12)" strokeWidth={2} name="Amount (₹)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* 2. Academic Progress Report */}
            <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-5">
              <h3 className="text-base font-semibold text-foreground flex items-center gap-2 mb-1">
                <TrendingUp className="w-4 h-4 text-birla-cyan" />Academic Progress Report
              </h3>
              <p className="text-xs text-muted-foreground mb-3">Term-wise subject grades</p>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={academicProgressData}>
                    <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'} />
                    <XAxis dataKey="term" tick={{ fontSize: 10 }} stroke={darkMode ? '#64748b' : '#94a3b8'} />
                    <YAxis tick={{ fontSize: 10 }} stroke={darkMode ? '#64748b' : '#94a3b8'} domain={[50, 100]} />
                    <Tooltip contentStyle={tooltipStyle} />
                    <Legend iconType="circle" wrapperStyle={{ fontSize: '10px' }} />
                    <Line type="monotone" dataKey="Mathematics" stroke="#1A2D4A" strokeWidth={2} dot={{ r: 3 }} />
                    <Line type="monotone" dataKey="Science" stroke="#22D3EE" strokeWidth={2} dot={{ r: 3 }} />
                    <Line type="monotone" dataKey="English" stroke="#C8A45C" strokeWidth={2} dot={{ r: 3 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </motion.div>

            {/* 3. Attendance Summary Report */}
            <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-5">
              <h3 className="text-base font-semibold text-foreground flex items-center gap-2 mb-1">
                <Calendar className="w-4 h-4 text-emerald-500" />Attendance Summary Report
              </h3>
              <p className="text-xs text-muted-foreground mb-3">Yearly attendance breakdown</p>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={attendanceData} cx="50%" cy="50%" innerRadius={50} outerRadius={85} paddingAngle={3} dataKey="value">
                      {attendanceData.map((entry, idx) => <Cell key={idx} fill={entry.color} />)}
                    </Pie>
                    <Tooltip contentStyle={tooltipStyle} />
                    <Legend iconType="circle" wrapperStyle={{ fontSize: '10px' }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </motion.div>
          </div>

          {/* 4. Transport Usage Report */}
          <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-5">
            <h3 className="text-base font-semibold text-foreground flex items-center gap-2 mb-1">
              <Bus className="w-4 h-4 text-birla-cyan" />Transport Usage Report
            </h3>
            <p className="text-xs text-muted-foreground mb-3">Route usage and pickup/drop logs</p>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border bg-muted/30">
                    <th className="text-left px-3 py-2 text-[10px] font-semibold text-muted-foreground">Date</th>
                    <th className="text-left px-3 py-2 text-[10px] font-semibold text-muted-foreground">Pickup</th>
                    <th className="text-left px-3 py-2 text-[10px] font-semibold text-muted-foreground">Drop</th>
                    <th className="text-left px-3 py-2 text-[10px] font-semibold text-muted-foreground">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {transportRouteData.map((t, i) => (
                    <tr key={i} className="border-b border-border/50 hover:bg-muted/20">
                      <td className="px-3 py-2 text-xs text-foreground">{t.date}</td>
                      <td className="px-3 py-2 text-xs text-foreground">{t.pickup}</td>
                      <td className="px-3 py-2 text-xs text-foreground">{t.drop}</td>
                      <td className="px-3 py-2">
                        <span className={`px-2 py-0.5 rounded-lg text-[10px] font-medium ${t.status === 'On Time' ? 'bg-emerald-500/10 text-emerald-600' : t.status === 'Delayed' ? 'bg-amber-500/10 text-amber-600' : 'bg-muted text-muted-foreground'}`}>{t.status}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>

          {/* 5. Health Checkup Report */}
          <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-5">
            <h3 className="text-base font-semibold text-foreground flex items-center gap-2 mb-1">
              <HeartPulse className="w-4 h-4 text-red-500" />Health Checkup Report
            </h3>
            <p className="text-xs text-muted-foreground mb-3">Wellness score: {healthData.wellnessScore}/100</p>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border bg-muted/30">
                    <th className="text-left px-3 py-2 text-[10px] font-semibold text-muted-foreground">Parameter</th>
                    <th className="text-left px-3 py-2 text-[10px] font-semibold text-muted-foreground">Score</th>
                    <th className="text-left px-3 py-2 text-[10px] font-semibold text-muted-foreground">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {healthData.parameters.map((p, i) => (
                    <tr key={i} className="border-b border-border/50 hover:bg-muted/20">
                      <td className="px-3 py-2 text-xs text-foreground">{p.name}</td>
                      <td className="px-3 py-2 text-xs font-semibold text-foreground">{p.score}%</td>
                      <td className="px-3 py-2">
                        <span className={`px-2 py-0.5 rounded-lg text-[10px] font-medium ${p.status === 'Excellent' ? 'bg-emerald-500/10 text-emerald-600' : p.status === 'Good' ? 'bg-blue-500/10 text-blue-600' : 'bg-amber-500/10 text-amber-600'}`}>{p.status}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>
      )}
    </motion.div>
  )
}
