import { useState } from 'react'
import { motion } from 'framer-motion'
import { Brain, Users, TrendingUp, BarChart3, FileText, Calendar, Plus, ArrowUpRight, Target, Zap, Save, RotateCcw, ClipboardList, PieChart as PieChartIcon, Activity, Award, BookOpen, Briefcase, IndianRupee, Settings, LineChart as LineChartIcon, AlertTriangle, CheckCircle2, Star, ThumbsUp, ThumbsDown, Cpu, GitBranch, BarChart2, Radar as RadarIcon, Percent, Clock } from 'lucide-react'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Legend, PieChart, Pie, Cell, AreaChart,
  Area, LineChart, Line, RadarChart, PolarGrid, PolarAngleAxis,
  PolarRadiusAxis, Radar, ComposedChart
} from 'recharts'
import useAppStore from '../../../store/useAppStore'

// ─── Mock Data ────────────────────────────────────────────────────
const topStats = [
  { label: 'AI Models', value: '4', change: 'Active', icon: Cpu, gradient: 'from-purple-900 to-purple-600', glow: 'shadow-purple-800/20' },
  { label: 'Predictions', value: '1,247', change: 'This month', icon: Brain, gradient: 'from-blue-900 to-blue-700', glow: 'shadow-blue-800/20' },
  { label: 'Accuracy', value: '92%', change: 'Avg accuracy', icon: Target, gradient: 'from-emerald-900 to-emerald-600', glow: 'shadow-emerald-800/20' },
  { label: 'KPIs Tracked', value: '24', change: 'Categories', icon: BarChart2, gradient: 'from-amber-900 to-amber-600', glow: 'shadow-amber-800/20' },
]

const predictionAccuracy = [
  { month: 'Sep', performance: 88, attendance: 91, feeDefault: 85, teacherAttrition: 79 },
  { month: 'Oct', performance: 89, attendance: 90, feeDefault: 87, teacherAttrition: 81 },
  { month: 'Nov', performance: 90, attendance: 92, feeDefault: 86, teacherAttrition: 83 },
  { month: 'Dec', performance: 91, attendance: 93, feeDefault: 88, teacherAttrition: 82 },
  { month: 'Jan', performance: 92, attendance: 94, feeDefault: 89, teacherAttrition: 85 },
  { month: 'Feb', performance: 93, attendance: 95, feeDefault: 90, teacherAttrition: 86 },
  { month: 'Mar', performance: 94, attendance: 96, feeDefault: 91, teacherAttrition: 88 },
]

const riskStudents = [
  { name: 'Aarav Kumar', bspId: 'BSP/WB/2023/00125', penNo: 'PEN-2301-0456', upparId: 'UPPR-WB-102345', class: 'X-A', riskType: 'Attendance', riskScore: 78, status: 'High' },
  { name: 'Priya Gupta', bspId: 'BSP/WB/2023/00089', penNo: 'PEN-2301-0420', upparId: 'UPPR-WB-101987', class: 'IX-B', riskType: 'Performance', riskScore: 65, status: 'Medium' },
  { name: 'Rohan Sharma', bspId: 'BSP/WB/2023/00130', penNo: 'PEN-2301-0461', upparId: 'UPPR-WB-102350', class: 'VIII-A', riskType: 'Fee Default', riskScore: 82, status: 'High' },
  { name: 'Arjun Patel', bspId: 'BSP/WB/2023/00156', penNo: 'PEN-2301-0487', upparId: 'UPPR-WB-102678', class: 'XI-Sci', riskType: 'Attendance', riskScore: 45, status: 'Low' },
  { name: 'Karan Singh', bspId: 'BSP/WB/2023/00201', penNo: 'PEN-2301-0532', upparId: 'UPPR-WB-103456', class: 'X-A', riskType: 'Performance', riskScore: 72, status: 'Medium' },
  { name: 'Ananya Joshi', bspId: 'BSP/WB/2023/00045', penNo: 'PEN-2301-0376', upparId: 'UPPR-WB-101234', class: 'VII-A', riskType: 'Fee Default', riskScore: 55, status: 'Medium' },
]

const academicTrend = [
  { year: '2020', avgScore: 72, passRate: 85, distinction: 18, attendance: 88 },
  { year: '2021', avgScore: 74, passRate: 87, distinction: 20, attendance: 86 },
  { year: '2022', avgScore: 76, passRate: 89, distinction: 22, attendance: 89 },
  { year: '2023', avgScore: 78, passRate: 91, distinction: 25, attendance: 91 },
  { year: '2024', avgScore: 81, passRate: 93, distinction: 28, attendance: 92 },
  { year: '2025', avgScore: 83, passRate: 94, distinction: 30, attendance: 93 },
]

const teacherEffectiveness = [
  { name: 'Dr. Priya Menon', subject: 'Mathematics', pedagogy: 88, engagement: 85, assessment: 90, communication: 82, innovation: 78, overall: 85 },
  { name: 'Mr. Rajesh Kumar', subject: 'Science', pedagogy: 82, engagement: 88, assessment: 85, communication: 80, innovation: 85, overall: 84 },
  { name: 'Mrs. Sunita Reddy', subject: 'English', pedagogy: 90, engagement: 82, assessment: 88, communication: 92, innovation: 75, overall: 85 },
  { name: 'Mr. Arvind Desai', subject: 'Social Studies', pedagogy: 78, engagement: 80, assessment: 82, communication: 85, innovation: 72, overall: 79 },
  { name: 'Mrs. Kavitha Nair', subject: 'Hindi', pedagogy: 85, engagement: 78, assessment: 80, communication: 88, innovation: 80, overall: 82 },
]

const kpiData = [
  { name: 'Student Retention', category: 'Academic', current: 94, target: 95, previous: 92, unit: 'Percentage' },
  { name: 'Avg Attendance', category: 'Academic', current: 91, target: 95, previous: 89, unit: 'Percentage' },
  { name: 'Board Pass Rate', category: 'Academic', current: 93, target: 96, previous: 90, unit: 'Percentage' },
  { name: 'Revenue Collection', category: 'Financial', current: 85, target: 90, previous: 82, unit: 'Percentage' },
  { name: 'Fee Default Rate', category: 'Financial', current: 12, target: 8, previous: 15, unit: 'Percentage' },
  { name: 'Teacher Retention', category: 'HR', current: 88, target: 92, previous: 85, unit: 'Percentage' },
  { name: 'Parent Satisfaction', category: 'Operations', current: 87, target: 90, previous: 84, unit: 'Percentage' },
  { name: 'Digital Adoption', category: 'Operations', current: 78, target: 85, previous: 70, unit: 'Percentage' },
]

