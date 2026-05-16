'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  BookOpen, Library as LibraryIcon, Users, Clock, Search, Download,
  Plus, Filter, Eye, Save, ChevronRight, Calendar, Bell, Star,
  FileText, BarChart3, PieChart as PieChartIcon, ClipboardList,
  FileBarChart, BookMarked, BookCopy, BookCheck, BookX, BookPlus,
  Upload, Monitor, Smartphone, Tag, Shield, IndianRupee,
  TrendingUp, TrendingDown, ArrowUpRight, CheckCircle2, XCircle,
  AlertTriangle, BookOpenCheck, GraduationCap, Hash, Layers, Globe
} from 'lucide-react'
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Legend, PieChart, Pie, Cell, LineChart, Line
} from 'recharts'
import useAppStore from '@/store/useAppStore'

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
  { label: 'Total Books', value: '4,850', change: '+120 this month', icon: BookOpen, gradient: 'from-blue-900 to-blue-600', glow: 'shadow-blue-800/20' },
  { label: 'Books Issued', value: '342', change: '7.1% issuance', icon: BookCheck, gradient: 'from-emerald-900 to-emerald-600', glow: 'shadow-emerald-800/20' },
  { label: 'Overdue', value: '28', change: '₹4,200 fine', icon: BookX, gradient: 'from-amber-900 to-amber-600', glow: 'shadow-amber-800/20' },
  { label: 'E-Books', value: '380', change: '+45 this year', icon: Monitor, gradient: 'from-purple-900 to-purple-600', glow: 'shadow-purple-800/20' },
]

const catalogData = [
  { id: 1, title: 'Concepts of Physics', author: 'H.C. Verma', ISBN: '978-8177091878', category: 'Science', language: 'English', copies: 12, available: 8, shelf: 'S-A1' },
  { id: 2, title: 'Mathematics for Class X', author: 'R.D. Sharma', ISBN: '978-9388700452', category: 'Mathematics', language: 'English', copies: 15, available: 11, shelf: 'S-A2' },
  { id: 3, title: 'NCERT Biology XII', author: 'NCERT', ISBN: '978-8174507699', category: 'Science', language: 'English', copies: 20, available: 14, shelf: 'S-A1' },
  { id: 4, title: 'Wings of Fire', author: 'A.P.J. Abdul Kalam', ISBN: '978-8173711464', category: 'Fiction', language: 'English', copies: 8, available: 3, shelf: 'S-B1' },
  { id: 5, title: 'India After Gandhi', author: 'Ramachandra Guha', ISBN: '978-0330396110', category: 'History', language: 'English', copies: 6, available: 4, shelf: 'S-B2' },
  { id: 6, title: 'Hindi Vyakaran', author: 'Dr. Vasudev Nandan', ISBN: '978-8173190897', category: 'Hindi', language: 'Hindi', copies: 10, available: 7, shelf: 'S-C1' },
  { id: 7, title: 'Organic Chemistry', author: 'Morrison & Boyd', ISBN: '978-9332550447', category: 'Science', language: 'English', copies: 8, available: 2, shelf: 'S-A3' },
  { id: 8, title: 'The Discovery of India', author: 'Jawaharlal Nehru', ISBN: '978-0143031031', category: 'History', language: 'English', copies: 5, available: 3, shelf: 'S-B2' },
]

const issuedBooksData = [
  { id: 'ISS-001', student: 'Aarav Sharma', bspId: 'BSP-2025-001', penNo: 'PEN-XA-001', upparId: 'UPP-001', class: 'X-A', book: 'Concepts of Physics', issueDate: 'Feb 15, 2026', dueDate: 'Mar 15, 2026', status: 'Issued' },
  { id: 'ISS-002', student: 'Priya Gupta', bspId: 'BSP-2025-002', penNo: 'PEN-XA-002', upparId: 'UPP-002', class: 'X-A', book: 'Wings of Fire', issueDate: 'Feb 10, 2026', dueDate: 'Mar 10, 2026', status: 'Issued' },
  { id: 'ISS-003', student: 'Ananya Iyer', bspId: 'BSP-2025-012', penNo: 'PEN-VIIIA-012', upparId: 'UPP-012', class: 'VIII-A', book: 'Mathematics for Class X', issueDate: 'Jan 20, 2026', dueDate: 'Feb 20, 2026', status: 'Overdue' },
  { id: 'ISS-004', student: 'Rohan Patel', bspId: 'BSP-2025-031', penNo: 'PEN-VIIA-031', upparId: 'UPP-031', class: 'VII-A', book: 'NCERT Biology XII', issueDate: 'Feb 28, 2026', dueDate: 'Mar 28, 2026', status: 'Issued' },
  { id: 'ISS-005', student: 'Kavya Joshi', bspId: 'BSP-2025-023', penNo: 'PEN-IIA-023', upparId: 'UPP-023', class: 'II-A', book: 'Hindi Vyakaran', issueDate: 'Jan 5, 2026', dueDate: 'Feb 5, 2026', status: 'Overdue' },
]

const ebooksData = [
  { id: 1, title: 'NCERT Physics XI', subject: 'Physics', class: 'XI', format: 'PDF', accesses: 234 },
  { id: 2, title: 'NCERT Chemistry XII', subject: 'Chemistry', class: 'XII', format: 'PDF', accesses: 189 },
  { id: 3, title: 'Mathematics Video Lectures', subject: 'Mathematics', class: 'X', format: 'Video', accesses: 156 },
  { id: 4, title: 'English Grammar Guide', subject: 'English', class: 'IX', format: 'EPUB', accesses: 98 },
  { id: 5, title: 'Hindi Sahitya Audio', subject: 'Hindi', class: 'XII', format: 'Audio', accesses: 67 },
]

