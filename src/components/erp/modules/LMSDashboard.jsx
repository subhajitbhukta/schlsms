'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  GraduationCap, Video, BookOpen, FileText, Brain, Clock, Users,
  Play, BarChart3, Target, Lightbulb, Sparkles, ChevronRight,
  Radio, Eye, Star, CheckCircle2, AlertTriangle, Calendar,
  Library, ArrowUpRight, Layers, Award, Zap, Monitor, Mic,
  MessageSquare, TrendingUp, Activity, Heart, Bookmark,
  ClipboardCheck, Globe, Send, Plus
} from 'lucide-react'
import {
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Legend, AreaChart, Area, PieChart, Pie, Cell
} from 'recharts'
import useAppStore from '@/store/useAppStore'

// ─── Data ────────────────────────────────────────────────────────
const topStats = [
  { label: 'Live Classes', value: '8', change: '+3 today', icon: Radio, gradient: 'from-rose-800 to-rose-600', glow: 'shadow-rose-800/20' },
  { label: 'Active Courses', value: '42', change: '+5 this term', icon: GraduationCap, gradient: 'from-blue-900 to-blue-700', glow: 'shadow-blue-900/20' },
  { label: 'Assignments Due', value: '156', change: '28 overdue', icon: FileText, gradient: 'from-amber-800 to-amber-600', glow: 'shadow-amber-800/20' },
  { label: 'Digital Resources', value: '2,400+', change: '+120 this week', icon: Library, gradient: 'from-emerald-800 to-emerald-600', glow: 'shadow-emerald-800/20' },
]

const liveClasses = [
  { id: 1, teacher: 'Dr. Priya Menon', subject: 'Mathematics', class: 'X-A', students: 38, topic: 'Quadratic Equations - Discriminant Analysis', time: '10:00 AM', duration: '45 min', status: 'live' },
  { id: 2, teacher: 'Mr. Rajesh Kumar', subject: 'Physics', class: 'XII-B', students: 32, topic: 'Electromagnetic Induction - Faraday\'s Law', time: '10:00 AM', duration: '50 min', status: 'live' },
  { id: 3, teacher: 'Ms. Ananya Das', subject: 'English', class: 'IX-A', students: 40, topic: 'Shakespeare - The Merchant of Venice Act III', time: '10:50 AM', duration: '40 min', status: 'starting' },
  { id: 4, teacher: 'Dr. Suresh Nair', subject: 'Chemistry', class: 'XI-A', students: 35, topic: 'Organic Chemistry - Nomenclature of Alcohols', time: '11:40 AM', duration: '45 min', status: 'scheduled' },
  { id: 5, teacher: 'Ms. Kavitha Reddy', subject: 'Biology', class: 'X-B', students: 36, topic: 'Genetics - Mendel\'s Laws of Inheritance', time: '12:30 PM', duration: '40 min', status: 'scheduled' },
  { id: 6, teacher: 'Mr. Arjun Sharma', subject: 'Computer Science', class: 'XII-A', students: 28, topic: 'Data Structures - Binary Trees Traversal', time: '01:20 PM', duration: '50 min', status: 'scheduled' },
]

const recordedLectures = [
  { id: 1, subject: 'Mathematics', topic: 'Integration by Parts', teacher: 'Dr. Priya Menon', duration: '42 min', views: 284, thumbnail: '📐' },
  { id: 2, subject: 'Physics', topic: 'Wave-Particle Duality', teacher: 'Mr. Rajesh Kumar', duration: '38 min', views: 196, thumbnail: '⚡' },
  { id: 3, subject: 'Chemistry', topic: 'Chemical Bonding', teacher: 'Dr. Suresh Nair', duration: '45 min', views: 312, thumbnail: '⚗️' },
  { id: 4, subject: 'English', topic: 'Poetry Analysis - Robert Frost', teacher: 'Ms. Ananya Das', duration: '35 min', views: 178, thumbnail: '📝' },
  { id: 5, subject: 'Biology', topic: 'Cell Division - Meiosis', teacher: 'Ms. Kavitha Reddy', duration: '40 min', views: 245, thumbnail: '🔬' },
  { id: 6, subject: 'History', topic: 'Indian Independence Movement', teacher: 'Mr. Vikram Singh', duration: '48 min', views: 167, thumbnail: '🏛️' },
]

const assignments = {
  pending: [
    { id: 1, title: 'Quadratic Equations Worksheet', subject: 'Mathematics', class: 'X-A', dueDate: 'Mar 18', submissions: 12, total: 38 },
    { id: 2, title: 'Lab Report - EM Induction', subject: 'Physics', class: 'XII-B', dueDate: 'Mar 17', submissions: 18, total: 32 },
    { id: 3, title: 'Essay: Climate Change Impact', subject: 'English', class: 'IX-A', dueDate: 'Mar 19', submissions: 8, total: 40 },
    { id: 4, title: 'Organic Reactions Map', subject: 'Chemistry', class: 'XI-A', dueDate: 'Mar 16', submissions: 22, total: 35 },
  ],
  submitted: [
    { id: 5, title: 'Trigonometry Problems Set', subject: 'Mathematics', class: 'X-A', submitted: 34, total: 38, avgScore: 78 },
    { id: 6, title: 'Newton\'s Laws Application', subject: 'Physics', class: 'XII-B', submitted: 30, total: 32, avgScore: 82 },
    { id: 7, title: 'Letter Writing Practice', subject: 'English', class: 'IX-A', submitted: 37, total: 40, avgScore: 85 },
  ],
  graded: [
    { id: 8, title: 'Algebra Unit Test', subject: 'Mathematics', class: 'X-A', graded: 38, avgScore: 76, highest: 98, lowest: 42 },
    { id: 9, title: 'Optics Chapter Test', subject: 'Physics', class: 'XII-B', graded: 32, avgScore: 81, highest: 95, lowest: 48 },
  ],
}

const activeQuizzes = [
  { id: 1, title: 'Quadratic Equations Quiz', subject: 'Mathematics', class: 'X-A', questions: 20, duration: '30 min', participants: 35, avgScore: 72, status: 'active' },
  { id: 2, title: 'Periodic Table Challenge', subject: 'Chemistry', class: 'XI-A', questions: 25, duration: '25 min', participants: 33, avgScore: 68, status: 'active' },
  { id: 3, title: 'Indian History Quick Fire', subject: 'History', class: 'IX-B', questions: 15, duration: '15 min', participants: 38, avgScore: 81, status: 'completed' },
  { id: 4, title: 'English Grammar Sprint', subject: 'English', class: 'VIII-A', questions: 30, duration: '20 min', participants: 40, avgScore: 75, status: 'scheduled' },
]

