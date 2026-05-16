'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  BookOpen, ClipboardList, Users, Calendar, Clock, BarChart3, PieChart as PieChartIcon,
  Target, Brain, FileText, Plus, X, CheckCircle2, Zap, Award, Sparkles,
  TrendingUp, ArrowUpRight, Search, Phone, Mail, MessageSquare, PenTool,
  Save, Send, Eye, ChevronRight, Activity, Star, UserCheck, Bell,
  GraduationCap, Monitor, Settings, FileQuestion, Upload, Lightbulb,
  AlertTriangle, Mic, FlaskConical, MapPin, Tag, Edit, ChatBubbleLeft,
  HandMetal, Presentation, ChalkboardTeacher
} from 'lucide-react'
import {
  BarChart, Bar, AreaChart, Area, RadarChart, Radar, PolarGrid,
  PolarAngleAxis, PolarRadiusAxis, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Legend, Cell, PieChart, Pie, LineChart, Line
} from 'recharts'
import useAppStore from '@/store/useAppStore'

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.06 } },
}
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
}

const CHART_COLORS = ['#1A2D4A', '#22D3EE', '#C8A45C', '#8B5CF6', '#10B981', '#EF4444', '#F59E0B', '#EC4899']

const subjects = ['Mathematics', 'Science', 'English', 'Hindi', 'Social Science', 'Computer Science', 'Sanskrit', 'Art']
const classes = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII']
const sections = ['A', 'B', 'C', 'D']
const bloomsLevels = ['Remember', 'Understand', 'Apply', 'Analyze', 'Evaluate', 'Create']
const periods = ['1', '2', '3', '4', '5', '6', '7', '8']

// Mock student data with BSP ID / PEN No / Uppar ID
const studentsList = [
  { id: 'STU001', name: 'Aarav Sharma', bspId: 'BSP2024001', penNo: 'PEN1905001', upparId: 'UPP2024001', class: 'X', section: 'A' },
  { id: 'STU002', name: 'Diya Patel', bspId: 'BSP2024002', penNo: 'PEN1905002', upparId: 'UPP2024002', class: 'X', section: 'A' },
  { id: 'STU003', name: 'Arjun Reddy', bspId: 'BSP2024003', penNo: 'PEN1905003', upparId: 'UPP2024003', class: 'X', section: 'A' },
  { id: 'STU004', name: 'Ananya Gupta', bspId: 'BSP2024004', penNo: 'PEN1905004', upparId: 'UPP2024004', class: 'X', section: 'B' },
  { id: 'STU005', name: 'Vivaan Joshi', bspId: 'BSP2024005', penNo: 'PEN1905005', upparId: 'UPP2024005', class: 'IX', section: 'A' },
  { id: 'STU006', name: 'Ishita Nair', bspId: 'BSP2024006', penNo: 'PEN1905006', upparId: 'UPP2024006', class: 'IX', section: 'A' },
  { id: 'STU007', name: 'Kabir Malhotra', bspId: 'BSP2024007', penNo: 'PEN1905007', upparId: 'UPP2024007', class: 'IX', section: 'B' },
  { id: 'STU008', name: 'Saanvi Rao', bspId: 'BSP2024008', penNo: 'PEN1905008', upparId: 'UPP2024008', class: 'VIII', section: 'A' },
]

// Report data
const attendanceReportData = [
  { date: 'Mon', present: 42, absent: 3, late: 2 },
  { date: 'Tue', present: 40, absent: 5, late: 2 },
  { date: 'Wed', present: 44, absent: 2, late: 1 },
  { date: 'Thu', present: 41, absent: 4, late: 2 },
  { date: 'Fri', present: 43, absent: 3, late: 1 },
  { date: 'Sat', present: 38, absent: 6, late: 3 },
]

const assignmentStatusData = [
  { class: 'VI-A', submitted: 35, pending: 8, graded: 30 },
  { class: 'VII-A', submitted: 32, pending: 10, graded: 28 },
  { class: 'VIII-A', submitted: 38, pending: 4, graded: 35 },
  { class: 'IX-A', submitted: 30, pending: 8, graded: 26 },
  { class: 'X-A', submitted: 40, pending: 4, graded: 38 },
  { class: 'X-B', submitted: 38, pending: 5, graded: 35 },
]

const studentPerformanceData = [
  { name: 'Aarav Sharma', bspId: 'BSP2024001', penNo: 'PEN1905001', upparId: 'UPP2024001', math: 88, science: 82, english: 90, hindi: 76, sst: 85 },
  { name: 'Diya Patel', bspId: 'BSP2024002', penNo: 'PEN1905002', upparId: 'UPP2024002', math: 92, science: 88, english: 85, hindi: 80, sst: 82 },
  { name: 'Arjun Reddy', bspId: 'BSP2024003', penNo: 'PEN1905003', upparId: 'UPP2024003', math: 75, science: 70, english: 82, hindi: 68, sst: 78 },
  { name: 'Ananya Gupta', bspId: 'BSP2024004', penNo: 'PEN1905004', upparId: 'UPP2024004', math: 95, science: 90, english: 88, hindi: 85, sst: 90 },
  { name: 'Vivaan Joshi', bspId: 'BSP2024005', penNo: 'PEN1905005', upparId: 'UPP2024005', math: 68, science: 72, english: 75, hindi: 70, sst: 68 },
  { name: 'Ishita Nair', bspId: 'BSP2024006', penNo: 'PEN1905006', upparId: 'UPP2024006', math: 85, science: 80, english: 92, hindi: 78, sst: 86 },
]

const assessmentAnalysisData = [
  { test: 'Unit Test 1', avg: 72, highest: 95, lowest: 35, passed: 38, failed: 7 },
  { test: 'Unit Test 2', avg: 68, highest: 92, lowest: 30, passed: 35, failed: 10 },
  { test: 'Periodic Test 1', avg: 75, highest: 98, lowest: 40, passed: 40, failed: 5 },
  { test: 'Mid Term', avg: 70, highest: 96, lowest: 32, passed: 36, failed: 9 },
  { test: 'Periodic Test 2', avg: 78, highest: 99, lowest: 42, passed: 42, failed: 3 },
]

const competencyProgressData = [
  { student: 'Aarav Sharma', bspId: 'BSP2024001', criticalThinking: 72, problemSolving: 68, communication: 80, creativity: 65, collaboration: 75 },
  { student: 'Diya Patel', bspId: 'BSP2024002', criticalThinking: 85, problemSolving: 80, communication: 78, creativity: 72, collaboration: 82 },
  { student: 'Arjun Reddy', bspId: 'BSP2024003', criticalThinking: 60, problemSolving: 55, communication: 70, creativity: 58, collaboration: 65 },
  { student: 'Ananya Gupta', bspId: 'BSP2024004', criticalThinking: 90, problemSolving: 88, communication: 85, creativity: 82, collaboration: 88 },
]

const classComparisonData = [
  { class: 'X-A', math: 82, science: 78, english: 85, hindi: 72, sst: 80 },
  { class: 'X-B', math: 78, science: 75, english: 82, hindi: 70, sst: 76 },
  { class: 'IX-A', math: 76, science: 72, english: 80, hindi: 68, sst: 74 },
  { class: 'IX-B', math: 72, science: 70, english: 78, hindi: 65, sst: 72 },
]

const communicationLogData = [
  { date: '2025-01-15', student: 'Aarav Sharma', parent: 'Mr. Ramesh Sharma', type: 'Phone', subject: 'Attendance Concern', status: 'Completed' },
  { date: '2025-01-14', student: 'Diya Patel', parent: 'Mrs. Meera Patel', type: 'Email', subject: 'Academic Progress', status: 'Completed' },
  { date: '2025-01-13', student: 'Arjun Reddy', parent: 'Mr. Suresh Reddy', type: 'Meeting', subject: 'Behavior Discussion', status: 'Follow-up' },
  { date: '2025-01-12', student: 'Ananya Gupta', parent: 'Mrs. Sunita Gupta', type: 'Note', subject: 'Outstanding Performance', status: 'Completed' },
  { date: '2025-01-10', student: 'Vivaan Joshi', parent: 'Mr. Amit Joshi', type: 'Phone', subject: 'Fee Payment Reminder', status: 'Pending' },
  { date: '2025-01-09', student: 'Ishita Nair', parent: 'Mrs. Lata Nair', type: 'Meeting', subject: 'Subject Selection', status: 'Completed' },
]

const teacherEffectivenessData = [
  { teacher: 'Dr. Priya Menon', class: 'X-A', avgScore: 82, feedback: 4.5 },
  { teacher: 'Mr. Rajesh Kumar', class: 'IX-B', avgScore: 76, feedback: 4.2 },
  { teacher: 'Ms. Ananya Iyer', class: 'VIII-A', avgScore: 80, feedback: 4.6 },
  { teacher: 'Mr. Vikram Singh', class: 'VII-A', avgScore: 74, feedback: 3.9 },
  { teacher: 'Ms. Deepa Nair', class: 'X-B', avgScore: 78, feedback: 4.3 },
  { teacher: 'Dr. Suresh Babu', class: 'XI-A', avgScore: 84, feedback: 4.7 },
]

