'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  MessageSquare, Users, Bell, Mail, Smartphone, Plus, Download,
  ArrowUpRight, TrendingUp, BarChart3, FileText, Calendar,
  CheckCircle2, AlertTriangle, X, Save, RotateCcw, ClipboardList,
  Send, Radio, Megaphone, Bot, Globe, Languages, Clock, Eye,
  PieChart as PieChartIcon, MessageCircle, Zap, Inbox
} from 'lucide-react'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Legend, PieChart, Pie, Cell, AreaChart,
  Area, LineChart, Line
} from 'recharts'
import useAppStore from '@/store/useAppStore'

// ─── Mock Data ────────────────────────────────────────────────────
const topStats = [
  { label: 'Notifications Sent', value: '2,456', change: 'This month', icon: Bell, gradient: 'from-blue-900 to-blue-700', glow: 'shadow-blue-800/20' },
  { label: 'SMS Delivered', value: '8,320', change: '94% delivery', icon: Smartphone, gradient: 'from-emerald-900 to-emerald-600', glow: 'shadow-emerald-800/20' },
  { label: 'Emails Sent', value: '5,670', change: '97% open rate', icon: Mail, gradient: 'from-amber-900 to-amber-600', glow: 'shadow-amber-800/20' },
  { label: 'Chatbot Queries', value: '1,230', change: 'Resolved: 89%', icon: Bot, gradient: 'from-purple-900 to-purple-600', glow: 'shadow-purple-800/20' },
]

const notificationDelivery = [
  { channel: 'Push', sent: 2456, delivered: 2340, failed: 116, rate: 95.3 },
  { channel: 'SMS', sent: 8320, delivered: 7820, failed: 500, rate: 94.0 },
  { channel: 'Email', sent: 5670, delivered: 5590, failed: 80, rate: 98.6 },
  { channel: 'WhatsApp', sent: 3200, delivered: 3100, failed: 100, rate: 96.9 },
]

const smsEmailCost = [
  { month: 'Sep', smsCost: 12400, emailCost: 3200, totalCost: 15600 },
  { month: 'Oct', smsCost: 13800, emailCost: 3500, totalCost: 17300 },
  { month: 'Nov', smsCost: 11200, emailCost: 2800, totalCost: 14000 },
  { month: 'Dec', smsCost: 15600, emailCost: 4100, totalCost: 19700 },
  { month: 'Jan', smsCost: 14200, emailCost: 3800, totalCost: 18000 },
  { month: 'Feb', smsCost: 13100, emailCost: 3600, totalCost: 16700 },
  { month: 'Mar', smsCost: 14800, emailCost: 3900, totalCost: 18700 },
]

const circularReadership = [
  { circular: 'Annual Day Notice', read: 890, unread: 357, total: 1247 },
  { circular: 'Fee Payment Reminder', read: 1050, unread: 197, total: 1247 },
  { circular: 'Sports Day Schedule', read: 780, unread: 467, total: 1247 },
  { circular: 'Exam Timetable', read: 1120, unread: 127, total: 1247 },
  { circular: 'Parent-Teacher Meet', read: 950, unread: 297, total: 1247 },
]

const chatbotUsage = [
  { day: 'Mon', conversations: 45, resolved: 40, escalated: 5 },
  { day: 'Tue', conversations: 52, resolved: 47, escalated: 5 },
  { day: 'Wed', conversations: 48, resolved: 42, escalated: 6 },
  { day: 'Thu', conversations: 61, resolved: 55, escalated: 6 },
  { day: 'Fri', conversations: 55, resolved: 50, escalated: 5 },
  { day: 'Sat', conversations: 30, resolved: 27, escalated: 3 },
  { day: 'Sun', conversations: 18, resolved: 16, escalated: 2 },
]

const languageCoverage = [
  { language: 'English', notifications: 2456, circulars: 45, templates: 120, coverage: 100 },
  { language: 'Hindi', notifications: 1800, circulars: 38, templates: 95, coverage: 78 },
  { language: 'Bengali', notifications: 1200, circulars: 30, templates: 70, coverage: 55 },
  { language: 'Marathi', notifications: 800, circulars: 20, templates: 45, coverage: 35 },
  { language: 'Tamil', notifications: 500, circulars: 12, templates: 30, coverage: 22 },
]

const notificationsList = [
  { title: 'Fee Payment Due', audience: 'Parents', channel: 'SMS+Email', date: '2025-03-10', status: 'Delivered', priority: 'High' },
  { title: 'Annual Day Invitation', audience: 'All', channel: 'Push+Email', date: '2025-03-09', status: 'Delivered', priority: 'Normal' },
  { title: 'Exam Schedule Update', audience: 'Class X-XII', channel: 'Push', date: '2025-03-08', status: 'Delivered', priority: 'Urgent' },
  { title: 'Sports Day Postponed', audience: 'Students', channel: 'Push+SMS', date: '2025-03-07', status: 'Delivered', priority: 'High' },
]

const circularsList = [
  { title: 'Annual Day Celebration', circularNo: 'BOM/2025/CIR/001', category: 'Event', date: '2025-03-10', priority: 'High', readRate: '71%' },
  { title: 'Fee Structure 2025-26', circularNo: 'BOM/2025/CIR/002', category: 'Finance', date: '2025-03-08', priority: 'Normal', readRate: '84%' },
  { title: 'Summer Camp Registration', circularNo: 'BOM/2025/CIR/003', category: 'Academic', date: '2025-03-05', priority: 'Normal', readRate: '63%' },
]

