'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Users, Search, Filter, Plus, Eye, Edit, Trash2, ChevronRight,
  GraduationCap, UserCheck, FileText, HeartPulse, ArrowUpRight,
  Clock, CheckCircle2, AlertTriangle, XCircle, Download, Upload,
  Phone, Mail, MapPin, Calendar, BookOpen, Award, Star, Shield,
  Building2, MessageSquare, ClipboardList, IndianRupee, Activity,
  ChevronLeft, Printer, Copy, Send, Image, Home, Flag
} from 'lucide-react'
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Legend
} from 'recharts'
import useAppStore from '@/store/useAppStore'

// ─── Student Data ────────────────────────────────────────────────
const students = [
  { id: 'BOM-2025-001', name: 'Aarav Sharma', class: 'X-A', roll: 1, gender: 'Male', dob: '15 Mar 2011', house: 'Ashoka', status: 'Active', phone: '+91 98765 43210', email: 'aarav.s@parent.com', attendance: 94, fees: 'Paid', photo: null },
  { id: 'BOM-2025-002', name: 'Priya Gupta', class: 'X-A', roll: 2, gender: 'Female', dob: '22 Jun 2011', house: 'Tagore', status: 'Active', phone: '+91 87654 32109', email: 'priya.g@parent.com', attendance: 98, fees: 'Paid', photo: null },
  { id: 'BOM-2025-003', name: 'Arjun Reddy', class: 'IX-B', roll: 5, gender: 'Male', dob: '08 Jan 2012', house: 'Raman', status: 'Active', phone: '+91 76543 21098', email: 'arjun.r@parent.com', attendance: 91, fees: 'Pending', photo: null },
  { id: 'BOM-2025-004', name: 'Ananya Iyer', class: 'VIII-A', roll: 3, gender: 'Female', dob: '14 Sep 2013', house: 'Nehru', status: 'Active', phone: '+91 65432 10987', email: 'ananya.i@parent.com', attendance: 96, fees: 'Paid', photo: null },
  { id: 'BOM-2025-005', name: 'Rohan Patel', class: 'VII-A', roll: 8, gender: 'Male', dob: '30 Nov 2013', house: 'Ashoka', status: 'Active', phone: '+91 54321 09876', email: 'rohan.p@parent.com', attendance: 88, fees: 'Partial', photo: null },
  { id: 'BOM-2025-006', name: 'Ishita Banerjee', class: 'VI-B', roll: 12, gender: 'Female', dob: '05 Apr 2014', house: 'Tagore', status: 'Active', phone: '+91 43210 98765', email: 'ishita.b@parent.com', attendance: 95, fees: 'Paid', photo: null },
  { id: 'BOM-2025-007', name: 'Vivaan Kumar', class: 'V-A', roll: 6, gender: 'Male', dob: '19 Jul 2015', house: 'Raman', status: 'Active', phone: '+91 32109 87654', email: 'vivaan.k@parent.com', attendance: 92, fees: 'Paid', photo: null },
  { id: 'BOM-2025-008', name: 'Meera Nair', class: 'IV-A', roll: 1, gender: 'Female', dob: '11 Feb 2016', house: 'Nehru', status: 'Active', phone: '+91 21098 76543', email: 'meera.n@parent.com', attendance: 97, fees: 'Paid', photo: null },
  { id: 'BOM-2025-009', name: 'Aditya Singh', class: 'III-B', roll: 4, gender: 'Male', dob: '27 Aug 2016', house: 'Ashoka', status: 'Inactive', phone: '+91 10987 65432', email: 'aditya.s@parent.com', attendance: 78, fees: 'Overdue', photo: null },
  { id: 'BOM-2025-010', name: 'Kavya Joshi', class: 'II-A', roll: 9, gender: 'Female', dob: '03 Dec 2017', house: 'Tagore', status: 'Active', phone: '+91 09876 54321', email: 'kavya.j@parent.com', attendance: 99, fees: 'Paid', photo: null },
]

const academicHistoryData = [
  { year: '2020-21', math: 82, science: 78, english: 85, hindi: 80, social: 76 },
  { year: '2021-22', math: 85, science: 82, english: 88, hindi: 83, social: 79 },
  { year: '2022-23', math: 88, science: 86, english: 90, hindi: 85, social: 82 },
  { year: '2023-24', math: 91, science: 89, english: 92, hindi: 87, social: 85 },
  { year: '2024-25', math: 94, science: 92, english: 95, hindi: 90, social: 88 },
]

