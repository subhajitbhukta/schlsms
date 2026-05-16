import { useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import { HeartPulse, Users, Activity, Shield, Plus, Download, ArrowUpRight, TrendingUp, BarChart3, FileText, Calendar, CheckCircle2, AlertTriangle, X, Save, RotateCcw, ClipboardList, Syringe, Stethoscope, Brain, AlertCircle, PieChart as PieChartIcon, Thermometer, Eye, Baby, Heart, Phone, Clock, UserCheck, Beaker, FlaskConical, Bug, QrCode, ScanLine } from 'lucide-react'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Legend, PieChart, Pie, Cell, AreaChart,
  Area, LineChart, Line, RadarChart, PolarGrid, PolarAngleAxis,
  PolarRadiusAxis, Radar
} from 'recharts'
import useAppStore from '../../../store/useAppStore'
import QRStudentLookup, { STUDENT_DB } from '../shared/QRStudentLookup'

// ─── Mock Data ────────────────────────────────────────────────────
const topStats = [
  { label: 'Total Students', value: '1,247', change: 'Enrolled', icon: Users, gradient: 'from-emerald-900 to-emerald-600', glow: 'shadow-emerald-800/20' },
  { label: 'Vaccinated', value: '89%', change: 'Coverage', icon: Syringe, gradient: 'from-blue-900 to-blue-700', glow: 'shadow-blue-800/20' },
  { label: 'Checkups Done', value: '324', change: 'This year', icon: Stethoscope, gradient: 'from-amber-900 to-amber-600', glow: 'shadow-amber-800/20' },
  { label: 'Counselling', value: '56', change: 'Sessions', icon: Brain, gradient: 'from-purple-900 to-purple-600', glow: 'shadow-purple-800/20' },
]

const vaccinationCoverage = [
  { vaccine: 'BCG', coverage: 95, total: 1247, vaccinated: 1185 },
  { vaccine: 'DPT', coverage: 92, total: 1247, vaccinated: 1147 },
  { vaccine: 'OPV', coverage: 94, total: 1247, vaccinated: 1172 },
  { vaccine: 'MMR', coverage: 88, total: 1247, vaccinated: 1097 },
  { vaccine: 'Hepatitis B', coverage: 91, total: 1247, vaccinated: 1135 },
  { vaccine: 'Typhoid', coverage: 78, total: 1247, vaccinated: 973 },
  { vaccine: 'COVID-19', coverage: 65, total: 1247, vaccinated: 811 },
]

const healthCheckupSummary = [
  { class: 'Nursery', total: 80, healthy: 72, followUp: 6, referred: 2 },
  { class: 'LKG', total: 95, healthy: 88, followUp: 5, referred: 2 },
  { class: 'UKG', total: 90, healthy: 82, followUp: 6, referred: 2 },
  { class: 'I', total: 110, healthy: 100, followUp: 7, referred: 3 },
  { class: 'II', total: 105, healthy: 96, followUp: 6, referred: 3 },
  { class: 'III', total: 100, healthy: 90, followUp: 7, referred: 3 },
  { class: 'IV', total: 98, healthy: 89, followUp: 6, referred: 3 },
  { class: 'V', total: 102, healthy: 93, followUp: 6, referred: 3 },
]

const counsellingSessions = [
  { counsellor: 'Dr. Meera Iyer', sessions: 28, academic: 10, behavioral: 8, career: 5, personal: 3, family: 2 },
  { counsellor: 'Mr. Arvind Desai', sessions: 18, academic: 6, behavioral: 5, career: 3, personal: 2, family: 2 },
  { counsellor: 'Mrs. Sunita Reddy', sessions: 10, academic: 3, behavioral: 3, career: 1, personal: 2, family: 1 },
]

const allergyConditionData = [
  { condition: 'Dust Allergy', count: 45, students: ['Aarav Kumar (BSP/WB/2023/00125)', 'Priya Gupta (BSP/WB/2023/00089)'] },
  { condition: 'Asthma', count: 22, students: ['Rohan Sharma (BSP/WB/2023/00130)', 'Arjun Patel (BSP/WB/2023/00156)'] },
  { condition: 'Food Allergy', count: 35, students: ['Karan Singh (BSP/WB/2023/00201)', 'Ananya Joshi (BSP/WB/2023/00045)'] },
  { condition: 'Skin Condition', count: 18, students: ['Neha Agarwal (BSP/WB/2023/00067)'] },
  { condition: 'Vision Issue', count: 56, students: ['Vikram Rao (BSP/WB/2023/00178)', 'Sneha Das (BSP/WB/2023/00034)'] },
  { condition: 'Hearing Issue', count: 8, students: ['Ravi Teja (BSP/WB/2023/00210)'] },
]

const wellnessScores = [
  { class: 'I', physical: 85, mental: 78, social: 82, emotional: 75, academic: 80 },
  { class: 'II', physical: 82, mental: 80, social: 78, emotional: 77, academic: 83 },
  { class: 'III', physical: 80, mental: 76, social: 80, emotional: 72, academic: 78 },
  { class: 'IV', physical: 78, mental: 82, social: 76, emotional: 80, academic: 76 },
  { class: 'V', physical: 83, mental: 75, social: 85, emotional: 73, academic: 82 },
]

const medicalRecordsData = [
  { name: 'Aarav Kumar', bspId: 'BSP/WB/2023/00125', penNo: 'PEN-2301-0456', upparId: 'UPPR-WB-102345', bloodGroup: 'B+', height: '155 cm', weight: '45 kg', lastCheckup: '2025-02-15' },
  { name: 'Priya Gupta', bspId: 'BSP/WB/2023/00089', penNo: 'PEN-2301-0420', upparId: 'UPPR-WB-101987', bloodGroup: 'O+', height: '148 cm', weight: '40 kg', lastCheckup: '2025-02-14' },
  { name: 'Rohan Sharma', bspId: 'BSP/WB/2023/00130', penNo: 'PEN-2301-0461', upparId: 'UPPR-WB-102350', bloodGroup: 'A+', height: '160 cm', weight: '50 kg', lastCheckup: '2025-01-20' },
]

const vaccinationRecords = [
  { name: 'Aarav Kumar', bspId: 'BSP/WB/2023/00125', penNo: 'PEN-2301-0456', upparId: 'UPPR-WB-102345', vaccine: 'MMR', dose: 'Booster', date: '2025-01-15', nextDue: '2026-01-15' },
  { name: 'Priya Gupta', bspId: 'BSP/WB/2023/00089', penNo: 'PEN-2301-0420', upparId: 'UPPR-WB-101987', vaccine: 'Typhoid', dose: '2nd', date: '2025-02-10', nextDue: '2027-02-10' },
  { name: 'Rohan Sharma', bspId: 'BSP/WB/2023/00130', penNo: 'PEN-2301-0461', upparId: 'UPPR-WB-102350', vaccine: 'Hepatitis B', dose: '3rd', date: '2025-03-01', nextDue: 'Completed' },
]

const counsellingData = [
  { student: 'Aarav Kumar', bspId: 'BSP/WB/2023/00125', penNo: 'PEN-2301-0456', upparId: 'UPPR-WB-102345', counsellor: 'Dr. Meera Iyer', type: 'Academic', date: '2025-03-05', status: 'Completed' },
  { student: 'Sneha Das', bspId: 'BSP/WB/2023/00034', penNo: 'PEN-2301-0365', upparId: 'UPPR-WB-100987', counsellor: 'Mr. Arvind Desai', type: 'Behavioral', date: '2025-03-08', status: 'Scheduled' },
]

