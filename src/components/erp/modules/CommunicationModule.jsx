'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Send, MessageSquare, Mail, Phone, Bell, Clock, CheckCircle2,
  AlertTriangle, Users, FileText, Bot, Globe, Search, Filter,
  Plus, Eye, Download, ChevronRight, Zap, Calendar,
  Paperclip, ArrowUpRight, TrendingUp, BarChart3, Radio,
  Languages, MessageCircle, Sparkles, Settings, Play, Pause,
  Trash2, Edit3, Copy, ExternalLink, Hash, Tag, UserCheck,
  AlertCircle, Info, X, Check, RefreshCw, Volume2,
  GraduationCap, BookOpen, HeartPulse, Target
} from 'lucide-react'
import {
  BarChart, Bar, AreaChart, Area, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
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

const CHART_COLORS = ['#0A1628', '#22D3EE', '#C8A45C', '#8B5CF6', '#10B981', '#EF4444']

const statsCards = [
  { label: 'Sent Today', value: '245', change: '+18%', up: true, icon: Send, gradient: 'from-[#0A1628] to-[#1A2D4A]', glow: 'shadow-[#0A1628]/20' },
  { label: 'Delivery Rate', value: '98.2%', change: '+1.3%', up: true, icon: CheckCircle2, gradient: 'from-emerald-800 to-emerald-600', glow: 'shadow-emerald-800/20' },
  { label: 'Read Rate', value: '87.5%', change: '+4.2%', up: true, icon: Eye, gradient: 'from-[#C8A45C] to-[#E8D5A0]', glow: 'shadow-[#C8A45C]/20' },
  { label: 'Templates', value: '32', change: '+5', up: true, icon: FileText, gradient: 'from-purple-800 to-purple-600', glow: 'shadow-purple-800/20' },
]

const communicationTrendData = [
  { day: 'Mon', sms: 85, email: 120, push: 200 },
  { day: 'Tue', sms: 92, email: 135, push: 215 },
  { day: 'Wed', sms: 78, email: 110, push: 190 },
  { day: 'Thu', sms: 105, email: 145, push: 240 },
  { day: 'Fri', sms: 95, email: 130, push: 225 },
  { day: 'Sat', sms: 45, email: 60, push: 120 },
  { day: 'Sun', sms: 30, email: 40, push: 80 },
]

const channelDistributionData = [
  { name: 'Push Notification', value: 845, color: '#0A1628' },
  { name: 'Email', value: 520, color: '#22D3EE' },
  { name: 'SMS', value: 340, color: '#C8A45C' },
  { name: 'WhatsApp', value: 280, color: '#10B981' },
]

const sentMessagesData = [
  { id: 1, recipient: 'Aarav Sharma (X-A)', type: 'SMS', status: 'Delivered', time: '2 min ago', cost: '₹0.45' },
  { id: 2, recipient: 'Priya Menon (Parent)', type: 'Email', status: 'Read', time: '5 min ago', cost: '₹0.00' },
  { id: 3, recipient: 'Class VI-B Parents', type: 'Push', status: 'Delivered', time: '12 min ago', cost: '₹0.00' },
  { id: 4, recipient: 'Rohan Gupta (IX-A)', type: 'SMS', status: 'Failed', time: '18 min ago', cost: '₹0.45' },
  { id: 5, recipient: 'All Staff Members', type: 'Email', status: 'Read', time: '25 min ago', cost: '₹0.00' },
  { id: 6, recipient: 'Ananya Iyer (VIII-B)', type: 'WhatsApp', status: 'Delivered', time: '30 min ago', cost: '₹0.60' },
  { id: 7, recipient: 'Class XII Parents', type: 'Push', status: 'Sent', time: '45 min ago', cost: '₹0.00' },
  { id: 8, recipient: 'Kabir Patel (VII-A)', type: 'SMS', status: 'Delivered', time: '1 hr ago', cost: '₹0.45' },
]

const circularsData = [
  { id: 1, title: 'Annual Sports Day 2025-26', date: '15 Mar 2026', category: 'Event', audience: 'All Students & Parents', hasAttachment: true },
  { id: 2, title: 'CBSE Board Exam Schedule - Class X & XII', date: '12 Mar 2026', category: 'Academic', audience: 'Class X & XII', hasAttachment: true },
  { id: 3, title: 'Fee Payment Reminder - Q4 2025-26', date: '10 Mar 2026', category: 'Finance', audience: 'All Parents', hasAttachment: false },
  { id: 4, title: 'Parent-Teacher Meeting - Grade I to V', date: '08 Mar 2026', category: 'Meeting', audience: 'Class I-V Parents', hasAttachment: true },
  { id: 5, title: 'Summer Vacation Homework Guidelines', date: '05 Mar 2026', category: 'Academic', audience: 'Class I-XII', hasAttachment: true },
  { id: 6, title: 'Transport Route Change - Route 7 & 12', date: '03 Mar 2026', category: 'Transport', audience: 'Route 7 & 12 Users', hasAttachment: false },
  { id: 7, title: 'Health Check-up Schedule - Term 2', date: '01 Mar 2026', category: 'Health', audience: 'All Students', hasAttachment: true },
  { id: 8, title: 'Science Exhibition Registration Open', date: '28 Feb 2026', category: 'Event', audience: 'Class VI-XII', hasAttachment: false },
]

const chatbotConversations = [
  { id: 1, user: 'Rajesh Kumar (Parent)', query: 'What is the fee for Q4?', response: 'Q4 fee is ₹12,500 for Class VIII-A. Due by March 31.', status: 'Resolved', time: '3 min ago' },
  { id: 2, user: 'Sunita Devi (Parent)', query: 'When is the next PTM?', response: 'Next PTM for Class I-V is on March 8, 2026.', status: 'Resolved', time: '8 min ago' },
  { id: 3, user: 'Amit Joshi (Parent)', query: 'Bus route 7 timings?', response: 'Route 7: Pickup 7:15 AM, Drop 3:45 PM.', status: 'Resolved', time: '15 min ago' },
  { id: 4, user: 'Meera Nair (Student, XI)', query: 'What is my attendance percentage?', response: 'Your attendance is 91.2% as of March 5, 2026.', status: 'Resolved', time: '22 min ago' },
  { id: 5, user: 'Vikram Singh (Parent)', query: 'Fee receipt for Q3?', response: 'I need your admission number to fetch the receipt.', status: 'Pending', time: '30 min ago' },
]

const languageData = [
  { language: 'English', code: 'en', contentPieces: 156, translated: 156, progress: 100, flag: '🇬🇧' },
  { language: 'Hindi', code: 'hi', contentPieces: 156, translated: 142, progress: 91, flag: '🇮🇳' },
  { language: 'Bengali', code: 'bn', contentPieces: 156, translated: 98, progress: 63, flag: '🇮🇳' },
  { language: 'Tamil', code: 'ta', contentPieces: 156, translated: 87, progress: 56, flag: '🇮🇳' },
  { language: 'Telugu', code: 'te', contentPieces: 156, translated: 72, progress: 46, flag: '🇮🇳' },
  { language: 'Marathi', code: 'mr', contentPieces: 156, translated: 65, progress: 42, flag: '🇮🇳' },
]

const costTrackingData = [
  { month: 'Oct', sms: 2400, email: 150, whatsapp: 1800, total: 4350 },
  { month: 'Nov', sms: 2800, email: 200, whatsapp: 2100, total: 5100 },
  { month: 'Dec', sms: 2200, email: 180, whatsapp: 1600, total: 3980 },
  { month: 'Jan', sms: 3100, email: 220, whatsapp: 2400, total: 5720 },
  { month: 'Feb', sms: 2900, email: 200, whatsapp: 2200, total: 5300 },
  { month: 'Mar', sms: 2600, email: 190, whatsapp: 1900, total: 4690 },
]

export default function CommunicationModule() {
  const { darkMode } = useAppStore()
  const [activeTab, setActiveTab] = useState('notifications')
  const [notificationForm, setNotificationForm] = useState({
    title: '',
    message: '',
    audience: 'all',
    schedule: 'now',
    priority: 'normal',
  })
  const [chatInput, setChatInput] = useState('')
  const [chatMessages, setChatMessages] = useState([
    { id: 1, sender: 'bot', text: 'Hello! I am the Birla Open Minds AI Assistant. How can I help you today?', time: '10:00 AM' },
    { id: 2, sender: 'user', text: 'Send fee reminder to Class X parents', time: '10:01 AM' },
    { id: 3, sender: 'bot', text: 'I have queued a fee reminder notification for all Class X parents. 68 push notifications and 24 SMS messages will be sent. Would you like to customize the message or proceed with the template?', time: '10:01 AM' },
  ])
  const [selectedLanguage, setSelectedLanguage] = useState('en')

  const tabs = [
    { id: 'notifications', label: 'Push Notifications', icon: Bell },
    { id: 'sms-email', label: 'SMS / Email', icon: Mail },
    { id: 'circulars', label: 'Circulars', icon: FileText },
    { id: 'chatbot', label: 'AI Chatbot', icon: Bot },
    { id: 'multilang', label: 'Multi-Language', icon: Languages },
  ]

  const tooltipStyle = {
    backgroundColor: darkMode ? '#1A2D4A' : '#fff',
    border: `1px solid ${darkMode ? 'rgba(255,255,255,0.1)' : '#e2e8f0'}`,
    borderRadius: '12px',
    fontSize: '12px',
    color: darkMode ? '#e2e8f0' : '#1e293b',
  }

  const handleSendNotification = () => {
    setNotificationForm({ title: '', message: '', audience: 'all', schedule: 'now', priority: 'normal' })
  }

  const handleChatSend = () => {
    if (!chatInput.trim()) return
    setChatMessages(prev => [
      ...prev,
      { id: prev.length + 1, sender: 'user', text: chatInput, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) },
      { id: prev.length + 2, sender: 'bot', text: 'I am processing your request. This is a demo response from the Birla Open Minds AI Communication Assistant.', time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) },
    ])
    setChatInput('')
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
                    {card.up ? <ArrowUpRight className="w-3 h-3" /> : <TrendingUp className="w-3 h-3" />}
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

      {/* ─── Push Notifications Tab ────────────────────────── */}
      {activeTab === 'notifications' && (
        <div className="space-y-6">
          {/* Communication Trend Chart */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <motion.div variants={itemVariants} className="lg:col-span-2 rounded-2xl border border-border bg-card p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-semibold text-foreground flex items-center gap-2">
                  <BarChart3 className="w-4 h-4 text-[#22D3EE]" />
                  Communication Trend - This Week
                </h3>
              </div>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={communicationTrendData} barGap={2}>
                    <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'} />
                    <XAxis dataKey="day" tick={{ fontSize: 10 }} stroke={darkMode ? '#64748b' : '#94a3b8'} />
                    <YAxis tick={{ fontSize: 10 }} stroke={darkMode ? '#64748b' : '#94a3b8'} />
                    <Tooltip contentStyle={tooltipStyle} />
                    <Legend iconType="circle" wrapperStyle={{ fontSize: '11px' }} />
                    <Bar dataKey="sms" fill="#C8A45C" radius={[3, 3, 0, 0]} name="SMS" />
                    <Bar dataKey="email" fill="#22D3EE" radius={[3, 3, 0, 0]} name="Email" />
                    <Bar dataKey="push" fill="#0A1628" radius={[3, 3, 0, 0]} name="Push" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-5">
              <h3 className="text-base font-semibold text-foreground flex items-center gap-2 mb-1">
                <Radio className="w-4 h-4 text-[#C8A45C]" />
                Channel Distribution
              </h3>
              <p className="text-xs text-muted-foreground mb-3">Today&apos;s breakdown</p>
              <div className="h-44">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={channelDistributionData}
                      cx="50%"
                      cy="50%"
                      innerRadius={45}
                      outerRadius={75}
                      paddingAngle={3}
                      dataKey="value"
                    >
                      {channelDistributionData.map((entry, idx) => (
                        <Cell key={idx} fill={entry.color} stroke="none" />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={tooltipStyle} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-1.5 mt-2">
                {channelDistributionData.map((item) => (
                  <div key={item.name} className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                      <span className="text-muted-foreground">{item.name}</span>
                    </div>
                    <span className="font-semibold text-foreground">{item.value}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Notification Composer */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
            <motion.div variants={itemVariants} className="lg:col-span-3 rounded-2xl border border-border bg-card p-5">
              <h3 className="text-base font-semibold text-foreground flex items-center gap-2 mb-4">
                <Bell className="w-4 h-4 text-[#0A1628]" />
                Notification Composer
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Notification Title</label>
                  <input
                    type="text"
                    value={notificationForm.title}
                    onChange={(e) => setNotificationForm(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="e.g., Fee Payment Reminder - Q4 2025-26"
                    className="w-full px-3 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-[#22D3EE]/30"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Message</label>
                  <textarea
                    value={notificationForm.message}
                    onChange={(e) => setNotificationForm(prev => ({ ...prev, message: e.target.value }))}
                    placeholder="Write your notification message here..."
                    rows={4}
                    className="w-full px-3 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-[#22D3EE]/30 resize-none"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Target Audience</label>
                    <select
                      value={notificationForm.audience}
                      onChange={(e) => setNotificationForm(prev => ({ ...prev, audience: e.target.value }))}
                      className="w-full px-3 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-[#22D3EE]/30"
                    >
                      <option value="all">All Students & Parents</option>
                      <option value="class-x">Class X Students</option>
                      <option value="class-xii">Class XII Students</option>
                      <option value="primary">Primary (I-V) Parents</option>
                      <option value="middle">Middle (VI-VIII) Parents</option>
                      <option value="senior">Senior (IX-XII) Parents</option>
                      <option value="staff">All Staff</option>
                      <option value="teachers">Teachers Only</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Schedule</label>
                    <select
                      value={notificationForm.schedule}
                      onChange={(e) => setNotificationForm(prev => ({ ...prev, schedule: e.target.value }))}
                      className="w-full px-3 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-[#22D3EE]/30"
                    >
                      <option value="now">Send Now</option>
                      <option value="1hr">After 1 Hour</option>
                      <option value="morning">Tomorrow Morning (8 AM)</option>
                      <option value="evening">Tomorrow Evening (5 PM)</option>
                      <option value="custom">Custom Schedule</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Priority</label>
                    <select
                      value={notificationForm.priority}
                      onChange={(e) => setNotificationForm(prev => ({ ...prev, priority: e.target.value }))}
                      className="w-full px-3 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-[#22D3EE]/30"
                    >
                      <option value="normal">Normal</option>
                      <option value="high">High Priority</option>
                      <option value="urgent">Urgent</option>
                    </select>
                  </div>
                </div>
                <div className="flex gap-3 pt-2">
                  <button
                    onClick={handleSendNotification}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0A1628] text-white text-sm font-medium hover:opacity-90 transition-opacity"
                  >
                    <Send className="w-4 h-4" />
                    Send Notification
                  </button>
                  <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-border text-muted-foreground text-sm font-medium hover:bg-muted/50 transition-colors">
                    <Clock className="w-4 h-4" />
                    Schedule
                  </button>
                  <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-border text-muted-foreground text-sm font-medium hover:bg-muted/50 transition-colors">
                    <Eye className="w-4 h-4" />
                    Preview
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Preview Panel */}
            <motion.div variants={itemVariants} className="lg:col-span-2 rounded-2xl border border-border bg-card p-5">
              <h3 className="text-base font-semibold text-foreground flex items-center gap-2 mb-4">
                <Eye className="w-4 h-4 text-[#22D3EE]" />
                Notification Preview
              </h3>
              <div className="rounded-xl border-2 border-dashed border-border p-4 space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#0A1628] flex items-center justify-center">
                    <GraduationCap className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">Birla Open Minds</p>
                    <p className="text-[10px] text-muted-foreground">Just now</p>
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">
                    {notificationForm.title || 'Notification Title'}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {notificationForm.message || 'Your notification message will appear here. Start typing in the composer to see a live preview.'}
                  </p>
                </div>
                <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
                  <span className="px-2 py-0.5 rounded-full bg-muted text-[10px]">
                    {notificationForm.audience === 'all' ? 'All' : notificationForm.audience.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                  </span>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] ${
                    notificationForm.priority === 'urgent' ? 'bg-red-500/10 text-red-500' :
                    notificationForm.priority === 'high' ? 'bg-amber-500/10 text-amber-500' :
                    'bg-muted text-muted-foreground'
                  }`}>
                    {notificationForm.priority.charAt(0).toUpperCase() + notificationForm.priority.slice(1)}
                  </span>
                </div>
              </div>
              <div className="mt-4 space-y-2">
                <h4 className="text-xs font-medium text-muted-foreground">Recent Notifications</h4>
                {[
                  { title: 'Fee Reminder Q4', audience: 'All Parents', time: '2 hrs ago', status: 'Sent' },
                  { title: 'Sports Day Update', audience: 'Class VI-XII', time: '5 hrs ago', status: 'Delivered' },
                  { title: 'Holiday Notice', audience: 'All', time: '1 day ago', status: 'Read' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/30 transition-colors">
                    <div className={`w-2 h-2 rounded-full ${
                      item.status === 'Sent' ? 'bg-blue-500' :
                      item.status === 'Delivered' ? 'bg-[#22D3EE]' : 'bg-emerald-500'
                    }`} />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-foreground truncate">{item.title}</p>
                      <p className="text-[10px] text-muted-foreground">{item.audience} &bull; {item.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      )}

      {/* ─── SMS/Email Tab ─────────────────────────────────── */}
      {activeTab === 'sms-email' && (
        <div className="space-y-6">
          {/* Cost Tracking Chart */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <motion.div variants={itemVariants} className="lg:col-span-2 rounded-2xl border border-border bg-card p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-semibold text-foreground flex items-center gap-2">
                  <BarChart3 className="w-4 h-4 text-[#C8A45C]" />
                  Cost Tracking (₹)
                </h3>
                <span className="text-xs px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 font-medium">
                  FY 2025-26
                </span>
              </div>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={costTrackingData}>
                    <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'} />
                    <XAxis dataKey="month" tick={{ fontSize: 10 }} stroke={darkMode ? '#64748b' : '#94a3b8'} />
                    <YAxis tick={{ fontSize: 10 }} stroke={darkMode ? '#64748b' : '#94a3b8'} tickFormatter={(v) => `₹${v}`} />
                    <Tooltip contentStyle={tooltipStyle} formatter={(value) => [`₹${value.toLocaleString()}`, '']} />
                    <Legend iconType="circle" wrapperStyle={{ fontSize: '11px' }} />
                    <Area type="monotone" dataKey="sms" stroke="#C8A45C" fill="rgba(200,164,92,0.15)" strokeWidth={2} name="SMS" />
                    <Area type="monotone" dataKey="whatsapp" stroke="#10B981" fill="rgba(16,185,129,0.1)" strokeWidth={2} name="WhatsApp" />
                    <Area type="monotone" dataKey="total" stroke="#0A1628" fill="rgba(10,22,40,0.1)" strokeWidth={2} strokeDasharray="5 5" name="Total" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-5">
              <h3 className="text-base font-semibold text-foreground flex items-center gap-2 mb-4">
                <Zap className="w-4 h-4 text-amber-500" />
                Quick Stats
              </h3>
              <div className="space-y-3">
                {[
                  { label: 'SMS Sent Today', value: '156', cost: '₹70.20', icon: Phone, color: 'text-[#C8A45C]' },
                  { label: 'Emails Sent Today', value: '89', cost: '₹0.00', icon: Mail, color: 'text-[#22D3EE]' },
                  { label: 'WhatsApp Messages', value: '45', cost: '₹27.00', icon: MessageCircle, color: 'text-emerald-500' },
                  { label: 'Monthly Budget', value: '₹8,500', cost: '₹5,720 used', icon: BarChart3, color: 'text-purple-500' },
                  { label: 'Failed Deliveries', value: '3', cost: '₹1.35 refund', icon: AlertTriangle, color: 'text-red-500' },
                  { label: 'Avg. Delivery Time', value: '2.3s', cost: 'SMS: 1.8s', icon: Clock, color: 'text-blue-500' },
                ].map((item) => {
                  const Icon = item.icon
                  return (
                    <div key={item.label} className="flex items-center gap-3 p-2.5 rounded-xl border border-border hover:bg-muted/30 transition-colors">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center bg-muted/50 ${item.color}`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-muted-foreground">{item.label}</p>
                        <p className="text-sm font-semibold text-foreground">{item.value}</p>
                      </div>
                      <span className="text-[10px] text-muted-foreground">{item.cost}</span>
                    </div>
                  )
                })}
              </div>
            </motion.div>
          </div>

          {/* Sent Messages Table */}
          <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-semibold text-foreground flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#22D3EE]" />
                Sent Messages
              </h3>
              <div className="flex gap-2">
                <div className="relative">
                  <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search messages..."
                    className="pl-8 pr-3 py-1.5 rounded-lg border border-border bg-background text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-[#22D3EE]/30 w-48"
                  />
                </div>
                <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border text-xs text-muted-foreground hover:bg-muted/50 transition-colors">
                  <Filter className="w-3.5 h-3.5" />
                  Filter
                </button>
                <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border text-xs text-muted-foreground hover:bg-muted/50 transition-colors">
                  <Download className="w-3.5 h-3.5" />
                  Export
                </button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left text-xs font-medium text-muted-foreground py-3 px-3">Recipient</th>
                    <th className="text-left text-xs font-medium text-muted-foreground py-3 px-3">Type</th>
                    <th className="text-left text-xs font-medium text-muted-foreground py-3 px-3">Status</th>
                    <th className="text-left text-xs font-medium text-muted-foreground py-3 px-3">Time</th>
                    <th className="text-left text-xs font-medium text-muted-foreground py-3 px-3">Cost</th>
                  </tr>
                </thead>
                <tbody>
                  {sentMessagesData.map((msg) => (
                    <tr key={msg.id} className="border-b border-border/50 hover:bg-muted/20 transition-colors">
                      <td className="py-3 px-3">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-full bg-[#0A1628]/10 dark:bg-[#22D3EE]/10 flex items-center justify-center text-[10px] font-bold text-[#0A1628] dark:text-[#22D3EE]">
                            {msg.recipient.charAt(0)}
                          </div>
                          <span className="text-sm text-foreground">{msg.recipient}</span>
                        </div>
                      </td>
                      <td className="py-3 px-3">
                        <span className={`inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full ${
                          msg.type === 'SMS' ? 'bg-[#C8A45C]/10 text-[#C8A45C]' :
                          msg.type === 'Email' ? 'bg-[#22D3EE]/10 text-[#22D3EE]' :
                          msg.type === 'Push' ? 'bg-purple-500/10 text-purple-500' :
                          'bg-emerald-500/10 text-emerald-500'
                        }`}>
                          {msg.type === 'SMS' ? <Phone className="w-3 h-3" /> :
                           msg.type === 'Email' ? <Mail className="w-3 h-3" /> :
                           msg.type === 'Push' ? <Bell className="w-3 h-3" /> :
                           <MessageCircle className="w-3 h-3" />}
                          {msg.type}
                        </span>
                      </td>
                      <td className="py-3 px-3">
                        <span className={`inline-flex items-center gap-1 text-xs font-medium ${
                          msg.status === 'Delivered' ? 'text-emerald-500' :
                          msg.status === 'Read' ? 'text-[#22D3EE]' :
                          msg.status === 'Sent' ? 'text-blue-500' :
                          'text-red-500'
                        }`}>
                          {msg.status === 'Delivered' ? <CheckCircle2 className="w-3 h-3" /> :
                           msg.status === 'Read' ? <Eye className="w-3 h-3" /> :
                           msg.status === 'Sent' ? <Send className="w-3 h-3" /> :
                           <AlertCircle className="w-3 h-3" />}
                          {msg.status}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-xs text-muted-foreground">{msg.time}</td>
                      <td className="py-3 px-3 text-xs font-medium text-foreground">{msg.cost}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>
      )}

      {/* ─── Circulars Tab ─────────────────────────────────── */}
      {activeTab === 'circulars' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-semibold text-foreground flex items-center gap-2">
              <FileText className="w-4 h-4 text-[#C8A45C]" />
              Circular Management
            </h3>
            <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#0A1628] text-white text-sm font-medium hover:opacity-90 transition-opacity">
              <Plus className="w-4 h-4" />
              New Circular
            </button>
          </div>

          <div className="grid gap-3">
            {circularsData.map((circular) => (
              <motion.div
                key={circular.id}
                variants={itemVariants}
                className="rounded-2xl border border-border bg-card p-4 hover:shadow-md transition-all group"
              >
                <div className="flex items-start gap-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                    circular.category === 'Event' ? 'bg-purple-500/10 text-purple-500' :
                    circular.category === 'Academic' ? 'bg-blue-500/10 text-blue-500' :
                    circular.category === 'Finance' ? 'bg-amber-500/10 text-amber-500' :
                    circular.category === 'Meeting' ? 'bg-emerald-500/10 text-emerald-500' :
                    circular.category === 'Transport' ? 'bg-orange-500/10 text-orange-500' :
                    'bg-red-500/10 text-red-500'
                  }`}>
                    {circular.category === 'Event' ? <Calendar className="w-5 h-5" /> :
                     circular.category === 'Academic' ? <BookOpen className="w-5 h-5" /> :
                     circular.category === 'Finance' ? <Zap className="w-5 h-5" /> :
                     circular.category === 'Meeting' ? <Users className="w-5 h-5" /> :
                     circular.category === 'Transport' ? <AlertTriangle className="w-5 h-5" /> :
                     <HeartPulse className="w-5 h-5" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="text-sm font-semibold text-foreground group-hover:text-[#22D3EE] transition-colors">{circular.title}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">{circular.audience}</p>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        {circular.hasAttachment && (
                          <span className="flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
                            <Paperclip className="w-3 h-3" />
                            PDF
                          </span>
                        )}
                        <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                      </div>
                    </div>
                    <div className="flex items-center gap-3 mt-2">
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                        circular.category === 'Event' ? 'bg-purple-500/10 text-purple-500' :
                        circular.category === 'Academic' ? 'bg-blue-500/10 text-blue-500' :
                        circular.category === 'Finance' ? 'bg-amber-500/10 text-amber-500' :
                        circular.category === 'Meeting' ? 'bg-emerald-500/10 text-emerald-500' :
                        circular.category === 'Transport' ? 'bg-orange-500/10 text-orange-500' :
                        'bg-red-500/10 text-red-500'
                      }`}>{circular.category}</span>
                      <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {circular.date}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* ─── AI Chatbot Tab ─────────────────────────────────── */}
      {activeTab === 'chatbot' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Chatbot Configuration */}
            <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-5">
              <h3 className="text-base font-semibold text-foreground flex items-center gap-2 mb-4">
                <Settings className="w-4 h-4 text-[#22D3EE]" />
                Chatbot Configuration
              </h3>
              <div className="space-y-3">
                {[
                  { label: 'Status', value: 'Active', icon: CheckCircle2, color: 'text-emerald-500' },
                  { label: 'Training Model', value: 'GPT-4 Fine-tuned', icon: Bot, color: 'text-[#22D3EE]' },
                  { label: 'Training Data', value: '12,540 conversations', icon: FileText, color: 'text-[#C8A45C]' },
                  { label: 'Response Accuracy', value: '94.7%', icon: Target, color: 'text-purple-500' },
                  { label: 'Avg. Response Time', value: '1.2 seconds', icon: Clock, color: 'text-blue-500' },
                  { label: 'Daily Conversations', value: '85-120', icon: MessageCircle, color: 'text-emerald-500' },
                ].map((item) => {
                  const Icon = item.icon
                  return (
                    <div key={item.label} className="flex items-center gap-3 p-2.5 rounded-xl border border-border hover:bg-muted/30 transition-colors">
                      <Icon className={`w-4 h-4 ${item.color}`} />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-muted-foreground">{item.label}</p>
                      </div>
                      <span className="text-sm font-medium text-foreground">{item.value}</span>
                    </div>
                  )
                })}
              </div>
              <div className="mt-4 space-y-2">
                <h4 className="text-xs font-medium text-muted-foreground">Training Status</h4>
                <div className="p-3 rounded-xl bg-[#0A1628]/5 dark:bg-[#22D3EE]/5 border border-[#0A1628]/10 dark:border-[#22D3EE]/10">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs text-foreground">Model Accuracy</span>
                    <span className="text-xs font-bold text-[#22D3EE]">94.7%</span>
                  </div>
                  <div className="h-2 rounded-full bg-muted overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: '94.7%' }}
                      transition={{ duration: 1.2, ease: 'easeOut' }}
                      className="h-full rounded-full bg-gradient-to-r from-[#0A1628] to-[#22D3EE]"
                    />
                  </div>
                  <p className="text-[10px] text-muted-foreground mt-1.5">Last trained: 2 days ago</p>
                </div>
              </div>
            </motion.div>

            {/* Chat Interface */}
            <motion.div variants={itemVariants} className="lg:col-span-2 rounded-2xl border border-border bg-card p-5 flex flex-col" style={{ minHeight: '500px' }}>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-semibold text-foreground flex items-center gap-2">
                  <Bot className="w-4 h-4 text-[#0A1628]" />
                  AI Communication Assistant
                </h3>
                <span className="flex items-center gap-1.5 text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500 font-medium">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Online
                </span>
              </div>
              <div className="flex-1 overflow-y-auto space-y-3 max-h-80 mb-4 pr-2">
                {chatMessages.map((msg) => (
                  <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                      msg.sender === 'user'
                        ? 'bg-[#0A1628] text-white rounded-br-md'
                        : 'bg-muted/50 text-foreground rounded-bl-md'
                    }`}>
                      {msg.sender === 'bot' && (
                        <div className="flex items-center gap-1.5 mb-1">
                          <Sparkles className="w-3 h-3 text-[#C8A45C]" />
                          <span className="text-[10px] font-medium text-[#C8A45C]">AI Assistant</span>
                        </div>
                      )}
                      <p className="text-xs leading-relaxed">{msg.text}</p>
                      <p className={`text-[10px] mt-1 ${msg.sender === 'user' ? 'text-white/50' : 'text-muted-foreground'}`}>{msg.time}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleChatSend()}
                  placeholder="Ask the AI assistant..."
                  className="flex-1 px-3 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-[#22D3EE]/30"
                />
                <button
                  onClick={handleChatSend}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#0A1628] text-white text-sm font-medium hover:opacity-90 transition-opacity"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          </div>

          {/* Conversation Logs */}
          <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-semibold text-foreground flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-[#C8A45C]" />
                Recent Conversation Logs
              </h3>
              <button className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors">
                <Download className="w-3.5 h-3.5" />
                Export Logs
              </button>
            </div>
            <div className="space-y-2 max-h-72 overflow-y-auto">
              {chatbotConversations.map((conv) => (
                <div key={conv.id} className="p-3 rounded-xl border border-border hover:bg-muted/30 transition-colors group">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-medium text-foreground">{conv.user}</span>
                        <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                          conv.status === 'Resolved' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-amber-500/10 text-amber-500'
                        }`}>{conv.status}</span>
                      </div>
                      <p className="text-xs text-muted-foreground"><span className="font-medium text-foreground/70">Q:</span> {conv.query}</p>
                      <p className="text-xs text-muted-foreground mt-0.5"><span className="font-medium text-foreground/70">A:</span> {conv.response}</p>
                    </div>
                    <span className="text-[10px] text-muted-foreground flex-shrink-0">{conv.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      )}

      {/* ─── Multi-Language Tab ──────────────────────────────── */}
      {activeTab === 'multilang' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Language Selector */}
            <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-5">
              <h3 className="text-base font-semibold text-foreground flex items-center gap-2 mb-4">
                <Globe className="w-4 h-4 text-[#22D3EE]" />
                Language Selector
              </h3>
              <div className="space-y-2">
                {languageData.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => setSelectedLanguage(lang.code)}
                    className={`w-full flex items-center gap-3 p-3 rounded-xl border transition-all ${
                      selectedLanguage === lang.code
                        ? 'border-[#22D3EE]/50 bg-[#22D3EE]/5'
                        : 'border-border hover:bg-muted/30'
                    }`}
                  >
                    <span className="text-xl">{lang.flag}</span>
                    <div className="flex-1 text-left">
                      <p className="text-sm font-medium text-foreground">{lang.language}</p>
                      <p className="text-[10px] text-muted-foreground">{lang.code.toUpperCase()}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs font-semibold text-foreground">{lang.progress}%</p>
                      <div className="w-12 h-1.5 rounded-full bg-muted overflow-hidden mt-0.5">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-[#0A1628] to-[#22D3EE]"
                          style={{ width: `${lang.progress}%` }}
                        />
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Translation Status */}
            <motion.div variants={itemVariants} className="lg:col-span-2 rounded-2xl border border-border bg-card p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-semibold text-foreground flex items-center gap-2">
                  <Languages className="w-4 h-4 text-[#C8A45C]" />
                  Translation Status
                </h3>
                <span className="text-xs px-2 py-0.5 rounded-full bg-[#22D3EE]/10 text-[#22D3EE] font-medium">
                  {languageData.find(l => l.code === selectedLanguage)?.language || 'English'}
                </span>
              </div>
              <div className="h-52">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={languageData.filter(l => l.code !== 'en')}
                    barGap={4}
                    layout="vertical"
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'} />
                    <XAxis type="number" domain={[0, 160]} tick={{ fontSize: 10 }} stroke={darkMode ? '#64748b' : '#94a3b8'} />
                    <YAxis dataKey="language" type="category" tick={{ fontSize: 10 }} stroke={darkMode ? '#64748b' : '#94a3b8'} width={60} />
                    <Tooltip contentStyle={tooltipStyle} />
                    <Legend iconType="circle" wrapperStyle={{ fontSize: '11px' }} />
                    <Bar dataKey="translated" fill="#22D3EE" radius={[0, 3, 3, 0]} name="Translated" />
                    <Bar dataKey="contentPieces" fill="#0A1628" radius={[0, 3, 3, 0]} name="Total Content" opacity={0.3} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 space-y-2">
                <h4 className="text-xs font-medium text-muted-foreground">Content Pieces - {languageData.find(l => l.code === selectedLanguage)?.language}</h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { label: 'Notifications', total: 45, translated: selectedLanguage === 'en' ? 45 : Math.floor(45 * (languageData.find(l => l.code === selectedLanguage)?.progress || 0) / 100) },
                    { label: 'Circulars', total: 32, translated: selectedLanguage === 'en' ? 32 : Math.floor(32 * (languageData.find(l => l.code === selectedLanguage)?.progress || 0) / 100) },
                    { label: 'Templates', total: 28, translated: selectedLanguage === 'en' ? 28 : Math.floor(28 * (languageData.find(l => l.code === selectedLanguage)?.progress || 0) / 100) },
                    { label: 'Auto-Responses', total: 51, translated: selectedLanguage === 'en' ? 51 : Math.floor(51 * (languageData.find(l => l.code === selectedLanguage)?.progress || 0) / 100) },
                  ].map((item) => (
                    <div key={item.label} className="p-2.5 rounded-xl border border-border">
                      <p className="text-xs text-muted-foreground">{item.label}</p>
                      <p className="text-sm font-semibold text-foreground">{item.translated}/{item.total}</p>
                      <div className="w-full h-1.5 rounded-full bg-muted overflow-hidden mt-1">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-[#C8A45C] to-[#22D3EE]"
                          style={{ width: `${(item.translated / item.total) * 100}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Translation Queue */}
          <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-semibold text-foreground flex items-center gap-2">
                <RefreshCw className="w-4 h-4 text-emerald-500" />
                Translation Queue
              </h3>
              <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#0A1628] text-white text-xs font-medium hover:opacity-90 transition-opacity">
                <Plus className="w-3.5 h-3.5" />
                Add to Queue
              </button>
            </div>
            <div className="space-y-2">
              {[
                { title: 'Fee Structure Document 2025-26', languages: ['Hindi', 'Bengali', 'Tamil'], status: 'In Progress', progress: 65 },
                { title: 'Annual Day Invitation', languages: ['Hindi', 'Marathi'], status: 'Completed', progress: 100 },
                { title: 'Transport Rules & Guidelines', languages: ['Hindi', 'Bengali', 'Telugu', 'Tamil'], status: 'In Progress', progress: 40 },
                { title: 'Health Check-up Consent Form', languages: ['Hindi', 'Bengali'], status: 'Queued', progress: 0 },
                { title: 'Board Exam Instructions', languages: ['Hindi'], status: 'Completed', progress: 100 },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4 p-3 rounded-xl border border-border hover:bg-muted/30 transition-colors">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                    item.status === 'Completed' ? 'bg-emerald-500/10 text-emerald-500' :
                    item.status === 'In Progress' ? 'bg-amber-500/10 text-amber-500' :
                    'bg-muted text-muted-foreground'
                  }`}>
                    {item.status === 'Completed' ? <Check className="w-4 h-4" /> :
                     item.status === 'In Progress' ? <RefreshCw className="w-4 h-4" /> :
                     <Clock className="w-4 h-4" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground">{item.title}</p>
                    <div className="flex items-center gap-1 mt-0.5">
                      {item.languages.map((lang, j) => (
                        <span key={j} className="text-[10px] px-1.5 py-0.5 rounded-full bg-muted text-muted-foreground">{lang}</span>
                      ))}
                    </div>
                  </div>
                  <div className="flex-shrink-0 text-right">
                    <span className={`text-xs font-medium ${
                      item.status === 'Completed' ? 'text-emerald-500' :
                      item.status === 'In Progress' ? 'text-amber-500' :
                      'text-muted-foreground'
                    }`}>{item.status}</span>
                    {item.progress > 0 && item.progress < 100 && (
                      <div className="w-16 h-1.5 rounded-full bg-muted overflow-hidden mt-1">
                        <div className="h-full rounded-full bg-gradient-to-r from-[#C8A45C] to-[#22D3EE]" style={{ width: `${item.progress}%` }} />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      )}
    </motion.div>
  )
}
