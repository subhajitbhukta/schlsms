'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Users, BookOpen, Calendar, Clock, CheckCircle2, XCircle,
  FileText, ClipboardCheck, BarChart3, Brain, MessageSquare,
  GraduationCap, Plus, ChevronRight, Send, Edit, Eye,
  Download, Search, Filter, Star, AlertTriangle, TrendingUp,
  Target, Sparkles, Award, PenTool, Zap, Sliders, Hash,
  UserCheck, UserX, Timer, ThumbsUp, Lightbulb, Mic,
  Monitor, BookMarked, Grid3X3, HelpCircle
} from 'lucide-react'
import {
  BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Legend, RadarChart, Radar,
  PolarGrid, PolarAngleAxis, PolarRadiusAxis, PieChart, Pie, Cell
} from 'recharts'
import useAppStore from '@/store/useAppStore'

// ─── Data ────────────────────────────────────────────────────────
const attendanceStudents = [
  { id: 1, name: 'Aarav Sharma', roll: 1, present: true, percentage: 94 },
  { id: 2, name: 'Priya Gupta', roll: 2, present: true, percentage: 98 },
  { id: 3, name: 'Arjun Reddy', roll: 3, present: false, percentage: 91 },
  { id: 4, name: 'Ananya Iyer', roll: 4, present: true, percentage: 96 },
  { id: 5, name: 'Rohan Patel', roll: 5, present: true, percentage: 88 },
  { id: 6, name: 'Ishita Banerjee', roll: 6, present: true, percentage: 95 },
  { id: 7, name: 'Vivaan Kumar', roll: 7, present: false, percentage: 92 },
  { id: 8, name: 'Meera Nair', roll: 8, present: true, percentage: 97 },
  { id: 9, name: 'Aditya Singh', roll: 9, present: true, percentage: 78 },
  { id: 10, name: 'Kavya Joshi', roll: 10, present: true, percentage: 99 },
  { id: 11, name: 'Rahul Verma', roll: 11, present: true, percentage: 93 },
  { id: 12, name: 'Sneha Dasgupta', roll: 12, present: false, percentage: 89 },
  { id: 13, name: 'Vikram Malhotra', roll: 13, present: true, percentage: 96 },
  { id: 14, name: 'Nisha Agarwal', roll: 14, present: true, percentage: 94 },
  { id: 15, name: 'Deepak Raj', roll: 15, present: true, percentage: 90 },
  { id: 16, name: 'Pooja Krishnan', roll: 16, present: true, percentage: 95 },
  { id: 17, name: 'Saurabh Pandey', roll: 17, present: false, percentage: 85 },
  { id: 18, name: 'Tanvi Mehta', roll: 18, present: true, percentage: 97 },
  { id: 19, name: 'Kunal Shukla', roll: 19, present: true, percentage: 91 },
  { id: 20, name: 'Ritika Sharma', roll: 20, present: true, percentage: 93 },
]

const timetableData = [
  { day: 'Monday', periods: [
    { slot: '1', time: '08:00-08:45', subject: 'Mathematics', class: 'X-A', room: 'Room 201' },
    { slot: '2', time: '08:45-09:30', subject: 'Mathematics', class: 'X-A', room: 'Room 201' },
    { slot: '3', time: '09:30-09:50', subject: 'Break', class: '', room: '' },
    { slot: '4', time: '09:50-10:35', subject: 'Physics', class: 'XII-B', room: 'Lab 3' },
    { slot: '5', time: '10:35-11:20', subject: 'Physics', class: 'XII-B', room: 'Lab 3' },
    { slot: '6', time: '11:20-12:05', subject: 'Free', class: '', room: '' },
    { slot: '7', time: '12:45-13:30', subject: 'Mathematics', class: 'IX-A', room: 'Room 305' },
    { slot: '8', time: '13:30-14:15', subject: 'Remedial', class: 'X-A', room: 'Room 201' },
  ]},
  { day: 'Tuesday', periods: [
    { slot: '1', time: '08:00-08:45', subject: 'Physics', class: 'XII-B', room: 'Lab 3' },
    { slot: '2', time: '08:45-09:30', subject: 'Mathematics', class: 'X-A', room: 'Room 201' },
    { slot: '3', time: '09:30-09:50', subject: 'Break', class: '', room: '' },
    { slot: '4', time: '09:50-10:35', subject: 'Mathematics', class: 'IX-A', room: 'Room 305' },
    { slot: '5', time: '10:35-11:20', subject: 'Free', class: '', room: '' },
    { slot: '6', time: '11:20-12:05', subject: 'Physics', class: 'XII-B', room: 'Lab 3' },
    { slot: '7', time: '12:45-13:30', subject: 'Mathematics', class: 'X-A', room: 'Room 201' },
    { slot: '8', time: '13:30-14:15', subject: 'Club Activity', class: 'Math Club', room: 'Auditorium' },
  ]},
  { day: 'Wednesday', periods: [
    { slot: '1', time: '08:00-08:45', subject: 'Mathematics', class: 'X-A', room: 'Room 201' },
    { slot: '2', time: '08:45-09:30', subject: 'Free', class: '', room: '' },
    { slot: '3', time: '09:30-09:50', subject: 'Break', class: '', room: '' },
    { slot: '4', time: '09:50-10:35', subject: 'Physics', class: 'XII-B', room: 'Lab 3' },
    { slot: '5', time: '10:35-11:20', subject: 'Mathematics', class: 'X-A', room: 'Room 201' },
    { slot: '6', time: '11:20-12:05', subject: 'Mathematics', class: 'IX-A', room: 'Room 305' },
    { slot: '7', time: '12:45-13:30', subject: 'Free', class: '', room: '' },
    { slot: '8', time: '13:30-14:15', subject: 'PTM Prep', class: '', room: 'Staff Room' },
  ]},
  { day: 'Thursday', periods: [
    { slot: '1', time: '08:00-08:45', subject: 'Physics', class: 'XII-B', room: 'Lab 3' },
    { slot: '2', time: '08:45-09:30', subject: 'Mathematics', class: 'X-A', room: 'Room 201' },
    { slot: '3', time: '09:30-09:50', subject: 'Break', class: '', room: '' },
    { slot: '4', time: '09:50-10:35', subject: 'Free', class: '', room: '' },
    { slot: '5', time: '10:35-11:20', subject: 'Physics', class: 'XII-B', room: 'Lab 3' },
    { slot: '6', time: '11:20-12:05', subject: 'Mathematics', class: 'X-A', room: 'Room 201' },
    { slot: '7', time: '12:45-13:30', subject: 'Mathematics', class: 'IX-A', room: 'Room 305' },
    { slot: '8', time: '13:30-14:15', subject: 'Free', class: '', room: '' },
  ]},
  { day: 'Friday', periods: [
    { slot: '1', time: '08:00-08:45', subject: 'Mathematics', class: 'IX-A', room: 'Room 305' },
    { slot: '2', time: '08:45-09:30', subject: 'Physics', class: 'XII-B', room: 'Lab 3' },
    { slot: '3', time: '09:30-09:50', subject: 'Break', class: '', room: '' },
    { slot: '4', time: '09:50-10:35', subject: 'Mathematics', class: 'X-A', room: 'Room 201' },
    { slot: '5', time: '10:35-11:20', subject: 'Free', class: '', room: '' },
    { slot: '6', time: '11:20-12:05', subject: 'Remedial', class: 'IX-A', room: 'Room 305' },
    { slot: '7', time: '12:45-13:30', subject: 'Free', class: '', room: '' },
    { slot: '8', time: '13:30-14:15', subject: 'Staff Meeting', class: '', room: 'Conference' },
  ]},
]

const lessonUnits = [
  { id: 1, unit: 'Algebra', chapters: ['Quadratic Equations', 'Arithmetic Progressions', 'Polynomials'] },
  { id: 2, unit: 'Geometry', chapters: ['Triangles', 'Circles', 'Constructions'] },
  { id: 3, unit: 'Trigonometry', chapters: ['Introduction to Trigonometry', 'Applications of Trigonometry'] },
  { id: 4, unit: 'Statistics & Probability', chapters: ['Statistics', 'Probability'] },
  { id: 5, unit: 'Number Systems', chapters: ['Real Numbers'] },
]

