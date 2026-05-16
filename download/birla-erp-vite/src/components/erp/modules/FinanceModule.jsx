import { useState } from 'react'
import { motion } from 'framer-motion'
import { IndianRupee, CreditCard, Clock, AlertTriangle, CheckCircle2, TrendingUp, TrendingDown, ArrowUpRight, Download, Printer, Send, Eye, Plus, Search, Filter, Wallet, Receipt, PieChart as PieChartIcon, BarChart3, FileText, Bus, Award, Users, Calendar, Bell, Settings, ChevronRight, XCircle, Shield, Smartphone, Building2, Phone, Mail, MapPin, Zap, Globe, ChevronLeft, MessageSquare, Save, CheckSquare, Layers, Target, Banknote, FileSpreadsheet, BookOpen, FileBarChart, DollarSign, HandCoins, Landmark, Calculator, BadgePercent, Truck, GraduationCap, ClipboardList, Share2, Copy, Check, X } from 'lucide-react'
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Legend, PieChart, Pie, Cell, LineChart, Line
} from 'recharts'
import useAppStore from '../../../store/useAppStore'
import QRStudentLookup from '../shared/QRStudentLookup'
import PrintableDocument from '../shared/PrintableDocument'

// ─── Animation variants ──────────────────────────────────────────
const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.06 } },
}
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
}

// ─── Mock Data ────────────────────────────────────────────────────
const topStats = [
  { label: 'Total Collection', value: '₹4.58Cr', change: '+12.4%', icon: IndianRupee, gradient: 'from-emerald-900 to-emerald-600', glow: 'shadow-emerald-800/20' },
  { label: 'Pending Fees', value: '₹32.4L', change: '142 students', icon: Clock, gradient: 'from-amber-900 to-amber-600', glow: 'shadow-amber-800/20' },
  { label: 'Scholarship', value: '₹8.2L', change: '24 students', icon: Award, gradient: 'from-purple-900 to-purple-600', glow: 'shadow-purple-800/20' },
  { label: 'Expenses', value: '₹1.24Cr', change: '-3.2% vs last', icon: TrendingDown, gradient: 'from-rose-900 to-rose-600', glow: 'shadow-rose-800/20' },
]

const feeStructure = [
  { class: 'Nursery', tuition: 42000, development: 8000, transport: 18000, lab: 0, exam: 2000, annual: 5000, total: 75000 },
  { class: 'LKG', tuition: 44000, development: 8000, transport: 18000, lab: 0, exam: 2000, annual: 5000, total: 77000 },
  { class: 'UKG', tuition: 46000, development: 8000, transport: 18000, lab: 0, exam: 2000, annual: 5000, total: 79000 },
  { class: 'I', tuition: 48000, development: 10000, transport: 20000, lab: 3000, exam: 2500, annual: 6000, total: 89500 },
  { class: 'II', tuition: 48000, development: 10000, transport: 20000, lab: 3000, exam: 2500, annual: 6000, total: 89500 },
  { class: 'III', tuition: 50000, development: 10000, transport: 20000, lab: 3500, exam: 2500, annual: 6000, total: 92000 },
  { class: 'IV', tuition: 50000, development: 10000, transport: 20000, lab: 3500, exam: 2500, annual: 6000, total: 92000 },
  { class: 'V', tuition: 52000, development: 12000, transport: 22000, lab: 4000, exam: 3000, annual: 7000, total: 100000 },
  { class: 'VI', tuition: 54000, development: 12000, transport: 22000, lab: 4000, exam: 3000, annual: 7000, total: 102000 },
  { class: 'VII', tuition: 56000, development: 12000, transport: 22000, lab: 4500, exam: 3000, annual: 7000, total: 104500 },
  { class: 'VIII', tuition: 58000, development: 14000, transport: 24000, lab: 5000, exam: 3500, annual: 8000, total: 112500 },
  { class: 'IX', tuition: 60000, development: 14000, transport: 24000, lab: 5000, exam: 3500, annual: 8000, total: 114500 },
  { class: 'X', tuition: 62000, development: 15000, transport: 24000, lab: 5000, exam: 4000, annual: 8000, total: 118000 },
  { class: 'XI (Sci)', tuition: 68000, development: 16000, transport: 26000, lab: 8000, exam: 4500, annual: 10000, total: 132500 },
  { class: 'XI (Comm)', tuition: 64000, development: 16000, transport: 26000, lab: 4000, exam: 4500, annual: 10000, total: 124500 },
  { class: 'XII (Sci)', tuition: 70000, development: 16000, transport: 26000, lab: 8000, exam: 5000, annual: 10000, total: 135000 },
  { class: 'XII (Comm)', tuition: 66000, development: 16000, transport: 26000, lab: 4000, exam: 5000, annual: 10000, total: 127000 },
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

const recentPayments = [
  { id: 'PAY-2026-0847', student: 'Priya Gupta', class: 'X-A', bspId: 'BSP-2025-002', penNo: 'PEN-XA-002', upparId: 'UPP-002', amount: '₹1,10,000', method: 'UPI', date: 'Mar 4, 2026', status: 'success' },
  { id: 'PAY-2026-0846', student: 'Vivaan Kumar', class: 'V-A', bspId: 'BSP-2025-007', penNo: 'PEN-VA-007', upparId: 'UPP-007', amount: '₹93,000', method: 'Net Banking', date: 'Mar 4, 2026', status: 'success' },
  { id: 'PAY-2026-0845', student: 'Ananya Iyer', class: 'VIII-A', bspId: 'BSP-2025-012', penNo: 'PEN-VIIIA-012', upparId: 'UPP-012', amount: '₹1,04,500', method: 'Card', date: 'Mar 3, 2026', status: 'success' },
  { id: 'PAY-2026-0844', student: 'Aditya Singh', class: 'III-B', bspId: 'BSP-2025-018', penNo: 'PEN-IIIB-018', upparId: 'UPP-018', amount: '₹21,500', method: 'UPI', date: 'Mar 3, 2026', status: 'pending' },
  { id: 'PAY-2026-0843', student: 'Kavya Joshi', class: 'II-A', bspId: 'BSP-2025-023', penNo: 'PEN-IIA-023', upparId: 'UPP-023', amount: '₹41,750', method: 'Cash', date: 'Mar 2, 2026', status: 'success' },
  { id: 'PAY-2026-0842', student: 'Rohan Patel', class: 'VII-A', bspId: 'BSP-2025-031', penNo: 'PEN-VIIA-031', upparId: 'UPP-031', amount: '₹24,375', method: 'UPI', date: 'Mar 2, 2026', status: 'failed' },
]

// ─── Report Data ──────────────────────────────────────────────────
const feeCollectionReport = [
  { month: 'Apr', collected: 3850000, target: 4000000 },
  { month: 'May', collected: 4120000, target: 4000000 },
  { month: 'Jun', collected: 3450000, target: 4000000 },
  { month: 'Jul', collected: 4680000, target: 4200000 },
  { month: 'Aug', collected: 3950000, target: 4200000 },
  { month: 'Sep', collected: 4200000, target: 4200000 },
  { month: 'Oct', collected: 4500000, target: 4500000 },
  { month: 'Nov', collected: 3800000, target: 4500000 },
  { month: 'Dec', collected: 3600000, target: 4500000 },
  { month: 'Jan', collected: 4300000, target: 4500000 },
  { month: 'Feb', collected: 4100000, target: 4500000 },
  { month: 'Mar', collected: 5200000, target: 5000000 },
]

const feeDefaultData = [
  { student: 'Aarav Sharma', bspId: 'BSP-2025-001', penNo: 'PEN-XA-001', upparId: 'UPP-001', class: 'X-A', pending: 27500 },
  { student: 'Arjun Reddy', bspId: 'BSP-2025-045', penNo: 'PEN-IXB-045', upparId: 'UPP-045', class: 'IX-B', pending: 26625 },
  { student: 'Rohan Patel', bspId: 'BSP-2025-031', penNo: 'PEN-VIIA-031', upparId: 'UPP-031', class: 'VII-A', pending: 24375 },
  { student: 'Meera Nair', bspId: 'BSP-2025-056', penNo: 'PEN-IVA-056', upparId: 'UPP-056', class: 'IV-A', pending: 21500 },
  { student: 'Kavya Joshi', bspId: 'BSP-2025-023', penNo: 'PEN-IIA-023', upparId: 'UPP-023', class: 'II-A', pending: 20875 },
  { student: 'Ishita Banerjee', bspId: 'BSP-2025-067', penNo: 'PEN-VIB-067', upparId: 'UPP-067', class: 'VI-B', pending: 23750 },
  { student: 'Nikhil Das', bspId: 'BSP-2025-078', penNo: 'PEN-VIIIA-078', upparId: 'UPP-078', class: 'VIII-A', pending: 28125 },
  { student: 'Sneha Pillai', bspId: 'BSP-2025-089', penNo: 'PEN-XIB-089', upparId: 'UPP-089', class: 'XI-B', pending: 33125 },
]

const paymentModeData = [
  { name: 'UPI', value: 42, color: '#8B5CF6' },
  { name: 'Net Banking', value: 23, color: '#0A1628' },
  { name: 'Card', value: 18, color: '#22D3EE' },
  { name: 'Cash', value: 12, color: '#C8A45C' },
  { name: 'Cheque', value: 5, color: '#10B981' },
]

const scholarshipReportData = [
  { type: 'Merit', disbursed: 200000, recipients: 8 },
  { type: 'Means', disbursed: 180000, recipients: 6 },
  { type: 'Sports', disbursed: 75000, recipients: 5 },
  { type: 'Staff Ward', disbursed: 60000, recipients: 2 },
  { type: 'Sibling', disbursed: 45000, recipients: 3 },
]

const expenseCategoryData = [
  { category: 'Salary', amount: 6650000, color: '#0A1628' },
  { category: 'Maintenance', amount: 1140000, color: '#22D3EE' },
  { category: 'Utilities', amount: 860000, color: '#C8A45C' },
  { category: 'Supplies', amount: 420000, color: '#8B5CF6' },
  { category: 'Transport', amount: 690000, color: '#10B981' },
  { category: 'Events', amount: 380000, color: '#F59E0B' },
  { category: 'Infrastructure', amount: 250000, color: '#EF4444' },
  { category: 'Other', amount: 180000, color: '#64748B' },
]

const budgetVsActualData = [
  { department: 'Teaching', budget: 6800000, actual: 6650000 },
  { department: 'Admin', budget: 1800000, actual: 1780000 },
  { department: 'Infrastructure', budget: 1200000, actual: 1140000 },
  { department: 'Utilities', budget: 800000, actual: 860000 },
  { department: 'Lab', budget: 500000, actual: 420000 },
  { department: 'Sports', budget: 400000, actual: 380000 },
  { department: 'Transport', budget: 700000, actual: 690000 },
  { department: 'Digital', budget: 300000, actual: 250000 },
]

const transportFeeReportData = [
  { route: 'Route 1-Singur', collected: 1452000, pending: 440000 },
  { route: 'Route 2-Chandannagar', collected: 1848000, pending: 120000 },
  { route: 'Route 3-Srirampore', collected: 990000, pending: 110000 },
  { route: 'Route 4-Hooghly', collected: 882000, pending: 210000 },
  { route: 'Route 5-Bardhaman', collected: 840000, pending: 224000 },
  { route: 'Route 6-Tarakeswar', collected: 972000, pending: 108000 },
]

const yoyCollectionData = [
  { year: 'FY 22-23', q1: 9500000, q2: 10200000, q3: 10800000, q4: 11200000 },
  { year: 'FY 23-24', q1: 10800000, q2: 11500000, q3: 12200000, q4: 12600000 },
  { year: 'FY 24-25', q1: 12400000, q2: 13200000, q3: 13800000, q4: 14200000 },
  { year: 'FY 25-26', q1: 13200000, q2: 14100000, q3: 14800000, q4: 0 },
]

// ─── Reusable Components ─────────────────────────────────────────
const COLORS = ['#0A1628', '#22D3EE', '#C8A45C', '#8B5CF6', '#10B981', '#F59E0B', '#EF4444', '#64748B']

function FormField({ label, children }) {
  return (
    <div>
      <label className="text-xs text-muted-foreground mb-1 block">{label}</label>
      {children}
    </div>
  )
}

function InputField({ value, onChange, placeholder, type = 'text' }) {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full px-3 py-2 rounded-lg border border-input bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-birla-gold/40"
    />
  )
}

