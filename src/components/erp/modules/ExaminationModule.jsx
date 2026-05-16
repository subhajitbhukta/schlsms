'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  FileText, Users, Search, Filter, Plus, Eye, Edit, Trash2,
  ChevronRight, GraduationCap, ArrowUpRight, Clock, CheckCircle2,
  AlertTriangle, XCircle, Download, Upload, Calendar, BookOpen,
  IndianRupee, Activity, BarChart3, Award, Shield, Star,
  TrendingUp, Target, Brain, Zap, ClipboardCheck, BadgeCheck,
  PenTool, UserCheck, MessageSquare, Printer, Send, PieChart as PieChartIcon,
  FileBadge, ListChecks, Sparkles, Lightbulb, GraduationCap as Cap,
  FlaskConical, Music, Palette, Dumbbell, Trophy
} from 'lucide-react'
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Legend, PieChart, Pie, Cell,
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar
} from 'recharts'
import useAppStore from '@/store/useAppStore'

// ─── Animation Variants ─────────────────────────────────────────
const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.06 } },
}
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
}

// ─── Data ───────────────────────────────────────────────────────
const cbseGrades = [
  { grade: 'A1', marksRange: '91-100', gradePoint: 10.0, performance: 'Outstanding' },
  { grade: 'A2', marksRange: '81-90', gradePoint: 9.0, performance: 'Excellent' },
  { grade: 'B1', marksRange: '71-80', gradePoint: 8.0, performance: 'Very Good' },
  { grade: 'B2', marksRange: '61-70', gradePoint: 7.0, performance: 'Good' },
  { grade: 'C1', marksRange: '51-60', gradePoint: 6.0, performance: 'Above Average' },
  { grade: 'C2', marksRange: '41-50', gradePoint: 5.0, performance: 'Average' },
  { grade: 'D', marksRange: '33-40', gradePoint: 4.0, performance: 'Below Average' },
  { grade: 'E1', marksRange: '21-32', gradePoint: 0.0, performance: 'Needs Improvement' },
  { grade: 'E2', marksRange: '00-20', gradePoint: 0.0, performance: 'Unsatisfactory' },
]

const examSchedule = [
  { id: 'EX-001', date: 'Mar 10, 2026', subject: 'Mathematics', class: 'X-A', duration: '3 hrs', type: 'Board Exam', room: 'Hall A', status: 'Upcoming' },
  { id: 'EX-002', date: 'Mar 12, 2026', subject: 'Science', class: 'X-A', duration: '3 hrs', type: 'Board Exam', room: 'Hall A', status: 'Upcoming' },
  { id: 'EX-003', date: 'Mar 14, 2026', subject: 'English', class: 'X-A', duration: '3 hrs', type: 'Board Exam', room: 'Hall B', status: 'Upcoming' },
  { id: 'EX-004', date: 'Mar 16, 2026', subject: 'Hindi', class: 'X-A', duration: '3 hrs', type: 'Board Exam', room: 'Hall A', status: 'Upcoming' },
  { id: 'EX-005', date: 'Mar 18, 2026', subject: 'Social Science', class: 'X-A', duration: '3 hrs', type: 'Board Exam', room: 'Hall B', status: 'Upcoming' },
  { id: 'EX-006', date: 'Mar 5, 2026', subject: 'Mathematics', class: 'IX-A', duration: '2.5 hrs', type: 'Unit Test', room: 'Room 201', status: 'Completed' },
  { id: 'EX-007', date: 'Mar 6, 2026', subject: 'Science', class: 'IX-A', duration: '2.5 hrs', type: 'Unit Test', room: 'Room 201', status: 'Completed' },
  { id: 'EX-008', date: 'Mar 7, 2026', subject: 'English', class: 'VIII-A', duration: '2 hrs', type: 'Periodic Test', room: 'Room 105', status: 'Completed' },
  { id: 'EX-009', date: 'Mar 20, 2026', subject: 'Physics', class: 'XII-Sci', duration: '3 hrs', type: 'Board Exam', room: 'Hall C', status: 'Upcoming' },
  { id: 'EX-010', date: 'Mar 22, 2026', subject: 'Chemistry', class: 'XII-Sci', duration: '3 hrs', type: 'Board Exam', room: 'Hall C', status: 'Upcoming' },
  { id: 'EX-011', date: 'Mar 24, 2026', subject: 'Accountancy', class: 'XII-Comm', duration: '3 hrs', type: 'Board Exam', room: 'Hall D', status: 'Upcoming' },
  { id: 'EX-012', date: 'Mar 25, 2026', subject: 'Business Studies', class: 'XII-Comm', duration: '3 hrs', type: 'Board Exam', room: 'Hall D', status: 'Upcoming' },
]

const competencyReportCard = {
  student: 'Aarav Sharma',
  class: 'X-A',
  rollNo: 1,
  session: '2025-26',
  term: 'Term 2',
  competencies: [
    { subject: 'Mathematics', knowledge: 88, understanding: 85, application: 92, analysis: 80, grade: 'A2' },
    { subject: 'Science', knowledge: 82, understanding: 88, application: 78, analysis: 75, grade: 'B1' },
    { subject: 'English', knowledge: 90, understanding: 86, application: 84, analysis: 82, grade: 'A2' },
    { subject: 'Hindi', knowledge: 78, understanding: 80, application: 76, analysis: 72, grade: 'B1' },
    { subject: 'Social Science', knowledge: 84, understanding: 82, application: 78, analysis: 76, grade: 'B1' },
  ],
  coScholastic: [
    { area: 'Work Education', grade: 'A', remark: 'Excellent participation' },
    { area: 'Art Education', grade: 'A', remark: 'Creative and expressive' },
    { area: 'Health & Physical Education', grade: 'B+', remark: 'Active in sports' },
  ],
  discipline: { attendance: 94, punctuality: 'Good', behaviour: 'Excellent', values: 'Good' },
}

