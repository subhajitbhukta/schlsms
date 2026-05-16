'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Bus, MapPin, Users, Clock, Navigation, Phone, AlertTriangle,
  TrendingUp, TrendingDown, ArrowUpRight, Download, Printer,
  Plus, Search, Filter, Route, UserCheck, Shield, Smartphone,
  ChevronRight, Save, Eye, Star, Car, Truck as TruckIcon,
  MapPinned, PhoneCall, Calendar, Bell, CheckCircle2, XCircle,
  FileText, BarChart3, PieChart as PieChartIcon, ClipboardList,
  FileBarChart, Fuel, Wrench, Gauge, Activity, User, IndianRupee
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
  { label: 'Total Routes', value: '6', change: '330 students', icon: Route, gradient: 'from-blue-900 to-blue-600', glow: 'shadow-blue-800/20' },
  { label: 'Active Vehicles', value: '8', change: 'All inspected', icon: Bus, gradient: 'from-emerald-900 to-emerald-600', glow: 'shadow-emerald-800/20' },
  { label: 'On-Time Rate', value: '94.2%', change: '+2.1% vs last', icon: Clock, gradient: 'from-amber-900 to-amber-600', glow: 'shadow-amber-800/20' },
  { label: 'Drivers', value: '10', change: '2 backup', icon: Users, gradient: 'from-purple-900 to-purple-600', glow: 'shadow-purple-800/20' },
]

const routesData = [
  { id: 1, name: 'Route 1 - Singur', number: 'R-01', stops: 'Singur, Haripal, Balibela', distance: 18, time: 45, vehicle: 'WB-12-AB-1234', driver: 'Raju Mondal', capacity: 52, students: 68, fee: 22000 },
  { id: 2, name: 'Route 2 - Chandannagar', number: 'R-02', stops: 'Chandannagar, Chinsurah, Mogra', distance: 22, time: 55, vehicle: 'WB-12-CD-5678', driver: 'Sanjay Das', capacity: 52, students: 82, fee: 24000 },
  { id: 3, name: 'Route 3 - Srirampore', number: 'R-03', stops: 'Srirampore, Konnagar, Rishra', distance: 15, time: 40, vehicle: 'WB-12-EF-9012', driver: 'Bipin Ghosh', capacity: 42, students: 55, fee: 20000 },
  { id: 4, name: 'Route 4 - Hooghly', number: 'R-04', stops: 'Hooghly, Bandel, Tribeni', distance: 25, time: 60, vehicle: 'WB-12-GH-3456', driver: 'Amit Shaw', capacity: 42, students: 42, fee: 26000 },
  { id: 5, name: 'Route 5 - Bardhaman', number: 'R-05', stops: 'Bardhaman, Memari, Katwa', distance: 35, time: 75, vehicle: 'WB-12-IJ-7890', driver: 'Dilip Roy', capacity: 52, students: 38, fee: 28000 },
  { id: 6, name: 'Route 6 - Tarakeswar', number: 'R-06', stops: 'Tarakeswar, Arambagh, Khanakul', distance: 28, time: 65, vehicle: 'WB-12-KL-1234', driver: 'Pranab Sen', capacity: 42, students: 45, fee: 24000 },
]

const driversData = [
  { id: 1, name: 'Raju Mondal', license: 'WB-2019-1234567', expiry: 'Dec 2027', phone: '+91 98765 43210', route: 'R-01', vehicle: 'WB-12-AB-1234', experience: 12, bloodGroup: 'B+' },
  { id: 2, name: 'Sanjay Das', license: 'WB-2020-2345678', expiry: 'Mar 2028', phone: '+91 76543 21098', route: 'R-02', vehicle: 'WB-12-CD-5678', experience: 8, bloodGroup: 'O+' },
  { id: 3, name: 'Bipin Ghosh', license: 'WB-2018-3456789', expiry: 'Sep 2026', phone: '+91 54321 09876', route: 'R-03', vehicle: 'WB-12-EF-9012', experience: 15, bloodGroup: 'A+' },
  { id: 4, name: 'Amit Shaw', license: 'WB-2021-4567890', expiry: 'Jun 2027', phone: '+91 21098 76543', route: 'R-04', vehicle: 'WB-12-GH-3456', experience: 6, bloodGroup: 'AB+' },
  { id: 5, name: 'Dilip Roy', license: 'WB-2017-5678901', expiry: 'Jan 2027', phone: '+91 09876 54321', route: 'R-05', vehicle: 'WB-12-IJ-7890', experience: 18, bloodGroup: 'B-' },
  { id: 6, name: 'Pranab Sen', license: 'WB-2019-6789012', expiry: 'Nov 2027', phone: '+91 43210 98765', route: 'R-06', vehicle: 'WB-12-KL-1234', experience: 10, bloodGroup: 'O-' },
]

const vehiclesData = [
  { number: 'WB-12-AB-1234', type: 'Bus', capacity: 52, regExpiry: 'Mar 2027', insExpiry: 'Jun 2026', pollExpiry: 'Sep 2026', lastService: 'Jan 15, 2026', nextService: 'Jul 15, 2026', status: 'Active' },
  { number: 'WB-12-CD-5678', type: 'Bus', capacity: 52, regExpiry: 'May 2027', insExpiry: 'Aug 2026', pollExpiry: 'Nov 2026', lastService: 'Feb 10, 2026', nextService: 'Aug 10, 2026', status: 'Active' },
  { number: 'WB-12-EF-9012', type: 'Bus', capacity: 42, regExpiry: 'Jul 2027', insExpiry: 'Oct 2026', pollExpiry: 'Jan 2027', lastService: 'Dec 20, 2025', nextService: 'Jun 20, 2026', status: 'Active' },
  { number: 'WB-12-GH-3456', type: 'Bus', capacity: 42, regExpiry: 'Sep 2027', insExpiry: 'Dec 2026', pollExpiry: 'Mar 2027', lastService: 'Mar 1, 2026', nextService: 'Sep 1, 2026', status: 'Active' },
  { number: 'WB-12-IJ-7890', type: 'Bus', capacity: 52, regExpiry: 'Nov 2027', insExpiry: 'Feb 2027', pollExpiry: 'May 2027', lastService: 'Jan 25, 2026', nextService: 'Jul 25, 2026', status: 'Active' },
  { number: 'WB-12-KL-1234', type: 'Bus', capacity: 42, regExpiry: 'Jan 2028', insExpiry: 'Apr 2027', pollExpiry: 'Jul 2027', lastService: 'Feb 5, 2026', nextService: 'Aug 5, 2026', status: 'Active' },
  { number: 'WB-12-MN-5678', type: 'Van', capacity: 18, regExpiry: 'Aug 2027', insExpiry: 'Nov 2026', pollExpiry: 'Feb 2027', lastService: 'Mar 2, 2026', nextService: 'Jun 2, 2026', status: 'Maintenance' },
  { number: 'WB-12-OP-9012', type: 'Car', capacity: 6, regExpiry: 'Oct 2027', insExpiry: 'Jan 2027', pollExpiry: 'Apr 2027', lastService: 'Feb 18, 2026', nextService: 'May 18, 2026', status: 'Active' },
]