const admissionSteps = [
  { step: 1, label: 'Online Application', status: 'completed', icon: FileText },
  { step: 2, label: 'Document Upload', status: 'completed', icon: Upload },
  { step: 3, label: 'Entrance Assessment', status: 'completed', icon: BookOpen },
  { step: 4, label: 'Parent Interview', status: 'completed', icon: Users },
  { step: 5, label: 'Fee Payment', status: 'completed', icon: IndianRupee },
  { step: 6, label: 'Admission Confirmed', status: 'completed', icon: CheckCircle2 },
]

const documentChecklist = [
  { name: 'Birth Certificate', status: 'verified', category: 'Identity' },
  { name: 'Aadhaar Card', status: 'verified', category: 'Identity' },
  { name: 'Transfer Certificate', status: 'verified', category: 'Academic' },
  { name: 'Previous Marksheet', status: 'verified', category: 'Academic' },
  { name: 'Passport Size Photos (4)', status: 'verified', category: 'Identity' },
  { name: 'Caste Certificate', status: 'not_applicable', category: 'Category' },
  { name: 'Medical Fitness Certificate', status: 'verified', category: 'Health' },
  { name: 'Parent ID Proof', status: 'verified', category: 'Identity' },
  { name: 'Address Proof', status: 'pending', category: 'Identity' },
  { name: 'Income Certificate', status: 'not_applicable', category: 'Category' },
]

const healthRecords = [
  { category: 'Vision', status: 'Normal', lastCheck: 'Jan 2026', nextDue: 'Jul 2026' },
  { category: 'Hearing', status: 'Normal', lastCheck: 'Jan 2026', nextDue: 'Jul 2026' },
  { category: 'Dental', status: 'Attention Needed', lastCheck: 'Dec 2025', nextDue: 'Mar 2026' },
  { category: 'BMI', status: 'Normal (18.5)', lastCheck: 'Jan 2026', nextDue: 'Jul 2026' },
  { category: 'Vaccination', status: 'Up to Date', lastCheck: 'Nov 2025', nextDue: 'May 2026' },
  { category: 'Allergies', status: 'None Reported', lastCheck: 'Jan 2026', nextDue: 'Jul 2026' },
]

const houses = [
  { name: 'Ashoka', color: '#EF4444', bg: 'bg-red-500', bgLight: 'bg-red-500/10', text: 'text-red-600 dark:text-red-400', motto: 'Courage & Valor', students: 640, captain: 'Vikram Malhotra' },
  { name: 'Tagore', color: '#3B82F6', bg: 'bg-blue-500', bgLight: 'bg-blue-500/10', text: 'text-blue-600 dark:text-blue-400', motto: 'Wisdom & Creativity', students: 635, captain: 'Sneha Dasgupta' },
  { name: 'Raman', color: '#10B981', bg: 'bg-emerald-500', bgLight: 'bg-emerald-500/10', text: 'text-emerald-600 dark:text-emerald-400', motto: 'Science & Innovation', students: 638, captain: 'Arjun Krishnan' },
  { name: 'Nehru', color: '#F59E0B', bg: 'bg-amber-500', bgLight: 'bg-amber-500/10', text: 'text-amber-600 dark:text-amber-400', motto: 'Leadership & Service', students: 634, captain: 'Meera Choudhury' },
]

const disciplineRecords = [
  { id: 1, student: 'Rohan Patel', class: 'VII-A', date: 'Feb 28, 2026', type: 'Late Arrival', action: 'Warning', points: -1, status: 'Resolved' },
  { id: 2, student: 'Aditya Singh', class: 'III-B', date: 'Feb 25, 2026', type: 'Uniform Violation', action: 'Counseling', points: -2, status: 'Resolved' },
  { id: 3, student: 'Vivaan Kumar', class: 'V-A', date: 'Feb 20, 2026', type: 'Excellence Award', action: 'Certificate', points: 5, status: 'Awarded' },
  { id: 4, student: 'Arjun Reddy', class: 'IX-B', date: 'Feb 15, 2026', type: 'Homework Incomplete', action: 'Parent Meeting', points: -3, status: 'In Progress' },
  { id: 5, student: 'Priya Gupta', class: 'X-A', date: 'Feb 10, 2026', type: 'Science Olympiad', action: 'Gold Medal', points: 10, status: 'Awarded' },
]