const studentEvaluationData = [
  { id: 1, name: 'Aarav Sharma', roll: 1, fa1: 78, fa2: 82, sa1: 85, sa2: 0, total: 0, grade: '' },
  { id: 2, name: 'Priya Gupta', roll: 2, fa1: 92, fa2: 95, sa1: 88, sa2: 0, total: 0, grade: '' },
  { id: 3, name: 'Arjun Reddy', roll: 3, fa1: 65, fa2: 70, sa1: 72, sa2: 0, total: 0, grade: '' },
  { id: 4, name: 'Ananya Iyer', roll: 4, fa1: 88, fa2: 91, sa1: 85, sa2: 0, total: 0, grade: '' },
  { id: 5, name: 'Rohan Patel', roll: 5, fa1: 55, fa2: 60, sa1: 58, sa2: 0, total: 0, grade: '' },
  { id: 6, name: 'Ishita Banerjee', roll: 6, fa1: 85, fa2: 88, sa1: 90, sa2: 0, total: 0, grade: '' },
  { id: 7, name: 'Vivaan Kumar', roll: 7, fa1: 72, fa2: 75, sa1: 78, sa2: 0, total: 0, grade: '' },
  { id: 8, name: 'Meera Nair', roll: 8, fa1: 95, fa2: 93, sa1: 91, sa2: 0, total: 0, grade: '' },
  { id: 9, name: 'Aditya Singh', roll: 9, fa1: 48, fa2: 52, sa1: 55, sa2: 0, total: 0, grade: '' },
  { id: 10, name: 'Kavya Joshi', roll: 10, fa1: 90, fa2: 92, sa1: 94, sa2: 0, total: 0, grade: '' },
]

const cbseGrading = [
  { range: '91-100', grade: 'A1', point: 10, performance: 'Outstanding' },
  { range: '81-90', grade: 'A2', point: 9, performance: 'Excellent' },
  { range: '71-80', grade: 'B1', point: 8, performance: 'Very Good' },
  { range: '61-70', grade: 'B2', point: 7, performance: 'Good' },
  { range: '51-60', grade: 'C1', point: 6, performance: 'Above Average' },
  { range: '41-50', grade: 'C2', point: 5, performance: 'Average' },
  { range: '33-40', grade: 'D', point: 4, performance: 'Below Average' },
  { range: '21-32', grade: 'E1', point: 0, performance: 'Needs Improvement' },
  { range: '0-20', grade: 'E2', point: 0, performance: 'Unsatisfactory' },
]

const engagementAnalyticsData = [
  { month: 'Sep', participation: 72, homework: 85, quiz: 68, attendance: 94 },
  { month: 'Oct', participation: 78, homework: 82, quiz: 72, attendance: 95 },
  { month: 'Nov', participation: 75, homework: 88, quiz: 75, attendance: 93 },
  { month: 'Dec', participation: 82, homework: 90, quiz: 78, attendance: 96 },
  { month: 'Jan', participation: 85, homework: 87, quiz: 82, attendance: 94 },
  { month: 'Feb', participation: 88, homework: 92, quiz: 85, attendance: 97 },
]

const subjectRadarData = [
  { subject: 'Participation', score: 85 },
  { subject: 'Homework', score: 88 },
  { subject: 'Quiz Perf.', score: 82 },
  { subject: 'Attendance', score: 96 },
  { subject: 'Engagement', score: 78 },
  { subject: 'Creativity', score: 72 },
]

const classDistributionData = [
  { name: 'A1 (91-100)', value: 8, color: '#10B981' },
  { name: 'A2 (81-90)', value: 12, color: '#22D3EE' },
  { name: 'B1 (71-80)', value: 10, color: '#C8A45C' },
  { name: 'B2 (61-70)', value: 5, color: '#8B5CF6' },
  { name: 'C1 (51-60)', value: 2, color: '#F59E0B' },
  { name: 'Below 50', value: 1, color: '#EF4444' },
]

const messages = [
  { id: 1, from: 'Principal Sharma', subject: 'Annual Day Preparation', time: '10:30 AM', unread: true, preview: 'All teachers are requested to prepare their class items for Annual Day...' },
  { id: 2, from: 'Mrs. Gupta (Parent)', subject: 'Priya\'s Leave Application', time: '09:15 AM', unread: true, preview: 'Respected Ma\'am, Priya will be absent on March 18 due to...' },
  { id: 3, from: 'HOD Mathematics', subject: 'Unit Test Schedule Change', time: 'Yesterday', unread: false, preview: 'The unit test scheduled for March 20 has been moved to March 22...' },
  { id: 4, from: 'Admin Office', subject: 'Salary Slip - February 2026', time: 'Yesterday', unread: false, preview: 'Your salary slip for the month of February 2026 has been generated...' },
  { id: 5, from: 'Mr. Kumar (Parent)', subject: 'Arjun\'s Progress Report Query', time: '2 days ago', unread: false, preview: 'I wanted to discuss Arjun\'s recent performance in Physics...' },
]

const rubricCriteria = [
  { id: 1, criterion: 'Content Knowledge', weight: 30, levels: ['Incomplete understanding', 'Basic understanding', 'Good understanding', 'Thorough understanding', 'Expert understanding'] },
  { id: 2, criterion: 'Critical Thinking', weight: 25, levels: ['No analysis', 'Limited analysis', 'Adequate analysis', 'Strong analysis', 'Exceptional analysis'] },
  { id: 3, criterion: 'Organization', weight: 20, levels: ['Disorganized', 'Somewhat organized', 'Well organized', 'Very well organized', 'Exemplary organization'] },
  { id: 4, criterion: 'Presentation', weight: 15, levels: ['Poor delivery', 'Adequate delivery', 'Good delivery', 'Very good delivery', 'Outstanding delivery'] },
  { id: 5, criterion: 'Creativity', weight: 10, levels: ['No originality', 'Minimal originality', 'Some originality', 'Good originality', 'Exceptional originality'] },
]

const aiSuggestions = [
  { id: 1, type: 'question', title: 'Discussion Questions for Quadratic Equations', items: ['How does the discriminant predict the nature of roots?', 'What real-world scenarios use quadratic relationships?', 'Can a quadratic equation have exactly one solution?'], icon: HelpCircle, color: 'text-blue-500 bg-blue-500/10' },
  { id: 2, type: 'activity', title: 'Classroom Activities', items: ['Peer teaching: Students explain concepts to partners', 'Math lab: Graphing quadratic functions using technology', 'Real-world project: Modeling projectile motion'], icon: Lightbulb, color: 'text-amber-500 bg-amber-500/10' },
  { id: 3, type: 'assessment', title: 'Quick Assessment Ideas', items: ['Exit ticket: Solve x² - 5x + 6 = 0 using two methods', 'Think-pair-share: Discriminant analysis', 'Mini quiz: 5 MCQs on quadratic formulas'], icon: Target, color: 'text-emerald-500 bg-emerald-500/10' },
]

const resourceItems = [
  { id: 1, title: 'NCERT Chapter 4: Quadratic Equations', type: 'Textbook', size: '2.4 MB' },
  { id: 2, title: 'Visualizing Quadratics - GeoGebra', type: 'Interactive', size: 'Online' },
  { id: 3, title: 'Practice Worksheet - Discriminant', type: 'Worksheet', size: '156 KB' },
  { id: 4, title: 'Video: Real-world Quadratics', type: 'Video', size: '45 MB' },
]

// ─── Animation variants ──────────────────────────────────────────
const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.06 } },
}
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
}

