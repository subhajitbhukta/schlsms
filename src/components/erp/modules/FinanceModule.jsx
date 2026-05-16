'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  IndianRupee, CreditCard, Clock, AlertTriangle, CheckCircle2,
  TrendingUp, TrendingDown, ArrowUpRight, Download, Printer,
  Send, Eye, Plus, Search, Filter, Wallet, Receipt, PieChart as PieChartIcon,
  BarChart3, FileText, Bus, Award, Users, Calendar, Bell,
  Settings, ChevronRight, XCircle, Shield, Smartphone,
  Building2, Phone, Mail, MapPin, Zap, Globe, ChevronLeft, MessageSquare
} from 'lucide-react'
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Legend, PieChart, Pie, Cell
} from 'recharts'
import useAppStore from '@/store/useAppStore'

// ─── Data ────────────────────────────────────────────────────────
const topStats = [
  { label: 'Total Collection', value: '₹4.58Cr', change: '+12.4%', icon: IndianRupee, gradient: 'from-emerald-900 to-emerald-600', glow: 'shadow-emerald-800/20' },
  { label: 'Pending Fees', value: '₹32.4L', change: '142 students', icon: Clock, gradient: 'from-amber-900 to-amber-600', glow: 'shadow-amber-800/20' },
  { label: 'Scholarship', value: '₹8.2L', change: '24 students', icon: Award, gradient: 'from-purple-900 to-purple-600', glow: 'shadow-purple-800/20' },
  { label: 'Expenses', value: '₹1.24Cr', change: '-3.2% vs last', icon: TrendingDown, gradient: 'from-rose-900 to-rose-600', glow: 'shadow-rose-800/20' },
]

const feeStructure = [
  { class: 'Nursery', tuition: 42000, development: 8000, transport: 18000, lab: 0, exam: 2000, total: 70000 },
  { class: 'LKG', tuition: 44000, development: 8000, transport: 18000, lab: 0, exam: 2000, total: 72000 },
  { class: 'UKG', tuition: 46000, development: 8000, transport: 18000, lab: 0, exam: 2000, total: 74000 },
  { class: 'I', tuition: 48000, development: 10000, transport: 20000, lab: 3000, exam: 2500, total: 83500 },
  { class: 'II', tuition: 48000, development: 10000, transport: 20000, lab: 3000, exam: 2500, total: 83500 },
  { class: 'III', tuition: 50000, development: 10000, transport: 20000, lab: 3500, exam: 2500, total: 86000 },
  { class: 'IV', tuition: 50000, development: 10000, transport: 20000, lab: 3500, exam: 2500, total: 86000 },
  { class: 'V', tuition: 52000, development: 12000, transport: 22000, lab: 4000, exam: 3000, total: 93000 },
  { class: 'VI', tuition: 54000, development: 12000, transport: 22000, lab: 4000, exam: 3000, total: 95000 },
  { class: 'VII', tuition: 56000, development: 12000, transport: 22000, lab: 4500, exam: 3000, total: 97500 },
  { class: 'VIII', tuition: 58000, development: 14000, transport: 24000, lab: 5000, exam: 3500, total: 104500 },
  { class: 'IX', tuition: 60000, development: 14000, transport: 24000, lab: 5000, exam: 3500, total: 106500 },
  { class: 'X', tuition: 62000, development: 15000, transport: 24000, lab: 5000, exam: 4000, total: 110000 },
  { class: 'XI (Sci)', tuition: 68000, development: 16000, transport: 26000, lab: 8000, exam: 4500, total: 122500 },
  { class: 'XI (Comm)', tuition: 64000, development: 16000, transport: 26000, lab: 4000, exam: 4500, total: 114500 },
  { class: 'XII (Sci)', tuition: 70000, development: 16000, transport: 26000, lab: 8000, exam: 5000, total: 125000 },
  { class: 'XII (Comm)', tuition: 66000, development: 16000, transport: 26000, lab: 4000, exam: 5000, total: 117000 },
]

const monthlyIncomeExpenses = [
  { month: 'Apr', income: 3850000, expenses: 980000 },
  { month: 'May', income: 4120000, expenses: 1050000 },
  { month: 'Jun', income: 3450000, expenses: 920000 },
  { month: 'Jul', income: 4680000, expenses: 1180000 },
  { month: 'Aug', income: 3950000, expenses: 1040000 },
  { month: 'Sep', income: 4200000, expenses: 1100000 },
  { month: 'Oct', income: 4500000, expenses: 1150000 },
  { month: 'Nov', income: 3800000, expenses: 980000 },
  { month: 'Dec', income: 3600000, expenses: 950000 },
  { month: 'Jan', income: 4300000, expenses: 1120000 },
  { month: 'Feb', income: 4100000, expenses: 1080000 },
  { month: 'Mar', income: 5200000, expenses: 1250000 },
]

const expenseBreakdown = [
  { name: 'Salaries', value: 62, color: '#0A1628' },
  { name: 'Infrastructure', value: 12, color: '#22D3EE' },
  { name: 'Utilities', value: 8, color: '#C8A45C' },
  { name: 'Transport', value: 7, color: '#8B5CF6' },
  { name: 'Lab & Equipment', value: 5, color: '#10B981' },
  { name: 'Events & Sports', value: 4, color: '#F59E0B' },
  { name: 'Miscellaneous', value: 2, color: '#EF4444' },
]

