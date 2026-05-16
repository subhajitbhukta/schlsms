'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Brain, TrendingUp, TrendingDown, AlertTriangle, CheckCircle2, BarChart3,
  PieChart as PieChartIcon, Activity, Users, Target, Sparkles, Eye,
  ArrowUpRight, ArrowDownRight, Zap, Shield, BookOpen, GraduationCap,
  Clock, Award, Lightbulb, ChevronRight, Download, Filter, Search,
  Star, MessageSquare, IndianRupee, UserCheck, Calendar, FileText,
  Cpu, Database, Gauge, LineChart as LineChartIcon, Layers
} from 'lucide-react'
import {
  BarChart, Bar, AreaChart, Area, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  ScatterChart, Scatter, ComposedChart
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

const CHART_COLORS = ['#0A1628', '#22D3EE', '#C8A45C', '#8B5CF6', '#10B981', '#EF4444', '#F59E0B']

const statsCards = [
  { label: 'AI Models', value: '5', change: '+2', up: true, icon: Cpu, gradient: 'from-[#0A1628] to-[#1A2D4A]', glow: 'shadow-[#0A1628]/20' },
  { label: 'Data Points', value: '1.2M', change: '+340K', up: true, icon: Database, gradient: 'from-[#22D3EE]/80 to-[#0E7490]', glow: 'shadow-[#22D3EE]/20' },
  { label: 'Predictions', value: '847', change: '+124', up: true, icon: Brain, gradient: 'from-[#C8A45C] to-[#E8D5A0]', glow: 'shadow-[#C8A45C]/20' },
  { label: 'Accuracy', value: '94.2%', change: '+3.1%', up: true, icon: Target, gradient: 'from-emerald-800 to-emerald-600', glow: 'shadow-emerald-800/20' },
]

const predictedVsActualData = [
  { month: 'Apr', predicted: 78, actual: 76 },
  { month: 'May', predicted: 80, actual: 82 },
  { month: 'Jun', predicted: 75, actual: 73 },
  { month: 'Jul', predicted: 82, actual: 84 },
  { month: 'Aug', predicted: 79, actual: 77 },
  { month: 'Sep', predicted: 85, actual: 86 },
  { month: 'Oct', predicted: 83, actual: 81 },
  { month: 'Nov', predicted: 88, actual: 89 },
  { month: 'Dec', predicted: 86, actual: 85 },
  { month: 'Jan', predicted: 90, actual: 91 },
  { month: 'Feb', predicted: 87, actual: 88 },
  { month: 'Mar', predicted: 92, actual: null },
]

const riskStudentsData = [
  { id: 1, name: 'Rohan Gupta', class: 'IX-A', risk: 'High', score: 87, factors: ['Attendance 68%', 'Declining grades', 'No homework submission'] },
  { id: 2, name: 'Sneha Reddy', class: 'VIII-B', risk: 'High', score: 82, factors: ['Attendance 72%', 'Behavioral issues', 'Failed in 2 subjects'] },
  { id: 3, name: 'Arjun Mehta', class: 'X-C', risk: 'Medium', score: 68, factors: ['Attendance 78%', 'Drop in Math scores'] },
  { id: 4, name: 'Pooja Singh', class: 'VII-A', risk: 'Medium', score: 62, factors: ['Irregular attendance', 'Poor participation'] },
  { id: 5, name: 'Vikram Joshi', class: 'IX-B', risk: 'Medium', score: 58, factors: ['Recent grade decline', 'Missed assessments'] },
  { id: 6, name: 'Kavya Nair', class: 'X-A', risk: 'Low', score: 42, factors: ['Occasional late submission'] },
  { id: 7, name: 'Aditya Kumar', class: 'VI-C', risk: 'High', score: 91, factors: ['Attendance 55%', 'No parental engagement', 'Failed 3 subjects'] },
]

const attendanceRiskData = [
  { name: 'Rohan Gupta', class: 'IX-A', riskScore: 87, daysAbsent: 34, trend: 'Worsening', factors: ['Chronic absenteeism', 'No medical notes', 'Parent unreachable'] },
  { name: 'Aditya Kumar', class: 'VI-C', riskScore: 91, daysAbsent: 42, trend: 'Critical', factors: ['Severe absenteeism', 'Family issues', 'Transport problems'] },
  { name: 'Priya Sharma', class: 'VII-B', riskScore: 74, daysAbsent: 22, trend: 'Worsening', factors: ['Frequent illness', 'Monday-Friday pattern'] },
  { name: 'Kabir Patel', class: 'VIII-A', riskScore: 65, daysAbsent: 18, trend: 'Stable', factors: ['Seasonal health issues'] },
  { name: 'Meera Iyer', class: 'IX-C', riskScore: 58, daysAbsent: 14, trend: 'Improving', factors: ['Previous transport issue resolved'] },
]

const feeDefaultData = [
  { name: 'Quarter 1', onTime: 82, late: 12, defaulted: 6 },
  { name: 'Quarter 2', onTime: 78, late: 14, defaulted: 8 },
  { name: 'Quarter 3', onTime: 85, late: 10, defaulted: 5 },
  { name: 'Quarter 4', onTime: 72, late: 16, defaulted: 12 },
]

const feeDefaultParents = [
  { name: 'Rajesh Kumar (Parent of Aarav, X-A)', probability: 82, amount: '₹37,500', lastPaid: 'Q2 2025-26', category: 'High Risk' },
  { name: 'Sunita Devi (Parent of Priya, VII-B)', probability: 75, amount: '₹28,000', lastPaid: 'Q1 2025-26', category: 'High Risk' },
  { name: 'Mohan Lal (Parent of Ravi, IX-C)', probability: 68, amount: '₹42,000', lastPaid: 'Q2 2025-26', category: 'Medium Risk' },
  { name: 'Anita Sharma (Parent of Neha, VI-A)', probability: 55, amount: '₹18,500', lastPaid: 'Q3 2025-26', category: 'Medium Risk' },
  { name: 'Vikram Singh (Parent of Arjun, VIII-A)', probability: 45, amount: '₹31,000', lastPaid: 'Q3 2025-26', category: 'Low Risk' },
]

const feeAtRiskPieData = [
  { name: 'On Time', value: 72, color: '#10B981' },
  { name: 'Late Payment', value: 16, color: '#F59E0B' },
  { name: 'Default Risk', value: 12, color: '#EF4444' },
]

const academicTrendData = [
  { year: '2020-21', overall: 74, science: 72, math: 70, english: 78, hindi: 76, sst: 73 },
  { year: '2021-22', overall: 76, science: 75, math: 72, english: 80, hindi: 77, sst: 75 },
  { year: '2022-23', overall: 79, science: 78, math: 75, english: 82, hindi: 79, sst: 78 },
  { year: '2023-24', overall: 82, science: 81, math: 78, english: 84, hindi: 80, sst: 80 },
  { year: '2024-25', overall: 85, science: 84, math: 82, english: 87, hindi: 83, sst: 82 },
  { year: '2025-26', overall: 88, science: 87, math: 85, english: 90, hindi: 85, sst: 86 },
]

const subjectHeatmapData = [
  { subject: 'Mathematics', class6: 82, class7: 78, class8: 75, class9: 72, class10: 85, class11: 70, class12: 68 },
  { subject: 'Science', class6: 85, class7: 82, class8: 80, class9: 78, class10: 83, class11: 75, class12: 72 },
  { subject: 'English', class6: 90, class7: 88, class8: 85, class9: 82, class10: 87, class11: 80, class12: 78 },
  { subject: 'Hindi', class6: 78, class7: 76, class8: 74, class9: 72, class10: 80, class11: 68, class12: 65 },
  { subject: 'Social Science', class6: 80, class7: 78, class8: 76, class9: 74, class10: 82, class11: 70, class12: 68 },
  { subject: 'Computer Science', class6: 88, class7: 86, class8: 84, class9: 82, class10: 90, class11: 78, class12: 76 },
]

const teacherData = [
  { name: 'Dr. Priya Menon', subject: 'Mathematics', rating: 4.8, classAvg: 86, students: 120, feedback: 4.7, experience: '12 yrs' },
  { name: 'Mr. Rakesh Sharma', subject: 'Science', rating: 4.5, classAvg: 82, students: 110, feedback: 4.4, experience: '8 yrs' },
  { name: 'Ms. Ananya Iyer', subject: 'English', rating: 4.7, classAvg: 88, students: 95, feedback: 4.6, experience: '10 yrs' },
  { name: 'Mr. Suresh Kumar', subject: 'Hindi', rating: 4.2, classAvg: 78, students: 105, feedback: 4.1, experience: '15 yrs' },
  { name: 'Ms. Deepa Nair', subject: 'Social Science', rating: 4.4, classAvg: 80, students: 100, feedback: 4.3, experience: '6 yrs' },
  { name: 'Mr. Arvind Joshi', subject: 'Computer Science', rating: 4.6, classAvg: 85, students: 90, feedback: 4.5, experience: '9 yrs' },
]

const teacherRadarData = [
  { subject: 'Teaching Quality', DrMenon: 95, Avg: 78 },
  { subject: 'Student Engagement', DrMenon: 90, Avg: 72 },
  { subject: 'Assignment Quality', DrMenon: 88, Avg: 75 },
  { subject: 'Punctuality', DrMenon: 92, Avg: 80 },
  { subject: 'Communication', DrMenon: 85, Avg: 70 },
  { subject: 'Innovation', DrMenon: 88, Avg: 65 },
]

const recommendationsData = [
  { id: 1, title: 'Implement remedial classes for Mathematics in Class IX', confidence: 94, impact: 'High', category: 'Academic', icon: BookOpen, desc: 'Based on declining Math scores in IX-A and IX-B, targeted remedial sessions can improve pass rates by 15-20%.' },
  { id: 2, title: 'Activate parent engagement program for at-risk students', confidence: 91, impact: 'High', category: 'Student Welfare', icon: Users, desc: '7 students identified with chronic absenteeism. Parent counseling sessions recommended every 2 weeks.' },
  { id: 3, title: 'Introduce AI-assisted homework for Class VI-VIII', confidence: 87, impact: 'Medium', category: 'Technology', icon: Cpu, desc: 'Adaptive learning platforms can address individual learning gaps in foundational years.' },
  { id: 4, title: 'Schedule fee payment reminder cascade for Q4', confidence: 89, impact: 'High', category: 'Finance', icon: IndianRupee, desc: '₹2.8L at risk of default. Automated SMS + Email reminders to 45 parents with overdue payments.' },
  { id: 5, title: 'Peer tutoring program for Science in Class X', confidence: 82, impact: 'Medium', category: 'Academic', icon: GraduationCap, desc: 'Top 10% students in Science can mentor struggling peers, improving class average by 8-12%.' },
  { id: 6, title: 'Teacher training workshop on NEP 2020 pedagogy', confidence: 85, impact: 'Medium', category: 'Training', icon: Award, desc: 'Current NEP compliance at 82.5%. Targeted workshops can improve competency-based assessment adoption.' },
]

const executiveKPIs = [
  { label: 'Student Retention', target: 95, actual: 93.2, unit: '%', trend: 'up' },
  { label: 'Revenue Collection', target: 100, actual: 87.5, unit: '%', trend: 'up' },
  { label: 'Teacher Satisfaction', target: 90, actual: 88, unit: '%', trend: 'up' },
  { label: 'Board Exam Pass Rate', target: 98, actual: 96.8, unit: '%', trend: 'up' },
  { label: 'NEP Compliance', target: 90, actual: 82.5, unit: '%', trend: 'up' },
  { label: 'Digital Adoption', target: 85, actual: 92, unit: '%', trend: 'up' },
  { label: 'Parent Satisfaction', target: 90, actual: 91, unit: '%', trend: 'up' },
  { label: 'Infrastructure Score', target: 90, actual: 78, unit: '%', trend: 'down' },
]

export default function AnalyticsModule() {
  const { darkMode } = useAppStore()
  const [activeTab, setActiveTab] = useState('overview')

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Gauge },
    { id: 'predictions', label: 'Predictions', icon: Brain },
    { id: 'academic', label: 'Academic', icon: BookOpen },
    { id: 'teacher', label: 'Teacher', icon: Users },
    { id: 'executive', label: 'Executive', icon: Award },
  ]

  const tooltipStyle = {
    backgroundColor: darkMode ? '#1A2D4A' : '#fff',
    border: `1px solid ${darkMode ? 'rgba(255,255,255,0.1)' : '#e2e8f0'}`,
    borderRadius: '12px',
    fontSize: '12px',
    color: darkMode ? '#e2e8f0' : '#1e293b',
  }

  const getHeatColor = (value) => {
    if (value >= 85) return 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400'
    if (value >= 75) return 'bg-[#22D3EE]/15 text-[#0E7490] dark:text-[#22D3EE]'
    if (value >= 65) return 'bg-amber-500/15 text-amber-600 dark:text-amber-400'
    return 'bg-red-500/15 text-red-600 dark:text-red-400'
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="p-4 lg:p-6 space-y-6 max-w-[1600px] mx-auto"
    >
      {/* ─── Top Stats ────────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statsCards.map((card) => {
          const Icon = card.icon
          return (
            <motion.div
              key={card.label}
              variants={itemVariants}
              className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${card.gradient} p-5 text-white shadow-xl ${card.glow}`}
            >
              <div className="absolute top-0 right-0 w-24 h-24 rounded-full bg-white/5 -translate-y-6 translate-x-6" />
              <div className="absolute bottom-0 left-0 w-16 h-16 rounded-full bg-white/5 translate-y-4 -translate-x-4" />
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 rounded-xl bg-white/15 backdrop-blur-sm flex items-center justify-center">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className={`inline-flex items-center gap-0.5 text-xs font-medium px-2 py-0.5 rounded-full ${card.up ? 'bg-emerald-500/20 text-emerald-200' : 'bg-red-500/20 text-red-200'}`}>
                    {card.up ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
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

      {/* ─── Tab Navigation ───────────────────────────────── */}
      <motion.div variants={itemVariants} className="flex gap-1 p-1 rounded-xl bg-muted/50 border border-border overflow-x-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-[#0A1628] text-white shadow-md'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>
          )
        })}
      </motion.div>

      {/* ─── Overview Tab ──────────────────────────────────── */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Predictive Student Performance */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <motion.div variants={itemVariants} className="lg:col-span-2 rounded-2xl border border-border bg-card p-5">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-base font-semibold text-foreground flex items-center gap-2">
                    <LineChartIcon className="w-4 h-4 text-[#22D3EE]" />
                    Predictive Student Performance
                  </h3>
                  <p className="text-xs text-muted-foreground mt-0.5">AI-predicted vs Actual academic performance</p>
                </div>
                <span className="text-xs px-2 py-0.5 rounded-full bg-[#22D3EE]/10 text-[#22D3EE] font-medium">
                  Model Accuracy: 94.2%
                </span>
              </div>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={predictedVsActualData}>
                    <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'} />
                    <XAxis dataKey="month" tick={{ fontSize: 10 }} stroke={darkMode ? '#64748b' : '#94a3b8'} />
                    <YAxis domain={[65, 100]} tick={{ fontSize: 10 }} stroke={darkMode ? '#64748b' : '#94a3b8'} tickFormatter={(v) => `${v}%`} />
                    <Tooltip contentStyle={tooltipStyle} formatter={(value) => [`${value}%`, '']} />
                    <Legend iconType="circle" wrapperStyle={{ fontSize: '11px' }} />
                    <Line type="monotone" dataKey="predicted" stroke="#C8A45C" strokeWidth={2.5} strokeDasharray="5 5" dot={{ r: 3, fill: '#C8A45C' }} name="Predicted" />
                    <Line type="monotone" dataKey="actual" stroke="#22D3EE" strokeWidth={2.5} dot={{ r: 4, fill: '#22D3EE' }} name="Actual" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-5">
              <h3 className="text-base font-semibold text-foreground flex items-center gap-2 mb-1">
                <AlertTriangle className="w-4 h-4 text-red-500" />
                Risk Students
              </h3>
              <p className="text-xs text-muted-foreground mb-3">AI-flagged at-risk students</p>
              <div className="space-y-2 max-h-72 overflow-y-auto">
                {riskStudentsData.map((student) => (
                  <div key={student.id} className="p-2.5 rounded-xl border border-border hover:bg-muted/30 transition-colors">
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-xs font-medium text-foreground">{student.name}</p>
                      <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-medium ${
                        student.risk === 'High' ? 'bg-red-500/10 text-red-500' :
                        student.risk === 'Medium' ? 'bg-amber-500/10 text-amber-500' :
                        'bg-emerald-500/10 text-emerald-500'
                      }`}>{student.risk}</span>
                    </div>
                    <p className="text-[10px] text-muted-foreground">{student.class} &bull; Score: {student.score}/100</p>
                    <div className="w-full h-1.5 rounded-full bg-muted overflow-hidden mt-1">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${student.score}%` }}
                        transition={{ duration: 0.8, ease: 'easeOut' }}
                        className={`h-full rounded-full ${
                          student.risk === 'High' ? 'bg-red-500' :
                          student.risk === 'Medium' ? 'bg-amber-500' : 'bg-emerald-500'
                        }`}
                      />
                    </div>
                    <div className="flex flex-wrap gap-1 mt-1.5">
                      {student.factors.map((factor, i) => (
                        <span key={i} className="text-[9px] px-1.5 py-0.5 rounded-full bg-muted text-muted-foreground">{factor}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Smart Recommendations */}
          <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-semibold text-foreground flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#C8A45C]" />
                Smart AI Recommendations
              </h3>
              <span className="text-xs text-muted-foreground">Updated 5 min ago</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {recommendationsData.map((rec) => {
                const Icon = rec.icon
                return (
                  <div key={rec.id} className="p-4 rounded-xl border border-border hover:border-[#C8A45C]/30 hover:shadow-md transition-all group">
                    <div className="flex items-start gap-3 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-[#C8A45C]/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[#C8A45C]/20 transition-colors">
                        <Icon className="w-4 h-4 text-[#C8A45C]" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold text-foreground leading-snug">{rec.title}</p>
                      </div>
                    </div>
                    <p className="text-[10px] text-muted-foreground leading-relaxed mb-3">{rec.desc}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-muted text-muted-foreground">{rec.category}</span>
                        <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-medium ${
                          rec.impact === 'High' ? 'bg-red-500/10 text-red-500' : 'bg-amber-500/10 text-amber-500'
                        }`}>{rec.impact} Impact</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Gauge className="w-3 h-3 text-[#22D3EE]" />
                        <span className="text-[10px] font-semibold text-[#22D3EE]">{rec.confidence}%</span>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </motion.div>
        </div>
      )}

      {/* ─── Predictions Tab ───────────────────────────────── */}
      {activeTab === 'predictions' && (
        <div className="space-y-6">
          {/* Attendance Risk Prediction */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-semibold text-foreground flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-500" />
                  Attendance Risk Prediction
                </h3>
                <span className="text-xs px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-500 font-medium">
                  5 Students Flagged
                </span>
              </div>
              <div className="space-y-2 max-h-80 overflow-y-auto">
                {attendanceRiskData.map((student, i) => (
                  <div key={i} className="p-3 rounded-xl border border-border hover:bg-muted/30 transition-colors">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="text-sm font-medium text-foreground">{student.name}</p>
                        <p className="text-[10px] text-muted-foreground">{student.class} &bull; {student.daysAbsent} days absent</p>
                      </div>
                      <div className="text-right">
                        <span className={`text-xs font-bold ${
                          student.riskScore >= 80 ? 'text-red-500' :
                          student.riskScore >= 60 ? 'text-amber-500' : 'text-emerald-500'
                        }`}>{student.riskScore}/100</span>
                        <p className={`text-[10px] font-medium ${
                          student.trend === 'Critical' ? 'text-red-500' :
                          student.trend === 'Worsening' ? 'text-amber-500' :
                          student.trend === 'Improving' ? 'text-emerald-500' : 'text-blue-500'
                        }`}>{student.trend}</p>
                      </div>
                    </div>
                    <div className="w-full h-2 rounded-full bg-muted overflow-hidden mb-2">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${student.riskScore}%` }}
                        transition={{ duration: 0.8, ease: 'easeOut' }}
                        className={`h-full rounded-full ${
                          student.riskScore >= 80 ? 'bg-gradient-to-r from-red-500 to-red-400' :
                          student.riskScore >= 60 ? 'bg-gradient-to-r from-amber-500 to-amber-400' :
                          'bg-gradient-to-r from-emerald-500 to-emerald-400'
                        }`}
                      />
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {student.factors.map((factor, j) => (
                        <span key={j} className="text-[9px] px-1.5 py-0.5 rounded-full bg-muted text-muted-foreground">{factor}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Fee Default Prediction */}
            <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-semibold text-foreground flex items-center gap-2">
                  <IndianRupee className="w-4 h-4 text-red-500" />
                  Fee Default Prediction
                </h3>
                <span className="text-xs px-2 py-0.5 rounded-full bg-red-500/10 text-red-500 font-medium">
                  ₹2.8L at Risk
                </span>
              </div>
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={feeAtRiskPieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={80}
                      paddingAngle={3}
                      dataKey="value"
                    >
                      {feeAtRiskPieData.map((entry, idx) => (
                        <Cell key={idx} fill={entry.color} stroke="none" />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={tooltipStyle} formatter={(value) => [`${value}%`, '']} />
                    <Legend iconType="circle" wrapperStyle={{ fontSize: '11px' }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-2 mt-3 max-h-44 overflow-y-auto">
                {feeDefaultParents.map((parent, i) => (
                  <div key={i} className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/30 transition-colors">
                    <div className={`w-2 h-2 rounded-full flex-shrink-0 ${
                      parent.category === 'High Risk' ? 'bg-red-500' :
                      parent.category === 'Medium Risk' ? 'bg-amber-500' : 'bg-emerald-500'
                    }`} />
                    <div className="flex-1 min-w-0">
                      <p className="text-[11px] font-medium text-foreground truncate">{parent.name}</p>
                      <p className="text-[10px] text-muted-foreground">Last paid: {parent.lastPaid}</p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="text-xs font-semibold text-foreground">{parent.amount}</p>
                      <p className={`text-[10px] font-medium ${
                        parent.probability >= 70 ? 'text-red-500' :
                        parent.probability >= 50 ? 'text-amber-500' : 'text-emerald-500'
                      }`}>{parent.probability}% risk</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Fee Default Trend */}
          <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-5">
            <h3 className="text-base font-semibold text-foreground flex items-center gap-2 mb-4">
              <BarChart3 className="w-4 h-4 text-[#C8A45C]" />
              Fee Payment Trends by Quarter
            </h3>
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={feeDefaultData} barGap={2}>
                  <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'} />
                  <XAxis dataKey="name" tick={{ fontSize: 10 }} stroke={darkMode ? '#64748b' : '#94a3b8'} />
                  <YAxis tick={{ fontSize: 10 }} stroke={darkMode ? '#64748b' : '#94a3b8'} tickFormatter={(v) => `${v}%`} />
                  <Tooltip contentStyle={tooltipStyle} formatter={(value) => [`${value}%`, '']} />
                  <Legend iconType="circle" wrapperStyle={{ fontSize: '11px' }} />
                  <Bar dataKey="onTime" fill="#10B981" radius={[3, 3, 0, 0]} name="On Time" />
                  <Bar dataKey="late" fill="#F59E0B" radius={[3, 3, 0, 0]} name="Late" />
                  <Bar dataKey="defaulted" fill="#EF4444" radius={[3, 3, 0, 0]} name="Defaulted" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </div>
      )}

      {/* ─── Academic Tab ──────────────────────────────────── */}
      {activeTab === 'academic' && (
        <div className="space-y-6">
          {/* Academic Trend Analysis */}
          <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-5">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-base font-semibold text-foreground flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-[#22D3EE]" />
                  Multi-Year Academic Trend Analysis
                </h3>
                <p className="text-xs text-muted-foreground mt-0.5">Overall and subject-wise performance trends</p>
              </div>
              <span className="text-xs px-2 py-0.5 rounded-full bg-[#22D3EE]/10 text-[#22D3EE] font-medium">
                AY 2020-2026
              </span>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={academicTrendData}>
                  <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'} />
                  <XAxis dataKey="year" tick={{ fontSize: 10 }} stroke={darkMode ? '#64748b' : '#94a3b8'} />
                  <YAxis domain={[60, 100]} tick={{ fontSize: 10 }} stroke={darkMode ? '#64748b' : '#94a3b8'} tickFormatter={(v) => `${v}%`} />
                  <Tooltip contentStyle={tooltipStyle} formatter={(value) => [`${value}%`, '']} />
                  <Legend iconType="circle" wrapperStyle={{ fontSize: '11px' }} />
                  <Area type="monotone" dataKey="overall" stroke="#0A1628" fill="rgba(10,22,40,0.1)" strokeWidth={2.5} name="Overall" />
                  <Area type="monotone" dataKey="science" stroke="#22D3EE" fill="rgba(34,211,238,0.08)" strokeWidth={2} name="Science" />
                  <Area type="monotone" dataKey="math" stroke="#C8A45C" fill="rgba(200,164,92,0.08)" strokeWidth={2} name="Mathematics" />
                  <Area type="monotone" dataKey="english" stroke="#10B981" fill="rgba(16,185,129,0.08)" strokeWidth={2} name="English" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Subject-Wise Heat Map */}
          <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-semibold text-foreground flex items-center gap-2">
                <Layers className="w-4 h-4 text-[#C8A45C]" />
                Subject-wise Performance Heat Map
              </h3>
              <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
                <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded bg-emerald-500/30" />85%+</span>
                <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded bg-[#22D3EE]/30" />75-84%</span>
                <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded bg-amber-500/30" />65-74%</span>
                <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded bg-red-500/30" />&lt;65%</span>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left text-xs font-medium text-muted-foreground py-2 px-2">Subject</th>
                    <th className="text-center text-xs font-medium text-muted-foreground py-2 px-2">VI</th>
                    <th className="text-center text-xs font-medium text-muted-foreground py-2 px-2">VII</th>
                    <th className="text-center text-xs font-medium text-muted-foreground py-2 px-2">VIII</th>
                    <th className="text-center text-xs font-medium text-muted-foreground py-2 px-2">IX</th>
                    <th className="text-center text-xs font-medium text-muted-foreground py-2 px-2">X</th>
                    <th className="text-center text-xs font-medium text-muted-foreground py-2 px-2">XI</th>
                    <th className="text-center text-xs font-medium text-muted-foreground py-2 px-2">XII</th>
                  </tr>
                </thead>
                <tbody>
                  {subjectHeatmapData.map((row) => (
                    <tr key={row.subject} className="border-b border-border/50">
                      <td className="py-2 px-2 text-xs font-medium text-foreground">{row.subject}</td>
                      <td className="py-2 px-1"><span className={`inline-block w-full text-center text-xs font-semibold py-1.5 rounded-lg ${getHeatColor(row.class6)}`}>{row.class6}%</span></td>
                      <td className="py-2 px-1"><span className={`inline-block w-full text-center text-xs font-semibold py-1.5 rounded-lg ${getHeatColor(row.class7)}`}>{row.class7}%</span></td>
                      <td className="py-2 px-1"><span className={`inline-block w-full text-center text-xs font-semibold py-1.5 rounded-lg ${getHeatColor(row.class8)}`}>{row.class8}%</span></td>
                      <td className="py-2 px-1"><span className={`inline-block w-full text-center text-xs font-semibold py-1.5 rounded-lg ${getHeatColor(row.class9)}`}>{row.class9}%</span></td>
                      <td className="py-2 px-1"><span className={`inline-block w-full text-center text-xs font-semibold py-1.5 rounded-lg ${getHeatColor(row.class10)}`}>{row.class10}%</span></td>
                      <td className="py-2 px-1"><span className={`inline-block w-full text-center text-xs font-semibold py-1.5 rounded-lg ${getHeatColor(row.class11)}`}>{row.class11}%</span></td>
                      <td className="py-2 px-1"><span className={`inline-block w-full text-center text-xs font-semibold py-1.5 rounded-lg ${getHeatColor(row.class12)}`}>{row.class12}%</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>
      )}

      {/* ─── Teacher Tab ────────────────────────────────────── */}
      {activeTab === 'teacher' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Teacher Effectiveness */}
            <motion.div variants={itemVariants} className="lg:col-span-2 rounded-2xl border border-border bg-card p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-semibold text-foreground flex items-center gap-2">
                  <Star className="w-4 h-4 text-[#C8A45C]" />
                  Teacher Effectiveness Dashboard
                </h3>
              </div>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {teacherData.map((teacher, i) => (
                  <div key={i} className="flex items-center gap-4 p-3 rounded-xl border border-border hover:bg-muted/30 transition-colors group">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#0A1628] to-[#1A2D4A] flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                      {teacher.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground group-hover:text-[#22D3EE] transition-colors">{teacher.name}</p>
                      <p className="text-[10px] text-muted-foreground">{teacher.subject} &bull; {teacher.experience} exp &bull; {teacher.students} students</p>
                    </div>
                    <div className="flex items-center gap-4 flex-shrink-0">
                      <div className="text-center">
                        <p className="text-xs font-bold text-[#C8A45C]">{teacher.rating}</p>
                        <p className="text-[9px] text-muted-foreground">Rating</p>
                      </div>
                      <div className="text-center">
                        <p className="text-xs font-bold text-[#22D3EE]">{teacher.classAvg}%</p>
                        <p className="text-[9px] text-muted-foreground">Class Avg</p>
                      </div>
                      <div className="text-center">
                        <p className="text-xs font-bold text-emerald-500">{teacher.feedback}</p>
                        <p className="text-[9px] text-muted-foreground">Feedback</p>
                      </div>
                      <ChevronRight className="w-4 h-4 text-muted-foreground" />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Teacher Radar */}
            <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-5">
              <h3 className="text-base font-semibold text-foreground flex items-center gap-2 mb-1">
                <Target className="w-4 h-4 text-[#22D3EE]" />
                Dr. Priya Menon
              </h3>
              <p className="text-xs text-muted-foreground mb-3">Teacher vs School Average</p>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={teacherRadarData}>
                    <PolarGrid stroke={darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'} />
                    <PolarAngleAxis dataKey="subject" tick={{ fontSize: 9, fill: darkMode ? '#94a3b8' : '#64748b' }} />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fontSize: 8 }} />
                    <Radar name="Dr. Menon" dataKey="DrMenon" stroke="#C8A45C" fill="#C8A45C" fillOpacity={0.2} strokeWidth={2} />
                    <Radar name="School Avg" dataKey="Avg" stroke="#22D3EE" fill="#22D3EE" fillOpacity={0.1} strokeWidth={2} />
                    <Tooltip contentStyle={tooltipStyle} />
                    <Legend iconType="circle" wrapperStyle={{ fontSize: '10px' }} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </motion.div>
          </div>

          {/* Class Performance Correlation */}
          <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-5">
            <h3 className="text-base font-semibold text-foreground flex items-center gap-2 mb-4">
              <Activity className="w-4 h-4 text-emerald-500" />
              Teacher Rating vs Class Performance Correlation
            </h3>
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <ScatterChart>
                  <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'} />
                  <XAxis dataKey="rating" name="Teacher Rating" tick={{ fontSize: 10 }} stroke={darkMode ? '#64748b' : '#94a3b8'} domain={[3.5, 5]} />
                  <YAxis dataKey="classAvg" name="Class Avg %" tick={{ fontSize: 10 }} stroke={darkMode ? '#64748b' : '#94a3b8'} domain={[70, 95]} />
                  <Tooltip contentStyle={tooltipStyle} cursor={{ strokeDasharray: '3 3' }} />
                  <Scatter name="Teachers" data={teacherData.map(t => ({ rating: t.rating, classAvg: t.classAvg, name: t.name }))} fill="#C8A45C" />
                </ScatterChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </div>
      )}

      {/* ─── Executive Tab ──────────────────────────────────── */}
      {activeTab === 'executive' && (
        <div className="space-y-6">
          {/* KPI Dashboard */}
          <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-semibold text-foreground flex items-center gap-2">
                <Award className="w-4 h-4 text-[#C8A45C]" />
                Executive KPI Dashboard
              </h3>
              <span className="text-xs text-muted-foreground">AY 2025-26</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {executiveKPIs.map((kpi) => {
                const pct = Math.min((kpi.actual / kpi.target) * 100, 120)
                const isOnTrack = kpi.actual >= kpi.target
                return (
                  <div key={kpi.label} className="p-4 rounded-xl border border-border hover:shadow-md transition-all">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-xs text-muted-foreground">{kpi.label}</p>
                      {kpi.trend === 'up' ? <TrendingUp className="w-3 h-3 text-emerald-500" /> : <TrendingDown className="w-3 h-3 text-red-500" />}
                    </div>
                    <div className="flex items-end gap-1 mb-2">
                      <span className="text-xl font-bold text-foreground">{kpi.actual}{kpi.unit}</span>
                      <span className="text-xs text-muted-foreground mb-0.5">/ {kpi.target}{kpi.unit}</span>
                    </div>
                    <div className="h-2 rounded-full bg-muted overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${Math.min(pct, 100)}%` }}
                        transition={{ duration: 1, ease: 'easeOut' }}
                        className={`h-full rounded-full ${
                          isOnTrack ? 'bg-gradient-to-r from-emerald-500 to-[#22D3EE]' : 'bg-gradient-to-r from-amber-500 to-[#C8A45C]'
                        }`}
                      />
                    </div>
                    <p className={`text-[10px] mt-1.5 font-medium ${isOnTrack ? 'text-emerald-500' : 'text-amber-500'}`}>
                      {isOnTrack ? '✓ On Track' : `${kpi.target - kpi.actual}${kpi.unit} below target`}
                    </p>
                  </div>
                )
              })}
            </div>
          </motion.div>

          {/* Executive Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-5">
              <h3 className="text-base font-semibold text-foreground flex items-center gap-2 mb-4">
                <BarChart3 className="w-4 h-4 text-[#22D3EE]" />
                Revenue vs Target (₹ Lakhs)
              </h3>
              <div className="h-52">
                <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart data={[
                    { month: 'Q1', actual: 42, target: 48 },
                    { month: 'Q2', actual: 46, target: 48 },
                    { month: 'Q3', actual: 44, target: 50 },
                    { month: 'Q4', actual: 38, target: 52 },
                  ]}>
                    <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'} />
                    <XAxis dataKey="month" tick={{ fontSize: 10 }} stroke={darkMode ? '#64748b' : '#94a3b8'} />
                    <YAxis tick={{ fontSize: 10 }} stroke={darkMode ? '#64748b' : '#94a3b8'} tickFormatter={(v) => `₹${v}L`} />
                    <Tooltip contentStyle={tooltipStyle} formatter={(value) => [`₹${value}L`, '']} />
                    <Legend iconType="circle" wrapperStyle={{ fontSize: '11px' }} />
                    <Bar dataKey="actual" fill="#0A1628" radius={[4, 4, 0, 0]} name="Actual" />
                    <Line type="monotone" dataKey="target" stroke="#C8A45C" strokeWidth={2} strokeDasharray="5 5" dot={{ r: 4, fill: '#C8A45C' }} name="Target" />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-5">
              <h3 className="text-base font-semibold text-foreground flex items-center gap-2 mb-4">
                <Activity className="w-4 h-4 text-emerald-500" />
                Key Metrics Trend
              </h3>
              <div className="h-52">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={[
                    { month: 'Oct', retention: 92, satisfaction: 88, compliance: 78 },
                    { month: 'Nov', retention: 91, satisfaction: 89, compliance: 80 },
                    { month: 'Dec', retention: 93, satisfaction: 90, compliance: 81 },
                    { month: 'Jan', retention: 92, satisfaction: 89, compliance: 82 },
                    { month: 'Feb', retention: 93, satisfaction: 91, compliance: 82 },
                    { month: 'Mar', retention: 93, satisfaction: 91, compliance: 83 },
                  ]}>
                    <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'} />
                    <XAxis dataKey="month" tick={{ fontSize: 10 }} stroke={darkMode ? '#64748b' : '#94a3b8'} />
                    <YAxis domain={[70, 100]} tick={{ fontSize: 10 }} stroke={darkMode ? '#64748b' : '#94a3b8'} tickFormatter={(v) => `${v}%`} />
                    <Tooltip contentStyle={tooltipStyle} formatter={(value) => [`${value}%`, '']} />
                    <Legend iconType="circle" wrapperStyle={{ fontSize: '11px' }} />
                    <Line type="monotone" dataKey="retention" stroke="#0A1628" strokeWidth={2.5} dot={{ r: 3 }} name="Retention" />
                    <Line type="monotone" dataKey="satisfaction" stroke="#22D3EE" strokeWidth={2.5} dot={{ r: 3 }} name="Satisfaction" />
                    <Line type="monotone" dataKey="compliance" stroke="#C8A45C" strokeWidth={2.5} dot={{ r: 3 }} name="NEP Compliance" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </motion.div>
          </div>

          {/* Strategic Insights */}
          <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-5">
            <h3 className="text-base font-semibold text-foreground flex items-center gap-2 mb-4">
              <Lightbulb className="w-4 h-4 text-[#C8A45C]" />
              Strategic AI Insights
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {[
                { title: 'Student Enrollment Growth', insight: 'Projected 15% increase in admissions for AY 2026-27 based on current application trends and conversion rates.', confidence: 91, type: 'growth' },
                { title: 'Fee Collection Optimization', insight: 'Implementing early bird discount of 2% can improve Q4 collection by ₹3.2L and reduce default risk by 18%.', confidence: 88, type: 'finance' },
                { title: 'Teacher Workload Balance', insight: '3 teachers in Science dept are over-allocated. Redistributing 2 sections can improve teaching quality by 12%.', confidence: 85, type: 'hr' },
                { title: 'Digital Infrastructure ROI', insight: 'Smart classroom investment of ₹15L projected to yield 22% improvement in student engagement within 6 months.', confidence: 82, type: 'infrastructure' },
                { title: 'Transport Route Optimization', insight: 'Consolidating Routes 7 & 12 can save ₹4.5L annually while maintaining 98% coverage.', confidence: 79, type: 'operations' },
                { title: 'Parent Engagement Strategy', insight: 'Monthly digital newsletters can improve parent participation in PTMs by 35% based on engagement data.', confidence: 86, type: 'engagement' },
              ].map((item, i) => (
                <div key={i} className="p-4 rounded-xl border border-border hover:border-[#C8A45C]/20 transition-all">
                  <div className="flex items-start justify-between mb-2">
                    <p className="text-xs font-semibold text-foreground">{item.title}</p>
                    <div className="flex items-center gap-1 flex-shrink-0">
                      <Sparkles className="w-3 h-3 text-[#C8A45C]" />
                      <span className="text-[10px] font-bold text-[#C8A45C]">{item.confidence}%</span>
                    </div>
                  </div>
                  <p className="text-[10px] text-muted-foreground leading-relaxed">{item.insight}</p>
                  <span className="inline-block text-[9px] px-1.5 py-0.5 rounded-full bg-muted text-muted-foreground mt-2 capitalize">{item.type}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      )}
    </motion.div>
  )
}