const skillProgress = [
  { skill: 'Communication', score: 78, color: '#22D3EE' },
  { skill: 'Critical Thinking', score: 82, color: '#C8A45C' },
  { skill: 'Creativity', score: 71, color: '#8B5CF6' },
  { skill: 'Collaboration', score: 85, color: '#10B981' },
  { skill: 'Digital Literacy', score: 90, color: '#F59E0B' },
  { skill: 'Problem Solving', score: 76, color: '#EF4444' },
]

const bloomsData = [
  { level: 'Remember', percentage: 92, students: 2345, color: '#1A2D4A' },
  { level: 'Understand', percentage: 85, students: 2168, color: '#142240' },
  { level: 'Apply', percentage: 72, students: 1836, color: '#0E4D6E' },
  { level: 'Analyze', percentage: 58, students: 1479, color: '#C8A45C' },
  { level: 'Evaluate', percentage: 41, students: 1046, color: '#22D3EE' },
  { level: 'Create', percentage: 28, students: 714, color: '#8B5CF6' },
]

const nepCompetencyData = [
  { subject: 'Language', competency: 85, fullMark: 100 },
  { subject: 'Mathematics', competency: 78, fullMark: 100 },
  { subject: 'Science', competency: 82, fullMark: 100 },
  { subject: 'Social Science', competency: 74, fullMark: 100 },
  { subject: 'Arts', competency: 68, fullMark: 100 },
  { subject: 'Physical Ed.', competency: 90, fullMark: 100 },
  { subject: 'Vocational', competency: 62, fullMark: 100 },
  { subject: 'Digital', competency: 88, fullMark: 100 },
]

const digitalLibrary = [
  { id: 1, title: 'NCERT Mathematics X', type: 'Textbook', subject: 'Mathematics', access: 1245, rating: 4.8, icon: '📘' },
  { id: 2, title: 'Concepts of Physics', type: 'Reference', subject: 'Physics', access: 892, rating: 4.9, icon: '📗' },
  { id: 3, title: 'Organic Chemistry', type: 'Textbook', subject: 'Chemistry', access: 756, rating: 4.6, icon: '📙' },
  { id: 4, title: 'Wren & Martin Grammar', type: 'Reference', subject: 'English', access: 1534, rating: 4.7, icon: '📕' },
  { id: 5, title: 'India & Contemporary World', type: 'Textbook', subject: 'History', access: 678, rating: 4.5, icon: '📓' },
  { id: 6, title: 'Coding with Python', type: 'Digital', subject: 'Computer Sc.', access: 567, rating: 4.8, icon: '💻' },
]

const lessonPlanCalendar = [
  { day: 'Mon', date: 10, lessons: [
    { time: '08:00', subject: 'Mathematics', class: 'X-A', topic: 'Quadratic Equations', status: 'completed' },
    { time: '09:00', subject: 'Physics', class: 'XII-B', topic: 'EM Induction', status: 'completed' },
    { time: '11:00', subject: 'Chemistry', class: 'XI-A', topic: 'Alcohols', status: 'completed' },
  ]},
  { day: 'Tue', date: 11, lessons: [
    { time: '08:00', subject: 'English', class: 'IX-A', topic: 'Poetry - Frost', status: 'completed' },
    { time: '10:00', subject: 'Biology', class: 'X-B', topic: 'Genetics', status: 'completed' },
    { time: '12:00', subject: 'History', class: 'IX-B', topic: 'Independence', status: 'completed' },
  ]},
  { day: 'Wed', date: 12, lessons: [
    { time: '08:00', subject: 'Mathematics', class: 'X-A', topic: 'Progressions', status: 'in-progress' },
    { time: '09:50', subject: 'Computer Sc.', class: 'XII-A', topic: 'Binary Trees', status: 'upcoming' },
    { time: '11:40', subject: 'Physics', class: 'XII-B', topic: 'AC Circuits', status: 'upcoming' },
  ]},
  { day: 'Thu', date: 13, lessons: [
    { time: '08:00', subject: 'Chemistry', class: 'XI-A', topic: 'Ethers & Phenols', status: 'upcoming' },
    { time: '10:00', subject: 'English', class: 'IX-A', topic: 'Letter Writing', status: 'upcoming' },
  ]},
  { day: 'Fri', date: 14, lessons: [
    { time: '08:00', subject: 'Biology', class: 'X-B', topic: 'Evolution', status: 'upcoming' },
    { time: '09:50', subject: 'Mathematics', class: 'X-A', topic: 'Statistics', status: 'upcoming' },
  ]},
]

const learningOutcomes = [
  { id: 1, outcome: 'Solve quadratic equations using multiple methods', subject: 'Mathematics', class: 'X', blooms: 'Apply', alignment: 92 },
  { id: 2, outcome: 'Explain electromagnetic induction phenomena', subject: 'Physics', class: 'XII', blooms: 'Understand', alignment: 88 },
  { id: 3, outcome: 'Analyze literary devices in Shakespearean drama', subject: 'English', class: 'IX', blooms: 'Analyze', alignment: 85 },
  { id: 4, outcome: 'Design experiments to test chemical properties', subject: 'Chemistry', class: 'XI', blooms: 'Create', alignment: 78 },
  { id: 5, outcome: 'Evaluate historical events from multiple perspectives', subject: 'History', class: 'IX', blooms: 'Evaluate', alignment: 82 },
  { id: 6, outcome: 'Construct algorithms for tree traversal', subject: 'Computer Sc.', class: 'XII', blooms: 'Create', alignment: 90 },
]

const experientialLearning = [
  { id: 1, title: 'Water Quality Testing', subject: 'Chemistry', type: 'Field Study', class: 'XI-A', status: 'Active', students: 35, startDate: 'Mar 10', outcome: 'Analyze water samples from local sources' },
  { id: 2, title: 'Community Survey - Demographics', subject: 'Social Science', type: 'Survey', class: 'IX-B', status: 'Planning', students: 40, startDate: 'Mar 15', outcome: 'Collect and interpret demographic data' },
  { id: 3, title: 'Robotics Challenge', subject: 'Computer Sc.', type: 'Project', class: 'XII-A', status: 'Active', students: 28, startDate: 'Mar 5', outcome: 'Build autonomous navigation robot' },
  { id: 4, title: 'Math in Architecture', subject: 'Mathematics', type: 'Industry Visit', class: 'X-A', status: 'Completed', students: 38, startDate: 'Feb 28', outcome: 'Apply geometry in real-world structures' },
]