const feeReminders = [
  { id: 1, student: 'Aarav Sharma', class: 'X-A', amount: '₹27,500', dueDate: 'Mar 15, 2026', status: 'overdue', remindersSent: 3, parent: 'Mr. Rajesh Sharma', phone: '+91 98765 43210' },
  { id: 2, student: 'Arjun Reddy', class: 'IX-B', amount: '₹26,625', dueDate: 'Mar 15, 2026', status: 'overdue', remindersSent: 2, parent: 'Mr. Venkat Reddy', phone: '+91 76543 21098' },
  { id: 3, student: 'Rohan Patel', class: 'VII-A', amount: '₹24,375', dueDate: 'Mar 20, 2026', status: 'pending', remindersSent: 1, parent: 'Mr. Suresh Patel', phone: '+91 54321 09876' },
  { id: 4, student: 'Meera Nair', class: 'IV-A', amount: '₹21,500', dueDate: 'Mar 20, 2026', status: 'pending', remindersSent: 1, parent: 'Mrs. Lakshmi Nair', phone: '+91 21098 76543' },
  { id: 5, student: 'Kavya Joshi', class: 'II-A', amount: '₹20,875', dueDate: 'Mar 25, 2026', status: 'upcoming', remindersSent: 0, parent: 'Mr. Deepak Joshi', phone: '+91 09876 54321' },
  { id: 6, student: 'Ishita Banerjee', class: 'VI-B', amount: '₹23,750', dueDate: 'Mar 25, 2026', status: 'upcoming', remindersSent: 0, parent: 'Mrs. Soma Banerjee', phone: '+91 43210 98765' },
]

const scholarships = [
  { id: 1, name: 'Merit Scholarship', type: 'Academic', eligibility: '≥95% in previous class', amount: '₹25,000', recipients: 8, disbursed: '₹2,00,000', status: 'Active' },
  { id: 2, name: 'Sports Excellence Award', type: 'Sports', eligibility: 'State/National level participation', amount: '₹15,000', recipients: 5, disbursed: '₹75,000', status: 'Active' },
  { id: 3, name: 'EWS Waiver', type: 'Financial', eligibility: 'Family income < ₹3L/annum', amount: '50% Tuition Waiver', recipients: 6, disbursed: '₹1,80,000', status: 'Active' },
  { id: 4, name: 'Sibiling Discount', type: 'Family', eligibility: '2+ children enrolled', amount: '10% Tuition Discount', recipients: 3, disbursed: '₹45,000', status: 'Active' },
  { id: 5, name: 'Staff Ward Concession', type: 'Staff Benefit', eligibility: 'Parent is school staff', amount: '25% Tuition Waiver', recipients: 2, disbursed: '₹60,000', status: 'Active' },
]

const recentPayments = [
  { id: 'PAY-2026-0847', student: 'Priya Gupta', class: 'X-A', amount: '₹1,10,000', method: 'UPI', date: 'Mar 4, 2026', status: 'success' },
  { id: 'PAY-2026-0846', student: 'Vivaan Kumar', class: 'V-A', amount: '₹93,000', method: 'Net Banking', date: 'Mar 4, 2026', status: 'success' },
  { id: 'PAY-2026-0845', student: 'Ananya Iyer', class: 'VIII-A', amount: '₹1,04,500', method: 'Card', date: 'Mar 3, 2026', status: 'success' },
  { id: 'PAY-2026-0844', student: 'Aditya Singh', class: 'III-B', amount: '₹21,500', method: 'UPI', date: 'Mar 3, 2026', status: 'pending' },
  { id: 'PAY-2026-0843', student: 'Kavya Joshi', class: 'II-A', amount: '₹41,750', method: 'Cash', date: 'Mar 2, 2026', status: 'success' },
  { id: 'PAY-2026-0842', student: 'Rohan Patel', class: 'VII-A', amount: '₹24,375', method: 'UPI', date: 'Mar 2, 2026', status: 'failed' },
]

const transportRoutes = [
  { route: 'Route 1 - Singur', areas: 'Singur, Haripal, Balibela', students: 68, fee: 22000, collected: '₹14,52,000', pending: '₹4,40,000', collection: 77 },
  { route: 'Route 2 - Chandannagar', areas: 'Chandannagar, Chinsurah, Mogra', students: 82, fee: 24000, collected: '₹18,48,000', pending: '₹1,20,000', collection: 94 },
  { route: 'Route 3 - Srirampore', areas: 'Srirampore, Konnagar, Rishra', students: 55, fee: 20000, collected: '₹9,90,000', pending: '₹1,10,000', collection: 90 },
  { route: 'Route 4 - Hooghly', areas: 'Hooghly, Bandel, Tribeni', students: 42, fee: 26000, collected: '₹8,82,000', pending: '₹2,10,000', collection: 81 },
  { route: 'Route 5 - Bardhaman', areas: 'Bardhaman, Memari, Katwa', students: 38, fee: 28000, collected: '₹8,40,000', pending: '₹2,24,000', collection: 79 },
  { route: 'Route 6 - Tarakeswar', areas: 'Tarakeswar, Arambagh, Khanakul', students: 45, fee: 24000, collected: '₹9,72,000', pending: '₹1,08,000', collection: 90 },
]

const expenseCategories = [
  { id: 1, category: 'Teaching Staff Salaries', budget: '₹68,00,000', actual: '₹66,50,000', variance: '+₹1,50,000', status: 'under', percent: 98 },
  { id: 2, category: 'Admin Staff Salaries', budget: '₹18,00,000', actual: '₹17,80,000', variance: '+₹20,000', status: 'under', percent: 99 },
  { id: 3, category: 'Infrastructure Maintenance', budget: '₹12,00,000', actual: '₹11,40,000', variance: '+₹60,000', status: 'under', percent: 95 },
  { id: 4, category: 'Electricity & Water', budget: '₹8,00,000', actual: '₹8,60,000', variance: '-₹60,000', status: 'over', percent: 108 },
  { id: 5, category: 'Lab Equipment & Supplies', budget: '₹5,00,000', actual: '₹4,20,000', variance: '+₹80,000', status: 'under', percent: 84 },
  { id: 6, category: 'Sports & Events', budget: '₹4,00,000', actual: '₹3,80,000', variance: '+₹20,000', status: 'under', percent: 95 },
  { id: 7, category: 'Transport Operations', budget: '₹7,00,000', actual: '₹6,90,000', variance: '+₹10,000', status: 'under', percent: 99 },
  { id: 8, category: 'Digital Infrastructure', budget: '₹3,00,000', actual: '₹2,50,000', variance: '+₹50,000', status: 'under', percent: 83 },
]