const skillAssessments = [
  { id: 'SA-001', student: 'Aarav Sharma', class: 'X-A', skill: 'Science Lab - Experiment Setup', rubric1: 8, rubric2: 9, rubric3: 7, rubric4: 8, total: 32, maxTotal: 40, grade: 'A2', teacher: 'Dr. Priya Menon' },
  { id: 'SA-002', student: 'Priya Gupta', class: 'X-A', skill: 'Mathematics - Problem Solving', rubric1: 9, rubric2: 8, rubric3: 9, rubric4: 8, total: 34, maxTotal: 40, grade: 'A1', teacher: 'Mr. Suresh Kumar' },
  { id: 'SA-003', student: 'Arjun Reddy', class: 'IX-B', skill: 'English - Public Speaking', rubric1: 7, rubric2: 8, rubric3: 6, rubric4: 7, total: 28, maxTotal: 40, grade: 'B1', teacher: 'Mrs. Anita Desai' },
  { id: 'SA-004', student: 'Ananya Iyer', class: 'VIII-A', skill: 'Computer Science - Coding', rubric1: 10, rubric2: 9, rubric3: 10, rubric4: 9, total: 38, maxTotal: 40, grade: 'A1', teacher: 'Mr. Rajesh Iyer' },
  { id: 'SA-005', student: 'Rohan Patel', class: 'VII-A', skill: 'Social Science - Map Reading', rubric1: 6, rubric2: 7, rubric3: 5, rubric4: 6, total: 24, maxTotal: 40, grade: 'C1', teacher: 'Mrs. Kavitha Nair' },
  { id: 'SA-006', student: 'Ishita Banerjee', class: 'VI-B', skill: 'Hindi - Creative Writing', rubric1: 8, rubric2: 9, rubric3: 8, rubric4: 9, total: 34, maxTotal: 40, grade: 'A2', teacher: 'Dr. Sunita Sharma' },
]

const holisticProgress = {
  student: 'Aarav Sharma',
  class: 'X-A',
  scholastic: { math: 88, science: 82, english: 90, hindi: 78, social: 84 },
  coScholastic: { arts: 85, sports: 78, music: 72, dance: 68 },
  lifeSkills: { thinking: 88, social: 82, emotional: 85, communication: 90 },
  values: { discipline: 92, honesty: 88, respect: 90, responsibility: 85, cooperation: 88 },
}

const aiInsights = [
  { id: 1, type: 'strength', title: 'Strong Mathematical Aptitude', description: 'Aarav consistently scores above 88% in Mathematics. His problem-solving skills are in the top 5% of his class. Consider recommending for competitive exam preparation.', icon: TrendingUp, confidence: 94 },
  { id: 2, type: 'improvement', title: 'Science Application Needs Focus', description: 'While theoretical knowledge is strong (82%), practical application scores are lower (78%). Suggest additional lab sessions and hands-on experiments to bridge the gap.', icon: Target, confidence: 87 },
  { id: 3, type: 'pattern', title: 'Consistent Upward Trajectory', description: 'Over the past 3 terms, there is a steady improvement of 4-6% across all subjects. Current trajectory suggests A1 grade potential in Mathematics and English by Term 3.', icon: Activity, confidence: 91 },
  { id: 4, type: 'alert', title: 'Attendance Dip in February', description: 'Attendance dropped to 82% in February from the usual 94%. This correlates with a slight dip in Hindi scores. Recommend parent-teacher consultation.', icon: AlertTriangle, confidence: 78 },
  { id: 5, type: 'recommendation', title: 'Leadership Potential Identified', description: 'Based on co-scholastic and life skills assessments, Aarav shows strong leadership traits. Consider nominating for School Prefect or House Captain role.', icon: Star, confidence: 85 },
]

const subjectWiseData = [
  { subject: 'Math', classVI: 72, classVII: 75, classVIII: 78, classIX: 74, classX: 82 },
  { subject: 'Science', classVI: 68, classVII: 71, classVIII: 73, classIX: 70, classX: 76 },
  { subject: 'English', classVI: 78, classVII: 80, classVIII: 82, classIX: 79, classX: 85 },
  { subject: 'Hindi', classVI: 74, classVII: 72, classVIII: 76, classIX: 71, classX: 78 },
  { subject: 'Social Sci', classVI: 70, classVII: 73, classVIII: 71, classIX: 68, classX: 74 },
]

const coScholasticGrades = [
  { student: 'Aarav Sharma', class: 'X-A', arts: 'A', sports: 'B+', music: 'A-', dance: 'B', remark: 'Excellent in visual arts' },
  { student: 'Priya Gupta', class: 'X-A', arts: 'A+', sports: 'A', music: 'A', dance: 'A+', remark: 'Outstanding all-rounder' },
  { student: 'Arjun Reddy', class: 'IX-B', arts: 'B+', sports: 'A+', music: 'B', dance: 'B+', remark: 'Exceptional in athletics' },
  { student: 'Ananya Iyer', class: 'VIII-A', arts: 'A', sports: 'B', music: 'A+', dance: 'A', remark: 'Gifted in music & arts' },
  { student: 'Rohan Patel', class: 'VII-A', arts: 'B', sports: 'A', music: 'B+', dance: 'B', remark: 'Strong in team sports' },
  { student: 'Ishita Banerjee', class: 'VI-B', arts: 'A', sports: 'B+', music: 'A', dance: 'A+', remark: 'Creative and expressive' },
  { student: 'Vivaan Kumar', class: 'V-A', arts: 'B+', sports: 'A-', music: 'B+', dance: 'B', remark: 'Good effort across areas' },
  { student: 'Meera Nair', class: 'IV-A', arts: 'A+', sports: 'B+', music: 'A', dance: 'A', remark: 'Talented in performing arts' },
]

const termComparison = [
  { subject: 'Mathematics', term1: 82, term2: 88 },
  { subject: 'Science', term1: 76, term2: 82 },
  { subject: 'English', term1: 85, term2: 90 },
  { subject: 'Hindi', term1: 74, term2: 78 },
  { subject: 'Social Science', term1: 79, term2: 84 },
  { subject: 'Sanskrit', term1: 70, term2: 75 },
  { subject: 'Computer Sci', term1: 88, term2: 92 },
]

const boardExamWorkflows = [
  { id: 'BE-001', student: 'Aarav Sharma', class: 'X-A', rollNo: 'BOM-X-A-001', registration: 'REG-2026-12345', hallTicket: 'HT-2026-001', status: 'Hall Ticket Issued', subjects: 5, examCenter: 'Birla Open Minds Campus' },
  { id: 'BE-002', student: 'Priya Gupta', class: 'X-A', rollNo: 'BOM-X-A-002', registration: 'REG-2026-12346', hallTicket: 'HT-2026-002', status: 'Hall Ticket Issued', subjects: 5, examCenter: 'Birla Open Minds Campus' },
  { id: 'BE-003', student: 'Vikram Malhotra', class: 'XII-Sci', rollNo: 'BOM-XII-S-001', registration: 'REG-2026-13001', hallTicket: 'HT-2026-050', status: 'Registration Confirmed', subjects: 5, examCenter: 'Birla Open Minds Campus' },
  { id: 'BE-004', student: 'Sneha Dasgupta', class: 'XII-Comm', rollNo: 'BOM-XII-C-001', registration: 'REG-2026-13101', hallTicket: '—', status: 'Fee Pending', subjects: 5, examCenter: 'Birla Open Minds Campus' },
  { id: 'BE-005', student: 'Kabir Saxena', class: 'X-A', rollNo: 'BOM-X-A-003', registration: 'REG-2026-12347', hallTicket: 'HT-2026-003', status: 'Hall Ticket Issued', subjects: 5, examCenter: 'Birla Open Minds Campus' },
]

