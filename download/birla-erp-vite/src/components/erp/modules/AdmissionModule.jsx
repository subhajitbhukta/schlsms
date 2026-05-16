import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ClipboardList, Users, FileText, Search, Plus, Eye, GraduationCap, ArrowUpRight, Clock, CheckCircle2, XCircle, Download, Phone, Calendar, BookOpen, IndianRupee, Activity, BarChart3, PieChart as PieChartIcon, Target, UserCheck, MessageSquare, TrendingUp, FileCheck, CreditCard, MapPin, Star, UserPlus, CalendarCheck, X, Save, Hash, Shield, BadgeCheck, Building2 } from 'lucide-react'
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Legend, PieChart, Pie, Cell,
  AreaChart, Area
} from 'recharts'
import useAppStore from '../../../store/useAppStore'
import QRStudentLookup, { STUDENT_DB } from '../shared/QRStudentLookup'

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.06 } },
}
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
}

const CHART_COLORS = ['#1A2D4A', '#22D3EE', '#C8A45C', '#8B5CF6', '#10B981', '#EF4444', '#F59E0B']

const applicationTrendsData = [
  { month: 'Apr', applications: 12, admissions: 8 },
  { month: 'May', applications: 18, admissions: 14 },
  { month: 'Jun', applications: 25, admissions: 18 },
  { month: 'Jul', applications: 32, admissions: 22 },
  { month: 'Aug', applications: 20, admissions: 15 },
  { month: 'Sep', applications: 15, admissions: 10 },
  { month: 'Oct', applications: 22, admissions: 16 },
  { month: 'Nov', applications: 35, admissions: 28 },
  { month: 'Dec', applications: 45, admissions: 35 },
  { month: 'Jan', applications: 58, admissions: 42 },
  { month: 'Feb', applications: 65, admissions: 50 },
  { month: 'Mar', applications: 85, admissions: 52 },
]

const conversionFunnelData = [
  { name: 'Applied', value: 520, color: '#22D3EE' },
  { name: 'Screened', value: 380, color: '#C8A45C' },
  { name: 'Exam Cleared', value: 280, color: '#8B5CF6' },
  { name: 'Admitted', value: 180, color: '#10B981' },
  { name: 'Enrolled', value: 155, color: '#F59E0B' },
]

const classWiseApplications = [
  { class: 'I', applied: 45, admitted: 38 },
  { class: 'II', applied: 38, admitted: 30 },
  { class: 'III', applied: 32, admitted: 25 },
  { class: 'IV', applied: 28, admitted: 22 },
  { class: 'V', applied: 35, admitted: 28 },
  { class: 'VI', applied: 42, admitted: 35 },
  { class: 'VII', applied: 38, admitted: 30 },
  { class: 'VIII', applied: 30, admitted: 24 },
  { class: 'IX', applied: 35, admitted: 28 },
  { class: 'X', applied: 25, admitted: 20 },
  { class: 'XI Sci', applied: 48, admitted: 35 },
  { class: 'XI Comm', applied: 40, admitted: 32 },
  { class: 'XII Sci', applied: 22, admitted: 18 },
  { class: 'XII Comm', applied: 18, admitted: 15 },
]

const seatMatrixData = [
  { class: 'I', capacity: 80, filled: 73, available: 7 },
  { class: 'II', capacity: 80, filled: 76, available: 4 },
  { class: 'III', capacity: 40, filled: 37, available: 3 },
  { class: 'IV', capacity: 40, filled: 39, available: 1 },
  { class: 'V', capacity: 45, filled: 40, available: 5 },
  { class: 'VI', capacity: 45, filled: 42, available: 3 },
  { class: 'VII', capacity: 45, filled: 44, available: 1 },
  { class: 'VIII', capacity: 45, filled: 45, available: 0 },
  { class: 'IX', capacity: 45, filled: 43, available: 2 },
  { class: 'X', capacity: 45, filled: 38, available: 7 },
  { class: 'XI', capacity: 80, filled: 67, available: 13 },
  { class: 'XII', capacity: 80, filled: 74, available: 6 },
]

const entranceExamResults = [
  { name: 'Aarav Mishra', bspId: 'BSP/WB/2023/00012', penNo: 'PEN-4321-5678', upparId: 'UPPR-WB-001234', written: 72, oral: 18, total: 90, result: 'Pass' },
  { name: 'Diya Verma', bspId: 'BSP/WB/2023/00034', penNo: 'PEN-8765-4321', upparId: 'UPPR-WB-003456', written: 65, oral: 15, total: 80, result: 'Pass' },
  { name: 'Kabir Saxena', bspId: 'BSP/WB/2023/00056', penNo: 'PEN-1234-9876', upparId: 'UPPR-WB-005678', written: 55, oral: 12, total: 67, result: 'Pass' },
  { name: 'Anvi Reddy', bspId: 'BSP/WB/2023/00078', penNo: 'PEN-5678-1234', upparId: 'UPPR-WB-007890', written: 82, oral: 20, total: 102, result: 'Pass' },
  { name: 'Ishaan Joshi', bspId: 'BSP/WB/2023/00090', penNo: 'PEN-9012-3456', upparId: 'UPPR-WB-009012', written: 42, oral: 8, total: 50, result: 'Fail' },
  { name: 'Priya Nair', bspId: 'BSP/WB/2023/00102', penNo: 'PEN-3456-7890', upparId: 'UPPR-WB-011234', written: 78, oral: 19, total: 97, result: 'Pass' },
  { name: 'Rohan Gupta', bspId: 'BSP/WB/2023/00114', penNo: 'PEN-7890-1234', upparId: 'UPPR-WB-013456', written: 48, oral: 10, total: 58, result: 'Fail' },
  { name: 'Meera Patel', bspId: 'BSP/WB/2023/00126', penNo: 'PEN-2345-6789', upparId: 'UPPR-WB-015678', written: 70, oral: 16, total: 86, result: 'Pass' },
]

const documentComplianceData = [
  { name: 'All Verified', value: 68, color: '#10B981' },
  { name: 'Partial', value: 22, color: '#F59E0B' },
  { name: 'Pending', value: 10, color: '#EF4444' },
]

