'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  CreditCard, Users, QrCode, Plus, Download, ArrowUpRight,
  TrendingUp, BarChart3, FileText, Calendar, CheckCircle2,
  AlertTriangle, X, Save, RotateCcw, ClipboardList, Printer,
  ScanLine, Shield, IdCard, UserCheck, Camera, Clock, Eye,
  PieChart as PieChartIcon, Scan, MapPin, BadgeCheck, LayoutGrid,
  UserCircle, Hash, AlertCircle, Building2
} from 'lucide-react'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Legend, PieChart, Pie, Cell, AreaChart,
  Area, LineChart, Line
} from 'recharts'
import useAppStore from '@/store/useAppStore'

// ─── Mock Data ────────────────────────────────────────────────────
const topStats = [
  { label: 'ID Cards Issued', value: '1,180', change: 'This year', icon: CreditCard, gradient: 'from-blue-900 to-blue-700', glow: 'shadow-blue-800/20' },
  { label: 'QR Scans Today', value: '342', change: 'Gate entries', icon: QrCode, gradient: 'from-emerald-900 to-emerald-600', glow: 'shadow-emerald-800/20' },
  { label: 'Visitor Passes', value: '28', change: 'Active', icon: UserCheck, gradient: 'from-amber-900 to-amber-600', glow: 'shadow-amber-800/20' },
  { label: 'Reissue Requests', value: '12', change: 'Pending', icon: AlertCircle, gradient: 'from-red-900 to-red-600', glow: 'shadow-red-800/20' },
]

const idCardIssuance = [
  { cardType: 'Student', issued: 980, active: 950, expired: 30 },
  { cardType: 'Teacher', issued: 85, active: 82, expired: 3 },
  { cardType: 'Staff', issued: 65, active: 63, expired: 2 },
  { cardType: 'Visitor', issued: 120, active: 28, expired: 92 },
  { cardType: 'Parent', issued: 50, active: 45, expired: 5 },
]

const idCardPie = [
  { name: 'Student', value: 980, color: '#0A1628' },
  { name: 'Teacher', value: 85, color: '#22D3EE' },
  { name: 'Staff', value: 65, color: '#C8A45C' },
  { name: 'Visitor', value: 120, color: '#8B5CF6' },
  { name: 'Parent', value: 50, color: '#10B981' },
]

const qrScanActivity = [
  { day: 'Mon', gate1: 85, gate2: 72, gate3: 45, library: 30 },
  { day: 'Tue', gate1: 92, gate2: 78, gate3: 50, library: 35 },
  { day: 'Wed', gate1: 88, gate2: 75, gate3: 48, library: 28 },
  { day: 'Thu', gate1: 95, gate2: 82, gate3: 55, library: 32 },
  { day: 'Fri', gate1: 90, gate2: 80, gate3: 52, library: 38 },
  { day: 'Sat', gate1: 60, gate2: 45, gate3: 25, library: 15 },
  { day: 'Sun', gate1: 10, gate2: 8, gate3: 5, library: 3 },
]

const reissueData = [
  { reason: 'Lost', count: 45, color: '#EF4444' },
  { reason: 'Damaged', count: 32, color: '#F59E0B' },
  { reason: 'Name Change', count: 8, color: '#22D3EE' },
  { reason: 'Class Change', count: 15, color: '#8B5CF6' },
  { reason: 'Expired', count: 22, color: '#C8A45C' },
]

const visitorPassData = [
  { day: 'Mon', visitors: 12 },
  { day: 'Tue', visitors: 15 },
  { day: 'Wed', visitors: 10 },
  { day: 'Thu', visitors: 18 },
  { day: 'Fri', visitors: 14 },
  { day: 'Sat', visitors: 5 },
  { day: 'Sun', visitors: 2 },
]

const smartCampusAccess = [
  { gate: 'Main Gate', entry: 342, exit: 335, peak: '8:00-9:00 AM' },
  { gate: 'Gate 2 (Primary)', entry: 185, exit: 180, peak: '8:15-8:45 AM' },
  { gate: 'Gate 3 (Sports)', entry: 45, exit: 42, peak: '3:00-4:00 PM' },
  { gate: 'Library', entry: 78, exit: 75, peak: '9:00-10:00 AM' },
]

const studentIdCompliance = [
  { class: 'I', total: 110, bspId: 108, penNo: 105, upparId: 102, idCard: 107, compliance: 93 },
  { class: 'II', total: 105, bspId: 103, penNo: 100, upparId: 98, idCard: 102, compliance: 95 },
  { class: 'III', total: 100, bspId: 98, penNo: 96, upparId: 94, idCard: 97, compliance: 94 },
  { class: 'IV', total: 98, bspId: 96, penNo: 94, upparId: 90, idCard: 95, compliance: 92 },
  { class: 'V', total: 102, bspId: 100, penNo: 98, upparId: 96, idCard: 99, compliance: 95 },
  { class: 'VI', total: 95, bspId: 93, penNo: 90, upparId: 88, idCard: 92, compliance: 93 },
  { class: 'VII', total: 90, bspId: 88, penNo: 85, upparId: 82, idCard: 87, compliance: 91 },
  { class: 'VIII', total: 92, bspId: 90, penNo: 88, upparId: 85, idCard: 89, compliance: 92 },
  { class: 'IX', total: 88, bspId: 86, penNo: 84, upparId: 82, idCard: 85, compliance: 94 },
  { class: 'X', total: 85, bspId: 84, penNo: 83, upparId: 81, idCard: 83, compliance: 96 },
]

const bulkPreviewStudents = [
  { name: 'Aarav Kumar', bspId: 'BSP/WB/2023/00125', penNo: 'PEN-2301-0456', upparId: 'UPPR-WB-102345', class: 'X-A', status: 'Ready' },
  { name: 'Karan Singh', bspId: 'BSP/WB/2023/00201', penNo: 'PEN-2301-0532', upparId: 'UPPR-WB-103456', class: 'X-A', status: 'Ready' },
  { name: 'Vikram Rao', bspId: 'BSP/WB/2023/00178', penNo: 'PEN-2301-0509', upparId: 'UPPR-WB-102890', class: 'X-A', status: 'Ready' },
  { name: 'Sneha Das', bspId: 'BSP/WB/2023/00034', penNo: 'PEN-2301-0365', upparId: 'UPPR-WB-100987', class: 'X-B', status: 'Photo Missing' },
  { name: 'Riya Mehta', bspId: 'BSP/WB/2023/00067', penNo: 'PEN-2301-0398', upparId: 'UPPR-WB-101567', class: 'X-B', status: 'Ready' },
]

const cardTypes = ['Student', 'Teacher', 'Staff', 'Visitor', 'Parent']
const templateOptions = ['Standard Blue', 'Gold Premium', 'Smart QR', 'Eco Green', 'Minimalist']
const houses = ['Ashoka', 'Tagore', 'Raman', 'Nehru']
const transportRoutes = ['Route 1 - Singur', 'Route 2 - Chandannagar', 'Route 3 - Serampore', 'Route 4 - Bandel', 'Route 5 - Chinsurah']
const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']
const idProofTypes = ['Aadhaar', 'Voter ID', 'PAN', 'Passport', 'Driving License']
const reissueReasons = ['Lost', 'Damaged', 'Name Change', 'Class Change', 'Expired']
const urgencyOptions = ['Normal', 'Urgent']
const qrPurposes = ['Attendance', 'Library', 'Transport', 'Gate Entry', 'Exam']
const classes = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI-Sci', 'XI-Comm', 'XII-Sci', 'XII-Comm']
const sections = ['A', 'B', 'C']

