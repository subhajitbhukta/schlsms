'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Users, UserCheck, IndianRupee, Briefcase, TrendingUp, TrendingDown,
  GraduationCap, BookOpen, Calendar, Clock, AlertTriangle, CheckCircle2,
  BarChart3, PieChart as PieChartIcon, Activity, Shield, FileText,
  ArrowUpRight, ArrowDownRight, Download, Eye, Bell, Star,
  Building2, Bus, HeartPulse, CreditCard, Sparkles, ChevronRight,
  School, Award, Target, Zap, Globe, ClipboardCheck
} from 'lucide-react'
import {
  BarChart, Bar, AreaChart, Area, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts'
import useAppStore from '@/store/useAppStore'

// ─── Data ────────────────────────────────────────────────────────
const statsCards = [
  { label: 'Total Students', value: '2,547', change: '+12.3%', up: true, icon: Users, gradient: 'from-blue-900 to-blue-700', glow: 'shadow-blue-900/20' },
  { label: 'Attendance Rate', value: '94.2%', change: '+2.1%', up: true, icon: UserCheck, gradient: 'from-emerald-800 to-emerald-600', glow: 'shadow-emerald-800/20' },
  { label: 'Fee Collection', value: '₹45.8L', change: '+8.7%', up: true, icon: IndianRupee, gradient: 'from-amber-800 to-amber-600', glow: 'shadow-amber-800/20' },
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

const attendanceData = [
  { day: 'Mon', present: 94, absent: 6 },
  { day: 'Tue', present: 95, absent: 5 },
  { day: 'Wed', present: 93, absent: 7 },
  { day: 'Thu', present: 96, absent: 4 },
  { day: 'Fri', present: 92, absent: 8 },
  { day: 'Sat', present: 88, absent: 12 },
]

const admissionFunnelData = [
  { name: 'Applications', value: 1200, color: '#1A2D4A' },
  { name: 'Screened', value: 850, color: '#142240' },
  { name: 'Interviewed', value: 520, color: '#0E4D6E' },
  { name: 'Admitted', value: 347, color: '#C8A45C' },
  { name: 'Enrolled', value: 310, color: '#22D3EE' },
]

const nepComplianceData = [
  { name: 'Foundational Literacy', progress: 88 },
  { name: 'Multilingual Education', progress: 75 },
  { name: 'Competency-Based Assessment', progress: 82 },
  { name: 'Holistic Progress Card', progress: 90 },
  { name: 'Vocational Integration', progress: 65 },
  { name: 'Digital Infrastructure', progress: 95 },
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
  { label: 'Admission', icon: GraduationCap, color: 'bg-blue-500/10 text-blue-600 dark:text-blue-400' },
  { label: 'Fee Entry', icon: IndianRupee, color: 'bg-amber-500/10 text-amber-600 dark:text-amber-400' },
  { label: 'Attendance', icon: UserCheck, color: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' },
  { label: 'Timetable', icon: Calendar, color: 'bg-purple-500/10 text-purple-600 dark:text-purple-400' },
  { label: 'Exam Entry', icon: FileText, color: 'bg-red-500/10 text-red-600 dark:text-red-400' },
  { label: 'Reports', icon: BarChart3, color: 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400' },
  { label: 'Transport', icon: Bus, color: 'bg-orange-500/10 text-orange-600 dark:text-orange-400' },
  { label: 'ID Cards', icon: CreditCard, color: 'bg-pink-500/10 text-pink-600 dark:text-pink-400' },
]

const cbseAssessmentData = [
  { subject: 'Mathematics', internal: 78, board: 82, practical: 85 },
  { subject: 'Science', internal: 75, board: 79, practical: 88 },
  { subject: 'English', internal: 82, board: 76, practical: 0 },
  { subject: 'Hindi', internal: 70, board: 74, practical: 0 },
  { subject: 'Social Science', internal: 72, board: 77, practical: 0 },
]

const performanceIndicators = [
  { label: 'Academic Excellence', score: 87, trend: 'up', color: '#22D3EE' },
  { label: 'Student Satisfaction', score: 92, trend: 'up', color: '#C8A45C' },
  { label: 'Teacher Performance', score: 84, trend: 'up', color: '#10B981' },
  { label: 'Infrastructure Rating', score: 78, trend: 'down', color: '#F59E0B' },
  { label: 'Parent Engagement', score: 91, trend: 'up', color: '#8B5CF6' },
  { label: 'Safety Compliance', score: 96, trend: 'up', color: '#EF4444' },
]

// ─── Animation variants ──────────────────────────────────────────
const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.06 } },
}
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
}

