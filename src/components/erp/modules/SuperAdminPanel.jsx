'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Shield, Building2, GraduationCap, Users, IndianRupee, BookOpen,
  Bus, Building, Briefcase, FileText, Brain, CheckCircle2, Clock,
  AlertTriangle, Settings, ChevronRight, Globe, Lock, Unlock,
  Plus, Download, Upload, Search, Filter, Eye, Edit, Trash2,
  MapPin, Phone, Mail, Calendar, BarChart3, Server, Database,
  Cpu, Wifi, Layers, Key, UserCheck, ArrowUpRight, Star,
  TrendingUp, Zap, Activity, PieChart as PieChartIcon
} from 'lucide-react'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts'
import useAppStore from '@/store/useAppStore'

// ─── Data ────────────────────────────────────────────────────────
const campuses = [
  {
    id: 1,
    name: 'Birla Open Minds, Singur',
    code: 'BOM-SGR',
    location: 'Singur, Hooghly, West Bengal',
    students: 2547,
    staff: 186,
    status: 'Active',
    board: 'CBSE',
    grade: 'Nursery - XII',
    established: 2015,
    udise: '19080100101',
    performance: 92,
    color: '#22D3EE',
  },
  {
    id: 2,
    name: 'Birla Open Minds, Kolkata',
    code: 'BOM-KOL',
    location: 'Salt Lake, Kolkata, West Bengal',
    students: 1820,
    staff: 142,
    status: 'Active',
    board: 'CBSE',
    grade: 'I - XII',
    established: 2018,
    udise: '19080100201',
    performance: 88,
    color: '#C8A45C',
  },
  {
    id: 3,
    name: 'Birla Open Minds, Durgapur',
    code: 'BOM-DGR',
    location: 'City Center, Durgapur, West Bengal',
    students: 980,
    staff: 78,
    status: 'Probationary',
    board: 'CBSE',
    grade: 'Nursery - VIII',
    established: 2023,
    udise: '19080100301',
    performance: 74,
    color: '#8B5CF6',
  },
]

const academicYears = [
  { year: '2025-26', status: 'Active', terms: 3, currentTerm: 'Term 2', startDate: 'Apr 1, 2025', endDate: 'Mar 31, 2026' },
  { year: '2024-25', status: 'Archived', terms: 3, currentTerm: '-', startDate: 'Apr 1, 2024', endDate: 'Mar 31, ' },
  { year: '2023-24', status: 'Archived', terms: 3, currentTerm: '-', startDate: 'Apr 1, 2023', endDate: 'Mar 31, 2024' },
]

const udiseData = [
  { id: 1, campus: 'BOM-SGR', category: 'Enrollment', lastUpdated: 'Feb 28, 2026', status: 'Submitted', records: 2547 },
  { id: 2, campus: 'BOM-SGR', category: 'Teacher Profile', lastUpdated: 'Feb 15, 2026', status: 'Submitted', records: 186 },
  { id: 3, campus: 'BOM-SGR', category: 'Infrastructure', lastUpdated: 'Jan 20, 2026', status: 'In Progress', records: 45 },
  { id: 4, campus: 'BOM-KOL', category: 'Enrollment', lastUpdated: 'Feb 28, 2026', status: 'Submitted', records: 1820 },
  { id: 5, campus: 'BOM-KOL', category: 'Teacher Profile', lastUpdated: 'Feb 10, 2026', status: 'Draft', records: 142 },
  { id: 6, campus: 'BOM-DGR', category: 'Enrollment', lastUpdated: 'Mar 1, 2026', status: 'In Progress', records: 980 },
  { id: 7, campus: 'BOM-DGR', category: 'Infrastructure', lastUpdated: 'Jan 5, 2026', status: 'Pending', records: 32 },
]

const boardAffiliations = [
  { campus: 'BOM-SGR', board: 'CBSE', affiliation: '2730456', validTill: 'Mar 2028', status: 'Active', level: 'Senior Secondary' },
  { campus: 'BOM-KOL', board: 'CBSE', affiliation: '2730789', validTill: 'Mar 2027', status: 'Active', level: 'Senior Secondary' },
  { campus: 'BOM-DGR', board: 'CBSE', affiliation: '2731023', validTill: 'Mar 2026', status: 'Probationary', level: 'Secondary' },
]