const competencyMapping = [
  { subject: 'Mathematics', remember: 15, understand: 20, apply: 30, analyze: 20, evaluate: 10, create: 5 },
  { subject: 'Science', remember: 10, understand: 25, apply: 25, analyze: 20, evaluate: 15, create: 5 },
  { subject: 'English', remember: 10, understand: 15, apply: 20, analyze: 25, evaluate: 15, create: 15 },
  { subject: 'Social Science', remember: 20, understand: 25, apply: 15, analyze: 20, evaluate: 15, create: 5 },
  { subject: 'Hindi', remember: 15, understand: 20, apply: 20, analyze: 15, evaluate: 15, create: 15 },
]

export default function ExaminationModule() {
  const { darkMode } = useAppStore()
  const [activeTab, setActiveTab] = useState('overview')

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'schedule', label: 'Schedule', icon: Calendar },
    { id: 'report-cards', label: 'Report Cards', icon: FileBadge },
    { id: 'cbse-grading', label: 'CBSE Grading', icon: Award },
    { id: 'analytics', label: 'Analytics', icon: Activity },
  ]

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

      {/* ─── OVERVIEW TAB ────────────────────────────────── */}
      {activeTab === 'overview' && (
        <motion.div variants={itemVariants} className="space-y-6">
          {/* Top Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { label: 'Upcoming Exams', value: '12', icon: Calendar, color: 'text-cyan-500 bg-cyan-500/10', trend: '+3 this week' },
              { label: 'Results Published', value: '8', icon: CheckCircle2, color: 'text-emerald-500 bg-emerald-500/10', trend: '2 pending' },
              { label: 'Avg Score', value: '76.4%', icon: TrendingUp, color: 'text-amber-500 bg-amber-500/10', trend: '+2.1%' },
              { label: 'Pass Rate', value: '94.2%', icon: Award, color: 'text-purple-500 bg-purple-500/10', trend: '+1.8%' },
            ].map((stat) => {
              const Icon = stat.icon
              return (
                <div key={stat.label} className="rounded-2xl border border-border bg-card p-4 hover:shadow-sm transition-all">
                  <div className="flex items-center justify-between mb-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${stat.color}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-medium text-emerald-500">{stat.trend}</span>
                  </div>
                  <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                  <p className="text-[10px] text-muted-foreground mt-0.5">{stat.label}</p>
                </div>
              )
            })}
          </div>

          {/* CBSE Grading + AI Insights */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* CBSE Grading Quick View */}
            <div className="rounded-2xl border border-border bg-card p-5">
              <h4 className="text-sm font-semibold text-foreground mb-1 flex items-center gap-2">
                <Award className="w-4 h-4 text-birla-gold" />
                CBSE Grading System
              </h4>
              <p className="text-[10px] text-muted-foreground mb-3">Scholastic Area - Senior Secondary</p>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left px-2 py-2 text-[10px] font-semibold text-muted-foreground">Grade</th>
                      <th className="text-left px-2 py-2 text-[10px] font-semibold text-muted-foreground">Marks</th>
                      <th className="text-left px-2 py-2 text-[10px] font-semibold text-muted-foreground">Points</th>
                      <th className="text-left px-2 py-2 text-[10px] font-semibold text-muted-foreground">Performance</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cbseGrades.map((g) => (
                      <tr key={g.grade} className="border-b border-border/30 hover:bg-muted/20 transition-colors">
                        <td className="px-2 py-1.5">
                          <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${
                            g.gradePoint >= 9 ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' :
                            g.gradePoint >= 7 ? 'bg-blue-500/10 text-blue-600 dark:text-blue-400' :
                            g.gradePoint >= 5 ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400' :
                            g.gradePoint >= 4 ? 'bg-orange-500/10 text-orange-600 dark:text-orange-400' :
                            'bg-red-500/10 text-red-600 dark:text-red-400'
                          }`}>
                            {g.grade}
                          </span>
                        </td>
                        <td className="px-2 py-1.5 text-[10px] text-foreground">{g.marksRange}</td>
                        <td className="px-2 py-1.5 text-[10px] font-medium text-foreground">{g.gradePoint}</td>
                        <td className="px-2 py-1.5 text-[10px] text-muted-foreground">{g.performance}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* AI Performance Insights */}
            <div className="rounded-2xl border border-border bg-card p-5">
              <h4 className="text-sm font-semibold text-foreground mb-1 flex items-center gap-2">
                <Brain className="w-4 h-4 text-birla-cyan" />
                AI Performance Insights
                <span className="px-1.5 py-0.5 rounded-md bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 text-[9px] font-medium">NEP 2020</span>
              </h4>
              <p className="text-[10px] text-muted-foreground mb-3">AI-generated analysis for Aarav Sharma (X-A)</p>
              <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
                {aiInsights.map((insight) => {
                  const Icon = insight.icon
                  return (
                    <div key={insight.id} className="p-3 rounded-xl bg-muted/20 hover:bg-muted/30 transition-colors">
                      <div className="flex items-start gap-2.5">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                          insight.type === 'strength' ? 'bg-emerald-500/10 text-emerald-500' :
                          insight.type === 'improvement' ? 'bg-amber-500/10 text-amber-500' :
                          insight.type === 'pattern' ? 'bg-blue-500/10 text-blue-500' :
                          insight.type === 'alert' ? 'bg-red-500/10 text-red-500' :
                          'bg-purple-500/10 text-purple-500'
                        }`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <p className="text-xs font-medium text-foreground">{insight.title}</p>
                            <span className="text-[9px] text-muted-foreground ml-2 flex-shrink-0">{insight.confidence}% confidence</span>
                          </div>
                          <p className="text-[10px] text-muted-foreground mt-0.5 leading-relaxed">{insight.description}</p>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Holistic Progress + Skill Assessments */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Holistic Progress Card */}
            <div className="rounded-2xl border border-border bg-card p-5">
              <h4 className="text-sm font-semibold text-foreground mb-1 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-birla-gold" />
                Holistic Progress Card
              </h4>
              <p className="text-[10px] text-muted-foreground mb-3">360° View - Aarav Sharma (X-A) &bull; NEP 2020 Aligned</p>

              {/* Scholastic */}
              <div className="mb-4">
                <p className="text-[10px] font-semibold text-foreground mb-2 flex items-center gap-1">
                  <BookOpen className="w-3 h-3 text-birla-cyan" /> Scholastic
                </p>
                {Object.entries(holisticProgress.scholastic).map(([key, val]) => (
                  <div key={key} className="flex items-center gap-2 mb-1.5">
                    <span className="text-[10px] text-muted-foreground w-16 capitalize">{key}</span>
                    <div className="flex-1 h-1.5 rounded-full bg-muted overflow-hidden">
                      <div className="h-full rounded-full" style={{ width: `${val}%`, backgroundColor: val >= 85 ? '#10B981' : val >= 70 ? '#22D3EE' : '#F59E0B' }} />
                    </div>
                    <span className="text-[10px] font-medium text-foreground w-8 text-right">{val}%</span>
                  </div>
                ))}
              </div>

              {/* Co-Scholastic */}
              <div className="mb-4">
                <p className="text-[10px] font-semibold text-foreground mb-2 flex items-center gap-1">
                  <Palette className="w-3 h-3 text-purple-500" /> Co-Scholastic
                </p>
                {Object.entries(holisticProgress.coScholastic).map(([key, val]) => (
                  <div key={key} className="flex items-center gap-2 mb-1.5">
                    <span className="text-[10px] text-muted-foreground w-16 capitalize">{key}</span>
                    <div className="flex-1 h-1.5 rounded-full bg-muted overflow-hidden">
                      <div className="h-full rounded-full" style={{ width: `${val}%`, backgroundColor: '#8B5CF6' }} />
                    </div>
                    <span className="text-[10px] font-medium text-foreground w-8 text-right">{val}%</span>
                  </div>
                ))}
              </div>

              {/* Life Skills */}
              <div>
                <p className="text-[10px] font-semibold text-foreground mb-2 flex items-center gap-1">
                  <Lightbulb className="w-3 h-3 text-amber-500" /> Life Skills
                </p>
                {Object.entries(holisticProgress.lifeSkills).map(([key, val]) => (
                  <div key={key} className="flex items-center gap-2 mb-1.5">
                    <span className="text-[10px] text-muted-foreground w-16 capitalize">{key}</span>
                    <div className="flex-1 h-1.5 rounded-full bg-muted overflow-hidden">
                      <div className="h-full rounded-full" style={{ width: `${val}%`, backgroundColor: '#C8A45C' }} />
                    </div>
                    <span className="text-[10px] font-medium text-foreground w-8 text-right">{val}%</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Skill Assessments */}
            <div className="rounded-2xl border border-border bg-card p-5">
              <h4 className="text-sm font-semibold text-foreground mb-1 flex items-center gap-2">
                <PenTool className="w-4 h-4 text-emerald-500" />
                Skill-Based Assessments
              </h4>
              <p className="text-[10px] text-muted-foreground mb-3">Practical & rubric-based evaluation tracking</p>
              <div className="space-y-2 max-h-80 overflow-y-auto pr-1">
                {skillAssessments.map((sa) => (
                  <div key={sa.id} className="p-3 rounded-xl bg-muted/20 hover:bg-muted/30 transition-colors">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <p className="text-xs font-medium text-foreground">{sa.student}</p>
                        <p className="text-[9px] text-muted-foreground">Class {sa.class} • {sa.id}</p>
                      </div>
                      <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${
                        sa.grade === 'A1' ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' :
                        sa.grade === 'A2' ? 'bg-blue-500/10 text-blue-600 dark:text-blue-400' :
                        sa.grade === 'B1' ? 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400' :
                        'bg-amber-500/10 text-amber-600 dark:text-amber-400'
                      }`}>
                        {sa.grade}
                      </span>
                    </div>
                    <p className="text-[10px] text-muted-foreground mb-1.5">{sa.skill}</p>
                    <div className="flex items-center gap-3 text-[9px] text-muted-foreground mb-1.5">
                      <span>Knowledge: {sa.rubric1}/10</span>
                      <span>Process: {sa.rubric2}/10</span>
                      <span>Product: {sa.rubric3}/10</span>
                      <span>Reflection: {sa.rubric4}/10</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-20 h-1.5 rounded-full bg-muted overflow-hidden">
                          <div className="h-full rounded-full bg-emerald-500" style={{ width: `${(sa.total / sa.maxTotal) * 100}%` }} />
                        </div>
                        <span className="text-[10px] font-medium text-foreground">{sa.total}/{sa.maxTotal}</span>
                      </div>
                      <span className="text-[9px] text-muted-foreground">{sa.teacher}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* ─── SCHEDULE TAB ──────────────────────────────────── */}
      {activeTab === 'schedule' && (
        <motion.div variants={itemVariants} className="space-y-4">
          {/* Exam Schedule Table */}
          <div className="rounded-2xl border border-border bg-card p-5">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-sm font-semibold text-foreground flex items-center gap-2">
                <Calendar className="w-4 h-4 text-birla-cyan" />
                Exam Schedule - Session 2025-26
              </h4>
              <div className="flex items-center gap-2">
                <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg gradient-birla text-white text-xs font-medium">
                  <Plus className="w-3.5 h-3.5" /> Schedule Exam
                </button>
                <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border text-xs font-medium hover:bg-muted transition-colors">
                  <Download className="w-3.5 h-3.5" /> Export
                </button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border bg-muted/30">
                    <th className="text-left px-3 py-2.5 text-[10px] font-semibold text-muted-foreground">ID</th>
                    <th className="text-left px-3 py-2.5 text-[10px] font-semibold text-muted-foreground">Date</th>
                    <th className="text-left px-3 py-2.5 text-[10px] font-semibold text-muted-foreground">Subject</th>
                    <th className="text-left px-3 py-2.5 text-[10px] font-semibold text-muted-foreground">Class</th>
                    <th className="text-left px-3 py-2.5 text-[10px] font-semibold text-muted-foreground">Duration</th>
                    <th className="text-left px-3 py-2.5 text-[10px] font-semibold text-muted-foreground">Type</th>
                    <th className="text-left px-3 py-2.5 text-[10px] font-semibold text-muted-foreground">Room</th>
                    <th className="text-left px-3 py-2.5 text-[10px] font-semibold text-muted-foreground">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {examSchedule.map((exam) => (
                    <tr key={exam.id} className="border-b border-border/50 hover:bg-muted/20 transition-colors">
                      <td className="px-3 py-2.5 text-[10px] font-mono text-birla-cyan">{exam.id}</td>
                      <td className="px-3 py-2.5 text-xs text-foreground flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-muted-foreground" />
                        {exam.date}
                      </td>
                      <td className="px-3 py-2.5 text-xs font-medium text-foreground">{exam.subject}</td>
                      <td className="px-3 py-2.5 text-xs text-foreground">{exam.class}</td>
                      <td className="px-3 py-2.5 text-[10px] text-muted-foreground">{exam.duration}</td>
                      <td className="px-3 py-2.5">
                        <span className={`px-1.5 py-0.5 rounded-md text-[9px] font-medium ${
                          exam.type === 'Board Exam' ? 'bg-red-500/10 text-red-600 dark:text-red-400' :
                          exam.type === 'Unit Test' ? 'bg-blue-500/10 text-blue-600 dark:text-blue-400' :
                          'bg-amber-500/10 text-amber-600 dark:text-amber-400'
                        }`}>
                          {exam.type}
                        </span>
                      </td>
                      <td className="px-3 py-2.5 text-[10px] text-muted-foreground">{exam.room}</td>
                      <td className="px-3 py-2.5">
                        <span className={`px-2 py-0.5 rounded-full text-[9px] font-medium ${
                          exam.status === 'Upcoming' ? 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400' :
                          exam.status === 'Completed' ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' :
                          'bg-amber-500/10 text-amber-600 dark:text-amber-400'
                        }`}>
                          {exam.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Board Exam Workflows */}
          <div className="rounded-2xl border border-border bg-card p-5">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-sm font-semibold text-foreground flex items-center gap-2">
                <Shield className="w-4 h-4 text-red-500" />
                CBSE Board Exam Workflows
              </h4>
              <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border text-xs font-medium hover:bg-muted transition-colors">
                <Printer className="w-3.5 h-3.5" /> Print Hall Tickets
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border bg-muted/30">
                    <th className="text-left px-3 py-2.5 text-[10px] font-semibold text-muted-foreground">Student</th>
                    <th className="text-left px-3 py-2.5 text-[10px] font-semibold text-muted-foreground">Class</th>
                    <th className="text-left px-3 py-2.5 text-[10px] font-semibold text-muted-foreground">Registration No.</th>
                    <th className="text-left px-3 py-2.5 text-[10px] font-semibold text-muted-foreground">Hall Ticket</th>
                    <th className="text-left px-3 py-2.5 text-[10px] font-semibold text-muted-foreground">Subjects</th>
                    <th className="text-left px-3 py-2.5 text-[10px] font-semibold text-muted-foreground">Center</th>
                    <th className="text-left px-3 py-2.5 text-[10px] font-semibold text-muted-foreground">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {boardExamWorkflows.map((be) => (
                    <tr key={be.id} className="border-b border-border/50 hover:bg-muted/20 transition-colors">
                      <td className="px-3 py-2.5">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-full gradient-birla-gold flex items-center justify-center text-[10px] font-bold text-birla-blue flex-shrink-0">
                            {be.student.charAt(0)}
                          </div>
                          <div>
                            <p className="text-xs font-medium text-foreground">{be.student}</p>
                            <p className="text-[9px] text-muted-foreground">{be.rollNo}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-3 py-2.5 text-xs text-foreground">{be.class}</td>
                      <td className="px-3 py-2.5 text-[10px] font-mono text-muted-foreground">{be.registration}</td>
                      <td className="px-3 py-2.5 text-[10px] font-mono text-foreground">{be.hallTicket}</td>
                      <td className="px-3 py-2.5 text-xs text-foreground">{be.subjects}</td>
                      <td className="px-3 py-2.5 text-[10px] text-muted-foreground">{be.examCenter}</td>
                      <td className="px-3 py-2.5">
                        <span className={`px-2 py-0.5 rounded-full text-[9px] font-medium ${
                          be.status === 'Hall Ticket Issued' ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' :
                          be.status === 'Registration Confirmed' ? 'bg-blue-500/10 text-blue-600 dark:text-blue-400' :
                          'bg-amber-500/10 text-amber-600 dark:text-amber-400'
                        }`}>
                          {be.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>
      )}

      {/* ─── REPORT CARDS TAB ──────────────────────────────── */}
      {activeTab === 'report-cards' && (
        <motion.div variants={itemVariants} className="space-y-4">
          {/* Competency-Based Report Card */}
          <div className="rounded-2xl border border-border bg-card p-5 gradient-card-blue">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4">
              <div>
                <h4 className="text-sm font-semibold text-foreground flex items-center gap-2">
                  <FileBadge className="w-4 h-4 text-birla-gold" />
                  Competency-Based Report Card
                  <span className="px-1.5 py-0.5 rounded-md bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 text-[9px] font-medium">NEP 2020</span>
                </h4>
                <p className="text-[10px] text-muted-foreground mt-0.5">
                  {competencyReportCard.student} &bull; Class {competencyReportCard.class} &bull; Roll #{competencyReportCard.rollNo} &bull; {competencyReportCard.session} - {competencyReportCard.term}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button className="flex items-center gap-1 px-3 py-1.5 rounded-lg gradient-birla text-white text-xs font-medium">
                  <Printer className="w-3.5 h-3.5" /> Print
                </button>
                <button className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-border text-xs font-medium hover:bg-muted transition-colors">
                  <Download className="w-3.5 h-3.5" /> PDF
                </button>
              </div>
            </div>

            {/* Competency Indicators */}
            <div className="overflow-x-auto mb-4">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border bg-muted/30">
                    <th className="text-left px-3 py-2 text-[10px] font-semibold text-muted-foreground">Subject</th>
                    <th className="text-center px-3 py-2 text-[10px] font-semibold text-muted-foreground">Knowledge</th>
                    <th className="text-center px-3 py-2 text-[10px] font-semibold text-muted-foreground">Understanding</th>
                    <th className="text-center px-3 py-2 text-[10px] font-semibold text-muted-foreground">Application</th>
                    <th className="text-center px-3 py-2 text-[10px] font-semibold text-muted-foreground">Analysis</th>
                    <th className="text-center px-3 py-2 text-[10px] font-semibold text-muted-foreground">Grade</th>
                  </tr>
                </thead>
                <tbody>
                  {competencyReportCard.competencies.map((c) => (
                    <tr key={c.subject} className="border-b border-border/30 hover:bg-muted/20 transition-colors">
                      <td className="px-3 py-2 text-xs font-medium text-foreground">{c.subject}</td>
                      <td className="px-3 py-2 text-center">
                        <div className="flex items-center justify-center gap-1">
                          <div className="w-8 h-1.5 rounded-full bg-muted overflow-hidden">
                            <div className="h-full rounded-full" style={{ width: `${c.knowledge}%`, backgroundColor: c.knowledge >= 85 ? '#10B981' : c.knowledge >= 70 ? '#22D3EE' : '#F59E0B' }} />
                          </div>
                          <span className="text-[10px] text-foreground">{c.knowledge}</span>
                        </div>
                      </td>
                      <td className="px-3 py-2 text-center">
                        <div className="flex items-center justify-center gap-1">
                          <div className="w-8 h-1.5 rounded-full bg-muted overflow-hidden">
                            <div className="h-full rounded-full" style={{ width: `${c.understanding}%`, backgroundColor: c.understanding >= 85 ? '#10B981' : c.understanding >= 70 ? '#22D3EE' : '#F59E0B' }} />
                          </div>
                          <span className="text-[10px] text-foreground">{c.understanding}</span>
                        </div>
                      </td>
                      <td className="px-3 py-2 text-center">
                        <div className="flex items-center justify-center gap-1">
                          <div className="w-8 h-1.5 rounded-full bg-muted overflow-hidden">
                            <div className="h-full rounded-full" style={{ width: `${c.application}%`, backgroundColor: c.application >= 85 ? '#10B981' : c.application >= 70 ? '#22D3EE' : '#F59E0B' }} />
                          </div>
                          <span className="text-[10px] text-foreground">{c.application}</span>
                        </div>
                      </td>
                      <td className="px-3 py-2 text-center">
                        <div className="flex items-center justify-center gap-1">
                          <div className="w-8 h-1.5 rounded-full bg-muted overflow-hidden">
                            <div className="h-full rounded-full" style={{ width: `${c.analysis}%`, backgroundColor: c.analysis >= 85 ? '#10B981' : c.analysis >= 70 ? '#22D3EE' : '#F59E0B' }} />
                          </div>
                          <span className="text-[10px] text-foreground">{c.analysis}</span>
                        </div>
                      </td>
                      <td className="px-3 py-2 text-center">
                        <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${
                          c.grade.startsWith('A') ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' :
                          'bg-blue-500/10 text-blue-600 dark:text-blue-400'
                        }`}>
                          {c.grade}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Co-Scholastic & Discipline */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="rounded-xl border border-border bg-muted/20 p-3">
                <p className="text-[10px] font-semibold text-foreground mb-2">Co-Scholastic Areas</p>
                {competencyReportCard.coScholastic.map((cs) => (
                  <div key={cs.area} className="flex items-center justify-between py-1.5 border-b border-border/30 last:border-0">
                    <span className="text-[10px] text-muted-foreground">{cs.area}</span>
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[10px] font-bold">{cs.grade}</span>
                      <span className="text-[9px] text-muted-foreground">{cs.remark}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="rounded-xl border border-border bg-muted/20 p-3">
                <p className="text-[10px] font-semibold text-foreground mb-2">Discipline & Values</p>
                <div className="grid grid-cols-2 gap-2">
                  {Object.entries(competencyReportCard.discipline).map(([key, val]) => (
                    <div key={key} className="p-2 rounded-lg bg-background border border-border/50">
                      <p className="text-[9px] text-muted-foreground capitalize">{key}</p>
                      <p className="text-xs font-medium text-foreground">{typeof val === 'number' ? `${val}%` : val}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Co-Scholastic Assessment Table */}
          <div className="rounded-2xl border border-border bg-card p-5">
            <h4 className="text-sm font-semibold text-foreground mb-1 flex items-center gap-2">
              <Palette className="w-4 h-4 text-purple-500" />
              Co-Scholastic Assessment
            </h4>
            <p className="text-[10px] text-muted-foreground mb-3">Arts, Sports, Music & Dance grading</p>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border bg-muted/30">
                    <th className="text-left px-3 py-2.5 text-[10px] font-semibold text-muted-foreground">Student</th>
                    <th className="text-left px-3 py-2.5 text-[10px] font-semibold text-muted-foreground">Class</th>
                    <th className="text-center px-3 py-2.5 text-[10px] font-semibold text-muted-foreground">
                      <span className="flex items-center justify-center gap-1"><Palette className="w-3 h-3" />Arts</span>
                    </th>
                    <th className="text-center px-3 py-2.5 text-[10px] font-semibold text-muted-foreground">
                      <span className="flex items-center justify-center gap-1"><Dumbbell className="w-3 h-3" />Sports</span>
                    </th>
                    <th className="text-center px-3 py-2.5 text-[10px] font-semibold text-muted-foreground">
                      <span className="flex items-center justify-center gap-1"><Music className="w-3 h-3" />Music</span>
                    </th>
                    <th className="text-center px-3 py-2.5 text-[10px] font-semibold text-muted-foreground">
                      <span className="flex items-center justify-center gap-1"><Trophy className="w-3 h-3" />Dance</span>
                    </th>
                    <th className="text-left px-3 py-2.5 text-[10px] font-semibold text-muted-foreground">Remark</th>
                  </tr>
                </thead>
                <tbody>
                  {coScholasticGrades.map((cs, idx) => (
                    <tr key={idx} className="border-b border-border/50 hover:bg-muted/20 transition-colors">
                      <td className="px-3 py-2.5 text-xs font-medium text-foreground">{cs.student}</td>
                      <td className="px-3 py-2.5 text-xs text-foreground">{cs.class}</td>
                      <td className="px-3 py-2.5 text-center">
                        <GradeBadge grade={cs.arts} />
                      </td>
                      <td className="px-3 py-2.5 text-center">
                        <GradeBadge grade={cs.sports} />
                      </td>
                      <td className="px-3 py-2.5 text-center">
                        <GradeBadge grade={cs.music} />
                      </td>
                      <td className="px-3 py-2.5 text-center">
                        <GradeBadge grade={cs.dance} />
                      </td>
                      <td className="px-3 py-2.5 text-[10px] text-muted-foreground">{cs.remark}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>
      )}

      {/* ─── CBSE GRADING TAB ──────────────────────────────── */}
      {activeTab === 'cbse-grading' && (
        <motion.div variants={itemVariants} className="space-y-4">
          {/* Full CBSE Grading Table */}
          <div className="rounded-2xl border border-border bg-card p-5">
            <h4 className="text-sm font-semibold text-foreground mb-1 flex items-center gap-2">
              <Award className="w-4 h-4 text-birla-gold" />
              CBSE Grading System - Scholastic Areas
            </h4>
            <p className="text-[10px] text-muted-foreground mb-4">As per CBSE guidelines for Classes IX-XII</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-9 gap-2">
              {cbseGrades.map((g) => (
                <div key={g.grade} className={`rounded-xl border p-3 text-center ${
                  g.gradePoint >= 9 ? 'border-emerald-500/30 bg-emerald-500/5' :
                  g.gradePoint >= 7 ? 'border-blue-500/30 bg-blue-500/5' :
                  g.gradePoint >= 5 ? 'border-amber-500/30 bg-amber-500/5' :
                  g.gradePoint >= 4 ? 'border-orange-500/30 bg-orange-500/5' :
                  'border-red-500/30 bg-red-500/5'
                }`}>
                  <p className={`text-2xl font-bold ${
                    g.gradePoint >= 9 ? 'text-emerald-600 dark:text-emerald-400' :
                    g.gradePoint >= 7 ? 'text-blue-600 dark:text-blue-400' :
                    g.gradePoint >= 5 ? 'text-amber-600 dark:text-amber-400' :
                    g.gradePoint >= 4 ? 'text-orange-600 dark:text-orange-400' :
                    'text-red-600 dark:text-red-400'
                  }`}>{g.grade}</p>
                  <p className="text-[10px] font-medium text-foreground mt-1">{g.marksRange}</p>
                  <p className="text-[9px] text-muted-foreground">{g.gradePoint} pts</p>
                  <p className="text-[8px] text-muted-foreground mt-0.5">{g.performance}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Competency Mapping with Bloom's Taxonomy */}
          <div className="rounded-2xl border border-border bg-card p-5">
            <h4 className="text-sm font-semibold text-foreground mb-1 flex items-center gap-2">
              <Brain className="w-4 h-4 text-birla-cyan" />
              Competency-Based Question Mapping
            </h4>
            <p className="text-[10px] text-muted-foreground mb-3">Bloom's Taxonomy levels - Question paper design framework</p>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border bg-muted/30">
                    <th className="text-left px-3 py-2.5 text-[10px] font-semibold text-muted-foreground">Subject</th>
                    <th className="text-center px-3 py-2.5 text-[10px] font-semibold text-muted-foreground">
                      <span className="block">Remember</span>
                      <span className="text-[8px] text-muted-foreground">(L1)</span>
                    </th>
                    <th className="text-center px-3 py-2.5 text-[10px] font-semibold text-muted-foreground">
                      <span className="block">Understand</span>
                      <span className="text-[8px] text-muted-foreground">(L2)</span>
                    </th>
                    <th className="text-center px-3 py-2.5 text-[10px] font-semibold text-muted-foreground">
                      <span className="block">Apply</span>
                      <span className="text-[8px] text-muted-foreground">(L3)</span>
                    </th>
                    <th className="text-center px-3 py-2.5 text-[10px] font-semibold text-muted-foreground">
                      <span className="block">Analyze</span>
                      <span className="text-[8px] text-muted-foreground">(L4)</span>
                    </th>
                    <th className="text-center px-3 py-2.5 text-[10px] font-semibold text-muted-foreground">
                      <span className="block">Evaluate</span>
                      <span className="text-[8px] text-muted-foreground">(L5)</span>
                    </th>
                    <th className="text-center px-3 py-2.5 text-[10px] font-semibold text-muted-foreground">
                      <span className="block">Create</span>
                      <span className="text-[8px] text-muted-foreground">(L6)</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {competencyMapping.map((cm) => (
                    <tr key={cm.subject} className="border-b border-border/30 hover:bg-muted/20 transition-colors">
                      <td className="px-3 py-2.5 text-xs font-medium text-foreground">{cm.subject}</td>
                      <td className="px-3 py-2.5 text-center">
                        <BloomCell value={cm.remember} />
                      </td>
                      <td className="px-3 py-2.5 text-center">
                        <BloomCell value={cm.understand} />
                      </td>
                      <td className="px-3 py-2.5 text-center">
                        <BloomCell value={cm.apply} />
                      </td>
                      <td className="px-3 py-2.5 text-center">
                        <BloomCell value={cm.analyze} />
                      </td>
                      <td className="px-3 py-2.5 text-center">
                        <BloomCell value={cm.evaluate} />
                      </td>
                      <td className="px-3 py-2.5 text-center">
                        <BloomCell value={cm.create} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex items-center gap-4 mt-3 text-[9px] text-muted-foreground">
              <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-cyan-500/30" /> L1-L2: Lower Order</span>
              <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-amber-500/30" /> L3-L4: Higher Order</span>
              <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-purple-500/30" /> L5-L6: Highest Order</span>
            </div>
          </div>
        </motion.div>
      )}

      {/* ─── ANALYTICS TAB ─────────────────────────────────── */}
      {activeTab === 'analytics' && (
        <motion.div variants={itemVariants} className="space-y-4">
          {/* Subject-wise Average Scores */}
          <div className="rounded-2xl border border-border bg-card p-5">
            <h4 className="text-sm font-semibold text-foreground mb-1 flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-birla-cyan" />
              Subject-wise Average Scores
            </h4>
            <p className="text-[10px] text-muted-foreground mb-3">Performance comparison across classes</p>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={subjectWiseData} barGap={2} barCategoryGap="15%">
                  <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'} />
                  <XAxis dataKey="subject" tick={{ fontSize: 10 }} stroke={darkMode ? '#64748b' : '#94a3b8'} />
                  <YAxis tick={{ fontSize: 10 }} stroke={darkMode ? '#64748b' : '#94a3b8'} domain={[50, 100]} />
                  <Tooltip {...tooltipStyle} />
                  <Legend iconType="circle" wrapperStyle={{ fontSize: '10px' }} />
                  <Bar dataKey="classVI" fill="#22D3EE" radius={[3, 3, 0, 0]} name="Class VI" />
                  <Bar dataKey="classVII" fill="#C8A45C" radius={[3, 3, 0, 0]} name="Class VII" />
                  <Bar dataKey="classVIII" fill="#8B5CF6" radius={[3, 3, 0, 0]} name="Class VIII" />
                  <Bar dataKey="classIX" fill="#10B981" radius={[3, 3, 0, 0]} name="Class IX" />
                  <Bar dataKey="classX" fill="#0A1628" radius={[3, 3, 0, 0]} name="Class X" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Term-wise Performance Comparison */}
          <div className="rounded-2xl border border-border bg-card p-5">
            <h4 className="text-sm font-semibold text-foreground mb-1 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-emerald-500" />
              Term-wise Performance Comparison
            </h4>
            <p className="text-[10px] text-muted-foreground mb-3">Aarav Sharma (X-A) - Term 1 vs Term 2</p>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={termComparison} barGap={6} barCategoryGap="20%">
                  <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'} />
                  <XAxis dataKey="subject" tick={{ fontSize: 10 }} stroke={darkMode ? '#64748b' : '#94a3b8'} />
                  <YAxis tick={{ fontSize: 10 }} stroke={darkMode ? '#64748b' : '#94a3b8'} domain={[50, 100]} />
                  <Tooltip {...tooltipStyle} />
                  <Legend iconType="circle" wrapperStyle={{ fontSize: '11px' }} />
                  <Bar dataKey="term1" fill="#C8A45C" radius={[4, 4, 0, 0]} name="Term 1" />
                  <Bar dataKey="term2" fill="#22D3EE" radius={[4, 4, 0, 0]} name="Term 2" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Radar Chart for Holistic Progress */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="rounded-2xl border border-border bg-card p-5">
              <h4 className="text-sm font-semibold text-foreground mb-1 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-birla-gold" />
                Holistic Progress Radar
              </h4>
              <p className="text-[10px] text-muted-foreground mb-3">Scholastic vs Co-Scholastic vs Life Skills</p>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={[
                    { subject: 'Mathematics', scholastic: 88, coScholastic: 0, lifeSkills: 0 },
                    { subject: 'Science', scholastic: 82, coScholastic: 0, lifeSkills: 0 },
                    { subject: 'English', scholastic: 90, coScholastic: 0, lifeSkills: 0 },
                    { subject: 'Arts', scholastic: 0, coScholastic: 85, lifeSkills: 0 },
                    { subject: 'Sports', scholastic: 0, coScholastic: 78, lifeSkills: 0 },
                    { subject: 'Music', scholastic: 0, coScholastic: 72, lifeSkills: 0 },
                    { subject: 'Thinking', scholastic: 0, coScholastic: 0, lifeSkills: 88 },
                    { subject: 'Social', scholastic: 0, coScholastic: 0, lifeSkills: 82 },
                    { subject: 'Communication', scholastic: 0, coScholastic: 0, lifeSkills: 90 },
                  ]}>
                    <PolarGrid stroke={darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'} />
                    <PolarAngleAxis dataKey="subject" tick={{ fontSize: 9 }} stroke={darkMode ? '#64748b' : '#94a3b8'} />
                    <PolarRadiusAxis tick={{ fontSize: 8 }} domain={[0, 100]} stroke={darkMode ? '#64748b' : '#94a3b8'} />
                    <Radar name="Scholastic" dataKey="scholastic" stroke="#0A1628" fill="#0A1628" fillOpacity={0.2} />
                    <Radar name="Co-Scholastic" dataKey="coScholastic" stroke="#8B5CF6" fill="#8B5CF6" fillOpacity={0.2} />
                    <Radar name="Life Skills" dataKey="lifeSkills" stroke="#C8A45C" fill="#C8A45C" fillOpacity={0.2} />
                    <Legend iconType="circle" wrapperStyle={{ fontSize: '10px' }} />
                    <Tooltip {...tooltipStyle} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Performance Distribution */}
            <div className="rounded-2xl border border-border bg-card p-5">
              <h4 className="text-sm font-semibold text-foreground mb-1 flex items-center gap-2">
                <PieChartIcon className="w-4 h-4 text-purple-500" />
                Grade Distribution - Class X
              </h4>
              <p className="text-[10px] text-muted-foreground mb-3">Overall grade distribution for current term</p>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={[
                        { name: 'A1 (91-100)', value: 8, color: '#10B981' },
                        { name: 'A2 (81-90)', value: 14, color: '#22D3EE' },
                        { name: 'B1 (71-80)', value: 18, color: '#C8A45C' },
                        { name: 'B2 (61-70)', value: 12, color: '#8B5CF6' },
                        { name: 'C1 (51-60)', value: 6, color: '#F59E0B' },
                        { name: 'C2 & Below', value: 4, color: '#EF4444' },
                      ]}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={85}
                      paddingAngle={3}
                      dataKey="value"
                    >
                      {[
                        { name: 'A1 (91-100)', value: 8, color: '#10B981' },
                        { name: 'A2 (81-90)', value: 14, color: '#22D3EE' },
                        { name: 'B1 (71-80)', value: 18, color: '#C8A45C' },
                        { name: 'B2 (61-70)', value: 12, color: '#8B5CF6' },
                        { name: 'C1 (51-60)', value: 6, color: '#F59E0B' },
                        { name: 'C2 & Below', value: 4, color: '#EF4444' },
                      ].map((entry, idx) => (
                        <Cell key={idx} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip {...tooltipStyle} />
                    <Legend iconType="circle" wrapperStyle={{ fontSize: '9px' }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  )
}

// ─── Helper Component: Grade Badge ─────────────────────────────
function GradeBadge({ grade }) {
  const cleanGrade = grade.replace('+', '').replace('-', '')
  const isPlus = grade.includes('+')
  const isMinus = grade.includes('-')
  const colorClass =
    cleanGrade === 'A' ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' :
    cleanGrade === 'B' ? 'bg-blue-500/10 text-blue-600 dark:text-blue-400' :
    cleanGrade === 'C' ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400' :
    'bg-red-500/10 text-red-600 dark:text-red-400'

  return (
    <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${colorClass}`}>
      {grade}
    </span>
  )
}

// ─── Helper Component: Bloom's Taxonomy Cell ──────────────────
function BloomCell({ value }) {
  const level = value <= 15 ? 1 : value <= 20 ? 2 : value <= 25 ? 3 : 4
  const bgColor =
    level <= 2 ? 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/30' :
    level <= 3 ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30' :
    'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/30'

  return (
    <span className={`inline-flex items-center justify-center px-2 py-1 rounded-md text-[10px] font-medium border ${bgColor}`}>
      {value}%
    </span>
  )
}
