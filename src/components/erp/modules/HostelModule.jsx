'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Building2, Users, Bed, Clock, Plus, Download, ArrowUpRight,
  TrendingUp, BarChart3, FileText, Calendar, CheckCircle2,
  AlertTriangle, X, Save, RotateCcw, ClipboardList, Shield,
  Utensils, MessageSquare, Package, DoorOpen, UserCheck,
  Phone, Star, Activity, Zap, AlertCircle, PieChart as PieChartIcon,
  Wrench, UserCircle, Clipboard, MoveRight, LayoutGrid
} from 'lucide-react'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Legend, PieChart, Pie, Cell, AreaChart,
  Area, LineChart, Line
} from 'recharts'
import useAppStore from '@/store/useAppStore'
import QRStudentLookup from '@/components/erp/shared/QRStudentLookup'

// ─── Mock Data ────────────────────────────────────────────────────
const topStats = [
  { label: 'Total Rooms', value: '120', change: '3 wings', icon: Bed, gradient: 'from-blue-900 to-blue-700', glow: 'shadow-blue-800/20' },
  { label: 'Students', value: '186', change: 'Hostelers', icon: Users, gradient: 'from-emerald-900 to-emerald-600', glow: 'shadow-emerald-800/20' },
  { label: 'Occupancy', value: '78%', change: 'Available: 42', icon: Building2, gradient: 'from-amber-900 to-amber-600', glow: 'shadow-amber-800/20' },
  { label: 'Complaints', value: '5', change: 'Open', icon: AlertCircle, gradient: 'from-red-900 to-red-600', glow: 'shadow-red-800/20' },
]

const occupancyByFloor = [
  { floor: 'Ground', total: 30, occupied: 24, available: 6, block: 'A' },
  { floor: '1st Floor', total: 30, occupied: 27, available: 3, block: 'A' },
  { floor: '2nd Floor', total: 30, occupied: 25, available: 5, block: 'B' },
  { floor: '3rd Floor', total: 30, occupied: 22, available: 8, block: 'B' },
]

const occupancyPie = [
  { name: 'Occupied', value: 186, color: '#0A1628' },
  { name: 'Available', value: 54, color: '#22D3EE' },
]

const messFeedbackTrend = [
  { week: 'W1', breakfast: 3.8, lunch: 4.0, snacks: 4.2, dinner: 3.9 },
  { week: 'W2', breakfast: 3.9, lunch: 4.1, snacks: 4.0, dinner: 4.0 },
  { week: 'W3', breakfast: 4.0, lunch: 4.2, snacks: 4.3, dinner: 4.1 },
  { week: 'W4', breakfast: 3.7, lunch: 3.9, snacks: 4.1, dinner: 3.8 },
  { week: 'W5', breakfast: 4.1, lunch: 4.3, snacks: 4.4, dinner: 4.2 },
  { week: 'W6', breakfast: 4.0, lunch: 4.2, snacks: 4.3, dinner: 4.1 },
]

const complaintData = [
  { category: 'Plumbing', total: 12, resolved: 10, pending: 2, color: '#0A1628' },
  { category: 'Electrical', total: 8, resolved: 6, pending: 2, color: '#22D3EE' },
  { category: 'Cleaning', total: 5, resolved: 4, pending: 1, color: '#C8A45C' },
  { category: 'Food', total: 7, resolved: 5, pending: 2, color: '#EF4444' },
  { category: 'Security', total: 3, resolved: 2, pending: 1, color: '#8B5CF6' },
  { category: 'Other', total: 4, resolved: 3, pending: 1, color: '#F59E0B' },
]

const visitorLogData = [
  { date: '2025-03-10', visitor: 'Rajesh Kumar', student: 'Aarav Kumar', relationship: 'Father', purpose: 'Personal Visit', inTime: '10:00', outTime: '12:30', idProof: 'Aadhaar' },
  { date: '2025-03-10', visitor: 'Sunita Devi', student: 'Rohan Sharma', relationship: 'Mother', purpose: 'Medical Visit', inTime: '09:00', outTime: '11:00', idProof: 'Aadhaar' },
  { date: '2025-03-09', visitor: 'Anil Gupta', student: 'Priya Gupta', relationship: 'Father', purpose: 'Fee Payment', inTime: '14:00', outTime: '15:30', idProof: 'Voter ID' },
  { date: '2025-03-09', visitor: 'Meena Patel', student: 'Arjun Patel', relationship: 'Mother', purpose: 'Personal Visit', inTime: '11:00', outTime: '13:00', idProof: 'Aadhaar' },
  { date: '2025-03-08', visitor: 'Vikram Singh', student: 'Karan Singh', relationship: 'Uncle', purpose: 'Festival Visit', inTime: '08:00', outTime: '16:00', idProof: 'Passport' },
  { date: '2025-03-08', visitor: 'Rekha Joshi', student: 'Ananya Joshi', relationship: 'Aunt', purpose: 'Personal Visit', inTime: '10:30', outTime: '14:00', idProof: 'Aadhaar' },
]

const studentHostelData = [
  { name: 'Aarav Kumar', bspId: 'BSP/WB/2023/00125', penNo: 'PEN-2301-0456', upparId: 'UPPR-WB-102345', class: 'X-A', block: 'A', floor: '1st Floor', room: 'Room 005', bed: 'Bed A', warden: 'Mr. Suresh Rao' },
  { name: 'Rohan Sharma', bspId: 'BSP/WB/2023/00130', penNo: 'PEN-2301-0461', upparId: 'UPPR-WB-102350', class: 'IX-B', block: 'A', floor: 'Ground', room: 'Room 012', bed: 'Bed B', warden: 'Mr. Suresh Rao' },
  { name: 'Priya Gupta', bspId: 'BSP/WB/2023/00089', penNo: 'PEN-2301-0420', upparId: 'UPPR-WB-101987', class: 'X-A', block: 'B', floor: '2nd Floor', room: 'Room 018', bed: 'Bed A', warden: 'Mrs. Kavitha Nair' },
  { name: 'Arjun Patel', bspId: 'BSP/WB/2023/00156', penNo: 'PEN-2301-0487', upparId: 'UPPR-WB-102678', class: 'VIII-A', block: 'A', floor: '3rd Floor', room: 'Room 025', bed: 'Bed B', warden: 'Mr. Suresh Rao' },
  { name: 'Karan Singh', bspId: 'BSP/WB/2023/00201', penNo: 'PEN-2301-0532', upparId: 'UPPR-WB-103456', class: 'XI-Sci', block: 'B', floor: '1st Floor', room: 'Room 008', bed: 'Bed A', warden: 'Mrs. Kavitha Nair' },
  { name: 'Ananya Joshi', bspId: 'BSP/WB/2023/00045', penNo: 'PEN-2301-0376', upparId: 'UPPR-WB-101234', class: 'VII-A', block: 'A', floor: 'Ground', room: 'Room 003', bed: 'Bed A', warden: 'Mr. Suresh Rao' },
]

