import { useState, useCallback, Fragment } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FileText, BarChart3, Activity, GraduationCap, TrendingUp, Calendar, Users, Plus, X, Shield, Award, BookOpen, CheckCircle2, Target, Brain, ClipboardList, Star, ArrowUpRight, PieChart as PieChartIcon, Clock, MapPin, PenLine, Zap, Trophy, AlertCircle, Hash, Save, FileCheck, UserCheck, ListChecks, Palette, Printer, Stamp, Signature, QrCode, ScanLine, TableProperties, FileSpreadsheet, Download, Upload, AlertTriangle, RotateCcw, Send, FileDown, XCircle } from 'lucide-react'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Legend, PieChart, Pie, Cell,
  LineChart, Line, RadarChart, Radar, PolarGrid,
  PolarAngleAxis, PolarRadiusAxis, AreaChart, Area
} from 'recharts'
import useAppStore from '../../../store/useAppStore'
import QRStudentLookup, { STUDENT_DB } from '../shared/QRStudentLookup'

const containerVariants = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.06 } } }
const itemVariants = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } } }

const CHART_COLORS = ['#1A2D4A', '#22D3EE', '#C8A45C', '#8B5CF6', '#10B981', '#EF4444', '#F59E0B']
const subjects = ['English', 'Hindi', 'Mathematics', 'Science', 'Social Science', 'Computer Science']
const classes = ['I','II','III','IV','V','VI','VII','VIII','IX','X','XI','XII']
const sections = ['A','B','C']
const examTypes = ['Unit Test 1', 'Unit Test 2', 'Periodic Test 1', 'Periodic Test 2', 'Half Yearly', 'Annual', '1st Summative', '2nd Summative', '3rd Summative', 'Pre-Board']
const terms = ['Term 1 (Apr-Sep)', 'Term 2 (Oct-Mar)', 'Full Year']
const tcConduct = ['Excellent', 'Very Good', 'Good', 'Satisfactory']
const tcProgress = ['Excellent', 'Very Good', 'Good', 'Average', 'Below Average']

const getCBSEGrade = (marks) => {
  if (marks >= 91) return 'A1'; if (marks >= 81) return 'A2'; if (marks >= 71) return 'B1'
  if (marks >= 61) return 'B2'; if (marks >= 51) return 'C1'; if (marks >= 41) return 'C2'
  if (marks >= 33) return 'D'; return 'E'
}
const getGradeColor = (g) => ({ A1:'#10B981',A2:'#22D3EE',B1:'#C8A45C',B2:'#8B5CF6',C1:'#F59E0B',C2:'#EF4444',D:'#DC2626',E:'#991B1B' }[g] || '#64748b')
const getCompetencyLevel = (m) => m >= 85 ? 'Advanced' : m >= 70 ? 'Proficient' : m >= 55 ? 'Developing' : m >= 33 ? 'Beginning' : 'Needs Improvement'

const examResultsData = [
  { subject: 'Mathematics', appeared: 45, passed: 38, avg: 72, highest: 98, lowest: 28 },
  { subject: 'Science', appeared: 45, passed: 35, avg: 68, highest: 95, lowest: 25 },
  { subject: 'English', appeared: 45, passed: 40, avg: 75, highest: 96, lowest: 32 },
  { subject: 'Hindi', appeared: 45, passed: 36, avg: 70, highest: 92, lowest: 30 },
  { subject: 'Social Science', appeared: 45, passed: 37, avg: 71, highest: 94, lowest: 27 },
  { subject: 'Computer', appeared: 45, passed: 42, avg: 78, highest: 99, lowest: 40 },
]
const cbseGradingData = [
  { grade: 'A1', count: 12, range: '91-100', color: '#10B981' },
  { grade: 'A2', count: 18, range: '81-90', color: '#22D3EE' },
  { grade: 'B1', count: 22, range: '71-80', color: '#C8A45C' },
  { grade: 'B2', count: 28, range: '61-70', color: '#8B5CF6' },
  { grade: 'C1', count: 15, range: '51-60', color: '#F59E0B' },
  { grade: 'C2', count: 8, range: '41-50', color: '#EF4444' },
  { grade: 'D', count: 5, range: '33-40', color: '#DC2626' },
  { grade: 'E', count: 2, range: '0-32', color: '#991B1B' },
]
const examScheduleData = [
  { exam: 'Unit Test 1', subject: 'Mathematics', class: 'X', date: '2026-04-15', time: '8:00 AM', duration: '1.5 hrs', room: 'Room 101', invigilator: 'Dr. Priya Menon' },
  { exam: 'Unit Test 1', subject: 'Science', class: 'X', date: '2026-04-16', time: '8:00 AM', duration: '1.5 hrs', room: 'Lab 3', invigilator: 'Mr. Suresh Patel' },
  { exam: 'Periodic 1', subject: 'English', class: 'IX', date: '2026-04-18', time: '9:00 AM', duration: '2 hrs', room: 'Hall A', invigilator: 'Ms. Anita Desai' },
  { exam: 'Half Yearly', subject: 'Mathematics', class: 'X', date: '2026-05-10', time: '8:00 AM', duration: '3 hrs', room: 'Hall B', invigilator: 'Dr. Priya Menon' },
]
const termComparisonData = [
  { subject: 'Mathematics', term1: 70, term2: 76 }, { subject: 'Science', term1: 65, term2: 72 },
  { subject: 'English', term1: 72, term2: 78 }, { subject: 'Hindi', term1: 68, term2: 72 },
  { subject: 'Social Science', term1: 66, term2: 71 }, { subject: 'Computer', term1: 74, term2: 80 },
]

// Cumulative marksheet mock data - term-wise marks for each subject
const cumulativeData = {
  student: STUDENT_DB[0],
  academicYear: '2025-26',
  terms: [
    { name: '1st Summative', subjects: [
      { subject: 'English', theoryMax: 80, theoryObt: 64, iaMax: 20, iaObt: 15, total: 79 },
      { subject: 'Hindi', theoryMax: 80, theoryObt: 52, iaMax: 20, iaObt: 13, total: 65 },
      { subject: 'Mathematics', theoryMax: 80, theoryObt: 68, iaMax: 20, iaObt: 11, total: 79 },
      { subject: 'Science', theoryMax: 80, theoryObt: 60, iaMax: 20, iaObt: 14, total: 74 },
      { subject: 'Social Science', theoryMax: 80, theoryObt: 56, iaMax: 20, iaObt: 15, total: 71 },
      { subject: 'Computer Science', theoryMax: 70, theoryObt: 58, iaMax: 30, iaObt: 24, total: 82 },
    ]},
    { name: '2nd Summative', subjects: [
      { subject: 'English', theoryMax: 80, theoryObt: 70, iaMax: 20, iaObt: 17, total: 87 },
      { subject: 'Hindi', theoryMax: 80, theoryObt: 58, iaMax: 20, iaObt: 14, total: 72 },
      { subject: 'Mathematics', theoryMax: 80, theoryObt: 74, iaMax: 20, iaObt: 13, total: 87 },
      { subject: 'Science', theoryMax: 80, theoryObt: 66, iaMax: 20, iaObt: 16, total: 82 },
      { subject: 'Social Science', theoryMax: 80, theoryObt: 62, iaMax: 20, iaObt: 16, total: 78 },
      { subject: 'Computer Science', theoryMax: 70, theoryObt: 64, iaMax: 30, iaObt: 27, total: 91 },
    ]},
    { name: 'Annual', subjects: [
      { subject: 'English', theoryMax: 80, theoryObt: 68, iaMax: 20, iaObt: 16, total: 84 },
      { subject: 'Hindi', theoryMax: 80, theoryObt: 56, iaMax: 20, iaObt: 14, total: 70 },
      { subject: 'Mathematics', theoryMax: 80, theoryObt: 72, iaMax: 20, iaObt: 12, total: 84 },
      { subject: 'Science', theoryMax: 80, theoryObt: 64, iaMax: 20, iaObt: 16, total: 80 },
      { subject: 'Social Science', theoryMax: 80, theoryObt: 60, iaMax: 20, iaObt: 16, total: 76 },
      { subject: 'Computer Science', theoryMax: 70, theoryObt: 62, iaMax: 30, iaObt: 26, total: 88 },
    ]},
  ],
  coScholastic: [
    { area: 'Art Education', grade: 'A', descriptor: 'Outstanding' },
    { area: 'Health & Physical Education', grade: 'A+', descriptor: 'Exceptional' },
    { area: 'Discipline', grade: 'A', descriptor: 'Outstanding' },
  ],
  competencies: [
    { competency: 'Critical Thinking', level: 'Proficient' },
    { competency: 'Problem Solving', level: 'Proficient' },
    { competency: 'Communication', level: 'Advanced' },
    { competency: 'Creativity', level: 'Developing' },
    { competency: 'Collaboration', level: 'Proficient' },
  ],
}