const aiRecommendations = [
  { id: 1, type: 'student', title: 'Additional Practice for Quadratic Equations', desc: '12 students in X-A need reinforcement on discriminant analysis. Recommend adaptive worksheets.', icon: Target, color: 'text-rose-500 bg-rose-500/10' },
  { id: 2, type: 'content', title: 'New Simulation: Wave Interference', desc: 'PhET simulation on wave interference patterns would enhance Physics XII-B understanding.', icon: Lightbulb, color: 'text-amber-500 bg-amber-500/10' },
  { id: 3, type: 'assessment', title: 'Formative Assessment Alert', desc: 'English IX-A shows 23% dip in comprehension scores. Suggest micro-assessment before unit test.', icon: AlertTriangle, color: 'text-emerald-500 bg-emerald-500/10' },
  { id: 4, type: 'engagement', title: 'Gamification Opportunity', desc: 'Chemistry XI-A engagement drops after 30 min. Try kahoot-style quiz at midpoint.', icon: Zap, color: 'text-purple-500 bg-purple-500/10' },
  { id: 5, type: 'resource', title: 'Video Resource Match', desc: 'Khan Academy video on "Organic Reactions" matches 95% with your current lesson plan.', icon: Video, color: 'text-cyan-500 bg-cyan-500/10' },
]