const targetAudiences = ['All', 'Class', 'Staff', 'Parents', 'Students']
const priorities = ['Normal', 'High', 'Urgent']
const channels = ['SMS', 'Email', 'Both']
const recipientTypes = ['Individual', 'Class', 'All']
const circularCategories = ['Academic', 'Event', 'Finance', 'Transport', 'Health', 'General']
const chatbotCategories = ['Admission', 'Fee', 'Attendance', 'Transport', 'General']
const contentTypes = ['Notification', 'Circular', 'Template']
const languages = ['English', 'Hindi', 'Bengali', 'Marathi', 'Tamil', 'Telugu', 'Kannada']
const classes = ['Nursery', 'LKG', 'UKG', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII']
const templates = ['Fee Reminder', 'Attendance Alert', 'Exam Notice', 'Event Invitation', 'Holiday Notice', 'General']

// ─── Animation Variants ──────────────────────────────────────────
const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.06 } },
}
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
}

export default function CommunicationModule() {
  const { darkMode } = useAppStore()
  const [activeTab, setActiveTab] = useState('overview')
  const [activeForm, setActiveForm] = useState('pushNotification')
  const [activeReport, setActiveReport] = useState('notificationDelivery')

  // ─── Form States ────────────────────────────────────────
  const [pushNotifData, setPushNotifData] = useState({
    title: '', message: '', targetAudience: 'All', priority: 'Normal', scheduleDate: '', scheduleTime: '', actionUrl: ''
  })
  const [smsEmailData, setSmsEmailData] = useState({
    recipientType: 'Individual', recipientSelect: '', subject: '', message: '', channel: 'SMS', templateSelect: '', scheduleDate: ''
  })
  const [circularData, setCircularData] = useState({
    title: '', circularNo: '', category: 'Academic', targetAudience: 'All', content: '', attachmentName: '', issueDate: '', expiryDate: '', priority: 'Normal'
  })
  const [chatbotData, setChatbotData] = useState({
    intentName: '', trainingPhrases: '', responseText: '', category: 'Admission'
  })
  const [translationData, setTranslationData] = useState({
    sourceText: '', sourceLanguage: 'English', targetLanguage: 'Hindi', translatedText: '', verified: false, contentType: 'Notification'
  })

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'smsEmail', label: 'SMS/Email', icon: Mail },
    { id: 'circulars', label: 'Circulars', icon: FileText },
    { id: 'chatbot', label: 'Chatbot', icon: Bot },
    { id: 'forms', label: 'Forms', icon: ClipboardList },
    { id: 'reports', label: 'Reports', icon: TrendingUp },
  ]

  const formOptions = [
    { key: 'pushNotification', label: 'Push Notification', icon: Bell },
    { key: 'smsEmail', label: 'SMS/Email', icon: Mail },
    { key: 'circular', label: 'Circular', icon: FileText },
    { key: 'chatbotTraining', label: 'Chatbot Training', icon: Bot },
    { key: 'translation', label: 'Multi-Language Translation', icon: Globe },
  ]

  const reportOptions = [
    { key: 'notificationDelivery', label: 'Notification Delivery', icon: Bell },
    { key: 'smsEmailCost', label: 'SMS/Email Cost', icon: Mail },
    { key: 'circularReadership', label: 'Circular Readership', icon: FileText },
    { key: 'chatbotUsage', label: 'Chatbot Usage', icon: Bot },
    { key: 'languageCoverage', label: 'Language Coverage', icon: Globe },
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
                <Bell className="w-4 h-4 text-birla-cyan" />Notification Delivery by Channel
              </h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={notificationDelivery}>
                    <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'} />
                    <XAxis dataKey="channel" tick={{ fontSize: 9 }} stroke={darkMode ? '#64748b' : '#94a3b8'} />
                    <YAxis tick={{ fontSize: 9 }} stroke={darkMode ? '#64748b' : '#94a3b8'} />
                    <Tooltip contentStyle={tooltipStyle} />
                    <Legend iconType="circle" wrapperStyle={{ fontSize: '10px' }} />
                    <Bar dataKey="delivered" fill="#22D3EE" radius={[4, 4, 0, 0]} name="Delivered" />
                    <Bar dataKey="failed" fill="#EF4444" radius={[4, 4, 0, 0]} name="Failed" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-5">
              <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
                <Bot className="w-4 h-4 text-purple-500" />Chatbot Conversations (This Week)
              </h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chatbotUsage}>
                    <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'} />
                    <XAxis dataKey="day" tick={{ fontSize: 9 }} stroke={darkMode ? '#64748b' : '#94a3b8'} />
                    <YAxis tick={{ fontSize: 9 }} stroke={darkMode ? '#64748b' : '#94a3b8'} />
                    <Tooltip contentStyle={tooltipStyle} />
                    <Legend iconType="circle" wrapperStyle={{ fontSize: '10px' }} />
                    <Line type="monotone" dataKey="conversations" stroke="#8B5CF6" strokeWidth={2} dot={{ r: 3 }} name="Total" />
                    <Line type="monotone" dataKey="resolved" stroke="#10B981" strokeWidth={2} dot={{ r: 3 }} name="Resolved" />
                    <Line type="monotone" dataKey="escalated" stroke="#EF4444" strokeWidth={2} dot={{ r: 3 }} name="Escalated" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}

      {/* ═══════════════ NOTIFICATIONS TAB ═══════════════ */}
      {activeTab === 'notifications' && (
        <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
              <Bell className="w-4 h-4 text-birla-cyan" />Recent Notifications
            </h3>
            <button onClick={() => { setActiveTab('forms'); setActiveForm('pushNotification') }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg gradient-birla text-white text-xs font-medium">
              <Plus className="w-3.5 h-3.5" />Send Notification
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2 px-3 font-medium text-muted-foreground">Title</th>
                  <th className="text-left py-2 px-3 font-medium text-muted-foreground">Audience</th>
                  <th className="text-left py-2 px-3 font-medium text-muted-foreground">Channel</th>
                  <th className="text-left py-2 px-3 font-medium text-muted-foreground">Date</th>
                  <th className="text-left py-2 px-3 font-medium text-muted-foreground">Priority</th>
                  <th className="text-left py-2 px-3 font-medium text-muted-foreground">Status</th>
                </tr>
              </thead>
              <tbody>
                {notificationsList.map((n, i) => (
                  <tr key={i} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                    <td className="py-2 px-3 font-medium">{n.title}</td>
                    <td className="py-2 px-3">{n.audience}</td>
                    <td className="py-2 px-3">{n.channel}</td>
                    <td className="py-2 px-3">{n.date}</td>
                    <td className="py-2 px-3">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${
                        n.priority === 'Urgent' ? 'bg-red-500/10 text-red-600 dark:text-red-400' :
                        n.priority === 'High' ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400' :
                        'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                      }`}>{n.priority}</span>
                    </td>
                    <td className="py-2 px-3">
                      <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[10px] font-medium">{n.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      )}

      {/* ═══════════════ SMS/EMAIL TAB ═══════════════ */}
      {activeTab === 'smsEmail' && (
        <motion.div variants={itemVariants} className="space-y-4">
          <div className="rounded-2xl border border-border bg-card p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
                <Mail className="w-4 h-4 text-birla-cyan" />SMS/Email Overview
              </h3>
              <button onClick={() => { setActiveTab('forms'); setActiveForm('smsEmail') }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg gradient-birla text-white text-xs font-medium">
                <Plus className="w-3.5 h-3.5" />Compose
              </button>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={smsEmailCost}>
                  <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'} />
                  <XAxis dataKey="month" tick={{ fontSize: 9 }} stroke={darkMode ? '#64748b' : '#94a3b8'} />
                  <YAxis tick={{ fontSize: 9 }} stroke={darkMode ? '#64748b' : '#94a3b8'} />
                  <Tooltip contentStyle={tooltipStyle} />
                  <Legend iconType="circle" wrapperStyle={{ fontSize: '10px' }} />
                  <Area type="monotone" dataKey="smsCost" fill="#22D3EE" fillOpacity={0.15} stroke="#22D3EE" name="SMS Cost (₹)" />
                  <Area type="monotone" dataKey="emailCost" fill="#C8A45C" fillOpacity={0.15} stroke="#C8A45C" name="Email Cost (₹)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </motion.div>
      )}

      {/* ═══════════════ CIRCULARS TAB ═══════════════ */}
      {activeTab === 'circulars' && (
        <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
              <FileText className="w-4 h-4 text-birla-cyan" />Circulars
            </h3>
            <button onClick={() => { setActiveTab('forms'); setActiveForm('circular') }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg gradient-birla text-white text-xs font-medium">
              <Plus className="w-3.5 h-3.5" />New Circular
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2 px-3 font-medium text-muted-foreground">Title</th>
                  <th className="text-left py-2 px-3 font-medium text-muted-foreground">Circular No</th>
                  <th className="text-left py-2 px-3 font-medium text-muted-foreground">Category</th>
                  <th className="text-left py-2 px-3 font-medium text-muted-foreground">Date</th>
                  <th className="text-left py-2 px-3 font-medium text-muted-foreground">Priority</th>
                  <th className="text-left py-2 px-3 font-medium text-muted-foreground">Read Rate</th>
                </tr>
              </thead>
              <tbody>
                {circularsList.map((c, i) => (
                  <tr key={i} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                    <td className="py-2 px-3 font-medium">{c.title}</td>
                    <td className="py-2 px-3 text-birla-cyan">{c.circularNo}</td>
                    <td className="py-2 px-3">{c.category}</td>
                    <td className="py-2 px-3">{c.date}</td>
                    <td className="py-2 px-3">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${
                        c.priority === 'High' ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400' : 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                      }`}>{c.priority}</span>
                    </td>
                    <td className="py-2 px-3">{c.readRate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      )}

      {/* ═══════════════ CHATBOT TAB ═══════════════ */}
      {activeTab === 'chatbot' && (
        <motion.div variants={itemVariants} className="space-y-4">
          <div className="rounded-2xl border border-border bg-card p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
                <Bot className="w-4 h-4 text-purple-500" />Chatbot Analytics
              </h3>
              <button onClick={() => { setActiveTab('forms'); setActiveForm('chatbotTraining') }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg gradient-birla text-white text-xs font-medium">
                <Plus className="w-3.5 h-3.5" />Train Intent
              </button>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chatbotUsage}>
                  <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'} />
                  <XAxis dataKey="day" tick={{ fontSize: 9 }} stroke={darkMode ? '#64748b' : '#94a3b8'} />
                  <YAxis tick={{ fontSize: 9 }} stroke={darkMode ? '#64748b' : '#94a3b8'} />
                  <Tooltip contentStyle={tooltipStyle} />
                  <Legend iconType="circle" wrapperStyle={{ fontSize: '10px' }} />
                  <Line type="monotone" dataKey="conversations" stroke="#8B5CF6" strokeWidth={2} dot={{ r: 3 }} name="Conversations" />
                  <Line type="monotone" dataKey="resolved" stroke="#10B981" strokeWidth={2} dot={{ r: 3 }} name="Resolved" />
                  <Line type="monotone" dataKey="escalated" stroke="#EF4444" strokeWidth={2} dot={{ r: 3 }} name="Escalated" />
                </LineChart>
              </ResponsiveContainer>
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

          {/* 1. Push Notification Form */}
          {activeForm === 'pushNotification' && (
            <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-6">
              <h3 className="text-base font-semibold text-foreground flex items-center gap-2 mb-6">
                <Bell className="w-5 h-5 text-blue-500" />Push Notification Form
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className={formGroupClass}>
                  <label className={labelClass}>Title *</label>
                  <input type="text" placeholder="Notification title" value={pushNotifData.title}
                    onChange={(e) => setPushNotifData({ ...pushNotifData, title: e.target.value })} className={inputClass} />
                </div>
                <div className={formGroupClass}>
                  <label className={labelClass}>Target Audience *</label>
                  <select value={pushNotifData.targetAudience} onChange={(e) => setPushNotifData({ ...pushNotifData, targetAudience: e.target.value })} className={inputClass}>
                    {targetAudiences.map((a) => <option key={a} value={a}>{a}</option>)}
                  </select>
                </div>
                <div className={formGroupClass}>
                  <label className={labelClass}>Priority *</label>
                  <select value={pushNotifData.priority} onChange={(e) => setPushNotifData({ ...pushNotifData, priority: e.target.value })} className={inputClass}>
                    {priorities.map((p) => <option key={p} value={p}>{p}</option>)}
                  </select>
                </div>
                <div className={`${formGroupClass} md:col-span-2 lg:col-span-3`}>
                  <label className={labelClass}>Message *</label>
                  <textarea placeholder="Write notification message..." value={pushNotifData.message}
                    onChange={(e) => setPushNotifData({ ...pushNotifData, message: e.target.value })} className={inputClass} rows={3} />
                </div>
                <div className={formGroupClass}>
                  <label className={labelClass}>Schedule Date</label>
                  <input type="date" value={pushNotifData.scheduleDate}
                    onChange={(e) => setPushNotifData({ ...pushNotifData, scheduleDate: e.target.value })} className={inputClass} />
                </div>
                <div className={formGroupClass}>
                  <label className={labelClass}>Schedule Time</label>
                  <input type="time" value={pushNotifData.scheduleTime}
                    onChange={(e) => setPushNotifData({ ...pushNotifData, scheduleTime: e.target.value })} className={inputClass} />
                </div>
                <div className={formGroupClass}>
                  <label className={labelClass}>Action URL</label>
                  <input type="text" placeholder="https://..." value={pushNotifData.actionUrl}
                    onChange={(e) => setPushNotifData({ ...pushNotifData, actionUrl: e.target.value })} className={inputClass} />
                </div>
              </div>
              <div className="flex items-center gap-3 mt-6 pt-4 border-t border-border">
                <button onClick={() => handleFormSubmit('Push Notification', pushNotifData)}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl gradient-birla text-white text-sm font-medium hover:opacity-90 transition-opacity">
                  <Send className="w-4 h-4" />Send Notification
                </button>
                <button onClick={() => setPushNotifData({ title: '', message: '', targetAudience: 'All', priority: 'Normal', scheduleDate: '', scheduleTime: '', actionUrl: '' })}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-border text-sm font-medium hover:bg-muted transition-colors">
                  <RotateCcw className="w-4 h-4" />Reset
                </button>
              </div>
            </motion.div>
          )}

          {/* 2. SMS/Email Form */}
          {activeForm === 'smsEmail' && (
            <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-6">
              <h3 className="text-base font-semibold text-foreground flex items-center gap-2 mb-6">
                <Mail className="w-5 h-5 text-emerald-500" />SMS/Email Form
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className={formGroupClass}>
                  <label className={labelClass}>Recipient Type *</label>
                  <select value={smsEmailData.recipientType} onChange={(e) => setSmsEmailData({ ...smsEmailData, recipientType: e.target.value })} className={inputClass}>
                    {recipientTypes.map((r) => <option key={r} value={r}>{r}</option>)}
                  </select>
                </div>
                <div className={formGroupClass}>
                  <label className={labelClass}>Recipient Select</label>
                  <input type="text" placeholder="Name / Class / All" value={smsEmailData.recipientSelect}
                    onChange={(e) => setSmsEmailData({ ...smsEmailData, recipientSelect: e.target.value })} className={inputClass} />
                </div>
                <div className={formGroupClass}>
                  <label className={labelClass}>Channel *</label>
                  <select value={smsEmailData.channel} onChange={(e) => setSmsEmailData({ ...smsEmailData, channel: e.target.value })} className={inputClass}>
                    {channels.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div className={formGroupClass}>
                  <label className={labelClass}>Subject</label>
                  <input type="text" placeholder="Email subject" value={smsEmailData.subject}
                    onChange={(e) => setSmsEmailData({ ...smsEmailData, subject: e.target.value })} className={inputClass} />
                </div>
                <div className={formGroupClass}>
                  <label className={labelClass}>Template</label>
                  <select value={smsEmailData.templateSelect} onChange={(e) => setSmsEmailData({ ...smsEmailData, templateSelect: e.target.value })} className={inputClass}>
                    <option value="">Select Template</option>
                    {templates.map((t) => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
                <div className={formGroupClass}>
                  <label className={labelClass}>Schedule Date</label>
                  <input type="date" value={smsEmailData.scheduleDate}
                    onChange={(e) => setSmsEmailData({ ...smsEmailData, scheduleDate: e.target.value })} className={inputClass} />
                </div>
                <div className={`${formGroupClass} md:col-span-2 lg:col-span-3`}>
                  <label className={labelClass}>Message *</label>
                  <textarea placeholder="Write SMS/Email message..." value={smsEmailData.message}
                    onChange={(e) => setSmsEmailData({ ...smsEmailData, message: e.target.value })} className={inputClass} rows={3} />
                </div>
              </div>
              <div className="flex items-center gap-3 mt-6 pt-4 border-t border-border">
                <button onClick={() => handleFormSubmit('SMS/Email', smsEmailData)}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl gradient-birla text-white text-sm font-medium hover:opacity-90 transition-opacity">
                  <Send className="w-4 h-4" />Send Message
                </button>
                <button onClick={() => setSmsEmailData({ recipientType: 'Individual', recipientSelect: '', subject: '', message: '', channel: 'SMS', templateSelect: '', scheduleDate: '' })}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-border text-sm font-medium hover:bg-muted transition-colors">
                  <RotateCcw className="w-4 h-4" />Reset
                </button>
              </div>
            </motion.div>
          )}

          {/* 3. Circular Form */}
          {activeForm === 'circular' && (
            <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-6">
              <h3 className="text-base font-semibold text-foreground flex items-center gap-2 mb-6">
                <FileText className="w-5 h-5 text-amber-500" />Circular Form
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className={formGroupClass}>
                  <label className={labelClass}>Title *</label>
                  <input type="text" placeholder="Circular title" value={circularData.title}
                    onChange={(e) => setCircularData({ ...circularData, title: e.target.value })} className={inputClass} />
                </div>
                <div className={formGroupClass}>
                  <label className={labelClass}>Circular No *</label>
                  <input type="text" placeholder="BOM/2025/CIR/XXX" value={circularData.circularNo}
                    onChange={(e) => setCircularData({ ...circularData, circularNo: e.target.value })} className={inputClass} />
                </div>
                <div className={formGroupClass}>
                  <label className={labelClass}>Category *</label>
                  <select value={circularData.category} onChange={(e) => setCircularData({ ...circularData, category: e.target.value })} className={inputClass}>
                    {circularCategories.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div className={formGroupClass}>
                  <label className={labelClass}>Target Audience *</label>
                  <select value={circularData.targetAudience} onChange={(e) => setCircularData({ ...circularData, targetAudience: e.target.value })} className={inputClass}>
                    {targetAudiences.map((a) => <option key={a} value={a}>{a}</option>)}
                  </select>
                </div>
                <div className={formGroupClass}>
                  <label className={labelClass}>Issue Date *</label>
                  <input type="date" value={circularData.issueDate}
                    onChange={(e) => setCircularData({ ...circularData, issueDate: e.target.value })} className={inputClass} />
                </div>
                <div className={formGroupClass}>
                  <label className={labelClass}>Expiry Date</label>
                  <input type="date" value={circularData.expiryDate}
                    onChange={(e) => setCircularData({ ...circularData, expiryDate: e.target.value })} className={inputClass} />
                </div>
                <div className={formGroupClass}>
                  <label className={labelClass}>Priority</label>
                  <select value={circularData.priority} onChange={(e) => setCircularData({ ...circularData, priority: e.target.value })} className={inputClass}>
                    {priorities.map((p) => <option key={p} value={p}>{p}</option>)}
                  </select>
                </div>
                <div className={formGroupClass}>
                  <label className={labelClass}>Attachment Name</label>
                  <input type="text" placeholder="e.g. Annual_Day_Schedule.pdf" value={circularData.attachmentName}
                    onChange={(e) => setCircularData({ ...circularData, attachmentName: e.target.value })} className={inputClass} />
                </div>
                <div className={`${formGroupClass} md:col-span-2 lg:col-span-3`}>
                  <label className={labelClass}>Content *</label>
                  <textarea placeholder="Write circular content..." value={circularData.content}
                    onChange={(e) => setCircularData({ ...circularData, content: e.target.value })} className={inputClass} rows={4} />
                </div>
              </div>
              <div className="flex items-center gap-3 mt-6 pt-4 border-t border-border">
                <button onClick={() => handleFormSubmit('Circular', circularData)}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl gradient-birla text-white text-sm font-medium hover:opacity-90 transition-opacity">
                  <Save className="w-4 h-4" />Publish Circular
                </button>
                <button onClick={() => setCircularData({ title: '', circularNo: '', category: 'Academic', targetAudience: 'All', content: '', attachmentName: '', issueDate: '', expiryDate: '', priority: 'Normal' })}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-border text-sm font-medium hover:bg-muted transition-colors">
                  <RotateCcw className="w-4 h-4" />Reset
                </button>
              </div>
            </motion.div>
          )}

          {/* 4. Chatbot Training Form */}
          {activeForm === 'chatbotTraining' && (
            <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-6">
              <h3 className="text-base font-semibold text-foreground flex items-center gap-2 mb-6">
                <Bot className="w-5 h-5 text-purple-500" />Chatbot Training Form
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className={formGroupClass}>
                  <label className={labelClass}>Intent Name *</label>
                  <input type="text" placeholder="e.g. fee_inquiry" value={chatbotData.intentName}
                    onChange={(e) => setChatbotData({ ...chatbotData, intentName: e.target.value })} className={inputClass} />
                </div>
                <div className={formGroupClass}>
                  <label className={labelClass}>Category *</label>
                  <select value={chatbotData.category} onChange={(e) => setChatbotData({ ...chatbotData, category: e.target.value })} className={inputClass}>
                    {chatbotCategories.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div className={`${formGroupClass} md:col-span-2`}>
                  <label className={labelClass}>Training Phrases * (one per line)</label>
                  <textarea placeholder={"What is the fee structure?\nHow much is the tuition fee?\nFee payment details"} value={chatbotData.trainingPhrases}
                    onChange={(e) => setChatbotData({ ...chatbotData, trainingPhrases: e.target.value })} className={inputClass} rows={4} />
                </div>
                <div className={`${formGroupClass} md:col-span-2 lg:col-span-3`}>
                  <label className={labelClass}>Response Text *</label>
                  <textarea placeholder="Bot response for this intent..." value={chatbotData.responseText}
                    onChange={(e) => setChatbotData({ ...chatbotData, responseText: e.target.value })} className={inputClass} rows={3} />
                </div>
              </div>
              <div className="flex items-center gap-3 mt-6 pt-4 border-t border-border">
                <button onClick={() => handleFormSubmit('Chatbot Training', chatbotData)}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl gradient-birla text-white text-sm font-medium hover:opacity-90 transition-opacity">
                  <Save className="w-4 h-4" />Train Intent
                </button>
                <button onClick={() => setChatbotData({ intentName: '', trainingPhrases: '', responseText: '', category: 'Admission' })}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-border text-sm font-medium hover:bg-muted transition-colors">
                  <RotateCcw className="w-4 h-4" />Reset
                </button>
              </div>
            </motion.div>
          )}

          {/* 5. Multi-Language Translation Form */}
          {activeForm === 'translation' && (
            <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-6">
              <h3 className="text-base font-semibold text-foreground flex items-center gap-2 mb-6">
                <Globe className="w-5 h-5 text-cyan-500" />Multi-Language Translation Form
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className={formGroupClass}>
                  <label className={labelClass}>Source Language *</label>
                  <select value={translationData.sourceLanguage} onChange={(e) => setTranslationData({ ...translationData, sourceLanguage: e.target.value })} className={inputClass}>
                    {languages.map((l) => <option key={l} value={l}>{l}</option>)}
                  </select>
                </div>
                <div className={formGroupClass}>
                  <label className={labelClass}>Target Language *</label>
                  <select value={translationData.targetLanguage} onChange={(e) => setTranslationData({ ...translationData, targetLanguage: e.target.value })} className={inputClass}>
                    {languages.map((l) => <option key={l} value={l}>{l}</option>)}
                  </select>
                </div>
                <div className={formGroupClass}>
                  <label className={labelClass}>Content Type *</label>
                  <select value={translationData.contentType} onChange={(e) => setTranslationData({ ...translationData, contentType: e.target.value })} className={inputClass}>
                    {contentTypes.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div className={`${formGroupClass} md:col-span-2`}>
                  <label className={labelClass}>Source Text *</label>
                  <textarea placeholder="Enter text to translate..." value={translationData.sourceText}
                    onChange={(e) => setTranslationData({ ...translationData, sourceText: e.target.value })} className={inputClass} rows={3} />
                </div>
                <div className={`${formGroupClass} md:col-span-2`}>
                  <label className={labelClass}>Translated Text</label>
                  <textarea placeholder="Translated text will appear here..." value={translationData.translatedText}
                    onChange={(e) => setTranslationData({ ...translationData, translatedText: e.target.value })} className={inputClass} rows={3} />
                </div>
                <div className={formGroupClass}>
                  <label className="flex items-center gap-2 text-sm text-foreground mt-6">
                    <input type="checkbox" checked={translationData.verified}
                      onChange={(e) => setTranslationData({ ...translationData, verified: e.target.checked })}
                      className="rounded border-input" />
                    Verified
                  </label>
                </div>
              </div>
              <div className="flex items-center gap-3 mt-6 pt-4 border-t border-border">
                <button onClick={() => handleFormSubmit('Translation', translationData)}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl gradient-birla text-white text-sm font-medium hover:opacity-90 transition-opacity">
                  <Save className="w-4 h-4" />Save Translation
                </button>
                <button onClick={() => setTranslationData({ sourceText: '', sourceLanguage: 'English', targetLanguage: 'Hindi', translatedText: '', verified: false, contentType: 'Notification' })}
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

          {/* 1. Notification Delivery Report */}
          {activeReport === 'notificationDelivery' && (
            <motion.div variants={itemVariants} className="space-y-4">
              <div className="rounded-2xl border border-border bg-card p-5">
                <h3 className="text-sm font-semibold text-foreground mb-4">Channel-wise Delivery Stats</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left py-2 px-3 font-medium text-muted-foreground">Channel</th>
                        <th className="text-left py-2 px-3 font-medium text-muted-foreground">Sent</th>
                        <th className="text-left py-2 px-3 font-medium text-muted-foreground">Delivered</th>
                        <th className="text-left py-2 px-3 font-medium text-muted-foreground">Failed</th>
                        <th className="text-left py-2 px-3 font-medium text-muted-foreground">Delivery Rate</th>
                      </tr>
                    </thead>
                    <tbody>
                      {notificationDelivery.map((n, i) => (
                        <tr key={i} className="border-b border-border/50">
                          <td className="py-2 px-3 font-medium">{n.channel}</td>
                          <td className="py-2 px-3">{n.sent.toLocaleString()}</td>
                          <td className="py-2 px-3 text-emerald-600 dark:text-emerald-400">{n.delivered.toLocaleString()}</td>
                          <td className="py-2 px-3 text-red-600 dark:text-red-400">{n.failed}</td>
                          <td className="py-2 px-3">
                            <div className="flex items-center gap-2">
                              <div className="w-16 h-1.5 bg-muted rounded-full overflow-hidden">
                                <div className="h-full rounded-full bg-birla-cyan" style={{ width: `${n.rate}%` }} />
                              </div>
                              <span>{n.rate}%</span>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="rounded-2xl border border-border bg-card p-5">
                <h3 className="text-sm font-semibold text-foreground mb-4">Delivery Stats Chart</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={notificationDelivery}>
                      <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'} />
                      <XAxis dataKey="channel" tick={{ fontSize: 9 }} stroke={darkMode ? '#64748b' : '#94a3b8'} />
                      <YAxis tick={{ fontSize: 9 }} stroke={darkMode ? '#64748b' : '#94a3b8'} />
                      <Tooltip contentStyle={tooltipStyle} />
                      <Legend iconType="circle" wrapperStyle={{ fontSize: '10px' }} />
                      <Bar dataKey="delivered" fill="#22D3EE" radius={[4, 4, 0, 0]} name="Delivered" />
                      <Bar dataKey="failed" fill="#EF4444" radius={[4, 4, 0, 0]} name="Failed" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </motion.div>
          )}

          {/* 2. SMS/Email Cost Report */}
          {activeReport === 'smsEmailCost' && (
            <motion.div variants={itemVariants} className="space-y-4">
              <div className="rounded-2xl border border-border bg-card p-5">
                <h3 className="text-sm font-semibold text-foreground mb-4">Monthly Communication Cost</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left py-2 px-3 font-medium text-muted-foreground">Month</th>
                        <th className="text-left py-2 px-3 font-medium text-muted-foreground">SMS Cost (₹)</th>
                        <th className="text-left py-2 px-3 font-medium text-muted-foreground">Email Cost (₹)</th>
                        <th className="text-left py-2 px-3 font-medium text-muted-foreground">Total (₹)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {smsEmailCost.map((s, i) => (
                        <tr key={i} className="border-b border-border/50">
                          <td className="py-2 px-3 font-medium">{s.month}</td>
                          <td className="py-2 px-3">₹{s.smsCost.toLocaleString()}</td>
                          <td className="py-2 px-3">₹{s.emailCost.toLocaleString()}</td>
                          <td className="py-2 px-3 font-semibold">₹{s.totalCost.toLocaleString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="rounded-2xl border border-border bg-card p-5">
                <h3 className="text-sm font-semibold text-foreground mb-4">Cost Trend</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={smsEmailCost}>
                      <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'} />
                      <XAxis dataKey="month" tick={{ fontSize: 9 }} stroke={darkMode ? '#64748b' : '#94a3b8'} />
                      <YAxis tick={{ fontSize: 9 }} stroke={darkMode ? '#64748b' : '#94a3b8'} />
                      <Tooltip contentStyle={tooltipStyle} />
                      <Legend iconType="circle" wrapperStyle={{ fontSize: '10px' }} />
                      <Area type="monotone" dataKey="smsCost" fill="#22D3EE" fillOpacity={0.15} stroke="#22D3EE" name="SMS Cost (₹)" />
                      <Area type="monotone" dataKey="emailCost" fill="#C8A45C" fillOpacity={0.15} stroke="#C8A45C" name="Email Cost (₹)" />
                      <Area type="monotone" dataKey="totalCost" fill="#0A1628" fillOpacity={0.1} stroke="#0A1628" name="Total Cost (₹)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </motion.div>
          )}

          {/* 3. Circular Readership Report */}
          {activeReport === 'circularReadership' && (
            <motion.div variants={itemVariants} className="space-y-4">
              <div className="rounded-2xl border border-border bg-card p-5">
                <h3 className="text-sm font-semibold text-foreground mb-4">Circular-wise Read/Unread</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left py-2 px-3 font-medium text-muted-foreground">Circular</th>
                        <th className="text-left py-2 px-3 font-medium text-muted-foreground">Total</th>
                        <th className="text-left py-2 px-3 font-medium text-muted-foreground">Read</th>
                        <th className="text-left py-2 px-3 font-medium text-muted-foreground">Unread</th>
                        <th className="text-left py-2 px-3 font-medium text-muted-foreground">Read Rate</th>
                      </tr>
                    </thead>
                    <tbody>
                      {circularReadership.map((c, i) => (
                        <tr key={i} className="border-b border-border/50">
                          <td className="py-2 px-3 font-medium">{c.circular}</td>
                          <td className="py-2 px-3">{c.total}</td>
                          <td className="py-2 px-3 text-emerald-600 dark:text-emerald-400">{c.read}</td>
                          <td className="py-2 px-3 text-amber-600 dark:text-amber-400">{c.unread}</td>
                          <td className="py-2 px-3">{((c.read / c.total) * 100).toFixed(1)}%</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="rounded-2xl border border-border bg-card p-5">
                <h3 className="text-sm font-semibold text-foreground mb-4">Readership Distribution</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={[
                        { name: 'Read', value: circularReadership.reduce((a, b) => a + b.read, 0), color: '#22D3EE' },
                        { name: 'Unread', value: circularReadership.reduce((a, b) => a + b.unread, 0), color: '#F59E0B' },
                      ]} cx="50%" cy="50%" innerRadius={50} outerRadius={90} dataKey="value" nameKey="name" paddingAngle={3} label>
                        {[{ color: '#22D3EE' }, { color: '#F59E0B' }].map((entry, idx) => <Cell key={idx} fill={entry.color} />)}
                      </Pie>
                      <Tooltip contentStyle={tooltipStyle} />
                      <Legend iconType="circle" wrapperStyle={{ fontSize: '10px' }} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </motion.div>
          )}

          {/* 4. Chatbot Usage Report */}
          {activeReport === 'chatbotUsage' && (
            <motion.div variants={itemVariants} className="space-y-4">
              <div className="rounded-2xl border border-border bg-card p-5">
                <h3 className="text-sm font-semibold text-foreground mb-4">Daily Chatbot Conversations</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left py-2 px-3 font-medium text-muted-foreground">Day</th>
                        <th className="text-left py-2 px-3 font-medium text-muted-foreground">Conversations</th>
                        <th className="text-left py-2 px-3 font-medium text-muted-foreground">Resolved</th>
                        <th className="text-left py-2 px-3 font-medium text-muted-foreground">Escalated</th>
                      </tr>
                    </thead>
                    <tbody>
                      {chatbotUsage.map((c, i) => (
                        <tr key={i} className="border-b border-border/50">
                          <td className="py-2 px-3 font-medium">{c.day}</td>
                          <td className="py-2 px-3">{c.conversations}</td>
                          <td className="py-2 px-3 text-emerald-600 dark:text-emerald-400">{c.resolved}</td>
                          <td className="py-2 px-3 text-amber-600 dark:text-amber-400">{c.escalated}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="rounded-2xl border border-border bg-card p-5">
                <h3 className="text-sm font-semibold text-foreground mb-4">Chatbot Trend</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chatbotUsage}>
                      <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'} />
                      <XAxis dataKey="day" tick={{ fontSize: 9 }} stroke={darkMode ? '#64748b' : '#94a3b8'} />
                      <YAxis tick={{ fontSize: 9 }} stroke={darkMode ? '#64748b' : '#94a3b8'} />
                      <Tooltip contentStyle={tooltipStyle} />
                      <Legend iconType="circle" wrapperStyle={{ fontSize: '10px' }} />
                      <Line type="monotone" dataKey="conversations" stroke="#8B5CF6" strokeWidth={2} dot={{ r: 3 }} name="Total" />
                      <Line type="monotone" dataKey="resolved" stroke="#10B981" strokeWidth={2} dot={{ r: 3 }} name="Resolved" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </motion.div>
          )}

          {/* 5. Language Coverage Report */}
          {activeReport === 'languageCoverage' && (
            <motion.div variants={itemVariants} className="space-y-4">
              <div className="rounded-2xl border border-border bg-card p-5">
                <h3 className="text-sm font-semibold text-foreground mb-4">Language-wise Translation Status</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left py-2 px-3 font-medium text-muted-foreground">Language</th>
                        <th className="text-left py-2 px-3 font-medium text-muted-foreground">Notifications</th>
                        <th className="text-left py-2 px-3 font-medium text-muted-foreground">Circulars</th>
                        <th className="text-left py-2 px-3 font-medium text-muted-foreground">Templates</th>
                        <th className="text-left py-2 px-3 font-medium text-muted-foreground">Coverage %</th>
                      </tr>
                    </thead>
                    <tbody>
                      {languageCoverage.map((l, i) => (
                        <tr key={i} className="border-b border-border/50">
                          <td className="py-2 px-3 font-medium">{l.language}</td>
                          <td className="py-2 px-3">{l.notifications}</td>
                          <td className="py-2 px-3">{l.circulars}</td>
                          <td className="py-2 px-3">{l.templates}</td>
                          <td className="py-2 px-3">
                            <div className="flex items-center gap-2">
                              <div className="w-16 h-1.5 bg-muted rounded-full overflow-hidden">
                                <div className={`h-full rounded-full ${l.coverage >= 75 ? 'bg-emerald-500' : l.coverage >= 50 ? 'bg-amber-500' : 'bg-red-500'}`} style={{ width: `${l.coverage}%` }} />
                              </div>
                              <span>{l.coverage}%</span>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="rounded-2xl border border-border bg-card p-5">
                <h3 className="text-sm font-semibold text-foreground mb-4">Language Coverage Chart</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={languageCoverage}>
                      <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'} />
                      <XAxis dataKey="language" tick={{ fontSize: 9 }} stroke={darkMode ? '#64748b' : '#94a3b8'} />
                      <YAxis tick={{ fontSize: 9 }} stroke={darkMode ? '#64748b' : '#94a3b8'} />
                      <Tooltip contentStyle={tooltipStyle} />
                      <Legend iconType="circle" wrapperStyle={{ fontSize: '10px' }} />
                      <Bar dataKey="coverage" fill="#C8A45C" radius={[4, 4, 0, 0]} name="Coverage %" />
                    </BarChart>
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
