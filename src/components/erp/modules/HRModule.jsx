'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Briefcase, Users, Clock, TrendingUp, TrendingDown, ArrowUpRight,
  Plus, Download, Search, Filter, Award, Calendar, Bell, ChevronRight,
  Save, UserPlus, FileText, BarChart3, PieChart as PieChartIcon,
  UserCheck, UserX, Building2, Phone, Mail, MapPin, Star, Target,
  GraduationCap, Banknote, Heart, Shield, ClipboardList, FileBarChart,
  DollarSign, AlertTriangle, CheckCircle2, XCircle, Settings, Globe,
  BookOpen, Megaphone, Smile, Frown, Meh, Handshake, FileSpreadsheet
} from 'lucide-react'
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Legend, PieChart, Pie, Cell, LineChart, Line
} from 'recharts'
import useAppStore from '@/store/useAppStore'

// ─── Animation variants ──────────────────────────────────────────
const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.06 } },
}
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
}

// ─── Mock Data ────────────────────────────────────────────────────
const topStats = [
  { label: 'Total Staff', value: '142', change: '+8 this year', icon: Users, gradient: 'from-blue-900 to-blue-600', glow: 'shadow-blue-800/20' },
  { label: 'Present Today', value: '128', change: '90.1%', icon: UserCheck, gradient: 'from-emerald-900 to-emerald-600', glow: 'shadow-emerald-800/20' },
  { label: 'On Leave', value: '9', change: '6.3%', icon: Clock, gradient: 'from-amber-900 to-amber-600', glow: 'shadow-amber-800/20' },
  { label: 'Open Positions', value: '5', change: '3 depts', icon: Megaphone, gradient: 'from-purple-900 to-purple-600', glow: 'shadow-purple-800/20' },
]

const payrollData = [
  { department: 'Teaching', headcount: 82, grossSalary: 5460000, deductions: 820000, netSalary: 4640000 },
  { department: 'Admin', headcount: 24, grossSalary: 1440000, deductions: 216000, netSalary: 1224000 },
  { department: 'Support', headcount: 18, grossSalary: 720000, deductions: 108000, netSalary: 612000 },
  { department: 'Transport', headcount: 12, grossSalary: 480000, deductions: 72000, netSalary: 408000 },
  { department: 'Maintenance', headcount: 6, grossSalary: 240000, deductions: 36000, netSalary: 204000 },
]

const leaveData = [
  { type: 'CL', total: 12, used: 7.5, balance: 4.5 },
  { type: 'EL', total: 15, used: 4, balance: 11 },
  { type: 'ML', total: 180, used: 0, balance: 180 },
  { type: 'SL', total: 10, used: 3, balance: 7 },
  { type: 'Casual', total: 7, used: 5, balance: 2 },
  { type: 'Compensatory', total: 5, used: 2, balance: 3 },
]

const recentLeaves = [
  { id: 1, employee: 'Dr. Priya Menon', department: 'Science', type: 'CL', from: 'Mar 3', to: 'Mar 5', days: 3, status: 'Approved' },
  { id: 2, employee: 'Mr. Rakesh Verma', department: 'Mathematics', type: 'SL', from: 'Mar 4', to: 'Mar 4', days: 1, status: 'Approved' },
  { id: 3, employee: 'Ms. Sunita Rao', department: 'English', type: 'EL', from: 'Mar 10', to: 'Mar 14', days: 5, status: 'Pending' },
  { id: 4, employee: 'Mr. Arvind Kumar', department: 'Admin', type: 'Casual', from: 'Mar 7', to: 'Mar 7', days: 1, status: 'Pending' },
  { id: 5, employee: 'Mrs. Kavitha Nair', department: 'Hindi', type: 'CL', from: 'Mar 12', to: 'Mar 13', days: 2, status: 'Rejected' },
]

const jobPostings = [
  { id: 1, position: 'TGT Mathematics', department: 'Mathematics', campus: 'Singur', type: 'Full-Time', applications: 18, status: 'Open' },
  { id: 2, position: 'PTI (Physical Education)', department: 'Sports', campus: 'Singur', type: 'Full-Time', applications: 12, status: 'Open' },
  { id: 3, position: 'Lab Assistant - Chemistry', department: 'Science', campus: 'Singur', type: 'Full-Time', applications: 8, status: 'Interview' },
  { id: 4, position: 'Admin Coordinator', department: 'Admin', campus: 'Singur', type: 'Full-Time', applications: 22, status: 'Closed' },
  { id: 5, position: 'Music Teacher', department: 'Arts', campus: 'Singur', type: 'Part-Time', applications: 6, status: 'Open' },
]

// ─── Report Data ──────────────────────────────────────────────────
const payrollSummaryData = [
  { department: 'Teaching', gross: 5460000, deductions: 820000, net: 4640000 },
  { department: 'Admin', gross: 1440000, deductions: 216000, net: 1224000 },
  { department: 'Support', gross: 720000, deductions: 108000, net: 612000 },
  { department: 'Transport', gross: 480000, deductions: 72000, net: 408000 },
  { department: 'Maintenance', gross: 240000, deductions: 36000, net: 204000 },
]

const leaveUtilData = [
  { month: 'Apr', CL: 8, EL: 3, SL: 5, ML: 0 },
  { month: 'May', CL: 6, EL: 5, SL: 3, ML: 0 },
  { month: 'Jun', CL: 10, EL: 2, SL: 4, ML: 2 },
  { month: 'Jul', CL: 5, EL: 8, SL: 2, ML: 0 },
  { month: 'Aug', CL: 7, EL: 4, SL: 6, ML: 0 },
  { month: 'Sep', CL: 4, EL: 3, SL: 3, ML: 0 },
  { month: 'Oct', CL: 9, EL: 6, SL: 4, ML: 0 },
  { month: 'Nov', CL: 6, EL: 2, SL: 5, ML: 1 },
  { month: 'Dec', CL: 12, EL: 8, SL: 3, ML: 0 },
  { month: 'Jan', CL: 7, EL: 5, SL: 4, ML: 0 },
  { month: 'Feb', CL: 5, EL: 3, SL: 6, ML: 0 },
  { month: 'Mar', CL: 8, EL: 4, SL: 2, ML: 0 },
]

const attendanceData = [
  { month: 'Apr', Teaching: 94, Admin: 96, Support: 92 },
  { month: 'May', Teaching: 92, Admin: 95, Support: 90 },
  { month: 'Jun', Teaching: 90, Admin: 93, Support: 88 },
  { month: 'Jul', Teaching: 95, Admin: 97, Support: 93 },
  { month: 'Aug', Teaching: 93, Admin: 94, Support: 91 },
  { month: 'Sep', Teaching: 91, Admin: 96, Support: 89 },
  { month: 'Oct', Teaching: 94, Admin: 95, Support: 92 },
  { month: 'Nov', Teaching: 92, Admin: 93, Support: 90 },
  { month: 'Dec', Teaching: 88, Admin: 91, Support: 86 },
  { month: 'Jan', Teaching: 93, Admin: 95, Support: 91 },
  { month: 'Feb', Teaching: 95, Admin: 96, Support: 93 },
  { month: 'Mar', Teaching: 91, Admin: 94, Support: 89 },
]

const performanceData = [
  { rating: '5 - Outstanding', count: 12, color: '#10B981' },
  { rating: '4 - Good', count: 38, color: '#22D3EE' },
  { rating: '3 - Average', count: 52, color: '#C8A45C' },
  { rating: '2 - Below Avg', count: 28, color: '#F59E0B' },
  { rating: '1 - Poor', count: 12, color: '#EF4444' },
]