const engagementTrendData = [
  { week: 'W1', live: 82, recorded: 64, quiz: 71, assignment: 78 },
  { week: 'W2', live: 85, recorded: 68, quiz: 73, assignment: 75 },
  { week: 'W3', live: 79, recorded: 72, quiz: 76, assignment: 80 },
  { week: 'W4', live: 88, recorded: 70, quiz: 74, assignment: 82 },
  { week: 'W5', live: 91, recorded: 75, quiz: 79, assignment: 85 },
  { week: 'W6', live: 87, recorded: 78, quiz: 82, assignment: 83 },
  { week: 'W7', live: 93, recorded: 80, quiz: 85, assignment: 88 },
  { week: 'W8', live: 90, recorded: 82, quiz: 88, assignment: 86 },
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

const CHART_COLORS = ['#1A2D4A', '#22D3EE', '#C8A45C', '#8B5CF6', '#10B981', '#EF4444', '#F59E0B']

export default function LMSDashboard() {
  const { darkMode } = useAppStore()
  const [activeTab, setActiveTab] = useState('overview')
  const [assignmentTab, setAssignmentTab] = useState('pending')

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'classrooms', label: 'Virtual Classrooms', icon: Video },
    { id: 'assignments', label: 'Assignments', icon: FileText },
    { id: 'quizzes', label: 'Quiz Engine', icon: Brain },
    { id: 'skills', label: 'Skills & Bloom\'s', icon: Target },
    { id: 'library', label: 'Digital Library', icon: Library },
    { id: 'planner', label: 'Lesson Planner', icon: Calendar },
    { id: 'ai', label: 'AI Insights', icon: Sparkles },
  ]

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

      {/* ─── Overview Tab ────────────────────────────────── */}
      {activeTab === 'overview' && (
        <motion.div variants={itemVariants} className="space-y-6">
          {/* Top Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {topStats.map((card) => {
              const Icon = card.icon
              return (
                <motion.div
                  key={card.label}
                  variants={itemVariants}
                  className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${card.gradient} p-5 text-white shadow-xl ${card.glow}`}
                >
                  <div className="absolute top-0 right-0 w-24 h-24 rounded-full bg-white/5 -translate-y-6 translate-x-6" />
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-3">
                      <div className="w-10 h-10 rounded-xl bg-white/15 backdrop-blur-sm flex items-center justify-center">
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="inline-flex items-center gap-0.5 text-xs font-medium px-2 py-0.5 rounded-full bg-white/10 text-white/80">
                        <ArrowUpRight className="w-3 h-3" />
                        {card.change}
                      </span>
                    </div>
                    <p className="text-2xl font-bold">{card.value}</p>
                    <p className="text-sm text-white/70 mt-0.5">{card.label}</p>
                  </div>
                </motion.div>
              )
            })}
          </div>

          {/* Engagement Trend + Live Classes Quick */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <motion.div variants={itemVariants} className="lg:col-span-2 rounded-2xl border border-border bg-card p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-semibold text-foreground flex items-center gap-2">
                  <Activity className="w-4 h-4 text-birla-cyan" />
                  Learning Engagement Trend
                </h3>
                <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-medium">
                  Last 8 Weeks
                </span>
              </div>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={engagementTrendData}>
                    <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'} />
                    <XAxis dataKey="week" tick={{ fontSize: 10 }} stroke={darkMode ? '#64748b' : '#94a3b8'} />
                    <YAxis tick={{ fontSize: 10 }} stroke={darkMode ? '#64748b' : '#94a3b8'} domain={[50, 100]} tickFormatter={(v) => `${v}%`} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: darkMode ? '#1A2D4A' : '#fff',
                        border: `1px solid ${darkMode ? 'rgba(255,255,255,0.1)' : '#e2e8f0'}`,
                        borderRadius: '12px', fontSize: '12px', color: darkMode ? '#e2e8f0' : '#1e293b',
                      }}
                      formatter={(value) => [`${value}%`, '']}
                    />
                    <Legend iconType="circle" wrapperStyle={{ fontSize: '11px' }} />
                    <Area type="monotone" dataKey="live" stroke="#EF4444" fill="rgba(239,68,68,0.08)" strokeWidth={2} name="Live Classes" />
                    <Area type="monotone" dataKey="recorded" stroke="#22D3EE" fill="rgba(34,211,238,0.08)" strokeWidth={2} name="Recorded" />
                    <Area type="monotone" dataKey="quiz" stroke="#C8A45C" fill="rgba(200,164,92,0.08)" strokeWidth={2} name="Quizzes" />
                    <Area type="monotone" dataKey="assignment" stroke="#8B5CF6" fill="rgba(139,92,246,0.08)" strokeWidth={2} name="Assignments" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </motion.div>

            {/* Live Now */}
            <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-semibold text-foreground flex items-center gap-2">
                  <Radio className="w-4 h-4 text-rose-500" />
                  Live Now
                </h3>
                <span className="flex items-center gap-1.5 text-xs font-medium text-rose-500">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-rose-500"></span>
                  </span>
                  {liveClasses.filter(c => c.status === 'live').length} Active
                </span>
              </div>
              <div className="space-y-3 max-h-72 overflow-y-auto">
                {liveClasses.filter(c => c.status === 'live' || c.status === 'starting').map((cls) => (
                  <div key={cls.id} className="p-3 rounded-xl border border-border gradient-card-blue hover:shadow-sm transition-all">
                    <div className="flex items-center justify-between mb-2">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                        {cls.status === 'live' ? '● LIVE' : 'Starting Soon'}
                      </span>
                      <span className="text-[10px] text-muted-foreground">{cls.time}</span>
                    </div>
                    <p className="text-sm font-semibold text-foreground">{cls.subject} - {cls.class}</p>
                    <p className="text-[11px] text-muted-foreground mt-0.5">{cls.teacher}</p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="flex items-center gap-1 text-[10px] text-muted-foreground">
                        <Users className="w-3 h-3" /> {cls.students} students
                      </span>
                      <button className="px-2.5 py-1 rounded-lg gradient-birla text-white text-[10px] font-medium flex items-center gap-1 hover:opacity-90 transition-opacity">
                        <Video className="w-3 h-3" /> Join
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Bloom's + Competency Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Bloom's Taxonomy */}
            <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-semibold text-foreground flex items-center gap-2">
                  <Layers className="w-4 h-4 text-birla-gold" />
                  Bloom&apos;s Taxonomy Alignment
                </h3>
                <span className="text-xs px-2 py-0.5 rounded-full bg-birla-gold/10 text-birla-gold font-medium">
                  NEP 2020
                </span>
              </div>
              <div className="h-56">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={bloomsData} layout="vertical" barGap={4}>
                    <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'} horizontal={false} />
                    <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 10 }} stroke={darkMode ? '#64748b' : '#94a3b8'} tickFormatter={(v) => `${v}%`} />
                    <YAxis type="category" dataKey="level" tick={{ fontSize: 10 }} stroke={darkMode ? '#64748b' : '#94a3b8'} width={80} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: darkMode ? '#1A2D4A' : '#fff',
                        border: `1px solid ${darkMode ? 'rgba(255,255,255,0.1)' : '#e2e8f0'}`,
                        borderRadius: '12px', fontSize: '12px', color: darkMode ? '#e2e8f0' : '#1e293b',
                      }}
                      formatter={(value, name) => [name === 'percentage' ? `${value}%` : value, name === 'percentage' ? 'Achievement' : 'Students']}
                    />
                    <Bar dataKey="percentage" radius={[0, 6, 6, 0]} name="percentage">
                      {bloomsData.map((entry, idx) => (
                        <Cell key={idx} fill={entry.color} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="flex items-center justify-between mt-3 text-[10px] text-muted-foreground">
                <span>Lower Order ←</span>
                <span>→ Higher Order Thinking</span>
              </div>
            </motion.div>

            {/* NEP Competency Radar */}
            <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-semibold text-foreground flex items-center gap-2">
                  <Target className="w-4 h-4 text-emerald-500" />
                  NEP Competency-Based Learning
                </h3>
                <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-medium">
                  80.9% Avg
                </span>
              </div>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="70%" data={nepCompetencyData}>
                    <PolarGrid stroke={darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)'} />
                    <PolarAngleAxis dataKey="subject" tick={{ fontSize: 9 }} stroke={darkMode ? '#64748b' : '#94a3b8'} />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fontSize: 8 }} stroke={darkMode ? '#64748b' : '#94a3b8'} />
                    <Radar name="Competency" dataKey="competency" stroke="#22D3EE" fill="#22D3EE" fillOpacity={0.15} strokeWidth={2} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: darkMode ? '#1A2D4A' : '#fff',
                        border: `1px solid ${darkMode ? 'rgba(255,255,255,0.1)' : '#e2e8f0'}`,
                        borderRadius: '12px', fontSize: '12px', color: darkMode ? '#e2e8f0' : '#1e293b',
                      }}
                      formatter={(value) => [`${value}%`, 'Competency']}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </motion.div>
          </div>

          {/* Quick Recorded + Experiential */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Recent Recordings */}
            <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-5">
              <h3 className="text-base font-semibold text-foreground flex items-center gap-2 mb-4">
                <Play className="w-4 h-4 text-purple-500" />
                Recent Recordings
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {recordedLectures.slice(0, 4).map((rec) => (
                  <div key={rec.id} className="p-3 rounded-xl border border-border gradient-card-blue hover:shadow-sm transition-all group cursor-pointer">
                    <div className="w-full h-20 rounded-lg gradient-birla flex items-center justify-center mb-2 relative overflow-hidden">
                      <span className="text-2xl">{rec.thumbnail}</span>
                      <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <Play className="w-8 h-8 text-white" />
                      </div>
                      <span className="absolute bottom-1 right-1 px-1.5 py-0.5 rounded bg-black/60 text-white text-[9px] flex items-center gap-0.5">
                        <Clock className="w-2.5 h-2.5" /> {rec.duration}
                      </span>
                    </div>
                    <p className="text-xs font-semibold text-foreground truncate">{rec.topic}</p>
                    <p className="text-[10px] text-muted-foreground">{rec.subject} &bull; {rec.teacher}</p>
                    <div className="flex items-center gap-2 mt-1.5">
                      <span className="flex items-center gap-0.5 text-[9px] text-muted-foreground">
                        <Eye className="w-2.5 h-2.5" /> {rec.views}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Experiential Learning */}
            <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-semibold text-foreground flex items-center gap-2">
                  <Globe className="w-4 h-4 text-cyan-500" />
                  Experiential Learning
                </h3>
                <span className="text-xs px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 font-medium">
                  NEP 2020
                </span>
              </div>
              <div className="space-y-3 max-h-72 overflow-y-auto">
                {experientialLearning.map((exp) => (
                  <div key={exp.id} className="p-3 rounded-xl border border-border gradient-card-blue hover:shadow-sm transition-all">
                    <div className="flex items-center justify-between mb-2">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${
                        exp.status === 'Active' ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' :
                        exp.status === 'Planning' ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400' :
                        'bg-muted text-muted-foreground'
                      }`}>
                        {exp.status}
                      </span>
                      <span className="text-[10px] text-muted-foreground">{exp.type}</span>
                    </div>
                    <p className="text-sm font-semibold text-foreground">{exp.title}</p>
                    <p className="text-[11px] text-muted-foreground mt-0.5">{exp.subject} &bull; {exp.class} &bull; {exp.students} students</p>
                    <p className="text-[10px] text-muted-foreground mt-1 italic">{exp.outcome}</p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-[10px] text-muted-foreground">Starts: {exp.startDate}</span>
                      <ChevronRight className="w-3.5 h-3.5 text-muted-foreground" />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* AI Recommendations */}
          <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-semibold text-foreground flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-birla-gold" />
                AI-Powered Recommendations
              </h3>
              <span className="text-xs px-2 py-0.5 rounded-full bg-birla-gold/10 text-birla-gold font-medium">
                {aiRecommendations.length} Insights
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {aiRecommendations.map((rec) => {
                const Icon = rec.icon
                return (
                  <div key={rec.id} className="p-4 rounded-xl border border-border gradient-card-blue hover:shadow-md transition-all group">
                    <div className="flex items-start gap-3">
                      <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${rec.color}`}>
                        <Icon className="w-4.5 h-4.5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold text-foreground">{rec.title}</p>
                        <p className="text-[10px] text-muted-foreground mt-1 leading-relaxed">{rec.desc}</p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* ─── Virtual Classrooms Tab ──────────────────────── */}
      {activeTab === 'classrooms' && (
        <motion.div variants={itemVariants} className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-semibold text-foreground flex items-center gap-2">
              <Video className="w-5 h-5 text-birla-cyan" />
              Virtual Classrooms
            </h3>
            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1.5 text-xs text-rose-500 font-medium">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-rose-500"></span>
                </span>
                2 Live Now
              </span>
            </div>
          </div>

          {/* Live Classes Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {liveClasses.map((cls) => (
              <div key={cls.id} className="rounded-2xl border border-border bg-card p-4 hover:shadow-lg transition-all group">
                <div className="flex items-center justify-between mb-3">
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium flex items-center gap-1 ${
                    cls.status === 'live' ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' :
                    cls.status === 'starting' ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400' :
                    'bg-muted text-muted-foreground'
                  }`}>
                    {cls.status === 'live' && (
                      <span className="relative flex h-1.5 w-1.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
                      </span>
                    )}
                    {cls.status === 'live' ? 'LIVE' : cls.status === 'starting' ? 'Starting Soon' : 'Scheduled'}
                  </span>
                  <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {cls.time}
                  </span>
                </div>

                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl gradient-birla flex items-center justify-center text-white text-sm font-bold">
                    {cls.subject.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">{cls.subject}</p>
                    <p className="text-[11px] text-muted-foreground">{cls.class}</p>
                  </div>
                </div>

                <p className="text-xs text-muted-foreground mb-3 line-clamp-2">{cls.topic}</p>

                <div className="flex items-center justify-between mb-3">
                  <span className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
                    <Users className="w-3.5 h-3.5" /> {cls.students} students
                  </span>
                  <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                    <Monitor className="w-3 h-3" /> {cls.duration}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-[11px] text-muted-foreground mb-3">
                  <Mic className="w-3 h-3" /> {cls.teacher}
                </div>

                <button className={`w-full py-2 rounded-xl text-xs font-medium flex items-center justify-center gap-1.5 transition-all ${
                  cls.status === 'live'
                    ? 'gradient-birla text-white shadow-md hover:opacity-90'
                    : cls.status === 'starting'
                      ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400 hover:bg-amber-500/20'
                      : 'border border-border text-muted-foreground hover:bg-muted'
                }`}>
                  {cls.status === 'live' ? <><Video className="w-3.5 h-3.5" /> Join Now</> :
                   cls.status === 'starting' ? <><Radio className="w-3.5 h-3.5" /> Get Ready</> :
                   <><Clock className="w-3.5 h-3.5" /> Schedule</>}
                </button>
              </div>
            ))}
          </div>

          {/* Recorded Lectures */}
          <div className="rounded-2xl border border-border bg-card p-5">
            <h3 className="text-base font-semibold text-foreground flex items-center gap-2 mb-4">
              <Play className="w-4 h-4 text-purple-500" />
              Recorded Lectures Library
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {recordedLectures.map((rec) => (
                <div key={rec.id} className="flex gap-3 p-3 rounded-xl border border-border gradient-card-blue hover:shadow-sm transition-all group cursor-pointer">
                  <div className="w-24 h-20 rounded-lg gradient-birla flex items-center justify-center flex-shrink-0 relative overflow-hidden">
                    <span className="text-xl">{rec.thumbnail}</span>
                    <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Play className="w-6 h-6 text-white" />
                    </div>
                    <span className="absolute bottom-1 right-1 px-1 py-0.5 rounded bg-black/60 text-white text-[8px]">{rec.duration}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-foreground truncate">{rec.topic}</p>
                    <p className="text-[10px] text-muted-foreground mt-0.5">{rec.subject}</p>
                    <p className="text-[10px] text-muted-foreground">{rec.teacher}</p>
                    <div className="flex items-center gap-3 mt-2">
                      <span className="flex items-center gap-0.5 text-[9px] text-muted-foreground">
                        <Eye className="w-2.5 h-2.5" /> {rec.views}
                      </span>
                      <span className="flex items-center gap-0.5 text-[9px] text-muted-foreground">
                        <Star className="w-2.5 h-2.5" /> 4.{Math.floor(Math.random() * 4) + 5}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* ─── Assignments Tab ─────────────────────────────── */}
      {activeTab === 'assignments' && (
        <motion.div variants={itemVariants} className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-semibold text-foreground flex items-center gap-2">
              <FileText className="w-5 h-5 text-amber-500" />
              Assignment Dashboard
            </h3>
            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg gradient-birla text-white text-xs font-medium">
              <Plus className="w-3.5 h-3.5" /> Create Assignment
            </button>
          </div>

          {/* Assignment Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { label: 'Pending', value: assignments.pending.length, color: 'from-amber-800 to-amber-600', icon: Clock },
              { label: 'Submitted', value: assignments.submitted.length, color: 'from-blue-900 to-blue-700', icon: Send },
              { label: 'Graded', value: assignments.graded.length, color: 'from-emerald-800 to-emerald-600', icon: CheckCircle2 },
            ].map((stat) => {
              const Icon = stat.icon
              return (
                <div key={stat.label} className={`rounded-2xl bg-gradient-to-br ${stat.color} p-5 text-white`}>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">{stat.value}</p>
                      <p className="text-xs text-white/70">{stat.label} Assignments</p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Assignment Tabs */}
          <div className="flex items-center gap-2">
            {['pending', 'submitted', 'graded'].map((tab) => (
              <button
                key={tab}
                onClick={() => setAssignmentTab(tab)}
                className={`px-4 py-2 rounded-xl text-xs font-medium capitalize transition-all ${
                  assignmentTab === tab
                    ? 'gradient-birla text-white shadow-md'
                    : 'border border-border text-muted-foreground hover:bg-muted'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Assignment List */}
          <div className="space-y-3">
            <AnimatePresence mode="wait">
              {assignmentTab === 'pending' && (
                <motion.div key="pending" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-3">
                  {assignments.pending.map((a) => (
                    <div key={a.id} className="rounded-xl border border-border bg-card p-4 flex flex-col sm:flex-row sm:items-center gap-3 hover:shadow-sm transition-all">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-foreground">{a.title}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">{a.subject} &bull; {a.class}</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-center">
                          <p className="text-sm font-bold text-foreground">{a.submissions}/{a.total}</p>
                          <p className="text-[9px] text-muted-foreground">Submitted</p>
                        </div>
                        <div className="text-center">
                          <p className="text-sm font-bold text-amber-500">{a.dueDate}</p>
                          <p className="text-[9px] text-muted-foreground">Due Date</p>
                        </div>
                        <button className="px-3 py-1.5 rounded-lg border border-border text-xs font-medium hover:bg-muted transition-colors">View</button>
                      </div>
                    </div>
                  ))}
                </motion.div>
              )}
              {assignmentTab === 'submitted' && (
                <motion.div key="submitted" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-3">
                  {assignments.submitted.map((a) => (
                    <div key={a.id} className="rounded-xl border border-border bg-card p-4 flex flex-col sm:flex-row sm:items-center gap-3 hover:shadow-sm transition-all">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-foreground">{a.title}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">{a.subject} &bull; {a.class}</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-center">
                          <p className="text-sm font-bold text-foreground">{a.submitted}/{a.total}</p>
                          <p className="text-[9px] text-muted-foreground">Submitted</p>
                        </div>
                        <div className="text-center">
                          <p className="text-sm font-bold text-birla-cyan">{a.avgScore}%</p>
                          <p className="text-[9px] text-muted-foreground">Avg Score</p>
                        </div>
                        <button className="px-3 py-1.5 rounded-lg gradient-birla text-white text-xs font-medium">Grade</button>
                      </div>
                    </div>
                  ))}
                </motion.div>
              )}
              {assignmentTab === 'graded' && (
                <motion.div key="graded" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-3">
                  {assignments.graded.map((a) => (
                    <div key={a.id} className="rounded-xl border border-border bg-card p-4 flex flex-col sm:flex-row sm:items-center gap-3 hover:shadow-sm transition-all">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-foreground">{a.title}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">{a.subject} &bull; {a.class}</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-center">
                          <p className="text-sm font-bold text-emerald-500">{a.avgScore}%</p>
                          <p className="text-[9px] text-muted-foreground">Avg</p>
                        </div>
                        <div className="text-center">
                          <p className="text-sm font-bold text-foreground">{a.highest}%</p>
                          <p className="text-[9px] text-muted-foreground">Highest</p>
                        </div>
                        <div className="text-center">
                          <p className="text-sm font-bold text-red-500">{a.lowest}%</p>
                          <p className="text-[9px] text-muted-foreground">Lowest</p>
                        </div>
                        <button className="px-3 py-1.5 rounded-lg border border-border text-xs font-medium hover:bg-muted transition-colors">Report</button>
                      </div>
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      )}

      {/* ─── Quiz Engine Tab ─────────────────────────────── */}
      {activeTab === 'quizzes' && (
        <motion.div variants={itemVariants} className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-semibold text-foreground flex items-center gap-2">
              <Brain className="w-5 h-5 text-purple-500" />
              Quiz Engine
            </h3>
            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg gradient-birla text-white text-xs font-medium">
              <Plus className="w-3.5 h-3.5" /> Create Quiz
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {activeQuizzes.map((quiz) => (
              <div key={quiz.id} className="rounded-2xl border border-border bg-card p-5 hover:shadow-md transition-all">
                <div className="flex items-center justify-between mb-3">
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${
                    quiz.status === 'active' ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' :
                    quiz.status === 'completed' ? 'bg-muted text-muted-foreground' :
                    'bg-amber-500/10 text-amber-600 dark:text-amber-400'
                  }`}>
                    {quiz.status === 'active' ? '● Active' : quiz.status === 'completed' ? 'Completed' : 'Scheduled'}
                  </span>
                  <span className="flex items-center gap-1 text-[10px] text-muted-foreground">
                    <Clock className="w-3 h-3" /> {quiz.duration}
                  </span>
                </div>
                <p className="text-sm font-semibold text-foreground">{quiz.title}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{quiz.subject} &bull; {quiz.class}</p>
                <div className="grid grid-cols-3 gap-2 mt-4">
                  <div className="text-center p-2 rounded-lg bg-muted/30">
                    <p className="text-sm font-bold text-foreground">{quiz.questions}</p>
                    <p className="text-[9px] text-muted-foreground">Questions</p>
                  </div>
                  <div className="text-center p-2 rounded-lg bg-muted/30">
                    <p className="text-sm font-bold text-foreground">{quiz.participants}</p>
                    <p className="text-[9px] text-muted-foreground">Participants</p>
                  </div>
                  <div className="text-center p-2 rounded-lg bg-muted/30">
                    <p className="text-sm font-bold text-birla-cyan">{quiz.avgScore}%</p>
                    <p className="text-[9px] text-muted-foreground">Avg Score</p>
                  </div>
                </div>
                <button className={`w-full mt-3 py-2 rounded-xl text-xs font-medium transition-all ${
                  quiz.status === 'active'
                    ? 'gradient-birla text-white'
                    : 'border border-border text-muted-foreground hover:bg-muted'
                }`}>
                  {quiz.status === 'active' ? 'Monitor Live' : quiz.status === 'completed' ? 'View Results' : 'Edit Quiz'}
                </button>
              </div>
            ))}
          </div>

          {/* Quiz Performance Chart */}
          <div className="rounded-2xl border border-border bg-card p-5">
            <h3 className="text-base font-semibold text-foreground flex items-center gap-2 mb-4">
              <BarChart3 className="w-4 h-4 text-birla-cyan" />
              Quiz Performance by Subject
            </h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={activeQuizzes.filter(q => q.status !== 'scheduled')}>
                  <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'} />
                  <XAxis dataKey="subject" tick={{ fontSize: 10 }} stroke={darkMode ? '#64748b' : '#94a3b8'} />
                  <YAxis tick={{ fontSize: 10 }} stroke={darkMode ? '#64748b' : '#94a3b8'} domain={[0, 100]} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: darkMode ? '#1A2D4A' : '#fff',
                      border: `1px solid ${darkMode ? 'rgba(255,255,255,0.1)' : '#e2e8f0'}`,
                      borderRadius: '12px', fontSize: '12px', color: darkMode ? '#e2e8f0' : '#1e293b',
                    }}
                  />
                  <Bar dataKey="avgScore" fill="#22D3EE" radius={[6, 6, 0, 0]} name="Avg Score %" />
                  <Bar dataKey="participants" fill="#C8A45C" radius={[6, 6, 0, 0]} name="Participants" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </motion.div>
      )}

      {/* ─── Skills & Bloom's Tab ────────────────────────── */}
      {activeTab === 'skills' && (
        <motion.div variants={itemVariants} className="space-y-6">
          <h3 className="text-base font-semibold text-foreground flex items-center gap-2">
            <Target className="w-5 h-5 text-birla-gold" />
            Skill-Based Learning Progress
          </h3>

          {/* Skill Competency Bars */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-5">
              <h4 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
                <Award className="w-4 h-4 text-birla-gold" />
                Competency Progress
              </h4>
              <div className="space-y-4">
                {skillProgress.map((skill) => (
                  <div key={skill.skill}>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-xs font-medium text-foreground">{skill.skill}</span>
                      <span className="text-xs font-bold" style={{ color: skill.color }}>{skill.score}%</span>
                    </div>
                    <div className="h-3 rounded-full bg-muted overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${skill.score}%` }}
                        transition={{ duration: 1, delay: 0.2, ease: 'easeOut' }}
                        className="h-full rounded-full"
                        style={{ background: `linear-gradient(90deg, ${skill.color}88, ${skill.color})` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Bloom's Taxonomy Visualization */}
            <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-5">
              <h4 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
                <Layers className="w-4 h-4 text-purple-500" />
                Bloom&apos;s Taxonomy Alignment
              </h4>
              <div className="space-y-2">
                {bloomsData.map((level, idx) => {
                  const widthPct = level.percentage
                  return (
                    <div key={level.level} className="flex items-center gap-3">
                      <span className="text-[10px] font-medium text-muted-foreground w-16 text-right">{level.level}</span>
                      <div className="flex-1 h-8 rounded-lg bg-muted/30 overflow-hidden relative">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${widthPct}%` }}
                          transition={{ duration: 0.8, delay: idx * 0.1 }}
                          className="h-full rounded-lg flex items-center justify-end pr-2"
                          style={{ backgroundColor: level.color }}
                        >
                          <span className="text-[10px] font-bold text-white">{widthPct}%</span>
                        </motion.div>
                      </div>
                      <span className="text-[10px] text-muted-foreground w-12">{level.students.toLocaleString()}</span>
                    </div>
                  )
                })}
              </div>
              <div className="mt-3 p-3 rounded-lg bg-muted/30 text-[10px] text-muted-foreground">
                <span className="font-medium text-foreground">NEP 2020 Focus:</span> Shift from rote learning (Remember/Understand) towards higher-order thinking (Analyze/Evaluate/Create)
              </div>
            </motion.div>
          </div>

          {/* NEP Radar + Learning Outcomes */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-5">
              <h4 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                <ClipboardCheck className="w-4 h-4 text-emerald-500" />
                NEP Competency Tracker
              </h4>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="70%" data={nepCompetencyData}>
                    <PolarGrid stroke={darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)'} />
                    <PolarAngleAxis dataKey="subject" tick={{ fontSize: 9 }} stroke={darkMode ? '#64748b' : '#94a3b8'} />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fontSize: 8 }} stroke={darkMode ? '#64748b' : '#94a3b8'} />
                    <Radar name="Current" dataKey="competency" stroke="#22D3EE" fill="#22D3EE" fillOpacity={0.15} strokeWidth={2} />
                    <Radar name="Target" dataKey="fullMark" stroke="#C8A45C" fill="none" strokeWidth={1} strokeDasharray="5 5" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: darkMode ? '#1A2D4A' : '#fff',
                        border: `1px solid ${darkMode ? 'rgba(255,255,255,0.1)' : '#e2e8f0'}`,
                        borderRadius: '12px', fontSize: '12px', color: darkMode ? '#e2e8f0' : '#1e293b',
                      }}
                    />
                    <Legend iconType="circle" wrapperStyle={{ fontSize: '11px' }} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-5">
              <h4 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-birla-cyan" />
                Learning Outcomes Mapping
              </h4>
              <div className="space-y-2 max-h-72 overflow-y-auto">
                {learningOutcomes.map((lo) => (
                  <div key={lo.id} className="p-3 rounded-xl border border-border gradient-card-blue hover:shadow-sm transition-all">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="px-2 py-0.5 rounded-full text-[9px] font-medium bg-birla-cyan/10 text-birla-cyan">
                        {lo.blooms}
                      </span>
                      <span className="text-[10px] font-medium text-foreground">{lo.alignment}% aligned</span>
                    </div>
                    <p className="text-xs font-medium text-foreground">{lo.outcome}</p>
                    <p className="text-[10px] text-muted-foreground mt-0.5">{lo.subject} &bull; Class {lo.class}</p>
                    <div className="h-1.5 rounded-full bg-muted overflow-hidden mt-2">
                      <div
                        className="h-full rounded-full gradient-birla-cyan"
                        style={{ width: `${lo.alignment}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}

      {/* ─── Digital Library Tab ─────────────────────────── */}
      {activeTab === 'library' && (
        <motion.div variants={itemVariants} className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-semibold text-foreground flex items-center gap-2">
              <Library className="w-5 h-5 text-emerald-500" />
              Digital Library
            </h3>
            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg gradient-birla text-white text-xs font-medium">
              <Plus className="w-3.5 h-3.5" /> Add Resource
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {digitalLibrary.map((book) => (
              <div key={book.id} className="rounded-2xl border border-border bg-card p-4 hover:shadow-md transition-all group">
                <div className="flex items-start gap-3">
                  <div className="w-14 h-18 rounded-lg gradient-birla flex items-center justify-center text-2xl flex-shrink-0">
                    {book.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-foreground line-clamp-2">{book.title}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{book.subject}</p>
                    <span className={`inline-block mt-1 px-2 py-0.5 rounded-full text-[9px] font-medium ${
                      book.type === 'Textbook' ? 'bg-blue-500/10 text-blue-600 dark:text-blue-400' :
                      book.type === 'Reference' ? 'bg-purple-500/10 text-purple-600 dark:text-purple-400' :
                      'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                    }`}>
                      {book.type}
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-4 pt-3 border-t border-border">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-0.5 text-[10px] text-muted-foreground">
                      <Eye className="w-3 h-3" /> {book.access.toLocaleString()}
                    </span>
                    <span className="flex items-center gap-0.5 text-[10px] text-amber-500">
                      <Star className="w-3 h-3 fill-amber-500" /> {book.rating}
                    </span>
                  </div>
                  <button className="px-3 py-1 rounded-lg border border-border text-[10px] font-medium hover:bg-muted transition-colors group-hover:border-birla-gold/30">
                    <Bookmark className="w-3 h-3 inline mr-1" /> Save
                  </button>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* ─── Lesson Planner Tab ──────────────────────────── */}
      {activeTab === 'planner' && (
        <motion.div variants={itemVariants} className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-semibold text-foreground flex items-center gap-2">
              <Calendar className="w-5 h-5 text-birla-gold" />
              Lesson Planning Calendar
            </h3>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span>Week of March 10 - 14, 2026</span>
            </div>
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
            {lessonPlanCalendar.map((day) => (
              <div key={day.day} className="rounded-2xl border border-border bg-card p-4">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <p className="text-sm font-bold text-foreground">{day.day}</p>
                    <p className="text-xs text-muted-foreground">Mar {day.date}</p>
                  </div>
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold ${
                    day.lessons.some(l => l.status === 'in-progress')
                      ? 'gradient-birla text-white'
                      : day.lessons.every(l => l.status === 'completed')
                        ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                        : 'bg-muted text-muted-foreground'
                  }`}>
                    {day.date}
                  </div>
                </div>
                <div className="space-y-2">
                  {day.lessons.map((lesson, idx) => (
                    <div key={idx} className={`p-2.5 rounded-lg border ${
                      lesson.status === 'completed' ? 'border-emerald-500/20 bg-emerald-500/5' :
                      lesson.status === 'in-progress' ? 'border-birla-cyan/30 bg-birla-cyan/5' :
                      'border-border bg-muted/20'
                    }`}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[9px] text-muted-foreground">{lesson.time}</span>
                        {lesson.status === 'completed' && <CheckCircle2 className="w-3 h-3 text-emerald-500" />}
                        {lesson.status === 'in-progress' && (
                          <span className="relative flex h-1.5 w-1.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-cyan-500"></span>
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] font-semibold text-foreground">{lesson.subject}</p>
                      <p className="text-[9px] text-muted-foreground">{lesson.class} &bull; {lesson.topic}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Learning Outcomes Mapping */}
          <div className="rounded-2xl border border-border bg-card p-5">
            <h3 className="text-base font-semibold text-foreground flex items-center gap-2 mb-4">
              <BookOpen className="w-4 h-4 text-birla-cyan" />
              Learning Outcomes Mapping
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {learningOutcomes.map((lo) => (
                <div key={lo.id} className="p-3 rounded-xl border border-border gradient-card-blue">
                  <div className="flex items-center justify-between mb-2">
                    <span className="px-2 py-0.5 rounded-full text-[9px] font-medium bg-birla-cyan/10 text-birla-cyan">{lo.blooms}</span>
                    <span className="text-[10px] font-bold text-foreground">{lo.alignment}%</span>
                  </div>
                  <p className="text-xs font-medium text-foreground">{lo.outcome}</p>
                  <p className="text-[10px] text-muted-foreground mt-1">{lo.subject} &bull; Class {lo.class}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* ─── AI Insights Tab ─────────────────────────────── */}
      {activeTab === 'ai' && (
        <motion.div variants={itemVariants} className="space-y-6">
          <h3 className="text-base font-semibold text-foreground flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-birla-gold" />
            AI-Powered Insights & Recommendations
          </h3>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* AI Recommendations */}
            <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-5">
              <h4 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
                <Lightbulb className="w-4 h-4 text-amber-500" />
                Smart Recommendations
              </h4>
              <div className="space-y-3">
                {aiRecommendations.map((rec) => {
                  const Icon = rec.icon
                  return (
                    <div key={rec.id} className="p-3 rounded-xl border border-border gradient-card-blue hover:shadow-sm transition-all">
                      <div className="flex items-start gap-3">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${rec.color}`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-semibold text-foreground">{rec.title}</p>
                          <p className="text-[10px] text-muted-foreground mt-0.5 leading-relaxed">{rec.desc}</p>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </motion.div>

            {/* Engagement Analytics */}
            <motion.div variants={itemVariants} className="space-y-4">
              <div className="rounded-2xl border border-border bg-card p-5">
                <h4 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-emerald-500" />
                  Engagement Prediction
                </h4>
                <div className="h-52">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={engagementTrendData}>
                      <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'} />
                      <XAxis dataKey="week" tick={{ fontSize: 9 }} stroke={darkMode ? '#64748b' : '#94a3b8'} />
                      <YAxis tick={{ fontSize: 9 }} stroke={darkMode ? '#64748b' : '#94a3b8'} domain={[50, 100]} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: darkMode ? '#1A2D4A' : '#fff',
                          border: `1px solid ${darkMode ? 'rgba(255,255,255,0.1)' : '#e2e8f0'}`,
                          borderRadius: '12px', fontSize: '11px', color: darkMode ? '#e2e8f0' : '#1e293b',
                        }}
                        formatter={(value) => [`${value}%`, '']}
                      />
                      <Area type="monotone" dataKey="live" stroke="#EF4444" fill="rgba(239,68,68,0.08)" strokeWidth={2} name="Live" />
                      <Area type="monotone" dataKey="assignment" stroke="#22D3EE" fill="rgba(34,211,238,0.08)" strokeWidth={2} name="Assignment" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Quick AI Stats */}
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: 'At-Risk Students', value: '23', icon: AlertTriangle, color: 'text-rose-500 bg-rose-500/10' },
                  { label: 'Content Gaps', value: '7', icon: BookOpen, color: 'text-amber-500 bg-amber-500/10' },
                  { label: 'High Achievers', value: '186', icon: Award, color: 'text-emerald-500 bg-emerald-500/10' },
                  { label: 'AI Suggestions', value: '15', icon: Sparkles, color: 'text-purple-500 bg-purple-500/10' },
                ].map((stat) => {
                  const Icon = stat.icon
                  return (
                    <div key={stat.label} className="rounded-xl border border-border bg-card p-3 flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${stat.color}`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-foreground">{stat.value}</p>
                        <p className="text-[9px] text-muted-foreground">{stat.label}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </motion.div>
          </div>

          {/* Experiential Learning + Learning Outcomes */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-5">
              <h4 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                <Globe className="w-4 h-4 text-cyan-500" />
                Experiential Learning Workflow
              </h4>
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {experientialLearning.map((exp) => (
                  <div key={exp.id} className="p-3 rounded-xl border border-border gradient-card-blue">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-semibold text-foreground">{exp.title}</span>
                      <span className={`px-2 py-0.5 rounded-full text-[9px] font-medium ${
                        exp.status === 'Active' ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' :
                        exp.status === 'Planning' ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400' :
                        'bg-muted text-muted-foreground'
                      }`}>
                        {exp.status}
                      </span>
                    </div>
                    <p className="text-[10px] text-muted-foreground">{exp.subject} &bull; {exp.type} &bull; {exp.class}</p>
                    <p className="text-[10px] text-muted-foreground mt-0.5 italic">{exp.outcome}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-5">
              <h4 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                <Heart className="w-4 h-4 text-rose-500" />
                AI Content Suggestions
              </h4>
              <div className="space-y-3">
                {[
                  { title: 'Interactive Quiz on Quadratic Equations', match: 96, type: 'Assessment' },
                  { title: 'PhET Simulation: Wave Interference', match: 94, type: 'Simulation' },
                  { title: 'Khan Academy: Organic Chemistry', match: 91, type: 'Video' },
                  { title: 'GeoGebra Activity: 3D Geometry', match: 88, type: 'Interactive' },
                  { title: 'National Geographic: Ecosystem Study', match: 85, type: 'Resource' },
                ].map((suggestion, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-2.5 rounded-lg border border-border hover:bg-muted/20 transition-colors cursor-pointer">
                    <div className="w-10 h-10 rounded-lg gradient-birla flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0">
                      {suggestion.match}%
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-foreground truncate">{suggestion.title}</p>
                      <p className="text-[9px] text-muted-foreground">{suggestion.type} &bull; {suggestion.match}% match</p>
                    </div>
                    <ChevronRight className="w-3.5 h-3.5 text-muted-foreground flex-shrink-0" />
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </motion.div>
  )
}