const bspPenCompliance = [
  { class: 'I', total: 73, bspAssigned: 73, penAssigned: 70, upparAssigned: 68 },
  { class: 'II', total: 76, bspAssigned: 76, penAssigned: 74, upparAssigned: 72 },
  { class: 'III', total: 37, bspAssigned: 37, penAssigned: 35, upparAssigned: 34 },
  { class: 'IV', total: 39, bspAssigned: 39, penAssigned: 38, upparAssigned: 37 },
  { class: 'V', total: 40, bspAssigned: 40, penAssigned: 39, upparAssigned: 38 },
  { class: 'VI', total: 42, bspAssigned: 42, penAssigned: 41, upparAssigned: 40 },
  { class: 'VII', total: 44, bspAssigned: 44, penAssigned: 43, upparAssigned: 42 },
  { class: 'VIII', total: 45, bspAssigned: 45, penAssigned: 44, upparAssigned: 43 },
  { class: 'IX', total: 43, bspAssigned: 43, penAssigned: 42, upparAssigned: 41 },
  { class: 'X', total: 38, bspAssigned: 38, penAssigned: 37, upparAssigned: 36 },
  { class: 'XI', total: 67, bspAssigned: 67, penAssigned: 65, upparAssigned: 63 },
  { class: 'XII', total: 74, bspAssigned: 74, penAssigned: 72, upparAssigned: 70 },
]

const recentApplications = [
  { id: 'APP-2026-001', name: 'Aarav Mishra', class: 'VI', bspId: 'BSP/WB/2023/00012', penNo: 'PEN-4321-5678', upparId: 'UPPR-WB-001234', date: 'Mar 1, 2026', status: 'Under Review' },
  { id: 'APP-2026-002', name: 'Diya Verma', class: 'VII', bspId: 'BSP/WB/2023/00034', penNo: 'PEN-8765-4321', upparId: 'UPPR-WB-003456', date: 'Mar 2, 2026', status: 'Screening' },
  { id: 'APP-2026-003', name: 'Kabir Saxena', class: 'VIII', bspId: 'BSP/WB/2023/00056', penNo: 'PEN-1234-9876', upparId: 'UPPR-WB-005678', date: 'Mar 3, 2026', status: 'Exam Cleared' },
  { id: 'APP-2026-004', name: 'Anvi Reddy', class: 'IX', bspId: 'BSP/WB/2023/00078', penNo: 'PEN-5678-1234', upparId: 'UPPR-WB-007890', date: 'Mar 4, 2026', status: 'Admitted' },
  { id: 'APP-2026-005', name: 'Ishaan Joshi', class: 'XI', bspId: 'BSP/WB/2023/00090', penNo: 'PEN-9012-3456', upparId: 'UPPR-WB-009012', date: 'Mar 5, 2026', status: 'Waitlisted' },
]

const counsellingSessions = [
  { parent: 'Mr. Suresh Mishra', child: 'Aarav Mishra', phone: '+91 98765 11111', counsellor: 'Dr. Sunita Rao', date: '2026-03-10', time: '10:00 AM', mode: 'In-Person', status: 'Completed', notes: 'Positive interaction. Child is well-prepared.' },
  { parent: 'Mrs. Priti Verma', child: 'Diya Verma', phone: '+91 98765 22222', counsellor: 'Mr. Rakesh Pandey', date: '2026-03-11', time: '11:30 AM', mode: 'Online', status: 'Scheduled', notes: '' },
  { parent: 'Mr. Anil Saxena', child: 'Kabir Saxena', phone: '+91 98765 33333', counsellor: 'Mrs. Kavitha Sharma', date: '2026-03-12', time: '2:00 PM', mode: 'In-Person', status: 'Scheduled', notes: '' },
]