const financialForecast = [
  { month: 'Apr', actual: 1850000, predicted: 1800000, lower: 1700000, upper: 1950000 },
  { month: 'May', actual: 2100000, predicted: 2050000, lower: 1900000, upper: 2200000 },
  { month: 'Jun', actual: 1950000, predicted: 2000000, lower: 1850000, upper: 2150000 },
  { month: 'Jul', actual: 2250000, predicted: 2200000, lower: 2050000, upper: 2350000 },
  { month: 'Aug', actual: 2050000, predicted: 2100000, lower: 1950000, upper: 2250000 },
  { month: 'Sep', actual: 2350000, predicted: 2300000, lower: 2150000, upper: 2450000 },
  { month: 'Oct', actual: null, predicted: 2400000, lower: 2200000, upper: 2600000 },
  { month: 'Nov', actual: null, predicted: 2500000, lower: 2300000, upper: 2700000 },
  { month: 'Dec', actual: null, predicted: 2350000, lower: 2150000, upper: 2550000 },
  { month: 'Jan', actual: null, predicted: 2600000, lower: 2400000, upper: 2800000 },
  { month: 'Feb', actual: null, predicted: 2550000, lower: 2350000, upper: 2750000 },
  { month: 'Mar', actual: null, predicted: 2700000, lower: 2500000, upper: 2900000 },
]

const modelTypes = ['Student Performance', 'Attendance Risk', 'Fee Default', 'Teacher Attrition']
const dataRanges = ['3 months', '6 months', '1 year']
const featureOptions = ['Attendance', 'Marks', 'Fee', 'Behavior', 'Demographics']
const analysisTypes = ['Trend', 'Comparison', 'Prediction', 'Correlation']
const dataSources = ['SIS', 'Examination', 'Finance', 'Attendance', 'HR']
const outputFormats = ['Chart', 'Table', 'Both']
const kpiCategories = ['Academic', 'Financial', 'Operations', 'HR']
const kpiUnits = ['Percentage', 'Count', 'Currency']
const reportFrequencies = ['Daily', 'Weekly', 'Monthly', 'Quarterly']
const reportFormats = ['PDF', 'Excel', 'Both']
const insightTypes = ['Prediction', 'Trend', 'Anomaly', 'Recommendation']
const ratingOptions = ['1', '2', '3', '4', '5']

// ─── Animation Variants ──────────────────────────────────────────
const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.06 } },
}
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
}