const recruitmentPipelineData = [
  { stage: 'Applied', count: 66, color: '#0A1628' },
  { stage: 'Screened', count: 42, color: '#22D3EE' },
  { stage: 'Written Test', count: 28, color: '#C8A45C' },
  { stage: 'Interview', count: 15, color: '#8B5CF6' },
  { stage: 'Offered', count: 8, color: '#10B981' },
  { stage: 'Joined', count: 5, color: '#F59E0B' },
]

const turnoverData = [
  { month: 'Apr', joins: 3, exits: 1 },
  { month: 'May', joins: 2, exits: 0 },
  { month: 'Jun', joins: 1, exits: 2 },
  { month: 'Jul', joins: 4, exits: 1 },
  { month: 'Aug', joins: 0, exits: 1 },
  { month: 'Sep', joins: 2, exits: 0 },
  { month: 'Oct', joins: 1, exits: 2 },
  { month: 'Nov', joins: 0, exits: 1 },
  { month: 'Dec', joins: 3, exits: 0 },
  { month: 'Jan', joins: 2, exits: 1 },
  { month: 'Feb', joins: 1, exits: 0 },
  { month: 'Mar', joins: 2, exits: 1 },
]

const departmentStaffData = [
  { department: 'Teaching', count: 82, color: '#0A1628' },
  { department: 'Admin', count: 24, color: '#22D3EE' },
  { department: 'Support', count: 18, color: '#C8A45C' },
  { department: 'Transport', count: 12, color: '#8B5CF6' },
  { department: 'Maintenance', count: 6, color: '#10B981' },
]

// ─── Reusable Components ─────────────────────────────────────────
function FormField({ label, children }) {
  return (
    <div>
      <label className="text-xs text-muted-foreground mb-1 block">{label}</label>
      {children}
    </div>
  )
}

function InputField({ value, onChange, placeholder, type = 'text' }) {
  return (
    <input type={type} value={value} onChange={onChange} placeholder={placeholder}
      className="w-full px-3 py-2 rounded-lg border border-input bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-birla-gold/40" />
  )
}