const rolesPermissions = [
  { role: 'Super Admin', users: 2, modules: 'All', level: 'Full Access', icon: Shield, color: 'text-red-500 bg-red-500/10' },
  { role: 'School Admin', users: 3, modules: 'All', level: 'Read/Write', icon: Building2, color: 'text-blue-500 bg-blue-500/10' },
  { role: 'Principal', users: 3, modules: 'Academic, HR', level: 'Read/Write', icon: GraduationCap, color: 'text-purple-500 bg-purple-500/10' },
  { role: 'Vice Principal', users: 4, modules: 'Academic', level: 'Read/Write', icon: BookOpen, color: 'text-indigo-500 bg-indigo-500/10' },
  { role: 'Teacher', users: 156, modules: 'LMS, Attendance', level: 'Limited', icon: Users, color: 'text-emerald-500 bg-emerald-500/10' },
  { role: 'Accountant', users: 6, modules: 'Finance', level: 'Read/Write', icon: IndianRupee, color: 'text-amber-500 bg-amber-500/10' },
  { role: 'Librarian', users: 3, modules: 'Library', level: 'Read/Write', icon: BookOpen, color: 'text-teal-500 bg-teal-500/10' },
  { role: 'Parent', users: 2450, modules: 'Portal', level: 'Read Only', icon: UserCheck, color: 'text-pink-500 bg-pink-500/10' },
]

const feeStructureData = [
  { class: 'Nursery', tuition: 36000, development: 6000, transport: 24000, total: 66000 },
  { class: 'LKG - UKG', tuition: 42000, development: 6000, transport: 24000, total: 72000 },
  { class: 'I - V', tuition: 48000, development: 8000, transport: 24000, total: 80000 },
  { class: 'VI - VIII', tuition: 54000, development: 8000, transport: 24000, total: 86000 },
  { class: 'IX - X', tuition: 60000, development: 10000, transport: 24000, total: 94000 },
  { class: 'XI - XII', tuition: 66000, development: 10000, transport: 24000, total: 100000 },
]

const lmsConfig = [
  { module: 'Virtual Classroom', status: 'Active', provider: 'Built-in', sessions: 1240, icon: Wifi },
  { module: 'Content Library', status: 'Active', provider: 'Custom', sessions: 5600, icon: Layers },
  { module: 'Assignment Engine', status: 'Active', provider: 'Built-in', sessions: 890, icon: FileText },
  { module: 'Assessment Builder', status: 'Active', provider: 'Built-in', sessions: 340, icon: BarChart3 },
  { module: 'Competency Tracker', status: 'Beta', provider: 'AI-Powered', sessions: 120, icon: Brain },
  { module: 'Parent Dashboard', status: 'Active', provider: 'Built-in', sessions: 3200, icon: Users },
]

const transportHostel = [
  { type: 'Transport', icon: Bus, stats: { routes: 18, vehicles: 24, students: 890, drivers: 28 }, status: 'Active' },
  { type: 'Hostel', icon: Building, stats: { rooms: 120, capacity: 480, occupied: 356, wardens: 8 }, status: 'Active' },
]

const hrPayroll = {
  totalStaff: 406,
  departments: 12,
  monthlyPayroll: '₹1.24Cr',
  pendingLeaves: 18,
  openPositions: 5,
  compliance: 98,
}

const auditLogs = [
  { id: 1, user: 'Admin User', action: 'Fee structure updated', module: 'Finance', ip: '192.168.1.45', time: '5 min ago', severity: 'info' },
  { id: 2, user: 'Dr. Priya Menon', action: 'Grade modification - Class X', module: 'Academic', ip: '192.168.1.67', time: '18 min ago', severity: 'info' },
  { id: 3, user: 'System', action: 'Backup completed successfully', module: 'System', ip: '10.0.0.1', time: '1 hr ago', severity: 'success' },
  { id: 4, user: 'Rajesh Kumar', action: 'Failed login attempt (3x)', module: 'Auth', ip: '203.45.67.89', time: '2 hrs ago', severity: 'warning' },
  { id: 5, user: 'Admin User', action: 'Role permission modified', module: 'Admin', ip: '192.168.1.45', time: '3 hrs ago', severity: 'info' },
  { id: 6, user: 'System', action: 'UDISE+ data sync completed', module: 'Compliance', ip: '10.0.0.1', time: '4 hrs ago', severity: 'success' },
  { id: 7, user: 'Accountant', action: 'Bulk fee receipt generated', module: 'Finance', ip: '192.168.1.78', time: '5 hrs ago', severity: 'info' },
]