// ─── Report Data ──────────────────────────────────────────────────
const routeUtilData = [
  { route: 'R-01 Singur', students: 68, capacity: 52 },
  { route: 'R-02 Chandannagar', students: 82, capacity: 52 },
  { route: 'R-03 Srirampore', students: 55, capacity: 42 },
  { route: 'R-04 Hooghly', students: 42, capacity: 42 },
  { route: 'R-05 Bardhaman', students: 38, capacity: 52 },
  { route: 'R-06 Tarakeswar', students: 45, capacity: 42 },
]

const transportAttendanceData = [
  { day: 'Mon', boarded: 318, dropped: 315 },
  { day: 'Tue', boarded: 322, dropped: 320 },
  { day: 'Wed', boarded: 325, dropped: 323 },
  { day: 'Thu', boarded: 310, dropped: 308 },
  { day: 'Fri', boarded: 328, dropped: 326 },
  { day: 'Sat', boarded: 290, dropped: 288 },
]

const driverPerfData = [
  { name: 'Raju M.', trips: 45, onTime: 95, rating: 4.5 },
  { name: 'Sanjay D.', trips: 44, onTime: 92, rating: 4.3 },
  { name: 'Bipin G.', trips: 43, onTime: 98, rating: 4.8 },
  { name: 'Amit S.', trips: 42, onTime: 88, rating: 4.0 },
  { name: 'Dilip R.', trips: 40, onTime: 96, rating: 4.6 },
  { name: 'Pranab S.', trips: 44, onTime: 94, rating: 4.4 },
]

const vehicleMaintenanceData = [
  { vehicle: 'WB-12-AB-1234', lastService: 'Jan 15', nextService: 'Jul 15', status: 'OK', color: '#10B981' },
  { vehicle: 'WB-12-CD-5678', lastService: 'Feb 10', nextService: 'Aug 10', status: 'OK', color: '#10B981' },
  { vehicle: 'WB-12-EF-9012', lastService: 'Dec 20', nextService: 'Jun 20', status: 'Due Soon', color: '#F59E0B' },
  { vehicle: 'WB-12-GH-3456', lastService: 'Mar 1', nextService: 'Sep 1', status: 'OK', color: '#10B981' },
  { vehicle: 'WB-12-IJ-7890', lastService: 'Jan 25', nextService: 'Jul 25', status: 'OK', color: '#10B981' },
  { vehicle: 'WB-12-KL-1234', lastService: 'Feb 5', nextService: 'Aug 5', status: 'OK', color: '#10B981' },
  { vehicle: 'WB-12-MN-5678', lastService: 'Mar 2', nextService: 'Jun 2', status: 'In Service', color: '#EF4444' },
  { vehicle: 'WB-12-OP-9012', lastService: 'Feb 18', nextService: 'May 18', status: 'Due Soon', color: '#F59E0B' },
]

const transportFeeReportData = [
  { route: 'R-01 Singur', collected: 1452000, pending: 440000 },
  { route: 'R-02 Chandannagar', collected: 1848000, pending: 120000 },
  { route: 'R-03 Srirampore', collected: 990000, pending: 110000 },
  { route: 'R-04 Hooghly', collected: 882000, pending: 210000 },
  { route: 'R-05 Bardhaman', collected: 840000, pending: 224000 },
  { route: 'R-06 Tarakeswar', collected: 972000, pending: 108000 },
]