const roomsData = [
  { room: 'Room 001', block: 'A', floor: 'Ground', capacity: 2, occupied: 2, status: 'Full', type: 'Double' },
  { room: 'Room 002', block: 'A', floor: 'Ground', capacity: 2, occupied: 1, status: 'Partial', type: 'Double' },
  { room: 'Room 003', block: 'A', floor: 'Ground', capacity: 2, occupied: 2, status: 'Full', type: 'Double' },
  { room: 'Room 004', block: 'A', floor: 'Ground', capacity: 2, occupied: 0, status: 'Empty', type: 'Double' },
  { room: 'Room 005', block: 'A', floor: '1st Floor', capacity: 2, occupied: 2, status: 'Full', type: 'Double' },
  { room: 'Room 006', block: 'A', floor: '1st Floor', capacity: 3, occupied: 2, status: 'Partial', type: 'Triple' },
  { room: 'Room 007', block: 'B', floor: '2nd Floor', capacity: 2, occupied: 1, status: 'Partial', type: 'Double' },
  { room: 'Room 008', block: 'B', floor: '1st Floor', capacity: 2, occupied: 2, status: 'Full', type: 'Double' },
]

const visitorsRecent = [
  { name: 'Rajesh Kumar', student: 'Aarav Kumar', relationship: 'Father', purpose: 'Personal Visit', date: '2025-03-10', status: 'Completed' },
  { name: 'Sunita Devi', student: 'Rohan Sharma', relationship: 'Mother', purpose: 'Medical Visit', date: '2025-03-10', status: 'Completed' },
  { name: 'Anil Gupta', student: 'Priya Gupta', relationship: 'Father', purpose: 'Fee Payment', date: '2025-03-09', status: 'Completed' },
  { name: 'Meena Patel', student: 'Arjun Patel', relationship: 'Mother', purpose: 'Personal Visit', date: '2025-03-09', status: 'In Premises' },
]

const blocks = ['A', 'B', 'C']
const floors = ['Ground', '1st Floor', '2nd Floor', '3rd Floor']
const rooms = Array.from({ length: 30 }, (_, i) => `Room ${String(i + 1).padStart(3, '0')}`)
const beds = ['Bed A', 'Bed B', 'Bed C']
const complaintCategories = ['Plumbing', 'Electrical', 'Cleaning', 'Food', 'Security', 'Other']
const priorities = ['Low', 'Medium', 'High', 'Urgent']
const idProofTypes = ['Aadhaar', 'Voter ID', 'PAN', 'Passport', 'Driving License']
const inventoryCategories = ['Furniture', 'Electrical', 'Plumbing', 'Linen', 'Other']
const conditions = ['Good', 'Fair', 'Damaged', 'Under Repair']
const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
const relationships = ['Father', 'Mother', 'Brother', 'Sister', 'Uncle', 'Aunt', 'Guardian', 'Other']
const wardens = ['Mr. Suresh Rao', 'Mrs. Kavitha Nair', 'Mr. Deepak Mishra']

// ─── Animation Variants ──────────────────────────────────────────
const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.06 } },
}
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
}