const receiptData = {
  receiptNo: 'REC/2025-26/0847',
  date: 'Mar 4, 2026',
  student: 'Priya Gupta',
  class: 'X-A',
  rollNo: 2,
  studentId: 'BOM-2025-002',
  items: [
    { description: 'Tuition Fee - Q4', amount: '₹15,500' },
    { description: 'Development Fee - Q4', amount: '₹3,750' },
    { description: 'Transport Fee - Q4', amount: '₹6,000' },
    { description: 'Lab Fee - Q4', amount: '₹1,250' },
    { description: 'Exam Fee - Q4', amount: '₹1,000' },
  ],
  total: '₹27,500',
  method: 'UPI - PayU',
  transactionId: 'TXN2403040847',
  academicYear: '2025-26',
}

// ─── Animation variants ──────────────────────────────────────────
const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.06 } },
}
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
}

export default function FinanceModule() {
  const { darkMode } = useAppStore()
  const [activeTab, setActiveTab] = useState('overview')
  const [paymentMethod, setPaymentMethod] = useState('upi')
  const [searchQuery, setSearchQuery] = useState('')

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'fee-structure', label: 'Fee Structure', icon: IndianRupee },
    { id: 'payments', label: 'Payments', icon: CreditCard },
    { id: 'analytics', label: 'Analytics', icon: TrendingUp },
    { id: 'expenses', label: 'Expenses', icon: Wallet },
  ]

  const tooltipStyle = {
    backgroundColor: darkMode ? '#1A2D4A' : '#fff',
    border: `1px solid ${darkMode ? 'rgba(255,255,255,0.1)' : '#e2e8f0'}`,
    borderRadius: '12px',
    fontSize: '12px',
    color: darkMode ? '#e2e8f0' : '#1e293b',
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

          {/* Income vs Expenses Chart + Fee Reminders */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <motion.div variants={itemVariants} className="lg:col-span-2 rounded-2xl border border-border bg-card p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-semibold text-foreground flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-birla-cyan" />
                  Monthly Income vs Expenses
                </h3>
                <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-medium">
                  FY 2025-26
                </span>
              </div>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={monthlyIncomeExpenses}>
                    <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'} />
                    <XAxis dataKey="month" tick={{ fontSize: 10 }} stroke={darkMode ? '#64748b' : '#94a3b8'} />
                    <YAxis tick={{ fontSize: 10 }} stroke={darkMode ? '#64748b' : '#94a3b8'} tickFormatter={(v) => `₹${(v / 100000).toFixed(0)}L`} />
                    <Tooltip contentStyle={tooltipStyle} formatter={(value) => [`₹${(value / 100000).toFixed(1)}L`, '']} />
                    <Legend iconType="circle" wrapperStyle={{ fontSize: '11px' }} />
                    <Area type="monotone" dataKey="income" stroke="#10B981" fill="rgba(16,185,129,0.08)" strokeWidth={2} name="Income" />
                    <Area type="monotone" dataKey="expenses" stroke="#EF4444" fill="rgba(239,68,68,0.08)" strokeWidth={2} name="Expenses" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </motion.div>

            {/* Fee Reminders Quick View */}
            <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-semibold text-foreground flex items-center gap-2">
                  <Bell className="w-4 h-4 text-amber-500" />
                  Fee Reminders
                </h3>
                <span className="text-xs px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 font-medium">
                  {feeReminders.filter(r => r.status === 'overdue').length} Overdue
                </span>
              </div>
              <div className="space-y-3 max-h-72 overflow-y-auto">
                {feeReminders.map((reminder) => (
                  <div key={reminder.id} className="p-3 rounded-xl border border-border gradient-card-blue hover:shadow-sm transition-all">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${
                        reminder.status === 'overdue' ? 'bg-red-500/10 text-red-600 dark:text-red-400' :
                        reminder.status === 'pending' ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400' :
                        'bg-blue-500/10 text-blue-600 dark:text-blue-400'
                      }`}>
                        {reminder.status === 'overdue' ? 'Overdue' : reminder.status === 'pending' ? 'Pending' : 'Upcoming'}
                      </span>
                      <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                        <Send className="w-2.5 h-2.5" /> {reminder.remindersSent} sent
                      </span>
                    </div>
                    <p className="text-sm font-semibold text-foreground">{reminder.student}</p>
                    <p className="text-[11px] text-muted-foreground">{reminder.class} &bull; {reminder.amount}</p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-[10px] text-muted-foreground">Due: {reminder.dueDate}</span>
                      <button className="px-2 py-1 rounded-lg gradient-birla text-white text-[10px] font-medium hover:opacity-90 transition-opacity flex items-center gap-1">
                        <Bell className="w-2.5 h-2.5" /> Remind
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Recent Payments + Scholarship Quick */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Recent Payments */}
            <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-semibold text-foreground flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-emerald-500" />
                  Recent Payments
                </h3>
                <button className="text-xs text-birla-cyan hover:underline flex items-center gap-1">
                  View All <ChevronRight className="w-3 h-3" />
                </button>
              </div>
              <div className="space-y-2 max-h-72 overflow-y-auto">
                {recentPayments.map((payment) => (
                  <div key={payment.id} className="flex items-center justify-between p-3 rounded-xl border border-border gradient-card-blue hover:shadow-sm transition-all">
                    <div className="flex items-center gap-3">
                      <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${
                        payment.method === 'UPI' ? 'bg-purple-500/10 text-purple-600 dark:text-purple-400' :
                        payment.method === 'Net Banking' ? 'bg-blue-500/10 text-blue-600 dark:text-blue-400' :
                        payment.method === 'Card' ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' :
                        'bg-amber-500/10 text-amber-600 dark:text-amber-400'
                      }`}>
                        {payment.method === 'UPI' ? <Smartphone className="w-4 h-4" /> :
                         payment.method === 'Net Banking' ? <Building2 className="w-4 h-4" /> :
                         payment.method === 'Card' ? <CreditCard className="w-4 h-4" /> :
                         <IndianRupee className="w-4 h-4" />}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">{payment.student}</p>
                        <p className="text-[10px] text-muted-foreground">{payment.id} &bull; {payment.class}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold text-foreground">{payment.amount}</p>
                      <span className={`text-[10px] font-medium ${
                        payment.status === 'success' ? 'text-emerald-600 dark:text-emerald-400' :
                        payment.status === 'pending' ? 'text-amber-600 dark:text-amber-400' :
                        'text-red-600 dark:text-red-400'
                      }`}>
                        {payment.status === 'success' ? '✓ Success' : payment.status === 'pending' ? '⟳ Pending' : '✕ Failed'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Scholarship Overview */}
            <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-semibold text-foreground flex items-center gap-2">
                  <Award className="w-4 h-4 text-purple-500" />
                  Scholarships & Waivers
                </h3>
                <span className="text-xs px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 font-medium">
                  ₹8.2L Total
                </span>
              </div>
              <div className="space-y-2 max-h-72 overflow-y-auto">
                {scholarships.map((sch) => (
                  <div key={sch.id} className="p-3 rounded-xl border border-border gradient-card-blue hover:shadow-sm transition-all">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-purple-500/10 text-purple-600 dark:text-purple-400">
                        {sch.type}
                      </span>
                      <span className="text-[10px] text-muted-foreground">{sch.recipients} students</span>
                    </div>
                    <p className="text-sm font-semibold text-foreground">{sch.name}</p>
                    <p className="text-[11px] text-muted-foreground">{sch.eligibility}</p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-xs font-medium text-birla-gold">{sch.amount}</span>
                      <span className="text-[10px] text-muted-foreground">Disbursed: {sch.disbursed}</span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Transport Fee Integration */}
          <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-semibold text-foreground flex items-center gap-2">
                <Bus className="w-4 h-4 text-birla-cyan" />
                Transport Fee Collection by Route
              </h3>
              <span className="text-xs px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 font-medium">
                330 Students
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {transportRoutes.map((route) => (
                <div key={route.route} className="p-4 rounded-xl border border-border gradient-card-blue hover:shadow-sm transition-all">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-sm font-semibold text-foreground">{route.route}</h4>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${
                      route.collection >= 90 ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' :
                      route.collection >= 80 ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400' :
                      'bg-red-500/10 text-red-600 dark:text-red-400'
                    }`}>
                      {route.collection}%
                    </span>
                  </div>
                  <p className="text-[11px] text-muted-foreground mb-3">{route.areas}</p>
                  <div className="space-y-1.5 text-xs">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Students</span>
                      <span className="font-medium text-foreground">{route.students}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Fee/Student</span>
                      <span className="font-medium text-foreground">₹{route.fee.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Collected</span>
                      <span className="font-medium text-emerald-600 dark:text-emerald-400">{route.collected}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Pending</span>
                      <span className="font-medium text-amber-600 dark:text-amber-400">{route.pending}</span>
                    </div>
                  </div>
                  <div className="mt-3 w-full h-1.5 rounded-full bg-muted overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all"
                      style={{
                        width: `${route.collection}%`,
                        backgroundColor: route.collection >= 90 ? '#10B981' : route.collection >= 80 ? '#F59E0B' : '#EF4444',
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* ─── Fee Structure Tab ────────────────────────────── */}
      {activeTab === 'fee-structure' && (
        <motion.div variants={itemVariants} className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-semibold text-foreground flex items-center gap-2">
              <IndianRupee className="w-5 h-5 text-birla-gold" />
              Dynamic Fee Structure - Academic Year 2025-26
            </h3>
            <div className="flex items-center gap-2">
              <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg gradient-birla text-white text-xs font-medium">
                <Plus className="w-3.5 h-3.5" /> Add Fee Head
              </button>
              <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border text-xs font-medium hover:bg-muted transition-colors">
                <Download className="w-3.5 h-3.5" /> Export
              </button>
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border bg-muted/30">
                    <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Class</th>
                    <th className="text-right px-4 py-3 text-xs font-semibold text-muted-foreground">Tuition</th>
                    <th className="text-right px-4 py-3 text-xs font-semibold text-muted-foreground">Development</th>
                    <th className="text-right px-4 py-3 text-xs font-semibold text-muted-foreground">Transport</th>
                    <th className="text-right px-4 py-3 text-xs font-semibold text-muted-foreground">Lab Fee</th>
                    <th className="text-right px-4 py-3 text-xs font-semibold text-muted-foreground">Exam Fee</th>
                    <th className="text-right px-4 py-3 text-xs font-semibold text-muted-foreground">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {feeStructure.map((row, idx) => (
                    <tr key={row.class} className={`border-b border-border/50 hover:bg-muted/20 transition-colors ${idx % 2 === 0 ? '' : 'bg-muted/5'}`}>
                      <td className="px-4 py-3 text-sm font-medium text-foreground">{row.class}</td>
                      <td className="px-4 py-3 text-sm text-right text-foreground">₹{row.tuition.toLocaleString()}</td>
                      <td className="px-4 py-3 text-sm text-right text-foreground">₹{row.development.toLocaleString()}</td>
                      <td className="px-4 py-3 text-sm text-right text-foreground">₹{row.transport.toLocaleString()}</td>
                      <td className="px-4 py-3 text-sm text-right text-foreground">{row.lab ? `₹${row.lab.toLocaleString()}` : '-'}</td>
                      <td className="px-4 py-3 text-sm text-right text-foreground">₹{row.exam.toLocaleString()}</td>
                      <td className="px-4 py-3 text-sm text-right font-bold text-birla-gold">₹{row.total.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Scholarship Management */}
          <div className="rounded-2xl border border-border bg-card p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-semibold text-foreground flex items-center gap-2">
                <Award className="w-4 h-4 text-purple-500" />
                Scholarship Management
              </h3>
              <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg gradient-birla text-white text-xs font-medium">
                <Plus className="w-3.5 h-3.5" /> Add Scholarship
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border bg-muted/30">
                    <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Scholarship</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Type</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Eligibility</th>
                    <th className="text-right px-4 py-3 text-xs font-semibold text-muted-foreground">Amount</th>
                    <th className="text-right px-4 py-3 text-xs font-semibold text-muted-foreground">Recipients</th>
                    <th className="text-right px-4 py-3 text-xs font-semibold text-muted-foreground">Disbursed</th>
                    <th className="text-center px-4 py-3 text-xs font-semibold text-muted-foreground">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {scholarships.map((sch) => (
                    <tr key={sch.id} className="border-b border-border/50 hover:bg-muted/20 transition-colors">
                      <td className="px-4 py-3 text-sm font-medium text-foreground">{sch.name}</td>
                      <td className="px-4 py-3">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-purple-500/10 text-purple-600 dark:text-purple-400">
                          {sch.type}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-xs text-muted-foreground">{sch.eligibility}</td>
                      <td className="px-4 py-3 text-sm text-right font-medium text-birla-gold">{sch.amount}</td>
                      <td className="px-4 py-3 text-sm text-right text-foreground">{sch.recipients}</td>
                      <td className="px-4 py-3 text-sm text-right text-foreground">{sch.disbursed}</td>
                      <td className="px-4 py-3 text-center">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                          {sch.status}
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

      {/* ─── Payments Tab ─────────────────────────────────── */}
      {activeTab === 'payments' && (
        <motion.div variants={itemVariants} className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Payment Gateway Form */}
            <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-5">
              <h3 className="text-base font-semibold text-foreground flex items-center gap-2 mb-4">
                <CreditCard className="w-4 h-4 text-birla-cyan" />
                Online Payment Gateway
              </h3>

              {/* Payment Method Selector */}
              <div className="flex items-center gap-2 mb-5">
                {[
                  { id: 'upi', label: 'UPI', icon: Smartphone },
                  { id: 'card', label: 'Card', icon: CreditCard },
                  { id: 'netbanking', label: 'Net Banking', icon: Building2 },
                ].map((method) => {
                  const Icon = method.icon
                  return (
                    <button
                      key={method.id}
                      onClick={() => setPaymentMethod(method.id)}
                      className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-medium transition-all flex-1 justify-center ${
                        paymentMethod === method.id
                          ? 'gradient-birla text-white shadow-md'
                          : 'border border-border text-muted-foreground hover:bg-muted'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      {method.label}
                    </button>
                  )
                })}
              </div>

              {/* Student Selection */}
              <div className="space-y-3">
                <div>
                  <label className="text-xs text-muted-foreground mb-1 block">Student</label>
                  <select className="w-full px-3 py-2 rounded-lg border border-input bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-birla-gold/40">
                    <option>Priya Gupta - X-A (BOM-2025-002)</option>
                    <option>Aarav Sharma - X-A (BOM-2025-001)</option>
                    <option>Vivaan Kumar - V-A (BOM-2025-007)</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs text-muted-foreground mb-1 block">Fee Component</label>
                  <select className="w-full px-3 py-2 rounded-lg border border-input bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-birla-gold/40">
                    <option>Q4 Installment - ₹27,500</option>
                    <option>Full Year - ₹1,10,000</option>
                    <option>Tuition Only - ₹15,500</option>
                    <option>Transport Only - ₹6,000</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs text-muted-foreground mb-1 block">Amount (₹)</label>
                  <input type="text" value="27,500" readOnly className="w-full px-3 py-2 rounded-lg border border-input bg-muted text-sm text-foreground font-semibold" />
                </div>

                {/* UPI Section */}
                {paymentMethod === 'upi' && (
                  <div>
                    <label className="text-xs text-muted-foreground mb-1 block">UPI ID</label>
                    <input type="text" placeholder="example@upi" className="w-full px-3 py-2 rounded-lg border border-input bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-birla-gold/40" />
                  </div>
                )}

                {/* Card Section */}
                {paymentMethod === 'card' && (
                  <div className="space-y-3">
                    <div>
                      <label className="text-xs text-muted-foreground mb-1 block">Card Number</label>
                      <input type="text" placeholder="XXXX XXXX XXXX XXXX" className="w-full px-3 py-2 rounded-lg border border-input bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-birla-gold/40" />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-xs text-muted-foreground mb-1 block">Expiry</label>
                        <input type="text" placeholder="MM/YY" className="w-full px-3 py-2 rounded-lg border border-input bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-birla-gold/40" />
                      </div>
                      <div>
                        <label className="text-xs text-muted-foreground mb-1 block">CVV</label>
                        <input type="password" placeholder="***" className="w-full px-3 py-2 rounded-lg border border-input bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-birla-gold/40" />
                      </div>
                    </div>
                  </div>
                )}

                {/* Net Banking Section */}
                {paymentMethod === 'netbanking' && (
                  <div>
                    <label className="text-xs text-muted-foreground mb-1 block">Select Bank</label>
                    <select className="w-full px-3 py-2 rounded-lg border border-input bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-birla-gold/40">
                      <option>State Bank of India</option>
                      <option>HDFC Bank</option>
                      <option>ICICI Bank</option>
                      <option>Axis Bank</option>
                      <option>Punjab National Bank</option>
                      <option>Bank of Baroda</option>
                    </select>
                  </div>
                )}

                <button className="w-full py-3 rounded-xl gradient-birla-gold text-birla-blue text-sm font-bold hover:opacity-90 transition-opacity flex items-center justify-center gap-2 mt-2">
                  <Shield className="w-4 h-4" />
                  Pay ₹27,500 Securely
                </button>
                <p className="text-[10px] text-muted-foreground text-center flex items-center justify-center gap-1">
                  <Shield className="w-3 h-3" /> 256-bit SSL Encrypted &bull; PCI DSS Compliant
                </p>
              </div>
            </motion.div>

            {/* Receipt Preview */}
            <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-semibold text-foreground flex items-center gap-2">
                  <Receipt className="w-4 h-4 text-birla-gold" />
                  Receipt Preview
                </h3>
                <div className="flex items-center gap-2">
                  <button className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-border text-xs font-medium hover:bg-muted transition-colors">
                    <Download className="w-3.5 h-3.5" /> PDF
                  </button>
                  <button className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-border text-xs font-medium hover:bg-muted transition-colors">
                    <Printer className="w-3.5 h-3.5" /> Print
                  </button>
                </div>
              </div>

              {/* Receipt Card */}
              <div className="border-2 border-dashed border-birla-gold/30 rounded-2xl p-5 gradient-card-blue">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h4 className="text-sm font-bold text-foreground">Birla Open Minds International School</h4>
                    <p className="text-[10px] text-muted-foreground">Singur, Hooghly, West Bengal</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] font-mono text-birla-cyan">{receiptData.receiptNo}</p>
                    <p className="text-[10px] text-muted-foreground">{receiptData.date}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 mb-4 text-xs">
                  <div><span className="text-muted-foreground">Student:</span> <span className="font-medium text-foreground">{receiptData.student}</span></div>
                  <div><span className="text-muted-foreground">Class:</span> <span className="font-medium text-foreground">{receiptData.class}</span></div>
                  <div><span className="text-muted-foreground">Roll No:</span> <span className="font-medium text-foreground">{receiptData.rollNo}</span></div>
                  <div><span className="text-muted-foreground">ID:</span> <span className="font-medium text-foreground">{receiptData.studentId}</span></div>
                </div>

                <div className="border-t border-border pt-3 mb-3">
                  {receiptData.items.map((item, idx) => (
                    <div key={idx} className="flex justify-between text-xs py-1">
                      <span className="text-muted-foreground">{item.description}</span>
                      <span className="font-medium text-foreground">{item.amount}</span>
                    </div>
                  ))}
                </div>

                <div className="border-t-2 border-birla-gold/50 pt-3 flex justify-between items-center">
                  <span className="text-sm font-bold text-foreground">Total Paid</span>
                  <span className="text-lg font-bold text-birla-gold">{receiptData.total}</span>
                </div>

                <div className="mt-3 grid grid-cols-2 gap-2 text-[10px] text-muted-foreground">
                  <div>Payment: {receiptData.method}</div>
                  <div>Txn ID: {receiptData.transactionId}</div>
                  <div>AY: {receiptData.academicYear}</div>
                  <div>Status: <span className="text-emerald-600 dark:text-emerald-400 font-medium">Confirmed</span></div>
                </div>
              </div>

              {/* Bulk Receipt Options */}
              <div className="mt-4 p-3 rounded-xl border border-border bg-muted/20">
                <h4 className="text-xs font-semibold text-foreground mb-2 flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-birla-cyan" />
                  Bulk Receipt Generation
                </h4>
                <div className="flex items-center gap-2 flex-wrap">
                  <select className="px-3 py-1.5 rounded-lg border border-input bg-background text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-birla-gold/40">
                    <option>Class X-A</option>
                    <option>Class IX-B</option>
                    <option>All Classes</option>
                  </select>
                  <select className="px-3 py-1.5 rounded-lg border border-input bg-background text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-birla-gold/40">
                    <option>Q4 - Jan to Mar 2026</option>
                    <option>Q3 - Oct to Dec 2025</option>
                    <option>Full Year 2025-26</option>
                  </select>
                  <button className="flex items-center gap-1 px-3 py-1.5 rounded-lg gradient-birla text-white text-xs font-medium">
                    <Download className="w-3 h-3" /> Generate All
                  </button>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Fee Reminders Dashboard */}
          <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-semibold text-foreground flex items-center gap-2">
                <Bell className="w-4 h-4 text-amber-500" />
                Fee Reminders Dashboard
              </h3>
              <div className="flex items-center gap-2">
                <button className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-border text-xs font-medium hover:bg-muted transition-colors">
                  <Settings className="w-3.5 h-3.5" /> Auto-Reminder Settings
                </button>
                <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg gradient-birla text-white text-xs font-medium">
                  <Send className="w-3.5 h-3.5" /> Send All Reminders
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border bg-muted/30">
                    <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Student</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Class</th>
                    <th className="text-right px-4 py-3 text-xs font-semibold text-muted-foreground">Amount</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Due Date</th>
                    <th className="text-center px-4 py-3 text-xs font-semibold text-muted-foreground">Status</th>
                    <th className="text-center px-4 py-3 text-xs font-semibold text-muted-foreground">Reminders</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Parent</th>
                    <th className="text-right px-4 py-3 text-xs font-semibold text-muted-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {feeReminders.map((reminder) => (
                    <tr key={reminder.id} className="border-b border-border/50 hover:bg-muted/20 transition-colors">
                      <td className="px-4 py-3 text-sm font-medium text-foreground">{reminder.student}</td>
                      <td className="px-4 py-3 text-sm text-foreground">{reminder.class}</td>
                      <td className="px-4 py-3 text-sm text-right font-semibold text-birla-gold">{reminder.amount}</td>
                      <td className="px-4 py-3 text-xs text-foreground">{reminder.dueDate}</td>
                      <td className="px-4 py-3 text-center">
                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium ${
                          reminder.status === 'overdue' ? 'bg-red-500/10 text-red-600 dark:text-red-400' :
                          reminder.status === 'pending' ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400' :
                          'bg-blue-500/10 text-blue-600 dark:text-blue-400'
                        }`}>
                          {reminder.status === 'overdue' ? <AlertTriangle className="w-3 h-3" /> : null}
                          {reminder.status.charAt(0).toUpperCase() + reminder.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-center text-xs text-foreground">{reminder.remindersSent}</td>
                      <td className="px-4 py-3">
                        <div>
                          <p className="text-xs text-foreground">{reminder.parent}</p>
                          <p className="text-[10px] text-muted-foreground">{reminder.phone}</p>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center justify-end gap-1">
                          <button className="p-1.5 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors" title="Send SMS">
                            <Phone className="w-3.5 h-3.5" />
                          </button>
                          <button className="p-1.5 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors" title="Send Email">
                            <Mail className="w-3.5 h-3.5" />
                          </button>
                          <button className="p-1.5 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors" title="WhatsApp">
                            <MessageSquare className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* ─── Analytics Tab ─────────────────────────────────── */}
      {activeTab === 'analytics' && (
        <motion.div variants={itemVariants} className="space-y-6">
          <h3 className="text-base font-semibold text-foreground flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-birla-cyan" />
            Financial Analytics
          </h3>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Monthly Income vs Expenses */}
            <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-5">
              <h4 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-emerald-500" />
                Income vs Expenses Trend
              </h4>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={monthlyIncomeExpenses} barGap={4}>
                    <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'} />
                    <XAxis dataKey="month" tick={{ fontSize: 10 }} stroke={darkMode ? '#64748b' : '#94a3b8'} />
                    <YAxis tick={{ fontSize: 10 }} stroke={darkMode ? '#64748b' : '#94a3b8'} tickFormatter={(v) => `₹${(v / 100000).toFixed(0)}L`} />
                    <Tooltip contentStyle={tooltipStyle} formatter={(value) => [`₹${(value / 100000).toFixed(1)}L`, '']} />
                    <Legend iconType="circle" wrapperStyle={{ fontSize: '11px' }} />
                    <Bar dataKey="income" fill="#10B981" radius={[4, 4, 0, 0]} name="Income" />
                    <Bar dataKey="expenses" fill="#EF4444" radius={[4, 4, 0, 0]} name="Expenses" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </motion.div>

            {/* Expense Breakdown Pie */}
            <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-5">
              <h4 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
                <PieChartIcon className="w-4 h-4 text-birla-gold" />
                Expense Breakdown
              </h4>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={expenseBreakdown} cx="50%" cy="50%" outerRadius={100} innerRadius={55} dataKey="value" label={({ name, value }) => `${name} ${value}%`} labelLine={true} paddingAngle={2}>
                      {expenseBreakdown.map((entry, idx) => (
                        <Cell key={idx} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={tooltipStyle} formatter={(value) => [`${value}%`, '']} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </motion.div>
          </div>

          {/* Collection Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: 'Q1 Collection', value: '₹1.24Cr', target: '₹1.30Cr', percent: 95, color: '#10B981' },
              { label: 'Q2 Collection', value: '₹1.18Cr', target: '₹1.30Cr', percent: 91, color: '#22D3EE' },
              { label: 'Q3 Collection', value: '₹1.21Cr', target: '₹1.30Cr', percent: 93, color: '#C8A45C' },
              { label: 'Q4 Collection', value: '₹0.95Cr', target: '₹1.30Cr', percent: 73, color: '#8B5CF6' },
            ].map((q) => (
              <div key={q.label} className="rounded-xl border border-border bg-card p-4">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-xs text-muted-foreground">{q.label}</p>
                  <span className="text-xs font-medium" style={{ color: q.color }}>{q.percent}%</span>
                </div>
                <p className="text-lg font-bold text-foreground">{q.value}</p>
                <p className="text-[10px] text-muted-foreground mb-2">Target: {q.target}</p>
                <div className="w-full h-1.5 rounded-full bg-muted overflow-hidden">
                  <div className="h-full rounded-full transition-all" style={{ width: `${q.percent}%`, backgroundColor: q.color }} />
                </div>
              </div>
            ))}
          </div>

          {/* Payment Method Analytics */}
          <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-5">
            <h4 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
              <Globe className="w-4 h-4 text-purple-500" />
              Payment Method Distribution
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {[
                { method: 'UPI', percent: 42, transactions: 1847, volume: '₹1.92Cr', icon: Smartphone, color: 'text-purple-500 bg-purple-500/10' },
                { method: 'Net Banking', percent: 28, transactions: 1232, volume: '₹1.28Cr', icon: Building2, color: 'text-blue-500 bg-blue-500/10' },
                { method: 'Card', percent: 18, transactions: 792, volume: '₹82L', icon: CreditCard, color: 'text-emerald-500 bg-emerald-500/10' },
                { method: 'Cash/Cheque', percent: 12, transactions: 528, volume: '₹56L', icon: IndianRupee, color: 'text-amber-500 bg-amber-500/10' },
              ].map((pm) => {
                const Icon = pm.icon
                return (
                  <div key={pm.method} className="p-4 rounded-xl border border-border gradient-card-blue hover:shadow-sm transition-all">
                    <div className="flex items-center gap-3 mb-3">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${pm.color}`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-foreground">{pm.method}</p>
                        <p className="text-[10px] text-muted-foreground">{pm.transactions} transactions</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-lg font-bold text-foreground">{pm.volume}</span>
                      <span className="text-xs font-medium text-muted-foreground">{pm.percent}%</span>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-muted overflow-hidden">
                      <div className="h-full rounded-full gradient-birla-gold" style={{ width: `${pm.percent}%` }} />
                    </div>
                  </div>
                )
              })}
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* ─── Expenses Tab ──────────────────────────────────── */}
      {activeTab === 'expenses' && (
        <motion.div variants={itemVariants} className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-semibold text-foreground flex items-center gap-2">
              <Wallet className="w-5 h-5 text-rose-500" />
              Expense Management & Budget Tracking
            </h3>
            <div className="flex items-center gap-2">
              <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg gradient-birla text-white text-xs font-medium">
                <Plus className="w-3.5 h-3.5" /> New Expense
              </button>
              <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border text-xs font-medium hover:bg-muted transition-colors">
                <Download className="w-3.5 h-3.5" /> Export Report
              </button>
            </div>
          </div>

          {/* Budget vs Actual Table */}
          <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card overflow-hidden">
            <div className="p-4 border-b border-border bg-muted/30">
              <h4 className="text-sm font-semibold text-foreground flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-birla-cyan" />
                Budget vs Actual - FY 2025-26
              </h4>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border bg-muted/20">
                    <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Category</th>
                    <th className="text-right px-4 py-3 text-xs font-semibold text-muted-foreground">Budget</th>
                    <th className="text-right px-4 py-3 text-xs font-semibold text-muted-foreground">Actual</th>
                    <th className="text-right px-4 py-3 text-xs font-semibold text-muted-foreground">Variance</th>
                    <th className="text-center px-4 py-3 text-xs font-semibold text-muted-foreground">Utilization</th>
                    <th className="text-center px-4 py-3 text-xs font-semibold text-muted-foreground">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {expenseCategories.map((cat) => (
                    <tr key={cat.id} className="border-b border-border/50 hover:bg-muted/20 transition-colors">
                      <td className="px-4 py-3 text-sm font-medium text-foreground">{cat.category}</td>
                      <td className="px-4 py-3 text-sm text-right text-foreground">{cat.budget}</td>
                      <td className="px-4 py-3 text-sm text-right text-foreground">{cat.actual}</td>
                      <td className="px-4 py-3 text-sm text-right">
                        <span className={cat.status === 'over' ? 'text-red-600 dark:text-red-400 font-medium' : 'text-emerald-600 dark:text-emerald-400 font-medium'}>
                          {cat.variance}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center justify-center gap-2">
                          <div className="w-20 h-1.5 rounded-full bg-muted overflow-hidden">
                            <div
                              className="h-full rounded-full"
                              style={{
                                width: `${Math.min(cat.percent, 100)}%`,
                                backgroundColor: cat.percent > 100 ? '#EF4444' : cat.percent > 90 ? '#F59E0B' : '#10B981',
                              }}
                            />
                          </div>
                          <span className="text-xs text-foreground w-8">{cat.percent}%</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${
                          cat.status === 'over' ? 'bg-red-500/10 text-red-600 dark:text-red-400' : 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                        }`}>
                          {cat.status === 'over' ? 'Over Budget' : 'Under Budget'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="p-4 border-t border-border bg-muted/20">
              <div className="flex items-center justify-between text-sm">
                <span className="font-semibold text-foreground">Total Budget: ₹1,25,00,000</span>
                <span className="font-semibold text-foreground">Total Actual: ₹1,20,70,000</span>
                <span className="font-medium text-emerald-600 dark:text-emerald-400">Saved: ₹4,30,000</span>
              </div>
            </div>
          </motion.div>

          {/* Expense Approval Workflow */}
          <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-5">
            <h4 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
              <Shield className="w-4 h-4 text-birla-gold" />
              Expense Approval Workflow
            </h4>
            <div className="space-y-3">
              {[
                { id: 'EXP-001', title: 'Smart Board Installation - Class XII', amount: '₹3,45,000', requestedBy: 'Mr. Rajesh Kumar (Admin)', date: 'Mar 1, 2026', status: 'pending_hod', level: 'HOD Approval' },
                { id: 'EXP-002', title: 'Annual Day Event Expenses', amount: '₹1,80,000', requestedBy: 'Ms. Ananya Das (Cultural)', date: 'Feb 28, 2026', status: 'pending_accounts', level: 'Accounts Verification' },
                { id: 'EXP-003', title: 'Chemistry Lab Refurbishment', amount: '₹5,20,000', requestedBy: 'Dr. Suresh Nair (HOD Science)', date: 'Feb 25, 2026', status: 'pending_principal', level: 'Principal Approval' },
                { id: 'EXP-004', title: 'Staff Welfare - Health Checkup Camp', amount: '₹92,000', requestedBy: 'Mrs. Kavitha Reddy (HR)', date: 'Feb 22, 2026', status: 'approved', level: 'Disbursed' },
                { id: 'EXP-005', title: 'Sports Equipment - Cricket Kit', amount: '₹48,000', requestedBy: 'Mr. Vikram Singh (Sports)', date: 'Feb 20, 2026', status: 'approved', level: 'Disbursed' },
              ].map((exp) => (
                <div key={exp.id} className="p-4 rounded-xl border border-border gradient-card-blue hover:shadow-sm transition-all">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono text-birla-cyan">{exp.id}</span>
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${
                          exp.status === 'approved' ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' :
                          exp.status === 'pending_accounts' ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400' :
                          exp.status === 'pending_principal' ? 'bg-purple-500/10 text-purple-600 dark:text-purple-400' :
                          'bg-blue-500/10 text-blue-600 dark:text-blue-400'
                        }`}>
                          {exp.level}
                        </span>
                      </div>
                      <p className="text-sm font-semibold text-foreground mt-1">{exp.title}</p>
                      <p className="text-[11px] text-muted-foreground">{exp.requestedBy} &bull; {exp.date}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-bold text-birla-gold">{exp.amount}</span>
                      {exp.status !== 'approved' && (
                        <div className="flex items-center gap-1">
                          <button className="px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[10px] font-medium hover:bg-emerald-500/20 transition-colors">
                            Approve
                          </button>
                          <button className="px-2.5 py-1 rounded-lg bg-red-500/10 text-red-600 dark:text-red-400 text-[10px] font-medium hover:bg-red-500/20 transition-colors">
                            Reject
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  )
}