const studentTransportData = [
  { class: 'I', total: 24, transport: 12, bspIds: 'BSP-2025-101 to 112' },
  { class: 'II', total: 28, transport: 15, bspIds: 'BSP-2025-201 to 215' },
  { class: 'III', total: 26, transport: 14, bspIds: 'BSP-2025-301 to 314' },
  { class: 'IV', total: 30, transport: 18, bspIds: 'BSP-2025-401 to 418' },
  { class: 'V', total: 32, transport: 20, bspIds: 'BSP-2025-501 to 520' },
  { class: 'VI', total: 28, transport: 16, bspIds: 'BSP-2025-601 to 616' },
  { class: 'VII', total: 30, transport: 18, bspIds: 'BSP-2025-701 to 718' },
  { class: 'VIII', total: 32, transport: 22, bspIds: 'BSP-2025-801 to 822' },
  { class: 'IX', total: 28, transport: 15, bspIds: 'BSP-2025-901 to 915' },
  { class: 'X', total: 26, transport: 14, bspIds: 'BSP-2025-001 to 014' },
  { class: 'XI', total: 24, transport: 12, bspIds: 'BSP-2025-X01 to X12' },
  { class: 'XII', total: 22, transport: 10, bspIds: 'BSP-2025-XI01 to XI10' },
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
export default function TransportModule() {
  const { darkMode } = useAppStore()
  const [activeTab, setActiveTab] = useState('overview')
  const [activeForm, setActiveForm] = useState(0)
  const [activeReport, setActiveReport] = useState(0)

  // Form States
  const [routeForm, setRouteForm] = useState({ routeName: '', routeNumber: '', stops: '', totalDistance: '', estimatedTime: '', vehicleAssigned: '', driverAssigned: '', capacity: '', fee: '' })
  const [driverForm, setDriverForm] = useState({ name: '', licenseNumber: '', licenseExpiry: '', phone: '', emergencyContact: '', address: '', routeAssigned: '', vehicleNumber: '', experience: '', bloodGroup: 'A+', photo: false })
  const [studentTransportForm, setStudentTransportForm] = useState({ studentName: '', class: '', route: '', stop: '', pickupTime: '', dropTime: '', fee: '', parentPhone: '' })
  const [vehicleForm, setVehicleForm] = useState({ vehicleNumber: '', type: 'Bus', capacity: '', registrationExpiry: '', insuranceExpiry: '', pollutionCertExpiry: '', lastService: '', nextService: '' })
  const [pickupAlertForm, setPickupAlertForm] = useState({ studentName: '', route: '', stop: '', alertType: 'Picked Up', time: '', parentNotified: false, notes: '' })
  const [transportFeeForm, setTransportFeeForm] = useState({ studentName: '', route: '', amount: '', paymentMode: 'Cash', month: 'April', receiptNo: '' })

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'gps', label: 'GPS Tracking', icon: Navigation },
    { id: 'routes', label: 'Routes', icon: Route },
    { id: 'drivers', label: 'Drivers', icon: Users },
    { id: 'forms', label: 'Forms', icon: ClipboardList },
    { id: 'reports', label: 'Reports', icon: FileBarChart },
  ]

  const forms = [
    { name: 'Route Creation', icon: Route },
    { name: 'Driver Registration', icon: Users },
    { name: 'Student Transport', icon: UserCheck },
    { name: 'Vehicle Registration', icon: Bus },
    { name: 'Pickup Alert', icon: Bell },
    { name: 'Transport Fee', icon: IndianRupee },
  ]

  const reports = [
    { name: 'Route Utilization', icon: Route },
    { name: 'Transport Attendance', icon: UserCheck },
    { name: 'Driver Performance', icon: Star },
    { name: 'Vehicle Maintenance', icon: Wrench },
    { name: 'Fee Collection', icon: IndianRupee },
    { name: 'Student Transport', icon: Users },
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
              <h3 className="text-base font-semibold text-foreground flex items-center gap-2 mb-4"><Route className="w-4 h-4 text-birla-cyan" />Route-wise Students</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={routeUtilData}>
                    <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'} />
                    <XAxis dataKey="route" tick={{ fontSize: 8 }} stroke={darkMode ? '#64748b' : '#94a3b8'} />
                    <YAxis tick={{ fontSize: 10 }} stroke={darkMode ? '#64748b' : '#94a3b8'} />
                    <Tooltip contentStyle={tooltipStyle} />
                    <Legend iconType="circle" wrapperStyle={{ fontSize: '11px' }} />
                    <Bar dataKey="students" fill="#22D3EE" name="Students" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="capacity" fill="#C8A45C" name="Capacity" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </motion.div>
            <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-5">
              <h3 className="text-base font-semibold text-foreground flex items-center gap-2 mb-4"><Bus className="w-4 h-4 text-birla-gold" />Vehicle Status</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={[
                      { name: 'Active', value: 6, color: '#10B981' },
                      { name: 'Due Soon', value: 1, color: '#F59E0B' },
                      { name: 'In Service', value: 1, color: '#EF4444' },
                    ]} cx="50%" cy="50%" innerRadius={50} outerRadius={85} dataKey="value" label={({ name, value }) => `${name}: ${value}`}>
                      {[{ name: 'Active', value: 6, color: '#10B981' }, { name: 'Due Soon', value: 1, color: '#F59E0B' }, { name: 'In Service', value: 1, color: '#EF4444' }].map((entry, idx) => <Cell key={idx} fill={entry.color} />)}
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
          GPS TRACKING TAB
      ═══════════════════════════════════════════════════════════════ */}
      {activeTab === 'gps' && (
        <motion.div variants={itemVariants} className="space-y-6">
          <div className="rounded-2xl border border-border bg-card p-5">
            <h3 className="text-base font-semibold text-foreground flex items-center gap-2 mb-4"><Navigation className="w-4 h-4 text-birla-cyan" />Live Vehicle Tracking</h3>
            <div className="h-64 rounded-xl bg-muted/30 flex items-center justify-center border border-border">
              <div className="text-center">
                <Navigation className="w-12 h-12 text-birla-cyan mx-auto mb-3 animate-pulse" />
                <p className="text-sm font-medium text-foreground">GPS Tracking Dashboard</p>
                <p className="text-xs text-muted-foreground mt-1">6 vehicles currently active on routes</p>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {routesData.slice(0, 6).map((route) => (
              <motion.div key={route.id} variants={itemVariants} className="p-4 rounded-2xl border border-border gradient-card-blue">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-sm font-semibold text-foreground">{route.name}</h4>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">Active</span>
                </div>
                <div className="space-y-1 text-xs">
                  <div className="flex justify-between"><span className="text-muted-foreground">Vehicle</span><span className="font-medium text-foreground">{route.vehicle}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Driver</span><span className="font-medium text-foreground">{route.driver}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Students</span><span className="font-medium text-foreground">{route.students}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">ETA</span><span className="font-medium text-birla-cyan">{route.time} min</span></div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* ═══════════════════════════════════════════════════════════════
          ROUTES TAB
      ═══════════════════════════════════════════════════════════════ */}
      {activeTab === 'routes' && (
        <motion.div variants={itemVariants} className="space-y-6">
          <div className="rounded-2xl border border-border bg-card overflow-hidden">
            <div className="p-5 border-b border-border"><h3 className="text-base font-semibold text-foreground flex items-center gap-2"><Route className="w-4 h-4 text-birla-cyan" />All Routes</h3></div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead><tr className="border-b border-border bg-muted/30">
                  <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Route</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Stops</th>
                  <th className="text-right px-4 py-3 text-xs font-semibold text-muted-foreground">Distance</th>
                  <th className="text-right px-4 py-3 text-xs font-semibold text-muted-foreground">Time</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Vehicle</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Driver</th>
                  <th className="text-right px-4 py-3 text-xs font-semibold text-muted-foreground">Students</th>
                  <th className="text-right px-4 py-3 text-xs font-semibold text-muted-foreground">Fee (₹)</th>
                </tr></thead>
                <tbody>
                  {routesData.map((r) => (
                    <tr key={r.id} className="border-b border-border/50 hover:bg-muted/20">
                      <td className="px-4 py-3 text-sm font-medium text-foreground">{r.name}</td>
                      <td className="px-4 py-3 text-xs text-muted-foreground">{r.stops}</td>
                      <td className="px-4 py-3 text-sm text-right text-foreground">{r.distance} km</td>
                      <td className="px-4 py-3 text-sm text-right text-foreground">{r.time} min</td>
                      <td className="px-4 py-3 text-xs font-mono text-foreground">{r.vehicle}</td>
                      <td className="px-4 py-3 text-sm text-foreground">{r.driver}</td>
                      <td className="px-4 py-3 text-sm text-right font-bold text-foreground">{r.students}</td>
                      <td className="px-4 py-3 text-sm text-right font-bold text-birla-gold">₹{r.fee.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>
      )}

      {/* ═══════════════════════════════════════════════════════════════
          DRIVERS TAB
      ═══════════════════════════════════════════════════════════════ */}
      {activeTab === 'drivers' && (
        <motion.div variants={itemVariants} className="space-y-6">
          <div className="rounded-2xl border border-border bg-card overflow-hidden">
            <div className="p-5 border-b border-border"><h3 className="text-base font-semibold text-foreground flex items-center gap-2"><Users className="w-4 h-4 text-birla-gold" />Driver Directory</h3></div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead><tr className="border-b border-border bg-muted/30">
                  <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Name</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">License No</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Expiry</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Phone</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Route</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Vehicle</th>
                  <th className="text-right px-4 py-3 text-xs font-semibold text-muted-foreground">Exp (Yrs)</th>
                  <th className="text-center px-4 py-3 text-xs font-semibold text-muted-foreground">Blood Grp</th>
                </tr></thead>
                <tbody>
                  {driversData.map((d) => (
                    <tr key={d.id} className="border-b border-border/50 hover:bg-muted/20">
                      <td className="px-4 py-3 text-sm font-medium text-foreground">{d.name}</td>
                      <td className="px-4 py-3 text-xs font-mono text-muted-foreground">{d.license}</td>
                      <td className="px-4 py-3 text-xs text-foreground">{d.expiry}</td>
                      <td className="px-4 py-3 text-xs text-foreground">{d.phone}</td>
                      <td className="px-4 py-3 text-sm text-birla-cyan font-medium">{d.route}</td>
                      <td className="px-4 py-3 text-xs font-mono text-foreground">{d.vehicle}</td>
                      <td className="px-4 py-3 text-sm text-right text-foreground">{d.experience}</td>
                      <td className="px-4 py-3 text-center"><span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-red-500/10 text-red-600 dark:text-red-400">{d.bloodGroup}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
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

          {/* Form 1: Route Creation */}
          {activeForm === 0 && (
            <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-6">
              <h3 className="text-lg font-semibold text-foreground flex items-center gap-2 mb-6"><Route className="w-5 h-5 text-birla-cyan" />Route Creation Form</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <FormField label="Route Name"><InputField value={routeForm.routeName} onChange={(e) => setRouteForm({ ...routeForm, routeName: e.target.value })} placeholder="e.g. Route 7 - Dankuni" /></FormField>
                <FormField label="Route Number"><InputField value={routeForm.routeNumber} onChange={(e) => setRouteForm({ ...routeForm, routeNumber: e.target.value })} placeholder="e.g. R-07" /></FormField>
                <FormField label="Stops (comma separated)"><InputField value={routeForm.stops} onChange={(e) => setRouteForm({ ...routeForm, stops: e.target.value })} placeholder="e.g. Dankuni, Janai, Balagarh" /></FormField>
                <FormField label="Total Distance (km)"><InputField value={routeForm.totalDistance} onChange={(e) => setRouteForm({ ...routeForm, totalDistance: e.target.value })} placeholder="0" type="number" /></FormField>
                <FormField label="Estimated Time (min)"><InputField value={routeForm.estimatedTime} onChange={(e) => setRouteForm({ ...routeForm, estimatedTime: e.target.value })} placeholder="0" type="number" /></FormField>
                <FormField label="Vehicle Assigned"><InputField value={routeForm.vehicleAssigned} onChange={(e) => setRouteForm({ ...routeForm, vehicleAssigned: e.target.value })} placeholder="e.g. WB-12-AB-1234" /></FormField>
                <FormField label="Driver Assigned"><InputField value={routeForm.driverAssigned} onChange={(e) => setRouteForm({ ...routeForm, driverAssigned: e.target.value })} placeholder="Driver name" /></FormField>
                <FormField label="Capacity"><InputField value={routeForm.capacity} onChange={(e) => setRouteForm({ ...routeForm, capacity: e.target.value })} placeholder="0" type="number" /></FormField>
                <FormField label="Fee (₹)"><InputField value={routeForm.fee} onChange={(e) => setRouteForm({ ...routeForm, fee: e.target.value })} placeholder="0" type="number" /></FormField>
              </div>
              <div className="mt-6 flex justify-end"><button className="px-6 py-2.5 rounded-xl gradient-birla-gold text-birla-blue text-sm font-bold hover:opacity-90 transition-opacity flex items-center gap-2"><Save className="w-4 h-4" />Create Route</button></div>
            </motion.div>
          )}

          {/* Form 2: Driver Registration */}
          {activeForm === 1 && (
            <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-6">
              <h3 className="text-lg font-semibold text-foreground flex items-center gap-2 mb-6"><Users className="w-5 h-5 text-birla-gold" />Driver Registration Form</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <FormField label="Full Name"><InputField value={driverForm.name} onChange={(e) => setDriverForm({ ...driverForm, name: e.target.value })} placeholder="Driver name" /></FormField>
                <FormField label="License Number"><InputField value={driverForm.licenseNumber} onChange={(e) => setDriverForm({ ...driverForm, licenseNumber: e.target.value })} placeholder="WB-XXXX-XXXXXXX" /></FormField>
                <FormField label="License Expiry"><InputField value={driverForm.licenseExpiry} onChange={(e) => setDriverForm({ ...driverForm, licenseExpiry: e.target.value })} type="date" /></FormField>
                <FormField label="Phone"><InputField value={driverForm.phone} onChange={(e) => setDriverForm({ ...driverForm, phone: e.target.value })} placeholder="+91 98765 43210" /></FormField>
                <FormField label="Emergency Contact"><InputField value={driverForm.emergencyContact} onChange={(e) => setDriverForm({ ...driverForm, emergencyContact: e.target.value })} placeholder="+91 98765 43210" /></FormField>
                <FormField label="Address"><InputField value={driverForm.address} onChange={(e) => setDriverForm({ ...driverForm, address: e.target.value })} placeholder="Full address" /></FormField>
                <FormField label="Route Assigned"><SelectField value={driverForm.routeAssigned} onChange={(e) => setDriverForm({ ...driverForm, routeAssigned: e.target.value })} options={['', 'R-01', 'R-02', 'R-03', 'R-04', 'R-05', 'R-06']} /></FormField>
                <FormField label="Vehicle Number"><InputField value={driverForm.vehicleNumber} onChange={(e) => setDriverForm({ ...driverForm, vehicleNumber: e.target.value })} placeholder="WB-12-XX-XXXX" /></FormField>
                <FormField label="Experience (Years)"><InputField value={driverForm.experience} onChange={(e) => setDriverForm({ ...driverForm, experience: e.target.value })} placeholder="0" type="number" /></FormField>
                <FormField label="Blood Group"><SelectField value={driverForm.bloodGroup} onChange={(e) => setDriverForm({ ...driverForm, bloodGroup: e.target.value })} options={['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']} /></FormField>
                <div className="flex items-center gap-3 mt-5">
                  <label className="flex items-center gap-2 text-sm text-foreground"><input type="checkbox" checked={driverForm.photo} onChange={(e) => setDriverForm({ ...driverForm, photo: e.target.checked })} className="rounded border-input" /> Photo Uploaded</label>
                </div>
              </div>
              <div className="mt-6 flex justify-end"><button className="px-6 py-2.5 rounded-xl gradient-birla-gold text-birla-blue text-sm font-bold hover:opacity-90 transition-opacity flex items-center gap-2"><Save className="w-4 h-4" />Register Driver</button></div>
            </motion.div>
          )}

          {/* Form 3: Student Transport Assignment */}
          {activeForm === 2 && (
            <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-6">
              <h3 className="text-lg font-semibold text-foreground flex items-center gap-2 mb-6"><UserCheck className="w-5 h-5 text-emerald-500" />Student Transport Assignment Form</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <FormField label="Student Name">
                  <InputField value={studentTransportForm.studentName} onChange={(e) => setStudentTransportForm({ ...studentTransportForm, studentName: e.target.value })} placeholder="Enter student name" />
                  {studentTransportForm.studentName && <StudentUDISE bspId="BSP-2025-001" penNo="PEN-XA-001" upparId="UPP-001" />}
                </FormField>
                <FormField label="Class"><SelectField value={studentTransportForm.class} onChange={(e) => setStudentTransportForm({ ...studentTransportForm, class: e.target.value })} options={['I','II','III','IV','V','VI','VII','VIII','IX','X','XI','XII']} /></FormField>
                <FormField label="Route"><SelectField value={studentTransportForm.route} onChange={(e) => setStudentTransportForm({ ...studentTransportForm, route: e.target.value })} options={['R-01 Singur', 'R-02 Chandannagar', 'R-03 Srirampore', 'R-04 Hooghly', 'R-05 Bardhaman', 'R-06 Tarakeswar']} /></FormField>
                <FormField label="Stop"><InputField value={studentTransportForm.stop} onChange={(e) => setStudentTransportForm({ ...studentTransportForm, stop: e.target.value })} placeholder="Bus stop name" /></FormField>
                <FormField label="Pickup Time"><InputField value={studentTransportForm.pickupTime} onChange={(e) => setStudentTransportForm({ ...studentTransportForm, pickupTime: e.target.value })} type="time" /></FormField>
                <FormField label="Drop Time"><InputField value={studentTransportForm.dropTime} onChange={(e) => setStudentTransportForm({ ...studentTransportForm, dropTime: e.target.value })} type="time" /></FormField>
                <FormField label="Fee (₹)"><InputField value={studentTransportForm.fee} onChange={(e) => setStudentTransportForm({ ...studentTransportForm, fee: e.target.value })} placeholder="0" type="number" /></FormField>
                <FormField label="Parent Phone"><InputField value={studentTransportForm.parentPhone} onChange={(e) => setStudentTransportForm({ ...studentTransportForm, parentPhone: e.target.value })} placeholder="+91 98765 43210" /></FormField>
              </div>
              <div className="mt-6 flex justify-end"><button className="px-6 py-2.5 rounded-xl gradient-birla-gold text-birla-blue text-sm font-bold hover:opacity-90 transition-opacity flex items-center gap-2"><Save className="w-4 h-4" />Assign Transport</button></div>
            </motion.div>
          )}

          {/* Form 4: Vehicle Registration */}
          {activeForm === 3 && (
            <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-6">
              <h3 className="text-lg font-semibold text-foreground flex items-center gap-2 mb-6"><Bus className="w-5 h-5 text-blue-500" />Vehicle Registration Form</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <FormField label="Vehicle Number"><InputField value={vehicleForm.vehicleNumber} onChange={(e) => setVehicleForm({ ...vehicleForm, vehicleNumber: e.target.value })} placeholder="WB-12-XX-XXXX" /></FormField>
                <FormField label="Type"><SelectField value={vehicleForm.type} onChange={(e) => setVehicleForm({ ...vehicleForm, type: e.target.value })} options={['Bus', 'Van', 'Car']} /></FormField>
                <FormField label="Capacity"><InputField value={vehicleForm.capacity} onChange={(e) => setVehicleForm({ ...vehicleForm, capacity: e.target.value })} placeholder="0" type="number" /></FormField>
                <FormField label="Registration Expiry"><InputField value={vehicleForm.registrationExpiry} onChange={(e) => setVehicleForm({ ...vehicleForm, registrationExpiry: e.target.value })} type="date" /></FormField>
                <FormField label="Insurance Expiry"><InputField value={vehicleForm.insuranceExpiry} onChange={(e) => setVehicleForm({ ...vehicleForm, insuranceExpiry: e.target.value })} type="date" /></FormField>
                <FormField label="Pollution Cert Expiry"><InputField value={vehicleForm.pollutionCertExpiry} onChange={(e) => setVehicleForm({ ...vehicleForm, pollutionCertExpiry: e.target.value })} type="date" /></FormField>
                <FormField label="Last Service Date"><InputField value={vehicleForm.lastService} onChange={(e) => setVehicleForm({ ...vehicleForm, lastService: e.target.value })} type="date" /></FormField>
                <FormField label="Next Service Date"><InputField value={vehicleForm.nextService} onChange={(e) => setVehicleForm({ ...vehicleForm, nextService: e.target.value })} type="date" /></FormField>
              </div>
              <div className="mt-6 flex justify-end"><button className="px-6 py-2.5 rounded-xl gradient-birla-gold text-birla-blue text-sm font-bold hover:opacity-90 transition-opacity flex items-center gap-2"><Save className="w-4 h-4" />Register Vehicle</button></div>
            </motion.div>
          )}

          {/* Form 5: Pickup Alert */}
          {activeForm === 4 && (
            <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-6">
              <h3 className="text-lg font-semibold text-foreground flex items-center gap-2 mb-6"><Bell className="w-5 h-5 text-amber-500" />Pickup/Drop Alert Form</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <FormField label="Student Name">
                  <InputField value={pickupAlertForm.studentName} onChange={(e) => setPickupAlertForm({ ...pickupAlertForm, studentName: e.target.value })} placeholder="Enter student name" />
                  {pickupAlertForm.studentName && <StudentUDISE bspId="BSP-2025-045" penNo="PEN-IXB-045" upparId="UPP-045" />}
                </FormField>
                <FormField label="Route"><SelectField value={pickupAlertForm.route} onChange={(e) => setPickupAlertForm({ ...pickupAlertForm, route: e.target.value })} options={['R-01 Singur', 'R-02 Chandannagar', 'R-03 Srirampore', 'R-04 Hooghly', 'R-05 Bardhaman', 'R-06 Tarakeswar']} /></FormField>
                <FormField label="Stop"><InputField value={pickupAlertForm.stop} onChange={(e) => setPickupAlertForm({ ...pickupAlertForm, stop: e.target.value })} placeholder="Bus stop name" /></FormField>
                <FormField label="Alert Type"><SelectField value={pickupAlertForm.alertType} onChange={(e) => setPickupAlertForm({ ...pickupAlertForm, alertType: e.target.value })} options={['Picked Up', 'Dropped', 'Missed', 'Delayed']} /></FormField>
                <FormField label="Time"><InputField value={pickupAlertForm.time} onChange={(e) => setPickupAlertForm({ ...pickupAlertForm, time: e.target.value })} type="time" /></FormField>
                <div className="flex items-center gap-3 mt-5">
                  <label className="flex items-center gap-2 text-sm text-foreground"><input type="checkbox" checked={pickupAlertForm.parentNotified} onChange={(e) => setPickupAlertForm({ ...pickupAlertForm, parentNotified: e.target.checked })} className="rounded border-input" /> Parent Notified</label>
                </div>
                <FormField label="Notes"><InputField value={pickupAlertForm.notes} onChange={(e) => setPickupAlertForm({ ...pickupAlertForm, notes: e.target.value })} placeholder="Any notes" /></FormField>
              </div>
              <div className="mt-6 flex justify-end"><button className="px-6 py-2.5 rounded-xl gradient-birla-gold text-birla-blue text-sm font-bold hover:opacity-90 transition-opacity flex items-center gap-2"><Save className="w-4 h-4" />Submit Alert</button></div>
            </motion.div>
          )}

          {/* Form 6: Transport Fee Collection */}
          {activeForm === 5 && (
            <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-6">
              <h3 className="text-lg font-semibold text-foreground flex items-center gap-2 mb-6"><IndianRupee className="w-5 h-5 text-emerald-500" />Transport Fee Collection Form</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <FormField label="Student Name">
                  <InputField value={transportFeeForm.studentName} onChange={(e) => setTransportFeeForm({ ...transportFeeForm, studentName: e.target.value })} placeholder="Enter student name" />
                  {transportFeeForm.studentName && <StudentUDISE bspId="BSP-2025-031" penNo="PEN-VIIA-031" upparId="UPP-031" />}
                </FormField>
                <FormField label="Route"><SelectField value={transportFeeForm.route} onChange={(e) => setTransportFeeForm({ ...transportFeeForm, route: e.target.value })} options={['R-01 Singur', 'R-02 Chandannagar', 'R-03 Srirampore', 'R-04 Hooghly', 'R-05 Bardhaman', 'R-06 Tarakeswar']} /></FormField>
                <FormField label="Amount (₹)"><InputField value={transportFeeForm.amount} onChange={(e) => setTransportFeeForm({ ...transportFeeForm, amount: e.target.value })} placeholder="0" type="number" /></FormField>
                <FormField label="Payment Mode"><SelectField value={transportFeeForm.paymentMode} onChange={(e) => setTransportFeeForm({ ...transportFeeForm, paymentMode: e.target.value })} options={['Cash', 'UPI', 'NetBanking', 'Card', 'Cheque']} /></FormField>
                <FormField label="Month"><SelectField value={transportFeeForm.month} onChange={(e) => setTransportFeeForm({ ...transportFeeForm, month: e.target.value })} options={['April','May','June','July','August','September','October','November','December','January','February','March']} /></FormField>
                <FormField label="Receipt No"><InputField value={transportFeeForm.receiptNo} onChange={(e) => setTransportFeeForm({ ...transportFeeForm, receiptNo: e.target.value })} placeholder="REC-001" /></FormField>
              </div>
              <div className="mt-6 flex justify-end"><button className="px-6 py-2.5 rounded-xl gradient-birla-gold text-birla-blue text-sm font-bold hover:opacity-90 transition-opacity flex items-center gap-2"><Save className="w-4 h-4" />Collect Fee</button></div>
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

          {/* Report 1: Route Utilization */}
          {activeReport === 0 && (
            <motion.div variants={itemVariants} className="space-y-4">
              <div className="rounded-2xl border border-border bg-card p-5">
                <h3 className="text-base font-semibold text-foreground flex items-center gap-2 mb-4"><Route className="w-4 h-4 text-birla-cyan" />Route Utilization Report</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={routeUtilData}>
                      <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'} />
                      <XAxis dataKey="route" tick={{ fontSize: 8 }} stroke={darkMode ? '#64748b' : '#94a3b8'} />
                      <YAxis tick={{ fontSize: 10 }} stroke={darkMode ? '#64748b' : '#94a3b8'} />
                      <Tooltip contentStyle={tooltipStyle} />
                      <Legend iconType="circle" wrapperStyle={{ fontSize: '11px' }} />
                      <Bar dataKey="students" fill="#22D3EE" name="Students" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="capacity" fill="#C8A45C" name="Capacity" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
              <div className="rounded-2xl border border-border bg-card overflow-hidden">
                <table className="w-full">
                  <thead><tr className="border-b border-border bg-muted/30"><th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Route</th><th className="text-right px-4 py-3 text-xs font-semibold text-muted-foreground">Students</th><th className="text-right px-4 py-3 text-xs font-semibold text-muted-foreground">Capacity</th><th className="text-right px-4 py-3 text-xs font-semibold text-muted-foreground">Utilization</th></tr></thead>
                  <tbody>{routeUtilData.map((d) => { const util = ((d.students / d.capacity) * 100).toFixed(0); return (<tr key={d.route} className="border-b border-border/50 hover:bg-muted/20"><td className="px-4 py-3 text-sm font-medium text-foreground">{d.route}</td><td className="px-4 py-3 text-sm text-right">{d.students}</td><td className="px-4 py-3 text-sm text-right">{d.capacity}</td><td className="px-4 py-3 text-right"><span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${Number(util) > 100 ? 'bg-red-500/10 text-red-600 dark:text-red-400' : Number(util) > 80 ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400' : 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'}`}>{util}%</span></td></tr>); })}</tbody>
                </table>
              </div>
            </motion.div>
          )}

          {/* Report 2: Transport Attendance */}
          {activeReport === 1 && (
            <motion.div variants={itemVariants} className="space-y-4">
              <div className="rounded-2xl border border-border bg-card p-5">
                <h3 className="text-base font-semibold text-foreground flex items-center gap-2 mb-4"><UserCheck className="w-4 h-4 text-emerald-500" />Transport Attendance Report</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={transportAttendanceData}>
                      <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'} />
                      <XAxis dataKey="day" tick={{ fontSize: 10 }} stroke={darkMode ? '#64748b' : '#94a3b8'} />
                      <YAxis tick={{ fontSize: 10 }} stroke={darkMode ? '#64748b' : '#94a3b8'} domain={[280, 340]} />
                      <Tooltip contentStyle={tooltipStyle} />
                      <Legend iconType="circle" wrapperStyle={{ fontSize: '11px' }} />
                      <Line type="monotone" dataKey="boarded" stroke="#22D3EE" strokeWidth={2} name="Boarded" />
                      <Line type="monotone" dataKey="dropped" stroke="#C8A45C" strokeWidth={2} name="Dropped" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
              <div className="rounded-2xl border border-border bg-card overflow-hidden">
                <table className="w-full">
                  <thead><tr className="border-b border-border bg-muted/30"><th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Day</th><th className="text-right px-4 py-3 text-xs font-semibold text-muted-foreground">Boarded</th><th className="text-right px-4 py-3 text-xs font-semibold text-muted-foreground">Dropped</th></tr></thead>
                  <tbody>{transportAttendanceData.map((d) => (<tr key={d.day} className="border-b border-border/50 hover:bg-muted/20"><td className="px-4 py-3 text-sm font-medium text-foreground">{d.day}</td><td className="px-4 py-3 text-sm text-right">{d.boarded}</td><td className="px-4 py-3 text-sm text-right">{d.dropped}</td></tr>))}</tbody>
                </table>
              </div>
            </motion.div>
          )}

          {/* Report 3: Driver Performance */}
          {activeReport === 2 && (
            <motion.div variants={itemVariants} className="space-y-4">
              <div className="rounded-2xl border border-border bg-card p-5">
                <h3 className="text-base font-semibold text-foreground flex items-center gap-2 mb-4"><Star className="w-4 h-4 text-birla-gold" />Driver Performance Report</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={driverPerfData}>
                      <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'} />
                      <XAxis dataKey="name" tick={{ fontSize: 9 }} stroke={darkMode ? '#64748b' : '#94a3b8'} />
                      <YAxis tick={{ fontSize: 10 }} stroke={darkMode ? '#64748b' : '#94a3b8'} domain={[0, 5]} />
                      <Tooltip contentStyle={tooltipStyle} />
                      <Bar dataKey="rating" fill="#C8A45C" name="Rating" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
              <div className="rounded-2xl border border-border bg-card overflow-hidden">
                <table className="w-full">
                  <thead><tr className="border-b border-border bg-muted/30"><th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Driver</th><th className="text-right px-4 py-3 text-xs font-semibold text-muted-foreground">Trips</th><th className="text-right px-4 py-3 text-xs font-semibold text-muted-foreground">On-Time %</th><th className="text-right px-4 py-3 text-xs font-semibold text-muted-foreground">Rating</th></tr></thead>
                  <tbody>{driverPerfData.map((d) => (<tr key={d.name} className="border-b border-border/50 hover:bg-muted/20"><td className="px-4 py-3 text-sm font-medium text-foreground">{d.name}</td><td className="px-4 py-3 text-sm text-right">{d.trips}</td><td className="px-4 py-3 text-sm text-right"><span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${d.onTime >= 95 ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' : 'bg-amber-500/10 text-amber-600 dark:text-amber-400'}`}>{d.onTime}%</span></td><td className="px-4 py-3 text-sm text-right font-bold text-birla-gold">{d.rating}</td></tr>))}</tbody>
                </table>
              </div>
            </motion.div>
          )}

          {/* Report 4: Vehicle Maintenance */}
          {activeReport === 3 && (
            <motion.div variants={itemVariants} className="space-y-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="rounded-2xl border border-border bg-card p-5">
                  <h3 className="text-base font-semibold text-foreground flex items-center gap-2 mb-4"><Wrench className="w-4 h-4 text-amber-500" />Vehicle Status Distribution</h3>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie data={[
                          { name: 'OK', value: 5, color: '#10B981' },
                          { name: 'Due Soon', value: 2, color: '#F59E0B' },
                          { name: 'In Service', value: 1, color: '#EF4444' },
                        ]} cx="50%" cy="50%" innerRadius={50} outerRadius={85} dataKey="value" label={({ name, value }) => `${name}: ${value}`}>
                          {[{ name: 'OK', value: 5, color: '#10B981' }, { name: 'Due Soon', value: 2, color: '#F59E0B' }, { name: 'In Service', value: 1, color: '#EF4444' }].map((entry, idx) => <Cell key={idx} fill={entry.color} />)}
                        </Pie>
                        <Tooltip contentStyle={tooltipStyle} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
                <div className="rounded-2xl border border-border bg-card overflow-hidden">
                  <table className="w-full">
                    <thead><tr className="border-b border-border bg-muted/30"><th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Vehicle</th><th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Last Service</th><th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Next Service</th><th className="text-center px-4 py-3 text-xs font-semibold text-muted-foreground">Status</th></tr></thead>
                    <tbody>{vehicleMaintenanceData.map((d) => (<tr key={d.vehicle} className="border-b border-border/50 hover:bg-muted/20"><td className="px-4 py-3 text-xs font-mono font-medium text-foreground">{d.vehicle}</td><td className="px-4 py-3 text-xs text-muted-foreground">{d.lastService}</td><td className="px-4 py-3 text-xs text-muted-foreground">{d.nextService}</td><td className="px-4 py-3 text-center"><span className="px-2 py-0.5 rounded-full text-[10px] font-medium" style={{ backgroundColor: d.color + '1A', color: d.color }}>{d.status}</span></td></tr>))}</tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          )}

          {/* Report 5: Transport Fee Collection */}
          {activeReport === 4 && (
            <motion.div variants={itemVariants} className="space-y-4">
              <div className="rounded-2xl border border-border bg-card p-5">
                <h3 className="text-base font-semibold text-foreground flex items-center gap-2 mb-4"><IndianRupee className="w-4 h-4 text-birla-gold" />Transport Fee Collection Report</h3>
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
                  <thead><tr className="border-b border-border bg-muted/30"><th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Route</th><th className="text-right px-4 py-3 text-xs font-semibold text-muted-foreground">Collected (₹)</th><th className="text-right px-4 py-3 text-xs font-semibold text-muted-foreground">Pending (₹)</th></tr></thead>
                  <tbody>{transportFeeReportData.map((d) => (<tr key={d.route} className="border-b border-border/50 hover:bg-muted/20"><td className="px-4 py-3 text-sm font-medium text-foreground">{d.route}</td><td className="px-4 py-3 text-sm text-right text-emerald-600 dark:text-emerald-400">₹{(d.collected / 100000).toFixed(1)}L</td><td className="px-4 py-3 text-sm text-right text-red-600 dark:text-red-400">₹{(d.pending / 100000).toFixed(1)}L</td></tr>))}</tbody>
                </table>
              </div>
            </motion.div>
          )}

          {/* Report 6: Student Transport */}
          {activeReport === 5 && (
            <motion.div variants={itemVariants} className="space-y-4">
              <div className="rounded-2xl border border-border bg-card p-5">
                <h3 className="text-base font-semibold text-foreground flex items-center gap-2 mb-4"><Users className="w-4 h-4 text-birla-cyan" />Class-wise Transport Users (with UDISE+)</h3>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead><tr className="border-b border-border bg-muted/30">
                      <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Class</th>
                      <th className="text-right px-4 py-3 text-xs font-semibold text-muted-foreground">Total Students</th>
                      <th className="text-right px-4 py-3 text-xs font-semibold text-muted-foreground">Transport Users</th>
                      <th className="text-right px-4 py-3 text-xs font-semibold text-muted-foreground">% Using</th>
                      <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">BSP ID Range</th>
                    </tr></thead>
                    <tbody>
                      {studentTransportData.map((d) => {
                        const pct = ((d.transport / d.total) * 100).toFixed(0)
                        return (
                          <tr key={d.class} className="border-b border-border/50 hover:bg-muted/20">
                            <td className="px-4 py-3 text-sm font-medium text-foreground">{d.class}</td>
                            <td className="px-4 py-3 text-sm text-right text-foreground">{d.total}</td>
                            <td className="px-4 py-3 text-sm text-right font-bold text-birla-cyan">{d.transport}</td>
                            <td className="px-4 py-3 text-right"><span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${Number(pct) >= 50 ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' : 'bg-amber-500/10 text-amber-600 dark:text-amber-400'}`}>{pct}%</span></td>
                            <td className="px-4 py-3 text-xs text-blue-600 dark:text-blue-400 font-mono">{d.bspIds}</td>
                          </tr>
                        )
                      })}
                    </tbody>
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