const CHART_COLORS = ['#1A2D4A', '#22D3EE', '#C8A45C', '#8B5CF6', '#10B981']

export default function SchoolAdminDashboard() {
  const { darkMode } = useAppStore()
  const [chartTab, setChartTab] = useState('strength')

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="p-4 lg:p-6 space-y-6 max-w-[1600px] mx-auto"
    >
      {/* ─── Top Stats ────────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statsCards.map((card, i) => {
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

      {/* ─── Charts Row ──────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Student Strength Analytics */}
        <motion.div variants={itemVariants} className="lg:col-span-2 rounded-2xl border border-border bg-card p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-semibold text-foreground flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-birla-cyan" />
                Student Strength Analytics
              </h3>
              <p className="text-xs text-muted-foreground mt-0.5">Class-wise enrollment (Nursery to XII)</p>
            </div>
            <div className="flex gap-1">
              {['strength', 'fee', 'attendance'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setChartTab(tab)}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-all capitalize ${
                    chartTab === tab
                      ? 'bg-birla-blue text-white'
                      : 'text-muted-foreground hover:bg-muted'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              {chartTab === 'strength' ? (
                <BarChart data={studentStrengthData} barGap={2}>
                  <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'} />
                  <XAxis dataKey="class" tick={{ fontSize: 10 }} stroke={darkMode ? '#64748b' : '#94a3b8'} />
                  <YAxis tick={{ fontSize: 10 }} stroke={darkMode ? '#64748b' : '#94a3b8'} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: darkMode ? '#1A2D4A' : '#fff',
                      border: `1px solid ${darkMode ? 'rgba(255,255,255,0.1)' : '#e2e8f0'}`,
                      borderRadius: '12px',
                      fontSize: '12px',
                      color: darkMode ? '#e2e8f0' : '#1e293b',
                    }}
                  />
                  <Legend iconType="circle" wrapperStyle={{ fontSize: '11px' }} />
                  <Bar dataKey="boys" fill="#1A2D4A" radius={[4, 4, 0, 0]} name="Boys" />
                  <Bar dataKey="girls" fill="#22D3EE" radius={[4, 4, 0, 0]} name="Girls" />
                </BarChart>
              ) : chartTab === 'fee' ? (
                <AreaChart data={feeCollectionData}>
                  <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'} />
                  <XAxis dataKey="month" tick={{ fontSize: 10 }} stroke={darkMode ? '#64748b' : '#94a3b8'} />
                  <YAxis tick={{ fontSize: 10 }} stroke={darkMode ? '#64748b' : '#94a3b8'} tickFormatter={(v) => `₹${v}L`} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: darkMode ? '#1A2D4A' : '#fff',
                      border: `1px solid ${darkMode ? 'rgba(255,255,255,0.1)' : '#e2e8f0'}`,
                      borderRadius: '12px',
                      fontSize: '12px',
                      color: darkMode ? '#e2e8f0' : '#1e293b',
                    }}
                    formatter={(value) => [`₹${value}L`, '']}
                  />
                  <Legend iconType="circle" wrapperStyle={{ fontSize: '11px' }} />
                  <Area type="monotone" dataKey="collected" stroke="#C8A45C" fill="rgba(200,164,92,0.15)" strokeWidth={2} name="Collected" />
                  <Area type="monotone" dataKey="pending" stroke="#EF4444" fill="rgba(239,68,68,0.08)" strokeWidth={2} name="Pending" />
                  <Area type="monotone" dataKey="target" stroke="#22D3EE" fill="rgba(34,211,238,0.08)" strokeWidth={2} strokeDasharray="5 5" name="Target" />
                </AreaChart>
              ) : (
                <LineChart data={attendanceData}>
                  <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'} />
                  <XAxis dataKey="day" tick={{ fontSize: 10 }} stroke={darkMode ? '#64748b' : '#94a3b8'} />
                  <YAxis tick={{ fontSize: 10 }} stroke={darkMode ? '#64748b' : '#94a3b8'} tickFormatter={(v) => `${v}%`} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: darkMode ? '#1A2D4A' : '#fff',
                      border: `1px solid ${darkMode ? 'rgba(255,255,255,0.1)' : '#e2e8f0'}`,
                      borderRadius: '12px',
                      fontSize: '12px',
                      color: darkMode ? '#e2e8f0' : '#1e293b',
                    }}
                    formatter={(value) => [`${value}%`, '']}
                  />
                  <Legend iconType="circle" wrapperStyle={{ fontSize: '11px' }} />
                  <Line type="monotone" dataKey="present" stroke="#10B981" strokeWidth={2.5} dot={{ r: 4, fill: '#10B981' }} name="Present %" />
                  <Line type="monotone" dataKey="absent" stroke="#EF4444" strokeWidth={2.5} dot={{ r: 4, fill: '#EF4444' }} name="Absent %" />
                </LineChart>
              )}
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Admission Funnel */}
        <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-5">
          <h3 className="text-base font-semibold text-foreground flex items-center gap-2 mb-1">
            <PieChartIcon className="w-4 h-4 text-birla-gold" />
            Admission Funnel
          </h3>
          <p className="text-xs text-muted-foreground mb-3">AY 2025-26 Conversion Rate</p>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={admissionFunnelData}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={85}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {admissionFunnelData.map((entry, idx) => (
                    <Cell key={idx} fill={entry.color} stroke="none" />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: darkMode ? '#1A2D4A' : '#fff',
                    border: `1px solid ${darkMode ? 'rgba(255,255,255,0.1)' : '#e2e8f0'}`,
                    borderRadius: '12px',
                    fontSize: '12px',
                    color: darkMode ? '#e2e8f0' : '#1e293b',
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-1.5 mt-2">
            {admissionFunnelData.map((item) => (
              <div key={item.name} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-muted-foreground">{item.name}</span>
                </div>
                <span className="font-semibold text-foreground">{item.value.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* ─── NEP 2020 + UDISE+ Row ───────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* NEP 2020 Compliance */}
        <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-semibold text-foreground flex items-center gap-2">
              <Shield className="w-4 h-4 text-emerald-500" />
              NEP 2020 Compliance
            </h3>
            <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-medium">
              82.5% Compliant
            </span>
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

        {/* UDISE+ Reporting */}
        <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-semibold text-foreground flex items-center gap-2">
              <Globe className="w-4 h-4 text-birla-cyan" />
              UDISE+ Reporting Status
            </h3>
            <span className="text-xs px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 font-medium">
              FY 2025-26
            </span>
          </div>
          <div className="grid grid-cols-2 gap-3 mb-4">
            {[
              { label: 'Data Upload', status: 'Complete', icon: CheckCircle2, color: 'text-emerald-500' },
              { label: 'Verification', status: 'In Progress', icon: Clock, color: 'text-amber-500' },
              { label: 'Validation', status: 'Pending', icon: AlertTriangle, color: 'text-red-500' },
              { label: 'Submission', status: 'Locked', icon: Shield, color: 'text-blue-500' },
            ].map((item) => {
              const Icon = item.icon
              return (
                <div key={item.label} className="p-3 rounded-xl border border-border bg-muted/30 flex items-center gap-3">
                  <Icon className={`w-5 h-5 ${item.color}`} />
                  <div>
                    <p className="text-xs text-muted-foreground">{item.label}</p>
                    <p className="text-sm font-medium text-foreground">{item.status}</p>
                  </div>
                </div>
              )
            })}
          </div>
          <div className="p-3 rounded-xl bg-birla-blue/5 dark:bg-birla-cyan/5 border border-birla-blue/10 dark:border-birla-cyan/10">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-foreground">Overall Completion</span>
              <span className="text-sm font-bold text-birla-cyan">72%</span>
            </div>
            <div className="h-2.5 rounded-full bg-muted overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '72%' }}
                transition={{ duration: 1.2, ease: 'easeOut' }}
                className="h-full rounded-full gradient-birla-cyan"
              />
            </div>
            <p className="text-[10px] text-muted-foreground mt-2">Deadline: March 31, 2026 &bull; 18 days remaining</p>
          </div>
        </motion.div>
      </div>

      {/* ─── Activities + Events Row ──────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Recent Activities */}
        <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-5">
          <h3 className="text-base font-semibold text-foreground flex items-center gap-2 mb-4">
            <Activity className="w-4 h-4 text-birla-gold" />
            Recent Activities
          </h3>
          <div className="space-y-2 max-h-72 overflow-y-auto">
            {recentActivities.map((activity) => {
              const Icon = activity.icon
              const typeColors = {
                success: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
                info: 'bg-blue-500/10 text-blue-600 dark:text-blue-400',
                warning: 'bg-amber-500/10 text-amber-600 dark:text-amber-400',
              }
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

        {/* Upcoming Events */}
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
      </div>

      {/* ─── Quick Actions + CBSE Assessment Row ─────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Quick Actions */}
        <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-5">
          <h3 className="text-base font-semibold text-foreground flex items-center gap-2 mb-4">
            <Zap className="w-4 h-4 text-amber-500" />
            Quick Actions
          </h3>
          <div className="grid grid-cols-4 gap-3">
            {quickActions.map((action) => {
              const Icon = action.icon
              return (
                <button
                  key={action.label}
                  className="flex flex-col items-center gap-2 p-3 rounded-xl border border-border hover:border-birla-gold/30 hover:shadow-md transition-all group"
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${action.color} group-hover:scale-110 transition-transform`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[11px] text-muted-foreground group-hover:text-foreground transition-colors">{action.label}</span>
                </button>
              )
            })}
          </div>
        </motion.div>

        {/* CBSE Assessment Overview */}
        <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-semibold text-foreground flex items-center gap-2">
              <ClipboardCheck className="w-4 h-4 text-red-500" />
              CBSE Assessment Overview
            </h3>
            <span className="text-xs px-2 py-0.5 rounded-full bg-red-500/10 text-red-600 dark:text-red-400 font-medium">
              Class X
            </span>
          </div>
          <div className="h-52">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={cbseAssessmentData} barGap={2}>
                <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'} />
                <XAxis dataKey="subject" tick={{ fontSize: 10 }} stroke={darkMode ? '#64748b' : '#94a3b8'} />
                <YAxis tick={{ fontSize: 10 }} stroke={darkMode ? '#64748b' : '#94a3b8'} domain={[0, 100]} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: darkMode ? '#1A2D4A' : '#fff',
                    border: `1px solid ${darkMode ? 'rgba(255,255,255,0.1)' : '#e2e8f0'}`,
                    borderRadius: '12px',
                    fontSize: '12px',
                    color: darkMode ? '#e2e8f0' : '#1e293b',
                  }}
                />
                <Legend iconType="circle" wrapperStyle={{ fontSize: '11px' }} />
                <Bar dataKey="internal" fill="#1A2D4A" radius={[3, 3, 0, 0]} name="Internal" />
                <Bar dataKey="board" fill="#C8A45C" radius={[3, 3, 0, 0]} name="Board" />
                <Bar dataKey="practical" fill="#22D3EE" radius={[3, 3, 0, 0]} name="Practical" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      {/* ─── Performance Indicators ──────────────────────── */}
      <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-semibold text-foreground flex items-center gap-2">
            <Target className="w-4 h-4 text-birla-gold" />
            Performance Indicators
          </h3>
          <span className="text-xs text-muted-foreground">Overall: 88/100</span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {performanceIndicators.map((item) => (
            <div key={item.label} className="text-center p-3 rounded-xl border border-border hover:shadow-md transition-all group">
              <div className="relative w-16 h-16 mx-auto mb-2">
                <svg className="w-16 h-16 -rotate-90" viewBox="0 0 36 36">
                  <circle cx="18" cy="18" r="15.5" fill="none" stroke={darkMode ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'} strokeWidth="2.5" />
                  <circle
                    cx="18" cy="18" r="15.5" fill="none"
                    stroke={item.color}
                    strokeWidth="2.5"
                    strokeDasharray={`${item.score} ${100 - item.score}`}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-sm font-bold text-foreground">{item.score}</span>
                </div>
              </div>
              <p className="text-[11px] text-muted-foreground group-hover:text-foreground transition-colors">{item.label}</p>
              <span className={`inline-flex items-center gap-0.5 text-[10px] font-medium mt-1 ${item.trend === 'up' ? 'text-emerald-500' : 'text-red-500'}`}>
                {item.trend === 'up' ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                {item.trend === 'up' ? '+2.3%' : '-1.1%'}
              </span>
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  )
}