const aiAnalytics = {
  predictions: [
    { label: 'Next Year Enrollment', value: '2,820', confidence: 92, trend: 'up' },
    { label: 'Fee Default Risk', value: '8.3%', confidence: 88, trend: 'down' },
    { label: 'Teacher Attrition', value: '4.1%', confidence: 85, trend: 'down' },
    { label: 'Student Performance', value: '+7.2%', confidence: 90, trend: 'up' },
  ],
  lastTrained: '2 hrs ago',
  modelVersion: 'v3.2.1',
  dataPoints: '1.2M',
}

// ─── Animation ───────────────────────────────────────────────────
const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.06 } },
}
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
}

export default function SuperAdminPanel() {
  const { darkMode } = useAppStore()
  const [activeSection, setActiveSection] = useState('overview')
  const [selectedCampus, setSelectedCampus] = useState(null)

  const sections = [
    { id: 'overview', label: 'Multi-Campus Overview', icon: Building2 },
    { id: 'academic', label: 'Academic Year Setup', icon: Calendar },
    { id: 'udise', label: 'UDISE+ Management', icon: Globe },
    { id: 'board', label: 'Board Affiliation', icon: GraduationCap },
    { id: 'roles', label: 'Roles & Permissions', icon: Key },
    { id: 'fees', label: 'Fee Structure', icon: IndianRupee },
    { id: 'lms', label: 'LMS Config', icon: BookOpen },
    { id: 'transport', label: 'Transport & Hostel', icon: Bus },
    { id: 'hr', label: 'HR & Payroll', icon: Briefcase },
    { id: 'audit', label: 'Audit Logs', icon: FileText },
    { id: 'ai', label: 'AI Analytics', icon: Brain },
  ]

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="p-4 lg:p-6 space-y-6 max-w-[1600px] mx-auto"
    >
      {/* ─── Section Navigation ──────────────────────────── */}
      <motion.div variants={itemVariants} className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
        {sections.map((sec) => {
          const Icon = sec.icon
          return (
            <button
              key={sec.id}
              onClick={() => setActiveSection(sec.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                activeSection === sec.id
                  ? 'gradient-birla text-white shadow-md'
                  : 'border border-border text-muted-foreground hover:bg-muted hover:text-foreground'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              {sec.label}
            </button>
          )
        })}
      </motion.div>

      {/* ─── Multi-Campus Overview ───────────────────────── */}
      {activeSection === 'overview' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {campuses.map((campus) => (
              <motion.div
                key={campus.id}
                variants={itemVariants}
                className="rounded-2xl border border-border bg-card p-5 hover:shadow-lg transition-all group cursor-pointer"
                onClick={() => setSelectedCampus(selectedCampus === campus.id ? null : campus.id)}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-xl gradient-birla flex items-center justify-center">
                      <Building2 className="w-5 h-5 text-birla-gold" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-foreground">{campus.code}</h4>
                      <p className="text-[10px] text-muted-foreground">{campus.name}</p>
                    </div>
                  </div>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${
                    campus.status === 'Active'
                      ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                      : 'bg-amber-500/10 text-amber-600 dark:text-amber-400'
                  }`}>
                    {campus.status}
                  </span>
                </div>
                <div className="flex items-center gap-1 text-xs text-muted-foreground mb-3">
                  <MapPin className="w-3 h-3" />
                  {campus.location}
                </div>
                <div className="grid grid-cols-3 gap-2 mb-3">
                  <div className="text-center p-2 rounded-lg bg-muted/30">
                    <p className="text-lg font-bold" style={{ color: campus.color }}>{campus.students.toLocaleString()}</p>
                    <p className="text-[10px] text-muted-foreground">Students</p>
                  </div>
                  <div className="text-center p-2 rounded-lg bg-muted/30">
                    <p className="text-lg font-bold text-foreground">{campus.staff}</p>
                    <p className="text-[10px] text-muted-foreground">Staff</p>
                  </div>
                  <div className="text-center p-2 rounded-lg bg-muted/30">
                    <p className="text-lg font-bold text-foreground">{campus.performance}%</p>
                    <p className="text-[10px] text-muted-foreground">Score</p>
                  </div>
                </div>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>{campus.board} &bull; {campus.grade}</span>
                  <span>Est. {campus.established}</span>
                </div>
                {/* Expanded Details */}
                <AnimatePresence>
                  {selectedCampus === campus.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="mt-3 pt-3 border-t border-border space-y-2">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-muted-foreground">UDISE+ Code</span>
                          <span className="font-mono text-foreground">{campus.udise}</span>
                        </div>
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-muted-foreground">Performance Index</span>
                          <div className="flex items-center gap-2">
                            <div className="w-20 h-1.5 rounded-full bg-muted overflow-hidden">
                              <div className="h-full rounded-full" style={{ width: `${campus.performance}%`, backgroundColor: campus.color }} />
                            </div>
                            <span className="font-medium text-foreground">{campus.performance}%</span>
                          </div>
                        </div>
                        <button className="w-full mt-2 py-2 rounded-lg border border-birla-gold/30 text-birla-gold text-xs font-medium hover:bg-birla-gold/10 transition-colors flex items-center justify-center gap-1">
                          <Eye className="w-3.5 h-3.5" /> View Full Details
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>

          {/* Consolidated Stats */}
          <motion.div variants={itemVariants} className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { label: 'Total Students', value: '5,347', icon: Users, color: 'text-blue-500 bg-blue-500/10' },
              { label: 'Total Staff', value: '406', icon: Briefcase, color: 'text-purple-500 bg-purple-500/10' },
              { label: 'Avg Performance', value: '84.7%', icon: TrendingUp, color: 'text-emerald-500 bg-emerald-500/10' },
              { label: 'Active Campuses', value: '3', icon: Building2, color: 'text-amber-500 bg-amber-500/10' },
            ].map((stat) => {
              const Icon = stat.icon
              return (
                <div key={stat.label} className="rounded-xl border border-border bg-card p-4 flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${stat.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-lg font-bold text-foreground">{stat.value}</p>
                    <p className="text-[11px] text-muted-foreground">{stat.label}</p>
                  </div>
                </div>
              )
            })}
          </motion.div>
        </div>
      )}

      {/* ─── Academic Year Setup ─────────────────────────── */}
      {activeSection === 'academic' && (
        <motion.div variants={itemVariants} className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-semibold text-foreground flex items-center gap-2">
              <Calendar className="w-5 h-5 text-birla-cyan" />
              Academic Year Configuration
            </h3>
            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg gradient-birla text-white text-xs font-medium hover:opacity-90 transition-opacity">
              <Plus className="w-3.5 h-3.5" /> New Academic Year
            </button>
          </div>

          <div className="grid gap-4">
            {academicYears.map((ay) => (
              <div key={ay.year} className="rounded-2xl border border-border bg-card p-5">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl gradient-birla flex items-center justify-center text-white">
                      <Calendar className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-base font-semibold text-foreground">AY {ay.year}</h4>
                      <p className="text-xs text-muted-foreground">{ay.startDate} — {ay.endDate}</p>
                    </div>
                  </div>
                  <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                    ay.status === 'Active'
                      ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                      : 'bg-muted text-muted-foreground'
                  }`}>
                    {ay.status}
                  </span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="p-3 rounded-xl bg-muted/30">
                    <p className="text-[10px] text-muted-foreground">Terms</p>
                    <p className="text-sm font-semibold text-foreground">{ay.terms}</p>
                  </div>
                  <div className="p-3 rounded-xl bg-muted/30">
                    <p className="text-[10px] text-muted-foreground">Current Term</p>
                    <p className="text-sm font-semibold text-foreground">{ay.currentTerm}</p>
                  </div>
                  <div className="p-3 rounded-xl bg-muted/30">
                    <p className="text-[10px] text-muted-foreground">Working Days</p>
                    <p className="text-sm font-semibold text-foreground">{ay.status === 'Active' ? '220' : '218'}</p>
                  </div>
                  <div className="p-3 rounded-xl bg-muted/30">
                    <p className="text-[10px] text-muted-foreground">Holidays</p>
                    <p className="text-sm font-semibold text-foreground">{ay.status === 'Active' ? '45' : '42'}</p>
                  </div>
                </div>
                {ay.status === 'Active' && (
                  <div className="mt-3 flex items-center gap-2">
                    <button className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-border text-xs font-medium hover:bg-muted transition-colors">
                      <Edit className="w-3 h-3" /> Edit Terms
                    </button>
                    <button className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-border text-xs font-medium hover:bg-muted transition-colors">
                      <Settings className="w-3 h-3" /> Configure
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* ─── UDISE+ Data Management ──────────────────────── */}
      {activeSection === 'udise' && (
        <motion.div variants={itemVariants} className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-semibold text-foreground flex items-center gap-2">
              <Globe className="w-5 h-5 text-birla-cyan" />
              UDISE+ Data Management
            </h3>
            <div className="flex items-center gap-2">
              <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border text-xs font-medium hover:bg-muted transition-colors">
                <Upload className="w-3.5 h-3.5" /> Upload
              </button>
              <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border text-xs font-medium hover:bg-muted transition-colors">
                <Download className="w-3.5 h-3.5" /> Export
              </button>
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border bg-muted/30">
                    <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Campus</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Category</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Records</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Last Updated</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Status</th>
                    <th className="text-right px-4 py-3 text-xs font-semibold text-muted-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {udiseData.map((row) => (
                    <tr key={row.id} className="border-b border-border/50 hover:bg-muted/20 transition-colors">
                      <td className="px-4 py-3 text-sm font-medium text-foreground">{row.campus}</td>
                      <td className="px-4 py-3 text-sm text-muted-foreground">{row.category}</td>
                      <td className="px-4 py-3 text-sm text-foreground">{row.records.toLocaleString()}</td>
                      <td className="px-4 py-3 text-sm text-muted-foreground">{row.lastUpdated}</td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium ${
                          row.status === 'Submitted' ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' :
                          row.status === 'In Progress' ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400' :
                          row.status === 'Draft' ? 'bg-blue-500/10 text-blue-600 dark:text-blue-400' :
                          'bg-red-500/10 text-red-600 dark:text-red-400'
                        }`}>
                          {row.status === 'Submitted' ? <CheckCircle2 className="w-3 h-3" /> :
                           row.status === 'In Progress' ? <Clock className="w-3 h-3" /> :
                           row.status === 'Draft' ? <Edit className="w-3 h-3" /> :
                           <AlertTriangle className="w-3 h-3" />}
                          {row.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <button className="p-1.5 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"><Eye className="w-3.5 h-3.5" /></button>
                          <button className="p-1.5 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"><Edit className="w-3.5 h-3.5" /></button>
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

      {/* ─── Board Affiliation ───────────────────────────── */}
      {activeSection === 'board' && (
        <motion.div variants={itemVariants} className="space-y-4">
          <h3 className="text-base font-semibold text-foreground flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-birla-gold" />
            Board Affiliation Status
          </h3>
          <div className="grid gap-4">
            {boardAffiliations.map((aff, i) => (
              <div key={i} className="rounded-2xl border border-border bg-card p-5">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-birla-gold/10 flex items-center justify-center">
                      <GraduationCap className="w-6 h-6 text-birla-gold" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-foreground">{aff.campus}</h4>
                      <p className="text-xs text-muted-foreground">{aff.board} Affiliation</p>
                    </div>
                  </div>
                  <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                    aff.status === 'Active'
                      ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                      : 'bg-amber-500/10 text-amber-600 dark:text-amber-400'
                  }`}>
                    {aff.status}
                  </span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="p-3 rounded-xl bg-muted/30">
                    <p className="text-[10px] text-muted-foreground">Affiliation No.</p>
                    <p className="text-sm font-semibold font-mono text-foreground">{aff.affiliation}</p>
                  </div>
                  <div className="p-3 rounded-xl bg-muted/30">
                    <p className="text-[10px] text-muted-foreground">Valid Till</p>
                    <p className="text-sm font-semibold text-foreground">{aff.validTill}</p>
                  </div>
                  <div className="p-3 rounded-xl bg-muted/30">
                    <p className="text-[10px] text-muted-foreground">Level</p>
                    <p className="text-sm font-semibold text-foreground">{aff.level}</p>
                  </div>
                  <div className="p-3 rounded-xl bg-muted/30">
                    <p className="text-[10px] text-muted-foreground">Renewal Status</p>
                    <p className="text-sm font-semibold text-foreground">{aff.status === 'Active' ? 'On Track' : 'Pending Review'}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* ─── Roles & Permissions ─────────────────────────── */}
      {activeSection === 'roles' && (
        <motion.div variants={itemVariants} className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-semibold text-foreground flex items-center gap-2">
              <Key className="w-5 h-5 text-purple-500" />
              Roles & Permission Matrix
            </h3>
            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg gradient-birla text-white text-xs font-medium">
              <Plus className="w-3.5 h-3.5" /> Add Role
            </button>
          </div>
          <div className="grid gap-3">
            {rolesPermissions.map((rp) => {
              const Icon = rp.icon
              return (
                <div key={rp.role} className="rounded-xl border border-border bg-card p-4 flex items-center justify-between hover:shadow-sm transition-all group">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${rp.color}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-foreground">{rp.role}</h4>
                      <p className="text-xs text-muted-foreground">{rp.modules}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-sm font-semibold text-foreground">{rp.users}</p>
                      <p className="text-[10px] text-muted-foreground">Users</p>
                    </div>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${
                      rp.level === 'Full Access' ? 'bg-red-500/10 text-red-600 dark:text-red-400' :
                      rp.level === 'Read/Write' ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' :
                      'bg-blue-500/10 text-blue-600 dark:text-blue-400'
                    }`}>
                      {rp.level}
                    </span>
                    <button className="p-2 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors opacity-0 group-hover:opacity-100">
                      <Edit className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        </motion.div>
      )}

      {/* ─── Fee Structure ───────────────────────────────── */}
      {activeSection === 'fees' && (
        <motion.div variants={itemVariants} className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-semibold text-foreground flex items-center gap-2">
              <IndianRupee className="w-5 h-5 text-birla-gold" />
              Fee Structure Management
            </h3>
            <div className="flex items-center gap-2">
              <select className="px-3 py-1.5 rounded-lg border border-border bg-background text-xs text-foreground">
                <option>BOM-SGR</option>
                <option>BOM-KOL</option>
                <option>BOM-DGR</option>
              </select>
              <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg gradient-birla text-white text-xs font-medium">
                <Edit className="w-3.5 h-3.5" /> Update
              </button>
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border bg-muted/30">
                    <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Class</th>
                    <th className="text-right px-4 py-3 text-xs font-semibold text-muted-foreground">Tuition</th>
                    <th className="text-right px-4 py-3 text-xs font-semibold text-muted-foreground">Development Fee</th>
                    <th className="text-right px-4 py-3 text-xs font-semibold text-muted-foreground">Transport</th>
                    <th className="text-right px-4 py-3 text-xs font-semibold text-muted-foreground">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {feeStructureData.map((row) => (
                    <tr key={row.class} className="border-b border-border/50 hover:bg-muted/20 transition-colors">
                      <td className="px-4 py-3 text-sm font-medium text-foreground">{row.class}</td>
                      <td className="px-4 py-3 text-sm text-right text-foreground">₹{row.tuition.toLocaleString()}</td>
                      <td className="px-4 py-3 text-sm text-right text-muted-foreground">₹{row.development.toLocaleString()}</td>
                      <td className="px-4 py-3 text-sm text-right text-muted-foreground">₹{row.transport.toLocaleString()}</td>
                      <td className="px-4 py-3 text-sm text-right font-semibold text-birla-gold">₹{row.total.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="h-52">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={feeStructureData}>
                <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'} />
                <XAxis dataKey="class" tick={{ fontSize: 10 }} stroke={darkMode ? '#64748b' : '#94a3b8'} />
                <YAxis tick={{ fontSize: 10 }} stroke={darkMode ? '#64748b' : '#94a3b8'} tickFormatter={(v) => `₹${v / 1000}K`} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: darkMode ? '#1A2D4A' : '#fff',
                    border: `1px solid ${darkMode ? 'rgba(255,255,255,0.1)' : '#e2e8f0'}`,
                    borderRadius: '12px',
                    fontSize: '12px',
                    color: darkMode ? '#e2e8f0' : '#1e293b',
                  }}
                  formatter={(value) => [`₹${value.toLocaleString()}`, '']}
                />
                <Legend iconType="circle" wrapperStyle={{ fontSize: '11px' }} />
                <Bar dataKey="tuition" fill="#1A2D4A" radius={[3, 3, 0, 0]} name="Tuition" />
                <Bar dataKey="development" fill="#C8A45C" radius={[3, 3, 0, 0]} name="Development" />
                <Bar dataKey="transport" fill="#22D3EE" radius={[3, 3, 0, 0]} name="Transport" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      )}

      {/* ─── LMS Configuration ───────────────────────────── */}
      {activeSection === 'lms' && (
        <motion.div variants={itemVariants} className="space-y-4">
          <h3 className="text-base font-semibold text-foreground flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-birla-cyan" />
            LMS Configuration Status
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {lmsConfig.map((mod) => {
              const Icon = mod.icon
              return (
                <div key={mod.module} className="rounded-xl border border-border bg-card p-4 hover:shadow-sm transition-all">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg gradient-birla-cyan flex items-center justify-center">
                        <Icon className="w-4 h-4 text-white" />
                      </div>
                      <h4 className="text-sm font-medium text-foreground">{mod.module}</h4>
                    </div>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${
                      mod.status === 'Active' ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' :
                      'bg-amber-500/10 text-amber-600 dark:text-amber-400'
                    }`}>
                      {mod.status}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>{mod.provider}</span>
                    <span>{mod.sessions.toLocaleString()} sessions</span>
                  </div>
                </div>
              )
            })}
          </div>
        </motion.div>
      )}

      {/* ─── Transport & Hostel ──────────────────────────── */}
      {activeSection === 'transport' && (
        <motion.div variants={itemVariants} className="space-y-4">
          <h3 className="text-base font-semibold text-foreground flex items-center gap-2">
            <Bus className="w-5 h-5 text-amber-500" />
            Transport & Hostel Setup
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {transportHostel.map((item) => {
              const Icon = item.icon
              return (
                <div key={item.type} className="rounded-2xl border border-border bg-card p-5">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-xl gradient-birla flex items-center justify-center">
                      <Icon className="w-6 h-6 text-birla-gold" />
                    </div>
                    <div>
                      <h4 className="text-base font-semibold text-foreground">{item.type}</h4>
                      <span className="text-xs text-emerald-500 font-medium">{item.status}</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    {Object.entries(item.stats).map(([key, value]) => (
                      <div key={key} className="p-3 rounded-xl bg-muted/30">
                        <p className="text-lg font-bold text-foreground">{value.toLocaleString()}</p>
                        <p className="text-[10px] text-muted-foreground capitalize">{key}</p>
                      </div>
                    ))}
                  </div>
                  <button className="w-full mt-3 py-2 rounded-lg border border-birla-gold/30 text-birla-gold text-xs font-medium hover:bg-birla-gold/10 transition-colors flex items-center justify-center gap-1">
                    <Settings className="w-3.5 h-3.5" /> Configure {item.type}
                  </button>
                </div>
              )
            })}
          </div>
        </motion.div>
      )}

      {/* ─── HR & Payroll ────────────────────────────────── */}
      {activeSection === 'hr' && (
        <motion.div variants={itemVariants} className="space-y-4">
          <h3 className="text-base font-semibold text-foreground flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-purple-500" />
            HR & Payroll Summary
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {[
              { label: 'Total Staff', value: hrPayroll.totalStaff, icon: Users, color: 'text-blue-500 bg-blue-500/10' },
              { label: 'Departments', value: hrPayroll.departments, icon: Building2, color: 'text-purple-500 bg-purple-500/10' },
              { label: 'Monthly Payroll', value: hrPayroll.monthlyPayroll, icon: IndianRupee, color: 'text-amber-500 bg-amber-500/10' },
              { label: 'Pending Leaves', value: hrPayroll.pendingLeaves, icon: Clock, color: 'text-red-500 bg-red-500/10' },
              { label: 'Open Positions', value: hrPayroll.openPositions, icon: Plus, color: 'text-emerald-500 bg-emerald-500/10' },
              { label: 'Compliance', value: `${hrPayroll.compliance}%`, icon: Shield, color: 'text-cyan-500 bg-cyan-500/10' },
            ].map((stat) => {
              const Icon = stat.icon
              return (
                <div key={stat.label} className="rounded-xl border border-border bg-card p-4 text-center">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-2 ${stat.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <p className="text-lg font-bold text-foreground">{stat.value}</p>
                  <p className="text-[10px] text-muted-foreground">{stat.label}</p>
                </div>
              )
            })}
          </div>
        </motion.div>
      )}

      {/* ─── Audit Logs ──────────────────────────────────── */}
      {activeSection === 'audit' && (
        <motion.div variants={itemVariants} className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-semibold text-foreground flex items-center gap-2">
              <FileText className="w-5 h-5 text-red-500" />
              Audit Logs
            </h3>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search logs..."
                  className="pl-8 pr-3 py-1.5 rounded-lg border border-border bg-background text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-birla-gold/40"
                />
              </div>
              <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border text-xs font-medium hover:bg-muted transition-colors">
                <Download className="w-3.5 h-3.5" /> Export
              </button>
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border bg-muted/30">
                    <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">User</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Action</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Module</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">IP Address</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Time</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Severity</th>
                  </tr>
                </thead>
                <tbody>
                  {auditLogs.map((log) => (
                    <tr key={log.id} className="border-b border-border/50 hover:bg-muted/20 transition-colors">
                      <td className="px-4 py-3 text-sm font-medium text-foreground">{log.user}</td>
                      <td className="px-4 py-3 text-sm text-muted-foreground">{log.action}</td>
                      <td className="px-4 py-3">
                        <span className="px-2 py-0.5 rounded-md bg-muted text-[11px] text-muted-foreground">{log.module}</span>
                      </td>
                      <td className="px-4 py-3 text-xs font-mono text-muted-foreground">{log.ip}</td>
                      <td className="px-4 py-3 text-xs text-muted-foreground">{log.time}</td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium ${
                          log.severity === 'success' ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' :
                          log.severity === 'warning' ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400' :
                          'bg-blue-500/10 text-blue-600 dark:text-blue-400'
                        }`}>
                          {log.severity}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>
      )}

      {/* ─── AI Analytics ────────────────────────────────── */}
      {activeSection === 'ai' && (
        <motion.div variants={itemVariants} className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-semibold text-foreground flex items-center gap-2">
              <Brain className="w-5 h-5 text-birla-cyan" />
              AI Analytics Summary
            </h3>
            <span className="text-xs px-2.5 py-1 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 font-medium animate-pulse-glow">
              Live Model
            </span>
          </div>

          <div className="rounded-2xl border border-border bg-card p-5">
            <div className="grid grid-cols-3 gap-3 mb-5">
              <div className="p-3 rounded-xl bg-muted/30 text-center">
                <Cpu className="w-5 h-5 mx-auto text-birla-cyan mb-1" />
                <p className="text-xs text-muted-foreground">Model Version</p>
                <p className="text-sm font-semibold text-foreground">{aiAnalytics.modelVersion}</p>
              </div>
              <div className="p-3 rounded-xl bg-muted/30 text-center">
                <Database className="w-5 h-5 mx-auto text-birla-gold mb-1" />
                <p className="text-xs text-muted-foreground">Data Points</p>
                <p className="text-sm font-semibold text-foreground">{aiAnalytics.dataPoints}</p>
              </div>
              <div className="p-3 rounded-xl bg-muted/30 text-center">
                <Clock className="w-5 h-5 mx-auto text-emerald-500 mb-1" />
                <p className="text-xs text-muted-foreground">Last Trained</p>
                <p className="text-sm font-semibold text-foreground">{aiAnalytics.lastTrained}</p>
              </div>
            </div>

            <h4 className="text-sm font-semibold text-foreground mb-3">Predictive Insights</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {aiAnalytics.predictions.map((pred) => (
                <div key={pred.label} className="flex items-center justify-between p-4 rounded-xl border border-border hover:shadow-sm transition-all">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                      pred.trend === 'up' ? 'bg-emerald-500/10' : 'bg-red-500/10'
                    }`}>
                      {pred.trend === 'up' ? <TrendingUp className="w-4 h-4 text-emerald-500" /> : <ArrowUpRight className="w-4 h-4 text-red-500" />}
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">{pred.label}</p>
                      <p className="text-sm font-semibold text-foreground">{pred.value}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-birla-cyan">{pred.confidence}%</p>
                    <p className="text-[10px] text-muted-foreground">confidence</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  )
}
