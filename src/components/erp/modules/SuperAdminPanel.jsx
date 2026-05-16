'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Shield, Building2, GraduationCap, Users, IndianRupee, BookOpen,
  Bus, Building, Briefcase, FileText, Brain, CheckCircle2, Clock,
  AlertTriangle, ChevronRight, Globe, Lock,
  Plus, Download, Search, Eye, Edit,
  MapPin, Calendar, BarChart3, Layers, Key, UserCheck, ArrowUpRight,
  ArrowDownRight,
  Activity, PieChart as PieChartIcon, Hash, Settings, Trash2,
  Wifi, Server, Database, Zap, Star, Target, CreditCard,
  PenTool, Bell, MessageSquare, Bed, Car
} from 'lucide-react'
import {
  BarChart, Bar, AreaChart, Area, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts'
import useAppStore from '@/store/useAppStore'

// ─── Mock Data ─────────────────────────────────────────────────
const campuses = [
  { id: 1, name: 'Birla Open Minds, Singur', code: 'BOM-SGR', location: 'Singur, Hooghly, West Bengal', students: 2547, staff: 186, status: 'Active', board: 'CBSE', grade: 'Nursery - XII', established: 2015, udise: '19080100101', performance: 92, color: '#22D3EE' },
  { id: 2, name: 'Birla Open Minds, Kolkata', code: 'BOM-KOL', location: 'Salt Lake, Kolkata, West Bengal', students: 1820, staff: 142, status: 'Active', board: 'CBSE', grade: 'I - XII', established: 2018, udise: '19080100201', performance: 88, color: '#C8A45C' },
  { id: 3, name: 'Birla Open Minds, Durgapur', code: 'BOM-DGR', location: 'City Center, Durgapur, West Bengal', students: 980, staff: 78, status: 'Probationary', board: 'CBSE', grade: 'Nursery - VIII', established: 2023, udise: '19080100301', performance: 74, color: '#8B5CF6' },
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
  { role: 'Teacher', users: 156, modules: 'LMS, Attendance', level: 'Limited', icon: Users, color: 'text-emerald-500 bg-emerald-500/10' },
  { role: 'Accountant', users: 6, modules: 'Finance', level: 'Read/Write', icon: IndianRupee, color: 'text-amber-500 bg-amber-500/10' },
  { role: 'Parent', users: 2450, modules: 'Portal', level: 'Read Only', icon: UserCheck, color: 'text-pink-500 bg-pink-500/10' },
]

const feeStructureData = [
  { class: 'Nursery', tuition: 36000, development: 6000, transport: 24000, lab: 0, exam: 2000, total: 68000 },
  { class: 'LKG - UKG', tuition: 42000, development: 6000, transport: 24000, lab: 0, exam: 2000, total: 74000 },
  { class: 'I - V', tuition: 48000, development: 8000, transport: 24000, lab: 3000, exam: 3000, total: 86000 },
  { class: 'VI - VIII', tuition: 54000, development: 8000, transport: 24000, lab: 4000, exam: 3000, total: 93000 },
  { class: 'IX - X', tuition: 60000, development: 10000, transport: 24000, lab: 5000, exam: 5000, total: 104000 },
  { class: 'XI - XII', tuition: 66000, development: 10000, transport: 24000, lab: 6000, exam: 5000, total: 111000 },
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
  totalStaff: 406, departments: 12, monthlyPayroll: '₹1.24Cr', pendingLeaves: 18, openPositions: 5, compliance: 98,
}

const aiAnalytics = {
  predictions: [
    { label: 'Next Year Enrollment', value: '2,820', confidence: 92, trend: 'up' },
    { label: 'Fee Default Risk', value: '8.3%', confidence: 88, trend: 'down' },
    { label: 'Teacher Attrition', value: '4.1%', confidence: 85, trend: 'down' },
    { label: 'Student Performance', value: '+7.2%', confidence: 90, trend: 'up' },
  ],
  lastTrained: '2 hrs ago', modelVersion: 'v3.2.1', dataPoints: '1.2M',
}

// ─── Report Data ───────────────────────────────────────────────
const multiCampusPerformanceData = [
  { subject: 'Mathematics', BOM_SGR: 92, BOM_KOL: 88, BOM_DGR: 74 },
  { subject: 'Science', BOM_SGR: 89, BOM_KOL: 85, BOM_DGR: 72 },
  { subject: 'English', BOM_SGR: 95, BOM_KOL: 90, BOM_DGR: 78 },
  { subject: 'Hindi', BOM_SGR: 88, BOM_KOL: 82, BOM_DGR: 70 },
  { subject: 'Social Science', BOM_SGR: 90, BOM_KOL: 86, BOM_DGR: 71 },
  { subject: 'Computer Science', BOM_SGR: 94, BOM_KOL: 91, BOM_DGR: 76 },
]

const campusComparisonTable = [
  { campus: 'BOM-SGR', students: 2547, staff: 186, avgScore: 92, attendance: 94.2, feeCollection: '₹4.58L', performance: 'Excellent' },
  { campus: 'BOM-KOL', students: 1820, staff: 142, avgScore: 88, attendance: 91.8, feeCollection: '₹3.42L', performance: 'Good' },
  { campus: 'BOM-DGR', students: 980, staff: 78, avgScore: 74, attendance: 87.5, feeCollection: '₹1.85L', performance: 'Improving' },
]

const feeCollectionSummaryData = [
  { month: 'Apr', BOM_SGR: 38, BOM_KOL: 28, BOM_DGR: 14 },
  { month: 'May', BOM_SGR: 42, BOM_KOL: 32, BOM_DGR: 16 },
  { month: 'Jun', BOM_SGR: 35, BOM_KOL: 25, BOM_DGR: 12 },
  { month: 'Jul', BOM_SGR: 48, BOM_KOL: 36, BOM_DGR: 18 },
  { month: 'Aug', BOM_SGR: 45, BOM_KOL: 34, BOM_DGR: 17 },
  { month: 'Sep', BOM_SGR: 52, BOM_KOL: 38, BOM_DGR: 20 },
  { month: 'Oct', BOM_SGR: 40, BOM_KOL: 30, BOM_DGR: 15 },
  { month: 'Nov', BOM_SGR: 46, BOM_KOL: 35, BOM_DGR: 16 },
  { month: 'Dec', BOM_SGR: 50, BOM_KOL: 37, BOM_DGR: 19 },
  { month: 'Jan', BOM_SGR: 44, BOM_KOL: 33, BOM_DGR: 14 },
  { month: 'Feb', BOM_SGR: 48, BOM_KOL: 36, BOM_DGR: 18 },
  { month: 'Mar', BOM_SGR: 55, BOM_KOL: 40, BOM_DGR: 22 },
]

const feeCollectionSummaryTable = [
  { campus: 'BOM-SGR', total: 5430000, collected: 5080000, pending: 350000, rate: 93.6 },
  { campus: 'BOM-KOL', total: 3980000, collected: 3620000, pending: 360000, rate: 91.0 },
  { campus: 'BOM-DGR', total: 1850000, collected: 1580000, pending: 270000, rate: 85.4 },
]

const staffDistributionData = [
  { department: 'Science', count: 72, color: '#0A1628' },
  { department: 'Mathematics', count: 65, color: '#22D3EE' },
  { department: 'Languages', count: 78, color: '#C8A45C' },
  { department: 'Social Science', count: 48, color: '#8B5CF6' },
  { department: 'Physical Ed', count: 32, color: '#10B981' },
  { department: 'Arts & Music', count: 38, color: '#F59E0B' },
  { department: 'Administration', count: 45, color: '#EF4444' },
  { department: 'Support Staff', count: 28, color: '#6366F1' },
]

const staffCampusTable = [
  { campus: 'BOM-SGR', teaching: 120, nonTeaching: 46, admin: 20, total: 186 },
  { campus: 'BOM-KOL', teaching: 92, nonTeaching: 32, admin: 18, total: 142 },
  { campus: 'BOM-DGR', teaching: 52, nonTeaching: 18, admin: 8, total: 78 },
]

const bspPenUpparCompliance = [
  { campus: 'BOM-SGR', total: 2547, bspAssigned: 2343, bspPct: 92.0, penAssigned: 1987, penPct: 78.0, upparAssigned: 1732, upparPct: 68.0 },
  { campus: 'BOM-KOL', total: 1820, bspAssigned: 1648, bspPct: 90.5, penAssigned: 1362, penPct: 74.8, upparAssigned: 1134, upparPct: 62.3 },
  { campus: 'BOM-DGR', total: 980, bspAssigned: 862, bspPct: 88.0, penAssigned: 698, penPct: 71.2, upparAssigned: 548, upparPct: 55.9 },
]

const boardAffiliationReport = [
  { campus: 'BOM-SGR', board: 'CBSE', affiliation: '2730456', level: 'Senior Secondary', validTill: 'Mar 2028', renewalDue: 'Sep 2027', status: 'Active' },
  { campus: 'BOM-KOL', board: 'CBSE', affiliation: '2730789', level: 'Senior Secondary', validTill: 'Mar 2027', renewalDue: 'Sep 2026', status: 'Active' },
  { campus: 'BOM-DGR', board: 'CBSE', affiliation: '2731023', level: 'Secondary', validTill: 'Mar 2026', renewalDue: 'Sep 2025', status: 'Probationary' },
]

const auditLogData = [
  { id: 1, user: 'Admin User', action: 'Fee structure updated for BOM-SGR', module: 'Finance', ip: '192.168.1.45', time: '5 min ago', severity: 'info' },
  { id: 2, user: 'Dr. Priya Menon', action: 'Grade modification - Class X', module: 'Academic', ip: '192.168.1.67', time: '18 min ago', severity: 'info' },
  { id: 3, user: 'System', action: 'Backup completed successfully', module: 'System', ip: '10.0.0.1', time: '1 hr ago', severity: 'success' },
  { id: 4, user: 'Rajesh Kumar', action: 'Failed login attempt (3x)', module: 'Auth', ip: '203.45.67.89', time: '2 hrs ago', severity: 'warning' },
  { id: 5, user: 'Admin User', action: 'Role permission modified', module: 'Admin', ip: '192.168.1.45', time: '3 hrs ago', severity: 'info' },
  { id: 6, user: 'System', action: 'BSP ID batch assignment completed', module: 'Compliance', ip: '10.0.0.1', time: '4 hrs ago', severity: 'success' },
  { id: 7, user: 'Accountant', action: 'Bulk fee receipt generated', module: 'Finance', ip: '192.168.1.78', time: '5 hrs ago', severity: 'info' },
  { id: 8, user: 'Principal', action: 'Academic calendar published', module: 'Academic', ip: '192.168.1.55', time: '6 hrs ago', severity: 'info' },
  { id: 9, user: 'System', action: 'LMS content sync completed', module: 'LMS', ip: '10.0.0.1', time: '7 hrs ago', severity: 'success' },
  { id: 10, user: 'HR Manager', action: 'New staff onboarding initiated', module: 'HR', ip: '192.168.1.90', time: '8 hrs ago', severity: 'info' },
]

const hrPayrollData = [
  { department: 'Science', staff: 72, avgSalary: 45000, totalSalary: 3240000 },
  { department: 'Mathematics', staff: 65, avgSalary: 44000, totalSalary: 2860000 },
  { department: 'Languages', staff: 78, avgSalary: 42000, totalSalary: 3276000 },
  { department: 'Social Science', staff: 48, avgSalary: 43000, totalSalary: 2064000 },
  { department: 'Physical Ed', staff: 32, avgSalary: 38000, totalSalary: 1216000 },
  { department: 'Arts & Music', staff: 38, avgSalary: 36000, totalSalary: 1368000 },
  { department: 'Administration', staff: 45, avgSalary: 52000, totalSalary: 2340000 },
  { department: 'Support Staff', staff: 28, avgSalary: 22000, totalSalary: 616000 },
]

const academicYearComparison = [
  { year: '2020-21', enrollment: 3850 },
  { year: '2021-22', enrollment: 4200 },
  { year: '2022-23', enrollment: 4650 },
  { year: '2023-24', enrollment: 4980 },
  { year: '2024-25', enrollment: 5100 },
  { year: '2025-26', enrollment: 5347 },
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

export default function SuperAdminPanel() {
  const { darkMode } = useAppStore()
  const [activeTab, setActiveTab] = useState('overview')

  // ─── Form States ──────────────────────────────────────
  const [activeForm, setActiveForm] = useState(null)
  const [activeReport, setActiveReport] = useState(null)

  const [campusForm, setCampusForm] = useState({
    campusName: '', code: '', location: '', board: '', gradeRange: '', establishedYear: '', udiseCode: '',
  })
  const [academicYearForm, setAcademicYearForm] = useState({
    year: '', startDate: '', endDate: '', terms: '', workingDays: '', holidays: '',
  })
  const [boardAffForm, setBoardAffForm] = useState({
    campus: '', board: '', affiliationNumber: '', validTill: '', level: '', status: '',
  })
  const [roleForm, setRoleForm] = useState({
    roleName: '', description: '', modules: [], accessLevel: '',
  })
  const [feeStructForm, setFeeStructForm] = useState({
    campus: '', class: '', tuitionFee: '', developmentFee: '', transportFee: '', labFee: '', examFee: '',
  })
  const [lmsConfigForm, setLmsConfigForm] = useState({
    moduleName: '', provider: '', status: '', description: '',
  })
  const [transportForm, setTransportForm] = useState({
    routeName: '', stops: '', distance: '', time: '', vehicleNo: '', driverName: '', driverPhone: '', capacity: '', fee: '',
  })
  const [hostelForm, setHostelForm] = useState({
    block: '', floor: '', roomNumber: '', roomType: '', capacity: '', occupants: '', warden: '',
  })
  const [hrForm, setHrForm] = useState({
    name: '', department: '', designation: '', phone: '', email: '', joinDate: '', salary: '', campus: '', role: '',
  })
  const [bspForm, setBspForm] = useState({
    class: '', section: '',
  })

  const [bspPreviewStudents, setBspPreviewStudents] = useState([
    { id: 'BOM-001', name: 'Aarav Sharma', class: 'VI', section: 'A', bspId: '', penNo: '', upparId: '' },
    { id: 'BOM-002', name: 'Priya Gupta', class: 'VI', section: 'A', bspId: 'BSP/WB/2023/00034', penNo: '', upparId: '' },
    { id: 'BOM-003', name: 'Arjun Reddy', class: 'VI', section: 'A', bspId: '', penNo: 'PEN-2023-0056', upparId: '' },
    { id: 'BOM-004', name: 'Ananya Iyer', class: 'VI', section: 'B', bspId: 'BSP/WB/2023/00078', penNo: 'PEN-2023-0078', upparId: '' },
    { id: 'BOM-005', name: 'Rohan Patel', class: 'VI', section: 'B', bspId: '', penNo: '', upparId: '' },
    { id: 'BOM-006', name: 'Ishita Banerjee', class: 'VI', section: 'A', bspId: 'BSP/WB/2023/00102', penNo: 'PEN-2023-0102', upparId: 'UPPR-WB-000102' },
  ])

  const [auditSearch, setAuditSearch] = useState('')
  const [auditModuleFilter, setAuditModuleFilter] = useState('')

  // Compute auto-calculated total fee
  const computedTotalFee = (Number(feeStructForm.tuitionFee) || 0) + (Number(feeStructForm.developmentFee) || 0) + (Number(feeStructForm.transportFee) || 0) + (Number(feeStructForm.labFee) || 0) + (Number(feeStructForm.examFee) || 0)

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Building2 },
    { id: 'forms', label: 'Forms', icon: PenTool },
    { id: 'reports', label: 'Reports', icon: BarChart3 },
  ]

  const forms = [
    { id: 'campus', label: 'Campus Setup', icon: Building2 },
    { id: 'academicYear', label: 'Academic Year', icon: Calendar },
    { id: 'boardAff', label: 'Board Affiliation', icon: GraduationCap },
    { id: 'role', label: 'Role Creation', icon: Key },
    { id: 'feeStruct', label: 'Fee Structure', icon: IndianRupee },
    { id: 'lmsConfig', label: 'LMS Config', icon: BookOpen },
    { id: 'transport', label: 'Transport Route', icon: Bus },
    { id: 'hostel', label: 'Hostel Room', icon: Bed },
    { id: 'hr', label: 'HR Staff', icon: Briefcase },
    { id: 'bsp', label: 'Bulk BSP ID', icon: Hash },
  ]

  const reports = [
    { id: 'multiCampus', label: 'Multi-Campus Performance', icon: BarChart3 },
    { id: 'feeCollection', label: 'Fee Collection Summary', icon: IndianRupee },
    { id: 'staffDistribution', label: 'Staff Distribution', icon: Users },
    { id: 'bspPenCompliance', label: 'BSP/PEN/Uppar ID Compliance', icon: Hash },
    { id: 'boardAffStatus', label: 'Board Affiliation Status', icon: GraduationCap },
    { id: 'auditLog', label: 'Audit Log', icon: FileText },
    { id: 'hrPayroll', label: 'HR Payroll', icon: Briefcase },
    { id: 'academicComparison', label: 'Academic Year Comparison', icon: Calendar },
  ]

  const inputClass = 'w-full px-3 py-2 rounded-xl border border-border bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-[#C8A45C]/30'
  const labelClass = 'text-xs font-medium text-muted-foreground mb-1.5 block'

  const moduleOptions = ['All', 'Academic', 'Finance', 'HR', 'Transport', 'Library', 'LMS', 'Communication']

  const handleModuleToggle = (mod) => {
    setRoleForm(prev => {
      const mods = prev.modules.includes(mod)
        ? prev.modules.filter(m => m !== mod)
        : [...prev.modules, mod]
      return { ...prev, modules: mods }
    })
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="p-4 lg:p-6 space-y-6 max-w-[1600px] mx-auto"
    >
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
          {/* Campus Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {campuses.map((campus) => (
              <motion.div key={campus.id} variants={itemVariants} className="rounded-2xl border border-border bg-card p-5 hover:shadow-lg transition-all group">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-xl gradient-birla flex items-center justify-center">
                      <Building2 className="w-5 h-5 text-[#C8A45C]" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-foreground">{campus.code}</h4>
                      <p className="text-[10px] text-muted-foreground">{campus.name}</p>
                    </div>
                  </div>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${
                    campus.status === 'Active' ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' : 'bg-amber-500/10 text-amber-600 dark:text-amber-400'
                  }`}>{campus.status}</span>
                </div>
                <div className="flex items-center gap-1 text-xs text-muted-foreground mb-3">
                  <MapPin className="w-3 h-3" /> {campus.location}
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
              </motion.div>
            ))}
          </div>

          {/* Consolidated Stats */}
          <motion.div variants={itemVariants} className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { label: 'Total Students', value: '5,347', icon: Users, color: 'text-blue-500 bg-blue-500/10' },
              { label: 'Total Staff', value: '406', icon: Briefcase, color: 'text-purple-500 bg-purple-500/10' },
              { label: 'Avg Performance', value: '84.7%', icon: Target, color: 'text-emerald-500 bg-emerald-500/10' },
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

          {/* Board Affiliation + Roles & Permissions */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-5">
              <h3 className="text-base font-semibold text-foreground flex items-center gap-2 mb-4">
                <GraduationCap className="w-4 h-4 text-[#C8A45C]" />
                Board Affiliation Status
              </h3>
              <div className="space-y-3">
                {boardAffiliations.map((aff, i) => (
                  <div key={i} className="p-3 rounded-xl border border-border flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-foreground">{aff.campus}</p>
                      <p className="text-xs text-muted-foreground">{aff.board} &bull; {aff.level}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <p className="text-xs text-muted-foreground">Valid Till</p>
                        <p className="text-sm font-semibold text-foreground">{aff.validTill}</p>
                      </div>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${
                        aff.status === 'Active' ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' : 'bg-amber-500/10 text-amber-600 dark:text-amber-400'
                      }`}>{aff.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-5">
              <h3 className="text-base font-semibold text-foreground flex items-center gap-2 mb-4">
                <Key className="w-4 h-4 text-purple-500" />
                Roles & Permissions
              </h3>
              <div className="space-y-2 max-h-72 overflow-y-auto">
                {rolesPermissions.map((rp) => {
                  const Icon = rp.icon
                  return (
                    <div key={rp.role} className="flex items-center justify-between p-3 rounded-xl border border-border hover:bg-muted/30 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${rp.color}`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-foreground">{rp.role}</p>
                          <p className="text-[10px] text-muted-foreground">{rp.modules}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-semibold text-foreground">{rp.users}</span>
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${
                          rp.level === 'Full Access' ? 'bg-red-500/10 text-red-600 dark:text-red-400' :
                          rp.level === 'Read/Write' ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' :
                          'bg-blue-500/10 text-blue-600 dark:text-blue-400'
                        }`}>{rp.level}</span>
                      </div>
                    </div>
                  )
                })}
              </div>
            </motion.div>
          </div>

          {/* Fee Structure Table */}
          <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-5">
            <h3 className="text-base font-semibold text-foreground flex items-center gap-2 mb-4">
              <IndianRupee className="w-4 h-4 text-[#C8A45C]" />
              Fee Structure
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border bg-muted/30">
                    <th className="text-left px-4 py-2 text-xs font-semibold text-muted-foreground">Class</th>
                    <th className="text-right px-4 py-2 text-xs font-semibold text-muted-foreground">Tuition</th>
                    <th className="text-right px-4 py-2 text-xs font-semibold text-muted-foreground">Development</th>
                    <th className="text-right px-4 py-2 text-xs font-semibold text-muted-foreground">Transport</th>
                    <th className="text-right px-4 py-2 text-xs font-semibold text-muted-foreground">Lab</th>
                    <th className="text-right px-4 py-2 text-xs font-semibold text-muted-foreground">Exam</th>
                    <th className="text-right px-4 py-2 text-xs font-semibold text-muted-foreground">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {feeStructureData.map((row) => (
                    <tr key={row.class} className="border-b border-border/50 hover:bg-muted/20">
                      <td className="px-4 py-2 text-sm font-medium text-foreground">{row.class}</td>
                      <td className="px-4 py-2 text-sm text-right text-foreground">₹{row.tuition.toLocaleString()}</td>
                      <td className="px-4 py-2 text-sm text-right text-muted-foreground">₹{row.development.toLocaleString()}</td>
                      <td className="px-4 py-2 text-sm text-right text-muted-foreground">₹{row.transport.toLocaleString()}</td>
                      <td className="px-4 py-2 text-sm text-right text-muted-foreground">₹{row.lab.toLocaleString()}</td>
                      <td className="px-4 py-2 text-sm text-right text-muted-foreground">₹{row.exam.toLocaleString()}</td>
                      <td className="px-4 py-2 text-sm text-right font-semibold text-[#C8A45C]">₹{row.total.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>

          {/* LMS Config + Transport & Hostel */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-5">
              <h3 className="text-base font-semibold text-foreground flex items-center gap-2 mb-4">
                <BookOpen className="w-4 h-4 text-[#22D3EE]" />
                LMS Configuration
              </h3>
              <div className="space-y-2">
                {lmsConfig.map((mod) => {
                  const Icon = mod.icon
                  return (
                    <div key={mod.module} className="flex items-center justify-between p-3 rounded-xl border border-border hover:bg-muted/30 transition-colors">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg gradient-birla-cyan flex items-center justify-center">
                          <Icon className="w-4 h-4 text-white" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-foreground">{mod.module}</p>
                          <p className="text-[10px] text-muted-foreground">{mod.provider}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-muted-foreground">{mod.sessions.toLocaleString()} sessions</span>
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${
                          mod.status === 'Active' ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' : 'bg-amber-500/10 text-amber-600 dark:text-amber-400'
                        }`}>{mod.status}</span>
                      </div>
                    </div>
                  )
                })}
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-5">
              <h3 className="text-base font-semibold text-foreground flex items-center gap-2 mb-4">
                <Bus className="w-4 h-4 text-amber-500" />
                Transport & Hostel
              </h3>
              <div className="space-y-4">
                {transportHostel.map((item) => {
                  const Icon = item.icon
                  return (
                    <div key={item.type} className="p-4 rounded-xl border border-border">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-xl gradient-birla flex items-center justify-center">
                          <Icon className="w-5 h-5 text-[#C8A45C]" />
                        </div>
                        <div>
                          <h4 className="text-sm font-semibold text-foreground">{item.type}</h4>
                          <span className="text-xs text-emerald-500 font-medium">{item.status}</span>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        {Object.entries(item.stats).map(([key, value]) => (
                          <div key={key} className="p-2 rounded-lg bg-muted/30 text-center">
                            <p className="text-sm font-bold text-foreground">{value.toLocaleString()}</p>
                            <p className="text-[10px] text-muted-foreground capitalize">{key}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )
                })}
              </div>
            </motion.div>
          </div>

          {/* HR Summary + AI Analytics */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-5">
              <h3 className="text-base font-semibold text-foreground flex items-center gap-2 mb-4">
                <Briefcase className="w-4 h-4 text-purple-500" />
                HR Summary
              </h3>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { label: 'Total Staff', value: hrPayroll.totalStaff, color: 'text-blue-500 bg-blue-500/10' },
                  { label: 'Departments', value: hrPayroll.departments, color: 'text-purple-500 bg-purple-500/10' },
                  { label: 'Monthly Payroll', value: hrPayroll.monthlyPayroll, color: 'text-amber-500 bg-amber-500/10' },
                  { label: 'Pending Leaves', value: hrPayroll.pendingLeaves, color: 'text-red-500 bg-red-500/10' },
                  { label: 'Open Positions', value: hrPayroll.openPositions, color: 'text-emerald-500 bg-emerald-500/10' },
                  { label: 'Compliance', value: `${hrPayroll.compliance}%`, color: 'text-cyan-500 bg-cyan-500/10' },
                ].map((stat) => (
                  <div key={stat.label} className="p-3 rounded-xl border border-border text-center">
                    <p className="text-lg font-bold text-foreground">{stat.value}</p>
                    <p className="text-[10px] text-muted-foreground">{stat.label}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-semibold text-foreground flex items-center gap-2">
                  <Brain className="w-4 h-4 text-[#22D3EE]" />
                  AI Analytics
                </h3>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-muted-foreground">v{aiAnalytics.modelVersion}</span>
                  <span className="text-[10px] text-muted-foreground">&bull; {aiAnalytics.lastTrained}</span>
                </div>
              </div>
              <div className="space-y-3">
                {aiAnalytics.predictions.map((pred) => (
                  <div key={pred.label} className="flex items-center justify-between p-3 rounded-xl border border-border hover:bg-muted/30 transition-colors">
                    <div>
                      <p className="text-sm font-medium text-foreground">{pred.label}</p>
                      <p className="text-xs text-muted-foreground">Confidence: {pred.confidence}%</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-foreground">{pred.value}</span>
                      <span className={`flex items-center gap-0.5 text-xs font-medium ${pred.trend === 'up' ? 'text-emerald-500' : 'text-red-500'}`}>
                        {pred.trend === 'up' ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-3 p-3 rounded-xl bg-[#22D3EE]/5 border border-[#22D3EE]/10">
                <p className="text-xs text-muted-foreground">Trained on <span className="font-semibold text-foreground">{aiAnalytics.dataPoints}</span> data points</p>
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

          {/* ─── 1. Campus Setup Form ──────────────────────────── */}
          {activeForm === 'campus' && (
            <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-5">
              <h3 className="text-base font-semibold mb-4 flex items-center gap-2">
                <Building2 className="w-4 h-4 text-[#22D3EE]" /> Campus Setup Form
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div><label className={labelClass}>Campus Name</label><input type="text" value={campusForm.campusName} onChange={(e) => setCampusForm({...campusForm, campusName: e.target.value})} className={inputClass} placeholder="e.g. Birla Open Minds, Asansol" /></div>
                <div><label className={labelClass}>Campus Code</label><input type="text" value={campusForm.code} onChange={(e) => setCampusForm({...campusForm, code: e.target.value})} className={inputClass} placeholder="e.g. BOM-ASN" /></div>
                <div><label className={labelClass}>Location</label><input type="text" value={campusForm.location} onChange={(e) => setCampusForm({...campusForm, location: e.target.value})} className={inputClass} placeholder="City, State" /></div>
                <div><label className={labelClass}>Board</label><select value={campusForm.board} onChange={(e) => setCampusForm({...campusForm, board: e.target.value})} className={inputClass}><option value="">Select Board</option><option>CBSE</option><option>ICSE</option><option>State Board</option></select></div>
                <div><label className={labelClass}>Grade Range</label><input type="text" value={campusForm.gradeRange} onChange={(e) => setCampusForm({...campusForm, gradeRange: e.target.value})} className={inputClass} placeholder="e.g. Nursery - XII" /></div>
                <div><label className={labelClass}>Established Year</label><input type="number" value={campusForm.establishedYear} onChange={(e) => setCampusForm({...campusForm, establishedYear: e.target.value})} className={inputClass} placeholder="2024" /></div>
                <div className="md:col-span-2 lg:col-span-3"><label className={labelClass}>UDISE Code</label><input type="text" value={campusForm.udiseCode} onChange={(e) => setCampusForm({...campusForm, udiseCode: e.target.value})} className={inputClass} placeholder="e.g. 19080100401" /></div>
              </div>
              <div className="flex items-center gap-3 mt-4">
                <button className="px-4 py-2 rounded-xl gradient-birla text-white text-sm font-medium">Create Campus</button>
                <button onClick={() => setActiveForm(null)} className="px-4 py-2 rounded-xl border border-border text-sm text-muted-foreground">Cancel</button>
              </div>
            </motion.div>
          )}

          {/* ─── 2. Academic Year Form ─────────────────────────── */}
          {activeForm === 'academicYear' && (
            <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-5">
              <h3 className="text-base font-semibold mb-4 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[#22D3EE]" /> Academic Year Form
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div><label className={labelClass}>Academic Year</label><input type="text" value={academicYearForm.year} onChange={(e) => setAcademicYearForm({...academicYearForm, year: e.target.value})} className={inputClass} placeholder="e.g. 2026-27" /></div>
                <div><label className={labelClass}>Start Date</label><input type="date" value={academicYearForm.startDate} onChange={(e) => setAcademicYearForm({...academicYearForm, startDate: e.target.value})} className={inputClass} /></div>
                <div><label className={labelClass}>End Date</label><input type="date" value={academicYearForm.endDate} onChange={(e) => setAcademicYearForm({...academicYearForm, endDate: e.target.value})} className={inputClass} /></div>
                <div><label className={labelClass}>Number of Terms</label><select value={academicYearForm.terms} onChange={(e) => setAcademicYearForm({...academicYearForm, terms: e.target.value})} className={inputClass}><option value="">Select</option><option>1</option><option>2</option><option>3</option></select></div>
                <div><label className={labelClass}>Working Days</label><input type="number" value={academicYearForm.workingDays} onChange={(e) => setAcademicYearForm({...academicYearForm, workingDays: e.target.value})} className={inputClass} placeholder="e.g. 220" /></div>
                <div><label className={labelClass}>Holidays</label><input type="number" value={academicYearForm.holidays} onChange={(e) => setAcademicYearForm({...academicYearForm, holidays: e.target.value})} className={inputClass} placeholder="e.g. 45" /></div>
              </div>
              <div className="flex items-center gap-3 mt-4">
                <button className="px-4 py-2 rounded-xl gradient-birla text-white text-sm font-medium">Save Academic Year</button>
                <button onClick={() => setActiveForm(null)} className="px-4 py-2 rounded-xl border border-border text-sm text-muted-foreground">Cancel</button>
              </div>
            </motion.div>
          )}

          {/* ─── 3. Board Affiliation Form ─────────────────────── */}
          {activeForm === 'boardAff' && (
            <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-5">
              <h3 className="text-base font-semibold mb-4 flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-[#C8A45C]" /> Board Affiliation Form
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div><label className={labelClass}>Campus</label><select value={boardAffForm.campus} onChange={(e) => setBoardAffForm({...boardAffForm, campus: e.target.value})} className={inputClass}><option value="">Select Campus</option><option>BOM-SGR</option><option>BOM-KOL</option><option>BOM-DGR</option></select></div>
                <div><label className={labelClass}>Board</label><select value={boardAffForm.board} onChange={(e) => setBoardAffForm({...boardAffForm, board: e.target.value})} className={inputClass}><option value="">Select Board</option><option>CBSE</option><option>ICSE</option><option>State Board</option></select></div>
                <div><label className={labelClass}>Affiliation Number</label><input type="text" value={boardAffForm.affiliationNumber} onChange={(e) => setBoardAffForm({...boardAffForm, affiliationNumber: e.target.value})} className={inputClass} placeholder="e.g. 2730456" /></div>
                <div><label className={labelClass}>Valid Till</label><input type="date" value={boardAffForm.validTill} onChange={(e) => setBoardAffForm({...boardAffForm, validTill: e.target.value})} className={inputClass} /></div>
                <div><label className={labelClass}>Level</label><select value={boardAffForm.level} onChange={(e) => setBoardAffForm({...boardAffForm, level: e.target.value})} className={inputClass}><option value="">Select Level</option><option>Primary</option><option>Secondary</option><option>Senior Secondary</option></select></div>
                <div><label className={labelClass}>Status</label><select value={boardAffForm.status} onChange={(e) => setBoardAffForm({...boardAffForm, status: e.target.value})} className={inputClass}><option value="">Select Status</option><option>Active</option><option>Probationary</option><option>Pending</option></select></div>
              </div>
              <div className="flex items-center gap-3 mt-4">
                <button className="px-4 py-2 rounded-xl gradient-birla-gold text-[#0A1628] text-sm font-medium">Save Affiliation</button>
                <button onClick={() => setActiveForm(null)} className="px-4 py-2 rounded-xl border border-border text-sm text-muted-foreground">Cancel</button>
              </div>
            </motion.div>
          )}

          {/* ─── 4. Role Creation Form ─────────────────────────── */}
          {activeForm === 'role' && (
            <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-5">
              <h3 className="text-base font-semibold mb-4 flex items-center gap-2">
                <Key className="w-4 h-4 text-purple-500" /> Role Creation Form
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div><label className={labelClass}>Role Name</label><input type="text" value={roleForm.roleName} onChange={(e) => setRoleForm({...roleForm, roleName: e.target.value})} className={inputClass} placeholder="e.g. Lab Assistant" /></div>
                <div><label className={labelClass}>Access Level</label><select value={roleForm.accessLevel} onChange={(e) => setRoleForm({...roleForm, accessLevel: e.target.value})} className={inputClass}><option value="">Select Access Level</option><option>Full Access</option><option>Read-Write</option><option>Read Only</option><option>No Access</option></select></div>
                <div className="md:col-span-2"><label className={labelClass}>Description</label><textarea rows={2} value={roleForm.description} onChange={(e) => setRoleForm({...roleForm, description: e.target.value})} className={`${inputClass} resize-none`} placeholder="Role description..." /></div>
                <div className="md:col-span-2">
                  <label className={labelClass}>Modules Access</label>
                  <div className="flex flex-wrap gap-2">
                    {moduleOptions.map((mod) => (
                      <button
                        key={mod}
                        type="button"
                        onClick={() => handleModuleToggle(mod)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                          roleForm.modules.includes(mod)
                            ? 'gradient-birla text-white shadow-md'
                            : 'border border-border text-muted-foreground hover:bg-muted'
                        }`}
                      >
                        {mod}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3 mt-4">
                <button className="px-4 py-2 rounded-xl gradient-birla text-white text-sm font-medium">Create Role</button>
                <button onClick={() => setActiveForm(null)} className="px-4 py-2 rounded-xl border border-border text-sm text-muted-foreground">Cancel</button>
              </div>
            </motion.div>
          )}

          {/* ─── 5. Fee Structure Form ─────────────────────────── */}
          {activeForm === 'feeStruct' && (
            <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-5">
              <h3 className="text-base font-semibold mb-4 flex items-center gap-2">
                <IndianRupee className="w-4 h-4 text-[#C8A45C]" /> Fee Structure Form
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div><label className={labelClass}>Campus</label><select value={feeStructForm.campus} onChange={(e) => setFeeStructForm({...feeStructForm, campus: e.target.value})} className={inputClass}><option value="">Select Campus</option><option>BOM-SGR</option><option>BOM-KOL</option><option>BOM-DGR</option></select></div>
                <div><label className={labelClass}>Class</label><select value={feeStructForm.class} onChange={(e) => setFeeStructForm({...feeStructForm, class: e.target.value})} className={inputClass}><option value="">Select Class</option>{['Nursery','LKG-UKG','I-V','VI-VIII','IX-X','XI-XII'].map(c => <option key={c}>{c}</option>)}</select></div>
                <div><label className={labelClass}>Tuition Fee (₹)</label><input type="number" value={feeStructForm.tuitionFee} onChange={(e) => setFeeStructForm({...feeStructForm, tuitionFee: e.target.value})} className={inputClass} placeholder="0" /></div>
                <div><label className={labelClass}>Development Fee (₹)</label><input type="number" value={feeStructForm.developmentFee} onChange={(e) => setFeeStructForm({...feeStructForm, developmentFee: e.target.value})} className={inputClass} placeholder="0" /></div>
                <div><label className={labelClass}>Transport Fee (₹)</label><input type="number" value={feeStructForm.transportFee} onChange={(e) => setFeeStructForm({...feeStructForm, transportFee: e.target.value})} className={inputClass} placeholder="0" /></div>
                <div><label className={labelClass}>Lab Fee (₹)</label><input type="number" value={feeStructForm.labFee} onChange={(e) => setFeeStructForm({...feeStructForm, labFee: e.target.value})} className={inputClass} placeholder="0" /></div>
                <div><label className={labelClass}>Exam Fee (₹)</label><input type="number" value={feeStructForm.examFee} onChange={(e) => setFeeStructForm({...feeStructForm, examFee: e.target.value})} className={inputClass} placeholder="0" /></div>
                <div className="md:col-span-2 lg:col-span-2 p-4 rounded-xl bg-muted/30 border border-border">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-foreground">Total Fee (Auto-calculated)</span>
                    <span className="text-xl font-bold text-[#C8A45C]">₹{computedTotalFee.toLocaleString()}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3 mt-4">
                <button className="px-4 py-2 rounded-xl gradient-birla-gold text-[#0A1628] text-sm font-medium">Save Fee Structure</button>
                <button onClick={() => setActiveForm(null)} className="px-4 py-2 rounded-xl border border-border text-sm text-muted-foreground">Cancel</button>
              </div>
            </motion.div>
          )}

          {/* ─── 6. LMS Config Form ────────────────────────────── */}
          {activeForm === 'lmsConfig' && (
            <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-5">
              <h3 className="text-base font-semibold mb-4 flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-[#22D3EE]" /> LMS Configuration Form
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div><label className={labelClass}>Module Name</label><input type="text" value={lmsConfigForm.moduleName} onChange={(e) => setLmsConfigForm({...lmsConfigForm, moduleName: e.target.value})} className={inputClass} placeholder="e.g. Virtual Classroom" /></div>
                <div><label className={labelClass}>Provider</label><input type="text" value={lmsConfigForm.provider} onChange={(e) => setLmsConfigForm({...lmsConfigForm, provider: e.target.value})} className={inputClass} placeholder="e.g. Built-in / Custom" /></div>
                <div><label className={labelClass}>Status</label><select value={lmsConfigForm.status} onChange={(e) => setLmsConfigForm({...lmsConfigForm, status: e.target.value})} className={inputClass}><option value="">Select Status</option><option>Active</option><option>Beta</option><option>Disabled</option></select></div>
                <div><label className={labelClass}>Description</label><textarea rows={2} value={lmsConfigForm.description} onChange={(e) => setLmsConfigForm({...lmsConfigForm, description: e.target.value})} className={`${inputClass} resize-none`} placeholder="Module description..." /></div>
              </div>
              <div className="flex items-center gap-3 mt-4">
                <button className="px-4 py-2 rounded-xl gradient-birla text-white text-sm font-medium">Save Configuration</button>
                <button onClick={() => setActiveForm(null)} className="px-4 py-2 rounded-xl border border-border text-sm text-muted-foreground">Cancel</button>
              </div>
            </motion.div>
          )}

          {/* ─── 7. Transport Route Form ────────────────────────── */}
          {activeForm === 'transport' && (
            <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-5">
              <h3 className="text-base font-semibold mb-4 flex items-center gap-2">
                <Bus className="w-4 h-4 text-amber-500" /> Transport Route Form
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div><label className={labelClass}>Route Name</label><input type="text" value={transportForm.routeName} onChange={(e) => setTransportForm({...transportForm, routeName: e.target.value})} className={inputClass} placeholder="e.g. Route 9 - Bandel" /></div>
                <div><label className={labelClass}>Stops (comma separated)</label><input type="text" value={transportForm.stops} onChange={(e) => setTransportForm({...transportForm, stops: e.target.value})} className={inputClass} placeholder="Stop1, Stop2, Stop3" /></div>
                <div><label className={labelClass}>Distance (km)</label><input type="number" value={transportForm.distance} onChange={(e) => setTransportForm({...transportForm, distance: e.target.value})} className={inputClass} placeholder="e.g. 12" /></div>
                <div><label className={labelClass}>Time</label><input type="time" value={transportForm.time} onChange={(e) => setTransportForm({...transportForm, time: e.target.value})} className={inputClass} /></div>
                <div><label className={labelClass}>Vehicle No</label><input type="text" value={transportForm.vehicleNo} onChange={(e) => setTransportForm({...transportForm, vehicleNo: e.target.value})} className={inputClass} placeholder="WB-XX-XXXX" /></div>
                <div><label className={labelClass}>Driver Name</label><input type="text" value={transportForm.driverName} onChange={(e) => setTransportForm({...transportForm, driverName: e.target.value})} className={inputClass} placeholder="Driver name" /></div>
                <div><label className={labelClass}>Driver Phone</label><input type="tel" value={transportForm.driverPhone} onChange={(e) => setTransportForm({...transportForm, driverPhone: e.target.value})} className={inputClass} placeholder="+91 XXXXX XXXXX" /></div>
                <div><label className={labelClass}>Capacity</label><input type="number" value={transportForm.capacity} onChange={(e) => setTransportForm({...transportForm, capacity: e.target.value})} className={inputClass} placeholder="e.g. 50" /></div>
                <div><label className={labelClass}>Fee (₹)</label><input type="number" value={transportForm.fee} onChange={(e) => setTransportForm({...transportForm, fee: e.target.value})} className={inputClass} placeholder="e.g. 24000" /></div>
              </div>
              <div className="flex items-center gap-3 mt-4">
                <button className="px-4 py-2 rounded-xl gradient-birla text-white text-sm font-medium">Save Route</button>
                <button onClick={() => setActiveForm(null)} className="px-4 py-2 rounded-xl border border-border text-sm text-muted-foreground">Cancel</button>
              </div>
            </motion.div>
          )}

          {/* ─── 8. Hostel Room Form ────────────────────────────── */}
          {activeForm === 'hostel' && (
            <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-5">
              <h3 className="text-base font-semibold mb-4 flex items-center gap-2">
                <Bed className="w-4 h-4 text-purple-500" /> Hostel Room Form
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div><label className={labelClass}>Block</label><input type="text" value={hostelForm.block} onChange={(e) => setHostelForm({...hostelForm, block: e.target.value})} className={inputClass} placeholder="e.g. Block A" /></div>
                <div><label className={labelClass}>Floor</label><input type="number" value={hostelForm.floor} onChange={(e) => setHostelForm({...hostelForm, floor: e.target.value})} className={inputClass} placeholder="e.g. 2" /></div>
                <div><label className={labelClass}>Room Number</label><input type="text" value={hostelForm.roomNumber} onChange={(e) => setHostelForm({...hostelForm, roomNumber: e.target.value})} className={inputClass} placeholder="e.g. A-201" /></div>
                <div><label className={labelClass}>Room Type</label><select value={hostelForm.roomType} onChange={(e) => setHostelForm({...hostelForm, roomType: e.target.value})} className={inputClass}><option value="">Select Type</option><option>Single</option><option>Double</option><option>Triple</option><option>Quad</option></select></div>
                <div><label className={labelClass}>Capacity</label><input type="number" value={hostelForm.capacity} onChange={(e) => setHostelForm({...hostelForm, capacity: e.target.value})} className={inputClass} placeholder="e.g. 4" /></div>
                <div><label className={labelClass}>Current Occupants</label><input type="number" value={hostelForm.occupants} onChange={(e) => setHostelForm({...hostelForm, occupants: e.target.value})} className={inputClass} placeholder="e.g. 2" /></div>
                <div className="md:col-span-2 lg:col-span-3"><label className={labelClass}>Warden</label><input type="text" value={hostelForm.warden} onChange={(e) => setHostelForm({...hostelForm, warden: e.target.value})} className={inputClass} placeholder="Warden name" /></div>
              </div>
              <div className="flex items-center gap-3 mt-4">
                <button className="px-4 py-2 rounded-xl gradient-birla text-white text-sm font-medium">Save Room</button>
                <button onClick={() => setActiveForm(null)} className="px-4 py-2 rounded-xl border border-border text-sm text-muted-foreground">Cancel</button>
              </div>
            </motion.div>
          )}

          {/* ─── 9. HR Staff Form ───────────────────────────────── */}
          {activeForm === 'hr' && (
            <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-5">
              <h3 className="text-base font-semibold mb-4 flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-purple-500" /> HR Staff Form
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div><label className={labelClass}>Name</label><input type="text" value={hrForm.name} onChange={(e) => setHrForm({...hrForm, name: e.target.value})} className={inputClass} placeholder="Full name" /></div>
                <div><label className={labelClass}>Department</label><select value={hrForm.department} onChange={(e) => setHrForm({...hrForm, department: e.target.value})} className={inputClass}><option value="">Select Department</option><option>Science</option><option>Mathematics</option><option>Languages</option><option>Social Science</option><option>Physical Ed</option><option>Arts & Music</option><option>Administration</option><option>Support Staff</option></select></div>
                <div><label className={labelClass}>Designation</label><input type="text" value={hrForm.designation} onChange={(e) => setHrForm({...hrForm, designation: e.target.value})} className={inputClass} placeholder="e.g. Senior Teacher" /></div>
                <div><label className={labelClass}>Phone</label><input type="tel" value={hrForm.phone} onChange={(e) => setHrForm({...hrForm, phone: e.target.value})} className={inputClass} placeholder="+91 XXXXX XXXXX" /></div>
                <div><label className={labelClass}>Email</label><input type="email" value={hrForm.email} onChange={(e) => setHrForm({...hrForm, email: e.target.value})} className={inputClass} placeholder="email@birlaopenminds.com" /></div>
                <div><label className={labelClass}>Join Date</label><input type="date" value={hrForm.joinDate} onChange={(e) => setHrForm({...hrForm, joinDate: e.target.value})} className={inputClass} /></div>
                <div><label className={labelClass}>Salary (₹)</label><input type="number" value={hrForm.salary} onChange={(e) => setHrForm({...hrForm, salary: e.target.value})} className={inputClass} placeholder="Monthly salary" /></div>
                <div><label className={labelClass}>Campus</label><select value={hrForm.campus} onChange={(e) => setHrForm({...hrForm, campus: e.target.value})} className={inputClass}><option value="">Select Campus</option><option>BOM-SGR</option><option>BOM-KOL</option><option>BOM-DGR</option></select></div>
                <div><label className={labelClass}>Role</label><select value={hrForm.role} onChange={(e) => setHrForm({...hrForm, role: e.target.value})} className={inputClass}><option value="">Select Role</option><option>Super Admin</option><option>School Admin</option><option>Principal</option><option>Teacher</option><option>Accountant</option><option>Support Staff</option></select></div>
              </div>
              <div className="flex items-center gap-3 mt-4">
                <button className="px-4 py-2 rounded-xl gradient-birla text-white text-sm font-medium">Add Staff Member</button>
                <button onClick={() => setActiveForm(null)} className="px-4 py-2 rounded-xl border border-border text-sm text-muted-foreground">Cancel</button>
              </div>
            </motion.div>
          )}

          {/* ─── 10. Bulk BSP ID Assignment Form ────────────────── */}
          {activeForm === 'bsp' && (
            <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-5">
              <h3 className="text-base font-semibold mb-4 flex items-center gap-2">
                <Hash className="w-4 h-4 text-[#22D3EE]" /> Bulk BSP ID Assignment Form
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div><label className={labelClass}>Class</label><select value={bspForm.class} onChange={(e) => setBspForm({...bspForm, class: e.target.value})} className={inputClass}><option value="">Select Class</option>{['Nursery','LKG','UKG','I','II','III','IV','V','VI','VII','VIII','IX','X','XI','XII'].map(c => <option key={c}>{c}</option>)}</select></div>
                <div><label className={labelClass}>Section</label><select value={bspForm.section} onChange={(e) => setBspForm({...bspForm, section: e.target.value})} className={inputClass}><option value="">Select Section</option><option>A</option><option>B</option><option>C</option></select></div>
              </div>
              <button className="px-4 py-2 rounded-xl gradient-birla-cyan text-white text-sm font-medium mb-4">Generate BSP ID / PEN No / Uppar ID</button>
              <div className="rounded-xl border border-border overflow-hidden">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border bg-muted/30">
                      <th className="text-left px-3 py-2 text-xs font-semibold text-muted-foreground">ID</th>
                      <th className="text-left px-3 py-2 text-xs font-semibold text-muted-foreground">Name</th>
                      <th className="text-left px-3 py-2 text-xs font-semibold text-muted-foreground">Class</th>
                      <th className="text-left px-3 py-2 text-xs font-semibold text-muted-foreground">BSP ID</th>
                      <th className="text-left px-3 py-2 text-xs font-semibold text-muted-foreground">PEN No</th>
                      <th className="text-left px-3 py-2 text-xs font-semibold text-muted-foreground">Uppar ID</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bspPreviewStudents.map((s) => (
                      <tr key={s.id} className="border-b border-border/50 hover:bg-muted/20">
                        <td className="px-3 py-2 text-xs font-mono text-[#22D3EE]">{s.id}</td>
                        <td className="px-3 py-2 text-sm text-foreground">{s.name}</td>
                        <td className="px-3 py-2 text-xs text-muted-foreground">{s.class}-{s.section}</td>
                        <td className="px-3 py-2 text-xs font-mono">{s.bspId ? <span className="text-emerald-500">{s.bspId}</span> : <span className="text-red-400">Not Assigned</span>}</td>
                        <td className="px-3 py-2 text-xs font-mono">{s.penNo ? <span className="text-emerald-500">{s.penNo}</span> : <span className="text-red-400">Not Assigned</span>}</td>
                        <td className="px-3 py-2 text-xs font-mono">{s.upparId ? <span className="text-emerald-500">{s.upparId}</span> : <span className="text-red-400">Not Assigned</span>}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="flex items-center gap-3 mt-4">
                <button className="px-4 py-2 rounded-xl gradient-birla text-white text-sm font-medium">Assign Missing IDs</button>
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

          {/* ─── 1. Multi-Campus Performance Report ────────────── */}
          {activeReport === 'multiCampus' && (
            <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-5">
              <h3 className="text-base font-semibold mb-4 flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-[#22D3EE]" /> Multi-Campus Performance Report
              </h3>
              <div className="overflow-x-auto mb-4">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border bg-muted/30">
                      <th className="text-left px-4 py-2 text-xs font-semibold text-muted-foreground">Campus</th>
                      <th className="text-right px-4 py-2 text-xs font-semibold text-muted-foreground">Students</th>
                      <th className="text-right px-4 py-2 text-xs font-semibold text-muted-foreground">Staff</th>
                      <th className="text-right px-4 py-2 text-xs font-semibold text-muted-foreground">Avg Score</th>
                      <th className="text-right px-4 py-2 text-xs font-semibold text-muted-foreground">Attendance</th>
                      <th className="text-right px-4 py-2 text-xs font-semibold text-muted-foreground">Performance</th>
                    </tr>
                  </thead>
                  <tbody>
                    {campusComparisonTable.map((r) => (
                      <tr key={r.campus} className="border-b border-border/50 hover:bg-muted/20">
                        <td className="px-4 py-2 text-sm font-medium text-foreground">{r.campus}</td>
                        <td className="px-4 py-2 text-sm text-right text-foreground">{r.students.toLocaleString()}</td>
                        <td className="px-4 py-2 text-sm text-right text-foreground">{r.staff}</td>
                        <td className="px-4 py-2 text-sm text-right font-semibold text-[#22D3EE]">{r.avgScore}%</td>
                        <td className="px-4 py-2 text-sm text-right text-emerald-500 font-medium">{r.attendance}%</td>
                        <td className="px-4 py-2 text-sm text-right">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${
                            r.performance === 'Excellent' ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' :
                            r.performance === 'Good' ? 'bg-blue-500/10 text-blue-600 dark:text-blue-400' :
                            'bg-amber-500/10 text-amber-600 dark:text-amber-400'
                          }`}>{r.performance}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={multiCampusPerformanceData}>
                    <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'} />
                    <XAxis dataKey="subject" tick={{ fontSize: 10 }} stroke={darkMode ? '#64748b' : '#94a3b8'} />
                    <YAxis tick={{ fontSize: 10 }} stroke={darkMode ? '#64748b' : '#94a3b8'} domain={[60, 100]} />
                    <Tooltip contentStyle={tooltipStyle(darkMode)} />
                    <Legend iconType="circle" wrapperStyle={{ fontSize: '11px' }} />
                    <Bar dataKey="BOM_SGR" fill="#22D3EE" radius={[3,3,0,0]} name="BOM-SGR" />
                    <Bar dataKey="BOM_KOL" fill="#C8A45C" radius={[3,3,0,0]} name="BOM-KOL" />
                    <Bar dataKey="BOM_DGR" fill="#8B5CF6" radius={[3,3,0,0]} name="BOM-DGR" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </motion.div>
          )}

          {/* ─── 2. Fee Collection Summary Report ──────────────── */}
          {activeReport === 'feeCollection' && (
            <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-5">
              <h3 className="text-base font-semibold mb-4 flex items-center gap-2">
                <IndianRupee className="w-4 h-4 text-[#C8A45C]" /> Fee Collection Summary Report
              </h3>
              <div className="overflow-x-auto mb-4">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border bg-muted/30">
                      <th className="text-left px-4 py-2 text-xs font-semibold text-muted-foreground">Campus</th>
                      <th className="text-right px-4 py-2 text-xs font-semibold text-muted-foreground">Total Target</th>
                      <th className="text-right px-4 py-2 text-xs font-semibold text-muted-foreground">Collected</th>
                      <th className="text-right px-4 py-2 text-xs font-semibold text-muted-foreground">Pending</th>
                      <th className="text-right px-4 py-2 text-xs font-semibold text-muted-foreground">Collection Rate</th>
                    </tr>
                  </thead>
                  <tbody>
                    {feeCollectionSummaryTable.map((r) => (
                      <tr key={r.campus} className="border-b border-border/50 hover:bg-muted/20">
                        <td className="px-4 py-2 text-sm font-medium text-foreground">{r.campus}</td>
                        <td className="px-4 py-2 text-sm text-right text-foreground">₹{(r.total/100000).toFixed(1)}L</td>
                        <td className="px-4 py-2 text-sm text-right text-emerald-500 font-medium">₹{(r.collected/100000).toFixed(1)}L</td>
                        <td className="px-4 py-2 text-sm text-right text-red-500 font-medium">₹{(r.pending/100000).toFixed(1)}L</td>
                        <td className="px-4 py-2 text-sm text-right font-bold text-[#22D3EE]">{r.rate}%</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={feeCollectionSummaryData}>
                    <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'} />
                    <XAxis dataKey="month" tick={{ fontSize: 10 }} stroke={darkMode ? '#64748b' : '#94a3b8'} />
                    <YAxis tick={{ fontSize: 10 }} stroke={darkMode ? '#64748b' : '#94a3b8'} tickFormatter={(v) => `₹${v}L`} />
                    <Tooltip contentStyle={tooltipStyle(darkMode)} formatter={(v) => [`₹${v}L`, '']} />
                    <Legend iconType="circle" wrapperStyle={{ fontSize: '11px' }} />
                    <Area type="monotone" dataKey="BOM_SGR" stroke="#22D3EE" fill="#22D3EE" fillOpacity={0.2} name="BOM-SGR" />
                    <Area type="monotone" dataKey="BOM_KOL" stroke="#C8A45C" fill="#C8A45C" fillOpacity={0.2} name="BOM-KOL" />
                    <Area type="monotone" dataKey="BOM_DGR" stroke="#8B5CF6" fill="#8B5CF6" fillOpacity={0.2} name="BOM-DGR" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </motion.div>
          )}

          {/* ─── 3. Staff Distribution Report ──────────────────── */}
          {activeReport === 'staffDistribution' && (
            <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-5">
              <h3 className="text-base font-semibold mb-4 flex items-center gap-2">
                <Users className="w-4 h-4 text-purple-500" /> Staff Distribution Report
              </h3>
              <div className="overflow-x-auto mb-4">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border bg-muted/30">
                      <th className="text-left px-4 py-2 text-xs font-semibold text-muted-foreground">Campus</th>
                      <th className="text-right px-4 py-2 text-xs font-semibold text-muted-foreground">Teaching</th>
                      <th className="text-right px-4 py-2 text-xs font-semibold text-muted-foreground">Non-Teaching</th>
                      <th className="text-right px-4 py-2 text-xs font-semibold text-muted-foreground">Admin</th>
                      <th className="text-right px-4 py-2 text-xs font-semibold text-muted-foreground">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {staffCampusTable.map((r) => (
                      <tr key={r.campus} className="border-b border-border/50 hover:bg-muted/20">
                        <td className="px-4 py-2 text-sm font-medium text-foreground">{r.campus}</td>
                        <td className="px-4 py-2 text-sm text-right text-foreground">{r.teaching}</td>
                        <td className="px-4 py-2 text-sm text-right text-muted-foreground">{r.nonTeaching}</td>
                        <td className="px-4 py-2 text-sm text-right text-muted-foreground">{r.admin}</td>
                        <td className="px-4 py-2 text-sm text-right font-bold text-[#22D3EE]">{r.total}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={staffDistributionData} cx="50%" cy="50%" innerRadius={50} outerRadius={90} dataKey="count" label={({ department, count }) => `${department}: ${count}`}>
                      {staffDistributionData.map((entry, index) => (
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

          {/* ─── 4. BSP/PEN/Uppar ID Compliance Report ─────────── */}
          {activeReport === 'bspPenCompliance' && (
            <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-5">
              <h3 className="text-base font-semibold mb-4 flex items-center gap-2">
                <Hash className="w-4 h-4 text-[#22D3EE]" /> BSP/PEN/Uppar ID Compliance Report
              </h3>
              <div className="overflow-x-auto mb-4">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border bg-muted/30">
                      <th className="text-left px-3 py-2 text-xs font-semibold text-muted-foreground">Campus</th>
                      <th className="text-right px-3 py-2 text-xs font-semibold text-muted-foreground">Total</th>
                      <th className="text-right px-3 py-2 text-xs font-semibold text-muted-foreground">BSP ID</th>
                      <th className="text-right px-3 py-2 text-xs font-semibold text-muted-foreground">BSP %</th>
                      <th className="text-right px-3 py-2 text-xs font-semibold text-muted-foreground">PEN No</th>
                      <th className="text-right px-3 py-2 text-xs font-semibold text-muted-foreground">PEN %</th>
                      <th className="text-right px-3 py-2 text-xs font-semibold text-muted-foreground">Uppar ID</th>
                      <th className="text-right px-3 py-2 text-xs font-semibold text-muted-foreground">Uppar %</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bspPenUpparCompliance.map((r) => (
                      <tr key={r.campus} className="border-b border-border/50 hover:bg-muted/20">
                        <td className="px-3 py-2 text-sm font-medium text-foreground">{r.campus}</td>
                        <td className="px-3 py-2 text-sm text-right text-foreground">{r.total.toLocaleString()}</td>
                        <td className="px-3 py-2 text-sm text-right text-foreground">{r.bspAssigned.toLocaleString()}</td>
                        <td className="px-3 py-2 text-sm text-right text-emerald-500 font-medium">{r.bspPct}%</td>
                        <td className="px-3 py-2 text-sm text-right text-foreground">{r.penAssigned.toLocaleString()}</td>
                        <td className="px-3 py-2 text-sm text-right text-amber-500 font-medium">{r.penPct}%</td>
                        <td className="px-3 py-2 text-sm text-right text-foreground">{r.upparAssigned.toLocaleString()}</td>
                        <td className="px-3 py-2 text-sm text-right text-red-500 font-medium">{r.upparPct}%</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={bspPenUpparCompliance}>
                    <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'} />
                    <XAxis dataKey="campus" tick={{ fontSize: 10 }} stroke={darkMode ? '#64748b' : '#94a3b8'} />
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

          {/* ─── 5. Board Affiliation Status Report ────────────── */}
          {activeReport === 'boardAffStatus' && (
            <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-5">
              <h3 className="text-base font-semibold mb-4 flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-[#C8A45C]" /> Board Affiliation Status Report
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border bg-muted/30">
                      <th className="text-left px-4 py-2 text-xs font-semibold text-muted-foreground">Campus</th>
                      <th className="text-left px-4 py-2 text-xs font-semibold text-muted-foreground">Board</th>
                      <th className="text-left px-4 py-2 text-xs font-semibold text-muted-foreground">Affiliation No</th>
                      <th className="text-left px-4 py-2 text-xs font-semibold text-muted-foreground">Level</th>
                      <th className="text-left px-4 py-2 text-xs font-semibold text-muted-foreground">Valid Till</th>
                      <th className="text-left px-4 py-2 text-xs font-semibold text-muted-foreground">Renewal Due</th>
                      <th className="text-left px-4 py-2 text-xs font-semibold text-muted-foreground">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {boardAffiliationReport.map((r, i) => (
                      <tr key={i} className="border-b border-border/50 hover:bg-muted/20">
                        <td className="px-4 py-2 text-sm font-medium text-foreground">{r.campus}</td>
                        <td className="px-4 py-2 text-sm text-foreground">{r.board}</td>
                        <td className="px-4 py-2 text-sm font-mono text-[#22D3EE]">{r.affiliation}</td>
                        <td className="px-4 py-2 text-sm text-foreground">{r.level}</td>
                        <td className="px-4 py-2 text-sm text-foreground">{r.validTill}</td>
                        <td className="px-4 py-2 text-sm text-foreground">{r.renewalDue}</td>
                        <td className="px-4 py-2">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${
                            r.status === 'Active' ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' : 'bg-amber-500/10 text-amber-600 dark:text-amber-400'
                          }`}>{r.status}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}

          {/* ─── 6. Audit Log Report ───────────────────────────── */}
          {activeReport === 'auditLog' && (
            <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-5">
              <h3 className="text-base font-semibold mb-4 flex items-center gap-2">
                <FileText className="w-4 h-4 text-red-500" /> Audit Log Report
              </h3>
              <div className="flex flex-wrap gap-3 mb-4">
                <div className="flex-1 min-w-[200px]">
                  <input type="text" value={auditSearch} onChange={(e) => setAuditSearch(e.target.value)} className={inputClass} placeholder="Search logs by user, action..." />
                </div>
                <select value={auditModuleFilter} onChange={(e) => setAuditModuleFilter(e.target.value)} className="px-3 py-2 rounded-xl border border-border bg-background text-sm text-foreground">
                  <option value="">All Modules</option>
                  <option>Finance</option>
                  <option>Academic</option>
                  <option>System</option>
                  <option>Auth</option>
                  <option>Admin</option>
                  <option>Compliance</option>
                  <option>LMS</option>
                  <option>HR</option>
                </select>
              </div>
              <div className="rounded-xl border border-border overflow-hidden">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border bg-muted/30">
                      <th className="text-left px-3 py-2 text-xs font-semibold text-muted-foreground">User</th>
                      <th className="text-left px-3 py-2 text-xs font-semibold text-muted-foreground">Action</th>
                      <th className="text-left px-3 py-2 text-xs font-semibold text-muted-foreground">Module</th>
                      <th className="text-left px-3 py-2 text-xs font-semibold text-muted-foreground">IP</th>
                      <th className="text-left px-3 py-2 text-xs font-semibold text-muted-foreground">Time</th>
                      <th className="text-left px-3 py-2 text-xs font-semibold text-muted-foreground">Severity</th>
                    </tr>
                  </thead>
                  <tbody>
                    {auditLogData
                      .filter(log => !auditSearch || log.user.toLowerCase().includes(auditSearch.toLowerCase()) || log.action.toLowerCase().includes(auditSearch.toLowerCase()))
                      .filter(log => !auditModuleFilter || log.module === auditModuleFilter)
                      .map((log) => (
                        <tr key={log.id} className="border-b border-border/50 hover:bg-muted/20">
                          <td className="px-3 py-2 text-xs font-medium text-foreground">{log.user}</td>
                          <td className="px-3 py-2 text-xs text-foreground">{log.action}</td>
                          <td className="px-3 py-2 text-xs text-muted-foreground">{log.module}</td>
                          <td className="px-3 py-2 text-xs font-mono text-muted-foreground">{log.ip}</td>
                          <td className="px-3 py-2 text-xs text-muted-foreground">{log.time}</td>
                          <td className="px-3 py-2">
                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${
                              log.severity === 'success' ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' :
                              log.severity === 'warning' ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400' :
                              log.severity === 'error' ? 'bg-red-500/10 text-red-600 dark:text-red-400' :
                              'bg-blue-500/10 text-blue-600 dark:text-blue-400'
                            }`}>{log.severity}</span>
                          </td>
                        </tr>
                      ))
                    }
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}

          {/* ─── 7. HR Payroll Report ──────────────────────────── */}
          {activeReport === 'hrPayroll' && (
            <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-5">
              <h3 className="text-base font-semibold mb-4 flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-purple-500" /> HR Payroll Report
              </h3>
              <div className="overflow-x-auto mb-4">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border bg-muted/30">
                      <th className="text-left px-4 py-2 text-xs font-semibold text-muted-foreground">Department</th>
                      <th className="text-right px-4 py-2 text-xs font-semibold text-muted-foreground">Staff</th>
                      <th className="text-right px-4 py-2 text-xs font-semibold text-muted-foreground">Avg Salary</th>
                      <th className="text-right px-4 py-2 text-xs font-semibold text-muted-foreground">Total Monthly</th>
                    </tr>
                  </thead>
                  <tbody>
                    {hrPayrollData.map((r) => (
                      <tr key={r.department} className="border-b border-border/50 hover:bg-muted/20">
                        <td className="px-4 py-2 text-sm font-medium text-foreground">{r.department}</td>
                        <td className="px-4 py-2 text-sm text-right text-foreground">{r.staff}</td>
                        <td className="px-4 py-2 text-sm text-right text-muted-foreground">₹{r.avgSalary.toLocaleString()}</td>
                        <td className="px-4 py-2 text-sm text-right font-semibold text-[#C8A45C]">₹{(r.totalSalary/100000).toFixed(1)}L</td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr className="border-t-2 border-border bg-muted/20">
                      <td className="px-4 py-2 text-sm font-bold text-foreground">Total</td>
                      <td className="px-4 py-2 text-sm text-right font-bold text-foreground">{hrPayrollData.reduce((a,b) => a + b.staff, 0)}</td>
                      <td className="px-4 py-2 text-sm text-right text-muted-foreground">-</td>
                      <td className="px-4 py-2 text-sm text-right font-bold text-[#C8A45C]">₹{(hrPayrollData.reduce((a,b) => a + b.totalSalary, 0)/100000).toFixed(1)}L</td>
                    </tr>
                  </tfoot>
                </table>
              </div>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={hrPayrollData}>
                    <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'} />
                    <XAxis dataKey="department" tick={{ fontSize: 9 }} stroke={darkMode ? '#64748b' : '#94a3b8'} />
                    <YAxis tick={{ fontSize: 10 }} stroke={darkMode ? '#64748b' : '#94a3b8'} tickFormatter={(v) => `₹${v/1000}K`} />
                    <Tooltip contentStyle={tooltipStyle(darkMode)} formatter={(v) => [`₹${(v/1000).toFixed(0)}K`, '']} />
                    <Legend iconType="circle" wrapperStyle={{ fontSize: '11px' }} />
                    <Bar dataKey="avgSalary" fill="#0A1628" radius={[3,3,0,0]} name="Avg Salary" />
                    <Bar dataKey="totalSalary" fill="#C8A45C" radius={[3,3,0,0]} name="Total Salary" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </motion.div>
          )}

          {/* ─── 8. Academic Year Comparison Report ────────────── */}
          {activeReport === 'academicComparison' && (
            <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-5">
              <h3 className="text-base font-semibold mb-4 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[#22D3EE]" /> Academic Year Comparison Report
              </h3>
              <div className="overflow-x-auto mb-4">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border bg-muted/30">
                      <th className="text-left px-4 py-2 text-xs font-semibold text-muted-foreground">Academic Year</th>
                      <th className="text-right px-4 py-2 text-xs font-semibold text-muted-foreground">Enrollment</th>
                      <th className="text-right px-4 py-2 text-xs font-semibold text-muted-foreground">YoY Growth</th>
                    </tr>
                  </thead>
                  <tbody>
                    {academicYearComparison.map((r, i) => (
                      <tr key={r.year} className="border-b border-border/50 hover:bg-muted/20">
                        <td className="px-4 py-2 text-sm font-medium text-foreground">{r.year}</td>
                        <td className="px-4 py-2 text-sm text-right font-semibold text-[#22D3EE]">{r.enrollment.toLocaleString()}</td>
                        <td className="px-4 py-2 text-sm text-right">
                          {i > 0 ? (
                            <span className="text-emerald-500 font-medium">
                              +{((r.enrollment - academicYearComparison[i-1].enrollment) / academicYearComparison[i-1].enrollment * 100).toFixed(1)}%
                            </span>
                          ) : (
                            <span className="text-muted-foreground">-</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={academicYearComparison}>
                    <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'} />
                    <XAxis dataKey="year" tick={{ fontSize: 10 }} stroke={darkMode ? '#64748b' : '#94a3b8'} />
                    <YAxis tick={{ fontSize: 10 }} stroke={darkMode ? '#64748b' : '#94a3b8'} />
                    <Tooltip contentStyle={tooltipStyle(darkMode)} />
                    <Bar dataKey="enrollment" fill="#22D3EE" radius={[6,6,0,0]} name="Enrollment">
                      {academicYearComparison.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={index === academicYearComparison.length - 1 ? '#C8A45C' : '#0A1628'} />
                      ))}
                    </Bar>
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