// ─── Report Data ──────────────────────────────────────────────────
const booksIssuedReportData = [
  { category: 'Fiction', issued: 45, available: 82 },
  { category: 'Science', issued: 78, available: 112 },
  { category: 'Mathematics', issued: 56, available: 95 },
  { category: 'History', issued: 32, available: 48 },
  { category: 'English', issued: 41, available: 67 },
  { category: 'Hindi', issued: 38, available: 54 },
  { category: 'Reference', issued: 22, available: 86 },
  { category: 'Periodical', issued: 18, available: 42 },
]

const overdueBooksData = [
  { student: 'Ananya Iyer', bspId: 'BSP-2025-012', penNo: 'PEN-VIIIA-012', upparId: 'UPP-012', class: 'VIII-A', book: 'Mathematics for Class X', daysOverdue: 18, fine: 90 },
  { student: 'Kavya Joshi', bspId: 'BSP-2025-023', penNo: 'PEN-IIA-023', upparId: 'UPP-023', class: 'II-A', book: 'Hindi Vyakaran', daysOverdue: 28, fine: 140 },
  { student: 'Nikhil Das', bspId: 'BSP-2025-078', penNo: 'PEN-VIIIA-078', upparId: 'UPP-078', class: 'VIII-A', book: 'Organic Chemistry', daysOverdue: 5, fine: 25 },
  { student: 'Sneha Pillai', bspId: 'BSP-2025-089', penNo: 'PEN-XIB-089', upparId: 'UPP-089', class: 'XI-B', book: 'India After Gandhi', daysOverdue: 12, fine: 60 },
  { student: 'Meera Nair', bspId: 'BSP-2025-056', penNo: 'PEN-IVA-056', upparId: 'UPP-056', class: 'IV-A', book: 'Wings of Fire', daysOverdue: 8, fine: 40 },
]

const ebookUsageData = [
  { title: 'NCERT Physics XI', accesses: 234 },
  { title: 'NCERT Chemistry XII', accesses: 189 },
  { title: 'Maths Video Lectures', accesses: 156 },
  { title: 'English Grammar', accesses: 98 },
  { title: 'Hindi Sahitya Audio', accesses: 67 },
]

const membershipData = [
  { class: 'I', members: 28, total: 30, color: '#0A1628' },
  { class: 'II', members: 25, total: 28, color: '#22D3EE' },
  { class: 'III', members: 24, total: 26, color: '#C8A45C' },
  { class: 'IV', members: 27, total: 30, color: '#8B5CF6' },
  { class: 'V', members: 30, total: 32, color: '#10B981' },
  { class: 'VI', members: 25, total: 28, color: '#F59E0B' },
  { class: 'VII', members: 26, total: 30, color: '#EF4444' },
  { class: 'VIII', members: 29, total: 32, color: '#64748B' },
  { class: 'IX', members: 24, total: 28, color: '#0A1628' },
  { class: 'X', members: 22, total: 26, color: '#22D3EE' },
  { class: 'XI', members: 20, total: 24, color: '#C8A45C' },
  { class: 'XII', members: 18, total: 22, color: '#8B5CF6' },
]

const monthlyCirculationData = [
  { month: 'Apr', issued: 145, returned: 132 },
  { month: 'May', issued: 168, returned: 155 },
  { month: 'Jun', issued: 120, returned: 118 },
  { month: 'Jul', issued: 185, returned: 172 },
  { month: 'Aug', issued: 158, returned: 150 },
  { month: 'Sep', issued: 142, returned: 138 },
  { month: 'Oct', issued: 175, returned: 168 },
  { month: 'Nov', issued: 130, returned: 125 },
  { month: 'Dec', issued: 110, returned: 108 },
  { month: 'Jan', issued: 165, returned: 158 },
  { month: 'Feb', issued: 152, returned: 145 },
  { month: 'Mar', issued: 180, returned: 170 },
]

const categoryInventoryData = [
  { category: 'Fiction', books: 127, color: '#0A1628' },
  { category: 'Science', books: 190, color: '#22D3EE' },
  { category: 'Mathematics', books: 151, color: '#C8A45C' },
  { category: 'History', books: 80, color: '#8B5CF6' },
  { category: 'English', books: 108, color: '#10B981' },
  { category: 'Hindi', books: 92, color: '#F59E0B' },
  { category: 'Reference', books: 108, color: '#EF4444' },
  { category: 'Periodical', books: 60, color: '#64748B' },
]

// ─── Reusable Components ─────────────────────────────────────────
function FormField({ label, children }) {
  return (<div><label className="text-xs text-muted-foreground mb-1 block">{label}</label>{children}</div>)
}

function InputField({ value, onChange, placeholder, type = 'text' }) {
  return (<input type={type} value={value} onChange={onChange} placeholder={placeholder} className="w-full px-3 py-2 rounded-lg border border-input bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-birla-gold/40" />)
}

