'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  BookOpen, Search, Filter, Plus, Eye, Edit, Trash2, ChevronRight,
  CheckCircle2, AlertTriangle, XCircle, Download, Upload, Clock,
  Star, Library, ScanLine, CreditCard, ArrowRight, BookmarkPlus,
  BookMarked, BookCopy, RefreshCw, Send, TrendingUp, BarChart3,
  Sparkles, ThumbsUp, Users, IndianRupee, Calendar, Tag, Hash,
  FileText, Monitor, Smartphone, Globe
} from 'lucide-react'
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Legend, PieChart, Pie, Cell
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

const topStats = [
  { label: 'Total Books', value: '12,500', icon: BookOpen, color: 'text-birla-cyan bg-birla-cyan/10', change: '+320 this year' },
  { label: 'Issued', value: '1,240', icon: BookCopy, color: 'text-birla-gold bg-birla-gold/10', change: '9.9% of total' },
  { label: 'E-Books', value: '3,200', icon: Monitor, color: 'text-purple-500 bg-purple-500/10', change: '+540 new titles' },
  { label: 'Overdue', value: '45', icon: AlertTriangle, color: 'text-red-500 bg-red-500/10', change: '12 critical' },
]

const books = [
  { id: 'LIB-001', title: 'Mathematics for Class X', author: 'R.D. Sharma', category: 'Mathematics', isbn: '978-81-932-XXXX-1', available: 8, total: 15, shelf: 'A-12', publisher: 'Dhanpat Rai', year: 2024, price: '₹495' },
  { id: 'LIB-002', title: 'Concepts of Physics Vol. 1', author: 'H.C. Verma', category: 'Science', isbn: '978-81-770-XXXX-2', available: 3, total: 10, shelf: 'B-04', publisher: 'Bharati Bhawan', year: 2023, price: '₹380' },
  { id: 'LIB-003', title: 'English Communicative Course', author: 'Oxford University', category: 'English', isbn: '978-01-946-XXXX-3', available: 12, total: 20, shelf: 'C-08', publisher: 'Oxford Press', year: 2024, price: '₹520' },
  { id: 'LIB-004', title: 'India and Contemporary World', author: 'NCERT', category: 'History', isbn: '978-81-745-XXXX-4', available: 0, total: 8, shelf: 'D-15', publisher: 'NCERT', year: 2024, price: '₹135' },
  { id: 'LIB-005', title: 'Hindi Kshitij Bhag-2', author: 'NCERT', category: 'Hindi', isbn: '978-81-745-XXXX-5', available: 5, total: 12, shelf: 'C-03', publisher: 'NCERT', year: 2024, price: '₹110' },
  { id: 'LIB-006', title: 'Introduction to Python', author: 'Mark Lutz', category: 'Computer Science', isbn: '978-14-493-XXXX-6', available: 2, total: 6, shelf: 'E-09', publisher: "O'Reilly", year: 2023, price: '₹895' },
  { id: 'LIB-007', title: 'Organic Chemistry', author: 'Morrison & Boyd', category: 'Science', isbn: '978-01-315-XXXX-7', available: 4, total: 10, shelf: 'B-06', publisher: 'Pearson', year: 2023, price: '₹750' },
  { id: 'LIB-008', title: 'Wings of Fire', author: 'A.P.J. Abdul Kalam', category: 'Biography', isbn: '978-81-737-XXXX-8', available: 1, total: 7, shelf: 'F-02', publisher: 'Universities Press', year: 2022, price: '₹295' },
  { id: 'LIB-009', title: 'The Discovery of India', author: 'Jawaharlal Nehru', category: 'History', isbn: '978-01-433-XXXX-9', available: 3, total: 5, shelf: 'D-11', publisher: 'Penguin India', year: 2021, price: '₹399' },
  { id: 'LIB-010', title: 'Geometry & Mensuration', author: 'S.L. Loney', category: 'Mathematics', isbn: '978-81-291-XXXX-0', available: 6, total: 10, shelf: 'A-07', publisher: 'Arihant', year: 2024, price: '₹275' },
  { id: 'LIB-011', title: 'Environmental Studies', author: 'Erach Bharucha', category: 'EVS', isbn: '978-81-737-XXXX-1', available: 9, total: 14, shelf: 'D-18', publisher: 'UGC', year: 2023, price: '₹185' },
  { id: 'LIB-012', title: 'Art & Culture of India', author: 'Nitin Singhania', category: 'Art', isbn: '978-93-863-XXXX-2', available: 2, total: 5, shelf: 'F-14', publisher: 'McGraw Hill', year: 2024, price: '₹545' },
]