export default function AnalyticsModule() {
  const { darkMode } = useAppStore()
  const [activeTab, setActiveTab] = useState('overview')
  const [activeForm, setActiveForm] = useState('predictionConfig')
  const [activeReport, setActiveReport] = useState('predictionAccuracy')

  // ─── Form States ────────────────────────────────────────
  const [predictionData, setPredictionData] = useState({
    modelType: 'Student Performance', dataRange: '6 months', confidenceThreshold: '80', features: ['Attendance', 'Marks'], retrain: false
  })
  const [customAnalysisData, setCustomAnalysisData] = useState({
    analysisName: '', analysisType: 'Trend', dataSource: 'SIS', dateRange: '', filters: '', outputFormat: 'Chart'
  })
  const [kpiTargetData, setKpiTargetData] = useState({
    kpiName: '', currentYear: '', targetValue: '', previousYear: '', category: 'Academic', unit: 'Percentage'
  })
  const [reportScheduleData, setReportScheduleData] = useState({
    reportName: '', reportType: '', frequency: 'Monthly', recipients: '', format: 'PDF'
  })
  const [insightFeedbackData, setInsightFeedbackData] = useState({
    insightId: '', insightType: 'Prediction', wasHelpful: 'Yes', userComments: '', accuracy: '4'
  })

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'predictions', label: 'Predictions', icon: Brain },
    { id: 'academic', label: 'Academic', icon: BookOpen },
    { id: 'teacher', label: 'Teacher', icon: Briefcase },
    { id: 'executive', label: 'Executive', icon: Award },
    { id: 'forms', label: 'Forms', icon: ClipboardList },
    { id: 'reports', label: 'Reports', icon: TrendingUp },
  ]

  const formOptions = [
    { key: 'predictionConfig', label: 'Prediction Config', icon: Brain },
    { key: 'customAnalysis', label: 'Custom Analysis', icon: GitBranch },
    { key: 'kpiTarget', label: 'KPI Target', icon: Target },
    { key: 'reportSchedule', label: 'Report Schedule', icon: Calendar },
    { key: 'insightFeedback', label: 'AI Insight Feedback', icon: Star },
  ]

  const reportOptions = [
    { key: 'predictionAccuracy', label: 'Prediction Accuracy', icon: Brain },
    { key: 'riskAssessment', label: 'Risk Assessment', icon: AlertTriangle },
    { key: 'academicTrend', label: 'Academic Trend', icon: BookOpen },
    { key: 'teacherEffectiveness', label: 'Teacher Effectiveness', icon: Briefcase },
    { key: 'executiveKPI', label: 'Executive KPI', icon: Award },
    { key: 'financialForecast', label: 'Financial Forecast', icon: IndianRupee },
  ]

  const tooltipStyle = {
    backgroundColor: darkMode ? '#1A2D4A' : '#fff',
    border: '1px solid ' + (darkMode ? 'rgba(255,255,255,0.1)' : '#e2e8f0'),
    borderRadius: '12px',
    fontSize: '12px',
    color: darkMode ? '#e2e8f0' : '#1e293b',
  }

  const inputClass = 'w-full px-3 py-2 rounded-lg border border-input bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-birla-gold/40 focus:border-birla-gold transition-all'
  const labelClass = 'text-xs font-medium text-muted-foreground mb-1 block'
  const formGroupClass = 'space-y-1'

  const handleFormSubmit = (formName, data) => {
    alert(`${formName} submitted successfully!\n${JSON.stringify(data, null, 2)}`)
  }

  const toggleFeature = (feature) => {
    const current = predictionData.features
    if (current.includes(feature)) {
      setPredictionData({ ...predictionData, features: current.filter(f => f !== feature) })
    } else {
      setPredictionData({ ...predictionData, features: [...current, feature] })
    }
  }

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="show" className="p-4 lg:p-6 space-y-6 max-w-[1600px] mx-auto">
      {/* Tab Navigation */}
      <motion.div variants={itemVariants} className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
        {tabs.map((tab) => {
          const Icon = tab.icon
          return (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                activeTab === tab.id ? 'gradient-birla text-white shadow-md' : 'border border-border text-muted-foreground hover:bg-muted hover:text-foreground'
              }`}>
              <Icon className="w-3.5 h-3.5" />{tab.label}
            </button>
          )
        })}
      </motion.div>

      {/* ═══════════════ OVERVIEW TAB ═══════════════ */}
      {activeTab === 'overview' && (
        <motion.div variants={itemVariants} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {topStats.map((card) => {
              const Icon = card.icon
              return (
                <motion.div key={card.label} variants={itemVariants}
                  className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${card.gradient} p-5 text-white shadow-xl ${card.glow}`}>
                  <div className="absolute top-0 right-0 w-24 h-24 rounded-full bg-white/5 -translate-y-6 translate-x-6" />
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-3">
                      <div className="w-10 h-10 rounded-xl bg-white/15 backdrop-blur-sm flex items-center justify-center">
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="inline-flex items-center gap-0.5 text-xs font-medium px-2 py-0.5 rounded-full bg-white/10 text-white/80">
                        <ArrowUpRight className="w-3 h-3" />{card.change}
                      </span>
                    </div>
                    <p className="text-2xl font-bold">{card.value}</p>
                    <p className="text-sm text-white/70 mt-0.5">{card.label}</p>
                  </div>
                </motion.div>
              )
            })}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-5">
              <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
                <Brain className="w-4 h-4 text-purple-500" />Model Accuracy Trend
              </h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={predictionAccuracy}>
                    <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'} />
                    <XAxis dataKey="month" tick={{ fontSize: 9 }} stroke={darkMode ? '#64748b' : '#94a3b8'} />
                    <YAxis domain={[70, 100]} tick={{ fontSize: 9 }} stroke={darkMode ? '#64748b' : '#94a3b8'} />
                    <Tooltip contentStyle={tooltipStyle} />
                    <Legend iconType="circle" wrapperStyle={{ fontSize: '9px' }} />
                    <Line type="monotone" dataKey="performance" stroke="#8B5CF6" strokeWidth={2} dot={{ r: 3 }} name="Performance" />
                    <Line type="monotone" dataKey="attendance" stroke="#22D3EE" strokeWidth={2} dot={{ r: 3 }} name="Attendance" />
                    <Line type="monotone" dataKey="feeDefault" stroke="#C8A45C" strokeWidth={2} dot={{ r: 3 }} name="Fee Default" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-5">
              <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
                <IndianRupee className="w-4 h-4 text-emerald-500" />Revenue Forecast
              </h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={financialForecast}>
                    <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'} />
                    <XAxis dataKey="month" tick={{ fontSize: 9 }} stroke={darkMode ? '#64748b' : '#94a3b8'} />
                    <YAxis tick={{ fontSize: 8, formatter: (v) => `₹${(v / 100000).toFixed(0)}L` }} stroke={darkMode ? '#64748b' : '#94a3b8'} />
                    <Tooltip contentStyle={tooltipStyle} formatter={(v) => v ? `₹${(v / 100000).toFixed(1)}L` : 'N/A'} />
                    <Area type="monotone" dataKey="upper" stroke="transparent" fill="#C8A45C" fillOpacity={0.1} name="Upper Bound" />
                    <Area type="monotone" dataKey="lower" stroke="transparent" fill="#C8A45C" fillOpacity={0.05} name="Lower Bound" />
                    <Line type="monotone" dataKey="actual" stroke="#0A1628" strokeWidth={2} dot={{ r: 3 }} name="Actual" connectNulls={false} />
                    <Line type="monotone" dataKey="predicted" stroke="#22D3EE" strokeWidth={2} strokeDasharray="5 5" dot={{ r: 3 }} name="Predicted" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}

      {/* ═══════════════ PREDICTIONS TAB ═══════════════ */}
      {activeTab === 'predictions' && (
        <motion.div variants={itemVariants} className="space-y-4">
          <div className="rounded-2xl border border-border bg-card p-5">
            <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
              <Brain className="w-4 h-4 text-purple-500" />AI Prediction Models
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {modelTypes.map((model, i) => {
                const accuracy = [94, 96, 91, 88][i]
                const status = ['Active', 'Active', 'Active', 'Training'][i]
                return (
                  <div key={model} className="p-4 rounded-xl border border-border hover:shadow-md transition-all">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-sm font-semibold">{model}</h4>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${status === 'Active' ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' : 'bg-amber-500/10 text-amber-600 dark:text-amber-400'}`}>{status}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                        <div className="h-full rounded-full gradient-birla-cyan" style={{ width: `${accuracy}%` }} />
                      </div>
                      <span className="text-xs font-medium">{accuracy}% accuracy</span>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </motion.div>
      )}

      {/* ═══════════════ ACADEMIC TAB ═══════════════ */}
      {activeTab === 'academic' && (
        <motion.div variants={itemVariants} className="space-y-4">
          <div className="rounded-2xl border border-border bg-card p-5">
            <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-birla-cyan" />Multi-Year Academic Trend
            </h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={academicTrend}>
                  <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'} />
                  <XAxis dataKey="year" tick={{ fontSize: 9 }} stroke={darkMode ? '#64748b' : '#94a3b8'} />
                  <YAxis domain={[60, 100]} tick={{ fontSize: 9 }} stroke={darkMode ? '#64748b' : '#94a3b8'} />
                  <Tooltip contentStyle={tooltipStyle} />
                  <Legend iconType="circle" wrapperStyle={{ fontSize: '10px' }} />
                  <Area type="monotone" dataKey="avgScore" fill="#22D3EE" fillOpacity={0.15} stroke="#22D3EE" name="Avg Score" />
                  <Area type="monotone" dataKey="passRate" fill="#10B981" fillOpacity={0.15} stroke="#10B981" name="Pass Rate" />
                  <Area type="monotone" dataKey="attendance" fill="#C8A45C" fillOpacity={0.15} stroke="#C8A45C" name="Attendance" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </motion.div>
      )}

      {/* ═══════════════ TEACHER TAB ═══════════════ */}
      {activeTab === 'teacher' && (
        <motion.div variants={itemVariants} className="space-y-4">
          <div className="rounded-2xl border border-border bg-card p-5">
            <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-birla-gold" />Teacher Effectiveness
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-2 px-3 font-medium text-muted-foreground">Teacher</th>
                    <th className="text-left py-2 px-3 font-medium text-muted-foreground">Subject</th>
                    <th className="text-left py-2 px-3 font-medium text-muted-foreground">Pedagogy</th>
                    <th className="text-left py-2 px-3 font-medium text-muted-foreground">Engagement</th>
                    <th className="text-left py-2 px-3 font-medium text-muted-foreground">Assessment</th>
                    <th className="text-left py-2 px-3 font-medium text-muted-foreground">Communication</th>
                    <th className="text-left py-2 px-3 font-medium text-muted-foreground">Innovation</th>
                    <th className="text-left py-2 px-3 font-medium text-muted-foreground">Overall</th>
                  </tr>
                </thead>
                <tbody>
                  {teacherEffectiveness.map((t, i) => (
                    <tr key={i} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                      <td className="py-2 px-3 font-medium">{t.name}</td>
                      <td className="py-2 px-3">{t.subject}</td>
                      <td className="py-2 px-3">{t.pedagogy}</td>
                      <td className="py-2 px-3">{t.engagement}</td>
                      <td className="py-2 px-3">{t.assessment}</td>
                      <td className="py-2 px-3">{t.communication}</td>
                      <td className="py-2 px-3">{t.innovation}</td>
                      <td className="py-2 px-3">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${t.overall >= 85 ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' : 'bg-amber-500/10 text-amber-600 dark:text-amber-400'}`}>{t.overall}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>
      )}

      {/* ═══════════════ EXECUTIVE TAB ═══════════════ */}
      {activeTab === 'executive' && (
        <motion.div variants={itemVariants} className="space-y-4">
          <div className="rounded-2xl border border-border bg-card p-5">
            <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
              <Award className="w-4 h-4 text-birla-gold" />Executive KPI Dashboard
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {kpiData.map((kpi, i) => (
                <div key={i} className="p-4 rounded-xl border border-border">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-sm font-medium">{kpi.name}</h4>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-muted">{kpi.category}</span>
                  </div>
                  <div className="flex items-end gap-4 mb-2">
                    <div>
                      <p className="text-[10px] text-muted-foreground">Current</p>
                      <p className="text-xl font-bold text-foreground">{kpi.current}{kpi.unit === 'Percentage' ? '%' : ''}</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-muted-foreground">Target</p>
                      <p className="text-sm font-medium text-birla-gold">{kpi.target}{kpi.unit === 'Percentage' ? '%' : ''}</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-muted-foreground">Previous</p>
                      <p className="text-sm text-muted-foreground">{kpi.previous}{kpi.unit === 'Percentage' ? '%' : ''}</p>
                    </div>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div className={`h-full rounded-full transition-all ${kpi.current >= kpi.target ? 'bg-emerald-500' : kpi.current >= kpi.target * 0.8 ? 'bg-amber-500' : 'bg-red-500'}`}
                      style={{ width: `${Math.min((kpi.current / kpi.target) * 100, 100)}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* ═══════════════ FORMS TAB ═══════════════ */}
      {activeTab === 'forms' && (
        <motion.div variants={itemVariants} className="space-y-6">
          <div className="flex flex-wrap gap-2">
            {formOptions.map((f) => {
              const Icon = f.icon
              return (
                <button key={f.key} onClick={() => setActiveForm(f.key)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                    activeForm === f.key ? 'gradient-birla text-white shadow-md' : 'border border-border text-muted-foreground hover:bg-muted hover:text-foreground'
                  }`}>
                  <Icon className="w-3.5 h-3.5" />{f.label}
                </button>
              )
            })}
          </div>

          {/* 1. Prediction Configuration Form */}
          {activeForm === 'predictionConfig' && (
            <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-6">
              <h3 className="text-base font-semibold text-foreground flex items-center gap-2 mb-6">
                <Brain className="w-5 h-5 text-purple-500" />Prediction Configuration Form
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className={formGroupClass}>
                  <label className={labelClass}>Model Type *</label>
                  <select value={predictionData.modelType} onChange={(e) => setPredictionData({ ...predictionData, modelType: e.target.value })} className={inputClass}>
                    {modelTypes.map((m) => <option key={m} value={m}>{m}</option>)}
                  </select>
                </div>
                <div className={formGroupClass}>
                  <label className={labelClass}>Data Range *</label>
                  <select value={predictionData.dataRange} onChange={(e) => setPredictionData({ ...predictionData, dataRange: e.target.value })} className={inputClass}>
                    {dataRanges.map((d) => <option key={d} value={d}>{d}</option>)}
                  </select>
                </div>
                <div className={formGroupClass}>
                  <label className={labelClass}>Confidence Threshold (%)</label>
                  <input type="number" placeholder="e.g. 80" value={predictionData.confidenceThreshold}
                    onChange={(e) => setPredictionData({ ...predictionData, confidenceThreshold: e.target.value })} className={inputClass} />
                </div>
                <div className={`${formGroupClass} md:col-span-2 lg:col-span-3`}>
                  <label className={labelClass}>Features (multi-select)</label>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {featureOptions.map((f) => (
                      <button key={f} type="button" onClick={() => toggleFeature(f)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                          predictionData.features.includes(f) ? 'gradient-birla text-white' : 'border border-border text-muted-foreground hover:bg-muted'
                        }`}>
                        {f}
                      </button>
                    ))}
                  </div>
                </div>
                <div className={formGroupClass}>
                  <label className="flex items-center gap-2 text-sm text-foreground">
                    <input type="checkbox" checked={predictionData.retrain}
                      onChange={(e) => setPredictionData({ ...predictionData, retrain: e.target.checked })}
                      className="rounded border-input" />
                    Auto-retrain model
                  </label>
                </div>
              </div>
              <div className="flex items-center gap-3 mt-6 pt-4 border-t border-border">
                <button onClick={() => handleFormSubmit('Prediction Config', predictionData)}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl gradient-birla text-white text-sm font-medium hover:opacity-90 transition-opacity">
                  <Save className="w-4 h-4" />Save Config
                </button>
                <button onClick={() => setPredictionData({ modelType: 'Student Performance', dataRange: '6 months', confidenceThreshold: '80', features: ['Attendance', 'Marks'], retrain: false })}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-border text-sm font-medium hover:bg-muted transition-colors">
                  <RotateCcw className="w-4 h-4" />Reset
                </button>
              </div>
            </motion.div>
          )}

          {/* 2. Custom Analysis Form */}
          {activeForm === 'customAnalysis' && (
            <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-6">
              <h3 className="text-base font-semibold text-foreground flex items-center gap-2 mb-6">
                <GitBranch className="w-5 h-5 text-cyan-500" />Custom Analysis Form
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className={formGroupClass}>
                  <label className={labelClass}>Analysis Name *</label>
                  <input type="text" placeholder="e.g. Term-wise Performance" value={customAnalysisData.analysisName}
                    onChange={(e) => setCustomAnalysisData({ ...customAnalysisData, analysisName: e.target.value })} className={inputClass} />
                </div>
                <div className={formGroupClass}>
                  <label className={labelClass}>Analysis Type *</label>
                  <select value={customAnalysisData.analysisType} onChange={(e) => setCustomAnalysisData({ ...customAnalysisData, analysisType: e.target.value })} className={inputClass}>
                    {analysisTypes.map((a) => <option key={a} value={a}>{a}</option>)}
                  </select>
                </div>
                <div className={formGroupClass}>
                  <label className={labelClass}>Data Source *</label>
                  <select value={customAnalysisData.dataSource} onChange={(e) => setCustomAnalysisData({ ...customAnalysisData, dataSource: e.target.value })} className={inputClass}>
                    {dataSources.map((d) => <option key={d} value={d}>{d}</option>)}
                  </select>
                </div>
                <div className={formGroupClass}>
                  <label className={labelClass}>Date Range</label>
                  <input type="text" placeholder="e.g. Jan 2025 - Mar 2025" value={customAnalysisData.dateRange}
                    onChange={(e) => setCustomAnalysisData({ ...customAnalysisData, dateRange: e.target.value })} className={inputClass} />
                </div>
                <div className={formGroupClass}>
                  <label className={labelClass}>Filters</label>
                  <input type="text" placeholder="e.g. Class=X, Section=A" value={customAnalysisData.filters}
                    onChange={(e) => setCustomAnalysisData({ ...customAnalysisData, filters: e.target.value })} className={inputClass} />
                </div>
                <div className={formGroupClass}>
                  <label className={labelClass}>Output Format *</label>
                  <select value={customAnalysisData.outputFormat} onChange={(e) => setCustomAnalysisData({ ...customAnalysisData, outputFormat: e.target.value })} className={inputClass}>
                    {outputFormats.map((o) => <option key={o} value={o}>{o}</option>)}
                  </select>
                </div>
              </div>
              <div className="flex items-center gap-3 mt-6 pt-4 border-t border-border">
                <button onClick={() => handleFormSubmit('Custom Analysis', customAnalysisData)}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl gradient-birla text-white text-sm font-medium hover:opacity-90 transition-opacity">
                  <Save className="w-4 h-4" />Run Analysis
                </button>
                <button onClick={() => setCustomAnalysisData({ analysisName: '', analysisType: 'Trend', dataSource: 'SIS', dateRange: '', filters: '', outputFormat: 'Chart' })}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-border text-sm font-medium hover:bg-muted transition-colors">
                  <RotateCcw className="w-4 h-4" />Reset
                </button>
              </div>
            </motion.div>
          )}

          {/* 3. KPI Target Form */}
          {activeForm === 'kpiTarget' && (
            <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-6">
              <h3 className="text-base font-semibold text-foreground flex items-center gap-2 mb-6">
                <Target className="w-5 h-5 text-amber-500" />KPI Target Form
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className={formGroupClass}>
                  <label className={labelClass}>KPI Name *</label>
                  <input type="text" placeholder="e.g. Student Retention Rate" value={kpiTargetData.kpiName}
                    onChange={(e) => setKpiTargetData({ ...kpiTargetData, kpiName: e.target.value })} className={inputClass} />
                </div>
                <div className={formGroupClass}>
                  <label className={labelClass}>Current Year Value *</label>
                  <input type="text" placeholder="e.g. 94" value={kpiTargetData.currentYear}
                    onChange={(e) => setKpiTargetData({ ...kpiTargetData, currentYear: e.target.value })} className={inputClass} />
                </div>
                <div className={formGroupClass}>
                  <label className={labelClass}>Target Value *</label>
                  <input type="text" placeholder="e.g. 95" value={kpiTargetData.targetValue}
                    onChange={(e) => setKpiTargetData({ ...kpiTargetData, targetValue: e.target.value })} className={inputClass} />
                </div>
                <div className={formGroupClass}>
                  <label className={labelClass}>Previous Year Value</label>
                  <input type="text" placeholder="e.g. 92" value={kpiTargetData.previousYear}
                    onChange={(e) => setKpiTargetData({ ...kpiTargetData, previousYear: e.target.value })} className={inputClass} />
                </div>
                <div className={formGroupClass}>
                  <label className={labelClass}>Category *</label>
                  <select value={kpiTargetData.category} onChange={(e) => setKpiTargetData({ ...kpiTargetData, category: e.target.value })} className={inputClass}>
                    {kpiCategories.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div className={formGroupClass}>
                  <label className={labelClass}>Unit *</label>
                  <select value={kpiTargetData.unit} onChange={(e) => setKpiTargetData({ ...kpiTargetData, unit: e.target.value })} className={inputClass}>
                    {kpiUnits.map((u) => <option key={u} value={u}>{u}</option>)}
                  </select>
                </div>
              </div>
              <div className="flex items-center gap-3 mt-6 pt-4 border-t border-border">
                <button onClick={() => handleFormSubmit('KPI Target', kpiTargetData)}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl gradient-birla text-white text-sm font-medium hover:opacity-90 transition-opacity">
                  <Save className="w-4 h-4" />Save KPI Target
                </button>
                <button onClick={() => setKpiTargetData({ kpiName: '', currentYear: '', targetValue: '', previousYear: '', category: 'Academic', unit: 'Percentage' })}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-border text-sm font-medium hover:bg-muted transition-colors">
                  <RotateCcw className="w-4 h-4" />Reset
                </button>
              </div>
            </motion.div>
          )}

          {/* 4. Report Schedule Form */}
          {activeForm === 'reportSchedule' && (
            <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-6">
              <h3 className="text-base font-semibold text-foreground flex items-center gap-2 mb-6">
                <Calendar className="w-5 h-5 text-blue-500" />Report Schedule Form
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className={formGroupClass}>
                  <label className={labelClass}>Report Name *</label>
                  <input type="text" placeholder="e.g. Monthly Attendance Report" value={reportScheduleData.reportName}
                    onChange={(e) => setReportScheduleData({ ...reportScheduleData, reportName: e.target.value })} className={inputClass} />
                </div>
                <div className={formGroupClass}>
                  <label className={labelClass}>Report Type</label>
                  <input type="text" placeholder="e.g. Attendance, Finance" value={reportScheduleData.reportType}
                    onChange={(e) => setReportScheduleData({ ...reportScheduleData, reportType: e.target.value })} className={inputClass} />
                </div>
                <div className={formGroupClass}>
                  <label className={labelClass}>Frequency *</label>
                  <select value={reportScheduleData.frequency} onChange={(e) => setReportScheduleData({ ...reportScheduleData, frequency: e.target.value })} className={inputClass}>
                    {reportFrequencies.map((f) => <option key={f} value={f}>{f}</option>)}
                  </select>
                </div>
                <div className={`${formGroupClass} md:col-span-2`}>
                  <label className={labelClass}>Recipients (comma separated emails)</label>
                  <input type="text" placeholder="admin@birlaopenminds.edu, principal@birlaopenminds.edu" value={reportScheduleData.recipients}
                    onChange={(e) => setReportScheduleData({ ...reportScheduleData, recipients: e.target.value })} className={inputClass} />
                </div>
                <div className={formGroupClass}>
                  <label className={labelClass}>Format *</label>
                  <select value={reportScheduleData.format} onChange={(e) => setReportScheduleData({ ...reportScheduleData, format: e.target.value })} className={inputClass}>
                    {reportFormats.map((f) => <option key={f} value={f}>{f}</option>)}
                  </select>
                </div>
              </div>
              <div className="flex items-center gap-3 mt-6 pt-4 border-t border-border">
                <button onClick={() => handleFormSubmit('Report Schedule', reportScheduleData)}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl gradient-birla text-white text-sm font-medium hover:opacity-90 transition-opacity">
                  <Save className="w-4 h-4" />Schedule Report
                </button>
                <button onClick={() => setReportScheduleData({ reportName: '', reportType: '', frequency: 'Monthly', recipients: '', format: 'PDF' })}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-border text-sm font-medium hover:bg-muted transition-colors">
                  <RotateCcw className="w-4 h-4" />Reset
                </button>
              </div>
            </motion.div>
          )}

          {/* 5. AI Insight Feedback Form */}
          {activeForm === 'insightFeedback' && (
            <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-6">
              <h3 className="text-base font-semibold text-foreground flex items-center gap-2 mb-6">
                <Star className="w-5 h-5 text-amber-500" />AI Insight Feedback Form
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className={formGroupClass}>
                  <label className={labelClass}>Insight ID *</label>
                  <input type="text" placeholder="e.g. INS-2025-0042" value={insightFeedbackData.insightId}
                    onChange={(e) => setInsightFeedbackData({ ...insightFeedbackData, insightId: e.target.value })} className={inputClass} />
                </div>
                <div className={formGroupClass}>
                  <label className={labelClass}>Insight Type *</label>
                  <select value={insightFeedbackData.insightType} onChange={(e) => setInsightFeedbackData({ ...insightFeedbackData, insightType: e.target.value })} className={inputClass}>
                    {insightTypes.map((t) => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
                <div className={formGroupClass}>
                  <label className={labelClass}>Was Helpful? *</label>
                  <select value={insightFeedbackData.wasHelpful} onChange={(e) => setInsightFeedbackData({ ...insightFeedbackData, wasHelpful: e.target.value })} className={inputClass}>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </div>
                <div className={formGroupClass}>
                  <label className={labelClass}>Accuracy Rating (1-5) *</label>
                  <select value={insightFeedbackData.accuracy} onChange={(e) => setInsightFeedbackData({ ...insightFeedbackData, accuracy: e.target.value })} className={inputClass}>
                    {ratingOptions.map((r) => <option key={r} value={r}>{r}</option>)}
                  </select>
                </div>
                <div className={`${formGroupClass} md:col-span-2`}>
                  <label className={labelClass}>User Comments</label>
                  <textarea placeholder="Share your feedback on this insight..." value={insightFeedbackData.userComments}
                    onChange={(e) => setInsightFeedbackData({ ...insightFeedbackData, userComments: e.target.value })} className={inputClass} rows={3} />
                </div>
              </div>
              <div className="flex items-center gap-3 mt-6 pt-4 border-t border-border">
                <button onClick={() => handleFormSubmit('AI Insight Feedback', insightFeedbackData)}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl gradient-birla text-white text-sm font-medium hover:opacity-90 transition-opacity">
                  <Save className="w-4 h-4" />Submit Feedback
                </button>
                <button onClick={() => setInsightFeedbackData({ insightId: '', insightType: 'Prediction', wasHelpful: 'Yes', userComments: '', accuracy: '4' })}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-border text-sm font-medium hover:bg-muted transition-colors">
                  <RotateCcw className="w-4 h-4" />Reset
                </button>
              </div>
            </motion.div>
          )}
        </motion.div>
      )}

      {/* ═══════════════ REPORTS TAB ═══════════════ */}
      {activeTab === 'reports' && (
        <motion.div variants={itemVariants} className="space-y-6">
          <div className="flex flex-wrap gap-2">
            {reportOptions.map((r) => {
              const Icon = r.icon
              return (
                <button key={r.key} onClick={() => setActiveReport(r.key)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                    activeReport === r.key ? 'gradient-birla-gold text-birla-blue shadow-md' : 'border border-border text-muted-foreground hover:bg-muted hover:text-foreground'
                  }`}>
                  <Icon className="w-3.5 h-3.5" />{r.label}
                </button>
              )
            })}
          </div>

          {/* 1. Prediction Accuracy Report */}
          {activeReport === 'predictionAccuracy' && (
            <motion.div variants={itemVariants} className="space-y-4">
              <div className="rounded-2xl border border-border bg-card p-5">
                <h3 className="text-sm font-semibold text-foreground mb-4">Model-wise Accuracy</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left py-2 px-3 font-medium text-muted-foreground">Model</th>
                        <th className="text-left py-2 px-3 font-medium text-muted-foreground">Sep</th>
                        <th className="text-left py-2 px-3 font-medium text-muted-foreground">Oct</th>
                        <th className="text-left py-2 px-3 font-medium text-muted-foreground">Nov</th>
                        <th className="text-left py-2 px-3 font-medium text-muted-foreground">Dec</th>
                        <th className="text-left py-2 px-3 font-medium text-muted-foreground">Jan</th>
                        <th className="text-left py-2 px-3 font-medium text-muted-foreground">Feb</th>
                        <th className="text-left py-2 px-3 font-medium text-muted-foreground">Mar</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { model: 'Student Performance', data: predictionAccuracy.map(p => p.performance) },
                        { model: 'Attendance Risk', data: predictionAccuracy.map(p => p.attendance) },
                        { model: 'Fee Default', data: predictionAccuracy.map(p => p.feeDefault) },
                        { model: 'Teacher Attrition', data: predictionAccuracy.map(p => p.teacherAttrition) },
                      ].map((row, i) => (
                        <tr key={i} className="border-b border-border/50">
                          <td className="py-2 px-3 font-medium">{row.model}</td>
                          {row.data.map((val, j) => (
                            <td key={j} className={`py-2 px-3 ${val >= 90 ? 'text-emerald-600 dark:text-emerald-400' : val >= 80 ? 'text-amber-600 dark:text-amber-400' : 'text-red-600 dark:text-red-400'}`}>{val}%</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="rounded-2xl border border-border bg-card p-5">
                <h3 className="text-sm font-semibold text-foreground mb-4">Accuracy Trend</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={predictionAccuracy}>
                      <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'} />
                      <XAxis dataKey="month" tick={{ fontSize: 9 }} stroke={darkMode ? '#64748b' : '#94a3b8'} />
                      <YAxis domain={[70, 100]} tick={{ fontSize: 9 }} stroke={darkMode ? '#64748b' : '#94a3b8'} />
                      <Tooltip contentStyle={tooltipStyle} />
                      <Legend iconType="circle" wrapperStyle={{ fontSize: '9px' }} />
                      <Line type="monotone" dataKey="performance" stroke="#8B5CF6" strokeWidth={2} dot={{ r: 3 }} name="Performance" />
                      <Line type="monotone" dataKey="attendance" stroke="#22D3EE" strokeWidth={2} dot={{ r: 3 }} name="Attendance" />
                      <Line type="monotone" dataKey="feeDefault" stroke="#C8A45C" strokeWidth={2} dot={{ r: 3 }} name="Fee Default" />
                      <Line type="monotone" dataKey="teacherAttrition" stroke="#EF4444" strokeWidth={2} dot={{ r: 3 }} name="Teacher Attrition" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </motion.div>
          )}

          {/* 2. Risk Assessment Report */}
          {activeReport === 'riskAssessment' && (
            <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-5">
              <h3 className="text-sm font-semibold text-foreground mb-4">Student Risk Assessment (with UDISE+ IDs)</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-2 px-3 font-medium text-muted-foreground">Student</th>
                      <th className="text-left py-2 px-3 font-medium text-muted-foreground">BSP ID</th>
                      <th className="text-left py-2 px-3 font-medium text-muted-foreground">PEN No</th>
                      <th className="text-left py-2 px-3 font-medium text-muted-foreground">Uppar ID</th>
                      <th className="text-left py-2 px-3 font-medium text-muted-foreground">Class</th>
                      <th className="text-left py-2 px-3 font-medium text-muted-foreground">Risk Type</th>
                      <th className="text-left py-2 px-3 font-medium text-muted-foreground">Risk Score</th>
                      <th className="text-left py-2 px-3 font-medium text-muted-foreground">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {riskStudents.map((s, i) => (
                      <tr key={i} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                        <td className="py-2 px-3 font-medium">{s.name}</td>
                        <td className="py-2 px-3 text-birla-cyan">{s.bspId}</td>
                        <td className="py-2 px-3 text-birla-gold">{s.penNo}</td>
                        <td className="py-2 px-3 text-purple-500">{s.upparId}</td>
                        <td className="py-2 px-3">{s.class}</td>
                        <td className="py-2 px-3">{s.riskType}</td>
                        <td className="py-2 px-3">
                          <div className="flex items-center gap-2">
                            <div className="w-12 h-1.5 bg-muted rounded-full overflow-hidden">
                              <div className={`h-full rounded-full ${s.riskScore >= 70 ? 'bg-red-500' : s.riskScore >= 50 ? 'bg-amber-500' : 'bg-emerald-500'}`} style={{ width: `${s.riskScore}%` }} />
                            </div>
                            <span>{s.riskScore}</span>
                          </div>
                        </td>
                        <td className="py-2 px-3">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${
                            s.status === 'High' ? 'bg-red-500/10 text-red-600 dark:text-red-400' :
                            s.status === 'Medium' ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400' :
                            'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                          }`}>{s.status}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}

          {/* 3. Academic Trend Report */}
          {activeReport === 'academicTrend' && (
            <motion.div variants={itemVariants} className="space-y-4">
              <div className="rounded-2xl border border-border bg-card p-5">
                <h3 className="text-sm font-semibold text-foreground mb-4">Multi-Year Academic Trend</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left py-2 px-3 font-medium text-muted-foreground">Year</th>
                        <th className="text-left py-2 px-3 font-medium text-muted-foreground">Avg Score</th>
                        <th className="text-left py-2 px-3 font-medium text-muted-foreground">Pass Rate %</th>
                        <th className="text-left py-2 px-3 font-medium text-muted-foreground">Distinction %</th>
                        <th className="text-left py-2 px-3 font-medium text-muted-foreground">Attendance %</th>
                      </tr>
                    </thead>
                    <tbody>
                      {academicTrend.map((a, i) => (
                        <tr key={i} className="border-b border-border/50">
                          <td className="py-2 px-3 font-medium">{a.year}</td>
                          <td className="py-2 px-3">{a.avgScore}</td>
                          <td className="py-2 px-3 text-emerald-600 dark:text-emerald-400">{a.passRate}%</td>
                          <td className="py-2 px-3 text-birla-gold">{a.distinction}%</td>
                          <td className="py-2 px-3">{a.attendance}%</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="rounded-2xl border border-border bg-card p-5">
                <h3 className="text-sm font-semibold text-foreground mb-4">Academic Trend Chart</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={academicTrend}>
                      <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'} />
                      <XAxis dataKey="year" tick={{ fontSize: 9 }} stroke={darkMode ? '#64748b' : '#94a3b8'} />
                      <YAxis domain={[60, 100]} tick={{ fontSize: 9 }} stroke={darkMode ? '#64748b' : '#94a3b8'} />
                      <Tooltip contentStyle={tooltipStyle} />
                      <Legend iconType="circle" wrapperStyle={{ fontSize: '10px' }} />
                      <Area type="monotone" dataKey="avgScore" fill="#22D3EE" fillOpacity={0.15} stroke="#22D3EE" name="Avg Score" />
                      <Area type="monotone" dataKey="passRate" fill="#10B981" fillOpacity={0.15} stroke="#10B981" name="Pass Rate" />
                      <Area type="monotone" dataKey="distinction" fill="#C8A45C" fillOpacity={0.15} stroke="#C8A45C" name="Distinction" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </motion.div>
          )}

          {/* 4. Teacher Effectiveness Report */}
          {activeReport === 'teacherEffectiveness' && (
            <motion.div variants={itemVariants} className="space-y-4">
              <div className="rounded-2xl border border-border bg-card p-5">
                <h3 className="text-sm font-semibold text-foreground mb-4">Teacher Ratings</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left py-2 px-3 font-medium text-muted-foreground">Teacher</th>
                        <th className="text-left py-2 px-3 font-medium text-muted-foreground">Subject</th>
                        <th className="text-left py-2 px-3 font-medium text-muted-foreground">Overall</th>
                      </tr>
                    </thead>
                    <tbody>
                      {teacherEffectiveness.map((t, i) => (
                        <tr key={i} className="border-b border-border/50">
                          <td className="py-2 px-3 font-medium">{t.name}</td>
                          <td className="py-2 px-3">{t.subject}</td>
                          <td className="py-2 px-3">
                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${t.overall >= 85 ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' : 'bg-amber-500/10 text-amber-600 dark:text-amber-400'}`}>{t.overall}</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="rounded-2xl border border-border bg-card p-5">
                <h3 className="text-sm font-semibold text-foreground mb-4">Effectiveness Radar</h3>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart data={[
                      { dimension: 'Pedagogy', ...teacherEffectiveness.reduce((acc, t, i) => ({ ...acc, [`t${i}`]: t.pedagogy }), {}) },
                      { dimension: 'Engagement', ...teacherEffectiveness.reduce((acc, t, i) => ({ ...acc, [`t${i}`]: t.engagement }), {}) },
                      { dimension: 'Assessment', ...teacherEffectiveness.reduce((acc, t, i) => ({ ...acc, [`t${i}`]: t.assessment }), {}) },
                      { dimension: 'Communication', ...teacherEffectiveness.reduce((acc, t, i) => ({ ...acc, [`t${i}`]: t.communication }), {}) },
                      { dimension: 'Innovation', ...teacherEffectiveness.reduce((acc, t, i) => ({ ...acc, [`t${i}`]: t.innovation }), {}) },
                    ]}>
                      <PolarGrid stroke={darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'} />
                      <PolarAngleAxis dataKey="dimension" tick={{ fontSize: 10, fill: darkMode ? '#94a3b8' : '#64748b' }} />
                      <PolarRadiusAxis angle={30} domain={[60, 100]} tick={{ fontSize: 8 }} />
                      {teacherEffectiveness.map((t, i) => (
                        <Radar key={i} name={t.name.split(' ').pop()} dataKey={`t${i}`} stroke={['#8B5CF6', '#22D3EE', '#C8A45C', '#EF4444', '#10B981'][i]} fill={['#8B5CF6', '#22D3EE', '#C8A45C', '#EF4444', '#10B981'][i]} fillOpacity={0.08} />
                      ))}
                      <Tooltip contentStyle={tooltipStyle} />
                      <Legend iconType="circle" wrapperStyle={{ fontSize: '9px' }} />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </motion.div>
          )}

          {/* 5. Executive KPI Report */}
          {activeReport === 'executiveKPI' && (
            <motion.div variants={itemVariants} className="space-y-4">
              <div className="rounded-2xl border border-border bg-card p-5">
                <h3 className="text-sm font-semibold text-foreground mb-4">KPI Dashboard - Targets vs Actuals</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {kpiData.map((kpi, i) => {
                    const pct = Math.min((kpi.current / kpi.target) * 100, 120)
                    return (
                      <div key={i} className="p-4 rounded-xl border border-border">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="text-sm font-medium">{kpi.name}</h4>
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-muted">{kpi.category}</span>
                        </div>
                        <div className="flex items-end gap-4 mb-2">
                          <div>
                            <p className="text-[10px] text-muted-foreground">Current</p>
                            <p className="text-xl font-bold text-foreground">{kpi.current}{kpi.unit === 'Percentage' ? '%' : ''}</p>
                          </div>
                          <div>
                            <p className="text-[10px] text-muted-foreground">Target</p>
                            <p className="text-sm font-medium text-birla-gold">{kpi.target}{kpi.unit === 'Percentage' ? '%' : ''}</p>
                          </div>
                          <div>
                            <p className="text-[10px] text-muted-foreground">Previous</p>
                            <p className="text-sm text-muted-foreground">{kpi.previous}{kpi.unit === 'Percentage' ? '%' : ''}</p>
                          </div>
                        </div>
                        <div className="h-2.5 bg-muted rounded-full overflow-hidden">
                          <div className={`h-full rounded-full transition-all ${kpi.current >= kpi.target ? 'bg-emerald-500' : kpi.current >= kpi.target * 0.8 ? 'bg-amber-500' : 'bg-red-500'}`}
                            style={{ width: `${Math.min(pct, 100)}%` }} />
                        </div>
                        <p className="text-[10px] text-muted-foreground mt-1">{pct.toFixed(0)}% of target</p>
                      </div>
                    )
                  })}
                </div>
              </div>
            </motion.div>
          )}

          {/* 6. Financial Forecast Report */}
          {activeReport === 'financialForecast' && (
            <motion.div variants={itemVariants} className="space-y-4">
              <div className="rounded-2xl border border-border bg-card p-5">
                <h3 className="text-sm font-semibold text-foreground mb-4">Revenue Prediction</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left py-2 px-3 font-medium text-muted-foreground">Month</th>
                        <th className="text-left py-2 px-3 font-medium text-muted-foreground">Actual (₹)</th>
                        <th className="text-left py-2 px-3 font-medium text-muted-foreground">Predicted (₹)</th>
                        <th className="text-left py-2 px-3 font-medium text-muted-foreground">Lower Bound (₹)</th>
                        <th className="text-left py-2 px-3 font-medium text-muted-foreground">Upper Bound (₹)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {financialForecast.map((f, i) => (
                        <tr key={i} className="border-b border-border/50">
                          <td className="py-2 px-3 font-medium">{f.month}</td>
                          <td className="py-2 px-3">{f.actual ? `₹${(f.actual / 100000).toFixed(1)}L` : '-'}</td>
                          <td className="py-2 px-3 text-birla-cyan">₹{(f.predicted / 100000).toFixed(1)}L</td>
                          <td className="py-2 px-3 text-muted-foreground">₹{(f.lower / 100000).toFixed(1)}L</td>
                          <td className="py-2 px-3 text-muted-foreground">₹{(f.upper / 100000).toFixed(1)}L</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="rounded-2xl border border-border bg-card p-5">
                <h3 className="text-sm font-semibold text-foreground mb-4">Revenue Forecast Chart</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={financialForecast}>
                      <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'} />
                      <XAxis dataKey="month" tick={{ fontSize: 9 }} stroke={darkMode ? '#64748b' : '#94a3b8'} />
                      <YAxis tick={{ fontSize: 8, formatter: (v) => `₹${(v / 100000).toFixed(0)}L` }} stroke={darkMode ? '#64748b' : '#94a3b8'} />
                      <Tooltip contentStyle={tooltipStyle} formatter={(v) => v ? `₹${(v / 100000).toFixed(1)}L` : 'N/A'} />
                      <Area type="monotone" dataKey="upper" stroke="transparent" fill="#C8A45C" fillOpacity={0.1} name="Upper Bound" />
                      <Area type="monotone" dataKey="lower" stroke="transparent" fill="#C8A45C" fillOpacity={0.05} name="Lower Bound" />
                      <Line type="monotone" dataKey="actual" stroke="#0A1628" strokeWidth={2} dot={{ r: 3 }} name="Actual" connectNulls={false} />
                      <Line type="monotone" dataKey="predicted" stroke="#22D3EE" strokeWidth={2} strokeDasharray="5 5" dot={{ r: 3 }} name="Predicted" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>
      )}
    </motion.div>
  )
}