export default function HostelModule() {
  const { darkMode } = useAppStore()
  const [activeTab, setActiveTab] = useState('overview')

  // ─── Form States ────────────────────────────────────────
  const [activeForm, setActiveForm] = useState('roomAllocation')

  const [roomAllocData, setRoomAllocData] = useState({
    student: '', bspId: '', penNo: '', upparId: '', block: '', floor: '', roomNo: '', bedNo: '', allocationDate: '', warden: ''
  })
  const [visitorData, setVisitorData] = useState({
    visitorName: '', relationship: '', hostStudent: '', purpose: '', inTime: '', outTime: '', idProofType: 'Aadhaar', idProofNumber: '', approvedBy: ''
  })
  const [messMenuData, setMessMenuData] = useState({
    day: 'Monday', breakfast: '', lunch: '', snacks: '', dinner: '', specialDiet: ''
  })
  const [complaintData2, setComplaintData2] = useState({
    student: '', bspId: '', penNo: '', upparId: '', category: 'Plumbing', description: '', priority: 'Medium', roomNo: ''
  })
  const [roomTransferData, setRoomTransferData] = useState({
    student: '', bspId: '', penNo: '', upparId: '', currentRoom: '', requestedRoom: '', reason: '', effectiveDate: '', wardenApproval: 'Pending'
  })
  const [inventoryData, setInventoryData] = useState({
    itemName: '', category: 'Furniture', quantity: '', condition: 'Good', location: '', purchaseDate: '', cost: ''
  })

  // ─── Report States ──────────────────────────────────────
  const [activeReport, setActiveReport] = useState('occupancy')

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'rooms', label: 'Rooms', icon: Bed },
    { id: 'visitors', label: 'Visitors', icon: UserCheck },
    { id: 'forms', label: 'Forms', icon: ClipboardList },
    { id: 'reports', label: 'Reports', icon: TrendingUp },
  ]

  const formOptions = [
    { key: 'roomAllocation', label: 'Room Allocation', icon: Bed, color: 'text-blue-500' },
    { key: 'visitorEntry', label: 'Visitor Entry', icon: UserCheck, color: 'text-emerald-500' },
    { key: 'messMenu', label: 'Mess Menu', icon: Utensils, color: 'text-amber-500' },
    { key: 'complaint', label: 'Hostel Complaint', icon: MessageSquare, color: 'text-red-500' },
    { key: 'roomTransfer', label: 'Room Transfer', icon: MoveRight, color: 'text-purple-500' },
    { key: 'inventory', label: 'Inventory Entry', icon: Package, color: 'text-cyan-500' },
  ]

  const reportOptions = [
    { key: 'occupancy', label: 'Occupancy Report', icon: Building2 },
    { key: 'visitorLog', label: 'Visitor Log Report', icon: UserCheck },
    { key: 'messFeedback', label: 'Mess Feedback Report', icon: Utensils },
    { key: 'complaintStatus', label: 'Complaint Status Report', icon: MessageSquare },
    { key: 'studentHostel', label: 'Student Hostel Report', icon: Users },
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

  const renderUdiseFields = (data, setData) => (
    <>
      <div className={formGroupClass}>
        <label className={labelClass}>BSP ID (UDISE+)</label>
        <input type="text" placeholder="BSP/WB/2023/XXXXX" value={data.bspId}
          onChange={(e) => setData({ ...data, bspId: e.target.value })} className={inputClass} />
      </div>
      <div className={formGroupClass}>
        <label className={labelClass}>PEN No</label>
        <input type="text" placeholder="PEN-XXXX-XXXX" value={data.penNo}
          onChange={(e) => setData({ ...data, penNo: e.target.value })} className={inputClass} />
      </div>
      <div className={formGroupClass}>
        <label className={labelClass}>Uppar ID</label>
        <input type="text" placeholder="UPPR-WB-XXXXXX" value={data.upparId}
          onChange={(e) => setData({ ...data, upparId: e.target.value })} className={inputClass} />
      </div>
    </>
  )

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
                <Building2 className="w-4 h-4 text-birla-cyan" />Floor-wise Occupancy
              </h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={occupancyByFloor}>
                    <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'} />
                    <XAxis dataKey="floor" tick={{ fontSize: 9 }} stroke={darkMode ? '#64748b' : '#94a3b8'} />
                    <YAxis tick={{ fontSize: 9 }} stroke={darkMode ? '#64748b' : '#94a3b8'} />
                    <Tooltip contentStyle={tooltipStyle} />
                    <Legend iconType="circle" wrapperStyle={{ fontSize: '10px' }} />
                    <Bar dataKey="occupied" fill="#0A1628" radius={[4, 4, 0, 0]} name="Occupied" />
                    <Bar dataKey="available" fill="#22D3EE" radius={[4, 4, 0, 0]} name="Available" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-5">
              <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
                <PieChartIcon className="w-4 h-4 text-birla-gold" />Overall Occupancy
              </h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={occupancyPie} cx="50%" cy="50%" innerRadius={50} outerRadius={90} dataKey="value" nameKey="name" paddingAngle={3}>
                      {occupancyPie.map((entry, idx) => <Cell key={idx} fill={entry.color} />)}
                    </Pie>
                    <Tooltip contentStyle={tooltipStyle} />
                    <Legend iconType="circle" wrapperStyle={{ fontSize: '10px' }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </motion.div>
          </div>

          <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-5">
            <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
              <Utensils className="w-4 h-4 text-amber-500" />Mess Feedback Trend (Weekly Average)
            </h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={messFeedbackTrend}>
                  <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'} />
                  <XAxis dataKey="week" tick={{ fontSize: 9 }} stroke={darkMode ? '#64748b' : '#94a3b8'} />
                  <YAxis domain={[3, 5]} tick={{ fontSize: 9 }} stroke={darkMode ? '#64748b' : '#94a3b8'} />
                  <Tooltip contentStyle={tooltipStyle} />
                  <Legend iconType="circle" wrapperStyle={{ fontSize: '10px' }} />
                  <Line type="monotone" dataKey="breakfast" stroke="#F59E0B" strokeWidth={2} dot={{ r: 3 }} name="Breakfast" />
                  <Line type="monotone" dataKey="lunch" stroke="#10B981" strokeWidth={2} dot={{ r: 3 }} name="Lunch" />
                  <Line type="monotone" dataKey="snacks" stroke="#22D3EE" strokeWidth={2} dot={{ r: 3 }} name="Snacks" />
                  <Line type="monotone" dataKey="dinner" stroke="#8B5CF6" strokeWidth={2} dot={{ r: 3 }} name="Dinner" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* ═══════════════ ROOMS TAB ═══════════════ */}
      {activeTab === 'rooms' && (
        <motion.div variants={itemVariants} className="space-y-6">
          <div className="rounded-2xl border border-border bg-card p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
                <Bed className="w-4 h-4 text-birla-cyan" />Room Directory
              </h3>
              <span className="text-xs text-muted-foreground">{roomsData.length} rooms listed</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-2 px-3 font-medium text-muted-foreground">Room</th>
                    <th className="text-left py-2 px-3 font-medium text-muted-foreground">Block</th>
                    <th className="text-left py-2 px-3 font-medium text-muted-foreground">Floor</th>
                    <th className="text-left py-2 px-3 font-medium text-muted-foreground">Type</th>
                    <th className="text-left py-2 px-3 font-medium text-muted-foreground">Capacity</th>
                    <th className="text-left py-2 px-3 font-medium text-muted-foreground">Occupied</th>
                    <th className="text-left py-2 px-3 font-medium text-muted-foreground">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {roomsData.map((r, i) => (
                    <tr key={i} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                      <td className="py-2 px-3 font-medium">{r.room}</td>
                      <td className="py-2 px-3">Block {r.block}</td>
                      <td className="py-2 px-3">{r.floor}</td>
                      <td className="py-2 px-3">{r.type}</td>
                      <td className="py-2 px-3">{r.capacity}</td>
                      <td className="py-2 px-3">{r.occupied}/{r.capacity}</td>
                      <td className="py-2 px-3">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${
                          r.status === 'Full' ? 'bg-red-500/10 text-red-600 dark:text-red-400' :
                          r.status === 'Partial' ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400' :
                          'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                        }`}>{r.status}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>
      )}

      {/* ═══════════════ VISITORS TAB ═══════════════ */}
      {activeTab === 'visitors' && (
        <motion.div variants={itemVariants} className="space-y-6">
          <div className="rounded-2xl border border-border bg-card p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
                <UserCheck className="w-4 h-4 text-birla-cyan" />Recent Visitors
              </h3>
              <button onClick={() => { setActiveTab('forms'); setActiveForm('visitorEntry') }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg gradient-birla text-white text-xs font-medium">
                <Plus className="w-3.5 h-3.5" />New Visitor
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-2 px-3 font-medium text-muted-foreground">Visitor</th>
                    <th className="text-left py-2 px-3 font-medium text-muted-foreground">Student</th>
                    <th className="text-left py-2 px-3 font-medium text-muted-foreground">Relationship</th>
                    <th className="text-left py-2 px-3 font-medium text-muted-foreground">Purpose</th>
                    <th className="text-left py-2 px-3 font-medium text-muted-foreground">Date</th>
                    <th className="text-left py-2 px-3 font-medium text-muted-foreground">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {visitorsRecent.map((v, i) => (
                    <tr key={i} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                      <td className="py-2 px-3 font-medium">{v.name}</td>
                      <td className="py-2 px-3">{v.student}</td>
                      <td className="py-2 px-3">{v.relationship}</td>
                      <td className="py-2 px-3">{v.purpose}</td>
                      <td className="py-2 px-3">{v.date}</td>
                      <td className="py-2 px-3">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${
                          v.status === 'Completed' ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' : 'bg-amber-500/10 text-amber-600 dark:text-amber-400'
                        }`}>{v.status}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
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

          {/* 1. Room Allocation Form */}
          {activeForm === 'roomAllocation' && (
            <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-base font-semibold text-foreground flex items-center gap-2">
                  <Bed className="w-5 h-5 text-blue-500" />Room Allocation Form
                </h3>
              </div>
              <div className="mb-4">
                <QRStudentLookup
                  onStudentSelect={(student) => {
                    if (student) setRoomAllocData({...roomAllocData, student: student.name, bspId: student.bspId || roomAllocData.bspId, penNo: student.penNo || roomAllocData.penNo, upparId: student.upparId || roomAllocData.upparId})
                  }}
                  label="Student Identification (QR / ID)"
                  placeholder="Scan QR or search student for room allocation"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className={formGroupClass}>
                  <label className={labelClass}>Student Name *</label>
                  <input type="text" placeholder="Enter student name" value={roomAllocData.student}
                    onChange={(e) => setRoomAllocData({ ...roomAllocData, student: e.target.value })} className={inputClass} />
                </div>
                {renderUdiseFields(roomAllocData, setRoomAllocData)}
                <div className={formGroupClass}>
                  <label className={labelClass}>Block *</label>
                  <select value={roomAllocData.block} onChange={(e) => setRoomAllocData({ ...roomAllocData, block: e.target.value })} className={inputClass}>
                    <option value="">Select Block</option>
                    {blocks.map((b) => <option key={b} value={b}>Block {b}</option>)}
                  </select>
                </div>
                <div className={formGroupClass}>
                  <label className={labelClass}>Floor *</label>
                  <select value={roomAllocData.floor} onChange={(e) => setRoomAllocData({ ...roomAllocData, floor: e.target.value })} className={inputClass}>
                    <option value="">Select Floor</option>
                    {floors.map((f) => <option key={f} value={f}>{f}</option>)}
                  </select>
                </div>
                <div className={formGroupClass}>
                  <label className={labelClass}>Room No *</label>
                  <select value={roomAllocData.roomNo} onChange={(e) => setRoomAllocData({ ...roomAllocData, roomNo: e.target.value })} className={inputClass}>
                    <option value="">Select Room</option>
                    {rooms.map((r) => <option key={r} value={r}>{r}</option>)}
                  </select>
                </div>
                <div className={formGroupClass}>
                  <label className={labelClass}>Bed No</label>
                  <select value={roomAllocData.bedNo} onChange={(e) => setRoomAllocData({ ...roomAllocData, bedNo: e.target.value })} className={inputClass}>
                    <option value="">Select Bed</option>
                    {beds.map((b) => <option key={b} value={b}>{b}</option>)}
                  </select>
                </div>
                <div className={formGroupClass}>
                  <label className={labelClass}>Allocation Date *</label>
                  <input type="date" value={roomAllocData.allocationDate}
                    onChange={(e) => setRoomAllocData({ ...roomAllocData, allocationDate: e.target.value })} className={inputClass} />
                </div>
                <div className={formGroupClass}>
                  <label className={labelClass}>Warden</label>
                  <select value={roomAllocData.warden} onChange={(e) => setRoomAllocData({ ...roomAllocData, warden: e.target.value })} className={inputClass}>
                    <option value="">Select Warden</option>
                    {wardens.map((w) => <option key={w} value={w}>{w}</option>)}
                  </select>
                </div>
              </div>
              <div className="flex items-center gap-3 mt-6 pt-4 border-t border-border">
                <button onClick={() => handleFormSubmit('Room Allocation', roomAllocData)}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl gradient-birla text-white text-sm font-medium hover:opacity-90 transition-opacity">
                  <Save className="w-4 h-4" />Allocate Room
                </button>
                <button onClick={() => setRoomAllocData({ student: '', bspId: '', penNo: '', upparId: '', block: '', floor: '', roomNo: '', bedNo: '', allocationDate: '', warden: '' })}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-border text-sm font-medium hover:bg-muted transition-colors">
                  <RotateCcw className="w-4 h-4" />Reset
                </button>
              </div>
            </motion.div>
          )}

          {/* 2. Visitor Entry Form */}
          {activeForm === 'visitorEntry' && (
            <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-base font-semibold text-foreground flex items-center gap-2">
                  <UserCheck className="w-5 h-5 text-emerald-500" />Visitor Entry Form
                </h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className={formGroupClass}>
                  <label className={labelClass}>Visitor Name *</label>
                  <input type="text" placeholder="Enter visitor name" value={visitorData.visitorName}
                    onChange={(e) => setVisitorData({ ...visitorData, visitorName: e.target.value })} className={inputClass} />
                </div>
                <div className={formGroupClass}>
                  <label className={labelClass}>Relationship *</label>
                  <select value={visitorData.relationship} onChange={(e) => setVisitorData({ ...visitorData, relationship: e.target.value })} className={inputClass}>
                    <option value="">Select Relationship</option>
                    {relationships.map((r) => <option key={r} value={r}>{r}</option>)}
                  </select>
                </div>
                <div className={formGroupClass}>
                  <label className={labelClass}>Host Student *</label>
                  <input type="text" placeholder="Student being visited" value={visitorData.hostStudent}
                    onChange={(e) => setVisitorData({ ...visitorData, hostStudent: e.target.value })} className={inputClass} />
                </div>
                <div className={formGroupClass}>
                  <label className={labelClass}>Purpose *</label>
                  <input type="text" placeholder="Reason for visit" value={visitorData.purpose}
                    onChange={(e) => setVisitorData({ ...visitorData, purpose: e.target.value })} className={inputClass} />
                </div>
                <div className={formGroupClass}>
                  <label className={labelClass}>In Time *</label>
                  <input type="time" value={visitorData.inTime}
                    onChange={(e) => setVisitorData({ ...visitorData, inTime: e.target.value })} className={inputClass} />
                </div>
                <div className={formGroupClass}>
                  <label className={labelClass}>Out Time</label>
                  <input type="time" value={visitorData.outTime}
                    onChange={(e) => setVisitorData({ ...visitorData, outTime: e.target.value })} className={inputClass} />
                </div>
                <div className={formGroupClass}>
                  <label className={labelClass}>ID Proof Type *</label>
                  <select value={visitorData.idProofType} onChange={(e) => setVisitorData({ ...visitorData, idProofType: e.target.value })} className={inputClass}>
                    {idProofTypes.map((t) => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
                <div className={formGroupClass}>
                  <label className={labelClass}>ID Proof Number *</label>
                  <input type="text" placeholder="Enter ID proof number" value={visitorData.idProofNumber}
                    onChange={(e) => setVisitorData({ ...visitorData, idProofNumber: e.target.value })} className={inputClass} />
                </div>
                <div className={formGroupClass}>
                  <label className={labelClass}>Approved By</label>
                  <input type="text" placeholder="Warden/Staff name" value={visitorData.approvedBy}
                    onChange={(e) => setVisitorData({ ...visitorData, approvedBy: e.target.value })} className={inputClass} />
                </div>
              </div>
              <div className="flex items-center gap-3 mt-6 pt-4 border-t border-border">
                <button onClick={() => handleFormSubmit('Visitor Entry', visitorData)}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl gradient-birla text-white text-sm font-medium hover:opacity-90 transition-opacity">
                  <Save className="w-4 h-4" />Register Visitor
                </button>
                <button onClick={() => setVisitorData({ visitorName: '', relationship: '', hostStudent: '', purpose: '', inTime: '', outTime: '', idProofType: 'Aadhaar', idProofNumber: '', approvedBy: '' })}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-border text-sm font-medium hover:bg-muted transition-colors">
                  <RotateCcw className="w-4 h-4" />Reset
                </button>
              </div>
            </motion.div>
          )}

          {/* 3. Mess Menu Form */}
          {activeForm === 'messMenu' && (
            <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-base font-semibold text-foreground flex items-center gap-2">
                  <Utensils className="w-5 h-5 text-amber-500" />Mess Menu Form
                </h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className={formGroupClass}>
                  <label className={labelClass}>Day *</label>
                  <select value={messMenuData.day} onChange={(e) => setMessMenuData({ ...messMenuData, day: e.target.value })} className={inputClass}>
                    {days.map((d) => <option key={d} value={d}>{d}</option>)}
                  </select>
                </div>
                <div className={formGroupClass}>
                  <label className={labelClass}>Breakfast *</label>
                  <input type="text" placeholder="e.g. Puri Sabji, Tea" value={messMenuData.breakfast}
                    onChange={(e) => setMessMenuData({ ...messMenuData, breakfast: e.target.value })} className={inputClass} />
                </div>
                <div className={formGroupClass}>
                  <label className={labelClass}>Lunch *</label>
                  <input type="text" placeholder="e.g. Rice, Dal, Sabji" value={messMenuData.lunch}
                    onChange={(e) => setMessMenuData({ ...messMenuData, lunch: e.target.value })} className={inputClass} />
                </div>
                <div className={formGroupClass}>
                  <label className={labelClass}>Snacks</label>
                  <input type="text" placeholder="e.g. Samosa, Tea" value={messMenuData.snacks}
                    onChange={(e) => setMessMenuData({ ...messMenuData, snacks: e.target.value })} className={inputClass} />
                </div>
                <div className={formGroupClass}>
                  <label className={labelClass}>Dinner *</label>
                  <input type="text" placeholder="e.g. Chapati, Paneer, Dal" value={messMenuData.dinner}
                    onChange={(e) => setMessMenuData({ ...messMenuData, dinner: e.target.value })} className={inputClass} />
                </div>
                <div className={formGroupClass}>
                  <label className={labelClass}>Special Diet</label>
                  <input type="text" placeholder="e.g. Jain, Vegan, Allergic" value={messMenuData.specialDiet}
                    onChange={(e) => setMessMenuData({ ...messMenuData, specialDiet: e.target.value })} className={inputClass} />
                </div>
              </div>
              <div className="flex items-center gap-3 mt-6 pt-4 border-t border-border">
                <button onClick={() => handleFormSubmit('Mess Menu', messMenuData)}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl gradient-birla text-white text-sm font-medium hover:opacity-90 transition-opacity">
                  <Save className="w-4 h-4" />Save Menu
                </button>
                <button onClick={() => setMessMenuData({ day: 'Monday', breakfast: '', lunch: '', snacks: '', dinner: '', specialDiet: '' })}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-border text-sm font-medium hover:bg-muted transition-colors">
                  <RotateCcw className="w-4 h-4" />Reset
                </button>
              </div>
            </motion.div>
          )}

          {/* 4. Hostel Complaint Form */}
          {activeForm === 'complaint' && (
            <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-base font-semibold text-foreground flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-red-500" />Hostel Complaint Form
                </h3>
              </div>
              <div className="mb-4">
                <QRStudentLookup
                  onStudentSelect={(student) => {
                    if (student) setComplaintData2({...complaintData2, student: student.name, bspId: student.bspId || complaintData2.bspId, penNo: student.penNo || complaintData2.penNo, upparId: student.upparId || complaintData2.upparId})
                  }}
                  label="Student Identification (QR / ID)"
                  placeholder="Scan QR or search student for complaint"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className={formGroupClass}>
                  <label className={labelClass}>Student Name *</label>
                  <input type="text" placeholder="Enter student name" value={complaintData2.student}
                    onChange={(e) => setComplaintData2({ ...complaintData2, student: e.target.value })} className={inputClass} />
                </div>
                {renderUdiseFields(complaintData2, setComplaintData2)}
                <div className={formGroupClass}>
                  <label className={labelClass}>Category *</label>
                  <select value={complaintData2.category} onChange={(e) => setComplaintData2({ ...complaintData2, category: e.target.value })} className={inputClass}>
                    {complaintCategories.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div className={formGroupClass}>
                  <label className={labelClass}>Room No</label>
                  <select value={complaintData2.roomNo} onChange={(e) => setComplaintData2({ ...complaintData2, roomNo: e.target.value })} className={inputClass}>
                    <option value="">Select Room</option>
                    {rooms.map((r) => <option key={r} value={r}>{r}</option>)}
                  </select>
                </div>
                <div className={formGroupClass}>
                  <label className={labelClass}>Priority *</label>
                  <select value={complaintData2.priority} onChange={(e) => setComplaintData2({ ...complaintData2, priority: e.target.value })} className={inputClass}>
                    {priorities.map((p) => <option key={p} value={p}>{p}</option>)}
                  </select>
                </div>
                <div className={`${formGroupClass} md:col-span-2 lg:col-span-3`}>
                  <label className={labelClass}>Description *</label>
                  <textarea placeholder="Describe the complaint in detail..." value={complaintData2.description}
                    onChange={(e) => setComplaintData2({ ...complaintData2, description: e.target.value })} className={inputClass} rows={3} />
                </div>
              </div>
              <div className="flex items-center gap-3 mt-6 pt-4 border-t border-border">
                <button onClick={() => handleFormSubmit('Hostel Complaint', complaintData2)}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl gradient-birla text-white text-sm font-medium hover:opacity-90 transition-opacity">
                  <Save className="w-4 h-4" />Submit Complaint
                </button>
                <button onClick={() => setComplaintData2({ student: '', bspId: '', penNo: '', upparId: '', category: 'Plumbing', description: '', priority: 'Medium', roomNo: '' })}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-border text-sm font-medium hover:bg-muted transition-colors">
                  <RotateCcw className="w-4 h-4" />Reset
                </button>
              </div>
            </motion.div>
          )}

          {/* 5. Room Transfer Form */}
          {activeForm === 'roomTransfer' && (
            <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-base font-semibold text-foreground flex items-center gap-2">
                  <MoveRight className="w-5 h-5 text-purple-500" />Room Transfer Form
                </h3>
              </div>
              <div className="mb-4">
                <QRStudentLookup
                  onStudentSelect={(student) => {
                    if (student) setRoomTransferData({...roomTransferData, student: student.name, bspId: student.bspId || roomTransferData.bspId, penNo: student.penNo || roomTransferData.penNo, upparId: student.upparId || roomTransferData.upparId})
                  }}
                  label="Student Identification (QR / ID)"
                  placeholder="Scan QR or search student for room transfer"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className={formGroupClass}>
                  <label className={labelClass}>Student Name *</label>
                  <input type="text" placeholder="Enter student name" value={roomTransferData.student}
                    onChange={(e) => setRoomTransferData({ ...roomTransferData, student: e.target.value })} className={inputClass} />
                </div>
                {renderUdiseFields(roomTransferData, setRoomTransferData)}
                <div className={formGroupClass}>
                  <label className={labelClass}>Current Room *</label>
                  <select value={roomTransferData.currentRoom} onChange={(e) => setRoomTransferData({ ...roomTransferData, currentRoom: e.target.value })} className={inputClass}>
                    <option value="">Select Current Room</option>
                    {rooms.map((r) => <option key={r} value={r}>{r}</option>)}
                  </select>
                </div>
                <div className={formGroupClass}>
                  <label className={labelClass}>Requested Room *</label>
                  <select value={roomTransferData.requestedRoom} onChange={(e) => setRoomTransferData({ ...roomTransferData, requestedRoom: e.target.value })} className={inputClass}>
                    <option value="">Select Requested Room</option>
                    {rooms.map((r) => <option key={r} value={r}>{r}</option>)}
                  </select>
                </div>
                <div className={`${formGroupClass} md:col-span-2`}>
                  <label className={labelClass}>Reason *</label>
                  <textarea placeholder="Reason for room transfer..." value={roomTransferData.reason}
                    onChange={(e) => setRoomTransferData({ ...roomTransferData, reason: e.target.value })} className={inputClass} rows={2} />
                </div>
                <div className={formGroupClass}>
                  <label className={labelClass}>Effective Date *</label>
                  <input type="date" value={roomTransferData.effectiveDate}
                    onChange={(e) => setRoomTransferData({ ...roomTransferData, effectiveDate: e.target.value })} className={inputClass} />
                </div>
                <div className={formGroupClass}>
                  <label className={labelClass}>Warden Approval</label>
                  <select value={roomTransferData.wardenApproval} onChange={(e) => setRoomTransferData({ ...roomTransferData, wardenApproval: e.target.value })} className={inputClass}>
                    <option value="Pending">Pending</option>
                    <option value="Approved">Approved</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                </div>
              </div>
              <div className="flex items-center gap-3 mt-6 pt-4 border-t border-border">
                <button onClick={() => handleFormSubmit('Room Transfer', roomTransferData)}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl gradient-birla text-white text-sm font-medium hover:opacity-90 transition-opacity">
                  <Save className="w-4 h-4" />Submit Transfer
                </button>
                <button onClick={() => setRoomTransferData({ student: '', bspId: '', penNo: '', upparId: '', currentRoom: '', requestedRoom: '', reason: '', effectiveDate: '', wardenApproval: 'Pending' })}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-border text-sm font-medium hover:bg-muted transition-colors">
                  <RotateCcw className="w-4 h-4" />Reset
                </button>
              </div>
            </motion.div>
          )}

          {/* 6. Inventory Entry Form */}
          {activeForm === 'inventory' && (
            <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-base font-semibold text-foreground flex items-center gap-2">
                  <Package className="w-5 h-5 text-cyan-500" />Inventory Entry Form
                </h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className={formGroupClass}>
                  <label className={labelClass}>Item Name *</label>
                  <input type="text" placeholder="e.g. Study Table" value={inventoryData.itemName}
                    onChange={(e) => setInventoryData({ ...inventoryData, itemName: e.target.value })} className={inputClass} />
                </div>
                <div className={formGroupClass}>
                  <label className={labelClass}>Category *</label>
                  <select value={inventoryData.category} onChange={(e) => setInventoryData({ ...inventoryData, category: e.target.value })} className={inputClass}>
                    {inventoryCategories.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div className={formGroupClass}>
                  <label className={labelClass}>Quantity *</label>
                  <input type="number" placeholder="e.g. 10" value={inventoryData.quantity}
                    onChange={(e) => setInventoryData({ ...inventoryData, quantity: e.target.value })} className={inputClass} />
                </div>
                <div className={formGroupClass}>
                  <label className={labelClass}>Condition *</label>
                  <select value={inventoryData.condition} onChange={(e) => setInventoryData({ ...inventoryData, condition: e.target.value })} className={inputClass}>
                    {conditions.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div className={formGroupClass}>
                  <label className={labelClass}>Location</label>
                  <input type="text" placeholder="e.g. Block A, Room 005" value={inventoryData.location}
                    onChange={(e) => setInventoryData({ ...inventoryData, location: e.target.value })} className={inputClass} />
                </div>
                <div className={formGroupClass}>
                  <label className={labelClass}>Purchase Date</label>
                  <input type="date" value={inventoryData.purchaseDate}
                    onChange={(e) => setInventoryData({ ...inventoryData, purchaseDate: e.target.value })} className={inputClass} />
                </div>
                <div className={formGroupClass}>
                  <label className={labelClass}>Cost (₹)</label>
                  <input type="number" placeholder="e.g. 5000" value={inventoryData.cost}
                    onChange={(e) => setInventoryData({ ...inventoryData, cost: e.target.value })} className={inputClass} />
                </div>
              </div>
              <div className="flex items-center gap-3 mt-6 pt-4 border-t border-border">
                <button onClick={() => handleFormSubmit('Inventory Entry', inventoryData)}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl gradient-birla text-white text-sm font-medium hover:opacity-90 transition-opacity">
                  <Save className="w-4 h-4" />Add Inventory
                </button>
                <button onClick={() => setInventoryData({ itemName: '', category: 'Furniture', quantity: '', condition: 'Good', location: '', purchaseDate: '', cost: '' })}
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

          {/* 1. Occupancy Report */}
          {activeReport === 'occupancy' && (
            <motion.div variants={itemVariants} className="space-y-4">
              <div className="rounded-2xl border border-border bg-card p-5">
                <h3 className="text-sm font-semibold text-foreground mb-4">Floor/Block Occupancy Table</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left py-2 px-3 font-medium text-muted-foreground">Floor</th>
                        <th className="text-left py-2 px-3 font-medium text-muted-foreground">Block</th>
                        <th className="text-left py-2 px-3 font-medium text-muted-foreground">Total</th>
                        <th className="text-left py-2 px-3 font-medium text-muted-foreground">Occupied</th>
                        <th className="text-left py-2 px-3 font-medium text-muted-foreground">Available</th>
                        <th className="text-left py-2 px-3 font-medium text-muted-foreground">Occupancy %</th>
                      </tr>
                    </thead>
                    <tbody>
                      {occupancyByFloor.map((row, i) => (
                        <tr key={i} className="border-b border-border/50">
                          <td className="py-2 px-3 font-medium">{row.floor}</td>
                          <td className="py-2 px-3">{row.block}</td>
                          <td className="py-2 px-3">{row.total}</td>
                          <td className="py-2 px-3">{row.occupied}</td>
                          <td className="py-2 px-3">{row.available}</td>
                          <td className="py-2 px-3">
                            <div className="flex items-center gap-2">
                              <div className="w-16 h-1.5 bg-muted rounded-full overflow-hidden">
                                <div className="h-full rounded-full bg-birla-cyan" style={{ width: `${(row.occupied / row.total) * 100}%` }} />
                              </div>
                              <span>{((row.occupied / row.total) * 100).toFixed(0)}%</span>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="rounded-2xl border border-border bg-card p-5">
                <h3 className="text-sm font-semibold text-foreground mb-4">Occupancy Distribution</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={occupancyPie} cx="50%" cy="50%" innerRadius={50} outerRadius={90} dataKey="value" nameKey="name" paddingAngle={3} label>
                        {occupancyPie.map((entry, idx) => <Cell key={idx} fill={entry.color} />)}
                      </Pie>
                      <Tooltip contentStyle={tooltipStyle} />
                      <Legend iconType="circle" wrapperStyle={{ fontSize: '10px' }} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </motion.div>
          )}

          {/* 2. Visitor Log Report */}
          {activeReport === 'visitorLog' && (
            <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-5">
              <h3 className="text-sm font-semibold text-foreground mb-4">Visitor Log Report</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-2 px-3 font-medium text-muted-foreground">Date</th>
                      <th className="text-left py-2 px-3 font-medium text-muted-foreground">Visitor</th>
                      <th className="text-left py-2 px-3 font-medium text-muted-foreground">Student</th>
                      <th className="text-left py-2 px-3 font-medium text-muted-foreground">Relationship</th>
                      <th className="text-left py-2 px-3 font-medium text-muted-foreground">Purpose</th>
                      <th className="text-left py-2 px-3 font-medium text-muted-foreground">In Time</th>
                      <th className="text-left py-2 px-3 font-medium text-muted-foreground">Out Time</th>
                      <th className="text-left py-2 px-3 font-medium text-muted-foreground">ID Proof</th>
                    </tr>
                  </thead>
                  <tbody>
                    {visitorLogData.map((v, i) => (
                      <tr key={i} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                        <td className="py-2 px-3">{v.date}</td>
                        <td className="py-2 px-3 font-medium">{v.visitor}</td>
                        <td className="py-2 px-3">{v.student}</td>
                        <td className="py-2 px-3">{v.relationship}</td>
                        <td className="py-2 px-3">{v.purpose}</td>
                        <td className="py-2 px-3">{v.inTime}</td>
                        <td className="py-2 px-3">{v.outTime}</td>
                        <td className="py-2 px-3">{v.idProof}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}

          {/* 3. Mess Feedback Report */}
          {activeReport === 'messFeedback' && (
            <motion.div variants={itemVariants} className="space-y-4">
              <div className="rounded-2xl border border-border bg-card p-5">
                <h3 className="text-sm font-semibold text-foreground mb-4">Mess Rating Summary</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                  {[
                    { meal: 'Breakfast', rating: 3.9, color: 'text-amber-500' },
                    { meal: 'Lunch', rating: 4.1, color: 'text-emerald-500' },
                    { meal: 'Snacks', rating: 4.2, color: 'text-cyan-500' },
                    { meal: 'Dinner', rating: 4.0, color: 'text-purple-500' },
                  ].map((m) => (
                    <div key={m.meal} className="text-center p-3 rounded-xl border border-border">
                      <p className="text-xs text-muted-foreground">{m.meal}</p>
                      <p className={`text-2xl font-bold ${m.color}`}>{m.rating}</p>
                      <p className="text-[10px] text-muted-foreground">out of 5.0</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="rounded-2xl border border-border bg-card p-5">
                <h3 className="text-sm font-semibold text-foreground mb-4">Weekly Mess Feedback Trend</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={messFeedbackTrend}>
                      <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'} />
                      <XAxis dataKey="week" tick={{ fontSize: 9 }} stroke={darkMode ? '#64748b' : '#94a3b8'} />
                      <YAxis domain={[3, 5]} tick={{ fontSize: 9 }} stroke={darkMode ? '#64748b' : '#94a3b8'} />
                      <Tooltip contentStyle={tooltipStyle} />
                      <Legend iconType="circle" wrapperStyle={{ fontSize: '10px' }} />
                      <Bar dataKey="breakfast" fill="#F59E0B" radius={[2, 2, 0, 0]} name="Breakfast" />
                      <Bar dataKey="lunch" fill="#10B981" radius={[2, 2, 0, 0]} name="Lunch" />
                      <Bar dataKey="snacks" fill="#22D3EE" radius={[2, 2, 0, 0]} name="Snacks" />
                      <Bar dataKey="dinner" fill="#8B5CF6" radius={[2, 2, 0, 0]} name="Dinner" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </motion.div>
          )}

          {/* 4. Complaint Status Report */}
          {activeReport === 'complaintStatus' && (
            <motion.div variants={itemVariants} className="space-y-4">
              <div className="rounded-2xl border border-border bg-card p-5">
                <h3 className="text-sm font-semibold text-foreground mb-4">Category-wise Complaints</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left py-2 px-3 font-medium text-muted-foreground">Category</th>
                        <th className="text-left py-2 px-3 font-medium text-muted-foreground">Total</th>
                        <th className="text-left py-2 px-3 font-medium text-muted-foreground">Resolved</th>
                        <th className="text-left py-2 px-3 font-medium text-muted-foreground">Pending</th>
                        <th className="text-left py-2 px-3 font-medium text-muted-foreground">Resolution %</th>
                      </tr>
                    </thead>
                    <tbody>
                      {complaintData.map((c, i) => (
                        <tr key={i} className="border-b border-border/50">
                          <td className="py-2 px-3 font-medium">{c.category}</td>
                          <td className="py-2 px-3">{c.total}</td>
                          <td className="py-2 px-3 text-emerald-600 dark:text-emerald-400">{c.resolved}</td>
                          <td className="py-2 px-3 text-amber-600 dark:text-amber-400">{c.pending}</td>
                          <td className="py-2 px-3">{((c.resolved / c.total) * 100).toFixed(0)}%</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="rounded-2xl border border-border bg-card p-5">
                <h3 className="text-sm font-semibold text-foreground mb-4">Complaint Distribution</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={complaintData} cx="50%" cy="50%" innerRadius={50} outerRadius={90} dataKey="total" nameKey="category" paddingAngle={2} label>
                        {complaintData.map((entry, idx) => <Cell key={idx} fill={entry.color} />)}
                      </Pie>
                      <Tooltip contentStyle={tooltipStyle} />
                      <Legend iconType="circle" wrapperStyle={{ fontSize: '10px' }} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </motion.div>
          )}

          {/* 5. Student Hostel Report */}
          {activeReport === 'studentHostel' && (
            <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-5">
              <h3 className="text-sm font-semibold text-foreground mb-4">Student Hostel Report (with UDISE+ IDs)</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-2 px-3 font-medium text-muted-foreground">Student</th>
                      <th className="text-left py-2 px-3 font-medium text-muted-foreground">BSP ID</th>
                      <th className="text-left py-2 px-3 font-medium text-muted-foreground">PEN No</th>
                      <th className="text-left py-2 px-3 font-medium text-muted-foreground">Uppar ID</th>
                      <th className="text-left py-2 px-3 font-medium text-muted-foreground">Class</th>
                      <th className="text-left py-2 px-3 font-medium text-muted-foreground">Block</th>
                      <th className="text-left py-2 px-3 font-medium text-muted-foreground">Floor</th>
                      <th className="text-left py-2 px-3 font-medium text-muted-foreground">Room</th>
                      <th className="text-left py-2 px-3 font-medium text-muted-foreground">Bed</th>
                      <th className="text-left py-2 px-3 font-medium text-muted-foreground">Warden</th>
                    </tr>
                  </thead>
                  <tbody>
                    {studentHostelData.map((s, i) => (
                      <tr key={i} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                        <td className="py-2 px-3 font-medium">{s.name}</td>
                        <td className="py-2 px-3 text-birla-cyan">{s.bspId}</td>
                        <td className="py-2 px-3 text-birla-gold">{s.penNo}</td>
                        <td className="py-2 px-3 text-purple-500">{s.upparId}</td>
                        <td className="py-2 px-3">{s.class}</td>
                        <td className="py-2 px-3">{s.block}</td>
                        <td className="py-2 px-3">{s.floor}</td>
                        <td className="py-2 px-3">{s.room}</td>
                        <td className="py-2 px-3">{s.bed}</td>
                        <td className="py-2 px-3">{s.warden}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}
        </motion.div>
      )}
    </motion.div>
  )
}