const rfidTransactions = [
  { id: 'TXN-001', type: 'Issue', student: 'Aarav Sharma', studentId: 'BOM-2025-001', book: 'Concepts of Physics Vol. 1', bookId: 'LIB-002', date: 'Mar 1, 2026', dueDate: 'Mar 15, 2026', status: 'Active' },
  { id: 'TXN-002', type: 'Issue', student: 'Priya Gupta', studentId: 'BOM-2025-002', book: 'Introduction to Python', bookId: 'LIB-006', date: 'Feb 28, 2026', dueDate: 'Mar 14, 2026', status: 'Active' },
  { id: 'TXN-003', type: 'Return', student: 'Arjun Reddy', studentId: 'BOM-2025-003', book: 'Wings of Fire', bookId: 'LIB-008', date: 'Mar 1, 2026', dueDate: 'Feb 28, 2026', status: 'Overdue Return' },
  { id: 'TXN-004', type: 'Issue', student: 'Ananya Iyer', studentId: 'BOM-2025-004', book: 'The Discovery of India', bookId: 'LIB-009', date: 'Feb 27, 2026', dueDate: 'Mar 13, 2026', status: 'Active' },
  { id: 'TXN-005', type: 'Return', student: 'Rohan Patel', studentId: 'BOM-2025-005', book: 'Organic Chemistry', bookId: 'LIB-007', date: 'Mar 1, 2026', dueDate: 'Mar 5, 2026', status: 'On Time' },
  { id: 'TXN-006', type: 'Issue', student: 'Ishita Banerjee', studentId: 'BOM-2025-006', book: 'India and Contemporary World', bookId: 'LIB-004', date: 'Feb 25, 2026', dueDate: 'Mar 11, 2026', status: 'Active' },
  { id: 'TXN-007', type: 'Return', student: 'Vivaan Kumar', studentId: 'BOM-2025-007', book: 'Mathematics for Class X', bookId: 'LIB-001', date: 'Mar 1, 2026', dueDate: 'Mar 1, 2026', status: 'On Time' },
  { id: 'TXN-008', type: 'Issue', student: 'Meera Nair', studentId: 'BOM-2025-008', book: 'Art & Culture of India', bookId: 'LIB-012', date: 'Feb 26, 2026', dueDate: 'Mar 12, 2026', status: 'Active' },
]