const parentCommunications = [
  { id: 1, date: 'Mar 1, 2026', type: 'SMS', parent: 'Mr. Sharma (Aarav)', subject: 'Fee Payment Confirmation', status: 'Delivered', icon: Phone },
  { id: 2, date: 'Feb 28, 2026', type: 'Email', parent: 'Mrs. Gupta (Priya)', subject: 'PTM Schedule - March 2026', status: 'Read', icon: Mail },
  { id: 3, date: 'Feb 27, 2026', type: 'App', parent: 'Mr. Reddy (Arjun)', subject: 'Attendance Alert - 3 Days Absent', status: 'Viewed', icon: MessageSquare },
  { id: 4, date: 'Feb 25, 2026', type: 'Email', parent: 'Mrs. Iyer (Ananya)', subject: 'Annual Day Participation Consent', status: 'Read', icon: Mail },
  { id: 5, date: 'Feb 24, 2026', type: 'SMS', parent: 'Mr. Patel (Rohan)', subject: 'Fee Reminder - Q4 Installment', status: 'Delivered', icon: Phone },
  { id: 6, date: 'Feb 22, 2026', type: 'App', parent: 'Mrs. Banerjee (Ishita)', subject: 'Report Card - Term 2', status: 'Viewed', icon: MessageSquare },
]

// ─── Animation ───────────────────────────────────────────────────
const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.06 } },
}
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
}

