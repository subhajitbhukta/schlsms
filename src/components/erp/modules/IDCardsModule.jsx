'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  CreditCard, Users, QrCode, Printer, Scan, Shield, Eye,
  Plus, Download, ChevronRight, Zap, Calendar, Clock,
  CheckCircle2, AlertTriangle, Search, Filter, Settings,
  GraduationCap, UserCheck, Building2, Bus, AlertCircle,
  FileText, RefreshCw, Trash2, Edit3, Copy, ExternalLink,
  Hash, Tag, X, Check, Upload, Image, Camera, Fingerprint,
  MapPin, Phone, Mail, Heart, Globe, Wifi, Lock, Unlock,
  ScanLine, BadgeCheck, BadgeX, DoorOpen, Activity, BarChart3,
  Grid3X3, LayoutGrid, Palette, Type, Move, Maximize2, FlipHorizontal,
  User, Home, Stethoscope, ArrowUpRight, TrendingUp, Star, Sparkles
} from 'lucide-react'
import {
  BarChart, Bar, PieChart, Pie, Cell,
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

const HOUSE_COLORS = {
  'Aryabhatta': { bg: 'bg-red-500', text: 'text-red-500', light: 'bg-red-500/10', border: 'border-red-500/30', hex: '#EF4444' },
  'Raman': { bg: 'bg-blue-500', text: 'text-blue-500', light: 'bg-blue-500/10', border: 'border-blue-500/30', hex: '#3B82F6' },
  'Tagore': { bg: 'bg-emerald-500', text: 'text-emerald-500', light: 'bg-emerald-500/10', border: 'border-emerald-500/30', hex: '#10B981' },
  'Vivekananda': { bg: 'bg-amber-500', text: 'text-amber-500', light: 'bg-amber-500/10', border: 'border-amber-500/30', hex: '#F59E0B' },
}

const statsCards = [
  { label: 'Active Cards', value: '2,547', change: '+124', up: true, icon: CreditCard, gradient: 'from-[#0A1628] to-[#1A2D4A]', glow: 'shadow-[#0A1628]/20' },
  { label: 'Temp Passes', value: '12', change: '+3', up: true, icon: Clock, gradient: 'from-amber-800 to-amber-600', glow: 'shadow-amber-800/20' },
  { label: 'QR Scans Today', value: '1,240', change: '+18%', up: true, icon: QrCode, gradient: 'from-[#22D3EE]/80 to-[#0E7490]', glow: 'shadow-[#22D3EE]/20' },
  { label: 'Pending', value: '45', change: '-8', up: false, icon: AlertTriangle, gradient: 'from-red-800 to-red-600', glow: 'shadow-red-800/20' },
]

const sampleStudent = {
  name: 'Aarav Sharma',
  admissionNo: 'BOM/2023/0142',
  class: 'X',
  section: 'A',
  rollNo: '12',
  bloodGroup: 'B+',
  dob: '15 Aug 2010',
  contact: '+91 98765 43210',
  house: 'Aryabhatta',
  academicYear: '2025-26',
  transportRoute: 'Route 7 - Howrah',
  fatherName: 'Mr. Rajesh Sharma',
  motherName: 'Mrs. Sunita Sharma',
  address: '42, Salt Lake, Block A, Kolkata - 700091',
  emergencyContact1: '+91 98765 43210 (Father)',
  emergencyContact2: '+91 87654 32109 (Mother)',
  busRoute: 'Route 7 - Howrah via Salt Lake',
  medicalNotes: 'Allergy: Penicillin | Asthma: Mild',
  schoolAddress: 'Birla Open Minds International School, Singur, Hooghly, West Bengal - 712409',
  website: 'www.birlaopenminds.com',
}

const idCardsList = [
  { id: 1, name: 'Aarav Sharma', admissionNo: 'BOM/2023/0142', class: 'X-A', house: 'Aryabhatta', status: 'Active', issueDate: '01 Apr 2025' },
  { id: 2, name: 'Priya Menon', admissionNo: 'BOM/2023/0089', class: 'IX-B', house: 'Raman', status: 'Active', issueDate: '01 Apr 2025' },
  { id: 3, name: 'Rohan Gupta', admissionNo: 'BOM/2024/0215', class: 'VIII-A', house: 'Tagore', status: 'Active', issueDate: '01 Apr 2025' },
  { id: 4, name: 'Ananya Iyer', admissionNo: 'BOM/2022/0056', class: 'XI-A', house: 'Vivekananda', status: 'Active', issueDate: '01 Apr 2025' },
  { id: 5, name: 'Kabir Patel', admissionNo: 'BOM/2023/0178', class: 'VII-A', house: 'Aryabhatta', status: 'Lost', issueDate: '01 Apr 2025' },
  { id: 6, name: 'Sneha Reddy', admissionNo: 'BOM/2024/0034', class: 'VI-B', house: 'Raman', status: 'Active', issueDate: '01 Apr 2025' },
  { id: 7, name: 'Arjun Mehta', admissionNo: 'BOM/2023/0098', class: 'X-C', house: 'Tagore', status: 'Damaged', issueDate: '01 Apr 2025' },
  { id: 8, name: 'Pooja Singh', admissionNo: 'BOM/2024/0112', class: 'VII-A', house: 'Vivekananda', status: 'Active', issueDate: '01 Apr 2025' },
]

const reissueRequests = [
  { id: 1, student: 'Kabir Patel', admissionNo: 'BOM/2023/0178', class: 'VII-A', reason: 'Lost on Bus Route 7', date: '03 Mar 2026', status: 'Approved', newQR: 'BOM-2023-0178-R2' },
  { id: 2, student: 'Arjun Mehta', admissionNo: 'BOM/2023/0098', class: 'X-C', reason: 'Card damaged / chip broken', date: '05 Mar 2026', status: 'Processing', newQR: 'BOM-2023-0098-R1' },
  { id: 3, student: 'Divya Sharma', admissionNo: 'BOM/2024/0067', class: 'VIII-B', reason: 'Lost in school premises', date: '07 Mar 2026', status: 'Pending', newQR: 'BOM-2024-0067-R1' },
  { id: 4, student: 'Vikram Joshi', admissionNo: 'BOM/2022/0045', class: 'XII-A', reason: 'Photo faded', date: '08 Mar 2026', status: 'Pending', newQR: 'BOM-2022-0045-R1' },
]

const printQueueData = [
  { id: 1, batch: 'Class VI - New Admissions', cards: 45, status: 'Printing', progress: 72, printer: 'HP LaserJet Pro #1' },
  { id: 2, batch: 'Class IX - Reissue Batch', cards: 8, status: 'Queued', progress: 0, printer: 'HP LaserJet Pro #2' },
  { id: 3, batch: 'Staff ID Cards - Q4', cards: 22, status: 'Queued', progress: 0, printer: 'HP LaserJet Pro #1' },
  { id: 4, batch: 'Class XII - Board Exam Cards', cards: 84, status: 'Completed', progress: 100, printer: 'HP LaserJet Pro #1' },
]

const authorizedPersons = [
  { name: 'Rajesh Sharma', relation: 'Father', photo: true, idVerified: true, addedDate: '01 Apr 2025' },
  { name: 'Sunita Sharma', relation: 'Mother', photo: true, idVerified: true, addedDate: '01 Apr 2025' },
  { name: 'Mohan Sharma', relation: 'Grandfather', photo: true, idVerified: true, addedDate: '15 Sep 2025' },
  { name: 'Ramesh Kumar', relation: 'Uncle', photo: false, idVerified: false, addedDate: 'Pending' },
]

const scanLogData = [
  { time: '08:12 AM', name: 'Aarav Sharma', class: 'X-A', type: 'Entry', status: 'Verified' },
  { time: '08:14 AM', name: 'Priya Menon', class: 'IX-B', type: 'Entry', status: 'Verified' },
  { time: '08:15 AM', name: 'Unknown Person', class: '-', type: 'Entry', status: 'Denied' },
  { time: '08:18 AM', name: 'Rohan Gupta', class: 'VIII-A', type: 'Entry', status: 'Verified' },
  { time: '08:20 AM', name: 'Ananya Iyer', class: 'XI-A', type: 'Entry', status: 'Verified' },
  { time: '02:45 PM', name: 'Aarav Sharma', class: 'X-A', type: 'Exit', status: 'Verified' },
  { time: '02:48 PM', name: 'Priya Menon', class: 'IX-B', type: 'Exit', status: 'Verified' },
]

const hourlyScanData = [
  { hour: '7AM', scans: 120 },
  { hour: '8AM', scans: 480 },
  { hour: '9AM', scans: 85 },
  { hour: '12PM', scans: 45 },
  { hour: '1PM', scans: 30 },
  { hour: '2PM', scans: 95 },
  { hour: '3PM', scans: 520 },
  { hour: '4PM', scans: 280 },
]

function IDCardFront({ cardLayout, houseColor, student }) {
  return (
    <div className={`relative ${cardLayout === 'vertical' ? 'w-[280px] h-[420px]' : 'w-[400px] h-[250px]'} rounded-2xl overflow-hidden shadow-2xl border-2 ${houseColor.border} bg-white`}>
      <div className="bg-gradient-to-r from-[#0A1628] to-[#1A2D4A] text-white px-4 py-2.5 flex items-center gap-3">
        <div className="w-9 h-9 rounded-lg bg-white/15 flex items-center justify-center flex-shrink-0">
          <GraduationCap className="w-5 h-5 text-[#C8A45C]" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[11px] font-bold tracking-wide">BIRLA OPEN MINDS</p>
          <p className="text-[9px] text-white/70">International School, Singur</p>
        </div>
        <span className={`text-[8px] px-1.5 py-0.5 rounded-full ${houseColor.bg}/30 ${houseColor.light} border ${houseColor.border}`}>
          {student.house}
        </span>
      </div>

      {cardLayout === 'vertical' ? (
        <div className="p-4">
          <div className="flex items-center gap-3 mb-3">
            <div className={`w-16 h-16 rounded-xl ${houseColor.bg} flex items-center justify-center text-white text-lg font-bold flex-shrink-0`}>
              {student.name.split(' ').map(n => n[0]).join('')}
            </div>
            <div>
              <p className="text-sm font-bold text-[#0A1628]">{student.name}</p>
              <p className="text-[10px] text-gray-500">Adm: {student.admissionNo}</p>
              <p className="text-[10px] text-gray-500">Class {student.class}-{student.section} &bull; Roll: {student.rollNo}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-x-3 gap-y-1.5 text-[10px] mb-3">
            <div><span className="text-gray-400">Blood Group:</span> <span className="font-semibold text-[#0A1628]">{student.bloodGroup}</span></div>
            <div><span className="text-gray-400">DOB:</span> <span className="font-semibold text-[#0A1628]">{student.dob}</span></div>
            <div><span className="text-gray-400">Contact:</span> <span className="font-semibold text-[#0A1628]">{student.contact}</span></div>
            <div><span className="text-gray-400">AY:</span> <span className="font-semibold text-[#0A1628]">{student.academicYear}</span></div>
            <div><span className="text-gray-400">Transport:</span> <span className="font-semibold text-[#0A1628]">{student.transportRoute}</span></div>
            <div><span className="text-gray-400">House:</span> <span className={`font-semibold ${houseColor.text}`}>{student.house}</span></div>
          </div>

          <div className="flex items-center justify-between">
            <div className="w-16 h-16 rounded-lg border-2 border-dashed border-[#0A1628]/20 flex items-center justify-center bg-gray-50">
              <QrCode className="w-10 h-10 text-[#0A1628]/40" />
            </div>
            <div className="text-right">
              <div className="flex items-center gap-1 text-[8px] text-gray-400">
                <Wifi className="w-3 h-3" />
                <span>RFID/NFC Enabled</span>
              </div>
              <div className="flex items-center gap-1 text-[8px] text-gray-400 mt-0.5">
                <Fingerprint className="w-3 h-3" />
                <span>Biometric Ready</span>
              </div>
              <p className="text-[8px] text-gray-400 mt-1">ID: BOM-2025-0142-V</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="p-3 flex gap-3">
          <div className={`w-24 h-28 rounded-xl ${houseColor.bg} flex items-center justify-center text-white text-2xl font-bold flex-shrink-0`}>
            {student.name.split(' ').map(n => n[0]).join('')}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold text-[#0A1628]">{student.name}</p>
            <p className="text-[10px] text-gray-500">Adm: {student.admissionNo} &bull; Class {student.class}-{student.section} &bull; Roll: {student.rollNo}</p>
            <div className="grid grid-cols-2 gap-x-3 gap-y-0.5 text-[9px] mt-1.5">
              <div><span className="text-gray-400">Blood:</span> <span className="font-semibold">{student.bloodGroup}</span></div>
              <div><span className="text-gray-400">DOB:</span> <span className="font-semibold">{student.dob}</span></div>
              <div><span className="text-gray-400">Contact:</span> <span className="font-semibold">{student.contact}</span></div>
              <div><span className="text-gray-400">House:</span> <span className={`font-semibold ${houseColor.text}`}>{student.house}</span></div>
            </div>
            <div className="flex items-center justify-end gap-2 mt-2">
              <div className="flex items-center gap-1 text-[8px] text-gray-400">
                <Wifi className="w-3 h-3" /> RFID
              </div>
              <div className="w-10 h-10 rounded border border-dashed border-gray-300 flex items-center justify-center bg-gray-50">
                <QrCode className="w-6 h-6 text-gray-400" />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function IDCardBack({ cardLayout, student }) {
  return (
    <div className={`relative ${cardLayout === 'vertical' ? 'w-[280px] h-[420px]' : 'w-[400px] h-[250px]'} rounded-2xl overflow-hidden shadow-2xl border-2 border-gray-200 bg-white`}>
      <div className="bg-gradient-to-r from-[#0A1628]/5 to-[#22D3EE]/5 h-full p-4 flex flex-col">
        {cardLayout === 'vertical' ? (
          <>
            <div className="text-[10px] space-y-1.5 mb-3">
              <div className="flex items-start gap-2">
                <MapPin className="w-3 h-3 text-[#0A1628] mt-0.5 flex-shrink-0" />
                <span className="text-gray-600">{student.schoolAddress}</span>
              </div>
              <div className="flex items-start gap-2">
                <Phone className="w-3 h-3 text-red-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-gray-600">Emergency 1: {student.emergencyContact1}</p>
                  <p className="text-gray-600">Emergency 2: {student.emergencyContact2}</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Bus className="w-3 h-3 text-blue-500 mt-0.5 flex-shrink-0" />
                <span className="text-gray-600">{student.busRoute}</span>
              </div>
              <div className="flex items-start gap-2">
                <Stethoscope className="w-3 h-3 text-emerald-500 mt-0.5 flex-shrink-0" />
                <span className="text-gray-600">{student.medicalNotes}</span>
              </div>
            </div>

            <div className="flex-1" />

            <div className="flex items-center justify-between p-2.5 rounded-xl bg-gray-50 border border-gray-100">
              <div>
                <p className="text-[8px] text-gray-400 font-medium">SCAN TO VERIFY</p>
                <p className="text-[9px] text-gray-600">birlaopenminds.com/verify</p>
                <p className="text-[8px] text-gray-400 mt-0.5 flex items-center gap-1">
                  <Globe className="w-2.5 h-2.5" />
                  {student.website}
                </p>
              </div>
              <div className="w-14 h-14 rounded-lg border-2 border-dashed border-[#0A1628]/20 flex items-center justify-center bg-white">
                <QrCode className="w-9 h-9 text-[#0A1628]/40" />
              </div>
            </div>

            <p className="text-[7px] text-gray-400 text-center mt-2">
              If found, please return to Birla Open Minds International School, Singur &bull; This card is non-transferable
            </p>
          </>
        ) : (
          <div className="flex gap-4 h-full">
            <div className="flex-1 text-[9px] space-y-1.5">
              <div className="flex items-start gap-1.5">
                <MapPin className="w-3 h-3 text-[#0A1628] mt-0.5 flex-shrink-0" />
                <span className="text-gray-600">{student.schoolAddress}</span>
              </div>
              <div className="flex items-start gap-1.5">
                <Phone className="w-3 h-3 text-red-500 mt-0.5 flex-shrink-0" />
                <div className="text-gray-600">
                  <p>Emg 1: {student.emergencyContact1}</p>
                  <p>Emg 2: {student.emergencyContact2}</p>
                </div>
              </div>
              <div className="flex items-start gap-1.5">
                <Bus className="w-3 h-3 text-blue-500 mt-0.5 flex-shrink-0" />
                <span className="text-gray-600">{student.busRoute}</span>
              </div>
              <div className="flex items-start gap-1.5">
                <Stethoscope className="w-3 h-3 text-emerald-500 mt-0.5 flex-shrink-0" />
                <span className="text-gray-600">{student.medicalNotes}</span>
              </div>
            </div>
            <div className="flex flex-col items-center justify-end gap-1">
              <div className="w-12 h-12 rounded border border-dashed border-gray-300 flex items-center justify-center bg-white">
                <QrCode className="w-8 h-8 text-gray-400" />
              </div>
              <p className="text-[7px] text-gray-400">SCAN TO VERIFY</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default function IDCardsModule() {
  const { darkMode } = useAppStore()
  const [activeTab, setActiveTab] = useState('overview')
  const [cardLayout, setCardLayout] = useState('vertical')
  const [showBack, setShowBack] = useState(false)
  const [scanState, setScanState] = useState('idle')
  const [visitorForm, setVisitorForm] = useState({ name: '', purpose: '', host: '', phone: '' })
  const [bulkClass, setBulkClass] = useState('all')
  const [bulkProgress, setBulkProgress] = useState(0)

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'designer', label: 'Card Designer', icon: CreditCard },
    { id: 'bulk', label: 'Bulk Generate', icon: Grid3X3 },
    { id: 'print', label: 'Print', icon: Printer },
    { id: 'qr-scan', label: 'QR Scan', icon: ScanLine },
    { id: 'smart', label: 'Smart Campus', icon: Shield },
  ]

  const tooltipStyle = {
    backgroundColor: darkMode ? '#1A2D4A' : '#fff',
    border: `1px solid ${darkMode ? 'rgba(255,255,255,0.1)' : '#e2e8f0'}`,
    borderRadius: '12px',
    fontSize: '12px',
    color: darkMode ? '#e2e8f0' : '#1e293b',
  }

  const handleScan = () => {
    setScanState('scanning')
    setTimeout(() => setScanState('success'), 1500)
    setTimeout(() => setScanState('idle'), 3500)
  }

  const handleBulkGenerate = () => {
    setBulkProgress(0)
    const interval = setInterval(() => {
      setBulkProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + 2
      })
    }, 60)
  }

  const houseColor = HOUSE_COLORS[sampleStudent.house]

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

      {/* ─── Overview Tab ──────────────────────────────────── */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Scan Activity + Quick Actions */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <motion.div variants={itemVariants} className="lg:col-span-2 rounded-2xl border border-border bg-card p-5">
              <h3 className="text-base font-semibold text-foreground flex items-center gap-2 mb-4">
                <Activity className="w-4 h-4 text-[#22D3EE]" />
                Hourly Scan Activity Today
              </h3>
              <div className="h-56">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={hourlyScanData}>
                    <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'} />
                    <XAxis dataKey="hour" tick={{ fontSize: 10 }} stroke={darkMode ? '#64748b' : '#94a3b8'} />
                    <YAxis tick={{ fontSize: 10 }} stroke={darkMode ? '#64748b' : '#94a3b8'} />
                    <Tooltip contentStyle={tooltipStyle} />
                    <Bar dataKey="scans" fill="#22D3EE" radius={[4, 4, 0, 0]} name="QR Scans" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-5">
              <h3 className="text-base font-semibold text-foreground flex items-center gap-2 mb-4">
                <Zap className="w-4 h-4 text-[#C8A45C]" />
                Quick Actions
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { label: 'New ID Card', icon: Plus, color: 'bg-[#0A1628]/10 text-[#0A1628] dark:text-[#22D3EE]' },
                  { label: 'Reissue', icon: RefreshCw, color: 'bg-amber-500/10 text-amber-500' },
                  { label: 'Bulk Print', icon: Printer, color: 'bg-purple-500/10 text-purple-500' },
                  { label: 'QR Scan', icon: ScanLine, color: 'bg-emerald-500/10 text-emerald-500' },
                  { label: 'Visitor Pass', icon: User, color: 'bg-blue-500/10 text-blue-500' },
                  { label: 'Templates', icon: Palette, color: 'bg-[#C8A45C]/10 text-[#C8A45C]' },
                ].map((action) => {
                  const Icon = action.icon
                  return (
                    <button key={action.label} className="flex flex-col items-center gap-2 p-3 rounded-xl border border-border hover:border-[#C8A45C]/30 hover:shadow-md transition-all group">
                      <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${action.color} group-hover:scale-110 transition-transform`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="text-[10px] text-muted-foreground group-hover:text-foreground transition-colors">{action.label}</span>
                    </button>
                  )
                })}
              </div>

              {/* House Distribution */}
              <div className="mt-4">
                <h4 className="text-xs font-medium text-muted-foreground mb-2">House Distribution</h4>
                <div className="space-y-1.5">
                  {Object.entries(HOUSE_COLORS).map(([name, colors]) => {
                    const count = name === 'Aryabhatta' ? 685 : name === 'Raman' ? 642 : name === 'Tagore' ? 618 : 602
                    return (
                      <div key={name} className="flex items-center gap-2">
                        <div className={`w-2.5 h-2.5 rounded-full ${colors.bg}`} />
                        <span className="text-[10px] text-muted-foreground flex-1">{name}</span>
                        <span className="text-[10px] font-semibold text-foreground">{count}</span>
                      </div>
                    )
                  })}
                </div>
              </div>
            </motion.div>
          </div>

          {/* ID Cards List */}
          <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-semibold text-foreground flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-[#0A1628]" />
                Recent ID Cards
              </h3>
              <div className="flex gap-2">
                <div className="relative">
                  <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search..."
                    className="pl-8 pr-3 py-1.5 rounded-lg border border-border bg-background text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-[#22D3EE]/30 w-40"
                  />
                </div>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left text-xs font-medium text-muted-foreground py-2.5 px-3">Student</th>
                    <th className="text-left text-xs font-medium text-muted-foreground py-2.5 px-3">Adm No</th>
                    <th className="text-left text-xs font-medium text-muted-foreground py-2.5 px-3">Class</th>
                    <th className="text-left text-xs font-medium text-muted-foreground py-2.5 px-3">House</th>
                    <th className="text-left text-xs font-medium text-muted-foreground py-2.5 px-3">Status</th>
                    <th className="text-left text-xs font-medium text-muted-foreground py-2.5 px-3">Issued</th>
                  </tr>
                </thead>
                <tbody>
                  {idCardsList.map((card) => {
                    const hc = HOUSE_COLORS[card.house]
                    return (
                      <tr key={card.id} className="border-b border-border/50 hover:bg-muted/20 transition-colors">
                        <td className="py-2.5 px-3">
                          <div className="flex items-center gap-2">
                            <div className={`w-7 h-7 rounded-lg ${hc.bg} flex items-center justify-center text-white text-[10px] font-bold`}>
                              {card.name.split(' ').map(n => n[0]).join('')}
                            </div>
                            <span className="text-sm text-foreground">{card.name}</span>
                          </div>
                        </td>
                        <td className="py-2.5 px-3 text-xs text-muted-foreground font-mono">{card.admissionNo}</td>
                        <td className="py-2.5 px-3 text-xs text-foreground">{card.class}</td>
                        <td className="py-2.5 px-3">
                          <span className={`text-[10px] px-2 py-0.5 rounded-full ${hc.light} ${hc.text} font-medium`}>{card.house}</span>
                        </td>
                        <td className="py-2.5 px-3">
                          <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                            card.status === 'Active' ? 'bg-emerald-500/10 text-emerald-500' :
                            card.status === 'Lost' ? 'bg-red-500/10 text-red-500' :
                            'bg-amber-500/10 text-amber-500'
                          }`}>{card.status}</span>
                        </td>
                        <td className="py-2.5 px-3 text-xs text-muted-foreground">{card.issueDate}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>
      )}

      {/* ─── Card Designer Tab ─────────────────────────────── */}
      {activeTab === 'designer' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Card Preview */}
            <motion.div variants={itemVariants} className="lg:col-span-2 rounded-2xl border border-border bg-card p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-semibold text-foreground flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-[#C8A45C]" />
                  ID Card Preview
                </h3>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setCardLayout('vertical')}
                    className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                      cardLayout === 'vertical' ? 'bg-[#0A1628] text-white' : 'text-muted-foreground hover:bg-muted'
                    }`}
                  >
                    Vertical
                  </button>
                  <button
                    onClick={() => setCardLayout('horizontal')}
                    className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                      cardLayout === 'horizontal' ? 'bg-[#0A1628] text-white' : 'text-muted-foreground hover:bg-muted'
                    }`}
                  >
                    Horizontal
                  </button>
                  <div className="w-px h-6 bg-border mx-1" />
                  <button
                    onClick={() => setShowBack(false)}
                    className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                      !showBack ? 'bg-[#C8A45C] text-white' : 'text-muted-foreground hover:bg-muted'
                    }`}
                  >
                    Front
                  </button>
                  <button
                    onClick={() => setShowBack(true)}
                    className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                      showBack ? 'bg-[#C8A45C] text-white' : 'text-muted-foreground hover:bg-muted'
                    }`}
                  >
                    Back
                  </button>
                </div>
              </div>
              <div className="flex justify-center py-6">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`${showBack}-${cardLayout}`}
                    initial={{ rotateY: 90, opacity: 0 }}
                    animate={{ rotateY: 0, opacity: 1 }}
                    exit={{ rotateY: -90, opacity: 0 }}
                    transition={{ duration: 0.4 }}
                  >
                    {showBack ? <IDCardBack cardLayout={cardLayout} student={sampleStudent} /> : <IDCardFront cardLayout={cardLayout} houseColor={houseColor} student={sampleStudent} />}
                  </motion.div>
                </AnimatePresence>
              </div>
              <div className="flex justify-center gap-3 mt-2">
                <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#0A1628] text-white text-sm font-medium hover:opacity-90 transition-opacity">
                  <Download className="w-4 h-4" />
                  Download Card
                </button>
                <button className="flex items-center gap-2 px-4 py-2 rounded-xl border border-border text-muted-foreground text-sm font-medium hover:bg-muted/50 transition-colors">
                  <Printer className="w-4 h-4" />
                  Print Card
                </button>
                <button className="flex items-center gap-2 px-4 py-2 rounded-xl border border-border text-muted-foreground text-sm font-medium hover:bg-muted/50 transition-colors">
                  <FlipHorizontal className="w-4 h-4" />
                  Flip Card
                </button>
              </div>
            </motion.div>

            {/* Template Designer & Customization */}
            <motion.div variants={itemVariants} className="space-y-4">
              <div className="rounded-2xl border border-border bg-card p-5">
                <h3 className="text-base font-semibold text-foreground flex items-center gap-2 mb-4">
                  <Palette className="w-4 h-4 text-[#22D3EE]" />
                  Template Styles
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { name: 'Classic Blue', style: 'from-[#0A1628] to-[#1A2D4A]', selected: true },
                    { name: 'Royal Gold', style: 'from-[#C8A45C] to-[#A08040]', selected: false },
                    { name: 'Ocean Cyan', style: 'from-[#22D3EE] to-[#0E7490]', selected: false },
                    { name: 'Emerald', style: 'from-emerald-600 to-emerald-800', selected: false },
                  ].map((tmpl) => (
                    <button key={tmpl.name} className={`p-3 rounded-xl border-2 transition-all ${
                      tmpl.selected ? 'border-[#22D3EE] shadow-md' : 'border-border hover:border-muted'
                    }`}>
                      <div className={`h-8 rounded-lg bg-gradient-to-r ${tmpl.style} mb-2`} />
                      <p className="text-[10px] font-medium text-foreground text-center">{tmpl.name}</p>
                    </button>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl border border-border bg-card p-5">
                <h3 className="text-base font-semibold text-foreground flex items-center gap-2 mb-4">
                  <Settings className="w-4 h-4 text-[#C8A45C]" />
                  Customization
                </h3>
                <div className="space-y-3">
                  <div>
                    <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Student Name</label>
                    <input
                      type="text"
                      defaultValue="Aarav Sharma"
                      className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-[#22D3EE]/30"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-muted-foreground mb-1.5 block">House</label>
                    <select className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-[#22D3EE]/30">
                      <option>Aryabhatta</option>
                      <option>Raman</option>
                      <option>Tagore</option>
                      <option>Vivekananda</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Card Layout</label>
                    <div className="flex gap-2">
                      <button className="flex-1 py-2 rounded-lg border border-border text-xs text-muted-foreground hover:bg-muted/50 transition-colors flex items-center justify-center gap-1.5">
                        <Maximize2 className="w-3 h-3" /> Vertical
                      </button>
                      <button className="flex-1 py-2 rounded-lg border border-border text-xs text-muted-foreground hover:bg-muted/50 transition-colors flex items-center justify-center gap-1.5">
                        <Move className="w-3 h-3" /> Horizontal
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      )}

      {/* ─── Bulk Generate Tab ─────────────────────────────── */}
      {activeTab === 'bulk' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-5">
              <h3 className="text-base font-semibold text-foreground flex items-center gap-2 mb-4">
                <Grid3X3 className="w-4 h-4 text-[#22D3EE]" />
                Batch Configuration
              </h3>
              <div className="space-y-3">
                <div>
                  <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Select Class</label>
                  <select
                    value={bulkClass}
                    onChange={(e) => setBulkClass(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-border bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-[#22D3EE]/30"
                  >
                    <option value="all">All Classes</option>
                    <option value="VI">Class VI</option>
                    <option value="VII">Class VII</option>
                    <option value="VIII">Class VIII</option>
                    <option value="IX">Class IX</option>
                    <option value="X">Class X</option>
                    <option value="XI">Class XI</option>
                    <option value="XII">Class XII</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Filter By</label>
                  <select className="w-full px-3 py-2.5 rounded-xl border border-border bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-[#22D3EE]/30">
                    <option>All Students</option>
                    <option>New Admissions Only</option>
                    <option>Active Cards Only</option>
                    <option>Reissue Required</option>
                    <option>No Card Generated</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Template</label>
                  <select className="w-full px-3 py-2.5 rounded-xl border border-border bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-[#22D3EE]/30">
                    <option>Classic Blue</option>
                    <option>Royal Gold</option>
                    <option>Ocean Cyan</option>
                    <option>Emerald</option>
                  </select>
                </div>
                <div className="p-3 rounded-xl bg-[#0A1628]/5 dark:bg-[#22D3EE]/5 border border-[#0A1628]/10 dark:border-[#22D3EE]/10">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-muted-foreground">Cards to Generate</span>
                    <span className="text-sm font-bold text-[#0A1628] dark:text-[#22D3EE]">
                      {bulkClass === 'all' ? '2,547' : '120'}
                    </span>
                  </div>
                  <p className="text-[10px] text-muted-foreground">Estimated time: {bulkClass === 'all' ? '~15 min' : '~2 min'}</p>
                </div>
                <button
                  onClick={handleBulkGenerate}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#0A1628] text-white text-sm font-medium hover:opacity-90 transition-opacity"
                >
                  <Zap className="w-4 h-4" />
                  Generate ID Cards
                </button>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="lg:col-span-2 rounded-2xl border border-border bg-card p-5">
              <h3 className="text-base font-semibold text-foreground flex items-center gap-2 mb-4">
                <Activity className="w-4 h-4 text-[#C8A45C]" />
                Generation Progress
              </h3>
              {bulkProgress > 0 && (
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-muted-foreground">
                      {bulkProgress < 100 ? 'Generating...' : 'Complete!'}
                    </span>
                    <span className="text-sm font-bold text-[#22D3EE]">{bulkProgress}%</span>
                  </div>
                  <div className="h-3 rounded-full bg-muted overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${bulkProgress}%` }}
                      className="h-full rounded-full bg-gradient-to-r from-[#0A1628] to-[#22D3EE]"
                    />
                  </div>
                </div>
              )}

              <h4 className="text-xs font-medium text-muted-foreground mb-2">Preview Grid</h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 max-h-72 overflow-y-auto">
                {[
                  { name: 'Aarav Sharma', class: 'X-A', house: 'Aryabhatta' },
                  { name: 'Priya Menon', class: 'IX-B', house: 'Raman' },
                  { name: 'Rohan Gupta', class: 'VIII-A', house: 'Tagore' },
                  { name: 'Ananya Iyer', class: 'XI-A', house: 'Vivekananda' },
                  { name: 'Kabir Patel', class: 'VII-A', house: 'Aryabhatta' },
                  { name: 'Sneha Reddy', class: 'VI-B', house: 'Raman' },
                  { name: 'Arjun Mehta', class: 'X-C', house: 'Tagore' },
                  { name: 'Pooja Singh', class: 'VII-A', house: 'Vivekananda' },
                ].map((student, i) => {
                  const hc = HOUSE_COLORS[student.house]
                  return (
                    <div key={i} className="p-3 rounded-xl border border-border hover:shadow-md transition-all group">
                      <div className={`w-10 h-10 rounded-lg ${hc.bg} flex items-center justify-center text-white text-xs font-bold mx-auto mb-2`}>
                        {student.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <p className="text-[10px] font-medium text-foreground text-center truncate">{student.name}</p>
                      <p className="text-[9px] text-muted-foreground text-center">{student.class}</p>
                      <span className={`inline-block text-[8px] px-1.5 py-0.5 rounded-full ${hc.light} ${hc.text} font-medium mx-auto mt-1`}>{student.house}</span>
                    </div>
                  )
                })}
              </div>
            </motion.div>
          </div>
        </div>
      )}

      {/* ─── Print Tab ─────────────────────────────────────── */}
      {activeTab === 'print' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Print Queue */}
            <motion.div variants={itemVariants} className="lg:col-span-2 rounded-2xl border border-border bg-card p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-semibold text-foreground flex items-center gap-2">
                  <Printer className="w-4 h-4 text-[#0A1628]" />
                  Print Queue
                </h3>
                <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#0A1628] text-white text-xs font-medium hover:opacity-90 transition-opacity">
                  <Plus className="w-3.5 h-3.5" />
                  Add to Queue
                </button>
              </div>
              <div className="space-y-3">
                {printQueueData.map((job) => (
                  <div key={job.id} className="p-4 rounded-xl border border-border hover:bg-muted/30 transition-colors">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                          job.status === 'Printing' ? 'bg-[#22D3EE]/10 text-[#22D3EE]' :
                          job.status === 'Completed' ? 'bg-emerald-500/10 text-emerald-500' :
                          'bg-muted text-muted-foreground'
                        }`}>
                          <Printer className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-foreground">{job.batch}</p>
                          <p className="text-[10px] text-muted-foreground">{job.cards} cards &bull; {job.printer}</p>
                        </div>
                      </div>
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                        job.status === 'Printing' ? 'bg-[#22D3EE]/10 text-[#22D3EE]' :
                        job.status === 'Completed' ? 'bg-emerald-500/10 text-emerald-500' :
                        'bg-muted text-muted-foreground'
                      }`}>{job.status}</span>
                    </div>
                    {job.status !== 'Completed' && (
                      <div className="mt-2">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-[10px] text-muted-foreground">Progress</span>
                          <span className="text-[10px] font-semibold text-foreground">{job.progress}%</span>
                        </div>
                        <div className="h-2 rounded-full bg-muted overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${job.progress}%` }}
                            transition={{ duration: 1, ease: 'easeOut' }}
                            className={`h-full rounded-full ${
                              job.status === 'Printing' ? 'bg-gradient-to-r from-[#0A1628] to-[#22D3EE]' : 'bg-muted'
                            }`}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Printer Status + Reissue */}
            <motion.div variants={itemVariants} className="space-y-4">
              <div className="rounded-2xl border border-border bg-card p-5">
                <h3 className="text-base font-semibold text-foreground flex items-center gap-2 mb-4">
                  <Settings className="w-4 h-4 text-[#22D3EE]" />
                  Printer Status
                </h3>
                <div className="space-y-2">
                  {[
                    { name: 'HP LaserJet Pro #1', status: 'Online', ink: 72, jobs: 3 },
                    { name: 'HP LaserJet Pro #2', status: 'Idle', ink: 45, jobs: 0 },
                    { name: 'Epson L805 (Color)', status: 'Offline', ink: 12, jobs: 0 },
                  ].map((printer) => (
                    <div key={printer.name} className="p-2.5 rounded-xl border border-border">
                      <div className="flex items-center justify-between mb-1">
                        <p className="text-xs font-medium text-foreground">{printer.name}</p>
                        <span className={`text-[9px] px-1.5 py-0.5 rounded-full font-medium ${
                          printer.status === 'Online' ? 'bg-emerald-500/10 text-emerald-500' :
                          printer.status === 'Idle' ? 'bg-amber-500/10 text-amber-500' :
                          'bg-red-500/10 text-red-500'
                        }`}>{printer.status}</span>
                      </div>
                      <div className="flex items-center gap-3 text-[10px] text-muted-foreground">
                        <span>Ink: {printer.ink}%</span>
                        <span>Queue: {printer.jobs}</span>
                      </div>
                      <div className="h-1.5 rounded-full bg-muted overflow-hidden mt-1">
                        <div className={`h-full rounded-full ${
                          printer.ink > 50 ? 'bg-emerald-500' :
                          printer.ink > 20 ? 'bg-amber-500' : 'bg-red-500'
                        }`} style={{ width: `${printer.ink}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl border border-border bg-card p-5">
                <h3 className="text-base font-semibold text-foreground flex items-center gap-2 mb-3">
                  <RefreshCw className="w-4 h-4 text-amber-500" />
                  Reissue Requests
                </h3>
                <div className="space-y-2 max-h-44 overflow-y-auto">
                  {reissueRequests.map((req) => (
                    <div key={req.id} className="p-2 rounded-lg border border-border hover:bg-muted/30 transition-colors">
                      <div className="flex items-center justify-between">
                        <p className="text-[11px] font-medium text-foreground">{req.student}</p>
                        <span className={`text-[9px] px-1.5 py-0.5 rounded-full font-medium ${
                          req.status === 'Approved' ? 'bg-emerald-500/10 text-emerald-500' :
                          req.status === 'Processing' ? 'bg-[#22D3EE]/10 text-[#22D3EE]' :
                          'bg-amber-500/10 text-amber-500'
                        }`}>{req.status}</span>
                      </div>
                      <p className="text-[9px] text-muted-foreground mt-0.5">{req.reason}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      )}

      {/* ─── QR Scan Tab ────────────────────────────────────── */}
      {activeTab === 'qr-scan' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Scan Interface */}
            <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-5">
              <h3 className="text-base font-semibold text-foreground flex items-center gap-2 mb-4">
                <ScanLine className="w-4 h-4 text-[#22D3EE]" />
                QR Code Scanner
              </h3>
              <div className="flex flex-col items-center">
                <div className="relative w-64 h-64 rounded-2xl border-2 border-dashed border-[#22D3EE]/30 flex items-center justify-center bg-[#0A1628]/5 dark:bg-[#22D3EE]/5 mb-4 overflow-hidden">
                  {scanState === 'idle' && (
                    <div className="text-center">
                      <QrCode className="w-16 h-16 text-[#22D3EE]/30 mx-auto mb-3" />
                      <p className="text-sm text-muted-foreground">Ready to Scan</p>
                      <p className="text-[10px] text-muted-foreground mt-1">Place ID card QR in front of scanner</p>
                    </div>
                  )}
                  {scanState === 'scanning' && (
                    <motion.div
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{ duration: 0.8, repeat: Infinity }}
                      className="text-center"
                    >
                      <ScanLine className="w-16 h-16 text-[#22D3EE] mx-auto mb-3" />
                      <p className="text-sm font-medium text-[#22D3EE]">Scanning...</p>
                    </motion.div>
                  )}
                  {scanState === 'success' && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="text-center"
                    >
                      <div className="w-20 h-20 rounded-full bg-emerald-500/10 flex items-center justify-center mx-auto mb-3">
                        <CheckCircle2 className="w-10 h-10 text-emerald-500" />
                      </div>
                      <p className="text-sm font-semibold text-emerald-500">Verified!</p>
                      <p className="text-[10px] text-muted-foreground mt-1">Aarav Sharma - Class X-A</p>
                    </motion.div>
                  )}
                  {/* Scan line animation */}
                  {scanState === 'scanning' && (
                    <motion.div
                      animate={{ y: [-100, 100] }}
                      transition={{ duration: 1.5, repeat: Infinity, repeatType: 'reverse' }}
                      className="absolute left-4 right-4 h-0.5 bg-[#22D3EE]/50"
                    />
                  )}
                </div>
                <button
                  onClick={handleScan}
                  disabled={scanState !== 'idle'}
                  className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#0A1628] text-white text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
                >
                  <ScanLine className="w-4 h-4" />
                  Simulate Scan
                </button>
              </div>
            </motion.div>

            {/* Scan Log */}
            <motion.div variants={itemVariants} className="space-y-4">
              <div className="rounded-2xl border border-border bg-card p-5">
                <h3 className="text-base font-semibold text-foreground flex items-center gap-2 mb-4">
                  <Clock className="w-4 h-4 text-[#C8A45C]" />
                  Today&apos;s Scan Log
                </h3>
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {scanLogData.map((log, i) => (
                    <div key={i} className="flex items-center gap-3 p-2.5 rounded-xl border border-border hover:bg-muted/30 transition-colors">
                      <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${
                        log.type === 'Entry' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-blue-500/10 text-blue-500'
                      }`}>
                        {log.type === 'Entry' ? <DoorOpen className="w-3.5 h-3.5" /> : <ExternalLink className="w-3.5 h-3.5" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium text-foreground">{log.name}</p>
                        <p className="text-[9px] text-muted-foreground">{log.class} &bull; {log.type}</p>
                      </div>
                      <div className="text-right">
                        <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-medium ${
                          log.status === 'Verified' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-red-500/10 text-red-500'
                        }`}>{log.status}</span>
                        <p className="text-[9px] text-muted-foreground mt-0.5">{log.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Visitor Temporary ID */}
              <div className="rounded-2xl border border-border bg-card p-5">
                <h3 className="text-base font-semibold text-foreground flex items-center gap-2 mb-4">
                  <User className="w-4 h-4 text-purple-500" />
                  Visitor Temporary ID
                </h3>
                <div className="space-y-2">
                  <input
                    type="text"
                    placeholder="Visitor Name"
                    value={visitorForm.name}
                    onChange={(e) => setVisitorForm(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-[#22D3EE]/30"
                  />
                  <input
                    type="text"
                    placeholder="Purpose of Visit"
                    value={visitorForm.purpose}
                    onChange={(e) => setVisitorForm(prev => ({ ...prev, purpose: e.target.value }))}
                    className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-[#22D3EE]/30"
                  />
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      placeholder="Host / Meeting With"
                      value={visitorForm.host}
                      onChange={(e) => setVisitorForm(prev => ({ ...prev, host: e.target.value }))}
                      className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-[#22D3EE]/30"
                    />
                    <input
                      type="text"
                      placeholder="Phone Number"
                      value={visitorForm.phone}
                      onChange={(e) => setVisitorForm(prev => ({ ...prev, phone: e.target.value }))}
                      className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-[#22D3EE]/30"
                    />
                  </div>
                  <button className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-purple-600 text-white text-sm font-medium hover:opacity-90 transition-opacity">
                    <QrCode className="w-4 h-4" />
                    Generate Temp QR Pass
                  </button>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Parent Pickup Authorization */}
          <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-semibold text-foreground flex items-center gap-2">
                <Shield className="w-4 h-4 text-emerald-500" />
                Parent Pickup Authorization - Aarav Sharma (X-A)
              </h3>
              <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#0A1628] text-white text-xs font-medium hover:opacity-90 transition-opacity">
                <Plus className="w-3.5 h-3.5" />
                Add Person
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {authorizedPersons.map((person, i) => (
                <div key={i} className="p-3 rounded-xl border border-border hover:shadow-md transition-all">
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      person.photo ? 'bg-emerald-500/10 text-emerald-500' : 'bg-muted text-muted-foreground'
                    }`}>
                      {person.photo ? <UserCheck className="w-5 h-5" /> : <User className="w-5 h-5" />}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">{person.name}</p>
                      <p className="text-[10px] text-muted-foreground">{person.relation}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-[10px]">
                    <span className={`flex items-center gap-1 px-1.5 py-0.5 rounded-full ${
                      person.idVerified ? 'bg-emerald-500/10 text-emerald-500' : 'bg-amber-500/10 text-amber-500'
                    }`}>
                      {person.idVerified ? <CheckCircle2 className="w-3 h-3" /> : <AlertCircle className="w-3 h-3" />}
                      {person.idVerified ? 'ID Verified' : 'Pending'}
                    </span>
                    <span className="text-muted-foreground">{person.addedDate}</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      )}

      {/* ─── Smart Campus Tab ───────────────────────────────── */}
      {activeTab === 'smart' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Smart Gate Access */}
            <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-5">
              <h3 className="text-base font-semibold text-foreground flex items-center gap-2 mb-4">
                <DoorOpen className="w-4 h-4 text-[#22D3EE]" />
                Smart Gate Access
              </h3>
              <div className="space-y-3">
                {[
                  { gate: 'Main Gate - Entry', status: 'Active', scansToday: 842, mode: 'QR + RFID' },
                  { gate: 'Main Gate - Exit', status: 'Active', scansToday: 398, mode: 'QR + RFID' },
                  { gate: 'Gate 2 - Staff', status: 'Active', scansToday: 186, mode: 'RFID + Face' },
                  { gate: 'Gate 3 - Transport', status: 'Active', scansToday: 524, mode: 'QR + RFID' },
                  { gate: 'Admin Block', status: 'Maintenance', scansToday: 0, mode: 'Face ID' },
                ].map((gate) => (
                  <div key={gate.gate} className="p-2.5 rounded-xl border border-border hover:bg-muted/30 transition-colors">
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-xs font-medium text-foreground">{gate.gate}</p>
                      <span className={`text-[9px] px-1.5 py-0.5 rounded-full font-medium ${
                        gate.status === 'Active' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-amber-500/10 text-amber-500'
                      }`}>{gate.status}</span>
                    </div>
                    <div className="flex items-center gap-3 text-[10px] text-muted-foreground">
                      <span>Scans: {gate.scansToday}</span>
                      <span>Mode: {gate.mode}</span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Biometric & Face Recognition */}
            <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-5">
              <h3 className="text-base font-semibold text-foreground flex items-center gap-2 mb-4">
                <Fingerprint className="w-4 h-4 text-[#C8A45C]" />
                Face & Biometric Readiness
              </h3>
              <div className="space-y-4">
                <div className="p-3 rounded-xl bg-[#0A1628]/5 dark:bg-[#22D3EE]/5 border border-[#0A1628]/10 dark:border-[#22D3EE]/10">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-medium text-foreground">Face Recognition Enrollment</span>
                    <span className="text-xs font-bold text-[#22D3EE]">78%</span>
                  </div>
                  <div className="h-2 rounded-full bg-muted overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: '78%' }}
                      transition={{ duration: 1, ease: 'easeOut' }}
                      className="h-full rounded-full bg-gradient-to-r from-[#0A1628] to-[#22D3EE]"
                    />
                  </div>
                  <p className="text-[10px] text-muted-foreground mt-1">1,987 of 2,547 students enrolled</p>
                </div>

                <div className="p-3 rounded-xl bg-[#C8A45C]/5 border border-[#C8A45C]/10">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-medium text-foreground">Fingerprint Enrollment</span>
                    <span className="text-xs font-bold text-[#C8A45C]">45%</span>
                  </div>
                  <div className="h-2 rounded-full bg-muted overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: '45%' }}
                      transition={{ duration: 1, ease: 'easeOut' }}
                      className="h-full rounded-full bg-gradient-to-r from-[#C8A45C] to-[#E8D5A0]"
                    />
                  </div>
                  <p className="text-[10px] text-muted-foreground mt-1">1,146 of 2,547 students enrolled</p>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  {[
                    { label: 'Recognition Accuracy', value: '98.5%', icon: Target, color: 'text-emerald-500' },
                    { label: 'Avg. Scan Time', value: '0.8s', icon: Clock, color: 'text-[#22D3EE]' },
                    { label: 'False Positives', value: '0.02%', icon: AlertTriangle, color: 'text-amber-500' },
                    { label: 'Cameras Active', value: '12/15', icon: Camera, color: 'text-purple-500' },
                  ].map((item) => {
                    const Icon = item.icon
                    return (
                      <div key={item.label} className="p-2.5 rounded-xl border border-border">
                        <div className="flex items-center gap-1.5 mb-1">
                          <Icon className={`w-3 h-3 ${item.color}`} />
                          <span className="text-[9px] text-muted-foreground">{item.label}</span>
                        </div>
                        <p className="text-sm font-bold text-foreground">{item.value}</p>
                      </div>
                    )
                  })}
                </div>
              </div>
            </motion.div>

            {/* Entry/Exit Heatmap Placeholder */}
            <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-5">
              <h3 className="text-base font-semibold text-foreground flex items-center gap-2 mb-4">
                <Activity className="w-4 h-4 text-emerald-500" />
                Campus Entry/Exit Heatmap
              </h3>
              <div className="h-48 rounded-xl border-2 border-dashed border-border flex items-center justify-center bg-muted/20 mb-3">
                <div className="text-center">
                  <MapPin className="w-10 h-10 text-muted-foreground/30 mx-auto mb-2" />
                  <p className="text-xs text-muted-foreground">Campus Heatmap Visualization</p>
                  <p className="text-[10px] text-muted-foreground/70">Integrates with IoT sensor grid</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { zone: 'Main Gate', flow: 'High', color: 'text-red-500' },
                  { zone: 'Academic Block', flow: 'Medium', color: 'text-amber-500' },
                  { zone: 'Sports Complex', flow: 'Low', color: 'text-emerald-500' },
                  { zone: 'Admin Building', flow: 'Low', color: 'text-emerald-500' },
                ].map((zone) => (
                  <div key={zone.zone} className="p-2 rounded-lg border border-border">
                    <p className="text-[10px] text-muted-foreground">{zone.zone}</p>
                    <p className={`text-xs font-semibold ${zone.color}`}>{zone.flow} Traffic</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Smart Campus Features Grid */}
          <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-5">
            <h3 className="text-base font-semibold text-foreground flex items-center gap-2 mb-4">
              <Sparkles className="w-4 h-4 text-[#C8A45C]" />
              Smart Campus Features
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {[
                { title: 'Face Recognition Entry', desc: 'AI-powered face recognition at all campus gates with 98.5% accuracy and 0.8s scan time.', status: 'Live', icon: Camera, color: 'bg-emerald-500/10 text-emerald-500' },
                { title: 'Smart Gate Automation', desc: 'Automated gate control with QR/RFID/Face verification. 5 gates currently active.', status: 'Live', icon: DoorOpen, color: 'bg-emerald-500/10 text-emerald-500' },
                { title: 'Biometric Attendance', desc: 'Fingerprint + Face dual biometric system for staff and student attendance tracking.', status: 'Partial', icon: Fingerprint, color: 'bg-amber-500/10 text-amber-500' },
                { title: 'Real-time Location Tracking', desc: 'Indoor positioning system using BLE beacons for student safety and campus navigation.', status: 'Pilot', icon: MapPin, color: 'bg-blue-500/10 text-blue-500' },
                { title: 'Visitor Management', desc: 'Digital visitor registration with temp QR pass, photo capture, and auto-checkout.', status: 'Live', icon: User, color: 'bg-emerald-500/10 text-emerald-500' },
                { title: 'Emergency Lockdown', desc: 'One-tap campus lockdown with automatic gate closure, alarm, and parent notification.', status: 'Live', icon: Shield, color: 'bg-emerald-500/10 text-emerald-500' },
              ].map((feature) => {
                const Icon = feature.icon
                return (
                  <div key={feature.title} className="p-4 rounded-xl border border-border hover:shadow-md transition-all group">
                    <div className="flex items-start gap-3 mb-2">
                      <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${feature.color} flex-shrink-0`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold text-foreground">{feature.title}</p>
                        <span className={`text-[9px] px-1.5 py-0.5 rounded-full font-medium inline-block mt-0.5 ${
                          feature.status === 'Live' ? 'bg-emerald-500/10 text-emerald-500' :
                          feature.status === 'Partial' ? 'bg-amber-500/10 text-amber-500' :
                          'bg-blue-500/10 text-blue-500'
                        }`}>{feature.status}</span>
                      </div>
                    </div>
                    <p className="text-[10px] text-muted-foreground leading-relaxed">{feature.desc}</p>
                  </div>
                )
              })}
            </div>
          </motion.div>
        </div>
      )}
    </motion.div>
  )
}