export default function TeacherPortal() {
  const { darkMode } = useAppStore()
  const [activeTab, setActiveTab] = useState('overview')
  const [showForm, setShowForm] = useState(null)

  // Form states
  const [attendanceForm, setAttendanceForm] = useState({
    className: '', date: '', students: studentsList.map(s => ({
      id: s.id, name: s.name, bspId: s.bspId, penNo: s.penNo, upparId: s.upparId,
      status: 'Present', remarks: ''
    }))
  })
  const [lessonPlanForm, setLessonPlanForm] = useState({
    date: '', period: '', subject: '', className: '', topic: '',
    objectives: '', teachingMethod: 'Lecture', resources: '',
    homework: '', assessmentType: '', notes: ''
  })
  const [assignmentForm, setAssignmentForm] = useState({
    title: '', subject: '', className: '', dueDate: '', description: '',
    maxMarks: '', type: 'Homework', bloomsLevel: 'Remember'
  })
  const [evaluationForm, setEvaluationForm] = useState({
    studentId: '', subject: '', assessmentType: 'Unit Test',
    marks: '', maxMarks: '', competencyLevel: 'Beginner', remarks: ''
  })
  const [rubricForm, setRubricForm] = useState({
    studentId: '', subject: '', rubricName: '',
    criteria: [{ name: '', maxMarks: '', score: '' }],
    comments: ''
  })
  const [reportCardForm, setReportCardForm] = useState({
    className: '', term: 'Term 1',
    students: [], includeScholastic: true, includeCoScholastic: true, includeCompetency: true
  })
  const [communicationForm, setCommunicationForm] = useState({
    studentId: '', parentName: '', communicationType: 'Phone',
    subject: '', details: '', followUpDate: '', priority: 'Medium'
  })
  const [aiTeachingForm, setAiTeachingForm] = useState({
    requestType: 'Lesson Ideas', subject: '', className: '',
    topic: '', studentNeeds: ''
  })

  const tooltipStyle = {
    backgroundColor: darkMode ? '#1A2D4A' : '#fff',
    border: '1px solid ' + (darkMode ? 'rgba(255,255,255,0.1)' : '#e2e8f0'),
    borderRadius: '12px', fontSize: '12px', color: darkMode ? '#e2e8f0' : '#1e293b'
  }

  const handleSubmit = (formType) => {
    setShowForm(null)
  }

  const addRubricCriteria = () => {
    setRubricForm(prev => ({
      ...prev,
      criteria: [...prev.criteria, { name: '', maxMarks: '', score: '' }]
    }))
  }

  const removeRubricCriteria = (idx) => {
    setRubricForm(prev => ({
      ...prev,
      criteria: prev.criteria.filter((_, i) => i !== idx)
    }))
  }

  const updateRubricCriteria = (idx, field, value) => {
    setRubricForm(prev => ({
      ...prev,
      criteria: prev.criteria.map((c, i) => i === idx ? { ...c, [field]: value } : c)
    }))
  }

  const tabs = [
    { id: 'overview', label: 'Overview', icon: GraduationCap },
    { id: 'attendance', label: 'Attendance', icon: UserCheck },
    { id: 'timetable', label: 'Timetable', icon: Calendar },
    { id: 'planner', label: 'Lesson Planner', icon: BookOpen },
    { id: 'assignments', label: 'Assignments', icon: ClipboardList },
    { id: 'evaluation', label: 'Evaluation', icon: Award },
    { id: 'communication', label: 'Communication', icon: MessageSquare },
    { id: 'forms', label: 'Forms', icon: PenTool },
    { id: 'reports', label: 'Reports', icon: BarChart3 },
  ]

  const formsList = [
    { id: 'attendance', label: 'Smart Attendance', icon: UserCheck },
    { id: 'lessonPlan', label: 'Lesson Plan', icon: BookOpen },
    { id: 'assignment', label: 'Assignment Creation', icon: ClipboardList },
    { id: 'evaluation', label: 'Student Evaluation', icon: Award },
    { id: 'rubric', label: 'Rubric Assessment', icon: Target },
    { id: 'reportCard', label: 'Report Card Generation', icon: FileText },
    { id: 'communication', label: 'Parent Communication', icon: Phone },
    { id: 'aiTeaching', label: 'AI Teaching Request', icon: Sparkles },
  ]

  const reportsList = [
    { id: 'classAttendance', label: 'Class Attendance', icon: UserCheck },
    { id: 'assignmentStatus', label: 'Assignment Status', icon: ClipboardList },
    { id: 'studentPerformance', label: 'Student Performance', icon: Users },
    { id: 'assessmentAnalysis', label: 'Assessment Analysis', icon: Award },
    { id: 'competencyProgress', label: 'Competency Progress', icon: Target },
    { id: 'classComparison', label: 'Class Comparison', icon: BarChart3 },
    { id: 'communicationLog', label: 'Communication Log', icon: MessageSquare },
    { id: 'teacherEffectiveness', label: 'Teacher Effectiveness', icon: Star },
  ]

  const inputCls = "w-full px-3 py-2 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-birla-cyan/30"
  const labelCls = "block text-xs font-medium text-muted-foreground mb-1"

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="show" className="p-4 lg:p-6 space-y-6 max-w-[1600px] mx-auto">
      {/* Header */}
      <motion.div variants={itemVariants} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <BookOpen className="w-7 h-7 text-birla-gold" />Teacher Portal
          </h1>
          <p className="text-sm text-muted-foreground mt-1">Dr. Priya Menon &bull; Birla Open Minds International School</p>
        </div>
      </motion.div>

      {/* Tab Navigation */}
      <motion.div variants={itemVariants} className="flex gap-1 p-1 rounded-xl bg-muted/50 border border-border overflow-x-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon
          return (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${activeTab === tab.id ? 'gradient-birla-gold text-birla-blue shadow-md' : 'text-muted-foreground hover:text-foreground'}`}>
              <Icon className="w-3.5 h-3.5" />{tab.label}
            </button>
          )
        })}
      </motion.div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div className="space-y-4">
          <motion.div variants={itemVariants} className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: 'My Classes', value: '6', change: '+1', icon: Users, color: 'from-blue-900 to-blue-700' },
              { label: 'Assignments Due', value: '12', change: '+3', icon: ClipboardList, color: 'from-amber-800 to-amber-600' },
              { label: 'Avg Attendance', value: '92%', change: '+2.1%', icon: UserCheck, color: 'from-emerald-800 to-emerald-600' },
              { label: 'Class Avg Score', value: '76%', change: '+3.5%', icon: TrendingUp, color: 'from-purple-800 to-purple-600' },
            ].map((card) => {
              const Icon = card.icon
              return (
                <div key={card.label} className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${card.color} p-4 text-white shadow-xl`}>
                  <div className="absolute top-0 right-0 w-20 h-20 rounded-full bg-white/5 -translate-y-6 translate-x-6" />
                  <div className="flex items-center justify-between mb-2">
                    <div className="w-9 h-9 rounded-xl bg-white/15 backdrop-blur-sm flex items-center justify-center">
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="inline-flex items-center gap-0.5 text-[10px] font-medium px-1.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-200">
                      <ArrowUpRight className="w-3 h-3" />{card.change}
                    </span>
                  </div>
                  <p className="text-xl font-bold">{card.value}</p>
                  <p className="text-[11px] text-white/70 mt-0.5">{card.label}</p>
                </div>
              )
            })}
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-5">
              <h3 className="text-base font-semibold text-foreground flex items-center gap-2 mb-3">
                <Calendar className="w-4 h-4 text-birla-gold" />Today&apos;s Schedule
              </h3>
              <div className="space-y-2">
                {[
                  { period: '1', time: '8:00 - 8:40', subject: 'Mathematics', class: 'X-A', room: 'Room 201' },
                  { period: '2', time: '8:45 - 9:25', subject: 'Mathematics', class: 'X-B', room: 'Room 202' },
                  { period: '3', time: '9:30 - 10:10', subject: 'Mathematics', class: 'IX-A', room: 'Room 105' },
                  { period: '5', time: '11:00 - 11:40', subject: 'Mathematics', class: 'X-A', room: 'Room 201' },
                  { period: '7', time: '1:00 - 1:40', subject: 'Mathematics', class: 'IX-B', room: 'Room 106' },
                ].map((s, i) => (
                  <div key={i} className="flex items-center gap-3 p-2.5 rounded-xl border border-border hover:bg-muted/30 transition-colors">
                    <div className="w-9 h-9 rounded-xl gradient-birla flex items-center justify-center text-white font-bold text-xs">P{s.period}</div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-foreground">{s.subject} - Class {s.class}</p>
                      <p className="text-[10px] text-muted-foreground">{s.time} &bull; {s.room}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-5">
              <h3 className="text-base font-semibold text-foreground flex items-center gap-2 mb-3">
                <Users className="w-4 h-4 text-birla-cyan" />My Students (UDISE+)
              </h3>
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {studentsList.map((s) => (
                  <div key={s.id} className="flex items-center gap-3 p-2.5 rounded-xl border border-border hover:bg-muted/30 transition-colors">
                    <div className="w-9 h-9 rounded-xl bg-birla-gold/10 flex items-center justify-center text-birla-gold font-bold text-xs">{s.name.charAt(0)}</div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-foreground truncate">{s.name}</p>
                      <p className="text-[10px] text-muted-foreground">Class {s.class}-{s.section} &bull; BSP: {s.bspId}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] text-birla-gold">PEN: {s.penNo}</p>
                      <p className="text-[10px] text-muted-foreground">UPP: {s.upparId}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      )}

      {/* Attendance Tab */}
      {activeTab === 'attendance' && (
        <div className="space-y-4">
          <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-5">
            <h3 className="text-base font-semibold text-foreground flex items-center gap-2 mb-3">
              <UserCheck className="w-4 h-4 text-emerald-500" />Smart Attendance
            </h3>
            <p className="text-xs text-muted-foreground mb-4">Mark attendance with BSP ID / PEN No / Uppar ID</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div><label className={labelCls}>Class</label><select value={attendanceForm.className} onChange={(e) => setAttendanceForm({...attendanceForm, className: e.target.value})} className={inputCls}><option value="">Select Class</option>{classes.map(c => <option key={c} value={c}>{c}</option>)}</select></div>
              <div><label className={labelCls}>Date</label><input type="date" value={attendanceForm.date} onChange={(e) => setAttendanceForm({...attendanceForm, date: e.target.value})} className={inputCls} /></div>
              <div className="flex items-end"><button className="px-4 py-2 rounded-xl gradient-birla-gold text-birla-blue text-sm font-medium hover:shadow-lg transition-all">Load Students</button></div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead><tr className="border-b border-border"><th className="text-left p-2 text-muted-foreground font-medium">Student</th><th className="text-center p-2 text-muted-foreground font-medium">BSP ID</th><th className="text-center p-2 text-muted-foreground font-medium">PEN No</th><th className="text-center p-2 text-muted-foreground font-medium">Uppar ID</th><th className="text-center p-2 text-muted-foreground font-medium">Status</th><th className="text-left p-2 text-muted-foreground font-medium">Remarks</th></tr></thead>
                <tbody>
                  {attendanceForm.students.map((s, i) => (
                    <tr key={s.id} className="border-b border-border hover:bg-muted/30">
                      <td className="p-2 font-medium text-foreground">{s.name}</td>
                      <td className="text-center p-2 text-birla-cyan">{s.bspId}</td>
                      <td className="text-center p-2 text-birla-gold">{s.penNo}</td>
                      <td className="text-center p-2 text-muted-foreground">{s.upparId}</td>
                      <td className="text-center p-2">
                        <div className="flex justify-center gap-1">
                          {['Present', 'Absent', 'Late', 'Half-Day'].map(st => (
                            <button key={st} onClick={() => {
                              const newStudents = [...attendanceForm.students]
                              newStudents[i] = { ...newStudents[i], status: st }
                              setAttendanceForm({ ...attendanceForm, students: newStudents })
                            }}
                              className={`px-2 py-0.5 rounded text-[10px] font-medium ${s.status === st ? (st === 'Present' ? 'bg-emerald-500/10 text-emerald-500' : st === 'Absent' ? 'bg-red-500/10 text-red-500' : st === 'Late' ? 'bg-amber-500/10 text-amber-500' : 'bg-blue-500/10 text-blue-500') : 'bg-muted/50 text-muted-foreground'}`}>{st}</button>
                          ))}
                        </div>
                      </td>
                      <td className="p-2"><input type="text" value={s.remarks} onChange={(e) => {
                        const newStudents = [...attendanceForm.students]
                        newStudents[i] = { ...newStudents[i], remarks: e.target.value }
                        setAttendanceForm({ ...attendanceForm, students: newStudents })
                      }} className="w-full px-2 py-1 rounded-lg border border-border bg-background text-xs" placeholder="Remarks" /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex justify-end mt-4">
              <button onClick={() => handleSubmit('attendance')} className="px-4 py-2 rounded-xl gradient-birla-gold text-birla-blue text-sm font-medium hover:shadow-lg transition-all">Save Attendance</button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Timetable Tab */}
      {activeTab === 'timetable' && (
        <div className="space-y-4">
          <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-5">
            <h3 className="text-base font-semibold text-foreground flex items-center gap-2 mb-3">
              <Calendar className="w-4 h-4 text-birla-gold" />Weekly Timetable
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead><tr className="border-b border-border">
                  <th className="p-2 text-muted-foreground font-medium">Period</th>
                  {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map(d => (
                    <th key={d} className="p-2 text-muted-foreground font-medium text-center">{d}</th>
                  ))}
                </tr></thead>
                <tbody>
                  {[
                    { period: '1', time: '8:00-8:40', slots: ['Math X-A', 'Math IX-A', 'Math X-B', 'Math IX-B', 'Math X-A', 'Math IX-A'] },
                    { period: '2', time: '8:45-9:25', slots: ['Math X-B', 'Math X-A', 'Math IX-A', 'Math X-A', 'Math IX-B', 'Math X-B'] },
                    { period: '3', time: '9:30-10:10', slots: ['Math IX-A', 'Math IX-B', 'Math X-A', 'Math IX-B', 'Math X-B', 'Math IX-A'] },
                    { period: '4', time: '10:15-10:55', slots: ['Break', 'Break', 'Break', 'Break', 'Break', 'Break'] },
                    { period: '5', time: '11:00-11:40', slots: ['Math X-A', 'Math IX-B', 'Math X-B', 'Math IX-A', 'Math X-A', 'Free'] },
                    { period: '6', time: '11:45-12:25', slots: ['Math IX-B', 'Math X-B', 'Math IX-B', 'Math X-B', 'Math IX-A', 'Free'] },
                    { period: '7', time: '1:00-1:40', slots: ['Math IX-B', 'Free', 'Math IX-A', 'Free', 'Free', 'Free'] },
                    { period: '8', time: '1:45-2:25', slots: ['Free', 'Free', 'Free', 'Free', 'Free', 'Free'] },
                  ].map(row => (
                    <tr key={row.period} className="border-b border-border hover:bg-muted/30">
                      <td className="p-2"><div className="font-medium text-foreground">P{row.period}</div><div className="text-[10px] text-muted-foreground">{row.time}</div></td>
                      {row.slots.map((slot, si) => (
                        <td key={si} className="p-1.5 text-center">
                          <span className={`inline-block px-2 py-1 rounded-lg text-[10px] font-medium ${slot === 'Break' ? 'bg-amber-500/10 text-amber-500' : slot === 'Free' ? 'bg-muted/30 text-muted-foreground' : 'bg-birla-cyan/10 text-birla-cyan'}`}>{slot}</span>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>
      )}

      {/* Lesson Planner Tab */}
      {activeTab === 'planner' && (
        <div className="space-y-4">
          <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { subject: 'Mathematics', topic: 'Quadratic Equations', class: 'X-A', method: 'Activity', blooms: 'Apply', date: '2025-01-20' },
              { subject: 'Mathematics', topic: 'Statistics', class: 'IX-A', method: 'Discussion', blooms: 'Understand', date: '2025-01-21' },
              { subject: 'Mathematics', topic: 'Trigonometry', class: 'X-B', method: 'Lecture', blooms: 'Remember', date: '2025-01-22' },
              { subject: 'Mathematics', topic: 'Probability', class: 'IX-B', method: 'Experiment', blooms: 'Analyze', date: '2025-01-23' },
              { subject: 'Mathematics', topic: 'Number Systems', class: 'X-A', method: 'Group Work', blooms: 'Create', date: '2025-01-24' },
              { subject: 'Mathematics', topic: 'Algebraic Expressions', class: 'IX-A', method: 'Flipped', blooms: 'Evaluate', date: '2025-01-25' },
            ].map((lp, i) => (
              <div key={i} className="rounded-2xl border border-border bg-card p-4 hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-between mb-2">
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-birla-gold/10 text-birla-gold">{lp.date}</span>
                  <BookOpen className="w-4 h-4 text-muted-foreground" />
                </div>
                <h4 className="text-sm font-semibold text-foreground mb-1">{lp.topic}</h4>
                <p className="text-xs text-muted-foreground mb-2">{lp.subject} &bull; Class {lp.class}</p>
                <div className="flex gap-2">
                  <span className="px-1.5 py-0.5 rounded text-[10px] bg-birla-cyan/10 text-birla-cyan">{lp.method}</span>
                  <span className="px-1.5 py-0.5 rounded text-[10px] bg-purple-500/10 text-purple-500">{lp.blooms}</span>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      )}

      {/* Assignments Tab */}
      {activeTab === 'assignments' && (
        <div className="space-y-4">
          <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { title: 'Quadratic Equations Worksheet', subject: 'Mathematics', class: 'X-A', due: '2025-01-20', submissions: 32, total: 44 },
              { title: 'Statistics Project', subject: 'Mathematics', class: 'IX-A', due: '2025-01-22', submissions: 28, total: 40 },
              { title: 'Trigonometry Practice Set', subject: 'Mathematics', class: 'X-B', due: '2025-01-25', submissions: 35, total: 43 },
              { title: 'Probability Assignment', subject: 'Mathematics', class: 'IX-B', due: '2025-01-18', submissions: 30, total: 38 },
              { title: 'Algebra Revision', subject: 'Mathematics', class: 'X-A', due: '2025-01-28', submissions: 20, total: 44 },
              { title: 'Number System MCQ', subject: 'Mathematics', class: 'IX-A', due: '2025-01-19', submissions: 36, total: 40 },
            ].map((a, i) => (
              <div key={i} className="rounded-2xl border border-border bg-card p-4 hover:shadow-lg transition-shadow">
                <h4 className="text-sm font-semibold text-foreground mb-1">{a.title}</h4>
                <p className="text-xs text-muted-foreground mb-2">{a.subject} &bull; Class {a.class}</p>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-muted-foreground">Due: {a.due}</span>
                  <span className="text-xs font-medium text-birla-gold">{a.submissions}/{a.total}</span>
                </div>
                <div className="w-full bg-muted rounded-full h-1.5">
                  <div className="bg-birla-gold h-1.5 rounded-full" style={{ width: `${(a.submissions / a.total) * 100}%` }} />
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      )}

      {/* Evaluation Tab */}
      {activeTab === 'evaluation' && (
        <div className="space-y-4">
          <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="rounded-2xl border border-border bg-card p-5">
              <h3 className="text-base font-semibold text-foreground flex items-center gap-2 mb-3"><Award className="w-4 h-4 text-birla-gold" />Recent Evaluations</h3>
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {[
                  { student: 'Aarav Sharma', bspId: 'BSP2024001', type: 'Unit Test', subject: 'Math', marks: 42, max: 50 },
                  { student: 'Diya Patel', bspId: 'BSP2024002', type: 'Assignment', subject: 'Math', marks: 28, max: 30 },
                  { student: 'Arjun Reddy', bspId: 'BSP2024003', type: 'Periodic Test', subject: 'Math', marks: 65, max: 80 },
                  { student: 'Ananya Gupta', bspId: 'BSP2024004', type: 'Unit Test', subject: 'Math', marks: 48, max: 50 },
                  { student: 'Vivaan Joshi', bspId: 'BSP2024005', type: 'Project', subject: 'Math', marks: 18, max: 25 },
                ].map((e, i) => (
                  <div key={i} className="flex items-center justify-between p-2.5 rounded-xl border border-border hover:bg-muted/30">
                    <div>
                      <p className="text-xs font-medium text-foreground">{e.student}</p>
                      <p className="text-[10px] text-muted-foreground">{e.bspId} &bull; {e.type} &bull; {e.subject}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-foreground">{e.marks}/{e.max}</p>
                      <p className="text-[10px] text-birla-gold">{Math.round(e.marks/e.max*100)}%</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-2xl border border-border bg-card p-5">
              <h3 className="text-base font-semibold text-foreground flex items-center gap-2 mb-3"><Target className="w-4 h-4 text-birla-cyan" />Competency Overview</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={[
                    { skill: 'Critical Thinking', value: 75 },
                    { skill: 'Problem Solving', value: 70 },
                    { skill: 'Communication', value: 82 },
                    { skill: 'Creativity', value: 65 },
                    { skill: 'Collaboration', value: 78 },
                  ]}>
                    <PolarGrid stroke={darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'} />
                    <PolarAngleAxis dataKey="skill" tick={{ fontSize: 10 }} stroke={darkMode ? '#94a3b8' : '#64748b'} />
                    <PolarRadiusAxis tick={{ fontSize: 9 }} />
                    <Radar name="Class X-A" dataKey="value" stroke="#C8A45C" fill="#C8A45C" fillOpacity={0.2} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* Communication Tab */}
      {activeTab === 'communication' && (
        <div className="space-y-4">
          <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-5">
            <h3 className="text-base font-semibold text-foreground flex items-center gap-2 mb-3"><MessageSquare className="w-4 h-4 text-birla-cyan" />Communication History</h3>
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {communicationLogData.map((c, i) => (
                <div key={i} className="flex items-center gap-3 p-3 rounded-xl border border-border hover:bg-muted/30 transition-colors">
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${c.type === 'Phone' ? 'bg-emerald-500/10' : c.type === 'Email' ? 'bg-blue-500/10' : c.type === 'Meeting' ? 'bg-purple-500/10' : 'bg-amber-500/10'}`}>
                    {c.type === 'Phone' ? <Phone className="w-4 h-4 text-emerald-500" /> : c.type === 'Email' ? <Mail className="w-4 h-4 text-blue-500" /> : c.type === 'Meeting' ? <Users className="w-4 h-4 text-purple-500" /> : <FileText className="w-4 h-4 text-amber-500" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-foreground">{c.subject}</p>
                    <p className="text-[10px] text-muted-foreground">{c.student} &bull; {c.parent} &bull; {c.type}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] text-muted-foreground">{c.date}</p>
                    <span className={`px-1.5 py-0.5 rounded text-[10px] font-medium ${c.status === 'Completed' ? 'bg-emerald-500/10 text-emerald-500' : c.status === 'Follow-up' ? 'bg-amber-500/10 text-amber-500' : 'bg-red-500/10 text-red-500'}`}>{c.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      )}

      {/* Forms Tab */}
      {activeTab === 'forms' && (
        <div className="space-y-4">
          <motion.div variants={itemVariants} className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
            {formsList.map((form) => {
              const Icon = form.icon
              return (
                <button key={form.id} onClick={() => setShowForm(form.id)}
                  className={`flex flex-col items-center gap-2 p-4 rounded-2xl border border-border hover:border-birla-gold/30 hover:shadow-lg transition-all group ${showForm === form.id ? 'border-birla-gold/50 shadow-lg bg-birla-gold/5' : ''}`}>
                  <div className="w-10 h-10 rounded-xl bg-birla-gold/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Icon className="w-5 h-5 text-birla-gold" />
                  </div>
                  <span className="text-[10px] text-muted-foreground group-hover:text-foreground text-center">{form.label}</span>
                </button>
              )
            })}
          </motion.div>

          {/* Smart Attendance Form */}
          {showForm === 'attendance' && (
            <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-semibold text-foreground flex items-center gap-2"><UserCheck className="w-5 h-5 text-emerald-500" />Smart Attendance Form</h3>
                <button onClick={() => setShowForm(null)} className="w-8 h-8 rounded-lg border border-border flex items-center justify-center hover:bg-muted/50"><X className="w-4 h-4" /></button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div><label className={labelCls}>Class *</label><select value={attendanceForm.className} onChange={(e) => setAttendanceForm({...attendanceForm, className: e.target.value})} className={inputCls}><option value="">Select Class</option>{classes.map(c => <option key={c} value={c}>{c}</option>)}</select></div>
                <div><label className={labelCls}>Date *</label><input type="date" value={attendanceForm.date} onChange={(e) => setAttendanceForm({...attendanceForm, date: e.target.value})} className={inputCls} /></div>
              </div>
              <div className="overflow-x-auto mb-4">
                <table className="w-full text-xs">
                  <thead><tr className="border-b border-border"><th className="text-left p-2 text-muted-foreground font-medium">Student</th><th className="text-center p-2 text-muted-foreground font-medium">BSP ID</th><th className="text-center p-2 text-muted-foreground font-medium">PEN No</th><th className="text-center p-2 text-muted-foreground font-medium">Uppar ID</th><th className="text-center p-2 text-muted-foreground font-medium">Attendance</th><th className="text-left p-2 text-muted-foreground font-medium">Remarks</th></tr></thead>
                  <tbody>
                    {attendanceForm.students.map((s, i) => (
                      <tr key={s.id} className="border-b border-border hover:bg-muted/30">
                        <td className="p-2 font-medium text-foreground">{s.name}</td>
                        <td className="text-center p-2 text-birla-cyan">{s.bspId}</td>
                        <td className="text-center p-2 text-birla-gold">{s.penNo}</td>
                        <td className="text-center p-2 text-muted-foreground">{s.upparId}</td>
                        <td className="text-center p-2">
                          <div className="flex justify-center gap-1">
                            {['Present', 'Absent', 'Late', 'Half-Day'].map(st => (
                              <button key={st} onClick={() => {
                                const ns = [...attendanceForm.students]; ns[i] = { ...ns[i], status: st }; setAttendanceForm({ ...attendanceForm, students: ns })
                              }} className={`px-1.5 py-0.5 rounded text-[9px] font-medium ${s.status === st ? (st === 'Present' ? 'bg-emerald-500/10 text-emerald-500' : st === 'Absent' ? 'bg-red-500/10 text-red-500' : st === 'Late' ? 'bg-amber-500/10 text-amber-500' : 'bg-blue-500/10 text-blue-500') : 'bg-muted/50 text-muted-foreground'}`}>{st}</button>
                            ))}
                          </div>
                        </td>
                        <td className="p-2"><input type="text" value={s.remarks} onChange={(e) => { const ns = [...attendanceForm.students]; ns[i] = { ...ns[i], remarks: e.target.value }; setAttendanceForm({ ...attendanceForm, students: ns }) }} className="w-full px-2 py-1 rounded-lg border border-border bg-background text-xs" placeholder="Remarks" /></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="flex justify-end gap-3">
                <button onClick={() => setShowForm(null)} className="px-4 py-2 rounded-xl border border-border text-sm text-muted-foreground hover:bg-muted/50">Cancel</button>
                <button onClick={() => handleSubmit('attendance')} className="px-4 py-2 rounded-xl gradient-birla-gold text-birla-blue text-sm font-medium hover:shadow-lg transition-all">Save Attendance</button>
              </div>
            </motion.div>
          )}

          {/* Lesson Plan Form */}
          {showForm === 'lessonPlan' && (
            <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-semibold text-foreground flex items-center gap-2"><BookOpen className="w-5 h-5 text-emerald-500" />Lesson Plan Form</h3>
                <button onClick={() => setShowForm(null)} className="w-8 h-8 rounded-lg border border-border flex items-center justify-center hover:bg-muted/50"><X className="w-4 h-4" /></button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div><label className={labelCls}>Date *</label><input type="date" value={lessonPlanForm.date} onChange={(e) => setLessonPlanForm({...lessonPlanForm, date: e.target.value})} className={inputCls} /></div>
                <div><label className={labelCls}>Period *</label><select value={lessonPlanForm.period} onChange={(e) => setLessonPlanForm({...lessonPlanForm, period: e.target.value})} className={inputCls}><option value="">Select Period</option>{periods.map(p => <option key={p} value={p}>Period {p}</option>)}</select></div>
                <div><label className={labelCls}>Subject *</label><select value={lessonPlanForm.subject} onChange={(e) => setLessonPlanForm({...lessonPlanForm, subject: e.target.value})} className={inputCls}><option value="">Select Subject</option>{subjects.map(s => <option key={s} value={s}>{s}</option>)}</select></div>
                <div><label className={labelCls}>Class *</label><select value={lessonPlanForm.className} onChange={(e) => setLessonPlanForm({...lessonPlanForm, className: e.target.value})} className={inputCls}><option value="">Select Class</option>{classes.map(c => <option key={c} value={c}>{c}</option>)}</select></div>
                <div><label className={labelCls}>Topic *</label><input type="text" value={lessonPlanForm.topic} onChange={(e) => setLessonPlanForm({...lessonPlanForm, topic: e.target.value})} className={inputCls} placeholder="Topic name" /></div>
                <div><label className={labelCls}>Teaching Method *</label><select value={lessonPlanForm.teachingMethod} onChange={(e) => setLessonPlanForm({...lessonPlanForm, teachingMethod: e.target.value})} className={inputCls}><option value="Lecture">Lecture</option><option value="Discussion">Discussion</option><option value="Activity">Activity</option><option value="Experiment">Experiment</option><option value="Group Work">Group Work</option><option value="Flipped">Flipped</option></select></div>
                <div className="md:col-span-2 lg:col-span-3"><label className={labelCls}>Objectives *</label><textarea value={lessonPlanForm.objectives} onChange={(e) => setLessonPlanForm({...lessonPlanForm, objectives: e.target.value})} rows={2} className={inputCls + ' resize-none'} placeholder="Learning objectives..." /></div>
                <div><label className={labelCls}>Resources</label><input type="text" value={lessonPlanForm.resources} onChange={(e) => setLessonPlanForm({...lessonPlanForm, resources: e.target.value})} className={inputCls} placeholder="Required resources" /></div>
                <div><label className={labelCls}>Homework</label><input type="text" value={lessonPlanForm.homework} onChange={(e) => setLessonPlanForm({...lessonPlanForm, homework: e.target.value})} className={inputCls} placeholder="Homework assignment" /></div>
                <div><label className={labelCls}>Assessment Type</label><input type="text" value={lessonPlanForm.assessmentType} onChange={(e) => setLessonPlanForm({...lessonPlanForm, assessmentType: e.target.value})} className={inputCls} placeholder="Quiz, oral, etc." /></div>
                <div className="md:col-span-2 lg:col-span-3"><label className={labelCls}>Notes</label><textarea value={lessonPlanForm.notes} onChange={(e) => setLessonPlanForm({...lessonPlanForm, notes: e.target.value})} rows={2} className={inputCls + ' resize-none'} placeholder="Additional notes..." /></div>
              </div>
              <div className="flex justify-end gap-3 mt-4">
                <button onClick={() => setShowForm(null)} className="px-4 py-2 rounded-xl border border-border text-sm text-muted-foreground hover:bg-muted/50">Cancel</button>
                <button onClick={() => handleSubmit('lessonPlan')} className="px-4 py-2 rounded-xl gradient-birla-gold text-birla-blue text-sm font-medium hover:shadow-lg transition-all">Save Lesson Plan</button>
              </div>
            </motion.div>
          )}

          {/* Assignment Creation Form */}
          {showForm === 'assignment' && (
            <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-semibold text-foreground flex items-center gap-2"><ClipboardList className="w-5 h-5 text-birla-cyan" />Assignment Creation Form</h3>
                <button onClick={() => setShowForm(null)} className="w-8 h-8 rounded-lg border border-border flex items-center justify-center hover:bg-muted/50"><X className="w-4 h-4" /></button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div><label className={labelCls}>Title *</label><input type="text" value={assignmentForm.title} onChange={(e) => setAssignmentForm({...assignmentForm, title: e.target.value})} className={inputCls} placeholder="Enter assignment title" /></div>
                <div><label className={labelCls}>Subject *</label><select value={assignmentForm.subject} onChange={(e) => setAssignmentForm({...assignmentForm, subject: e.target.value})} className={inputCls}><option value="">Select Subject</option>{subjects.map(s => <option key={s} value={s}>{s}</option>)}</select></div>
                <div><label className={labelCls}>Class *</label><select value={assignmentForm.className} onChange={(e) => setAssignmentForm({...assignmentForm, className: e.target.value})} className={inputCls}><option value="">Select Class</option>{classes.map(c => <option key={c} value={c}>{c}</option>)}</select></div>
                <div><label className={labelCls}>Due Date *</label><input type="date" value={assignmentForm.dueDate} onChange={(e) => setAssignmentForm({...assignmentForm, dueDate: e.target.value})} className={inputCls} /></div>
                <div><label className={labelCls}>Max Marks *</label><input type="number" value={assignmentForm.maxMarks} onChange={(e) => setAssignmentForm({...assignmentForm, maxMarks: e.target.value})} className={inputCls} placeholder="100" /></div>
                <div><label className={labelCls}>Type *</label><select value={assignmentForm.type} onChange={(e) => setAssignmentForm({...assignmentForm, type: e.target.value})} className={inputCls}><option value="Homework">Homework</option><option value="Project">Project</option><option value="Worksheet">Worksheet</option><option value="Research">Research</option><option value="Practice">Practice</option></select></div>
                <div><label className={labelCls}>Bloom&apos;s Level *</label><select value={assignmentForm.bloomsLevel} onChange={(e) => setAssignmentForm({...assignmentForm, bloomsLevel: e.target.value})} className={inputCls}>{bloomsLevels.map(l => <option key={l} value={l}>{l}</option>)}</select></div>
                <div className="md:col-span-2 lg:col-span-3"><label className={labelCls}>Description</label><textarea value={assignmentForm.description} onChange={(e) => setAssignmentForm({...assignmentForm, description: e.target.value})} rows={3} className={inputCls + ' resize-none'} placeholder="Assignment details..." /></div>
              </div>
              <div className="flex justify-end gap-3 mt-4">
                <button onClick={() => setShowForm(null)} className="px-4 py-2 rounded-xl border border-border text-sm text-muted-foreground hover:bg-muted/50">Cancel</button>
                <button onClick={() => handleSubmit('assignment')} className="px-4 py-2 rounded-xl gradient-birla-gold text-birla-blue text-sm font-medium hover:shadow-lg transition-all">Create Assignment</button>
              </div>
            </motion.div>
          )}

          {/* Student Evaluation Form */}
          {showForm === 'evaluation' && (
            <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-semibold text-foreground flex items-center gap-2"><Award className="w-5 h-5 text-birla-gold" />Student Evaluation Form</h3>
                <button onClick={() => setShowForm(null)} className="w-8 h-8 rounded-lg border border-border flex items-center justify-center hover:bg-muted/50"><X className="w-4 h-4" /></button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <label className={labelCls}>Student *</label>
                  <select value={evaluationForm.studentId} onChange={(e) => setEvaluationForm({...evaluationForm, studentId: e.target.value})} className={inputCls}>
                    <option value="">Select Student</option>
                    {studentsList.map(s => <option key={s.id} value={s.id}>{s.name} (BSP: {s.bspId} | PEN: {s.penNo} | UPP: {s.upparId})</option>)}
                  </select>
                  {evaluationForm.studentId && (
                    <p className="text-[10px] text-birla-cyan mt-1">
                      BSP: {studentsList.find(s => s.id === evaluationForm.studentId)?.bspId} | PEN: {studentsList.find(s => s.id === evaluationForm.studentId)?.penNo} | UPP: {studentsList.find(s => s.id === evaluationForm.studentId)?.upparId}
                    </p>
                  )}
                </div>
                <div><label className={labelCls}>Subject *</label><select value={evaluationForm.subject} onChange={(e) => setEvaluationForm({...evaluationForm, subject: e.target.value})} className={inputCls}><option value="">Select Subject</option>{subjects.map(s => <option key={s} value={s}>{s}</option>)}</select></div>
                <div><label className={labelCls}>Assessment Type *</label><select value={evaluationForm.assessmentType} onChange={(e) => setEvaluationForm({...evaluationForm, assessmentType: e.target.value})} className={inputCls}><option value="Unit Test">Unit Test</option><option value="Periodic Test">Periodic Test</option><option value="Assignment">Assignment</option><option value="Project">Project</option><option value="Practical">Practical</option><option value="Oral">Oral</option></select></div>
                <div><label className={labelCls}>Marks Obtained *</label><input type="number" value={evaluationForm.marks} onChange={(e) => setEvaluationForm({...evaluationForm, marks: e.target.value})} className={inputCls} placeholder="Obtained marks" /></div>
                <div><label className={labelCls}>Max Marks *</label><input type="number" value={evaluationForm.maxMarks} onChange={(e) => setEvaluationForm({...evaluationForm, maxMarks: e.target.value})} className={inputCls} placeholder="Maximum marks" /></div>
                <div><label className={labelCls}>Competency Level *</label><select value={evaluationForm.competencyLevel} onChange={(e) => setEvaluationForm({...evaluationForm, competencyLevel: e.target.value})} className={inputCls}><option value="Beginner">Beginner</option><option value="Developing">Developing</option><option value="Proficient">Proficient</option><option value="Advanced">Advanced</option></select></div>
                <div className="md:col-span-2 lg:col-span-3"><label className={labelCls}>Remarks</label><textarea value={evaluationForm.remarks} onChange={(e) => setEvaluationForm({...evaluationForm, remarks: e.target.value})} rows={2} className={inputCls + ' resize-none'} placeholder="Evaluation remarks..." /></div>
              </div>
              <div className="flex justify-end gap-3 mt-4">
                <button onClick={() => setShowForm(null)} className="px-4 py-2 rounded-xl border border-border text-sm text-muted-foreground hover:bg-muted/50">Cancel</button>
                <button onClick={() => handleSubmit('evaluation')} className="px-4 py-2 rounded-xl gradient-birla-gold text-birla-blue text-sm font-medium hover:shadow-lg transition-all">Save Evaluation</button>
              </div>
            </motion.div>
          )}

          {/* Rubric Assessment Form */}
          {showForm === 'rubric' && (
            <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-semibold text-foreground flex items-center gap-2"><Target className="w-5 h-5 text-purple-500" />Rubric Assessment Form</h3>
                <button onClick={() => setShowForm(null)} className="w-8 h-8 rounded-lg border border-border flex items-center justify-center hover:bg-muted/50"><X className="w-4 h-4" /></button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <label className={labelCls}>Student *</label>
                  <select value={rubricForm.studentId} onChange={(e) => setRubricForm({...rubricForm, studentId: e.target.value})} className={inputCls}>
                    <option value="">Select Student</option>
                    {studentsList.map(s => <option key={s.id} value={s.id}>{s.name} (BSP: {s.bspId})</option>)}
                  </select>
                </div>
                <div><label className={labelCls}>Subject *</label><select value={rubricForm.subject} onChange={(e) => setRubricForm({...rubricForm, subject: e.target.value})} className={inputCls}><option value="">Select Subject</option>{subjects.map(s => <option key={s} value={s}>{s}</option>)}</select></div>
                <div><label className={labelCls}>Rubric Name *</label><input type="text" value={rubricForm.rubricName} onChange={(e) => setRubricForm({...rubricForm, rubricName: e.target.value})} className={inputCls} placeholder="e.g., Project Rubric" /></div>
              </div>
              <div className="border-t border-border pt-4 mb-4">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-sm font-semibold text-foreground">Criteria</h4>
                  <button onClick={addRubricCriteria} className="flex items-center gap-1 px-3 py-1.5 rounded-lg gradient-birla-gold text-birla-blue text-xs font-medium hover:shadow-md transition-all"><Plus className="w-3 h-3" />Add Criteria</button>
                </div>
                <div className="space-y-3">
                  {rubricForm.criteria.map((c, idx) => (
                    <div key={idx} className="flex items-center gap-3 p-3 rounded-xl border border-border bg-muted/20">
                      <span className="text-xs font-semibold text-foreground w-6">{idx + 1}.</span>
                      <input type="text" value={c.name} onChange={(e) => updateRubricCriteria(idx, 'name', e.target.value)} className="flex-1 px-2 py-1.5 rounded-lg border border-border bg-background text-xs" placeholder="Criteria name" />
                      <input type="number" value={c.maxMarks} onChange={(e) => updateRubricCriteria(idx, 'maxMarks', e.target.value)} className="w-20 px-2 py-1.5 rounded-lg border border-border bg-background text-xs" placeholder="Max" />
                      <input type="number" value={c.score} onChange={(e) => updateRubricCriteria(idx, 'score', e.target.value)} className="w-20 px-2 py-1.5 rounded-lg border border-border bg-background text-xs" placeholder="Score" />
                      {rubricForm.criteria.length > 1 && (
                        <button onClick={() => removeRubricCriteria(idx)} className="text-red-500 hover:text-red-700"><X className="w-4 h-4" /></button>
                      )}
                    </div>
                  ))}
                </div>
                <div className="flex items-center justify-end gap-2 mt-3 p-2 rounded-lg bg-birla-gold/5 border border-birla-gold/20">
                  <span className="text-xs font-medium text-muted-foreground">Total:</span>
                  <span className="text-sm font-bold text-birla-gold">
                    {rubricForm.criteria.reduce((sum, c) => sum + (Number(c.score) || 0), 0)} / {rubricForm.criteria.reduce((sum, c) => sum + (Number(c.maxMarks) || 0), 0)}
                  </span>
                </div>
              </div>
              <div><label className={labelCls}>Comments</label><textarea value={rubricForm.comments} onChange={(e) => setRubricForm({...rubricForm, comments: e.target.value})} rows={2} className={inputCls + ' resize-none'} placeholder="Overall comments..." /></div>
              <div className="flex justify-end gap-3 mt-4">
                <button onClick={() => setShowForm(null)} className="px-4 py-2 rounded-xl border border-border text-sm text-muted-foreground hover:bg-muted/50">Cancel</button>
                <button onClick={() => handleSubmit('rubric')} className="px-4 py-2 rounded-xl gradient-birla-gold text-birla-blue text-sm font-medium hover:shadow-lg transition-all">Save Rubric</button>
              </div>
            </motion.div>
          )}

          {/* Report Card Generation Form */}
          {showForm === 'reportCard' && (
            <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-semibold text-foreground flex items-center gap-2"><FileText className="w-5 h-5 text-birla-cyan" />Report Card Generation Form</h3>
                <button onClick={() => setShowForm(null)} className="w-8 h-8 rounded-lg border border-border flex items-center justify-center hover:bg-muted/50"><X className="w-4 h-4" /></button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div><label className={labelCls}>Class *</label><select value={reportCardForm.className} onChange={(e) => setReportCardForm({...reportCardForm, className: e.target.value})} className={inputCls}><option value="">Select Class</option>{classes.map(c => <option key={c} value={c}>{c}</option>)}</select></div>
                <div><label className={labelCls}>Term *</label><select value={reportCardForm.term} onChange={(e) => setReportCardForm({...reportCardForm, term: e.target.value})} className={inputCls}><option value="Term 1">Term 1</option><option value="Term 2">Term 2</option><option value="Annual">Annual</option></select></div>
              </div>
              <div className="space-y-2 mb-4">
                <label className={labelCls}>Select Students</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 max-h-48 overflow-y-auto p-3 rounded-xl border border-border bg-muted/20">
                  {studentsList.map(s => (
                    <label key={s.id} className="flex items-center gap-2 p-2 rounded-lg hover:bg-muted/30 cursor-pointer">
                      <input type="checkbox" checked={reportCardForm.students.includes(s.id)} onChange={(e) => {
                        const students = e.target.checked ? [...reportCardForm.students, s.id] : reportCardForm.students.filter(id => id !== s.id)
                        setReportCardForm({...reportCardForm, students})
                      }} className="w-4 h-4 rounded border-border" />
                      <div>
                        <span className="text-xs font-medium text-foreground">{s.name}</span>
                        <span className="text-[10px] text-muted-foreground ml-2">BSP: {s.bspId}</span>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <label className="flex items-center gap-2"><input type="checkbox" checked={reportCardForm.includeScholastic} onChange={(e) => setReportCardForm({...reportCardForm, includeScholastic: e.target.checked})} className="w-4 h-4 rounded border-border" /><span className="text-xs font-medium text-muted-foreground">Include Scholastic</span></label>
                <label className="flex items-center gap-2"><input type="checkbox" checked={reportCardForm.includeCoScholastic} onChange={(e) => setReportCardForm({...reportCardForm, includeCoScholastic: e.target.checked})} className="w-4 h-4 rounded border-border" /><span className="text-xs font-medium text-muted-foreground">Include Co-Scholastic</span></label>
                <label className="flex items-center gap-2"><input type="checkbox" checked={reportCardForm.includeCompetency} onChange={(e) => setReportCardForm({...reportCardForm, includeCompetency: e.target.checked})} className="w-4 h-4 rounded border-border" /><span className="text-xs font-medium text-muted-foreground">Include Competency</span></label>
              </div>
              <div className="flex justify-end gap-3 mt-4">
                <button onClick={() => setShowForm(null)} className="px-4 py-2 rounded-xl border border-border text-sm text-muted-foreground hover:bg-muted/50">Cancel</button>
                <button onClick={() => handleSubmit('reportCard')} className="px-4 py-2 rounded-xl gradient-birla-gold text-birla-blue text-sm font-medium hover:shadow-lg transition-all">Generate Report Cards</button>
              </div>
            </motion.div>
          )}

          {/* Parent Communication Form */}
          {showForm === 'communication' && (
            <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-semibold text-foreground flex items-center gap-2"><Phone className="w-5 h-5 text-birla-cyan" />Parent Communication Form</h3>
                <button onClick={() => setShowForm(null)} className="w-8 h-8 rounded-lg border border-border flex items-center justify-center hover:bg-muted/50"><X className="w-4 h-4" /></button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <label className={labelCls}>Student *</label>
                  <select value={communicationForm.studentId} onChange={(e) => {
                    const student = studentsList.find(s => s.id === e.target.value)
                    setCommunicationForm({...communicationForm, studentId: e.target.value, parentName: student ? `Parent of ${student.name}` : ''})
                  }} className={inputCls}>
                    <option value="">Select Student</option>
                    {studentsList.map(s => <option key={s.id} value={s.id}>{s.name} (BSP: {s.bspId})</option>)}
                  </select>
                </div>
                <div><label className={labelCls}>Parent Name (Auto)</label><input type="text" value={communicationForm.parentName} onChange={(e) => setCommunicationForm({...communicationForm, parentName: e.target.value})} className={inputCls} placeholder="Auto-filled" /></div>
                <div><label className={labelCls}>Communication Type *</label><select value={communicationForm.communicationType} onChange={(e) => setCommunicationForm({...communicationForm, communicationType: e.target.value})} className={inputCls}><option value="Phone">Phone</option><option value="Email">Email</option><option value="Meeting">Meeting</option><option value="Note">Note</option></select></div>
                <div><label className={labelCls}>Subject *</label><input type="text" value={communicationForm.subject} onChange={(e) => setCommunicationForm({...communicationForm, subject: e.target.value})} className={inputCls} placeholder="Communication subject" /></div>
                <div><label className={labelCls}>Follow-up Date</label><input type="date" value={communicationForm.followUpDate} onChange={(e) => setCommunicationForm({...communicationForm, followUpDate: e.target.value})} className={inputCls} /></div>
                <div><label className={labelCls}>Priority *</label><select value={communicationForm.priority} onChange={(e) => setCommunicationForm({...communicationForm, priority: e.target.value})} className={inputCls}><option value="Low">Low</option><option value="Medium">Medium</option><option value="High">High</option><option value="Urgent">Urgent</option></select></div>
                <div className="md:col-span-2 lg:col-span-3"><label className={labelCls}>Details *</label><textarea value={communicationForm.details} onChange={(e) => setCommunicationForm({...communicationForm, details: e.target.value})} rows={3} className={inputCls + ' resize-none'} placeholder="Communication details..." /></div>
              </div>
              <div className="flex justify-end gap-3 mt-4">
                <button onClick={() => setShowForm(null)} className="px-4 py-2 rounded-xl border border-border text-sm text-muted-foreground hover:bg-muted/50">Cancel</button>
                <button onClick={() => handleSubmit('communication')} className="px-4 py-2 rounded-xl gradient-birla-gold text-birla-blue text-sm font-medium hover:shadow-lg transition-all">Save Communication</button>
              </div>
            </motion.div>
          )}

          {/* AI Teaching Request Form */}
          {showForm === 'aiTeaching' && (
            <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-semibold text-foreground flex items-center gap-2"><Sparkles className="w-5 h-5 text-purple-500" />AI Teaching Request Form</h3>
                <button onClick={() => setShowForm(null)} className="w-8 h-8 rounded-lg border border-border flex items-center justify-center hover:bg-muted/50"><X className="w-4 h-4" /></button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div><label className={labelCls}>Request Type *</label><select value={aiTeachingForm.requestType} onChange={(e) => setAiTeachingForm({...aiTeachingForm, requestType: e.target.value})} className={inputCls}><option value="Lesson Ideas">Lesson Ideas</option><option value="Assessment Questions">Assessment Questions</option><option value="Differentiation">Differentiation</option><option value="Remedial Plan">Remedial Plan</option><option value="Enrichment">Enrichment</option></select></div>
                <div><label className={labelCls}>Subject *</label><select value={aiTeachingForm.subject} onChange={(e) => setAiTeachingForm({...aiTeachingForm, subject: e.target.value})} className={inputCls}><option value="">Select Subject</option>{subjects.map(s => <option key={s} value={s}>{s}</option>)}</select></div>
                <div><label className={labelCls}>Class *</label><select value={aiTeachingForm.className} onChange={(e) => setAiTeachingForm({...aiTeachingForm, className: e.target.value})} className={inputCls}><option value="">Select Class</option>{classes.map(c => <option key={c} value={c}>{c}</option>)}</select></div>
                <div><label className={labelCls}>Topic</label><input type="text" value={aiTeachingForm.topic} onChange={(e) => setAiTeachingForm({...aiTeachingForm, topic: e.target.value})} className={inputCls} placeholder="Specific topic" /></div>
                <div className="md:col-span-2"><label className={labelCls}>Student Needs</label><textarea value={aiTeachingForm.studentNeeds} onChange={(e) => setAiTeachingForm({...aiTeachingForm, studentNeeds: e.target.value})} rows={3} className={inputCls + ' resize-none'} placeholder="Describe specific student needs, learning gaps, or challenges..." /></div>
              </div>
              <div className="flex justify-end gap-3 mt-4">
                <button onClick={() => setShowForm(null)} className="px-4 py-2 rounded-xl border border-border text-sm text-muted-foreground hover:bg-muted/50">Cancel</button>
                <button onClick={() => handleSubmit('aiTeaching')} className="px-4 py-2 rounded-xl gradient-birla-gold text-birla-blue text-sm font-medium hover:shadow-lg transition-all flex items-center gap-1.5"><Sparkles className="w-3.5 h-3.5" />Generate AI Suggestions</button>
              </div>
            </motion.div>
          )}
        </div>
      )}

      {/* Reports Tab */}
      {activeTab === 'reports' && (
        <div className="space-y-4">
          <motion.div variants={itemVariants} className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
            {reportsList.map((rpt) => {
              const Icon = rpt.icon
              return (
                <button key={rpt.id} onClick={() => setShowForm('rpt_' + rpt.id)}
                  className={`flex flex-col items-center gap-2 p-3 rounded-2xl border border-border hover:border-birla-gold/30 hover:shadow-lg transition-all group ${showForm === 'rpt_' + rpt.id ? 'border-birla-gold/50 shadow-lg bg-birla-gold/5' : ''}`}>
                  <div className="w-9 h-9 rounded-xl bg-birla-gold/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Icon className="w-4 h-4 text-birla-gold" />
                  </div>
                  <span className="text-[9px] text-muted-foreground group-hover:text-foreground text-center">{rpt.label}</span>
                </button>
              )
            })}
          </motion.div>

          {/* Class Attendance Report */}
          {showForm === 'rpt_classAttendance' && (
            <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-5">
              <h3 className="text-base font-semibold text-foreground flex items-center gap-2 mb-1"><UserCheck className="w-4 h-4 text-emerald-500" />Class Attendance Report</h3>
              <p className="text-xs text-muted-foreground mb-3">Daily attendance summary</p>
              <div className="overflow-x-auto mb-4">
                <table className="w-full text-xs">
                  <thead><tr className="border-b border-border"><th className="text-left p-2 text-muted-foreground font-medium">Day</th><th className="text-center p-2 text-muted-foreground font-medium">Present</th><th className="text-center p-2 text-muted-foreground font-medium">Absent</th><th className="text-center p-2 text-muted-foreground font-medium">Late</th><th className="text-center p-2 text-muted-foreground font-medium">Attendance %</th></tr></thead>
                  <tbody>
                    {attendanceReportData.map((r, i) => (
                      <tr key={i} className="border-b border-border hover:bg-muted/30"><td className="p-2 font-medium text-foreground">{r.date}</td><td className="text-center p-2 text-emerald-500">{r.present}</td><td className="text-center p-2 text-red-500">{r.absent}</td><td className="text-center p-2 text-amber-500">{r.late}</td><td className="text-center p-2 font-semibold">{Math.round(r.present / (r.present + r.absent + r.late) * 100)}%</td></tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={attendanceReportData}>
                    <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'} />
                    <XAxis dataKey="date" tick={{ fontSize: 10 }} stroke={darkMode ? '#64748b' : '#94a3b8'} />
                    <YAxis tick={{ fontSize: 10 }} stroke={darkMode ? '#64748b' : '#94a3b8'} />
                    <Tooltip contentStyle={tooltipStyle} />
                    <Legend wrapperStyle={{ fontSize: '11px' }} />
                    <Line type="monotone" dataKey="present" stroke="#10B981" strokeWidth={2} name="Present" />
                    <Line type="monotone" dataKey="absent" stroke="#EF4444" strokeWidth={2} name="Absent" />
                    <Line type="monotone" dataKey="late" stroke="#F59E0B" strokeWidth={2} name="Late" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </motion.div>
          )}

          {/* Assignment Status Report */}
          {showForm === 'rpt_assignmentStatus' && (
            <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-5">
              <h3 className="text-base font-semibold text-foreground flex items-center gap-2 mb-1"><ClipboardList className="w-4 h-4 text-birla-gold" />Assignment Status Report</h3>
              <p className="text-xs text-muted-foreground mb-3">Class-wise assignment submission status</p>
              <div className="overflow-x-auto mb-4">
                <table className="w-full text-xs">
                  <thead><tr className="border-b border-border"><th className="text-left p-2 text-muted-foreground font-medium">Class</th><th className="text-center p-2 text-muted-foreground font-medium">Submitted</th><th className="text-center p-2 text-muted-foreground font-medium">Pending</th><th className="text-center p-2 text-muted-foreground font-medium">Graded</th></tr></thead>
                  <tbody>
                    {assignmentStatusData.map((r, i) => (
                      <tr key={i} className="border-b border-border hover:bg-muted/30"><td className="p-2 font-medium text-foreground">{r.class}</td><td className="text-center p-2 text-emerald-500">{r.submitted}</td><td className="text-center p-2 text-amber-500">{r.pending}</td><td className="text-center p-2 text-birla-cyan">{r.graded}</td></tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={assignmentStatusData}>
                    <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'} />
                    <XAxis dataKey="class" tick={{ fontSize: 10 }} stroke={darkMode ? '#64748b' : '#94a3b8'} />
                    <YAxis tick={{ fontSize: 10 }} stroke={darkMode ? '#64748b' : '#94a3b8'} />
                    <Tooltip contentStyle={tooltipStyle} />
                    <Legend wrapperStyle={{ fontSize: '11px' }} />
                    <Bar dataKey="submitted" stackId="a" fill="#10B981" name="Submitted" />
                    <Bar dataKey="pending" stackId="a" fill="#F59E0B" name="Pending" />
                    <Bar dataKey="graded" stackId="a" fill="#22D3EE" name="Graded" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </motion.div>
          )}

          {/* Student Performance Report */}
          {showForm === 'rpt_studentPerformance' && (
            <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-5">
              <h3 className="text-base font-semibold text-foreground flex items-center gap-2 mb-1"><Users className="w-4 h-4 text-birla-cyan" />Student Performance Report</h3>
              <p className="text-xs text-muted-foreground mb-3">Individual student performance with UDISE+ identifiers</p>
              <div className="overflow-x-auto mb-4">
                <table className="w-full text-xs">
                  <thead><tr className="border-b border-border"><th className="text-left p-2 text-muted-foreground font-medium">Name</th><th className="text-center p-2 text-muted-foreground font-medium">BSP ID</th><th className="text-center p-2 text-muted-foreground font-medium">PEN No</th><th className="text-center p-2 text-muted-foreground font-medium">Uppar ID</th><th className="text-center p-2 text-muted-foreground font-medium">Math</th><th className="text-center p-2 text-muted-foreground font-medium">Science</th><th className="text-center p-2 text-muted-foreground font-medium">English</th><th className="text-center p-2 text-muted-foreground font-medium">Hindi</th><th className="text-center p-2 text-muted-foreground font-medium">SST</th><th className="text-center p-2 text-muted-foreground font-medium">Avg</th></tr></thead>
                  <tbody>
                    {studentPerformanceData.map((r, i) => (
                      <tr key={i} className="border-b border-border hover:bg-muted/30">
                        <td className="p-2 font-medium text-foreground">{r.name}</td>
                        <td className="text-center p-2 text-birla-cyan">{r.bspId}</td>
                        <td className="text-center p-2 text-birla-gold">{r.penNo}</td>
                        <td className="text-center p-2 text-muted-foreground">{r.upparId}</td>
                        <td className="text-center p-2">{r.math}</td>
                        <td className="text-center p-2">{r.science}</td>
                        <td className="text-center p-2">{r.english}</td>
                        <td className="text-center p-2">{r.hindi}</td>
                        <td className="text-center p-2">{r.sst}</td>
                        <td className="text-center p-2 font-bold text-foreground">{Math.round((r.math + r.science + r.english + r.hindi + r.sst) / 5)}%</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={studentPerformanceData}>
                    <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'} />
                    <XAxis dataKey="name" tick={{ fontSize: 9 }} stroke={darkMode ? '#64748b' : '#94a3b8'} />
                    <YAxis tick={{ fontSize: 10 }} stroke={darkMode ? '#64748b' : '#94a3b8'} />
                    <Tooltip contentStyle={tooltipStyle} />
                    <Legend wrapperStyle={{ fontSize: '10px' }} />
                    <Bar dataKey="math" fill="#1A2D4A" name="Math" />
                    <Bar dataKey="science" fill="#22D3EE" name="Science" />
                    <Bar dataKey="english" fill="#C8A45C" name="English" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </motion.div>
          )}

          {/* Assessment Analysis Report */}
          {showForm === 'rpt_assessmentAnalysis' && (
            <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-5">
              <h3 className="text-base font-semibold text-foreground flex items-center gap-2 mb-1"><Award className="w-4 h-4 text-purple-500" />Assessment Analysis Report</h3>
              <p className="text-xs text-muted-foreground mb-3">Test-wise performance analysis</p>
              <div className="overflow-x-auto mb-4">
                <table className="w-full text-xs">
                  <thead><tr className="border-b border-border"><th className="text-left p-2 text-muted-foreground font-medium">Test</th><th className="text-center p-2 text-muted-foreground font-medium">Avg</th><th className="text-center p-2 text-muted-foreground font-medium">Highest</th><th className="text-center p-2 text-muted-foreground font-medium">Lowest</th><th className="text-center p-2 text-muted-foreground font-medium">Passed</th><th className="text-center p-2 text-muted-foreground font-medium">Failed</th><th className="text-center p-2 text-muted-foreground font-medium">Range</th></tr></thead>
                  <tbody>
                    {assessmentAnalysisData.map((r, i) => (
                      <tr key={i} className="border-b border-border hover:bg-muted/30">
                        <td className="p-2 font-medium text-foreground">{r.test}</td>
                        <td className="text-center p-2 font-semibold">{r.avg}%</td>
                        <td className="text-center p-2 text-emerald-500">{r.highest}%</td>
                        <td className="text-center p-2 text-red-500">{r.lowest}%</td>
                        <td className="text-center p-2">{r.passed}</td>
                        <td className="text-center p-2 text-red-500">{r.failed}</td>
                        <td className="text-center p-2">
                          <div className="flex items-center gap-1 justify-center">
                            <div className="w-16 bg-muted rounded-full h-1.5"><div className="bg-gradient-to-r from-red-500 via-amber-500 to-emerald-500 h-1.5 rounded-full" style={{ width: '100%' }} /></div>
                            <span className="text-[10px]">{r.highest - r.lowest}</span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={assessmentAnalysisData}>
                    <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'} />
                    <XAxis dataKey="test" tick={{ fontSize: 9 }} stroke={darkMode ? '#64748b' : '#94a3b8'} />
                    <YAxis tick={{ fontSize: 10 }} stroke={darkMode ? '#64748b' : '#94a3b8'} />
                    <Tooltip contentStyle={tooltipStyle} />
                    <Legend wrapperStyle={{ fontSize: '11px' }} />
                    <Bar dataKey="avg" fill="#8B5CF6" name="Avg %" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="highest" fill="#10B981" name="Highest %" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="lowest" fill="#EF4444" name="Lowest %" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </motion.div>
          )}

          {/* Competency Progress Report */}
          {showForm === 'rpt_competencyProgress' && (
            <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-5">
              <h3 className="text-base font-semibold text-foreground flex items-center gap-2 mb-1"><Target className="w-4 h-4 text-birla-gold" />Competency Progress Report</h3>
              <p className="text-xs text-muted-foreground mb-3">Student competency levels across key skills</p>
              <div className="overflow-x-auto mb-4">
                <table className="w-full text-xs">
                  <thead><tr className="border-b border-border"><th className="text-left p-2 text-muted-foreground font-medium">Student</th><th className="text-center p-2 text-muted-foreground font-medium">BSP ID</th><th className="text-center p-2 text-muted-foreground font-medium">Critical Thinking</th><th className="text-center p-2 text-muted-foreground font-medium">Problem Solving</th><th className="text-center p-2 text-muted-foreground font-medium">Communication</th><th className="text-center p-2 text-muted-foreground font-medium">Creativity</th><th className="text-center p-2 text-muted-foreground font-medium">Collaboration</th></tr></thead>
                  <tbody>
                    {competencyProgressData.map((r, i) => (
                      <tr key={i} className="border-b border-border hover:bg-muted/30">
                        <td className="p-2 font-medium text-foreground">{r.student}</td>
                        <td className="text-center p-2 text-birla-cyan">{r.bspId}</td>
                        <td className="text-center p-2">{r.criticalThinking}%</td>
                        <td className="text-center p-2">{r.problemSolving}%</td>
                        <td className="text-center p-2">{r.communication}%</td>
                        <td className="text-center p-2">{r.creativity}%</td>
                        <td className="text-center p-2">{r.collaboration}%</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={[
                    { skill: 'Critical Thinking', student1: 72, student2: 85, student3: 60, student4: 90 },
                    { skill: 'Problem Solving', student1: 68, student2: 80, student3: 55, student4: 88 },
                    { skill: 'Communication', student1: 80, student2: 78, student3: 70, student4: 85 },
                    { skill: 'Creativity', student1: 65, student2: 72, student3: 58, student4: 82 },
                    { skill: 'Collaboration', student1: 75, student2: 82, student3: 65, student4: 88 },
                  ]}>
                    <PolarGrid stroke={darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'} />
                    <PolarAngleAxis dataKey="skill" tick={{ fontSize: 10 }} stroke={darkMode ? '#94a3b8' : '#64748b'} />
                    <PolarRadiusAxis tick={{ fontSize: 9 }} />
                    <Radar name="Aarav" dataKey="student1" stroke="#1A2D4A" fill="#1A2D4A" fillOpacity={0.1} />
                    <Radar name="Diya" dataKey="student2" stroke="#22D3EE" fill="#22D3EE" fillOpacity={0.1} />
                    <Radar name="Arjun" dataKey="student3" stroke="#C8A45C" fill="#C8A45C" fillOpacity={0.1} />
                    <Radar name="Ananya" dataKey="student4" stroke="#10B981" fill="#10B981" fillOpacity={0.1} />
                    <Legend wrapperStyle={{ fontSize: '10px' }} />
                    <Tooltip contentStyle={tooltipStyle} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </motion.div>
          )}

          {/* Class Comparison Report */}
          {showForm === 'rpt_classComparison' && (
            <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-5">
              <h3 className="text-base font-semibold text-foreground flex items-center gap-2 mb-1"><BarChart3 className="w-4 h-4 text-birla-cyan" />Class Comparison Report</h3>
              <p className="text-xs text-muted-foreground mb-3">Cross-class performance comparison</p>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={classComparisonData}>
                    <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'} />
                    <XAxis dataKey="class" tick={{ fontSize: 10 }} stroke={darkMode ? '#64748b' : '#94a3b8'} />
                    <YAxis tick={{ fontSize: 10 }} stroke={darkMode ? '#64748b' : '#94a3b8'} />
                    <Tooltip contentStyle={tooltipStyle} />
                    <Legend wrapperStyle={{ fontSize: '10px' }} />
                    <Bar dataKey="math" fill="#1A2D4A" name="Math" radius={[3, 3, 0, 0]} />
                    <Bar dataKey="science" fill="#22D3EE" name="Science" radius={[3, 3, 0, 0]} />
                    <Bar dataKey="english" fill="#C8A45C" name="English" radius={[3, 3, 0, 0]} />
                    <Bar dataKey="hindi" fill="#8B5CF6" name="Hindi" radius={[3, 3, 0, 0]} />
                    <Bar dataKey="sst" fill="#10B981" name="SST" radius={[3, 3, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </motion.div>
          )}

          {/* Parent Communication Log Report */}
          {showForm === 'rpt_communicationLog' && (
            <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-5">
              <h3 className="text-base font-semibold text-foreground flex items-center gap-2 mb-1"><MessageSquare className="w-4 h-4 text-birla-gold" />Parent Communication Log Report</h3>
              <p className="text-xs text-muted-foreground mb-3">Complete communication history with parents</p>
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead><tr className="border-b border-border"><th className="text-left p-2 text-muted-foreground font-medium">Date</th><th className="text-left p-2 text-muted-foreground font-medium">Student</th><th className="text-left p-2 text-muted-foreground font-medium">Parent</th><th className="text-center p-2 text-muted-foreground font-medium">Type</th><th className="text-left p-2 text-muted-foreground font-medium">Subject</th><th className="text-center p-2 text-muted-foreground font-medium">Status</th></tr></thead>
                  <tbody>
                    {communicationLogData.map((c, i) => (
                      <tr key={i} className="border-b border-border hover:bg-muted/30">
                        <td className="p-2 text-muted-foreground">{c.date}</td>
                        <td className="p-2 font-medium text-foreground">{c.student}</td>
                        <td className="p-2 text-muted-foreground">{c.parent}</td>
                        <td className="text-center p-2">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${c.type === 'Phone' ? 'bg-emerald-500/10 text-emerald-500' : c.type === 'Email' ? 'bg-blue-500/10 text-blue-500' : c.type === 'Meeting' ? 'bg-purple-500/10 text-purple-500' : 'bg-amber-500/10 text-amber-500'}`}>{c.type}</span>
                        </td>
                        <td className="p-2">{c.subject}</td>
                        <td className="text-center p-2">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${c.status === 'Completed' ? 'bg-emerald-500/10 text-emerald-500' : c.status === 'Follow-up' ? 'bg-amber-500/10 text-amber-500' : 'bg-red-500/10 text-red-500'}`}>{c.status}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}

          {/* Teacher Effectiveness Report */}
          {showForm === 'rpt_teacherEffectiveness' && (
            <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-5">
              <h3 className="text-base font-semibold text-foreground flex items-center gap-2 mb-1"><Star className="w-4 h-4 text-birla-gold" />Teacher Effectiveness Report</h3>
              <p className="text-xs text-muted-foreground mb-3">Class average scores and feedback ratings</p>
              <div className="overflow-x-auto mb-4">
                <table className="w-full text-xs">
                  <thead><tr className="border-b border-border"><th className="text-left p-2 text-muted-foreground font-medium">Teacher</th><th className="text-center p-2 text-muted-foreground font-medium">Class</th><th className="text-center p-2 text-muted-foreground font-medium">Avg Score</th><th className="text-center p-2 text-muted-foreground font-medium">Feedback (★)</th></tr></thead>
                  <tbody>
                    {teacherEffectivenessData.map((r, i) => (
                      <tr key={i} className="border-b border-border hover:bg-muted/30">
                        <td className="p-2 font-medium text-foreground">{r.teacher}</td>
                        <td className="text-center p-2">{r.class}</td>
                        <td className="text-center p-2 font-semibold text-birla-cyan">{r.avgScore}%</td>
                        <td className="text-center p-2"><span className="text-birla-gold font-semibold">{r.feedback}</span> / 5.0</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={teacherEffectivenessData}>
                    <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'} />
                    <XAxis dataKey="teacher" tick={{ fontSize: 8 }} stroke={darkMode ? '#64748b' : '#94a3b8'} />
                    <YAxis tick={{ fontSize: 10 }} stroke={darkMode ? '#64748b' : '#94a3b8'} />
                    <Tooltip contentStyle={tooltipStyle} />
                    <Legend wrapperStyle={{ fontSize: '11px' }} />
                    <Bar dataKey="avgScore" fill="#22D3EE" name="Avg Score %" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="feedback" fill="#C8A45C" name="Feedback ★" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </motion.div>
          )}
        </div>
      )}
    </motion.div>
  )
}