export default function SISModule() {
  const { darkMode } = useAppStore()
  const [activeTab, setActiveTab] = useState('directory')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedStudent, setSelectedStudent] = useState(null)
  const [filterClass, setFilterClass] = useState('All')

  const tabs = [
    { id: 'directory', label: 'Student Directory', icon: Users },
    { id: 'profile', label: 'Student Profile', icon: UserCheck },
    { id: 'admission', label: 'Admission Workflow', icon: ClipboardList },
    { id: 'documents', label: 'Document Verification', icon: FileText },
    { id: 'health', label: 'Health Records', icon: HeartPulse },
    { id: 'academic', label: 'Academic History', icon: BookOpen },
    { id: 'tc', label: 'Transfer Certificate', icon: Award },
    { id: 'houses', label: 'House Allocation', icon: Flag },
    { id: 'discipline', label: 'Discipline', icon: Shield },
    { id: 'communication', label: 'Parent Comm.', icon: MessageSquare },
  ]

  const filteredStudents = students.filter((s) => {
    const matchesSearch = s.name.toLowerCase().includes(searchQuery.toLowerCase()) || s.id.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesClass = filterClass === 'All' || s.class === filterClass
    return matchesSearch && matchesClass
  })

  const classOptions = ['All', ...Array.from(new Set(students.map((s) => s.class))).sort()]

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
              onClick={() => { setActiveTab(tab.id); if (tab.id !== 'profile') setSelectedStudent(null) }}
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

      {/* ─── Student Directory ────────────────────────────── */}
      {activeTab === 'directory' && (
        <motion.div variants={itemVariants} className="space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <h3 className="text-base font-semibold text-foreground flex items-center gap-2">
              <Users className="w-5 h-5 text-birla-cyan" />
              Student Directory
              <span className="px-2 py-0.5 rounded-full bg-muted text-xs text-muted-foreground">{students.length} records</span>
            </h3>
            <div className="flex items-center gap-2">
              <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg gradient-birla text-white text-xs font-medium">
                <Plus className="w-3.5 h-3.5" /> Add Student
              </button>
              <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border text-xs font-medium hover:bg-muted transition-colors">
                <Download className="w-3.5 h-3.5" /> Export
              </button>
            </div>
          </div>

          {/* Search and Filter */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search by name or ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-xl border border-input bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-birla-gold/40 focus:border-birla-gold transition-all"
              />
            </div>
            <select
              value={filterClass}
              onChange={(e) => setFilterClass(e.target.value)}
              className="px-3 py-2 rounded-xl border border-input bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-birla-gold/40"
            >
              {classOptions.map((c) => (
                <option key={c} value={c}>{c === 'All' ? 'All Classes' : `Class ${c}`}</option>
              ))}
            </select>
          </div>

          {/* Table */}
          <div className="rounded-2xl border border-border bg-card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border bg-muted/30">
                    <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Student ID</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Name</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Class</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Roll</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">House</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Attendance</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Fees</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Status</th>
                    <th className="text-right px-4 py-3 text-xs font-semibold text-muted-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredStudents.map((student) => {
                    const houseData = houses.find((h) => h.name === student.house)
                    return (
                      <tr key={student.id} className="border-b border-border/50 hover:bg-muted/20 transition-colors">
                        <td className="px-4 py-3 text-xs font-mono text-birla-cyan">{student.id}</td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full gradient-birla-gold flex items-center justify-center text-xs font-bold text-birla-blue flex-shrink-0">
                              {student.name.charAt(0)}
                            </div>
                            <div>
                              <p className="text-sm font-medium text-foreground">{student.name}</p>
                              <p className="text-[10px] text-muted-foreground">{student.gender} &bull; {student.dob}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-sm text-foreground">{student.class}</td>
                        <td className="px-4 py-3 text-sm text-foreground">{student.roll}</td>
                        <td className="px-4 py-3">
                          <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium ${houseData?.bgLight || 'bg-muted'} ${houseData?.text || 'text-muted-foreground'}`}>
                            {student.house}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <div className="w-12 h-1.5 rounded-full bg-muted overflow-hidden">
                              <div
                                className="h-full rounded-full"
                                style={{
                                  width: `${student.attendance}%`,
                                  backgroundColor: student.attendance >= 90 ? '#10B981' : student.attendance >= 75 ? '#F59E0B' : '#EF4444',
                                }}
                              />
                            </div>
                            <span className="text-xs text-foreground">{student.attendance}%</span>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${
                            student.fees === 'Paid' ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' :
                            student.fees === 'Pending' ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400' :
                            student.fees === 'Partial' ? 'bg-blue-500/10 text-blue-600 dark:text-blue-400' :
                            'bg-red-500/10 text-red-600 dark:text-red-400'
                          }`}>
                            {student.fees}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${
                            student.status === 'Active' ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' : 'bg-red-500/10 text-red-600 dark:text-red-400'
                          }`}>
                            {student.status}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center justify-end gap-1">
                            <button
                              onClick={() => { setSelectedStudent(student); setActiveTab('profile') }}
                              className="p-1.5 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                              title="View Profile"
                            >
                              <Eye className="w-3.5 h-3.5" />
                            </button>
                            <button className="p-1.5 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors" title="Edit">
                              <Edit className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>
      )}

      {/* ─── Student Profile ──────────────────────────────── */}
      {activeTab === 'profile' && (
        <motion.div variants={itemVariants} className="space-y-4">
          {selectedStudent ? (
            <>
              {/* Profile Header */}
              <div className="rounded-2xl border border-border bg-card p-6 gradient-card-blue">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <div className="w-20 h-20 rounded-2xl gradient-birla-gold flex items-center justify-center text-2xl font-bold text-birla-blue">
                    {selectedStudent.name.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-xl font-bold text-foreground">{selectedStudent.name}</h3>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${
                        selectedStudent.status === 'Active' ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' : 'bg-red-500/10 text-red-600 dark:text-red-400'
                      }`}>
                        {selectedStudent.status}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">{selectedStudent.id} &bull; Class {selectedStudent.class} &bull; Roll #{selectedStudent.roll}</p>
                    <div className="flex items-center gap-4 mt-2">
                      <span className="flex items-center gap-1 text-xs text-muted-foreground"><Phone className="w-3 h-3" />{selectedStudent.phone}</span>
                      <span className="flex items-center gap-1 text-xs text-muted-foreground"><Mail className="w-3 h-3" />{selectedStudent.email}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-border text-xs font-medium hover:bg-muted transition-colors">
                      <Edit className="w-3.5 h-3.5" /> Edit
                    </button>
                    <button className="flex items-center gap-1 px-3 py-1.5 rounded-lg gradient-birla text-white text-xs font-medium">
                      <Printer className="w-3.5 h-3.5" /> Print
                    </button>
                  </div>
                </div>
              </div>

              {/* Profile Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { label: 'Attendance', value: `${selectedStudent.attendance}%`, icon: UserCheck, color: 'text-emerald-500 bg-emerald-500/10' },
                  { label: 'Fee Status', value: selectedStudent.fees, icon: IndianRupee, color: selectedStudent.fees === 'Paid' ? 'text-emerald-500 bg-emerald-500/10' : 'text-amber-500 bg-amber-500/10' },
                  { label: 'House', value: selectedStudent.house, icon: Flag, color: 'text-purple-500 bg-purple-500/10' },
                  { label: 'Gender', value: selectedStudent.gender, icon: Users, color: 'text-blue-500 bg-blue-500/10' },
                ].map((stat) => {
                  const Icon = stat.icon
                  return (
                    <div key={stat.label} className="rounded-xl border border-border bg-card p-4 flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${stat.color}`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-foreground">{stat.value}</p>
                        <p className="text-[10px] text-muted-foreground">{stat.label}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </>
          ) : (
            <div className="rounded-2xl border border-border bg-card p-12 text-center">
              <Users className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
              <h3 className="text-lg font-semibold text-foreground mb-1">No Student Selected</h3>
              <p className="text-sm text-muted-foreground mb-4">Select a student from the directory to view their profile</p>
              <button
                onClick={() => setActiveTab('directory')}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg gradient-birla text-white text-xs font-medium"
              >
                <ChevronLeft className="w-3.5 h-3.5" /> Go to Directory
              </button>
            </div>
          )}
        </motion.div>
      )}

      {/* ─── Admission Workflow ───────────────────────────── */}
      {activeTab === 'admission' && (
        <motion.div variants={itemVariants} className="space-y-4">
          <h3 className="text-base font-semibold text-foreground flex items-center gap-2">
            <ClipboardList className="w-5 h-5 text-birla-gold" />
            Admission Workflow
          </h3>

          <div className="rounded-2xl border border-border bg-card p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h4 className="text-sm font-semibold text-foreground">Aarav Sharma - Class X-A</h4>
                <p className="text-xs text-muted-foreground">Application #APP-2025-0347 &bull; Applied: Jan 15, 2026</p>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-medium">
                Admitted
              </span>
            </div>

            {/* Steps */}
            <div className="relative">
              <div className="absolute top-6 left-6 right-6 h-0.5 bg-muted" />
              <div className="absolute top-6 left-6 h-0.5 bg-emerald-500" style={{ width: '100%' }} />
              <div className="flex items-start justify-between relative">
                {admissionSteps.map((step, idx) => {
                  const Icon = step.icon
                  return (
                    <div key={step.step} className="flex flex-col items-center text-center" style={{ width: `${100 / admissionSteps.length}%` }}>
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 z-10 ${
                        step.status === 'completed' ? 'bg-emerald-500 text-white' :
                        step.status === 'current' ? 'bg-birla-gold text-white' :
                        'bg-muted text-muted-foreground'
                      }`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <p className="text-[11px] font-medium text-foreground leading-tight">{step.label}</p>
                      <p className="text-[9px] text-muted-foreground mt-0.5 capitalize">{step.status}</p>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { label: 'Total Applications', value: '347', icon: FileText, color: 'text-blue-500 bg-blue-500/10' },
              { label: 'Under Review', value: '28', icon: Clock, color: 'text-amber-500 bg-amber-500/10' },
              { label: 'Admitted', value: '310', icon: CheckCircle2, color: 'text-emerald-500 bg-emerald-500/10' },
              { label: 'Waitlisted', value: '9', icon: AlertTriangle, color: 'text-red-500 bg-red-500/10' },
            ].map((stat) => {
              const Icon = stat.icon
              return (
                <div key={stat.label} className="rounded-xl border border-border bg-card p-4 flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${stat.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-lg font-bold text-foreground">{stat.value}</p>
                    <p className="text-[10px] text-muted-foreground">{stat.label}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </motion.div>
      )}

      {/* ─── Document Verification ────────────────────────── */}
      {activeTab === 'documents' && (
        <motion.div variants={itemVariants} className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-semibold text-foreground flex items-center gap-2">
              <FileText className="w-5 h-5 text-purple-500" />
              Document Verification Checklist
            </h3>
            <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-medium">
              8/10 Verified
            </span>
          </div>

          <div className="rounded-2xl border border-border bg-card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border bg-muted/30">
                    <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">#</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Document</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Category</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Status</th>
                    <th className="text-right px-4 py-3 text-xs font-semibold text-muted-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {documentChecklist.map((doc, idx) => (
                    <tr key={idx} className="border-b border-border/50 hover:bg-muted/20 transition-colors">
                      <td className="px-4 py-3 text-xs text-muted-foreground">{idx + 1}</td>
                      <td className="px-4 py-3 text-sm font-medium text-foreground">{doc.name}</td>
                      <td className="px-4 py-3">
                        <span className="px-2 py-0.5 rounded-md bg-muted text-[11px] text-muted-foreground">{doc.category}</span>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium ${
                          doc.status === 'verified' ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' :
                          doc.status === 'pending' ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400' :
                          'bg-muted text-muted-foreground'
                        }`}>
                          {doc.status === 'verified' ? <CheckCircle2 className="w-3 h-3" /> :
                           doc.status === 'pending' ? <Clock className="w-3 h-3" /> :
                           <XCircle className="w-3 h-3" />}
                          {doc.status === 'verified' ? 'Verified' : doc.status === 'pending' ? 'Pending' : 'N/A'}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <button className="p-1.5 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"><Eye className="w-3.5 h-3.5" /></button>
                          {doc.status === 'pending' && (
                            <button className="px-2 py-1 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[10px] font-medium hover:bg-emerald-500/20 transition-colors">
                              Verify
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>
      )}

      {/* ─── Health Records ───────────────────────────────── */}
      {activeTab === 'health' && (
        <motion.div variants={itemVariants} className="space-y-4">
          <h3 className="text-base font-semibold text-foreground flex items-center gap-2">
            <HeartPulse className="w-5 h-5 text-red-500" />
            Health Records Summary
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {healthRecords.map((record) => (
              <div key={record.category} className="rounded-xl border border-border bg-card p-4 hover:shadow-sm transition-all">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-sm font-semibold text-foreground">{record.category}</h4>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${
                    record.status.includes('Normal') || record.status.includes('Up to') || record.status.includes('None')
                      ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                      : 'bg-amber-500/10 text-amber-600 dark:text-amber-400'
                  }`}>
                    {record.status}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="p-2 rounded-lg bg-muted/30">
                    <p className="text-muted-foreground">Last Check</p>
                    <p className="font-medium text-foreground">{record.lastCheck}</p>
                  </div>
                  <div className="p-2 rounded-lg bg-muted/30">
                    <p className="text-muted-foreground">Next Due</p>
                    <p className="font-medium text-foreground">{record.nextDue}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* ─── Academic History ─────────────────────────────── */}
      {activeTab === 'academic' && (
        <motion.div variants={itemVariants} className="space-y-4">
          <h3 className="text-base font-semibold text-foreground flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-birla-cyan" />
            Academic History Chart
          </h3>

          <div className="rounded-2xl border border-border bg-card p-5">
            <p className="text-xs text-muted-foreground mb-3">Student: Aarav Sharma (BOM-2025-001) &bull; 5-Year Performance Trend</p>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={academicHistoryData}>
                  <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'} />
                  <XAxis dataKey="year" tick={{ fontSize: 10 }} stroke={darkMode ? '#64748b' : '#94a3b8'} />
                  <YAxis tick={{ fontSize: 10 }} stroke={darkMode ? '#64748b' : '#94a3b8'} domain={[60, 100]} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: darkMode ? '#1A2D4A' : '#fff',
                      border: `1px solid ${darkMode ? 'rgba(255,255,255,0.1)' : '#e2e8f0'}`,
                      borderRadius: '12px',
                      fontSize: '12px',
                      color: darkMode ? '#e2e8f0' : '#1e293b',
                    }}
                  />
                  <Legend iconType="circle" wrapperStyle={{ fontSize: '11px' }} />
                  <Line type="monotone" dataKey="math" stroke="#1A2D4A" strokeWidth={2} dot={{ r: 3 }} name="Mathematics" />
                  <Line type="monotone" dataKey="science" stroke="#22D3EE" strokeWidth={2} dot={{ r: 3 }} name="Science" />
                  <Line type="monotone" dataKey="english" stroke="#C8A45C" strokeWidth={2} dot={{ r: 3 }} name="English" />
                  <Line type="monotone" dataKey="hindi" stroke="#8B5CF6" strokeWidth={2} dot={{ r: 3 }} name="Hindi" />
                  <Line type="monotone" dataKey="social" stroke="#10B981" strokeWidth={2} dot={{ r: 3 }} name="Social Science" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </motion.div>
      )}

      {/* ─── Transfer Certificate ─────────────────────────── */}
      {activeTab === 'tc' && (
        <motion.div variants={itemVariants} className="space-y-4">
          <h3 className="text-base font-semibold text-foreground flex items-center gap-2">
            <Award className="w-5 h-5 text-birla-gold" />
            Transfer Certificate Generator
          </h3>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* TC Form */}
            <div className="rounded-2xl border border-border bg-card p-5">
              <h4 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
                <FileText className="w-4 h-4 text-birla-gold" />
                TC Details
              </h4>
              <div className="space-y-3">
                <div>
                  <label className="text-xs text-muted-foreground mb-1 block">Student</label>
                  <select className="w-full px-3 py-2 rounded-lg border border-input bg-background text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-birla-gold/40">
                    {students.map((s) => (
                      <option key={s.id} value={s.id}>{s.name} ({s.id})</option>
                    ))}
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs text-muted-foreground mb-1 block">TC Number</label>
                    <input type="text" value="TC/2025-26/001" readOnly className="w-full px-3 py-2 rounded-lg border border-input bg-muted text-sm text-muted-foreground" />
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground mb-1 block">Issue Date</label>
                    <input type="date" className="w-full px-3 py-2 rounded-lg border border-input bg-background text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-birla-gold/40" />
                  </div>
                </div>
                <div>
                  <label className="text-xs text-muted-foreground mb-1 block">Reason for Leaving</label>
                  <select className="w-full px-3 py-2 rounded-lg border border-input bg-background text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-birla-gold/40">
                    <option>Parent's Request</option>
                    <option>Transfer</option>
                    <option>Completion of Study</option>
                    <option>Personal Reasons</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs text-muted-foreground mb-1 block">Conduct & Character</label>
                  <select className="w-full px-3 py-2 rounded-lg border border-input bg-background text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-birla-gold/40">
                    <option>Good</option>
                    <option>Satisfactory</option>
                    <option>Excellent</option>
                    <option>Average</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs text-muted-foreground mb-1 block">Remarks</label>
                  <textarea rows={3} placeholder="Additional remarks..." className="w-full px-3 py-2 rounded-lg border border-input bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-birla-gold/40" />
                </div>
                <div className="flex items-center gap-2 pt-2">
                  <button className="flex items-center gap-1.5 px-4 py-2 rounded-lg gradient-birla text-white text-xs font-medium">
                    <Printer className="w-3.5 h-3.5" /> Generate TC
                  </button>
                  <button className="flex items-center gap-1.5 px-4 py-2 rounded-lg border border-border text-xs font-medium hover:bg-muted transition-colors">
                    <Download className="w-3.5 h-3.5" /> Download PDF
                  </button>
                </div>
              </div>
            </div>

            {/* TC Preview */}
            <div className="rounded-2xl border-2 border-birla-gold/20 bg-card p-6">
              <div className="text-center mb-4">
                <h4 className="text-lg font-bold text-foreground">Birla Open Minds International School</h4>
                <p className="text-xs text-muted-foreground">Singur, Hooghly, West Bengal &bull; CBSE Affiliation: 2730456</p>
                <div className="w-20 h-0.5 mx-auto mt-2 gradient-birla-gold rounded-full" />
                <p className="text-sm font-bold text-foreground mt-2">TRANSFER CERTIFICATE</p>
                <p className="text-[10px] text-muted-foreground">TC/2025-26/001</p>
              </div>
              <div className="space-y-2 text-xs">
                {[
                  { label: "Student's Name", value: 'Aarav Sharma' },
                  { label: 'Date of Birth', value: '15 March 2011' },
                  { label: 'Father\'s Name', value: 'Mr. Rajesh Sharma' },
                  { label: 'Mother\'s Name', value: 'Mrs. Sunita Sharma' },
                  { label: 'Class Last Studied', value: 'X-A' },
                  { label: 'Whether Failed/Passed', value: 'Passed' },
                  { label: 'Whether Qualified for Promotion', value: 'Yes' },
                  { label: 'Total Working Days', value: '220' },
                  { label: 'Total Days Present', value: '207' },
                  { label: 'Conduct & Character', value: 'Good' },
                  { label: 'Date of Leaving', value: 'March 2026' },
                  { label: 'Reason for Leaving', value: "Parent's Request" },
                ].map((row, idx) => (
                  <div key={idx} className="flex items-start gap-2 py-1 border-b border-dashed border-border/50">
                    <span className="text-muted-foreground min-w-[140px]">{row.label}</span>
                    <span className="text-foreground font-medium">{row.value}</span>
                  </div>
                ))}
              </div>
              <div className="mt-6 flex items-center justify-between text-xs text-muted-foreground">
                <div>
                  <p>Clerk&apos;s Signature</p>
                  <div className="w-24 h-px bg-border mt-4" />
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto border border-border rounded-full flex items-center justify-center mb-1">
                    <span className="text-[8px] text-center">School<br/>Seal</span>
                  </div>
                </div>
                <div>
                  <p>Principal&apos;s Signature</p>
                  <div className="w-24 h-px bg-border mt-4" />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* ─── House Allocation ─────────────────────────────── */}
      {activeTab === 'houses' && (
        <motion.div variants={itemVariants} className="space-y-4">
          <h3 className="text-base font-semibold text-foreground flex items-center gap-2">
            <Flag className="w-5 h-5 text-amber-500" />
            House Allocation
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {houses.map((house) => (
              <div key={house.name} className="rounded-2xl border border-border bg-card p-5 hover:shadow-lg transition-all group">
                <div className="text-center mb-4">
                  <div className={`w-16 h-16 rounded-2xl ${house.bgLight} flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform`}>
                    <Flag className="w-8 h-8" style={{ color: house.color }} />
                  </div>
                  <h4 className={`text-lg font-bold ${house.text}`}>{house.name} House</h4>
                  <p className="text-[11px] text-muted-foreground italic">&ldquo;{house.motto}&rdquo;</p>
                </div>

                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-2">
                    <div className="p-2 rounded-lg bg-muted/30 text-center">
                      <p className="text-lg font-bold text-foreground">{house.students}</p>
                      <p className="text-[10px] text-muted-foreground">Students</p>
                    </div>
                    <div className="p-2 rounded-lg bg-muted/30 text-center">
                      <p className="text-lg font-bold text-foreground">{Math.round(house.students / 4)}</p>
                      <p className="text-[10px] text-muted-foreground">Avg/Class</p>
                    </div>
                  </div>
                  <div className="p-2 rounded-lg bg-muted/30">
                    <p className="text-[10px] text-muted-foreground">House Captain</p>
                    <p className="text-sm font-medium text-foreground">{house.captain}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-2 rounded-full bg-muted overflow-hidden">
                      <div className="h-full rounded-full" style={{ width: `${(house.students / 640) * 100}%`, backgroundColor: house.color }} />
                    </div>
                    <span className="text-[10px] text-muted-foreground">{Math.round((house.students / 2547) * 100)}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* ─── Discipline Tracking ──────────────────────────── */}
      {activeTab === 'discipline' && (
        <motion.div variants={itemVariants} className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-semibold text-foreground flex items-center gap-2">
              <Shield className="w-5 h-5 text-red-500" />
              Discipline Tracking
            </h3>
            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg gradient-birla text-white text-xs font-medium">
              <Plus className="w-3.5 h-3.5" /> New Entry
            </button>
          </div>

          <div className="rounded-2xl border border-border bg-card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border bg-muted/30">
                    <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Student</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Class</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Date</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Type</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Action</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Points</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {disciplineRecords.map((record) => (
                    <tr key={record.id} className="border-b border-border/50 hover:bg-muted/20 transition-colors">
                      <td className="px-4 py-3 text-sm font-medium text-foreground">{record.student}</td>
                      <td className="px-4 py-3 text-sm text-muted-foreground">{record.class}</td>
                      <td className="px-4 py-3 text-xs text-muted-foreground">{record.date}</td>
                      <td className="px-4 py-3 text-sm text-foreground">{record.type}</td>
                      <td className="px-4 py-3 text-sm text-muted-foreground">{record.action}</td>
                      <td className="px-4 py-3">
                        <span className={`font-semibold text-sm ${record.points > 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'}`}>
                          {record.points > 0 ? '+' : ''}{record.points}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${
                          record.status === 'Resolved' || record.status === 'Awarded' ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' :
                          'bg-amber-500/10 text-amber-600 dark:text-amber-400'
                        }`}>
                          {record.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Discipline Summary */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { label: 'Positive Points', value: '+15', icon: Star, color: 'text-emerald-500 bg-emerald-500/10' },
              { label: 'Negative Points', value: '-6', icon: AlertTriangle, color: 'text-red-500 bg-red-500/10' },
              { label: 'Net Score', value: '+9', icon: Activity, color: 'text-blue-500 bg-blue-500/10' },
              { label: 'Pending Cases', value: '1', icon: Clock, color: 'text-amber-500 bg-amber-500/10' },
            ].map((stat) => {
              const Icon = stat.icon
              return (
                <div key={stat.label} className="rounded-xl border border-border bg-card p-4 flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${stat.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-lg font-bold text-foreground">{stat.value}</p>
                    <p className="text-[10px] text-muted-foreground">{stat.label}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </motion.div>
      )}

      {/* ─── Parent Communication Logs ────────────────────── */}
      {activeTab === 'communication' && (
        <motion.div variants={itemVariants} className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-semibold text-foreground flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-birla-cyan" />
              Parent Communication Logs
            </h3>
            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg gradient-birla text-white text-xs font-medium">
              <Send className="w-3.5 h-3.5" /> New Message
            </button>
          </div>

          <div className="space-y-2">
            {parentCommunications.map((comm) => {
              const Icon = comm.icon
              return (
                <div key={comm.id} className="rounded-xl border border-border bg-card p-4 flex items-center gap-4 hover:shadow-sm transition-all group">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                    comm.type === 'SMS' ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' :
                    comm.type === 'Email' ? 'bg-blue-500/10 text-blue-600 dark:text-blue-400' :
                    'bg-purple-500/10 text-purple-600 dark:text-purple-400'
                  }`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <h4 className="text-sm font-medium text-foreground truncate">{comm.subject}</h4>
                      <span className={`px-1.5 py-0.5 rounded text-[9px] font-medium ${
                        comm.type === 'SMS' ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' :
                        comm.type === 'Email' ? 'bg-blue-500/10 text-blue-600 dark:text-blue-400' :
                        'bg-purple-500/10 text-purple-600 dark:text-purple-400'
                      }`}>
                        {comm.type}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground">{comm.parent}</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${
                      comm.status === 'Delivered' ? 'bg-blue-500/10 text-blue-600 dark:text-blue-400' :
                      comm.status === 'Read' ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' :
                      'bg-purple-500/10 text-purple-600 dark:text-purple-400'
                    }`}>
                      {comm.status}
                    </span>
                    <p className="text-[10px] text-muted-foreground mt-1">{comm.date}</p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors flex-shrink-0" />
                </div>
              )
            })}
          </div>
        </motion.div>
      )}
    </motion.div>
  )
}
