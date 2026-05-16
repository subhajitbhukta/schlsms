import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { GraduationCap, BookOpen, ClipboardList, Video, Upload, Calendar, BarChart3, PieChart as PieChartIcon, Target, Brain, FileText, Plus, X, Clock, CheckCircle2, Users, Zap, Award, Sparkles, Link, FileQuestion, Layers, TrendingUp, ArrowUpRight, Search, Monitor, PlayCircle, Library, Lightbulb, PenTool, UsersRound, Globe, Mic, FlaskConical, MapPin, Tag, Save, Send, Eye, ChevronRight, Activity, Star, MessageSquare, AlertTriangle, QrCode, ScanLine, UserCheck, UserX, Timer, Hash, CalendarCheck } from 'lucide-react'
import {
  BarChart, Bar, AreaChart, Area, RadarChart, Radar, PolarGrid,
  PolarAngleAxis, PolarRadiusAxis, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Legend, Cell, PieChart, Pie, LineChart, Line
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

const CHART_COLORS = ['#1A2D4A', '#22D3EE', '#C8A45C', '#8B5CF6', '#10B981', '#EF4444', '#F59E0B', '#EC4899']

const subjects = ['Mathematics', 'Science', 'English', 'Hindi', 'Social Science', 'Computer Science', 'Sanskrit', 'Art']
const classes = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII']
const sections = ['A', 'B', 'C', 'D']
const bloomsLevels = ['Remember', 'Understand', 'Apply', 'Analyze', 'Evaluate', 'Create']
const teachers = ['Dr. Priya Menon', 'Mr. Rajesh Kumar', 'Ms. Ananya Iyer', 'Mr. Vikram Singh', 'Ms. Deepa Nair', 'Dr. Suresh Babu']

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

// Monthly attendance trend data for Recharts
const monthlyAttendanceTrend = [
  { month: 'Apr', present: 92, absent: 5, late: 3 },
  { month: 'May', present: 88, absent: 7, late: 5 },
  { month: 'Jun', present: 90, absent: 6, late: 4 },
  { month: 'Jul', present: 85, absent: 9, late: 6 },
  { month: 'Aug', present: 91, absent: 5, late: 4 },
  { month: 'Sep', present: 87, absent: 8, late: 5 },
  { month: 'Oct', present: 93, absent: 4, late: 3 },
  { month: 'Nov', present: 89, absent: 6, late: 5 },
  { month: 'Dec', present: 86, absent: 8, late: 6 },
  { month: 'Jan', present: 94, absent: 3, late: 3 },
  { month: 'Feb', present: 91, absent: 5, late: 4 },
  { month: 'Mar', present: 88, absent: 7, late: 5 },
]

// Report mock data
const engagementData = [
  { week: 'Wk 1', live: 78, recorded: 65, quiz: 55, assignment: 70 },
  { week: 'Wk 2', live: 82, recorded: 70, quiz: 60, assignment: 72 },
  { week: 'Wk 3', live: 75, recorded: 68, quiz: 58, assignment: 68 },
  { week: 'Wk 4', live: 88, recorded: 74, quiz: 65, assignment: 78 },
  { week: 'Wk 5', live: 85, recorded: 72, quiz: 62, assignment: 75 },
  { week: 'Wk 6', live: 90, recorded: 78, quiz: 70, assignment: 80 },
  { week: 'Wk 7', live: 92, recorded: 80, quiz: 72, assignment: 82 },
  { week: 'Wk 8', live: 95, recorded: 82, quiz: 75, assignment: 85 },
]

const assignmentCompletionReport = [
  { class: 'VI-A', total: 45, completed: 40, pending: 5 },
  { class: 'VII-A', total: 42, completed: 35, pending: 7 },
  { class: 'VIII-A', total: 40, completed: 36, pending: 4 },
  { class: 'IX-A', total: 38, completed: 32, pending: 6 },
  { class: 'X-A', total: 44, completed: 40, pending: 4 },
  { class: 'X-B', total: 43, completed: 38, pending: 5 },
]

const quizPerformanceReport = [
  { quiz: 'Math Ch.5', avgScore: 72, passRate: 78 },
  { quiz: 'Science Ch.3', avgScore: 68, passRate: 72 },
  { quiz: 'English Ch.8', avgScore: 82, passRate: 88 },
  { quiz: 'Hindi Ch.2', avgScore: 65, passRate: 70 },
  { quiz: 'SST Ch.4', avgScore: 70, passRate: 75 },
  { quiz: 'Computer Ch.1', avgScore: 85, passRate: 90 },
]

const passRatePieData = [
  { name: 'Passed', value: 452, fill: '#10B981' },
  { name: 'Failed', value: 78, fill: '#EF4444' },
  { name: 'Absent', value: 30, fill: '#F59E0B' },
]

const bloomsDistData = [
  { level: 'Remember', count: 145, pct: 28 },
  { level: 'Understand', count: 128, pct: 25 },
  { level: 'Apply', count: 98, pct: 19 },
  { level: 'Analyze', count: 72, pct: 14 },
  { level: 'Evaluate', count: 45, pct: 9 },
  { level: 'Create', count: 28, pct: 5 },
]

const competencyData = [
  { subject: 'Mathematics', criticalThinking: 72, problemSolving: 68, communication: 60, creativity: 55, collaboration: 70 },
  { subject: 'Science', criticalThinking: 78, problemSolving: 75, communication: 65, creativity: 60, collaboration: 72 },
  { subject: 'English', criticalThinking: 65, problemSolving: 55, communication: 85, creativity: 70, collaboration: 68 },
  { subject: 'Hindi', criticalThinking: 60, problemSolving: 50, communication: 80, creativity: 65, collaboration: 62 },
  { subject: 'SST', criticalThinking: 70, problemSolving: 60, communication: 75, creativity: 58, collaboration: 75 },
]

const digitalLibraryData = [
  { resource: 'Math Video Ch.5', type: 'Video', access: 452 },
  { resource: 'Science PPT Ch.3', type: 'Presentation', access: 387 },
  { resource: 'English Notes Ch.8', type: 'Document', access: 345 },
  { resource: 'Hindi Audio Ch.2', type: 'Audio', access: 298 },
  { resource: 'SST Simulation', type: 'Simulation', access: 265 },
  { resource: 'Computer Lab Guide', type: 'Worksheet', access: 234 },
]

const lessonPlanCoverage = [
  { subject: 'Mathematics', planned: 48, completed: 42, pct: 87 },
  { subject: 'Science', planned: 45, completed: 38, pct: 84 },
  { subject: 'English', planned: 50, completed: 45, pct: 90 },
  { subject: 'Hindi', planned: 40, completed: 32, pct: 80 },
  { subject: 'SST', planned: 42, completed: 36, pct: 86 },
  { subject: 'Computer', planned: 35, completed: 33, pct: 94 },
]

const studentProgressData = [
  { name: 'Aarav Sharma', bspId: 'BSP2024001', penNo: 'PEN1905001', upparId: 'UPP2024001', math: 88, science: 82, english: 90, hindi: 76, sst: 85 },
  { name: 'Diya Patel', bspId: 'BSP2024002', penNo: 'PEN1905002', upparId: 'UPP2024002', math: 92, science: 88, english: 85, hindi: 80, sst: 82 },
  { name: 'Arjun Reddy', bspId: 'BSP2024003', penNo: 'PEN1905003', upparId: 'UPP2024003', math: 75, science: 70, english: 82, hindi: 68, sst: 78 },
  { name: 'Ananya Gupta', bspId: 'BSP2024004', penNo: 'PEN1905004', upparId: 'UPP2024004', math: 95, science: 90, english: 88, hindi: 85, sst: 90 },
  { name: 'Vivaan Joshi', bspId: 'BSP2024005', penNo: 'PEN1905005', upparId: 'UPP2024005', math: 68, science: 72, english: 75, hindi: 70, sst: 68 },
  { name: 'Ishita Nair', bspId: 'BSP2024006', penNo: 'PEN1905006', upparId: 'UPP2024006', math: 85, science: 80, english: 92, hindi: 78, sst: 86 },
]

const experientialData = [
  { title: 'Water Quality Survey', type: 'Field Study', status: 'Completed', students: 35 },
  { title: 'Science Lab - Photosynthesis', type: 'Lab Experiment', status: 'Completed', students: 40 },
  { title: 'Local Governance Visit', type: 'Industry Visit', status: 'In Progress', students: 38 },
  { title: 'Community Health Survey', type: 'Survey', status: 'Completed', students: 42 },
  { title: 'Heritage Project', type: 'Project', status: 'Pending', students: 30 },
  { title: 'Agricultural Field Study', type: 'Field Study', status: 'In Progress', students: 36 },
]

const experientialPieData = [
  { name: 'Completed', value: 3, fill: '#10B981' },
  { name: 'In Progress', value: 2, fill: '#22D3EE' },
  { name: 'Pending', value: 1, fill: '#F59E0B' },
]

export default function LMSDashboard() {
  const { darkMode } = useAppStore()
  const [activeTab, setActiveTab] = useState('overview')
  const [showForm, setShowForm] = useState(null)
  const [successAlert, setSuccessAlert] = useState(null)
  const [createdAssignments, setCreatedAssignments] = useState([])

  // Attendance states
  const [attendanceClass, setAttendanceClass] = useState('X')
  const [attendanceSection, setAttendanceSection] = useState('A')
  const [attendanceRecords, setAttendanceRecords] = useState({})
  const [selectedStudent, setSelectedStudent] = useState(null)

  // Form states
  const [assignmentForm, setAssignmentForm] = useState({
    title: '', subject: '', className: '', section: '', dueDate: '', description: '',
    maxMarks: '', assignmentType: 'Homework', bloomsLevel: 'Remember',
    competencyMapping: '', attachFiles: false
  })
  const [lessonPlanForm, setLessonPlanForm] = useState({
    subject: '', className: '', topic: '', duration: '',
    learningObjectives: '', bloomsAlignment: 'Remember',
    teachingMethod: 'Lecture', resourcesNeeded: '',
    assessmentMethod: '', homeworkAssignment: '', notes: ''
  })
  const [liveClassForm, setLiveClassForm] = useState({
    subject: '', className: '', teacher: '', date: '', startTime: '',
    duration: '', topic: '', meetingLink: '', recordingEnabled: false
  })
  const [resourceForm, setResourceForm] = useState({
    title: '', resourceType: 'Textbook', subject: '', className: '',
    description: '', author: '', publisher: '', accessLevel: 'All', tags: ''
  })
  const [competencyMapForm, setCompetencyMapForm] = useState({
    subject: '', className: '', competency: '', bloomsLevel: 'Remember',
    learningOutcome: '', assessmentCriteria: '', nepAlignment: false
  })
  const [experientialForm, setExperientialForm] = useState({
    title: '', subject: '', className: '', type: 'Field Study',
    objective: '', startDate: '', endDate: '', studentsCount: '', outcomeExpected: ''
  })
  const [bspIdForm, setBspIdForm] = useState({
    studentId: '', bspId: '', penNo: '', upparId: ''
  })

  const tooltipStyle = {
    backgroundColor: darkMode ? '#1A2D4A' : '#fff',
    border: '1px solid ' + (darkMode ? 'rgba(255,255,255,0.1)' : '#e2e8f0'),
    borderRadius: '12px', fontSize: '12px', color: darkMode ? '#e2e8f0' : '#1e293b'
  }

  // Success alert handler
  const showSuccessAlert = useCallback((message) => {
    setSuccessAlert(message)
    setTimeout(() => setSuccessAlert(null), 3500)
  }, [])

  const handleSubmit = (formType) => {
    if (formType === 'assignment') {
      const newAssignment = {
        id: Date.now(),
        ...assignmentForm,
        createdAt: new Date().toLocaleString(),
      }
      setCreatedAssignments(prev => [newAssignment, ...prev])
      setAssignmentForm({
        title: '', subject: '', className: '', section: '', dueDate: '', description: '',
        maxMarks: '', assignmentType: 'Homework', bloomsLevel: 'Remember',
        competencyMapping: '', attachFiles: false
      })
      showSuccessAlert('Assignment created successfully!')
    } else if (formType === 'lessonPlan') {
      setLessonPlanForm({
        subject: '', className: '', topic: '', duration: '',
        learningObjectives: '', bloomsAlignment: 'Remember',
        teachingMethod: 'Lecture', resourcesNeeded: '',
        assessmentMethod: '', homeworkAssignment: '', notes: ''
      })
      showSuccessAlert('Lesson plan created successfully!')
    } else if (formType === 'liveClass') {
      setLiveClassForm({
        subject: '', className: '', teacher: '', date: '', startTime: '',
        duration: '', topic: '', meetingLink: '', recordingEnabled: false
      })
      showSuccessAlert('Live class scheduled successfully!')
    } else if (formType === 'resource') {
      setResourceForm({
        title: '', resourceType: 'Textbook', subject: '', className: '',
        description: '', author: '', publisher: '', accessLevel: 'All', tags: ''
      })
      showSuccessAlert('Digital resource uploaded successfully!')
    } else if (formType === 'competencyMap') {
      setCompetencyMapForm({
        subject: '', className: '', competency: '', bloomsLevel: 'Remember',
        learningOutcome: '', assessmentCriteria: '', nepAlignment: false
      })
      showSuccessAlert('Competency mapping saved successfully!')
    } else if (formType === 'experiential') {
      setExperientialForm({
        title: '', subject: '', className: '', type: 'Field Study',
        objective: '', startDate: '', endDate: '', studentsCount: '', outcomeExpected: ''
      })
      showSuccessAlert('Experiential learning activity created successfully!')
    } else if (formType === 'bspId') {
      setBspIdForm({
        studentId: '', bspId: '', penNo: '', upparId: ''
      })
      showSuccessAlert('Student BSP ID updated successfully!')
    }
    setShowForm(null)
  }

  // Attendance functions
  const getClassStudents = useCallback(() => {
    return STUDENT_DB.filter(s => s.class === attendanceClass && s.section === attendanceSection)
  }, [attendanceClass, attendanceSection])

  const markAttendance = useCallback((studentId, status) => {
    setAttendanceRecords(prev => ({
      ...prev,
      [studentId]: {
        status,
        timestamp: new Date().toLocaleTimeString(),
        date: new Date().toLocaleDateString(),
      }
    }))
  }, [])

  const markAllPresent = useCallback(() => {
    const classStudents = getClassStudents()
    const newRecords = { ...attendanceRecords }
    const now = new Date().toLocaleTimeString()
    const today = new Date().toLocaleDateString()
    classStudents.forEach(s => {
      if (!newRecords[s.id]) {
        newRecords[s.id] = { status: 'Present', timestamp: now, date: today }
      }
    })
    setAttendanceRecords(newRecords)
    showSuccessAlert('All unmarked students marked as Present!')
  }, [attendanceRecords, getClassStudents, showSuccessAlert])

  const handleQRStudentSelect = useCallback((student) => {
    setSelectedStudent(student)
    if (student) {
      markAttendance(student.id, 'Present')
    }
  }, [markAttendance])

  const getAttendanceStats = useCallback(() => {
    const classStudents = getClassStudents()
    let present = 0, absent = 0, late = 0, unmarked = 0
    classStudents.forEach(s => {
      const rec = attendanceRecords[s.id]
      if (!rec) unmarked++
      else if (rec.status === 'Present') present++
      else if (rec.status === 'Absent') absent++
      else if (rec.status === 'Late') late++
    })
    return { present, absent, late, unmarked, total: classStudents.length }
  }, [attendanceRecords, getClassStudents])

  const tabs = [
    { id: 'overview', label: 'Overview', icon: GraduationCap },
    { id: 'classrooms', label: 'Virtual Classrooms', icon: Video },
    { id: 'attendance', label: 'Smart Attendance', icon: QrCode },
    { id: 'assignments', label: 'Assignments', icon: ClipboardList },
    { id: 'evaluation', label: 'Evaluation', icon: Award },
    { id: 'skills', label: "Skills & Bloom's", icon: Brain },
    { id: 'library', label: 'Digital Library', icon: Library },
    { id: 'planner', label: 'Lesson Planner', icon: BookOpen },
    { id: 'ai', label: 'AI Insights', icon: Sparkles },
    { id: 'forms', label: 'Forms', icon: PenTool },
    { id: 'reports', label: 'Reports', icon: BarChart3 },
  ]

  const formsList = [
    { id: 'assignment', label: 'Assignment Creation', icon: ClipboardList },

    { id: 'lessonPlan', label: 'Lesson Plan', icon: BookOpen },
    { id: 'liveClass', label: 'Live Class Schedule', icon: Video },
    { id: 'resource', label: 'Digital Resource Upload', icon: Upload },
    { id: 'competencyMap', label: 'Competency Mapping', icon: Target },
    { id: 'experiential', label: 'Experiential Learning', icon: FlaskConical },
    { id: 'bspId', label: 'Student BSP ID', icon: Users },
  ]

  const reportsList = [
    { id: 'engagement', label: 'Learning Engagement', icon: TrendingUp },
    { id: 'assignmentComp', label: 'Assignment Completion', icon: ClipboardList },
    { id: 'defaulters', label: 'Assignment Defaulters', icon: AlertTriangle },
    { id: 'bloomsDist', label: "Bloom's Distribution", icon: Brain },
    { id: 'competency', label: 'Competency Achievement', icon: Target },
    { id: 'libraryUsage', label: 'Digital Library Usage', icon: Library },
    { id: 'lessonCoverage', label: 'Lesson Plan Coverage', icon: BookOpen },
    { id: 'studentProgress', label: 'Student Progress', icon: Users },
    { id: 'experiential', label: 'Experiential Learning', icon: FlaskConical },
  ]

  const inputCls = "w-full px-3 py-2 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-birla-cyan/30"
  const labelCls = "block text-xs font-medium text-muted-foreground mb-1"

  const stats = getAttendanceStats()
  const classStudents = getClassStudents()

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="show" className="p-4 lg:p-6 space-y-6 max-w-[1600px] mx-auto">
      {/* Success Alert Toast */}
      <AnimatePresence>
        {successAlert && (
          <motion.div
            initial={{ opacity: 0, y: -30, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: -30, x: '-50%' }}
            className="fixed top-6 left-1/2 z-50 flex items-center gap-3 px-6 py-3 rounded-xl bg-emerald-500 text-white shadow-2xl shadow-emerald-500/25"
          >
            <CheckCircle2 className="w-5 h-5" />
            <span className="text-sm font-medium">{successAlert}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <motion.div variants={itemVariants} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <GraduationCap className="w-7 h-7 text-birla-cyan" />LMS Dashboard
          </h1>
          <p className="text-sm text-muted-foreground mt-1">Birla Open Minds International GraduationCap &bull; Learning Management System</p>
        </div>
      </motion.div>

      {/* Tab Navigation */}
      <motion.div variants={itemVariants} className="flex gap-1 p-1 rounded-xl bg-muted/50 border border-border overflow-x-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon
          return (
            <button key={tab.id} onClick={() => { setActiveTab(tab.id); setShowForm(null) }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${activeTab === tab.id ? 'gradient-birla text-white shadow-md' : 'text-muted-foreground hover:text-foreground'}`}>
              <Icon className="w-3.5 h-3.5" />{tab.label}
            </button>
          )
        })}
      </motion.div>

      {/* ==================== OVERVIEW TAB ==================== */}
      {activeTab === 'overview' && (
        <div className="space-y-4">
          <motion.div variants={itemVariants} className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: 'Active Courses', value: '48', change: '+5', icon: BookOpen, color: 'from-blue-900 to-blue-700' },
              { label: 'Assignments Due', value: '156', change: '+12', icon: ClipboardList, color: 'from-amber-800 to-amber-600' },
              { label: 'Defaulters', value: '8', change: 'Pending', icon: AlertTriangle, color: 'from-red-800 to-red-600' },
              { label: 'Avg Engagement', value: '82%', change: '+4.2%', icon: TrendingUp, color: 'from-emerald-800 to-emerald-600' },
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
              <h3 className="text-base font-semibold text-foreground flex items-center gap-2 mb-1">
                <TrendingUp className="w-4 h-4 text-birla-cyan" />Engagement Analytics
              </h3>
              <p className="text-xs text-muted-foreground mb-3">8-week engagement trend</p>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={engagementData}>
                    <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'} />
                    <XAxis dataKey="week" tick={{ fontSize: 10 }} stroke={darkMode ? '#64748b' : '#94a3b8'} />
                    <YAxis tick={{ fontSize: 10 }} stroke={darkMode ? '#64748b' : '#94a3b8'} />
                    <Tooltip contentStyle={tooltipStyle} />
                    <Legend iconType="circle" wrapperStyle={{ fontSize: '11px' }} />
                    <Area type="monotone" dataKey="live" stroke="#1A2D4A" fill="rgba(26,45,74,0.15)" strokeWidth={2} name="Live" />
                    <Area type="monotone" dataKey="recorded" stroke="#22D3EE" fill="rgba(34,211,238,0.1)" strokeWidth={2} name="Recorded" />

                    <Area type="monotone" dataKey="assignment" stroke="#8B5CF6" fill="rgba(139,92,246,0.1)" strokeWidth={2} name="Assignment" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-5">
              <h3 className="text-base font-semibold text-foreground flex items-center gap-2 mb-1">
                <Users className="w-4 h-4 text-birla-gold" />Recent Students (UDISE+)
              </h3>
              <p className="text-xs text-muted-foreground mb-3">Student records with BSP ID / PEN No / Uppar ID</p>
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {studentsList.map((s) => (
                  <div key={s.id} className="flex items-center gap-3 p-2.5 rounded-xl border border-border hover:bg-muted/30 transition-colors">
                    <div className="w-9 h-9 rounded-xl bg-birla-cyan/10 flex items-center justify-center text-birla-cyan font-bold text-xs">{s.name.charAt(0)}</div>
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

      {/* ==================== VIRTUAL CLASSROOMS TAB ==================== */}
      {activeTab === 'classrooms' && (
        <div className="space-y-4">
          <motion.div variants={itemVariants} className="grid grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { title: 'Mathematics - X A', teacher: 'Dr. Priya Menon', time: '9:00 AM', students: 42, status: 'Live', color: 'bg-emerald-500' },
              { title: 'Science - IX B', teacher: 'Mr. Rajesh Kumar', time: '10:30 AM', students: 38, status: 'Scheduled', color: 'bg-blue-500' },
              { title: 'English - VIII A', teacher: 'Ms. Ananya Iyer', time: '12:00 PM', students: 40, status: 'Scheduled', color: 'bg-blue-500' },
              { title: 'Hindi - VII A', teacher: 'Mr. Vikram Singh', time: '2:00 PM', students: 35, status: 'Completed', color: 'bg-gray-400' },
              { title: 'SST - X B', teacher: 'Ms. Deepa Nair', time: '3:30 PM', students: 44, status: 'Scheduled', color: 'bg-blue-500' },
              { title: 'Computer - IX A', teacher: 'Dr. Suresh Babu', time: '4:30 PM', students: 36, status: 'Scheduled', color: 'bg-blue-500' },
            ].map((cls, i) => (
              <div key={i} className="rounded-2xl border border-border bg-card p-4 hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-between mb-3">
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium text-white ${cls.color}`}>{cls.status}</span>
                  <Monitor className="w-4 h-4 text-muted-foreground" />
                </div>
                <h4 className="text-sm font-semibold text-foreground mb-1">{cls.title}</h4>
                <p className="text-xs text-muted-foreground mb-2">{cls.teacher}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground flex items-center gap-1"><Clock className="w-3 h-3" />{cls.time}</span>
                  <span className="text-xs text-muted-foreground flex items-center gap-1"><Users className="w-3 h-3" />{cls.students}</span>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      )}

      {/* ==================== SMART ATTENDANCE TAB ==================== */}
      {activeTab === 'attendance' && (
        <div className="space-y-4">
          {/* Attendance Overview Cards */}
          <motion.div variants={itemVariants} className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: 'Present', value: stats.present, icon: UserCheck, color: 'from-emerald-800 to-emerald-600', textColor: 'text-emerald-200' },
              { label: 'Absent', value: stats.absent, icon: UserX, color: 'from-red-800 to-red-600', textColor: 'text-red-200' },
              { label: 'Late', value: stats.late, icon: Timer, color: 'from-amber-800 to-amber-600', textColor: 'text-amber-200' },
              { label: 'Total Students', value: stats.total, icon: Users, color: 'from-blue-900 to-blue-700', textColor: 'text-blue-200' },
            ].map((card) => {
              const Icon = card.icon
              return (
                <div key={card.label} className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${card.color} p-4 text-white shadow-xl`}>
                  <div className="absolute top-0 right-0 w-20 h-20 rounded-full bg-white/5 -translate-y-6 translate-x-6" />
                  <div className="flex items-center justify-between mb-2">
                    <div className="w-9 h-9 rounded-xl bg-white/15 backdrop-blur-sm flex items-center justify-center">
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded-full bg-white/10 ${card.textColor}`}>
                      {stats.total > 0 ? Math.round((card.value / stats.total) * 100) : 0}%
                    </span>
                  </div>
                  <p className="text-xl font-bold">{card.value}</p>
                  <p className="text-[11px] text-white/70 mt-0.5">{card.label}</p>
                </div>
              )
            })}
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* QR Student Lookup */}
            <motion.div variants={itemVariants} className="lg:col-span-1 rounded-2xl border border-border bg-card p-5">
              <h3 className="text-base font-semibold text-foreground flex items-center gap-2 mb-3">
                <QrCode className="w-4 h-4 text-birla-cyan" />QR Attendance Scanner
              </h3>
              <p className="text-xs text-muted-foreground mb-4">Scan student ID card QR or enter Student ID to mark attendance</p>
              <QRStudentLookup
                onStudentSelect={handleQRStudentSelect}
                mode="student"
                placeholder="Scan QR or enter Student ID / Name"
                showDetails={true}
                label="Mark Attendance via QR / ID"
              />
              {selectedStudent && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="mt-3 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20"
                >
                  <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
                    <CheckCircle2 className="w-4 h-4" />
                    <span className="text-xs font-medium">Attendance marked as Present</span>
                  </div>
                  <p className="text-[10px] text-muted-foreground mt-1">
                    {selectedStudent.name} &bull; {new Date().toLocaleTimeString()} &bull; {new Date().toLocaleDateString()}
                  </p>
                </motion.div>
              )}
            </motion.div>

            {/* Class-wise Attendance Selection + Bulk View */}
            <motion.div variants={itemVariants} className="lg:col-span-2 rounded-2xl border border-border bg-card p-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                <h3 className="text-base font-semibold text-foreground flex items-center gap-2">
                  <CalendarCheck className="w-4 h-4 text-birla-gold" />Class-wise Attendance
                </h3>
                <div className="flex gap-2">
                  <select value={attendanceClass} onChange={(e) => setAttendanceClass(e.target.value)} className="px-3 py-1.5 rounded-lg border border-border bg-background text-sm text-foreground">
                    {classes.map(c => <option key={c} value={c}>Class {c}</option>)}
                  </select>
                  <select value={attendanceSection} onChange={(e) => setAttendanceSection(e.target.value)} className="px-3 py-1.5 rounded-lg border border-border bg-background text-sm text-foreground">
                    {sections.map(s => <option key={s} value={s}>Section {s}</option>)}
                  </select>
                  <button onClick={markAllPresent} className="px-3 py-1.5 rounded-lg text-xs font-medium gradient-birla text-white whitespace-nowrap hover:opacity-90 transition-opacity">
                    Mark All Present
                  </button>
                </div>
              </div>

              {/* Bulk Attendance Student List */}
              <div className="space-y-1.5 max-h-72 overflow-y-auto pr-1">
                {classStudents.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground text-sm">No students found for Class {attendanceClass}-{attendanceSection}</div>
                ) : (
                  classStudents.map((s) => {
                    const rec = attendanceRecords[s.id]
                    return (
                      <div key={s.id} className="flex items-center gap-3 p-2.5 rounded-xl border border-border hover:bg-muted/30 transition-colors">
                        <div className="w-8 h-8 rounded-lg bg-birla-cyan/10 flex items-center justify-center text-birla-cyan font-bold text-[10px]">{s.name.charAt(0)}</div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-medium text-foreground truncate">{s.name}</p>
                          <div className="flex gap-1.5 mt-0.5">
                            <span className="text-[9px] px-1.5 py-0.5 rounded bg-blue-500/10 text-blue-600 dark:text-blue-400">BSP: {s.bspId}</span>
                            <span className="text-[9px] px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">PEN: {s.penNo}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-1.5">
                          {['Present', 'Absent', 'Late'].map((status) => (
                            <button key={status} onClick={() => markAttendance(s.id, status)}
                              className={`px-2 py-1 rounded-lg text-[10px] font-medium transition-all ${
                                rec?.status === status
                                  ? status === 'Present' ? 'bg-emerald-500 text-white'
                                    : status === 'Absent' ? 'bg-red-500 text-white'
                                    : 'bg-amber-500 text-white'
                                  : 'bg-muted/50 text-muted-foreground hover:bg-muted'
                              }`}>
                              {status}
                            </button>
                          ))}
                        </div>
                        {rec && (
                          <div className="text-right min-w-[60px]">
                            <p className="text-[9px] text-muted-foreground">{rec.timestamp}</p>
                          </div>
                        )}
                      </div>
                    )
                  })
                )}
              </div>

              {/* Real-time counter */}
              {classStudents.length > 0 && (
                <div className="mt-3 flex items-center gap-4 p-3 rounded-xl bg-muted/30 border border-border">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                    <span className="text-xs text-foreground">Present: <strong>{stats.present}</strong></span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
                    <span className="text-xs text-foreground">Absent: <strong>{stats.absent}</strong></span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                    <span className="text-xs text-foreground">Late: <strong>{stats.late}</strong></span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-gray-400" />
                    <span className="text-xs text-foreground">Unmarked: <strong>{stats.unmarked}</strong></span>
                  </div>
                </div>
              )}
            </motion.div>
          </div>

          {/* Monthly Attendance Trend Chart */}
          <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-5">
            <h3 className="text-base font-semibold text-foreground flex items-center gap-2 mb-1">
              <TrendingUp className="w-4 h-4 text-birla-cyan" />Monthly Attendance Trend
            </h3>
            <p className="text-xs text-muted-foreground mb-3">Attendance percentage by month</p>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyAttendanceTrend}>
                  <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'} />
                  <XAxis dataKey="month" tick={{ fontSize: 10 }} stroke={darkMode ? '#64748b' : '#94a3b8'} />
                  <YAxis tick={{ fontSize: 10 }} stroke={darkMode ? '#64748b' : '#94a3b8'} />
                  <Tooltip contentStyle={tooltipStyle} />
                  <Legend iconType="circle" wrapperStyle={{ fontSize: '11px' }} />
                  <Bar dataKey="present" stackId="a" fill="#10B981" radius={[0, 0, 0, 0]} name="Present %" />
                  <Bar dataKey="absent" stackId="a" fill="#EF4444" name="Absent %" />
                  <Bar dataKey="late" stackId="a" fill="#F59E0B" radius={[4, 4, 0, 0]} name="Late %" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </div>
      )}

      {/* ==================== ASSIGNMENTS TAB ==================== */}
      {activeTab === 'assignments' && (
        <div className="space-y-4">
          {createdAssignments.length > 0 && (
            <motion.div variants={itemVariants} className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-4">
              <h3 className="text-sm font-semibold text-foreground flex items-center gap-2 mb-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />Recently Created Assignments ({createdAssignments.length})
              </h3>
              <div className="space-y-1.5 max-h-32 overflow-y-auto">
                {createdAssignments.slice(0, 5).map((a) => (
                  <div key={a.id} className="flex items-center gap-3 p-2 rounded-lg bg-background border border-border">
                    <ClipboardList className="w-3.5 h-3.5 text-birla-cyan shrink-0" />
                    <span className="text-xs text-foreground font-medium">{a.title || 'Untitled'}</span>
                    <span className="text-[10px] text-muted-foreground">{a.subject} &bull; Class {a.className}</span>
                    <span className="text-[10px] text-emerald-500 ml-auto">{a.createdAt}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
          <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { title: 'Quadratic Equations Worksheet', subject: 'Mathematics', class: 'X-A', due: '2025-01-20', submissions: 32, total: 44, blooms: 'Apply' },
              { title: 'Chemical Reactions Report', subject: 'Science', class: 'IX-B', due: '2025-01-18', submissions: 28, total: 38, blooms: 'Analyze' },
              { title: 'Shakespeare Essay', subject: 'English', class: 'X-A', due: '2025-01-22', submissions: 40, total: 44, blooms: 'Evaluate' },
              { title: 'Hindi Kavita Analysis', subject: 'Hindi', class: 'IX-A', due: '2025-01-19', submissions: 25, total: 40, blooms: 'Understand' },
              { title: 'Indian Map Project', subject: 'SST', class: 'VIII-A', due: '2025-01-25', submissions: 30, total: 42, blooms: 'Create' },
              { title: 'Python Programming Lab', subject: 'Computer', class: 'XI-A', due: '2025-01-21', submissions: 22, total: 36, blooms: 'Apply' },
            ].map((a, i) => (
              <div key={i} className="rounded-2xl border border-border bg-card p-4 hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-between mb-2">
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-birla-cyan/10 text-birla-cyan">{a.blooms}</span>
                  <ClipboardList className="w-4 h-4 text-muted-foreground" />
                </div>
                <h4 className="text-sm font-semibold text-foreground mb-1">{a.title}</h4>
                <p className="text-xs text-muted-foreground mb-2">{a.subject} &bull; Class {a.class}</p>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-muted-foreground">Due: {a.due}</span>
                  <span className="text-xs font-medium text-birla-gold">{a.submissions}/{a.total}</span>
                </div>
                <div className="w-full bg-muted rounded-full h-1.5">
                  <div className="bg-birla-cyan h-1.5 rounded-full" style={{ width: `${(a.submissions / a.total) * 100}%` }} />
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      )}

      {/* ==================== EVALUATION TAB (Simplified Daily Task) ==================== */}
      {activeTab === 'evaluation' && (
        <div className="space-y-4">
          {/* Quick Evaluation Interface */}
          <motion.div variants={itemVariants} className="rounded-2xl border-2 border-birla-gold/30 bg-card p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-semibold text-foreground flex items-center gap-2"><Award className="w-5 h-5 text-birla-gold" />Quick Assignment Evaluation</h3>
              <span className="px-2.5 py-1 rounded-lg bg-birla-gold/10 text-birla-gold text-[10px] font-bold">DAILY TASK</span>
            </div>
            <p className="text-xs text-muted-foreground mb-4">Select an assignment and quickly evaluate all submissions. Color coding: Green = Graded, Yellow = Submitted (pending), Red = Not Submitted (Defaulter)</p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
              <div><label className="block text-xs font-medium text-muted-foreground mb-1">Select Assignment</label>
                <select className="w-full px-3 py-2 rounded-xl border border-border bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-birla-gold/40">
                  <option>Quadratic Equations Worksheet - Class X-A</option>
                  <option>Statistics Project - Class IX-A</option>
                  <option>Trigonometry Practice - Class X-B</option>
                  <option>Probability Assignment - Class IX-B</option>
                  <option>Algebra Revision - Class X-A</option>
                </select>
              </div>
              <div><label className="block text-xs font-medium text-muted-foreground mb-1">Max Marks</label>
                <input type="number" defaultValue="30" className="w-full px-3 py-2 rounded-xl border border-border bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-birla-gold/40" />
              </div>
              <div className="flex items-end">
                <button className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl gradient-birla text-white text-sm font-medium">
                  <CheckCircle2 className="w-4 h-4" />Load Submissions
                </button>
              </div>
            </div>

            {/* Evaluation Grid */}
            <div className="overflow-x-auto border border-border rounded-xl">
              <table className="w-full text-xs">
                <thead><tr className="border-b-2 border-birla-gold/20 bg-birla-gold/5">
                  <th className="text-left px-3 py-2.5 text-[10px] font-bold text-muted-foreground">Student</th>
                  <th className="text-left px-3 py-2.5 text-[10px] font-bold text-muted-foreground">BSP ID</th>
                  <th className="text-center px-3 py-2.5 text-[10px] font-bold text-muted-foreground">Submitted</th>
                  <th className="text-center px-3 py-2.5 text-[10px] font-bold text-muted-foreground">Date</th>
                  <th className="text-center px-3 py-2.5 text-[10px] font-bold text-muted-foreground">Marks (out of 30)</th>
                  <th className="text-center px-3 py-2.5 text-[10px] font-bold text-muted-foreground">Grade</th>
                  <th className="text-left px-3 py-2.5 text-[10px] font-bold text-muted-foreground">Remarks</th>
                </tr></thead>
                <tbody>
                  {[
                    { name: 'Aarav Sharma', bspId: 'BSP2024001', submitted: true, date: 'Jan 19', marks: 26, late: false },
                    { name: 'Diya Patel', bspId: 'BSP2024002', submitted: true, date: 'Jan 18', marks: 28, late: false },
                    { name: 'Arjun Reddy', bspId: 'BSP2024003', submitted: true, date: 'Jan 20', marks: 18, late: true },
                    { name: 'Ananya Gupta', bspId: 'BSP2024004', submitted: true, date: 'Jan 18', marks: 27, late: false },
                    { name: 'Vivaan Joshi', bspId: 'BSP2024005', submitted: false, date: null, marks: null, late: false },
                    { name: 'Ishita Nair', bspId: 'BSP2024006', submitted: true, date: 'Jan 19', marks: 24, late: false },
                    { name: 'Kabir Malhotra', bspId: 'BSP2024007', submitted: false, date: null, marks: null, late: false },
                    { name: 'Saanvi Rao', bspId: 'BSP2024008', submitted: true, date: 'Jan 20', marks: 20, late: true },
                  ].map((s, i) => {
                    const grade = s.marks !== null ? (s.marks >= 27 ? 'A1' : s.marks >= 24 ? 'A2' : s.marks >= 21 ? 'B1' : s.marks >= 18 ? 'B2' : s.marks >= 15 ? 'C1' : s.marks >= 12 ? 'C2' : s.marks >= 10 ? 'D' : 'E') : ''
                    return (
                      <tr key={i} className={`border-b border-border/50 ${s.submitted ? (s.marks !== null ? 'bg-emerald-500/5' : 'bg-amber-500/5') : 'bg-red-500/5'}`}>
                        <td className="px-3 py-2 font-medium text-foreground">{s.name}</td>
                        <td className="px-3 py-2 text-birla-cyan font-mono text-[10px]">{s.bspId}</td>
                        <td className="px-3 py-2 text-center">
                          {s.submitted ? (
                            <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${s.late ? 'bg-amber-500/10 text-amber-600' : 'bg-emerald-500/10 text-emerald-600'}`}>
                              {s.late ? 'Late' : 'Yes'}
                            </span>
                          ) : (
                            <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-red-500/10 text-red-600">No</span>
                          )}
                        </td>
                        <td className="px-3 py-2 text-center text-muted-foreground">{s.date || '-'}</td>
                        <td className="px-2 py-1.5 text-center">
                          {s.submitted ? (
                            <input type="number" defaultValue={s.marks} min="0" max="30" className="w-16 px-2 py-1 rounded-lg border border-border bg-background text-center text-sm focus:outline-none focus:ring-1 focus:ring-birla-gold/40 mx-auto" />
                          ) : (
                            <span className="text-red-500 font-bold">-</span>
                          )}
                        </td>
                        <td className="px-3 py-2 text-center">
                          {grade && <span className="inline-flex items-center justify-center w-7 h-5 rounded text-[10px] font-bold text-white" style={{ background: s.marks >= 24 ? '#10B981' : s.marks >= 18 ? '#22D3EE' : s.marks >= 12 ? '#F59E0B' : '#EF4444' }}>{grade}</span>}
                        </td>
                        <td className="px-2 py-1.5">
                          {s.submitted ? (
                            <input type="text" placeholder="Remarks" className="w-full px-2 py-1 rounded-lg border border-border bg-background text-xs focus:outline-none focus:ring-1 focus:ring-birla-gold/40" />
                          ) : (
                            <button className="px-2 py-1 rounded-lg text-[9px] font-medium bg-red-500/10 text-red-600 hover:bg-red-500/20">Mark Defaulter</button>
                          )}
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>

            <div className="flex items-center justify-between mt-4">
              <div className="flex items-center gap-4 text-xs">
                <span className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />Graded</span>
                <span className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-amber-500" />Submitted (Pending)</span>
                <span className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-red-500" />Not Submitted (Defaulter)</span>
              </div>
              <div className="flex gap-2">
                <button className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-border text-xs font-medium hover:bg-muted"><Download className="w-3.5 h-3.5" />Export CSV</button>
                <button onClick={() => showSuccessAlert('All evaluations saved!')} className="flex items-center gap-1.5 px-4 py-2 rounded-lg gradient-birla text-white text-xs font-medium"><Save className="w-3.5 h-3.5" />Save All Evaluations</button>
              </div>
            </div>
          </motion.div>

          {/* Assignment Defaulters Panel */}
          <motion.div variants={itemVariants} className="rounded-2xl border-2 border-red-500/30 bg-red-500/5 p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-foreground flex items-center gap-2"><AlertTriangle className="w-4 h-4 text-red-500" />Assignment Defaulters</h3>
              <span className="px-2.5 py-1 rounded-lg bg-red-500/10 text-red-600 text-[10px] font-bold">2 DEFAULTERS</span>
            </div>
            <div className="space-y-2">
              {[
                { name: 'Vivaan Joshi', bspId: 'BSP2024005', penNo: 'PEN1905005', upparId: 'UPP2024005', class: 'IX-A', assignment: 'Quadratic Equations', dueDate: '2025-01-18', daysOverdue: 5 },
                { name: 'Kabir Malhotra', bspId: 'BSP2024007', penNo: 'PEN1905007', upparId: 'UPP2024007', class: 'IX-B', assignment: 'Quadratic Equations', dueDate: '2025-01-18', daysOverdue: 5 },
              ].map((d, i) => (
                <div key={i} className="flex items-center gap-3 p-3 rounded-xl border border-red-500/20 bg-card hover:bg-muted/20 transition-colors">
                  <div className="w-9 h-9 rounded-xl bg-red-500/10 flex items-center justify-center text-red-500 font-bold text-xs">{d.name.charAt(0)}</div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground">{d.name}</p>
                    <div className="flex gap-2 mt-0.5">
                      <span className="text-[9px] px-1.5 py-0.5 rounded bg-blue-500/10 text-blue-600">BSP: {d.bspId}</span>
                      <span className="text-[9px] px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-600">PEN: {d.penNo}</span>
                      <span className="text-[9px] px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-600">Class {d.class}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-medium text-foreground">{d.assignment}</p>
                    <p className="text-[10px] text-red-500 font-bold">{d.daysOverdue} days overdue</p>
                  </div>
                  <button className="px-3 py-1.5 rounded-lg text-[10px] font-medium bg-birla-cyan/10 text-birla-cyan hover:bg-birla-cyan/20">
                    <Send className="w-3 h-3 inline mr-1" />Send Reminder
                  </button>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      )}

      {/* ==================== SKILLS & BLOOM'S TAB ==================== */}
      {activeTab === 'skills' && (
        <div className="space-y-4">
          <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="rounded-2xl border border-border bg-card p-5">
              <h3 className="text-base font-semibold text-foreground flex items-center gap-2 mb-3">
                <Brain className="w-4 h-4 text-purple-500" />Bloom&apos;s Taxonomy Distribution
              </h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={bloomsDistData} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'} />
                    <XAxis type="number" tick={{ fontSize: 10 }} stroke={darkMode ? '#64748b' : '#94a3b8'} />
                    <YAxis dataKey="level" type="category" tick={{ fontSize: 10 }} stroke={darkMode ? '#64748b' : '#94a3b8'} width={80} />
                    <Tooltip contentStyle={tooltipStyle} />
                    <Bar dataKey="count" radius={[0, 4, 4, 0]} name="Questions">
                      {bloomsDistData.map((_, i) => (<Cell key={i} fill={CHART_COLORS[i]} />))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div className="rounded-2xl border border-border bg-card p-5">
              <h3 className="text-base font-semibold text-foreground flex items-center gap-2 mb-3">
                <Target className="w-4 h-4 text-birla-gold" />Competency Radar
              </h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={competencyData.slice(0, 1).flatMap(d => [
                    { skill: 'Critical Thinking', value: d.criticalThinking },
                    { skill: 'Problem Solving', value: d.problemSolving },
                    { skill: 'Communication', value: d.communication },
                    { skill: 'Creativity', value: d.creativity },
                    { skill: 'Collaboration', value: d.collaboration },
                  ])}>
                    <PolarGrid stroke={darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'} />
                    <PolarAngleAxis dataKey="skill" tick={{ fontSize: 10 }} stroke={darkMode ? '#94a3b8' : '#64748b'} />
                    <PolarRadiusAxis tick={{ fontSize: 9 }} />
                    <Radar name="Mathematics" dataKey="value" stroke="#22D3EE" fill="#22D3EE" fillOpacity={0.2} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* ==================== DIGITAL LIBRARY TAB ==================== */}
      {activeTab === 'library' && (
        <div className="space-y-4">
          <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { title: 'NCERT Mathematics X', type: 'Textbook', subject: 'Mathematics', access: 'All', views: 520 },
              { title: 'Science Lab Video Series', type: 'Video', subject: 'Science', access: 'Class', views: 387 },
              { title: 'English Grammar Reference', type: 'Reference', subject: 'English', access: 'All', views: 345 },
              { title: 'Hindi Audio Stories', type: 'Audio', subject: 'Hindi', access: 'Class', views: 298 },
              { title: 'Solar System Simulation', type: 'Simulation', subject: 'Science', access: 'All', views: 265 },
              { title: 'Math Worksheet Set A', type: 'Worksheet', subject: 'Mathematics', access: 'Teacher', views: 234 },
            ].map((r, i) => (
              <div key={i} className="rounded-2xl border border-border bg-card p-4 hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-between mb-2">
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-birla-gold/10 text-birla-gold">{r.type}</span>
                  <Globe className="w-4 h-4 text-muted-foreground" />
                </div>
                <h4 className="text-sm font-semibold text-foreground mb-1">{r.title}</h4>
                <p className="text-xs text-muted-foreground mb-2">{r.subject} &bull; Access: {r.access}</p>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Eye className="w-3 h-3" />{r.views} views
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      )}

      {/* ==================== LESSON PLANNER TAB ==================== */}
      {activeTab === 'planner' && (
        <div className="space-y-4">
          <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { subject: 'Mathematics', topic: 'Quadratic Equations', class: 'X-A', method: 'Activity', blooms: 'Apply', status: 'Completed' },
              { subject: 'Science', topic: 'Chemical Reactions', class: 'IX-B', method: 'Experiment', blooms: 'Analyze', status: 'In Progress' },
              { subject: 'English', topic: 'The Merchant of Venice', class: 'X-A', method: 'Discussion', blooms: 'Evaluate', status: 'Completed' },
              { subject: 'Hindi', topic: 'Kavya Khand', class: 'IX-A', method: 'Lecture', blooms: 'Understand', status: 'Pending' },
              { subject: 'SST', topic: 'Indian Constitution', class: 'VIII-A', method: 'Group Work', blooms: 'Create', status: 'In Progress' },
              { subject: 'Computer', topic: 'Data Structures', class: 'XI-A', method: 'Flipped', blooms: 'Apply', status: 'Scheduled' },
            ].map((lp, i) => (
              <div key={i} className="rounded-2xl border border-border bg-card p-4 hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-between mb-2">
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${lp.status === 'Completed' ? 'bg-emerald-500/10 text-emerald-500' : lp.status === 'In Progress' ? 'bg-blue-500/10 text-blue-500' : 'bg-amber-500/10 text-amber-500'}`}>{lp.status}</span>
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

      {/* ==================== AI INSIGHTS TAB ==================== */}
      {activeTab === 'ai' && (
        <div className="space-y-4">
          <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {[
              { title: 'At-Risk Students Detected', desc: '12 students showing declining engagement patterns across Mathematics and Science. Recommended: remedial sessions and peer tutoring.', icon: AlertTriangle, color: 'text-red-500', bg: 'bg-red-500/10' },
              { title: 'Bloom\'s Level Gap', desc: 'Only 5% of questions target "Create" level. Recommend increasing higher-order thinking activities by 15%.', icon: Brain, color: 'text-purple-500', bg: 'bg-purple-500/10' },
              { title: 'Content Recommendation', desc: 'Students in Class IX prefer video content over text. Suggest adding more visual learning resources for Science.', icon: Lightbulb, color: 'text-amber-500', bg: 'bg-amber-500/10' },
              { title: 'Competency Mapping Alert', desc: 'NEP 2020 competency alignment missing for 3 subjects. Competency-based assessments need updating.', icon: Target, color: 'text-birla-cyan', bg: 'bg-birla-cyan/10' },
            ].map((insight, i) => {
              const Icon = insight.icon
              return (
                <div key={i} className="rounded-2xl border border-border bg-card p-5 hover:shadow-lg transition-shadow">
                  <div className="flex items-start gap-3">
                    <div className={`w-10 h-10 rounded-xl ${insight.bg} flex items-center justify-center shrink-0`}>
                      <Icon className={`w-5 h-5 ${insight.color}`} />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-foreground mb-1">{insight.title}</h4>
                      <p className="text-xs text-muted-foreground leading-relaxed">{insight.desc}</p>
                    </div>
                  </div>
                </div>
              )
            })}
          </motion.div>
        </div>
      )}

      {/* ==================== FORMS TAB ==================== */}
      {activeTab === 'forms' && (
        <div className="space-y-4">
          <motion.div variants={itemVariants} className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
            {formsList.map((form) => {
              const Icon = form.icon
              return (
                <button key={form.id} onClick={() => setShowForm(form.id)}
                  className={`flex flex-col items-center gap-2 p-4 rounded-2xl border border-border hover:border-birla-gold/30 hover:shadow-lg transition-all group ${showForm === form.id ? 'border-birla-gold/50 shadow-lg bg-birla-gold/5' : ''}`}>
                  <div className="w-10 h-10 rounded-xl bg-birla-blue/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Icon className="w-5 h-5 text-birla-blue dark:text-birla-cyan" />
                  </div>
                  <span className="text-[10px] text-muted-foreground group-hover:text-foreground text-center">{form.label}</span>
                </button>
              )
            })}
          </motion.div>

          {/* Assignment Creation Form */}
          {showForm === 'assignment' && (
            <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-semibold text-foreground flex items-center gap-2">
                  <ClipboardList className="w-5 h-5 text-birla-cyan" />Assignment Creation Form
                </h3>
                <button onClick={() => setShowForm(null)} className="w-8 h-8 rounded-lg border border-border flex items-center justify-center hover:bg-muted/50"><X className="w-4 h-4" /></button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div><label className={labelCls}>Title *</label><input type="text" value={assignmentForm.title} onChange={(e) => setAssignmentForm({...assignmentForm, title: e.target.value})} className={inputCls} placeholder="Enter assignment title" /></div>
                <div><label className={labelCls}>Subject *</label><select value={assignmentForm.subject} onChange={(e) => setAssignmentForm({...assignmentForm, subject: e.target.value})} className={inputCls}><option value="">Select Subject</option>{subjects.map(s => <option key={s} value={s}>{s}</option>)}</select></div>
                <div><label className={labelCls}>Class *</label><select value={assignmentForm.className} onChange={(e) => setAssignmentForm({...assignmentForm, className: e.target.value})} className={inputCls}><option value="">Select Class</option>{classes.map(c => <option key={c} value={c}>{c}</option>)}</select></div>
                <div><label className={labelCls}>Section</label><select value={assignmentForm.section} onChange={(e) => setAssignmentForm({...assignmentForm, section: e.target.value})} className={inputCls}><option value="">Select Section</option>{sections.map(s => <option key={s} value={s}>{s}</option>)}</select></div>
                <div><label className={labelCls}>Due Date *</label><input type="date" value={assignmentForm.dueDate} onChange={(e) => setAssignmentForm({...assignmentForm, dueDate: e.target.value})} className={inputCls} /></div>
                <div><label className={labelCls}>Max Marks *</label><input type="number" value={assignmentForm.maxMarks} onChange={(e) => setAssignmentForm({...assignmentForm, maxMarks: e.target.value})} className={inputCls} placeholder="100" /></div>
                <div><label className={labelCls}>Assignment Type *</label><select value={assignmentForm.assignmentType} onChange={(e) => setAssignmentForm({...assignmentForm, assignmentType: e.target.value})} className={inputCls}><option value="Homework">Homework</option><option value="Project">Project</option><option value="Worksheet">Worksheet</option><option value="Research">Research</option><option value="Practice">Practice</option></select></div>
                <div><label className={labelCls}>Bloom&apos;s Level *</label><select value={assignmentForm.bloomsLevel} onChange={(e) => setAssignmentForm({...assignmentForm, bloomsLevel: e.target.value})} className={inputCls}>{bloomsLevels.map(l => <option key={l} value={l}>{l}</option>)}</select></div>
                <div><label className={labelCls}>Competency Mapping</label><input type="text" value={assignmentForm.competencyMapping} onChange={(e) => setAssignmentForm({...assignmentForm, competencyMapping: e.target.value})} className={inputCls} placeholder="e.g., Problem Solving, Critical Thinking" /></div>
                <div className="flex items-center gap-2 pt-5">
                  <input type="checkbox" checked={assignmentForm.attachFiles} onChange={(e) => setAssignmentForm({...assignmentForm, attachFiles: e.target.checked})} className="w-4 h-4 rounded border-border" />
                  <label className="text-xs text-muted-foreground">Attach Files</label>
                </div>
              </div>
              <div className="mt-4"><label className={labelCls}>Description</label><textarea value={assignmentForm.description} onChange={(e) => setAssignmentForm({...assignmentForm, description: e.target.value})} className={inputCls + ' min-h-[80px]'} placeholder="Enter assignment description..." /></div>
              <div className="flex justify-end mt-4">
                <button onClick={() => handleSubmit('assignment')} className="px-6 py-2 rounded-xl text-sm font-medium gradient-birla text-white hover:opacity-90 transition-opacity flex items-center gap-2">
                  <Send className="w-4 h-4" />Create Assignment
                </button>
              </div>
            </motion.div>
          )}

          {/* Quiz Creation Form */}
          {showForm === 'quiz' && (
            <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-semibold text-foreground flex items-center gap-2">
                  <FileQuestion className="w-5 h-5 text-birla-cyan" />Quiz Creation Form
                </h3>
                <button onClick={() => setShowForm(null)} className="w-8 h-8 rounded-lg border border-border flex items-center justify-center hover:bg-muted/50"><X className="w-4 h-4" /></button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div><label className={labelCls}>Quiz Title *</label><input type="text" value={quizForm.title} onChange={(e) => setQuizForm({...quizForm, title: e.target.value})} className={inputCls} placeholder="Enter quiz title" /></div>
                <div><label className={labelCls}>Subject *</label><select value={quizForm.subject} onChange={(e) => setQuizForm({...quizForm, subject: e.target.value})} className={inputCls}><option value="">Select Subject</option>{subjects.map(s => <option key={s} value={s}>{s}</option>)}</select></div>
                <div><label className={labelCls}>Class *</label><select value={quizForm.className} onChange={(e) => setQuizForm({...quizForm, className: e.target.value})} className={inputCls}><option value="">Select Class</option>{classes.map(c => <option key={c} value={c}>{c}</option>)}</select></div>
                <div><label className={labelCls}>Duration (mins) *</label><input type="number" value={quizForm.duration} onChange={(e) => setQuizForm({...quizForm, duration: e.target.value})} className={inputCls} placeholder="30" /></div>
                <div><label className={labelCls}>Total Questions *</label><input type="number" value={quizForm.totalQuestions} onChange={(e) => setQuizForm({...quizForm, totalQuestions: e.target.value})} className={inputCls} placeholder="20" /></div>
                <div><label className={labelCls}>Marks Per Question *</label><input type="number" value={quizForm.marksPerQuestion} onChange={(e) => setQuizForm({...quizForm, marksPerQuestion: e.target.value})} className={inputCls} placeholder="5" /></div>
                <div><label className={labelCls}>Quiz Type *</label><select value={quizForm.quizType} onChange={(e) => setQuizForm({...quizForm, quizType: e.target.value})} className={inputCls}><option value="MCQ">MCQ</option><option value="True/False">True/False</option><option value="Short Answer">Short Answer</option><option value="Mixed">Mixed</option></select></div>
                <div><label className={labelCls}>Difficulty Level *</label><select value={quizForm.difficultyLevel} onChange={(e) => setQuizForm({...quizForm, difficultyLevel: e.target.value})} className={inputCls}><option value="Easy">Easy</option><option value="Medium">Medium</option><option value="Hard">Hard</option></select></div>
                <div><label className={labelCls}>Bloom&apos;s Level *</label><select value={quizForm.bloomsLevel} onChange={(e) => setQuizForm({...quizForm, bloomsLevel: e.target.value})} className={inputCls}>{bloomsLevels.map(l => <option key={l} value={l}>{l}</option>)}</select></div>
                <div><label className={labelCls}>Passing Percentage *</label><input type="number" value={quizForm.passingPercentage} onChange={(e) => setQuizForm({...quizForm, passingPercentage: e.target.value})} className={inputCls} placeholder="40" /></div>
                <div><label className={labelCls}>Schedule Date</label><input type="date" value={quizForm.scheduleDate} onChange={(e) => setQuizForm({...quizForm, scheduleDate: e.target.value})} className={inputCls} /></div>
                <div><label className={labelCls}>Schedule Time</label><input type="time" value={quizForm.scheduleTime} onChange={(e) => setQuizForm({...quizForm, scheduleTime: e.target.value})} className={inputCls} /></div>
              </div>
              <div className="flex justify-end mt-4">
                <button onClick={() => handleSubmit('quiz')} className="px-6 py-2 rounded-xl text-sm font-medium gradient-birla text-white hover:opacity-90 transition-opacity flex items-center gap-2">
                  <Send className="w-4 h-4" />Create Quiz
                </button>
              </div>
            </motion.div>
          )}

          {/* Lesson Plan Form */}
          {showForm === 'lessonPlan' && (
            <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-semibold text-foreground flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-birla-cyan" />Lesson Plan Form
                </h3>
                <button onClick={() => setShowForm(null)} className="w-8 h-8 rounded-lg border border-border flex items-center justify-center hover:bg-muted/50"><X className="w-4 h-4" /></button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div><label className={labelCls}>Subject *</label><select value={lessonPlanForm.subject} onChange={(e) => setLessonPlanForm({...lessonPlanForm, subject: e.target.value})} className={inputCls}><option value="">Select Subject</option>{subjects.map(s => <option key={s} value={s}>{s}</option>)}</select></div>
                <div><label className={labelCls}>Class *</label><select value={lessonPlanForm.className} onChange={(e) => setLessonPlanForm({...lessonPlanForm, className: e.target.value})} className={inputCls}><option value="">Select Class</option>{classes.map(c => <option key={c} value={c}>{c}</option>)}</select></div>
                <div><label className={labelCls}>Topic *</label><input type="text" value={lessonPlanForm.topic} onChange={(e) => setLessonPlanForm({...lessonPlanForm, topic: e.target.value})} className={inputCls} placeholder="Enter topic" /></div>
                <div><label className={labelCls}>Duration (mins)</label><input type="number" value={lessonPlanForm.duration} onChange={(e) => setLessonPlanForm({...lessonPlanForm, duration: e.target.value})} className={inputCls} placeholder="45" /></div>
                <div><label className={labelCls}>Bloom&apos;s Alignment *</label><select value={lessonPlanForm.bloomsAlignment} onChange={(e) => setLessonPlanForm({...lessonPlanForm, bloomsAlignment: e.target.value})} className={inputCls}>{bloomsLevels.map(l => <option key={l} value={l}>{l}</option>)}</select></div>
                <div><label className={labelCls}>Teaching Method *</label><select value={lessonPlanForm.teachingMethod} onChange={(e) => setLessonPlanForm({...lessonPlanForm, teachingMethod: e.target.value})} className={inputCls}><option value="Lecture">Lecture</option><option value="Activity">Activity</option><option value="Discussion">Discussion</option><option value="Experiment">Experiment</option><option value="Flipped">Flipped</option><option value="Group Work">Group Work</option></select></div>
                <div className="md:col-span-2 lg:col-span-3"><label className={labelCls}>Learning Objectives</label><textarea value={lessonPlanForm.learningObjectives} onChange={(e) => setLessonPlanForm({...lessonPlanForm, learningObjectives: e.target.value})} className={inputCls + ' min-h-[60px]'} placeholder="Enter learning objectives..." /></div>
                <div><label className={labelCls}>Resources Needed</label><input type="text" value={lessonPlanForm.resourcesNeeded} onChange={(e) => setLessonPlanForm({...lessonPlanForm, resourcesNeeded: e.target.value})} className={inputCls} placeholder="e.g., Projector, Lab Kit" /></div>
                <div><label className={labelCls}>Assessment Method</label><input type="text" value={lessonPlanForm.assessmentMethod} onChange={(e) => setLessonPlanForm({...lessonPlanForm, assessmentMethod: e.target.value})} className={inputCls} placeholder="e.g., Oral Quiz, Worksheet" /></div>
                <div><label className={labelCls}>Homework Assignment</label><input type="text" value={lessonPlanForm.homeworkAssignment} onChange={(e) => setLessonPlanForm({...lessonPlanForm, homeworkAssignment: e.target.value})} className={inputCls} placeholder="Homework details" /></div>
              </div>
              <div className="mt-4"><label className={labelCls}>Notes</label><textarea value={lessonPlanForm.notes} onChange={(e) => setLessonPlanForm({...lessonPlanForm, notes: e.target.value})} className={inputCls + ' min-h-[60px]'} placeholder="Additional notes..." /></div>
              <div className="flex justify-end mt-4">
                <button onClick={() => handleSubmit('lessonPlan')} className="px-6 py-2 rounded-xl text-sm font-medium gradient-birla text-white hover:opacity-90 transition-opacity flex items-center gap-2">
                  <Send className="w-4 h-4" />Save Lesson Plan
                </button>
              </div>
            </motion.div>
          )}

          {/* Live Class Schedule Form */}
          {showForm === 'liveClass' && (
            <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-semibold text-foreground flex items-center gap-2">
                  <Video className="w-5 h-5 text-birla-cyan" />Live Class Schedule Form
                </h3>
                <button onClick={() => setShowForm(null)} className="w-8 h-8 rounded-lg border border-border flex items-center justify-center hover:bg-muted/50"><X className="w-4 h-4" /></button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div><label className={labelCls}>Subject *</label><select value={liveClassForm.subject} onChange={(e) => setLiveClassForm({...liveClassForm, subject: e.target.value})} className={inputCls}><option value="">Select Subject</option>{subjects.map(s => <option key={s} value={s}>{s}</option>)}</select></div>
                <div><label className={labelCls}>Class *</label><select value={liveClassForm.className} onChange={(e) => setLiveClassForm({...liveClassForm, className: e.target.value})} className={inputCls}><option value="">Select Class</option>{classes.map(c => <option key={c} value={c}>{c}</option>)}</select></div>
                <div><label className={labelCls}>Teacher *</label><select value={liveClassForm.teacher} onChange={(e) => setLiveClassForm({...liveClassForm, teacher: e.target.value})} className={inputCls}><option value="">Select Teacher</option>{teachers.map(t => <option key={t} value={t}>{t}</option>)}</select></div>
                <div><label className={labelCls}>Date *</label><input type="date" value={liveClassForm.date} onChange={(e) => setLiveClassForm({...liveClassForm, date: e.target.value})} className={inputCls} /></div>
                <div><label className={labelCls}>Start Time *</label><input type="time" value={liveClassForm.startTime} onChange={(e) => setLiveClassForm({...liveClassForm, startTime: e.target.value})} className={inputCls} /></div>
                <div><label className={labelCls}>Duration (mins) *</label><input type="number" value={liveClassForm.duration} onChange={(e) => setLiveClassForm({...liveClassForm, duration: e.target.value})} className={inputCls} placeholder="45" /></div>
                <div><label className={labelCls}>Topic *</label><input type="text" value={liveClassForm.topic} onChange={(e) => setLiveClassForm({...liveClassForm, topic: e.target.value})} className={inputCls} placeholder="Enter class topic" /></div>
                <div><label className={labelCls}>Meeting Link</label><input type="url" value={liveClassForm.meetingLink} onChange={(e) => setLiveClassForm({...liveClassForm, meetingLink: e.target.value})} className={inputCls} placeholder="https://meet.google.com/..." /></div>
                <div className="flex items-center gap-2 pt-5">
                  <input type="checkbox" checked={liveClassForm.recordingEnabled} onChange={(e) => setLiveClassForm({...liveClassForm, recordingEnabled: e.target.checked})} className="w-4 h-4 rounded border-border" />
                  <label className="text-xs text-muted-foreground">Enable Recording</label>
                </div>
              </div>
              <div className="flex justify-end mt-4">
                <button onClick={() => handleSubmit('liveClass')} className="px-6 py-2 rounded-xl text-sm font-medium gradient-birla text-white hover:opacity-90 transition-opacity flex items-center gap-2">
                  <Send className="w-4 h-4" />Schedule Live Class
                </button>
              </div>
            </motion.div>
          )}

          {/* Digital Resource Upload Form */}
          {showForm === 'resource' && (
            <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-semibold text-foreground flex items-center gap-2">
                  <Upload className="w-5 h-5 text-birla-cyan" />Digital Resource Upload Form
                </h3>
                <button onClick={() => setShowForm(null)} className="w-8 h-8 rounded-lg border border-border flex items-center justify-center hover:bg-muted/50"><X className="w-4 h-4" /></button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div><label className={labelCls}>Resource Title *</label><input type="text" value={resourceForm.title} onChange={(e) => setResourceForm({...resourceForm, title: e.target.value})} className={inputCls} placeholder="Enter resource title" /></div>
                <div><label className={labelCls}>Resource Type *</label><select value={resourceForm.resourceType} onChange={(e) => setResourceForm({...resourceForm, resourceType: e.target.value})} className={inputCls}><option value="Textbook">Textbook</option><option value="Video">Video</option><option value="Audio">Audio</option><option value="Presentation">Presentation</option><option value="Simulation">Simulation</option><option value="Worksheet">Worksheet</option><option value="Reference">Reference</option></select></div>
                <div><label className={labelCls}>Subject *</label><select value={resourceForm.subject} onChange={(e) => setResourceForm({...resourceForm, subject: e.target.value})} className={inputCls}><option value="">Select Subject</option>{subjects.map(s => <option key={s} value={s}>{s}</option>)}</select></div>
                <div><label className={labelCls}>Class</label><select value={resourceForm.className} onChange={(e) => setResourceForm({...resourceForm, className: e.target.value})} className={inputCls}><option value="">Select Class</option>{classes.map(c => <option key={c} value={c}>{c}</option>)}</select></div>
                <div><label className={labelCls}>Author</label><input type="text" value={resourceForm.author} onChange={(e) => setResourceForm({...resourceForm, author: e.target.value})} className={inputCls} placeholder="Author name" /></div>
                <div><label className={labelCls}>Publisher</label><input type="text" value={resourceForm.publisher} onChange={(e) => setResourceForm({...resourceForm, publisher: e.target.value})} className={inputCls} placeholder="Publisher name" /></div>
                <div><label className={labelCls}>Access Level *</label><select value={resourceForm.accessLevel} onChange={(e) => setResourceForm({...resourceForm, accessLevel: e.target.value})} className={inputCls}><option value="All">All</option><option value="Class">Class</option><option value="Teacher">Teacher Only</option></select></div>
                <div><label className={labelCls}>Tags</label><input type="text" value={resourceForm.tags} onChange={(e) => setResourceForm({...resourceForm, tags: e.target.value})} className={inputCls} placeholder="e.g., NEP2020, Bloom-Apply" /></div>
              </div>
              <div className="mt-4"><label className={labelCls}>Description</label><textarea value={resourceForm.description} onChange={(e) => setResourceForm({...resourceForm, description: e.target.value})} className={inputCls + ' min-h-[80px]'} placeholder="Resource description..." /></div>
              <div className="flex justify-end mt-4">
                <button onClick={() => handleSubmit('resource')} className="px-6 py-2 rounded-xl text-sm font-medium gradient-birla text-white hover:opacity-90 transition-opacity flex items-center gap-2">
                  <Upload className="w-4 h-4" />Upload Resource
                </button>
              </div>
            </motion.div>
          )}

          {/* Competency Mapping Form */}
          {showForm === 'competencyMap' && (
            <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-semibold text-foreground flex items-center gap-2">
                  <Target className="w-5 h-5 text-birla-cyan" />Competency Mapping Form
                </h3>
                <button onClick={() => setShowForm(null)} className="w-8 h-8 rounded-lg border border-border flex items-center justify-center hover:bg-muted/50"><X className="w-4 h-4" /></button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div><label className={labelCls}>Subject *</label><select value={competencyMapForm.subject} onChange={(e) => setCompetencyMapForm({...competencyMapForm, subject: e.target.value})} className={inputCls}><option value="">Select Subject</option>{subjects.map(s => <option key={s} value={s}>{s}</option>)}</select></div>
                <div><label className={labelCls}>Class *</label><select value={competencyMapForm.className} onChange={(e) => setCompetencyMapForm({...competencyMapForm, className: e.target.value})} className={inputCls}><option value="">Select Class</option>{classes.map(c => <option key={c} value={c}>{c}</option>)}</select></div>
                <div><label className={labelCls}>Competency *</label><input type="text" value={competencyMapForm.competency} onChange={(e) => setCompetencyMapForm({...competencyMapForm, competency: e.target.value})} className={inputCls} placeholder="e.g., Critical Thinking" /></div>
                <div><label className={labelCls}>Bloom&apos;s Level *</label><select value={competencyMapForm.bloomsLevel} onChange={(e) => setCompetencyMapForm({...competencyMapForm, bloomsLevel: e.target.value})} className={inputCls}>{bloomsLevels.map(l => <option key={l} value={l}>{l}</option>)}</select></div>
                <div><label className={labelCls}>Learning Outcome</label><input type="text" value={competencyMapForm.learningOutcome} onChange={(e) => setCompetencyMapForm({...competencyMapForm, learningOutcome: e.target.value})} className={inputCls} placeholder="Expected learning outcome" /></div>
                <div><label className={labelCls}>Assessment Criteria</label><input type="text" value={competencyMapForm.assessmentCriteria} onChange={(e) => setCompetencyMapForm({...competencyMapForm, assessmentCriteria: e.target.value})} className={inputCls} placeholder="Assessment criteria" /></div>
                <div className="flex items-center gap-2 pt-5">
                  <input type="checkbox" checked={competencyMapForm.nepAlignment} onChange={(e) => setCompetencyMapForm({...competencyMapForm, nepAlignment: e.target.checked})} className="w-4 h-4 rounded border-border" />
                  <label className="text-xs text-muted-foreground">NEP 2020 Aligned</label>
                </div>
              </div>
              <div className="flex justify-end mt-4">
                <button onClick={() => handleSubmit('competencyMap')} className="px-6 py-2 rounded-xl text-sm font-medium gradient-birla text-white hover:opacity-90 transition-opacity flex items-center gap-2">
                  <Send className="w-4 h-4" />Save Mapping
                </button>
              </div>
            </motion.div>
          )}

          {/* Experiential Learning Form */}
          {showForm === 'experiential' && (
            <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-semibold text-foreground flex items-center gap-2">
                  <FlaskConical className="w-5 h-5 text-birla-cyan" />Experiential Learning Form
                </h3>
                <button onClick={() => setShowForm(null)} className="w-8 h-8 rounded-lg border border-border flex items-center justify-center hover:bg-muted/50"><X className="w-4 h-4" /></button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div><label className={labelCls}>Activity Title *</label><input type="text" value={experientialForm.title} onChange={(e) => setExperientialForm({...experientialForm, title: e.target.value})} className={inputCls} placeholder="Enter activity title" /></div>
                <div><label className={labelCls}>Subject *</label><select value={experientialForm.subject} onChange={(e) => setExperientialForm({...experientialForm, subject: e.target.value})} className={inputCls}><option value="">Select Subject</option>{subjects.map(s => <option key={s} value={s}>{s}</option>)}</select></div>
                <div><label className={labelCls}>Class *</label><select value={experientialForm.className} onChange={(e) => setExperientialForm({...experientialForm, className: e.target.value})} className={inputCls}><option value="">Select Class</option>{classes.map(c => <option key={c} value={c}>{c}</option>)}</select></div>
                <div><label className={labelCls}>Type *</label><select value={experientialForm.type} onChange={(e) => setExperientialForm({...experientialForm, type: e.target.value})} className={inputCls}><option value="Field Study">Field Study</option><option value="Lab Experiment">Lab Experiment</option><option value="Industry Visit">Industry Visit</option><option value="Survey">Survey</option><option value="Project">Project</option></select></div>
                <div><label className={labelCls}>Start Date *</label><input type="date" value={experientialForm.startDate} onChange={(e) => setExperientialForm({...experientialForm, startDate: e.target.value})} className={inputCls} /></div>
                <div><label className={labelCls}>End Date *</label><input type="date" value={experientialForm.endDate} onChange={(e) => setExperientialForm({...experientialForm, endDate: e.target.value})} className={inputCls} /></div>
                <div><label className={labelCls}>No. of Students</label><input type="number" value={experientialForm.studentsCount} onChange={(e) => setExperientialForm({...experientialForm, studentsCount: e.target.value})} className={inputCls} placeholder="40" /></div>
              </div>
              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div><label className={labelCls}>Objective</label><textarea value={experientialForm.objective} onChange={(e) => setExperientialForm({...experientialForm, objective: e.target.value})} className={inputCls + ' min-h-[60px]'} placeholder="Activity objective..." /></div>
                <div><label className={labelCls}>Expected Outcome</label><textarea value={experientialForm.outcomeExpected} onChange={(e) => setExperientialForm({...experientialForm, outcomeExpected: e.target.value})} className={inputCls + ' min-h-[60px]'} placeholder="Expected outcomes..." /></div>
              </div>
              <div className="flex justify-end mt-4">
                <button onClick={() => handleSubmit('experiential')} className="px-6 py-2 rounded-xl text-sm font-medium gradient-birla text-white hover:opacity-90 transition-opacity flex items-center gap-2">
                  <Send className="w-4 h-4" />Create Activity
                </button>
              </div>
            </motion.div>
          )}

          {/* Student BSP ID Form */}
          {showForm === 'bspId' && (
            <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-semibold text-foreground flex items-center gap-2">
                  <Users className="w-5 h-5 text-birla-cyan" />Student BSP ID Form
                </h3>
                <button onClick={() => setShowForm(null)} className="w-8 h-8 rounded-lg border border-border flex items-center justify-center hover:bg-muted/50"><X className="w-4 h-4" /></button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div><label className={labelCls}>Student ID *</label><input type="text" value={bspIdForm.studentId} onChange={(e) => setBspIdForm({...bspIdForm, studentId: e.target.value})} className={inputCls} placeholder="STU001" /></div>
                <div><label className={labelCls}>BSP ID *</label><input type="text" value={bspIdForm.bspId} onChange={(e) => setBspIdForm({...bspIdForm, bspId: e.target.value})} className={inputCls} placeholder="BSP/WB/2023/00001" /></div>
                <div><label className={labelCls}>PEN No *</label><input type="text" value={bspIdForm.penNo} onChange={(e) => setBspIdForm({...bspIdForm, penNo: e.target.value})} className={inputCls} placeholder="PEN-2301-0001" /></div>
                <div><label className={labelCls}>Uppar ID *</label><input type="text" value={bspIdForm.upparId} onChange={(e) => setBspIdForm({...bspIdForm, upparId: e.target.value})} className={inputCls} placeholder="UPPR-WB-000001" /></div>
              </div>
              <div className="flex justify-end mt-4">
                <button onClick={() => handleSubmit('bspId')} className="px-6 py-2 rounded-xl text-sm font-medium gradient-birla text-white hover:opacity-90 transition-opacity flex items-center gap-2">
                  <Send className="w-4 h-4" />Update BSP ID
                </button>
              </div>
            </motion.div>
          )}
        </div>
      )}

      {/* ==================== REPORTS TAB ==================== */}
      {activeTab === 'reports' && (
        <div className="space-y-4">
          {/* Report Navigation */}
          <motion.div variants={itemVariants} className="flex gap-2 overflow-x-auto pb-1">
            {reportsList.map((rpt) => {
              const Icon = rpt.icon
              return (
                <button key={rpt.id} onClick={() => {}} className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-border bg-card hover:border-birla-cyan/30 hover:shadow-sm transition-all text-xs font-medium text-muted-foreground hover:text-foreground whitespace-nowrap">
                  <Icon className="w-3.5 h-3.5" />{rpt.label}
                </button>
              )
            })}
          </motion.div>

          {/* Learning Engagement Report */}
          <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-5">
            <h3 className="text-base font-semibold text-foreground flex items-center gap-2 mb-1">
              <TrendingUp className="w-4 h-4 text-birla-cyan" />Learning Engagement Report
            </h3>
            <p className="text-xs text-muted-foreground mb-3">8-week engagement trend across live classes, recorded content, quizzes, and assignments</p>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={engagementData}>
                  <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'} />
                  <XAxis dataKey="week" tick={{ fontSize: 10 }} stroke={darkMode ? '#64748b' : '#94a3b8'} />
                  <YAxis tick={{ fontSize: 10 }} stroke={darkMode ? '#64748b' : '#94a3b8'} />
                  <Tooltip contentStyle={tooltipStyle} />
                  <Legend iconType="circle" wrapperStyle={{ fontSize: '11px' }} />
                  <Area type="monotone" dataKey="live" stroke="#1A2D4A" fill="rgba(26,45,74,0.15)" strokeWidth={2} name="Live" />
                  <Area type="monotone" dataKey="recorded" stroke="#22D3EE" fill="rgba(34,211,238,0.1)" strokeWidth={2} name="Recorded" />
                  <Area type="monotone" dataKey="quiz" stroke="#C8A45C" fill="rgba(200,164,92,0.1)" strokeWidth={2} name="Quiz" />
                  <Area type="monotone" dataKey="assignment" stroke="#8B5CF6" fill="rgba(139,92,246,0.1)" strokeWidth={2} name="Assignment" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Assignment Completion & Quiz Performance Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Assignment Completion Bar Chart */}
            <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-5">
              <h3 className="text-base font-semibold text-foreground flex items-center gap-2 mb-1">
                <ClipboardList className="w-4 h-4 text-birla-gold" />Assignment Completion
              </h3>
              <p className="text-xs text-muted-foreground mb-3">Completed vs Pending by class</p>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={assignmentCompletionReport}>
                    <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'} />
                    <XAxis dataKey="class" tick={{ fontSize: 10 }} stroke={darkMode ? '#64748b' : '#94a3b8'} />
                    <YAxis tick={{ fontSize: 10 }} stroke={darkMode ? '#64748b' : '#94a3b8'} />
                    <Tooltip contentStyle={tooltipStyle} />
                    <Legend iconType="circle" wrapperStyle={{ fontSize: '11px' }} />
                    <Bar dataKey="completed" fill="#10B981" radius={[4, 4, 0, 0]} name="Completed" />
                    <Bar dataKey="pending" fill="#EF4444" radius={[4, 4, 0, 0]} name="Pending" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </motion.div>

            {/* Quiz Performance Bar Chart */}
            <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-5">
              <h3 className="text-base font-semibold text-foreground flex items-center gap-2 mb-1">
                <Award className="w-4 h-4 text-purple-500" />Quiz Performance
              </h3>
              <p className="text-xs text-muted-foreground mb-3">Average score and pass rate by quiz</p>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={quizPerformanceReport}>
                    <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'} />
                    <XAxis dataKey="quiz" tick={{ fontSize: 10 }} stroke={darkMode ? '#64748b' : '#94a3b8'} />
                    <YAxis tick={{ fontSize: 10 }} stroke={darkMode ? '#64748b' : '#94a3b8'} />
                    <Tooltip contentStyle={tooltipStyle} />
                    <Legend iconType="circle" wrapperStyle={{ fontSize: '11px' }} />
                    <Bar dataKey="avgScore" fill="#22D3EE" radius={[4, 4, 0, 0]} name="Avg Score %" />
                    <Bar dataKey="passRate" fill="#C8A45C" radius={[4, 4, 0, 0]} name="Pass Rate %" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </motion.div>
          </div>

          {/* Bloom's Distribution & Competency Achievement Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Bloom's Distribution Horizontal Bar Chart */}
            <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-5">
              <h3 className="text-base font-semibold text-foreground flex items-center gap-2 mb-1">
                <Brain className="w-4 h-4 text-purple-500" />Bloom&apos;s Distribution
              </h3>
              <p className="text-xs text-muted-foreground mb-3">Question distribution across taxonomy levels</p>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={bloomsDistData} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'} />
                    <XAxis type="number" tick={{ fontSize: 10 }} stroke={darkMode ? '#64748b' : '#94a3b8'} />
                    <YAxis dataKey="level" type="category" tick={{ fontSize: 10 }} stroke={darkMode ? '#64748b' : '#94a3b8'} width={80} />
                    <Tooltip contentStyle={tooltipStyle} />
                    <Bar dataKey="count" radius={[0, 4, 4, 0]} name="Questions">
                      {bloomsDistData.map((_, i) => (<Cell key={i} fill={CHART_COLORS[i]} />))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </motion.div>

            {/* Competency Achievement Radar Chart */}
            <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-5">
              <h3 className="text-base font-semibold text-foreground flex items-center gap-2 mb-1">
                <Target className="w-4 h-4 text-birla-gold" />Competency Achievement
              </h3>
              <p className="text-xs text-muted-foreground mb-3">Radar view of core competency scores</p>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={competencyData.slice(0, 1).flatMap(d => [
                    { skill: 'Critical Thinking', Math: d.criticalThinking, Science: 78, English: 65 },
                    { skill: 'Problem Solving', Math: d.problemSolving, Science: 75, English: 55 },
                    { skill: 'Communication', Math: d.communication, Science: 65, English: 85 },
                    { skill: 'Creativity', Math: d.creativity, Science: 60, English: 70 },
                    { skill: 'Collaboration', Math: d.collaboration, Science: 72, English: 68 },
                  ])}>
                    <PolarGrid stroke={darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'} />
                    <PolarAngleAxis dataKey="skill" tick={{ fontSize: 10 }} stroke={darkMode ? '#94a3b8' : '#64748b'} />
                    <PolarRadiusAxis tick={{ fontSize: 9 }} />
                    <Radar name="Mathematics" dataKey="Math" stroke="#22D3EE" fill="#22D3EE" fillOpacity={0.15} />
                    <Radar name="Science" dataKey="Science" stroke="#C8A45C" fill="#C8A45C" fillOpacity={0.1} />
                    <Radar name="English" dataKey="English" stroke="#8B5CF6" fill="#8B5CF6" fillOpacity={0.1} />
                    <Legend iconType="circle" wrapperStyle={{ fontSize: '11px' }} />
                    <Tooltip contentStyle={tooltipStyle} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </motion.div>
          </div>

          {/* Digital Library Usage & Lesson Plan Coverage Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Digital Library Usage Area Chart */}
            <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-5">
              <h3 className="text-base font-semibold text-foreground flex items-center gap-2 mb-1">
                <Library className="w-4 h-4 text-birla-cyan" />Digital Library Usage
              </h3>
              <p className="text-xs text-muted-foreground mb-3">Access count by resource type</p>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={digitalLibraryData}>
                    <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'} />
                    <XAxis dataKey="resource" tick={{ fontSize: 9 }} stroke={darkMode ? '#64748b' : '#94a3b8'} angle={-15} textAnchor="end" height={50} />
                    <YAxis tick={{ fontSize: 10 }} stroke={darkMode ? '#64748b' : '#94a3b8'} />
                    <Tooltip contentStyle={tooltipStyle} />
                    <Area type="monotone" dataKey="access" stroke="#22D3EE" fill="rgba(34,211,238,0.15)" strokeWidth={2} name="Access Count" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </motion.div>

            {/* Lesson Plan Coverage Bar Chart */}
            <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-5">
              <h3 className="text-base font-semibold text-foreground flex items-center gap-2 mb-1">
                <BookOpen className="w-4 h-4 text-birla-gold" />Lesson Plan Coverage
              </h3>
              <p className="text-xs text-muted-foreground mb-3">Planned vs Completed lesson plans by subject</p>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={lessonPlanCoverage}>
                    <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'} />
                    <XAxis dataKey="subject" tick={{ fontSize: 10 }} stroke={darkMode ? '#64748b' : '#94a3b8'} />
                    <YAxis tick={{ fontSize: 10 }} stroke={darkMode ? '#64748b' : '#94a3b8'} />
                    <Tooltip contentStyle={tooltipStyle} />
                    <Legend iconType="circle" wrapperStyle={{ fontSize: '11px' }} />
                    <Bar dataKey="planned" fill="#1A2D4A" radius={[4, 4, 0, 0]} name="Planned" />
                    <Bar dataKey="completed" fill="#10B981" radius={[4, 4, 0, 0]} name="Completed" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </motion.div>
          </div>

          {/* Student Progress Table */}
          <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-5">
            <h3 className="text-base font-semibold text-foreground flex items-center gap-2 mb-1">
              <Users className="w-4 h-4 text-birla-cyan" />Student Progress
            </h3>
            <p className="text-xs text-muted-foreground mb-3">Individual student scores with BSP ID, PEN No, Uppar ID</p>
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left p-2 text-muted-foreground font-medium">Name</th>
                    <th className="text-left p-2 text-muted-foreground font-medium">BSP ID</th>
                    <th className="text-left p-2 text-muted-foreground font-medium">PEN No</th>
                    <th className="text-left p-2 text-muted-foreground font-medium">Uppar ID</th>
                    <th className="text-center p-2 text-muted-foreground font-medium">Math</th>
                    <th className="text-center p-2 text-muted-foreground font-medium">Science</th>
                    <th className="text-center p-2 text-muted-foreground font-medium">English</th>
                    <th className="text-center p-2 text-muted-foreground font-medium">Hindi</th>
                    <th className="text-center p-2 text-muted-foreground font-medium">SST</th>
                    <th className="text-center p-2 text-muted-foreground font-medium">Avg</th>
                  </tr>
                </thead>
                <tbody>
                  {studentProgressData.map((s, i) => {
                    const avg = Math.round((s.math + s.science + s.english + s.hindi + s.sst) / 5)
                    return (
                      <tr key={i} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                        <td className="p-2 font-medium text-foreground">{s.name}</td>
                        <td className="p-2"><span className="px-1.5 py-0.5 rounded bg-blue-500/10 text-blue-600 dark:text-blue-400">{s.bspId}</span></td>
                        <td className="p-2"><span className="px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">{s.penNo}</span></td>
                        <td className="p-2"><span className="px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-600 dark:text-amber-400">{s.upparId}</span></td>
                        <td className={`p-2 text-center ${s.math >= 80 ? 'text-emerald-500' : s.math >= 60 ? 'text-birla-gold' : 'text-red-500'}`}>{s.math}</td>
                        <td className={`p-2 text-center ${s.science >= 80 ? 'text-emerald-500' : s.science >= 60 ? 'text-birla-gold' : 'text-red-500'}`}>{s.science}</td>
                        <td className={`p-2 text-center ${s.english >= 80 ? 'text-emerald-500' : s.english >= 60 ? 'text-birla-gold' : 'text-red-500'}`}>{s.english}</td>
                        <td className={`p-2 text-center ${s.hindi >= 80 ? 'text-emerald-500' : s.hindi >= 60 ? 'text-birla-gold' : 'text-red-500'}`}>{s.hindi}</td>
                        <td className={`p-2 text-center ${s.sst >= 80 ? 'text-emerald-500' : s.sst >= 60 ? 'text-birla-gold' : 'text-red-500'}`}>{s.sst}</td>
                        <td className={`p-2 text-center font-semibold ${avg >= 80 ? 'text-emerald-500' : avg >= 60 ? 'text-birla-gold' : 'text-red-500'}`}>{avg}%</td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </motion.div>

          {/* Experiential Learning Pie Chart */}
          <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-5">
            <h3 className="text-base font-semibold text-foreground flex items-center gap-2 mb-1">
              <FlaskConical className="w-4 h-4 text-birla-cyan" />Experiential Learning Report
            </h3>
            <p className="text-xs text-muted-foreground mb-3">Activity completion status distribution</p>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={experientialPieData} cx="50%" cy="50%" outerRadius={90} innerRadius={50} paddingAngle={4} dataKey="value" nameKey="name" label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                      {experientialPieData.map((entry, i) => (<Cell key={i} fill={entry.fill} />))}
                    </Pie>
                    <Tooltip contentStyle={tooltipStyle} />
                    <Legend iconType="circle" wrapperStyle={{ fontSize: '11px' }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-2">
                {experientialData.map((exp, i) => (
                  <div key={i} className="flex items-center gap-3 p-2.5 rounded-xl border border-border hover:bg-muted/30 transition-colors">
                    <div className={`w-2.5 h-2.5 rounded-full shrink-0 ${exp.status === 'Completed' ? 'bg-emerald-500' : exp.status === 'In Progress' ? 'bg-birla-cyan' : 'bg-amber-500'}`} />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-foreground truncate">{exp.title}</p>
                      <p className="text-[10px] text-muted-foreground">{exp.type} &bull; {exp.students} students</p>
                    </div>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${exp.status === 'Completed' ? 'bg-emerald-500/10 text-emerald-500' : exp.status === 'In Progress' ? 'bg-birla-cyan/10 text-birla-cyan' : 'bg-amber-500/10 text-amber-500'}`}>{exp.status}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </motion.div>
  )
}