export default function ExaminationModule() {
  const { darkMode } = useAppStore()
  const [activeTab, setActiveTab] = useState('overview')
  const [showForm, setShowForm] = useState(null)
  const [successMsg, setSuccessMsg] = useState(null)

  // Marksheet states
  const [marksheetStudent, setMarksheetStudent] = useState(null)
  const [cumulativeStudent, setCumulativeStudent] = useState(null)

  // Bulk marks entry states
  const [bulkClass, setBulkClass] = useState('X')
  const [bulkSection, setBulkSection] = useState('A')
  const [bulkSubject, setBulkSubject] = useState('Mathematics')
  const [bulkExam, setBulkExam] = useState('Half Yearly')
  const [bulkMaxTheory, setBulkMaxTheory] = useState('80')
  const [bulkMaxIA, setBulkMaxIA] = useState('20')
  const [bulkMarks, setBulkMarks] = useState({})

  // TC generation states
  const [tcStudent, setTcStudent] = useState(null)
  const [tcForm, setTcForm] = useState({
    tcNumber: '', dateOfIssue: '', admissionDate: '', dateOfLeaving: '',
    classAdmitted: '', classLeaving: '', reasonForLeaving: '', feesPaid: 'Yes',
    duesCleared: 'Yes', conduct: 'Excellent', character: 'Good',
    gamesSports: 'Participated', extraCurricular: 'Active', generalProgress: 'Very Good',
    dateOfPrinting: '', remarks: '',
  })

  // Individual marks entry
  const [marksEntryStudent, setMarksEntryStudent] = useState(null)
  const [marksEntryForm, setMarksEntryForm] = useState({
    examName: '', subject: '', class: '', marksObtained: '', maxMarks: '100', competencyLevel: '', remarks: ''
  })

  // Other form states
  const [examScheduleForm, setExamScheduleForm] = useState({ examName: '', subject: '', class: '', date: '', startTime: '', duration: '', maxMarks: '', examType: 'Unit Test', roomNo: '', invigilator: '' })
  const [skillAssessForm, setSkillAssessForm] = useState({ student: '', skill: 'Public Speaking', rubric1: '', rubric2: '', rubric3: '', rubric4: '', comments: '' })
  const [coScholasticForm, setCoScholasticForm] = useState({ student: '', area: 'Arts', grade: 'A', remarks: '' })

  const tooltipStyle = { backgroundColor: darkMode ? '#1A2D4A' : '#fff', border: '1px solid ' + (darkMode ? 'rgba(255,255,255,0.1)' : '#e2e8f0'), borderRadius: '12px', fontSize: '12px', color: darkMode ? '#e2e8f0' : '#1e293b' }
  const inputClass = 'w-full px-3 py-2 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-birla-gold/40'
  const labelClass = 'block text-xs font-medium text-muted-foreground mb-1'

  const showSuccess = useCallback((msg) => { setSuccessMsg(msg); setTimeout(() => setSuccessMsg(null), 3000) }, [])

  // Get class students for bulk entry
  const getClassStudents = useCallback(() => STUDENT_DB.filter(s => s.class === bulkClass && s.section === bulkSection), [bulkClass, bulkSection])
  const classStudents = getClassStudents()

  // Bulk marks handlers
  const handleBulkMarkChange = (studentId, field, value) => {
    setBulkMarks(prev => ({ ...prev, [studentId]: { ...prev[studentId], [field]: value } }))
  }

  const handleBulkSubmit = () => {
    const entries = classStudents.map(s => {
      const m = bulkMarks[s.id] || {}
      const theory = parseInt(m.theory || 0)
      const ia = parseInt(m.ia || 0)
      const total = theory + ia
      return { student: s.name, bspId: s.bspId, theory, ia, total, grade: getCBSEGrade(total) }
    })
    showSuccess(`Bulk marks saved for ${entries.length} students - ${bulkSubject} ${bulkExam}`)
  }

  const handleBulkAutoGrade = () => {
    const updated = { ...bulkMarks }
    classStudents.forEach(s => {
      const m = updated[s.id] || {}
      const theory = parseInt(m.theory || 0)
      const ia = parseInt(m.ia || 0)
      if (theory + ia > 0) updated[s.id] = { ...m, total: String(theory + ia), grade: getCBSEGrade(theory + ia) }
    })
    setBulkMarks(updated)
  }

  // Individual marksheet data
  const activeStudent = marksheetStudent || STUDENT_DB[0]
  const marksheetScholastic = [
    { subject: 'English', theoryMax: 80, theoryObt: 68, iaMax: 20, iaObt: 16, total: 84 },
    { subject: 'Hindi', theoryMax: 80, theoryObt: 56, iaMax: 20, iaObt: 14, total: 70 },
    { subject: 'Mathematics', theoryMax: 80, theoryObt: 72, iaMax: 20, iaObt: 12, total: 84 },
    { subject: 'Science', theoryMax: 80, theoryObt: 64, iaMax: 20, iaObt: 16, total: 80 },
    { subject: 'Social Science', theoryMax: 80, theoryObt: 60, iaMax: 20, iaObt: 16, total: 76 },
    { subject: 'Computer Science', theoryMax: 70, theoryObt: 62, iaMax: 30, iaObt: 26, total: 88 },
  ]
  const totalObt = marksheetScholastic.reduce((s, x) => s + x.total, 0)
  const totalMax = marksheetScholastic.reduce((s, x) => s + x.theoryMax + x.iaMax, 0)
  const pct = ((totalObt / totalMax) * 100).toFixed(1)
  const overallResult = marksheetScholastic.every(s => s.total >= 33) ? 'PASS' : 'FAIL'

  // TC handler
  const handleTCSubmit = () => {
    if (!tcStudent) { alert('Please select a student via QR scan or ID lookup.'); return }
    showSuccess(`Transfer Certificate generated for ${tcStudent.name} (TC No: ${tcForm.tcNumber || 'TC/2026/' + Math.floor(Math.random() * 9999)})`)
  }

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'schedule', label: 'Schedule', icon: Calendar },
    { id: 'marks-entry', label: 'Marks Entry', icon: PenLine },
    { id: 'marksheet', label: 'Marksheet', icon: FileCheck },
    { id: 'cumulative', label: 'Cumulative', icon: TableProperties },
    { id: 'tc', label: 'TC Generation', icon: FileDown },
    { id: 'cbse-grading', label: 'CBSE Grading', icon: GraduationCap },
    { id: 'reports', label: 'Reports', icon: Activity },
  ]

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="show" className="p-4 lg:p-6 space-y-6 max-w-[1600px] mx-auto">
      {/* Success Toast */}
      <AnimatePresence>
        {successMsg && (
          <motion.div initial={{ opacity: 0, y: -30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -30 }}
            className="fixed top-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 px-6 py-3 rounded-xl bg-emerald-500 text-white shadow-2xl">
            <CheckCircle2 className="w-5 h-5" /><span className="text-sm font-medium">{successMsg}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
            <FileText className="w-5 h-5 text-birla-cyan" />Examination Management
          </h2>
          <p className="text-[11px] text-muted-foreground mt-0.5">Birla Open Minds International GraduationCap &bull; CBSE &bull; NEP 2020 Aligned</p>
        </div>
        <div className="flex gap-1 p-1 rounded-xl bg-muted/50 border border-border overflow-x-auto">
          {tabs.map(tab => { const Icon = tab.icon; return (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[11px] font-medium whitespace-nowrap transition-all ${activeTab === tab.id ? 'gradient-birla text-white shadow-md' : 'text-muted-foreground hover:text-foreground'}`}>
              <Icon className="w-3.5 h-3.5" />{tab.label}
            </button>
          )})}
        </div>
      </motion.div>

      {/* Stats */}
      <motion.div variants={itemVariants} className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: 'Exams Conducted', value: '12', icon: ClipboardList, color: 'text-cyan-500 bg-cyan-500/10', trend: '+3' },
          { label: 'Pass Rate', value: '89.2%', icon: CheckCircle2, color: 'text-emerald-500 bg-emerald-500/10', trend: '+2.1%' },
          { label: 'Avg Score', value: '72.4', icon: TrendingUp, color: 'text-amber-500 bg-amber-500/10', trend: '+1.8' },
          { label: 'TCs Issued', value: '8', icon: FileDown, color: 'text-purple-500 bg-purple-500/10', trend: '+2' },
        ].map(stat => { const Icon = stat.icon; return (
          <div key={stat.label} className="rounded-2xl border border-border bg-card p-4 hover:shadow-sm transition-all">
            <div className="flex items-center justify-between mb-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${stat.color}`}><Icon className="w-5 h-5" /></div>
              <span className="flex items-center gap-0.5 text-[10px] font-medium text-emerald-500"><ArrowUpRight className="w-3 h-3" />{stat.trend}</span>
            </div>
            <p className="text-2xl font-bold text-foreground">{stat.value}</p>
            <p className="text-[10px] text-muted-foreground mt-0.5">{stat.label}</p>
          </div>
        )})}
      </motion.div>

      {/* ====== OVERVIEW ====== */}
      {activeTab === 'overview' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-5">
              <h4 className="text-sm font-semibold text-foreground mb-1 flex items-center gap-2"><BarChart3 className="w-4 h-4 text-birla-cyan" />Subject-wise Results</h4>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={examResultsData}>
                    <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? 'rgba(255,255,255,0.06)' : '#f1f5f9'} />
                    <XAxis dataKey="subject" tick={{ fontSize: 9, fill: darkMode ? '#94a3b8' : '#64748b' }} />
                    <YAxis tick={{ fontSize: 10, fill: darkMode ? '#94a3b8' : '#64748b' }} domain={[0, 100]} />
                    <Tooltip contentStyle={tooltipStyle} />
                    <Legend wrapperStyle={{ fontSize: '10px' }} />
                    <Bar dataKey="avg" fill="#22D3EE" radius={[4,4,0,0]} name="Average" />
                    <Bar dataKey="highest" fill="#C8A45C" radius={[4,4,0,0]} name="Highest" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </motion.div>
            <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-5">
              <h4 className="text-sm font-semibold text-foreground mb-1 flex items-center gap-2"><GraduationCap className="w-4 h-4 text-birla-gold" />CBSE Grading Distribution</h4>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={cbseGradingData} cx="50%" cy="50%" innerRadius={50} outerRadius={85} paddingAngle={2} dataKey="count">
                      {cbseGradingData.map((e, i) => <Cell key={i} fill={e.color} />)}
                    </Pie>
                    <Tooltip contentStyle={tooltipStyle} />
                    <Legend iconType="circle" wrapperStyle={{ fontSize: '10px' }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </motion.div>
          </div>
          <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-5">
            <h4 className="text-sm font-semibold text-foreground mb-1 flex items-center gap-2"><TrendingUp className="w-4 h-4 text-emerald-500" />Term-wise Comparison</h4>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={termComparisonData}>
                  <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? 'rgba(255,255,255,0.06)' : '#f1f5f9'} />
                  <XAxis dataKey="subject" tick={{ fontSize: 9 }} />
                  <YAxis tick={{ fontSize: 10 }} domain={[0, 100]} />
                  <Tooltip contentStyle={tooltipStyle} />
                  <Legend wrapperStyle={{ fontSize: '10px' }} />
                  <Bar dataKey="term1" fill="#22D3EE" name="Term 1" radius={[4,4,0,0]} />
                  <Bar dataKey="term2" fill="#C8A45C" name="Term 2" radius={[4,4,0,0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </div>
      )}

      {/* ====== SCHEDULE ====== */}
      {activeTab === 'schedule' && (
        <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-5">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-sm font-semibold text-foreground flex items-center gap-2"><Calendar className="w-4 h-4 text-birla-cyan" />Exam Schedule</h4>
            <button onClick={() => { setActiveTab('marks-entry'); setShowForm('examSchedule') }} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg gradient-birla text-white text-xs font-medium"><Plus className="w-3.5 h-3.5" />Add Exam</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead><tr className="border-b border-border bg-muted/30">
                {['Exam','Subject','Class','Date','Time','Room','Invigilator'].map(h => <th key={h} className="text-left px-3 py-2 text-[10px] font-semibold text-muted-foreground">{h}</th>)}
              </tr></thead>
              <tbody>
                {examScheduleData.map((e, i) => (
                  <tr key={i} className="border-b border-border/50 hover:bg-muted/20">
                    <td className="px-3 py-2 text-xs text-foreground">{e.exam}</td>
                    <td className="px-3 py-2 text-xs text-foreground">{e.subject}</td>
                    <td className="px-3 py-2 text-xs text-foreground">{e.class}</td>
                    <td className="px-3 py-2 text-xs text-foreground">{e.date}</td>
                    <td className="px-3 py-2 text-xs text-foreground">{e.time}</td>
                    <td className="px-3 py-2 text-xs text-foreground">{e.room}</td>
                    <td className="px-3 py-2 text-xs text-foreground">{e.invigilator}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      )}

      {/* ====== MARKS ENTRY (Individual + Bulk) ====== */}
      {activeTab === 'marks-entry' && (
        <motion.div variants={itemVariants} className="space-y-4">
          <div className="flex gap-2 p-1 rounded-xl bg-muted/50 border border-border">
            <button onClick={() => setShowForm('individual')}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-medium transition-all ${showForm === 'individual' ? 'gradient-birla text-white shadow-md' : 'text-muted-foreground hover:text-foreground'}`}>
              <UserCheck className="w-3.5 h-3.5" />Individual Entry
            </button>
            <button onClick={() => setShowForm('bulk')}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-medium transition-all ${showForm === 'bulk' ? 'gradient-birla text-white shadow-md' : 'text-muted-foreground hover:text-foreground'}`}>
              <TableProperties className="w-3.5 h-3.5" />Bulk Entry
            </button>
          </div>

          {/* Individual Marks Entry */}
          {showForm === 'individual' && (
            <div className="rounded-2xl border border-border bg-card p-6">
              <h3 className="text-base font-semibold text-foreground flex items-center gap-2 mb-4"><PenLine className="w-5 h-5 text-birla-cyan" />Individual Marks Entry</h3>
              <div className="mb-4">
                <QRStudentLookup onStudentSelect={setMarksEntryStudent} mode="student" placeholder="Scan QR or enter Student ID for marks entry" showDetails={true} label="Student Identification" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div><label className={labelClass}>Exam *</label><select value={marksEntryForm.examName} onChange={e => setMarksEntryForm({...marksEntryForm, examName: e.target.value})} className={inputClass}><option value="">Select Exam</option>{examTypes.map(e => <option key={e}>{e}</option>)}</select></div>
                <div><label className={labelClass}>Subject *</label><select value={marksEntryForm.subject} onChange={e => setMarksEntryForm({...marksEntryForm, subject: e.target.value})} className={inputClass}><option value="">Select Subject</option>{subjects.map(s => <option key={s}>{s}</option>)}</select></div>
                <div><label className={labelClass}>Class</label><select value={marksEntryForm.class} onChange={e => setMarksEntryForm({...marksEntryForm, class: e.target.value})} className={inputClass}><option value="">Select Class</option>{classes.map(c => <option key={c}>{c}</option>)}</select></div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div><label className={labelClass}>Marks Obtained *</label><input type="number" value={marksEntryForm.marksObtained} onChange={e => setMarksEntryForm({...marksEntryForm, marksObtained: e.target.value})} className={inputClass} placeholder="e.g. 72" /></div>
                <div><label className={labelClass}>Max Marks</label><input type="number" value={marksEntryForm.maxMarks} onChange={e => setMarksEntryForm({...marksEntryForm, maxMarks: e.target.value})} className={inputClass} /></div>
                <div><label className={labelClass}>Remarks</label><input type="text" value={marksEntryForm.remarks} onChange={e => setMarksEntryForm({...marksEntryForm, remarks: e.target.value})} className={inputClass} placeholder="Optional remarks" /></div>
              </div>
              {marksEntryForm.marksObtained && marksEntryForm.maxMarks && (
                <div className="p-3 rounded-xl bg-muted/30 border border-border mb-4">
                  <div className="flex items-center gap-4 text-sm">
                    <span className="text-muted-foreground">Grade: <span className="font-bold text-foreground">{getCBSEGrade(parseInt(marksEntryForm.marksObtained))}</span></span>
                    <span className="text-muted-foreground">Competency: <span className="font-bold text-foreground">{getCompetencyLevel(parseInt(marksEntryForm.marksObtained))}</span></span>
                    <span className="text-muted-foreground">Percentage: <span className="font-bold text-foreground">{((parseInt(marksEntryForm.marksObtained) / parseInt(marksEntryForm.maxMarks)) * 100).toFixed(1)}%</span></span>
                  </div>
                </div>
              )}
              <div className="flex gap-3">
                <button onClick={() => { showSuccess('Individual marks saved successfully!'); setMarksEntryForm({ examName: '', subject: '', class: '', marksObtained: '', maxMarks: '100', competencyLevel: '', remarks: '' }); setMarksEntryStudent(null) }}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl gradient-birla text-white text-sm font-medium"><Save className="w-4 h-4" />Save Marks</button>
              </div>
            </div>
          )}

          {/* BULK MARKS ENTRY */}
          {showForm === 'bulk' && (
            <div className="rounded-2xl border-2 border-birla-gold/30 bg-card p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-semibold text-foreground flex items-center gap-2"><TableProperties className="w-5 h-5 text-birla-gold" />Bulk Marks Entry</h3>
                <span className="px-2.5 py-1 rounded-lg bg-birla-gold/10 text-birla-gold text-[10px] font-bold">BULK MODE</span>
              </div>
              <p className="text-xs text-muted-foreground mb-4">Enter marks for all students of a class at once. Theory + IA marks auto-calculate total and CBSE grade.</p>
              <div className="grid grid-cols-2 md:grid-cols-6 gap-3 mb-4">
                <div><label className={labelClass}>Class *</label><select value={bulkClass} onChange={e => setBulkClass(e.target.value)} className={inputClass}>{classes.map(c => <option key={c}>{c}</option>)}</select></div>
                <div><label className={labelClass}>Section *</label><select value={bulkSection} onChange={e => setBulkSection(e.target.value)} className={inputClass}>{sections.map(s => <option key={s}>{s}</option>)}</select></div>
                <div><label className={labelClass}>Subject *</label><select value={bulkSubject} onChange={e => setBulkSubject(e.target.value)} className={inputClass}>{subjects.map(s => <option key={s}>{s}</option>)}</select></div>
                <div><label className={labelClass}>Exam *</label><select value={bulkExam} onChange={e => setBulkExam(e.target.value)} className={inputClass}>{examTypes.map(e => <option key={e}>{e}</option>)}</select></div>
                <div><label className={labelClass}>Max Theory</label><input type="number" value={bulkMaxTheory} onChange={e => setBulkMaxTheory(e.target.value)} className={inputClass} /></div>
                <div><label className={labelClass}>Max IA</label><input type="number" value={bulkMaxIA} onChange={e => setBulkMaxIA(e.target.value)} className={inputClass} /></div>
              </div>
              <div className="flex gap-2 mb-4">
                <button onClick={handleBulkAutoGrade} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-birla-cyan/30 bg-birla-cyan/5 text-birla-cyan text-xs font-medium hover:bg-birla-cyan/10"><Zap className="w-3.5 h-3.5" />Auto-Calculate Totals & Grades</button>
                <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border text-muted-foreground text-xs font-medium hover:bg-muted"><Upload className="w-3.5 h-3.5" />Import CSV</button>
                <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border text-muted-foreground text-xs font-medium hover:bg-muted"><Download className="w-3.5 h-3.5" />Download Template</button>
              </div>

              {/* Bulk Entry Grid */}
              <div className="overflow-x-auto border border-border rounded-xl">
                <table className="w-full text-xs">
                  <thead><tr className="border-b-2 border-birla-blue/20 bg-birla-blue/5">
                    <th className="text-left px-3 py-2.5 text-[10px] font-bold text-muted-foreground">Roll</th>
                    <th className="text-left px-3 py-2.5 text-[10px] font-bold text-muted-foreground">Student Name</th>
                    <th className="text-left px-3 py-2.5 text-[10px] font-bold text-muted-foreground">BSP ID</th>
                    <th className="text-center px-3 py-2.5 text-[10px] font-bold text-muted-foreground">Theory (/{bulkMaxTheory})</th>
                    <th className="text-center px-3 py-2.5 text-[10px] font-bold text-muted-foreground">IA (/{bulkMaxIA})</th>
                    <th className="text-center px-3 py-2.5 text-[10px] font-bold text-muted-foreground">Total</th>
                    <th className="text-center px-3 py-2.5 text-[10px] font-bold text-muted-foreground">Grade</th>
                    <th className="text-center px-3 py-2.5 text-[10px] font-bold text-muted-foreground">Competency</th>
                  </tr></thead>
                  <tbody>
                    {classStudents.map((s, i) => {
                      const m = bulkMarks[s.id] || {}
                      const theory = parseInt(m.theory || 0)
                      const ia = parseInt(m.ia || 0)
                      const total = theory + ia
                      const grade = total > 0 ? getCBSEGrade(total) : ''
                      const comp = total > 0 ? getCompetencyLevel(total) : ''
                      return (
                        <tr key={s.id} className={`border-b border-border/50 ${i % 2 === 0 ? 'bg-muted/5' : ''}`}>
                          <td className="px-3 py-2 text-muted-foreground">{s.rollNo}</td>
                          <td className="px-3 py-2 font-medium text-foreground">{s.name}</td>
                          <td className="px-3 py-2 text-birla-cyan font-mono text-[10px]">{s.bspId}</td>
                          <td className="px-2 py-1.5"><input type="number" min="0" max={bulkMaxTheory} value={m.theory || ''} onChange={e => handleBulkMarkChange(s.id, 'theory', e.target.value)} className="w-20 px-2 py-1.5 rounded-lg border border-border bg-background text-center text-sm focus:outline-none focus:ring-1 focus:ring-birla-gold/40" placeholder="0" /></td>
                          <td className="px-2 py-1.5"><input type="number" min="0" max={bulkMaxIA} value={m.ia || ''} onChange={e => handleBulkMarkChange(s.id, 'ia', e.target.value)} className="w-20 px-2 py-1.5 rounded-lg border border-border bg-background text-center text-sm focus:outline-none focus:ring-1 focus:ring-birla-gold/40" placeholder="0" /></td>
                          <td className="px-3 py-2 text-center font-bold text-foreground">{total > 0 ? total : '-'}</td>
                          <td className="px-3 py-2 text-center">{grade && <span className="inline-flex items-center justify-center w-7 h-5 rounded text-[10px] font-bold text-white" style={{ background: getGradeColor(grade) }}>{grade}</span>}</td>
                          <td className="px-3 py-2 text-center">{comp && <span className={`text-[9px] px-1.5 py-0.5 rounded-full font-medium ${comp === 'Advanced' ? 'bg-emerald-500/10 text-emerald-600' : comp === 'Proficient' ? 'bg-cyan-500/10 text-cyan-600' : comp === 'Developing' ? 'bg-amber-500/10 text-amber-600' : 'bg-red-500/10 text-red-600'}`}>{comp}</span>}</td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>

              <div className="flex items-center justify-between mt-4">
                <p className="text-xs text-muted-foreground">{classStudents.length} students in Class {bulkClass}-{bulkSection}</p>
                <button onClick={handleBulkSubmit} className="flex items-center gap-2 px-5 py-2.5 rounded-xl gradient-birla text-white text-sm font-medium"><Save className="w-4 h-4" />Save All Marks</button>
              </div>
            </div>
          )}

          {!showForm && (
            <div className="rounded-2xl border border-border bg-card p-8 text-center">
              <TableProperties className="w-12 h-12 text-muted-foreground/30 mx-auto mb-3" />
              <p className="text-sm font-medium text-foreground">Select Individual or Bulk Entry mode above</p>
              <p className="text-xs text-muted-foreground mt-1">Use Individual for single student, Bulk for class-wise entry</p>
            </div>
          )}
        </motion.div>
      )}

      {/* ====== INDIVIDUAL MARKSHEET ====== */}
      {activeTab === 'marksheet' && (
        <motion.div variants={itemVariants} className="space-y-4">
          <div className="rounded-2xl border border-border bg-card p-5">
            <h4 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2"><FileCheck className="w-4 h-4 text-birla-cyan" />Individual Marksheet Lookup</h4>
            <QRStudentLookup onStudentSelect={setMarksheetStudent} mode="student" placeholder="Scan QR or enter Student ID for Marksheet" showDetails={true} label="Student Identification" />
          </div>

          {/* Marksheet Card */}
          <div className="rounded-2xl border-2 border-birla-gold/30 bg-card overflow-hidden">
            <div className="bg-gradient-to-r from-birla-blue to-birla-blue/90 p-5 text-center text-white">
              <div className="flex items-center justify-center gap-2 mb-1"><GraduationCap className="w-6 h-6" /><h3 className="text-lg font-bold tracking-wide">BIRLA OPEN MINDS INTERNATIONAL SCHOOL</h3></div>
              <p className="text-[11px] text-white/70">Affiliated to CBSE &bull; UDISE Code: 19010100101 &bull; Singur, Hooghly &bull; Session: 2025-26</p>
              <div className="mt-2 inline-block px-4 py-1 rounded-lg bg-birla-gold/20 border border-birla-gold/40">
                <p className="text-sm font-bold text-birla-gold">PERFORMANCE MARKSHEET (NEP 2020 & CBSE)</p>
              </div>
            </div>

            <div className="p-5 border-b border-border">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <div className="flex gap-2"><span className="text-[11px] font-semibold text-muted-foreground w-20">Name:</span><span className="text-sm font-bold text-foreground">{activeStudent.name}</span></div>
                  <div className="flex gap-2"><span className="text-[11px] font-semibold text-muted-foreground w-20">BSP ID:</span><span className="text-xs font-mono text-birla-cyan">{activeStudent.bspId}</span></div>
                  <div className="flex gap-2"><span className="text-[11px] font-semibold text-muted-foreground w-20">PEN No:</span><span className="text-xs font-mono text-birla-cyan">{activeStudent.penNo}</span></div>
                  <div className="flex gap-2"><span className="text-[11px] font-semibold text-muted-foreground w-20">Uppar ID:</span><span className="text-xs font-mono text-birla-cyan">{activeStudent.upparId}</span></div>
                </div>
                <div className="space-y-1.5">
                  <div className="flex gap-2"><span className="text-[11px] font-semibold text-muted-foreground w-20">Class:</span><span className="text-sm font-bold text-foreground">{activeStudent.class}</span></div>
                  <div className="flex gap-2"><span className="text-[11px] font-semibold text-muted-foreground w-20">Section:</span><span className="text-sm font-bold text-foreground">{activeStudent.section}</span></div>
                  <div className="flex gap-2"><span className="text-[11px] font-semibold text-muted-foreground w-20">Roll No:</span><span className="text-sm font-bold text-foreground">{activeStudent.rollNo}</span></div>
                  <div className="flex gap-2"><span className="text-[11px] font-semibold text-muted-foreground w-20">Attendance:</span><span className="text-sm font-bold text-emerald-600">92.5%</span></div>
                </div>
              </div>
            </div>

            <div className="p-5 border-b border-border">
              <h5 className="text-sm font-bold text-foreground mb-3 flex items-center gap-2"><BookOpen className="w-4 h-4 text-birla-gold" />SCHOLASTIC AREA</h5>
              <div className="overflow-x-auto">
                <table className="w-full text-center">
                  <thead>
                    <tr className="border-b-2 border-birla-blue/20 bg-birla-blue/5">
                      <th className="text-left px-3 py-2 text-[10px] font-bold text-muted-foreground" rowSpan={2}>Subject</th>
                      <th className="px-3 py-2 text-[10px] font-bold text-muted-foreground" colSpan={2}>Theory</th>
                      <th className="px-3 py-2 text-[10px] font-bold text-muted-foreground" colSpan={2}>Internal Assessment</th>
                      <th className="px-3 py-2 text-[10px] font-bold text-muted-foreground" rowSpan={2}>Total</th>
                      <th className="px-3 py-2 text-[10px] font-bold text-muted-foreground" rowSpan={2}>Grade</th>
                      <th className="px-3 py-2 text-[10px] font-bold text-muted-foreground" rowSpan={2}>Competency</th>
                    </tr>
                    <tr className="border-b border-border bg-birla-blue/5">
                      <th className="px-3 py-1 text-[9px] text-muted-foreground">Max</th><th className="px-3 py-1 text-[9px] text-muted-foreground">Obt</th>
                      <th className="px-3 py-1 text-[9px] text-muted-foreground">Max</th><th className="px-3 py-1 text-[9px] text-muted-foreground">Obt</th>
                    </tr>
                  </thead>
                  <tbody>
                    {marksheetScholastic.map((s, i) => (
                      <tr key={i} className={`border-b border-border/50 ${i % 2 === 0 ? 'bg-muted/10' : ''}`}>
                        <td className="text-left px-3 py-2 text-xs font-medium text-foreground">{s.subject}</td>
                        <td className="px-3 py-2 text-xs text-muted-foreground">{s.theoryMax}</td>
                        <td className="px-3 py-2 text-xs text-foreground font-medium">{s.theoryObt}</td>
                        <td className="px-3 py-2 text-xs text-muted-foreground">{s.iaMax}</td>
                        <td className="px-3 py-2 text-xs text-foreground font-medium">{s.iaObt}</td>
                        <td className="px-3 py-2 text-xs font-bold text-foreground">{s.total}</td>
                        <td className="px-3 py-2"><span className="inline-flex items-center justify-center w-8 h-5 rounded text-[10px] font-bold text-white" style={{ background: getGradeColor(getCBSEGrade(s.total)) }}>{getCBSEGrade(s.total)}</span></td>
                        <td className="px-3 py-2"><span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${getCompetencyLevel(s.total) === 'Advanced' ? 'bg-emerald-500/10 text-emerald-600' : getCompetencyLevel(s.total) === 'Proficient' ? 'bg-cyan-500/10 text-cyan-600' : getCompetencyLevel(s.total) === 'Developing' ? 'bg-amber-500/10 text-amber-600' : 'bg-red-500/10 text-red-600'}`}>{getCompetencyLevel(s.total)}</span></td>
                      </tr>
                    ))}
                    <tr className="border-t-2 border-birla-blue/20 bg-birla-blue/5 font-bold">
                      <td className="text-left px-3 py-2 text-xs text-foreground">GRAND TOTAL</td>
                      <td className="px-3 py-2 text-xs text-muted-foreground">{marksheetScholastic.reduce((s, x) => s + x.theoryMax, 0)}</td>
                      <td className="px-3 py-2 text-xs text-foreground">{marksheetScholastic.reduce((s, x) => s + x.theoryObt, 0)}</td>
                      <td className="px-3 py-2 text-xs text-muted-foreground">{marksheetScholastic.reduce((s, x) => s + x.iaMax, 0)}</td>
                      <td className="px-3 py-2 text-xs text-foreground">{marksheetScholastic.reduce((s, x) => s + x.iaObt, 0)}</td>
                      <td className="px-3 py-2 text-sm text-foreground">{totalObt}</td>
                      <td className="px-3 py-2" colSpan={2}></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Co-Scholastic */}
            <div className="p-5 border-b border-border">
              <h5 className="text-sm font-bold text-foreground mb-3 flex items-center gap-2"><Palette className="w-4 h-4 text-birla-gold" />CO-SCHOLASTIC AREA</h5>
              <table className="w-full">
                <thead><tr className="border-b-2 border-birla-gold/20 bg-birla-gold/5"><th className="text-left px-4 py-2 text-[10px] font-bold text-muted-foreground">Area</th><th className="text-center px-4 py-2 text-[10px] font-bold text-muted-foreground">Grade</th><th className="text-center px-4 py-2 text-[10px] font-bold text-muted-foreground">Descriptor</th></tr></thead>
                <tbody>
                  {cumulativeData.coScholastic.map((c, i) => (
                    <tr key={i} className="border-b border-border/50"><td className="px-4 py-2 text-xs font-medium text-foreground">{c.area}</td><td className="px-4 py-2 text-center"><span className="px-3 py-0.5 rounded-full text-xs font-bold bg-birla-gold/10 text-birla-gold">{c.grade}</span></td><td className="px-4 py-2 text-center text-xs text-muted-foreground">{c.descriptor}</td></tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Result Summary */}
            <div className="p-5 border-b border-border bg-muted/5">
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                <div className="text-center"><p className="text-[10px] text-muted-foreground mb-1">Total Marks</p><p className="text-lg font-bold text-foreground">{totalObt}/{totalMax}</p></div>
                <div className="text-center"><p className="text-[10px] text-muted-foreground mb-1">Percentage</p><p className="text-lg font-bold text-birla-cyan">{pct}%</p></div>
                <div className="text-center"><p className="text-[10px] text-muted-foreground mb-1">Overall Result</p><span className={`inline-block text-lg font-bold px-3 py-0.5 rounded-lg ${overallResult === 'PASS' ? 'bg-emerald-500/10 text-emerald-600' : 'bg-red-500/10 text-red-600'}`}>{overallResult}</span></div>
                <div className="text-center"><p className="text-[10px] text-muted-foreground mb-1">Rank in Class</p><p className="text-lg font-bold text-foreground">3rd</p></div>
                <div className="text-center"><p className="text-[10px] text-muted-foreground mb-1">Attendance</p><p className="text-lg font-bold text-emerald-600">92.5%</p></div>
              </div>
            </div>

            {/* Signatures */}
            <div className="p-5 border-b border-border">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[['Class Teacher','Mrs. Kavita Sharma'],['Exam Controller','Dr. Suresh Babu'],['Principal','Birla Open Minds Int. GraduationCap']].map(([title, name], i) => (
                  <div key={i} className="text-center"><div className="border-t-2 border-muted-foreground/30 pt-2 mt-10"><p className="text-xs font-semibold text-foreground">{title}</p><p className="text-[10px] text-muted-foreground">{name}</p></div></div>
                ))}
              </div>
            </div>

            {/* CBSE Grading Scale */}
            <div className="p-5 bg-muted/10">
              <h5 className="text-xs font-bold text-muted-foreground mb-2 flex items-center gap-1.5"><GraduationCap className="w-3.5 h-3.5" />CBSE 9-Point Grading Scale</h5>
              <div className="grid grid-cols-4 md:grid-cols-8 gap-2">
                {cbseGradingData.map(g => (
                  <div key={g.grade} className="p-2 rounded-lg border border-border text-center" style={{ borderColor: g.color + '40' }}>
                    <div className="w-7 h-7 rounded-full mx-auto mb-0.5 flex items-center justify-center text-white text-[10px] font-bold" style={{ background: g.color }}>{g.grade}</div>
                    <p className="text-[9px] text-muted-foreground">{g.range}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-4 flex justify-end"><button onClick={() => showSuccess('Marksheet sent to printer!')} className="flex items-center gap-2 px-4 py-2 rounded-xl gradient-birla text-white text-sm font-medium"><Printer className="w-4 h-4" />Print Marksheet</button></div>
          </div>
        </motion.div>
      )}

      {/* ====== CUMULATIVE MARKSHEET ====== */}
      {activeTab === 'cumulative' && (
        <motion.div variants={itemVariants} className="space-y-4">
          <div className="rounded-2xl border border-border bg-card p-5">
            <h4 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2"><TableProperties className="w-4 h-4 text-birla-gold" />Cumulative Marksheet (Multi-Term)</h4>
            <p className="text-xs text-muted-foreground mb-3">Shows combined performance across 1st Summative, 2nd Summative, and Annual examination as per NEP 2020 & CBSE guidelines</p>
            <QRStudentLookup onStudentSelect={setCumulativeStudent} mode="student" placeholder="Scan QR or enter Student ID for Cumulative Marksheet" showDetails={true} label="Student Identification" />
          </div>

          <div className="rounded-2xl border-2 border-birla-gold/30 bg-card overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-birla-blue to-birla-blue/90 p-5 text-center text-white">
              <div className="flex items-center justify-center gap-2 mb-1"><GraduationCap className="w-6 h-6" /><h3 className="text-lg font-bold tracking-wide">BIRLA OPEN MINDS INTERNATIONAL SCHOOL</h3></div>
              <p className="text-[11px] text-white/70">CBSE Affiliated &bull; UDISE: 19010100101 &bull; Singur, Hooghly</p>
              <div className="mt-2 inline-block px-4 py-1 rounded-lg bg-birla-gold/20 border border-birla-gold/40">
                <p className="text-sm font-bold text-birla-gold">CUMULATIVE PERFORMANCE MARKSHEET - {cumulativeData.academicYear}</p>
              </div>
            </div>

            {/* Student Info */}
            <div className="p-5 border-b border-border">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <div className="flex gap-2"><span className="text-[11px] font-semibold text-muted-foreground w-20">Name:</span><span className="text-sm font-bold text-foreground">{(cumulativeStudent || STUDENT_DB[0]).name}</span></div>
                  <div className="flex gap-2"><span className="text-[11px] font-semibold text-muted-foreground w-20">BSP ID:</span><span className="text-xs font-mono text-birla-cyan">{(cumulativeStudent || STUDENT_DB[0]).bspId}</span></div>
                  <div className="flex gap-2"><span className="text-[11px] font-semibold text-muted-foreground w-20">PEN No:</span><span className="text-xs font-mono text-birla-cyan">{(cumulativeStudent || STUDENT_DB[0]).penNo}</span></div>
                  <div className="flex gap-2"><span className="text-[11px] font-semibold text-muted-foreground w-20">Uppar ID:</span><span className="text-xs font-mono text-birla-cyan">{(cumulativeStudent || STUDENT_DB[0]).upparId}</span></div>
                </div>
                <div className="space-y-1.5">
                  <div className="flex gap-2"><span className="text-[11px] font-semibold text-muted-foreground w-20">Class:</span><span className="text-sm font-bold text-foreground">{(cumulativeStudent || STUDENT_DB[0]).class}</span></div>
                  <div className="flex gap-2"><span className="text-[11px] font-semibold text-muted-foreground w-20">Section:</span><span className="text-sm font-bold text-foreground">{(cumulativeStudent || STUDENT_DB[0]).section}</span></div>
                  <div className="flex gap-2"><span className="text-[11px] font-semibold text-muted-foreground w-20">Roll No:</span><span className="text-sm font-bold text-foreground">{(cumulativeStudent || STUDENT_DB[0]).rollNo}</span></div>
                  <div className="flex gap-2"><span className="text-[11px] font-semibold text-muted-foreground w-20">Year:</span><span className="text-sm font-bold text-foreground">{cumulativeData.academicYear}</span></div>
                </div>
              </div>
            </div>

            {/* Cumulative Subject Table */}
            <div className="p-5 border-b border-border">
              <h5 className="text-sm font-bold text-foreground mb-3 flex items-center gap-2"><BookOpen className="w-4 h-4 text-birla-gold" />TERM-WISE SCHOLASTIC PERFORMANCE</h5>
              <div className="overflow-x-auto">
                <table className="w-full text-center text-xs">
                  <thead>
                    <tr className="border-b-2 border-birla-gold/20 bg-birla-gold/5">
                      <th className="text-left px-2 py-2 text-[9px] font-bold text-muted-foreground" rowSpan={2}>Subject</th>
                      {cumulativeData.terms.map(t => (
                        <th key={t.name} className="px-2 py-1 text-[9px] font-bold text-muted-foreground" colSpan={3}>{t.name}</th>
                      ))}
                      <th className="px-2 py-2 text-[9px] font-bold text-birla-gold" rowSpan={2}>Grand Total</th>
                      <th className="px-2 py-2 text-[9px] font-bold text-birla-gold" rowSpan={2}>Overall %</th>
                      <th className="px-2 py-2 text-[9px] font-bold text-birla-gold" rowSpan={2}>Grade</th>
                    </tr>
                    <tr className="border-b border-border bg-birla-gold/5">
                      {cumulativeData.terms.map(t => (
                        <Fragment key={t.name + '-sub'}>
                          <th className="px-1 py-0.5 text-[8px] text-muted-foreground">Theory</th>
                          <th className="px-1 py-0.5 text-[8px] text-muted-foreground">IA</th>
                          <th className="px-1 py-0.5 text-[8px] text-muted-foreground">Total</th>
                        </Fragment>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {cumulativeData.terms[0].subjects.map((subj, si) => {
                      let grandTotal = 0
                      let grandMax = 0
                      return (
                        <tr key={subj.subject} className={`border-b border-border/50 ${si % 2 === 0 ? 'bg-muted/5' : ''}`}>
                          <td className="text-left px-2 py-2 font-medium text-foreground">{subj.subject}</td>
                          {cumulativeData.terms.map(t => {
                            const ts = t.subjects[si]
                            grandTotal += ts.total
                            grandMax += ts.theoryMax + ts.iaMax
                            return (
                              <Fragment key={t.name + subj.subject}>
                                <td className="px-1 py-2 text-muted-foreground">{ts.theoryObt}</td>
                                <td className="px-1 py-2 text-muted-foreground">{ts.iaObt}</td>
                                <td className="px-1 py-2 font-medium text-foreground">{ts.total}</td>
                              </Fragment>
                            )
                          })}
                          <td className="px-2 py-2 font-bold text-foreground">{grandTotal}</td>
                          <td className="px-2 py-2 font-bold text-birla-cyan">{((grandTotal / grandMax) * 100).toFixed(1)}%</td>
                          <td className="px-2 py-2"><span className="inline-flex items-center justify-center w-7 h-5 rounded text-[10px] font-bold text-white" style={{ background: getGradeColor(getCBSEGrade((grandTotal / grandMax) * 100)) }}>{getCBSEGrade((grandTotal / grandMax) * 100)}</span></td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* NEP 2020 Competencies */}
            <div className="p-5 border-b border-border">
              <h5 className="text-sm font-bold text-foreground mb-3 flex items-center gap-2"><Brain className="w-4 h-4 text-birla-cyan" />NEP 2020 COMPETENCY MAPPING</h5>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                {cumulativeData.competencies.map((comp, i) => (
                  <div key={i} className="rounded-xl border border-border p-3 text-center bg-muted/10 hover:bg-muted/20 transition-colors">
                    <p className="text-[11px] font-semibold text-foreground">{comp.competency}</p>
                    <span className={`mt-1 inline-block text-[10px] px-2 py-0.5 rounded-full font-medium ${comp.level === 'Advanced' ? 'bg-emerald-500/10 text-emerald-600' : comp.level === 'Proficient' ? 'bg-cyan-500/10 text-cyan-600' : comp.level === 'Developing' ? 'bg-amber-500/10 text-amber-600' : 'bg-red-500/10 text-red-600'}`}>{comp.level}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Co-Scholastic */}
            <div className="p-5 border-b border-border">
              <h5 className="text-sm font-bold text-foreground mb-3 flex items-center gap-2"><Palette className="w-4 h-4 text-birla-gold" />CO-SCHOLASTIC AREA</h5>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead><tr className="border-b-2 border-birla-gold/20 bg-birla-gold/5"><th className="text-left px-4 py-2 text-[10px] font-bold text-muted-foreground">Area</th><th className="text-center px-4 py-2 text-[10px] font-bold text-muted-foreground">Grade</th><th className="text-center px-4 py-2 text-[10px] font-bold text-muted-foreground">Descriptor</th></tr></thead>
                  <tbody>
                    {cumulativeData.coScholastic.map((c, i) => (
                      <tr key={i} className="border-b border-border/50"><td className="px-4 py-2 text-xs font-medium text-foreground">{c.area}</td><td className="px-4 py-2 text-center"><span className="px-3 py-0.5 rounded-full text-xs font-bold bg-birla-gold/10 text-birla-gold">{c.grade}</span></td><td className="px-4 py-2 text-center text-xs text-muted-foreground">{c.descriptor}</td></tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Signatures */}
            <div className="p-5 border-b border-border">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[['Class Teacher','Mrs. Kavita Sharma'],['Exam Controller','Dr. Suresh Babu'],['Principal','Birla Open Minds Int. GraduationCap']].map(([title, name], i) => (
                  <div key={i} className="text-center"><div className="border-t-2 border-muted-foreground/30 pt-2 mt-10"><p className="text-xs font-semibold text-foreground">{title}</p><p className="text-[10px] text-muted-foreground">{name}</p></div></div>
                ))}
              </div>
            </div>

            <div className="p-4 flex justify-end gap-3">
              <button onClick={() => showSuccess('Cumulative Marksheet printed!')} className="flex items-center gap-2 px-4 py-2 rounded-xl gradient-birla text-white text-sm font-medium"><Printer className="w-4 h-4" />Print</button>
              <button onClick={() => showSuccess('Cumulative Marksheet downloaded as PDF!')} className="flex items-center gap-2 px-4 py-2 rounded-xl border border-border text-sm font-medium hover:bg-muted"><Download className="w-4 h-4" />Download PDF</button>
            </div>
          </div>
        </motion.div>
      )}

      {/* ====== TC GENERATION ====== */}
      {activeTab === 'tc' && (
        <motion.div variants={itemVariants} className="space-y-4">
          <div className="rounded-2xl border border-border bg-card p-6">
            <h3 className="text-base font-semibold text-foreground flex items-center gap-2 mb-4"><FileDown className="w-5 h-5 text-birla-gold" />Transfer Certificate Generation</h3>
            <p className="text-xs text-muted-foreground mb-4">Generate Transfer Certificate as per CBSE norms. Scan student ID card QR or enter student details.</p>

            <div className="mb-6">
              <QRStudentLookup onStudentSelect={setTcStudent} mode="student" placeholder="Scan QR or enter Student ID for TC" showDetails={true} label="Student Identification (QR / ID / Name)" />
            </div>

            {tcStudent && (
              <div className="space-y-4">
                {/* Auto-filled Student Info */}
                <div className="p-4 rounded-xl bg-birla-cyan/5 border border-birla-cyan/20">
                  <h4 className="text-xs font-bold text-birla-cyan mb-2">Student Details (Auto-filled)</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
                    <div><span className="text-muted-foreground">Name:</span> <span className="font-medium text-foreground">{tcStudent.name}</span></div>
                    <div><span className="text-muted-foreground">BSP ID:</span> <span className="font-mono text-birla-cyan">{tcStudent.bspId}</span></div>
                    <div><span className="text-muted-foreground">PEN No:</span> <span className="font-mono text-birla-cyan">{tcStudent.penNo}</span></div>
                    <div><span className="text-muted-foreground">Uppar ID:</span> <span className="font-mono text-birla-cyan">{tcStudent.upparId}</span></div>
                    <div><span className="text-muted-foreground">Class:</span> <span className="font-medium text-foreground">{tcStudent.class}-{tcStudent.section}</span></div>
                    <div><span className="text-muted-foreground">Roll No:</span> <span className="font-medium text-foreground">{tcStudent.rollNo}</span></div>
                    <div><span className="text-muted-foreground">Blood Group:</span> <span className="font-medium text-foreground">{tcStudent.bloodGroup}</span></div>
                  </div>
                </div>

                {/* TC Form */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div><label className={labelClass}>TC Number *</label><input type="text" value={tcForm.tcNumber} onChange={e => setTcForm({...tcForm, tcNumber: e.target.value})} className={inputClass} placeholder="e.g. TC/2026/001" /></div>
                  <div><label className={labelClass}>Date of Issue *</label><input type="date" value={tcForm.dateOfIssue} onChange={e => setTcForm({...tcForm, dateOfIssue: e.target.value})} className={inputClass} /></div>
                  <div><label className={labelClass}>Date of Admission</label><input type="date" value={tcForm.admissionDate} onChange={e => setTcForm({...tcForm, admissionDate: e.target.value})} className={inputClass} /></div>
                  <div><label className={labelClass}>Date of Leaving *</label><input type="date" value={tcForm.dateOfLeaving} onChange={e => setTcForm({...tcForm, dateOfLeaving: e.target.value})} className={inputClass} /></div>
                  <div><label className={labelClass}>Class in Which Admitted</label><input type="text" value={tcForm.classAdmitted} onChange={e => setTcForm({...tcForm, classAdmitted: e.target.value})} className={inputClass} placeholder="e.g. Nursery" /></div>
                  <div><label className={labelClass}>Class at Time of Leaving</label><input type="text" value={tcForm.classLeaving} onChange={e => setTcForm({...tcForm, classLeaving: e.target.value})} className={inputClass} placeholder={`e.g. ${tcStudent.class}`} /></div>
                  <div className="md:col-span-2 lg:col-span-3"><label className={labelClass}>Reason for Leaving *</label><textarea value={tcForm.reasonForLeaving} onChange={e => setTcForm({...tcForm, reasonForLeaving: e.target.value})} className={inputClass + ' min-h-[60px]'} placeholder="e.g. Parents' request, Transfer, Relocation..." /></div>
                  <div><label className={labelClass}>Whether Fees Paid</label><select value={tcForm.feesPaid} onChange={e => setTcForm({...tcForm, feesPaid: e.target.value})} className={inputClass}><option>Yes</option><option>No</option><option>Partially</option></select></div>
                  <div><label className={labelClass}>Dues Cleared</label><select value={tcForm.duesCleared} onChange={e => setTcForm({...tcForm, duesCleared: e.target.value})} className={inputClass}><option>Yes</option><option>No</option></select></div>
                  <div><label className={labelClass}>Conduct</label><select value={tcForm.conduct} onChange={e => setTcForm({...tcForm, conduct: e.target.value})} className={inputClass}>{tcConduct.map(c => <option key={c}>{c}</option>)}</select></div>
                  <div><label className={labelClass}>Character</label><select value={tcForm.character} onChange={e => setTcForm({...tcForm, character: e.target.value})} className={inputClass}><option>Good</option><option>Very Good</option><option>Excellent</option><option>Satisfactory</option></select></div>
                  <div><label className={labelClass}>Games & Sports</label><select value={tcForm.gamesSports} onChange={e => setTcForm({...tcForm, gamesSports: e.target.value})} className={inputClass}><option>Participated</option><option>Not Participated</option><option>Represented GraduationCap</option><option>Outstanding</option></select></div>
                  <div><label className={labelClass}>Extra Curricular</label><select value={tcForm.extraCurricular} onChange={e => setTcForm({...tcForm, extraCurricular: e.target.value})} className={inputClass}><option>Active</option><option>Average</option><option>Outstanding</option><option>Limited</option></select></div>
                  <div><label className={labelClass}>General Progress</label><select value={tcForm.generalProgress} onChange={e => setTcForm({...tcForm, generalProgress: e.target.value})} className={inputClass}>{tcProgress.map(p => <option key={p}>{p}</option>)}</select></div>
                  <div><label className={labelClass}>Date of Printing</label><input type="date" value={tcForm.dateOfPrinting} onChange={e => setTcForm({...tcForm, dateOfPrinting: e.target.value})} className={inputClass} /></div>
                  <div className="md:col-span-2 lg:col-span-3"><label className={labelClass}>Remarks</label><textarea value={tcForm.remarks} onChange={e => setTcForm({...tcForm, remarks: e.target.value})} className={inputClass + ' min-h-[50px]'} placeholder="Any additional remarks..." /></div>
                </div>

                {/* TC Preview */}
                <div className="rounded-2xl border-2 border-birla-gold/30 bg-card overflow-hidden mt-4">
                  <div className="bg-gradient-to-r from-birla-blue to-birla-blue/90 p-4 text-center text-white">
                    <h3 className="text-base font-bold">BIRLA OPEN MINDS INTERNATIONAL SCHOOL</h3>
                    <p className="text-[10px] text-white/60">Singur, Hooghly, West Bengal &bull; CBSE Affiliated</p>
                    <div className="mt-1 inline-block px-3 py-0.5 rounded bg-birla-gold/20 border border-birla-gold/30">
                      <p className="text-xs font-bold text-birla-gold">TRANSFER CERTIFICATE</p>
                    </div>
                  </div>
                  <div className="p-4 text-xs space-y-2">
                    <div className="grid grid-cols-2 gap-2">
                      <p>TC No: <span className="font-bold">{tcForm.tcNumber || '---'}</span></p>
                      <p>Date of Issue: <span className="font-bold">{tcForm.dateOfIssue || '---'}</span></p>
                      <p>Student Name: <span className="font-bold">{tcStudent.name}</span></p>
                      <p>BSP ID: <span className="font-mono text-birla-cyan">{tcStudent.bspId}</span></p>
                      <p>Class at Leaving: <span className="font-bold">{tcForm.classLeaving || tcStudent.class}</span></p>
                      <p>Reason: <span className="font-bold">{tcForm.reasonForLeaving || '---'}</span></p>
                      <p>Conduct: <span className="font-bold">{tcForm.conduct}</span></p>
                      <p>Progress: <span className="font-bold">{tcForm.generalProgress}</span></p>
                      <p>Fees Paid: <span className="font-bold">{tcForm.feesPaid}</span></p>
                      <p>Dues Cleared: <span className="font-bold">{tcForm.duesCleared}</span></p>
                    </div>
                    <div className="grid grid-cols-3 gap-4 mt-6 pt-4 border-t border-border">
                      {[['Class Teacher',''],['Exam Controller',''],['Principal','']].map(([t], i) => (
                        <div key={i} className="text-center"><div className="border-t border-muted-foreground/30 pt-1 mt-6"><p className="text-[10px] text-muted-foreground">{t}</p></div></div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 mt-4">
                  <button onClick={handleTCSubmit} className="flex items-center gap-2 px-5 py-2.5 rounded-xl gradient-birla text-white text-sm font-medium"><Save className="w-4 h-4" />Generate TC</button>
                  <button onClick={() => showSuccess('TC printed successfully!')} className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-border text-sm font-medium hover:bg-muted"><Printer className="w-4 h-4" />Print TC</button>
                  <button onClick={() => showSuccess('TC downloaded as PDF!')} className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-border text-sm font-medium hover:bg-muted"><Download className="w-4 h-4" />Download PDF</button>
                  <button onClick={() => { setTcForm({ tcNumber: '', dateOfIssue: '', admissionDate: '', dateOfLeaving: '', classAdmitted: '', classLeaving: '', reasonForLeaving: '', feesPaid: 'Yes', duesCleared: 'Yes', conduct: 'Excellent', character: 'Good', gamesSports: 'Participated', extraCurricular: 'Active', generalProgress: 'Very Good', dateOfPrinting: '', remarks: '' }) }} className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-border text-sm font-medium hover:bg-muted"><RotateCcw className="w-4 h-4" />Reset</button>
                </div>
              </div>
            )}

            {!tcStudent && (
              <div className="p-8 text-center rounded-xl border-2 border-dashed border-muted-foreground/20">
                <FileDown className="w-12 h-12 text-muted-foreground/20 mx-auto mb-3" />
                <p className="text-sm font-medium text-muted-foreground">Select a student above to generate Transfer Certificate</p>
              </div>
            )}
          </div>
        </motion.div>
      )}

      {/* ====== CBSE GRADING ====== */}
      {activeTab === 'cbse-grading' && (
        <motion.div variants={itemVariants} className="space-y-4">
          <div className="rounded-2xl border border-border bg-card p-5">
            <h4 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2"><GraduationCap className="w-4 h-4 text-birla-gold" />CBSE 9-Point Grading Scale</h4>
            <div className="grid grid-cols-4 md:grid-cols-8 gap-3 mb-4">
              {cbseGradingData.map(g => (
                <div key={g.grade} className="p-3 rounded-xl border text-center hover:shadow-sm transition-all" style={{ borderColor: g.color + '40' }}>
                  <div className="w-10 h-10 rounded-full mx-auto mb-2 flex items-center justify-center text-white text-sm font-bold" style={{ background: g.color }}>{g.grade}</div>
                  <p className="text-xs font-medium text-foreground">{g.range}</p>
                  <p className="text-[10px] text-muted-foreground mt-0.5">{g.count} students</p>
                </div>
              ))}
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={cbseGradingData} cx="50%" cy="50%" innerRadius={50} outerRadius={85} paddingAngle={2} dataKey="count" label={({ grade, range }) => `${grade}: ${range}`}>
                    {cbseGradingData.map((e, i) => <Cell key={i} fill={e.color} />)}
                  </Pie>
                  <Tooltip contentStyle={tooltipStyle} />
                  <Legend iconType="circle" wrapperStyle={{ fontSize: '10px' }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </motion.div>
      )}

      {/* ====== REPORTS ====== */}
      {activeTab === 'reports' && (
        <motion.div variants={itemVariants} className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="rounded-2xl border border-border bg-card p-5">
              <h4 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2"><BarChart3 className="w-4 h-4 text-birla-cyan" />Subject-wise Pass Rate</h4>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={examResultsData}>
                    <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? 'rgba(255,255,255,0.06)' : '#f1f5f9'} />
                    <XAxis dataKey="subject" tick={{ fontSize: 9 }} />
                    <YAxis tick={{ fontSize: 10 }} domain={[0, 100]} />
                    <Tooltip contentStyle={tooltipStyle} />
                    <Bar dataKey="avg" fill="#22D3EE" radius={[4,4,0,0]} name="Avg %" />
                    <Bar dataKey="highest" fill="#C8A45C" radius={[4,4,0,0]} name="Highest" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div className="rounded-2xl border border-border bg-card p-5">
              <h4 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2"><TrendingUp className="w-4 h-4 text-emerald-500" />Term Comparison Trend</h4>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={termComparisonData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="subject" tick={{ fontSize: 9 }} />
                    <YAxis tick={{ fontSize: 10 }} domain={[0, 100]} />
                    <Tooltip contentStyle={tooltipStyle} />
                    <Legend wrapperStyle={{ fontSize: '10px' }} />
                    <Line type="monotone" dataKey="term1" stroke="#22D3EE" strokeWidth={2} name="Term 1" />
                    <Line type="monotone" dataKey="term2" stroke="#C8A45C" strokeWidth={2} name="Term 2" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  )
}