function SelectField({ value, onChange, options }) {
  return (
    <select value={value} onChange={onChange}
      className="w-full px-3 py-2 rounded-lg border border-input bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-birla-gold/40">
      {options.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
    </select>
  )
}

// ─── Main Component ───────────────────────────────────────────────
export default function HRModule() {
  const { darkMode } = useAppStore()
  const [activeTab, setActiveTab] = useState('overview')
  const [activeForm, setActiveForm] = useState(0)
  const [activeReport, setActiveReport] = useState(0)

  // Form States
  const [onboardingForm, setOnboardingForm] = useState({ name: '', employeeId: '', department: 'Teaching', designation: '', campus: 'Singur', phone: '', email: '', joinDate: '', salary: '', qualification: '', experience: '', bankAccount: '', panNumber: '', aadhaarNumber: '', emergencyContact: '', reportingManager: '' })
  const [leaveForm, setLeaveForm] = useState({ employeeId: '', leaveType: 'CL', fromDate: '', toDate: '', totalDays: '', reason: '', contactDuringLeave: '', arrangementMade: '' })
  const [payrollForm, setPayrollForm] = useState({ month: 'March', year: '2026', department: 'All', includeBonus: false, includeDeductions: true })
  const [performanceForm, setPerformanceForm] = useState({ employeeId: '', reviewPeriod: '2025-26', rating: '3', kpiScore: '', communication: '', punctuality: '', teamwork: '', leadership: '', initiative: '', overallComments: '', reviewerName: '', reviewDate: '' })
  const [jobForm, setJobForm] = useState({ position: '', department: '', campus: 'Singur', qualification: '', experience: '', salaryRange: '', jobDescription: '', lastDate: '', positionCount: '1', employmentType: 'Full-Time' })
  const [interviewForm, setInterviewForm] = useState({ candidateName: '', position: '', interviewDate: '', interviewTime: '', interviewer: '', mode: 'In-Person', location: '', notes: '' })
  const [exitForm, setExitForm] = useState({ employeeId: '', lastWorkingDay: '', reason: '', noticePeriodServed: false, handoverComplete: false, duesCleared: false, exitInterviewDate: '', remarks: '' })

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'payroll', label: 'Payroll', icon: DollarSign },
    { id: 'leave', label: 'Leave', icon: Clock },
    { id: 'recruitment', label: 'Recruitment', icon: UserPlus },
    { id: 'performance', label: 'Performance', icon: Star },
    { id: 'forms', label: 'Forms', icon: ClipboardList },
    { id: 'reports', label: 'Reports', icon: FileBarChart },
  ]

  const forms = [
    { name: 'Staff Onboarding', icon: UserPlus },
    { name: 'Leave Application', icon: Clock },
    { name: 'Payroll Processing', icon: DollarSign },
    { name: 'Performance Review', icon: Star },
    { name: 'Job Posting', icon: Megaphone },
    { name: 'Interview Schedule', icon: Calendar },
    { name: 'Staff Exit', icon: UserX },
  ]

  const reports = [
    { name: 'Payroll Summary', icon: DollarSign },
    { name: 'Leave Utilization', icon: Clock },
    { name: 'Staff Attendance', icon: UserCheck },
    { name: 'Performance Distribution', icon: Star },
    { name: 'Recruitment Pipeline', icon: UserPlus },
    { name: 'Staff Turnover', icon: TrendingDown },
    { name: 'Department Staffing', icon: Building2 },
  ]

  const tooltipStyle = {
    backgroundColor: darkMode ? '#1A2D4A' : '#fff',
    border: `1px solid ${darkMode ? 'rgba(255,255,255,0.1)' : '#e2e8f0'}`,
    borderRadius: '12px',
    fontSize: '12px',
    color: darkMode ? '#e2e8f0' : '#1e293b',
  }

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="show" className="p-4 lg:p-6 space-y-6 max-w-[1600px] mx-auto">
      {/* ─── Tab Navigation ──────────────────────────────── */}
      <motion.div variants={itemVariants} className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
        {tabs.map((tab) => {
          const Icon = tab.icon
          return (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${activeTab === tab.id ? 'gradient-birla text-white shadow-md' : 'border border-border text-muted-foreground hover:bg-muted hover:text-foreground'}`}>
              <Icon className="w-3.5 h-3.5" /> {tab.label}
            </button>
          )
        })}
      </motion.div>

      {/* ═══════════════════════════════════════════════════════════════
          OVERVIEW TAB
      ═══════════════════════════════════════════════════════════════ */}
      {activeTab === 'overview' && (
        <motion.div variants={itemVariants} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {topStats.map((card) => {
              const Icon = card.icon
              return (
                <motion.div key={card.label} variants={itemVariants} className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${card.gradient} p-5 text-white shadow-xl ${card.glow}`}>
                  <div className="absolute top-0 right-0 w-24 h-24 rounded-full bg-white/5 -translate-y-6 translate-x-6" />
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-3">
                      <div className="w-10 h-10 rounded-xl bg-white/15 backdrop-blur-sm flex items-center justify-center"><Icon className="w-5 h-5" /></div>
                      <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-white/10 text-white/80">{card.change}</span>
                    </div>
                    <p className="text-2xl font-bold">{card.value}</p>
                    <p className="text-sm text-white/70 mt-0.5">{card.label}</p>
                  </div>
                </motion.div>
              )
            })}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-5">
              <h3 className="text-base font-semibold text-foreground flex items-center gap-2 mb-4"><DollarSign className="w-4 h-4 text-birla-gold" />Monthly Payroll</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={payrollData}>
                    <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'} />
                    <XAxis dataKey="department" tick={{ fontSize: 9 }} stroke={darkMode ? '#64748b' : '#94a3b8'} />
                    <YAxis tick={{ fontSize: 9 }} stroke={darkMode ? '#64748b' : '#94a3b8'} tickFormatter={(v) => `₹${(v / 100000).toFixed(0)}L`} />
                    <Tooltip contentStyle={tooltipStyle} formatter={(v) => [`₹${(v / 100000).toFixed(1)}L`]} />
                    <Bar dataKey="grossSalary" fill="#C8A45C" name="Gross" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="netSalary" fill="#22D3EE" name="Net" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-5">
              <h3 className="text-base font-semibold text-foreground flex items-center gap-2 mb-4"><Clock className="w-4 h-4 text-amber-500" />Recent Leave Applications</h3>
              <div className="space-y-2 max-h-72 overflow-y-auto">
                {recentLeaves.map((leave) => (
                  <div key={leave.id} className="p-3 rounded-xl border border-border gradient-card-blue hover:shadow-sm transition-all">
                    <div className="flex items-center justify-between mb-1">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${
                        leave.status === 'Approved' ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' :
                        leave.status === 'Pending' ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400' :
                        'bg-red-500/10 text-red-600 dark:text-red-400'
                      }`}>{leave.status}</span>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-muted text-foreground">{leave.type}</span>
                    </div>
                    <p className="text-sm font-semibold text-foreground">{leave.employee}</p>
                    <p className="text-[11px] text-muted-foreground">{leave.department} &bull; {leave.from} - {leave.to} &bull; {leave.days} day(s)</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-5">
            <h3 className="text-base font-semibold text-foreground flex items-center gap-2 mb-4"><Megaphone className="w-4 h-4 text-purple-500" />Open Job Postings</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead><tr className="border-b border-border bg-muted/30">
                  <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Position</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Department</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Type</th>
                  <th className="text-right px-4 py-3 text-xs font-semibold text-muted-foreground">Applications</th>
                  <th className="text-center px-4 py-3 text-xs font-semibold text-muted-foreground">Status</th>
                </tr></thead>
                <tbody>
                  {jobPostings.map((job) => (
                    <tr key={job.id} className="border-b border-border/50 hover:bg-muted/20">
                      <td className="px-4 py-3 text-sm font-medium text-foreground">{job.position}</td>
                      <td className="px-4 py-3 text-sm text-muted-foreground">{job.department}</td>
                      <td className="px-4 py-3"><span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-muted text-foreground">{job.type}</span></td>
                      <td className="px-4 py-3 text-sm text-right text-foreground">{job.applications}</td>
                      <td className="px-4 py-3 text-center"><span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${job.status === 'Open' ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' : job.status === 'Interview' ? 'bg-purple-500/10 text-purple-600 dark:text-purple-400' : 'bg-muted text-muted-foreground'}`}>{job.status}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* ═══════════════════════════════════════════════════════════════
          PAYROLL TAB
      ═══════════════════════════════════════════════════════════════ */}
      {activeTab === 'payroll' && (
        <motion.div variants={itemVariants} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { label: 'Gross Payroll', value: '₹83,40,000', icon: DollarSign, color: 'emerald' },
              { label: 'Total Deductions', value: '₹12,52,000', icon: TrendingDown, color: 'rose' },
              { label: 'Net Payroll', value: '₹70,88,000', icon: Banknote, color: 'blue' },
            ].map((item) => {
              const Icon = item.icon
              return (
                <motion.div key={item.label} variants={itemVariants} className="rounded-2xl border border-border bg-card p-5">
                  <div className="flex items-center gap-3"><div className={`w-10 h-10 rounded-xl bg-${item.color}-500/10 flex items-center justify-center`}><Icon className={`w-5 h-5 text-${item.color}-500`} /></div><div><p className="text-xs text-muted-foreground">{item.label}</p><p className="text-lg font-bold text-foreground">{item.value}</p></div></div>
                </motion.div>
              )
            })}
          </div>
          <div className="rounded-2xl border border-border bg-card overflow-hidden">
            <table className="w-full">
              <thead><tr className="border-b border-border bg-muted/30">
                <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Department</th>
                <th className="text-right px-4 py-3 text-xs font-semibold text-muted-foreground">Headcount</th>
                <th className="text-right px-4 py-3 text-xs font-semibold text-muted-foreground">Gross (₹)</th>
                <th className="text-right px-4 py-3 text-xs font-semibold text-muted-foreground">Deductions (₹)</th>
                <th className="text-right px-4 py-3 text-xs font-semibold text-muted-foreground">Net (₹)</th>
              </tr></thead>
              <tbody>
                {payrollData.map((row) => (
                  <tr key={row.department} className="border-b border-border/50 hover:bg-muted/20">
                    <td className="px-4 py-3 text-sm font-medium text-foreground">{row.department}</td>
                    <td className="px-4 py-3 text-sm text-right text-foreground">{row.headcount}</td>
                    <td className="px-4 py-3 text-sm text-right text-foreground">₹{(row.grossSalary / 100000).toFixed(1)}L</td>
                    <td className="px-4 py-3 text-sm text-right text-red-600 dark:text-red-400">₹{(row.deductions / 100000).toFixed(1)}L</td>
                    <td className="px-4 py-3 text-sm text-right font-bold text-birla-gold">₹{(row.netSalary / 100000).toFixed(1)}L</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      )}

      {/* ═══════════════════════════════════════════════════════════════
          LEAVE TAB
      ═══════════════════════════════════════════════════════════════ */}
      {activeTab === 'leave' && (
        <motion.div variants={itemVariants} className="space-y-6">
          <div className="rounded-2xl border border-border bg-card p-5">
            <h3 className="text-base font-semibold text-foreground flex items-center gap-2 mb-4"><Clock className="w-4 h-4 text-amber-500" />Leave Balance Overview (Avg per Employee)</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead><tr className="border-b border-border bg-muted/30">
                  <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Leave Type</th>
                  <th className="text-right px-4 py-3 text-xs font-semibold text-muted-foreground">Total</th>
                  <th className="text-right px-4 py-3 text-xs font-semibold text-muted-foreground">Used</th>
                  <th className="text-right px-4 py-3 text-xs font-semibold text-muted-foreground">Balance</th>
                </tr></thead>
                <tbody>
                  {leaveData.map((row) => (
                    <tr key={row.type} className="border-b border-border/50 hover:bg-muted/20">
                      <td className="px-4 py-3 text-sm font-medium text-foreground">{row.type}</td>
                      <td className="px-4 py-3 text-sm text-right text-foreground">{row.total}</td>
                      <td className="px-4 py-3 text-sm text-right text-amber-600 dark:text-amber-400">{row.used}</td>
                      <td className="px-4 py-3 text-sm text-right font-bold text-emerald-600 dark:text-emerald-400">{row.balance}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="rounded-2xl border border-border bg-card p-5">
            <h3 className="text-base font-semibold text-foreground flex items-center gap-2 mb-4"><Calendar className="w-4 h-4 text-birla-cyan" />Recent Leave Applications</h3>
            <div className="space-y-2 max-h-72 overflow-y-auto">
              {recentLeaves.map((leave) => (
                <div key={leave.id} className="flex items-center justify-between p-3 rounded-xl border border-border gradient-card-blue">
                  <div><p className="text-sm font-semibold text-foreground">{leave.employee}</p><p className="text-[11px] text-muted-foreground">{leave.department} &bull; {leave.type} &bull; {leave.days} day(s)</p></div>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${leave.status === 'Approved' ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' : leave.status === 'Pending' ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400' : 'bg-red-500/10 text-red-600 dark:text-red-400'}`}>{leave.status}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* ═══════════════════════════════════════════════════════════════
          RECRUITMENT TAB
      ═══════════════════════════════════════════════════════════════ */}
      {activeTab === 'recruitment' && (
        <motion.div variants={itemVariants} className="space-y-6">
          <div className="rounded-2xl border border-border bg-card p-5">
            <h3 className="text-base font-semibold text-foreground flex items-center gap-2 mb-4"><Megaphone className="w-4 h-4 text-purple-500" />Recruitment Pipeline</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={recruitmentPipelineData}>
                  <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'} />
                  <XAxis dataKey="stage" tick={{ fontSize: 10 }} stroke={darkMode ? '#64748b' : '#94a3b8'} />
                  <YAxis tick={{ fontSize: 10 }} stroke={darkMode ? '#64748b' : '#94a3b8'} />
                  <Tooltip contentStyle={tooltipStyle} />
                  <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                    {recruitmentPipelineData.map((entry, idx) => <Cell key={idx} fill={entry.color} />)}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="rounded-2xl border border-border bg-card overflow-hidden">
            <table className="w-full">
              <thead><tr className="border-b border-border bg-muted/30">
                <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Position</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Department</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Type</th>
                <th className="text-right px-4 py-3 text-xs font-semibold text-muted-foreground">Applications</th>
                <th className="text-center px-4 py-3 text-xs font-semibold text-muted-foreground">Status</th>
              </tr></thead>
              <tbody>
                {jobPostings.map((job) => (
                  <tr key={job.id} className="border-b border-border/50 hover:bg-muted/20">
                    <td className="px-4 py-3 text-sm font-medium text-foreground">{job.position}</td>
                    <td className="px-4 py-3 text-sm text-muted-foreground">{job.department}</td>
                    <td className="px-4 py-3"><span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-muted text-foreground">{job.type}</span></td>
                    <td className="px-4 py-3 text-sm text-right text-foreground">{job.applications}</td>
                    <td className="px-4 py-3 text-center"><span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${job.status === 'Open' ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' : job.status === 'Interview' ? 'bg-purple-500/10 text-purple-600 dark:text-purple-400' : 'bg-muted text-muted-foreground'}`}>{job.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      )}

      {/* ═══════════════════════════════════════════════════════════════
          PERFORMANCE TAB
      ═══════════════════════════════════════════════════════════════ */}
      {activeTab === 'performance' && (
        <motion.div variants={itemVariants} className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-5">
              <h3 className="text-base font-semibold text-foreground flex items-center gap-2 mb-4"><Star className="w-4 h-4 text-birla-gold" />Performance Distribution</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={performanceData} cx="50%" cy="50%" innerRadius={50} outerRadius={85} dataKey="count" label={({ rating, count }) => `${rating}: ${count}`}>
                      {performanceData.map((entry, idx) => <Cell key={idx} fill={entry.color} />)}
                    </Pie>
                    <Tooltip contentStyle={tooltipStyle} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </motion.div>
            <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card overflow-hidden">
              <h3 className="text-base font-semibold text-foreground flex items-center gap-2 p-5 pb-3"><Target className="w-4 h-4 text-birla-cyan" />Top Performers</h3>
              <div className="space-y-2 px-5 pb-5">
                {[
                  { name: 'Dr. Priya Menon', dept: 'Science', rating: 4.8 },
                  { name: 'Mr. Sanjay Gupta', dept: 'Mathematics', rating: 4.7 },
                  { name: 'Ms. Anjali Das', dept: 'English', rating: 4.6 },
                  { name: 'Mr. Vikram Singh', dept: 'Hindi', rating: 4.5 },
                  { name: 'Mrs. Deepa Rao', dept: 'Social Studies', rating: 4.4 },
                ].map((p, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 rounded-xl border border-border gradient-card-blue">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg gradient-birla text-white flex items-center justify-center text-xs font-bold">{idx + 1}</div>
                      <div><p className="text-sm font-medium text-foreground">{p.name}</p><p className="text-[10px] text-muted-foreground">{p.dept}</p></div>
                    </div>
                    <div className="flex items-center gap-1"><Star className="w-3.5 h-3.5 text-birla-gold fill-birla-gold" /><span className="text-sm font-bold text-foreground">{p.rating}</span></div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}

      {/* ═══════════════════════════════════════════════════════════════
          FORMS TAB
      ═══════════════════════════════════════════════════════════════ */}
      {activeTab === 'forms' && (
        <motion.div variants={itemVariants} className="space-y-6">
          <div className="flex items-center gap-2 overflow-x-auto pb-2">
            {forms.map((f, idx) => {
              const Icon = f.icon
              return (
                <button key={idx} onClick={() => setActiveForm(idx)} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${activeForm === idx ? 'gradient-birla text-white shadow-md' : 'border border-border text-muted-foreground hover:bg-muted'}`}>
                  <Icon className="w-3.5 h-3.5" /> {f.name}
                </button>
              )
            })}
          </div>

          {/* Form 1: Staff Onboarding */}
          {activeForm === 0 && (
            <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-6">
              <h3 className="text-lg font-semibold text-foreground flex items-center gap-2 mb-6"><UserPlus className="w-5 h-5 text-birla-gold" />Staff Onboarding Form</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <FormField label="Full Name"><InputField value={onboardingForm.name} onChange={(e) => setOnboardingForm({ ...onboardingForm, name: e.target.value })} placeholder="Full name" /></FormField>
                <FormField label="Employee ID"><InputField value={onboardingForm.employeeId} onChange={(e) => setOnboardingForm({ ...onboardingForm, employeeId: e.target.value })} placeholder="EMP-001" /></FormField>
                <FormField label="Department"><SelectField value={onboardingForm.department} onChange={(e) => setOnboardingForm({ ...onboardingForm, department: e.target.value })} options={['Teaching', 'Admin', 'Support', 'Transport', 'Maintenance']} /></FormField>
                <FormField label="Designation"><InputField value={onboardingForm.designation} onChange={(e) => setOnboardingForm({ ...onboardingForm, designation: e.target.value })} placeholder="e.g. TGT Mathematics" /></FormField>
                <FormField label="Campus"><SelectField value={onboardingForm.campus} onChange={(e) => setOnboardingForm({ ...onboardingForm, campus: e.target.value })} options={['Singur', 'Chandannagar', 'Srirampore']} /></FormField>
                <FormField label="Phone"><InputField value={onboardingForm.phone} onChange={(e) => setOnboardingForm({ ...onboardingForm, phone: e.target.value })} placeholder="+91 98765 43210" /></FormField>
                <FormField label="Email"><InputField value={onboardingForm.email} onChange={(e) => setOnboardingForm({ ...onboardingForm, email: e.target.value })} placeholder="email@birlaopenminds.com" type="email" /></FormField>
                <FormField label="Join Date"><InputField value={onboardingForm.joinDate} onChange={(e) => setOnboardingForm({ ...onboardingForm, joinDate: e.target.value })} type="date" /></FormField>
                <FormField label="Salary (₹)"><InputField value={onboardingForm.salary} onChange={(e) => setOnboardingForm({ ...onboardingForm, salary: e.target.value })} placeholder="0" type="number" /></FormField>
                <FormField label="Qualification"><InputField value={onboardingForm.qualification} onChange={(e) => setOnboardingForm({ ...onboardingForm, qualification: e.target.value })} placeholder="e.g. M.Sc, B.Ed" /></FormField>
                <FormField label="Experience (Years)"><InputField value={onboardingForm.experience} onChange={(e) => setOnboardingForm({ ...onboardingForm, experience: e.target.value })} placeholder="0" type="number" /></FormField>
                <FormField label="Bank Account"><InputField value={onboardingForm.bankAccount} onChange={(e) => setOnboardingForm({ ...onboardingForm, bankAccount: e.target.value })} placeholder="Account number" /></FormField>
                <FormField label="PAN Number"><InputField value={onboardingForm.panNumber} onChange={(e) => setOnboardingForm({ ...onboardingForm, panNumber: e.target.value })} placeholder="ABCDE1234F" /></FormField>
                <FormField label="Aadhaar Number"><InputField value={onboardingForm.aadhaarNumber} onChange={(e) => setOnboardingForm({ ...onboardingForm, aadhaarNumber: e.target.value })} placeholder="XXXX XXXX XXXX" /></FormField>
                <FormField label="Emergency Contact"><InputField value={onboardingForm.emergencyContact} onChange={(e) => setOnboardingForm({ ...onboardingForm, emergencyContact: e.target.value })} placeholder="+91 98765 43210" /></FormField>
                <FormField label="Reporting Manager"><InputField value={onboardingForm.reportingManager} onChange={(e) => setOnboardingForm({ ...onboardingForm, reportingManager: e.target.value })} placeholder="Manager name" /></FormField>
              </div>
              <div className="mt-6 flex justify-end"><button className="px-6 py-2.5 rounded-xl gradient-birla-gold text-birla-blue text-sm font-bold hover:opacity-90 transition-opacity flex items-center gap-2"><Save className="w-4 h-4" />Onboard Staff</button></div>
            </motion.div>
          )}

          {/* Form 2: Leave Application */}
          {activeForm === 1 && (
            <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-6">
              <h3 className="text-lg font-semibold text-foreground flex items-center gap-2 mb-6"><Clock className="w-5 h-5 text-amber-500" />Leave Application Form</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <FormField label="Employee ID"><InputField value={leaveForm.employeeId} onChange={(e) => setLeaveForm({ ...leaveForm, employeeId: e.target.value })} placeholder="EMP-001" /></FormField>
                <FormField label="Leave Type"><SelectField value={leaveForm.leaveType} onChange={(e) => setLeaveForm({ ...leaveForm, leaveType: e.target.value })} options={['CL', 'EL', 'ML', 'SL', 'Casual', 'Compensatory']} /></FormField>
                <FormField label="From Date"><InputField value={leaveForm.fromDate} onChange={(e) => setLeaveForm({ ...leaveForm, fromDate: e.target.value })} type="date" /></FormField>
                <FormField label="To Date"><InputField value={leaveForm.toDate} onChange={(e) => setLeaveForm({ ...leaveForm, toDate: e.target.value })} type="date" /></FormField>
                <FormField label="Total Days"><InputField value={leaveForm.totalDays} onChange={(e) => setLeaveForm({ ...leaveForm, totalDays: e.target.value })} placeholder="0" type="number" /></FormField>
                <FormField label="Reason"><InputField value={leaveForm.reason} onChange={(e) => setLeaveForm({ ...leaveForm, reason: e.target.value })} placeholder="Reason for leave" /></FormField>
                <FormField label="Contact During Leave"><InputField value={leaveForm.contactDuringLeave} onChange={(e) => setLeaveForm({ ...leaveForm, contactDuringLeave: e.target.value })} placeholder="+91 98765 43210" /></FormField>
                <FormField label="Arrangement Made"><InputField value={leaveForm.arrangementMade} onChange={(e) => setLeaveForm({ ...leaveForm, arrangementMade: e.target.value })} placeholder="Substitute teacher/arrangement" /></FormField>
              </div>
              <div className="mt-6 flex justify-end"><button className="px-6 py-2.5 rounded-xl gradient-birla-gold text-birla-blue text-sm font-bold hover:opacity-90 transition-opacity flex items-center gap-2"><Save className="w-4 h-4" />Submit Leave</button></div>
            </motion.div>
          )}

          {/* Form 3: Payroll Processing */}
          {activeForm === 2 && (
            <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-6">
              <h3 className="text-lg font-semibold text-foreground flex items-center gap-2 mb-6"><DollarSign className="w-5 h-5 text-emerald-500" />Payroll Processing Form</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <FormField label="Month"><SelectField value={payrollForm.month} onChange={(e) => setPayrollForm({ ...payrollForm, month: e.target.value })} options={['January','February','March','April','May','June','July','August','September','October','November','December']} /></FormField>
                <FormField label="Year"><SelectField value={payrollForm.year} onChange={(e) => setPayrollForm({ ...payrollForm, year: e.target.value })} options={['2026','2025','2024']} /></FormField>
                <FormField label="Department"><SelectField value={payrollForm.department} onChange={(e) => setPayrollForm({ ...payrollForm, department: e.target.value })} options={['All','Teaching','Admin','Support','Transport','Maintenance']} /></FormField>
                <div className="flex items-center gap-3 mt-5">
                  <label className="flex items-center gap-2 text-sm text-foreground"><input type="checkbox" checked={payrollForm.includeBonus} onChange={(e) => setPayrollForm({ ...payrollForm, includeBonus: e.target.checked })} className="rounded border-input" /> Include Bonus</label>
                </div>
                <div className="flex items-center gap-3 mt-5">
                  <label className="flex items-center gap-2 text-sm text-foreground"><input type="checkbox" checked={payrollForm.includeDeductions} onChange={(e) => setPayrollForm({ ...payrollForm, includeDeductions: e.target.checked })} className="rounded border-input" /> Include Deductions</label>
                </div>
              </div>
              <div className="mt-6 flex justify-end"><button className="px-6 py-2.5 rounded-xl gradient-birla text-white text-sm font-bold hover:opacity-90 transition-opacity flex items-center gap-2"><Banknote className="w-4 h-4" />Process Payroll</button></div>
            </motion.div>
          )}

          {/* Form 4: Performance Review */}
          {activeForm === 3 && (
            <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-6">
              <h3 className="text-lg font-semibold text-foreground flex items-center gap-2 mb-6"><Star className="w-5 h-5 text-birla-gold" />Performance Review Form</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <FormField label="Employee ID"><InputField value={performanceForm.employeeId} onChange={(e) => setPerformanceForm({ ...performanceForm, employeeId: e.target.value })} placeholder="EMP-001" /></FormField>
                <FormField label="Review Period"><SelectField value={performanceForm.reviewPeriod} onChange={(e) => setPerformanceForm({ ...performanceForm, reviewPeriod: e.target.value })} options={['2025-26', '2024-25', '2023-24']} /></FormField>
                <FormField label="Overall Rating (1-5)"><SelectField value={performanceForm.rating} onChange={(e) => setPerformanceForm({ ...performanceForm, rating: e.target.value })} options={['1', '2', '3', '4', '5']} /></FormField>
                <FormField label="KPI Score (%)"><InputField value={performanceForm.kpiScore} onChange={(e) => setPerformanceForm({ ...performanceForm, kpiScore: e.target.value })} placeholder="0-100" type="number" /></FormField>
                <FormField label="Communication (1-5)"><InputField value={performanceForm.communication} onChange={(e) => setPerformanceForm({ ...performanceForm, communication: e.target.value })} placeholder="1-5" type="number" /></FormField>
                <FormField label="Punctuality (1-5)"><InputField value={performanceForm.punctuality} onChange={(e) => setPerformanceForm({ ...performanceForm, punctuality: e.target.value })} placeholder="1-5" type="number" /></FormField>
                <FormField label="Teamwork (1-5)"><InputField value={performanceForm.teamwork} onChange={(e) => setPerformanceForm({ ...performanceForm, teamwork: e.target.value })} placeholder="1-5" type="number" /></FormField>
                <FormField label="Leadership (1-5)"><InputField value={performanceForm.leadership} onChange={(e) => setPerformanceForm({ ...performanceForm, leadership: e.target.value })} placeholder="1-5" type="number" /></FormField>
                <FormField label="Initiative (1-5)"><InputField value={performanceForm.initiative} onChange={(e) => setPerformanceForm({ ...performanceForm, initiative: e.target.value })} placeholder="1-5" type="number" /></FormField>
                <FormField label="Overall Comments"><InputField value={performanceForm.overallComments} onChange={(e) => setPerformanceForm({ ...performanceForm, overallComments: e.target.value })} placeholder="Comments" /></FormField>
                <FormField label="Reviewer Name"><InputField value={performanceForm.reviewerName} onChange={(e) => setPerformanceForm({ ...performanceForm, reviewerName: e.target.value })} placeholder="Reviewer name" /></FormField>
                <FormField label="Review Date"><InputField value={performanceForm.reviewDate} onChange={(e) => setPerformanceForm({ ...performanceForm, reviewDate: e.target.value })} type="date" /></FormField>
              </div>
              <div className="mt-6 flex justify-end"><button className="px-6 py-2.5 rounded-xl gradient-birla-gold text-birla-blue text-sm font-bold hover:opacity-90 transition-opacity flex items-center gap-2"><Save className="w-4 h-4" />Submit Review</button></div>
            </motion.div>
          )}

          {/* Form 5: Job Posting */}
          {activeForm === 4 && (
            <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-6">
              <h3 className="text-lg font-semibold text-foreground flex items-center gap-2 mb-6"><Megaphone className="w-5 h-5 text-purple-500" />Job Posting Form</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <FormField label="Position"><InputField value={jobForm.position} onChange={(e) => setJobForm({ ...jobForm, position: e.target.value })} placeholder="e.g. TGT Mathematics" /></FormField>
                <FormField label="Department"><InputField value={jobForm.department} onChange={(e) => setJobForm({ ...jobForm, department: e.target.value })} placeholder="e.g. Mathematics" /></FormField>
                <FormField label="Campus"><SelectField value={jobForm.campus} onChange={(e) => setJobForm({ ...jobForm, campus: e.target.value })} options={['Singur', 'Chandannagar', 'Srirampore']} /></FormField>
                <FormField label="Qualification"><InputField value={jobForm.qualification} onChange={(e) => setJobForm({ ...jobForm, qualification: e.target.value })} placeholder="e.g. M.Sc, B.Ed" /></FormField>
                <FormField label="Experience (Years)"><InputField value={jobForm.experience} onChange={(e) => setJobForm({ ...jobForm, experience: e.target.value })} placeholder="e.g. 2-5" /></FormField>
                <FormField label="Salary Range (₹)"><InputField value={jobForm.salaryRange} onChange={(e) => setJobForm({ ...jobForm, salaryRange: e.target.value })} placeholder="e.g. 35000-50000" /></FormField>
                <div className="md:col-span-2 lg:col-span-3">
                  <FormField label="Job Description"><textarea value={jobForm.jobDescription} onChange={(e) => setJobForm({ ...jobForm, jobDescription: e.target.value })} placeholder="Enter detailed job description..." rows={3} className="w-full px-3 py-2 rounded-lg border border-input bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-birla-gold/40" /></FormField>
                </div>
                <FormField label="Last Date to Apply"><InputField value={jobForm.lastDate} onChange={(e) => setJobForm({ ...jobForm, lastDate: e.target.value })} type="date" /></FormField>
                <FormField label="Position Count"><InputField value={jobForm.positionCount} onChange={(e) => setJobForm({ ...jobForm, positionCount: e.target.value })} placeholder="1" type="number" /></FormField>
                <FormField label="Employment Type"><SelectField value={jobForm.employmentType} onChange={(e) => setJobForm({ ...jobForm, employmentType: e.target.value })} options={['Full-Time', 'Part-Time', 'Contract']} /></FormField>
              </div>
              <div className="mt-6 flex justify-end"><button className="px-6 py-2.5 rounded-xl gradient-birla-gold text-birla-blue text-sm font-bold hover:opacity-90 transition-opacity flex items-center gap-2"><Save className="w-4 h-4" />Post Job</button></div>
            </motion.div>
          )}

          {/* Form 6: Interview Schedule */}
          {activeForm === 5 && (
            <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-6">
              <h3 className="text-lg font-semibold text-foreground flex items-center gap-2 mb-6"><Calendar className="w-5 h-5 text-blue-500" />Interview Schedule Form</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <FormField label="Candidate Name"><InputField value={interviewForm.candidateName} onChange={(e) => setInterviewForm({ ...interviewForm, candidateName: e.target.value })} placeholder="Candidate name" /></FormField>
                <FormField label="Position"><InputField value={interviewForm.position} onChange={(e) => setInterviewForm({ ...interviewForm, position: e.target.value })} placeholder="e.g. TGT Mathematics" /></FormField>
                <FormField label="Interview Date"><InputField value={interviewForm.interviewDate} onChange={(e) => setInterviewForm({ ...interviewForm, interviewDate: e.target.value })} type="date" /></FormField>
                <FormField label="Interview Time"><InputField value={interviewForm.interviewTime} onChange={(e) => setInterviewForm({ ...interviewForm, interviewTime: e.target.value })} type="time" /></FormField>
                <FormField label="Interviewer"><InputField value={interviewForm.interviewer} onChange={(e) => setInterviewForm({ ...interviewForm, interviewer: e.target.value })} placeholder="Interviewer name" /></FormField>
                <FormField label="Mode"><SelectField value={interviewForm.mode} onChange={(e) => setInterviewForm({ ...interviewForm, mode: e.target.value })} options={['In-Person', 'Online']} /></FormField>
                <FormField label="Location / Link"><InputField value={interviewForm.location} onChange={(e) => setInterviewForm({ ...interviewForm, location: e.target.value })} placeholder="Room no. or Meeting link" /></FormField>
                <FormField label="Notes"><InputField value={interviewForm.notes} onChange={(e) => setInterviewForm({ ...interviewForm, notes: e.target.value })} placeholder="Any special notes" /></FormField>
              </div>
              <div className="mt-6 flex justify-end"><button className="px-6 py-2.5 rounded-xl gradient-birla-gold text-birla-blue text-sm font-bold hover:opacity-90 transition-opacity flex items-center gap-2"><Save className="w-4 h-4" />Schedule Interview</button></div>
            </motion.div>
          )}

          {/* Form 7: Staff Exit */}
          {activeForm === 6 && (
            <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-6">
              <h3 className="text-lg font-semibold text-foreground flex items-center gap-2 mb-6"><UserX className="w-5 h-5 text-rose-500" />Staff Exit Form</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <FormField label="Employee ID"><InputField value={exitForm.employeeId} onChange={(e) => setExitForm({ ...exitForm, employeeId: e.target.value })} placeholder="EMP-001" /></FormField>
                <FormField label="Last Working Day"><InputField value={exitForm.lastWorkingDay} onChange={(e) => setExitForm({ ...exitForm, lastWorkingDay: e.target.value })} type="date" /></FormField>
                <FormField label="Reason"><InputField value={exitForm.reason} onChange={(e) => setExitForm({ ...exitForm, reason: e.target.value })} placeholder="Reason for exit" /></FormField>
                <div className="flex items-center gap-3 mt-5">
                  <label className="flex items-center gap-2 text-sm text-foreground"><input type="checkbox" checked={exitForm.noticePeriodServed} onChange={(e) => setExitForm({ ...exitForm, noticePeriodServed: e.target.checked })} className="rounded border-input" /> Notice Period Served</label>
                </div>
                <div className="flex items-center gap-3 mt-5">
                  <label className="flex items-center gap-2 text-sm text-foreground"><input type="checkbox" checked={exitForm.handoverComplete} onChange={(e) => setExitForm({ ...exitForm, handoverComplete: e.target.checked })} className="rounded border-input" /> Handover Complete</label>
                </div>
                <div className="flex items-center gap-3 mt-5">
                  <label className="flex items-center gap-2 text-sm text-foreground"><input type="checkbox" checked={exitForm.duesCleared} onChange={(e) => setExitForm({ ...exitForm, duesCleared: e.target.checked })} className="rounded border-input" /> Dues Cleared</label>
                </div>
                <FormField label="Exit Interview Date"><InputField value={exitForm.exitInterviewDate} onChange={(e) => setExitForm({ ...exitForm, exitInterviewDate: e.target.value })} type="date" /></FormField>
                <FormField label="Remarks"><InputField value={exitForm.remarks} onChange={(e) => setExitForm({ ...exitForm, remarks: e.target.value })} placeholder="Any remarks" /></FormField>
              </div>
              <div className="mt-6 flex justify-end"><button className="px-6 py-2.5 rounded-xl gradient-birla-gold text-birla-blue text-sm font-bold hover:opacity-90 transition-opacity flex items-center gap-2"><Save className="w-4 h-4" />Process Exit</button></div>
            </motion.div>
          )}
        </motion.div>
      )}

      {/* ═══════════════════════════════════════════════════════════════
          REPORTS TAB
      ═══════════════════════════════════════════════════════════════ */}
      {activeTab === 'reports' && (
        <motion.div variants={itemVariants} className="space-y-6">
          <div className="flex items-center gap-2 overflow-x-auto pb-2">
            {reports.map((r, idx) => {
              const Icon = r.icon
              return (
                <button key={idx} onClick={() => setActiveReport(idx)} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${activeReport === idx ? 'gradient-birla text-white shadow-md' : 'border border-border text-muted-foreground hover:bg-muted'}`}>
                  <Icon className="w-3.5 h-3.5" /> {r.name}
                </button>
              )
            })}
          </div>

          {/* Report 1: Payroll Summary */}
          {activeReport === 0 && (
            <motion.div variants={itemVariants} className="space-y-4">
              <div className="rounded-2xl border border-border bg-card p-5">
                <h3 className="text-base font-semibold text-foreground flex items-center gap-2 mb-4"><DollarSign className="w-4 h-4 text-birla-gold" />Payroll Summary Report</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={payrollSummaryData}>
                      <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'} />
                      <XAxis dataKey="department" tick={{ fontSize: 9 }} stroke={darkMode ? '#64748b' : '#94a3b8'} />
                      <YAxis tick={{ fontSize: 9 }} stroke={darkMode ? '#64748b' : '#94a3b8'} tickFormatter={(v) => `₹${(v / 100000).toFixed(0)}L`} />
                      <Tooltip contentStyle={tooltipStyle} formatter={(v) => [`₹${(v / 100000).toFixed(1)}L`]} />
                      <Legend iconType="circle" wrapperStyle={{ fontSize: '11px' }} />
                      <Bar dataKey="gross" fill="#C8A45C" name="Gross" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="deductions" fill="#EF4444" name="Deductions" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="net" fill="#22D3EE" name="Net" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
              <div className="rounded-2xl border border-border bg-card overflow-hidden">
                <table className="w-full">
                  <thead><tr className="border-b border-border bg-muted/30"><th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Department</th><th className="text-right px-4 py-3 text-xs font-semibold text-muted-foreground">Gross (₹)</th><th className="text-right px-4 py-3 text-xs font-semibold text-muted-foreground">Deductions (₹)</th><th className="text-right px-4 py-3 text-xs font-semibold text-muted-foreground">Net (₹)</th></tr></thead>
                  <tbody>{payrollSummaryData.map((d) => (<tr key={d.department} className="border-b border-border/50 hover:bg-muted/20"><td className="px-4 py-3 text-sm font-medium text-foreground">{d.department}</td><td className="px-4 py-3 text-sm text-right">₹{(d.gross / 100000).toFixed(1)}L</td><td className="px-4 py-3 text-sm text-right text-red-600 dark:text-red-400">₹{(d.deductions / 100000).toFixed(1)}L</td><td className="px-4 py-3 text-sm text-right font-bold text-birla-gold">₹{(d.net / 100000).toFixed(1)}L</td></tr>))}</tbody>
                </table>
              </div>
            </motion.div>
          )}

          {/* Report 2: Leave Utilization */}
          {activeReport === 1 && (
            <motion.div variants={itemVariants} className="space-y-4">
              <div className="rounded-2xl border border-border bg-card p-5">
                <h3 className="text-base font-semibold text-foreground flex items-center gap-2 mb-4"><Clock className="w-4 h-4 text-amber-500" />Leave Utilization Report</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={leaveUtilData}>
                      <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'} />
                      <XAxis dataKey="month" tick={{ fontSize: 10 }} stroke={darkMode ? '#64748b' : '#94a3b8'} />
                      <YAxis tick={{ fontSize: 10 }} stroke={darkMode ? '#64748b' : '#94a3b8'} />
                      <Tooltip contentStyle={tooltipStyle} />
                      <Legend iconType="circle" wrapperStyle={{ fontSize: '11px' }} />
                      <Bar dataKey="CL" stackId="a" fill="#C8A45C" name="CL" />
                      <Bar dataKey="EL" stackId="a" fill="#22D3EE" name="EL" />
                      <Bar dataKey="SL" stackId="a" fill="#EF4444" name="SL" />
                      <Bar dataKey="ML" stackId="a" fill="#8B5CF6" name="ML" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
              <div className="rounded-2xl border border-border bg-card overflow-hidden">
                <table className="w-full">
                  <thead><tr className="border-b border-border bg-muted/30"><th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Month</th><th className="text-right px-4 py-3 text-xs font-semibold text-muted-foreground">CL</th><th className="text-right px-4 py-3 text-xs font-semibold text-muted-foreground">EL</th><th className="text-right px-4 py-3 text-xs font-semibold text-muted-foreground">SL</th><th className="text-right px-4 py-3 text-xs font-semibold text-muted-foreground">ML</th></tr></thead>
                  <tbody>{leaveUtilData.map((d) => (<tr key={d.month} className="border-b border-border/50 hover:bg-muted/20"><td className="px-4 py-3 text-sm font-medium text-foreground">{d.month}</td><td className="px-4 py-3 text-sm text-right">{d.CL}</td><td className="px-4 py-3 text-sm text-right">{d.EL}</td><td className="px-4 py-3 text-sm text-right">{d.SL}</td><td className="px-4 py-3 text-sm text-right">{d.ML}</td></tr>))}</tbody>
                </table>
              </div>
            </motion.div>
          )}

          {/* Report 3: Staff Attendance */}
          {activeReport === 2 && (
            <motion.div variants={itemVariants} className="space-y-4">
              <div className="rounded-2xl border border-border bg-card p-5">
                <h3 className="text-base font-semibold text-foreground flex items-center gap-2 mb-4"><UserCheck className="w-4 h-4 text-emerald-500" />Staff Attendance Report (%)</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={attendanceData}>
                      <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'} />
                      <XAxis dataKey="month" tick={{ fontSize: 10 }} stroke={darkMode ? '#64748b' : '#94a3b8'} />
                      <YAxis tick={{ fontSize: 10 }} stroke={darkMode ? '#64748b' : '#94a3b8'} domain={[80, 100]} />
                      <Tooltip contentStyle={tooltipStyle} />
                      <Legend iconType="circle" wrapperStyle={{ fontSize: '11px' }} />
                      <Line type="monotone" dataKey="Teaching" stroke="#0A1628" strokeWidth={2} name="Teaching" />
                      <Line type="monotone" dataKey="Admin" stroke="#22D3EE" strokeWidth={2} name="Admin" />
                      <Line type="monotone" dataKey="Support" stroke="#C8A45C" strokeWidth={2} name="Support" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
              <div className="rounded-2xl border border-border bg-card overflow-hidden">
                <table className="w-full">
                  <thead><tr className="border-b border-border bg-muted/30"><th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Month</th><th className="text-right px-4 py-3 text-xs font-semibold text-muted-foreground">Teaching %</th><th className="text-right px-4 py-3 text-xs font-semibold text-muted-foreground">Admin %</th><th className="text-right px-4 py-3 text-xs font-semibold text-muted-foreground">Support %</th></tr></thead>
                  <tbody>{attendanceData.map((d) => (<tr key={d.month} className="border-b border-border/50 hover:bg-muted/20"><td className="px-4 py-3 text-sm font-medium text-foreground">{d.month}</td><td className="px-4 py-3 text-sm text-right">{d.Teaching}%</td><td className="px-4 py-3 text-sm text-right">{d.Admin}%</td><td className="px-4 py-3 text-sm text-right">{d.Support}%</td></tr>))}</tbody>
                </table>
              </div>
            </motion.div>
          )}

          {/* Report 4: Performance Distribution */}
          {activeReport === 3 && (
            <motion.div variants={itemVariants} className="space-y-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="rounded-2xl border border-border bg-card p-5">
                  <h3 className="text-base font-semibold text-foreground flex items-center gap-2 mb-4"><Star className="w-4 h-4 text-birla-gold" />Performance Distribution</h3>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie data={performanceData} cx="50%" cy="50%" innerRadius={50} outerRadius={85} dataKey="count" label={({ rating, count }) => `${count}`}>
                          {performanceData.map((entry, idx) => <Cell key={idx} fill={entry.color} />)}
                        </Pie>
                        <Tooltip contentStyle={tooltipStyle} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
                <div className="rounded-2xl border border-border bg-card overflow-hidden">
                  <table className="w-full">
                    <thead><tr className="border-b border-border bg-muted/30"><th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Rating</th><th className="text-right px-4 py-3 text-xs font-semibold text-muted-foreground">Staff Count</th><th className="text-right px-4 py-3 text-xs font-semibold text-muted-foreground">% Share</th></tr></thead>
                    <tbody>{performanceData.map((d) => { const total = performanceData.reduce((s, e) => s + e.count, 0); return (<tr key={d.rating} className="border-b border-border/50 hover:bg-muted/20"><td className="px-4 py-3 text-sm font-medium text-foreground flex items-center gap-2"><span className="w-3 h-3 rounded-full" style={{ backgroundColor: d.color }} />{d.rating}</td><td className="px-4 py-3 text-sm text-right">{d.count}</td><td className="px-4 py-3 text-sm text-right">{((d.count / total) * 100).toFixed(1)}%</td></tr>); })}</tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          )}

          {/* Report 5: Recruitment Pipeline */}
          {activeReport === 4 && (
            <motion.div variants={itemVariants} className="space-y-4">
              <div className="rounded-2xl border border-border bg-card p-5">
                <h3 className="text-base font-semibold text-foreground flex items-center gap-2 mb-4"><UserPlus className="w-4 h-4 text-purple-500" />Recruitment Pipeline</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={recruitmentPipelineData} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'} />
                      <XAxis type="number" tick={{ fontSize: 10 }} stroke={darkMode ? '#64748b' : '#94a3b8'} />
                      <YAxis dataKey="stage" type="category" tick={{ fontSize: 10 }} stroke={darkMode ? '#64748b' : '#94a3b8'} width={80} />
                      <Tooltip contentStyle={tooltipStyle} />
                      <Bar dataKey="count" radius={[0, 4, 4, 0]}>
                        {recruitmentPipelineData.map((entry, idx) => <Cell key={idx} fill={entry.color} />)}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </motion.div>
          )}

          {/* Report 6: Staff Turnover */}
          {activeReport === 5 && (
            <motion.div variants={itemVariants} className="space-y-4">
              <div className="rounded-2xl border border-border bg-card p-5">
                <h3 className="text-base font-semibold text-foreground flex items-center gap-2 mb-4"><TrendingDown className="w-4 h-4 text-rose-500" />Staff Turnover Report</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={turnoverData}>
                      <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'} />
                      <XAxis dataKey="month" tick={{ fontSize: 10 }} stroke={darkMode ? '#64748b' : '#94a3b8'} />
                      <YAxis tick={{ fontSize: 10 }} stroke={darkMode ? '#64748b' : '#94a3b8'} />
                      <Tooltip contentStyle={tooltipStyle} />
                      <Legend iconType="circle" wrapperStyle={{ fontSize: '11px' }} />
                      <Area type="monotone" dataKey="joins" stroke="#10B981" fill="rgba(16,185,129,0.1)" strokeWidth={2} name="Joins" />
                      <Area type="monotone" dataKey="exits" stroke="#EF4444" fill="rgba(239,68,68,0.1)" strokeWidth={2} name="Exits" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
              <div className="rounded-2xl border border-border bg-card overflow-hidden">
                <table className="w-full">
                  <thead><tr className="border-b border-border bg-muted/30"><th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Month</th><th className="text-right px-4 py-3 text-xs font-semibold text-muted-foreground">Joins</th><th className="text-right px-4 py-3 text-xs font-semibold text-muted-foreground">Exits</th><th className="text-right px-4 py-3 text-xs font-semibold text-muted-foreground">Net</th></tr></thead>
                  <tbody>{turnoverData.map((d) => (<tr key={d.month} className="border-b border-border/50 hover:bg-muted/20"><td className="px-4 py-3 text-sm font-medium text-foreground">{d.month}</td><td className="px-4 py-3 text-sm text-right text-emerald-600 dark:text-emerald-400">{d.joins}</td><td className="px-4 py-3 text-sm text-right text-red-600 dark:text-red-400">{d.exits}</td><td className="px-4 py-3 text-sm text-right font-bold text-foreground">{d.joins - d.exits >= 0 ? '+' : ''}{d.joins - d.exits}</td></tr>))}</tbody>
                </table>
              </div>
            </motion.div>
          )}

          {/* Report 7: Department Staffing */}
          {activeReport === 6 && (
            <motion.div variants={itemVariants} className="space-y-4">
              <div className="rounded-2xl border border-border bg-card p-5">
                <h3 className="text-base font-semibold text-foreground flex items-center gap-2 mb-4"><Building2 className="w-4 h-4 text-birla-cyan" />Department Staffing Report</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={departmentStaffData}>
                      <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'} />
                      <XAxis dataKey="department" tick={{ fontSize: 10 }} stroke={darkMode ? '#64748b' : '#94a3b8'} />
                      <YAxis tick={{ fontSize: 10 }} stroke={darkMode ? '#64748b' : '#94a3b8'} />
                      <Tooltip contentStyle={tooltipStyle} />
                      <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                        {departmentStaffData.map((entry, idx) => <Cell key={idx} fill={entry.color} />)}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
              <div className="rounded-2xl border border-border bg-card overflow-hidden">
                <table className="w-full">
                  <thead><tr className="border-b border-border bg-muted/30"><th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Department</th><th className="text-right px-4 py-3 text-xs font-semibold text-muted-foreground">Headcount</th><th className="text-right px-4 py-3 text-xs font-semibold text-muted-foreground">% Share</th></tr></thead>
                  <tbody>{departmentStaffData.map((d) => { const total = departmentStaffData.reduce((s, e) => s + e.count, 0); return (<tr key={d.department} className="border-b border-border/50 hover:bg-muted/20"><td className="px-4 py-3 text-sm font-medium text-foreground flex items-center gap-2"><span className="w-3 h-3 rounded-full" style={{ backgroundColor: d.color }} />{d.department}</td><td className="px-4 py-3 text-sm text-right font-bold">{d.count}</td><td className="px-4 py-3 text-sm text-right">{((d.count / total) * 100).toFixed(1)}%</td></tr>); })}</tbody>
                </table>
              </div>
            </motion.div>
          )}
        </motion.div>
      )}
    </motion.div>
  )
}