// ─── Animation Variants ──────────────────────────────────────────
const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.06 } },
}
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
}

export default function IDCardsModule() {
  const { darkMode } = useAppStore()
  const [activeTab, setActiveTab] = useState('overview')
  const [activeForm, setActiveForm] = useState('individualId')
  const [activeReport, setActiveReport] = useState('idIssuance')

  // ─── Form States ────────────────────────────────────────
  const [individualIdData, setIndividualIdData] = useState({
    student: '', bspId: '', penNo: '', upparId: '', cardType: 'Student', templateSelect: 'Standard Blue', houseSelect: '', transportRoute: '', validFrom: '', validTo: '', bloodGroup: '', emergencyContact1: '', emergencyContact2: '', medicalNotes: ''
  })
  const [bulkIdData, setBulkIdData] = useState({
    class: '', section: '', cardType: 'Student', template: 'Standard Blue'
  })
  const [visitorPassData2, setVisitorPassData2] = useState({
    visitorName: '', purpose: '', hostStudent: '', hostStaff: '', visitDate: '', inTime: '', expectedOutTime: '', idProofType: 'Aadhaar', idProofNumber: '', photo: false, temporaryQR: false
  })
  const [reissueData2, setReissueData2] = useState({
    originalCardId: '', student: '', bspId: '', penNo: '', upparId: '', reissueReason: 'Lost', newPhoto: false, urgency: 'Normal', paymentAmount: ''
  })
  const [pickupAuthData, setPickupAuthData] = useState({
    student: '', bspId: '', penNo: '', upparId: '', authorizedPersonName: '', relationship: '', phone: '', photoID: '', validFrom: '', validTo: '', alternateContact: ''
  })
  const [qrGenData, setQrGenData] = useState({
    student: '', bspId: '', penNo: '', upparId: '', purpose: 'Attendance', validFrom: '', validTo: '', singleUse: false
  })

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'designer', label: 'Card Designer', icon: IdCard },
    { id: 'bulk', label: 'Bulk Generate', icon: LayoutGrid },
    { id: 'print', label: 'Print', icon: Printer },
    { id: 'qrscan', label: 'QR Scan', icon: ScanLine },
    { id: 'smartcampus', label: 'Smart Campus', icon: Shield },
    { id: 'forms', label: 'Forms', icon: ClipboardList },
    { id: 'reports', label: 'Reports', icon: TrendingUp },
  ]

  const formOptions = [
    { key: 'individualId', label: 'Individual ID Card', icon: CreditCard },
    { key: 'bulkId', label: 'Bulk ID Generation', icon: LayoutGrid },
    { key: 'visitorPass', label: 'Visitor Pass', icon: UserCheck },
    { key: 'reissue', label: 'Card Reissue', icon: AlertCircle },
    { key: 'pickupAuth', label: 'Parent Pickup Auth', icon: UserCircle },
    { key: 'qrGeneration', label: 'QR Code Generation', icon: QrCode },
  ]

  const reportOptions = [
    { key: 'idIssuance', label: 'ID Card Issuance', icon: CreditCard },
    { key: 'qrScanActivity', label: 'QR Scan Activity', icon: ScanLine },
    { key: 'reissueReport', label: 'Reissue Request', icon: AlertCircle },
    { key: 'visitorPassReport', label: 'Visitor Pass', icon: UserCheck },
    { key: 'smartCampusAccess', label: 'Smart Campus Access', icon: Shield },
    { key: 'compliance', label: 'Student ID Compliance', icon: BadgeCheck },
  ]

  const tooltipStyle = {
    backgroundColor: darkMode ? '#1A2D4A' : '#fff',
    border: '1px solid ' + (darkMode ? 'rgba(255,255,255,0.1)' : '#e2e8f0'),
    borderRadius: '12px',
    fontSize: '12px',
    color: darkMode ? '#e2e8f0' : '#1e293b',
  }

  const inputClass = 'w-full px-3 py-2 rounded-lg border border-input bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-birla-gold/40 focus:border-birla-gold transition-all'
  const labelClass = 'text-xs font-medium text-muted-foreground mb-1 block'
  const formGroupClass = 'space-y-1'

  const handleFormSubmit = (formName, data) => {
    alert(`${formName} submitted successfully!\n${JSON.stringify(data, null, 2)}`)
  }

  const renderUdiseFields = (data, setData) => (
    <>
      <div className={formGroupClass}>
        <label className={labelClass}>BSP ID (UDISE+)</label>
        <input type="text" placeholder="BSP/WB/2023/XXXXX" value={data.bspId}
          onChange={(e) => setData({ ...data, bspId: e.target.value })} className={inputClass} />
      </div>
      <div className={formGroupClass}>
        <label className={labelClass}>PEN No</label>
        <input type="text" placeholder="PEN-XXXX-XXXX" value={data.penNo}
          onChange={(e) => setData({ ...data, penNo: e.target.value })} className={inputClass} />
      </div>
      <div className={formGroupClass}>
        <label className={labelClass}>Uppar ID</label>
        <input type="text" placeholder="UPPR-WB-XXXXXX" value={data.upparId}
          onChange={(e) => setData({ ...data, upparId: e.target.value })} className={inputClass} />
      </div>
    </>
  )

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="show" className="p-4 lg:p-6 space-y-6 max-w-[1600px] mx-auto">
      {/* Tab Navigation */}
      <motion.div variants={itemVariants} className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
        {tabs.map((tab) => {
          const Icon = tab.icon
          return (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                activeTab === tab.id ? 'gradient-birla text-white shadow-md' : 'border border-border text-muted-foreground hover:bg-muted hover:text-foreground'
              }`}>
              <Icon className="w-3.5 h-3.5" />{tab.label}
            </button>
          )
        })}
      </motion.div>

      {/* ═══════════════ OVERVIEW TAB ═══════════════ */}
      {activeTab === 'overview' && (
        <motion.div variants={itemVariants} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {topStats.map((card) => {
              const Icon = card.icon
              return (
                <motion.div key={card.label} variants={itemVariants}
                  className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${card.gradient} p-5 text-white shadow-xl ${card.glow}`}>
                  <div className="absolute top-0 right-0 w-24 h-24 rounded-full bg-white/5 -translate-y-6 translate-x-6" />
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-3">
                      <div className="w-10 h-10 rounded-xl bg-white/15 backdrop-blur-sm flex items-center justify-center">
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="inline-flex items-center gap-0.5 text-xs font-medium px-2 py-0.5 rounded-full bg-white/10 text-white/80">
                        <ArrowUpRight className="w-3 h-3" />{card.change}
                      </span>
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
              <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-birla-cyan" />ID Card Issuance by Type
              </h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={idCardPie} cx="50%" cy="50%" innerRadius={50} outerRadius={90} dataKey="value" nameKey="name" paddingAngle={3} label>
                      {idCardPie.map((entry, idx) => <Cell key={idx} fill={entry.color} />)}
                    </Pie>
                    <Tooltip contentStyle={tooltipStyle} />
                    <Legend iconType="circle" wrapperStyle={{ fontSize: '10px' }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-5">
              <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
                <ScanLine className="w-4 h-4 text-emerald-500" />QR Scan Activity (This Week)
              </h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={qrScanActivity}>
                    <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'} />
                    <XAxis dataKey="day" tick={{ fontSize: 9 }} stroke={darkMode ? '#64748b' : '#94a3b8'} />
                    <YAxis tick={{ fontSize: 9 }} stroke={darkMode ? '#64748b' : '#94a3b8'} />
                    <Tooltip contentStyle={tooltipStyle} />
                    <Legend iconType="circle" wrapperStyle={{ fontSize: '9px' }} />
                    <Bar dataKey="gate1" fill="#0A1628" name="Main Gate" />
                    <Bar dataKey="gate2" fill="#22D3EE" name="Gate 2" />
                    <Bar dataKey="library" fill="#C8A45C" name="Library" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}

      {/* ═══════════════ CARD DESIGNER TAB ═══════════════ */}
      {activeTab === 'designer' && (
        <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-5">
          <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
            <IdCard className="w-4 h-4 text-birla-cyan" />Card Designer Preview
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {templateOptions.map((template, i) => {
              const gradients = ['gradient-birla', 'gradient-birla-gold', 'gradient-birla-cyan', 'from-emerald-900 to-emerald-600', 'from-gray-800 to-gray-600']
              return (
                <div key={template} className="rounded-2xl overflow-hidden border border-border hover:shadow-lg transition-all cursor-pointer group">
                  <div className={`h-40 ${gradients[i]} p-4 relative`}>
                    <div className="absolute top-2 right-2 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                      <QrCode className="w-4 h-4 text-white/60" />
                    </div>
                    <div className="text-white mt-4">
                      <p className="text-[10px] text-white/50 uppercase tracking-wider">Birla Open Minds</p>
                      <p className="text-sm font-bold mt-1">Aarav Kumar</p>
                      <p className="text-[10px] text-white/70 mt-0.5">Class X-A | BSP/WB/2023/00125</p>
                    </div>
                  </div>
                  <div className="p-3 bg-card">
                    <p className="text-xs font-medium text-foreground">{template}</p>
                    <p className="text-[10px] text-muted-foreground">Click to select this template</p>
                  </div>
                </div>
              )
            })}
          </div>
        </motion.div>
      )}

      {/* ═══════════════ BULK GENERATE TAB ═══════════════ */}
      {activeTab === 'bulk' && (
        <motion.div variants={itemVariants} className="space-y-4">
          <div className="rounded-2xl border border-border bg-card p-6">
            <h3 className="text-base font-semibold text-foreground flex items-center gap-2 mb-6">
              <LayoutGrid className="w-5 h-5 text-cyan-500" />Bulk ID Generation
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className={formGroupClass}>
                <label className={labelClass}>Class *</label>
                <select value={bulkIdData.class} onChange={(e) => setBulkIdData({ ...bulkIdData, class: e.target.value })} className={inputClass}>
                  <option value="">Select Class</option>
                  {classes.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div className={formGroupClass}>
                <label className={labelClass}>Section</label>
                <select value={bulkIdData.section} onChange={(e) => setBulkIdData({ ...bulkIdData, section: e.target.value })} className={inputClass}>
                  <option value="">All Sections</option>
                  {sections.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <div className={formGroupClass}>
                <label className={labelClass}>Card Type *</label>
                <select value={bulkIdData.cardType} onChange={(e) => setBulkIdData({ ...bulkIdData, cardType: e.target.value })} className={inputClass}>
                  {cardTypes.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div className={formGroupClass}>
                <label className={labelClass}>Template</label>
                <select value={bulkIdData.template} onChange={(e) => setBulkIdData({ ...bulkIdData, template: e.target.value })} className={inputClass}>
                  {templateOptions.map((t) => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
            </div>
            <div className="flex items-center gap-3 mt-4">
              <button onClick={() => handleFormSubmit('Bulk ID Generation', bulkIdData)}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl gradient-birla text-white text-sm font-medium hover:opacity-90 transition-opacity">
                <LayoutGrid className="w-4 h-4" />Generate IDs
              </button>
            </div>
          </div>
          <div className="rounded-2xl border border-border bg-card p-5">
            <h3 className="text-sm font-semibold text-foreground mb-4">Preview - Students with UDISE+ IDs</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-2 px-3 font-medium text-muted-foreground">Student</th>
                    <th className="text-left py-2 px-3 font-medium text-muted-foreground">BSP ID</th>
                    <th className="text-left py-2 px-3 font-medium text-muted-foreground">PEN No</th>
                    <th className="text-left py-2 px-3 font-medium text-muted-foreground">Uppar ID</th>
                    <th className="text-left py-2 px-3 font-medium text-muted-foreground">Class</th>
                    <th className="text-left py-2 px-3 font-medium text-muted-foreground">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {bulkPreviewStudents.map((s, i) => (
                    <tr key={i} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                      <td className="py-2 px-3 font-medium">{s.name}</td>
                      <td className="py-2 px-3 text-birla-cyan">{s.bspId}</td>
                      <td className="py-2 px-3 text-birla-gold">{s.penNo}</td>
                      <td className="py-2 px-3 text-purple-500">{s.upparId}</td>
                      <td className="py-2 px-3">{s.class}</td>
                      <td className="py-2 px-3">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${
                          s.status === 'Ready' ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' : 'bg-amber-500/10 text-amber-600 dark:text-amber-400'
                        }`}>{s.status}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>
      )}

      {/* ═══════════════ PRINT TAB ═══════════════ */}
      {activeTab === 'print' && (
        <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-5">
          <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
            <Printer className="w-4 h-4 text-birla-cyan" />Print Queue
          </h3>
          <div className="space-y-3">
            {[
              { batch: 'Class X-A ID Cards', count: 35, status: 'In Queue', date: '2025-03-10' },
              { batch: 'Staff ID Cards 2025', count: 65, status: 'Printing', date: '2025-03-09' },
              { batch: 'Visitor Passes', count: 12, status: 'Completed', date: '2025-03-08' },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-xl border border-border hover:bg-muted/30 transition-colors">
                <div>
                  <p className="text-sm font-medium">{item.batch}</p>
                  <p className="text-xs text-muted-foreground">{item.count} cards • {item.date}</p>
                </div>
                <span className={`px-3 py-1 rounded-lg text-xs font-medium ${
                  item.status === 'Printing' ? 'bg-blue-500/10 text-blue-600 dark:text-blue-400' :
                  item.status === 'Completed' ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' :
                  'bg-amber-500/10 text-amber-600 dark:text-amber-400'
                }`}>{item.status}</span>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* ═══════════════ QR SCAN TAB ═══════════════ */}
      {activeTab === 'qrscan' && (
        <motion.div variants={itemVariants} className="space-y-4">
          <div className="rounded-2xl border border-border bg-card p-5">
            <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
              <ScanLine className="w-4 h-4 text-emerald-500" />Daily QR Scan Count
            </h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={qrScanActivity}>
                  <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'} />
                  <XAxis dataKey="day" tick={{ fontSize: 9 }} stroke={darkMode ? '#64748b' : '#94a3b8'} />
                  <YAxis tick={{ fontSize: 9 }} stroke={darkMode ? '#64748b' : '#94a3b8'} />
                  <Tooltip contentStyle={tooltipStyle} />
                  <Legend iconType="circle" wrapperStyle={{ fontSize: '9px' }} />
                  <Line type="monotone" dataKey="gate1" stroke="#0A1628" strokeWidth={2} dot={{ r: 3 }} name="Main Gate" />
                  <Line type="monotone" dataKey="gate2" stroke="#22D3EE" strokeWidth={2} dot={{ r: 3 }} name="Gate 2" />
                  <Line type="monotone" dataKey="library" stroke="#C8A45C" strokeWidth={2} dot={{ r: 3 }} name="Library" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </motion.div>
      )}

      {/* ═══════════════ SMART CAMPUS TAB ═══════════════ */}
      {activeTab === 'smartcampus' && (
        <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-5">
          <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
            <Shield className="w-4 h-4 text-birla-cyan" />Smart Campus Access - Gate Entry/Exit
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2 px-3 font-medium text-muted-foreground">Gate</th>
                  <th className="text-left py-2 px-3 font-medium text-muted-foreground">Entry</th>
                  <th className="text-left py-2 px-3 font-medium text-muted-foreground">Exit</th>
                  <th className="text-left py-2 px-3 font-medium text-muted-foreground">Peak Hour</th>
                  <th className="text-left py-2 px-3 font-medium text-muted-foreground">Heatmap</th>
                </tr>
              </thead>
              <tbody>
                {smartCampusAccess.map((g, i) => {
                  const intensity = g.entry / 342
                  return (
                    <tr key={i} className="border-b border-border/50">
                      <td className="py-2 px-3 font-medium">{g.gate}</td>
                      <td className="py-2 px-3 text-emerald-600 dark:text-emerald-400">{g.entry}</td>
                      <td className="py-2 px-3 text-red-600 dark:text-red-400">{g.exit}</td>
                      <td className="py-2 px-3">{g.peak}</td>
                      <td className="py-2 px-3">
                        <div className="w-24 h-3 rounded-full overflow-hidden" style={{ background: `rgba(34, 211, 238, ${intensity * 0.3})` }}>
                          <div className="h-full rounded-full" style={{ width: `${intensity * 100}%`, background: `rgba(34, 211, 238, ${0.4 + intensity * 0.6})` }} />
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </motion.div>
      )}

      {/* ═══════════════ FORMS TAB ═══════════════ */}
      {activeTab === 'forms' && (
        <motion.div variants={itemVariants} className="space-y-6">
          <div className="flex flex-wrap gap-2">
            {formOptions.map((f) => {
              const Icon = f.icon
              return (
                <button key={f.key} onClick={() => setActiveForm(f.key)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                    activeForm === f.key ? 'gradient-birla text-white shadow-md' : 'border border-border text-muted-foreground hover:bg-muted hover:text-foreground'
                  }`}>
                  <Icon className="w-3.5 h-3.5" />{f.label}
                </button>
              )
            })}
          </div>

          {/* 1. Individual ID Card Form */}
          {activeForm === 'individualId' && (
            <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-6">
              <h3 className="text-base font-semibold text-foreground flex items-center gap-2 mb-6">
                <CreditCard className="w-5 h-5 text-blue-500" />Individual ID Card Form
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className={formGroupClass}>
                  <label className={labelClass}>Student Name *</label>
                  <input type="text" placeholder="Enter student name" value={individualIdData.student}
                    onChange={(e) => setIndividualIdData({ ...individualIdData, student: e.target.value })} className={inputClass} />
                </div>
                {renderUdiseFields(individualIdData, setIndividualIdData)}
                <div className={formGroupClass}>
                  <label className={labelClass}>Card Type *</label>
                  <select value={individualIdData.cardType} onChange={(e) => setIndividualIdData({ ...individualIdData, cardType: e.target.value })} className={inputClass}>
                    {cardTypes.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div className={formGroupClass}>
                  <label className={labelClass}>Template *</label>
                  <select value={individualIdData.templateSelect} onChange={(e) => setIndividualIdData({ ...individualIdData, templateSelect: e.target.value })} className={inputClass}>
                    {templateOptions.map((t) => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
                <div className={formGroupClass}>
                  <label className={labelClass}>House</label>
                  <select value={individualIdData.houseSelect} onChange={(e) => setIndividualIdData({ ...individualIdData, houseSelect: e.target.value })} className={inputClass}>
                    <option value="">Select House</option>
                    {houses.map((h) => <option key={h} value={h}>{h}</option>)}
                  </select>
                </div>
                <div className={formGroupClass}>
                  <label className={labelClass}>Transport Route</label>
                  <select value={individualIdData.transportRoute} onChange={(e) => setIndividualIdData({ ...individualIdData, transportRoute: e.target.value })} className={inputClass}>
                    <option value="">Select Route</option>
                    {transportRoutes.map((r) => <option key={r} value={r}>{r}</option>)}
                  </select>
                </div>
                <div className={formGroupClass}>
                  <label className={labelClass}>Valid From *</label>
                  <input type="date" value={individualIdData.validFrom}
                    onChange={(e) => setIndividualIdData({ ...individualIdData, validFrom: e.target.value })} className={inputClass} />
                </div>
                <div className={formGroupClass}>
                  <label className={labelClass}>Valid To *</label>
                  <input type="date" value={individualIdData.validTo}
                    onChange={(e) => setIndividualIdData({ ...individualIdData, validTo: e.target.value })} className={inputClass} />
                </div>
                <div className={formGroupClass}>
                  <label className={labelClass}>Blood Group</label>
                  <select value={individualIdData.bloodGroup} onChange={(e) => setIndividualIdData({ ...individualIdData, bloodGroup: e.target.value })} className={inputClass}>
                    <option value="">Select</option>
                    {bloodGroups.map((b) => <option key={b} value={b}>{b}</option>)}
                  </select>
                </div>
                <div className={formGroupClass}>
                  <label className={labelClass}>Emergency Contact 1</label>
                  <input type="text" placeholder="+91 XXXXX XXXXX" value={individualIdData.emergencyContact1}
                    onChange={(e) => setIndividualIdData({ ...individualIdData, emergencyContact1: e.target.value })} className={inputClass} />
                </div>
                <div className={formGroupClass}>
                  <label className={labelClass}>Emergency Contact 2</label>
                  <input type="text" placeholder="+91 XXXXX XXXXX" value={individualIdData.emergencyContact2}
                    onChange={(e) => setIndividualIdData({ ...individualIdData, emergencyContact2: e.target.value })} className={inputClass} />
                </div>
                <div className={formGroupClass}>
                  <label className={labelClass}>Medical Notes</label>
                  <input type="text" placeholder="e.g. Allergic to Penicillin" value={individualIdData.medicalNotes}
                    onChange={(e) => setIndividualIdData({ ...individualIdData, medicalNotes: e.target.value })} className={inputClass} />
                </div>
              </div>
              <div className="flex items-center gap-3 mt-6 pt-4 border-t border-border">
                <button onClick={() => handleFormSubmit('Individual ID Card', individualIdData)}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl gradient-birla text-white text-sm font-medium hover:opacity-90 transition-opacity">
                  <Save className="w-4 h-4" />Generate ID Card
                </button>
                <button onClick={() => setIndividualIdData({ student: '', bspId: '', penNo: '', upparId: '', cardType: 'Student', templateSelect: 'Standard Blue', houseSelect: '', transportRoute: '', validFrom: '', validTo: '', bloodGroup: '', emergencyContact1: '', emergencyContact2: '', medicalNotes: '' })}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-border text-sm font-medium hover:bg-muted transition-colors">
                  <RotateCcw className="w-4 h-4" />Reset
                </button>
              </div>
            </motion.div>
          )}

          {/* 2. Bulk ID Generation Form */}
          {activeForm === 'bulkId' && (
            <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-6">
              <h3 className="text-base font-semibold text-foreground flex items-center gap-2 mb-6">
                <LayoutGrid className="w-5 h-5 text-cyan-500" />Bulk ID Generation Form
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className={formGroupClass}>
                  <label className={labelClass}>Class *</label>
                  <select value={bulkIdData.class} onChange={(e) => setBulkIdData({ ...bulkIdData, class: e.target.value })} className={inputClass}>
                    <option value="">Select Class</option>
                    {classes.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div className={formGroupClass}>
                  <label className={labelClass}>Section</label>
                  <select value={bulkIdData.section} onChange={(e) => setBulkIdData({ ...bulkIdData, section: e.target.value })} className={inputClass}>
                    <option value="">All Sections</option>
                    {sections.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <div className={formGroupClass}>
                  <label className={labelClass}>Card Type *</label>
                  <select value={bulkIdData.cardType} onChange={(e) => setBulkIdData({ ...bulkIdData, cardType: e.target.value })} className={inputClass}>
                    {cardTypes.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div className={formGroupClass}>
                  <label className={labelClass}>Template *</label>
                  <select value={bulkIdData.template} onChange={(e) => setBulkIdData({ ...bulkIdData, template: e.target.value })} className={inputClass}>
                    {templateOptions.map((t) => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
              </div>
              <div className="mt-4">
                <h4 className="text-xs font-medium text-muted-foreground mb-2">Preview Table</h4>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left py-2 px-3 font-medium text-muted-foreground">Student</th>
                        <th className="text-left py-2 px-3 font-medium text-muted-foreground">BSP ID</th>
                        <th className="text-left py-2 px-3 font-medium text-muted-foreground">PEN No</th>
                        <th className="text-left py-2 px-3 font-medium text-muted-foreground">Uppar ID</th>
                        <th className="text-left py-2 px-3 font-medium text-muted-foreground">Class</th>
                        <th className="text-left py-2 px-3 font-medium text-muted-foreground">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {bulkPreviewStudents.map((s, i) => (
                        <tr key={i} className="border-b border-border/50">
                          <td className="py-2 px-3 font-medium">{s.name}</td>
                          <td className="py-2 px-3 text-birla-cyan">{s.bspId}</td>
                          <td className="py-2 px-3 text-birla-gold">{s.penNo}</td>
                          <td className="py-2 px-3 text-purple-500">{s.upparId}</td>
                          <td className="py-2 px-3">{s.class}</td>
                          <td className="py-2 px-3">
                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${s.status === 'Ready' ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' : 'bg-amber-500/10 text-amber-600 dark:text-amber-400'}`}>{s.status}</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="flex items-center gap-3 mt-6 pt-4 border-t border-border">
                <button onClick={() => handleFormSubmit('Bulk ID Generation', bulkIdData)}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl gradient-birla text-white text-sm font-medium hover:opacity-90 transition-opacity">
                  <LayoutGrid className="w-4 h-4" />Generate All IDs
                </button>
                <button onClick={() => setBulkIdData({ class: '', section: '', cardType: 'Student', template: 'Standard Blue' })}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-border text-sm font-medium hover:bg-muted transition-colors">
                  <RotateCcw className="w-4 h-4" />Reset
                </button>
              </div>
            </motion.div>
          )}

          {/* 3. Visitor Temporary Pass Form */}
          {activeForm === 'visitorPass' && (
            <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-6">
              <h3 className="text-base font-semibold text-foreground flex items-center gap-2 mb-6">
                <UserCheck className="w-5 h-5 text-emerald-500" />Visitor Temporary Pass Form
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className={formGroupClass}>
                  <label className={labelClass}>Visitor Name *</label>
                  <input type="text" placeholder="Enter visitor name" value={visitorPassData2.visitorName}
                    onChange={(e) => setVisitorPassData2({ ...visitorPassData2, visitorName: e.target.value })} className={inputClass} />
                </div>
                <div className={formGroupClass}>
                  <label className={labelClass}>Purpose *</label>
                  <input type="text" placeholder="Reason for visit" value={visitorPassData2.purpose}
                    onChange={(e) => setVisitorPassData2({ ...visitorPassData2, purpose: e.target.value })} className={inputClass} />
                </div>
                <div className={formGroupClass}>
                  <label className={labelClass}>Host Student</label>
                  <input type="text" placeholder="Student name" value={visitorPassData2.hostStudent}
                    onChange={(e) => setVisitorPassData2({ ...visitorPassData2, hostStudent: e.target.value })} className={inputClass} />
                </div>
                <div className={formGroupClass}>
                  <label className={labelClass}>Host Staff</label>
                  <input type="text" placeholder="Staff name" value={visitorPassData2.hostStaff}
                    onChange={(e) => setVisitorPassData2({ ...visitorPassData2, hostStaff: e.target.value })} className={inputClass} />
                </div>
                <div className={formGroupClass}>
                  <label className={labelClass}>Visit Date *</label>
                  <input type="date" value={visitorPassData2.visitDate}
                    onChange={(e) => setVisitorPassData2({ ...visitorPassData2, visitDate: e.target.value })} className={inputClass} />
                </div>
                <div className={formGroupClass}>
                  <label className={labelClass}>In Time *</label>
                  <input type="time" value={visitorPassData2.inTime}
                    onChange={(e) => setVisitorPassData2({ ...visitorPassData2, inTime: e.target.value })} className={inputClass} />
                </div>
                <div className={formGroupClass}>
                  <label className={labelClass}>Expected Out Time</label>
                  <input type="time" value={visitorPassData2.expectedOutTime}
                    onChange={(e) => setVisitorPassData2({ ...visitorPassData2, expectedOutTime: e.target.value })} className={inputClass} />
                </div>
                <div className={formGroupClass}>
                  <label className={labelClass}>ID Proof Type *</label>
                  <select value={visitorPassData2.idProofType} onChange={(e) => setVisitorPassData2({ ...visitorPassData2, idProofType: e.target.value })} className={inputClass}>
                    {idProofTypes.map((t) => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
                <div className={formGroupClass}>
                  <label className={labelClass}>ID Proof Number *</label>
                  <input type="text" placeholder="Enter ID number" value={visitorPassData2.idProofNumber}
                    onChange={(e) => setVisitorPassData2({ ...visitorPassData2, idProofNumber: e.target.value })} className={inputClass} />
                </div>
                <div className={formGroupClass}>
                  <label className="flex items-center gap-2 text-sm text-foreground mt-6">
                    <input type="checkbox" checked={visitorPassData2.photo}
                      onChange={(e) => setVisitorPassData2({ ...visitorPassData2, photo: e.target.checked })}
                      className="rounded border-input" />
                    Photo Captured
                  </label>
                </div>
                <div className={formGroupClass}>
                  <label className="flex items-center gap-2 text-sm text-foreground mt-6">
                    <input type="checkbox" checked={visitorPassData2.temporaryQR}
                      onChange={(e) => setVisitorPassData2({ ...visitorPassData2, temporaryQR: e.target.checked })}
                      className="rounded border-input" />
                    Generate Temporary QR
                  </label>
                </div>
              </div>
              <div className="flex items-center gap-3 mt-6 pt-4 border-t border-border">
                <button onClick={() => handleFormSubmit('Visitor Pass', visitorPassData2)}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl gradient-birla text-white text-sm font-medium hover:opacity-90 transition-opacity">
                  <Save className="w-4 h-4" />Issue Visitor Pass
                </button>
                <button onClick={() => setVisitorPassData2({ visitorName: '', purpose: '', hostStudent: '', hostStaff: '', visitDate: '', inTime: '', expectedOutTime: '', idProofType: 'Aadhaar', idProofNumber: '', photo: false, temporaryQR: false })}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-border text-sm font-medium hover:bg-muted transition-colors">
                  <RotateCcw className="w-4 h-4" />Reset
                </button>
              </div>
            </motion.div>
          )}

          {/* 4. Card Reissue Form */}
          {activeForm === 'reissue' && (
            <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-6">
              <h3 className="text-base font-semibold text-foreground flex items-center gap-2 mb-6">
                <AlertCircle className="w-5 h-5 text-amber-500" />Card Reissue Form
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className={formGroupClass}>
                  <label className={labelClass}>Original Card ID</label>
                  <input type="text" placeholder="e.g. BOM-ID-2023-00125" value={reissueData2.originalCardId}
                    onChange={(e) => setReissueData2({ ...reissueData2, originalCardId: e.target.value })} className={inputClass} />
                </div>
                <div className={formGroupClass}>
                  <label className={labelClass}>Student Name *</label>
                  <input type="text" placeholder="Enter student name" value={reissueData2.student}
                    onChange={(e) => setReissueData2({ ...reissueData2, student: e.target.value })} className={inputClass} />
                </div>
                {renderUdiseFields(reissueData2, setReissueData2)}
                <div className={formGroupClass}>
                  <label className={labelClass}>Reissue Reason *</label>
                  <select value={reissueData2.reissueReason} onChange={(e) => setReissueData2({ ...reissueData2, reissueReason: e.target.value })} className={inputClass}>
                    {reissueReasons.map((r) => <option key={r} value={r}>{r}</option>)}
                  </select>
                </div>
                <div className={formGroupClass}>
                  <label className="flex items-center gap-2 text-sm text-foreground mt-6">
                    <input type="checkbox" checked={reissueData2.newPhoto}
                      onChange={(e) => setReissueData2({ ...reissueData2, newPhoto: e.target.checked })}
                      className="rounded border-input" />
                    New Photo Required
                  </label>
                </div>
                <div className={formGroupClass}>
                  <label className={labelClass}>Urgency *</label>
                  <select value={reissueData2.urgency} onChange={(e) => setReissueData2({ ...reissueData2, urgency: e.target.value })} className={inputClass}>
                    {urgencyOptions.map((u) => <option key={u} value={u}>{u}</option>)}
                  </select>
                </div>
                <div className={formGroupClass}>
                  <label className={labelClass}>Payment Amount (₹)</label>
                  <input type="text" placeholder="e.g. 150" value={reissueData2.paymentAmount}
                    onChange={(e) => setReissueData2({ ...reissueData2, paymentAmount: e.target.value })} className={inputClass} />
                </div>
              </div>
              <div className="flex items-center gap-3 mt-6 pt-4 border-t border-border">
                <button onClick={() => handleFormSubmit('Card Reissue', reissueData2)}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl gradient-birla text-white text-sm font-medium hover:opacity-90 transition-opacity">
                  <Save className="w-4 h-4" />Submit Reissue Request
                </button>
                <button onClick={() => setReissueData2({ originalCardId: '', student: '', bspId: '', penNo: '', upparId: '', reissueReason: 'Lost', newPhoto: false, urgency: 'Normal', paymentAmount: '' })}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-border text-sm font-medium hover:bg-muted transition-colors">
                  <RotateCcw className="w-4 h-4" />Reset
                </button>
              </div>
            </motion.div>
          )}

          {/* 5. Parent Pickup Authorization Form */}
          {activeForm === 'pickupAuth' && (
            <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-6">
              <h3 className="text-base font-semibold text-foreground flex items-center gap-2 mb-6">
                <UserCircle className="w-5 h-5 text-purple-500" />Parent Pickup Authorization Form
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className={formGroupClass}>
                  <label className={labelClass}>Student Name *</label>
                  <input type="text" placeholder="Enter student name" value={pickupAuthData.student}
                    onChange={(e) => setPickupAuthData({ ...pickupAuthData, student: e.target.value })} className={inputClass} />
                </div>
                {renderUdiseFields(pickupAuthData, setPickupAuthData)}
                <div className={formGroupClass}>
                  <label className={labelClass}>Authorized Person Name *</label>
                  <input type="text" placeholder="Person authorized for pickup" value={pickupAuthData.authorizedPersonName}
                    onChange={(e) => setPickupAuthData({ ...pickupAuthData, authorizedPersonName: e.target.value })} className={inputClass} />
                </div>
                <div className={formGroupClass}>
                  <label className={labelClass}>Relationship *</label>
                  <input type="text" placeholder="e.g. Father, Mother, Guardian" value={pickupAuthData.relationship}
                    onChange={(e) => setPickupAuthData({ ...pickupAuthData, relationship: e.target.value })} className={inputClass} />
                </div>
                <div className={formGroupClass}>
                  <label className={labelClass}>Phone *</label>
                  <input type="text" placeholder="+91 XXXXX XXXXX" value={pickupAuthData.phone}
                    onChange={(e) => setPickupAuthData({ ...pickupAuthData, phone: e.target.value })} className={inputClass} />
                </div>
                <div className={formGroupClass}>
                  <label className={labelClass}>Photo ID</label>
                  <input type="text" placeholder="Aadhaar/Voter ID number" value={pickupAuthData.photoID}
                    onChange={(e) => setPickupAuthData({ ...pickupAuthData, photoID: e.target.value })} className={inputClass} />
                </div>
                <div className={formGroupClass}>
                  <label className={labelClass}>Valid From *</label>
                  <input type="date" value={pickupAuthData.validFrom}
                    onChange={(e) => setPickupAuthData({ ...pickupAuthData, validFrom: e.target.value })} className={inputClass} />
                </div>
                <div className={formGroupClass}>
                  <label className={labelClass}>Valid To *</label>
                  <input type="date" value={pickupAuthData.validTo}
                    onChange={(e) => setPickupAuthData({ ...pickupAuthData, validTo: e.target.value })} className={inputClass} />
                </div>
                <div className={formGroupClass}>
                  <label className={labelClass}>Alternate Contact</label>
                  <input type="text" placeholder="+91 XXXXX XXXXX" value={pickupAuthData.alternateContact}
                    onChange={(e) => setPickupAuthData({ ...pickupAuthData, alternateContact: e.target.value })} className={inputClass} />
                </div>
              </div>
              <div className="flex items-center gap-3 mt-6 pt-4 border-t border-border">
                <button onClick={() => handleFormSubmit('Pickup Authorization', pickupAuthData)}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl gradient-birla text-white text-sm font-medium hover:opacity-90 transition-opacity">
                  <Save className="w-4 h-4" />Authorize Pickup
                </button>
                <button onClick={() => setPickupAuthData({ student: '', bspId: '', penNo: '', upparId: '', authorizedPersonName: '', relationship: '', phone: '', photoID: '', validFrom: '', validTo: '', alternateContact: '' })}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-border text-sm font-medium hover:bg-muted transition-colors">
                  <RotateCcw className="w-4 h-4" />Reset
                </button>
              </div>
            </motion.div>
          )}

          {/* 6. QR Code Generation Form */}
          {activeForm === 'qrGeneration' && (
            <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-6">
              <h3 className="text-base font-semibold text-foreground flex items-center gap-2 mb-6">
                <QrCode className="w-5 h-5 text-cyan-500" />QR Code Generation Form
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className={formGroupClass}>
                  <label className={labelClass}>Student Name *</label>
                  <input type="text" placeholder="Enter student name" value={qrGenData.student}
                    onChange={(e) => setQrGenData({ ...qrGenData, student: e.target.value })} className={inputClass} />
                </div>
                {renderUdiseFields(qrGenData, setQrGenData)}
                <div className={formGroupClass}>
                  <label className={labelClass}>Purpose *</label>
                  <select value={qrGenData.purpose} onChange={(e) => setQrGenData({ ...qrGenData, purpose: e.target.value })} className={inputClass}>
                    {qrPurposes.map((p) => <option key={p} value={p}>{p}</option>)}
                  </select>
                </div>
                <div className={formGroupClass}>
                  <label className={labelClass}>Valid From *</label>
                  <input type="date" value={qrGenData.validFrom}
                    onChange={(e) => setQrGenData({ ...qrGenData, validFrom: e.target.value })} className={inputClass} />
                </div>
                <div className={formGroupClass}>
                  <label className={labelClass}>Valid To *</label>
                  <input type="date" value={qrGenData.validTo}
                    onChange={(e) => setQrGenData({ ...qrGenData, validTo: e.target.value })} className={inputClass} />
                </div>
                <div className={formGroupClass}>
                  <label className="flex items-center gap-2 text-sm text-foreground mt-6">
                    <input type="checkbox" checked={qrGenData.singleUse}
                      onChange={(e) => setQrGenData({ ...qrGenData, singleUse: e.target.checked })}
                      className="rounded border-input" />
                    Single Use QR Code
                  </label>
                </div>
              </div>
              <div className="flex items-center gap-3 mt-6 pt-4 border-t border-border">
                <button onClick={() => handleFormSubmit('QR Code Generation', qrGenData)}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl gradient-birla text-white text-sm font-medium hover:opacity-90 transition-opacity">
                  <QrCode className="w-4 h-4" />Generate QR Code
                </button>
                <button onClick={() => setQrGenData({ student: '', bspId: '', penNo: '', upparId: '', purpose: 'Attendance', validFrom: '', validTo: '', singleUse: false })}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-border text-sm font-medium hover:bg-muted transition-colors">
                  <RotateCcw className="w-4 h-4" />Reset
                </button>
              </div>
            </motion.div>
          )}
        </motion.div>
      )}

      {/* ═══════════════ REPORTS TAB ═══════════════ */}
      {activeTab === 'reports' && (
        <motion.div variants={itemVariants} className="space-y-6">
          <div className="flex flex-wrap gap-2">
            {reportOptions.map((r) => {
              const Icon = r.icon
              return (
                <button key={r.key} onClick={() => setActiveReport(r.key)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                    activeReport === r.key ? 'gradient-birla-gold text-birla-blue shadow-md' : 'border border-border text-muted-foreground hover:bg-muted hover:text-foreground'
                  }`}>
                  <Icon className="w-3.5 h-3.5" />{r.label}
                </button>
              )
            })}
          </div>

          {/* 1. ID Card Issuance Report */}
          {activeReport === 'idIssuance' && (
            <motion.div variants={itemVariants} className="space-y-4">
              <div className="rounded-2xl border border-border bg-card p-5">
                <h3 className="text-sm font-semibold text-foreground mb-4">Card Type Count</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left py-2 px-3 font-medium text-muted-foreground">Card Type</th>
                        <th className="text-left py-2 px-3 font-medium text-muted-foreground">Issued</th>
                        <th className="text-left py-2 px-3 font-medium text-muted-foreground">Active</th>
                        <th className="text-left py-2 px-3 font-medium text-muted-foreground">Expired</th>
                      </tr>
                    </thead>
                    <tbody>
                      {idCardIssuance.map((c, i) => (
                        <tr key={i} className="border-b border-border/50">
                          <td className="py-2 px-3 font-medium">{c.cardType}</td>
                          <td className="py-2 px-3">{c.issued}</td>
                          <td className="py-2 px-3 text-emerald-600 dark:text-emerald-400">{c.active}</td>
                          <td className="py-2 px-3 text-red-600 dark:text-red-400">{c.expired}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="rounded-2xl border border-border bg-card p-5">
                <h3 className="text-sm font-semibold text-foreground mb-4">Issuance Distribution</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={idCardPie} cx="50%" cy="50%" innerRadius={50} outerRadius={90} dataKey="value" nameKey="name" paddingAngle={3} label>
                        {idCardPie.map((entry, idx) => <Cell key={idx} fill={entry.color} />)}
                      </Pie>
                      <Tooltip contentStyle={tooltipStyle} />
                      <Legend iconType="circle" wrapperStyle={{ fontSize: '10px' }} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </motion.div>
          )}

          {/* 2. QR Scan Activity Report */}
          {activeReport === 'qrScanActivity' && (
            <motion.div variants={itemVariants} className="space-y-4">
              <div className="rounded-2xl border border-border bg-card p-5">
                <h3 className="text-sm font-semibold text-foreground mb-4">Daily Scan Count</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left py-2 px-3 font-medium text-muted-foreground">Day</th>
                        <th className="text-left py-2 px-3 font-medium text-muted-foreground">Main Gate</th>
                        <th className="text-left py-2 px-3 font-medium text-muted-foreground">Gate 2</th>
                        <th className="text-left py-2 px-3 font-medium text-muted-foreground">Gate 3</th>
                        <th className="text-left py-2 px-3 font-medium text-muted-foreground">Library</th>
                      </tr>
                    </thead>
                    <tbody>
                      {qrScanActivity.map((q, i) => (
                        <tr key={i} className="border-b border-border/50">
                          <td className="py-2 px-3 font-medium">{q.day}</td>
                          <td className="py-2 px-3">{q.gate1}</td>
                          <td className="py-2 px-3">{q.gate2}</td>
                          <td className="py-2 px-3">{q.gate3}</td>
                          <td className="py-2 px-3">{q.library}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="rounded-2xl border border-border bg-card p-5">
                <h3 className="text-sm font-semibold text-foreground mb-4">Scan Trend</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={qrScanActivity}>
                      <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'} />
                      <XAxis dataKey="day" tick={{ fontSize: 9 }} stroke={darkMode ? '#64748b' : '#94a3b8'} />
                      <YAxis tick={{ fontSize: 9 }} stroke={darkMode ? '#64748b' : '#94a3b8'} />
                      <Tooltip contentStyle={tooltipStyle} />
                      <Legend iconType="circle" wrapperStyle={{ fontSize: '9px' }} />
                      <Line type="monotone" dataKey="gate1" stroke="#0A1628" strokeWidth={2} dot={{ r: 3 }} name="Main Gate" />
                      <Line type="monotone" dataKey="gate2" stroke="#22D3EE" strokeWidth={2} dot={{ r: 3 }} name="Gate 2" />
                      <Line type="monotone" dataKey="library" stroke="#C8A45C" strokeWidth={2} dot={{ r: 3 }} name="Library" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </motion.div>
          )}

          {/* 3. Reissue Request Report */}
          {activeReport === 'reissueReport' && (
            <motion.div variants={itemVariants} className="space-y-4">
              <div className="rounded-2xl border border-border bg-card p-5">
                <h3 className="text-sm font-semibold text-foreground mb-4">Reason-wise Count</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left py-2 px-3 font-medium text-muted-foreground">Reason</th>
                        <th className="text-left py-2 px-3 font-medium text-muted-foreground">Count</th>
                      </tr>
                    </thead>
                    <tbody>
                      {reissueData.map((r, i) => (
                        <tr key={i} className="border-b border-border/50">
                          <td className="py-2 px-3 font-medium">{r.reason}</td>
                          <td className="py-2 px-3">{r.count}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="rounded-2xl border border-border bg-card p-5">
                <h3 className="text-sm font-semibold text-foreground mb-4">Reissue Distribution</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={reissueData}>
                      <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'} />
                      <XAxis dataKey="reason" tick={{ fontSize: 9 }} stroke={darkMode ? '#64748b' : '#94a3b8'} />
                      <YAxis tick={{ fontSize: 9 }} stroke={darkMode ? '#64748b' : '#94a3b8'} />
                      <Tooltip contentStyle={tooltipStyle} />
                      <Bar dataKey="count" radius={[4, 4, 0, 0]} name="Count">
                        {reissueData.map((entry, idx) => <Cell key={idx} fill={entry.color} />)}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </motion.div>
          )}

          {/* 4. Visitor Pass Report */}
          {activeReport === 'visitorPassReport' && (
            <motion.div variants={itemVariants} className="space-y-4">
              <div className="rounded-2xl border border-border bg-card p-5">
                <h3 className="text-sm font-semibold text-foreground mb-4">Daily Visitors</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left py-2 px-3 font-medium text-muted-foreground">Day</th>
                        <th className="text-left py-2 px-3 font-medium text-muted-foreground">Visitors</th>
                      </tr>
                    </thead>
                    <tbody>
                      {visitorPassData.map((v, i) => (
                        <tr key={i} className="border-b border-border/50">
                          <td className="py-2 px-3 font-medium">{v.day}</td>
                          <td className="py-2 px-3">{v.visitors}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="rounded-2xl border border-border bg-card p-5">
                <h3 className="text-sm font-semibold text-foreground mb-4">Visitor Trend</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={visitorPassData}>
                      <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'} />
                      <XAxis dataKey="day" tick={{ fontSize: 9 }} stroke={darkMode ? '#64748b' : '#94a3b8'} />
                      <YAxis tick={{ fontSize: 9 }} stroke={darkMode ? '#64748b' : '#94a3b8'} />
                      <Tooltip contentStyle={tooltipStyle} />
                      <Bar dataKey="visitors" fill="#8B5CF6" radius={[4, 4, 0, 0]} name="Visitors" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </motion.div>
          )}

          {/* 5. Smart Campus Access Report */}
          {activeReport === 'smartCampusAccess' && (
            <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-5">
              <h3 className="text-sm font-semibold text-foreground mb-4">Gate-wise Entry/Exit Heatmap</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-2 px-3 font-medium text-muted-foreground">Gate</th>
                      <th className="text-left py-2 px-3 font-medium text-muted-foreground">Entry</th>
                      <th className="text-left py-2 px-3 font-medium text-muted-foreground">Exit</th>
                      <th className="text-left py-2 px-3 font-medium text-muted-foreground">Peak Hour</th>
                      <th className="text-left py-2 px-3 font-medium text-muted-foreground">Activity Level</th>
                    </tr>
                  </thead>
                  <tbody>
                    {smartCampusAccess.map((g, i) => {
                      const intensity = g.entry / 342
                      return (
                        <tr key={i} className="border-b border-border/50">
                          <td className="py-2 px-3 font-medium">{g.gate}</td>
                          <td className="py-2 px-3 text-emerald-600 dark:text-emerald-400">{g.entry}</td>
                          <td className="py-2 px-3 text-red-600 dark:text-red-400">{g.exit}</td>
                          <td className="py-2 px-3">{g.peak}</td>
                          <td className="py-2 px-3">
                            <div className="flex items-center gap-2">
                              <div className="w-20 h-3 rounded-full overflow-hidden" style={{ background: `rgba(34, 211, 238, ${intensity * 0.2})` }}>
                                <div className="h-full rounded-full" style={{ width: `${intensity * 100}%`, background: `rgba(34, 211, 238, ${0.4 + intensity * 0.6})` }} />
                              </div>
                              <span className={`text-[10px] font-medium ${intensity > 0.5 ? 'text-red-600 dark:text-red-400' : intensity > 0.2 ? 'text-amber-600 dark:text-amber-400' : 'text-emerald-600 dark:text-emerald-400'}`}>
                                {intensity > 0.5 ? 'High' : intensity > 0.2 ? 'Medium' : 'Low'}
                              </span>
                            </div>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}

          {/* 6. Student ID Compliance Report */}
          {activeReport === 'compliance' && (
            <motion.div variants={itemVariants} className="space-y-4">
              <div className="rounded-2xl border border-border bg-card p-5">
                <h3 className="text-sm font-semibold text-foreground mb-4">Class-wise BSP ID / PEN No / Uppar ID + ID Card Status</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left py-2 px-3 font-medium text-muted-foreground">Class</th>
                        <th className="text-left py-2 px-3 font-medium text-muted-foreground">Total</th>
                        <th className="text-left py-2 px-3 font-medium text-muted-foreground">BSP ID</th>
                        <th className="text-left py-2 px-3 font-medium text-muted-foreground">PEN No</th>
                        <th className="text-left py-2 px-3 font-medium text-muted-foreground">Uppar ID</th>
                        <th className="text-left py-2 px-3 font-medium text-muted-foreground">ID Card</th>
                        <th className="text-left py-2 px-3 font-medium text-muted-foreground">Compliance %</th>
                      </tr>
                    </thead>
                    <tbody>
                      {studentIdCompliance.map((s, i) => (
                        <tr key={i} className="border-b border-border/50">
                          <td className="py-2 px-3 font-medium">{s.class}</td>
                          <td className="py-2 px-3">{s.total}</td>
                          <td className="py-2 px-3 text-birla-cyan">{s.bspId}</td>
                          <td className="py-2 px-3 text-birla-gold">{s.penNo}</td>
                          <td className="py-2 px-3 text-purple-500">{s.upparId}</td>
                          <td className="py-2 px-3">{s.idCard}</td>
                          <td className="py-2 px-3">
                            <div className="flex items-center gap-2">
                              <div className="w-14 h-1.5 bg-muted rounded-full overflow-hidden">
                                <div className={`h-full rounded-full ${s.compliance >= 95 ? 'bg-emerald-500' : s.compliance >= 90 ? 'bg-amber-500' : 'bg-red-500'}`} style={{ width: `${s.compliance}%` }} />
                              </div>
                              <span>{s.compliance}%</span>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="rounded-2xl border border-border bg-card p-5">
                <h3 className="text-sm font-semibold text-foreground mb-4">ID Compliance by Class</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={studentIdCompliance}>
                      <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'} />
                      <XAxis dataKey="class" tick={{ fontSize: 9 }} stroke={darkMode ? '#64748b' : '#94a3b8'} />
                      <YAxis domain={[80, 100]} tick={{ fontSize: 9 }} stroke={darkMode ? '#64748b' : '#94a3b8'} />
                      <Tooltip contentStyle={tooltipStyle} />
                      <Legend iconType="circle" wrapperStyle={{ fontSize: '10px' }} />
                      <Bar dataKey="bspId" fill="#22D3EE" name="BSP ID" />
                      <Bar dataKey="penNo" fill="#C8A45C" name="PEN No" />
                      <Bar dataKey="upparId" fill="#8B5CF6" name="Uppar ID" />
                      <Bar dataKey="idCard" fill="#0A1628" name="ID Card" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>
      )}
    </motion.div>
  )
}
