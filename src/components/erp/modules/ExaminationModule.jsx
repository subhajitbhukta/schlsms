'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  FileText, BarChart3, Activity, GraduationCap, TrendingUp,
  Calendar, Users, Plus, X, Shield, Award, BookOpen,
  CheckCircle2, Target, Brain, ClipboardList, Star,
  ArrowUpRight, PieChart as PieChartIcon, Clock, MapPin,
  PenLine, Zap, Trophy, AlertCircle, Hash, Save,
  FileCheck, UserCheck, ListChecks, FormInput, Palette,
  Printer, Stamp, Signature
} from 'lucide-react'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Legend, PieChart, Pie, Cell,
  LineChart, Line, RadarChart, Radar, PolarGrid,
  PolarAngleAxis, PolarRadiusAxis, AreaChart, Area
} from 'recharts'
import useAppStore from '@/store/useAppStore'
import QRStudentLookup, { STUDENT_DB } from '@/components/erp/shared/QRStudentLookup'

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.06 } },
}
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
}

const CHART_COLORS = ['#1A2D4A', '#22D3EE', '#C8A45C', '#8B5CF6', '#10B981', '#EF4444', '#F59E0B']

const examResultsData = [
  { subject: 'Mathematics', appeared: 45, passed: 38, avg: 72, highest: 98, lowest: 28 },
  { subject: 'Science', appeared: 45, passed: 35, avg: 68, highest: 95, lowest: 25 },
  { subject: 'English', appeared: 45, passed: 40, avg: 75, highest: 96, lowest: 32 },
  { subject: 'Hindi', appeared: 45, passed: 36, avg: 70, highest: 92, lowest: 30 },
  { subject: 'Social Science', appeared: 45, passed: 37, avg: 71, highest: 94, lowest: 27 },
  { subject: 'Computer', appeared: 45, passed: 42, avg: 78, highest: 99, lowest: 40 },
]

const studentPerformanceData = [
  { name: 'Aarav Sharma', bspId: 'BSP/WB/2023/00001', penNo: 'PEN-1234-5678', upparId: 'UPPR-WB-000001', math: 84, science: 80, english: 85, hindi: 75, social: 79, total: 403 },
  { name: 'Priya Nair', bspId: 'BSP/WB/2023/00002', penNo: 'PEN-2345-6789', upparId: 'UPPR-WB-000002', math: 92, science: 88, english: 90, hindi: 82, social: 85, total: 437 },
  { name: 'Rohan Gupta', bspId: 'BSP/WB/2023/00003', penNo: 'PEN-3456-7890', upparId: 'UPPR-WB-000003', math: 65, science: 62, english: 70, hindi: 68, social: 64, total: 329 },
  { name: 'Meera Patel', bspId: 'BSP/WB/2023/00004', penNo: 'PEN-4567-8901', upparId: 'UPPR-WB-000004', math: 78, science: 75, english: 82, hindi: 73, social: 76, total: 384 },
  { name: 'Arjun Singh', bspId: 'BSP/WB/2023/00005', penNo: 'PEN-5678-9012', upparId: 'UPPR-WB-000005', math: 88, science: 85, english: 78, hindi: 70, social: 82, total: 403 },
  { name: 'Kavya Iyer', bspId: 'BSP/WB/2023/00006', penNo: 'PEN-6789-0123', upparId: 'UPPR-WB-000006', math: 95, science: 92, english: 88, hindi: 80, social: 90, total: 445 },
]

