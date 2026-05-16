'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  BookOpen, Calendar, Clock, CheckCircle2, XCircle,
  FileText, BarChart3, Brain, GraduationCap, Award,
  Star, TrendingUp, Target, Sparkles, PenTool, Zap,
  Timer, Lightbulb, ChevronRight, AlertTriangle,
  StickyNote, Trophy, Flame, Medal, Shield, BadgeCheck,
  BookMarked, ClipboardCheck, Activity, MessageCircle,
  ArrowUpRight, CircleDot, Users, Play, Pause
} from 'lucide-react'
import {
  AreaChart, Area, BarChart, Bar, LineChart, Line, XAxis, YAxis,
  CartesianGrid, Tooltip, ResponsiveContainer, Legend, RadarChart,
  Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, PieChart, Pie, Cell
} from 'recharts'
import useAppStore from '@/store/useAppStore'

// ─── Data ────────────────────────────────────────────────────────
const todayTimetable = [
  { id: 1, time: '08:00 - 08:45', subject: 'Mathematics', teacher: 'Dr. Priya Menon', room: 'Room 201', status: 'completed' },
  { id: 2, time: '08:45 - 09:30', subject: 'Mathematics', teacher: 'Dr. Priya Menon', room: 'Room 201', status: 'completed' },
  { id: 3, time: '09:30 - 09:50', subject: 'Break', teacher: '', room: '', status: 'completed' },
  { id: 4, time: '09:50 - 10:35', subject: 'English', teacher: 'Mrs. Kavitha Rao', room: 'Room 201', status: 'completed' },
  { id: 5, time: '10:35 - 11:20', subject: 'Science', teacher: 'Mr. Suresh Babu', room: 'Lab 3', status: 'in-progress' },
  { id: 6, time: '11:20 - 12:05', subject: 'Social Science', teacher: 'Mrs. Lakshmi Nair', room: 'Room 201', status: 'upcoming' },
  { id: 7, time: '12:05 - 12:45', subject: 'Lunch Break', teacher: '', room: '', status: 'upcoming' },
  { id: 8, time: '12:45 - 13:30', subject: 'Hindi', teacher: 'Mr. Raghav Pandey', room: 'Room 305', status: 'upcoming' },
  { id: 9, time: '13:30 - 14:15', subject: 'Computer Science', teacher: 'Ms. Anjali Deshmukh', room: 'IT Lab', status: 'upcoming' },
]

const homeworkData = [
  { id: 1, subject: 'Mathematics', title: 'Solve Quadratic Equations - Ex 4.3 (Q1-Q10)', dueDate: '2026-03-14', status: 'pending', priority: 'high' },
  { id: 2, subject: 'English', title: 'Write an Essay on "Digital India"', dueDate: '2026-03-15', status: 'pending', priority: 'medium' },
  { id: 3, subject: 'Science', title: 'Lab Report: Chemical Reactions & Equations', dueDate: '2026-03-13', status: 'submitted', priority: 'high' },
  { id: 4, subject: 'Social Science', title: 'Map Work - Resources of India', dueDate: '2026-03-12', status: 'late', priority: 'low' },
  { id: 5, subject: 'Hindi', title: 'Path - Sanchayan Chapter 3 Summary', dueDate: '2026-03-16', status: 'pending', priority: 'medium' },
  { id: 6, subject: 'Computer Science', title: 'Python Program - Bubble Sort Algorithm', dueDate: '2026-03-17', status: 'pending', priority: 'high' },
  { id: 7, subject: 'Mathematics', title: 'Arithmetic Progressions Worksheet', dueDate: '2026-03-10', status: 'submitted', priority: 'medium' },
  { id: 8, subject: 'Science', title: 'Diagram - Structure of Human Heart', dueDate: '2026-03-11', status: 'submitted', priority: 'low' },
]

const performanceTrendData = [
  { term: 'FA1', Mathematics: 82, English: 78, Science: 85, SocialScience: 72, Hindi: 88, ComputerScience: 91 },
  { term: 'FA2', Mathematics: 85, English: 80, Science: 83, SocialScience: 75, Hindi: 90, ComputerScience: 93 },
  { term: 'SA1', Mathematics: 88, English: 82, Science: 87, SocialScience: 78, Hindi: 86, ComputerScience: 95 },
  { term: 'FA3', Mathematics: 90, English: 85, Science: 89, SocialScience: 80, Hindi: 92, ComputerScience: 94 },
  { term: 'FA4', Mathematics: 92, English: 87, Science: 91, SocialScience: 82, Hindi: 94, ComputerScience: 96 },
  { term: 'SA2', Mathematics: 94, English: 89, Science: 93, SocialScience: 85, Hindi: 95, ComputerScience: 97 },
]

const attendanceMonthData = [
  { day: 1, status: 'present' }, { day: 2, status: 'present' }, { day: 3, status: 'present' },
  { day: 4, status: 'present' }, { day: 5, status: 'present' }, { day: 6, status: 'weekend' },
  { day: 7, status: 'weekend' }, { day: 8, status: 'present' }, { day: 9, status: 'late' },
  { day: 10, status: 'present' }, { day: 11, status: 'present' }, { day: 12, status: 'absent' },
  { day: 13, status: 'weekend' }, { day: 14, status: 'weekend' }, { day: 15, status: 'present' },
  { day: 16, status: 'present' }, { day: 17, status: 'present' }, { day: 18, status: 'present' },
  { day: 19, status: 'late' }, { day: 20, status: 'present' }, { day: 21, status: 'weekend' },
  { day: 22, status: 'weekend' }, { day: 23, status: 'present' }, { day: 24, status: 'present' },
  { day: 25, status: 'present' }, { day: 26, status: 'present' }, { day: 27, status: 'weekend' },
  { day: 28, status: 'weekend' }, { day: 29, status: 'present' }, { day: 30, status: 'present' },
  { day: 31, status: 'present' },
]

const subjectProgressData = [
  { subject: 'Mathematics', progress: 88, color: '#3B82F6' },
  { subject: 'English', progress: 82, color: '#8B5CF6' },
  { subject: 'Science', progress: 91, color: '#10B981' },
  { subject: 'Social Science', progress: 75, color: '#F59E0B' },
  { subject: 'Hindi', progress: 94, color: '#EF4444' },
  { subject: 'Computer Sci.', progress: 96, color: '#22D3EE' },
]

