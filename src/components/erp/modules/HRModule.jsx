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
  BookOpen, Megaphone, Smile, Frown, Meh, Handshake, FileSpreadsheet,
  CreditCard, QrCode, ScanLine, Printer, RefreshCw, Droplets,
  AlertCircle, Eye, Loader2, Hash, Edit, Trash2
} from 'lucide-react'
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Legend, PieChart, Pie, Cell, LineChart, Line
} from 'recharts'
import useAppStore from '@/store/useAppStore'
import QRStudentLookup from '@/components/erp/shared/QRStudentLookup'
import { TEACHER_DB } from '@/components/erp/shared/QRStudentLookup'
import { TEACHERS, TEACHER_ASSIGNMENTS, SUBJECTS, CLASSES, SECTIONS, getTeacherWorkload, getClassSubjectCoverage, getAssignmentStats } from '@/components/erp/shared/teacherAssignments'

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

// ─── Teacher ID Card Data ────────────────────────────────────────
const teacherIdCards = TEACHER_DB.map((t, idx) => ({
  ...t,
  cardStatus: idx === 0 ? 'Expired' : idx === 3 ? 'Not Issued' : 'Issued',
  issueDate: idx === 3 ? null : (idx === 0 ? '2024-03-15' : '2025-06-01'),
  expiryDate: idx === 0 ? '2025-03-15' : (idx === 3 ? null : '2026-06-01'),
  cardNumber: idx === 3 ? null : `BOMIS/TCH/${String(idx + 1).padStart(4, '0')}`,
  emergencyContact: '+91 98765 ' + String(10000 + idx).slice(1),
}))

// ─── Teacher Attendance Data ─────────────────────────────────────
const todayAttendance = TEACHER_DB.map((t, idx) => ({
  ...t,
  status: idx < 4 ? 'Present' : idx === 4 ? 'On Leave' : 'Absent',
  checkIn: idx < 4 ? `0${7 + idx}:${idx % 2 === 0 ? '00' : '30'} AM` : null,
  checkOut: null,
}))

const monthlyAttendanceChart = [
  { week: 'W1', Present: 128, Absent: 8, Leave: 6 },
  { week: 'W2', Present: 132, Absent: 5, Leave: 5 },
  { week: 'W3', Present: 126, Absent: 10, Leave: 6 },
  { week: 'W4', Present: 130, Absent: 7, Leave: 5 },
]

const deptAttendance = [
  { department: 'Science', present: 18, total: 20, pct: 90 },
  { department: 'Mathematics', present: 22, total: 24, pct: 92 },
  { department: 'English', present: 16, total: 18, pct: 89 },
  { department: 'Hindi', present: 12, total: 12, pct: 100 },
  { department: 'Social Science', present: 8, total: 10, pct: 80 },
  { department: 'Admin', present: 22, total: 24, pct: 92 },
]

const leaveCalendarEvents = [
  { date: 3, name: 'Dr. Priya Menon', type: 'CL' },
  { date: 4, name: 'Mr. Rajesh Kumar', type: 'SL' },
  { date: 7, name: 'Mr. Arvind Kumar', type: 'Casual' },
  { date: 10, name: 'Ms. Sunita Rao', type: 'EL' },
  { date: 12, name: 'Mrs. Kavitha Nair', type: 'CL' },
  { date: 15, name: 'Mr. Vikram Singh', type: 'CL' },
  { date: 18, name: 'Ms. Deepa Nair', type: 'SL' },
  { date: 22, name: 'Dr. Suresh Babu', type: 'EL' },
]

// ─── Payroll Enhanced Data ────────────────────────────────────────
const payslipHistory = [
  { id: 1, empId: 'EMP-001', name: 'Dr. Priya Menon', month: 'February', year: '2026', netSalary: 68500, status: 'Paid', paidOn: 'Mar 1, 2026' },
  { id: 2, empId: 'EMP-002', name: 'Mr. Rajesh Kumar', month: 'February', year: '2026', netSalary: 54200, status: 'Paid', paidOn: 'Mar 1, 2026' },
  { id: 3, empId: 'EMP-003', name: 'Ms. Ananya Iyer', month: 'February', year: '2026', netSalary: 62300, status: 'Paid', paidOn: 'Mar 1, 2026' },
  { id: 4, empId: 'EMP-004', name: 'Mr. Vikram Singh', month: 'February', year: '2026', netSalary: 48900, status: 'Paid', paidOn: 'Mar 1, 2026' },
  { id: 5, empId: 'EMP-005', name: 'Ms. Deepa Nair', month: 'February', year: '2026', netSalary: 51600, status: 'Pending', paidOn: null },
  { id: 6, empId: 'EMP-006', name: 'Dr. Suresh Babu', month: 'February', year: '2026', netSalary: 72400, status: 'Pending', paidOn: null },
]

const samplePayslip = {
  empId: 'EMP-001',
  name: 'Dr. Priya Menon',
  designation: 'PGT Physics',
  department: 'Science',
  month: 'March',
  year: '2026',
  basicSalary: 45000,
  hra: 18000,
  da: 5400,
  specialAllowance: 5000,
  grossEarnings: 73400,
  pfDeduction: 5400,
  esi: 788,
  professionalTax: 200,
  tds: 3500,
  totalDeductions: 9888,
  netSalary: 63512,
}

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