const classComparisonData = [
  { subject: 'Mathematics', 'IX-A': 72, 'IX-B': 68, 'X-A': 76, 'X-B': 70 },
  { subject: 'Science', 'IX-A': 68, 'IX-B': 65, 'X-A': 73, 'X-B': 67 },
  { subject: 'English', 'IX-A': 75, 'IX-B': 72, 'X-A': 78, 'X-B': 74 },
  { subject: 'Hindi', 'IX-A': 70, 'IX-B': 66, 'X-A': 73, 'X-B': 69 },
  { subject: 'Social Science', 'IX-A': 71, 'IX-B': 67, 'X-A': 74, 'X-B': 70 },
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

const termComparisonData = [
  { subject: 'Mathematics', term1: 70, term2: 76 },
  { subject: 'Science', term1: 65, term2: 72 },
  { subject: 'English', term1: 72, term2: 78 },
  { subject: 'Hindi', term1: 68, term2: 72 },
  { subject: 'Social Science', term1: 66, term2: 71 },
  { subject: 'Computer', term1: 74, term2: 80 },
]

const competencyData = [
  { level: 'Remember', count: 25, color: '#22D3EE' },
  { level: 'Understand', count: 30, color: '#C8A45C' },
  { level: 'Apply', count: 20, color: '#10B981' },
  { level: 'Analyze', count: 15, color: '#8B5CF6' },
  { level: 'Evaluate', count: 7, color: '#F59E0B' },
  { level: 'Create', count: 3, color: '#EF4444' },
]

const boardExamData = [
  { subject: 'Mathematics', appeared: 45, passed: 40, passRate: 88.9, avg: 72 },
  { subject: 'Science', appeared: 45, passed: 38, passRate: 84.4, avg: 68 },
  { subject: 'English', appeared: 45, passed: 42, passRate: 93.3, avg: 75 },
  { subject: 'Hindi', appeared: 45, passed: 39, passRate: 86.7, avg: 70 },
  { subject: 'Social Science', appeared: 45, passed: 41, passRate: 91.1, avg: 71 },
]

const coScholasticData = [
  { area: 'Arts', Aplus: 8, A: 15, Bplus: 12, B: 7, C: 3 },
  { area: 'Sports', Aplus: 10, A: 14, Bplus: 10, B: 8, C: 3 },
  { area: 'Music', Aplus: 6, A: 12, Bplus: 14, B: 9, C: 4 },
  { area: 'Dance', Aplus: 5, A: 10, Bplus: 13, B: 11, C: 6 },
  { area: 'Yoga', Aplus: 12, A: 16, Bplus: 10, B: 5, C: 2 },
]

const examScheduleData = [
  { exam: 'Unit Test 1', subject: 'Mathematics', class: 'X', date: '2026-04-15', time: '8:00 AM', duration: '1.5 hrs', room: 'Room 101', invigilator: 'Dr. Priya Menon' },
  { exam: 'Unit Test 1', subject: 'Science', class: 'X', date: '2026-04-16', time: '8:00 AM', duration: '1.5 hrs', room: 'Lab 3', invigilator: 'Mr. Suresh Patel' },
  { exam: 'Periodic 1', subject: 'English', class: 'IX', date: '2026-04-18', time: '9:00 AM', duration: '2 hrs', room: 'Hall A', invigilator: 'Ms. Anita Desai' },
  { exam: 'Periodic 1', subject: 'Hindi', class: 'IX', date: '2026-04-19', time: '9:00 AM', duration: '2 hrs', room: 'Hall A', invigilator: 'Mrs. Kavita Sharma' },
  { exam: 'Half Yearly', subject: 'Mathematics', class: 'X', date: '2026-05-10', time: '8:00 AM', duration: '3 hrs', room: 'Hall B', invigilator: 'Dr. Priya Menon' },
]

const reportCardTemplates = ['CBSE Standard', 'CBSE Competency-Based', 'NEP 2020 Format', 'Custom School Format']

// CBSE 9-point grading scale helper
const getCBSEGrade = (marks) => {
  if (marks >= 91) return 'A1'
  if (marks >= 81) return 'A2'
  if (marks >= 71) return 'B1'
  if (marks >= 61) return 'B2'
  if (marks >= 51) return 'C1'
  if (marks >= 41) return 'C2'
  if (marks >= 33) return 'D'
  return 'E'
}

const getGradeColor = (grade) => {
  const colors = { A1: '#10B981', A2: '#22D3EE', B1: '#C8A45C', B2: '#8B5CF6', C1: '#F59E0B', C2: '#EF4444', D: '#DC2626', E: '#991B1B' }
  return colors[grade] || '#64748b'
}

const getCompetencyLevel = (marks) => {
  if (marks >= 85) return 'Advanced'
  if (marks >= 70) return 'Proficient'
  if (marks >= 55) return 'Developing'
  if (marks >= 33) return 'Beginning'
  return 'Needs Improvement'
}

// Sample marksheet data for the selected student
const marksheetStudent = STUDENT_DB[0] // Aarav Sharma

const marksheetScholastic = [
  { subject: 'English', theoryMax: 80, theoryObt: 68, iaMax: 20, iaObt: 16, total: 84, grade: getCBSEGrade(84), competency: 'Proficient' },
  { subject: 'Hindi', theoryMax: 80, theoryObt: 56, iaMax: 20, iaObt: 14, total: 70, grade: getCBSEGrade(70), competency: 'Proficient' },
  { subject: 'Mathematics', theoryMax: 80, theoryObt: 72, iaMax: 20, iaObt: 12, total: 84, grade: getCBSEGrade(84), competency: 'Proficient' },
  { subject: 'Science', theoryMax: 80, theoryObt: 64, iaMax: 20, iaObt: 16, total: 80, grade: getCBSEGrade(80), competency: 'Proficient' },
  { subject: 'Social Science', theoryMax: 80, theoryObt: 60, iaMax: 20, iaObt: 16, total: 76, grade: getCBSEGrade(76), competency: 'Proficient' },
  { subject: 'Computer Science', theoryMax: 70, theoryObt: 62, iaMax: 30, iaObt: 26, total: 88, grade: getCBSEGrade(88), competency: 'Advanced' },
]

const marksheetCoScholastic = [
  { area: 'Art Education', grade: 'A', descriptor: 'Outstanding' },
  { area: 'Health & Physical Education', grade: 'A+', descriptor: 'Exceptional' },
  { area: 'Discipline', grade: 'A', descriptor: 'Outstanding' },
]

const marksheetCompetencies = [
  { competency: 'Critical Thinking', level: 'Proficient', icon: '🧠' },
  { competency: 'Problem Solving', level: 'Proficient', icon: '💡' },
  { competency: 'Communication', level: 'Advanced', icon: '🗣️' },
  { competency: 'Creativity', level: 'Developing', icon: '🎨' },
  { competency: 'Collaboration', level: 'Proficient', icon: '🤝' },
]

export default function ExaminationModule() {
  const { darkMode } = useAppStore()
  const [activeTab, setActiveTab] = useState('overview')
  const [showForm, setShowForm] = useState(null)
  const [marksheetSelectedStudent, setMarksheetSelectedStudent] = useState(null)

  const [examScheduleForm, setExamScheduleForm] = useState({
    examName: '', subject: '', class: '', date: '', startTime: '', duration: '', maxMarks: '', examType: 'Unit Test', roomNo: '', invigilator: ''
  })
  const [marksEntryForm, setMarksEntryForm] = useState({
    examName: '', subject: '', class: '', student: '', marksObtained: '', maxMarks: '100', competencyLevel: '', remarks: ''
  })
  const [marksEntryStudent, setMarksEntryStudent] = useState(null)
  const [reportCardForm, setReportCardForm] = useState({
    class: '', section: '', term: '', examType: '', includeScholastic: true, includeCoScholastic: true, includeCompetency: true, includeAttendance: true, template: 'CBSE Standard'
  })
  const [skillAssessForm, setSkillAssessForm] = useState({
    student: '', skill: 'Public Speaking', rubric1Name: 'Content', rubric1Max: '25', rubric1Actual: '',
    rubric2Name: 'Delivery', rubric2Max: '25', rubric2Actual: '',
    rubric3Name: 'Confidence', rubric3Max: '25', rubric3Actual: '',
    rubric4Name: 'Language', rubric4Max: '25', rubric4Actual: '',
    overallGrade: '', comments: ''
  })
  const [coScholasticForm, setCoScholasticForm] = useState({
    student: '', area: 'Arts', grade: 'A', teacherRemarks: '', evidence: ''
  })
  const [boardExamForm, setBoardExamForm] = useState({
    student: '', subjects: [], registrationNumber: '', examCenter: '', feePaid: false, hallTicketIssued: false
  })
  const [competencyMappingForm, setCompetencyMappingForm] = useState({
    subject: '', class: '', questionNo: '', bloomsLevel: 'Remember', competencyTag: '', marksAllocated: '', nepAlignment: false
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
    { id: 'schedule', label: 'Schedule', icon: Calendar },
    { id: 'report-cards', label: 'Report Cards', icon: FileText },
    { id: 'marksheet', label: 'Marksheet', icon: FileCheck },
    { id: 'cbse-grading', label: 'CBSE Grading', icon: GraduationCap },
    { id: 'forms', label: 'Forms', icon: FormInput },
    { id: 'reports', label: 'Reports', icon: Activity },
  ]

  const forms = [
    { id: 'examSchedule', label: 'Exam Schedule', icon: Calendar },
    { id: 'marksEntry', label: 'Marks Entry', icon: PenLine },
    { id: 'reportCard', label: 'Report Card Gen', icon: FileText },
    { id: 'skillAssess', label: 'Skill Assessment', icon: Target },
    { id: 'coScholastic', label: 'Co-Scholastic', icon: Palette },
    { id: 'boardExam', label: 'Board Exam Reg', icon: Shield },
    { id: 'competencyMap', label: 'Competency Map', icon: Brain },
  ]

  const handleFormSubmit = (formName, successMsg) => {
    alert(successMsg)
    setShowForm(null)
  }

  const subjects = ['Mathematics', 'Science', 'English', 'Hindi', 'Social Science', 'Computer Science']
  const classes = ['I','II','III','IV','V','VI','VII','VIII','IX','X','XI','XII']
  const sections = ['A','B','C']

  // Get the active marksheet student (either selected via lookup or default)
  const activeMarksheetStudent = marksheetSelectedStudent || marksheetStudent

  // Recalculate marksheet totals for the active student
  const marksheetTotalObt = marksheetScholastic.reduce((sum, s) => sum + s.total, 0)
  const marksheetTotalMax = marksheetScholastic.reduce((sum, s) => sum + s.theoryMax + s.iaMax, 0)
  const marksheetPercentage = ((marksheetTotalObt / marksheetTotalMax) * 100).toFixed(1)
  const marksheetOverallResult = marksheetScholastic.every(s => s.total >= 33) ? 'PASS' : 'FAIL'

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="show" className="p-4 lg:p-6 space-y-6 max-w-[1600px] mx-auto">
      {/* Header */}
      <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
            <FileText className="w-5 h-5 text-birla-cyan" />Examination Management
          </h2>
          <p className="text-[11px] text-muted-foreground mt-0.5">Birla Open Minds International School &bull; CBSE &bull; NEP 2020 Aligned</p>
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
          { label: 'Exams Conducted', value: '12', icon: ClipboardList, color: 'text-cyan-500 bg-cyan-500/10', trend: '+3' },
          { label: 'Pass Rate', value: '89.2%', icon: CheckCircle2, color: 'text-emerald-500 bg-emerald-500/10', trend: '+2.1%' },
          { label: 'Avg Score', value: '72.4', icon: TrendingUp, color: 'text-amber-500 bg-amber-500/10', trend: '+1.8' },
          { label: 'A1 Grades', value: '48', icon: Award, color: 'text-purple-500 bg-purple-500/10', trend: '+8' },
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
              <h4 className="text-sm font-semibold text-foreground mb-1 flex items-center gap-2"><BarChart3 className="w-4 h-4 text-birla-cyan" />Subject-wise Results</h4>
              <p className="text-[10px] text-muted-foreground mb-3">Average scores across subjects</p>
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
              <p className="text-[10px] text-muted-foreground mb-3">Grade-wise student count</p>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={cbseGradingData} cx="50%" cy="50%" innerRadius={50} outerRadius={85} paddingAngle={2} dataKey="count">
                      {cbseGradingData.map((entry, idx) => <Cell key={idx} fill={entry.color} />)}
                    </Pie>
                    <Tooltip contentStyle={tooltipStyle} />
                    <Legend iconType="circle" wrapperStyle={{ fontSize: '10px' }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </motion.div>
          </div>
        </div>
      )}

      {/* ====== SCHEDULE TAB ====== */}
      {activeTab === 'schedule' && (
        <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-5">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-sm font-semibold text-foreground flex items-center gap-2"><Calendar className="w-4 h-4 text-birla-cyan" />Exam Schedule</h4>
            <button onClick={() => { setActiveTab('forms'); setShowForm('examSchedule') }} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg gradient-birla text-white text-xs font-medium"><Plus className="w-3.5 h-3.5" />Add Exam</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-muted/30">
                  <th className="text-left px-3 py-2 text-[10px] font-semibold text-muted-foreground">Exam</th>
                  <th className="text-left px-3 py-2 text-[10px] font-semibold text-muted-foreground">Subject</th>
                  <th className="text-left px-3 py-2 text-[10px] font-semibold text-muted-foreground">Class</th>
                  <th className="text-left px-3 py-2 text-[10px] font-semibold text-muted-foreground">Date</th>
                  <th className="text-left px-3 py-2 text-[10px] font-semibold text-muted-foreground">Time</th>
                  <th className="text-left px-3 py-2 text-[10px] font-semibold text-muted-foreground">Room</th>
                  <th className="text-left px-3 py-2 text-[10px] font-semibold text-muted-foreground">Invigilator</th>
                </tr>
              </thead>
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

      {/* ====== REPORT CARDS TAB ====== */}
      {activeTab === 'report-cards' && (
        <motion.div variants={itemVariants} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="rounded-2xl border border-border bg-card p-4 text-center">
              <p className="text-2xl font-bold text-foreground">310</p>
              <p className="text-xs text-muted-foreground">Report Cards Generated</p>
            </div>
            <div className="rounded-2xl border border-border bg-card p-4 text-center">
              <p className="text-2xl font-bold text-foreground">4</p>
              <p className="text-xs text-muted-foreground">Templates Available</p>
            </div>
            <div className="rounded-2xl border border-border bg-card p-4 text-center">
              <p className="text-2xl font-bold text-foreground">CBSE + NEP</p>
              <p className="text-xs text-muted-foreground">Compliance</p>
            </div>
          </div>
          <div className="rounded-2xl border border-border bg-card p-5">
            <h4 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2"><FileText className="w-4 h-4 text-birla-gold" />Recent Report Cards</h4>
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {studentPerformanceData.slice(0, 5).map((s, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-xl border border-border bg-muted/20">
                  <div>
                    <p className="text-sm font-medium text-foreground">{s.name}</p>
                    <div className="flex gap-2 mt-0.5">
                      <span className="text-[10px] font-mono text-muted-foreground">BSP: {s.bspId}</span>
                      <span className="text-[10px] font-mono text-muted-foreground">PEN: {s.penNo}</span>
                      <span className="text-[10px] font-mono text-muted-foreground">UPPR: {s.upparId}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-foreground">{s.total}/500</p>
                    <span className="text-[10px] px-2 py-0.5 rounded-lg bg-birla-gold/10 text-birla-gold">{(s.total/500*100).toFixed(1)}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* ====== MARKSHEET TAB ====== */}
      {activeTab === 'marksheet' && (
        <motion.div variants={itemVariants} className="space-y-4">
          {/* Student Lookup */}
          <div className="rounded-2xl border border-border bg-card p-5">
            <h4 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2"><FileCheck className="w-4 h-4 text-birla-cyan" />Student Marksheet Lookup</h4>
            <p className="text-[10px] text-muted-foreground mb-3">Scan student ID card QR or enter student ID / name to view marksheet</p>
            <QRStudentLookup
              onStudentSelect={(student) => setMarksheetSelectedStudent(student)}
              mode="student"
              placeholder="Scan QR or enter Student ID / Name for Marksheets"
              showDetails={true}
              label="Student Identification (QR / ID / Name)"
            />
          </div>

          {/* Marksheet Card */}
          <div className="rounded-2xl border-2 border-birla-gold/30 bg-card overflow-hidden">
            {/* Marksheet Header */}
            <div className="bg-gradient-to-r from-birla-blue to-birla-blue/90 p-5 text-center text-white">
              <div className="flex items-center justify-center gap-2 mb-1">
                <GraduationCap className="w-6 h-6" />
                <h3 className="text-lg font-bold tracking-wide">BIRLA OPEN MINDS INTERNATIONAL SCHOOL</h3>
              </div>
              <p className="text-[11px] text-white/70">Affiliated to CBSE, New Delhi &bull; UDISE Code: 19010100101</p>
              <p className="text-[11px] text-white/70">Singur, Hooghly, West Bengal &bull; Session: 2025-26</p>
              <div className="mt-2 inline-block px-4 py-1 rounded-lg bg-birla-gold/20 border border-birla-gold/40">
                <p className="text-sm font-bold text-birla-gold">PERFORMANCE MARKSHEET (NEP 2020 & CBSE Aligned)</p>
              </div>
            </div>

            {/* Student Info */}
            <div className="p-5 border-b border-border">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-semibold text-muted-foreground w-20">Name:</span>
                    <span className="text-sm font-bold text-foreground">{activeMarksheetStudent.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-semibold text-muted-foreground w-20">BSP ID:</span>
                    <span className="text-xs font-mono text-birla-cyan">{activeMarksheetStudent.bspId}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-semibold text-muted-foreground w-20">PEN No:</span>
                    <span className="text-xs font-mono text-birla-cyan">{activeMarksheetStudent.penNo}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-semibold text-muted-foreground w-20">Uppar ID:</span>
                    <span className="text-xs font-mono text-birla-cyan">{activeMarksheetStudent.upparId}</span>
                  </div>
                </div>
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-semibold text-muted-foreground w-20">Class:</span>
                    <span className="text-sm font-bold text-foreground">{activeMarksheetStudent.class}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-semibold text-muted-foreground w-20">Section:</span>
                    <span className="text-sm font-bold text-foreground">{activeMarksheetStudent.section}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-semibold text-muted-foreground w-20">Roll No:</span>
                    <span className="text-sm font-bold text-foreground">{activeMarksheetStudent.rollNo}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-semibold text-muted-foreground w-20">Attendance:</span>
                    <span className="text-sm font-bold text-emerald-600">92.5%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Scholastic Area */}
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
                      <th className="px-3 py-2 text-[10px] font-bold text-muted-foreground" rowSpan={2}>Competency Level</th>
                    </tr>
                    <tr className="border-b border-border bg-birla-blue/5">
                      <th className="px-3 py-1 text-[9px] text-muted-foreground">Max</th>
                      <th className="px-3 py-1 text-[9px] text-muted-foreground">Obt</th>
                      <th className="px-3 py-1 text-[9px] text-muted-foreground">Max</th>
                      <th className="px-3 py-1 text-[9px] text-muted-foreground">Obt</th>
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
                        <td className="px-3 py-2">
                          <span className="inline-flex items-center justify-center w-8 h-5 rounded text-[10px] font-bold text-white" style={{ background: getGradeColor(s.grade) }}>{s.grade}</span>
                        </td>
                        <td className="px-3 py-2">
                          <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                            s.competency === 'Advanced' ? 'bg-emerald-500/10 text-emerald-600' :
                            s.competency === 'Proficient' ? 'bg-cyan-500/10 text-cyan-600' :
                            s.competency === 'Developing' ? 'bg-amber-500/10 text-amber-600' :
                            'bg-red-500/10 text-red-600'
                          }`}>{s.competency}</span>
                        </td>
                      </tr>
                    ))}
                    <tr className="border-t-2 border-birla-blue/20 bg-birla-blue/5 font-bold">
                      <td className="text-left px-3 py-2 text-xs text-foreground">GRAND TOTAL</td>
                      <td className="px-3 py-2 text-xs text-muted-foreground">{marksheetScholastic.reduce((s, x) => s + x.theoryMax, 0)}</td>
                      <td className="px-3 py-2 text-xs text-foreground">{marksheetScholastic.reduce((s, x) => s + x.theoryObt, 0)}</td>
                      <td className="px-3 py-2 text-xs text-muted-foreground">{marksheetScholastic.reduce((s, x) => s + x.iaMax, 0)}</td>
                      <td className="px-3 py-2 text-xs text-foreground">{marksheetScholastic.reduce((s, x) => s + x.iaObt, 0)}</td>
                      <td className="px-3 py-2 text-sm text-foreground">{marksheetTotalObt}</td>
                      <td className="px-3 py-2" colSpan={2}></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Co-Scholastic Area */}
            <div className="p-5 border-b border-border">
              <h5 className="text-sm font-bold text-foreground mb-3 flex items-center gap-2"><Palette className="w-4 h-4 text-birla-gold" />CO-SCHOLASTIC AREA</h5>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b-2 border-birla-gold/20 bg-birla-gold/5">
                      <th className="text-left px-4 py-2 text-[10px] font-bold text-muted-foreground">Area</th>
                      <th className="text-center px-4 py-2 text-[10px] font-bold text-muted-foreground">Grade</th>
                      <th className="text-center px-4 py-2 text-[10px] font-bold text-muted-foreground">Descriptor</th>
                    </tr>
                  </thead>
                  <tbody>
                    {marksheetCoScholastic.map((c, i) => (
                      <tr key={i} className={`border-b border-border/50 ${i % 2 === 0 ? 'bg-muted/10' : ''}`}>
                        <td className="px-4 py-2 text-xs font-medium text-foreground">{c.area}</td>
                        <td className="px-4 py-2 text-center">
                          <span className="inline-flex items-center justify-center px-3 py-0.5 rounded-full text-xs font-bold bg-birla-gold/10 text-birla-gold">{c.grade}</span>
                        </td>
                        <td className="px-4 py-2 text-center text-xs text-muted-foreground">{c.descriptor}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* NEP 2020 Competency Mapping */}
            <div className="p-5 border-b border-border">
              <h5 className="text-sm font-bold text-foreground mb-3 flex items-center gap-2"><Brain className="w-4 h-4 text-birla-cyan" />NEP 2020 COMPETENCY MAPPING</h5>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                {marksheetCompetencies.map((comp, i) => (
                  <div key={i} className="rounded-xl border border-border p-3 text-center bg-muted/10 hover:bg-muted/20 transition-colors">
                    <div className="text-2xl mb-1">{comp.icon}</div>
                    <p className="text-[11px] font-semibold text-foreground">{comp.competency}</p>
                    <span className={`mt-1 inline-block text-[10px] px-2 py-0.5 rounded-full font-medium ${
                      comp.level === 'Advanced' ? 'bg-emerald-500/10 text-emerald-600' :
                      comp.level === 'Proficient' ? 'bg-cyan-500/10 text-cyan-600' :
                      comp.level === 'Developing' ? 'bg-amber-500/10 text-amber-600' :
                      'bg-red-500/10 text-red-600'
                    }`}>{comp.level}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Result Summary */}
            <div className="p-5 border-b border-border bg-muted/5">
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                <div className="text-center">
                  <p className="text-[10px] text-muted-foreground mb-1">Total Marks</p>
                  <p className="text-lg font-bold text-foreground">{marksheetTotalObt}/{marksheetTotalMax}</p>
                </div>
                <div className="text-center">
                  <p className="text-[10px] text-muted-foreground mb-1">Percentage</p>
                  <p className="text-lg font-bold text-birla-cyan">{marksheetPercentage}%</p>
                </div>
                <div className="text-center">
                  <p className="text-[10px] text-muted-foreground mb-1">Overall Result</p>
                  <span className={`inline-block text-lg font-bold px-3 py-0.5 rounded-lg ${marksheetOverallResult === 'PASS' ? 'bg-emerald-500/10 text-emerald-600' : 'bg-red-500/10 text-red-600'}`}>{marksheetOverallResult}</span>
                </div>
                <div className="text-center">
                  <p className="text-[10px] text-muted-foreground mb-1">Rank in Class</p>
                  <p className="text-lg font-bold text-foreground">3rd</p>
                </div>
                <div className="text-center">
                  <p className="text-[10px] text-muted-foreground mb-1">Attendance</p>
                  <p className="text-lg font-bold text-emerald-600">92.5%</p>
                </div>
              </div>
            </div>

            {/* Signature Area */}
            <div className="p-5 border-b border-border">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="border-t-2 border-muted-foreground/30 pt-2 mt-10">
                    <p className="text-xs font-semibold text-foreground">Class Teacher</p>
                    <p className="text-[10px] text-muted-foreground">Mrs. Kavita Sharma</p>
                  </div>
                </div>
                <div className="text-center">
                  <div className="border-t-2 border-muted-foreground/30 pt-2 mt-10">
                    <p className="text-xs font-semibold text-foreground">Exam Controller</p>
                    <p className="text-[10px] text-muted-foreground">Dr. Suresh Babu</p>
                  </div>
                </div>
                <div className="text-center">
                  <div className="border-t-2 border-muted-foreground/30 pt-2 mt-10 flex flex-col items-center">
                    <Stamp className="w-5 h-5 text-birla-gold mb-1" />
                    <p className="text-xs font-semibold text-foreground">Principal</p>
                    <p className="text-[10px] text-muted-foreground">Birla Open Minds International School</p>
                  </div>
                </div>
              </div>
            </div>

            {/* CBSE Grading Scale Reference */}
            <div className="p-5 bg-muted/10">
              <h5 className="text-xs font-bold text-muted-foreground mb-2 flex items-center gap-1.5"><GraduationCap className="w-3.5 h-3.5" />CBSE 9-Point Grading Scale Reference</h5>
              <div className="grid grid-cols-4 md:grid-cols-8 gap-2">
                {cbseGradingData.map(g => (
                  <div key={g.grade} className="p-2 rounded-lg border border-border text-center" style={{ borderColor: g.color + '40' }}>
                    <div className="w-7 h-7 rounded-full mx-auto mb-0.5 flex items-center justify-center text-white text-[10px] font-bold" style={{ background: g.color }}>{g.grade}</div>
                    <p className="text-[9px] text-muted-foreground">{g.range}</p>
                  </div>
                ))}
              </div>
              <p className="text-[9px] text-muted-foreground mt-2">As per CBSE norms: A1=Outstanding, A2=Excellent, B1=Very Good, B2=Good, C1=Above Average, C2=Average, D=Below Average, E=Needs Improvement</p>
            </div>

            {/* Print Button */}
            <div className="p-4 flex justify-end">
              <button onClick={() => alert('Marksheet sent to printer!')} className="flex items-center gap-2 px-4 py-2 rounded-xl gradient-birla text-white text-sm font-medium">
                <Printer className="w-4 h-4" />Print Marksheet
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* ====== CBSE GRADING TAB ====== */}
      {activeTab === 'cbse-grading' && (
        <motion.div variants={itemVariants} className="space-y-4">
          <div className="rounded-2xl border border-border bg-card p-5">
            <h4 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2"><GraduationCap className="w-4 h-4 text-birla-gold" />CBSE Grading Scale</h4>
            <div className="grid grid-cols-4 md:grid-cols-8 gap-2">
              {cbseGradingData.map(g => (
                <div key={g.grade} className="p-3 rounded-xl border border-border text-center" style={{ borderColor: g.color + '40' }}>
                  <div className="w-10 h-10 rounded-full mx-auto mb-1 flex items-center justify-center text-white text-sm font-bold" style={{ background: g.color }}>{g.grade}</div>
                  <p className="text-[10px] text-muted-foreground">{g.range}</p>
                  <p className="text-xs font-semibold text-foreground mt-1">{g.count}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-2xl border border-border bg-card p-5">
            <h4 className="text-sm font-semibold text-foreground mb-3">Grade Distribution Chart</h4>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={cbseGradingData}>
                  <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? 'rgba(255,255,255,0.06)' : '#f1f5f9'} />
                  <XAxis dataKey="grade" tick={{ fontSize: 10, fill: darkMode ? '#94a3b8' : '#64748b' }} />
                  <YAxis tick={{ fontSize: 10, fill: darkMode ? '#94a3b8' : '#64748b' }} />
                  <Tooltip contentStyle={tooltipStyle} />
                  <Bar dataKey="count" radius={[4,4,0,0]} name="Students">
                    {cbseGradingData.map((entry, idx) => <Cell key={idx} fill={entry.color} />)}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </motion.div>
      )}

      {/* ====== FORMS TAB ====== */}
      {activeTab === 'forms' && (
        <div className="space-y-4">
          <motion.div variants={itemVariants} className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
            {forms.map(form => {
              const Icon = form.icon
              return (
                <button key={form.id} onClick={() => setShowForm(form.id)}
                  className={`flex flex-col items-center gap-2 p-3 rounded-2xl border border-border hover:border-birla-gold/30 hover:shadow-lg transition-all group ${showForm === form.id ? 'border-birla-gold/50 shadow-lg bg-birla-gold/5' : ''}`}>
                  <div className="w-9 h-9 rounded-xl bg-birla-blue/10 flex items-center justify-center group-hover:scale-110 transition-transform"><Icon className="w-4 h-4 text-birla-blue dark:text-birla-cyan" /></div>
                  <span className="text-[10px] text-muted-foreground group-hover:text-foreground text-center">{form.label}</span>
                </button>
              )
            })}
          </motion.div>

          {/* 1. Exam Schedule Creation Form */}
          {showForm === 'examSchedule' && (
            <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-6">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-sm font-semibold text-foreground flex items-center gap-2"><Calendar className="w-4 h-4 text-birla-cyan" />Exam Schedule Creation Form</h4>
                <button onClick={() => setShowForm(null)} className="p-1.5 rounded-lg hover:bg-muted text-muted-foreground"><X className="w-4 h-4" /></button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div><label className={labelClass}>Exam Name *</label><input className={inputClass} placeholder="e.g., Unit Test 1" value={examScheduleForm.examName} onChange={e => setExamScheduleForm({...examScheduleForm, examName: e.target.value})} /></div>
                <div><label className={labelClass}>Subject *</label><select className={inputClass} value={examScheduleForm.subject} onChange={e => setExamScheduleForm({...examScheduleForm, subject: e.target.value})}><option value="">Select</option>{subjects.map(s => <option key={s}>{s}</option>)}</select></div>
                <div><label className={labelClass}>Class *</label><select className={inputClass} value={examScheduleForm.class} onChange={e => setExamScheduleForm({...examScheduleForm, class: e.target.value})}><option value="">Select</option>{classes.map(c => <option key={c}>{c}</option>)}</select></div>
                <div><label className={labelClass}>Date *</label><input type="date" className={inputClass} value={examScheduleForm.date} onChange={e => setExamScheduleForm({...examScheduleForm, date: e.target.value})} /></div>
                <div><label className={labelClass}>Start Time *</label><input type="time" className={inputClass} value={examScheduleForm.startTime} onChange={e => setExamScheduleForm({...examScheduleForm, startTime: e.target.value})} /></div>
                <div><label className={labelClass}>Duration *</label><input className={inputClass} placeholder="e.g., 3 hours" value={examScheduleForm.duration} onChange={e => setExamScheduleForm({...examScheduleForm, duration: e.target.value})} /></div>
                <div><label className={labelClass}>Max Marks *</label><input type="number" className={inputClass} placeholder="100" value={examScheduleForm.maxMarks} onChange={e => setExamScheduleForm({...examScheduleForm, maxMarks: e.target.value})} /></div>
                <div><label className={labelClass}>Exam Type *</label><select className={inputClass} value={examScheduleForm.examType} onChange={e => setExamScheduleForm({...examScheduleForm, examType: e.target.value})}><option value="Board">Board Exam</option><option value="Unit Test">Unit Test</option><option value="Periodic">Periodic</option><option value="Pre-Board">Pre-Board</option><option value="Annual">Annual</option></select></div>
                <div><label className={labelClass}>Room No *</label><input className={inputClass} placeholder="e.g., Hall A" value={examScheduleForm.roomNo} onChange={e => setExamScheduleForm({...examScheduleForm, roomNo: e.target.value})} /></div>
                <div className="md:col-span-2 lg:col-span-3"><label className={labelClass}>Invigilator *</label><input className={inputClass} placeholder="Teacher name" value={examScheduleForm.invigilator} onChange={e => setExamScheduleForm({...examScheduleForm, invigilator: e.target.value})} /></div>
              </div>
              <div className="flex justify-end gap-3 mt-4">
                <button onClick={() => setShowForm(null)} className="px-4 py-2 rounded-xl border border-border text-sm text-muted-foreground hover:bg-muted/50">Cancel</button>
                <button onClick={() => handleFormSubmit('examSchedule', 'Exam schedule created successfully!')} className="px-4 py-2 rounded-xl gradient-birla text-white text-sm font-medium">Create Schedule</button>
              </div>
            </motion.div>
          )}

          {/* 2. Marks Entry Form */}
          {showForm === 'marksEntry' && (
            <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-6">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-sm font-semibold text-foreground flex items-center gap-2"><PenLine className="w-4 h-4 text-birla-gold" />Marks Entry Form</h4>
                <button onClick={() => setShowForm(null)} className="p-1.5 rounded-lg hover:bg-muted text-muted-foreground"><X className="w-4 h-4" /></button>
              </div>
              {/* QR Student Lookup */}
              <div className="mb-4">
                <QRStudentLookup
                  onStudentSelect={(student) => {
                    setMarksEntryStudent(student)
                    setMarksEntryForm({...marksEntryForm, student: student ? student.name : ''})
                  }}
                  mode="student"
                  placeholder="Scan QR or enter Student ID / Name for Marks Entry"
                  showDetails={true}
                  label="Student Identification (QR / ID / Name)"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div><label className={labelClass}>Exam Name *</label><select className={inputClass} value={marksEntryForm.examName} onChange={e => setMarksEntryForm({...marksEntryForm, examName: e.target.value})}><option value="">Select</option><option>Unit Test 1</option><option>Periodic 1</option><option>Half Yearly</option><option>Annual</option></select></div>
                <div><label className={labelClass}>Subject *</label><select className={inputClass} value={marksEntryForm.subject} onChange={e => setMarksEntryForm({...marksEntryForm, subject: e.target.value})}><option value="">Select</option>{subjects.map(s => <option key={s}>{s}</option>)}</select></div>
                <div><label className={labelClass}>Class *</label><select className={inputClass} value={marksEntryForm.class} onChange={e => setMarksEntryForm({...marksEntryForm, class: e.target.value})}><option value="">Select</option>{classes.map(c => <option key={c}>{c}</option>)}</select></div>
                <div>
                  <label className={labelClass}>Student * (or use QR lookup above)</label>
                  <select className={inputClass} value={marksEntryForm.student} onChange={e => {
                    const sel = e.target.value
                    const found = STUDENT_DB.find(s => s.name === sel)
                    setMarksEntryStudent(found || null)
                    setMarksEntryForm({...marksEntryForm, student: sel})
                  }}>
                    <option value="">Select Student</option>
                    {STUDENT_DB.map(s => <option key={s.id} value={s.name}>{s.name} (BSP:{s.bspId} | PEN:{s.penNo} | UPPR:{s.upparId})</option>)}
                  </select>
                </div>
                <div><label className={labelClass}>Marks Obtained *</label><input type="number" className={inputClass} placeholder="0-100" value={marksEntryForm.marksObtained} onChange={e => setMarksEntryForm({...marksEntryForm, marksObtained: e.target.value})} /></div>
                <div><label className={labelClass}>Max Marks *</label><input type="number" className={inputClass} value={marksEntryForm.maxMarks} onChange={e => setMarksEntryForm({...marksEntryForm, maxMarks: e.target.value})} /></div>
                <div><label className={labelClass}>Competency Level</label><select className={inputClass} value={marksEntryForm.competencyLevel} onChange={e => setMarksEntryForm({...marksEntryForm, competencyLevel: e.target.value})}><option value="">Select</option><option>Remember</option><option>Understand</option><option>Apply</option><option>Analyze</option><option>Evaluate</option><option>Create</option></select></div>
                <div className="md:col-span-2 lg:col-span-3"><label className={labelClass}>Remarks</label><input className={inputClass} placeholder="Optional remarks" value={marksEntryForm.remarks} onChange={e => setMarksEntryForm({...marksEntryForm, remarks: e.target.value})} /></div>
              </div>
              <div className="flex justify-end gap-3 mt-4">
                <button onClick={() => setShowForm(null)} className="px-4 py-2 rounded-xl border border-border text-sm text-muted-foreground hover:bg-muted/50">Cancel</button>
                <button onClick={() => handleFormSubmit('marksEntry', `Marks saved successfully for ${marksEntryForm.student || 'student'}!`)} className="px-4 py-2 rounded-xl gradient-birla text-white text-sm font-medium">Save Marks</button>
              </div>
            </motion.div>
          )}

          {/* 3. Report Card Generation Form */}
          {showForm === 'reportCard' && (
            <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-6">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-sm font-semibold text-foreground flex items-center gap-2"><FileText className="w-4 h-4 text-emerald-500" />Report Card Generation Form</h4>
                <button onClick={() => setShowForm(null)} className="p-1.5 rounded-lg hover:bg-muted text-muted-foreground"><X className="w-4 h-4" /></button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div><label className={labelClass}>Class *</label><select className={inputClass} value={reportCardForm.class} onChange={e => setReportCardForm({...reportCardForm, class: e.target.value})}><option value="">Select</option>{classes.map(c => <option key={c}>{c}</option>)}</select></div>
                <div><label className={labelClass}>Section *</label><select className={inputClass} value={reportCardForm.section} onChange={e => setReportCardForm({...reportCardForm, section: e.target.value})}><option value="">Select</option>{sections.map(s => <option key={s}>{s}</option>)}</select></div>
                <div><label className={labelClass}>Term *</label><select className={inputClass} value={reportCardForm.term} onChange={e => setReportCardForm({...reportCardForm, term: e.target.value})}><option value="">Select</option><option>Term 1</option><option>Term 2</option><option>Annual</option></select></div>
                <div><label className={labelClass}>Exam Type *</label><select className={inputClass} value={reportCardForm.examType} onChange={e => setReportCardForm({...reportCardForm, examType: e.target.value})}><option value="">Select</option><option>Periodic</option><option>Half Yearly</option><option>Annual</option><option>Board</option></select></div>
                <div><label className={labelClass}>Template *</label><select className={inputClass} value={reportCardForm.template} onChange={e => setReportCardForm({...reportCardForm, template: e.target.value})}>{reportCardTemplates.map(t => <option key={t}>{t}</option>)}</select></div>
              </div>
              <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-3">
                <label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" checked={reportCardForm.includeScholastic} onChange={e => setReportCardForm({...reportCardForm, includeScholastic: e.target.checked})} className="w-4 h-4 rounded accent-[#C8A45C]" /><span className="text-xs text-muted-foreground">Scholastic</span></label>
                <label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" checked={reportCardForm.includeCoScholastic} onChange={e => setReportCardForm({...reportCardForm, includeCoScholastic: e.target.checked})} className="w-4 h-4 rounded accent-[#C8A45C]" /><span className="text-xs text-muted-foreground">Co-Scholastic</span></label>
                <label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" checked={reportCardForm.includeCompetency} onChange={e => setReportCardForm({...reportCardForm, includeCompetency: e.target.checked})} className="w-4 h-4 rounded accent-[#C8A45C]" /><span className="text-xs text-muted-foreground">Competency</span></label>
                <label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" checked={reportCardForm.includeAttendance} onChange={e => setReportCardForm({...reportCardForm, includeAttendance: e.target.checked})} className="w-4 h-4 rounded accent-[#C8A45C]" /><span className="text-xs text-muted-foreground">Attendance</span></label>
              </div>
              <div className="flex justify-end gap-3 mt-4">
                <button onClick={() => setShowForm(null)} className="px-4 py-2 rounded-xl border border-border text-sm text-muted-foreground hover:bg-muted/50">Cancel</button>
                <button onClick={() => handleFormSubmit('reportCard', 'Report cards generated successfully!')} className="px-4 py-2 rounded-xl gradient-birla text-white text-sm font-medium">Generate Report Cards</button>
              </div>
            </motion.div>
          )}

          {/* 4. Skill Assessment Form */}
          {showForm === 'skillAssess' && (
            <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-6">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-sm font-semibold text-foreground flex items-center gap-2"><Target className="w-4 h-4 text-purple-500" />Skill Assessment Form</h4>
                <button onClick={() => setShowForm(null)} className="p-1.5 rounded-lg hover:bg-muted text-muted-foreground"><X className="w-4 h-4" /></button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div><label className={labelClass}>Student *</label><select className={inputClass} value={skillAssessForm.student} onChange={e => setSkillAssessForm({...skillAssessForm, student: e.target.value})}><option value="">Select</option>{STUDENT_DB.map(s => <option key={s.id}>{s.name}</option>)}</select></div>
                <div><label className={labelClass}>Skill *</label><select className={inputClass} value={skillAssessForm.skill} onChange={e => setSkillAssessForm({...skillAssessForm, skill: e.target.value})}><option>Public Speaking</option><option>Problem Solving</option><option>Coding</option><option>Lab Work</option><option>Map Reading</option><option>Creative Writing</option></select></div>
              </div>
              <div className="mt-4">
                <label className="block text-xs font-medium text-muted-foreground mb-2">Rubric Criteria</label>
                <div className="space-y-2">
                  {[1,2,3,4].map(i => (
                    <div key={i} className="grid grid-cols-3 gap-3">
                      <input className={inputClass} placeholder={`Criteria ${i} Name`} value={skillAssessForm[`rubric${i}Name`]} onChange={e => setSkillAssessForm({...skillAssessForm, [`rubric${i}Name`]: e.target.value})} />
                      <input type="number" className={inputClass} placeholder="Max Score" value={skillAssessForm[`rubric${i}Max`]} onChange={e => setSkillAssessForm({...skillAssessForm, [`rubric${i}Max`]: e.target.value})} />
                      <input type="number" className={inputClass} placeholder="Actual Score" value={skillAssessForm[`rubric${i}Actual`]} onChange={e => setSkillAssessForm({...skillAssessForm, [`rubric${i}Actual`]: e.target.value})} />
                    </div>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div><label className={labelClass}>Overall Grade *</label><select className={inputClass} value={skillAssessForm.overallGrade} onChange={e => setSkillAssessForm({...skillAssessForm, overallGrade: e.target.value})}><option value="">Select</option><option>A+</option><option>A</option><option>B+</option><option>B</option><option>C</option></select></div>
                <div><label className={labelClass}>Comments</label><input className={inputClass} placeholder="Assessment comments" value={skillAssessForm.comments} onChange={e => setSkillAssessForm({...skillAssessForm, comments: e.target.value})} /></div>
              </div>
              <div className="flex justify-end gap-3 mt-4">
                <button onClick={() => setShowForm(null)} className="px-4 py-2 rounded-xl border border-border text-sm text-muted-foreground hover:bg-muted/50">Cancel</button>
                <button onClick={() => handleFormSubmit('skillAssess', 'Skill assessment saved successfully!')} className="px-4 py-2 rounded-xl gradient-birla text-white text-sm font-medium">Save Assessment</button>
              </div>
            </motion.div>
          )}

          {/* 5. Co-Scholastic Assessment Form */}
          {showForm === 'coScholastic' && (
            <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-6">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-sm font-semibold text-foreground flex items-center gap-2"><Award className="w-4 h-4 text-birla-gold" />Co-Scholastic Assessment Form</h4>
                <button onClick={() => setShowForm(null)} className="p-1.5 rounded-lg hover:bg-muted text-muted-foreground"><X className="w-4 h-4" /></button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div><label className={labelClass}>Student *</label><select className={inputClass} value={coScholasticForm.student} onChange={e => setCoScholasticForm({...coScholasticForm, student: e.target.value})}><option value="">Select</option>{STUDENT_DB.map(s => <option key={s.id}>{s.name}</option>)}</select></div>
                <div><label className={labelClass}>Area *</label><select className={inputClass} value={coScholasticForm.area} onChange={e => setCoScholasticForm({...coScholasticForm, area: e.target.value})}><option>Arts</option><option>Sports</option><option>Music</option><option>Dance</option><option>Yoga</option></select></div>
                <div><label className={labelClass}>Grade *</label><select className={inputClass} value={coScholasticForm.grade} onChange={e => setCoScholasticForm({...coScholasticForm, grade: e.target.value})}><option>A+</option><option>A</option><option>B+</option><option>B</option><option>C</option></select></div>
                <div><label className={labelClass}>Teacher Remarks</label><input className={inputClass} placeholder="Remarks" value={coScholasticForm.teacherRemarks} onChange={e => setCoScholasticForm({...coScholasticForm, teacherRemarks: e.target.value})} /></div>
                <div className="md:col-span-2"><label className={labelClass}>Evidence</label><input className={inputClass} placeholder="Photo/video reference or description" value={coScholasticForm.evidence} onChange={e => setCoScholasticForm({...coScholasticForm, evidence: e.target.value})} /></div>
              </div>
              <div className="flex justify-end gap-3 mt-4">
                <button onClick={() => setShowForm(null)} className="px-4 py-2 rounded-xl border border-border text-sm text-muted-foreground hover:bg-muted/50">Cancel</button>
                <button onClick={() => handleFormSubmit('coScholastic', 'Co-scholastic assessment saved successfully!')} className="px-4 py-2 rounded-xl gradient-birla text-white text-sm font-medium">Save Assessment</button>
              </div>
            </motion.div>
          )}

          {/* 6. Board Exam Registration Form */}
          {showForm === 'boardExam' && (
            <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-6">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-sm font-semibold text-foreground flex items-center gap-2"><Shield className="w-4 h-4 text-red-500" />Board Exam Registration Form</h4>
                <button onClick={() => setShowForm(null)} className="p-1.5 rounded-lg hover:bg-muted text-muted-foreground"><X className="w-4 h-4" /></button>
              </div>
              <div className="flex flex-wrap gap-2 mb-4 p-2 rounded-xl bg-muted/20">
                <span className="px-2 py-0.5 rounded-lg bg-birla-blue/10 text-birla-blue dark:text-birla-cyan text-[10px] font-mono">BSP ID &amp; PEN No &amp; Uppar ID shown with student</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>Student * (UDISE+ IDs)</label>
                  <select className={inputClass} value={boardExamForm.student} onChange={e => setBoardExamForm({...boardExamForm, student: e.target.value})}>
                    <option value="">Select Student</option>
                    {STUDENT_DB.map(s => <option key={s.id} value={s.name}>{s.name} (BSP:{s.bspId} | PEN:{s.penNo} | UPPR:{s.upparId})</option>)}
                  </select>
                </div>
                <div><label className={labelClass}>Subjects (Multi-Select)</label><input className={inputClass} placeholder="e.g., Mathematics, Science, English" value={boardExamForm.subjects.join(', ')} onChange={e => setBoardExamForm({...boardExamForm, subjects: e.target.value.split(',').map(s => s.trim())})} /></div>
                <div><label className={labelClass}>Registration Number *</label><input className={inputClass} placeholder="CBSE Registration No" value={boardExamForm.registrationNumber} onChange={e => setBoardExamForm({...boardExamForm, registrationNumber: e.target.value})} /></div>
                <div><label className={labelClass}>Exam Center *</label><input className={inputClass} placeholder="e.g., Center Code 12345" value={boardExamForm.examCenter} onChange={e => setBoardExamForm({...boardExamForm, examCenter: e.target.value})} /></div>
              </div>
              <div className="mt-4 flex gap-6">
                <label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" checked={boardExamForm.feePaid} onChange={e => setBoardExamForm({...boardExamForm, feePaid: e.target.checked})} className="w-4 h-4 rounded accent-[#C8A45C]" /><span className="text-xs text-muted-foreground">Exam Fee Paid</span></label>
                <label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" checked={boardExamForm.hallTicketIssued} onChange={e => setBoardExamForm({...boardExamForm, hallTicketIssued: e.target.checked})} className="w-4 h-4 rounded accent-[#C8A45C]" /><span className="text-xs text-muted-foreground">Hall Ticket Issued</span></label>
              </div>
              <div className="flex justify-end gap-3 mt-4">
                <button onClick={() => setShowForm(null)} className="px-4 py-2 rounded-xl border border-border text-sm text-muted-foreground hover:bg-muted/50">Cancel</button>
                <button onClick={() => handleFormSubmit('boardExam', 'Board exam registration submitted successfully!')} className="px-4 py-2 rounded-xl gradient-birla text-white text-sm font-medium">Register for Board Exam</button>
              </div>
            </motion.div>
          )}

          {/* 7. Competency Question Mapping Form */}
          {showForm === 'competencyMap' && (
            <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-6">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-sm font-semibold text-foreground flex items-center gap-2"><Brain className="w-4 h-4 text-birla-cyan" />Competency Question Mapping Form</h4>
                <button onClick={() => setShowForm(null)} className="p-1.5 rounded-lg hover:bg-muted text-muted-foreground"><X className="w-4 h-4" /></button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div><label className={labelClass}>Subject *</label><select className={inputClass} value={competencyMappingForm.subject} onChange={e => setCompetencyMappingForm({...competencyMappingForm, subject: e.target.value})}><option value="">Select</option>{subjects.map(s => <option key={s}>{s}</option>)}</select></div>
                <div><label className={labelClass}>Class *</label><select className={inputClass} value={competencyMappingForm.class} onChange={e => setCompetencyMappingForm({...competencyMappingForm, class: e.target.value})}><option value="">Select</option>{classes.map(c => <option key={c}>{c}</option>)}</select></div>
                <div><label className={labelClass}>Question No *</label><input className={inputClass} placeholder="e.g., Q1, Q2a" value={competencyMappingForm.questionNo} onChange={e => setCompetencyMappingForm({...competencyMappingForm, questionNo: e.target.value})} /></div>
                <div><label className={labelClass}>Bloom&apos;s Level *</label><select className={inputClass} value={competencyMappingForm.bloomsLevel} onChange={e => setCompetencyMappingForm({...competencyMappingForm, bloomsLevel: e.target.value})}><option>Remember</option><option>Understand</option><option>Apply</option><option>Analyze</option><option>Evaluate</option><option>Create</option></select></div>
                <div><label className={labelClass}>Competency Tag *</label><input className={inputClass} placeholder="e.g., NUM-01, SCI-03" value={competencyMappingForm.competencyTag} onChange={e => setCompetencyMappingForm({...competencyMappingForm, competencyTag: e.target.value})} /></div>
                <div><label className={labelClass}>Marks Allocated *</label><input type="number" className={inputClass} placeholder="e.g., 5" value={competencyMappingForm.marksAllocated} onChange={e => setCompetencyMappingForm({...competencyMappingForm, marksAllocated: e.target.value})} /></div>
              </div>
              <div className="mt-4">
                <label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" checked={competencyMappingForm.nepAlignment} onChange={e => setCompetencyMappingForm({...competencyMappingForm, nepAlignment: e.target.checked})} className="w-4 h-4 rounded accent-[#C8A45C]" /><span className="text-xs text-muted-foreground">NEP 2020 Alignment Confirmed</span></label>
              </div>
              <div className="flex justify-end gap-3 mt-4">
                <button onClick={() => setShowForm(null)} className="px-4 py-2 rounded-xl border border-border text-sm text-muted-foreground hover:bg-muted/50">Cancel</button>
                <button onClick={() => handleFormSubmit('competencyMap', 'Competency mapping saved successfully!')} className="px-4 py-2 rounded-xl gradient-birla text-white text-sm font-medium">Save Mapping</button>
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
          {/* 1. Exam Results Report */}
          <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-5">
            <h4 className="text-sm font-semibold text-foreground mb-1 flex items-center gap-2"><BarChart3 className="w-4 h-4 text-birla-cyan" />Exam Results Report</h4>
            <p className="text-[10px] text-muted-foreground mb-3">Subject-wise results with BarChart</p>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={examResultsData}>
                  <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? 'rgba(255,255,255,0.06)' : '#f1f5f9'} />
                  <XAxis dataKey="subject" tick={{ fontSize: 9, fill: darkMode ? '#94a3b8' : '#64748b' }} />
                  <YAxis tick={{ fontSize: 10, fill: darkMode ? '#94a3b8' : '#64748b' }} />
                  <Tooltip contentStyle={tooltipStyle} />
                  <Legend wrapperStyle={{ fontSize: '10px' }} />
                  <Bar dataKey="passed" fill="#10B981" radius={[3,3,0,0]} name="Passed" />
                  <Bar dataKey="appeared" fill="#C8A45C" radius={[3,3,0,0]} name="Appeared" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* 2. Student-wise Performance Report */}
          <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-5">
            <h4 className="text-sm font-semibold text-foreground mb-1 flex items-center gap-2"><Users className="w-4 h-4 text-birla-gold" />Student-wise Performance Report</h4>
            <p className="text-[10px] text-muted-foreground mb-3">With BSP ID / PEN No / Uppar ID</p>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border bg-muted/30">
                    <th className="text-left px-2 py-2 text-[10px] font-semibold text-muted-foreground">Name</th>
                    <th className="text-left px-2 py-2 text-[10px] font-semibold text-muted-foreground">BSP ID</th>
                    <th className="text-left px-2 py-2 text-[10px] font-semibold text-muted-foreground">PEN No</th>
                    <th className="text-left px-2 py-2 text-[10px] font-semibold text-muted-foreground">Uppar ID</th>
                    <th className="text-left px-2 py-2 text-[10px] font-semibold text-muted-foreground">Math</th>
                    <th className="text-left px-2 py-2 text-[10px] font-semibold text-muted-foreground">Sci</th>
                    <th className="text-left px-2 py-2 text-[10px] font-semibold text-muted-foreground">Eng</th>
                    <th className="text-left px-2 py-2 text-[10px] font-semibold text-muted-foreground">Hin</th>
                    <th className="text-left px-2 py-2 text-[10px] font-semibold text-muted-foreground">SST</th>
                    <th className="text-left px-2 py-2 text-[10px] font-semibold text-muted-foreground">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {studentPerformanceData.map((s, i) => (
                    <tr key={i} className="border-b border-border/50 hover:bg-muted/20">
                      <td className="px-2 py-2 text-xs text-foreground">{s.name}</td>
                      <td className="px-2 py-2 text-[10px] text-muted-foreground font-mono">{s.bspId}</td>
                      <td className="px-2 py-2 text-[10px] text-muted-foreground font-mono">{s.penNo}</td>
                      <td className="px-2 py-2 text-[10px] text-muted-foreground font-mono">{s.upparId}</td>
                      <td className="px-2 py-2 text-xs text-foreground">{s.math}</td>
                      <td className="px-2 py-2 text-xs text-foreground">{s.science}</td>
                      <td className="px-2 py-2 text-xs text-foreground">{s.english}</td>
                      <td className="px-2 py-2 text-xs text-foreground">{s.hindi}</td>
                      <td className="px-2 py-2 text-xs text-foreground">{s.social}</td>
                      <td className="px-2 py-2 text-xs font-semibold text-foreground">{s.total}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>

          {/* 3. Class Comparison Report */}
          <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-5">
            <h4 className="text-sm font-semibold text-foreground mb-1 flex items-center gap-2"><BarChart3 className="w-4 h-4 text-purple-500" />Class Comparison Report</h4>
            <p className="text-[10px] text-muted-foreground mb-3">Class average comparison (grouped BarChart)</p>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={classComparisonData}>
                  <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? 'rgba(255,255,255,0.06)' : '#f1f5f9'} />
                  <XAxis dataKey="subject" tick={{ fontSize: 9, fill: darkMode ? '#94a3b8' : '#64748b' }} />
                  <YAxis tick={{ fontSize: 10, fill: darkMode ? '#94a3b8' : '#64748b' }} domain={[50, 90]} />
                  <Tooltip contentStyle={tooltipStyle} />
                  <Legend wrapperStyle={{ fontSize: '10px' }} />
                  <Bar dataKey="IX-A" fill="#22D3EE" radius={[2,2,0,0]} />
                  <Bar dataKey="IX-B" fill="#C8A45C" radius={[2,2,0,0]} />
                  <Bar dataKey="X-A" fill="#8B5CF6" radius={[2,2,0,0]} />
                  <Bar dataKey="X-B" fill="#10B981" radius={[2,2,0,0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* 4. CBSE Grading Distribution Report */}
            <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-5">
              <h4 className="text-sm font-semibold text-foreground mb-1 flex items-center gap-2"><GraduationCap className="w-4 h-4 text-birla-gold" />CBSE Grading Distribution</h4>
              <p className="text-[10px] text-muted-foreground mb-3">Grade-wise student count</p>
              <div className="h-56">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={cbseGradingData} cx="50%" cy="50%" innerRadius={45} outerRadius={80} paddingAngle={2} dataKey="count">
                      {cbseGradingData.map((entry, idx) => <Cell key={idx} fill={entry.color} />)}
                    </Pie>
                    <Tooltip contentStyle={tooltipStyle} />
                    <Legend iconType="circle" wrapperStyle={{ fontSize: '9px' }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </motion.div>

            {/* 5. Term-wise Comparison Report */}
            <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-5">
              <h4 className="text-sm font-semibold text-foreground mb-1 flex items-center gap-2"><TrendingUp className="w-4 h-4 text-emerald-500" />Term-wise Comparison Report</h4>
              <p className="text-[10px] text-muted-foreground mb-3">Term 1 vs Term 2 (grouped BarChart)</p>
              <div className="h-56">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={termComparisonData}>
                    <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? 'rgba(255,255,255,0.06)' : '#f1f5f9'} />
                    <XAxis dataKey="subject" tick={{ fontSize: 9, fill: darkMode ? '#94a3b8' : '#64748b' }} />
                    <YAxis tick={{ fontSize: 10, fill: darkMode ? '#94a3b8' : '#64748b' }} domain={[50, 90]} />
                    <Tooltip contentStyle={tooltipStyle} />
                    <Legend wrapperStyle={{ fontSize: '10px' }} />
                    <Bar dataKey="term1" fill="#C8A45C" radius={[3,3,0,0]} name="Term 1" />
                    <Bar dataKey="term2" fill="#22D3EE" radius={[3,3,0,0]} name="Term 2" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </motion.div>
          </div>

          {/* 6. Competency Analysis Report */}
          <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-5">
            <h4 className="text-sm font-semibold text-foreground mb-1 flex items-center gap-2"><Brain className="w-4 h-4 text-birla-cyan" />Competency Analysis Report</h4>
            <p className="text-[10px] text-muted-foreground mb-3">Bloom&apos;s Taxonomy level distribution (horizontal BarChart)</p>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={competencyData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? 'rgba(255,255,255,0.06)' : '#f1f5f9'} />
                  <XAxis type="number" tick={{ fontSize: 10, fill: darkMode ? '#94a3b8' : '#64748b' }} />
                  <YAxis dataKey="level" type="category" tick={{ fontSize: 10, fill: darkMode ? '#94a3b8' : '#64748b' }} width={80} />
                  <Tooltip contentStyle={tooltipStyle} />
                  <Bar dataKey="count" radius={[0,4,4,0]} name="Questions">
                    {competencyData.map((entry, idx) => <Cell key={idx} fill={entry.color} />)}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* 7. Board Exam Summary Report */}
          <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-5">
            <h4 className="text-sm font-semibold text-foreground mb-1 flex items-center gap-2"><Shield className="w-4 h-4 text-red-500" />Board Exam Summary Report</h4>
            <p className="text-[10px] text-muted-foreground mb-3">Pass rate & subject-wise analysis</p>
            <div className="overflow-x-auto mb-4">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border bg-muted/30">
                    <th className="text-left px-3 py-2 text-[10px] font-semibold text-muted-foreground">Subject</th>
                    <th className="text-left px-3 py-2 text-[10px] font-semibold text-muted-foreground">Appeared</th>
                    <th className="text-left px-3 py-2 text-[10px] font-semibold text-muted-foreground">Passed</th>
                    <th className="text-left px-3 py-2 text-[10px] font-semibold text-muted-foreground">Pass Rate</th>
                    <th className="text-left px-3 py-2 text-[10px] font-semibold text-muted-foreground">Average</th>
                  </tr>
                </thead>
                <tbody>
                  {boardExamData.map((s, i) => (
                    <tr key={i} className="border-b border-border/50 hover:bg-muted/20">
                      <td className="px-3 py-2 text-xs text-foreground">{s.subject}</td>
                      <td className="px-3 py-2 text-xs text-foreground">{s.appeared}</td>
                      <td className="px-3 py-2 text-xs text-foreground">{s.passed}</td>
                      <td className="px-3 py-2"><span className={`px-2 py-0.5 rounded-lg text-[10px] font-medium ${s.passRate >= 90 ? 'bg-emerald-500/10 text-emerald-600' : s.passRate >= 80 ? 'bg-amber-500/10 text-amber-600' : 'bg-red-500/10 text-red-600'}`}>{s.passRate}%</span></td>
                      <td className="px-3 py-2 text-xs text-foreground">{s.avg}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={boardExamData}>
                  <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? 'rgba(255,255,255,0.06)' : '#f1f5f9'} />
                  <XAxis dataKey="subject" tick={{ fontSize: 9, fill: darkMode ? '#94a3b8' : '#64748b' }} />
                  <YAxis tick={{ fontSize: 10, fill: darkMode ? '#94a3b8' : '#64748b' }} domain={[0, 100]} />
                  <Tooltip contentStyle={tooltipStyle} />
                  <Bar dataKey="passRate" fill="#10B981" radius={[4,4,0,0]} name="Pass Rate %" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* 8. Co-Scholastic Assessment Report */}
          <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-5">
            <h4 className="text-sm font-semibold text-foreground mb-1 flex items-center gap-2"><Award className="w-4 h-4 text-birla-gold" />Co-Scholastic Assessment Report</h4>
            <p className="text-[10px] text-muted-foreground mb-3">Area-wise grades with RadarChart</p>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border bg-muted/30">
                      <th className="text-left px-3 py-2 text-[10px] font-semibold text-muted-foreground">Area</th>
                      <th className="text-left px-3 py-2 text-[10px] font-semibold text-muted-foreground">A+</th>
                      <th className="text-left px-3 py-2 text-[10px] font-semibold text-muted-foreground">A</th>
                      <th className="text-left px-3 py-2 text-[10px] font-semibold text-muted-foreground">B+</th>
                      <th className="text-left px-3 py-2 text-[10px] font-semibold text-muted-foreground">B</th>
                      <th className="text-left px-3 py-2 text-[10px] font-semibold text-muted-foreground">C</th>
                    </tr>
                  </thead>
                  <tbody>
                    {coScholasticData.map((c, i) => (
                      <tr key={i} className="border-b border-border/50 hover:bg-muted/20">
                        <td className="px-3 py-2 text-xs text-foreground font-medium">{c.area}</td>
                        <td className="px-3 py-2 text-xs text-emerald-600">{c.Aplus}</td>
                        <td className="px-3 py-2 text-xs text-foreground">{c.A}</td>
                        <td className="px-3 py-2 text-xs text-foreground">{c.Bplus}</td>
                        <td className="px-3 py-2 text-xs text-foreground">{c.B}</td>
                        <td className="px-3 py-2 text-xs text-foreground">{c.C}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={coScholasticData.map(c => ({ area: c.area, Aplus: c.Aplus, A: c.A, Bplus: c.Bplus, B: c.B }))}>
                    <PolarGrid stroke={darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'} />
                    <PolarAngleAxis dataKey="area" tick={{ fontSize: 10, fill: darkMode ? '#94a3b8' : '#64748b' }} />
                    <PolarRadiusAxis tick={{ fontSize: 9, fill: darkMode ? '#64748b' : '#94a3b8' }} />
                    <Tooltip contentStyle={tooltipStyle} />
                    <Legend wrapperStyle={{ fontSize: '10px' }} />
                    <Radar name="A+" dataKey="Aplus" stroke="#10B981" fill="#10B981" fillOpacity={0.2} />
                    <Radar name="A" dataKey="A" stroke="#22D3EE" fill="#22D3EE" fillOpacity={0.15} />
                    <Radar name="B+" dataKey="Bplus" stroke="#C8A45C" fill="#C8A45C" fillOpacity={0.15} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </motion.div>
  )
}