const eBooks = [
  { id: 'EB-001', title: 'NCERT Mathematics X', author: 'NCERT', category: 'Mathematics', cover: '📐', accessCount: 1245, rating: 4.5, format: 'PDF', size: '45 MB', pages: 320 },
  { id: 'EB-002', title: 'NCERT Science X', author: 'NCERT', category: 'Science', cover: '🔬', accessCount: 1180, rating: 4.3, format: 'PDF', size: '52 MB', pages: 286 },
  { id: 'EB-003', title: 'NCERT History X', author: 'NCERT', category: 'History', cover: '🏛️', accessCount: 892, rating: 4.1, format: 'PDF', size: '38 MB', pages: 256 },
  { id: 'EB-004', title: 'Python Programming Basics', author: 'Swaroop C H', category: 'Computer Science', cover: '🐍', accessCount: 756, rating: 4.6, format: 'EPUB', size: '12 MB', pages: 180 },
  { id: 'EB-005', title: 'Hindi Vyakaran', author: 'Dr. Vasudev Nandan', category: 'Hindi', cover: '📝', accessCount: 654, rating: 4.0, format: 'PDF', size: '28 MB', pages: 210 },
  { id: 'EB-006', title: 'Environmental Awareness', author: 'Dr. R.K. Sharma', category: 'EVS', cover: '🌿', accessCount: 432, rating: 3.8, format: 'PDF', size: '35 MB', pages: 195 },
  { id: 'EB-007', title: 'Digital Art & Design', author: 'Priya Menon', category: 'Art', cover: '🎨', accessCount: 389, rating: 4.4, format: 'EPUB', size: '88 MB', pages: 240 },
  { id: 'EB-008', title: 'Financial Literacy for Teens', author: 'RBI Initiative', category: 'Economics', cover: '💰', accessCount: 567, rating: 4.2, format: 'PDF', size: '22 MB', pages: 165 },
  { id: 'EB-009', title: 'Indian Constitution Simplified', author: 'Subhash Kashyap', category: 'Civics', cover: '⚖️', accessCount: 478, rating: 4.7, format: 'PDF', size: '30 MB', pages: 275 },
  { id: 'EB-010', title: 'Yoga & Wellness Guide', author: 'Ministry of AYUSH', category: 'Wellness', cover: '🧘', accessCount: 623, rating: 4.3, format: 'EPUB', size: '18 MB', pages: 140 },
]

const booksByCategory = [
  { category: 'Mathematics', issued: 185 },
  { category: 'Science', issued: 220 },
  { category: 'English', issued: 165 },
  { category: 'Hindi', issued: 140 },
  { category: 'History', issued: 98 },
  { category: 'CS', issued: 75 },
  { category: 'Biography', issued: 62 },
  { category: 'Art', issued: 48 },
  { category: 'EVS', issued: 55 },
  { category: 'Economics', issued: 42 },
]

const monthlyTrends = [
  { month: 'Apr', issued: 145, returned: 132 },
  { month: 'May', issued: 128, returned: 118 },
  { month: 'Jun', issued: 98, returned: 105 },
  { month: 'Jul', issued: 156, returned: 140 },
  { month: 'Aug', issued: 168, returned: 152 },
  { month: 'Sep', issued: 178, returned: 165 },
  { month: 'Oct', issued: 162, returned: 158 },
  { month: 'Nov', issued: 195, returned: 180 },
  { month: 'Dec', issued: 142, returned: 135 },
  { month: 'Jan', issued: 188, returned: 172 },
  { month: 'Feb', issued: 205, returned: 190 },
  { month: 'Mar', issued: 175, returned: 160 },
]

const recommendations = [
  { id: 1, student: 'Aarav Sharma', class: 'X-A', books: [
    { title: 'Problems in General Physics', author: 'I.E. Irodov', reason: 'Based on Physics interest', match: 95 },
    { title: 'Higher Algebra', author: 'Hall & Knight', reason: 'Mathematics aptitude', match: 88 },
    { title: 'The Immortals of Meluha', author: 'Amish Tripathi', reason: 'History + Fiction interest', match: 82 },
  ]},
  { id: 2, student: 'Priya Gupta', class: 'X-A', books: [
    { title: 'Data Structures in Python', author: 'Narasimha Karumanchi', reason: 'Python continuation', match: 97 },
    { title: 'NCERT Biology XII', author: 'NCERT', reason: 'Science aptitude', match: 85 },
    { title: 'The Palace of Illusions', author: 'Chitra Divakaruni', reason: 'Mythology interest', match: 79 },
  ]},
  { id: 3, student: 'Ananya Iyer', class: 'VIII-A', books: [
    { title: 'The Diary of a Young Girl', author: 'Anne Frank', reason: 'History + Biography', match: 91 },
    { title: 'NCERT Geography VIII', author: 'NCERT', reason: 'Social Science strength', match: 86 },
    { title: 'Little Women', author: 'Louisa May Alcott', reason: 'Classic literature', match: 80 },
  ]},
]