const achievementsData = [
  { id: 1, name: 'Math Wizard', description: 'Scored 90%+ in 3 consecutive Math exams', icon: '🧙‍♂️', earned: true, earnedDate: 'Feb 2026', category: 'Academic' },
  { id: 2, name: 'Science Explorer', description: 'Completed 10+ science lab experiments', icon: '🔬', earned: true, earnedDate: 'Jan 2026', category: 'Academic' },
  { id: 3, name: 'Book Worm', description: 'Read 25+ books from school library', icon: '📚', earned: true, earnedDate: 'Dec 2025', category: 'Reading' },
  { id: 4, name: 'Perfect Attendance', description: '100% attendance for a full month', icon: '🎯', earned: true, earnedDate: 'Nov 2025', category: 'Attendance' },
  { id: 5, name: 'Quiz Champion', description: 'Won 3+ inter-school quiz competitions', icon: '🏆', earned: true, earnedDate: 'Mar 2026', category: 'Competition' },
  { id: 6, name: 'Code Ninja', description: 'Built 5+ projects in Computer Science', icon: '💻', earned: true, earnedDate: 'Feb 2026', category: 'Technical' },
  { id: 7, name: 'Debate Master', description: 'Participated in 5+ debate competitions', icon: '🎤', earned: false, earnedDate: null, category: 'Communication' },
  { id: 8, name: 'Sports Star', description: 'Represented school in district sports', icon: '⚽', earned: false, earnedDate: null, category: 'Sports' },
  { id: 9, name: 'Creative Genius', description: 'Won art or creative writing competition', icon: '🎨', earned: true, earnedDate: 'Jan 2026', category: 'Creative' },
  { id: 10, name: 'Team Leader', description: 'Led 3+ group projects successfully', icon: '👑', earned: true, earnedDate: 'Dec 2025', category: 'Leadership' },
  { id: 11, name: 'Eco Warrior', description: 'Participated in 5+ environment initiatives', icon: '🌿', earned: false, earnedDate: null, category: 'Social' },
  { id: 12, name: 'Polyglot', description: 'Proficient in 3+ languages', icon: '🗣️', earned: true, earnedDate: 'Mar 2026', category: 'Language' },
]

const aiRecommendations = [
  { id: 1, type: 'weak-area', title: 'Focus on Social Science', description: 'Your Social Science scores have been consistently lower. Try dedicating 30 mins daily to map work and historical timelines.', priority: 'high', icon: Target, color: 'text-rose-500 bg-rose-500/10' },
  { id: 2, type: 'improvement', title: 'English Essay Writing', description: 'Practice structured essay writing with PEEL method (Point, Evidence, Explain, Link) to improve your English scores.', priority: 'medium', icon: TrendingUp, color: 'text-amber-500 bg-amber-500/10' },
  { id: 3, type: 'strength', title: 'Keep Up Mathematics!', description: 'Your Math performance has shown a steady upward trend. Continue with daily practice and consider helping peers.', priority: 'low', icon: Star, color: 'text-emerald-500 bg-emerald-500/10' },
  { id: 4, type: 'study-tip', title: 'Active Recall Technique', description: 'Instead of re-reading, try active recall for Science. Close the book and write down everything you remember about a topic.', priority: 'medium', icon: Lightbulb, color: 'text-purple-500 bg-purple-500/10' },
  { id: 5, type: 'schedule', title: 'Optimize Study Hours', description: 'Your peak performance time seems to be 6-8 PM. Schedule difficult subjects like Math and Science during this window.', priority: 'low', icon: Clock, color: 'text-birla-cyan bg-birla-cyan/10' },
]

const digitalNotes = [
  { id: 1, subject: 'Mathematics', title: 'Quadratic Equations - Key Formulas', date: '12 Mar 2026', preview: 'Discriminant D = b²-4ac. If D>0 → 2 real roots, D=0 → equal roots, D<0 → no real roots...' },
  { id: 2, subject: 'Science', title: 'Chemical Reactions - Types & Examples', date: '11 Mar 2026', preview: 'Combination: 2H₂+O₂→2H₂O, Decomposition: 2H₂O→2H₂+O₂, Displacement: Fe+CuSO₄→FeSO₄+Cu...' },
  { id: 3, subject: 'English', title: 'The Midnight Visitor - Character Sketch', date: '10 Mar 2026', preview: 'Ausable - clever, quick-witted, overweight secret agent. Contrasts typical spy image. Uses intelligence over brawn...' },
  { id: 4, subject: 'Social Science', title: 'Globalisation & Indian Economy', date: '09 Mar 2026', preview: 'MNCs set up production where: 1) Close to markets 2) Skilled labour available 3) Low cost of production...' },
  { id: 5, subject: 'Hindi', title: 'Sanchayan - Badi Amma Notes', date: '08 Mar 2026', preview: 'बड़ी अम्मा - दया प्रकाश सिन्हा। प्रमुख विचार - वृद्धावस्था में सम्मान की अपेक्षा...' },
  { id: 6, subject: 'Computer Science', title: 'Python - List & Dictionary Methods', date: '07 Mar 2026', preview: 'List: append(), extend(), insert(), remove(), pop(), sort(), reverse(). Dict: keys(), values(), items(), get()...' },
]

const examPrepData = [
  { id: 1, subject: 'Mathematics', date: '20 Mar 2026', syllabus: 'Quadratic Equations, Arithmetic Progressions', coverage: 78, tips: 'Practice NCERT Exemplar problems. Focus on word problems and application-based questions.', chapters: 2 },
  { id: 2, subject: 'Science', date: '22 Mar 2026', syllabus: 'Chemical Reactions, Acids Bases & Salts, Life Processes', coverage: 65, tips: 'Revise chemical equations and diagrams. Practice lab-based questions for Life Processes.', chapters: 3 },
  { id: 3, subject: 'English', date: '24 Mar 2026', syllabus: 'First Flight (Ch 1-6), Footprints (Ch 1-4)', coverage: 82, tips: 'Practice letter writing formats. Revise character sketches and theme-based answers.', chapters: 10 },
  { id: 4, subject: 'Social Science', date: '26 Mar 2026', syllabus: 'History Ch 1-3, Geography Ch 1-4, Civics Ch 1-2', coverage: 55, tips: 'Focus on map work and timeline events. Practice answer writing within word limits.', chapters: 9 },
  { id: 5, subject: 'Hindi', date: '28 Mar 2026', syllabus: 'Kshitij (Ch 1-5), Kritika (Ch 1-2)', coverage: 70, tips: 'Practice letter and essay formats. Memorize key poetry lines with meanings.', chapters: 7 },
  { id: 6, subject: 'Computer Science', date: '30 Mar 2026', syllabus: 'Python Revision Tour, Functions, Lists & Dictionaries', coverage: 90, tips: 'Practice output-based questions. Write dry runs for complex programs.', chapters: 3 },
]

const activityData = [
  { id: 1, name: 'Inter-School Quiz Competition', type: 'Academic', status: 'Completed', achievement: '1st Place', date: 'Feb 2026' },
  { id: 2, name: 'Science Exhibition', type: 'Science', status: 'Completed', achievement: 'Best Innovation Award', date: 'Jan 2026' },
  { id: 3, name: 'Annual Day - Drama', type: 'Cultural', status: 'Completed', achievement: 'Lead Role', date: 'Dec 2025' },
  { id: 4, name: 'Cricket Tournament', type: 'Sports', status: 'In Progress', achievement: '-', date: 'Mar 2026' },
  { id: 5, name: 'Math Olympiad', type: 'Academic', status: 'Upcoming', achievement: '-', date: 'Apr 2026' },
  { id: 6, name: 'Robotics Club Project', type: 'Technical', status: 'In Progress', achievement: '-', date: 'Mar-Apr 2026' },
  { id: 7, name: 'Hindi Debate Competition', type: 'Literary', status: 'Upcoming', achievement: '-', date: 'Apr 2026' },
  { id: 8, name: 'Yoga Day Celebration', type: 'Wellness', status: 'Completed', achievement: 'Participation Certificate', date: 'Nov 2025' },
]

