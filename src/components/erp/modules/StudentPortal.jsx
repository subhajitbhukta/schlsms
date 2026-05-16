'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  UserCheck, ClipboardList, FileQuestion, MessageSquare, StickyNote,
  Trophy, Calendar, BarChart3, TrendingUp, Brain, Target,
  Plus, X, Clock, Award, ArrowUpRight, BookOpen, Sparkles,
  Palette, Zap, Activity, Send, CheckCircle2, Star, Shield,
  FileText, PieChart as PieChartIcon, GraduationCap, AlertCircle,
  Upload, PenLine, Heart, Megaphone
} from 'lucide-react'
import {
  BarChart, Bar, AreaChart, Area, RadarChart, Radar, PolarGrid,
  PolarAngleAxis, PolarRadiusAxis, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Legend, PieChart, Pie, Cell, LineChart, Line
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

const CHART_COLORS = ['#1A2D4A', '#22D3EE', '#C8A45C', '#8B5CF6', '#10B981', '#EF4444']

const currentStudent = {
  name: 'Aarav Sharma', class: 'X', section: 'A', rollNo: '01',
  bspId: 'BSP/WB/2023/00001', penNo: 'PEN-1234-5678', upparId: 'UPPR-WB-000001'
}

const subjects = ['Mathematics', 'Science', 'English', 'Hindi', 'Social Science', 'Computer Science']
const activities = ['Basketball', 'Debate Club', 'Science Olympiad', 'Art Exhibition', 'Music Band', 'Cricket', 'Robotics Club', 'Math Quiz']

const performanceTrendData = [
  { term: 'Term 1', Mathematics: 72, Science: 68, English: 75, Hindi: 65, Social: 70 },
  { term: 'Term 2', Mathematics: 76, Science: 72, English: 78, Hindi: 68, Social: 73 },
  { term: 'Term 3', Mathematics: 80, Science: 76, English: 82, Hindi: 72, Social: 76 },
  { term: 'Term 4', Mathematics: 84, Science: 80, English: 85, Hindi: 75, Social: 79 },
]

const attendanceMonthlyData = [
  { month: 'Apr', present: 22, absent: 2, late: 1 },
  { month: 'May', present: 20, absent: 3, late: 1 },
  { month: 'Jun', present: 18, absent: 1, late: 2 },
  { month: 'Jul', present: 21, absent: 2, late: 1 },
  { month: 'Aug', present: 23, absent: 1, late: 0 },
  { month: 'Sep', present: 19, absent: 3, late: 2 },
  { month: 'Oct', present: 22, absent: 2, late: 1 },
  { month: 'Nov', present: 20, absent: 1, late: 1 },
  { month: 'Dec', present: 18, absent: 2, late: 0 },
  { month: 'Jan', present: 22, absent: 1, late: 1 },
  { month: 'Feb', present: 21, absent: 2, late: 1 },
  { month: 'Mar', present: 20, absent: 3, late: 1 },
]

const subjectScoresData = [
  { subject: 'Mathematics', score: 84, classAvg: 72 },
  { subject: 'Science', score: 80, classAvg: 68 },
  { subject: 'English', score: 85, classAvg: 74 },
  { subject: 'Hindi', score: 75, classAvg: 70 },
  { subject: 'Social Science', score: 79, classAvg: 71 },
  { subject: 'Computer', score: 92, classAvg: 76 },
]

const homeworkCompletionData = [
  { subject: 'Mathematics', total: 15, completed: 14, rate: 93 },
  { subject: 'Science', total: 12, completed: 10, rate: 83 },
  { subject: 'English', total: 14, completed: 13, rate: 93 },
  { subject: 'Hindi', total: 10, completed: 8, rate: 80 },
  { subject: 'Social Science', total: 11, completed: 10, rate: 91 },
  { subject: 'Computer', total: 8, completed: 8, rate: 100 },
]

const skillBadgeData = [
  { name: 'Problem Solver', category: 'Academic', earned: true, date: '15 Jan 2026' },
  { name: 'Science Wizard', category: 'Academic', earned: true, date: '20 Feb 2026' },
  { name: 'Book Worm', category: 'Academic', earned: true, date: '10 Mar 2026' },
  { name: 'Team Player', category: 'Sports', earned: true, date: '05 Jan 2026' },
  { name: 'Creative Mind', category: 'Arts', earned: true, date: '18 Feb 2026' },
  { name: 'Tech Genius', category: 'Academic', earned: true, date: '25 Mar 2026' },
  { name: 'Leadership', category: 'Sports', earned: false, date: '' },
  { name: 'Public Speaker', category: 'Arts', earned: false, date: '' },
]

const skillBadgePieData = [
  { name: 'Academic', value: 4, color: '#22D3EE' },
  { name: 'Sports', value: 1, color: '#10B981' },
  { name: 'Arts', value: 1, color: '#C8A45C' },
  { name: 'Pending', value: 2, color: '#94a3b8' },
]

const examScoreData = [
  { exam: 'Unit Test 1', score: 78, classAvg: 70, max: 100 },
  { exam: 'Periodic 1', score: 82, classAvg: 72, max: 100 },
  { exam: 'Half Yearly', score: 76, classAvg: 68, max: 100 },
  { exam: 'Unit Test 2', score: 85, classAvg: 74, max: 100 },
  { exam: 'Periodic 2', score: 88, classAvg: 75, max: 100 },
  { exam: 'Annual', score: 84, classAvg: 73, max: 100 },
]

const timetableData = [
  { day: 'Monday', periods: [
    { time: '8:00-8:45', subject: 'Mathematics', teacher: 'Dr. Priya Menon', room: 'Room 101' },
    { time: '8:45-9:30', subject: 'English', teacher: 'Ms. Anita Desai', room: 'Room 101' },
    { time: '9:30-10:15', subject: 'Science', teacher: 'Mr. Suresh Patel', room: 'Lab 3' },
    { time: '10:15-10:30', subject: 'Break', teacher: '', room: '' },
    { time: '10:30-11:15', subject: 'Hindi', teacher: 'Mrs. Kavita Sharma', room: 'Room 101' },
    { time: '11:15-12:00', subject: 'Social Science', teacher: 'Mr. Rajesh Kumar', room: 'Room 101' },
    { time: '12:00-12:45', subject: 'Computer', teacher: 'Ms. Ritu Singh', room: 'Lab 1' },
    { time: '12:45-1:30', subject: 'Lunch', teacher: '', room: '' },
    { time: '1:30-2:15', subject: 'PT', teacher: 'Mr. Vikram Roy', room: 'Ground' },
    { time: '2:15-3:00', subject: 'Art', teacher: 'Ms. Priti Jain', room: 'Art Room' },
  ]},
  { day: 'Tuesday', periods: [
    { time: '8:00-8:45', subject: 'English', teacher: 'Ms. Anita Desai', room: 'Room 101' },
    { time: '8:45-9:30', subject: 'Mathematics', teacher: 'Dr. Priya Menon', room: 'Room 101' },
    { time: '9:30-10:15', subject: 'Hindi', teacher: 'Mrs. Kavita Sharma', room: 'Room 101' },
    { time: '10:15-10:30', subject: 'Break', teacher: '', room: '' },
    { time: '10:30-11:15', subject: 'Science', teacher: 'Mr. Suresh Patel', room: 'Lab 3' },
    { time: '11:15-12:00', subject: 'Social Science', teacher: 'Mr. Rajesh Kumar', room: 'Room 101' },
    { time: '12:00-12:45', subject: 'Music', teacher: 'Ms. Alka Nair', room: 'Music Room' },
    { time: '12:45-1:30', subject: 'Lunch', teacher: '', room: '' },
    { time: '1:30-2:15', subject: 'Mathematics Lab', teacher: 'Dr. Priya Menon', room: 'Math Lab' },
    { time: '2:15-3:00', subject: 'Library', teacher: 'Mrs. Meera Iyer', room: 'Library' },
  ]},
  { day: 'Wednesday', periods: [
    { time: '8:00-8:45', subject: 'Science', teacher: 'Mr. Suresh Patel', room: 'Lab 3' },
    { time: '8:45-9:30', subject: 'Hindi', teacher: 'Mrs. Kavita Sharma', room: 'Room 101' },
    { time: '9:30-10:15', subject: 'Mathematics', teacher: 'Dr. Priya Menon', room: 'Room 101' },
    { time: '10:15-10:30', subject: 'Break', teacher: '', room: '' },
    { time: '10:30-11:15', subject: 'English', teacher: 'Ms. Anita Desai', room: 'Room 101' },
    { time: '11:15-12:00', subject: 'Computer', teacher: 'Ms. Ritu Singh', room: 'Lab 1' },
    { time: '12:00-12:45', subject: 'Social Science', teacher: 'Mr. Rajesh Kumar', room: 'Room 101' },
    { time: '12:45-1:30', subject: 'Lunch', teacher: '', room: '' },
    { time: '1:30-2:15', subject: 'Yoga', teacher: 'Mr. Vikram Roy', room: 'Hall' },
    { time: '2:15-3:00', subject: 'Science Lab', teacher: 'Mr. Suresh Patel', room: 'Lab 3' },
  ]},
  { day: 'Thursday', periods: [
    { time: '8:00-8:45', subject: 'Social Science', teacher: 'Mr. Rajesh Kumar', room: 'Room 101' },
    { time: '8:45-9:30', subject: 'Science', teacher: 'Mr. Suresh Patel', room: 'Lab 3' },
    { time: '9:30-10:15', subject: 'English', teacher: 'Ms. Anita Desai', room: 'Room 101' },
    { time: '10:15-10:30', subject: 'Break', teacher: '', room: '' },
    { time: '10:30-11:15', subject: 'Hindi', teacher: 'Mrs. Kavita Sharma', room: 'Room 101' },
    { time: '11:15-12:00', subject: 'Mathematics', teacher: 'Dr. Priya Menon', room: 'Room 101' },
    { time: '12:00-12:45', subject: 'Art', teacher: 'Ms. Priti Jain', room: 'Art Room' },
    { time: '12:45-1:30', subject: 'Lunch', teacher: '', room: '' },
    { time: '1:30-2:15', subject: 'PT', teacher: 'Mr. Vikram Roy', room: 'Ground' },
    { time: '2:15-3:00', subject: 'English Lab', teacher: 'Ms. Anita Desai', room: 'Lang Lab' },
  ]},
  { day: 'Friday', periods: [
    { time: '8:00-8:45', subject: 'Hindi', teacher: 'Mrs. Kavita Sharma', room: 'Room 101' },
    { time: '8:45-9:30', subject: 'Mathematics', teacher: 'Dr. Priya Menon', room: 'Room 101' },
    { time: '9:30-10:15', subject: 'Social Science', teacher: 'Mr. Rajesh Kumar', room: 'Room 101' },
    { time: '10:15-10:30', subject: 'Break', teacher: '', room: '' },
    { time: '10:30-11:15', subject: 'Science', teacher: 'Mr. Suresh Patel', room: 'Lab 3' },
    { time: '11:15-12:00', subject: 'Computer', teacher: 'Ms. Ritu Singh', room: 'Lab 1' },
    { time: '12:00-12:45', subject: 'English', teacher: 'Ms. Anita Desai', room: 'Room 101' },
    { time: '12:45-1:30', subject: 'Lunch', teacher: '', room: '' },
    { time: '1:30-2:15', subject: 'Club Activity', teacher: '', room: 'Various' },
    { time: '2:15-3:00', subject: 'Assembly', teacher: '', room: 'Auditorium' },
  ]},
]

const homeworkList = [
  { id: 1, subject: 'Mathematics', title: 'Quadratic Equations - Exercise 5.3', dueDate: '2026-03-20', status: 'Pending', teacher: 'Dr. Priya Menon' },
  { id: 2, subject: 'Science', title: 'Light Reflection - Diagrams', dueDate: '2026-03-19', status: 'Submitted', teacher: 'Mr. Suresh Patel' },
  { id: 3, subject: 'English', title: 'Essay: My Vision for India 2030', dueDate: '2026-03-21', status: 'Pending', teacher: 'Ms. Anita Desai' },
  { id: 4, subject: 'Hindi', title: 'पद्यांश की व्याख्या', dueDate: '2026-03-18', status: 'Graded', teacher: 'Mrs. Kavita Sharma', grade: 'A' },
  { id: 5, subject: 'Social Science', title: 'Map Work - Indian Rivers', dueDate: '2026-03-22', status: 'Pending', teacher: 'Mr. Rajesh Kumar' },
  { id: 6, subject: 'Computer', title: 'Python Program - Sorting', dueDate: '2026-03-20', status: 'Submitted', teacher: 'Ms. Ritu Singh' },
]

const achievementsData = [
  { title: 'Science Olympiad - District Level', type: 'Academic', date: '15 Feb 2026', badge: '🥈', level: 'District' },
  { title: 'Inter-School Debate Winner', type: 'Co-Curricular', date: '28 Jan 2026', badge: '🥇', level: 'Inter-School' },
  { title: 'Best Coder Award - CodeFest', type: 'Academic', date: '10 Mar 2026', badge: '🏆', level: 'School' },
  { title: 'Cricket Tournament - Runner Up', type: 'Sports', date: '05 Mar 2026', badge: '🥈', level: 'Zonal' },
  { title: 'Art Exhibition - Special Mention', type: 'Arts', date: '20 Feb 2026', badge: '🌟', level: 'School' },
  { title: '100% Attendance - Term 1', type: 'Attendance', date: 'Dec 2025', badge: '✅', level: 'School' },
]

const examPrepData = [
  { subject: 'Mathematics', chapters: 8, completed: 6, nextExam: 'Periodic Test 3', date: '25 Mar 2026' },
  { subject: 'Science', chapters: 10, completed: 7, nextExam: 'Periodic Test 3', date: '26 Mar 2026' },
  { subject: 'English', chapters: 6, completed: 5, nextExam: 'Periodic Test 3', date: '27 Mar 2026' },
  { subject: 'Hindi', chapters: 7, completed: 5, nextExam: 'Periodic Test 3', date: '28 Mar 2026' },
  { subject: 'Social Science', chapters: 9, completed: 6, nextExam: 'Periodic Test 3', date: '29 Mar 2026' },
]

export default function StudentPortal() {
  const { darkMode } = useAppStore()
  const [activeTab, setActiveTab] = useState('overview')
  const [showForm, setShowForm] = useState(null)
  const [selectedDay, setSelectedDay] = useState('Monday')

  const [homeworkSubForm, setHomeworkSubForm] = useState({
    assignment: '', subject: '', description: '', fileUpload: false, submissionNotes: ''
  })
  const [leaveForm, setLeaveForm] = useState({
    leaveType: 'Casual', fromDate: '', toDate: '', reason: '', parentConsent: false
  })
  const [grievanceForm, setGrievanceForm] = useState({
    category: 'Academic', description: '', priority: 'Medium', preferredResolution: ''
  })
  const [activityRegForm, setActivityRegForm] = useState({
    activity: '', parentApproval: false, medicalFitness: false, emergencyContact: ''
  })
  const [digitalNoteForm, setDigitalNoteForm] = useState({
    subject: '', title: '', content: '', tags: '', isPublic: false
  })

  const tooltipStyle = {
    backgroundColor: darkMode ? '#1A2D4A' : '#fff',
    border: '1px solid ' + (darkMode ? 'rgba(255,255,255,0.1)' : '#e2e8f0'),
    borderRadius: '12px', fontSize: '12px', color: darkMode ? '#e2e8f0' : '#1e293b'
  }

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'timetable', label: 'Timetable', icon: Calendar },
    { id: 'homework', label: 'Homework', icon: ClipboardList },
    { id: 'performance', label: 'Performance', icon: TrendingUp },
    { id: 'achievements', label: 'Achievements', icon: Trophy },
    { id: 'exam-prep', label: 'Exam Prep', icon: GraduationCap },
    { id: 'forms', label: 'Forms', icon: FileText },
    { id: 'reports', label: 'Reports', icon: Activity },
  ]

  const forms = [
    { id: 'homeworkSub', label: 'Homework Submission', icon: ClipboardList },
    { id: 'leaveApp', label: 'Leave Application', icon: Calendar },
    { id: 'grievance', label: 'Grievance', icon: AlertCircle },
    { id: 'activityReg', label: 'Activity Registration', icon: Trophy },
    { id: 'digitalNote', label: 'Digital Note', icon: StickyNote },
  ]

  const handleSubmit = (formType) => {
    alert(`${formType} submitted successfully!`)
    setShowForm(null)
  }

  const inputClass = `w-full px-3 py-2 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-birla-cyan/30`
  const labelClass = 'block text-xs font-medium text-muted-foreground mb-1'

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="show" className="p-4 lg:p-6 space-y-6 max-w-[1600px] mx-auto">
      {/* Header */}
      <motion.div variants={itemVariants} className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <UserCheck className="w-7 h-7 text-birla-cyan" />Student Portal
          </h1>
          <p className="text-sm text-muted-foreground mt-1">Welcome, {currentStudent.name} &bull; Class {currentStudent.class}-{currentStudent.section}</p>
          <div className="flex flex-wrap gap-2 mt-2">
            <span className="px-2 py-0.5 rounded-lg bg-birla-blue/10 text-birla-blue dark:text-birla-cyan text-[10px] font-mono font-medium">BSP: {currentStudent.bspId}</span>
            <span className="px-2 py-0.5 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[10px] font-mono font-medium">PEN: {currentStudent.penNo}</span>
            <span className="px-2 py-0.5 rounded-lg bg-purple-500/10 text-purple-600 dark:text-purple-400 text-[10px] font-mono font-medium">UPPR: {currentStudent.upparId}</span>
          </div>
        </div>
        <div className="flex gap-1 p-1 rounded-xl bg-muted/50 border border-border overflow-x-auto">
          {tabs.map((tab) => {
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
      <motion.div variants={itemVariants} className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Overall Score', value: '82%', change: '+5.2%', icon: TrendingUp, color: 'from-blue-900 to-blue-700' },
          { label: 'Attendance', value: '93%', change: '+1.8%', icon: Calendar, color: 'from-emerald-800 to-emerald-600' },
          { label: 'Assignments Done', value: '55/62', change: '+4', icon: ClipboardList, color: 'from-amber-800 to-amber-600' },
          { label: 'Skills Achieved', value: '6/8', change: '+2', icon: Target, color: 'from-purple-800 to-purple-600' },
        ].map((card) => {
          const Icon = card.icon
          return (
            <div key={card.label} className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${card.color} p-4 text-white shadow-xl`}>
              <div className="absolute top-0 right-0 w-20 h-20 rounded-full bg-white/5 -translate-y-6 translate-x-6" />
              <div className="flex items-center justify-between mb-2">
                <div className="w-9 h-9 rounded-xl bg-white/15 backdrop-blur-sm flex items-center justify-center"><Icon className="w-4 h-4" /></div>
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

      {/* ====== OVERVIEW TAB ====== */}
      {activeTab === 'overview' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-5">
              <h3 className="text-base font-semibold text-foreground flex items-center gap-2 mb-1">
                <TrendingUp className="w-4 h-4 text-birla-cyan" />Performance Trend
              </h3>
              <p className="text-xs text-muted-foreground mb-3">Progress across terms</p>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={performanceTrendData}>
                    <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'} />
                    <XAxis dataKey="term" tick={{ fontSize: 10 }} stroke={darkMode ? '#64748b' : '#94a3b8'} />
                    <YAxis tick={{ fontSize: 10 }} stroke={darkMode ? '#64748b' : '#94a3b8'} domain={[50, 100]} />
                    <Tooltip contentStyle={tooltipStyle} />
                    <Legend iconType="circle" wrapperStyle={{ fontSize: '11px' }} />
                    <Area type="monotone" dataKey="Mathematics" stroke="#1A2D4A" fill="rgba(26,45,74,0.12)" strokeWidth={2} />
                    <Area type="monotone" dataKey="Science" stroke="#22D3EE" fill="rgba(34,211,238,0.08)" strokeWidth={2} />
                    <Area type="monotone" dataKey="English" stroke="#C8A45C" fill="rgba(200,164,92,0.08)" strokeWidth={2} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </motion.div>
            <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-5">
              <h3 className="text-base font-semibold text-foreground flex items-center gap-2 mb-1">
                <Target className="w-4 h-4 text-birla-gold" />Subject Scores
              </h3>
              <p className="text-xs text-muted-foreground mb-3">Your score vs class average</p>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={subjectScoresData}>
                    <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'} />
                    <XAxis dataKey="subject" tick={{ fontSize: 9 }} stroke={darkMode ? '#64748b' : '#94a3b8'} />
                    <YAxis tick={{ fontSize: 10 }} stroke={darkMode ? '#64748b' : '#94a3b8'} domain={[0, 100]} />
                    <Tooltip contentStyle={tooltipStyle} />
                    <Legend iconType="circle" wrapperStyle={{ fontSize: '11px' }} />
                    <Bar dataKey="score" fill="#22D3EE" radius={[4,4,0,0]} name="My Score" />
                    <Bar dataKey="classAvg" fill="#C8A45C" radius={[4,4,0,0]} name="Class Avg" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </motion.div>
          </div>
          <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-5">
            <h3 className="text-base font-semibold text-foreground flex items-center gap-2 mb-3">
              <ClipboardList className="w-4 h-4 text-birla-gold" />Recent Homework
            </h3>
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {homeworkList.slice(0, 4).map(hw => (
                <div key={hw.id} className="flex items-center justify-between p-3 rounded-xl border border-border bg-muted/20">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">{hw.title}</p>
                    <p className="text-xs text-muted-foreground">{hw.subject} &bull; Due: {hw.dueDate}</p>
                  </div>
                  <span className={`px-2 py-1 rounded-lg text-[10px] font-medium ${hw.status === 'Graded' ? 'bg-emerald-500/10 text-emerald-600' : hw.status === 'Submitted' ? 'bg-blue-500/10 text-blue-600' : 'bg-amber-500/10 text-amber-600'}`}>{hw.status}{hw.grade && ` - ${hw.grade}`}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      )}

      {/* ====== TIMETABLE TAB ====== */}
      {activeTab === 'timetable' && (
        <motion.div variants={itemVariants} className="space-y-4">
          <div className="flex gap-2 overflow-x-auto pb-2">
            {timetableData.map(d => (
              <button key={d.day} onClick={() => setSelectedDay(d.day)}
                className={`px-4 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${selectedDay === d.day ? 'gradient-birla text-white shadow-md' : 'border border-border text-muted-foreground hover:bg-muted'}`}>
                {d.day}
              </button>
            ))}
          </div>
          <div className="rounded-2xl border border-border bg-card p-5">
            <h3 className="text-base font-semibold text-foreground mb-4 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-birla-cyan" />{selectedDay}&apos;s Timetable - Class {currentStudent.class}-{currentStudent.section}
            </h3>
            <div className="space-y-2">
              {timetableData.find(d => d.day === selectedDay)?.periods.map((p, i) => (
                <div key={i} className={`flex items-center gap-4 p-3 rounded-xl ${p.subject === 'Break' || p.subject === 'Lunch' ? 'bg-muted/30 border border-dashed border-border' : 'border border-border bg-card'}`}>
                  <span className="text-xs font-mono text-muted-foreground w-20 shrink-0">{p.time}</span>
                  <span className={`text-sm font-medium ${p.subject === 'Break' || p.subject === 'Lunch' ? 'text-muted-foreground italic' : 'text-foreground'}`}>{p.subject}</span>
                  {p.teacher && <span className="text-xs text-muted-foreground ml-auto hidden sm:block">{p.teacher}</span>}
                  {p.room && <span className="text-[10px] px-2 py-0.5 rounded-lg bg-birla-cyan/10 text-birla-cyan hidden sm:block">{p.room}</span>}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* ====== HOMEWORK TAB ====== */}
      {activeTab === 'homework' && (
        <motion.div variants={itemVariants} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="rounded-2xl border border-border bg-card p-4 text-center">
              <p className="text-2xl font-bold text-foreground">{homeworkList.length}</p>
              <p className="text-xs text-muted-foreground">Total Assigned</p>
            </div>
            <div className="rounded-2xl border border-border bg-card p-4 text-center">
              <p className="text-2xl font-bold text-emerald-600">{homeworkList.filter(h => h.status === 'Submitted' || h.status === 'Graded').length}</p>
              <p className="text-xs text-muted-foreground">Completed</p>
            </div>
            <div className="rounded-2xl border border-border bg-card p-4 text-center">
              <p className="text-2xl font-bold text-amber-600">{homeworkList.filter(h => h.status === 'Pending').length}</p>
              <p className="text-xs text-muted-foreground">Pending</p>
            </div>
          </div>
          <div className="rounded-2xl border border-border bg-card p-5">
            <h3 className="text-base font-semibold text-foreground mb-3 flex items-center gap-2">
              <ClipboardList className="w-4 h-4 text-birla-cyan" />All Homework
            </h3>
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {homeworkList.map(hw => (
                <div key={hw.id} className="flex items-center justify-between p-3 rounded-xl border border-border bg-muted/20 hover:bg-muted/40 transition-colors">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground">{hw.title}</p>
                    <p className="text-xs text-muted-foreground">{hw.subject} &bull; {hw.teacher} &bull; Due: {hw.dueDate}</p>
                  </div>
                  <span className={`px-2 py-1 rounded-lg text-[10px] font-medium shrink-0 ${hw.status === 'Graded' ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' : hw.status === 'Submitted' ? 'bg-blue-500/10 text-blue-600 dark:text-blue-400' : 'bg-amber-500/10 text-amber-600 dark:text-amber-400'}`}>{hw.status}{hw.grade && ` - ${hw.grade}`}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* ====== PERFORMANCE TAB ====== */}
      {activeTab === 'performance' && (
        <motion.div variants={itemVariants} className="space-y-4">
          <div className="rounded-2xl border border-border bg-card p-5">
            <div className="flex items-center gap-2 mb-1">
              <Shield className="w-4 h-4 text-birla-blue dark:text-birla-cyan" />
              <span className="text-xs font-mono text-muted-foreground">BSP: {currentStudent.bspId} | PEN: {currentStudent.penNo} | UPPR: {currentStudent.upparId}</span>
            </div>
            <h3 className="text-base font-semibold text-foreground mb-3 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-birla-cyan" />Subject-wise Performance
            </h3>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={subjectScoresData}>
                  <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'} />
                  <XAxis dataKey="subject" tick={{ fontSize: 10 }} stroke={darkMode ? '#64748b' : '#94a3b8'} />
                  <YAxis tick={{ fontSize: 10 }} stroke={darkMode ? '#64748b' : '#94a3b8'} domain={[0, 100]} />
                  <Tooltip contentStyle={tooltipStyle} />
                  <Legend iconType="circle" wrapperStyle={{ fontSize: '11px' }} />
                  <Bar dataKey="score" fill="#22D3EE" radius={[4,4,0,0]} name="My Score" />
                  <Bar dataKey="classAvg" fill="#C8A45C" radius={[4,4,0,0]} name="Class Avg" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="rounded-2xl border border-border bg-card p-5">
            <h3 className="text-base font-semibold text-foreground mb-3 flex items-center gap-2">
              <Brain className="w-4 h-4 text-purple-500" />NEP Competency Progress
            </h3>
            <div className="space-y-3 max-h-72 overflow-y-auto">
              {[
                { competency: 'Critical Thinking', progress: 78, nep: 'NEP 2.4' },
                { competency: 'Communication', progress: 85, nep: 'NEP 2.5' },
                { competency: 'Collaboration', progress: 72, nep: 'NEP 2.6' },
                { competency: 'Creativity', progress: 68, nep: 'NEP 3.1' },
                { competency: 'Digital Literacy', progress: 90, nep: 'NEP 4.2' },
                { competency: 'Scientific Temper', progress: 75, nep: 'NEP 4.5' },
              ].map(item => (
                <div key={item.competency}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-muted-foreground">{item.competency}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] text-birla-gold">{item.nep}</span>
                      <span className="text-xs font-semibold text-foreground">{item.progress}%</span>
                    </div>
                  </div>
                  <div className="h-2 rounded-full bg-muted overflow-hidden">
                    <div className="h-full rounded-full transition-all" style={{ width: `${item.progress}%`, background: item.progress >= 80 ? 'linear-gradient(90deg, #10B981, #22D3EE)' : item.progress >= 65 ? 'linear-gradient(90deg, #C8A45C, #E8D5A0)' : 'linear-gradient(90deg, #EF4444, #F59E0B)' }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* ====== ACHIEVEMENTS TAB ====== */}
      {activeTab === 'achievements' && (
        <motion.div variants={itemVariants} className="space-y-4">
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
            {[
              { label: 'Total Achievements', value: achievementsData.length, icon: Trophy, color: 'text-birla-gold bg-birla-gold/10' },
              { label: 'Skill Badges', value: skillBadgeData.filter(b => b.earned).length, icon: Award, color: 'text-birla-cyan bg-birla-cyan/10' },
              { label: 'Competitions', value: '4', icon: Star, color: 'text-purple-500 bg-purple-500/10' },
            ].map(stat => {
              const Icon = stat.icon
              return (
                <div key={stat.label} className="rounded-2xl border border-border bg-card p-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${stat.color} mb-2`}><Icon className="w-5 h-5" /></div>
                  <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                  <p className="text-[10px] text-muted-foreground">{stat.label}</p>
                </div>
              )
            })}
          </div>
          <div className="rounded-2xl border border-border bg-card p-5">
            <h3 className="text-base font-semibold text-foreground mb-3 flex items-center gap-2">
              <Trophy className="w-4 h-4 text-birla-gold" />My Achievements
            </h3>
            <div className="space-y-2 max-h-80 overflow-y-auto">
              {achievementsData.map((a, i) => (
                <div key={i} className="flex items-center gap-3 p-3 rounded-xl border border-border bg-muted/20">
                  <span className="text-2xl">{a.badge}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground">{a.title}</p>
                    <p className="text-xs text-muted-foreground">{a.type} &bull; {a.level} &bull; {a.date}</p>
                  </div>
                  <span className="px-2 py-0.5 rounded-lg bg-birla-gold/10 text-birla-gold text-[10px] font-medium">{a.level}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-2xl border border-border bg-card p-5">
            <h3 className="text-base font-semibold text-foreground mb-3 flex items-center gap-2">
              <Award className="w-4 h-4 text-birla-cyan" />Skill Badges
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {skillBadgeData.map((b, i) => (
                <div key={i} className={`p-3 rounded-xl border text-center transition-all ${b.earned ? 'border-birla-gold/30 bg-birla-gold/5' : 'border-border bg-muted/20 opacity-50'}`}>
                  <div className={`w-12 h-12 rounded-full mx-auto mb-2 flex items-center justify-center ${b.earned ? 'gradient-birla-gold text-white' : 'bg-muted text-muted-foreground'}`}>
                    <Award className="w-6 h-6" />
                  </div>
                  <p className="text-xs font-medium text-foreground">{b.name}</p>
                  <p className="text-[10px] text-muted-foreground">{b.earned ? b.date : 'Locked'}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* ====== EXAM PREP TAB ====== */}
      {activeTab === 'exam-prep' && (
        <motion.div variants={itemVariants} className="space-y-4">
          <div className="rounded-2xl border border-border bg-card p-5">
            <h3 className="text-base font-semibold text-foreground mb-3 flex items-center gap-2">
              <GraduationCap className="w-4 h-4 text-birla-cyan" />Exam Preparation Status
            </h3>
            <div className="space-y-3">
              {examPrepData.map(ep => (
                <div key={ep.subject} className="p-3 rounded-xl border border-border bg-muted/20">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-foreground">{ep.subject}</span>
                    <span className="text-[10px] text-muted-foreground">Next: {ep.nextExam} ({ep.date})</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[10px] text-muted-foreground">Chapters Covered</span>
                        <span className="text-xs font-semibold text-foreground">{ep.completed}/{ep.chapters}</span>
                      </div>
                      <div className="h-2 rounded-full bg-muted overflow-hidden">
                        <div className="h-full rounded-full gradient-birla-cyan" style={{ width: `${(ep.completed / ep.chapters) * 100}%` }} />
                      </div>
                    </div>
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-lg ${(ep.completed / ep.chapters) >= 0.8 ? 'bg-emerald-500/10 text-emerald-600' : (ep.completed / ep.chapters) >= 0.5 ? 'bg-amber-500/10 text-amber-600' : 'bg-red-500/10 text-red-600'}`}>
                      {Math.round((ep.completed / ep.chapters) * 100)}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-2xl border border-border bg-card p-5">
            <h3 className="text-base font-semibold text-foreground mb-3 flex items-center gap-2">
              <Zap className="w-4 h-4 text-birla-gold" />Quick Revision Cards
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-64 overflow-y-auto">
              {[
                { subject: 'Mathematics', topic: 'Quadratic Formula', formula: 'x = (-b ± √(b²-4ac)) / 2a' },
                { subject: 'Science', topic: 'Ohm\'s Law', formula: 'V = IR' },
                { subject: 'English', topic: 'Active-Passive Rule', formula: 'Subject + Verb + Object → Object + be + V3 + by + Subject' },
                { subject: 'Hindi', topic: 'संधि नियम', formula: 'वृद्धि संधि: अ/आ + अ/आ = आ' },
              ].map((card, i) => (
                <div key={i} className="p-3 rounded-xl border border-border bg-muted/20">
                  <p className="text-xs font-medium text-birla-cyan">{card.subject}</p>
                  <p className="text-sm font-medium text-foreground mt-1">{card.topic}</p>
                  <p className="text-xs font-mono text-muted-foreground mt-1 p-2 rounded-lg bg-background">{card.formula}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* ====== FORMS TAB ====== */}
      {activeTab === 'forms' && (
        <div className="space-y-4">
          <motion.div variants={itemVariants} className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            {forms.map((form) => {
              const Icon = form.icon
              return (
                <button key={form.id} onClick={() => setShowForm(form.id)}
                  className={`flex flex-col items-center gap-2 p-4 rounded-2xl border border-border hover:border-birla-gold/30 hover:shadow-lg transition-all group ${showForm === form.id ? 'border-birla-gold/50 shadow-lg bg-birla-gold/5' : ''}`}>
                  <div className="w-10 h-10 rounded-xl bg-birla-blue/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Icon className="w-5 h-5 text-birla-blue dark:text-birla-cyan" />
                  </div>
                  <span className="text-[11px] text-muted-foreground group-hover:text-foreground text-center">{form.label}</span>
                </button>
              )
            })}
          </motion.div>

          {/* Homework Submission Form */}
          {showForm === 'homeworkSub' && (
            <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-semibold text-foreground flex items-center gap-2">
                  <ClipboardList className="w-5 h-5 text-birla-cyan" />Homework Submission Form
                </h3>
                <button onClick={() => setShowForm(null)} className="w-8 h-8 rounded-lg border border-border flex items-center justify-center hover:bg-muted/50"><X className="w-4 h-4" /></button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>Assignment *</label>
                  <select value={homeworkSubForm.assignment} onChange={(e) => setHomeworkSubForm({...homeworkSubForm, assignment: e.target.value})} className={inputClass}>
                    <option value="">Select Assignment</option>
                    <option value="Math Ch 5">Mathematics - Chapter 5 Problems</option>
                    <option value="Science Lab">Science - Lab Report</option>
                    <option value="English Essay">English - Essay Writing</option>
                    <option value="Hindi Compre">Hindi - Comprehension</option>
                    <option value="Social Map">Social Science - Map Work</option>
                    <option value="Computer Python">Computer - Python Program</option>
                  </select>
                </div>
                <div>
                  <label className={labelClass}>Subject *</label>
                  <select value={homeworkSubForm.subject} onChange={(e) => setHomeworkSubForm({...homeworkSubForm, subject: e.target.value})} className={inputClass}>
                    <option value="">Select Subject</option>
                    {subjects.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className={labelClass}>Description</label>
                  <input type="text" value={homeworkSubForm.description} onChange={(e) => setHomeworkSubForm({...homeworkSubForm, description: e.target.value})} className={inputClass} placeholder="Brief description of your submission..." />
                </div>
                <div>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" checked={homeworkSubForm.fileUpload} onChange={(e) => setHomeworkSubForm({...homeworkSubForm, fileUpload: e.target.checked})} className="w-4 h-4 rounded accent-[#C8A45C]" />
                    <span className="text-xs text-muted-foreground">Attach File Upload</span>
                  </label>
                </div>
                {homeworkSubForm.fileUpload && (
                  <div>
                    <label className={labelClass}>Upload File</label>
                    <input type="file" className={inputClass} onChange={() => {}} />
                  </div>
                )}
                <div className="md:col-span-2">
                  <label className={labelClass}>Submission Notes</label>
                  <textarea value={homeworkSubForm.submissionNotes} onChange={(e) => setHomeworkSubForm({...homeworkSubForm, submissionNotes: e.target.value})} rows={3} className={inputClass + ' resize-none'} placeholder="Any notes for the teacher..." />
                </div>
              </div>
              <div className="flex justify-end gap-3 mt-4">
                <button onClick={() => setShowForm(null)} className="px-4 py-2 rounded-xl border border-border text-sm text-muted-foreground hover:bg-muted/50">Cancel</button>
                <button onClick={() => handleSubmit('Homework Submission')} className="px-4 py-2 rounded-xl gradient-birla text-white text-sm font-medium hover:shadow-lg transition-all">Submit Homework</button>
              </div>
            </motion.div>
          )}

          {/* Leave Application Form */}
          {showForm === 'leaveApp' && (
            <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-semibold text-foreground flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-emerald-500" />Leave Application Form
                </h3>
                <button onClick={() => setShowForm(null)} className="w-8 h-8 rounded-lg border border-border flex items-center justify-center hover:bg-muted/50"><X className="w-4 h-4" /></button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>Leave Type *</label>
                  <select value={leaveForm.leaveType} onChange={(e) => setLeaveForm({...leaveForm, leaveType: e.target.value})} className={inputClass}>
                    <option value="Casual">Casual Leave</option>
                    <option value="Sick">Sick Leave</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label className={labelClass}>Student</label>
                  <div className="px-3 py-2 rounded-xl border border-border bg-muted text-foreground text-sm">
                    {currentStudent.name} <span className="text-[10px] text-muted-foreground ml-1">{currentStudent.bspId}</span>
                  </div>
                </div>
                <div>
                  <label className={labelClass}>From Date *</label>
                  <input type="date" value={leaveForm.fromDate} onChange={(e) => setLeaveForm({...leaveForm, fromDate: e.target.value})} className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>To Date *</label>
                  <input type="date" value={leaveForm.toDate} onChange={(e) => setLeaveForm({...leaveForm, toDate: e.target.value})} className={inputClass} />
                </div>
                <div className="md:col-span-2">
                  <label className={labelClass}>Reason *</label>
                  <textarea value={leaveForm.reason} onChange={(e) => setLeaveForm({...leaveForm, reason: e.target.value})} rows={3} className={inputClass + ' resize-none'} placeholder="Reason for leave..." />
                </div>
                <div className="md:col-span-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" checked={leaveForm.parentConsent} onChange={(e) => setLeaveForm({...leaveForm, parentConsent: e.target.checked})} className="w-4 h-4 rounded accent-[#C8A45C]" />
                    <span className="text-xs text-muted-foreground">I have my parent&apos;s consent for this leave</span>
                  </label>
                </div>
              </div>
              <div className="flex justify-end gap-3 mt-4">
                <button onClick={() => setShowForm(null)} className="px-4 py-2 rounded-xl border border-border text-sm text-muted-foreground hover:bg-muted/50">Cancel</button>
                <button onClick={() => handleSubmit('Leave Application')} className="px-4 py-2 rounded-xl gradient-birla text-white text-sm font-medium hover:shadow-lg transition-all">Submit Leave Application</button>
              </div>
            </motion.div>
          )}

          {/* Grievance Form */}
          {showForm === 'grievance' && (
            <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-semibold text-foreground flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-red-500" />Grievance Form
                </h3>
                <button onClick={() => setShowForm(null)} className="w-8 h-8 rounded-lg border border-border flex items-center justify-center hover:bg-muted/50"><X className="w-4 h-4" /></button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>Category *</label>
                  <select value={grievanceForm.category} onChange={(e) => setGrievanceForm({...grievanceForm, category: e.target.value})} className={inputClass}>
                    <option value="Academic">Academic</option>
                    <option value="Infrastructure">Infrastructure</option>
                    <option value="Behavior">Behavior</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label className={labelClass}>Priority *</label>
                  <select value={grievanceForm.priority} onChange={(e) => setGrievanceForm({...grievanceForm, priority: e.target.value})} className={inputClass}>
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                    <option value="Urgent">Urgent</option>
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className={labelClass}>Description *</label>
                  <textarea value={grievanceForm.description} onChange={(e) => setGrievanceForm({...grievanceForm, description: e.target.value})} rows={3} className={inputClass + ' resize-none'} placeholder="Describe your grievance in detail..." />
                </div>
                <div className="md:col-span-2">
                  <label className={labelClass}>Preferred Resolution</label>
                  <textarea value={grievanceForm.preferredResolution} onChange={(e) => setGrievanceForm({...grievanceForm, preferredResolution: e.target.value})} rows={2} className={inputClass + ' resize-none'} placeholder="How would you like this to be resolved?" />
                </div>
              </div>
              <div className="flex justify-end gap-3 mt-4">
                <button onClick={() => setShowForm(null)} className="px-4 py-2 rounded-xl border border-border text-sm text-muted-foreground hover:bg-muted/50">Cancel</button>
                <button onClick={() => handleSubmit('Grievance')} className="px-4 py-2 rounded-xl gradient-birla text-white text-sm font-medium hover:shadow-lg transition-all">Submit Grievance</button>
              </div>
            </motion.div>
          )}

          {/* Activity Registration Form */}
          {showForm === 'activityReg' && (
            <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-semibold text-foreground flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-birla-gold" />Activity Registration Form
                </h3>
                <button onClick={() => setShowForm(null)} className="w-8 h-8 rounded-lg border border-border flex items-center justify-center hover:bg-muted/50"><X className="w-4 h-4" /></button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>Activity *</label>
                  <select value={activityRegForm.activity} onChange={(e) => setActivityRegForm({...activityRegForm, activity: e.target.value})} className={inputClass}>
                    <option value="">Select Activity</option>
                    {activities.map(a => <option key={a} value={a}>{a}</option>)}
                  </select>
                </div>
                <div>
                  <label className={labelClass}>Student</label>
                  <div className="px-3 py-2 rounded-xl border border-border bg-muted text-foreground text-sm">
                    {currentStudent.name} <span className="text-[10px] text-muted-foreground ml-1">BSP: {currentStudent.bspId}</span>
                  </div>
                </div>
                <div>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" checked={activityRegForm.parentApproval} onChange={(e) => setActivityRegForm({...activityRegForm, parentApproval: e.target.checked})} className="w-4 h-4 rounded accent-[#C8A45C]" />
                    <span className="text-xs text-muted-foreground">I have my parent&apos;s approval</span>
                  </label>
                </div>
                <div>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" checked={activityRegForm.medicalFitness} onChange={(e) => setActivityRegForm({...activityRegForm, medicalFitness: e.target.checked})} className="w-4 h-4 rounded accent-[#C8A45C]" />
                    <span className="text-xs text-muted-foreground">I am medically fit to participate</span>
                  </label>
                </div>
                <div className="md:col-span-2">
                  <label className={labelClass}>Emergency Contact *</label>
                  <input type="text" value={activityRegForm.emergencyContact} onChange={(e) => setActivityRegForm({...activityRegForm, emergencyContact: e.target.value})} className={inputClass} placeholder="+91 XXXXX XXXXX" />
                </div>
              </div>
              <div className="flex justify-end gap-3 mt-4">
                <button onClick={() => setShowForm(null)} className="px-4 py-2 rounded-xl border border-border text-sm text-muted-foreground hover:bg-muted/50">Cancel</button>
                <button onClick={() => handleSubmit('Activity Registration')} className="px-4 py-2 rounded-xl gradient-birla text-white text-sm font-medium hover:shadow-lg transition-all">Register</button>
              </div>
            </motion.div>
          )}

          {/* Digital Note Form */}
          {showForm === 'digitalNote' && (
            <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-semibold text-foreground flex items-center gap-2">
                  <StickyNote className="w-5 h-5 text-emerald-500" />Digital Note Form
                </h3>
                <button onClick={() => setShowForm(null)} className="w-8 h-8 rounded-lg border border-border flex items-center justify-center hover:bg-muted/50"><X className="w-4 h-4" /></button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>Subject *</label>
                  <select value={digitalNoteForm.subject} onChange={(e) => setDigitalNoteForm({...digitalNoteForm, subject: e.target.value})} className={inputClass}>
                    <option value="">Select Subject</option>
                    {subjects.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <div>
                  <label className={labelClass}>Title *</label>
                  <input type="text" value={digitalNoteForm.title} onChange={(e) => setDigitalNoteForm({...digitalNoteForm, title: e.target.value})} className={inputClass} placeholder="Note title" />
                </div>
                <div className="md:col-span-2">
                  <label className={labelClass}>Content *</label>
                  <textarea value={digitalNoteForm.content} onChange={(e) => setDigitalNoteForm({...digitalNoteForm, content: e.target.value})} rows={5} className={inputClass + ' resize-none'} placeholder="Write your notes here..." />
                </div>
                <div>
                  <label className={labelClass}>Tags</label>
                  <input type="text" value={digitalNoteForm.tags} onChange={(e) => setDigitalNoteForm({...digitalNoteForm, tags: e.target.value})} className={inputClass} placeholder="Comma-separated tags" />
                </div>
                <div>
                  <label className="flex items-center gap-2 cursor-pointer mt-5">
                    <input type="checkbox" checked={digitalNoteForm.isPublic} onChange={(e) => setDigitalNoteForm({...digitalNoteForm, isPublic: e.target.checked})} className="w-4 h-4 rounded accent-[#C8A45C]" />
                    <span className="text-xs text-muted-foreground">Make this note public</span>
                  </label>
                </div>
              </div>
              <div className="flex justify-end gap-3 mt-4">
                <button onClick={() => setShowForm(null)} className="px-4 py-2 rounded-xl border border-border text-sm text-muted-foreground hover:bg-muted/50">Cancel</button>
                <button onClick={() => handleSubmit('Digital Note')} className="px-4 py-2 rounded-xl gradient-birla text-white text-sm font-medium hover:shadow-lg transition-all">Save Note</button>
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
          {/* 1. My Attendance Report */}
          <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-5">
            <h3 className="text-base font-semibold text-foreground flex items-center gap-2 mb-1">
              <Calendar className="w-4 h-4 text-emerald-500" />My Attendance Report
            </h3>
            <p className="text-xs text-muted-foreground mb-3">Monthly attendance summary</p>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={attendanceMonthlyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'} />
                  <XAxis dataKey="month" tick={{ fontSize: 10 }} stroke={darkMode ? '#64748b' : '#94a3b8'} />
                  <YAxis tick={{ fontSize: 10 }} stroke={darkMode ? '#64748b' : '#94a3b8'} />
                  <Tooltip contentStyle={tooltipStyle} />
                  <Legend iconType="circle" wrapperStyle={{ fontSize: '11px' }} />
                  <Line type="monotone" dataKey="present" stroke="#10B981" strokeWidth={2} name="Present" dot={{ r: 3 }} />
                  <Line type="monotone" dataKey="absent" stroke="#EF4444" strokeWidth={2} name="Absent" dot={{ r: 3 }} />
                  <Line type="monotone" dataKey="late" stroke="#F59E0B" strokeWidth={2} name="Late" dot={{ r: 3 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* 2. My Performance Report */}
          <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-5">
            <div className="flex items-center gap-2 mb-1">
              <Shield className="w-4 h-4 text-birla-blue dark:text-birla-cyan" />
              <span className="text-xs font-mono text-muted-foreground">BSP: {currentStudent.bspId} | PEN: {currentStudent.penNo} | UPPR: {currentStudent.upparId}</span>
            </div>
            <h3 className="text-base font-semibold text-foreground flex items-center gap-2 mb-1">
              <TrendingUp className="w-4 h-4 text-birla-cyan" />My Performance Report
            </h3>
            <p className="text-xs text-muted-foreground mb-3">Subject-wise scores vs class average</p>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={subjectScoresData}>
                  <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'} />
                  <XAxis dataKey="subject" tick={{ fontSize: 10 }} stroke={darkMode ? '#64748b' : '#94a3b8'} />
                  <YAxis tick={{ fontSize: 10 }} stroke={darkMode ? '#64748b' : '#94a3b8'} domain={[0, 100]} />
                  <Tooltip contentStyle={tooltipStyle} />
                  <Legend iconType="circle" wrapperStyle={{ fontSize: '11px' }} />
                  <Bar dataKey="score" fill="#22D3EE" radius={[4,4,0,0]} name="My Score" />
                  <Bar dataKey="classAvg" fill="#C8A45C" radius={[4,4,0,0]} name="Class Avg" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* 3. Homework Completion Report */}
          <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-5">
            <h3 className="text-base font-semibold text-foreground flex items-center gap-2 mb-1">
              <ClipboardList className="w-4 h-4 text-birla-gold" />Homework Completion Report
            </h3>
            <p className="text-xs text-muted-foreground mb-3">Subject-wise completion rate</p>
            <div className="space-y-3 max-h-72 overflow-y-auto">
              {homeworkCompletionData.map(item => (
                <div key={item.subject}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-muted-foreground">{item.subject}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] text-muted-foreground">{item.completed}/{item.total}</span>
                      <span className="text-xs font-semibold text-foreground">{item.rate}%</span>
                    </div>
                  </div>
                  <div className="h-3 rounded-full bg-muted overflow-hidden">
                    <div className="h-full rounded-full transition-all" style={{ width: `${item.rate}%`, background: item.rate >= 90 ? 'linear-gradient(90deg, #10B981, #22D3EE)' : item.rate >= 75 ? 'linear-gradient(90deg, #C8A45C, #E8D5A0)' : 'linear-gradient(90deg, #EF4444, #F59E0B)' }} />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* 4. Skill Badge Report */}
            <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-5">
              <h3 className="text-base font-semibold text-foreground flex items-center gap-2 mb-1">
                <Award className="w-4 h-4 text-purple-500" />Skill Badge Report
              </h3>
              <p className="text-xs text-muted-foreground mb-3">Badges earned by category</p>
              <div className="h-56">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={skillBadgePieData} cx="50%" cy="50%" innerRadius={45} outerRadius={80} paddingAngle={3} dataKey="value">
                      {skillBadgePieData.map((entry, idx) => <Cell key={idx} fill={entry.color} />)}
                    </Pie>
                    <Tooltip contentStyle={tooltipStyle} />
                    <Legend iconType="circle" wrapperStyle={{ fontSize: '10px' }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-1.5 mt-2 max-h-32 overflow-y-auto">
                {skillBadgeData.filter(b => b.earned).map((b, i) => (
                  <div key={i} className="flex items-center justify-between p-1.5 rounded-lg bg-muted/20">
                    <span className="text-xs text-foreground">{b.name}</span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-birla-gold/10 text-birla-gold">{b.category}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* 5. Exam Score Report */}
            <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-5">
              <h3 className="text-base font-semibold text-foreground flex items-center gap-2 mb-1">
                <GraduationCap className="w-4 h-4 text-birla-cyan" />Exam Score Report
              </h3>
              <p className="text-xs text-muted-foreground mb-3">Exam-wise scores with class average comparison</p>
              <div className="h-56">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={examScoreData}>
                    <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'} />
                    <XAxis dataKey="exam" tick={{ fontSize: 9 }} stroke={darkMode ? '#64748b' : '#94a3b8'} />
                    <YAxis tick={{ fontSize: 10 }} stroke={darkMode ? '#64748b' : '#94a3b8'} domain={[0, 100]} />
                    <Tooltip contentStyle={tooltipStyle} />
                    <Legend iconType="circle" wrapperStyle={{ fontSize: '10px' }} />
                    <Bar dataKey="score" fill="#22D3EE" radius={[3,3,0,0]} name="My Score" />
                    <Bar dataKey="classAvg" fill="#C8A45C" radius={[3,3,0,0]} name="Class Avg" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-3 p-2 rounded-lg bg-muted/20">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Overall Average:</span>
                  <span className="font-semibold text-foreground">{Math.round(examScoreData.reduce((a,b) => a + b.score, 0) / examScoreData.length)}%</span>
                </div>
                <div className="flex items-center justify-between text-xs mt-1">
                  <span className="text-muted-foreground">Highest Score:</span>
                  <span className="font-semibold text-emerald-600">{Math.max(...examScoreData.map(e => e.score))}%</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </motion.div>
  )
}