const categoryColors = ['#0A1628', '#22D3EE', '#C8A45C', '#8B5CF6', '#10B981', '#F59E0B', '#EF4444', '#3B82F6', '#EC4899', '#6366F1']

export default function LibraryModule() {
  const { darkMode } = useAppStore()
  const [activeTab, setActiveTab] = useState('catalog')
  const [searchQuery, setSearchQuery] = useState('')
  const [filterCategory, setFilterCategory] = useState('All')
  const [rfidMode, setRfidMode] = useState('issue')

  const tabs = [
    { id: 'catalog', label: 'Smart Catalog', icon: BookOpen },
    { id: 'rfid', label: 'RFID Issue/Return', icon: ScanLine },
    { id: 'ebooks', label: 'E-Book Library', icon: Monitor },
    { id: 'analytics', label: 'Reading Analytics', icon: BarChart3 },
    { id: 'recommend', label: 'Recommendations', icon: Sparkles },
  ]

  const tooltipStyle = {
    backgroundColor: darkMode ? '#1A2D4A' : '#fff',
    border: `1px solid ${darkMode ? 'rgba(255,255,255,0.1)' : '#e2e8f0'}`,
    borderRadius: '12px',
    fontSize: '12px',
    color: darkMode ? '#e2e8f0' : '#1e293b',
  }

  const categories = ['All', ...Array.from(new Set(books.map((b) => b.category)))]

  const filteredBooks = books.filter((b) => {
    const matchesSearch = b.title.toLowerCase().includes(searchQuery.toLowerCase()) || b.author.toLowerCase().includes(searchQuery.toLowerCase()) || b.isbn.includes(searchQuery)
    const matchesCategory = filterCategory === 'All' || b.category === filterCategory
    return matchesSearch && matchesCategory
  })

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="p-4 lg:p-6 space-y-6 max-w-[1600px] mx-auto"
    >
      {/* Top Stats */}
      <motion.div variants={itemVariants} className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {topStats.map((stat) => {
          const Icon = stat.icon
          return (
            <div key={stat.label} className="rounded-2xl border border-border bg-card p-4 hover:shadow-md transition-all">
              <div className="flex items-center justify-between mb-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${stat.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-[10px] text-muted-foreground">{stat.change}</span>
              </div>
              <p className="text-2xl font-bold text-foreground">{stat.value}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{stat.label}</p>
            </div>
          )
        })}
      </motion.div>

      {/* Tab Navigation */}
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

      {/* Smart Catalog */}
      {activeTab === 'catalog' && (
        <motion.div variants={itemVariants} className="space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <h3 className="text-base font-semibold text-foreground flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-birla-cyan" />
              Smart Catalog
              <span className="px-2 py-0.5 rounded-full bg-muted text-xs text-muted-foreground">{books.length} books</span>
            </h3>
            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg gradient-birla text-white text-xs font-medium">
              <Plus className="w-3.5 h-3.5" /> Add Book
            </button>
          </div>

          {/* Search and Filter */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search by title, author, or ISBN..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-xl border border-input bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-birla-gold/40 focus:border-birla-gold transition-all"
              />
            </div>
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="px-3 py-2 rounded-xl border border-input bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-birla-gold/40"
            >
              {categories.map((c) => (
                <option key={c} value={c}>{c === 'All' ? 'All Categories' : c}</option>
              ))}
            </select>
          </div>

          {/* Book Table */}
          <div className="rounded-2xl border border-border bg-card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border bg-muted/30">
                    <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Book ID</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Title</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Author</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Category</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">ISBN</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Availability</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Shelf</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Price</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredBooks.map((book) => (
                    <tr key={book.id} className="border-b border-border/50 hover:bg-muted/20 transition-colors">
                      <td className="px-4 py-3 text-xs font-mono text-birla-cyan">{book.id}</td>
                      <td className="px-4 py-3">
                        <p className="text-sm font-medium text-foreground">{book.title}</p>
                        <p className="text-[10px] text-muted-foreground">{book.publisher} &bull; {book.year}</p>
                      </td>
                      <td className="px-4 py-3 text-sm text-foreground">{book.author}</td>
                      <td className="px-4 py-3">
                        <span className="px-2 py-0.5 rounded-full bg-muted text-[10px] font-medium text-muted-foreground">{book.category}</span>
                      </td>
                      <td className="px-4 py-3 text-xs font-mono text-muted-foreground">{book.isbn}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <div className="w-12 h-1.5 rounded-full bg-muted overflow-hidden">
                            <div
                              className="h-full rounded-full"
                              style={{
                                width: `${(book.available / book.total) * 100}%`,
                                backgroundColor: book.available === 0 ? '#EF4444' : book.available <= 3 ? '#F59E0B' : '#10B981',
                              }}
                            />
                          </div>
                          <span className={`text-xs ${book.available === 0 ? 'text-red-600 dark:text-red-400' : 'text-foreground'}`}>
                            {book.available}/{book.total}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-xs text-foreground">{book.shelf}</td>
                      <td className="px-4 py-3 text-xs text-foreground">{book.price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>
      )}

      {/* RFID Issue-Return */}
      {activeTab === 'rfid' && (
        <motion.div variants={itemVariants} className="space-y-4">
          <h3 className="text-base font-semibold text-foreground flex items-center gap-2">
            <ScanLine className="w-5 h-5 text-birla-gold" />
            RFID Issue & Return System
          </h3>

          {/* Mode Toggle */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setRfidMode('issue')}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-medium transition-all ${
                rfidMode === 'issue' ? 'gradient-birla text-white shadow-md' : 'border border-border text-muted-foreground hover:bg-muted'
              }`}
            >
              <BookmarkPlus className="w-3.5 h-3.5" /> Issue Book
            </button>
            <button
              onClick={() => setRfidMode('return')}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-medium transition-all ${
                rfidMode === 'return' ? 'gradient-birla-gold text-birla-blue shadow-md' : 'border border-border text-muted-foreground hover:bg-muted'
              }`}
            >
              <BookMarked className="w-3.5 h-3.5" /> Return Book
            </button>
          </div>

          {/* Issue/Return Form */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="rounded-2xl border border-border bg-card p-5 gradient-card-blue">
              <h4 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-birla-cyan" />
                {rfidMode === 'issue' ? 'Issue Workflow' : 'Return Workflow'}
              </h4>
              <div className="space-y-3">
                <div>
                  <label className="text-xs text-muted-foreground mb-1 block">Student RFID Card</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      placeholder="Scan or enter student card ID..."
                      className="flex-1 px-3 py-2 rounded-lg border border-input bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-birla-gold/40"
                    />
                    <button className="px-3 py-2 rounded-lg gradient-birla-cyan text-white text-xs font-medium">
                      <ScanLine className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <div>
                  <label className="text-xs text-muted-foreground mb-1 block">Student Details</label>
                  <div className="p-3 rounded-lg bg-muted/30 text-xs space-y-1">
                    <p className="text-foreground font-medium">Aarav Sharma</p>
                    <p className="text-muted-foreground">BOM-2025-001 &bull; Class X-A &bull; Roll #1</p>
                    <p className="text-muted-foreground">Books Issued: 2/3 &bull; No Overdue</p>
                  </div>
                </div>
                <div>
                  <label className="text-xs text-muted-foreground mb-1 block">Book RFID Tag</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      placeholder="Scan or enter book RFID tag..."
                      className="flex-1 px-3 py-2 rounded-lg border border-input bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-birla-gold/40"
                    />
                    <button className="px-3 py-2 rounded-lg gradient-birla-cyan text-white text-xs font-medium">
                      <ScanLine className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <div>
                  <label className="text-xs text-muted-foreground mb-1 block">Book Details</label>
                  <div className="p-3 rounded-lg bg-muted/30 text-xs space-y-1">
                    <p className="text-foreground font-medium">Concepts of Physics Vol. 1</p>
                    <p className="text-muted-foreground">LIB-002 &bull; H.C. Verma &bull; Science</p>
                    <p className="text-muted-foreground">Available: 3/10 &bull; Shelf: B-04</p>
                  </div>
                </div>
                {rfidMode === 'issue' && (
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs text-muted-foreground mb-1 block">Issue Date</label>
                      <input type="date" defaultValue="2026-03-01" className="w-full px-3 py-2 rounded-lg border border-input bg-background text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-birla-gold/40" />
                    </div>
                    <div>
                      <label className="text-xs text-muted-foreground mb-1 block">Due Date</label>
                      <input type="date" defaultValue="2026-03-15" className="w-full px-3 py-2 rounded-lg border border-input bg-background text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-birla-gold/40" />
                    </div>
                  </div>
                )}
                <button className={`w-full py-2.5 rounded-xl text-xs font-medium ${
                  rfidMode === 'issue' ? 'gradient-birla text-white' : 'gradient-birla-gold text-birla-blue'
                }`}>
                  {rfidMode === 'issue' ? 'Issue Book' : 'Return Book'}
                </button>
              </div>
            </div>

            {/* Recent Transactions */}
            <div className="rounded-2xl border border-border bg-card p-5">
              <h4 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
                <Clock className="w-4 h-4 text-birla-gold" />
                Recent RFID Transactions
              </h4>
              <div className="space-y-2 max-h-[480px] overflow-y-auto">
                {rfidTransactions.map((txn) => (
                  <div key={txn.id} className="rounded-xl border border-border/50 p-3 hover:bg-muted/20 transition-colors">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-0.5 rounded-full text-[9px] font-medium ${
                          txn.type === 'Issue' ? 'bg-birla-cyan/10 text-birla-cyan' : 'bg-purple-500/10 text-purple-500'
                        }`}>{txn.type}</span>
                        <span className="text-xs font-mono text-muted-foreground">{txn.id}</span>
                      </div>
                      <span className={`px-2 py-0.5 rounded-full text-[9px] font-medium ${
                        txn.status === 'Active' ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' :
                        txn.status === 'On Time' ? 'bg-blue-500/10 text-blue-600 dark:text-blue-400' :
                        txn.status === 'Overdue Return' ? 'bg-red-500/10 text-red-600 dark:text-red-400' :
                        'bg-muted text-muted-foreground'
                      }`}>{txn.status}</span>
                    </div>
                    <div className="space-y-1 text-xs">
                      <p className="text-foreground"><span className="text-muted-foreground">Student:</span> {txn.student} ({txn.studentId})</p>
                      <p className="text-foreground"><span className="text-muted-foreground">Book:</span> {txn.book}</p>
                      <p className="text-muted-foreground">Date: {txn.date} &bull; Due: {txn.dueDate}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* E-Book Library */}
      {activeTab === 'ebooks' && (
        <motion.div variants={itemVariants} className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-semibold text-foreground flex items-center gap-2">
              <Monitor className="w-5 h-5 text-purple-500" />
              E-Book Library
              <span className="px-2 py-0.5 rounded-full bg-muted text-xs text-muted-foreground">{eBooks.length} titles</span>
            </h3>
            <div className="flex items-center gap-2">
              <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border text-xs font-medium hover:bg-muted transition-colors">
                <Filter className="w-3.5 h-3.5" /> Filter
              </button>
              <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg gradient-birla text-white text-xs font-medium">
                <Upload className="w-3.5 h-3.5" /> Upload E-Book
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {eBooks.map((ebook) => (
              <div key={ebook.id} className="rounded-2xl border border-border bg-card p-4 hover:shadow-md transition-all group">
                {/* Cover */}
                <div className="aspect-[3/4] rounded-xl bg-gradient-to-br from-birla-blue/10 to-birla-cyan/10 dark:from-birla-blue/30 dark:to-birla-cyan/20 flex items-center justify-center mb-3 text-4xl group-hover:scale-105 transition-transform">
                  {ebook.cover}
                </div>
                <h4 className="text-xs font-semibold text-foreground leading-tight mb-1 line-clamp-2">{ebook.title}</h4>
                <p className="text-[10px] text-muted-foreground mb-2">{ebook.author}</p>
                <div className="flex items-center gap-1 mb-2">
                  <span className="text-amber-500 text-[10px]">★</span>
                  <span className="text-[10px] font-medium text-foreground">{ebook.rating}</span>
                  <span className="text-[10px] text-muted-foreground ml-auto">{ebook.format}</span>
                </div>
                <div className="flex items-center justify-between text-[10px] text-muted-foreground mb-3">
                  <span className="flex items-center gap-0.5"><Eye className="w-3 h-3" />{ebook.accessCount}</span>
                  <span>{ebook.pages} pages</span>
                  <span>{ebook.size}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="px-1.5 py-0.5 rounded bg-muted text-[9px] text-muted-foreground">{ebook.category}</span>
                </div>
                <button className="mt-3 w-full py-1.5 rounded-lg gradient-birla-cyan text-white text-[10px] font-medium hover:opacity-90 transition-opacity flex items-center justify-center gap-1">
                  <Download className="w-3 h-3" /> Access
                </button>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Reading Analytics */}
      {activeTab === 'analytics' && (
        <motion.div variants={itemVariants} className="space-y-4">
          <h3 className="text-base font-semibold text-foreground flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-birla-cyan" />
            Reading Analytics
          </h3>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Books Issued by Category */}
            <div className="rounded-2xl border border-border bg-card p-5">
              <p className="text-xs text-muted-foreground mb-3">Books Issued by Category - Current Year</p>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={booksByCategory} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'} />
                    <XAxis type="number" tick={{ fontSize: 10 }} stroke={darkMode ? '#64748b' : '#94a3b8'} />
                    <YAxis type="category" dataKey="category" tick={{ fontSize: 10 }} stroke={darkMode ? '#64748b' : '#94a3b8'} width={80} />
                    <Tooltip contentStyle={tooltipStyle} />
                    <Bar dataKey="issued" fill="#22D3EE" radius={[0, 4, 4, 0]} name="Books Issued" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Monthly Trends */}
            <div className="rounded-2xl border border-border bg-card p-5">
              <p className="text-xs text-muted-foreground mb-3">Monthly Issue & Return Trends - 2025-26</p>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={monthlyTrends}>
                    <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'} />
                    <XAxis dataKey="month" tick={{ fontSize: 10 }} stroke={darkMode ? '#64748b' : '#94a3b8'} />
                    <YAxis tick={{ fontSize: 10 }} stroke={darkMode ? '#64748b' : '#94a3b8'} />
                    <Tooltip contentStyle={tooltipStyle} />
                    <Legend iconType="circle" wrapperStyle={{ fontSize: '11px' }} />
                    <Line type="monotone" dataKey="issued" stroke="#22D3EE" strokeWidth={2} dot={{ r: 3 }} name="Issued" />
                    <Line type="monotone" dataKey="returned" stroke="#C8A45C" strokeWidth={2} dot={{ r: 3 }} name="Returned" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { label: 'Avg. Books/Student', value: '3.2', icon: Users, color: 'text-birla-cyan bg-birla-cyan/10' },
              { label: 'Avg. Reading Time', value: '2.4 hrs/week', icon: Clock, color: 'text-birla-gold bg-birla-gold/10' },
              { label: 'Most Popular', value: 'Science', icon: TrendingUp, color: 'text-emerald-500 bg-emerald-500/10' },
              { label: 'Fine Collected', value: '₹12,450', icon: IndianRupee, color: 'text-purple-500 bg-purple-500/10' },
            ].map((stat) => {
              const Icon = stat.icon
              return (
                <div key={stat.label} className="rounded-xl border border-border bg-card p-4 flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${stat.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-foreground">{stat.value}</p>
                    <p className="text-[10px] text-muted-foreground">{stat.label}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </motion.div>
      )}

      {/* Recommendation Engine */}
      {activeTab === 'recommend' && (
        <motion.div variants={itemVariants} className="space-y-4">
          <h3 className="text-base font-semibold text-foreground flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-birla-gold" />
            AI-Powered Book Recommendations
          </h3>

          <div className="space-y-4">
            {recommendations.map((rec) => (
              <div key={rec.id} className="rounded-2xl border border-border bg-card p-5 gradient-card-blue">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl gradient-birla-gold flex items-center justify-center text-sm font-bold text-birla-blue">
                    {rec.student.charAt(0)}
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-foreground">{rec.student}</h4>
                    <p className="text-[11px] text-muted-foreground">Class {rec.class}</p>
                  </div>
                  <span className="ml-auto px-2.5 py-1 rounded-full gradient-birla-cyan text-white text-[10px] font-medium flex items-center gap-1">
                    <Sparkles className="w-3 h-3" /> AI Curated
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {rec.books.map((book, idx) => (
                    <div key={idx} className="rounded-xl border border-border p-4 hover:shadow-sm transition-all">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-semibold text-foreground">#{idx + 1} Pick</span>
                        <div className="flex items-center gap-1">
                          <div className="w-16 h-1.5 rounded-full bg-muted overflow-hidden">
                            <div
                              className="h-full rounded-full"
                              style={{
                                width: `${book.match}%`,
                                backgroundColor: book.match >= 90 ? '#10B981' : book.match >= 80 ? '#22D3EE' : '#C8A45C',
                              }}
                            />
                          </div>
                          <span className="text-[10px] font-medium text-foreground">{book.match}%</span>
                        </div>
                      </div>
                      <h5 className="text-xs font-semibold text-foreground mb-1">{book.title}</h5>
                      <p className="text-[10px] text-muted-foreground mb-2">{book.author}</p>
                      <div className="flex items-center gap-1 mb-3">
                        <ThumbsUp className="w-3 h-3 text-birla-cyan" />
                        <span className="text-[10px] text-muted-foreground">{book.reason}</span>
                      </div>
                      <button className="w-full py-1.5 rounded-lg gradient-birla text-white text-[10px] font-medium hover:opacity-90 transition-opacity flex items-center justify-center gap-1">
                        <BookmarkPlus className="w-3 h-3" /> Recommend
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Recommendation Insights */}
          <div className="rounded-2xl border border-border bg-card p-5">
            <h4 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-birla-cyan" />
              Recommendation Insights
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { label: 'Recommendations Made', value: '847', sub: 'This month' },
                { label: 'Books Issued via Recs', value: '312', sub: '36.8% conversion' },
                { label: 'Top Match Score', value: '98%', sub: 'Physics + Math' },
                { label: 'Avg Match Score', value: '84%', sub: 'Across all students' },
              ].map((insight) => (
                <div key={insight.label} className="rounded-xl bg-muted/30 p-3">
                  <p className="text-lg font-bold text-foreground">{insight.value}</p>
                  <p className="text-xs text-muted-foreground">{insight.label}</p>
                  <p className="text-[10px] text-muted-foreground mt-0.5">{insight.sub}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  )
}
