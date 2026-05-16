'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  GraduationCap, BookOpen, ClipboardList, Video, Upload, Calendar,
  BarChart3, PieChart as PieChartIcon, Target, Brain, FileText,
  Plus, X, Clock, CheckCircle2, Users, Zap, Award, Sparkles,
  Link, FileQuestion, Layers, TrendingUp, ArrowUpRight, Search,
  Monitor, PlayCircle, Library, Lightbulb, PenTool, UsersRound,
  Globe, Mic, FlaskConical, MapPin, Tag, Save, Send, Eye,
  ChevronRight, Activity, Star, MessageSquare, AlertTriangle
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

  // Form states
  const [assignmentForm, setAssignmentForm] = useState({
    title: '', subject: '', className: '', section: '', dueDate: '', description: '',
    maxMarks: '', assignmentType: 'Homework', bloomsLevel: 'Remember',
    competencyMapping: '', attachFiles: false
  })
  const [quizForm, setQuizForm] = useState({
    title: '', subject: '', className: '', duration: '', totalQuestions: '',
    marksPerQuestion: '', quizType: 'MCQ', difficultyLevel: 'Medium',
    bloomsLevel: 'Remember', passingPercentage: '', scheduleDate: '', scheduleTime: ''
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

  const handleSubmit = (formType) => {
    setShowForm(null)
  }

  const tabs = [
    { id: 'overview', label: 'Overview', icon: GraduationCap },
    { id: 'classrooms', label: 'Virtual Classrooms', icon: Video },
    { id: 'assignments', label: 'Assignments', icon: ClipboardList },
    { id: 'quizzes', label: 'Quizzes', icon: FileQuestion },
    { id: 'skills', label: "Skills & Bloom's", icon: Brain },
    { id: 'library', label: 'Digital Library', icon: Library },
    { id: 'planner', label: 'Lesson Planner', icon: BookOpen },
    { id: 'ai', label: 'AI Insights', icon: Sparkles },
    { id: 'forms', label: 'Forms', icon: PenTool },
    { id: 'reports', label: 'Reports', icon: BarChart3 },
  ]

  const formsList = [
    { id: 'assignment', label: 'Assignment Creation', icon: ClipboardList },
    { id: 'quiz', label: 'Quiz Creation', icon: FileQuestion },
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
    { id: 'quizPerf', label: 'Quiz Performance', icon: Award },
    { id: 'bloomsDist', label: "Bloom's Distribution", icon: Brain },
    { id: 'competency', label: 'Competency Achievement', icon: Target },
    { id: 'libraryUsage', label: 'Digital Library Usage', icon: Library },
    { id: 'lessonCoverage', label: 'Lesson Plan Coverage', icon: BookOpen },
    { id: 'studentProgress', label: 'Student Progress', icon: Users },
    { id: 'experiential', label: 'Experiential Learning', icon: FlaskConical },
  ]

  const inputCls = "w-full px-3 py-2 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-birla-cyan/30"
  const labelCls = "block text-xs font-medium text-muted-foreground mb-1"

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="show" className="p-4 lg:p-6 space-y-6 max-w-[1600px] mx-auto">
      {/* Header */}
      <motion.div variants={itemVariants} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <GraduationCap className="w-7 h-7 text-birla-cyan" />LMS Dashboard
          </h1>
          <p className="text-sm text-muted-foreground mt-1">Birla Open Minds International School &bull; Learning Management System</p>
        </div>
      </motion.div>

      {/* Tab Navigation */}
      <motion.div variants={itemVariants} className="flex gap-1 p-1 rounded-xl bg-muted/50 border border-border overflow-x-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon
          return (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${activeTab === tab.id ? 'gradient-birla text-white shadow-md' : 'text-muted-foreground hover:text-foreground'}`}>
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
              { label: 'Active Courses', value: '48', change: '+5', icon: BookOpen, color: 'from-blue-900 to-blue-700' },
              { label: 'Assignments Due', value: '156', change: '+12', icon: ClipboardList, color: 'from-amber-800 to-amber-600' },
              { label: 'Quizzes Active', value: '24', change: '+3', icon: FileQuestion, color: 'from-purple-800 to-purple-600' },
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
                    <Area type="monotone" dataKey="quiz" stroke="#C8A45C" fill="rgba(200,164,92,0.1)" strokeWidth={2} name="Quiz" />
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

      {/* Virtual Classrooms Tab */}
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

      {/* Assignments Tab */}
      {activeTab === 'assignments' && (
        <div className="space-y-4">
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

      {/* Quizzes Tab */}
      {activeTab === 'quizzes' && (
        <div className="space-y-4">
          <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { title: 'Algebra Quiz - Ch.5', subject: 'Mathematics', class: 'X', questions: 15, duration: 30, avgScore: 72, passRate: 78 },
              { title: 'Light & Sound Quiz', subject: 'Science', class: 'IX', questions: 20, duration: 25, avgScore: 68, passRate: 72 },
              { title: 'Grammar Quiz - Tenses', subject: 'English', class: 'VIII', questions: 25, duration: 20, avgScore: 82, passRate: 88 },
              { title: 'Bhagwat Quiz', subject: 'Hindi', class: 'VII', questions: 10, duration: 15, avgScore: 65, passRate: 70 },
              { title: 'Democracy Quiz', subject: 'SST', class: 'X', questions: 20, duration: 25, avgScore: 70, passRate: 75 },
              { title: 'HTML/CSS Quiz', subject: 'Computer', class: 'IX', questions: 15, duration: 20, avgScore: 85, passRate: 90 },
            ].map((q, i) => (
              <div key={i} className="rounded-2xl border border-border bg-card p-4 hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-between mb-2">
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-purple-500/10 text-purple-500">MCQ</span>
                  <FileQuestion className="w-4 h-4 text-muted-foreground" />
                </div>
                <h4 className="text-sm font-semibold text-foreground mb-1">{q.title}</h4>
                <p className="text-xs text-muted-foreground mb-2">{q.subject} &bull; Class {q.class}</p>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="p-2 rounded-lg bg-muted/50 text-center">
                    <p className="text-muted-foreground">Questions</p>
                    <p className="font-semibold text-foreground">{q.questions}</p>
                  </div>
                  <div className="p-2 rounded-lg bg-muted/50 text-center">
                    <p className="text-muted-foreground">Duration</p>
                    <p className="font-semibold text-foreground">{q.duration}m</p>
                  </div>
                  <div className="p-2 rounded-lg bg-muted/50 text-center">
                    <p className="text-muted-foreground">Avg Score</p>
                    <p className="font-semibold text-birla-cyan">{q.avgScore}%</p>
                  </div>
                  <div className="p-2 rounded-lg bg-muted/50 text-center">
                    <p className="text-muted-foreground">Pass Rate</p>
                    <p className="font-semibold text-emerald-500">{q.passRate}%</p>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      )}

      {/* Skills & Bloom's Tab */}
      {activeTab === 'skills' && (
        <div className="space-y-4">
          <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="rounded-2xl border border-border bg-card p-5">
              <h3 className="text-base font-semibold text-foreground flex items-center gap-2 mb-3">
                <Brain className="w-4 h-4 text-purple-500" />Bloom's Taxonomy Distribution
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

      {/* Digital Library Tab */}
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

      {/* Lesson Planner Tab */}
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

      {/* AI Insights Tab */}
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

      {/* Forms Tab */}
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
                  <label className="text-xs font-medium text-muted-foreground">Attach Files</label>
                </div>
                <div className="md:col-span-2 lg:col-span-3"><label className={labelCls}>Description</label><textarea value={assignmentForm.description} onChange={(e) => setAssignmentForm({...assignmentForm, description: e.target.value})} rows={3} className={inputCls + ' resize-none'} placeholder="Describe the assignment requirements..." /></div>
              </div>
              <div className="flex justify-end gap-3 mt-4">
                <button onClick={() => setShowForm(null)} className="px-4 py-2 rounded-xl border border-border text-sm text-muted-foreground hover:bg-muted/50">Cancel</button>
                <button onClick={() => handleSubmit('assignment')} className="px-4 py-2 rounded-xl gradient-birla text-white text-sm font-medium hover:shadow-lg transition-all">Create Assignment</button>
              </div>
            </motion.div>
          )}

          {/* Quiz Creation Form */}
          {showForm === 'quiz' && (
            <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-semibold text-foreground flex items-center gap-2">
                  <FileQuestion className="w-5 h-5 text-purple-500" />Quiz Creation Form
                </h3>
                <button onClick={() => setShowForm(null)} className="w-8 h-8 rounded-lg border border-border flex items-center justify-center hover:bg-muted/50"><X className="w-4 h-4" /></button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div><label className={labelCls}>Title *</label><input type="text" value={quizForm.title} onChange={(e) => setQuizForm({...quizForm, title: e.target.value})} className={inputCls} placeholder="Enter quiz title" /></div>
                <div><label className={labelCls}>Subject *</label><select value={quizForm.subject} onChange={(e) => setQuizForm({...quizForm, subject: e.target.value})} className={inputCls}><option value="">Select Subject</option>{subjects.map(s => <option key={s} value={s}>{s}</option>)}</select></div>
                <div><label className={labelCls}>Class *</label><select value={quizForm.className} onChange={(e) => setQuizForm({...quizForm, className: e.target.value})} className={inputCls}><option value="">Select Class</option>{classes.map(c => <option key={c} value={c}>{c}</option>)}</select></div>
                <div><label className={labelCls}>Duration (mins) *</label><input type="number" value={quizForm.duration} onChange={(e) => setQuizForm({...quizForm, duration: e.target.value})} className={inputCls} placeholder="30" /></div>
                <div><label className={labelCls}>Total Questions *</label><input type="number" value={quizForm.totalQuestions} onChange={(e) => setQuizForm({...quizForm, totalQuestions: e.target.value})} className={inputCls} placeholder="10" /></div>
                <div><label className={labelCls}>Marks Per Question *</label><input type="number" value={quizForm.marksPerQuestion} onChange={(e) => setQuizForm({...quizForm, marksPerQuestion: e.target.value})} className={inputCls} placeholder="5" /></div>
                <div><label className={labelCls}>Quiz Type *</label><select value={quizForm.quizType} onChange={(e) => setQuizForm({...quizForm, quizType: e.target.value})} className={inputCls}><option value="MCQ">MCQ</option><option value="True-False">True/False</option><option value="Short-Answer">Short Answer</option><option value="Mixed">Mixed</option></select></div>
                <div><label className={labelCls}>Difficulty Level *</label><select value={quizForm.difficultyLevel} onChange={(e) => setQuizForm({...quizForm, difficultyLevel: e.target.value})} className={inputCls}><option value="Easy">Easy</option><option value="Medium">Medium</option><option value="Hard">Hard</option></select></div>
                <div><label className={labelCls}>Bloom&apos;s Level *</label><select value={quizForm.bloomsLevel} onChange={(e) => setQuizForm({...quizForm, bloomsLevel: e.target.value})} className={inputCls}>{bloomsLevels.map(l => <option key={l} value={l}>{l}</option>)}</select></div>
                <div><label className={labelCls}>Passing Percentage *</label><input type="number" value={quizForm.passingPercentage} onChange={(e) => setQuizForm({...quizForm, passingPercentage: e.target.value})} className={inputCls} placeholder="40" /></div>
                <div><label className={labelCls}>Schedule Date</label><input type="date" value={quizForm.scheduleDate} onChange={(e) => setQuizForm({...quizForm, scheduleDate: e.target.value})} className={inputCls} /></div>
                <div><label className={labelCls}>Schedule Time</label><input type="time" value={quizForm.scheduleTime} onChange={(e) => setQuizForm({...quizForm, scheduleTime: e.target.value})} className={inputCls} /></div>
              </div>
              <div className="flex justify-end gap-3 mt-4">
                <button onClick={() => setShowForm(null)} className="px-4 py-2 rounded-xl border border-border text-sm text-muted-foreground hover:bg-muted/50">Cancel</button>
                <button onClick={() => handleSubmit('quiz')} className="px-4 py-2 rounded-xl gradient-birla text-white text-sm font-medium hover:shadow-lg transition-all">Create Quiz</button>
              </div>
            </motion.div>
          )}

          {/* Lesson Plan Form */}
          {showForm === 'lessonPlan' && (
            <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-semibold text-foreground flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-emerald-500" />Lesson Plan Form
                </h3>
                <button onClick={() => setShowForm(null)} className="w-8 h-8 rounded-lg border border-border flex items-center justify-center hover:bg-muted/50"><X className="w-4 h-4" /></button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div><label className={labelCls}>Subject *</label><select value={lessonPlanForm.subject} onChange={(e) => setLessonPlanForm({...lessonPlanForm, subject: e.target.value})} className={inputCls}><option value="">Select Subject</option>{subjects.map(s => <option key={s} value={s}>{s}</option>)}</select></div>
                <div><label className={labelCls}>Class *</label><select value={lessonPlanForm.className} onChange={(e) => setLessonPlanForm({...lessonPlanForm, className: e.target.value})} className={inputCls}><option value="">Select Class</option>{classes.map(c => <option key={c} value={c}>{c}</option>)}</select></div>
                <div><label className={labelCls}>Topic *</label><input type="text" value={lessonPlanForm.topic} onChange={(e) => setLessonPlanForm({...lessonPlanForm, topic: e.target.value})} className={inputCls} placeholder="Topic name" /></div>
                <div><label className={labelCls}>Duration (mins) *</label><input type="number" value={lessonPlanForm.duration} onChange={(e) => setLessonPlanForm({...lessonPlanForm, duration: e.target.value})} className={inputCls} placeholder="40" /></div>
                <div><label className={labelCls}>Bloom&apos;s Alignment *</label><select value={lessonPlanForm.bloomsAlignment} onChange={(e) => setLessonPlanForm({...lessonPlanForm, bloomsAlignment: e.target.value})} className={inputCls}>{bloomsLevels.map(l => <option key={l} value={l}>{l}</option>)}</select></div>
                <div><label className={labelCls}>Teaching Method *</label><select value={lessonPlanForm.teachingMethod} onChange={(e) => setLessonPlanForm({...lessonPlanForm, teachingMethod: e.target.value})} className={inputCls}><option value="Lecture">Lecture</option><option value="Discussion">Discussion</option><option value="Activity">Activity</option><option value="Experiment">Experiment</option><option value="Group Work">Group Work</option><option value="Flipped">Flipped</option></select></div>
                <div className="md:col-span-2 lg:col-span-3"><label className={labelCls}>Learning Objectives *</label><textarea value={lessonPlanForm.learningObjectives} onChange={(e) => setLessonPlanForm({...lessonPlanForm, learningObjectives: e.target.value})} rows={3} className={inputCls + ' resize-none'} placeholder="What students will achieve..." /></div>
                <div><label className={labelCls}>Resources Needed</label><input type="text" value={lessonPlanForm.resourcesNeeded} onChange={(e) => setLessonPlanForm({...lessonPlanForm, resourcesNeeded: e.target.value})} className={inputCls} placeholder="Textbook, projector, etc." /></div>
                <div><label className={labelCls}>Assessment Method</label><input type="text" value={lessonPlanForm.assessmentMethod} onChange={(e) => setLessonPlanForm({...lessonPlanForm, assessmentMethod: e.target.value})} className={inputCls} placeholder="Quiz, oral test, etc." /></div>
                <div><label className={labelCls}>Homework Assignment</label><input type="text" value={lessonPlanForm.homeworkAssignment} onChange={(e) => setLessonPlanForm({...lessonPlanForm, homeworkAssignment: e.target.value})} className={inputCls} placeholder="HW details" /></div>
                <div className="md:col-span-2 lg:col-span-3"><label className={labelCls}>Notes</label><textarea value={lessonPlanForm.notes} onChange={(e) => setLessonPlanForm({...lessonPlanForm, notes: e.target.value})} rows={2} className={inputCls + ' resize-none'} placeholder="Additional notes..." /></div>
              </div>
              <div className="flex justify-end gap-3 mt-4">
                <button onClick={() => setShowForm(null)} className="px-4 py-2 rounded-xl border border-border text-sm text-muted-foreground hover:bg-muted/50">Cancel</button>
                <button onClick={() => handleSubmit('lessonPlan')} className="px-4 py-2 rounded-xl gradient-birla text-white text-sm font-medium hover:shadow-lg transition-all">Save Lesson Plan</button>
              </div>
            </motion.div>
          )}

          {/* Live Class Schedule Form */}
          {showForm === 'liveClass' && (
            <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-semibold text-foreground flex items-center gap-2">
                  <Video className="w-5 h-5 text-blue-500" />Live Class Schedule Form
                </h3>
                <button onClick={() => setShowForm(null)} className="w-8 h-8 rounded-lg border border-border flex items-center justify-center hover:bg-muted/50"><X className="w-4 h-4" /></button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div><label className={labelCls}>Subject *</label><select value={liveClassForm.subject} onChange={(e) => setLiveClassForm({...liveClassForm, subject: e.target.value})} className={inputCls}><option value="">Select Subject</option>{subjects.map(s => <option key={s} value={s}>{s}</option>)}</select></div>
                <div><label className={labelCls}>Class *</label><select value={liveClassForm.className} onChange={(e) => setLiveClassForm({...liveClassForm, className: e.target.value})} className={inputCls}><option value="">Select Class</option>{classes.map(c => <option key={c} value={c}>{c}</option>)}</select></div>
                <div><label className={labelCls}>Teacher *</label><select value={liveClassForm.teacher} onChange={(e) => setLiveClassForm({...liveClassForm, teacher: e.target.value})} className={inputCls}><option value="">Select Teacher</option>{teachers.map(t => <option key={t} value={t}>{t}</option>)}</select></div>
                <div><label className={labelCls}>Date *</label><input type="date" value={liveClassForm.date} onChange={(e) => setLiveClassForm({...liveClassForm, date: e.target.value})} className={inputCls} /></div>
                <div><label className={labelCls}>Start Time *</label><input type="time" value={liveClassForm.startTime} onChange={(e) => setLiveClassForm({...liveClassForm, startTime: e.target.value})} className={inputCls} /></div>
                <div><label className={labelCls}>Duration (mins) *</label><input type="number" value={liveClassForm.duration} onChange={(e) => setLiveClassForm({...liveClassForm, duration: e.target.value})} className={inputCls} placeholder="40" /></div>
                <div className="md:col-span-2"><label className={labelCls}>Topic *</label><input type="text" value={liveClassForm.topic} onChange={(e) => setLiveClassForm({...liveClassForm, topic: e.target.value})} className={inputCls} placeholder="Class topic" /></div>
                <div><label className={labelCls}>Meeting Link</label><input type="url" value={liveClassForm.meetingLink} onChange={(e) => setLiveClassForm({...liveClassForm, meetingLink: e.target.value})} className={inputCls} placeholder="https://meet.google.com/..." /></div>
                <div className="flex items-center gap-2 pt-5">
                  <input type="checkbox" checked={liveClassForm.recordingEnabled} onChange={(e) => setLiveClassForm({...liveClassForm, recordingEnabled: e.target.checked})} className="w-4 h-4 rounded border-border" />
                  <label className="text-xs font-medium text-muted-foreground">Recording Enabled</label>
                </div>
              </div>
              <div className="flex justify-end gap-3 mt-4">
                <button onClick={() => setShowForm(null)} className="px-4 py-2 rounded-xl border border-border text-sm text-muted-foreground hover:bg-muted/50">Cancel</button>
                <button onClick={() => handleSubmit('liveClass')} className="px-4 py-2 rounded-xl gradient-birla text-white text-sm font-medium hover:shadow-lg transition-all">Schedule Class</button>
              </div>
            </motion.div>
          )}

          {/* Digital Resource Upload Form */}
          {showForm === 'resource' && (
            <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-semibold text-foreground flex items-center gap-2">
                  <Upload className="w-5 h-5 text-birla-gold" />Digital Resource Upload Form
                </h3>
                <button onClick={() => setShowForm(null)} className="w-8 h-8 rounded-lg border border-border flex items-center justify-center hover:bg-muted/50"><X className="w-4 h-4" /></button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div><label className={labelCls}>Title *</label><input type="text" value={resourceForm.title} onChange={(e) => setResourceForm({...resourceForm, title: e.target.value})} className={inputCls} placeholder="Resource title" /></div>
                <div><label className={labelCls}>Resource Type *</label><select value={resourceForm.resourceType} onChange={(e) => setResourceForm({...resourceForm, resourceType: e.target.value})} className={inputCls}><option value="Textbook">Textbook</option><option value="Reference">Reference</option><option value="Video">Video</option><option value="Audio">Audio</option><option value="Simulation">Simulation</option><option value="Worksheet">Worksheet</option></select></div>
                <div><label className={labelCls}>Subject *</label><select value={resourceForm.subject} onChange={(e) => setResourceForm({...resourceForm, subject: e.target.value})} className={inputCls}><option value="">Select Subject</option>{subjects.map(s => <option key={s} value={s}>{s}</option>)}</select></div>
                <div><label className={labelCls}>Class *</label><select value={resourceForm.className} onChange={(e) => setResourceForm({...resourceForm, className: e.target.value})} className={inputCls}><option value="">Select Class</option>{classes.map(c => <option key={c} value={c}>{c}</option>)}</select></div>
                <div><label className={labelCls}>Author</label><input type="text" value={resourceForm.author} onChange={(e) => setResourceForm({...resourceForm, author: e.target.value})} className={inputCls} placeholder="Author name" /></div>
                <div><label className={labelCls}>Publisher</label><input type="text" value={resourceForm.publisher} onChange={(e) => setResourceForm({...resourceForm, publisher: e.target.value})} className={inputCls} placeholder="Publisher name" /></div>
                <div><label className={labelCls}>Access Level *</label><select value={resourceForm.accessLevel} onChange={(e) => setResourceForm({...resourceForm, accessLevel: e.target.value})} className={inputCls}><option value="All">All</option><option value="Class">Class</option><option value="Teacher">Teacher</option></select></div>
                <div><label className={labelCls}>Tags</label><input type="text" value={resourceForm.tags} onChange={(e) => setResourceForm({...resourceForm, tags: e.target.value})} className={inputCls} placeholder="Comma-separated tags" /></div>
                <div className="md:col-span-2 lg:col-span-3"><label className={labelCls}>Description</label><textarea value={resourceForm.description} onChange={(e) => setResourceForm({...resourceForm, description: e.target.value})} rows={3} className={inputCls + ' resize-none'} placeholder="Describe the resource..." /></div>
              </div>
              <div className="flex justify-end gap-3 mt-4">
                <button onClick={() => setShowForm(null)} className="px-4 py-2 rounded-xl border border-border text-sm text-muted-foreground hover:bg-muted/50">Cancel</button>
                <button onClick={() => handleSubmit('resource')} className="px-4 py-2 rounded-xl gradient-birla text-white text-sm font-medium hover:shadow-lg transition-all">Upload Resource</button>
              </div>
            </motion.div>
          )}

          {/* Competency Mapping Form */}
          {showForm === 'competencyMap' && (
            <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-semibold text-foreground flex items-center gap-2">
                  <Target className="w-5 h-5 text-birla-gold" />Competency Mapping Form
                </h3>
                <button onClick={() => setShowForm(null)} className="w-8 h-8 rounded-lg border border-border flex items-center justify-center hover:bg-muted/50"><X className="w-4 h-4" /></button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div><label className={labelCls}>Subject *</label><select value={competencyMapForm.subject} onChange={(e) => setCompetencyMapForm({...competencyMapForm, subject: e.target.value})} className={inputCls}><option value="">Select Subject</option>{subjects.map(s => <option key={s} value={s}>{s}</option>)}</select></div>
                <div><label className={labelCls}>Class *</label><select value={competencyMapForm.className} onChange={(e) => setCompetencyMapForm({...competencyMapForm, className: e.target.value})} className={inputCls}><option value="">Select Class</option>{classes.map(c => <option key={c} value={c}>{c}</option>)}</select></div>
                <div><label className={labelCls}>Competency *</label><input type="text" value={competencyMapForm.competency} onChange={(e) => setCompetencyMapForm({...competencyMapForm, competency: e.target.value})} className={inputCls} placeholder="e.g., Critical Thinking" /></div>
                <div><label className={labelCls}>Bloom&apos;s Level *</label><select value={competencyMapForm.bloomsLevel} onChange={(e) => setCompetencyMapForm({...competencyMapForm, bloomsLevel: e.target.value})} className={inputCls}>{bloomsLevels.map(l => <option key={l} value={l}>{l}</option>)}</select></div>
                <div className="md:col-span-2"><label className={labelCls}>Learning Outcome *</label><input type="text" value={competencyMapForm.learningOutcome} onChange={(e) => setCompetencyMapForm({...competencyMapForm, learningOutcome: e.target.value})} className={inputCls} placeholder="Expected learning outcome" /></div>
                <div className="md:col-span-2"><label className={labelCls}>Assessment Criteria</label><textarea value={competencyMapForm.assessmentCriteria} onChange={(e) => setCompetencyMapForm({...competencyMapForm, assessmentCriteria: e.target.value})} rows={2} className={inputCls + ' resize-none'} placeholder="How competency will be assessed..." /></div>
                <div className="flex items-center gap-2 pt-5">
                  <input type="checkbox" checked={competencyMapForm.nepAlignment} onChange={(e) => setCompetencyMapForm({...competencyMapForm, nepAlignment: e.target.checked})} className="w-4 h-4 rounded border-border" />
                  <label className="text-xs font-medium text-muted-foreground">NEP 2020 Alignment</label>
                </div>
              </div>
              <div className="flex justify-end gap-3 mt-4">
                <button onClick={() => setShowForm(null)} className="px-4 py-2 rounded-xl border border-border text-sm text-muted-foreground hover:bg-muted/50">Cancel</button>
                <button onClick={() => handleSubmit('competencyMap')} className="px-4 py-2 rounded-xl gradient-birla text-white text-sm font-medium hover:shadow-lg transition-all">Save Mapping</button>
              </div>
            </motion.div>
          )}

          {/* Experiential Learning Form */}
          {showForm === 'experiential' && (
            <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-semibold text-foreground flex items-center gap-2">
                  <FlaskConical className="w-5 h-5 text-emerald-500" />Experiential Learning Form
                </h3>
                <button onClick={() => setShowForm(null)} className="w-8 h-8 rounded-lg border border-border flex items-center justify-center hover:bg-muted/50"><X className="w-4 h-4" /></button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div><label className={labelCls}>Title *</label><input type="text" value={experientialForm.title} onChange={(e) => setExperientialForm({...experientialForm, title: e.target.value})} className={inputCls} placeholder="Activity title" /></div>
                <div><label className={labelCls}>Subject *</label><select value={experientialForm.subject} onChange={(e) => setExperientialForm({...experientialForm, subject: e.target.value})} className={inputCls}><option value="">Select Subject</option>{subjects.map(s => <option key={s} value={s}>{s}</option>)}</select></div>
                <div><label className={labelCls}>Class *</label><select value={experientialForm.className} onChange={(e) => setExperientialForm({...experientialForm, className: e.target.value})} className={inputCls}><option value="">Select Class</option>{classes.map(c => <option key={c} value={c}>{c}</option>)}</select></div>
                <div><label className={labelCls}>Type *</label><select value={experientialForm.type} onChange={(e) => setExperientialForm({...experientialForm, type: e.target.value})} className={inputCls}><option value="Field Study">Field Study</option><option value="Survey">Survey</option><option value="Project">Project</option><option value="Industry Visit">Industry Visit</option><option value="Lab Experiment">Lab Experiment</option></select></div>
                <div><label className={labelCls}>Start Date *</label><input type="date" value={experientialForm.startDate} onChange={(e) => setExperientialForm({...experientialForm, startDate: e.target.value})} className={inputCls} /></div>
                <div><label className={labelCls}>End Date *</label><input type="date" value={experientialForm.endDate} onChange={(e) => setExperientialForm({...experientialForm, endDate: e.target.value})} className={inputCls} /></div>
                <div><label className={labelCls}>Students Count</label><input type="number" value={experientialForm.studentsCount} onChange={(e) => setExperientialForm({...experientialForm, studentsCount: e.target.value})} className={inputCls} placeholder="40" /></div>
                <div className="md:col-span-2"><label className={labelCls}>Objective *</label><textarea value={experientialForm.objective} onChange={(e) => setExperientialForm({...experientialForm, objective: e.target.value})} rows={2} className={inputCls + ' resize-none'} placeholder="Learning objective..." /></div>
                <div className="md:col-span-2 lg:col-span-3"><label className={labelCls}>Expected Outcome</label><textarea value={experientialForm.outcomeExpected} onChange={(e) => setExperientialForm({...experientialForm, outcomeExpected: e.target.value})} rows={2} className={inputCls + ' resize-none'} placeholder="Expected learning outcomes..." /></div>
              </div>
              <div className="flex justify-end gap-3 mt-4">
                <button onClick={() => setShowForm(null)} className="px-4 py-2 rounded-xl border border-border text-sm text-muted-foreground hover:bg-muted/50">Cancel</button>
                <button onClick={() => handleSubmit('experiential')} className="px-4 py-2 rounded-xl gradient-birla text-white text-sm font-medium hover:shadow-lg transition-all">Save Activity</button>
              </div>
            </motion.div>
          )}

          {/* Student BSP ID Form */}
          {showForm === 'bspId' && (
            <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-semibold text-foreground flex items-center gap-2">
                  <Users className="w-5 h-5 text-birla-cyan" />Student BSP ID Form (UDISE+)
                </h3>
                <button onClick={() => setShowForm(null)} className="w-8 h-8 rounded-lg border border-border flex items-center justify-center hover:bg-muted/50"><X className="w-4 h-4" /></button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div><label className={labelCls}>Student ID *</label><select value={bspIdForm.studentId} onChange={(e) => setBspIdForm({...bspIdForm, studentId: e.target.value})} className={inputCls}><option value="">Select Student</option>{studentsList.map(s => <option key={s.id} value={s.id}>{s.name} ({s.id})</option>)}</select></div>
                <div><label className={labelCls}>BSP ID *</label><input type="text" value={bspIdForm.bspId} onChange={(e) => setBspIdForm({...bspIdForm, bspId: e.target.value})} className={inputCls} placeholder="BSP2024XXX" /></div>
                <div><label className={labelCls}>PEN No *</label><input type="text" value={bspIdForm.penNo} onChange={(e) => setBspIdForm({...bspIdForm, penNo: e.target.value})} className={inputCls} placeholder="PEN1905XXX" /></div>
                <div><label className={labelCls}>Uppar ID *</label><input type="text" value={bspIdForm.upparId} onChange={(e) => setBspIdForm({...bspIdForm, upparId: e.target.value})} className={inputCls} placeholder="UPP2024XXX" /></div>
              </div>
              <div className="mt-4 p-3 rounded-xl bg-muted/30 border border-border">
                <h4 className="text-xs font-semibold text-foreground mb-2">Existing BSP ID Records</h4>
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {studentsList.map(s => (
                    <div key={s.id} className="flex items-center justify-between p-2 rounded-lg bg-background border border-border text-xs">
                      <span className="font-medium text-foreground">{s.name}</span>
                      <div className="flex gap-3">
                        <span className="text-birla-cyan">BSP: {s.bspId}</span>
                        <span className="text-birla-gold">PEN: {s.penNo}</span>
                        <span className="text-muted-foreground">UPP: {s.upparId}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex justify-end gap-3 mt-4">
                <button onClick={() => setShowForm(null)} className="px-4 py-2 rounded-xl border border-border text-sm text-muted-foreground hover:bg-muted/50">Cancel</button>
                <button onClick={() => handleSubmit('bspId')} className="px-4 py-2 rounded-xl gradient-birla text-white text-sm font-medium hover:shadow-lg transition-all">Save BSP ID</button>
              </div>
            </motion.div>
          )}
        </div>
      )}

      {/* Reports Tab */}
      {activeTab === 'reports' && (
        <div className="space-y-4">
          <motion.div variants={itemVariants} className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-9 gap-3">
            {reportsList.map((rpt) => {
              const Icon = rpt.icon
              return (
                <button key={rpt.id} onClick={() => setShowForm('rpt_' + rpt.id)}
                  className={`flex flex-col items-center gap-2 p-3 rounded-2xl border border-border hover:border-birla-cyan/30 hover:shadow-lg transition-all group ${showForm === 'rpt_' + rpt.id ? 'border-birla-cyan/50 shadow-lg bg-birla-cyan/5' : ''}`}>
                  <div className="w-9 h-9 rounded-xl bg-birla-blue/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Icon className="w-4 h-4 text-birla-blue dark:text-birla-cyan" />
                  </div>
                  <span className="text-[9px] text-muted-foreground group-hover:text-foreground text-center">{rpt.label}</span>
                </button>
              )
            })}
          </motion.div>

          {/* Learning Engagement Report */}
          {showForm === 'rpt_engagement' && (
            <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-5">
              <h3 className="text-base font-semibold text-foreground flex items-center gap-2 mb-1"><TrendingUp className="w-4 h-4 text-birla-cyan" />Learning Engagement Report</h3>
              <p className="text-xs text-muted-foreground mb-3">Weekly engagement trends across all learning activities</p>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
                <div className="p-3 rounded-xl bg-birla-blue/5 border border-border text-center"><p className="text-xs text-muted-foreground">Avg Live Attendance</p><p className="text-lg font-bold text-birla-cyan">86%</p></div>
                <div className="p-3 rounded-xl bg-birla-gold/5 border border-border text-center"><p className="text-xs text-muted-foreground">Avg Recorded Views</p><p className="text-lg font-bold text-birla-gold">74%</p></div>
                <div className="p-3 rounded-xl bg-purple-500/5 border border-border text-center"><p className="text-xs text-muted-foreground">Avg Quiz Participation</p><p className="text-lg font-bold text-purple-500">65%</p></div>
                <div className="p-3 rounded-xl bg-emerald-500/5 border border-border text-center"><p className="text-xs text-muted-foreground">Avg Assignment Submission</p><p className="text-lg font-bold text-emerald-500">76%</p></div>
              </div>
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
          )}

          {/* Assignment Completion Report */}
          {showForm === 'rpt_assignmentComp' && (
            <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-5">
              <h3 className="text-base font-semibold text-foreground flex items-center gap-2 mb-1"><ClipboardList className="w-4 h-4 text-birla-gold" />Assignment Completion Report</h3>
              <p className="text-xs text-muted-foreground mb-3">Class-wise assignment completion status</p>
              <div className="overflow-x-auto mb-4">
                <table className="w-full text-xs">
                  <thead><tr className="border-b border-border"><th className="text-left p-2 text-muted-foreground font-medium">Class</th><th className="text-center p-2 text-muted-foreground font-medium">Total</th><th className="text-center p-2 text-muted-foreground font-medium">Completed</th><th className="text-center p-2 text-muted-foreground font-medium">Pending</th><th className="text-center p-2 text-muted-foreground font-medium">Rate</th></tr></thead>
                  <tbody>
                    {assignmentCompletionReport.map((r, i) => (
                      <tr key={i} className="border-b border-border hover:bg-muted/30"><td className="p-2 font-medium text-foreground">{r.class}</td><td className="text-center p-2">{r.total}</td><td className="text-center p-2 text-emerald-500">{r.completed}</td><td className="text-center p-2 text-amber-500">{r.pending}</td><td className="text-center p-2 font-semibold">{Math.round(r.completed/r.total*100)}%</td></tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={assignmentCompletionReport}>
                    <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'} />
                    <XAxis dataKey="class" tick={{ fontSize: 10 }} stroke={darkMode ? '#64748b' : '#94a3b8'} />
                    <YAxis tick={{ fontSize: 10 }} stroke={darkMode ? '#64748b' : '#94a3b8'} />
                    <Tooltip contentStyle={tooltipStyle} />
                    <Legend iconType="circle" wrapperStyle={{ fontSize: '11px' }} />
                    <Bar dataKey="completed" fill="#22D3EE" radius={[4, 4, 0, 0]} name="Completed" />
                    <Bar dataKey="pending" fill="#C8A45C" radius={[4, 4, 0, 0]} name="Pending" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </motion.div>
          )}

          {/* Quiz Performance Report */}
          {showForm === 'rpt_quizPerf' && (
            <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-5">
              <h3 className="text-base font-semibold text-foreground flex items-center gap-2 mb-1"><Award className="w-4 h-4 text-purple-500" />Quiz Performance Report</h3>
              <p className="text-xs text-muted-foreground mb-3">Quiz-wise average scores and pass rates</p>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={quizPerformanceReport}>
                      <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'} />
                      <XAxis dataKey="quiz" tick={{ fontSize: 9 }} stroke={darkMode ? '#64748b' : '#94a3b8'} />
                      <YAxis tick={{ fontSize: 10 }} stroke={darkMode ? '#64748b' : '#94a3b8'} />
                      <Tooltip contentStyle={tooltipStyle} />
                      <Bar dataKey="avgScore" fill="#8B5CF6" radius={[4, 4, 0, 0]} name="Avg Score %" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={passRatePieData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} dataKey="value" label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                        {passRatePieData.map((entry, i) => (<Cell key={i} fill={entry.fill} />))}
                      </Pie>
                      <Tooltip contentStyle={tooltipStyle} />
                      <Legend wrapperStyle={{ fontSize: '11px' }} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </motion.div>
          )}

          {/* Bloom's Distribution Report */}
          {showForm === 'rpt_bloomsDist' && (
            <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-5">
              <h3 className="text-base font-semibold text-foreground flex items-center gap-2 mb-1"><Brain className="w-4 h-4 text-purple-500" />Bloom&apos;s Taxonomy Distribution Report</h3>
              <p className="text-xs text-muted-foreground mb-3">Question distribution across cognitive levels</p>
              <div className="overflow-x-auto mb-4">
                <table className="w-full text-xs">
                  <thead><tr className="border-b border-border"><th className="text-left p-2 text-muted-foreground font-medium">Level</th><th className="text-center p-2 text-muted-foreground font-medium">Count</th><th className="text-center p-2 text-muted-foreground font-medium">Percentage</th></tr></thead>
                  <tbody>
                    {bloomsDistData.map((r, i) => (
                      <tr key={i} className="border-b border-border hover:bg-muted/30"><td className="p-2 font-medium text-foreground">{r.level}</td><td className="text-center p-2">{r.count}</td><td className="text-center p-2 font-semibold">{r.pct}%</td></tr>
                    ))}
                  </tbody>
                </table>
              </div>
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
          )}

          {/* Competency Achievement Report */}
          {showForm === 'rpt_competency' && (
            <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-5">
              <h3 className="text-base font-semibold text-foreground flex items-center gap-2 mb-1"><Target className="w-4 h-4 text-birla-gold" />Competency Achievement Report</h3>
              <p className="text-xs text-muted-foreground mb-3">Subject-wise competency levels</p>
              <div className="overflow-x-auto mb-4">
                <table className="w-full text-xs">
                  <thead><tr className="border-b border-border"><th className="text-left p-2 text-muted-foreground font-medium">Subject</th><th className="text-center p-2 text-muted-foreground font-medium">Critical Thinking</th><th className="text-center p-2 text-muted-foreground font-medium">Problem Solving</th><th className="text-center p-2 text-muted-foreground font-medium">Communication</th><th className="text-center p-2 text-muted-foreground font-medium">Creativity</th><th className="text-center p-2 text-muted-foreground font-medium">Collaboration</th></tr></thead>
                  <tbody>
                    {competencyData.map((r, i) => (
                      <tr key={i} className="border-b border-border hover:bg-muted/30"><td className="p-2 font-medium text-foreground">{r.subject}</td><td className="text-center p-2">{r.criticalThinking}%</td><td className="text-center p-2">{r.problemSolving}%</td><td className="text-center p-2">{r.communication}%</td><td className="text-center p-2">{r.creativity}%</td><td className="text-center p-2">{r.collaboration}%</td></tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={[
                    { skill: 'Critical Thinking', mathematics: 72, science: 78, english: 65 },
                    { skill: 'Problem Solving', mathematics: 68, science: 75, english: 55 },
                    { skill: 'Communication', mathematics: 60, science: 65, english: 85 },
                    { skill: 'Creativity', mathematics: 55, science: 60, english: 70 },
                    { skill: 'Collaboration', mathematics: 70, science: 72, english: 68 },
                  ]}>
                    <PolarGrid stroke={darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'} />
                    <PolarAngleAxis dataKey="skill" tick={{ fontSize: 10 }} stroke={darkMode ? '#94a3b8' : '#64748b'} />
                    <PolarRadiusAxis tick={{ fontSize: 9 }} />
                    <Radar name="Mathematics" dataKey="mathematics" stroke="#1A2D4A" fill="#1A2D4A" fillOpacity={0.15} />
                    <Radar name="Science" dataKey="science" stroke="#22D3EE" fill="#22D3EE" fillOpacity={0.15} />
                    <Radar name="English" dataKey="english" stroke="#C8A45C" fill="#C8A45C" fillOpacity={0.15} />
                    <Legend wrapperStyle={{ fontSize: '11px' }} />
                    <Tooltip contentStyle={tooltipStyle} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </motion.div>
          )}

          {/* Digital Library Usage Report */}
          {showForm === 'rpt_libraryUsage' && (
            <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-5">
              <h3 className="text-base font-semibold text-foreground flex items-center gap-2 mb-1"><Library className="w-4 h-4 text-birla-cyan" />Digital Library Usage Report</h3>
              <p className="text-xs text-muted-foreground mb-3">Resource access patterns and top resources</p>
              <div className="h-64 mb-4">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={digitalLibraryData}>
                    <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'} />
                    <XAxis dataKey="resource" tick={{ fontSize: 9 }} stroke={darkMode ? '#64748b' : '#94a3b8'} />
                    <YAxis tick={{ fontSize: 10 }} stroke={darkMode ? '#64748b' : '#94a3b8'} />
                    <Tooltip contentStyle={tooltipStyle} />
                    <Bar dataKey="access" fill="#22D3EE" radius={[4, 4, 0, 0]} name="Access Count">
                      {digitalLibraryData.map((_, i) => (<Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead><tr className="border-b border-border"><th className="text-left p-2 text-muted-foreground font-medium">Resource</th><th className="text-center p-2 text-muted-foreground font-medium">Type</th><th className="text-center p-2 text-muted-foreground font-medium">Access Count</th></tr></thead>
                  <tbody>
                    {digitalLibraryData.map((r, i) => (
                      <tr key={i} className="border-b border-border hover:bg-muted/30"><td className="p-2 font-medium text-foreground">{r.resource}</td><td className="text-center p-2">{r.type}</td><td className="text-center p-2 font-semibold text-birla-cyan">{r.access}</td></tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}

          {/* Lesson Plan Coverage Report */}
          {showForm === 'rpt_lessonCoverage' && (
            <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-5">
              <h3 className="text-base font-semibold text-foreground flex items-center gap-2 mb-1"><BookOpen className="w-4 h-4 text-emerald-500" />Lesson Plan Coverage Report</h3>
              <p className="text-xs text-muted-foreground mb-3">Subject-wise lesson plan completion status</p>
              <div className="overflow-x-auto mb-4">
                <table className="w-full text-xs">
                  <thead><tr className="border-b border-border"><th className="text-left p-2 text-muted-foreground font-medium">Subject</th><th className="text-center p-2 text-muted-foreground font-medium">Planned</th><th className="text-center p-2 text-muted-foreground font-medium">Completed</th><th className="text-center p-2 text-muted-foreground font-medium">Completion</th></tr></thead>
                  <tbody>
                    {lessonPlanCoverage.map((r, i) => (
                      <tr key={i} className="border-b border-border hover:bg-muted/30">
                        <td className="p-2 font-medium text-foreground">{r.subject}</td>
                        <td className="text-center p-2">{r.planned}</td>
                        <td className="text-center p-2">{r.completed}</td>
                        <td className="text-center p-2">
                          <div className="flex items-center gap-2">
                            <div className="flex-1 bg-muted rounded-full h-2"><div className="bg-emerald-500 h-2 rounded-full" style={{ width: r.pct + '%' }} /></div>
                            <span className="font-semibold w-10 text-right">{r.pct}%</span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={lessonPlanCoverage}>
                    <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'} />
                    <XAxis dataKey="subject" tick={{ fontSize: 9 }} stroke={darkMode ? '#64748b' : '#94a3b8'} />
                    <YAxis tick={{ fontSize: 10 }} stroke={darkMode ? '#64748b' : '#94a3b8'} />
                    <Tooltip contentStyle={tooltipStyle} />
                    <Legend iconType="circle" wrapperStyle={{ fontSize: '11px' }} />
                    <Bar dataKey="planned" fill="#C8A45C" radius={[4, 4, 0, 0]} name="Planned" />
                    <Bar dataKey="completed" fill="#10B981" radius={[4, 4, 0, 0]} name="Completed" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </motion.div>
          )}

          {/* Student Progress Report */}
          {showForm === 'rpt_studentProgress' && (
            <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-5">
              <h3 className="text-base font-semibold text-foreground flex items-center gap-2 mb-1"><Users className="w-4 h-4 text-birla-cyan" />Student Progress Report</h3>
              <p className="text-xs text-muted-foreground mb-3">Individual student performance with UDISE+ identifiers</p>
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead><tr className="border-b border-border"><th className="text-left p-2 text-muted-foreground font-medium">Name</th><th className="text-center p-2 text-muted-foreground font-medium">BSP ID</th><th className="text-center p-2 text-muted-foreground font-medium">PEN No</th><th className="text-center p-2 text-muted-foreground font-medium">Uppar ID</th><th className="text-center p-2 text-muted-foreground font-medium">Math</th><th className="text-center p-2 text-muted-foreground font-medium">Science</th><th className="text-center p-2 text-muted-foreground font-medium">English</th><th className="text-center p-2 text-muted-foreground font-medium">Hindi</th><th className="text-center p-2 text-muted-foreground font-medium">SST</th><th className="text-center p-2 text-muted-foreground font-medium">Avg</th></tr></thead>
                  <tbody>
                    {studentProgressData.map((r, i) => (
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
              <div className="h-64 mt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={studentProgressData}>
                    <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'} />
                    <XAxis dataKey="name" tick={{ fontSize: 9 }} stroke={darkMode ? '#64748b' : '#94a3b8'} />
                    <YAxis tick={{ fontSize: 10 }} stroke={darkMode ? '#64748b' : '#94a3b8'} />
                    <Tooltip contentStyle={tooltipStyle} />
                    <Legend iconType="circle" wrapperStyle={{ fontSize: '10px' }} />
                    <Bar dataKey="math" fill="#1A2D4A" name="Math" />
                    <Bar dataKey="science" fill="#22D3EE" name="Science" />
                    <Bar dataKey="english" fill="#C8A45C" name="English" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </motion.div>
          )}

          {/* Experiential Learning Report */}
          {showForm === 'rpt_experiential' && (
            <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-5">
              <h3 className="text-base font-semibold text-foreground flex items-center gap-2 mb-1"><FlaskConical className="w-4 h-4 text-emerald-500" />Experiential Learning Report</h3>
              <p className="text-xs text-muted-foreground mb-3">Activity status and completion overview</p>
              <div className="overflow-x-auto mb-4">
                <table className="w-full text-xs">
                  <thead><tr className="border-b border-border"><th className="text-left p-2 text-muted-foreground font-medium">Title</th><th className="text-center p-2 text-muted-foreground font-medium">Type</th><th className="text-center p-2 text-muted-foreground font-medium">Status</th><th className="text-center p-2 text-muted-foreground font-medium">Students</th></tr></thead>
                  <tbody>
                    {experientialData.map((r, i) => (
                      <tr key={i} className="border-b border-border hover:bg-muted/30">
                        <td className="p-2 font-medium text-foreground">{r.title}</td>
                        <td className="text-center p-2">{r.type}</td>
                        <td className="text-center p-2"><span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${r.status === 'Completed' ? 'bg-emerald-500/10 text-emerald-500' : r.status === 'In Progress' ? 'bg-blue-500/10 text-blue-500' : 'bg-amber-500/10 text-amber-500'}`}>{r.status}</span></td>
                        <td className="text-center p-2">{r.students}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={experientialPieData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} dataKey="value" label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                      {experientialPieData.map((entry, i) => (<Cell key={i} fill={entry.fill} />))}
                    </Pie>
                    <Tooltip contentStyle={tooltipStyle} />
                    <Legend wrapperStyle={{ fontSize: '11px' }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </motion.div>
          )}
        </div>
      )}
    </motion.div>
  )
}