export default function TeacherPortal() {
  const { darkMode } = useAppStore()
  const [activeTab, setActiveTab] = useState('attendance')
  const [selectedClass, setSelectedClass] = useState('X-A')
  const [attendanceData, setAttendanceData] = useState(
    attendanceStudents.reduce((acc, s) => ({ ...acc, [s.id]: s.present }), {})
  )
  const [selectedUnit, setSelectedUnit] = useState('Algebra')
  const [selectedChapter, setSelectedChapter] = useState('Quadratic Equations')
  const [evaluationData, setEvaluationData] = useState(studentEvaluationData)
  const [assignmentForm, setAssignmentForm] = useState({
    title: '', subject: 'Mathematics', class: 'X-A', dueDate: '', rubricType: 'custom'
  })

  const tabs = [
    { id: 'attendance', label: 'Smart Attendance', icon: UserCheck },
    { id: 'timetable', label: 'Timetable', icon: Calendar },
    { id: 'planner', label: 'Lesson Planner', icon: BookOpen },
    { id: 'assignments', label: 'Assignments', icon: FileText },
    { id: 'evaluation', label: 'Evaluation', icon: PenTool },
    { id: 'reports', label: 'Report Cards', icon: Award },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'assistant', label: 'AI Assistant', icon: Brain },
    { id: 'communication', label: 'Messages', icon: MessageSquare },
    { id: 'rubric', label: 'Rubrics', icon: Sliders },
  ]

  const presentCount = Object.values(attendanceData).filter(Boolean).length
  const absentCount = Object.values(attendanceData).filter(v => !v).length
  const attendancePercent = Math.round((presentCount / attendanceStudents.length) * 100)

  const getCBSEGrade = (marks) => {
    if (marks >= 91) return 'A1'
    if (marks >= 81) return 'A2'
    if (marks >= 71) return 'B1'
    if (marks >= 61) return 'B2'
    if (marks >= 51) return 'C1'
    if (marks >= 41) return 'C2'
    if (marks >= 33) return 'D'
    if (marks >= 21) return 'E1'
    return 'E2'
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="p-4 lg:p-6 space-y-6 max-w-[1600px] mx-auto"
    >
      {/* ─── Tab Navigation ──────────────────────────────── */}
      <motion.div variants={itemVariants} className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
        {tabs.map((tab) => {
          const Icon = tab.icon
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                activeTab === tab.id
                  ? 'gradient-birla text-white shadow-md'
                  : 'border border-border text-muted-foreground hover:bg-muted hover:text-foreground'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              {tab.label}
            </button>
          )
        })}
      </motion.div>

      {/* ─── Smart Attendance ──────────────────────────────── */}
      {activeTab === 'attendance' && (
        <motion.div variants={itemVariants} className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <h3 className="text-base font-semibold text-foreground flex items-center gap-2">
              <UserCheck className="w-5 h-5 text-emerald-500" />
              Smart Attendance
            </h3>
            <div className="flex items-center gap-2">
              <select
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
                className="px-3 py-1.5 rounded-lg border border-input bg-background text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-birla-gold/40"
              >
                {['X-A', 'X-B', 'IX-A', 'IX-B', 'XII-A', 'XII-B', 'XI-A'].map((cls) => (
                  <option key={cls} value={cls}>Class {cls}</option>
                ))}
              </select>
              <select className="px-3 py-1.5 rounded-lg border border-input bg-background text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-birla-gold/40">
                <option>Today - March 12, 2026</option>
              </select>
            </div>
          </div>

          {/* Attendance Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            {[
              { label: 'Total Students', value: attendanceStudents.length, icon: Users, color: 'from-blue-900 to-blue-700' },
              { label: 'Present', value: presentCount, icon: UserCheck, color: 'from-emerald-800 to-emerald-600' },
              { label: 'Absent', value: absentCount, icon: UserX, color: 'from-rose-800 to-rose-600' },
              { label: 'Attendance %', value: `${attendancePercent}%`, icon: TrendingUp, color: 'from-amber-800 to-amber-600' },
            ].map((stat) => {
              const Icon = stat.icon
              return (
                <div key={stat.label} className={`rounded-2xl bg-gradient-to-br ${stat.color} p-4 text-white`}>
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-white/15 flex items-center justify-center">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-xl font-bold">{stat.value}</p>
                      <p className="text-[10px] text-white/70">{stat.label}</p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Student Grid */}
          <div className="rounded-2xl border border-border bg-card p-5">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-sm font-semibold text-foreground">Student Attendance Grid</h4>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    const allPresent = {}
                    attendanceStudents.forEach(s => { allPresent[s.id] = true })
                    setAttendanceData(allPresent)
                  }}
                  className="px-3 py-1 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[10px] font-medium hover:bg-emerald-500/20 transition-colors"
                >
                  Mark All Present
                </button>
                <button
                  onClick={() => {
                    const allAbsent = {}
                    attendanceStudents.forEach(s => { allAbsent[s.id] = false })
                    setAttendanceData(allAbsent)
                  }}
                  className="px-3 py-1 rounded-lg bg-rose-500/10 text-rose-600 dark:text-rose-400 text-[10px] font-medium hover:bg-rose-500/20 transition-colors"
                >
                  Mark All Absent
                </button>
              </div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 max-h-96 overflow-y-auto">
              {attendanceStudents.map((student) => (
                <div
                  key={student.id}
                  className={`p-3 rounded-xl border cursor-pointer transition-all ${
                    attendanceData[student.id]
                      ? 'border-emerald-500/30 bg-emerald-500/5'
                      : 'border-rose-500/30 bg-rose-500/5'
                  }`}
                  onClick={() => setAttendanceData(prev => ({ ...prev, [student.id]: !prev[student.id] }))}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                      attendanceData[student.id]
                        ? 'gradient-birla text-white'
                        : 'bg-rose-500/20 text-rose-600 dark:text-rose-400'
                    }`}>
                      {student.name.charAt(0)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[11px] font-semibold text-foreground truncate">{student.name}</p>
                      <p className="text-[9px] text-muted-foreground">Roll #{student.roll}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className={`text-[9px] font-medium ${
                      attendanceData[student.id] ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'
                    }`}>
                      {attendanceData[student.id] ? 'Present' : 'Absent'}
                    </span>
                    <span className="text-[9px] text-muted-foreground">{student.percentage}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button className="flex items-center gap-1.5 px-4 py-2 rounded-lg gradient-birla text-white text-xs font-medium">
            <Send className="w-3.5 h-3.5" /> Submit Attendance
          </button>
        </motion.div>
      )}

      {/* ─── Timetable Management ───────────────────────────── */}
      {activeTab === 'timetable' && (
        <motion.div variants={itemVariants} className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-semibold text-foreground flex items-center gap-2">
              <Calendar className="w-5 h-5 text-birla-gold" />
              Weekly Timetable
            </h3>
            <span className="text-xs px-2 py-0.5 rounded-full bg-birla-gold/10 text-birla-gold font-medium">
              Dr. Priya Menon
            </span>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-border bg-card">
            <div className="min-w-[900px]">
              {/* Header */}
              <div className="grid grid-cols-6 border-b border-border bg-muted/30">
                <div className="p-3 text-xs font-semibold text-muted-foreground">Period</div>
                {timetableData.map((day) => (
                  <div key={day.day} className="p-3 text-xs font-semibold text-foreground text-center">{day.day}</div>
                ))}
              </div>
              {/* Periods */}
              {[0, 1, 2, 3, 4, 5, 6, 7].map((periodIdx) => (
                <div key={periodIdx} className="grid grid-cols-6 border-b border-border/50 last:border-0">
                  <div className="p-3 text-[10px] text-muted-foreground flex flex-col justify-center">
                    <span className="font-semibold text-foreground">P{timetableData[0].periods[periodIdx].slot}</span>
                    <span>{timetableData[0].periods[periodIdx].time}</span>
                  </div>
                  {timetableData.map((day) => {
                    const period = day.periods[periodIdx]
                    const isBreak = period.subject === 'Break'
                    const isFree = period.subject === 'Free'
                    return (
                      <div key={day.day} className={`p-2 text-center ${isBreak ? 'bg-muted/50' : ''}`}>
                        {isBreak ? (
                          <span className="text-[10px] text-muted-foreground font-medium">☕ Break</span>
                        ) : isFree ? (
                          <span className="text-[10px] text-muted-foreground">—</span>
                        ) : (
                          <div className={`rounded-lg p-2 ${
                            period.subject === 'Mathematics'
                              ? 'bg-blue-500/10 border border-blue-500/20'
                              : period.subject === 'Physics'
                                ? 'bg-purple-500/10 border border-purple-500/20'
                                : 'bg-amber-500/10 border border-amber-500/20'
                          }`}>
                            <p className="text-[11px] font-semibold text-foreground">{period.subject}</p>
                            <p className="text-[9px] text-muted-foreground">{period.class}</p>
                            <p className="text-[8px] text-muted-foreground mt-0.5">{period.room}</p>
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              ))}
            </div>
          </div>

          {/* Weekly Load Summary */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { subject: 'Mathematics', periods: 14, hours: '10h 30m', color: 'bg-blue-500/10 text-blue-600 dark:text-blue-400' },
              { subject: 'Physics', periods: 8, hours: '6h 00m', color: 'bg-purple-500/10 text-purple-600 dark:text-purple-400' },
              { subject: 'Free Periods', periods: 6, hours: '4h 30m', color: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' },
            ].map((item) => (
              <div key={item.subject} className="rounded-xl border border-border bg-card p-4 flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${item.color}`}>
                  <Timer className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-bold text-foreground">{item.periods} periods</p>
                  <p className="text-[10px] text-muted-foreground">{item.subject} &bull; {item.hours}/week</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* ─── Lesson Planner ──────────────────────────────────── */}
      {activeTab === 'planner' && (
        <motion.div variants={itemVariants} className="space-y-6">
          <h3 className="text-base font-semibold text-foreground flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-birla-cyan" />
            Lesson Planner
          </h3>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Lesson Plan Form */}
            <motion.div variants={itemVariants} className="lg:col-span-2 rounded-2xl border border-border bg-card p-5">
              <h4 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
                <Edit className="w-4 h-4 text-birla-gold" />
                Create Lesson Plan
              </h4>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs text-muted-foreground mb-1 block">Subject</label>
                    <select className="w-full px-3 py-2 rounded-lg border border-input bg-background text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-birla-gold/40">
                      <option>Mathematics</option>
                      <option>Physics</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground mb-1 block">Class</label>
                    <select className="w-full px-3 py-2 rounded-lg border border-input bg-background text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-birla-gold/40">
                      <option>X-A</option>
                      <option>IX-A</option>
                      <option>XII-B</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs text-muted-foreground mb-1 block">Unit</label>
                    <select
                      value={selectedUnit}
                      onChange={(e) => setSelectedUnit(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-input bg-background text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-birla-gold/40"
                    >
                      {lessonUnits.map((u) => (
                        <option key={u.id} value={u.unit}>{u.unit}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground mb-1 block">Chapter</label>
                    <select
                      value={selectedChapter}
                      onChange={(e) => setSelectedChapter(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-input bg-background text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-birla-gold/40"
                    >
                      {lessonUnits.find(u => u.unit === selectedUnit)?.chapters.map((ch) => (
                        <option key={ch} value={ch}>{ch}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-xs text-muted-foreground mb-1 block">Learning Objectives</label>
                  <textarea
                    rows={3}
                    placeholder="Students will be able to..."
                    className="w-full px-3 py-2 rounded-lg border border-input bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-birla-gold/40"
                    defaultValue="1. Solve quadratic equations using factorization method&#10;2. Apply quadratic formula to find roots&#10;3. Analyze nature of roots using discriminant"
                  />
                </div>

                <div>
                  <label className="text-xs text-muted-foreground mb-1 block">Teaching Methodology</label>
                  <div className="flex flex-wrap gap-2">
                    {['Lecture', 'Discussion', 'Group Work', 'Lab Activity', 'Flipped Classroom', 'Project-Based'].map((method) => (
                      <button key={method} className="px-3 py-1 rounded-full border border-border text-[10px] font-medium hover:bg-muted transition-colors">
                        {method}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-xs text-muted-foreground mb-1 block">Bloom&apos;s Taxonomy Level</label>
                  <div className="flex flex-wrap gap-2">
                    {['Remember', 'Understand', 'Apply', 'Analyze', 'Evaluate', 'Create'].map((level) => (
                      <button key={level} className={`px-3 py-1 rounded-full text-[10px] font-medium transition-all ${
                        level === 'Apply' ? 'gradient-birla text-white' : 'border border-border text-muted-foreground hover:bg-muted'
                      }`}>
                        {level}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-xs text-muted-foreground mb-1 block">Resources</label>
                  <div className="space-y-2">
                    {resourceItems.map((res) => (
                      <div key={res.id} className="flex items-center gap-3 p-2 rounded-lg border border-border">
                        <BookMarked className="w-4 h-4 text-birla-cyan flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-medium text-foreground truncate">{res.title}</p>
                          <p className="text-[9px] text-muted-foreground">{res.type} &bull; {res.size}</p>
                        </div>
                        <Eye className="w-3.5 h-3.5 text-muted-foreground cursor-pointer hover:text-foreground" />
                      </div>
                    ))}
                  </div>
                </div>

                <button className="flex items-center gap-1.5 px-4 py-2 rounded-lg gradient-birla text-white text-xs font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Save Lesson Plan
                </button>
              </div>
            </motion.div>

            {/* Saved Plans */}
            <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-5">
              <h4 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-purple-500" />
                Recent Lesson Plans
              </h4>
              <div className="space-y-3 max-h-[500px] overflow-y-auto">
                {[
                  { title: 'Quadratic Equations - Intro', date: 'Mar 10', subject: 'Mathematics', class: 'X-A', status: 'Taught' },
                  { title: 'Quadratic Formula', date: 'Mar 11', subject: 'Mathematics', class: 'X-A', status: 'Taught' },
                  { title: 'EM Induction - Faraday', date: 'Mar 11', subject: 'Physics', class: 'XII-B', status: 'Taught' },
                  { title: 'Discriminant Analysis', date: 'Mar 12', subject: 'Mathematics', class: 'X-A', status: 'Today' },
                  { title: 'AC Circuits', date: 'Mar 13', subject: 'Physics', class: 'XII-B', status: 'Upcoming' },
                  { title: 'Arithmetic Progressions', date: 'Mar 14', subject: 'Mathematics', class: 'X-A', status: 'Upcoming' },
                ].map((plan, idx) => (
                  <div key={idx} className="p-3 rounded-xl border border-border gradient-card-blue hover:shadow-sm transition-all">
                    <div className="flex items-center justify-between mb-1">
                      <span className={`px-2 py-0.5 rounded-full text-[9px] font-medium ${
                        plan.status === 'Today' ? 'bg-birla-cyan/10 text-birla-cyan' :
                        plan.status === 'Taught' ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' :
                        'bg-amber-500/10 text-amber-600 dark:text-amber-400'
                      }`}>
                        {plan.status}
                      </span>
                      <span className="text-[9px] text-muted-foreground">{plan.date}</span>
                    </div>
                    <p className="text-xs font-semibold text-foreground">{plan.title}</p>
                    <p className="text-[9px] text-muted-foreground">{plan.subject} &bull; {plan.class}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}

      {/* ─── Assignment Creation ─────────────────────────────── */}
      {activeTab === 'assignments' && (
        <motion.div variants={itemVariants} className="space-y-6">
          <h3 className="text-base font-semibold text-foreground flex items-center gap-2">
            <FileText className="w-5 h-5 text-amber-500" />
            Assignment Creation & Management
          </h3>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Creation Form */}
            <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-5">
              <h4 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
                <Plus className="w-4 h-4 text-emerald-500" />
                Create Assignment
              </h4>
              <div className="space-y-4">
                <div>
                  <label className="text-xs text-muted-foreground mb-1 block">Title</label>
                  <input
                    type="text"
                    placeholder="Enter assignment title..."
                    value={assignmentForm.title}
                    onChange={(e) => setAssignmentForm(prev => ({ ...prev, title: e.target.value }))}
                    className="w-full px-3 py-2 rounded-lg border border-input bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-birla-gold/40"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs text-muted-foreground mb-1 block">Subject</label>
                    <select
                      value={assignmentForm.subject}
                      onChange={(e) => setAssignmentForm(prev => ({ ...prev, subject: e.target.value }))}
                      className="w-full px-3 py-2 rounded-lg border border-input bg-background text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-birla-gold/40"
                    >
                      <option>Mathematics</option>
                      <option>Physics</option>
                      <option>Chemistry</option>
                      <option>English</option>
                      <option>Biology</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground mb-1 block">Class</label>
                    <select
                      value={assignmentForm.class}
                      onChange={(e) => setAssignmentForm(prev => ({ ...prev, class: e.target.value }))}
                      className="w-full px-3 py-2 rounded-lg border border-input bg-background text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-birla-gold/40"
                    >
                      <option>X-A</option>
                      <option>IX-A</option>
                      <option>XII-B</option>
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs text-muted-foreground mb-1 block">Due Date</label>
                    <input
                      type="date"
                      value={assignmentForm.dueDate}
                      onChange={(e) => setAssignmentForm(prev => ({ ...prev, dueDate: e.target.value }))}
                      className="w-full px-3 py-2 rounded-lg border border-input bg-background text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-birla-gold/40"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground mb-1 block">Max Marks</label>
                    <input
                      type="number"
                      defaultValue={50}
                      className="w-full px-3 py-2 rounded-lg border border-input bg-background text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-birla-gold/40"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-xs text-muted-foreground mb-1 block">Instructions</label>
                  <textarea
                    rows={3}
                    placeholder="Enter assignment instructions..."
                    className="w-full px-3 py-2 rounded-lg border border-input bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-birla-gold/40"
                  />
                </div>

                {/* Rubric Builder */}
                <div>
                  <label className="text-xs text-muted-foreground mb-2 block">Rubric Builder</label>
                  <div className="space-y-2">
                    {[
                      { criterion: 'Content Accuracy', weight: 40 },
                      { criterion: 'Presentation', weight: 25 },
                      { criterion: 'Critical Analysis', weight: 20 },
                      { criterion: 'Timeliness', weight: 15 },
                    ].map((rubric, idx) => (
                      <div key={idx} className="flex items-center gap-2 p-2 rounded-lg border border-border">
                        <Hash className="w-3 h-3 text-muted-foreground flex-shrink-0" />
                        <span className="text-xs text-foreground flex-1">{rubric.criterion}</span>
                        <span className="text-[10px] text-muted-foreground">{rubric.weight}%</span>
                        <div className="w-16 h-1.5 rounded-full bg-muted overflow-hidden">
                          <div className="h-full rounded-full gradient-birla-cyan" style={{ width: `${rubric.weight}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <button className="flex items-center gap-1.5 px-4 py-2 rounded-lg gradient-birla text-white text-xs font-medium">
                  <Send className="w-3.5 h-3.5" /> Publish Assignment
                </button>
              </div>
            </motion.div>

            {/* Active Assignments */}
            <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-5">
              <h4 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
                <ClipboardCheck className="w-4 h-4 text-blue-500" />
                Active Assignments
              </h4>
              <div className="space-y-3 max-h-[550px] overflow-y-auto">
                {[
                  { title: 'Quadratic Equations Worksheet', subject: 'Mathematics', class: 'X-A', due: 'Mar 18', submitted: 12, total: 38, status: 'active' },
                  { title: 'Lab Report - EM Induction', subject: 'Physics', class: 'XII-B', due: 'Mar 17', submitted: 18, total: 32, status: 'active' },
                  { title: 'Essay: Climate Change', subject: 'English', class: 'IX-A', due: 'Mar 19', submitted: 8, total: 40, status: 'active' },
                  { title: 'Organic Reactions Map', subject: 'Chemistry', class: 'XI-A', due: 'Mar 16', submitted: 30, total: 35, status: 'overdue' },
                  { title: 'Trigonometry Problems Set', subject: 'Mathematics', class: 'X-A', due: 'Mar 10', submitted: 36, total: 38, status: 'completed' },
                ].map((a, idx) => (
                  <div key={idx} className="p-3 rounded-xl border border-border gradient-card-blue hover:shadow-sm transition-all">
                    <div className="flex items-center justify-between mb-2">
                      <span className={`px-2 py-0.5 rounded-full text-[9px] font-medium ${
                        a.status === 'active' ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' :
                        a.status === 'overdue' ? 'bg-rose-500/10 text-rose-600 dark:text-rose-400' :
                        'bg-muted text-muted-foreground'
                      }`}>
                        {a.status}
                      </span>
                      <span className="text-[9px] text-muted-foreground">Due: {a.due}</span>
                    </div>
                    <p className="text-xs font-semibold text-foreground">{a.title}</p>
                    <p className="text-[10px] text-muted-foreground">{a.subject} &bull; {a.class}</p>
                    <div className="mt-2">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[9px] text-muted-foreground">Submissions</span>
                        <span className="text-[10px] font-medium text-foreground">{a.submitted}/{a.total}</span>
                      </div>
                      <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                        <div
                          className="h-full rounded-full gradient-birla-cyan"
                          style={{ width: `${(a.submitted / a.total) * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}

      {/* ─── Student Evaluation ───────────────────────────────── */}
      {activeTab === 'evaluation' && (
        <motion.div variants={itemVariants} className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <h3 className="text-base font-semibold text-foreground flex items-center gap-2">
              <PenTool className="w-5 h-5 text-birla-cyan" />
              Student Evaluation
            </h3>
            <div className="flex items-center gap-2">
              <select className="px-3 py-1.5 rounded-lg border border-input bg-background text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-birla-gold/40">
                <option>Mathematics - X-A</option>
                <option>Physics - XII-B</option>
              </select>
              <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg gradient-birla text-white text-xs font-medium">
                <Download className="w-3.5 h-3.5" /> Export
              </button>
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border bg-muted/30">
                    <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Roll</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Student Name</th>
                    <th className="text-center px-4 py-3 text-xs font-semibold text-muted-foreground">FA 1</th>
                    <th className="text-center px-4 py-3 text-xs font-semibold text-muted-foreground">FA 2</th>
                    <th className="text-center px-4 py-3 text-xs font-semibold text-muted-foreground">SA 1</th>
                    <th className="text-center px-4 py-3 text-xs font-semibold text-muted-foreground">SA 2</th>
                    <th className="text-center px-4 py-3 text-xs font-semibold text-muted-foreground">Total</th>
                    <th className="text-center px-4 py-3 text-xs font-semibold text-muted-foreground">Grade</th>
                  </tr>
                </thead>
                <tbody>
                  {evaluationData.map((student) => {
                    const total = student.fa1 + student.fa2 + student.sa1 + student.sa2
                    const avgMarks = total / (student.sa2 > 0 ? 4 : 3)
                    const grade = getCBSEGrade(Math.round(avgMarks))
                    return (
                      <tr key={student.id} className="border-b border-border/50 hover:bg-muted/20 transition-colors">
                        <td className="px-4 py-3 text-xs text-muted-foreground">{student.roll}</td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <div className="w-7 h-7 rounded-full gradient-birla-gold flex items-center justify-center text-[10px] font-bold text-birla-blue flex-shrink-0">
                              {student.name.charAt(0)}
                            </div>
                            <span className="text-sm text-foreground">{student.name}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-center">
                          <input
                            type="number"
                            value={student.fa1}
                            onChange={(e) => {
                              const val = parseInt(e.target.value) || 0
                              setEvaluationData(prev => prev.map(s => s.id === student.id ? { ...s, fa1: val } : s))
                            }}
                            className="w-14 px-2 py-1 rounded border border-input bg-background text-xs text-center text-foreground focus:outline-none focus:ring-1 focus:ring-birla-gold/40"
                          />
                        </td>
                        <td className="px-4 py-3 text-center">
                          <input
                            type="number"
                            value={student.fa2}
                            onChange={(e) => {
                              const val = parseInt(e.target.value) || 0
                              setEvaluationData(prev => prev.map(s => s.id === student.id ? { ...s, fa2: val } : s))
                            }}
                            className="w-14 px-2 py-1 rounded border border-input bg-background text-xs text-center text-foreground focus:outline-none focus:ring-1 focus:ring-birla-gold/40"
                          />
                        </td>
                        <td className="px-4 py-3 text-center">
                          <input
                            type="number"
                            value={student.sa1}
                            onChange={(e) => {
                              const val = parseInt(e.target.value) || 0
                              setEvaluationData(prev => prev.map(s => s.id === student.id ? { ...s, sa1: val } : s))
                            }}
                            className="w-14 px-2 py-1 rounded border border-input bg-background text-xs text-center text-foreground focus:outline-none focus:ring-1 focus:ring-birla-gold/40"
                          />
                        </td>
                        <td className="px-4 py-3 text-center">
                          <input
                            type="number"
                            value={student.sa2 || ''}
                            placeholder="—"
                            onChange={(e) => {
                              const val = parseInt(e.target.value) || 0
                              setEvaluationData(prev => prev.map(s => s.id === student.id ? { ...s, sa2: val } : s))
                            }}
                            className="w-14 px-2 py-1 rounded border border-input bg-background text-xs text-center text-foreground focus:outline-none focus:ring-1 focus:ring-birla-gold/40"
                          />
                        </td>
                        <td className="px-4 py-3 text-center text-sm font-bold text-foreground">
                          {total}
                        </td>
                        <td className="px-4 py-3 text-center">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            grade.startsWith('A') ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' :
                            grade.startsWith('B') ? 'bg-blue-500/10 text-blue-600 dark:text-blue-400' :
                            grade.startsWith('C') ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400' :
                            'bg-rose-500/10 text-rose-600 dark:text-rose-400'
                          }`}>
                            {grade}
                          </span>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>
      )}

      {/* ─── Report Card Generation ───────────────────────────── */}
      {activeTab === 'reports' && (
        <motion.div variants={itemVariants} className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <h3 className="text-base font-semibold text-foreground flex items-center gap-2">
              <Award className="w-5 h-5 text-birla-gold" />
              Report Card Generation
            </h3>
            <div className="flex items-center gap-2">
              <select className="px-3 py-1.5 rounded-lg border border-input bg-background text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-birla-gold/40">
                <option>Class X-A</option>
                <option>Class IX-A</option>
              </select>
              <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg gradient-birla text-white text-xs font-medium">
                <Download className="w-3.5 h-3.5" /> Generate All
              </button>
            </div>
          </div>

          {/* CBSE Grading Pattern */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-5">
              <h4 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                <Star className="w-4 h-4 text-birla-gold" />
                CBSE Grading Pattern (IX-X)
              </h4>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border bg-muted/30">
                      <th className="text-left px-3 py-2 text-[10px] font-semibold text-muted-foreground">Marks</th>
                      <th className="text-center px-3 py-2 text-[10px] font-semibold text-muted-foreground">Grade</th>
                      <th className="text-center px-3 py-2 text-[10px] font-semibold text-muted-foreground">Point</th>
                      <th className="text-left px-3 py-2 text-[10px] font-semibold text-muted-foreground">Performance</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cbseGrading.map((g, idx) => (
                      <tr key={idx} className="border-b border-border/30 hover:bg-muted/20 transition-colors">
                        <td className="px-3 py-2 text-xs text-foreground">{g.range}</td>
                        <td className="px-3 py-2 text-center">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            g.grade.startsWith('A') ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' :
                            g.grade.startsWith('B') ? 'bg-blue-500/10 text-blue-600 dark:text-blue-400' :
                            g.grade.startsWith('C') ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400' :
                            'bg-rose-500/10 text-rose-600 dark:text-rose-400'
                          }`}>
                            {g.grade}
                          </span>
                        </td>
                        <td className="px-3 py-2 text-center text-xs font-medium text-foreground">{g.point}</td>
                        <td className="px-3 py-2 text-xs text-muted-foreground">{g.performance}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>

            {/* Class Distribution */}
            <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-5">
              <h4 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-birla-cyan" />
                Grade Distribution - Class X-A
              </h4>
              <div className="h-56">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={classDistributionData}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={80}
                      paddingAngle={3}
                      dataKey="value"
                    >
                      {classDistributionData.map((entry, idx) => (
                        <Cell key={idx} fill={entry.color} stroke="none" />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: darkMode ? '#1A2D4A' : '#fff',
                        border: `1px solid ${darkMode ? 'rgba(255,255,255,0.1)' : '#e2e8f0'}`,
                        borderRadius: '12px', fontSize: '12px', color: darkMode ? '#e2e8f0' : '#1e293b',
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="grid grid-cols-3 gap-2 mt-2">
                {classDistributionData.map((item) => (
                  <div key={item.name} className="flex items-center gap-1.5 text-[9px]">
                    <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: item.color }} />
                    <span className="text-muted-foreground truncate">{item.name}</span>
                    <span className="font-medium text-foreground ml-auto">{item.value}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Student Report Cards List */}
          <div className="rounded-2xl border border-border bg-card p-5">
            <h4 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
              <GraduationCap className="w-4 h-4 text-purple-500" />
              Student Report Cards
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {evaluationData.slice(0, 8).map((student) => {
                const avg = Math.round((student.fa1 + student.fa2 + student.sa1) / 3)
                const grade = getCBSEGrade(avg)
                return (
                  <div key={student.id} className="p-3 rounded-xl border border-border gradient-card-blue hover:shadow-sm transition-all">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-8 h-8 rounded-full gradient-birla-gold flex items-center justify-center text-[10px] font-bold text-birla-blue">
                        {student.name.charAt(0)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold text-foreground truncate">{student.name}</p>
                        <p className="text-[9px] text-muted-foreground">Roll #{student.roll}</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">Avg: {avg}%</span>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        grade.startsWith('A') ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' :
                        grade.startsWith('B') ? 'bg-blue-500/10 text-blue-600 dark:text-blue-400' :
                        grade.startsWith('C') ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400' :
                        'bg-rose-500/10 text-rose-600 dark:text-rose-400'
                      }`}>
                        {grade}
                      </span>
                    </div>
                    <button className="w-full mt-2 py-1.5 rounded-lg border border-border text-[10px] font-medium hover:bg-muted transition-colors flex items-center justify-center gap-1">
                      <Download className="w-3 h-3" /> Download
                    </button>
                  </div>
                )
              })}
            </div>
          </div>
        </motion.div>
      )}

      {/* ─── Classroom Engagement Analytics ────────────────────── */}
      {activeTab === 'analytics' && (
        <motion.div variants={itemVariants} className="space-y-6">
          <h3 className="text-base font-semibold text-foreground flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-birla-cyan" />
            Classroom Engagement Analytics
          </h3>

          {/* Analytics Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            {[
              { label: 'Avg Participation', value: '85%', icon: ThumbsUp, color: 'from-emerald-800 to-emerald-600' },
              { label: 'Homework Completion', value: '92%', icon: CheckCircle2, color: 'from-blue-900 to-blue-700' },
              { label: 'Quiz Performance', value: '82%', icon: Target, color: 'from-amber-800 to-amber-600' },
              { label: 'Attendance Rate', value: '96%', icon: UserCheck, color: 'from-purple-800 to-purple-600' },
            ].map((stat) => {
              const Icon = stat.icon
              return (
                <div key={stat.label} className={`rounded-2xl bg-gradient-to-br ${stat.color} p-4 text-white`}>
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-white/15 flex items-center justify-center">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-xl font-bold">{stat.value}</p>
                      <p className="text-[10px] text-white/70">{stat.label}</p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Engagement Trend */}
            <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-5">
              <h4 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-emerald-500" />
                Engagement Trend
              </h4>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={engagementAnalyticsData}>
                    <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'} />
                    <XAxis dataKey="month" tick={{ fontSize: 10 }} stroke={darkMode ? '#64748b' : '#94a3b8'} />
                    <YAxis tick={{ fontSize: 10 }} stroke={darkMode ? '#64748b' : '#94a3b8'} domain={[60, 100]} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: darkMode ? '#1A2D4A' : '#fff',
                        border: `1px solid ${darkMode ? 'rgba(255,255,255,0.1)' : '#e2e8f0'}`,
                        borderRadius: '12px', fontSize: '12px', color: darkMode ? '#e2e8f0' : '#1e293b',
                      }}
                      formatter={(value) => [`${value}%`, '']}
                    />
                    <Legend iconType="circle" wrapperStyle={{ fontSize: '11px' }} />
                    <Line type="monotone" dataKey="participation" stroke="#10B981" strokeWidth={2} dot={{ r: 3 }} name="Participation" />
                    <Line type="monotone" dataKey="homework" stroke="#22D3EE" strokeWidth={2} dot={{ r: 3 }} name="Homework" />
                    <Line type="monotone" dataKey="quiz" stroke="#C8A45C" strokeWidth={2} dot={{ r: 3 }} name="Quiz" />
                    <Line type="monotone" dataKey="attendance" stroke="#8B5CF6" strokeWidth={2} dot={{ r: 3 }} name="Attendance" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </motion.div>

            {/* Subject Radar */}
            <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-5">
              <h4 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                <Target className="w-4 h-4 text-birla-gold" />
                Multi-Dimensional Engagement
              </h4>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="70%" data={subjectRadarData}>
                    <PolarGrid stroke={darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)'} />
                    <PolarAngleAxis dataKey="subject" tick={{ fontSize: 9 }} stroke={darkMode ? '#64748b' : '#94a3b8'} />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fontSize: 8 }} stroke={darkMode ? '#64748b' : '#94a3b8'} />
                    <Radar name="Current" dataKey="score" stroke="#22D3EE" fill="#22D3EE" fillOpacity={0.15} strokeWidth={2} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: darkMode ? '#1A2D4A' : '#fff',
                        border: `1px solid ${darkMode ? 'rgba(255,255,255,0.1)' : '#e2e8f0'}`,
                        borderRadius: '12px', fontSize: '12px', color: darkMode ? '#e2e8f0' : '#1e293b',
                      }}
                      formatter={(value) => [`${value}%`, 'Score']}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </motion.div>
          </div>

          {/* Bar Chart - Monthly Comparison */}
          <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-5">
            <h4 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-purple-500" />
              Monthly Performance Comparison
            </h4>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={engagementAnalyticsData} barGap={2}>
                  <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'} />
                  <XAxis dataKey="month" tick={{ fontSize: 10 }} stroke={darkMode ? '#64748b' : '#94a3b8'} />
                  <YAxis tick={{ fontSize: 10 }} stroke={darkMode ? '#64748b' : '#94a3b8'} domain={[60, 100]} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: darkMode ? '#1A2D4A' : '#fff',
                      border: `1px solid ${darkMode ? 'rgba(255,255,255,0.1)' : '#e2e8f0'}`,
                      borderRadius: '12px', fontSize: '12px', color: darkMode ? '#e2e8f0' : '#1e293b',
                    }}
                    formatter={(value) => [`${value}%`, '']}
                  />
                  <Legend iconType="circle" wrapperStyle={{ fontSize: '11px' }} />
                  <Bar dataKey="participation" fill="#10B981" radius={[3, 3, 0, 0]} name="Participation" />
                  <Bar dataKey="homework" fill="#22D3EE" radius={[3, 3, 0, 0]} name="Homework" />
                  <Bar dataKey="quiz" fill="#C8A45C" radius={[3, 3, 0, 0]} name="Quiz" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* ─── AI Teaching Assistant ─────────────────────────────── */}
      {activeTab === 'assistant' && (
        <motion.div variants={itemVariants} className="space-y-6">
          <h3 className="text-base font-semibold text-foreground flex items-center gap-2">
            <Brain className="w-5 h-5 text-purple-500" />
            AI Teaching Assistant
          </h3>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {aiSuggestions.map((suggestion) => {
              const Icon = suggestion.icon
              return (
                <motion.div key={suggestion.id} variants={itemVariants} className="rounded-2xl border border-border bg-card p-5">
                  <div className="flex items-center gap-2 mb-4">
                    <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${suggestion.color}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <h4 className="text-sm font-semibold text-foreground">{suggestion.title}</h4>
                  </div>
                  <div className="space-y-2">
                    {suggestion.items.map((item, idx) => (
                      <div key={idx} className="p-2.5 rounded-lg border border-border gradient-card-blue hover:shadow-sm transition-all cursor-pointer">
                        <p className="text-xs text-foreground">{item}</p>
                      </div>
                    ))}
                  </div>
                  <button className="w-full mt-3 py-2 rounded-lg border border-border text-[10px] font-medium hover:bg-muted transition-colors flex items-center justify-center gap-1">
                    <Sparkles className="w-3 h-3 text-birla-gold" /> Generate More
                  </button>
                </motion.div>
              )
            })}
          </div>

          {/* AI Quick Actions */}
          <div className="rounded-2xl border border-border bg-card p-5">
            <h4 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-500" />
              Quick AI Actions
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { label: 'Generate Quiz', icon: Brain, color: 'bg-purple-500/10 text-purple-600 dark:text-purple-400' },
                { label: 'Summarize Chapter', icon: BookOpen, color: 'bg-blue-500/10 text-blue-600 dark:text-blue-400' },
                { label: 'Create Worksheet', icon: FileText, color: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' },
                { label: 'Suggest Activities', icon: Lightbulb, color: 'bg-amber-500/10 text-amber-600 dark:text-amber-400' },
                { label: 'Differentiate Content', icon: Sliders, color: 'bg-rose-500/10 text-rose-600 dark:text-rose-400' },
                { label: 'Analyze Performance', icon: BarChart3, color: 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400' },
                { label: 'Parent Feedback', icon: MessageSquare, color: 'bg-birla-gold/10 text-birla-gold' },
                { label: 'Lesson Ideas', icon: Sparkles, color: 'bg-purple-500/10 text-purple-600 dark:text-purple-400' },
              ].map((action) => {
                const Icon = action.icon
                return (
                  <button key={action.label} className="flex flex-col items-center gap-2 p-4 rounded-xl border border-border hover:border-birla-gold/30 hover:shadow-md transition-all group">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${action.color} group-hover:scale-110 transition-transform`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] text-muted-foreground group-hover:text-foreground transition-colors">{action.label}</span>
                  </button>
                )
              })}
            </div>
          </div>
        </motion.div>
      )}

      {/* ─── Communication Center ──────────────────────────────── */}
      {activeTab === 'communication' && (
        <motion.div variants={itemVariants} className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-semibold text-foreground flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-blue-500" />
              Communication Center
            </h3>
            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg gradient-birla text-white text-xs font-medium">
              <Plus className="w-3.5 h-3.5" /> Compose
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Message List */}
            <motion.div variants={itemVariants} className="lg:col-span-1 rounded-2xl border border-border bg-card p-4">
              <div className="flex items-center gap-2 mb-3">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search messages..."
                    className="w-full pl-9 pr-3 py-1.5 rounded-lg border border-input bg-background text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-birla-gold/40"
                  />
                </div>
              </div>
              <div className="space-y-1 max-h-[500px] overflow-y-auto">
                {messages.map((msg) => (
                  <div key={msg.id} className={`p-3 rounded-xl cursor-pointer transition-all hover:bg-muted/30 ${msg.unread ? 'bg-muted/20 border border-birla-gold/20' : ''}`}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-semibold text-foreground">{msg.from}</span>
                      <span className="text-[9px] text-muted-foreground">{msg.time}</span>
                    </div>
                    <p className="text-[11px] font-medium text-foreground">{msg.subject}</p>
                    <p className="text-[10px] text-muted-foreground mt-0.5 line-clamp-1">{msg.preview}</p>
                    {msg.unread && <span className="inline-block mt-1 w-1.5 h-1.5 rounded-full bg-birla-cyan" />}
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Message Detail */}
            <motion.div variants={itemVariants} className="lg:col-span-2 rounded-2xl border border-border bg-card p-5">
              <div className="flex items-center justify-between mb-4 pb-4 border-b border-border">
                <div>
                  <h4 className="text-sm font-semibold text-foreground">Annual Day Preparation</h4>
                  <p className="text-xs text-muted-foreground mt-0.5">From: Principal Sharma &bull; 10:30 AM</p>
                </div>
                <div className="flex items-center gap-2">
                  <button className="p-1.5 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors">
                    <Send className="w-4 h-4" />
                  </button>
                  <button className="p-1.5 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors">
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div className="text-sm text-foreground leading-relaxed space-y-3">
                <p>Dear Dr. Menon,</p>
                <p>All teachers are requested to prepare their class items for Annual Day Celebration scheduled on April 5, 2026. Each class should present a cultural program of 8-10 minutes duration.</p>
                <p>Please submit your class program details by March 20, 2026. The rehearsal schedule will be shared after the initial review.</p>
                <p>Key points to remember:</p>
                <ul className="list-disc list-inside text-xs space-y-1 text-muted-foreground">
                  <li>Theme: &ldquo;Unity in Diversity&rdquo;</li>
                  <li>Maximum 15 students per performance</li>
                  <li>Props and costumes budget: ₹5,000 per class</li>
                  <li>Music tracks to be submitted in MP3 format</li>
                </ul>
                <p>Best regards,<br />Principal Sharma</p>
              </div>

              {/* Reply */}
              <div className="mt-4 pt-4 border-t border-border">
                <textarea
                  rows={3}
                  placeholder="Type your reply..."
                  className="w-full px-3 py-2 rounded-lg border border-input bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-birla-gold/40"
                />
                <div className="flex items-center justify-end gap-2 mt-2">
                  <button className="px-3 py-1.5 rounded-lg border border-border text-xs font-medium hover:bg-muted transition-colors">Save Draft</button>
                  <button className="flex items-center gap-1 px-3 py-1.5 rounded-lg gradient-birla text-white text-xs font-medium">
                    <Send className="w-3 h-3" /> Send Reply
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}

      {/* ─── Rubric-Based Assessment ────────────────────────────── */}
      {activeTab === 'rubric' && (
        <motion.div variants={itemVariants} className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-semibold text-foreground flex items-center gap-2">
              <Sliders className="w-5 h-5 text-birla-gold" />
              Rubric-Based Assessment Tool
            </h3>
            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg gradient-birla text-white text-xs font-medium">
              <Plus className="w-3.5 h-3.5" /> Create Rubric
            </button>
          </div>

          {/* Rubric Table */}
          <div className="rounded-2xl border border-border bg-card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border bg-muted/30">
                    <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground w-36">Criterion (Weight)</th>
                    <th className="text-center px-3 py-3 text-[10px] font-semibold text-rose-500">1 - Beginning</th>
                    <th className="text-center px-3 py-3 text-[10px] font-semibold text-amber-500">2 - Developing</th>
                    <th className="text-center px-3 py-3 text-[10px] font-semibold text-blue-500">3 - Proficient</th>
                    <th className="text-center px-3 py-3 text-[10px] font-semibold text-emerald-500">4 - Advanced</th>
                    <th className="text-center px-3 py-3 text-[10px] font-semibold text-purple-500">5 - Expert</th>
                  </tr>
                </thead>
                <tbody>
                  {rubricCriteria.map((criterion) => (
                    <tr key={criterion.id} className="border-b border-border/50 hover:bg-muted/20 transition-colors">
                      <td className="px-4 py-3">
                        <p className="text-xs font-semibold text-foreground">{criterion.criterion}</p>
                        <p className="text-[9px] text-muted-foreground">Weight: {criterion.weight}%</p>
                      </td>
                      {criterion.levels.map((level, idx) => (
                        <td key={idx} className="px-3 py-3 text-center">
                          <span className="text-[10px] text-muted-foreground leading-tight">{level}</span>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Rubric Assessment for Student */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-5">
              <h4 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
                <PenTool className="w-4 h-4 text-birla-cyan" />
                Assess Student
              </h4>
              <div className="space-y-3">
                <div>
                  <label className="text-xs text-muted-foreground mb-1 block">Select Student</label>
                  <select className="w-full px-3 py-2 rounded-lg border border-input bg-background text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-birla-gold/40">
                    {evaluationData.map((s) => (
                      <option key={s.id} value={s.id}>{s.name} (Roll #{s.roll})</option>
                    ))}
                  </select>
                </div>
                {rubricCriteria.map((criterion) => (
                  <div key={criterion.id} className="p-3 rounded-xl border border-border">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-medium text-foreground">{criterion.criterion}</span>
                      <span className="text-[9px] text-muted-foreground">{criterion.weight}%</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {[1, 2, 3, 4, 5].map((level) => (
                        <button
                          key={level}
                          className={`flex-1 py-1.5 rounded-lg text-[10px] font-medium transition-all ${
                            level === 3
                              ? 'gradient-birla text-white'
                              : 'border border-border text-muted-foreground hover:bg-muted'
                          }`}
                        >
                          {level}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
                <button className="flex items-center gap-1.5 px-4 py-2 rounded-lg gradient-birla text-white text-xs font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Submit Assessment
                </button>
              </div>
            </motion.div>

            {/* Rubric Stats */}
            <motion.div variants={itemVariants} className="space-y-4">
              <div className="rounded-2xl border border-border bg-card p-5">
                <h4 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                  <BarChart3 className="w-4 h-4 text-birla-cyan" />
                  Criterion Weight Distribution
                </h4>
                <div className="h-48">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={rubricCriteria} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'} horizontal={false} />
                      <XAxis type="number" tick={{ fontSize: 9 }} stroke={darkMode ? '#64748b' : '#94a3b8'} tickFormatter={(v) => `${v}%`} />
                      <YAxis type="category" dataKey="criterion" tick={{ fontSize: 9 }} stroke={darkMode ? '#64748b' : '#94a3b8'} width={110} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: darkMode ? '#1A2D4A' : '#fff',
                          border: `1px solid ${darkMode ? 'rgba(255,255,255,0.1)' : '#e2e8f0'}`,
                          borderRadius: '12px', fontSize: '11px', color: darkMode ? '#e2e8f0' : '#1e293b',
                        }}
                        formatter={(value) => [`${value}%`, 'Weight']}
                      />
                      <Bar dataKey="weight" fill="#C8A45C" radius={[0, 6, 6, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="rounded-2xl border border-border bg-card p-5">
                <h4 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                  <Grid3X3 className="w-4 h-4 text-purple-500" />
                  Assessment Summary
                </h4>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { label: 'Rubrics Created', value: '12', color: 'text-blue-500 bg-blue-500/10' },
                    { label: 'Assessments Done', value: '186', color: 'text-emerald-500 bg-emerald-500/10' },
                    { label: 'Avg Score', value: '3.6/5', color: 'text-amber-500 bg-amber-500/10' },
                    { label: 'Pending', value: '24', color: 'text-rose-500 bg-rose-500/10' },
                  ].map((stat) => (
                    <div key={stat.label} className="p-3 rounded-xl border border-border flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${stat.color}`}>
                        <Star className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-foreground">{stat.value}</p>
                        <p className="text-[9px] text-muted-foreground">{stat.label}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </motion.div>
  )
}