function SelectField({ value, onChange, options }) {
  return (
    <select
      value={value}
      onChange={onChange}
      className="w-full px-3 py-2 rounded-lg border border-input bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-birla-gold/40"
    >
      {options.map((opt) => (
        <option key={opt} value={opt}>{opt}</option>
      ))}
    </select>
  )
}

function StudentUDISE({ bspId, penNo, upparId }) {
  return (
    <div className="flex flex-wrap gap-2 mt-1">
      <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 font-medium">BSP: {bspId}</span>
      <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-medium">PEN: {penNo}</span>
      <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 font-medium">Uppar: {upparId}</span>
    </div>
  )
}

// ─── Main Component ───────────────────────────────────────────────
export default function FinanceModule() {
  const { darkMode } = useAppStore()
  const [activeTab, setActiveTab] = useState('overview')
  const [activeForm, setActiveForm] = useState(0)
  const [activeReport, setActiveReport] = useState(0)

  // Form States
  const [feePayment, setFeePayment] = useState({ studentName: '', feeType: 'Tuition', amount: '', paymentMode: 'Cash', transactionId: '', receiptNo: '', date: '', academicYear: '2025-26', remarks: '' })
  const [feeStructureForm, setFeeStructureForm] = useState({ campus: 'Singur', class: '', tuitionFee: '', developmentFee: '', transportFee: '', labFee: '', examFee: '', annualFee: '', totalFee: '', effectiveFrom: '' })
  const [scholarshipForm, setScholarshipForm] = useState({ studentName: '', scholarshipType: 'Merit', percentage: '', eligibilityCriteria: '', documentsSubmitted: '', approvedBy: '', validFrom: '', validTo: '' })
  const [feeWaiverForm, setFeeWaiverForm] = useState({ studentName: '', waiverType: 'Full', waiverAmount: '', reason: '', approvedBy: '', academicYear: '2025-26' })
  const [expenseForm, setExpenseForm] = useState({ category: 'Salary', amount: '', vendor: '', invoiceNo: '', date: '', paymentMode: 'Cash', approvalStatus: 'Pending', remarks: '' })
  const [budgetForm, setBudgetForm] = useState({ department: '', category: '', allocatedAmount: '', spentAmount: '', balance: '', financialYear: '2025-26' })
  const [bulkReceipt, setBulkReceipt] = useState({ class: '', section: '', feeType: 'Tuition', fromMonth: 'April', toMonth: 'March', })

  // Fee Receipt States
  const [generatedReceipt, setGeneratedReceipt] = useState(null)
  const [showReceiptModal, setShowReceiptModal] = useState(false)
  const [shareOption, setShareOption] = useState(null) // 'whatsapp', 'email', null
  const [shareEmail, setShareEmail] = useState('')
  const [sharePhone, setSharePhone] = useState('')
  const [shareSent, setShareSent] = useState(false)
  const [receiptCopied, setReceiptCopied] = useState(false)
  const [allReceipts, setAllReceipts] = useState([
    { id: 'RCP-2026-0847', studentName: 'Priya Gupta', class: 'X-A', bspId: 'BSP-2025-002', penNo: 'PEN-XA-002', upparId: 'UPP-002', feeType: 'Tuition', amount: 62000, paymentMode: 'UPI', transactionId: 'UPI20260304567', date: '2026-03-04', academicYear: '2025-26', status: 'Paid' },
    { id: 'RCP-2026-0846', studentName: 'Vivaan Kumar', class: 'V-A', bspId: 'BSP-2025-007', penNo: 'PEN-VA-007', upparId: 'UPP-007', feeType: 'Development', amount: 12000, paymentMode: 'Net Banking', transactionId: 'NB20260304123', date: '2026-03-04', academicYear: '2025-26', status: 'Paid' },
    { id: 'RCP-2026-0845', studentName: 'Ananya Iyer', class: 'VIII-A', bspId: 'BSP-2025-012', penNo: 'PEN-VIIIA-012', upparId: 'UPP-012', feeType: 'Transport', amount: 24000, paymentMode: 'Card', transactionId: 'CD20260303890', date: '2026-03-03', academicYear: '2025-26', status: 'Paid' },
    { id: 'RCP-2026-0844', studentName: 'Aditya Singh', class: 'III-B', bspId: 'BSP-2025-018', penNo: 'PEN-IIIB-018', upparId: 'UPP-018', feeType: 'Exam', amount: 2500, paymentMode: 'UPI', transactionId: 'UPI20260303456', date: '2026-03-03', academicYear: '2025-26', status: 'Pending' },
    { id: 'RCP-2026-0843', studentName: 'Kavya Joshi', class: 'II-A', bspId: 'BSP-2025-023', penNo: 'PEN-IIA-023', upparId: 'UPP-023', feeType: 'Annual', amount: 6000, paymentMode: 'Cash', transactionId: 'CASH-20260302', date: '2026-03-02', academicYear: '2025-26', status: 'Paid' },
  ])
  const [receiptSearch, setReceiptSearch] = useState('')
  const [selectedReceiptForReprint, setSelectedReceiptForReprint] = useState(null)

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'fee-structure', label: 'Fee Structure', icon: IndianRupee },
    { id: 'payments', label: 'Payments', icon: CreditCard },
    { id: 'analytics', label: 'Analytics', icon: TrendingUp },
    { id: 'expenses', label: 'Expenses', icon: Wallet },
    { id: 'receipts', label: 'Receipts', icon: Receipt },
    { id: 'forms', label: 'Forms', icon: ClipboardList },
    { id: 'reports', label: 'Reports', icon: FileBarChart },
  ]

  const forms = [
    { name: 'Fee Payment Collection', icon: IndianRupee },
    { name: 'Fee Structure Setup', icon: Landmark },
    { name: 'Scholarship Application', icon: Award },
    { name: 'Fee Waiver', icon: BadgePercent },
    { name: 'Expense Entry', icon: Receipt },
    { name: 'Budget Allocation', icon: Calculator },
    { name: 'Bulk Fee Receipt', icon: FileSpreadsheet },
  ]

  const reports = [
    { name: 'Fee Collection Report', icon: BarChart3 },
    { name: 'Fee Default Report', icon: AlertTriangle },
    { name: 'Payment Mode Distribution', icon: PieChartIcon },
    { name: 'Scholarship Report', icon: Award },
    { name: 'Expense Category Report', icon: Wallet },
    { name: 'Budget vs Actual Report', icon: Target },
    { name: 'Transport Fee Report', icon: Bus },
    { name: 'Year-over-Year Collection', icon: TrendingUp },
  ]

  const tooltipStyle = {
    backgroundColor: darkMode ? '#1A2D4A' : '#fff',
    border: `1px solid ${darkMode ? 'rgba(255,255,255,0.1)' : '#e2e8f0'}`,
    borderRadius: '12px',
    fontSize: '12px',
    color: darkMode ? '#e2e8f0' : '#1e293b',
  }

  // QR-selected student for fee forms
  const [selectedFeeStudent, setSelectedFeeStudent] = useState(null)

  const autoCalcTotal = () => {
    const t = Number(feeStructureForm.tuitionFee) || 0
    const d = Number(feeStructureForm.developmentFee) || 0
    const tr = Number(feeStructureForm.transportFee) || 0
    const l = Number(feeStructureForm.labFee) || 0
    const e = Number(feeStructureForm.examFee) || 0
    const a = Number(feeStructureForm.annualFee) || 0
    return t + d + tr + l + e + a
  }

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="show" className="p-4 lg:p-6 space-y-6 max-w-[1600px] mx-auto">
      {/* ─── Tab Navigation ──────────────────────────────── */}
      <motion.div variants={itemVariants} className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
        {tabs.map((tab) => {
          const Icon = tab.icon
          return (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${activeTab === tab.id ? 'gradient-birla text-white shadow-md' : 'border border-border text-muted-foreground hover:bg-muted hover:text-foreground'}`}>
              <Icon className="w-3.5 h-3.5" /> {tab.label}
            </button>
          )
        })}
      </motion.div>

      {/* ═══════════════════════════════════════════════════════════════
          OVERVIEW TAB
      ═══════════════════════════════════════════════════════════════ */}
      {activeTab === 'overview' && (
        <motion.div variants={itemVariants} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {topStats.map((card) => {
              const Icon = card.icon
              return (
                <motion.div key={card.label} variants={itemVariants} className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${card.gradient} p-5 text-white shadow-xl ${card.glow}`}>
                  <div className="absolute top-0 right-0 w-24 h-24 rounded-full bg-white/5 -translate-y-6 translate-x-6" />
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-3">
                      <div className="w-10 h-10 rounded-xl bg-white/15 backdrop-blur-sm flex items-center justify-center"><Icon className="w-5 h-5" /></div>
                      <span className="inline-flex items-center gap-0.5 text-xs font-medium px-2 py-0.5 rounded-full bg-white/10 text-white/80"><ArrowUpRight className="w-3 h-3" />{card.change}</span>
                    </div>
                    <p className="text-2xl font-bold">{card.value}</p>
                    <p className="text-sm text-white/70 mt-0.5">{card.label}</p>
                  </div>
                </motion.div>
              )
            })}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <motion.div variants={itemVariants} className="lg:col-span-2 rounded-2xl border border-border bg-card p-5">
              <h3 className="text-base font-semibold text-foreground flex items-center gap-2 mb-4"><TrendingUp className="w-4 h-4 text-birla-cyan" />Monthly Income vs Expenses</h3>
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

            <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-5">
              <h3 className="text-base font-semibold text-foreground flex items-center gap-2 mb-4"><PieChartIcon className="w-4 h-4 text-birla-gold" />Expense Breakdown</h3>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={expenseBreakdown} cx="50%" cy="45%" innerRadius={50} outerRadius={80} dataKey="value" label={({ name, value }) => `${name}: ${value}%`}>
                      {expenseBreakdown.map((entry, idx) => <Cell key={idx} fill={entry.color} />)}
                    </Pie>
                    <Tooltip contentStyle={tooltipStyle} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </motion.div>
          </div>

          {/* Recent Payments */}
          <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-5">
            <h3 className="text-base font-semibold text-foreground flex items-center gap-2 mb-4"><CreditCard className="w-4 h-4 text-emerald-500" />Recent Payments</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border bg-muted/30">
                    <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Student</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">UDISE+ IDs</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Amount</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Method</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Date</th>
                    <th className="text-center px-4 py-3 text-xs font-semibold text-muted-foreground">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recentPayments.map((p) => (
                    <tr key={p.id} className="border-b border-border/50 hover:bg-muted/20 transition-colors">
                      <td className="px-4 py-3"><p className="text-sm font-medium text-foreground">{p.student}</p><p className="text-[10px] text-muted-foreground">{p.class} &bull; {p.id}</p></td>
                      <td className="px-4 py-3"><StudentUDISE bspId={p.bspId} penNo={p.penNo} upparId={p.upparId} /></td>
                      <td className="px-4 py-3 text-sm font-semibold text-foreground">{p.amount}</td>
                      <td className="px-4 py-3"><span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-muted text-foreground">{p.method}</span></td>
                      <td className="px-4 py-3 text-xs text-muted-foreground">{p.date}</td>
                      <td className="px-4 py-3 text-center"><span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${p.status === 'success' ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' : p.status === 'pending' ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400' : 'bg-red-500/10 text-red-600 dark:text-red-400'}`}>{p.status}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* ═══════════════════════════════════════════════════════════════
          FEE STRUCTURE TAB
      ═══════════════════════════════════════════════════════════════ */}
      {activeTab === 'fee-structure' && (
        <motion.div variants={itemVariants} className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-semibold text-foreground flex items-center gap-2"><IndianRupee className="w-5 h-5 text-birla-gold" />Fee Structure - AY 2025-26</h3>
            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg gradient-birla text-white text-xs font-medium"><Download className="w-3.5 h-3.5" /> Export</button>
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
                    <th className="text-right px-4 py-3 text-xs font-semibold text-muted-foreground">Annual</th>
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
                      <td className="px-4 py-3 text-sm text-right text-foreground">₹{row.annual.toLocaleString()}</td>
                      <td className="px-4 py-3 text-sm text-right font-bold text-birla-gold">₹{row.total.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>
      )}

      {/* ═══════════════════════════════════════════════════════════════
          PAYMENTS TAB
      ═══════════════════════════════════════════════════════════════ */}
      {activeTab === 'payments' && (
        <motion.div variants={itemVariants} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { label: 'Today', value: '₹4,52,000', count: '12 payments', icon: CreditCard, color: 'emerald' },
              { label: 'This Week', value: '₹18,65,000', count: '47 payments', icon: Calendar, color: 'blue' },
              { label: 'This Month', value: '₹52,10,000', count: '134 payments', icon: IndianRupee, color: 'purple' },
            ].map((item) => {
              const Icon = item.icon
              return (
                <motion.div key={item.label} variants={itemVariants} className="rounded-2xl border border-border bg-card p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`w-10 h-10 rounded-xl bg-${item.color}-500/10 flex items-center justify-center`}><Icon className={`w-5 h-5 text-${item.color}-500`} /></div>
                    <div><p className="text-xs text-muted-foreground">{item.label}</p><p className="text-lg font-bold text-foreground">{item.value}</p></div>
                  </div>
                  <p className="text-xs text-muted-foreground">{item.count}</p>
                </motion.div>
              )
            })}
          </div>
          <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-5">
            <h3 className="text-base font-semibold text-foreground flex items-center gap-2 mb-4"><CreditCard className="w-4 h-4 text-birla-cyan" />Payment Records</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border bg-muted/30">
                    <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Txn ID</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Student</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">UDISE+ IDs</th>
                    <th className="text-right px-4 py-3 text-xs font-semibold text-muted-foreground">Amount</th>
                    <th className="text-center px-4 py-3 text-xs font-semibold text-muted-foreground">Method</th>
                    <th className="text-center px-4 py-3 text-xs font-semibold text-muted-foreground">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recentPayments.map((p) => (
                    <tr key={p.id} className="border-b border-border/50 hover:bg-muted/20 transition-colors">
                      <td className="px-4 py-3 text-xs font-mono text-muted-foreground">{p.id}</td>
                      <td className="px-4 py-3"><p className="text-sm font-medium text-foreground">{p.student}</p><p className="text-[10px] text-muted-foreground">{p.class}</p></td>
                      <td className="px-4 py-3"><StudentUDISE bspId={p.bspId} penNo={p.penNo} upparId={p.upparId} /></td>
                      <td className="px-4 py-3 text-sm font-semibold text-right text-foreground">{p.amount}</td>
                      <td className="px-4 py-3 text-center"><span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-muted text-foreground">{p.method}</span></td>
                      <td className="px-4 py-3 text-center"><span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${p.status === 'success' ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' : p.status === 'pending' ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400' : 'bg-red-500/10 text-red-600 dark:text-red-400'}`}>{p.status}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* ═══════════════════════════════════════════════════════════════
          ANALYTICS TAB
      ═══════════════════════════════════════════════════════════════ */}
      {activeTab === 'analytics' && (
        <motion.div variants={itemVariants} className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-5">
              <h3 className="text-base font-semibold text-foreground flex items-center gap-2 mb-4"><TrendingUp className="w-4 h-4 text-emerald-500" />Collection Trend</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={monthlyIncomeExpenses}>
                    <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'} />
                    <XAxis dataKey="month" tick={{ fontSize: 10 }} stroke={darkMode ? '#64748b' : '#94a3b8'} />
                    <YAxis tick={{ fontSize: 10 }} stroke={darkMode ? '#64748b' : '#94a3b8'} tickFormatter={(v) => `₹${(v / 100000).toFixed(0)}L`} />
                    <Tooltip contentStyle={tooltipStyle} formatter={(v) => [`₹${(v / 100000).toFixed(1)}L`]} />
                    <Area type="monotone" dataKey="income" stroke="#10B981" fill="rgba(16,185,129,0.1)" strokeWidth={2} name="Income" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </motion.div>
            <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-5">
              <h3 className="text-base font-semibold text-foreground flex items-center gap-2 mb-4"><PieChartIcon className="w-4 h-4 text-purple-500" />Payment Mode Split</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={paymentModeData} cx="50%" cy="50%" innerRadius={45} outerRadius={80} dataKey="value" label={({ name, value }) => `${name}: ${value}%`}>
                      {paymentModeData.map((entry, idx) => <Cell key={idx} fill={entry.color} />)}
                    </Pie>
                    <Tooltip contentStyle={tooltipStyle} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}

      {/* ═══════════════════════════════════════════════════════════════
          EXPENSES TAB
      ═══════════════════════════════════════════════════════════════ */}
      {activeTab === 'expenses' && (
        <motion.div variants={itemVariants} className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-5">
              <h3 className="text-base font-semibold text-foreground flex items-center gap-2 mb-4"><Wallet className="w-4 h-4 text-birla-cyan" />Expense Categories</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={expenseCategoryData} cx="50%" cy="50%" innerRadius={45} outerRadius={80} dataKey="amount" label={({ category }) => category}>
                      {expenseCategoryData.map((entry, idx) => <Cell key={idx} fill={entry.color} />)}
                    </Pie>
                    <Tooltip contentStyle={tooltipStyle} formatter={(v) => [`₹${(v / 100000).toFixed(1)}L`]} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </motion.div>
            <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-5">
              <h3 className="text-base font-semibold text-foreground flex items-center gap-2 mb-4"><BarChart3 className="w-4 h-4 text-birla-gold" />Budget vs Actual</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={budgetVsActualData}>
                    <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'} />
                    <XAxis dataKey="department" tick={{ fontSize: 9 }} stroke={darkMode ? '#64748b' : '#94a3b8'} />
                    <YAxis tick={{ fontSize: 9 }} stroke={darkMode ? '#64748b' : '#94a3b8'} tickFormatter={(v) => `₹${(v / 100000).toFixed(0)}L`} />
                    <Tooltip contentStyle={tooltipStyle} formatter={(v) => [`₹${(v / 100000).toFixed(1)}L`]} />
                    <Bar dataKey="budget" fill="#C8A45C" name="Budget" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="actual" fill="#22D3EE" name="Actual" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}

      {/* ═══════════════════════════════════════════════════════════════
          RECEIPTS TAB
      ═══════════════════════════════════════════════════════════════ */}
      {activeTab === 'receipts' && (
        <motion.div variants={itemVariants} className="space-y-6">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <h3 className="text-base font-semibold text-foreground flex items-center gap-2"><Receipt className="w-5 h-5 text-birla-gold" />Fee Receipts</h3>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text"
                  value={receiptSearch}
                  onChange={(e) => setReceiptSearch(e.target.value)}
                  placeholder="Search receipts..."
                  className="pl-9 pr-3 py-2 rounded-lg border border-input bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-birla-gold/40 w-56"
                />
              </div>
            </div>
          </div>

          {/* Receipt Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { label: 'Total Receipts', value: allReceipts.length, icon: Receipt, color: 'emerald' },
              { label: 'Total Collected', value: `₹${allReceipts.reduce((s, r) => s + r.amount, 0).toLocaleString('en-IN')}`, icon: IndianRupee, color: 'purple' },
              { label: 'Pending', value: allReceipts.filter(r => r.status === 'Pending').length, icon: Clock, color: 'amber' },
            ].map((item) => {
              const Icon = item.icon
              return (
                <motion.div key={item.label} variants={itemVariants} className="rounded-2xl border border-border bg-card p-5">
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`w-10 h-10 rounded-xl bg-${item.color}-500/10 flex items-center justify-center`}><Icon className={`w-5 h-5 text-${item.color}-500`} /></div>
                    <div><p className="text-xs text-muted-foreground">{item.label}</p><p className="text-lg font-bold text-foreground">{item.value}</p></div>
                  </div>
                </motion.div>
              )
            })}
          </div>

          {/* Receipts Table */}
          <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border bg-muted/30">
                    <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Receipt No</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Student</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Class</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">BSP ID</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Fee Type</th>
                    <th className="text-right px-4 py-3 text-xs font-semibold text-muted-foreground">Amount</th>
                    <th className="text-center px-4 py-3 text-xs font-semibold text-muted-foreground">Mode</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Date</th>
                    <th className="text-center px-4 py-3 text-xs font-semibold text-muted-foreground">Status</th>
                    <th className="text-center px-4 py-3 text-xs font-semibold text-muted-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {allReceipts
                    .filter(r => {
                      if (!receiptSearch) return true
                      const q = receiptSearch.toLowerCase()
                      return r.studentName.toLowerCase().includes(q) || r.id.toLowerCase().includes(q) || r.class.toLowerCase().includes(q)
                    })
                    .map((r, idx) => (
                    <tr key={r.id + idx} className="border-b border-border/50 hover:bg-muted/20 transition-colors">
                      <td className="px-4 py-3 text-xs font-mono font-medium text-foreground">{r.id}</td>
                      <td className="px-4 py-3 text-sm font-medium text-foreground">{r.studentName}</td>
                      <td className="px-4 py-3 text-xs text-muted-foreground">{r.class}</td>
                      <td className="px-4 py-3 text-xs text-muted-foreground">{r.bspId}</td>
                      <td className="px-4 py-3"><span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-birla-gold/10 text-birla-gold">{r.feeType}</span></td>
                      <td className="px-4 py-3 text-sm font-semibold text-right text-foreground">₹{r.amount.toLocaleString('en-IN')}</td>
                      <td className="px-4 py-3 text-center"><span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-muted text-foreground">{r.paymentMode}</span></td>
                      <td className="px-4 py-3 text-xs text-muted-foreground">{r.date}</td>
                      <td className="px-4 py-3 text-center"><span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${r.status === 'Paid' ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' : 'bg-amber-500/10 text-amber-600 dark:text-amber-400'}`}>{r.status}</span></td>
                      <td className="px-4 py-3">
                        <div className="flex items-center justify-center gap-1">
                          <button onClick={() => { setGeneratedReceipt(r); setSelectedReceiptForReprint(r); setShowReceiptModal(true) }} className="p-1.5 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-foreground" title="View / Print"><Eye className="w-3.5 h-3.5" /></button>
                          <button onClick={() => { setGeneratedReceipt(r); setShareOption('whatsapp'); setSharePhone(''); setShareSent(false) }} className="p-1.5 rounded-lg hover:bg-green-500/10 transition-colors text-green-600 dark:text-green-400" title="Share via WhatsApp"><MessageSquare className="w-3.5 h-3.5" /></button>
                          <button onClick={() => { setGeneratedReceipt(r); setShareOption('email'); setShareEmail(''); setShareSent(false) }} className="p-1.5 rounded-lg hover:bg-blue-500/10 transition-colors text-blue-600 dark:text-blue-400" title="Share via Email"><Mail className="w-3.5 h-3.5" /></button>
                          <button onClick={() => { navigator.clipboard.writeText(r.id); setReceiptCopied(true); setTimeout(() => setReceiptCopied(false), 2000) }} className="p-1.5 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-foreground" title="Copy Receipt No">{receiptCopied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}</button>
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

      {/* ═══════════════════════════════════════════════════════════════
          FORMS TAB
      ═══════════════════════════════════════════════════════════════ */}
      {activeTab === 'forms' && (
        <motion.div variants={itemVariants} className="space-y-6">
          <div className="flex items-center gap-2 overflow-x-auto pb-2">
            {forms.map((f, idx) => {
              const Icon = f.icon
              return (
                <button key={idx} onClick={() => setActiveForm(idx)} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${activeForm === idx ? 'gradient-birla text-white shadow-md' : 'border border-border text-muted-foreground hover:bg-muted'}`}>
                  <Icon className="w-3.5 h-3.5" /> {f.name}
                </button>
              )
            })}
          </div>

          {/* Form 1: Fee Payment Collection */}
          {activeForm === 0 && (
            <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-6">
              <h3 className="text-lg font-semibold text-foreground flex items-center gap-2 mb-6"><IndianRupee className="w-5 h-5 text-birla-gold" />Fee Payment Collection Form</h3>
              <div className="mb-4">
                  <QRStudentLookup
                    onStudentSelect={(student) => {
                      setSelectedFeeStudent(student)
                      if (student) setFeePayment({...feePayment, studentName: student.name})
                    }}
                    label="Student Identification (QR / ID)"
                    placeholder="Scan QR or search student for fee collection"
                  />
                </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <FormField label="Student Name">
                  <InputField value={feePayment.studentName} onChange={(e) => setFeePayment({ ...feePayment, studentName: e.target.value })} placeholder="Enter student name" />
                  {(selectedFeeStudent || feePayment.studentName) && <StudentUDISE bspId={selectedFeeStudent?.bspId || 'BSP-2025-001'} penNo={selectedFeeStudent?.penNo || 'PEN-XA-001'} upparId={selectedFeeStudent?.upparId || 'UPP-001'} />}
                </FormField>
                <FormField label="Fee Type">
                  <SelectField value={feePayment.feeType} onChange={(e) => setFeePayment({ ...feePayment, feeType: e.target.value })} options={['Tuition', 'Development', 'Transport', 'Lab', 'Exam', 'Annual']} />
                </FormField>
                <FormField label="Amount (₹)">
                  <InputField value={feePayment.amount} onChange={(e) => setFeePayment({ ...feePayment, amount: e.target.value })} placeholder="Enter amount" type="number" />
                </FormField>
                <FormField label="Payment Mode">
                  <SelectField value={feePayment.paymentMode} onChange={(e) => setFeePayment({ ...feePayment, paymentMode: e.target.value })} options={['Cash', 'UPI', 'NetBanking', 'Card', 'Cheque']} />
                </FormField>
                <FormField label="Transaction ID">
                  <InputField value={feePayment.transactionId} onChange={(e) => setFeePayment({ ...feePayment, transactionId: e.target.value })} placeholder="TXN number" />
                </FormField>
                <FormField label="Receipt No">
                  <InputField value={feePayment.receiptNo} onChange={(e) => setFeePayment({ ...feePayment, receiptNo: e.target.value })} placeholder="Receipt number" />
                </FormField>
                <FormField label="Date">
                  <InputField value={feePayment.date} onChange={(e) => setFeePayment({ ...feePayment, date: e.target.value })} placeholder="" type="date" />
                </FormField>
                <FormField label="Academic Year">
                  <SelectField value={feePayment.academicYear} onChange={(e) => setFeePayment({ ...feePayment, academicYear: e.target.value })} options={['2025-26', '2024-25', '2023-24']} />
                </FormField>
                <FormField label="Remarks">
                  <InputField value={feePayment.remarks} onChange={(e) => setFeePayment({ ...feePayment, remarks: e.target.value })} placeholder="Any remarks" />
                </FormField>
              </div>
              <div className="mt-6 flex justify-end">
                <button onClick={() => {
                  const receiptNo = `RCP-2026-${String(Math.floor(Math.random() * 9999)).padStart(4, '0')}`
                  const newReceipt = {
                    id: receiptNo,
                    studentName: feePayment.studentName || 'Student',
                    class: selectedFeeStudent ? `${selectedFeeStudent.class}-${selectedFeeStudent.section}` : '',
                    bspId: selectedFeeStudent?.bspId || 'BSP-2025-001',
                    penNo: selectedFeeStudent?.penNo || 'PEN-XA-001',
                    upparId: selectedFeeStudent?.upparId || 'UPP-001',
                    feeType: feePayment.feeType,
                    amount: Number(feePayment.amount) || 0,
                    paymentMode: feePayment.paymentMode,
                    transactionId: feePayment.transactionId || '-',
                    date: feePayment.date || new Date().toISOString().split('T')[0],
                    academicYear: feePayment.academicYear,
                    status: 'Paid',
                  }
                  setGeneratedReceipt(newReceipt)
                  setAllReceipts(prev => [newReceipt, ...prev])
                  setShowReceiptModal(true)
                  setSelectedFeeStudent(null)
                }} className="px-6 py-2.5 rounded-xl gradient-birla-gold text-birla-blue text-sm font-bold hover:opacity-90 transition-opacity flex items-center gap-2"><Save className="w-4 h-4" />Collect Payment & Generate Receipt</button>
              </div>
            </motion.div>
          )}

          {/* Form 2: Fee Structure Setup */}
          {activeForm === 1 && (
            <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-6">
              <h3 className="text-lg font-semibold text-foreground flex items-center gap-2 mb-6"><Landmark className="w-5 h-5 text-birla-gold" />Fee Structure Setup Form</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <FormField label="Campus">
                  <SelectField value={feeStructureForm.campus} onChange={(e) => setFeeStructureForm({ ...feeStructureForm, campus: e.target.value })} options={['Singur', 'Chandannagar', 'Srirampore']} />
                </FormField>
                <FormField label="Class">
                  <InputField value={feeStructureForm.class} onChange={(e) => setFeeStructureForm({ ...feeStructureForm, class: e.target.value })} placeholder="e.g. V, X, XII (Sci)" />
                </FormField>
                <FormField label="Tuition Fee (₹)">
                  <InputField value={feeStructureForm.tuitionFee} onChange={(e) => setFeeStructureForm({ ...feeStructureForm, tuitionFee: e.target.value })} placeholder="0" type="number" />
                </FormField>
                <FormField label="Development Fee (₹)">
                  <InputField value={feeStructureForm.developmentFee} onChange={(e) => setFeeStructureForm({ ...feeStructureForm, developmentFee: e.target.value })} placeholder="0" type="number" />
                </FormField>
                <FormField label="Transport Fee (₹)">
                  <InputField value={feeStructureForm.transportFee} onChange={(e) => setFeeStructureForm({ ...feeStructureForm, transportFee: e.target.value })} placeholder="0" type="number" />
                </FormField>
                <FormField label="Lab Fee (₹)">
                  <InputField value={feeStructureForm.labFee} onChange={(e) => setFeeStructureForm({ ...feeStructureForm, labFee: e.target.value })} placeholder="0" type="number" />
                </FormField>
                <FormField label="Exam Fee (₹)">
                  <InputField value={feeStructureForm.examFee} onChange={(e) => setFeeStructureForm({ ...feeStructureForm, examFee: e.target.value })} placeholder="0" type="number" />
                </FormField>
                <FormField label="Annual Fee (₹)">
                  <InputField value={feeStructureForm.annualFee} onChange={(e) => setFeeStructureForm({ ...feeStructureForm, annualFee: e.target.value })} placeholder="0" type="number" />
                </FormField>
                <FormField label="Total Fee (₹) - Auto Calculated">
                  <input type="text" value={`₹${autoCalcTotal().toLocaleString()}`} readOnly className="w-full px-3 py-2 rounded-lg border border-input bg-muted text-sm text-foreground font-bold" />
                </FormField>
                <FormField label="Effective From">
                  <InputField value={feeStructureForm.effectiveFrom} onChange={(e) => setFeeStructureForm({ ...feeStructureForm, effectiveFrom: e.target.value })} placeholder="" type="date" />
                </FormField>
              </div>
              <div className="mt-6 flex justify-end">
                <button onClick={() => alert('Fee Structure saved successfully!')} className="px-6 py-2.5 rounded-xl gradient-birla-gold text-birla-blue text-sm font-bold hover:opacity-90 transition-opacity flex items-center gap-2"><Save className="w-4 h-4" />Save Fee Structure</button>
              </div>
            </motion.div>
          )}

          {/* Form 3: Scholarship Application */}
          {activeForm === 2 && (
            <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-6">
              <h3 className="text-lg font-semibold text-foreground flex items-center gap-2 mb-6"><Award className="w-5 h-5 text-purple-500" />Scholarship Application Form</h3>
              <div className="mb-4">
                  <QRStudentLookup
                    onStudentSelect={(student) => {
                      if (student) setScholarshipForm({...scholarshipForm, studentName: student.name})
                    }}
                    label="Student Identification (QR / ID)"
                    placeholder="Scan QR or search student for scholarship"
                  />
                </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <FormField label="Student Name">
                  <InputField value={scholarshipForm.studentName} onChange={(e) => setScholarshipForm({ ...scholarshipForm, studentName: e.target.value })} placeholder="Enter student name" />
                  {scholarshipForm.studentName && <StudentUDISE bspId="BSP-2025-005" penNo="PEN-IXA-005" upparId="UPP-005" />}
                </FormField>
                <FormField label="Scholarship Type">
                  <SelectField value={scholarshipForm.scholarshipType} onChange={(e) => setScholarshipForm({ ...scholarshipForm, scholarshipType: e.target.value })} options={['Merit', 'Means', 'Both']} />
                </FormField>
                <FormField label="Percentage (%)">
                  <InputField value={scholarshipForm.percentage} onChange={(e) => setScholarshipForm({ ...scholarshipForm, percentage: e.target.value })} placeholder="e.g. 50" type="number" />
                </FormField>
                <FormField label="Eligibility Criteria">
                  <InputField value={scholarshipForm.eligibilityCriteria} onChange={(e) => setScholarshipForm({ ...scholarshipForm, eligibilityCriteria: e.target.value })} placeholder="Describe eligibility" />
                </FormField>
                <FormField label="Documents Submitted">
                  <InputField value={scholarshipForm.documentsSubmitted} onChange={(e) => setScholarshipForm({ ...scholarshipForm, documentsSubmitted: e.target.value })} placeholder="e.g. Income cert, Marksheet" />
                </FormField>
                <FormField label="Approved By">
                  <InputField value={scholarshipForm.approvedBy} onChange={(e) => setScholarshipForm({ ...scholarshipForm, approvedBy: e.target.value })} placeholder="Approver name" />
                </FormField>
                <FormField label="Valid From">
                  <InputField value={scholarshipForm.validFrom} onChange={(e) => setScholarshipForm({ ...scholarshipForm, validFrom: e.target.value })} placeholder="" type="date" />
                </FormField>
                <FormField label="Valid To">
                  <InputField value={scholarshipForm.validTo} onChange={(e) => setScholarshipForm({ ...scholarshipForm, validTo: e.target.value })} placeholder="" type="date" />
                </FormField>
              </div>
              <div className="mt-6 flex justify-end">
                <button onClick={() => alert('Scholarship Application submitted successfully!')} className="px-6 py-2.5 rounded-xl gradient-birla-gold text-birla-blue text-sm font-bold hover:opacity-90 transition-opacity flex items-center gap-2"><Save className="w-4 h-4" />Submit Application</button>
              </div>
            </motion.div>
          )}

          {/* Form 4: Fee Waiver */}
          {activeForm === 3 && (
            <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-6">
              <h3 className="text-lg font-semibold text-foreground flex items-center gap-2 mb-6"><BadgePercent className="w-5 h-5 text-emerald-500" />Fee Waiver Form</h3>
              <div className="mb-4">
                  <QRStudentLookup
                    onStudentSelect={(student) => {
                      if (student) setFeeWaiverForm({...feeWaiverForm, studentName: student.name})
                    }}
                    label="Student Identification (QR / ID)"
                    placeholder="Scan QR or search student for fee waiver"
                  />
                </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <FormField label="Student Name">
                  <InputField value={feeWaiverForm.studentName} onChange={(e) => setFeeWaiverForm({ ...feeWaiverForm, studentName: e.target.value })} placeholder="Enter student name" />
                  {feeWaiverForm.studentName && <StudentUDISE bspId="BSP-2025-012" penNo="PEN-VIB-012" upparId="UPP-012" />}
                </FormField>
                <FormField label="Waiver Type">
                  <SelectField value={feeWaiverForm.waiverType} onChange={(e) => setFeeWaiverForm({ ...feeWaiverForm, waiverType: e.target.value })} options={['Full', 'Partial']} />
                </FormField>
                <FormField label="Waiver Amount (₹)">
                  <InputField value={feeWaiverForm.waiverAmount} onChange={(e) => setFeeWaiverForm({ ...feeWaiverForm, waiverAmount: e.target.value })} placeholder="0" type="number" />
                </FormField>
                <FormField label="Reason">
                  <InputField value={feeWaiverForm.reason} onChange={(e) => setFeeWaiverForm({ ...feeWaiverForm, reason: e.target.value })} placeholder="Reason for waiver" />
                </FormField>
                <FormField label="Approved By">
                  <InputField value={feeWaiverForm.approvedBy} onChange={(e) => setFeeWaiverForm({ ...feeWaiverForm, approvedBy: e.target.value })} placeholder="Approver name" />
                </FormField>
                <FormField label="Academic Year">
                  <SelectField value={feeWaiverForm.academicYear} onChange={(e) => setFeeWaiverForm({ ...feeWaiverForm, academicYear: e.target.value })} options={['2025-26', '2024-25']} />
                </FormField>
              </div>
              <div className="mt-6 flex justify-end">
                <button onClick={() => alert('Fee Waiver applied successfully!')} className="px-6 py-2.5 rounded-xl gradient-birla-gold text-birla-blue text-sm font-bold hover:opacity-90 transition-opacity flex items-center gap-2"><Save className="w-4 h-4" />Apply Waiver</button>
              </div>
            </motion.div>
          )}

          {/* Form 5: Expense Entry */}
          {activeForm === 4 && (
            <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-6">
              <h3 className="text-lg font-semibold text-foreground flex items-center gap-2 mb-6"><Receipt className="w-5 h-5 text-rose-500" />Expense Entry Form</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <FormField label="Category">
                  <SelectField value={expenseForm.category} onChange={(e) => setExpenseForm({ ...expenseForm, category: e.target.value })} options={['Salary', 'Maintenance', 'Utilities', 'Supplies', 'Transport', 'Events', 'Infrastructure', 'Other']} />
                </FormField>
                <FormField label="Amount (₹)">
                  <InputField value={expenseForm.amount} onChange={(e) => setExpenseForm({ ...expenseForm, amount: e.target.value })} placeholder="0" type="number" />
                </FormField>
                <FormField label="Vendor">
                  <InputField value={expenseForm.vendor} onChange={(e) => setExpenseForm({ ...expenseForm, vendor: e.target.value })} placeholder="Vendor name" />
                </FormField>
                <FormField label="Invoice No">
                  <InputField value={expenseForm.invoiceNo} onChange={(e) => setExpenseForm({ ...expenseForm, invoiceNo: e.target.value })} placeholder="INV-001" />
                </FormField>
                <FormField label="Date">
                  <InputField value={expenseForm.date} onChange={(e) => setExpenseForm({ ...expenseForm, date: e.target.value })} placeholder="" type="date" />
                </FormField>
                <FormField label="Payment Mode">
                  <SelectField value={expenseForm.paymentMode} onChange={(e) => setExpenseForm({ ...expenseForm, paymentMode: e.target.value })} options={['Cash', 'UPI', 'NetBanking', 'Card', 'Cheque']} />
                </FormField>
                <FormField label="Approval Status">
                  <SelectField value={expenseForm.approvalStatus} onChange={(e) => setExpenseForm({ ...expenseForm, approvalStatus: e.target.value })} options={['Pending', 'Approved', 'Rejected']} />
                </FormField>
                <FormField label="Remarks">
                  <InputField value={expenseForm.remarks} onChange={(e) => setExpenseForm({ ...expenseForm, remarks: e.target.value })} placeholder="Any remarks" />
                </FormField>
              </div>
              <div className="mt-6 flex justify-end">
                <button onClick={() => alert('Expense submitted successfully!')} className="px-6 py-2.5 rounded-xl gradient-birla-gold text-birla-blue text-sm font-bold hover:opacity-90 transition-opacity flex items-center gap-2"><Save className="w-4 h-4" />Submit Expense</button>
              </div>
            </motion.div>
          )}

          {/* Form 6: Budget Allocation */}
          {activeForm === 5 && (
            <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-6">
              <h3 className="text-lg font-semibold text-foreground flex items-center gap-2 mb-6"><Calculator className="w-5 h-5 text-blue-500" />Budget Allocation Form</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <FormField label="Department">
                  <InputField value={budgetForm.department} onChange={(e) => setBudgetForm({ ...budgetForm, department: e.target.value })} placeholder="e.g. Teaching, Admin" />
                </FormField>
                <FormField label="Category">
                  <InputField value={budgetForm.category} onChange={(e) => setBudgetForm({ ...budgetForm, category: e.target.value })} placeholder="e.g. Salaries, Maintenance" />
                </FormField>
                <FormField label="Allocated Amount (₹)">
                  <InputField value={budgetForm.allocatedAmount} onChange={(e) => setBudgetForm({ ...budgetForm, allocatedAmount: e.target.value, balance: String(Number(e.target.value || 0) - Number(budgetForm.spentAmount || 0)) })} placeholder="0" type="number" />
                </FormField>
                <FormField label="Spent Amount (₹) - Auto">
                  <input type="text" value={`₹${Number(budgetForm.spentAmount || 0).toLocaleString()}`} readOnly className="w-full px-3 py-2 rounded-lg border border-input bg-muted text-sm text-foreground" />
                </FormField>
                <FormField label="Balance (₹) - Auto">
                  <input type="text" value={`₹${(Number(budgetForm.allocatedAmount || 0) - Number(budgetForm.spentAmount || 0)).toLocaleString()}`} readOnly className="w-full px-3 py-2 rounded-lg border border-input bg-muted text-sm text-foreground font-bold" />
                </FormField>
                <FormField label="Financial Year">
                  <SelectField value={budgetForm.financialYear} onChange={(e) => setBudgetForm({ ...budgetForm, financialYear: e.target.value })} options={['2025-26', '2024-25']} />
                </FormField>
              </div>
              <div className="mt-6 flex justify-end">
                <button onClick={() => alert('Budget saved successfully!')} className="px-6 py-2.5 rounded-xl gradient-birla-gold text-birla-blue text-sm font-bold hover:opacity-90 transition-opacity flex items-center gap-2"><Save className="w-4 h-4" />Save Budget</button>
              </div>
            </motion.div>
          )}

          {/* Form 7: Bulk Fee Receipt */}
          {activeForm === 6 && (
            <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-6">
              <h3 className="text-lg font-semibold text-foreground flex items-center gap-2 mb-6"><FileSpreadsheet className="w-5 h-5 text-indigo-500" />Bulk Fee Receipt Generation</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <FormField label="Class">
                  <SelectField value={bulkReceipt.class} onChange={(e) => setBulkReceipt({ ...bulkReceipt, class: e.target.value })} options={['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII']} />
                </FormField>
                <FormField label="Section">
                  <SelectField value={bulkReceipt.section} onChange={(e) => setBulkReceipt({ ...bulkReceipt, section: e.target.value })} options={['A', 'B', 'C', 'All']} />
                </FormField>
                <FormField label="Fee Type">
                  <SelectField value={bulkReceipt.feeType} onChange={(e) => setBulkReceipt({ ...bulkReceipt, feeType: e.target.value })} options={['Tuition', 'Development', 'Transport', 'Lab', 'Exam', 'Annual', 'All']} />
                </FormField>
                <FormField label="From Month">
                  <SelectField value={bulkReceipt.fromMonth} onChange={(e) => setBulkReceipt({ ...bulkReceipt, fromMonth: e.target.value })} options={['April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December', 'January', 'February', 'March']} />
                </FormField>
                <FormField label="To Month">
                  <SelectField value={bulkReceipt.toMonth} onChange={(e) => setBulkReceipt({ ...bulkReceipt, toMonth: e.target.value })} options={['April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December', 'January', 'February', 'March']} />
                </FormField>
              </div>
              <div className="mt-6 flex justify-end gap-3">
                <button onClick={() => alert('Bulk Receipts generated successfully!')} className="px-6 py-2.5 rounded-xl gradient-birla text-white text-sm font-bold hover:opacity-90 transition-opacity flex items-center gap-2"><Printer className="w-4 h-4" />Generate Bulk Receipts</button>
              </div>
            </motion.div>
          )}
        </motion.div>
      )}

      {/* ═══════════════════════════════════════════════════════════════
          REPORTS TAB
      ═══════════════════════════════════════════════════════════════ */}
      {activeTab === 'reports' && (
        <motion.div variants={itemVariants} className="space-y-6">
          <div className="flex items-center gap-2 overflow-x-auto pb-2">
            {reports.map((r, idx) => {
              const Icon = r.icon
              return (
                <button key={idx} onClick={() => setActiveReport(idx)} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${activeReport === idx ? 'gradient-birla text-white shadow-md' : 'border border-border text-muted-foreground hover:bg-muted'}`}>
                  <Icon className="w-3.5 h-3.5" /> {r.name}
                </button>
              )
            })}
          </div>

          {/* Report 1: Fee Collection Report */}
          {activeReport === 0 && (
            <motion.div variants={itemVariants} className="space-y-4">
              <div className="rounded-2xl border border-border bg-card p-5">
                <h3 className="text-base font-semibold text-foreground flex items-center gap-2 mb-4"><BarChart3 className="w-4 h-4 text-birla-cyan" />Fee Collection Report - Monthly</h3>
                <div className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={feeCollectionReport}>
                      <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'} />
                      <XAxis dataKey="month" tick={{ fontSize: 10 }} stroke={darkMode ? '#64748b' : '#94a3b8'} />
                      <YAxis tick={{ fontSize: 10 }} stroke={darkMode ? '#64748b' : '#94a3b8'} tickFormatter={(v) => `₹${(v / 100000).toFixed(0)}L`} />
                      <Tooltip contentStyle={tooltipStyle} formatter={(v) => [`₹${(v / 100000).toFixed(1)}L`]} />
                      <Legend iconType="circle" wrapperStyle={{ fontSize: '11px' }} />
                      <Area type="monotone" dataKey="collected" stroke="#10B981" fill="rgba(16,185,129,0.1)" strokeWidth={2} name="Collected" />
                      <Area type="monotone" dataKey="target" stroke="#C8A45C" fill="rgba(200,164,92,0.1)" strokeWidth={2} name="Target" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
              <div className="rounded-2xl border border-border bg-card overflow-hidden">
                <table className="w-full">
                  <thead><tr className="border-b border-border bg-muted/30">
                    <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Month</th>
                    <th className="text-right px-4 py-3 text-xs font-semibold text-muted-foreground">Collected</th>
                    <th className="text-right px-4 py-3 text-xs font-semibold text-muted-foreground">Target</th>
                    <th className="text-right px-4 py-3 text-xs font-semibold text-muted-foreground">Variance</th>
                    <th className="text-center px-4 py-3 text-xs font-semibold text-muted-foreground">%</th>
                  </tr></thead>
                  <tbody>
                    {feeCollectionReport.map((r) => {
                      const variance = r.collected - r.target
                      const pct = ((r.collected / r.target) * 100).toFixed(1)
                      return (
                        <tr key={r.month} className="border-b border-border/50 hover:bg-muted/20">
                          <td className="px-4 py-3 text-sm font-medium text-foreground">{r.month}</td>
                          <td className="px-4 py-3 text-sm text-right text-foreground">₹{(r.collected / 100000).toFixed(1)}L</td>
                          <td className="px-4 py-3 text-sm text-right text-muted-foreground">₹{(r.target / 100000).toFixed(1)}L</td>
                          <td className={`px-4 py-3 text-sm text-right font-medium ${variance >= 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'}`}>{variance >= 0 ? '+' : ''}₹{(variance / 100000).toFixed(1)}L</td>
                          <td className="px-4 py-3 text-center"><span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${Number(pct) >= 100 ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' : 'bg-amber-500/10 text-amber-600 dark:text-amber-400'}`}>{pct}%</span></td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}

          {/* Report 2: Fee Default Report */}
          {activeReport === 1 && (
            <motion.div variants={itemVariants} className="space-y-4">
              <div className="rounded-2xl border border-border bg-card p-5">
                <h3 className="text-base font-semibold text-foreground flex items-center gap-2 mb-4"><AlertTriangle className="w-4 h-4 text-amber-500" />Fee Default Report</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={feeDefaultData}>
                      <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'} />
                      <XAxis dataKey="student" tick={{ fontSize: 9 }} stroke={darkMode ? '#64748b' : '#94a3b8'} />
                      <YAxis tick={{ fontSize: 10 }} stroke={darkMode ? '#64748b' : '#94a3b8'} tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}K`} />
                      <Tooltip contentStyle={tooltipStyle} formatter={(v) => [`₹${v.toLocaleString()}`, 'Pending']} />
                      <Bar dataKey="pending" fill="#EF4444" radius={[4, 4, 0, 0]} name="Pending" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
              <div className="rounded-2xl border border-border bg-card overflow-hidden">
                <table className="w-full">
                  <thead><tr className="border-b border-border bg-muted/30">
                    <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Student</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">BSP ID</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">PEN No</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Uppar ID</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Class</th>
                    <th className="text-right px-4 py-3 text-xs font-semibold text-muted-foreground">Pending (₹)</th>
                  </tr></thead>
                  <tbody>
                    {feeDefaultData.map((d) => (
                      <tr key={d.bspId} className="border-b border-border/50 hover:bg-muted/20">
                        <td className="px-4 py-3 text-sm font-medium text-foreground">{d.student}</td>
                        <td className="px-4 py-3 text-xs text-blue-600 dark:text-blue-400 font-mono">{d.bspId}</td>
                        <td className="px-4 py-3 text-xs text-emerald-600 dark:text-emerald-400 font-mono">{d.penNo}</td>
                        <td className="px-4 py-3 text-xs text-amber-600 dark:text-amber-400 font-mono">{d.upparId}</td>
                        <td className="px-4 py-3 text-sm text-muted-foreground">{d.class}</td>
                        <td className="px-4 py-3 text-sm text-right font-bold text-red-600 dark:text-red-400">₹{d.pending.toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}

          {/* Report 3: Payment Mode Distribution */}
          {activeReport === 2 && (
            <motion.div variants={itemVariants} className="space-y-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="rounded-2xl border border-border bg-card p-5">
                  <h3 className="text-base font-semibold text-foreground flex items-center gap-2 mb-4"><PieChartIcon className="w-4 h-4 text-purple-500" />Payment Mode Distribution</h3>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie data={paymentModeData} cx="50%" cy="50%" innerRadius={50} outerRadius={85} dataKey="value" label={({ name, value }) => `${name}: ${value}%`}>
                          {paymentModeData.map((entry, idx) => <Cell key={idx} fill={entry.color} />)}
                        </Pie>
                        <Tooltip contentStyle={tooltipStyle} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
                <div className="rounded-2xl border border-border bg-card overflow-hidden">
                  <table className="w-full">
                    <thead><tr className="border-b border-border bg-muted/30">
                      <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Payment Mode</th>
                      <th className="text-right px-4 py-3 text-xs font-semibold text-muted-foreground">% Share</th>
                      <th className="text-right px-4 py-3 text-xs font-semibold text-muted-foreground">Amount (₹)</th>
                    </tr></thead>
                    <tbody>
                      {paymentModeData.map((d) => (
                        <tr key={d.name} className="border-b border-border/50 hover:bg-muted/20">
                          <td className="px-4 py-3 text-sm font-medium text-foreground flex items-center gap-2"><span className="w-3 h-3 rounded-full" style={{ backgroundColor: d.color }} />{d.name}</td>
                          <td className="px-4 py-3 text-sm text-right text-foreground">{d.value}%</td>
                          <td className="px-4 py-3 text-sm text-right font-semibold text-foreground">₹{Math.round(45800000 * d.value / 100 / 100000).toFixed(1)}L</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          )}

          {/* Report 4: Scholarship Report */}
          {activeReport === 3 && (
            <motion.div variants={itemVariants} className="space-y-4">
              <div className="rounded-2xl border border-border bg-card p-5">
                <h3 className="text-base font-semibold text-foreground flex items-center gap-2 mb-4"><Award className="w-4 h-4 text-purple-500" />Scholarship Disbursement Report</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={scholarshipReportData}>
                      <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'} />
                      <XAxis dataKey="type" tick={{ fontSize: 10 }} stroke={darkMode ? '#64748b' : '#94a3b8'} />
                      <YAxis tick={{ fontSize: 10 }} stroke={darkMode ? '#64748b' : '#94a3b8'} tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}K`} />
                      <Tooltip contentStyle={tooltipStyle} formatter={(v) => [`₹${(v / 1000).toFixed(0)}K`]} />
                      <Bar dataKey="disbursed" fill="#8B5CF6" radius={[4, 4, 0, 0]} name="Disbursed" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
              <div className="rounded-2xl border border-border bg-card overflow-hidden">
                <table className="w-full">
                  <thead><tr className="border-b border-border bg-muted/30">
                    <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Scholarship Type</th>
                    <th className="text-right px-4 py-3 text-xs font-semibold text-muted-foreground">Disbursed (₹)</th>
                    <th className="text-right px-4 py-3 text-xs font-semibold text-muted-foreground">Recipients</th>
                  </tr></thead>
                  <tbody>
                    {scholarshipReportData.map((d) => (
                      <tr key={d.type} className="border-b border-border/50 hover:bg-muted/20">
                        <td className="px-4 py-3 text-sm font-medium text-foreground">{d.type}</td>
                        <td className="px-4 py-3 text-sm text-right font-semibold text-birla-gold">₹{d.disbursed.toLocaleString()}</td>
                        <td className="px-4 py-3 text-sm text-right text-foreground">{d.recipients}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}

          {/* Report 5: Expense Category Report */}
          {activeReport === 4 && (
            <motion.div variants={itemVariants} className="space-y-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="rounded-2xl border border-border bg-card p-5">
                  <h3 className="text-base font-semibold text-foreground flex items-center gap-2 mb-4"><Wallet className="w-4 h-4 text-birla-cyan" />Expense Category Breakdown</h3>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie data={expenseCategoryData} cx="50%" cy="50%" innerRadius={50} outerRadius={85} dataKey="amount" label={({ category }) => category}>
                          {expenseCategoryData.map((entry, idx) => <Cell key={idx} fill={entry.color} />)}
                        </Pie>
                        <Tooltip contentStyle={tooltipStyle} formatter={(v) => [`₹${(v / 100000).toFixed(1)}L`]} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
                <div className="rounded-2xl border border-border bg-card overflow-hidden">
                  <table className="w-full">
                    <thead><tr className="border-b border-border bg-muted/30">
                      <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Category</th>
                      <th className="text-right px-4 py-3 text-xs font-semibold text-muted-foreground">Amount (₹)</th>
                      <th className="text-right px-4 py-3 text-xs font-semibold text-muted-foreground">% Share</th>
                    </tr></thead>
                    <tbody>
                      {expenseCategoryData.map((d) => {
                        const total = expenseCategoryData.reduce((s, e) => s + e.amount, 0)
                        return (
                          <tr key={d.category} className="border-b border-border/50 hover:bg-muted/20">
                            <td className="px-4 py-3 text-sm font-medium text-foreground flex items-center gap-2"><span className="w-3 h-3 rounded-full" style={{ backgroundColor: d.color }} />{d.category}</td>
                            <td className="px-4 py-3 text-sm text-right font-semibold text-foreground">₹{(d.amount / 100000).toFixed(1)}L</td>
                            <td className="px-4 py-3 text-sm text-right text-muted-foreground">{((d.amount / total) * 100).toFixed(1)}%</td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          )}

          {/* Report 6: Budget vs Actual */}
          {activeReport === 5 && (
            <motion.div variants={itemVariants} className="space-y-4">
              <div className="rounded-2xl border border-border bg-card p-5">
                <h3 className="text-base font-semibold text-foreground flex items-center gap-2 mb-4"><Target className="w-4 h-4 text-birla-gold" />Budget vs Actual Report</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={budgetVsActualData}>
                      <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'} />
                      <XAxis dataKey="department" tick={{ fontSize: 9 }} stroke={darkMode ? '#64748b' : '#94a3b8'} />
                      <YAxis tick={{ fontSize: 9 }} stroke={darkMode ? '#64748b' : '#94a3b8'} tickFormatter={(v) => `₹${(v / 100000).toFixed(0)}L`} />
                      <Tooltip contentStyle={tooltipStyle} formatter={(v) => [`₹${(v / 100000).toFixed(1)}L`]} />
                      <Legend iconType="circle" wrapperStyle={{ fontSize: '11px' }} />
                      <Bar dataKey="budget" fill="#C8A45C" name="Budget" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="actual" fill="#22D3EE" name="Actual" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
              <div className="rounded-2xl border border-border bg-card overflow-hidden">
                <table className="w-full">
                  <thead><tr className="border-b border-border bg-muted/30">
                    <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Department</th>
                    <th className="text-right px-4 py-3 text-xs font-semibold text-muted-foreground">Budget (₹)</th>
                    <th className="text-right px-4 py-3 text-xs font-semibold text-muted-foreground">Actual (₹)</th>
                    <th className="text-right px-4 py-3 text-xs font-semibold text-muted-foreground">Variance</th>
                  </tr></thead>
                  <tbody>
                    {budgetVsActualData.map((d) => {
                      const v = d.budget - d.actual
                      return (
                        <tr key={d.department} className="border-b border-border/50 hover:bg-muted/20">
                          <td className="px-4 py-3 text-sm font-medium text-foreground">{d.department}</td>
                          <td className="px-4 py-3 text-sm text-right text-foreground">₹{(d.budget / 100000).toFixed(1)}L</td>
                          <td className="px-4 py-3 text-sm text-right text-foreground">₹{(d.actual / 100000).toFixed(1)}L</td>
                          <td className={`px-4 py-3 text-sm text-right font-medium ${v >= 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'}`}>{v >= 0 ? '+' : ''}₹{(v / 100000).toFixed(1)}L</td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}

          {/* Report 7: Transport Fee Report */}
          {activeReport === 6 && (
            <motion.div variants={itemVariants} className="space-y-4">
              <div className="rounded-2xl border border-border bg-card p-5">
                <h3 className="text-base font-semibold text-foreground flex items-center gap-2 mb-4"><Bus className="w-4 h-4 text-birla-cyan" />Transport Fee Collection Report</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={transportFeeReportData}>
                      <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'} />
                      <XAxis dataKey="route" tick={{ fontSize: 8 }} stroke={darkMode ? '#64748b' : '#94a3b8'} />
                      <YAxis tick={{ fontSize: 9 }} stroke={darkMode ? '#64748b' : '#94a3b8'} tickFormatter={(v) => `₹${(v / 100000).toFixed(0)}L`} />
                      <Tooltip contentStyle={tooltipStyle} formatter={(v) => [`₹${(v / 100000).toFixed(1)}L`]} />
                      <Legend iconType="circle" wrapperStyle={{ fontSize: '11px' }} />
                      <Bar dataKey="collected" fill="#10B981" name="Collected" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="pending" fill="#EF4444" name="Pending" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
              <div className="rounded-2xl border border-border bg-card overflow-hidden">
                <table className="w-full">
                  <thead><tr className="border-b border-border bg-muted/30">
                    <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Route</th>
                    <th className="text-right px-4 py-3 text-xs font-semibold text-muted-foreground">Collected (₹)</th>
                    <th className="text-right px-4 py-3 text-xs font-semibold text-muted-foreground">Pending (₹)</th>
                  </tr></thead>
                  <tbody>
                    {transportFeeReportData.map((d) => (
                      <tr key={d.route} className="border-b border-border/50 hover:bg-muted/20">
                        <td className="px-4 py-3 text-sm font-medium text-foreground">{d.route}</td>
                        <td className="px-4 py-3 text-sm text-right text-emerald-600 dark:text-emerald-400">₹{(d.collected / 100000).toFixed(1)}L</td>
                        <td className="px-4 py-3 text-sm text-right text-red-600 dark:text-red-400">₹{(d.pending / 100000).toFixed(1)}L</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}

          {/* Report 8: Year-over-Year Collection */}
          {activeReport === 7 && (
            <motion.div variants={itemVariants} className="space-y-4">
              <div className="rounded-2xl border border-border bg-card p-5">
                <h3 className="text-base font-semibold text-foreground flex items-center gap-2 mb-4"><TrendingUp className="w-4 h-4 text-emerald-500" />Year-over-Year Fee Collection</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={yoyCollectionData}>
                      <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'} />
                      <XAxis dataKey="year" tick={{ fontSize: 10 }} stroke={darkMode ? '#64748b' : '#94a3b8'} />
                      <YAxis tick={{ fontSize: 10 }} stroke={darkMode ? '#64748b' : '#94a3b8'} tickFormatter={(v) => `₹${(v / 100000).toFixed(0)}L`} />
                      <Tooltip contentStyle={tooltipStyle} formatter={(v) => [`₹${(v / 100000).toFixed(1)}L`]} />
                      <Legend iconType="circle" wrapperStyle={{ fontSize: '11px' }} />
                      <Line type="monotone" dataKey="q1" stroke="#0A1628" strokeWidth={2} name="Q1" />
                      <Line type="monotone" dataKey="q2" stroke="#22D3EE" strokeWidth={2} name="Q2" />
                      <Line type="monotone" dataKey="q3" stroke="#C8A45C" strokeWidth={2} name="Q3" />
                      <Line type="monotone" dataKey="q4" stroke="#10B981" strokeWidth={2} name="Q4" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
              <div className="rounded-2xl border border-border bg-card overflow-hidden">
                <table className="w-full">
                  <thead><tr className="border-b border-border bg-muted/30">
                    <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Year</th>
                    <th className="text-right px-4 py-3 text-xs font-semibold text-muted-foreground">Q1 (₹)</th>
                    <th className="text-right px-4 py-3 text-xs font-semibold text-muted-foreground">Q2 (₹)</th>
                    <th className="text-right px-4 py-3 text-xs font-semibold text-muted-foreground">Q3 (₹)</th>
                    <th className="text-right px-4 py-3 text-xs font-semibold text-muted-foreground">Q4 (₹)</th>
                  </tr></thead>
                  <tbody>
                    {yoyCollectionData.map((d) => (
                      <tr key={d.year} className="border-b border-border/50 hover:bg-muted/20">
                        <td className="px-4 py-3 text-sm font-medium text-foreground">{d.year}</td>
                        <td className="px-4 py-3 text-sm text-right text-foreground">₹{(d.q1 / 100000).toFixed(1)}L</td>
                        <td className="px-4 py-3 text-sm text-right text-foreground">₹{(d.q2 / 100000).toFixed(1)}L</td>
                        <td className="px-4 py-3 text-sm text-right text-foreground">₹{(d.q3 / 100000).toFixed(1)}L</td>
                        <td className="px-4 py-3 text-sm text-right text-foreground">{d.q4 > 0 ? `₹${(d.q4 / 100000).toFixed(1)}L` : '-'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}
        </motion.div>
      )}

      {/* ═══════════════════════════════════════════════════════════════
          RECEIPT MODAL
      ═══════════════════════════════════════════════════════════════ */}
      {showReceiptModal && generatedReceipt && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={() => { setShowReceiptModal(false); setShareOption(null); setShareSent(false) }}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl bg-background shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Receipt Content - Always white background for printing */}
            <div id="receipt-print-area" className="bg-white text-gray-900 relative">
              {/* Watermark */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
                <span className="text-[120px] font-black text-gray-100/40 -rotate-45 tracking-widest">BOMIS</span>
              </div>

              {/* GraduationCap Header */}
              <div className="relative z-10 border-b-4 border-amber-500 px-8 pt-6 pb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-white text-xl font-bold shadow-lg">B</div>
                    <div>
                      <h1 className="text-xl font-bold text-gray-900 tracking-wide">BIRLA OPEN MINDS INTERNATIONAL SCHOOL</h1>
                      <p className="text-sm text-gray-500 font-medium">Singur, Hooghly, West Bengal</p>
                    </div>
                  </div>
                  <div className="text-right text-[10px] text-gray-400 space-y-0.5">
                    <p className="flex items-center justify-end gap-1"><Phone className="w-3 h-3" /> +91 3212 252 100</p>
                    <p className="flex items-center justify-end gap-1"><Mail className="w-3 h-3" /> info@bomissingur.edu.in</p>
                    <p className="flex items-center justify-end gap-1"><MapPin className="w-3 h-3" /> Singur, Hooghly - 712409</p>
                    <p>UDISE+: 19180100301</p>
                  </div>
                </div>
              </div>

              {/* Receipt Title */}
              <div className="relative z-10 text-center py-3 bg-gradient-to-r from-amber-50 to-amber-100 border-b border-amber-200">
                <h2 className="text-lg font-bold text-gray-800 tracking-widest uppercase">Fee Receipt</h2>
                <p className="text-xs text-gray-500 mt-0.5">Receipt No: <span className="font-mono font-bold text-amber-700">{generatedReceipt.id}</span></p>
              </div>

              {/* Receipt Details */}
              <div className="relative z-10 px-8 py-4">
                <div className="grid grid-cols-3 gap-3 text-sm border border-gray-200 rounded-lg overflow-hidden">
                  <div className="px-3 py-2 bg-gray-50 border-r border-gray-200">
                    <span className="text-[10px] text-gray-400 block">Receipt No</span>
                    <span className="font-mono font-semibold text-gray-800">{generatedReceipt.id}</span>
                  </div>
                  <div className="px-3 py-2 bg-gray-50 border-r border-gray-200">
                    <span className="text-[10px] text-gray-400 block">Date</span>
                    <span className="font-semibold text-gray-800">{generatedReceipt.date}</span>
                  </div>
                  <div className="px-3 py-2 bg-gray-50">
                    <span className="text-[10px] text-gray-400 block">Academic Year</span>
                    <span className="font-semibold text-gray-800">{generatedReceipt.academicYear}</span>
                  </div>
                </div>
              </div>

              {/* Student Details */}
              <div className="relative z-10 px-8 pb-4">
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Student Details</h3>
                <div className="border border-gray-200 rounded-lg overflow-hidden">
                  <div className="grid grid-cols-2">
                    <div className="px-4 py-2.5 border-r border-b border-gray-200">
                      <span className="text-[10px] text-gray-400 block">Student Name</span>
                      <span className="font-semibold text-gray-800">{generatedReceipt.studentName}</span>
                    </div>
                    <div className="px-4 py-2.5 border-b border-gray-200">
                      <span className="text-[10px] text-gray-400 block">Class & Section</span>
                      <span className="font-semibold text-gray-800">{generatedReceipt.class}</span>
                    </div>
                    <div className="px-4 py-2.5 border-r border-gray-200">
                      <span className="text-[10px] text-gray-400 block">BSP ID</span>
                      <span className="font-mono text-sm font-semibold text-blue-700">{generatedReceipt.bspId}</span>
                    </div>
                    <div className="px-4 py-2.5 border-r border-b border-gray-200">
                      <span className="text-[10px] text-gray-400 block">PEN No</span>
                      <span className="font-mono text-sm font-semibold text-emerald-700">{generatedReceipt.penNo}</span>
                    </div>
                  </div>
                  <div className="px-4 py-2.5">
                    <span className="text-[10px] text-gray-400 block">Uppar ID</span>
                    <span className="font-mono text-sm font-semibold text-amber-700">{generatedReceipt.upparId}</span>
                  </div>
                </div>
              </div>

              {/* Fee Breakdown */}
              <div className="relative z-10 px-8 pb-4">
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Fee Breakdown</h3>
                <table className="w-full border border-gray-200 rounded-lg overflow-hidden">
                  <thead>
                    <tr className="bg-gray-800 text-white">
                      <th className="text-left px-4 py-2 text-xs font-semibold">#</th>
                      <th className="text-left px-4 py-2 text-xs font-semibold">Fee Component</th>
                      <th className="text-right px-4 py-2 text-xs font-semibold">Amount (₹)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-200">
                      <td className="px-4 py-2.5 text-sm text-gray-600">1</td>
                      <td className="px-4 py-2.5 text-sm font-medium text-gray-800">{generatedReceipt.feeType} Fee</td>
                      <td className="px-4 py-2.5 text-sm font-semibold text-right text-gray-800">₹{generatedReceipt.amount.toLocaleString('en-IN')}</td>
                    </tr>
                  </tbody>
                  <tfoot>
                    <tr className="bg-amber-50 border-t-2 border-amber-400">
                      <td colSpan={2} className="px-4 py-3 text-sm font-bold text-gray-900">Total Amount</td>
                      <td className="px-4 py-3 text-right text-base font-black text-amber-700">₹{generatedReceipt.amount.toLocaleString('en-IN')}</td>
                    </tr>
                  </tfoot>
                </table>
              </div>

              {/* Payment Details */}
              <div className="relative z-10 px-8 pb-4">
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Payment Details</h3>
                <div className="grid grid-cols-2 gap-3 text-sm border border-gray-200 rounded-lg overflow-hidden">
                  <div className="px-4 py-2.5 bg-gray-50 border-r border-gray-200">
                    <span className="text-[10px] text-gray-400 block">Payment Mode</span>
                    <span className="font-semibold text-gray-800">{generatedReceipt.paymentMode}</span>
                  </div>
                  <div className="px-4 py-2.5 bg-gray-50">
                    <span className="text-[10px] text-gray-400 block">Transaction ID</span>
                    <span className="font-mono text-sm font-semibold text-gray-800">{generatedReceipt.transactionId}</span>
                  </div>
                </div>
              </div>

              {/* Amount in Words */}
              <div className="relative z-10 px-8 pb-4">
                <div className="border border-dashed border-gray-300 rounded-lg px-4 py-2 bg-gray-50">
                  <span className="text-[10px] text-gray-400 block">Amount in Words</span>
                  <span className="text-sm font-medium text-gray-700 italic">Rupees {generatedReceipt.amount.toLocaleString('en-IN')} Only</span>
                </div>
              </div>

              {/* Footer */}
              <div className="relative z-10 px-8 pb-6">
                <div className="flex items-end justify-between border-t-2 border-gray-200 pt-4">
                  <div className="text-center">
                    <div className="w-28 border-b border-gray-300 mb-1" />
                    <span className="text-[10px] text-gray-500 font-medium">Authorized Signatory</span>
                  </div>
                  <div className="text-center">
                    <div className="w-24 h-24 border-2 border-dashed border-gray-300 rounded-full flex items-center justify-center">
                      <span className="text-[9px] text-gray-400">GraduationCap Seal</span>
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="w-28 border-b border-gray-300 mb-1" />
                    <span className="text-[10px] text-gray-500 font-medium">Parent / Guardian</span>
                  </div>
                </div>
                <p className="text-center text-[10px] text-gray-400 mt-4 italic">This is a computer-generated receipt. No physical signature is required. For queries, contact the school accounts office.</p>
              </div>
            </div>

            {/* Action Buttons Bar */}
            {!shareOption && !shareSent && (
              <div className="border-t border-border bg-card px-6 py-4 flex flex-wrap items-center justify-center gap-3">
                <button onClick={() => window.print()} className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gray-900 text-white text-sm font-medium hover:bg-gray-800 transition-colors shadow-lg">
                  <Printer className="w-4 h-4" /> Print Receipt
                </button>
                <button onClick={() => { /* Simulate PDF download */ const link = document.createElement('a'); link.download = `${generatedReceipt.id}.txt`; link.href = URL.createObjectURL(new Blob([`Fee Receipt - ${generatedReceipt.id}\nStudent: ${generatedReceipt.studentName}\nClass: ${generatedReceipt.class}\nAmount: ₹${generatedReceipt.amount.toLocaleString('en-IN')}\nDate: ${generatedReceipt.date}\nPayment Mode: ${generatedReceipt.paymentMode}`], { type: 'text/plain' })); link.click() }} className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-600 text-white text-sm font-medium hover:bg-amber-700 transition-colors shadow-lg">
                  <Download className="w-4 h-4" /> Download PDF
                </button>
                <button onClick={() => { setShareOption('whatsapp'); setSharePhone(''); setShareSent(false) }} className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-white text-sm font-medium transition-colors shadow-lg" style={{ backgroundColor: '#25D366' }}>
                  <MessageSquare className="w-4 h-4" /> WhatsApp
                </button>
                <button onClick={() => { setShareOption('email'); setShareEmail(''); setShareSent(false) }} className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition-colors shadow-lg">
                  <Mail className="w-4 h-4" /> Email
                </button>
                <button onClick={() => { setShowReceiptModal(false); setShareOption(null); setShareSent(false) }} className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-border text-muted-foreground text-sm font-medium hover:bg-muted transition-colors">
                  <X className="w-4 h-4" /> Close
                </button>
              </div>
            )}

            {/* WhatsApp Share Dialog */}
            {shareOption === 'whatsapp' && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="border-t border-border bg-card px-6 py-5">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#25D366' }}><MessageSquare className="w-4 h-4 text-white" /></div>
                  <h4 className="text-sm font-bold text-foreground">Share via WhatsApp</h4>
                </div>
                {shareSent ? (
                  <div className="flex flex-col items-center gap-3 py-4">
                    <CheckCircle2 className="w-12 h-12 text-emerald-500" />
                    <p className="text-sm font-medium text-foreground">WhatsApp message opened successfully!</p>
                    <button onClick={() => { setShareOption(null); setShareSent(false) }} className="px-4 py-2 rounded-lg gradient-birla text-white text-sm font-medium">Done</button>
                  </div>
                ) : (
                  <>
                    <div className="mb-4">
                      <label className="text-xs text-muted-foreground mb-1 block">Phone Number</label>
                      <div className="flex items-center gap-2">
                        <span className="px-3 py-2 rounded-lg border border-input bg-muted text-sm text-foreground font-medium">+91</span>
                        <input type="tel" value={sharePhone} onChange={(e) => setSharePhone(e.target.value)} placeholder="Enter 10-digit mobile number" className="flex-1 px-3 py-2 rounded-lg border border-input bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-birla-gold/40" />
                      </div>
                    </div>
                    <div className="mb-4">
                      <label className="text-xs text-muted-foreground mb-1 block">Message Preview</label>
                      <div className="p-3 rounded-lg bg-gray-100 dark:bg-gray-800 text-xs text-gray-700 dark:text-gray-300 max-h-32 overflow-y-auto whitespace-pre-line font-mono">{`🏫 *Birla Open Minds International GraduationCap, Singur*\n📋 *FEE RECEIPT*\n\n📌 Receipt No: ${generatedReceipt.id}\n📅 Date: ${generatedReceipt.date}\n🎓 Academic Year: ${generatedReceipt.academicYear}\n\n👤 Student: ${generatedReceipt.studentName}\n📚 Class: ${generatedReceipt.class}\n🆔 BSP: ${generatedReceipt.bspId} | PEN: ${generatedReceipt.penNo}\n\n💰 *${generatedReceipt.feeType} Fee*: ₹${generatedReceipt.amount.toLocaleString('en-IN')}\n━━━━━━━━━━━━━━━━━━━━\n💵 *Total*: ₹${generatedReceipt.amount.toLocaleString('en-IN')}\n\n💳 Payment: ${generatedReceipt.paymentMode}\n🔢 Txn ID: ${generatedReceipt.transactionId}\n\n✅ Status: ${generatedReceipt.status}\n\n_This is a computer-generated receipt._`}</div>
                    </div>
                    <div className="flex items-center justify-end gap-2">
                      <button onClick={() => setShareOption(null)} className="px-4 py-2 rounded-lg border border-border text-muted-foreground text-sm font-medium hover:bg-muted transition-colors">Cancel</button>
                      <button
                        onClick={() => {
                          const msg = encodeURIComponent(`🏫 *Birla Open Minds International GraduationCap, Singur*\n📋 *FEE RECEIPT*\n\n📌 Receipt No: ${generatedReceipt.id}\n📅 Date: ${generatedReceipt.date}\n🎓 Academic Year: ${generatedReceipt.academicYear}\n\n👤 Student: ${generatedReceipt.studentName}\n📚 Class: ${generatedReceipt.class}\n🆔 BSP: ${generatedReceipt.bspId} | PEN: ${generatedReceipt.penNo}\n\n💰 *${generatedReceipt.feeType} Fee*: ₹${generatedReceipt.amount.toLocaleString('en-IN')}\n━━━━━━━━━━━━━━━━━━━━\n💵 *Total*: ₹${generatedReceipt.amount.toLocaleString('en-IN')}\n\n💳 Payment: ${generatedReceipt.paymentMode}\n🔢 Txn ID: ${generatedReceipt.transactionId}\n\n✅ Status: ${generatedReceipt.status}\n\n_This is a computer-generated receipt._`)
                          const phone = sharePhone.replace(/\D/g, '')
                          window.open(`https://wa.me/91${phone}?text=${msg}`, '_blank')
                          setShareSent(true)
                        }}
                        disabled={sharePhone.length < 10}
                        className="px-4 py-2 rounded-lg text-white text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        style={{ backgroundColor: '#25D366' }}
                      >
                        <span className="flex items-center gap-2"><Send className="w-3.5 h-3.5" /> Send via WhatsApp</span>
                      </button>
                    </div>
                  </>
                )}
              </motion.div>
            )}

            {/* Email Share Dialog */}
            {shareOption === 'email' && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="border-t border-border bg-card px-6 py-5">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center"><Mail className="w-4 h-4 text-white" /></div>
                  <h4 className="text-sm font-bold text-foreground">Share via Email</h4>
                </div>
                {shareSent ? (
                  <div className="flex flex-col items-center gap-3 py-4">
                    <CheckCircle2 className="w-12 h-12 text-blue-500" />
                    <p className="text-sm font-medium text-foreground">Email sent successfully!</p>
                    <button onClick={() => { setShareOption(null); setShareSent(false) }} className="px-4 py-2 rounded-lg gradient-birla text-white text-sm font-medium">Done</button>
                  </div>
                ) : (
                  <>
                    <div className="mb-3">
                      <label className="text-xs text-muted-foreground mb-1 block">Email Address</label>
                      <input type="email" value={shareEmail} onChange={(e) => setShareEmail(e.target.value)} placeholder="parent@example.com" className="w-full px-3 py-2 rounded-lg border border-input bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-birla-gold/40" />
                    </div>
                    <div className="mb-3">
                      <label className="text-xs text-muted-foreground mb-1 block">Subject</label>
                      <input type="text" readOnly value={`Fee Receipt - ${generatedReceipt.id} - Birla Open Minds International GraduationCap`} className="w-full px-3 py-2 rounded-lg border border-input bg-muted text-sm text-foreground cursor-not-allowed" />
                    </div>
                    <div className="mb-4">
                      <label className="text-xs text-muted-foreground mb-1 block">Email Body Preview</label>
                      <div className="p-3 rounded-lg bg-gray-100 dark:bg-gray-800 text-xs text-gray-700 dark:text-gray-300 max-h-32 overflow-y-auto whitespace-pre-line font-mono">{`Dear Parent/Guardian,

Please find the fee receipt details below:

Receipt No: ${generatedReceipt.id}
Date: ${generatedReceipt.date}
Academic Year: ${generatedReceipt.academicYear}

Student: ${generatedReceipt.studentName}
Class: ${generatedReceipt.class}
BSP ID: ${generatedReceipt.bspId} | PEN: ${generatedReceipt.penNo}

${generatedReceipt.feeType} Fee: ₹${generatedReceipt.amount.toLocaleString('en-IN')}
Total Amount: ₹${generatedReceipt.amount.toLocaleString('en-IN')}

Payment Mode: ${generatedReceipt.paymentMode}
Transaction ID: ${generatedReceipt.transactionId}
Status: ${generatedReceipt.status}

This is a computer-generated receipt from Birla Open Minds International GraduationCap, Singur.

Regards,
Accounts Department
BOMIS, Singur`}</div>
                    </div>
                    <div className="flex items-center justify-end gap-2">
                      <button onClick={() => setShareOption(null)} className="px-4 py-2 rounded-lg border border-border text-muted-foreground text-sm font-medium hover:bg-muted transition-colors">Cancel</button>
                      <button
                        onClick={() => {
                          const subject = encodeURIComponent(`Fee Receipt - ${generatedReceipt.id} - Birla Open Minds International GraduationCap`)
                          const body = encodeURIComponent(`Dear Parent/Guardian,\n\nPlease find the fee receipt details below:\n\nReceipt No: ${generatedReceipt.id}\nDate: ${generatedReceipt.date}\nAcademic Year: ${generatedReceipt.academicYear}\n\nStudent: ${generatedReceipt.studentName}\nClass: ${generatedReceipt.class}\nBSP ID: ${generatedReceipt.bspId} | PEN: ${generatedReceipt.penNo}\n\n${generatedReceipt.feeType} Fee: ₹${generatedReceipt.amount.toLocaleString('en-IN')}\nTotal Amount: ₹${generatedReceipt.amount.toLocaleString('en-IN')}\n\nPayment Mode: ${generatedReceipt.paymentMode}\nTransaction ID: ${generatedReceipt.transactionId}\nStatus: ${generatedReceipt.status}\n\nThis is a computer-generated receipt from Birla Open Minds International GraduationCap, Singur.\n\nRegards,\nAccounts Department\nBOMIS, Singur`)
                          window.open(`mailto:${shareEmail}?subject=${subject}&body=${body}`, '_blank')
                          setShareSent(true)
                        }}
                        disabled={!shareEmail.includes('@')}
                        className="px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <span className="flex items-center gap-2"><Send className="w-3.5 h-3.5" /> Send Email</span>
                      </button>
                    </div>
                  </>
                )}
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  )
}