export default function AdmissionModule() {
  const { darkMode } = useAppStore()
  const [activeTab, setActiveTab] = useState('overview')
  const [showForm, setShowForm] = useState(null)

  const [admissionForm, setAdmissionForm] = useState({
    studentName: '', dob: '', gender: '', classApplied: '', previousSchool: '',
    fatherName: '', fatherPhone: '', fatherEmail: '', motherName: '', motherPhone: '',
    address: '', bspId: '', penNo: '', upparId: '',
    birthCert: false, aadhaar: false, tc: false, marksheet: false, photos: false, declaration: false
  })
  const [entranceExamForm, setEntranceExamForm] = useState({
    examName: '', class: '', subject: '', examDate: '', duration: '', totalMarks: '', passingMarks: '', examType: 'Written', venue: '', instructions: ''
  })
  const [scoreEntryForm, setScoreEntryForm] = useState({
    examName: '', studentName: '', writtenMarks: '', oralMarks: '', totalMarks: '', result: 'Pass'
  })
  const [counsellingForm, setCounsellingForm] = useState({
    parentName: '', childName: '', phone: '', counsellor: '', date: '', time: '', mode: 'In-Person', notes: '', status: 'Scheduled'
  })
  const [docVerifyForm, setDocVerifyForm] = useState({
    studentName: '', documentType: '', verifiedBy: '', verificationDate: '', status: 'Verified', remarks: ''
  })
  const [confirmForm, setConfirmForm] = useState({
    studentName: '', class: '', section: '', admissionNumber: '', bspId: '', penNo: '', upparId: '', feePaid: false, seatConfirmed: false
  })

  const tooltipStyle = {
    backgroundColor: darkMode ? '#1A2D4A' : '#fff',
    border: '1px solid ' + (darkMode ? 'rgba(255,255,255,0.1)' : '#e2e8f0'),
    borderRadius: '12px', fontSize: '12px', color: darkMode ? '#e2e8f0' : '#1e293b'
  }

  const inputClass = `w-full px-3 py-2 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-birla-gold/40`
  const labelClass = 'block text-xs font-medium text-muted-foreground mb-1'

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'applications', label: 'Applications', icon: Users },
    { id: 'entrance-exam', label: 'Entrance Exam', icon: GraduationCap },
    { id: 'counselling', label: 'Counselling', icon: MessageSquare },
    { id: 'forms', label: 'Forms', icon: ClipboardList },
    { id: 'reports', label: 'Reports', icon: Activity },
  ]

  const forms = [
    { id: 'admission', label: 'Admission Application', icon: UserPlus },
    { id: 'entrance', label: 'Entrance Exam', icon: GraduationCap },
    { id: 'scoreEntry', label: 'Score Entry', icon: FileCheck },
    { id: 'counselling', label: 'Counselling Session', icon: MessageSquare },
    { id: 'docVerify', label: 'Document Verify', icon: BadgeCheck },
    { id: 'confirm', label: 'Admission Confirm', icon: CheckCircle2 },
  ]

  const [selectedQRStudent, setSelectedQRStudent] = useState(null)

  const handleSubmit = (formType) => {
    alert(`${formType} submitted successfully!`)
    setShowForm(null)
  }

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="show" className="p-4 lg:p-6 space-y-6 max-w-[1600px] mx-auto">
      {/* Header */}
      <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
            <ClipboardList className="w-5 h-5 text-birla-cyan" />Admission Management
          </h2>
          <p className="text-[11px] text-muted-foreground mt-0.5">Birla Open Minds International GraduationCap &bull; Academic Session 2025-26</p>
        </div>
        <div className="flex gap-1 p-1 rounded-xl bg-muted/50 border border-border overflow-x-auto">
          {tabs.map(tab => {
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
      <motion.div variants={itemVariants} className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: 'New Applications', value: '85', icon: FileText, color: 'text-cyan-500 bg-cyan-500/10', trend: '+12%' },
          { label: 'Screening Done', value: '42', icon: CalendarCheck, color: 'text-amber-500 bg-amber-500/10', trend: '+8%' },
          { label: 'Admitted', value: '310', icon: UserCheck, color: 'text-emerald-500 bg-emerald-500/10', trend: '+5%' },
          { label: 'Conversion Rate', value: '36.2%', icon: TrendingUp, color: 'text-purple-500 bg-purple-500/10', trend: '+2.3%' },
        ].map(stat => {
          const Icon = stat.icon
          return (
            <div key={stat.label} className="rounded-2xl border border-border bg-card p-4 hover:shadow-sm transition-all">
              <div className="flex items-center justify-between mb-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${stat.color}`}><Icon className="w-5 h-5" /></div>
                <span className="flex items-center gap-0.5 text-[10px] font-medium text-emerald-500"><ArrowUpRight className="w-3 h-3" />{stat.trend}</span>
              </div>
              <p className="text-2xl font-bold text-foreground">{stat.value}</p>
              <p className="text-[10px] text-muted-foreground mt-0.5">{stat.label}</p>
            </div>
          )
        })}
      </motion.div>

      {/* ====== OVERVIEW TAB ====== */}
      {activeTab === 'overview' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-5">
              <h4 className="text-sm font-semibold text-foreground mb-1 flex items-center gap-2"><PieChartIcon className="w-4 h-4 text-birla-cyan" />Conversion Funnel</h4>
              <p className="text-[10px] text-muted-foreground mb-3">Applied → Screened → Exam → Admitted → Enrolled</p>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={conversionFunnelData} cx="50%" cy="50%" innerRadius={55} outerRadius={90} paddingAngle={3} dataKey="value">
                      {conversionFunnelData.map((entry, idx) => <Cell key={idx} fill={entry.color} />)}
                    </Pie>
                    <Tooltip contentStyle={tooltipStyle} />
                    <Legend iconType="circle" wrapperStyle={{ fontSize: '10px' }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </motion.div>
            <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-5">
              <h4 className="text-sm font-semibold text-foreground mb-1 flex items-center gap-2"><BarChart3 className="w-4 h-4 text-birla-gold" />Application Trends</h4>
              <p className="text-[10px] text-muted-foreground mb-3">Monthly applications & admissions</p>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={applicationTrendsData}>
                    <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? 'rgba(255,255,255,0.06)' : '#f1f5f9'} />
                    <XAxis dataKey="month" tick={{ fontSize: 10, fill: darkMode ? '#94a3b8' : '#64748b' }} />
                    <YAxis tick={{ fontSize: 10, fill: darkMode ? '#94a3b8' : '#64748b' }} />
                    <Tooltip contentStyle={tooltipStyle} />
                    <Legend wrapperStyle={{ fontSize: '10px' }} />
                    <Bar dataKey="applications" fill="#22D3EE" radius={[4,4,0,0]} name="Applications" />
                    <Bar dataKey="admissions" fill="#C8A45C" radius={[4,4,0,0]} name="Admissions" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </motion.div>
          </div>
        </div>
      )}

      {/* ====== APPLICATIONS TAB ====== */}
      {activeTab === 'applications' && (
        <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-5">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-sm font-semibold text-foreground flex items-center gap-2"><Users className="w-4 h-4 text-birla-cyan" />Recent Applications</h4>
            <button onClick={() => { setActiveTab('forms'); setShowForm('admission') }} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg gradient-birla text-white text-xs font-medium"><Plus className="w-3.5 h-3.5" />New Application</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-muted/30">
                  <th className="text-left px-3 py-2.5 text-[10px] font-semibold text-muted-foreground">ID</th>
                  <th className="text-left px-3 py-2.5 text-[10px] font-semibold text-muted-foreground">Student</th>
                  <th className="text-left px-3 py-2.5 text-[10px] font-semibold text-muted-foreground">Class</th>
                  <th className="text-left px-3 py-2.5 text-[10px] font-semibold text-muted-foreground">BSP ID</th>
                  <th className="text-left px-3 py-2.5 text-[10px] font-semibold text-muted-foreground">PEN No</th>
                  <th className="text-left px-3 py-2.5 text-[10px] font-semibold text-muted-foreground">Uppar ID</th>
                  <th className="text-left px-3 py-2.5 text-[10px] font-semibold text-muted-foreground">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentApplications.map(a => (
                  <tr key={a.id} className="border-b border-border/50 hover:bg-muted/20">
                    <td className="px-3 py-2.5 text-xs text-foreground font-mono">{a.id}</td>
                    <td className="px-3 py-2.5 text-xs text-foreground">{a.name}</td>
                    <td className="px-3 py-2.5 text-xs text-foreground">{a.class}</td>
                    <td className="px-3 py-2.5 text-[10px] text-muted-foreground font-mono">{a.bspId}</td>
                    <td className="px-3 py-2.5 text-[10px] text-muted-foreground font-mono">{a.penNo}</td>
                    <td className="px-3 py-2.5 text-[10px] text-muted-foreground font-mono">{a.upparId}</td>
                    <td className="px-3 py-2.5">
                      <span className={`px-2 py-0.5 rounded-lg text-[10px] font-medium ${a.status === 'Admitted' ? 'bg-emerald-500/10 text-emerald-600' : a.status === 'Exam Cleared' ? 'bg-blue-500/10 text-blue-600' : a.status === 'Waitlisted' ? 'bg-amber-500/10 text-amber-600' : 'bg-cyan-500/10 text-cyan-600'}`}>{a.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      )}

      {/* ====== ENTRANCE EXAM TAB ====== */}
      {activeTab === 'entrance-exam' && (
        <motion.div variants={itemVariants} className="space-y-4">
          <div className="rounded-2xl border border-border bg-card p-5">
            <h4 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2"><GraduationCap className="w-4 h-4 text-birla-gold" />Entrance Exam Results</h4>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border bg-muted/30">
                    <th className="text-left px-3 py-2 text-[10px] font-semibold text-muted-foreground">Name</th>
                    <th className="text-left px-3 py-2 text-[10px] font-semibold text-muted-foreground">BSP ID</th>
                    <th className="text-left px-3 py-2 text-[10px] font-semibold text-muted-foreground">PEN No</th>
                    <th className="text-left px-3 py-2 text-[10px] font-semibold text-muted-foreground">Uppar ID</th>
                    <th className="text-left px-3 py-2 text-[10px] font-semibold text-muted-foreground">Written</th>
                    <th className="text-left px-3 py-2 text-[10px] font-semibold text-muted-foreground">Oral</th>
                    <th className="text-left px-3 py-2 text-[10px] font-semibold text-muted-foreground">Total</th>
                    <th className="text-left px-3 py-2 text-[10px] font-semibold text-muted-foreground">Result</th>
                  </tr>
                </thead>
                <tbody>
                  {entranceExamResults.map((s, i) => (
                    <tr key={i} className="border-b border-border/50 hover:bg-muted/20">
                      <td className="px-3 py-2 text-xs text-foreground">{s.name}</td>
                      <td className="px-3 py-2 text-[10px] text-muted-foreground font-mono">{s.bspId}</td>
                      <td className="px-3 py-2 text-[10px] text-muted-foreground font-mono">{s.penNo}</td>
                      <td className="px-3 py-2 text-[10px] text-muted-foreground font-mono">{s.upparId}</td>
                      <td className="px-3 py-2 text-xs text-foreground">{s.written}</td>
                      <td className="px-3 py-2 text-xs text-foreground">{s.oral}</td>
                      <td className="px-3 py-2 text-xs font-semibold text-foreground">{s.total}</td>
                      <td className="px-3 py-2"><span className={`px-2 py-0.5 rounded-lg text-[10px] font-medium ${s.result === 'Pass' ? 'bg-emerald-500/10 text-emerald-600' : 'bg-red-500/10 text-red-600'}`}>{s.result}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>
      )}

      {/* ====== COUNSELLING TAB ====== */}
      {activeTab === 'counselling' && (
        <motion.div variants={itemVariants} className="space-y-4">
          <div className="rounded-2xl border border-border bg-card p-5">
            <h4 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2"><MessageSquare className="w-4 h-4 text-purple-500" />Counselling Sessions</h4>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {counsellingSessions.map((c, i) => (
                <div key={i} className="p-3 rounded-xl border border-border bg-muted/20">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-foreground">{c.parent} ({c.child})</span>
                    <span className={`px-2 py-0.5 rounded-lg text-[10px] font-medium ${c.status === 'Completed' ? 'bg-emerald-500/10 text-emerald-600' : 'bg-amber-500/10 text-amber-600'}`}>{c.status}</span>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs text-muted-foreground">
                    <span>📱 {c.phone}</span>
                    <span>👤 {c.counsellor}</span>
                    <span>📅 {c.date} {c.time}</span>
                    <span>🔄 {c.mode}</span>
                  </div>
                  {c.notes && <p className="text-xs text-muted-foreground mt-2 italic">{c.notes}</p>}
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
            {forms.map(form => {
              const Icon = form.icon
              return (
                <button key={form.id} onClick={() => setShowForm(form.id)}
                  className={`flex flex-col items-center gap-2 p-4 rounded-2xl border border-border hover:border-birla-gold/30 hover:shadow-lg transition-all group ${showForm === form.id ? 'border-birla-gold/50 shadow-lg bg-birla-gold/5' : ''}`}>
                  <div className="w-10 h-10 rounded-xl bg-birla-blue/10 flex items-center justify-center group-hover:scale-110 transition-transform"><Icon className="w-5 h-5 text-birla-blue dark:text-birla-cyan" /></div>
                  <span className="text-[11px] text-muted-foreground group-hover:text-foreground text-center">{form.label}</span>
                </button>
              )
            })}
          </motion.div>

          {/* 1. Online Admission Application Form */}
          {showForm === 'admission' && (
            <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-6">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-sm font-semibold text-foreground flex items-center gap-2"><UserPlus className="w-4 h-4 text-birla-cyan" />Online Admission Application Form</h4>
                <button onClick={() => setShowForm(null)} className="p-1.5 rounded-lg hover:bg-muted text-muted-foreground"><X className="w-4 h-4" /></button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div><label className={labelClass}>Student Name *</label><input className={inputClass} placeholder="Full name" value={admissionForm.studentName} onChange={e => setAdmissionForm({...admissionForm, studentName: e.target.value})} /></div>
                <div><label className={labelClass}>Date of Birth *</label><input type="date" className={inputClass} value={admissionForm.dob} onChange={e => setAdmissionForm({...admissionForm, dob: e.target.value})} /></div>
                <div><label className={labelClass}>Gender *</label><select className={inputClass} value={admissionForm.gender} onChange={e => setAdmissionForm({...admissionForm, gender: e.target.value})}><option value="">Select</option><option>Male</option><option>Female</option><option>Other</option></select></div>
                <div><label className={labelClass}>Class Applied *</label><select className={inputClass} value={admissionForm.classApplied} onChange={e => setAdmissionForm({...admissionForm, classApplied: e.target.value})}><option value="">Select Class</option>{['I','II','III','IV','V','VI','VII','VIII','IX','X','XI','XII'].map(c => <option key={c}>{c}</option>)}</select></div>
                <div><label className={labelClass}>Previous GraduationCap</label><input className={inputClass} placeholder="Previous school name" value={admissionForm.previousSchool} onChange={e => setAdmissionForm({...admissionForm, previousSchool: e.target.value})} /></div>
                <div><label className={labelClass}>Father&apos;s Name *</label><input className={inputClass} placeholder="Father's full name" value={admissionForm.fatherName} onChange={e => setAdmissionForm({...admissionForm, fatherName: e.target.value})} /></div>
                <div><label className={labelClass}>Father&apos;s Phone *</label><input className={inputClass} placeholder="+91 XXXXX XXXXX" value={admissionForm.fatherPhone} onChange={e => setAdmissionForm({...admissionForm, fatherPhone: e.target.value})} /></div>
                <div><label className={labelClass}>Father&apos;s Email</label><input type="email" className={inputClass} placeholder="father@email.com" value={admissionForm.fatherEmail} onChange={e => setAdmissionForm({...admissionForm, fatherEmail: e.target.value})} /></div>
                <div><label className={labelClass}>Mother&apos;s Name *</label><input className={inputClass} placeholder="Mother's full name" value={admissionForm.motherName} onChange={e => setAdmissionForm({...admissionForm, motherName: e.target.value})} /></div>
                <div><label className={labelClass}>Mother&apos;s Phone</label><input className={inputClass} placeholder="+91 XXXXX XXXXX" value={admissionForm.motherPhone} onChange={e => setAdmissionForm({...admissionForm, motherPhone: e.target.value})} /></div>
                <div><label className={labelClass}>BSP ID (if existing)</label><input className={inputClass} placeholder="BSP/WB/2023/XXXXX" value={admissionForm.bspId} onChange={e => setAdmissionForm({...admissionForm, bspId: e.target.value})} /></div>
                <div><label className={labelClass}>PEN No (if existing)</label><input className={inputClass} placeholder="PEN-XXXX-XXXX" value={admissionForm.penNo} onChange={e => setAdmissionForm({...admissionForm, penNo: e.target.value})} /></div>
              </div>
              <div className="mt-4"><label className={labelClass}>Uppar ID (if existing)</label><input className={inputClass} placeholder="UPPR-WB-XXXXXX" value={admissionForm.upparId} onChange={e => setAdmissionForm({...admissionForm, upparId: e.target.value})} /></div>
              <div className="mt-4"><label className={labelClass}>Address *</label><textarea className={inputClass + ' resize-none'} rows={2} placeholder="Full residential address" value={admissionForm.address} onChange={e => setAdmissionForm({...admissionForm, address: e.target.value})} /></div>
              <div className="mt-4">
                <label className="block text-xs font-medium text-muted-foreground mb-2">Documents Checklist</label>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
                  {[
                    { key: 'birthCert', label: 'Birth Certificate' },
                    { key: 'aadhaar', label: 'Aadhaar Card' },
                    { key: 'tc', label: 'Transfer Certificate' },
                    { key: 'marksheet', label: 'Mark Sheet' },
                    { key: 'photos', label: 'Passport Photos' },
                  ].map(doc => (
                    <label key={doc.key} className="flex items-center gap-2 p-2 rounded-lg border border-border/50 cursor-pointer hover:bg-muted/20">
                      <input type="checkbox" checked={admissionForm[doc.key]} onChange={e => setAdmissionForm({...admissionForm, [doc.key]: e.target.checked})} className="w-3.5 h-3.5 rounded accent-[#C8A45C]" />
                      <span className="text-[11px] text-foreground">{doc.label}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div className="mt-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={admissionForm.declaration} onChange={e => setAdmissionForm({...admissionForm, declaration: e.target.checked})} className="w-4 h-4 rounded accent-[#C8A45C]" />
                  <span className="text-xs text-muted-foreground">I declare that all information provided is accurate and true</span>
                </label>
              </div>
              <div className="flex justify-end gap-3 mt-4">
                <button onClick={() => setShowForm(null)} className="px-4 py-2 rounded-xl border border-border text-sm text-muted-foreground hover:bg-muted/50">Cancel</button>
                <button onClick={() => handleSubmit('Admission Application')} className="px-4 py-2 rounded-xl gradient-birla text-white text-sm font-medium hover:shadow-lg transition-all">Submit Application</button>
              </div>
            </motion.div>
          )}

          {/* 2. Entrance Exam Creation Form */}
          {showForm === 'entrance' && (
            <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-6">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-sm font-semibold text-foreground flex items-center gap-2"><GraduationCap className="w-4 h-4 text-birla-gold" />Entrance Exam Creation Form</h4>
                <button onClick={() => setShowForm(null)} className="p-1.5 rounded-lg hover:bg-muted text-muted-foreground"><X className="w-4 h-4" /></button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div><label className={labelClass}>Exam Name *</label><input className={inputClass} placeholder="e.g., Entrance Exam 2026" value={entranceExamForm.examName} onChange={e => setEntranceExamForm({...entranceExamForm, examName: e.target.value})} /></div>
                <div><label className={labelClass}>Class *</label><select className={inputClass} value={entranceExamForm.class} onChange={e => setEntranceExamForm({...entranceExamForm, class: e.target.value})}><option value="">Select Class</option>{['VI','VII','VIII','IX','XI'].map(c => <option key={c}>{c}</option>)}</select></div>
                <div><label className={labelClass}>Subject *</label><input className={inputClass} placeholder="e.g., Mathematics, English" value={entranceExamForm.subject} onChange={e => setEntranceExamForm({...entranceExamForm, subject: e.target.value})} /></div>
                <div><label className={labelClass}>Exam Date *</label><input type="date" className={inputClass} value={entranceExamForm.examDate} onChange={e => setEntranceExamForm({...entranceExamForm, examDate: e.target.value})} /></div>
                <div><label className={labelClass}>Duration (mins) *</label><input type="number" className={inputClass} placeholder="120" value={entranceExamForm.duration} onChange={e => setEntranceExamForm({...entranceExamForm, duration: e.target.value})} /></div>
                <div><label className={labelClass}>Total Marks *</label><input type="number" className={inputClass} placeholder="100" value={entranceExamForm.totalMarks} onChange={e => setEntranceExamForm({...entranceExamForm, totalMarks: e.target.value})} /></div>
                <div><label className={labelClass}>Passing Marks *</label><input type="number" className={inputClass} placeholder="60" value={entranceExamForm.passingMarks} onChange={e => setEntranceExamForm({...entranceExamForm, passingMarks: e.target.value})} /></div>
                <div><label className={labelClass}>Exam Type *</label><select className={inputClass} value={entranceExamForm.examType} onChange={e => setEntranceExamForm({...entranceExamForm, examType: e.target.value})}><option value="Written">Written</option><option value="Oral">Oral</option><option value="Both">Both</option></select></div>
                <div><label className={labelClass}>Venue *</label><input className={inputClass} placeholder="e.g., Main Campus - Hall A" value={entranceExamForm.venue} onChange={e => setEntranceExamForm({...entranceExamForm, venue: e.target.value})} /></div>
              </div>
              <div className="mt-4"><label className={labelClass}>Instructions</label><textarea className={inputClass + ' resize-none'} rows={3} placeholder="Exam instructions for students..." value={entranceExamForm.instructions} onChange={e => setEntranceExamForm({...entranceExamForm, instructions: e.target.value})} /></div>
              <div className="flex justify-end gap-3 mt-4">
                <button onClick={() => setShowForm(null)} className="px-4 py-2 rounded-xl border border-border text-sm text-muted-foreground hover:bg-muted/50">Cancel</button>
                <button onClick={() => handleSubmit('Entrance Exam Created')} className="px-4 py-2 rounded-xl gradient-birla text-white text-sm font-medium hover:shadow-lg transition-all">Create Exam</button>
              </div>
            </motion.div>
          )}

          {/* 3. Entrance Exam Score Entry Form */}
          {showForm === 'scoreEntry' && (
            <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-6">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-sm font-semibold text-foreground flex items-center gap-2"><FileCheck className="w-4 h-4 text-emerald-500" />Entrance Exam Score Entry Form</h4>
                <button onClick={() => setShowForm(null)} className="p-1.5 rounded-lg hover:bg-muted text-muted-foreground"><X className="w-4 h-4" /></button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div><label className={labelClass}>Exam Name *</label><select className={inputClass} value={scoreEntryForm.examName} onChange={e => setScoreEntryForm({...scoreEntryForm, examName: e.target.value})}><option value="">Select Exam</option><option>Entrance Exam 2026 - VI</option><option>Entrance Exam 2026 - IX</option><option>Entrance Exam 2026 - XI</option></select></div>
                <div className="md:col-span-2">
                  <QRStudentLookup
                    onStudentSelect={(student) => {
                      setSelectedQRStudent(student)
                      if (student) {
                        setScoreEntryForm({...scoreEntryForm, studentName: student.name})
                      }
                    }}
                    label="Student Identification (QR / ID)"
                    placeholder="Scan QR or search student for score entry"
                  />
                </div>
                <div><label className={labelClass}>Written Marks *</label><input type="number" className={inputClass} placeholder="0-80" value={scoreEntryForm.writtenMarks} onChange={e => setScoreEntryForm({...scoreEntryForm, writtenMarks: e.target.value})} /></div>
                <div><label className={labelClass}>Oral Marks</label><input type="number" className={inputClass} placeholder="0-20" value={scoreEntryForm.oralMarks} onChange={e => setScoreEntryForm({...scoreEntryForm, oralMarks: e.target.value})} /></div>
                <div><label className={labelClass}>Total Marks (Auto)</label><input type="number" className={inputClass} readOnly value={(Number(scoreEntryForm.writtenMarks) || 0) + (Number(scoreEntryForm.oralMarks) || 0)} /></div>
                <div><label className={labelClass}>Result *</label><select className={inputClass} value={scoreEntryForm.result} onChange={e => setScoreEntryForm({...scoreEntryForm, result: e.target.value})}><option value="Pass">Pass</option><option value="Fail">Fail</option></select></div>
              </div>
              <div className="flex justify-end gap-3 mt-4">
                <button onClick={() => setShowForm(null)} className="px-4 py-2 rounded-xl border border-border text-sm text-muted-foreground hover:bg-muted/50">Cancel</button>
                <button onClick={() => handleSubmit('Exam Score Entry')} className="px-4 py-2 rounded-xl gradient-birla text-white text-sm font-medium hover:shadow-lg transition-all">Save Score</button>
              </div>
            </motion.div>
          )}

          {/* 4. Counselling Session Form */}
          {showForm === 'counselling' && (
            <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-6">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-sm font-semibold text-foreground flex items-center gap-2"><MessageSquare className="w-4 h-4 text-purple-500" />Counselling Session Form</h4>
                <button onClick={() => setShowForm(null)} className="p-1.5 rounded-lg hover:bg-muted text-muted-foreground"><X className="w-4 h-4" /></button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div><label className={labelClass}>Parent Name *</label><input className={inputClass} placeholder="Parent's full name" value={counsellingForm.parentName} onChange={e => setCounsellingForm({...counsellingForm, parentName: e.target.value})} /></div>
                <div className="md:col-span-2">
                  <QRStudentLookup
                    onStudentSelect={(student) => {
                      if (student) {
                        setCounsellingForm({...counsellingForm, childName: student.name})
                      }
                    }}
                    label="Child Name (QR / ID Lookup)"
                    placeholder="Scan QR or search student"
                  />
                </div>
                <div><label className={labelClass}>Phone *</label><input className={inputClass} placeholder="+91 XXXXX XXXXX" value={counsellingForm.phone} onChange={e => setCounsellingForm({...counsellingForm, phone: e.target.value})} /></div>
                <div><label className={labelClass}>Counsellor *</label><select className={inputClass} value={counsellingForm.counsellor} onChange={e => setCounsellingForm({...counsellingForm, counsellor: e.target.value})}><option value="">Select</option><option>Dr. Sunita Rao</option><option>Mr. Rakesh Pandey</option><option>Mrs. Kavitha Sharma</option><option>Dr. Vikram Gupta</option></select></div>
                <div><label className={labelClass}>Date *</label><input type="date" className={inputClass} value={counsellingForm.date} onChange={e => setCounsellingForm({...counsellingForm, date: e.target.value})} /></div>
                <div><label className={labelClass}>Time *</label><input type="time" className={inputClass} value={counsellingForm.time} onChange={e => setCounsellingForm({...counsellingForm, time: e.target.value})} /></div>
                <div><label className={labelClass}>Mode *</label><select className={inputClass} value={counsellingForm.mode} onChange={e => setCounsellingForm({...counsellingForm, mode: e.target.value})}><option value="In-Person">In-Person</option><option value="Online">Online</option></select></div>
                <div><label className={labelClass}>Status</label><select className={inputClass} value={counsellingForm.status} onChange={e => setCounsellingForm({...counsellingForm, status: e.target.value})}><option value="Scheduled">Scheduled</option><option value="Completed">Completed</option><option value="Cancelled">Cancelled</option></select></div>
              </div>
              <div className="mt-4"><label className={labelClass}>Notes</label><textarea className={inputClass + ' resize-none'} rows={3} placeholder="Session notes..." value={counsellingForm.notes} onChange={e => setCounsellingForm({...counsellingForm, notes: e.target.value})} /></div>
              <div className="flex justify-end gap-3 mt-4">
                <button onClick={() => setShowForm(null)} className="px-4 py-2 rounded-xl border border-border text-sm text-muted-foreground hover:bg-muted/50">Cancel</button>
                <button onClick={() => handleSubmit('Counselling Session')} className="px-4 py-2 rounded-xl gradient-birla text-white text-sm font-medium hover:shadow-lg transition-all">Save Session</button>
              </div>
            </motion.div>
          )}

          {/* 5. Document Verification Form */}
          {showForm === 'docVerify' && (
            <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-6">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-sm font-semibold text-foreground flex items-center gap-2"><BadgeCheck className="w-4 h-4 text-emerald-500" />Document Verification Form</h4>
                <button onClick={() => setShowForm(null)} className="p-1.5 rounded-lg hover:bg-muted text-muted-foreground"><X className="w-4 h-4" /></button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="md:col-span-2">
                  <QRStudentLookup
                    onStudentSelect={(student) => {
                      if (student) setDocVerifyForm({...docVerifyForm, studentName: student.name})
                    }}
                    label="Student Identification (QR / ID)"
                    placeholder="Scan QR or search student for document verification"
                  />
                </div>
                <div><label className={labelClass}>Document Type *</label><select className={inputClass} value={docVerifyForm.documentType} onChange={e => setDocVerifyForm({...docVerifyForm, documentType: e.target.value})}><option value="">Select</option><option>Birth Certificate</option><option>Aadhaar Card</option><option>Transfer Certificate</option><option>Mark Sheet</option><option>Passport Photo</option></select></div>
                <div><label className={labelClass}>Verified By *</label><input className={inputClass} placeholder="Verifier name" value={docVerifyForm.verifiedBy} onChange={e => setDocVerifyForm({...docVerifyForm, verifiedBy: e.target.value})} /></div>
                <div><label className={labelClass}>Verification Date *</label><input type="date" className={inputClass} value={docVerifyForm.verificationDate} onChange={e => setDocVerifyForm({...docVerifyForm, verificationDate: e.target.value})} /></div>
                <div><label className={labelClass}>Status *</label><select className={inputClass} value={docVerifyForm.status} onChange={e => setDocVerifyForm({...docVerifyForm, status: e.target.value})}><option value="Verified">Verified</option><option value="Pending">Pending</option><option value="Rejected">Rejected</option></select></div>
              </div>
              <div className="mt-4"><label className={labelClass}>Remarks</label><textarea className={inputClass + ' resize-none'} rows={2} placeholder="Verification remarks..." value={docVerifyForm.remarks} onChange={e => setDocVerifyForm({...docVerifyForm, remarks: e.target.value})} /></div>
              <div className="flex justify-end gap-3 mt-4">
                <button onClick={() => setShowForm(null)} className="px-4 py-2 rounded-xl border border-border text-sm text-muted-foreground hover:bg-muted/50">Cancel</button>
                <button onClick={() => handleSubmit('Document Verification')} className="px-4 py-2 rounded-xl gradient-birla text-white text-sm font-medium hover:shadow-lg transition-all">Save Verification</button>
              </div>
            </motion.div>
          )}

          {/* 6. Admission Confirmation Form */}
          {showForm === 'confirm' && (
            <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-6">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-sm font-semibold text-foreground flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-birla-gold" />Admission Confirmation Form</h4>
                <button onClick={() => setShowForm(null)} className="p-1.5 rounded-lg hover:bg-muted text-muted-foreground"><X className="w-4 h-4" /></button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="md:col-span-2">
                  <QRStudentLookup
                    onStudentSelect={(student) => {
                      if (student) setConfirmForm({...confirmForm, studentName: student.name, bspId: student.bspId || confirmForm.bspId, penNo: student.penNo || confirmForm.penNo, upparId: student.upparId || confirmForm.upparId})
                    }}
                    label="Student Identification (QR / ID)"
                    placeholder="Scan QR or search student for admission confirmation"
                  />
                </div>
                <div><label className={labelClass}>Class *</label><select className={inputClass} value={confirmForm.class} onChange={e => setConfirmForm({...confirmForm, class: e.target.value})}><option value="">Select</option>{['I','II','III','IV','V','VI','VII','VIII','IX','X','XI','XII'].map(c => <option key={c}>{c}</option>)}</select></div>
                <div><label className={labelClass}>Section *</label><select className={inputClass} value={confirmForm.section} onChange={e => setConfirmForm({...confirmForm, section: e.target.value})}><option value="">Select</option><option>A</option><option>B</option><option>C</option></select></div>
                <div><label className={labelClass}>Admission Number *</label><input className={inputClass} placeholder="e.g., ADM-2026-001" value={confirmForm.admissionNumber} onChange={e => setConfirmForm({...confirmForm, admissionNumber: e.target.value})} /></div>
                <div><label className={labelClass}>BSP ID *</label><input className={inputClass} placeholder="BSP/WB/2023/XXXXX" value={confirmForm.bspId} onChange={e => setConfirmForm({...confirmForm, bspId: e.target.value})} /></div>
                <div><label className={labelClass}>PEN No *</label><input className={inputClass} placeholder="PEN-XXXX-XXXX" value={confirmForm.penNo} onChange={e => setConfirmForm({...confirmForm, penNo: e.target.value})} /></div>
                <div><label className={labelClass}>Uppar ID *</label><input className={inputClass} placeholder="UPPR-WB-XXXXXX" value={confirmForm.upparId} onChange={e => setConfirmForm({...confirmForm, upparId: e.target.value})} /></div>
              </div>
              <div className="mt-4 flex flex-col gap-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={confirmForm.feePaid} onChange={e => setConfirmForm({...confirmForm, feePaid: e.target.checked})} className="w-4 h-4 rounded accent-[#C8A45C]" />
                  <span className="text-xs text-muted-foreground">Admission fee has been paid</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={confirmForm.seatConfirmed} onChange={e => setConfirmForm({...confirmForm, seatConfirmed: e.target.checked})} className="w-4 h-4 rounded accent-[#C8A45C]" />
                  <span className="text-xs text-muted-foreground">Seat has been confirmed</span>
                </label>
              </div>
              <div className="flex justify-end gap-3 mt-4">
                <button onClick={() => setShowForm(null)} className="px-4 py-2 rounded-xl border border-border text-sm text-muted-foreground hover:bg-muted/50">Cancel</button>
                <button onClick={() => handleSubmit('Admission Confirmation')} className="px-4 py-2 rounded-xl gradient-birla text-white text-sm font-medium hover:shadow-lg transition-all">Confirm Admission</button>
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
          {/* 1. Admission Funnel Report */}
          <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-5">
            <h4 className="text-sm font-semibold text-foreground mb-1 flex items-center gap-2"><PieChartIcon className="w-4 h-4 text-birla-cyan" />Admission Funnel Report</h4>
            <p className="text-[10px] text-muted-foreground mb-3">Stage-wise count of applicants</p>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={conversionFunnelData} cx="50%" cy="50%" innerRadius={55} outerRadius={90} paddingAngle={3} dataKey="value">
                    {conversionFunnelData.map((entry, idx) => <Cell key={idx} fill={entry.color} />)}
                  </Pie>
                  <Tooltip contentStyle={tooltipStyle} />
                  <Legend iconType="circle" wrapperStyle={{ fontSize: '10px' }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* 2. Application Status Report */}
          <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-5">
            <h4 className="text-sm font-semibold text-foreground mb-1 flex items-center gap-2"><BarChart3 className="w-4 h-4 text-birla-gold" />Application Status Report</h4>
            <p className="text-[10px] text-muted-foreground mb-3">Class-wise applications vs admissions</p>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={classWiseApplications}>
                  <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? 'rgba(255,255,255,0.06)' : '#f1f5f9'} />
                  <XAxis dataKey="class" tick={{ fontSize: 9, fill: darkMode ? '#94a3b8' : '#64748b' }} />
                  <YAxis tick={{ fontSize: 10, fill: darkMode ? '#94a3b8' : '#64748b' }} />
                  <Tooltip contentStyle={tooltipStyle} />
                  <Legend wrapperStyle={{ fontSize: '10px' }} />
                  <Bar dataKey="applied" fill="#22D3EE" radius={[3,3,0,0]} name="Applied" />
                  <Bar dataKey="admitted" fill="#C8A45C" radius={[3,3,0,0]} name="Admitted" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* 3. Entrance Exam Results Report */}
          <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-5">
            <h4 className="text-sm font-semibold text-foreground mb-1 flex items-center gap-2"><GraduationCap className="w-4 h-4 text-purple-500" />Entrance Exam Results Report</h4>
            <p className="text-[10px] text-muted-foreground mb-3">Student scores comparison</p>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={entranceExamResults} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? 'rgba(255,255,255,0.06)' : '#f1f5f9'} />
                  <XAxis type="number" tick={{ fontSize: 10, fill: darkMode ? '#94a3b8' : '#64748b' }} />
                  <YAxis dataKey="name" type="category" tick={{ fontSize: 9, fill: darkMode ? '#94a3b8' : '#64748b' }} width={80} />
                  <Tooltip contentStyle={tooltipStyle} />
                  <Legend wrapperStyle={{ fontSize: '10px' }} />
                  <Bar dataKey="written" fill="#22D3EE" name="Written" stackId="a" />
                  <Bar dataKey="oral" fill="#C8A45C" name="Oral" stackId="a" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* 4. Conversion Rate Report */}
          <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-5">
            <h4 className="text-sm font-semibold text-foreground mb-1 flex items-center gap-2"><TrendingUp className="w-4 h-4 text-emerald-500" />Conversion Rate Report</h4>
            <p className="text-[10px] text-muted-foreground mb-3">Monthly conversions</p>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={applicationTrendsData}>
                  <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? 'rgba(255,255,255,0.06)' : '#f1f5f9'} />
                  <XAxis dataKey="month" tick={{ fontSize: 10, fill: darkMode ? '#94a3b8' : '#64748b' }} />
                  <YAxis tick={{ fontSize: 10, fill: darkMode ? '#94a3b8' : '#64748b' }} />
                  <Tooltip contentStyle={tooltipStyle} />
                  <Legend wrapperStyle={{ fontSize: '10px' }} />
                  <Line type="monotone" dataKey="applications" stroke="#22D3EE" strokeWidth={2} name="Applications" dot={{ r: 3 }} />
                  <Line type="monotone" dataKey="admissions" stroke="#C8A45C" strokeWidth={2} name="Admissions" dot={{ r: 3 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* 5. Document Verification Report */}
            <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-5">
              <h4 className="text-sm font-semibold text-foreground mb-1 flex items-center gap-2"><BadgeCheck className="w-4 h-4 text-emerald-500" />Document Verification Report</h4>
              <p className="text-[10px] text-muted-foreground mb-3">Compliance status</p>
              <div className="h-52">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={documentComplianceData}>
                    <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? 'rgba(255,255,255,0.06)' : '#f1f5f9'} />
                    <XAxis dataKey="name" tick={{ fontSize: 10, fill: darkMode ? '#94a3b8' : '#64748b' }} />
                    <YAxis tick={{ fontSize: 10, fill: darkMode ? '#94a3b8' : '#64748b' }} />
                    <Tooltip contentStyle={tooltipStyle} />
                    <Bar dataKey="value" radius={[4,4,0,0]}>
                      {documentComplianceData.map((entry, idx) => <Cell key={idx} fill={entry.color} />)}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </motion.div>

            {/* 6. Seat Availability Report */}
            <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-5">
              <h4 className="text-sm font-semibold text-foreground mb-1 flex items-center gap-2"><Building2 className="w-4 h-4 text-birla-cyan" />Seat Availability Report</h4>
              <p className="text-[10px] text-muted-foreground mb-3">Class-wise capacity/filled/available</p>
              <div className="h-52">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={seatMatrixData}>
                    <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? 'rgba(255,255,255,0.06)' : '#f1f5f9'} />
                    <XAxis dataKey="class" tick={{ fontSize: 9, fill: darkMode ? '#94a3b8' : '#64748b' }} />
                    <YAxis tick={{ fontSize: 10, fill: darkMode ? '#94a3b8' : '#64748b' }} />
                    <Tooltip contentStyle={tooltipStyle} />
                    <Legend wrapperStyle={{ fontSize: '10px' }} />
                    <Bar dataKey="filled" fill="#C8A45C" name="Filled" stackId="a" />
                    <Bar dataKey="available" fill="#22D3EE" name="Available" stackId="a" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </motion.div>
          </div>

          {/* 7. BSP/PEN/Uppar ID Assignment Report */}
          <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-5">
            <h4 className="text-sm font-semibold text-foreground mb-1 flex items-center gap-2"><Shield className="w-4 h-4 text-birla-blue dark:text-birla-cyan" />BSP/PEN/Uppar ID Assignment Report</h4>
            <p className="text-[10px] text-muted-foreground mb-3">Class-wise UDISE+ compliance</p>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border bg-muted/30">
                    <th className="text-left px-3 py-2 text-[10px] font-semibold text-muted-foreground">Class</th>
                    <th className="text-left px-3 py-2 text-[10px] font-semibold text-muted-foreground">Total</th>
                    <th className="text-left px-3 py-2 text-[10px] font-semibold text-muted-foreground">BSP Assigned</th>
                    <th className="text-left px-3 py-2 text-[10px] font-semibold text-muted-foreground">PEN Assigned</th>
                    <th className="text-left px-3 py-2 text-[10px] font-semibold text-muted-foreground">Uppar Assigned</th>
                    <th className="text-left px-3 py-2 text-[10px] font-semibold text-muted-foreground">Compliance %</th>
                  </tr>
                </thead>
                <tbody>
                  {bspPenCompliance.map((c, i) => (
                    <tr key={i} className="border-b border-border/50 hover:bg-muted/20">
                      <td className="px-3 py-2 text-xs text-foreground font-medium">{c.class}</td>
                      <td className="px-3 py-2 text-xs text-foreground">{c.total}</td>
                      <td className="px-3 py-2 text-xs text-foreground">{c.bspAssigned}</td>
                      <td className="px-3 py-2 text-xs text-foreground">{c.penAssigned}</td>
                      <td className="px-3 py-2 text-xs text-foreground">{c.upparAssigned}</td>
                      <td className="px-3 py-2">
                        <span className={`px-2 py-0.5 rounded-lg text-[10px] font-medium ${(c.upparAssigned / c.total * 100) >= 95 ? 'bg-emerald-500/10 text-emerald-600' : (c.upparAssigned / c.total * 100) >= 85 ? 'bg-amber-500/10 text-amber-600' : 'bg-red-500/10 text-red-600'}`}>
                          {Math.round(c.upparAssigned / c.total * 100)}%
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="h-48 mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={bspPenCompliance}>
                  <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? 'rgba(255,255,255,0.06)' : '#f1f5f9'} />
                  <XAxis dataKey="class" tick={{ fontSize: 9, fill: darkMode ? '#94a3b8' : '#64748b' }} />
                  <YAxis tick={{ fontSize: 10, fill: darkMode ? '#94a3b8' : '#64748b' }} />
                  <Tooltip contentStyle={tooltipStyle} />
                  <Legend wrapperStyle={{ fontSize: '10px' }} />
                  <Bar dataKey="bspAssigned" fill="#1A2D4A" name="BSP" radius={[2,2,0,0]} />
                  <Bar dataKey="penAssigned" fill="#22D3EE" name="PEN" radius={[2,2,0,0]} />
                  <Bar dataKey="upparAssigned" fill="#C8A45C" name="Uppar" radius={[2,2,0,0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </div>
      )}
    </motion.div>
  )
}