const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']
const vaccineNames = ['BCG', 'DPT', 'OPV', 'MMR', 'Hepatitis B', 'Typhoid', 'COVID-19', 'HPV', 'Varicella']
const counsellingTypes = ['Academic', 'Behavioral', 'Career', 'Personal', 'Family']
const checkupTypes = ['Annual', 'Sports', 'Special', 'Pre-Board']
const emergencyTypes = ['Medical', 'Accident', 'Allergic', 'Other']
const severities = ['Low', 'Medium', 'High', 'Critical']
const counsellors = ['Dr. Meera Iyer', 'Mr. Arvind Desai', 'Mrs. Sunita Reddy']
const doctors = ['Dr. Rajiv Mehta', 'Dr. Sangeeta Patel', 'Dr. Amitabh Chatterjee']

// ─── Animation Variants ──────────────────────────────────────────
const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.06 } },
}
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
}

export default function HealthModule() {
  const { darkMode } = useAppStore()
  const [activeTab, setActiveTab] = useState('overview')
  const [activeForm, setActiveForm] = useState('medicalRecord')
  const [activeReport, setActiveReport] = useState('vaccination')

  // ─── QR Pre-fill State ──────────────────────────────────────
  const [qrPrefillStudent, setQrPrefillStudent] = useState(null)

  // ─── Form States ────────────────────────────────────────
  const [medicalRecordData, setMedicalRecordData] = useState({
    student: '', bspId: '', penNo: '', upparId: '', height: '', weight: '', bloodGroup: '', visionLeft: '', visionRight: '', hearing: '', allergies: '', chronicConditions: '', medications: '', emergencyContact: '', doctorName: '', lastCheckupDate: ''
  })
  const [vaccinationData, setVaccinationData] = useState({
    student: '', bspId: '', penNo: '', upparId: '', vaccineName: '', doseNumber: '', date: '', nextDue: '', administeredBy: '', batchNumber: '', sideEffects: ''
  })
  const [counsellingData2, setCounsellingData2] = useState({
    student: '', bspId: '', penNo: '', upparId: '', counsellor: '', date: '', time: '', type: 'Academic', sessionNotes: '', followUpDate: '', parentConsent: 'Yes'
  })
  const [checkupData, setCheckupData] = useState({
    student: '', bspId: '', penNo: '', upparId: '', checkupType: 'Annual', date: '', bp: '', pulse: '', temp: '', height: '', weight: '', bmi: '', doctorRemarks: '', referredTo: '', followUpRequired: 'No'
  })
  const [emergencyData, setEmergencyData] = useState({
    student: '', bspId: '', penNo: '', upparId: '', emergencyType: 'Medical', description: '', severity: 'Medium', location: '', contactedParents: 'No', ambulanceCalled: 'No', actionTaken: ''
  })

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'medical', label: 'Medical Records', icon: Stethoscope },
    { id: 'vaccination', label: 'Vaccination', icon: Syringe },
    { id: 'counselling', label: 'Counselling', icon: Brain },
    { id: 'forms', label: 'Forms', icon: ClipboardList },
    { id: 'reports', label: 'Reports', icon: TrendingUp },
  ]

  const formOptions = [
    { key: 'medicalRecord', label: 'Medical Record', icon: Stethoscope },
    { key: 'vaccinationRecord', label: 'Vaccination Record', icon: Syringe },
    { key: 'counsellingAppt', label: 'Counselling Appointment', icon: Brain },
    { key: 'healthCheckup', label: 'Health Checkup', icon: Activity },
    { key: 'emergencyAlert', label: 'Emergency Alert', icon: AlertTriangle },
  ]

  const reportOptions = [
    { key: 'vaccination', label: 'Vaccination Coverage', icon: Syringe },
    { key: 'checkup', label: 'Health Checkup Summary', icon: Stethoscope },
    { key: 'counsellingReport', label: 'Counselling Sessions', icon: Brain },
    { key: 'allergy', label: 'Allergy & Conditions', icon: FlaskConical },
    { key: 'wellness', label: 'Wellness Score', icon: Heart },
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

  // ─── QR Scan Entry - prefill all forms ─────────────────────────
  const handleQrPrefill = useCallback((student) => {
    setQrPrefillStudent(student)
    if (student) {
      setMedicalRecordData(prev => ({ ...prev, student: student.name, bspId: student.bspId, penNo: student.penNo, upparId: student.upparId, bloodGroup: student.bloodGroup || '' }))
      setVaccinationData(prev => ({ ...prev, student: student.name, bspId: student.bspId, penNo: student.penNo, upparId: student.upparId }))
      setCounsellingData2(prev => ({ ...prev, student: student.name, bspId: student.bspId, penNo: student.penNo, upparId: student.upparId }))
      setCheckupData(prev => ({ ...prev, student: student.name, bspId: student.bspId, penNo: student.penNo, upparId: student.upparId }))
      setEmergencyData(prev => ({ ...prev, student: student.name, bspId: student.bspId, penNo: student.penNo, upparId: student.upparId }))
    } else {
      setQrPrefillStudent(null)
    }
  }, [])

  // ─── Individual form QR handlers ────────────────────────────────
  const handleMedicalRecordSelect = useCallback((student) => {
    if (student) {
      setMedicalRecordData(prev => ({ ...prev, student: student.name, bspId: student.bspId, penNo: student.penNo, upparId: student.upparId, bloodGroup: student.bloodGroup || '' }))
    } else {
      setMedicalRecordData(prev => ({ ...prev, student: '', bspId: '', penNo: '', upparId: '', bloodGroup: '' }))
    }
  }, [])

  const handleVaccinationSelect = useCallback((student) => {
    if (student) {
      setVaccinationData(prev => ({ ...prev, student: student.name, bspId: student.bspId, penNo: student.penNo, upparId: student.upparId }))
    } else {
      setVaccinationData(prev => ({ ...prev, student: '', bspId: '', penNo: '', upparId: '' }))
    }
  }, [])

  const handleCounsellingSelect = useCallback((student) => {
    if (student) {
      setCounsellingData2(prev => ({ ...prev, student: student.name, bspId: student.bspId, penNo: student.penNo, upparId: student.upparId }))
    } else {
      setCounsellingData2(prev => ({ ...prev, student: '', bspId: '', penNo: '', upparId: '' }))
    }
  }, [])

  const handleCheckupSelect = useCallback((student) => {
    if (student) {
      setCheckupData(prev => ({ ...prev, student: student.name, bspId: student.bspId, penNo: student.penNo, upparId: student.upparId }))
    } else {
      setCheckupData(prev => ({ ...prev, student: '', bspId: '', penNo: '', upparId: '' }))
    }
  }, [])

  const handleEmergencySelect = useCallback((student) => {
    if (student) {
      setEmergencyData(prev => ({ ...prev, student: student.name, bspId: student.bspId, penNo: student.penNo, upparId: student.upparId }))
    } else {
      setEmergencyData(prev => ({ ...prev, student: '', bspId: '', penNo: '', upparId: '' }))
    }
  }, [])

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
                <Syringe className="w-4 h-4 text-birla-cyan" />Vaccination Coverage
              </h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={vaccinationCoverage}>
                    <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'} />
                    <XAxis dataKey="vaccine" tick={{ fontSize: 8 }} stroke={darkMode ? '#64748b' : '#94a3b8'} />
                    <YAxis domain={[0, 100]} tick={{ fontSize: 9 }} stroke={darkMode ? '#64748b' : '#94a3b8'} />
                    <Tooltip contentStyle={tooltipStyle} />
                    <Bar dataKey="coverage" fill="#22D3EE" radius={[4, 4, 0, 0]} name="Coverage %" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-5">
              <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
                <Brain className="w-4 h-4 text-purple-500" />Counselling Sessions by Type
              </h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={counsellingSessions}>
                    <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'} />
                    <XAxis dataKey="counsellor" tick={{ fontSize: 7 }} stroke={darkMode ? '#64748b' : '#94a3b8'} />
                    <YAxis tick={{ fontSize: 9 }} stroke={darkMode ? '#64748b' : '#94a3b8'} />
                    <Tooltip contentStyle={tooltipStyle} />
                    <Legend iconType="circle" wrapperStyle={{ fontSize: '9px' }} />
                    <Bar dataKey="academic" stackId="a" fill="#0A1628" name="Academic" />
                    <Bar dataKey="behavioral" stackId="a" fill="#22D3EE" name="Behavioral" />
                    <Bar dataKey="career" stackId="a" fill="#C8A45C" name="Career" />
                    <Bar dataKey="personal" stackId="a" fill="#8B5CF6" name="Personal" />
                    <Bar dataKey="family" stackId="a" fill="#EF4444" name="Family" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}

      {/* ═══════════════ MEDICAL RECORDS TAB ═══════════════ */}
      {activeTab === 'medical' && (
        <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
              <Stethoscope className="w-4 h-4 text-birla-cyan" />Medical Records
            </h3>
            <button onClick={() => { setActiveTab('forms'); setActiveForm('medicalRecord') }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg gradient-birla text-white text-xs font-medium">
              <Plus className="w-3.5 h-3.5" />New Record
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2 px-3 font-medium text-muted-foreground">Student</th>
                  <th className="text-left py-2 px-3 font-medium text-muted-foreground">BSP ID</th>
                  <th className="text-left py-2 px-3 font-medium text-muted-foreground">PEN No</th>
                  <th className="text-left py-2 px-3 font-medium text-muted-foreground">Uppar ID</th>
                  <th className="text-left py-2 px-3 font-medium text-muted-foreground">Blood Group</th>
                  <th className="text-left py-2 px-3 font-medium text-muted-foreground">Height</th>
                  <th className="text-left py-2 px-3 font-medium text-muted-foreground">Weight</th>
                  <th className="text-left py-2 px-3 font-medium text-muted-foreground">Last Checkup</th>
                </tr>
              </thead>
              <tbody>
                {medicalRecordsData.map((r, i) => (
                  <tr key={i} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                    <td className="py-2 px-3 font-medium">{r.name}</td>
                    <td className="py-2 px-3 text-birla-cyan">{r.bspId}</td>
                    <td className="py-2 px-3 text-birla-gold">{r.penNo}</td>
                    <td className="py-2 px-3 text-purple-500">{r.upparId}</td>
                    <td className="py-2 px-3"><span className="px-2 py-0.5 rounded-full bg-red-500/10 text-red-600 dark:text-red-400 text-[10px] font-medium">{r.bloodGroup}</span></td>
                    <td className="py-2 px-3">{r.height}</td>
                    <td className="py-2 px-3">{r.weight}</td>
                    <td className="py-2 px-3">{r.lastCheckup}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      )}

      {/* ═══════════════ VACCINATION TAB ═══════════════ */}
      {activeTab === 'vaccination' && (
        <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
              <Syringe className="w-4 h-4 text-birla-cyan" />Vaccination Records
            </h3>
            <button onClick={() => { setActiveTab('forms'); setActiveForm('vaccinationRecord') }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg gradient-birla text-white text-xs font-medium">
              <Plus className="w-3.5 h-3.5" />New Record
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2 px-3 font-medium text-muted-foreground">Student</th>
                  <th className="text-left py-2 px-3 font-medium text-muted-foreground">BSP ID</th>
                  <th className="text-left py-2 px-3 font-medium text-muted-foreground">PEN No</th>
                  <th className="text-left py-2 px-3 font-medium text-muted-foreground">Uppar ID</th>
                  <th className="text-left py-2 px-3 font-medium text-muted-foreground">Vaccine</th>
                  <th className="text-left py-2 px-3 font-medium text-muted-foreground">Dose</th>
                  <th className="text-left py-2 px-3 font-medium text-muted-foreground">Date</th>
                  <th className="text-left py-2 px-3 font-medium text-muted-foreground">Next Due</th>
                </tr>
              </thead>
              <tbody>
                {vaccinationRecords.map((v, i) => (
                  <tr key={i} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                    <td className="py-2 px-3 font-medium">{v.name}</td>
                    <td className="py-2 px-3 text-birla-cyan">{v.bspId}</td>
                    <td className="py-2 px-3 text-birla-gold">{v.penNo}</td>
                    <td className="py-2 px-3 text-purple-500">{v.upparId}</td>
                    <td className="py-2 px-3">{v.vaccine}</td>
                    <td className="py-2 px-3">{v.dose}</td>
                    <td className="py-2 px-3">{v.date}</td>
                    <td className="py-2 px-3">{v.nextDue}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      )}

      {/* ═══════════════ COUNSELLING TAB ═══════════════ */}
      {activeTab === 'counselling' && (
        <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
              <Brain className="w-4 h-4 text-purple-500" />Counselling Appointments
            </h3>
            <button onClick={() => { setActiveTab('forms'); setActiveForm('counsellingAppt') }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg gradient-birla text-white text-xs font-medium">
              <Plus className="w-3.5 h-3.5" />New Appointment
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2 px-3 font-medium text-muted-foreground">Student</th>
                  <th className="text-left py-2 px-3 font-medium text-muted-foreground">BSP ID</th>
                  <th className="text-left py-2 px-3 font-medium text-muted-foreground">PEN No</th>
                  <th className="text-left py-2 px-3 font-medium text-muted-foreground">Uppar ID</th>
                  <th className="text-left py-2 px-3 font-medium text-muted-foreground">Counsellor</th>
                  <th className="text-left py-2 px-3 font-medium text-muted-foreground">Type</th>
                  <th className="text-left py-2 px-3 font-medium text-muted-foreground">Date</th>
                  <th className="text-left py-2 px-3 font-medium text-muted-foreground">Status</th>
                </tr>
              </thead>
              <tbody>
                {counsellingData.map((c, i) => (
                  <tr key={i} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                    <td className="py-2 px-3 font-medium">{c.student}</td>
                    <td className="py-2 px-3 text-birla-cyan">{c.bspId}</td>
                    <td className="py-2 px-3 text-birla-gold">{c.penNo}</td>
                    <td className="py-2 px-3 text-purple-500">{c.upparId}</td>
                    <td className="py-2 px-3">{c.counsellor}</td>
                    <td className="py-2 px-3">{c.type}</td>
                    <td className="py-2 px-3">{c.date}</td>
                    <td className="py-2 px-3">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${
                        c.status === 'Completed' ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' : 'bg-amber-500/10 text-amber-600 dark:text-amber-400'
                      }`}>{c.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      )}

      {/* ═══════════════ FORMS TAB ═══════════════ */}
      {activeTab === 'forms' && (
        <motion.div variants={itemVariants} className="space-y-6">

          {/* ─── QR Scan Entry Section (Top of Forms) ──────────────── */}
          <motion.div variants={itemVariants} className="rounded-2xl border-2 border-dashed border-birla-cyan/40 bg-birla-cyan/5 p-6">
            <div className="flex items-center gap-2 mb-4">
              <QrCode className="w-5 h-5 text-birla-cyan" />
              <h3 className="text-base font-semibold text-foreground">QR Scan Entry</h3>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-birla-cyan/10 text-birla-cyan font-medium">Pre-fill all forms</span>
            </div>
            <p className="text-xs text-muted-foreground mb-4">
              Scan a student ID card QR code or search by name/ID to auto-fill student details across all health forms below.
            </p>
            <QRStudentLookup
              onStudentSelect={handleQrPrefill}
              placeholder="Scan QR or enter Student ID / Name / BSP ID to pre-fill all forms"
              showDetails={true}
              label=""
            />
            {qrPrefillStudent && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-3 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20"
              >
                <p className="text-xs text-emerald-600 dark:text-emerald-400 font-medium flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Student pre-filled: {qrPrefillStudent.name} — All health forms now have this student&apos;s details
                </p>
              </motion.div>
            )}
          </motion.div>

          {/* Form Selector */}
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

          {/* 1. Medical Record Form - WITH QRStudentLookup */}
          {activeForm === 'medicalRecord' && (
            <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-6">
              <h3 className="text-base font-semibold text-foreground flex items-center gap-2 mb-6">
                <Stethoscope className="w-5 h-5 text-emerald-500" />Medical Record Form
              </h3>

              {/* QR Student Lookup */}
              <div className="mb-6 p-4 rounded-xl border border-emerald-500/20 bg-emerald-500/5">
                <div className="flex items-center gap-2 mb-3">
                  <QrCode className="w-4 h-4 text-emerald-500" />
                  <span className="text-sm font-semibold text-foreground">Student Identification</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-medium">Scan QR from Student ID Card</span>
                </div>
                <QRStudentLookup
                  onStudentSelect={handleMedicalRecordSelect}
                  label=""
                  placeholder="Scan QR or enter Student ID / Name / BSP ID"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className={formGroupClass}>
                  <label className={labelClass}>Student Name *</label>
                  <input type="text" placeholder="Auto-filled via QR or enter manually" value={medicalRecordData.student}
                    onChange={(e) => setMedicalRecordData({ ...medicalRecordData, student: e.target.value })} className={inputClass} />
                </div>
                <div className={formGroupClass}>
                  <label className={labelClass}>BSP ID (UDISE+)</label>
                  <input type="text" placeholder="Auto-filled via QR" value={medicalRecordData.bspId}
                    onChange={(e) => setMedicalRecordData({ ...medicalRecordData, bspId: e.target.value })} className={inputClass} />
                </div>
                <div className={formGroupClass}>
                  <label className={labelClass}>PEN No</label>
                  <input type="text" placeholder="Auto-filled via QR" value={medicalRecordData.penNo}
                    onChange={(e) => setMedicalRecordData({ ...medicalRecordData, penNo: e.target.value })} className={inputClass} />
                </div>
                <div className={formGroupClass}>
                  <label className={labelClass}>Uppar ID</label>
                  <input type="text" placeholder="Auto-filled via QR" value={medicalRecordData.upparId}
                    onChange={(e) => setMedicalRecordData({ ...medicalRecordData, upparId: e.target.value })} className={inputClass} />
                </div>
                <div className={formGroupClass}>
                  <label className={labelClass}>Height (cm)</label>
                  <input type="text" placeholder="e.g. 155" value={medicalRecordData.height}
                    onChange={(e) => setMedicalRecordData({ ...medicalRecordData, height: e.target.value })} className={inputClass} />
                </div>
                <div className={formGroupClass}>
                  <label className={labelClass}>Weight (kg)</label>
                  <input type="text" placeholder="e.g. 45" value={medicalRecordData.weight}
                    onChange={(e) => setMedicalRecordData({ ...medicalRecordData, weight: e.target.value })} className={inputClass} />
                </div>
                <div className={formGroupClass}>
                  <label className={labelClass}>Blood Group</label>
                  <select value={medicalRecordData.bloodGroup} onChange={(e) => setMedicalRecordData({ ...medicalRecordData, bloodGroup: e.target.value })} className={inputClass}>
                    <option value="">Select</option>
                    {bloodGroups.map((b) => <option key={b} value={b}>{b}</option>)}
                  </select>
                </div>
                <div className={formGroupClass}>
                  <label className={labelClass}>Vision (Left)</label>
                  <input type="text" placeholder="e.g. 6/6" value={medicalRecordData.visionLeft}
                    onChange={(e) => setMedicalRecordData({ ...medicalRecordData, visionLeft: e.target.value })} className={inputClass} />
                </div>
                <div className={formGroupClass}>
                  <label className={labelClass}>Vision (Right)</label>
                  <input type="text" placeholder="e.g. 6/6" value={medicalRecordData.visionRight}
                    onChange={(e) => setMedicalRecordData({ ...medicalRecordData, visionRight: e.target.value })} className={inputClass} />
                </div>
                <div className={formGroupClass}>
                  <label className={labelClass}>Hearing</label>
                  <input type="text" placeholder="e.g. Normal" value={medicalRecordData.hearing}
                    onChange={(e) => setMedicalRecordData({ ...medicalRecordData, hearing: e.target.value })} className={inputClass} />
                </div>
                <div className={formGroupClass}>
                  <label className={labelClass}>Allergies</label>
                  <input type="text" placeholder="e.g. Dust, Penicillin" value={medicalRecordData.allergies}
                    onChange={(e) => setMedicalRecordData({ ...medicalRecordData, allergies: e.target.value })} className={inputClass} />
                </div>
                <div className={formGroupClass}>
                  <label className={labelClass}>Chronic Conditions</label>
                  <input type="text" placeholder="e.g. Asthma, Diabetes" value={medicalRecordData.chronicConditions}
                    onChange={(e) => setMedicalRecordData({ ...medicalRecordData, chronicConditions: e.target.value })} className={inputClass} />
                </div>
                <div className={formGroupClass}>
                  <label className={labelClass}>Medications</label>
                  <input type="text" placeholder="Current medications" value={medicalRecordData.medications}
                    onChange={(e) => setMedicalRecordData({ ...medicalRecordData, medications: e.target.value })} className={inputClass} />
                </div>
                <div className={formGroupClass}>
                  <label className={labelClass}>Emergency Contact</label>
                  <input type="text" placeholder="+91 XXXXX XXXXX" value={medicalRecordData.emergencyContact}
                    onChange={(e) => setMedicalRecordData({ ...medicalRecordData, emergencyContact: e.target.value })} className={inputClass} />
                </div>
                <div className={formGroupClass}>
                  <label className={labelClass}>Doctor Name</label>
                  <select value={medicalRecordData.doctorName} onChange={(e) => setMedicalRecordData({ ...medicalRecordData, doctorName: e.target.value })} className={inputClass}>
                    <option value="">Select Doctor</option>
                    {doctors.map((d) => <option key={d} value={d}>{d}</option>)}
                  </select>
                </div>
                <div className={formGroupClass}>
                  <label className={labelClass}>Last Checkup Date</label>
                  <input type="date" value={medicalRecordData.lastCheckupDate}
                    onChange={(e) => setMedicalRecordData({ ...medicalRecordData, lastCheckupDate: e.target.value })} className={inputClass} />
                </div>
              </div>
              <div className="flex items-center gap-3 mt-6 pt-4 border-t border-border">
                <button onClick={() => handleFormSubmit('Medical Record', medicalRecordData)}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl gradient-birla text-white text-sm font-medium hover:opacity-90 transition-opacity">
                  <Save className="w-4 h-4" />Save Record
                </button>
                <button onClick={() => setMedicalRecordData({ student: '', bspId: '', penNo: '', upparId: '', height: '', weight: '', bloodGroup: '', visionLeft: '', visionRight: '', hearing: '', allergies: '', chronicConditions: '', medications: '', emergencyContact: '', doctorName: '', lastCheckupDate: '' })}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-border text-sm font-medium hover:bg-muted transition-colors">
                  <RotateCcw className="w-4 h-4" />Reset
                </button>
              </div>
            </motion.div>
          )}

          {/* 2. Vaccination Record Form - WITH QRStudentLookup */}
          {activeForm === 'vaccinationRecord' && (
            <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-6">
              <h3 className="text-base font-semibold text-foreground flex items-center gap-2 mb-6">
                <Syringe className="w-5 h-5 text-blue-500" />Vaccination Record Form
              </h3>

              {/* QR Student Lookup */}
              <div className="mb-6 p-4 rounded-xl border border-blue-500/20 bg-blue-500/5">
                <div className="flex items-center gap-2 mb-3">
                  <QrCode className="w-4 h-4 text-blue-500" />
                  <span className="text-sm font-semibold text-foreground">Student Identification</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 font-medium">Scan QR from Student ID Card</span>
                </div>
                <QRStudentLookup
                  onStudentSelect={handleVaccinationSelect}
                  label=""
                  placeholder="Scan QR or enter Student ID / Name / BSP ID"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className={formGroupClass}>
                  <label className={labelClass}>Student Name *</label>
                  <input type="text" placeholder="Auto-filled via QR or enter manually" value={vaccinationData.student}
                    onChange={(e) => setVaccinationData({ ...vaccinationData, student: e.target.value })} className={inputClass} />
                </div>
                <div className={formGroupClass}>
                  <label className={labelClass}>BSP ID (UDISE+)</label>
                  <input type="text" placeholder="Auto-filled via QR" value={vaccinationData.bspId}
                    onChange={(e) => setVaccinationData({ ...vaccinationData, bspId: e.target.value })} className={inputClass} />
                </div>
                <div className={formGroupClass}>
                  <label className={labelClass}>PEN No</label>
                  <input type="text" placeholder="Auto-filled via QR" value={vaccinationData.penNo}
                    onChange={(e) => setVaccinationData({ ...vaccinationData, penNo: e.target.value })} className={inputClass} />
                </div>
                <div className={formGroupClass}>
                  <label className={labelClass}>Uppar ID</label>
                  <input type="text" placeholder="Auto-filled via QR" value={vaccinationData.upparId}
                    onChange={(e) => setVaccinationData({ ...vaccinationData, upparId: e.target.value })} className={inputClass} />
                </div>
                <div className={formGroupClass}>
                  <label className={labelClass}>Vaccine Name *</label>
                  <select value={vaccinationData.vaccineName} onChange={(e) => setVaccinationData({ ...vaccinationData, vaccineName: e.target.value })} className={inputClass}>
                    <option value="">Select Vaccine</option>
                    {vaccineNames.map((v) => <option key={v} value={v}>{v}</option>)}
                  </select>
                </div>
                <div className={formGroupClass}>
                  <label className={labelClass}>Dose Number *</label>
                  <input type="text" placeholder="e.g. 1st, 2nd, Booster" value={vaccinationData.doseNumber}
                    onChange={(e) => setVaccinationData({ ...vaccinationData, doseNumber: e.target.value })} className={inputClass} />
                </div>
                <div className={formGroupClass}>
                  <label className={labelClass}>Date *</label>
                  <input type="date" value={vaccinationData.date}
                    onChange={(e) => setVaccinationData({ ...vaccinationData, date: e.target.value })} className={inputClass} />
                </div>
                <div className={formGroupClass}>
                  <label className={labelClass}>Next Due Date</label>
                  <input type="date" value={vaccinationData.nextDue}
                    onChange={(e) => setVaccinationData({ ...vaccinationData, nextDue: e.target.value })} className={inputClass} />
                </div>
                <div className={formGroupClass}>
                  <label className={labelClass}>Administered By</label>
                  <input type="text" placeholder="Doctor/Nurse name" value={vaccinationData.administeredBy}
                    onChange={(e) => setVaccinationData({ ...vaccinationData, administeredBy: e.target.value })} className={inputClass} />
                </div>
                <div className={formGroupClass}>
                  <label className={labelClass}>Batch Number</label>
                  <input type="text" placeholder="Vaccine batch number" value={vaccinationData.batchNumber}
                    onChange={(e) => setVaccinationData({ ...vaccinationData, batchNumber: e.target.value })} className={inputClass} />
                </div>
                <div className={formGroupClass}>
                  <label className={labelClass}>Side Effects</label>
                  <input type="text" placeholder="e.g. Mild fever, None" value={vaccinationData.sideEffects}
                    onChange={(e) => setVaccinationData({ ...vaccinationData, sideEffects: e.target.value })} className={inputClass} />
                </div>
              </div>
              <div className="flex items-center gap-3 mt-6 pt-4 border-t border-border">
                <button onClick={() => handleFormSubmit('Vaccination Record', vaccinationData)}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl gradient-birla text-white text-sm font-medium hover:opacity-90 transition-opacity">
                  <Save className="w-4 h-4" />Save Record
                </button>
                <button onClick={() => setVaccinationData({ student: '', bspId: '', penNo: '', upparId: '', vaccineName: '', doseNumber: '', date: '', nextDue: '', administeredBy: '', batchNumber: '', sideEffects: '' })}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-border text-sm font-medium hover:bg-muted transition-colors">
                  <RotateCcw className="w-4 h-4" />Reset
                </button>
              </div>
            </motion.div>
          )}

          {/* 3. Counselling Appointment Form - WITH QRStudentLookup */}
          {activeForm === 'counsellingAppt' && (
            <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-6">
              <h3 className="text-base font-semibold text-foreground flex items-center gap-2 mb-6">
                <Brain className="w-5 h-5 text-purple-500" />Counselling Appointment Form
              </h3>

              {/* QR Student Lookup */}
              <div className="mb-6 p-4 rounded-xl border border-purple-500/20 bg-purple-500/5">
                <div className="flex items-center gap-2 mb-3">
                  <QrCode className="w-4 h-4 text-purple-500" />
                  <span className="text-sm font-semibold text-foreground">Student Identification</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 font-medium">Scan QR from Student ID Card</span>
                </div>
                <QRStudentLookup
                  onStudentSelect={handleCounsellingSelect}
                  label=""
                  placeholder="Scan QR or enter Student ID / Name / BSP ID"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className={formGroupClass}>
                  <label className={labelClass}>Student Name *</label>
                  <input type="text" placeholder="Auto-filled via QR or enter manually" value={counsellingData2.student}
                    onChange={(e) => setCounsellingData2({ ...counsellingData2, student: e.target.value })} className={inputClass} />
                </div>
                <div className={formGroupClass}>
                  <label className={labelClass}>BSP ID (UDISE+)</label>
                  <input type="text" placeholder="Auto-filled via QR" value={counsellingData2.bspId}
                    onChange={(e) => setCounsellingData2({ ...counsellingData2, bspId: e.target.value })} className={inputClass} />
                </div>
                <div className={formGroupClass}>
                  <label className={labelClass}>PEN No</label>
                  <input type="text" placeholder="Auto-filled via QR" value={counsellingData2.penNo}
                    onChange={(e) => setCounsellingData2({ ...counsellingData2, penNo: e.target.value })} className={inputClass} />
                </div>
                <div className={formGroupClass}>
                  <label className={labelClass}>Uppar ID</label>
                  <input type="text" placeholder="Auto-filled via QR" value={counsellingData2.upparId}
                    onChange={(e) => setCounsellingData2({ ...counsellingData2, upparId: e.target.value })} className={inputClass} />
                </div>
                <div className={formGroupClass}>
                  <label className={labelClass}>Counsellor *</label>
                  <select value={counsellingData2.counsellor} onChange={(e) => setCounsellingData2({ ...counsellingData2, counsellor: e.target.value })} className={inputClass}>
                    <option value="">Select Counsellor</option>
                    {counsellors.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div className={formGroupClass}>
                  <label className={labelClass}>Date *</label>
                  <input type="date" value={counsellingData2.date}
                    onChange={(e) => setCounsellingData2({ ...counsellingData2, date: e.target.value })} className={inputClass} />
                </div>
                <div className={formGroupClass}>
                  <label className={labelClass}>Time *</label>
                  <input type="time" value={counsellingData2.time}
                    onChange={(e) => setCounsellingData2({ ...counsellingData2, time: e.target.value })} className={inputClass} />
                </div>
                <div className={formGroupClass}>
                  <label className={labelClass}>Type *</label>
                  <select value={counsellingData2.type} onChange={(e) => setCounsellingData2({ ...counsellingData2, type: e.target.value })} className={inputClass}>
                    {counsellingTypes.map((t) => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
                <div className={`${formGroupClass} md:col-span-2`}>
                  <label className={labelClass}>Session Notes</label>
                  <textarea placeholder="Notes from counselling session..." value={counsellingData2.sessionNotes}
                    onChange={(e) => setCounsellingData2({ ...counsellingData2, sessionNotes: e.target.value })} className={inputClass} rows={3} />
                </div>
                <div className={formGroupClass}>
                  <label className={labelClass}>Follow-up Date</label>
                  <input type="date" value={counsellingData2.followUpDate}
                    onChange={(e) => setCounsellingData2({ ...counsellingData2, followUpDate: e.target.value })} className={inputClass} />
                </div>
                <div className={formGroupClass}>
                  <label className={labelClass}>Parent Consent</label>
                  <select value={counsellingData2.parentConsent} onChange={(e) => setCounsellingData2({ ...counsellingData2, parentConsent: e.target.value })} className={inputClass}>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                    <option value="Pending">Pending</option>
                  </select>
                </div>
              </div>
              <div className="flex items-center gap-3 mt-6 pt-4 border-t border-border">
                <button onClick={() => handleFormSubmit('Counselling Appointment', counsellingData2)}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl gradient-birla text-white text-sm font-medium hover:opacity-90 transition-opacity">
                  <Save className="w-4 h-4" />Book Appointment
                </button>
                <button onClick={() => setCounsellingData2({ student: '', bspId: '', penNo: '', upparId: '', counsellor: '', date: '', time: '', type: 'Academic', sessionNotes: '', followUpDate: '', parentConsent: 'Yes' })}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-border text-sm font-medium hover:bg-muted transition-colors">
                  <RotateCcw className="w-4 h-4" />Reset
                </button>
              </div>
            </motion.div>
          )}

          {/* 4. Health Checkup Form - WITH QRStudentLookup */}
          {activeForm === 'healthCheckup' && (
            <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-6">
              <h3 className="text-base font-semibold text-foreground flex items-center gap-2 mb-6">
                <Activity className="w-5 h-5 text-cyan-500" />Health Checkup Form
              </h3>

              {/* QR Student Lookup */}
              <div className="mb-6 p-4 rounded-xl border border-cyan-500/20 bg-cyan-500/5">
                <div className="flex items-center gap-2 mb-3">
                  <QrCode className="w-4 h-4 text-cyan-500" />
                  <span className="text-sm font-semibold text-foreground">Student Identification</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 font-medium">Scan QR from Student ID Card</span>
                </div>
                <QRStudentLookup
                  onStudentSelect={handleCheckupSelect}
                  label=""
                  placeholder="Scan QR or enter Student ID / Name / BSP ID"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className={formGroupClass}>
                  <label className={labelClass}>Student Name *</label>
                  <input type="text" placeholder="Auto-filled via QR or enter manually" value={checkupData.student}
                    onChange={(e) => setCheckupData({ ...checkupData, student: e.target.value })} className={inputClass} />
                </div>
                <div className={formGroupClass}>
                  <label className={labelClass}>BSP ID (UDISE+)</label>
                  <input type="text" placeholder="Auto-filled via QR" value={checkupData.bspId}
                    onChange={(e) => setCheckupData({ ...checkupData, bspId: e.target.value })} className={inputClass} />
                </div>
                <div className={formGroupClass}>
                  <label className={labelClass}>PEN No</label>
                  <input type="text" placeholder="Auto-filled via QR" value={checkupData.penNo}
                    onChange={(e) => setCheckupData({ ...checkupData, penNo: e.target.value })} className={inputClass} />
                </div>
                <div className={formGroupClass}>
                  <label className={labelClass}>Uppar ID</label>
                  <input type="text" placeholder="Auto-filled via QR" value={checkupData.upparId}
                    onChange={(e) => setCheckupData({ ...checkupData, upparId: e.target.value })} className={inputClass} />
                </div>
                <div className={formGroupClass}>
                  <label className={labelClass}>Checkup Type *</label>
                  <select value={checkupData.checkupType} onChange={(e) => setCheckupData({ ...checkupData, checkupType: e.target.value })} className={inputClass}>
                    {checkupTypes.map((t) => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
                <div className={formGroupClass}>
                  <label className={labelClass}>Date *</label>
                  <input type="date" value={checkupData.date}
                    onChange={(e) => setCheckupData({ ...checkupData, date: e.target.value })} className={inputClass} />
                </div>
                <div className={formGroupClass}>
                  <label className={labelClass}>Blood Pressure</label>
                  <input type="text" placeholder="e.g. 120/80" value={checkupData.bp}
                    onChange={(e) => setCheckupData({ ...checkupData, bp: e.target.value })} className={inputClass} />
                </div>
                <div className={formGroupClass}>
                  <label className={labelClass}>Pulse (bpm)</label>
                  <input type="text" placeholder="e.g. 72" value={checkupData.pulse}
                    onChange={(e) => setCheckupData({ ...checkupData, pulse: e.target.value })} className={inputClass} />
                </div>
                <div className={formGroupClass}>
                  <label className={labelClass}>Temperature (°F)</label>
                  <input type="text" placeholder="e.g. 98.6" value={checkupData.temp}
                    onChange={(e) => setCheckupData({ ...checkupData, temp: e.target.value })} className={inputClass} />
                </div>
                <div className={formGroupClass}>
                  <label className={labelClass}>Height (cm)</label>
                  <input type="text" placeholder="e.g. 155" value={checkupData.height}
                    onChange={(e) => setCheckupData({ ...checkupData, height: e.target.value })} className={inputClass} />
                </div>
                <div className={formGroupClass}>
                  <label className={labelClass}>Weight (kg)</label>
                  <input type="text" placeholder="e.g. 45" value={checkupData.weight}
                    onChange={(e) => setCheckupData({ ...checkupData, weight: e.target.value })} className={inputClass} />
                </div>
                <div className={formGroupClass}>
                  <label className={labelClass}>BMI</label>
                  <input type="text" placeholder="Auto-calculated" value={checkupData.bmi}
                    onChange={(e) => setCheckupData({ ...checkupData, bmi: e.target.value })} className={inputClass} />
                </div>
                <div className={`${formGroupClass} md:col-span-2`}>
                  <label className={labelClass}>Doctor Remarks</label>
                  <textarea placeholder="Doctor observations and remarks..." value={checkupData.doctorRemarks}
                    onChange={(e) => setCheckupData({ ...checkupData, doctorRemarks: e.target.value })} className={inputClass} rows={2} />
                </div>
                <div className={formGroupClass}>
                  <label className={labelClass}>Referred To</label>
                  <input type="text" placeholder="Specialist/Hospital name" value={checkupData.referredTo}
                    onChange={(e) => setCheckupData({ ...checkupData, referredTo: e.target.value })} className={inputClass} />
                </div>
                <div className={formGroupClass}>
                  <label className={labelClass}>Follow-up Required</label>
                  <select value={checkupData.followUpRequired} onChange={(e) => setCheckupData({ ...checkupData, followUpRequired: e.target.value })} className={inputClass}>
                    <option value="No">No</option>
                    <option value="Yes">Yes</option>
                  </select>
                </div>
              </div>
              <div className="flex items-center gap-3 mt-6 pt-4 border-t border-border">
                <button onClick={() => handleFormSubmit('Health Checkup', checkupData)}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl gradient-birla text-white text-sm font-medium hover:opacity-90 transition-opacity">
                  <Save className="w-4 h-4" />Save Checkup
                </button>
                <button onClick={() => setCheckupData({ student: '', bspId: '', penNo: '', upparId: '', checkupType: 'Annual', date: '', bp: '', pulse: '', temp: '', height: '', weight: '', bmi: '', doctorRemarks: '', referredTo: '', followUpRequired: 'No' })}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-border text-sm font-medium hover:bg-muted transition-colors">
                  <RotateCcw className="w-4 h-4" />Reset
                </button>
              </div>
            </motion.div>
          )}

          {/* 5. Emergency Alert Form - WITH QRStudentLookup */}
          {activeForm === 'emergencyAlert' && (
            <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-6">
              <h3 className="text-base font-semibold text-foreground flex items-center gap-2 mb-6">
                <AlertTriangle className="w-5 h-5 text-red-500" />Emergency Alert Form
              </h3>

              {/* QR Student Lookup */}
              <div className="mb-6 p-4 rounded-xl border border-red-500/20 bg-red-500/5">
                <div className="flex items-center gap-2 mb-3">
                  <QrCode className="w-4 h-4 text-red-500" />
                  <span className="text-sm font-semibold text-foreground">Student Identification</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-red-500/10 text-red-600 dark:text-red-400 font-medium">Emergency — Scan QR from Student ID Card</span>
                </div>
                <QRStudentLookup
                  onStudentSelect={handleEmergencySelect}
                  label=""
                  placeholder="Scan QR or enter Student ID / Name / BSP ID — URGENT"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className={formGroupClass}>
                  <label className={labelClass}>Student Name *</label>
                  <input type="text" placeholder="Auto-filled via QR or enter manually" value={emergencyData.student}
                    onChange={(e) => setEmergencyData({ ...emergencyData, student: e.target.value })} className={inputClass} />
                </div>
                <div className={formGroupClass}>
                  <label className={labelClass}>BSP ID (UDISE+)</label>
                  <input type="text" placeholder="Auto-filled via QR" value={emergencyData.bspId}
                    onChange={(e) => setEmergencyData({ ...emergencyData, bspId: e.target.value })} className={inputClass} />
                </div>
                <div className={formGroupClass}>
                  <label className={labelClass}>PEN No</label>
                  <input type="text" placeholder="Auto-filled via QR" value={emergencyData.penNo}
                    onChange={(e) => setEmergencyData({ ...emergencyData, penNo: e.target.value })} className={inputClass} />
                </div>
                <div className={formGroupClass}>
                  <label className={labelClass}>Uppar ID</label>
                  <input type="text" placeholder="Auto-filled via QR" value={emergencyData.upparId}
                    onChange={(e) => setEmergencyData({ ...emergencyData, upparId: e.target.value })} className={inputClass} />
                </div>
                <div className={formGroupClass}>
                  <label className={labelClass}>Emergency Type *</label>
                  <select value={emergencyData.emergencyType} onChange={(e) => setEmergencyData({ ...emergencyData, emergencyType: e.target.value })} className={inputClass}>
                    {emergencyTypes.map((t) => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
                <div className={`${formGroupClass} md:col-span-2`}>
                  <label className={labelClass}>Description *</label>
                  <textarea placeholder="Describe the emergency..." value={emergencyData.description}
                    onChange={(e) => setEmergencyData({ ...emergencyData, description: e.target.value })} className={inputClass} rows={2} />
                </div>
                <div className={formGroupClass}>
                  <label className={labelClass}>Severity *</label>
                  <select value={emergencyData.severity} onChange={(e) => setEmergencyData({ ...emergencyData, severity: e.target.value })} className={inputClass}>
                    {severities.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <div className={formGroupClass}>
                  <label className={labelClass}>Location</label>
                  <input type="text" placeholder="e.g. Class X-A, Playground" value={emergencyData.location}
                    onChange={(e) => setEmergencyData({ ...emergencyData, location: e.target.value })} className={inputClass} />
                </div>
                <div className={formGroupClass}>
                  <label className={labelClass}>Contacted Parents</label>
                  <select value={emergencyData.contactedParents} onChange={(e) => setEmergencyData({ ...emergencyData, contactedParents: e.target.value })} className={inputClass}>
                    <option value="No">No</option>
                    <option value="Yes">Yes</option>
                  </select>
                </div>
                <div className={formGroupClass}>
                  <label className={labelClass}>Ambulance Called</label>
                  <select value={emergencyData.ambulanceCalled} onChange={(e) => setEmergencyData({ ...emergencyData, ambulanceCalled: e.target.value })} className={inputClass}>
                    <option value="No">No</option>
                    <option value="Yes">Yes</option>
                  </select>
                </div>
                <div className={`${formGroupClass} md:col-span-2`}>
                  <label className={labelClass}>Action Taken</label>
                  <textarea placeholder="Describe actions taken..." value={emergencyData.actionTaken}
                    onChange={(e) => setEmergencyData({ ...emergencyData, actionTaken: e.target.value })} className={inputClass} rows={2} />
                </div>
              </div>
              <div className="flex items-center gap-3 mt-6 pt-4 border-t border-border">
                <button onClick={() => handleFormSubmit('Emergency Alert', emergencyData)}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-red-600 text-white text-sm font-medium hover:opacity-90 transition-opacity">
                  <AlertTriangle className="w-4 h-4" />Raise Emergency Alert
                </button>
                <button onClick={() => setEmergencyData({ student: '', bspId: '', penNo: '', upparId: '', emergencyType: 'Medical', description: '', severity: 'Medium', location: '', contactedParents: 'No', ambulanceCalled: 'No', actionTaken: '' })}
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

          {/* 1. Vaccination Coverage Report */}
          {activeReport === 'vaccination' && (
            <motion.div variants={itemVariants} className="space-y-4">
              <div className="rounded-2xl border border-border bg-card p-5">
                <h3 className="text-sm font-semibold text-foreground mb-4">Vaccine-wise Coverage</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left py-2 px-3 font-medium text-muted-foreground">Vaccine</th>
                        <th className="text-left py-2 px-3 font-medium text-muted-foreground">Total Students</th>
                        <th className="text-left py-2 px-3 font-medium text-muted-foreground">Vaccinated</th>
                        <th className="text-left py-2 px-3 font-medium text-muted-foreground">Coverage %</th>
                      </tr>
                    </thead>
                    <tbody>
                      {vaccinationCoverage.map((v, i) => (
                        <tr key={i} className="border-b border-border/50">
                          <td className="py-2 px-3 font-medium">{v.vaccine}</td>
                          <td className="py-2 px-3">{v.total}</td>
                          <td className="py-2 px-3">{v.vaccinated}</td>
                          <td className="py-2 px-3">
                            <div className="flex items-center gap-2">
                              <div className="w-20 h-1.5 bg-muted rounded-full overflow-hidden">
                                <div className={`h-full rounded-full ${v.coverage >= 90 ? 'bg-emerald-500' : v.coverage >= 75 ? 'bg-amber-500' : 'bg-red-500'}`} style={{ width: `${v.coverage}%` }} />
                              </div>
                              <span className={v.coverage >= 90 ? 'text-emerald-600 dark:text-emerald-400' : v.coverage >= 75 ? 'text-amber-600 dark:text-amber-400' : 'text-red-600 dark:text-red-400'}>{v.coverage}%</span>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="rounded-2xl border border-border bg-card p-5">
                <h3 className="text-sm font-semibold text-foreground mb-4">Vaccination Coverage Chart</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={vaccinationCoverage}>
                      <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'} />
                      <XAxis dataKey="vaccine" tick={{ fontSize: 8 }} stroke={darkMode ? '#64748b' : '#94a3b8'} />
                      <YAxis domain={[0, 100]} tick={{ fontSize: 9 }} stroke={darkMode ? '#64748b' : '#94a3b8'} />
                      <Tooltip contentStyle={tooltipStyle} />
                      <Bar dataKey="coverage" fill="#22D3EE" radius={[4, 4, 0, 0]} name="Coverage %" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </motion.div>
          )}

          {/* 2. Health Checkup Summary Report */}
          {activeReport === 'checkup' && (
            <motion.div variants={itemVariants} className="space-y-4">
              <div className="rounded-2xl border border-border bg-card p-5">
                <h3 className="text-sm font-semibold text-foreground mb-4">Class-wise Health Summary</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left py-2 px-3 font-medium text-muted-foreground">Class</th>
                        <th className="text-left py-2 px-3 font-medium text-muted-foreground">Total</th>
                        <th className="text-left py-2 px-3 font-medium text-muted-foreground">Healthy</th>
                        <th className="text-left py-2 px-3 font-medium text-muted-foreground">Follow-up</th>
                        <th className="text-left py-2 px-3 font-medium text-muted-foreground">Referred</th>
                      </tr>
                    </thead>
                    <tbody>
                      {healthCheckupSummary.map((h, i) => (
                        <tr key={i} className="border-b border-border/50">
                          <td className="py-2 px-3 font-medium">{h.class}</td>
                          <td className="py-2 px-3">{h.total}</td>
                          <td className="py-2 px-3 text-emerald-600 dark:text-emerald-400">{h.healthy}</td>
                          <td className="py-2 px-3 text-amber-600 dark:text-amber-400">{h.followUp}</td>
                          <td className="py-2 px-3 text-red-600 dark:text-red-400">{h.referred}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="rounded-2xl border border-border bg-card p-5">
                <h3 className="text-sm font-semibold text-foreground mb-4">Health Status Distribution</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={[
                        { name: 'Healthy', value: healthCheckupSummary.reduce((a, b) => a + b.healthy, 0), color: '#10B981' },
                        { name: 'Follow-up', value: healthCheckupSummary.reduce((a, b) => a + b.followUp, 0), color: '#F59E0B' },
                        { name: 'Referred', value: healthCheckupSummary.reduce((a, b) => a + b.referred, 0), color: '#EF4444' },
                      ]} cx="50%" cy="50%" innerRadius={50} outerRadius={90} dataKey="value" nameKey="name" paddingAngle={3} label>
                        {[{ color: '#10B981' }, { color: '#F59E0B' }, { color: '#EF4444' }].map((entry, idx) => <Cell key={idx} fill={entry.color} />)}
                      </Pie>
                      <Tooltip contentStyle={tooltipStyle} />
                      <Legend iconType="circle" wrapperStyle={{ fontSize: '10px' }} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </motion.div>
          )}

          {/* 3. Counselling Session Report */}
          {activeReport === 'counsellingReport' && (
            <motion.div variants={itemVariants} className="space-y-4">
              <div className="rounded-2xl border border-border bg-card p-5">
                <h3 className="text-sm font-semibold text-foreground mb-4">Counsellor-wise Sessions</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left py-2 px-3 font-medium text-muted-foreground">Counsellor</th>
                        <th className="text-left py-2 px-3 font-medium text-muted-foreground">Total Sessions</th>
                        <th className="text-left py-2 px-3 font-medium text-muted-foreground">Academic</th>
                        <th className="text-left py-2 px-3 font-medium text-muted-foreground">Behavioral</th>
                        <th className="text-left py-2 px-3 font-medium text-muted-foreground">Career</th>
                        <th className="text-left py-2 px-3 font-medium text-muted-foreground">Personal</th>
                        <th className="text-left py-2 px-3 font-medium text-muted-foreground">Family</th>
                      </tr>
                    </thead>
                    <tbody>
                      {counsellingSessions.map((c, i) => (
                        <tr key={i} className="border-b border-border/50">
                          <td className="py-2 px-3 font-medium">{c.counsellor}</td>
                          <td className="py-2 px-3">{c.sessions}</td>
                          <td className="py-2 px-3">{c.academic}</td>
                          <td className="py-2 px-3">{c.behavioral}</td>
                          <td className="py-2 px-3">{c.career}</td>
                          <td className="py-2 px-3">{c.personal}</td>
                          <td className="py-2 px-3">{c.family}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="rounded-2xl border border-border bg-card p-5">
                <h3 className="text-sm font-semibold text-foreground mb-4">Session Type Distribution</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={counsellingSessions}>
                      <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'} />
                      <XAxis dataKey="counsellor" tick={{ fontSize: 7 }} stroke={darkMode ? '#64748b' : '#94a3b8'} />
                      <YAxis tick={{ fontSize: 9 }} stroke={darkMode ? '#64748b' : '#94a3b8'} />
                      <Tooltip contentStyle={tooltipStyle} />
                      <Legend iconType="circle" wrapperStyle={{ fontSize: '9px' }} />
                      <Bar dataKey="academic" fill="#0A1628" name="Academic" />
                      <Bar dataKey="behavioral" fill="#22D3EE" name="Behavioral" />
                      <Bar dataKey="career" fill="#C8A45C" name="Career" />
                      <Bar dataKey="personal" fill="#8B5CF6" name="Personal" />
                      <Bar dataKey="family" fill="#EF4444" name="Family" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </motion.div>
          )}

          {/* 4. Allergy & Condition Report */}
          {activeReport === 'allergy' && (
            <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-5">
              <h3 className="text-sm font-semibold text-foreground mb-4">Allergy & Condition Report</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-2 px-3 font-medium text-muted-foreground">Condition</th>
                      <th className="text-left py-2 px-3 font-medium text-muted-foreground">Student Count</th>
                      <th className="text-left py-2 px-3 font-medium text-muted-foreground">Sample Students (with BSP ID / PEN No / Uppar ID)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allergyConditionData.map((a, i) => (
                      <tr key={i} className="border-b border-border/50">
                        <td className="py-2 px-3 font-medium">{a.condition}</td>
                        <td className="py-2 px-3">
                          <span className="px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 text-[10px] font-medium">{a.count}</span>
                        </td>
                        <td className="py-2 px-3 text-muted-foreground">{a.students.join(', ')}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}

          {/* 5. Wellness Score Report */}
          {activeReport === 'wellness' && (
            <motion.div variants={itemVariants} className="space-y-4">
              <div className="rounded-2xl border border-border bg-card p-5">
                <h3 className="text-sm font-semibold text-foreground mb-4">Class-wise Wellness Scores</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left py-2 px-3 font-medium text-muted-foreground">Class</th>
                        <th className="text-left py-2 px-3 font-medium text-muted-foreground">Physical</th>
                        <th className="text-left py-2 px-3 font-medium text-muted-foreground">Mental</th>
                        <th className="text-left py-2 px-3 font-medium text-muted-foreground">Social</th>
                        <th className="text-left py-2 px-3 font-medium text-muted-foreground">Emotional</th>
                        <th className="text-left py-2 px-3 font-medium text-muted-foreground">Academic</th>
                      </tr>
                    </thead>
                    <tbody>
                      {wellnessScores.map((w, i) => (
                        <tr key={i} className="border-b border-border/50">
                          <td className="py-2 px-3 font-medium">{w.class}</td>
                          <td className="py-2 px-3">{w.physical}</td>
                          <td className="py-2 px-3">{w.mental}</td>
                          <td className="py-2 px-3">{w.social}</td>
                          <td className="py-2 px-3">{w.emotional}</td>
                          <td className="py-2 px-3">{w.academic}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="rounded-2xl border border-border bg-card p-5">
                <h3 className="text-sm font-semibold text-foreground mb-4">Wellness Radar</h3>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart data={wellnessScores}>
                      <PolarGrid stroke={darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'} />
                      <PolarAngleAxis dataKey="class" tick={{ fontSize: 10, fill: darkMode ? '#94a3b8' : '#64748b' }} />
                      <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fontSize: 8 }} />
                      <Radar name="Physical" dataKey="physical" stroke="#22D3EE" fill="#22D3EE" fillOpacity={0.15} />
                      <Radar name="Mental" dataKey="mental" stroke="#8B5CF6" fill="#8B5CF6" fillOpacity={0.15} />
                      <Radar name="Social" dataKey="social" stroke="#C8A45C" fill="#C8A45C" fillOpacity={0.15} />
                      <Tooltip contentStyle={tooltipStyle} />
                      <Legend iconType="circle" wrapperStyle={{ fontSize: '10px' }} />
                    </RadarChart>
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