const skillMappingData = [
  { skill: 'Communication', score: 78 },
  { skill: 'Critical Thinking', score: 85 },
  { skill: 'Creativity', score: 72 },
  { skill: 'Collaboration', score: 88 },
  { skill: 'Digital Literacy', score: 92 },
  { skill: 'Problem Solving', score: 80 },
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

// ─── Circular Progress Component ──────────────────────────────────
function CircularProgress({ percentage, color, size = 80, strokeWidth = 6 }) {
  const radius = (size - strokeWidth) / 2
  const circumference = radius * 2 * Math.PI
  const offset = circumference - (percentage / 100) * circumference

  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg className="transform -rotate-90" width={size} height={size}>
        <circle cx={size / 2} cy={size / 2} r={radius} stroke="currentColor" strokeWidth={strokeWidth} fill="none" className="text-muted/30" />
        <circle
          cx={size / 2} cy={size / 2} r={radius} stroke={color} strokeWidth={strokeWidth} fill="none"
          strokeDasharray={circumference} strokeDashoffset={offset}
          strokeLinecap="round" className="transition-all duration-700"
        />
      </svg>
      <span className="absolute text-sm font-bold text-foreground">{percentage}%</span>
    </div>
  )
}

// ─── Main Component ───────────────────────────────────────────────
export default function StudentPortal() {
  const { darkMode } = useAppStore()
  const [activeTab, setActiveTab] = useState('overview')

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'timetable', label: 'Timetable', icon: Calendar },
    { id: 'homework', label: 'Homework', icon: FileText },
    { id: 'performance', label: 'Performance', icon: TrendingUp },
    { id: 'achievements', label: 'Achievements', icon: Award },
    { id: 'examprep', label: 'Exam Prep', icon: ClipboardCheck },
  ]

  const presentDays = attendanceMonthData.filter(d => d.status === 'present').length
  const lateDays = attendanceMonthData.filter(d => d.status === 'late').length
  const absentDays = attendanceMonthData.filter(d => d.status === 'absent').length
  const totalWorkingDays = attendanceMonthData.filter(d => d.status !== 'weekend').length
  const attendancePercent = Math.round(((presentDays + lateDays * 0.5) / totalWorkingDays) * 100)

  const pendingHW = homeworkData.filter(h => h.status === 'pending').length
  const submittedHW = homeworkData.filter(h => h.status === 'submitted').length
  const lateHW = homeworkData.filter(h => h.status === 'late').length
  const earnedBadges = achievementsData.filter(a => a.earned).length

  const tooltipStyle = {
    contentStyle: {
      backgroundColor: darkMode ? '#1A2D4A' : '#fff',
      border: `1px solid ${darkMode ? 'rgba(255,255,255,0.1)' : '#e2e8f0'}`,
      borderRadius: '12px',
      fontSize: '12px',
      color: darkMode ? '#e2e8f0' : '#1e293b',
    },
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="p-4 lg:p-6 space-y-6 max-w-[1600px] mx-auto"
    >
      {/* ─── Student Header ──────────────────────────────── */}
      <motion.div variants={itemVariants} className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl gradient-birla flex items-center justify-center">
            <GraduationCap className="w-6 h-6 text-birla-gold" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-foreground">Student Portal</h2>
            <p className="text-xs text-muted-foreground">Welcome back, Aarav Sharma &bull; Class X-A &bull; Roll No. 01</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[10px] font-medium flex items-center gap-1">
            <Flame className="w-3 h-3" /> 15 Day Streak
          </span>
          <span className="px-3 py-1 rounded-full bg-birla-gold/10 text-birla-gold text-[10px] font-medium flex items-center gap-1">
            <Medal className="w-3 h-3" /> Rank #3
          </span>
        </div>
      </motion.div>

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

      {/* ═══════════════════════════════════════════════════════════════
          OVERVIEW TAB
         ═══════════════════════════════════════════════════════════════ */}
      {activeTab === 'overview' && (
        <motion.div variants={containerVariants} initial="hidden" animate="show" className="space-y-6">

          {/* ─── Top Stats Row ──────────────────────────────── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: "Today's Classes", value: '6', icon: Calendar, color: 'from-blue-900 to-blue-700', sub: '2 completed' },
              { label: 'Pending Homework', value: '4', icon: FileText, color: 'from-amber-800 to-amber-600', sub: '2 due today' },
              { label: 'Attendance Rate', value: '96%', icon: CheckCircle2, color: 'from-emerald-800 to-emerald-600', sub: `${presentDays} present this month` },
              { label: 'Skill Badges', value: '12', icon: Award, color: 'from-purple-800 to-purple-600', sub: `${earnedBadges} earned` },
            ].map((stat) => {
              const Icon = stat.icon
              return (
                <motion.div key={stat.label} variants={itemVariants} className={`rounded-2xl bg-gradient-to-br ${stat.color} p-4 text-white hover:shadow-lg transition-shadow`}>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">{stat.value}</p>
                      <p className="text-[10px] text-white/70">{stat.label}</p>
                      <p className="text-[9px] text-white/50">{stat.sub}</p>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* ─── Daily Timetable Widget ────────────────────── */}
            <motion.div variants={itemVariants} className="lg:col-span-2 rounded-2xl border border-border bg-card p-5">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-sm font-semibold text-foreground flex items-center gap-2">
                  <Clock className="w-4 h-4 text-birla-cyan" />
                  Today&apos;s Timetable
                </h4>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-birla-cyan/10 text-birla-cyan font-medium">
                  {new Date().toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'short' })}
                </span>
              </div>
              <div className="space-y-2 max-h-80 overflow-y-auto">
                {todayTimetable.filter(t => t.subject !== 'Break' && t.subject !== 'Lunch Break').map((item) => (
                  <div
                    key={item.id}
                    className={`flex items-center gap-3 p-3 rounded-xl border transition-all ${
                      item.status === 'completed'
                        ? 'border-emerald-500/20 bg-emerald-500/5'
                        : item.status === 'in-progress'
                          ? 'border-birla-cyan/30 bg-birla-cyan/5 animate-pulse-glow'
                          : 'border-border gradient-card-blue'
                    }`}
                  >
                    <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${
                      item.status === 'completed' ? 'bg-emerald-500/15' :
                      item.status === 'in-progress' ? 'bg-birla-cyan/15' : 'bg-muted/50'
                    }`}>
                      {item.status === 'completed' ? <CheckCircle2 className="w-4 h-4 text-emerald-500" /> :
                       item.status === 'in-progress' ? <Play className="w-4 h-4 text-birla-cyan" /> :
                       <Clock className="w-4 h-4 text-muted-foreground" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="text-xs font-semibold text-foreground">{item.subject}</p>
                        <span className={`px-1.5 py-0.5 rounded text-[8px] font-medium ${
                          item.status === 'completed' ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' :
                          item.status === 'in-progress' ? 'bg-birla-cyan/10 text-birla-cyan' :
                          'bg-muted text-muted-foreground'
                        }`}>
                          {item.status === 'in-progress' ? 'Live Now' : item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                        </span>
                      </div>
                      <p className="text-[10px] text-muted-foreground">{item.teacher} &bull; {item.room}</p>
                    </div>
                    <span className="text-[10px] text-muted-foreground font-medium flex-shrink-0">{item.time}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* ─── Homework Tracker Mini ─────────────────────── */}
            <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-5">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-sm font-semibold text-foreground flex items-center gap-2">
                  <FileText className="w-4 h-4 text-amber-500" />
                  Homework Tracker
                </h4>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 font-medium">
                  {pendingHW} pending
                </span>
              </div>
              <div className="space-y-2 max-h-80 overflow-y-auto">
                {homeworkData.filter(h => h.status === 'pending' || h.status === 'late').map((hw) => (
                  <div key={hw.id} className={`p-3 rounded-xl border ${
                    hw.status === 'late' ? 'border-rose-500/20 bg-rose-500/5' :
                    hw.priority === 'high' ? 'border-amber-500/20 bg-amber-500/5' :
                    'border-border gradient-card-blue'
                  }`}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[9px] font-medium text-muted-foreground">{hw.subject}</span>
                      <span className={`px-1.5 py-0.5 rounded text-[8px] font-medium ${
                        hw.priority === 'high' ? 'bg-rose-500/10 text-rose-500' :
                        hw.priority === 'medium' ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400' :
                        'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                      }`}>
                        {hw.priority}
                      </span>
                    </div>
                    <p className="text-[11px] font-medium text-foreground leading-tight">{hw.title}</p>
                    <div className="flex items-center justify-between mt-1">
                      <span className={`text-[9px] font-medium ${
                        hw.status === 'late' ? 'text-rose-500' : 'text-muted-foreground'
                      }`}>
                        Due: {new Date(hw.dueDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                      </span>
                      <span className={`text-[8px] px-1.5 py-0.5 rounded font-medium ${
                        hw.status === 'late' ? 'bg-rose-500/10 text-rose-500' :
                        'bg-amber-500/10 text-amber-600 dark:text-amber-400'
                      }`}>
                        {hw.status === 'late' ? 'Overdue' : 'Pending'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* ─── Performance Analytics (AreaChart) ────────── */}
            <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-5">
              <h4 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-emerald-500" />
                Subject-wise Performance Trend
              </h4>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={performanceTrendData} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? 'rgba(255,255,255,0.06)' : '#e2e8f0'} />
                    <XAxis dataKey="term" tick={{ fontSize: 10, fill: darkMode ? '#94a3b8' : '#64748b' }} />
                    <YAxis tick={{ fontSize: 10, fill: darkMode ? '#94a3b8' : '#64748b' }} domain={[50, 100]} />
                    <Tooltip {...tooltipStyle} />
                    <Legend wrapperStyle={{ fontSize: '10px' }} />
                    <Area type="monotone" dataKey="Mathematics" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.1} strokeWidth={2} />
                    <Area type="monotone" dataKey="Science" stroke="#10B981" fill="#10B981" fillOpacity={0.1} strokeWidth={2} />
                    <Area type="monotone" dataKey="English" stroke="#8B5CF6" fill="#8B5CF6" fillOpacity={0.1} strokeWidth={2} />
                    <Area type="monotone" dataKey="Hindi" stroke="#EF4444" fill="#EF4444" fillOpacity={0.1} strokeWidth={2} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </motion.div>

            {/* ─── Attendance Overview ────────────────────────── */}
            <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-5">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-sm font-semibold text-foreground flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  Attendance - March 2026
                </h4>
                <span className="text-lg font-bold text-gradient-birla">{attendancePercent}%</span>
              </div>
              <div className="grid grid-cols-7 gap-1.5 mb-4">
                {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((d, i) => (
                  <div key={i} className="text-[9px] text-muted-foreground text-center font-medium py-1">{d}</div>
                ))}
                {/* Empty cells for March 2026 starting on Sunday */}
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={`empty-${i}`} />
                ))}
                {attendanceMonthData.map((day) => (
                  <div
                    key={day.day}
                    className={`aspect-square rounded-lg flex items-center justify-center text-[10px] font-medium transition-all ${
                      day.status === 'present' ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400' :
                      day.status === 'absent' ? 'bg-rose-500/15 text-rose-500' :
                      day.status === 'late' ? 'bg-amber-500/15 text-amber-600 dark:text-amber-400' :
                      'bg-muted/30 text-muted-foreground/40'
                    }`}
                    title={`${day.day} Mar - ${day.status}`}
                  >
                    {day.day}
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-4 mt-2">
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded bg-emerald-500/15 border border-emerald-500/30" />
                  <span className="text-[10px] text-muted-foreground">Present ({presentDays})</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded bg-amber-500/15 border border-amber-500/30" />
                  <span className="text-[10px] text-muted-foreground">Late ({lateDays})</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded bg-rose-500/15 border border-rose-500/30" />
                  <span className="text-[10px] text-muted-foreground">Absent ({absentDays})</span>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* ─── Learning Progress ─────────────────────────── */}
            <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-5">
              <h4 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
                <Target className="w-4 h-4 text-purple-500" />
                Subject Competency
              </h4>
              <div className="grid grid-cols-2 gap-4">
                {subjectProgressData.map((subj) => (
                  <div key={subj.subject} className="flex flex-col items-center gap-1.5">
                    <CircularProgress percentage={subj.progress} color={subj.color} size={72} strokeWidth={5} />
                    <p className="text-[10px] font-medium text-foreground text-center">{subj.subject}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* ─── AI Study Assistant ────────────────────────── */}
            <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-5">
              <h4 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
                <Brain className="w-4 h-4 text-birla-cyan" />
                AI Study Assistant
              </h4>
              <div className="space-y-3 max-h-80 overflow-y-auto">
                {aiRecommendations.map((rec) => {
                  const Icon = rec.icon
                  return (
                    <div key={rec.id} className="p-3 rounded-xl border border-border gradient-card-blue hover:shadow-sm transition-all">
                      <div className="flex items-start gap-2.5">
                        <div className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 ${rec.color}`}>
                          <Icon className="w-3.5 h-3.5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-[11px] font-semibold text-foreground">{rec.title}</p>
                          <p className="text-[9px] text-muted-foreground mt-0.5 leading-relaxed">{rec.description}</p>
                        </div>
                        <span className={`w-2 h-2 rounded-full flex-shrink-0 mt-1.5 ${
                          rec.priority === 'high' ? 'bg-rose-500' :
                          rec.priority === 'medium' ? 'bg-amber-500' : 'bg-emerald-500'
                        }`} />
                      </div>
                    </div>
                  )
                })}
              </div>
            </motion.div>

            {/* ─── Digital Notes ─────────────────────────────── */}
            <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-5">
              <h4 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
                <StickyNote className="w-4 h-4 text-amber-500" />
                Digital Notes
              </h4>
              <div className="space-y-2 max-h-80 overflow-y-auto">
                {digitalNotes.map((note) => (
                  <div key={note.id} className="p-3 rounded-xl border border-border gradient-card-blue hover:shadow-sm transition-all cursor-pointer group">
                    <div className="flex items-center justify-between mb-1">
                      <span className="px-1.5 py-0.5 rounded text-[8px] font-medium bg-birla-gold/10 text-birla-gold">{note.subject}</span>
                      <span className="text-[9px] text-muted-foreground">{note.date}</span>
                    </div>
                    <p className="text-[11px] font-semibold text-foreground group-hover:text-gradient-birla transition-colors">{note.title}</p>
                    <p className="text-[9px] text-muted-foreground mt-0.5 line-clamp-2 leading-relaxed">{note.preview}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* ─── Gamified Achievements (Mini) ─────────────── */}
            <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-5">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-sm font-semibold text-foreground flex items-center gap-2">
                  <Trophy className="w-4 h-4 text-birla-gold" />
                  Recent Badges
                </h4>
                <button onClick={() => setActiveTab('achievements')} className="text-[10px] text-birla-cyan hover:underline flex items-center gap-0.5">
                  View All <ChevronRight className="w-3 h-3" />
                </button>
              </div>
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                {achievementsData.filter(a => a.earned).slice(0, 8).map((badge) => (
                  <div key={badge.id} className="flex flex-col items-center gap-1.5 p-2 rounded-xl border border-border gradient-card-blue hover:shadow-sm transition-all">
                    <span className="text-2xl">{badge.icon}</span>
                    <p className="text-[9px] font-medium text-foreground text-center leading-tight">{badge.name}</p>
                    <p className="text-[8px] text-muted-foreground">{badge.earnedDate}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* ─── Skill Mapping (RadarChart) ────────────────── */}
            <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-5">
              <h4 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
                <Shield className="w-4 h-4 text-purple-500" />
                NEP 2020 Skill Mapping
              </h4>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={skillMappingData} cx="50%" cy="50%" outerRadius="70%">
                    <PolarGrid stroke={darkMode ? 'rgba(255,255,255,0.08)' : '#e2e8f0'} />
                    <PolarAngleAxis dataKey="skill" tick={{ fontSize: 9, fill: darkMode ? '#94a3b8' : '#64748b' }} />
                    <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fontSize: 8, fill: darkMode ? '#64748b' : '#94a3b8' }} />
                    <Radar name="Skills" dataKey="score" stroke="#22D3EE" fill="#22D3EE" fillOpacity={0.2} strokeWidth={2} />
                    <Radar name="Target" dataKey={() => 85} stroke="#C8A45C" fill="none" strokeWidth={1} strokeDasharray="5 5" />
                    <Tooltip {...tooltipStyle} />
                    <Legend wrapperStyle={{ fontSize: '10px' }} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </motion.div>
          </div>

          {/* ─── Activity Participation (Overview) ──────────── */}
          <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-5">
            <h4 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
              <Activity className="w-4 h-4 text-birla-cyan" />
              Co-curricular Activities
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {activityData.slice(0, 4).map((act) => (
                <div key={act.id} className="p-3 rounded-xl border border-border gradient-card-blue hover:shadow-sm transition-all">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className={`px-1.5 py-0.5 rounded text-[8px] font-medium ${
                      act.type === 'Academic' ? 'bg-blue-500/10 text-blue-500' :
                      act.type === 'Science' ? 'bg-emerald-500/10 text-emerald-500' :
                      act.type === 'Cultural' ? 'bg-purple-500/10 text-purple-500' :
                      act.type === 'Sports' ? 'bg-amber-500/10 text-amber-500' :
                      'bg-muted text-muted-foreground'
                    }`}>
                      {act.type}
                    </span>
                    <span className={`w-2 h-2 rounded-full ${
                      act.status === 'Completed' ? 'bg-emerald-500' :
                      act.status === 'In Progress' ? 'bg-birla-cyan' : 'bg-amber-500'
                    }`} />
                  </div>
                  <p className="text-[11px] font-semibold text-foreground">{act.name}</p>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-[9px] text-muted-foreground">{act.date}</span>
                    {act.achievement !== '-' && (
                      <span className="text-[9px] text-birla-gold font-medium flex items-center gap-0.5">
                        <Trophy className="w-2.5 h-2.5" /> {act.achievement}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* ═══════════════════════════════════════════════════════════════
          TIMETABLE TAB
         ═══════════════════════════════════════════════════════════════ */}
      {activeTab === 'timetable' && (
        <motion.div variants={containerVariants} initial="hidden" animate="show" className="space-y-6">
          <motion.div variants={itemVariants}>
            <h3 className="text-base font-semibold text-foreground flex items-center gap-2 mb-4">
              <Calendar className="w-5 h-5 text-birla-gold" />
              Weekly Timetable &bull; Class X-A
            </h3>
          </motion.div>

          <motion.div variants={itemVariants} className="overflow-x-auto rounded-2xl border border-border bg-card">
            <div className="min-w-[800px]">
              {/* Header */}
              <div className="grid grid-cols-6 border-b border-border bg-muted/30">
                <div className="p-3 text-xs font-semibold text-muted-foreground">Time</div>
                {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].map((day) => (
                  <div key={day} className="p-3 text-xs font-semibold text-foreground text-center">{day}</div>
                ))}
              </div>
              {/* Periods */}
              {[
                { time: '08:00-08:45', slots: ['Mathematics', 'English', 'Science', 'Mathematics', 'Hindi'] },
                { time: '08:45-09:30', slots: ['Mathematics', 'Science', 'English', 'Science', 'English'] },
                { time: '09:30-09:50', slots: ['Break', 'Break', 'Break', 'Break', 'Break'] },
                { time: '09:50-10:35', slots: ['English', 'Social Science', 'Mathematics', 'Hindi', 'Computer Science'] },
                { time: '10:35-11:20', slots: ['Science', 'Mathematics', 'Social Science', 'English', 'Mathematics'] },
                { time: '11:20-12:05', slots: ['Social Science', 'Hindi', 'Computer Science', 'Social Science', 'Science'] },
                { time: '12:05-12:45', slots: ['Lunch', 'Lunch', 'Lunch', 'Lunch', 'Lunch'] },
                { time: '12:45-13:30', slots: ['Hindi', 'Computer Science', 'Hindi', 'Art', 'Social Science'] },
                { time: '13:30-14:15', slots: ['Computer Science', 'Art', 'PT', 'Computer Science', 'PT'] },
              ].map((period, periodIdx) => (
                <div key={periodIdx} className="grid grid-cols-6 border-b border-border/50 last:border-0">
                  <div className="p-3 text-[10px] text-muted-foreground flex flex-col justify-center">
                    <span className="font-semibold text-foreground text-[11px]">P{periodIdx + 1}</span>
                    <span>{period.time}</span>
                  </div>
                  {period.slots.map((subject, dayIdx) => {
                    const isBreak = subject === 'Break' || subject === 'Lunch'
                    const subjectColors = {
                      'Mathematics': 'bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400',
                      'English': 'bg-purple-500/10 border border-purple-500/20 text-purple-600 dark:text-purple-400',
                      'Science': 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400',
                      'Social Science': 'bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400',
                      'Hindi': 'bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-400',
                      'Computer Science': 'bg-cyan-500/10 border border-cyan-500/20 text-cyan-600 dark:text-cyan-400',
                      'Art': 'bg-pink-500/10 border border-pink-500/20 text-pink-600 dark:text-pink-400',
                      'PT': 'bg-orange-500/10 border border-orange-500/20 text-orange-600 dark:text-orange-400',
                    }
                    return (
                      <div key={dayIdx} className={`p-2 text-center ${isBreak ? 'bg-muted/50' : ''}`}>
                        {isBreak ? (
                          <span className="text-[10px] text-muted-foreground font-medium">{subject === 'Break' ? '☕ Break' : '🍽️ Lunch'}</span>
                        ) : (
                          <div className={`rounded-lg p-2 ${subjectColors[subject] || 'bg-muted/50'}`}>
                            <p className="text-[11px] font-semibold">{subject}</p>
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Subject Hours Summary */}
          <motion.div variants={itemVariants} className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
            {[
              { subject: 'Mathematics', hours: 5, color: 'bg-blue-500/10 text-blue-600 dark:text-blue-400' },
              { subject: 'English', hours: 4, color: 'bg-purple-500/10 text-purple-600 dark:text-purple-400' },
              { subject: 'Science', hours: 4, color: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' },
              { subject: 'Social Science', hours: 3, color: 'bg-amber-500/10 text-amber-600 dark:text-amber-400' },
              { subject: 'Hindi', hours: 3, color: 'bg-rose-500/10 text-rose-600 dark:text-rose-400' },
              { subject: 'Computer Sci.', hours: 3, color: 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400' },
              { subject: 'Art & PT', hours: 2, color: 'bg-orange-500/10 text-orange-600 dark:text-orange-400' },
            ].map((item) => (
              <div key={item.subject} className="rounded-xl border border-border bg-card p-3 flex items-center gap-2">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${item.color}`}>
                  <Timer className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-foreground">{item.hours}h</p>
                  <p className="text-[9px] text-muted-foreground">{item.subject}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      )}

      {/* ═══════════════════════════════════════════════════════════════
          HOMEWORK TAB
         ═══════════════════════════════════════════════════════════════ */}
      {activeTab === 'homework' && (
        <motion.div variants={containerVariants} initial="hidden" animate="show" className="space-y-6">
          <motion.div variants={itemVariants}>
            <h3 className="text-base font-semibold text-foreground flex items-center gap-2">
              <FileText className="w-5 h-5 text-amber-500" />
              Homework Tracker
            </h3>
          </motion.div>

          {/* Homework Stats */}
          <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { label: 'Pending', value: pendingHW, icon: Clock, color: 'from-amber-800 to-amber-600' },
              { label: 'Submitted', value: submittedHW, icon: CheckCircle2, color: 'from-emerald-800 to-emerald-600' },
              { label: 'Late', value: lateHW, icon: AlertTriangle, color: 'from-rose-800 to-rose-600' },
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
          </motion.div>

          {/* Homework List */}
          <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-5">
            <div className="space-y-3">
              {homeworkData.map((hw) => (
                <div key={hw.id} className={`p-4 rounded-xl border transition-all hover:shadow-sm ${
                  hw.status === 'submitted' ? 'border-emerald-500/20 bg-emerald-500/5' :
                  hw.status === 'late' ? 'border-rose-500/20 bg-rose-500/5' :
                  hw.priority === 'high' ? 'border-amber-500/20 bg-amber-500/5' :
                  'border-border gradient-card-blue'
                }`}>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                    <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${
                      hw.status === 'submitted' ? 'bg-emerald-500/15' :
                      hw.status === 'late' ? 'bg-rose-500/15' :
                      'bg-amber-500/15'
                    }`}>
                      {hw.status === 'submitted' ? <CheckCircle2 className="w-4 h-4 text-emerald-500" /> :
                       hw.status === 'late' ? <AlertTriangle className="w-4 h-4 text-rose-500" /> :
                       <FileText className="w-4 h-4 text-amber-500" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="px-1.5 py-0.5 rounded text-[9px] font-medium bg-birla-gold/10 text-birla-gold">{hw.subject}</span>
                        <span className={`px-1.5 py-0.5 rounded text-[8px] font-medium ${
                          hw.priority === 'high' ? 'bg-rose-500/10 text-rose-500' :
                          hw.priority === 'medium' ? 'bg-amber-500/10 text-amber-500' :
                          'bg-emerald-500/10 text-emerald-500'
                        }`}>
                          {hw.priority} priority
                        </span>
                      </div>
                      <p className="text-xs font-semibold text-foreground mt-1">{hw.title}</p>
                      <p className="text-[10px] text-muted-foreground mt-0.5">
                        Due: {new Date(hw.dueDate).toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' })}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <span className={`px-2.5 py-1 rounded-lg text-[10px] font-medium ${
                        hw.status === 'submitted' ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' :
                        hw.status === 'late' ? 'bg-rose-500/10 text-rose-500' :
                        'bg-amber-500/10 text-amber-600 dark:text-amber-400'
                      }`}>
                        {hw.status === 'submitted' ? '✓ Submitted' : hw.status === 'late' ? '⚠ Overdue' : '⏳ Pending'}
                      </span>
                      {hw.status === 'pending' && (
                        <button className="px-3 py-1 rounded-lg gradient-birla text-white text-[10px] font-medium hover:shadow-md transition-all">
                          Submit
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* ═══════════════════════════════════════════════════════════════
          PERFORMANCE TAB
         ═══════════════════════════════════════════════════════════════ */}
      {activeTab === 'performance' && (
        <motion.div variants={containerVariants} initial="hidden" animate="show" className="space-y-6">
          <motion.div variants={itemVariants}>
            <h3 className="text-base font-semibold text-foreground flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-emerald-500" />
              Performance Analytics
            </h3>
          </motion.div>

          {/* Full Performance Chart */}
          <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-5">
            <h4 className="text-sm font-semibold text-foreground mb-4">Subject-wise Performance Across Terms</h4>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={performanceTrendData} margin={{ top: 10, right: 10, left: -10, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? 'rgba(255,255,255,0.06)' : '#e2e8f0'} />
                  <XAxis dataKey="term" tick={{ fontSize: 11, fill: darkMode ? '#94a3b8' : '#64748b' }} />
                  <YAxis tick={{ fontSize: 11, fill: darkMode ? '#94a3b8' : '#64748b' }} domain={[50, 100]} />
                  <Tooltip {...tooltipStyle} />
                  <Legend wrapperStyle={{ fontSize: '11px' }} />
                  <Area type="monotone" dataKey="Mathematics" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.1} strokeWidth={2} />
                  <Area type="monotone" dataKey="English" stroke="#8B5CF6" fill="#8B5CF6" fillOpacity={0.1} strokeWidth={2} />
                  <Area type="monotone" dataKey="Science" stroke="#10B981" fill="#10B981" fillOpacity={0.1} strokeWidth={2} />
                  <Area type="monotone" dataKey="SocialScience" stroke="#F59E0B" fill="#F59E0B" fillOpacity={0.1} strokeWidth={2} name="Social Science" />
                  <Area type="monotone" dataKey="Hindi" stroke="#EF4444" fill="#EF4444" fillOpacity={0.1} strokeWidth={2} />
                  <Area type="monotone" dataKey="ComputerScience" stroke="#22D3EE" fill="#22D3EE" fillOpacity={0.1} strokeWidth={2} name="Computer Science" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Subject-wise Comparison */}
            <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-5">
              <h4 className="text-sm font-semibold text-foreground mb-4">SA2 Scores - Subject Comparison</h4>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={[
                    { subject: 'Math', score: 94 },
                    { subject: 'English', score: 89 },
                    { subject: 'Science', score: 93 },
                    { subject: 'SST', score: 85 },
                    { subject: 'Hindi', score: 95 },
                    { subject: 'CS', score: 97 },
                  ]} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? 'rgba(255,255,255,0.06)' : '#e2e8f0'} />
                    <XAxis dataKey="subject" tick={{ fontSize: 10, fill: darkMode ? '#94a3b8' : '#64748b' }} />
                    <YAxis tick={{ fontSize: 10, fill: darkMode ? '#94a3b8' : '#64748b' }} domain={[60, 100]} />
                    <Tooltip {...tooltipStyle} />
                    <Bar dataKey="score" radius={[6, 6, 0, 0]}>
                      {[
                        { subject: 'Math', score: 94 },
                        { subject: 'English', score: 89 },
                        { subject: 'Science', score: 93 },
                        { subject: 'SST', score: 85 },
                        { subject: 'Hindi', score: 95 },
                        { subject: 'CS', score: 97 },
                      ].map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={['#3B82F6', '#8B5CF6', '#10B981', '#F59E0B', '#EF4444', '#22D3EE'][index]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </motion.div>

            {/* Skill Mapping Radar */}
            <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-5">
              <h4 className="text-sm font-semibold text-foreground mb-4">NEP 2020 Competency Mapping</h4>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={skillMappingData} cx="50%" cy="50%" outerRadius="70%">
                    <PolarGrid stroke={darkMode ? 'rgba(255,255,255,0.08)' : '#e2e8f0'} />
                    <PolarAngleAxis dataKey="skill" tick={{ fontSize: 9, fill: darkMode ? '#94a3b8' : '#64748b' }} />
                    <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fontSize: 8, fill: darkMode ? '#64748b' : '#94a3b8' }} />
                    <Radar name="Current" dataKey="score" stroke="#22D3EE" fill="#22D3EE" fillOpacity={0.2} strokeWidth={2} />
                    <Radar name="Target" dataKey={() => 85} stroke="#C8A45C" fill="none" strokeWidth={1.5} strokeDasharray="5 5" />
                    <Tooltip {...tooltipStyle} />
                    <Legend wrapperStyle={{ fontSize: '10px' }} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </motion.div>
          </div>

          {/* Learning Progress Full */}
          <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-5">
            <h4 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
              <Target className="w-4 h-4 text-purple-500" />
              Subject Competency Levels
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
              {subjectProgressData.map((subj) => (
                <div key={subj.subject} className="flex flex-col items-center gap-2">
                  <CircularProgress percentage={subj.progress} color={subj.color} size={90} strokeWidth={6} />
                  <p className="text-xs font-medium text-foreground text-center">{subj.subject}</p>
                  <p className="text-[10px] text-muted-foreground">
                    {subj.progress >= 90 ? 'Excellent' : subj.progress >= 80 ? 'Good' : subj.progress >= 70 ? 'Average' : 'Needs Improvement'}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* ═══════════════════════════════════════════════════════════════
          ACHIEVEMENTS TAB
         ═══════════════════════════════════════════════════════════════ */}
      {activeTab === 'achievements' && (
        <motion.div variants={containerVariants} initial="hidden" animate="show" className="space-y-6">
          <motion.div variants={itemVariants}>
            <h3 className="text-base font-semibold text-foreground flex items-center gap-2">
              <Trophy className="w-5 h-5 text-birla-gold" />
              Achievements & Badges
            </h3>
          </motion.div>

          {/* Achievement Stats */}
          <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="rounded-2xl bg-gradient-to-br from-purple-900 to-purple-700 p-4 text-white">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{earnedBadges}/{achievementsData.length}</p>
                  <p className="text-[10px] text-white/70">Badges Earned</p>
                </div>
              </div>
            </div>
            <div className="rounded-2xl bg-gradient-to-br from-amber-800 to-amber-600 p-4 text-white">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center">
                  <Flame className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-2xl font-bold">15</p>
                  <p className="text-[10px] text-white/70">Day Streak</p>
                </div>
              </div>
            </div>
            <div className="rounded-2xl bg-gradient-to-br from-cyan-800 to-cyan-600 p-4 text-white">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center">
                  <Star className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-2xl font-bold">2,450</p>
                  <p className="text-[10px] text-white/70">XP Points</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Badges Grid */}
          <motion.div variants={itemVariants} className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {achievementsData.map((badge) => (
              <div
                key={badge.id}
                className={`p-4 rounded-2xl border transition-all hover:shadow-lg ${
                  badge.earned
                    ? 'border-birla-gold/30 bg-gradient-to-br from-birla-gold/5 to-amber-500/5'
                    : 'border-border bg-card opacity-60'
                }`}
              >
                <div className="flex flex-col items-center text-center gap-2">
                  <div className={`text-4xl ${badge.earned ? '' : 'grayscale'}`}>{badge.icon}</div>
                  <div>
                    <p className={`text-xs font-bold ${badge.earned ? 'text-foreground' : 'text-muted-foreground'}`}>
                      {badge.name}
                    </p>
                    <p className="text-[9px] text-muted-foreground mt-0.5 leading-tight">{badge.description}</p>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className={`px-2 py-0.5 rounded-full text-[8px] font-medium ${
                      badge.category === 'Academic' ? 'bg-blue-500/10 text-blue-500' :
                      badge.category === 'Competition' ? 'bg-purple-500/10 text-purple-500' :
                      badge.category === 'Technical' ? 'bg-cyan-500/10 text-cyan-500' :
                      badge.category === 'Creative' ? 'bg-pink-500/10 text-pink-500' :
                      badge.category === 'Leadership' ? 'bg-amber-500/10 text-amber-500' :
                      badge.category === 'Attendance' ? 'bg-emerald-500/10 text-emerald-500' :
                      badge.category === 'Language' ? 'bg-rose-500/10 text-rose-500' :
                      'bg-muted text-muted-foreground'
                    }`}>
                      {badge.category}
                    </span>
                  </div>
                  {badge.earned ? (
                    <div className="flex items-center gap-1 text-[9px] text-emerald-600 dark:text-emerald-400">
                      <CheckCircle2 className="w-3 h-3" /> Earned {badge.earnedDate}
                    </div>
                  ) : (
                    <div className="flex items-center gap-1 text-[9px] text-muted-foreground">
                      <CircleDot className="w-3 h-3" /> Not yet earned
                    </div>
                  )}
                </div>
              </div>
            ))}
          </motion.div>

          {/* Activity Participation Full */}
          <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-5">
            <h4 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
              <Activity className="w-4 h-4 text-birla-cyan" />
              Co-curricular Activity Participation
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {activityData.map((act) => (
                <div key={act.id} className="p-3 rounded-xl border border-border gradient-card-blue hover:shadow-sm transition-all">
                  <div className="flex items-start gap-3">
                    <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${
                      act.status === 'Completed' ? 'bg-emerald-500/15' :
                      act.status === 'In Progress' ? 'bg-birla-cyan/15' : 'bg-amber-500/15'
                    }`}>
                      {act.status === 'Completed' ? <CheckCircle2 className="w-4 h-4 text-emerald-500" /> :
                       act.status === 'In Progress' ? <Zap className="w-4 h-4 text-birla-cyan" /> :
                       <Clock className="w-4 h-4 text-amber-500" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className={`px-1.5 py-0.5 rounded text-[8px] font-medium ${
                          act.type === 'Academic' ? 'bg-blue-500/10 text-blue-500' :
                          act.type === 'Science' ? 'bg-emerald-500/10 text-emerald-500' :
                          act.type === 'Cultural' ? 'bg-purple-500/10 text-purple-500' :
                          act.type === 'Sports' ? 'bg-amber-500/10 text-amber-500' :
                          act.type === 'Technical' ? 'bg-cyan-500/10 text-cyan-500' :
                          act.type === 'Literary' ? 'bg-rose-500/10 text-rose-500' :
                          'bg-teal-500/10 text-teal-500'
                        }`}>
                          {act.type}
                        </span>
                        <span className={`px-1.5 py-0.5 rounded text-[8px] font-medium ${
                          act.status === 'Completed' ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' :
                          act.status === 'In Progress' ? 'bg-birla-cyan/10 text-birla-cyan' :
                          'bg-amber-500/10 text-amber-600 dark:text-amber-400'
                        }`}>
                          {act.status}
                        </span>
                      </div>
                      <p className="text-[11px] font-semibold text-foreground">{act.name}</p>
                      <div className="flex items-center justify-between mt-0.5">
                        <span className="text-[9px] text-muted-foreground">{act.date}</span>
                        {act.achievement !== '-' && (
                          <span className="text-[9px] text-birla-gold font-medium flex items-center gap-0.5">
                            <Trophy className="w-2.5 h-2.5" /> {act.achievement}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* ═══════════════════════════════════════════════════════════════
          EXAM PREP TAB
         ═══════════════════════════════════════════════════════════════ */}
      {activeTab === 'examprep' && (
        <motion.div variants={containerVariants} initial="hidden" animate="show" className="space-y-6">
          <motion.div variants={itemVariants}>
            <h3 className="text-base font-semibold text-foreground flex items-center gap-2">
              <ClipboardCheck className="w-5 h-5 text-birla-cyan" />
              Exam Preparation
            </h3>
          </motion.div>

          {/* Exam Preparation Overview */}
          <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { label: 'Upcoming Exams', value: '6', icon: FileText, color: 'from-blue-900 to-blue-700' },
              { label: 'Avg. Preparation', value: '73%', icon: Target, color: 'from-amber-800 to-amber-600' },
              { label: 'Days to First Exam', value: '8', icon: Timer, color: 'from-rose-800 to-rose-600' },
            ].map((stat) => {
              const Icon = stat.icon
              return (
                <div key={stat.label} className={`rounded-2xl bg-gradient-to-br ${stat.color} p-4 text-white`}>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">{stat.value}</p>
                      <p className="text-[10px] text-white/70">{stat.label}</p>
                    </div>
                  </div>
                </div>
              )
            })}
          </motion.div>

          {/* Exam Cards */}
          <div className="space-y-4">
            {examPrepData.map((exam) => (
              <motion.div key={exam.id} variants={itemVariants} className="rounded-2xl border border-border bg-card p-5 hover:shadow-md transition-all">
                <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                  <div className="flex items-center gap-3 flex-1">
                    <div className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 ${
                      exam.subject === 'Mathematics' ? 'bg-blue-500/15' :
                      exam.subject === 'Science' ? 'bg-emerald-500/15' :
                      exam.subject === 'English' ? 'bg-purple-500/15' :
                      exam.subject === 'Social Science' ? 'bg-amber-500/15' :
                      exam.subject === 'Hindi' ? 'bg-rose-500/15' :
                      'bg-cyan-500/15'
                    }`}>
                      <BookOpen className={`w-5 h-5 ${
                        exam.subject === 'Mathematics' ? 'text-blue-500' :
                        exam.subject === 'Science' ? 'text-emerald-500' :
                        exam.subject === 'English' ? 'text-purple-500' :
                        exam.subject === 'Social Science' ? 'text-amber-500' :
                        exam.subject === 'Hindi' ? 'text-rose-500' :
                        'text-cyan-500'
                      }`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className="text-sm font-bold text-foreground">{exam.subject}</p>
                        <span className="px-2 py-0.5 rounded-full text-[9px] font-medium bg-birla-cyan/10 text-birla-cyan">
                          {exam.chapters} chapters
                        </span>
                      </div>
                      <p className="text-[10px] text-muted-foreground mt-0.5">{exam.syllabus}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Calendar className="w-3 h-3 text-muted-foreground" />
                        <span className="text-[10px] text-muted-foreground">
                          {new Date(exam.date).toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Coverage Progress */}
                  <div className="flex items-center gap-4 lg:w-80">
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[10px] text-muted-foreground">Syllabus Coverage</span>
                        <span className={`text-xs font-bold ${
                          exam.coverage >= 80 ? 'text-emerald-500' :
                          exam.coverage >= 60 ? 'text-amber-500' : 'text-rose-500'
                        }`}>{exam.coverage}%</span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-muted/50 overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-500 ${
                            exam.coverage >= 80 ? 'bg-emerald-500' :
                            exam.coverage >= 60 ? 'bg-amber-500' : 'bg-rose-500'
                          }`}
                          style={{ width: `${exam.coverage}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Preparation Tips */}
                <div className="mt-3 p-3 rounded-xl bg-muted/30 border border-border/50">
                  <div className="flex items-start gap-2">
                    <Lightbulb className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                    <p className="text-[10px] text-muted-foreground leading-relaxed">{exam.tips}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Digital Notes */}
          <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-5">
            <h4 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
              <StickyNote className="w-4 h-4 text-amber-500" />
              Quick Revision Notes
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {digitalNotes.map((note) => (
                <div key={note.id} className="p-3 rounded-xl border border-border gradient-card-blue hover:shadow-sm transition-all cursor-pointer group">
                  <div className="flex items-center justify-between mb-1">
                    <span className="px-1.5 py-0.5 rounded text-[8px] font-medium bg-birla-gold/10 text-birla-gold">{note.subject}</span>
                    <span className="text-[9px] text-muted-foreground">{note.date}</span>
                  </div>
                  <p className="text-[11px] font-semibold text-foreground group-hover:text-gradient-birla transition-colors">{note.title}</p>
                  <p className="text-[9px] text-muted-foreground mt-0.5 line-clamp-2 leading-relaxed">{note.preview}</p>
                  <div className="flex items-center gap-1 mt-1.5 text-[9px] text-birla-cyan">
                    <BookMarked className="w-3 h-3" /> Open Note
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* AI Study Assistant */}
          <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-5">
            <h4 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
              <Brain className="w-4 h-4 text-birla-cyan" />
              AI Study Recommendations
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {aiRecommendations.map((rec) => {
                const Icon = rec.icon
                return (
                  <div key={rec.id} className="p-4 rounded-xl border border-border gradient-card-blue hover:shadow-sm transition-all">
                    <div className="flex items-center gap-2.5 mb-2">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${rec.color}`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[11px] font-semibold text-foreground">{rec.title}</p>
                        <span className={`text-[8px] font-medium ${
                          rec.priority === 'high' ? 'text-rose-500' :
                          rec.priority === 'medium' ? 'text-amber-500' : 'text-emerald-500'
                        }`}>
                          {rec.priority} priority
                        </span>
                      </div>
                    </div>
                    <p className="text-[9px] text-muted-foreground leading-relaxed">{rec.description}</p>
                  </div>
                )
              })}
            </div>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  )
}