// ─── Simulated QR Code Component ─────────────────────────────────
function SimulatedQR({ data, size = 64 }) {
  const cells = []
  for (let i = 0; i < 49; i++) {
    cells.push(Math.random() > 0.45)
  }
  // Fixed corners for QR look
  const setCorner = (start) => { cells[start] = true; cells[start+1] = true; cells[start+2] = true; cells[start+7] = true; cells[start+9] = true; cells[start+14] = true; cells[start+15] = true; cells[start+16] = true }
  setCorner(0); setCorner(28); setCorner(33)
  const cellSize = size / 7
  return (
    <div className="inline-block bg-white p-1 rounded" style={{ width: size + 8, height: size + 8 }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {cells.map((filled, i) => filled ? (
          <rect key={i} x={(i % 7) * cellSize} y={Math.floor(i / 7) * cellSize} width={cellSize - 0.5} height={cellSize - 0.5} fill="#0A1628" rx={0.5} />
        ) : null)}
      </svg>
    </div>
  )
}

// ─── Teacher ID Card Preview ─────────────────────────────────────
function TeacherIDCardPreview({ teacher, cardData }) {
  return (
    <div className="w-72 bg-gradient-to-br from-[#0A1628] via-[#0f2340] to-[#0A1628] rounded-2xl overflow-hidden shadow-2xl border border-[#C8A45C]/30">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#C8A45C] to-[#d4b76a] px-4 py-2 text-center">
        <p className="text-[10px] font-bold text-[#0A1628] tracking-wider uppercase">Birla Open Minds International School</p>
        <p className="text-[8px] text-[#0A1628]/80">Singur, West Bengal</p>
      </div>
      {/* Body */}
      <div className="p-4 text-white">
        <div className="flex gap-3">
          {/* Photo Placeholder */}
          <div className="w-16 h-20 rounded-lg bg-white/10 border border-[#C8A45C]/40 flex flex-col items-center justify-center shrink-0">
            <Users className="w-6 h-6 text-[#C8A45C]/60" />
            <span className="text-[7px] text-white/40 mt-0.5">PHOTO</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold text-white truncate">{teacher.name}</p>
            <p className="text-[10px] text-[#C8A45C] font-medium">{teacher.designation}</p>
            <p className="text-[9px] text-white/60 mt-0.5">{teacher.department} Department</p>
          </div>
        </div>
        <div className="mt-3 space-y-1.5">
          <div className="flex items-center gap-2">
            <Hash className="w-3 h-3 text-[#22D3EE]" />
            <span className="text-[10px] text-white/80">Emp ID: <span className="text-white font-medium">{teacher.empId}</span></span>
          </div>
          <div className="flex items-center gap-2">
            <CreditCard className="w-3 h-3 text-[#22D3EE]" />
            <span className="text-[10px] text-white/80">Card: <span className="text-white font-medium">{cardData?.cardNumber || 'N/A'}</span></span>
          </div>
          <div className="flex items-center gap-2">
            <Droplets className="w-3 h-3 text-[#22D3EE]" />
            <span className="text-[10px] text-white/80">Blood: <span className="text-white font-medium">{teacher.bloodGroup}</span></span>
          </div>
          <div className="flex items-center gap-2">
            <Phone className="w-3 h-3 text-[#22D3EE]" />
            <span className="text-[10px] text-white/80">Emergency: <span className="text-white font-medium">{cardData?.emergencyContact}</span></span>
          </div>
        </div>
      </div>
      {/* Footer with QR */}
      <div className="bg-[#0A1628]/80 px-4 py-2 flex items-center justify-between border-t border-[#C8A45C]/20">
        <div>
          <p className="text-[8px] text-white/40">Valid: {cardData?.issueDate || 'N/A'} - {cardData?.expiryDate || 'N/A'}</p>
          <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${
            cardData?.cardStatus === 'Issued' ? 'bg-emerald-500/20 text-emerald-400' :
            cardData?.cardStatus === 'Expired' ? 'bg-red-500/20 text-red-400' :
            'bg-amber-500/20 text-amber-400'
          }`}>{cardData?.cardStatus || 'Not Issued'}</span>
        </div>
        <SimulatedQR data={teacher.empId} size={48} />
      </div>
    </div>
  )
}

// ─── Payslip Preview Card ────────────────────────────────────────
function PayslipPreviewCard({ payslip }) {
  if (!payslip) return null
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="rounded-2xl border border-[#C8A45C]/30 bg-gradient-to-br from-[#0A1628] to-[#0f2340] p-5 text-white">
      <div className="text-center border-b border-[#C8A45C]/20 pb-3 mb-3">
        <p className="text-xs font-bold text-[#C8A45C] tracking-wider uppercase">Birla Open Minds International School</p>
        <p className="text-[10px] text-white/60">Pay Slip - {payslip.month} {payslip.year}</p>
      </div>
      <div className="grid grid-cols-2 gap-2 text-[11px] mb-3">
        <div><span className="text-white/50">Name:</span> <span className="font-medium">{payslip.name}</span></div>
        <div><span className="text-white/50">Emp ID:</span> <span className="font-medium">{payslip.empId}</span></div>
        <div><span className="text-white/50">Designation:</span> <span className="font-medium">{payslip.designation}</span></div>
        <div><span className="text-white/50">Department:</span> <span className="font-medium">{payslip.department}</span></div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <p className="text-[10px] font-bold text-emerald-400 mb-1 uppercase tracking-wider">Earnings</p>
          {[
            ['Basic Salary', payslip.basicSalary],
            ['HRA', payslip.hra],
            ['DA', payslip.da],
            ['Special Allow.', payslip.specialAllowance],
          ].map(([label, val]) => (
            <div key={label} className="flex justify-between text-[10px] py-0.5">
              <span className="text-white/70">{label}</span>
              <span className="font-medium">₹{val.toLocaleString()}</span>
            </div>
          ))}
          <div className="flex justify-between text-[10px] py-1 border-t border-white/10 mt-1 font-bold text-emerald-400">
            <span>Gross</span><span>₹{payslip.grossEarnings.toLocaleString()}</span>
          </div>
        </div>
        <div>
          <p className="text-[10px] font-bold text-red-400 mb-1 uppercase tracking-wider">Deductions</p>
          {[
            ['PF', payslip.pfDeduction],
            ['ESI', payslip.esi],
            ['Prof. Tax', payslip.professionalTax],
            ['TDS', payslip.tds],
          ].map(([label, val]) => (
            <div key={label} className="flex justify-between text-[10px] py-0.5">
              <span className="text-white/70">{label}</span>
              <span className="font-medium">₹{val.toLocaleString()}</span>
            </div>
          ))}
          <div className="flex justify-between text-[10px] py-1 border-t border-white/10 mt-1 font-bold text-red-400">
            <span>Total Ded.</span><span>₹{payslip.totalDeductions.toLocaleString()}</span>
          </div>
        </div>
      </div>
      <div className="mt-3 pt-3 border-t border-[#C8A45C]/30 text-center">
        <p className="text-[10px] text-white/50">Net Salary</p>
        <p className="text-2xl font-bold text-[#C8A45C]">₹{payslip.netSalary.toLocaleString()}</p>
      </div>
    </motion.div>
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

  // Teacher ID Card States
  const [selectedTeacherId, setSelectedTeacherId] = useState(null)
  const [idCardIssueForm, setIdCardIssueForm] = useState({ empId: '', action: 'Issue', department: 'All' })
  const [bulkDept, setBulkDept] = useState('Science')

  // Teacher Attendance States
  const [attendanceTeacher, setAttendanceTeacher] = useState(null)
  const [attendanceMonth, setAttendanceMonth] = useState('March')
  const [calendarMonth, setCalendarMonth] = useState('March 2026')

  // Enhanced Payroll States
  const [selectedPayslipEmp, setSelectedPayslipEmp] = useState(null)
  const [generatedPayslip, setGeneratedPayslip] = useState(null)
  const [bulkProgress, setBulkProgress] = useState(0)
  const [isBulkProcessing, setIsBulkProcessing] = useState(false)
  const [payrollSubTab, setPayrollSubTab] = useState('overview')

  // Class & Subject Assignment States
  const [assignmentView, setAssignmentView] = useState('grid')  // 'grid', 'byTeacher', 'byClass'
  const [assignmentSearch, setAssignmentSearch] = useState('')
  const [assignmentFilter, setAssignmentFilter] = useState('all')  // 'all', 'classTeacher', 'subjectTeacher'
  const [showAssignmentForm, setShowAssignmentForm] = useState(false)
  const [assignmentForm, setAssignmentForm] = useState({ teacherId: '', subject: '', class: '', section: '', periodsPerWeek: '', role: 'Subject Teacher', isClassTeacher: false })
  const [editingAssignment, setEditingAssignment] = useState(null)
  const [selectedTeacherWorkload, setSelectedTeacherWorkload] = useState(null)
  const [classCoverageView, setClassCoverageView] = useState(null)
  const [bulkAssignMode, setBulkAssignMode] = useState(false)
  const [bulkAssignForm, setBulkAssignForm] = useState({ teacherId: '', classes: [], subject: '', periodsPerWeek: '' })

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'teacher-id', label: 'Teacher ID', icon: CreditCard },
    { id: 'teacher-attendance', label: 'Attendance', icon: UserCheck },
    { id: 'payroll', label: 'Payroll', icon: DollarSign },
    { id: 'leave', label: 'Leave', icon: Clock },
    { id: 'recruitment', label: 'Recruitment', icon: UserPlus },
    { id: 'performance', label: 'Performance', icon: Star },
    { id: 'class-assignment', label: 'Class Assignment', icon: GraduationCap },
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

  // ─── Form Submit Handlers ─────────────────────────────────────
  const handleOnboardingSubmit = () => {
    alert(`✅ Staff Onboarding Successful!\n\nName: ${onboardingForm.name}\nEmployee ID: ${onboardingForm.employeeId}\nDepartment: ${onboardingForm.department}\nDesignation: ${onboardingForm.designation}`)
    setOnboardingForm({ name: '', employeeId: '', department: 'Teaching', designation: '', campus: 'Singur', phone: '', email: '', joinDate: '', salary: '', qualification: '', experience: '', bankAccount: '', panNumber: '', aadhaarNumber: '', emergencyContact: '', reportingManager: '' })
  }

  const handleLeaveSubmit = () => {
    alert(`✅ Leave Application Submitted!\n\nEmployee ID: ${leaveForm.employeeId}\nLeave Type: ${leaveForm.leaveType}\nFrom: ${leaveForm.fromDate} To: ${leaveForm.toDate}\nDays: ${leaveForm.totalDays}`)
    setLeaveForm({ employeeId: '', leaveType: 'CL', fromDate: '', toDate: '', totalDays: '', reason: '', contactDuringLeave: '', arrangementMade: '' })
  }

  const handlePayrollSubmit = () => {
    const slip = { ...samplePayslip, month: payrollForm.month, year: payrollForm.year }
    if (payrollForm.includeBonus) {
      slip.specialAllowance += 5000
      slip.grossEarnings += 5000
      slip.netSalary += 5000
    }
    if (!payrollForm.includeDeductions) {
      slip.pfDeduction = 0; slip.esi = 0; slip.professionalTax = 0; slip.tds = 0
      slip.totalDeductions = 0
      slip.netSalary = slip.grossEarnings
    }
    setGeneratedPayslip(slip)
    alert(`✅ Payroll Processed for ${payrollForm.month} ${payrollForm.year}!\n\nDepartment: ${payrollForm.department}\nNet Payroll: ₹70,88,000\nBonus: ${payrollForm.includeBonus ? 'Included' : 'Excluded'}\nDeductions: ${payrollForm.includeDeductions ? 'Included' : 'Excluded'}`)
  }

  const handlePerformanceSubmit = () => {
    alert(`✅ Performance Review Submitted!\n\nEmployee ID: ${performanceForm.employeeId}\nRating: ${performanceForm.rating}/5\nKPI Score: ${performanceForm.kpiScore}%\nReviewer: ${performanceForm.reviewerName}`)
    setPerformanceForm({ employeeId: '', reviewPeriod: '2025-26', rating: '3', kpiScore: '', communication: '', punctuality: '', teamwork: '', leadership: '', initiative: '', overallComments: '', reviewerName: '', reviewDate: '' })
  }

  const handleJobSubmit = () => {
    alert(`✅ Job Posting Created!\n\nPosition: ${jobForm.position}\nDepartment: ${jobForm.department}\nType: ${jobForm.employmentType}\nLast Date: ${jobForm.lastDate}`)
    setJobForm({ position: '', department: '', campus: 'Singur', qualification: '', experience: '', salaryRange: '', jobDescription: '', lastDate: '', positionCount: '1', employmentType: 'Full-Time' })
  }

  const handleInterviewSubmit = () => {
    alert(`✅ Interview Scheduled!\n\nCandidate: ${interviewForm.candidateName}\nPosition: ${interviewForm.position}\nDate: ${interviewForm.interviewDate}\nTime: ${interviewForm.interviewTime}\nMode: ${interviewForm.mode}`)
    setInterviewForm({ candidateName: '', position: '', interviewDate: '', interviewTime: '', interviewer: '', mode: 'In-Person', location: '', notes: '' })
  }

  const handleExitSubmit = () => {
    alert(`✅ Staff Exit Processed!\n\nEmployee ID: ${exitForm.employeeId}\nLast Working Day: ${exitForm.lastWorkingDay}\nNotice Served: ${exitForm.noticePeriodServed ? 'Yes' : 'No'}\nHandover: ${exitForm.handoverComplete ? 'Complete' : 'Pending'}\nDues: ${exitForm.duesCleared ? 'Cleared' : 'Pending'}`)
    setExitForm({ employeeId: '', lastWorkingDay: '', reason: '', noticePeriodServed: false, handoverComplete: false, duesCleared: false, exitInterviewDate: '', remarks: '' })
  }

  const handleBulkPayroll = () => {
    setIsBulkProcessing(true)
    setBulkProgress(0)
    const interval = setInterval(() => {
      setBulkProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsBulkProcessing(false)
          alert('✅ Bulk Payroll Processing Complete!\n\n142 payslips generated for March 2026.\nAll net salary amounts transferred to respective bank accounts.')
          return 100
        }
        return prev + 5
      })
    }, 150)
  }

  const handleIDCardIssue = () => {
    const teacher = TEACHER_DB.find(t => t.empId === idCardIssueForm.empId)
    alert(`✅ Teacher ID Card ${idCardIssueForm.action}d!\n\nTeacher: ${teacher?.name || idCardIssueForm.empId}\nCard Number: BOMIS/TCH/${String(Math.floor(Math.random() * 9999)).padStart(4, '0')}\nStatus: Issued`)
    setIdCardIssueForm({ empId: '', action: 'Issue', department: 'All' })
  }

  const handleBulkIDGeneration = () => {
    alert(`✅ Bulk ID Card Generation Initiated!\n\nDepartment: ${bulkDept}\nCards to generate: ${teacherIdCards.filter(t => t.department === bulkDept && t.cardStatus !== 'Issued').length}\nProcessing in background...`)
  }

  const handleAttendanceMark = (teacher, status) => {
    alert(`✅ Attendance Marked!\n\n${teacher.name} (${teacher.empId})\nStatus: ${status}\nTime: ${new Date().toLocaleTimeString()}`)
  }

  // ─── Class & Subject Assignment Handlers ─────────────────────
  const handleAssignmentSubmit = () => {
    const teacher = TEACHERS.find(t => t.id === assignmentForm.teacherId)
    alert(`Assignment saved!\n\nTeacher: ${teacher?.name}\nSubject: ${assignmentForm.subject}\nClass: ${assignmentForm.class}-${assignmentForm.section}\nPeriods/Week: ${assignmentForm.periodsPerWeek}\nRole: ${assignmentForm.isClassTeacher ? 'Class Teacher' : 'Subject Teacher'}`)
    setShowAssignmentForm(false)
    setAssignmentForm({ teacherId: '', subject: '', class: '', section: '', periodsPerWeek: '', role: 'Subject Teacher', isClassTeacher: false })
  }

  const handleEditAssignment = (assignment) => {
    setEditingAssignment(assignment.id)
    setAssignmentForm({ teacherId: assignment.teacherId, subject: assignment.subject, class: assignment.class, section: assignment.section, periodsPerWeek: assignment.periodsPerWeek, role: assignment.role, isClassTeacher: assignment.isClassTeacher })
    setShowAssignmentForm(true)
  }

  const handleDeleteAssignment = (assignmentId) => {
    alert(`Assignment ${assignmentId} removed successfully!`)
  }

  const handleBulkAssignSubmit = () => {
    const teacher = TEACHERS.find(t => t.id === bulkAssignForm.teacherId)
    alert(`Bulk Assignment Complete!\n\nTeacher: ${teacher?.name}\nSubject: ${bulkAssignForm.subject}\nClasses: ${bulkAssignForm.classes.join(', ')}\nPeriods/Week per class: ${bulkAssignForm.periodsPerWeek}`)
    setBulkAssignMode(false)
    setBulkAssignForm({ teacherId: '', classes: [], subject: '', periodsPerWeek: '' })
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
          TEACHER ID CARD TAB
      ═══════════════════════════════════════════════════════════════ */}
      {activeTab === 'teacher-id' && (
        <motion.div variants={itemVariants} className="space-y-6">
          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { label: 'Cards Issued', value: String(teacherIdCards.filter(t => t.cardStatus === 'Issued').length), icon: CheckCircle2, color: 'emerald' },
              { label: 'Cards Expired', value: String(teacherIdCards.filter(t => t.cardStatus === 'Expired').length), icon: AlertTriangle, color: 'amber' },
              { label: 'Not Issued', value: String(teacherIdCards.filter(t => t.cardStatus === 'Not Issued').length), icon: XCircle, color: 'rose' },
            ].map((item) => {
              const Icon = item.icon
              return (
                <motion.div key={item.label} variants={itemVariants} className="rounded-2xl border border-border bg-card p-5">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl bg-${item.color}-500/10 flex items-center justify-center`}><Icon className={`w-5 h-5 text-${item.color}-500`} /></div>
                    <div><p className="text-xs text-muted-foreground">{item.label}</p><p className="text-lg font-bold text-foreground">{item.value}</p></div>
                  </div>
                </motion.div>
              )
            })}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Teacher List */}
            <div className="lg:col-span-2 rounded-2xl border border-border bg-card p-5">
              <h3 className="text-base font-semibold text-foreground flex items-center gap-2 mb-4"><CreditCard className="w-4 h-4 text-birla-gold" />Teacher ID Card Status</h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead><tr className="border-b border-border bg-muted/30">
                    <th className="text-left px-3 py-2.5 text-xs font-semibold text-muted-foreground">Teacher</th>
                    <th className="text-left px-3 py-2.5 text-xs font-semibold text-muted-foreground">Emp ID</th>
                    <th className="text-left px-3 py-2.5 text-xs font-semibold text-muted-foreground">Department</th>
                    <th className="text-left px-3 py-2.5 text-xs font-semibold text-muted-foreground">Card No.</th>
                    <th className="text-center px-3 py-2.5 text-xs font-semibold text-muted-foreground">Status</th>
                    <th className="text-center px-3 py-2.5 text-xs font-semibold text-muted-foreground">Action</th>
                  </tr></thead>
                  <tbody>
                    {teacherIdCards.map((teacher) => (
                      <tr key={teacher.id} className={`border-b border-border/50 hover:bg-muted/20 cursor-pointer transition-colors ${selectedTeacherId === teacher.id ? 'bg-birla-cyan/5' : ''}`} onClick={() => setSelectedTeacherId(teacher.id)}>
                        <td className="px-3 py-2.5 text-sm font-medium text-foreground">{teacher.name}</td>
                        <td className="px-3 py-2.5 text-sm text-muted-foreground">{teacher.empId}</td>
                        <td className="px-3 py-2.5 text-sm text-muted-foreground">{teacher.department}</td>
                        <td className="px-3 py-2.5 text-sm text-muted-foreground font-mono text-[11px]">{teacher.cardNumber || '—'}</td>
                        <td className="px-3 py-2.5 text-center"><span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${teacher.cardStatus === 'Issued' ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' : teacher.cardStatus === 'Expired' ? 'bg-red-500/10 text-red-600 dark:text-red-400' : 'bg-amber-500/10 text-amber-600 dark:text-amber-400'}`}>{teacher.cardStatus}</span></td>
                        <td className="px-3 py-2.5 text-center">
                          <button onClick={(e) => { e.stopPropagation(); setSelectedTeacherId(teacher.id) }} className="p-1.5 rounded-lg hover:bg-muted transition-colors"><Eye className="w-3.5 h-3.5 text-muted-foreground" /></button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* ID Card Preview + Issue Form */}
            <div className="space-y-4">
              {/* Preview */}
              <div className="rounded-2xl border border-border bg-card p-5">
                <h3 className="text-sm font-semibold text-foreground flex items-center gap-2 mb-3"><Eye className="w-4 h-4 text-birla-cyan" />Card Preview</h3>
                {selectedTeacherId ? (() => {
                  const teacher = TEACHER_DB.find(t => t.id === selectedTeacherId)
                  const card = teacherIdCards.find(t => t.id === selectedTeacherId)
                  return teacher ? <TeacherIDCardPreview teacher={teacher} cardData={card} /> : <p className="text-sm text-muted-foreground">Select a teacher</p>
                })() : (
                  <div className="text-center py-8 text-muted-foreground">
                    <CreditCard className="w-10 h-10 mx-auto mb-2 opacity-30" />
                    <p className="text-sm">Select a teacher to preview ID card</p>
                  </div>
                )}
              </div>

              {/* Issue/Reissue Form */}
              <div className="rounded-2xl border border-border bg-card p-5">
                <h3 className="text-sm font-semibold text-foreground flex items-center gap-2 mb-3"><RefreshCw className="w-4 h-4 text-birla-gold" />Issue / Reissue Card</h3>
                <div className="space-y-3">
                  <FormField label="Employee ID"><InputField value={idCardIssueForm.empId} onChange={(e) => setIdCardIssueForm({ ...idCardIssueForm, empId: e.target.value })} placeholder="EMP-001" /></FormField>
                  <FormField label="Action"><SelectField value={idCardIssueForm.action} onChange={(e) => setIdCardIssueForm({ ...idCardIssueForm, action: e.target.value })} options={['Issue', 'Reissue']} /></FormField>
                  <button onClick={handleIDCardIssue} className="w-full px-4 py-2.5 rounded-xl gradient-birla text-white text-sm font-bold hover:opacity-90 transition-opacity flex items-center justify-center gap-2"><CreditCard className="w-4 h-4" />{idCardIssueForm.action} Card</button>
                </div>
              </div>

              {/* Bulk Generation */}
              <div className="rounded-2xl border border-border bg-card p-5">
                <h3 className="text-sm font-semibold text-foreground flex items-center gap-2 mb-3"><Printer className="w-4 h-4 text-purple-500" />Bulk Generation</h3>
                <div className="space-y-3">
                  <FormField label="Department"><SelectField value={bulkDept} onChange={(e) => setBulkDept(e.target.value)} options={['Science', 'Mathematics', 'English', 'Hindi', 'Social Science', 'Computer Science']} /></FormField>
                  <p className="text-[11px] text-muted-foreground">Cards to generate: <span className="font-bold text-foreground">{teacherIdCards.filter(t => t.department === bulkDept && t.cardStatus !== 'Issued').length}</span></p>
                  <button onClick={handleBulkIDGeneration} className="w-full px-4 py-2.5 rounded-xl gradient-birla-gold text-birla-blue text-sm font-bold hover:opacity-90 transition-opacity flex items-center justify-center gap-2"><Printer className="w-4 h-4" />Generate All</button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* ═══════════════════════════════════════════════════════════════
          TEACHER ATTENDANCE TAB
      ═══════════════════════════════════════════════════════════════ */}
      {activeTab === 'teacher-attendance' && (
        <motion.div variants={itemVariants} className="space-y-6">
          {/* Today's Summary */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { label: 'Present Today', value: String(todayAttendance.filter(t => t.status === 'Present').length), icon: UserCheck, color: 'emerald' },
              { label: 'Absent Today', value: String(todayAttendance.filter(t => t.status === 'Absent').length), icon: UserX, color: 'rose' },
              { label: 'On Leave', value: String(todayAttendance.filter(t => t.status === 'On Leave').length), icon: Clock, color: 'amber' },
            ].map((item) => {
              const Icon = item.icon
              return (
                <motion.div key={item.label} variants={itemVariants} className="rounded-2xl border border-border bg-card p-5">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl bg-${item.color}-500/10 flex items-center justify-center`}><Icon className={`w-5 h-5 text-${item.color}-500`} /></div>
                    <div><p className="text-xs text-muted-foreground">{item.label}</p><p className="text-lg font-bold text-foreground">{item.value}</p></div>
                  </div>
                </motion.div>
              )
            })}
          </div>

          {/* QR Scan / Manual Entry */}
          <div className="rounded-2xl border border-border bg-card p-5">
            <h3 className="text-base font-semibold text-foreground flex items-center gap-2 mb-4"><QrCode className="w-4 h-4 text-birla-cyan" />Mark Attendance - QR Scan / Manual</h3>
            <QRStudentLookup
              mode="teacher"
              onStudentSelect={(teacher) => setAttendanceTeacher(teacher)}
              placeholder="Scan QR or enter Teacher ID / Name"
              label="Teacher Identification"
              showDetails={true}
            />
            {attendanceTeacher && (
              <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="mt-4 flex flex-wrap gap-2">
                <button onClick={() => handleAttendanceMark(attendanceTeacher, 'Present')} className="px-4 py-2 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-sm font-medium hover:bg-emerald-500/20 transition-colors flex items-center gap-2"><UserCheck className="w-4 h-4" />Present</button>
                <button onClick={() => handleAttendanceMark(attendanceTeacher, 'Absent')} className="px-4 py-2 rounded-xl bg-red-500/10 text-red-600 dark:text-red-400 text-sm font-medium hover:bg-red-500/20 transition-colors flex items-center gap-2"><UserX className="w-4 h-4" />Absent</button>
                <button onClick={() => handleAttendanceMark(attendanceTeacher, 'On Leave')} className="px-4 py-2 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 text-sm font-medium hover:bg-amber-500/20 transition-colors flex items-center gap-2"><Clock className="w-4 h-4" />On Leave</button>
              </motion.div>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Monthly Attendance Chart */}
            <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-5">
              <h3 className="text-base font-semibold text-foreground flex items-center gap-2 mb-4"><BarChart3 className="w-4 h-4 text-birla-gold" />Monthly Attendance - {attendanceMonth}</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={monthlyAttendanceChart}>
                    <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'} />
                    <XAxis dataKey="week" tick={{ fontSize: 10 }} stroke={darkMode ? '#64748b' : '#94a3b8'} />
                    <YAxis tick={{ fontSize: 10 }} stroke={darkMode ? '#64748b' : '#94a3b8'} />
                    <Tooltip contentStyle={tooltipStyle} />
                    <Legend iconType="circle" wrapperStyle={{ fontSize: '11px' }} />
                    <Bar dataKey="Present" fill="#10B981" name="Present" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="Absent" fill="#EF4444" name="Absent" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="Leave" fill="#F59E0B" name="Leave" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </motion.div>

            {/* Attendance by Department */}
            <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-5">
              <h3 className="text-base font-semibold text-foreground flex items-center gap-2 mb-4"><Building2 className="w-4 h-4 text-birla-cyan" />Attendance by Department</h3>
              <div className="space-y-3">
                {deptAttendance.map((dept) => (
                  <div key={dept.department} className="p-3 rounded-xl border border-border gradient-card-blue">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-sm font-medium text-foreground">{dept.department}</span>
                      <span className="text-sm font-bold text-foreground">{dept.pct}%</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-muted overflow-hidden">
                      <div className="h-full rounded-full transition-all" style={{ width: `${dept.pct}%`, backgroundColor: dept.pct >= 95 ? '#10B981' : dept.pct >= 85 ? '#C8A45C' : '#EF4444' }} />
                    </div>
                    <p className="text-[10px] text-muted-foreground mt-1">{dept.present} / {dept.total} present</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Leave Calendar */}
          <div className="rounded-2xl border border-border bg-card p-5">
            <h3 className="text-base font-semibold text-foreground flex items-center gap-2 mb-4"><Calendar className="w-4 h-4 text-purple-500" />Leave Calendar - {calendarMonth}</h3>
            <div className="grid grid-cols-7 gap-1">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                <div key={day} className="text-center text-[10px] font-semibold text-muted-foreground py-1">{day}</div>
              ))}
              {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => {
                const leaveEvent = leaveCalendarEvents.find(e => e.date === day)
                const isSunday = (day - 1) % 7 === 0
                return (
                  <div key={day} className={`rounded-lg p-1 min-h-[48px] text-[10px] border transition-colors ${leaveEvent ? 'border-amber-500/30 bg-amber-500/5' : isSunday ? 'bg-muted/30' : 'border-transparent hover:bg-muted/20'}`}>
                    <span className={`font-medium ${isSunday ? 'text-red-500' : 'text-foreground'}`}>{day}</span>
                    {leaveEvent && <p className="text-amber-600 dark:text-amber-400 truncate leading-tight">{leaveEvent.name.split(' ').pop()}</p>}
                    {leaveEvent && <span className={`px-1 py-0 rounded text-[8px] font-bold ${leaveEvent.type === 'CL' ? 'text-blue-500' : leaveEvent.type === 'SL' ? 'text-red-500' : leaveEvent.type === 'EL' ? 'text-purple-500' : 'text-amber-500'}`}>{leaveEvent.type}</span>}
                  </div>
                )
              })}
            </div>
          </div>
        </motion.div>
      )}

      {/* ═══════════════════════════════════════════════════════════════
          PAYROLL TAB (ENHANCED)
      ═══════════════════════════════════════════════════════════════ */}
      {activeTab === 'payroll' && (
        <motion.div variants={itemVariants} className="space-y-6">
          {/* Sub-tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2">
            {[
              { id: 'overview', label: 'Overview', icon: BarChart3 },
              { id: 'generate', label: 'Generate', icon: DollarSign },
              { id: 'payslip', label: 'Individual Payslip', icon: FileText },
              { id: 'bulk', label: 'Bulk Processing', icon: Users },
              { id: 'history', label: 'Payslip History', icon: Clock },
            ].map((sub) => {
              const Icon = sub.icon
              return (
                <button key={sub.id} onClick={() => setPayrollSubTab(sub.id)} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${payrollSubTab === sub.id ? 'gradient-birla text-white shadow-md' : 'border border-border text-muted-foreground hover:bg-muted'}`}>
                  <Icon className="w-3.5 h-3.5" /> {sub.label}
                </button>
              )
            })}
          </div>

          {/* Overview Sub-tab */}
          {payrollSubTab === 'overview' && (
            <div className="space-y-6">
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
            </div>
          )}

          {/* Generate Sub-tab */}
          {payrollSubTab === 'generate' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="rounded-2xl border border-border bg-card p-6">
                <h3 className="text-lg font-semibold text-foreground flex items-center gap-2 mb-6"><DollarSign className="w-5 h-5 text-emerald-500" />Payroll Generation Form</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                <div className="mt-6 flex justify-end"><button onClick={handlePayrollSubmit} className="px-6 py-2.5 rounded-xl gradient-birla text-white text-sm font-bold hover:opacity-90 transition-opacity flex items-center gap-2"><Banknote className="w-4 h-4" />Process Payroll</button></div>
              </div>

              {/* Payslip Preview */}
              <div>
                {generatedPayslip ? (
                  <PayslipPreviewCard payslip={generatedPayslip} />
                ) : (
                  <div className="rounded-2xl border border-border bg-card p-8 text-center">
                    <FileText className="w-12 h-12 mx-auto mb-3 text-muted-foreground/30" />
                    <p className="text-sm text-muted-foreground">Process payroll to generate payslip preview</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Individual Payslip Sub-tab */}
          {payrollSubTab === 'payslip' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="rounded-2xl border border-border bg-card p-5">
                  <h3 className="text-base font-semibold text-foreground flex items-center gap-2 mb-4"><Search className="w-4 h-4 text-birla-cyan" />Select Employee</h3>
                  <QRStudentLookup
                    mode="teacher"
                    onStudentSelect={(teacher) => {
                      setSelectedPayslipEmp(teacher)
                      if (teacher) {
                        const salary = 35000 + Math.floor(Math.random() * 40000)
                        const hra = Math.round(salary * 0.4)
                        const da = Math.round(salary * 0.12)
                        const special = 3000 + Math.floor(Math.random() * 5000)
                        const gross = salary + hra + da + special
                        const pf = Math.round(salary * 0.12)
                        const esi = Math.round(gross * 0.0075)
                        const pt = 200
                        const tds = Math.round(gross * 0.05)
                        const totalDed = pf + esi + pt + tds
                        setGeneratedPayslip({
                          empId: teacher.empId,
                          name: teacher.name,
                          designation: teacher.designation,
                          department: teacher.department,
                          month: 'March',
                          year: '2026',
                          basicSalary: salary,
                          hra: hra,
                          da: da,
                          specialAllowance: special,
                          grossEarnings: gross,
                          pfDeduction: pf,
                          esi: esi,
                          professionalTax: pt,
                          tds: tds,
                          totalDeductions: totalDed,
                          netSalary: gross - totalDed,
                        })
                      } else {
                        setGeneratedPayslip(null)
                      }
                    }}
                    placeholder="Search employee for payslip"
                    label="Employee Lookup"
                    showDetails={true}
                  />
                </div>
              </div>
              <div>
                {generatedPayslip && selectedPayslipEmp ? (
                  <div className="space-y-4">
                    <PayslipPreviewCard payslip={generatedPayslip} />
                    <button onClick={() => alert(`✅ Payslip downloaded for ${generatedPayslip.name}!`)} className="w-full px-4 py-2.5 rounded-xl gradient-birla-gold text-birla-blue text-sm font-bold hover:opacity-90 transition-opacity flex items-center justify-center gap-2"><Download className="w-4 h-4" />Download Payslip</button>
                  </div>
                ) : (
                  <div className="rounded-2xl border border-border bg-card p-8 text-center">
                    <FileText className="w-12 h-12 mx-auto mb-3 text-muted-foreground/30" />
                    <p className="text-sm text-muted-foreground">Select an employee to generate individual payslip</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Bulk Processing Sub-tab */}
          {payrollSubTab === 'bulk' && (
            <div className="space-y-6">
              <div className="rounded-2xl border border-border bg-card p-6">
                <h3 className="text-lg font-semibold text-foreground flex items-center gap-2 mb-6"><Users className="w-5 h-5 text-purple-500" />Bulk Payroll Processing</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <FormField label="Month"><SelectField value={payrollForm.month} onChange={(e) => setPayrollForm({ ...payrollForm, month: e.target.value })} options={['January','February','March','April','May','June','July','August','September','October','November','December']} /></FormField>
                  <FormField label="Year"><SelectField value={payrollForm.year} onChange={(e) => setPayrollForm({ ...payrollForm, year: e.target.value })} options={['2026','2025','2024']} /></FormField>
                  <FormField label="Department"><SelectField value={payrollForm.department} onChange={(e) => setPayrollForm({ ...payrollForm, department: e.target.value })} options={['All','Teaching','Admin','Support','Transport','Maintenance']} /></FormField>
                </div>
                {isBulkProcessing && (
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-muted-foreground">Processing payroll...</span>
                      <span className="text-sm font-bold text-foreground">{bulkProgress}%</span>
                    </div>
                    <div className="w-full h-3 rounded-full bg-muted overflow-hidden">
                      <motion.div className="h-full rounded-full gradient-birla" initial={{ width: 0 }} animate={{ width: `${bulkProgress}%` }} transition={{ duration: 0.3 }} />
                    </div>
                    <p className="text-[11px] text-muted-foreground mt-1">{Math.round(142 * bulkProgress / 100)} of 142 employees processed</p>
                  </div>
                )}
                <div className="flex justify-end">
                  <button onClick={handleBulkPayroll} disabled={isBulkProcessing} className={`px-6 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 transition-opacity ${isBulkProcessing ? 'bg-muted text-muted-foreground cursor-not-allowed' : 'gradient-birla text-white hover:opacity-90'}`}>
                    {isBulkProcessing ? <><Loader2 className="w-4 h-4 animate-spin" />Processing...</> : <><Banknote className="w-4 h-4" />Process Bulk Payroll</>}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* History Sub-tab */}
          {payrollSubTab === 'history' && (
            <div className="rounded-2xl border border-border bg-card overflow-hidden">
              <div className="p-5 border-b border-border">
                <h3 className="text-base font-semibold text-foreground flex items-center gap-2"><Clock className="w-4 h-4 text-birla-gold" />Payslip History</h3>
              </div>
              <table className="w-full">
                <thead><tr className="border-b border-border bg-muted/30">
                  <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Emp ID</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Name</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Period</th>
                  <th className="text-right px-4 py-3 text-xs font-semibold text-muted-foreground">Net Salary</th>
                  <th className="text-center px-4 py-3 text-xs font-semibold text-muted-foreground">Status</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Paid On</th>
                </tr></thead>
                <tbody>
                  {payslipHistory.map((row) => (
                    <tr key={row.id} className="border-b border-border/50 hover:bg-muted/20">
                      <td className="px-4 py-3 text-sm font-mono text-muted-foreground">{row.empId}</td>
                      <td className="px-4 py-3 text-sm font-medium text-foreground">{row.name}</td>
                      <td className="px-4 py-3 text-sm text-muted-foreground">{row.month} {row.year}</td>
                      <td className="px-4 py-3 text-sm text-right font-bold text-birla-gold">₹{row.netSalary.toLocaleString()}</td>
                      <td className="px-4 py-3 text-center"><span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${row.status === 'Paid' ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' : 'bg-amber-500/10 text-amber-600 dark:text-amber-400'}`}>{row.status}</span></td>
                      <td className="px-4 py-3 text-sm text-muted-foreground">{row.paidOn || '—'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
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
          CLASS ASSIGNMENT TAB
      ═══════════════════════════════════════════════════════════════ */}
      {activeTab === 'class-assignment' && (
        <motion.div variants={itemVariants} className="space-y-6">
          {/* ─── Summary Stats Row ──────────────────────────── */}
          {(() => {
            const stats = getAssignmentStats()
            const statCards = [
              { label: 'Total Assignments', value: stats.totalAssignments, icon: BookOpen, gradient: 'from-[#0A1628] to-[#0f2340]', glow: 'shadow-[#0A1628]/20' },
              { label: 'Assigned Teachers', value: stats.assignedTeachers, icon: UserCheck, gradient: 'from-emerald-900 to-emerald-600', glow: 'shadow-emerald-800/20' },
              { label: 'Unassigned Teachers', value: stats.unassignedTeachers, icon: UserX, gradient: 'from-rose-900 to-rose-600', glow: 'shadow-rose-800/20' },
              { label: 'Class Teachers', value: stats.classTeachers, icon: GraduationCap, gradient: 'from-amber-900 to-amber-600', glow: 'shadow-amber-800/20' },
              { label: 'Avg Workload/Week', value: `${stats.avgWorkload}p`, icon: BarChart3, gradient: 'from-cyan-900 to-cyan-600', glow: 'shadow-cyan-800/20' },
              { label: 'Utilization Rate', value: `${stats.utilizationRate}%`, icon: Target, gradient: 'from-[#0A1628] to-[#1a3050]', glow: 'shadow-blue-800/20' },
            ]
            return (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                {statCards.map((card) => {
                  const Icon = card.icon
                  return (
                    <motion.div key={card.label} variants={itemVariants} className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${card.gradient} p-4 text-white shadow-xl ${card.glow}`}>
                      <div className="absolute top-0 right-0 w-16 h-16 rounded-full bg-white/5 -translate-y-4 translate-x-4" />
                      <div className="relative z-10">
                        <div className="w-8 h-8 rounded-lg bg-white/15 backdrop-blur-sm flex items-center justify-center mb-2"><Icon className="w-4 h-4" /></div>
                        <p className="text-xl font-bold">{card.value}</p>
                        <p className="text-[10px] text-white/70 mt-0.5">{card.label}</p>
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            )
          })()}

          {/* ─── View Toggle & Search Bar ───────────────────── */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <div className="flex items-center gap-1.5 bg-muted/30 rounded-xl p-1">
              {[
                { id: 'grid', label: 'Grid', icon: BookOpen },
                { id: 'byTeacher', label: 'By Teacher', icon: Users },
                { id: 'byClass', label: 'By Class', icon: GraduationCap },
              ].map((v) => {
                const Icon = v.icon
                return (
                  <button key={v.id} onClick={() => setAssignmentView(v.id)} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${assignmentView === v.id ? 'gradient-birla text-white shadow-md' : 'text-muted-foreground hover:bg-muted'}`}>
                    <Icon className="w-3.5 h-3.5" /> {v.label}
                  </button>
                )
              })}
            </div>
            <div className="flex-1 flex items-center gap-2 w-full sm:w-auto">
              <div className="relative flex-1 max-w-xs">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
                <input type="text" value={assignmentSearch} onChange={(e) => setAssignmentSearch(e.target.value)} placeholder="Search teacher, subject, class..." className="w-full pl-9 pr-3 py-2 rounded-lg border border-input bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-birla-gold/40" />
              </div>
              <select value={assignmentFilter} onChange={(e) => setAssignmentFilter(e.target.value)} className="px-3 py-2 rounded-lg border border-input bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-birla-gold/40">
                <option value="all">All Roles</option>
                <option value="classTeacher">Class Teacher</option>
                <option value="subjectTeacher">Subject Teacher</option>
              </select>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => { setShowAssignmentForm(true); setEditingAssignment(null); setAssignmentForm({ teacherId: '', subject: '', class: '', section: '', periodsPerWeek: '', role: 'Subject Teacher', isClassTeacher: false }) }} className="flex items-center gap-1.5 px-4 py-2 rounded-xl gradient-birla-gold text-birla-blue text-xs font-bold hover:opacity-90 transition-opacity"><Plus className="w-3.5 h-3.5" /> Add Assignment</button>
              <button onClick={() => setBulkAssignMode(true)} className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-[#C8A45C]/30 text-[#C8A45C] text-xs font-bold hover:bg-[#C8A45C]/10 transition-colors"><Users className="w-3.5 h-3.5" /> Bulk Assign</button>
            </div>
          </div>

          {/* ─── Grid View ──────────────────────────────────── */}
          {assignmentView === 'grid' && (
            <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead><tr className="border-b border-border bg-muted/30">
                    <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Teacher</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Emp ID</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Subject</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Class</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Section</th>
                    <th className="text-center px-4 py-3 text-xs font-semibold text-muted-foreground">Periods/Wk</th>
                    <th className="text-center px-4 py-3 text-xs font-semibold text-muted-foreground">Role</th>
                    <th className="text-center px-4 py-3 text-xs font-semibold text-muted-foreground">Actions</th>
                  </tr></thead>
                  <tbody>
                    {TEACHER_ASSIGNMENTS
                      .filter((a) => {
                        const q = assignmentSearch.toLowerCase()
                        if (q && !a.teacherName.toLowerCase().includes(q) && !a.subject.toLowerCase().includes(q) && !a.class.toLowerCase().includes(q)) return false
                        if (assignmentFilter === 'classTeacher' && !a.isClassTeacher) return false
                        if (assignmentFilter === 'subjectTeacher' && a.isClassTeacher) return false
                        return true
                      })
                      .map((assignment) => (
                        <tr key={assignment.id} className="border-b border-border/50 hover:bg-muted/20 transition-colors">
                          <td className="px-4 py-3 text-sm font-medium text-foreground">{assignment.teacherName}</td>
                          <td className="px-4 py-3 text-sm text-muted-foreground font-mono text-[11px]">{assignment.empId}</td>
                          <td className="px-4 py-3 text-sm text-foreground">{assignment.subject}</td>
                          <td className="px-4 py-3 text-sm font-semibold text-foreground">{assignment.class}</td>
                          <td className="px-4 py-3 text-sm text-muted-foreground">{assignment.section}</td>
                          <td className="px-4 py-3 text-center"><span className="px-2.5 py-1 rounded-lg bg-[#22D3EE]/10 text-[#22D3EE] text-xs font-bold">{assignment.periodsPerWeek}</span></td>
                          <td className="px-4 py-3 text-center"><span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${assignment.isClassTeacher ? 'bg-[#C8A45C]/15 text-[#C8A45C] dark:text-[#C8A45C]' : 'bg-[#22D3EE]/10 text-[#22D3EE]'}`}>{assignment.isClassTeacher ? 'Class Teacher' : 'Subject Teacher'}</span></td>
                          <td className="px-4 py-3 text-center">
                            <div className="flex items-center justify-center gap-1">
                              <button onClick={() => handleEditAssignment(assignment)} className="p-1.5 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"><Edit className="w-3.5 h-3.5" /></button>
                              <button onClick={() => handleDeleteAssignment(assignment.id)} className="p-1.5 rounded-lg hover:bg-red-500/10 transition-colors text-muted-foreground hover:text-red-500"><Trash2 className="w-3.5 h-3.5" /></button>
                            </div>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}

          {/* ─── By Teacher View ─────────────────────────────── */}
          {assignmentView === 'byTeacher' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {TEACHERS.map((teacher) => {
                const workload = getTeacherWorkload(teacher.id)
                if (assignmentSearch) {
                  const q = assignmentSearch.toLowerCase()
                  if (!teacher.name.toLowerCase().includes(q) && !teacher.department.toLowerCase().includes(q)) return null
                }
                if (assignmentFilter === 'classTeacher' && !workload.isClassTeacher) return null
                if (assignmentFilter === 'subjectTeacher' && workload.isClassTeacher) return null
                return (
                  <motion.div key={teacher.id} variants={itemVariants} className="rounded-2xl border border-border bg-card p-5 hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setSelectedTeacherWorkload(teacher.id)}>
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl gradient-birla text-white flex items-center justify-center text-sm font-bold">{teacher.name.split(' ').map(n => n[0]).join('').slice(0, 2)}</div>
                        <div>
                          <p className="text-sm font-semibold text-foreground">{teacher.name}</p>
                          <p className="text-[10px] text-muted-foreground">{teacher.department} &bull; {teacher.designation}</p>
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-muted-foreground" />
                    </div>
                    <div className="space-y-2 mb-3">
                      <div className="flex justify-between text-[11px]">
                        <span className="text-muted-foreground">Total Periods</span>
                        <span className="font-bold text-foreground">{workload.totalPeriods} / {workload.maxPeriods}</span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-muted overflow-hidden">
                        <div className={`h-full rounded-full transition-all ${workload.utilization > 90 ? 'bg-red-500' : workload.utilization > 70 ? 'bg-[#C8A45C]' : 'bg-[#22D3EE]'}`} style={{ width: `${Math.min(workload.utilization, 100)}%` }} />
                      </div>
                      <div className="flex justify-between text-[10px]">
                        <span className={`font-medium ${workload.utilization > 90 ? 'text-red-500' : workload.utilization > 70 ? 'text-[#C8A45C]' : 'text-[#22D3EE]'}`}>{workload.utilization}% Utilized</span>
                        {workload.isClassTeacher && <span className="px-1.5 py-0.5 rounded bg-[#C8A45C]/15 text-[#C8A45C] text-[9px] font-bold">Class Teacher</span>}
                      </div>
                    </div>
                    <div className="space-y-1">
                      {workload.assignments.slice(0, 4).map((a) => (
                        <div key={a.id} className="flex items-center justify-between text-[11px] py-1 px-2 rounded-lg bg-muted/30">
                          <span className="text-foreground font-medium">{a.subject}</span>
                          <span className="text-muted-foreground">{a.class}-{a.section} &bull; {a.periodsPerWeek}p</span>
                        </div>
                      ))}
                      {workload.assignments.length > 4 && <p className="text-[10px] text-muted-foreground text-center">+{workload.assignments.length - 4} more assignments</p>}
                    </div>
                  </motion.div>
                )
              })}
            </div>
          )}

          {/* ─── By Class View ───────────────────────────────── */}
          {assignmentView === 'byClass' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[...new Set(TEACHER_ASSIGNMENTS.map(a => `${a.class}-${a.section}`))].sort().map((classSection) => {
                const [cls, sec] = classSection.split('-')
                const coverage = getClassSubjectCoverage(cls, sec)
                if (assignmentSearch) {
                  const q = assignmentSearch.toLowerCase()
                  if (!cls.toLowerCase().includes(q) && !classSection.toLowerCase().includes(q)) return null
                }
                const classTeacher = coverage.assignments.find(a => a.isClassTeacher)
                return (
                  <motion.div key={classSection} variants={itemVariants} className="rounded-2xl border border-border bg-card p-5 hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setClassCoverageView(classSection)}>
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl gradient-birla-gold text-birla-blue flex items-center justify-center text-sm font-bold">{cls}{sec}</div>
                        <div>
                          <p className="text-sm font-semibold text-foreground">Class {cls} - Section {sec}</p>
                          <p className="text-[10px] text-muted-foreground">{coverage.coveredSubjects.length} subjects assigned</p>
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-muted-foreground" />
                    </div>
                    {/* Coverage bar */}
                    <div className="mb-3">
                      <div className="flex justify-between text-[11px] mb-1">
                        <span className="text-muted-foreground">Subject Coverage</span>
                        <span className={`font-bold ${coverage.coverage >= 80 ? 'text-emerald-500' : coverage.coverage >= 50 ? 'text-[#C8A45C]' : 'text-red-500'}`}>{coverage.coverage}%</span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-muted overflow-hidden">
                        <div className={`h-full rounded-full transition-all ${coverage.coverage >= 80 ? 'bg-emerald-500' : coverage.coverage >= 50 ? 'bg-[#C8A45C]' : 'bg-red-500'}`} style={{ width: `${coverage.coverage}%` }} />
                      </div>
                    </div>
                    {/* Class Teacher */}
                    {classTeacher && (
                      <div className="mb-3 flex items-center gap-2 p-2 rounded-lg bg-[#C8A45C]/10">
                        <GraduationCap className="w-3.5 h-3.5 text-[#C8A45C]" />
                        <span className="text-[11px] font-medium text-[#C8A45C]">Class Teacher: {classTeacher.teacherName}</span>
                      </div>
                    )}
                    {/* Subject-Teacher list */}
                    <div className="space-y-1 max-h-32 overflow-y-auto">
                      {coverage.assignments.map((a) => (
                        <div key={a.id} className="flex items-center justify-between text-[11px] py-1 px-2 rounded-lg bg-muted/30">
                          <span className="text-foreground font-medium">{a.subject}</span>
                          <span className="text-muted-foreground">{a.teacherName}</span>
                        </div>
                      ))}
                      {coverage.unassigned.length > 0 && (
                        <div className="mt-1">
                          <p className="text-[10px] text-red-500 font-medium">Unassigned: {coverage.unassigned.slice(0, 3).join(', ')}{coverage.unassigned.length > 3 ? ` +${coverage.unassigned.length - 3}` : ''}</p>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )
              })}
            </div>
          )}

          {/* ─── Add / Edit Assignment Form ──────────────────── */}
          {showAssignmentForm && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="rounded-2xl border border-[#C8A45C]/30 bg-card p-6">
              <h3 className="text-lg font-semibold text-foreground flex items-center gap-2 mb-6">
                <GraduationCap className="w-5 h-5 text-birla-gold" />
                {editingAssignment ? 'Edit Assignment' : 'Add New Assignment'}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <FormField label="Teacher">
                  <select value={assignmentForm.teacherId} onChange={(e) => setAssignmentForm({ ...assignmentForm, teacherId: e.target.value })} className="w-full px-3 py-2 rounded-lg border border-input bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-birla-gold/40">
                    <option value="">Select Teacher</option>
                    {TEACHERS.map((t) => <option key={t.id} value={t.id}>{t.name} ({t.department})</option>)}
                  </select>
                </FormField>
                <FormField label="Subject">
                  <select value={assignmentForm.subject} onChange={(e) => setAssignmentForm({ ...assignmentForm, subject: e.target.value })} className="w-full px-3 py-2 rounded-lg border border-input bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-birla-gold/40">
                    <option value="">Select Subject</option>
                    {SUBJECTS.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </FormField>
                <FormField label="Class">
                  <select value={assignmentForm.class} onChange={(e) => setAssignmentForm({ ...assignmentForm, class: e.target.value })} className="w-full px-3 py-2 rounded-lg border border-input bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-birla-gold/40">
                    <option value="">Select Class</option>
                    {CLASSES.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                </FormField>
                <FormField label="Section">
                  <select value={assignmentForm.section} onChange={(e) => setAssignmentForm({ ...assignmentForm, section: e.target.value })} className="w-full px-3 py-2 rounded-lg border border-input bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-birla-gold/40">
                    <option value="">Select Section</option>
                    {SECTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </FormField>
                <FormField label="Periods per Week">
                  <input type="number" value={assignmentForm.periodsPerWeek} onChange={(e) => setAssignmentForm({ ...assignmentForm, periodsPerWeek: e.target.value })} placeholder="e.g. 6" className="w-full px-3 py-2 rounded-lg border border-input bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-birla-gold/40" />
                </FormField>
                <FormField label="Role">
                  <div className="flex items-center gap-3 mt-1">
                    <button type="button" onClick={() => setAssignmentForm({ ...assignmentForm, isClassTeacher: true })} className={`flex-1 px-3 py-2 rounded-lg text-xs font-medium transition-all ${assignmentForm.isClassTeacher ? 'gradient-birla-gold text-birla-blue shadow-md' : 'border border-border text-muted-foreground hover:bg-muted'}`}>Class Teacher</button>
                    <button type="button" onClick={() => setAssignmentForm({ ...assignmentForm, isClassTeacher: false })} className={`flex-1 px-3 py-2 rounded-lg text-xs font-medium transition-all ${!assignmentForm.isClassTeacher ? 'gradient-birla text-white shadow-md' : 'border border-border text-muted-foreground hover:bg-muted'}`}>Subject Teacher</button>
                  </div>
                </FormField>
              </div>
              <div className="mt-6 flex justify-end gap-3">
                <button onClick={() => { setShowAssignmentForm(false); setEditingAssignment(null); setAssignmentForm({ teacherId: '', subject: '', class: '', section: '', periodsPerWeek: '', role: 'Subject Teacher', isClassTeacher: false }) }} className="px-6 py-2.5 rounded-xl border border-border text-muted-foreground text-sm font-medium hover:bg-muted transition-colors"><XCircle className="w-4 h-4 inline mr-1.5" />Cancel</button>
                <button onClick={handleAssignmentSubmit} className="px-6 py-2.5 rounded-xl gradient-birla-gold text-birla-blue text-sm font-bold hover:opacity-90 transition-opacity flex items-center gap-2"><Save className="w-4 h-4" />{editingAssignment ? 'Update Assignment' : 'Save Assignment'}</button>
              </div>
            </motion.div>
          )}

          {/* ─── Bulk Assign Form ────────────────────────────── */}
          {bulkAssignMode && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="rounded-2xl border border-[#22D3EE]/30 bg-card p-6">
              <h3 className="text-lg font-semibold text-foreground flex items-center gap-2 mb-6"><Users className="w-5 h-5 text-[#22D3EE]" />Bulk Assignment</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField label="Teacher">
                  <select value={bulkAssignForm.teacherId} onChange={(e) => setBulkAssignForm({ ...bulkAssignForm, teacherId: e.target.value })} className="w-full px-3 py-2 rounded-lg border border-input bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-birla-gold/40">
                    <option value="">Select Teacher</option>
                    {TEACHERS.map((t) => <option key={t.id} value={t.id}>{t.name} ({t.department})</option>)}
                  </select>
                </FormField>
                <FormField label="Subject">
                  <select value={bulkAssignForm.subject} onChange={(e) => setBulkAssignForm({ ...bulkAssignForm, subject: e.target.value })} className="w-full px-3 py-2 rounded-lg border border-input bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-birla-gold/40">
                    <option value="">Select Subject</option>
                    {SUBJECTS.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </FormField>
                <FormField label="Periods per Week (per class)">
                  <input type="number" value={bulkAssignForm.periodsPerWeek} onChange={(e) => setBulkAssignForm({ ...bulkAssignForm, periodsPerWeek: e.target.value })} placeholder="e.g. 6" className="w-full px-3 py-2 rounded-lg border border-input bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-birla-gold/40" />
                </FormField>
                <FormField label="Select Class-Sections">
                  <div className="flex flex-wrap gap-2 p-2 rounded-lg border border-input bg-background max-h-24 overflow-y-auto">
                    {[...new Set(TEACHER_ASSIGNMENTS.map(a => `${a.class}-${a.section}`))].sort().map((cs) => (
                      <button key={cs} type="button" onClick={() => {
                        const current = bulkAssignForm.classes
                        setBulkAssignForm({ ...bulkAssignForm, classes: current.includes(cs) ? current.filter(c => c !== cs) : [...current, cs] })
                      }} className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-all ${bulkAssignForm.classes.includes(cs) ? 'gradient-birla text-white' : 'bg-muted text-muted-foreground hover:bg-muted/80'}`}>{cs}</button>
                    ))}
                  </div>
                </FormField>
              </div>
              <div className="mt-6 flex justify-end gap-3">
                <button onClick={() => { setBulkAssignMode(false); setBulkAssignForm({ teacherId: '', classes: [], subject: '', periodsPerWeek: '' }) }} className="px-6 py-2.5 rounded-xl border border-border text-muted-foreground text-sm font-medium hover:bg-muted transition-colors"><XCircle className="w-4 h-4 inline mr-1.5" />Cancel</button>
                <button onClick={handleBulkAssignSubmit} className="px-6 py-2.5 rounded-xl gradient-birla text-white text-sm font-bold hover:opacity-90 transition-opacity flex items-center gap-2"><CheckCircle2 className="w-4 h-4" />Assign to {bulkAssignForm.classes.length} Classes</button>
              </div>
            </motion.div>
          )}

          {/* ─── Teacher Workload Detail Panel ───────────────── */}
          {selectedTeacherWorkload && (
            <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} className="rounded-2xl border border-[#C8A45C]/30 bg-gradient-to-br from-[#0A1628] to-[#0f2340] p-5 text-white">
              {(() => {
                const wl = getTeacherWorkload(selectedTeacherWorkload)
                const teacher = TEACHERS.find(t => t.id === selectedTeacherWorkload)
                if (!teacher) return null
                const freePeriods = wl.maxPeriods - wl.totalPeriods
                const workloadChartData = wl.assignments.map(a => ({ name: `${a.class}-${a.section} ${a.subject}`, periods: a.periodsPerWeek }))
                return (
                  <div>
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl gradient-birla-gold text-birla-blue flex items-center justify-center text-sm font-bold">{teacher.name.split(' ').map(n => n[0]).join('').slice(0, 2)}</div>
                        <div>
                          <p className="text-base font-bold text-white">{teacher.name}</p>
                          <p className="text-xs text-[#C8A45C]">{teacher.designation} &bull; {teacher.department}</p>
                          <p className="text-[10px] text-white/50">{teacher.qualification} &bull; Specialization: {teacher.specialization}</p>
                        </div>
                      </div>
                      <button onClick={() => setSelectedTeacherWorkload(null)} className="p-1.5 rounded-lg hover:bg-white/10 transition-colors"><XCircle className="w-5 h-5 text-white/60" /></button>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
                      <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-center">
                        <p className="text-lg font-bold text-[#22D3EE]">{wl.totalPeriods}</p>
                        <p className="text-[10px] text-white/50">Total Periods</p>
                      </div>
                      <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-center">
                        <p className="text-lg font-bold text-[#C8A45C]">{wl.maxPeriods}</p>
                        <p className="text-[10px] text-white/50">Max Periods</p>
                      </div>
                      <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-center">
                        <p className={`text-lg font-bold ${wl.utilization > 90 ? 'text-red-400' : 'text-emerald-400'}`}>{wl.utilization}%</p>
                        <p className="text-[10px] text-white/50">Utilization</p>
                      </div>
                      <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-center">
                        <p className="text-lg font-bold text-emerald-400">{freePeriods}</p>
                        <p className="text-[10px] text-white/50">Free Periods</p>
                      </div>
                    </div>
                    {/* Class Teacher Responsibilities */}
                    {wl.classTeacherOf.length > 0 && (
                      <div className="mb-4 p-3 rounded-xl bg-[#C8A45C]/10 border border-[#C8A45C]/20">
                        <p className="text-[10px] font-bold text-[#C8A45C] uppercase tracking-wider mb-1">Class Teacher Responsibilities</p>
                        <div className="flex flex-wrap gap-1.5">
                          {wl.classTeacherOf.map((cs) => <span key={cs} className="px-2 py-0.5 rounded-lg bg-[#C8A45C]/20 text-[#C8A45C] text-[11px] font-medium">Class {cs}</span>)}
                        </div>
                      </div>
                    )}
                    {/* Workload Bar Chart */}
                    {workloadChartData.length > 0 && (
                      <div className="mb-4">
                        <p className="text-[10px] font-bold text-white/50 uppercase tracking-wider mb-2">Period Distribution</p>
                        <div className="h-40">
                          <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={workloadChartData} layout="vertical">
                              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
                              <XAxis type="number" tick={{ fontSize: 9 }} stroke="#64748b" />
                              <YAxis type="category" dataKey="name" tick={{ fontSize: 8 }} stroke="#64748b" width={100} />
                              <Tooltip contentStyle={tooltipStyle} />
                              <Bar dataKey="periods" fill="#22D3EE" radius={[0, 4, 4, 0]} />
                            </BarChart>
                          </ResponsiveContainer>
                        </div>
                      </div>
                    )}
                    {/* Assignment list */}
                    <div className="space-y-1.5 max-h-48 overflow-y-auto">
                      <p className="text-[10px] font-bold text-white/50 uppercase tracking-wider mb-1">All Assignments</p>
                      {wl.assignments.map((a) => (
                        <div key={a.id} className="flex items-center justify-between text-[11px] py-1.5 px-3 rounded-lg bg-white/5">
                          <div className="flex items-center gap-2">
                            <BookOpen className="w-3 h-3 text-[#22D3EE]" />
                            <span className="text-white font-medium">{a.subject}</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="text-white/60">Class {a.class}-{a.section}</span>
                            <span className="text-[#22D3EE] font-bold">{a.periodsPerWeek}p</span>
                            {a.isClassTeacher && <span className="px-1.5 py-0.5 rounded bg-[#C8A45C]/20 text-[#C8A45C] text-[9px] font-bold">CT</span>}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )
              })()}
            </motion.div>
          )}

          {/* ─── Class Coverage Detail Panel ─────────────────── */}
          {classCoverageView && (
            <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} className="rounded-2xl border border-[#22D3EE]/30 bg-gradient-to-br from-[#0A1628] to-[#0f2340] p-5 text-white">
              {(() => {
                const [cls, sec] = classCoverageView.split('-')
                const coverage = getClassSubjectCoverage(cls, sec)
                const classTeacher = coverage.assignments.find(a => a.isClassTeacher)
                return (
                  <div>
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl gradient-birla-gold text-birla-blue flex items-center justify-center text-sm font-bold">{cls}{sec}</div>
                        <div>
                          <p className="text-base font-bold text-white">Class {cls} - Section {sec}</p>
                          <p className="text-xs text-[#22D3EE]">{coverage.coveredSubjects.length} subjects covered &bull; {coverage.unassigned.length} unassigned</p>
                          {classTeacher && <p className="text-[10px] text-[#C8A45C] mt-0.5">Class Teacher: {classTeacher.teacherName}</p>}
                        </div>
                      </div>
                      <button onClick={() => setClassCoverageView(null)} className="p-1.5 rounded-lg hover:bg-white/10 transition-colors"><XCircle className="w-5 h-5 text-white/60" /></button>
                    </div>
                    {/* Coverage bar */}
                    <div className="mb-4">
                      <div className="flex justify-between text-[11px] mb-1">
                        <span className="text-white/50">Subject Coverage</span>
                        <span className={`font-bold ${coverage.coverage >= 80 ? 'text-emerald-400' : coverage.coverage >= 50 ? 'text-[#C8A45C]' : 'text-red-400'}`}>{coverage.coverage}%</span>
                      </div>
                      <div className="w-full h-3 rounded-full bg-white/10 overflow-hidden">
                        <div className={`h-full rounded-full transition-all ${coverage.coverage >= 80 ? 'bg-emerald-500' : coverage.coverage >= 50 ? 'bg-[#C8A45C]' : 'bg-red-500'}`} style={{ width: `${coverage.coverage}%` }} />
                      </div>
                    </div>
                    {/* Covered subjects */}
                    <div className="mb-4">
                      <p className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider mb-2">Covered Subjects</p>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
                        {coverage.assignments.map((a) => (
                          <div key={a.id} className="flex items-center justify-between p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                            <div>
                              <p className="text-[11px] font-medium text-white">{a.subject}</p>
                              <p className="text-[9px] text-white/50">{a.teacherName} &bull; {a.periodsPerWeek}p/w</p>
                            </div>
                            {a.isClassTeacher && <GraduationCap className="w-3.5 h-3.5 text-[#C8A45C]" />}
                          </div>
                        ))}
                      </div>
                    </div>
                    {/* Unassigned subjects */}
                    {coverage.unassigned.length > 0 && (
                      <div>
                        <p className="text-[10px] font-bold text-red-400 uppercase tracking-wider mb-2">Unassigned Subjects</p>
                        <div className="flex flex-wrap gap-1.5">
                          {coverage.unassigned.map((s) => (
                            <span key={s} className="px-2.5 py-1 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-[11px] font-medium">{s}</span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )
              })()}
            </motion.div>
          )}
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
              <div className="mt-6 flex justify-end gap-3">
                <button onClick={() => setOnboardingForm({ name: '', employeeId: '', department: 'Teaching', designation: '', campus: 'Singur', phone: '', email: '', joinDate: '', salary: '', qualification: '', experience: '', bankAccount: '', panNumber: '', aadhaarNumber: '', emergencyContact: '', reportingManager: '' })} className="px-6 py-2.5 rounded-xl border border-border text-muted-foreground text-sm font-medium hover:bg-muted transition-colors"><RefreshCw className="w-4 h-4 inline mr-1.5" />Reset</button>
                <button onClick={handleOnboardingSubmit} className="px-6 py-2.5 rounded-xl gradient-birla-gold text-birla-blue text-sm font-bold hover:opacity-90 transition-opacity flex items-center gap-2"><Save className="w-4 h-4" />Onboard Staff</button>
              </div>
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
              <div className="mt-6 flex justify-end gap-3">
                <button onClick={() => setLeaveForm({ employeeId: '', leaveType: 'CL', fromDate: '', toDate: '', totalDays: '', reason: '', contactDuringLeave: '', arrangementMade: '' })} className="px-6 py-2.5 rounded-xl border border-border text-muted-foreground text-sm font-medium hover:bg-muted transition-colors"><RefreshCw className="w-4 h-4 inline mr-1.5" />Reset</button>
                <button onClick={handleLeaveSubmit} className="px-6 py-2.5 rounded-xl gradient-birla-gold text-birla-blue text-sm font-bold hover:opacity-90 transition-opacity flex items-center gap-2"><Save className="w-4 h-4" />Submit Leave</button>
              </div>
            </motion.div>
          )}

          {/* Form 3: Payroll Processing */}
          {activeForm === 2 && (
            <motion.div variants={itemVariants} className="space-y-6">
              <div className="rounded-2xl border border-border bg-card p-6">
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
                <div className="mt-6 flex justify-end gap-3">
                  <button onClick={() => { setPayrollForm({ month: 'March', year: '2026', department: 'All', includeBonus: false, includeDeductions: true }); setGeneratedPayslip(null) }} className="px-6 py-2.5 rounded-xl border border-border text-muted-foreground text-sm font-medium hover:bg-muted transition-colors"><RefreshCw className="w-4 h-4 inline mr-1.5" />Reset</button>
                  <button onClick={handlePayrollSubmit} className="px-6 py-2.5 rounded-xl gradient-birla text-white text-sm font-bold hover:opacity-90 transition-opacity flex items-center gap-2"><Banknote className="w-4 h-4" />Process Payroll</button>
                </div>
              </div>
              {/* Payslip Preview */}
              {generatedPayslip && <PayslipPreviewCard payslip={generatedPayslip} />}
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
              <div className="mt-6 flex justify-end gap-3">
                <button onClick={() => setPerformanceForm({ employeeId: '', reviewPeriod: '2025-26', rating: '3', kpiScore: '', communication: '', punctuality: '', teamwork: '', leadership: '', initiative: '', overallComments: '', reviewerName: '', reviewDate: '' })} className="px-6 py-2.5 rounded-xl border border-border text-muted-foreground text-sm font-medium hover:bg-muted transition-colors"><RefreshCw className="w-4 h-4 inline mr-1.5" />Reset</button>
                <button onClick={handlePerformanceSubmit} className="px-6 py-2.5 rounded-xl gradient-birla-gold text-birla-blue text-sm font-bold hover:opacity-90 transition-opacity flex items-center gap-2"><Save className="w-4 h-4" />Submit Review</button>
              </div>
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
              <div className="mt-6 flex justify-end gap-3">
                <button onClick={() => setJobForm({ position: '', department: '', campus: 'Singur', qualification: '', experience: '', salaryRange: '', jobDescription: '', lastDate: '', positionCount: '1', employmentType: 'Full-Time' })} className="px-6 py-2.5 rounded-xl border border-border text-muted-foreground text-sm font-medium hover:bg-muted transition-colors"><RefreshCw className="w-4 h-4 inline mr-1.5" />Reset</button>
                <button onClick={handleJobSubmit} className="px-6 py-2.5 rounded-xl gradient-birla-gold text-birla-blue text-sm font-bold hover:opacity-90 transition-opacity flex items-center gap-2"><Save className="w-4 h-4" />Post Job</button>
              </div>
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
              <div className="mt-6 flex justify-end gap-3">
                <button onClick={() => setInterviewForm({ candidateName: '', position: '', interviewDate: '', interviewTime: '', interviewer: '', mode: 'In-Person', location: '', notes: '' })} className="px-6 py-2.5 rounded-xl border border-border text-muted-foreground text-sm font-medium hover:bg-muted transition-colors"><RefreshCw className="w-4 h-4 inline mr-1.5" />Reset</button>
                <button onClick={handleInterviewSubmit} className="px-6 py-2.5 rounded-xl gradient-birla-gold text-birla-blue text-sm font-bold hover:opacity-90 transition-opacity flex items-center gap-2"><Save className="w-4 h-4" />Schedule Interview</button>
              </div>
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
              <div className="mt-6 flex justify-end gap-3">
                <button onClick={() => setExitForm({ employeeId: '', lastWorkingDay: '', reason: '', noticePeriodServed: false, handoverComplete: false, duesCleared: false, exitInterviewDate: '', remarks: '' })} className="px-6 py-2.5 rounded-xl border border-border text-muted-foreground text-sm font-medium hover:bg-muted transition-colors"><RefreshCw className="w-4 h-4 inline mr-1.5" />Reset</button>
                <button onClick={handleExitSubmit} className="px-6 py-2.5 rounded-xl gradient-birla-gold text-birla-blue text-sm font-bold hover:opacity-90 transition-opacity flex items-center gap-2"><Save className="w-4 h-4" />Process Exit</button>
              </div>
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