function SelectField({ value, onChange, options }) {
  return (<select value={value} onChange={onChange} className="w-full px-3 py-2 rounded-lg border border-input bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-birla-gold/40">{options.map((opt) => <option key={opt} value={opt}>{opt}</option>)}</select>)
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
export default function LibraryModule() {
  const { darkMode } = useAppStore()
  const [activeTab, setActiveTab] = useState('overview')
  const [activeForm, setActiveForm] = useState(0)
  const [activeReport, setActiveReport] = useState(0)

  // Form States
  const [bookEntryForm, setBookEntryForm] = useState({ title: '', author: '', ISBN: '', publisher: '', category: 'Fiction', language: 'English', pages: '', price: '', shelfLocation: '', copies: '', accessionNumber: '' })
  const [bookIssueForm, setBookIssueForm] = useState({ studentName: '', class: '', bookSelect: '', issueDate: '', dueDate: '', issuedBy: '' })
  const [bookReturnForm, setBookReturnForm] = useState({ issueId: '', studentName: '', bookTitle: '', returnDate: '', condition: 'Good', fine: '', remarks: '' })
  const [ebookForm, setEbookForm] = useState({ title: '', author: '', subject: '', class: '', description: '', format: 'PDF', accessLevel: 'All', tags: '', fileSize: '' })
  const [membershipForm, setMembershipForm] = useState({ studentName: '', class: '', membershipType: 'Standard', issueDate: '', validTill: '', securityDeposit: '' })
  const [reservationForm, setReservationForm] = useState({ studentName: '', bookTitle: '', reservationDate: '', priority: 'Normal', notificationPreference: 'SMS' })

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'catalog', label: 'Catalog', icon: BookOpen },
    { id: 'issue-return', label: 'Issue-Return', icon: BookCheck },
    { id: 'ebooks', label: 'E-Books', icon: Monitor },
    { id: 'forms', label: 'Forms', icon: ClipboardList },
    { id: 'reports', label: 'Reports', icon: FileBarChart },
  ]

  const forms = [
    { name: 'Book Entry', icon: BookPlus },
    { name: 'Book Issue', icon: BookCheck },
    { name: 'Book Return', icon: BookOpenCheck },
    { name: 'E-Book Upload', icon: Upload },
    { name: 'Library Membership', icon: Shield },
    { name: 'Book Reservation', icon: BookMarked },
  ]

  const reports = [
    { name: 'Books Issued', icon: BookCheck },
    { name: 'Overdue Books', icon: BookX },
    { name: 'E-Book Usage', icon: Monitor },
    { name: 'Membership', icon: Shield },
    { name: 'Monthly Circulation', icon: BookCopy },
    { name: 'Category Inventory', icon: Layers },
  ]

  const tooltipStyle = {
    backgroundColor: darkMode ? '#1A2D4A' : '#fff',
    border: `1px solid ${darkMode ? 'rgba(255,255,255,0.1)' : '#e2e8f0'}`,
    borderRadius: '12px',
    fontSize: '12px',
    color: darkMode ? '#e2e8f0' : '#1e293b',
  }

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="show" className="p-4 lg:p-6 space-y-6 max-w-[1600px] mx-auto">
      {/* ─── Tab Navigation ──────────────────────────────── */}
      <motion.div variants={itemVariants} className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
        {tabs.map((tab) => {
          const Icon = tab.icon
          return (<button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${activeTab === tab.id ? 'gradient-birla text-white shadow-md' : 'border border-border text-muted-foreground hover:bg-muted hover:text-foreground'}`}><Icon className="w-3.5 h-3.5" /> {tab.label}</button>)
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
                    <div className="flex items-center justify-between mb-3"><div className="w-10 h-10 rounded-xl bg-white/15 backdrop-blur-sm flex items-center justify-center"><Icon className="w-5 h-5" /></div><span className="text-xs font-medium px-2 py-0.5 rounded-full bg-white/10 text-white/80">{card.change}</span></div>
                    <p className="text-2xl font-bold">{card.value}</p>
                    <p className="text-sm text-white/70 mt-0.5">{card.label}</p>
                  </div>
                </motion.div>
              )
            })}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-5">
              <h3 className="text-base font-semibold text-foreground flex items-center gap-2 mb-4"><Layers className="w-4 h-4 text-birla-cyan" />Category-wise Books</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={categoryInventoryData} cx="50%" cy="50%" innerRadius={50} outerRadius={85} dataKey="books" label={({ category }) => category}>
                      {categoryInventoryData.map((entry, idx) => <Cell key={idx} fill={entry.color} />)}
                    </Pie>
                    <Tooltip contentStyle={tooltipStyle} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </motion.div>
            <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-5">
              <h3 className="text-base font-semibold text-foreground flex items-center gap-2 mb-4"><BookCopy className="w-4 h-4 text-birla-gold" />Monthly Circulation</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={monthlyCirculationData}>
                    <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'} />
                    <XAxis dataKey="month" tick={{ fontSize: 10 }} stroke={darkMode ? '#64748b' : '#94a3b8'} />
                    <YAxis tick={{ fontSize: 10 }} stroke={darkMode ? '#64748b' : '#94a3b8'} />
                    <Tooltip contentStyle={tooltipStyle} />
                    <Legend iconType="circle" wrapperStyle={{ fontSize: '11px' }} />
                    <Area type="monotone" dataKey="issued" stroke="#22D3EE" fill="rgba(34,211,238,0.1)" strokeWidth={2} name="Issued" />
                    <Area type="monotone" dataKey="returned" stroke="#10B981" fill="rgba(16,185,129,0.1)" strokeWidth={2} name="Returned" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}

      {/* ═══════════════════════════════════════════════════════════════
          CATALOG TAB
      ═══════════════════════════════════════════════════════════════ */}
      {activeTab === 'catalog' && (
        <motion.div variants={itemVariants} className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-semibold text-foreground flex items-center gap-2"><BookOpen className="w-5 h-5 text-birla-gold" />Library Catalog</h3>
            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg gradient-birla text-white text-xs font-medium"><Plus className="w-3.5 h-3.5" /> Add Book</button>
          </div>
          <div className="rounded-2xl border border-border bg-card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead><tr className="border-b border-border bg-muted/30">
                  <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Title</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Author</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Category</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">ISBN</th>
                  <th className="text-right px-4 py-3 text-xs font-semibold text-muted-foreground">Copies</th>
                  <th className="text-right px-4 py-3 text-xs font-semibold text-muted-foreground">Available</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Shelf</th>
                </tr></thead>
                <tbody>
                  {catalogData.map((book) => (
                    <tr key={book.id} className="border-b border-border/50 hover:bg-muted/20">
                      <td className="px-4 py-3 text-sm font-medium text-foreground">{book.title}</td>
                      <td className="px-4 py-3 text-sm text-muted-foreground">{book.author}</td>
                      <td className="px-4 py-3"><span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-purple-500/10 text-purple-600 dark:text-purple-400">{book.category}</span></td>
                      <td className="px-4 py-3 text-xs font-mono text-muted-foreground">{book.ISBN}</td>
                      <td className="px-4 py-3 text-sm text-right text-foreground">{book.copies}</td>
                      <td className="px-4 py-3 text-sm text-right"><span className={`font-bold ${book.available > 3 ? 'text-emerald-600 dark:text-emerald-400' : 'text-amber-600 dark:text-amber-400'}`}>{book.available}</span></td>
                      <td className="px-4 py-3 text-xs font-mono text-muted-foreground">{book.shelf}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>
      )}

      {/* ═══════════════════════════════════════════════════════════════
          ISSUE-RETURN TAB
      ═══════════════════════════════════════════════════════════════ */}
      {activeTab === 'issue-return' && (
        <motion.div variants={itemVariants} className="space-y-6">
          <div className="rounded-2xl border border-border bg-card overflow-hidden">
            <div className="p-5 border-b border-border"><h3 className="text-base font-semibold text-foreground flex items-center gap-2"><BookCheck className="w-4 h-4 text-emerald-500" />Current Issues</h3></div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead><tr className="border-b border-border bg-muted/30">
                  <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Issue ID</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Student</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">UDISE+ IDs</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Book</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Issue Date</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Due Date</th>
                  <th className="text-center px-4 py-3 text-xs font-semibold text-muted-foreground">Status</th>
                </tr></thead>
                <tbody>
                  {issuedBooksData.map((b) => (
                    <tr key={b.id} className="border-b border-border/50 hover:bg-muted/20">
                      <td className="px-4 py-3 text-xs font-mono text-muted-foreground">{b.id}</td>
                      <td className="px-4 py-3"><p className="text-sm font-medium text-foreground">{b.student}</p><p className="text-[10px] text-muted-foreground">{b.class}</p></td>
                      <td className="px-4 py-3"><StudentUDISE bspId={b.bspId} penNo={b.penNo} upparId={b.upparId} /></td>
                      <td className="px-4 py-3 text-sm text-foreground">{b.book}</td>
                      <td className="px-4 py-3 text-xs text-muted-foreground">{b.issueDate}</td>
                      <td className="px-4 py-3 text-xs text-muted-foreground">{b.dueDate}</td>
                      <td className="px-4 py-3 text-center"><span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${b.status === 'Issued' ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' : 'bg-red-500/10 text-red-600 dark:text-red-400'}`}>{b.status}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>
      )}

      {/* ═══════════════════════════════════════════════════════════════
          E-BOOKS TAB
      ═══════════════════════════════════════════════════════════════ */}
      {activeTab === 'ebooks' && (
        <motion.div variants={itemVariants} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {ebooksData.map((ebook) => (
              <motion.div key={ebook.id} variants={itemVariants} className="p-4 rounded-2xl border border-border gradient-card-blue hover:shadow-sm transition-all">
                <div className="flex items-center justify-between mb-2">
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-purple-500/10 text-purple-600 dark:text-purple-400">{ebook.format}</span>
                  <span className="text-[10px] text-muted-foreground">Class {ebook.class}</span>
                </div>
                <h4 className="text-sm font-semibold text-foreground mb-1">{ebook.title}</h4>
                <p className="text-[11px] text-muted-foreground">{ebook.subject}</p>
                <div className="flex items-center justify-between mt-3">
                  <span className="text-xs text-muted-foreground">{ebook.accesses} accesses</span>
                  <button className="px-2 py-1 rounded-lg gradient-birla text-white text-[10px] font-medium">View</button>
                </div>
              </motion.div>
            ))}
          </div>
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
              return (<button key={idx} onClick={() => setActiveForm(idx)} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${activeForm === idx ? 'gradient-birla text-white shadow-md' : 'border border-border text-muted-foreground hover:bg-muted'}`}><Icon className="w-3.5 h-3.5" /> {f.name}</button>)
            })}
          </div>

          {/* Form 1: Book Entry */}
          {activeForm === 0 && (
            <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-6">
              <h3 className="text-lg font-semibold text-foreground flex items-center gap-2 mb-6"><BookPlus className="w-5 h-5 text-birla-gold" />Book Entry Form</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <FormField label="Title"><InputField value={bookEntryForm.title} onChange={(e) => setBookEntryForm({ ...bookEntryForm, title: e.target.value })} placeholder="Book title" /></FormField>
                <FormField label="Author"><InputField value={bookEntryForm.author} onChange={(e) => setBookEntryForm({ ...bookEntryForm, author: e.target.value })} placeholder="Author name" /></FormField>
                <FormField label="ISBN"><InputField value={bookEntryForm.ISBN} onChange={(e) => setBookEntryForm({ ...bookEntryForm, ISBN: e.target.value })} placeholder="978-XXXXXXXXXX" /></FormField>
                <FormField label="Publisher"><InputField value={bookEntryForm.publisher} onChange={(e) => setBookEntryForm({ ...bookEntryForm, publisher: e.target.value })} placeholder="Publisher name" /></FormField>
                <FormField label="Category"><SelectField value={bookEntryForm.category} onChange={(e) => setBookEntryForm({ ...bookEntryForm, category: e.target.value })} options={['Fiction', 'Science', 'Mathematics', 'History', 'English', 'Hindi', 'Reference', 'Periodical']} /></FormField>
                <FormField label="Language"><SelectField value={bookEntryForm.language} onChange={(e) => setBookEntryForm({ ...bookEntryForm, language: e.target.value })} options={['English', 'Hindi', 'Bengali']} /></FormField>
                <FormField label="Pages"><InputField value={bookEntryForm.pages} onChange={(e) => setBookEntryForm({ ...bookEntryForm, pages: e.target.value })} placeholder="0" type="number" /></FormField>
                <FormField label="Price (₹)"><InputField value={bookEntryForm.price} onChange={(e) => setBookEntryForm({ ...bookEntryForm, price: e.target.value })} placeholder="0" type="number" /></FormField>
                <FormField label="Shelf Location"><InputField value={bookEntryForm.shelfLocation} onChange={(e) => setBookEntryForm({ ...bookEntryForm, shelfLocation: e.target.value })} placeholder="e.g. S-A1" /></FormField>
                <FormField label="Number of Copies"><InputField value={bookEntryForm.copies} onChange={(e) => setBookEntryForm({ ...bookEntryForm, copies: e.target.value })} placeholder="0" type="number" /></FormField>
                <FormField label="Accession Number"><InputField value={bookEntryForm.accessionNumber} onChange={(e) => setBookEntryForm({ ...bookEntryForm, accessionNumber: e.target.value })} placeholder="ACC-001" /></FormField>
              </div>
              <div className="mt-6 flex justify-end"><button className="px-6 py-2.5 rounded-xl gradient-birla-gold text-birla-blue text-sm font-bold hover:opacity-90 transition-opacity flex items-center gap-2"><Save className="w-4 h-4" />Add Book</button></div>
            </motion.div>
          )}

          {/* Form 2: Book Issue */}
          {activeForm === 1 && (
            <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-6">
              <h3 className="text-lg font-semibold text-foreground flex items-center gap-2 mb-6"><BookCheck className="w-5 h-5 text-emerald-500" />Book Issue Form</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <FormField label="Student Name">
                  <InputField value={bookIssueForm.studentName} onChange={(e) => setBookIssueForm({ ...bookIssueForm, studentName: e.target.value })} placeholder="Enter student name" />
                  {bookIssueForm.studentName && <StudentUDISE bspId="BSP-2025-001" penNo="PEN-XA-001" upparId="UPP-001" />}
                </FormField>
                <FormField label="Class"><SelectField value={bookIssueForm.class} onChange={(e) => setBookIssueForm({ ...bookIssueForm, class: e.target.value })} options={['I','II','III','IV','V','VI','VII','VIII','IX','X','XI','XII']} /></FormField>
                <FormField label="Book"><SelectField value={bookIssueForm.bookSelect} onChange={(e) => setBookIssueForm({ ...bookIssueForm, bookSelect: e.target.value })} options={['Concepts of Physics', 'Mathematics for Class X', 'NCERT Biology XII', 'Wings of Fire', 'India After Gandhi', 'Hindi Vyakaran', 'Organic Chemistry', 'The Discovery of India']} /></FormField>
                <FormField label="Issue Date"><InputField value={bookIssueForm.issueDate} onChange={(e) => setBookIssueForm({ ...bookIssueForm, issueDate: e.target.value })} type="date" /></FormField>
                <FormField label="Due Date"><InputField value={bookIssueForm.dueDate} onChange={(e) => setBookIssueForm({ ...bookIssueForm, dueDate: e.target.value })} type="date" /></FormField>
                <FormField label="Issued By"><InputField value={bookIssueForm.issuedBy} onChange={(e) => setBookIssueForm({ ...bookIssueForm, issuedBy: e.target.value })} placeholder="Librarian name" /></FormField>
              </div>
              <div className="mt-6 flex justify-end"><button className="px-6 py-2.5 rounded-xl gradient-birla-gold text-birla-blue text-sm font-bold hover:opacity-90 transition-opacity flex items-center gap-2"><Save className="w-4 h-4" />Issue Book</button></div>
            </motion.div>
          )}

          {/* Form 3: Book Return */}
          {activeForm === 2 && (
            <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-6">
              <h3 className="text-lg font-semibold text-foreground flex items-center gap-2 mb-6"><BookOpenCheck className="w-5 h-5 text-blue-500" />Book Return Form</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <FormField label="Issue ID"><InputField value={bookReturnForm.issueId} onChange={(e) => setBookReturnForm({ ...bookReturnForm, issueId: e.target.value })} placeholder="ISS-001" /></FormField>
                <FormField label="Student Name">
                  <InputField value={bookReturnForm.studentName} onChange={(e) => setBookReturnForm({ ...bookReturnForm, studentName: e.target.value })} placeholder="Enter student name" />
                  {bookReturnForm.studentName && <StudentUDISE bspId="BSP-2025-012" penNo="PEN-VIIIA-012" upparId="UPP-012" />}
                </FormField>
                <FormField label="Book Title"><InputField value={bookReturnForm.bookTitle} onChange={(e) => setBookReturnForm({ ...bookReturnForm, bookTitle: e.target.value })} placeholder="Book title" /></FormField>
                <FormField label="Return Date"><InputField value={bookReturnForm.returnDate} onChange={(e) => setBookReturnForm({ ...bookReturnForm, returnDate: e.target.value })} type="date" /></FormField>
                <FormField label="Condition"><SelectField value={bookReturnForm.condition} onChange={(e) => setBookReturnForm({ ...bookReturnForm, condition: e.target.value })} options={['Good', 'Damaged', 'Lost']} /></FormField>
                <FormField label="Fine (₹) - Auto Calc">
                  <input type="text" value={bookReturnForm.condition === 'Lost' ? '₹' + (Number(bookReturnForm.fine) || 500) : bookReturnForm.condition === 'Damaged' ? '₹' + (Number(bookReturnForm.fine) || 100) : '₹0'} readOnly className="w-full px-3 py-2 rounded-lg border border-input bg-muted text-sm text-foreground font-bold" />
                </FormField>
                <FormField label="Remarks"><InputField value={bookReturnForm.remarks} onChange={(e) => setBookReturnForm({ ...bookReturnForm, remarks: e.target.value })} placeholder="Any remarks" /></FormField>
              </div>
              <div className="mt-6 flex justify-end"><button className="px-6 py-2.5 rounded-xl gradient-birla-gold text-birla-blue text-sm font-bold hover:opacity-90 transition-opacity flex items-center gap-2"><Save className="w-4 h-4" />Return Book</button></div>
            </motion.div>
          )}

          {/* Form 4: E-Book Upload */}
          {activeForm === 3 && (
            <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-6">
              <h3 className="text-lg font-semibold text-foreground flex items-center gap-2 mb-6"><Upload className="w-5 h-5 text-purple-500" />E-Book Upload Form</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <FormField label="Title"><InputField value={ebookForm.title} onChange={(e) => setEbookForm({ ...ebookForm, title: e.target.value })} placeholder="E-Book title" /></FormField>
                <FormField label="Author"><InputField value={ebookForm.author} onChange={(e) => setEbookForm({ ...ebookForm, author: e.target.value })} placeholder="Author name" /></FormField>
                <FormField label="Subject"><InputField value={ebookForm.subject} onChange={(e) => setEbookForm({ ...ebookForm, subject: e.target.value })} placeholder="e.g. Physics, Mathematics" /></FormField>
                <FormField label="Class"><SelectField value={ebookForm.class} onChange={(e) => setEbookForm({ ...ebookForm, class: e.target.value })} options={['I','II','III','IV','V','VI','VII','VIII','IX','X','XI','XII','All']} /></FormField>
                <FormField label="Description"><InputField value={ebookForm.description} onChange={(e) => setEbookForm({ ...ebookForm, description: e.target.value })} placeholder="Brief description" /></FormField>
                <FormField label="Format"><SelectField value={ebookForm.format} onChange={(e) => setEbookForm({ ...ebookForm, format: e.target.value })} options={['PDF', 'EPUB', 'Video', 'Audio']} /></FormField>
                <FormField label="Access Level"><SelectField value={ebookForm.accessLevel} onChange={(e) => setEbookForm({ ...ebookForm, accessLevel: e.target.value })} options={['All', 'Students', 'Teachers', 'Premium']} /></FormField>
                <FormField label="Tags"><InputField value={ebookForm.tags} onChange={(e) => setEbookForm({ ...ebookForm, tags: e.target.value })} placeholder="Comma separated tags" /></FormField>
                <FormField label="File Size (MB)"><InputField value={ebookForm.fileSize} onChange={(e) => setEbookForm({ ...ebookForm, fileSize: e.target.value })} placeholder="0" type="number" /></FormField>
              </div>
              <div className="mt-6 flex justify-end"><button className="px-6 py-2.5 rounded-xl gradient-birla-gold text-birla-blue text-sm font-bold hover:opacity-90 transition-opacity flex items-center gap-2"><Save className="w-4 h-4" />Upload E-Book</button></div>
            </motion.div>
          )}

          {/* Form 5: Library Membership */}
          {activeForm === 4 && (
            <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-6">
              <h3 className="text-lg font-semibold text-foreground flex items-center gap-2 mb-6"><Shield className="w-5 h-5 text-birla-cyan" />Library Membership Form</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <FormField label="Student Name">
                  <InputField value={membershipForm.studentName} onChange={(e) => setMembershipForm({ ...membershipForm, studentName: e.target.value })} placeholder="Enter student name" />
                  {membershipForm.studentName && <StudentUDISE bspId="BSP-2025-045" penNo="PEN-IXB-045" upparId="UPP-045" />}
                </FormField>
                <FormField label="Class"><SelectField value={membershipForm.class} onChange={(e) => setMembershipForm({ ...membershipForm, class: e.target.value })} options={['I','II','III','IV','V','VI','VII','VIII','IX','X','XI','XII']} /></FormField>
                <FormField label="Membership Type"><SelectField value={membershipForm.membershipType} onChange={(e) => setMembershipForm({ ...membershipForm, membershipType: e.target.value })} options={['Standard', 'Premium']} /></FormField>
                <FormField label="Issue Date"><InputField value={membershipForm.issueDate} onChange={(e) => setMembershipForm({ ...membershipForm, issueDate: e.target.value })} type="date" /></FormField>
                <FormField label="Valid Till"><InputField value={membershipForm.validTill} onChange={(e) => setMembershipForm({ ...membershipForm, validTill: e.target.value })} type="date" /></FormField>
                <FormField label="Security Deposit (₹)"><InputField value={membershipForm.securityDeposit} onChange={(e) => setMembershipForm({ ...membershipForm, securityDeposit: e.target.value })} placeholder="500" type="number" /></FormField>
              </div>
              <div className="mt-6 flex justify-end"><button className="px-6 py-2.5 rounded-xl gradient-birla-gold text-birla-blue text-sm font-bold hover:opacity-90 transition-opacity flex items-center gap-2"><Save className="w-4 h-4" />Create Membership</button></div>
            </motion.div>
          )}

          {/* Form 6: Book Reservation */}
          {activeForm === 5 && (
            <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-6">
              <h3 className="text-lg font-semibold text-foreground flex items-center gap-2 mb-6"><BookMarked className="w-5 h-5 text-amber-500" />Book Reservation Form</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <FormField label="Student Name">
                  <InputField value={reservationForm.studentName} onChange={(e) => setReservationForm({ ...reservationForm, studentName: e.target.value })} placeholder="Enter student name" />
                  {reservationForm.studentName && <StudentUDISE bspId="BSP-2025-067" penNo="PEN-VIB-067" upparId="UPP-067" />}
                </FormField>
                <FormField label="Book Title"><SelectField value={reservationForm.bookTitle} onChange={(e) => setReservationForm({ ...reservationForm, bookTitle: e.target.value })} options={['Concepts of Physics', 'Mathematics for Class X', 'NCERT Biology XII', 'Wings of Fire', 'India After Gandhi', 'Hindi Vyakaran', 'Organic Chemistry', 'The Discovery of India']} /></FormField>
                <FormField label="Reservation Date"><InputField value={reservationForm.reservationDate} onChange={(e) => setReservationForm({ ...reservationForm, reservationDate: e.target.value })} type="date" /></FormField>
                <FormField label="Priority"><SelectField value={reservationForm.priority} onChange={(e) => setReservationForm({ ...reservationForm, priority: e.target.value })} options={['Normal', 'High', 'Urgent']} /></FormField>
                <FormField label="Notification Preference"><SelectField value={reservationForm.notificationPreference} onChange={(e) => setReservationForm({ ...reservationForm, notificationPreference: e.target.value })} options={['SMS', 'Email', 'Both', 'App Notification']} /></FormField>
              </div>
              <div className="mt-6 flex justify-end"><button className="px-6 py-2.5 rounded-xl gradient-birla-gold text-birla-blue text-sm font-bold hover:opacity-90 transition-opacity flex items-center gap-2"><Save className="w-4 h-4" />Reserve Book</button></div>
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
              return (<button key={idx} onClick={() => setActiveReport(idx)} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${activeReport === idx ? 'gradient-birla text-white shadow-md' : 'border border-border text-muted-foreground hover:bg-muted'}`}><Icon className="w-3.5 h-3.5" /> {r.name}</button>)
            })}
          </div>

          {/* Report 1: Books Issued Report */}
          {activeReport === 0 && (
            <motion.div variants={itemVariants} className="space-y-4">
              <div className="rounded-2xl border border-border bg-card p-5">
                <h3 className="text-base font-semibold text-foreground flex items-center gap-2 mb-4"><BookCheck className="w-4 h-4 text-birla-cyan" />Books Issued Report by Category</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={booksIssuedReportData}>
                      <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'} />
                      <XAxis dataKey="category" tick={{ fontSize: 9 }} stroke={darkMode ? '#64748b' : '#94a3b8'} />
                      <YAxis tick={{ fontSize: 10 }} stroke={darkMode ? '#64748b' : '#94a3b8'} />
                      <Tooltip contentStyle={tooltipStyle} />
                      <Legend iconType="circle" wrapperStyle={{ fontSize: '11px' }} />
                      <Bar dataKey="issued" fill="#22D3EE" name="Issued" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="available" fill="#C8A45C" name="Available" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
              <div className="rounded-2xl border border-border bg-card overflow-hidden">
                <table className="w-full">
                  <thead><tr className="border-b border-border bg-muted/30"><th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Category</th><th className="text-right px-4 py-3 text-xs font-semibold text-muted-foreground">Issued</th><th className="text-right px-4 py-3 text-xs font-semibold text-muted-foreground">Available</th><th className="text-right px-4 py-3 text-xs font-semibold text-muted-foreground">Total</th></tr></thead>
                  <tbody>{booksIssuedReportData.map((d) => (<tr key={d.category} className="border-b border-border/50 hover:bg-muted/20"><td className="px-4 py-3 text-sm font-medium text-foreground">{d.category}</td><td className="px-4 py-3 text-sm text-right text-birla-cyan font-bold">{d.issued}</td><td className="px-4 py-3 text-sm text-right text-emerald-600 dark:text-emerald-400">{d.available}</td><td className="px-4 py-3 text-sm text-right text-foreground">{d.issued + d.available}</td></tr>))}</tbody>
                </table>
              </div>
            </motion.div>
          )}

          {/* Report 2: Overdue Books Report */}
          {activeReport === 1 && (
            <motion.div variants={itemVariants} className="space-y-4">
              <div className="rounded-2xl border border-border bg-card p-5">
                <h3 className="text-base font-semibold text-foreground flex items-center gap-2 mb-4"><BookX className="w-4 h-4 text-red-500" />Overdue Books Report</h3>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead><tr className="border-b border-border bg-muted/30">
                      <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Student</th>
                      <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">BSP ID</th>
                      <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">PEN No</th>
                      <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Uppar ID</th>
                      <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Book</th>
                      <th className="text-right px-4 py-3 text-xs font-semibold text-muted-foreground">Days Overdue</th>
                      <th className="text-right px-4 py-3 text-xs font-semibold text-muted-foreground">Fine (₹)</th>
                    </tr></thead>
                    <tbody>
                      {overdueBooksData.map((d, idx) => (
                        <tr key={idx} className="border-b border-border/50 hover:bg-muted/20">
                          <td className="px-4 py-3 text-sm font-medium text-foreground">{d.student}<span className="text-[10px] text-muted-foreground ml-1">{d.class}</span></td>
                          <td className="px-4 py-3 text-xs text-blue-600 dark:text-blue-400 font-mono">{d.bspId}</td>
                          <td className="px-4 py-3 text-xs text-emerald-600 dark:text-emerald-400 font-mono">{d.penNo}</td>
                          <td className="px-4 py-3 text-xs text-amber-600 dark:text-amber-400 font-mono">{d.upparId}</td>
                          <td className="px-4 py-3 text-sm text-foreground">{d.book}</td>
                          <td className="px-4 py-3 text-sm text-right"><span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-red-500/10 text-red-600 dark:text-red-400">{d.daysOverdue} days</span></td>
                          <td className="px-4 py-3 text-sm text-right font-bold text-red-600 dark:text-red-400">₹{d.fine}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          )}

          {/* Report 3: E-Book Usage Report */}
          {activeReport === 2 && (
            <motion.div variants={itemVariants} className="space-y-4">
              <div className="rounded-2xl border border-border bg-card p-5">
                <h3 className="text-base font-semibold text-foreground flex items-center gap-2 mb-4"><Monitor className="w-4 h-4 text-purple-500" />E-Book Usage Report</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={ebookUsageData}>
                      <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'} />
                      <XAxis dataKey="title" tick={{ fontSize: 8 }} stroke={darkMode ? '#64748b' : '#94a3b8'} />
                      <YAxis tick={{ fontSize: 10 }} stroke={darkMode ? '#64748b' : '#94a3b8'} />
                      <Tooltip contentStyle={tooltipStyle} />
                      <Bar dataKey="accesses" fill="#8B5CF6" name="Accesses" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
              <div className="rounded-2xl border border-border bg-card overflow-hidden">
                <table className="w-full">
                  <thead><tr className="border-b border-border bg-muted/30"><th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Title</th><th className="text-right px-4 py-3 text-xs font-semibold text-muted-foreground">Accesses</th></tr></thead>
                  <tbody>{ebookUsageData.map((d) => (<tr key={d.title} className="border-b border-border/50 hover:bg-muted/20"><td className="px-4 py-3 text-sm font-medium text-foreground">{d.title}</td><td className="px-4 py-3 text-sm text-right font-bold text-purple-600 dark:text-purple-400">{d.accesses}</td></tr>))}</tbody>
                </table>
              </div>
            </motion.div>
          )}

          {/* Report 4: Library Membership Report */}
          {activeReport === 3 && (
            <motion.div variants={itemVariants} className="space-y-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="rounded-2xl border border-border bg-card p-5">
                  <h3 className="text-base font-semibold text-foreground flex items-center gap-2 mb-4"><Shield className="w-4 h-4 text-birla-cyan" />Class-wise Membership</h3>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie data={membershipData} cx="50%" cy="50%" innerRadius={50} outerRadius={85} dataKey="members" label={({ class: cls, members }) => `${cls}: ${members}`}>
                          {membershipData.map((entry, idx) => <Cell key={idx} fill={entry.color} />)}
                        </Pie>
                        <Tooltip contentStyle={tooltipStyle} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
                <div className="rounded-2xl border border-border bg-card overflow-hidden">
                  <table className="w-full">
                    <thead><tr className="border-b border-border bg-muted/30"><th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Class</th><th className="text-right px-4 py-3 text-xs font-semibold text-muted-foreground">Members</th><th className="text-right px-4 py-3 text-xs font-semibold text-muted-foreground">Total Students</th><th className="text-right px-4 py-3 text-xs font-semibold text-muted-foreground">% Enrolled</th></tr></thead>
                    <tbody>{membershipData.map((d) => { const pct = ((d.members / d.total) * 100).toFixed(0); return (<tr key={d.class} className="border-b border-border/50 hover:bg-muted/20"><td className="px-4 py-3 text-sm font-medium text-foreground">{d.class}</td><td className="px-4 py-3 text-sm text-right font-bold text-birla-cyan">{d.members}</td><td className="px-4 py-3 text-sm text-right">{d.total}</td><td className="px-4 py-3 text-right"><span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${Number(pct) >= 90 ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' : 'bg-amber-500/10 text-amber-600 dark:text-amber-400'}`}>{pct}%</span></td></tr>); })}</tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          )}

          {/* Report 5: Monthly Circulation Report */}
          {activeReport === 4 && (
            <motion.div variants={itemVariants} className="space-y-4">
              <div className="rounded-2xl border border-border bg-card p-5">
                <h3 className="text-base font-semibold text-foreground flex items-center gap-2 mb-4"><BookCopy className="w-4 h-4 text-birla-gold" />Monthly Circulation Report</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={monthlyCirculationData}>
                      <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'} />
                      <XAxis dataKey="month" tick={{ fontSize: 10 }} stroke={darkMode ? '#64748b' : '#94a3b8'} />
                      <YAxis tick={{ fontSize: 10 }} stroke={darkMode ? '#64748b' : '#94a3b8'} />
                      <Tooltip contentStyle={tooltipStyle} />
                      <Legend iconType="circle" wrapperStyle={{ fontSize: '11px' }} />
                      <Line type="monotone" dataKey="issued" stroke="#22D3EE" strokeWidth={2} name="Issued" />
                      <Line type="monotone" dataKey="returned" stroke="#10B981" strokeWidth={2} name="Returned" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
              <div className="rounded-2xl border border-border bg-card overflow-hidden">
                <table className="w-full">
                  <thead><tr className="border-b border-border bg-muted/30"><th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Month</th><th className="text-right px-4 py-3 text-xs font-semibold text-muted-foreground">Issued</th><th className="text-right px-4 py-3 text-xs font-semibold text-muted-foreground">Returned</th><th className="text-right px-4 py-3 text-xs font-semibold text-muted-foreground">Net Change</th></tr></thead>
                  <tbody>{monthlyCirculationData.map((d) => { const net = d.issued - d.returned; return (<tr key={d.month} className="border-b border-border/50 hover:bg-muted/20"><td className="px-4 py-3 text-sm font-medium text-foreground">{d.month}</td><td className="px-4 py-3 text-sm text-right text-birla-cyan font-bold">{d.issued}</td><td className="px-4 py-3 text-sm text-right text-emerald-600 dark:text-emerald-400">{d.returned}</td><td className={`px-4 py-3 text-sm text-right font-medium ${net > 0 ? 'text-amber-600 dark:text-amber-400' : 'text-emerald-600 dark:text-emerald-400'}`}>{net > 0 ? '+' : ''}{net}</td></tr>); })}</tbody>
                </table>
              </div>
            </motion.div>
          )}

          {/* Report 6: Category-wise Inventory Report */}
          {activeReport === 5 && (
            <motion.div variants={itemVariants} className="space-y-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="rounded-2xl border border-border bg-card p-5">
                  <h3 className="text-base font-semibold text-foreground flex items-center gap-2 mb-4"><Layers className="w-4 h-4 text-birla-gold" />Category-wise Inventory</h3>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie data={categoryInventoryData} cx="50%" cy="50%" innerRadius={50} outerRadius={85} dataKey="books" label={({ category }) => category}>
                          {categoryInventoryData.map((entry, idx) => <Cell key={idx} fill={entry.color} />)}
                        </Pie>
                        <Tooltip contentStyle={tooltipStyle} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
                <div className="rounded-2xl border border-border bg-card overflow-hidden">
                  <table className="w-full">
                    <thead><tr className="border-b border-border bg-muted/30"><th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Category</th><th className="text-right px-4 py-3 text-xs font-semibold text-muted-foreground">Books</th><th className="text-right px-4 py-3 text-xs font-semibold text-muted-foreground">% Share</th></tr></thead>
                    <tbody>{categoryInventoryData.map((d) => { const total = categoryInventoryData.reduce((s, e) => s + e.books, 0); return (<tr key={d.category} className="border-b border-border/50 hover:bg-muted/20"><td className="px-4 py-3 text-sm font-medium text-foreground flex items-center gap-2"><span className="w-3 h-3 rounded-full" style={{ backgroundColor: d.color }} />{d.category}</td><td className="px-4 py-3 text-sm text-right font-bold">{d.books}</td><td className="px-4 py-3 text-sm text-right text-muted-foreground">{((d.books / total) * 100).toFixed(1)}%</td></tr>); })}</tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>
      )}
    </motion.div>
  )
}
