'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Bus, MapPin, Navigation, Users, Phone, Clock, Route, ChevronRight,
  CheckCircle2, AlertTriangle, XCircle, Search, Filter, Plus, Eye,
  Wifi, WifiOff, Radio, Send, Bell, BellRing, Shield, Activity,
  Timer, ArrowUpRight, Map, Compass, Car, UserCheck, AlertCircle,
  Settings, RefreshCw, Locate, Zap, TrendingUp
} from 'lucide-react'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Legend
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
  { label: 'Routes', value: '18', icon: Route, color: 'text-birla-cyan bg-birla-cyan/10', change: '+2 this year' },
  { label: 'Vehicles', value: '24', icon: Bus, color: 'text-birla-gold bg-birla-gold/10', change: '2 in service' },
  { label: 'Students', value: '890', icon: Users, color: 'text-emerald-500 bg-emerald-500/10', change: '+45 new' },
  { label: 'Drivers', value: '28', icon: Car, color: 'text-purple-500 bg-purple-500/10', change: '4 on leave' },
]

const busRoutes = [
  { id: 'R-01', name: 'Singur Main Road', stops: 8, distance: '12.5 km', time: '35 min', students: 52, driver: 'Rajendra Kumar', vehicle: 'WB-12-AB-1234', status: 'On Route', optimized: true },
  { id: 'R-02', name: 'Chandannagar Route', stops: 6, distance: '9.8 km', time: '28 min', students: 41, driver: 'Suresh Yadav', vehicle: 'WB-12-CD-5678', status: 'On Route', optimized: true },
  { id: 'R-03', name: 'Bandel Expressway', stops: 10, distance: '18.2 km', time: '48 min', students: 68, driver: 'Manoj Singh', vehicle: 'WB-12-EF-9012', status: 'Delayed', optimized: false },
  { id: 'R-04', name: 'Chinsurah Station', stops: 7, distance: '11.3 km', time: '32 min', students: 47, driver: 'Amit Das', vehicle: 'WB-12-GH-3456', status: 'On Route', optimized: true },
  { id: 'R-05', name: 'Serampore Highway', stops: 9, distance: '15.7 km', time: '42 min', students: 58, driver: 'Vikram Pal', vehicle: 'WB-12-IJ-7890', status: 'At School', optimized: false },
  { id: 'R-06', name: 'Tarakeswar Road', stops: 5, distance: '8.4 km', time: '25 min', students: 35, driver: 'Debashis Roy', vehicle: 'WB-12-KL-2345', status: 'On Route', optimized: true },
  { id: 'R-07', name: 'Haripal Village', stops: 11, distance: '20.1 km', time: '55 min', students: 72, driver: 'Pranab Ghosh', vehicle: 'WB-12-MN-6789', status: 'Delayed', optimized: false },
  { id: 'R-08', name: 'Dhaniakhali Route', stops: 6, distance: '10.2 km', time: '30 min', students: 39, driver: 'Sanjay Mondal', vehicle: 'WB-12-OP-0123', status: 'On Route', optimized: true },
]

const drivers = [
  { id: 'D-001', name: 'Rajendra Kumar', license: 'DL-2019-458723', route: 'R-01', phone: '+91 98321 45670', vehicle: 'WB-12-AB-1234', status: 'On Duty', experience: '8 yrs', rating: 4.8 },
  { id: 'D-002', name: 'Suresh Yadav', license: 'DL-2020-567834', route: 'R-02', phone: '+91 87654 32109', vehicle: 'WB-12-CD-5678', status: 'On Duty', experience: '6 yrs', rating: 4.5 },
  { id: 'D-003', name: 'Manoj Singh', license: 'DL-2018-345612', route: 'R-03', phone: '+91 76543 21098', vehicle: 'WB-12-EF-9012', status: 'On Duty', experience: '10 yrs', rating: 4.2 },
  { id: 'D-004', name: 'Amit Das', license: 'DL-2021-678945', route: 'R-04', phone: '+91 65432 10987', vehicle: 'WB-12-GH-3456', status: 'On Duty', experience: '5 yrs', rating: 4.7 },
  { id: 'D-005', name: 'Vikram Pal', license: 'DL-2017-234567', route: 'R-05', phone: '+91 54321 09876', vehicle: 'WB-12-IJ-7890', status: 'Break', experience: '12 yrs', rating: 4.9 },
  { id: 'D-006', name: 'Debashis Roy', license: 'DL-2022-789012', route: 'R-06', phone: '+91 43210 98765', vehicle: 'WB-12-KL-2345', status: 'On Duty', experience: '3 yrs', rating: 4.3 },
  { id: 'D-007', name: 'Pranab Ghosh', license: 'DL-2019-456123', route: 'R-07', phone: '+91 32109 87654', vehicle: 'WB-12-MN-6789', status: 'On Duty', experience: '7 yrs', rating: 4.6 },
  { id: 'D-008', name: 'Sanjay Mondal', license: 'DL-2020-123456', route: 'R-08', phone: '+91 21098 76543', vehicle: 'WB-12-OP-0123', status: 'On Leave', experience: '4 yrs', rating: 4.1 },
]

const pickupAlerts = [
  { id: 1, student: 'Aarav Sharma', class: 'X-A', route: 'R-01', type: 'Pickup', stop: 'Singur Market', time: '7:12 AM', parent: 'Mr. Rakesh Sharma', parentPhone: '+91 98765 43210', notified: true, status: 'Completed' },
  { id: 2, student: 'Priya Gupta', class: 'X-A', route: 'R-02', type: 'Pickup', stop: 'Chandannagar Stand', time: '7:18 AM', parent: 'Mrs. Sunita Gupta', parentPhone: '+91 87654 32109', notified: true, status: 'Completed' },
  { id: 3, student: 'Arjun Reddy', class: 'IX-B', route: 'R-03', type: 'Pickup', stop: 'Bandel Junction', time: '7:25 AM', parent: 'Mr. Venkat Reddy', parentPhone: '+91 76543 21098', notified: true, status: 'Delayed' },
  { id: 4, student: 'Ananya Iyer', class: 'VIII-A', route: 'R-04', type: 'Drop', stop: 'Chinsurah Station', time: '3:45 PM', parent: 'Mrs. Lakshmi Iyer', parentPhone: '+91 65432 10987', notified: true, status: 'In Transit' },
  { id: 5, student: 'Rohan Patel', class: 'VII-A', route: 'R-05', type: 'Drop', stop: 'Serampore More', time: '3:52 PM', parent: 'Mr. Jignesh Patel', parentPhone: '+91 54321 09876', notified: false, status: 'Pending' },
  { id: 6, student: 'Ishita Banerjee', class: 'VI-B', route: 'R-06', type: 'Pickup', stop: 'Tarakeswar Road', time: '7:30 AM', parent: 'Mrs. Ruma Banerjee', parentPhone: '+91 43210 98765', notified: true, status: 'Completed' },
  { id: 7, student: 'Vivaan Kumar', class: 'V-A', route: 'R-01', type: 'Drop', stop: 'Singur Market', time: '4:05 PM', parent: 'Mr. Suresh Kumar', parentPhone: '+91 32109 87654', notified: true, status: 'In Transit' },
  { id: 8, student: 'Meera Nair', class: 'IV-A', route: 'R-07', type: 'Pickup', stop: 'Haripal Village', time: '6:55 AM', parent: 'Mrs. Geeta Nair', parentPhone: '+91 21098 76543', notified: true, status: 'Completed' },
]

const attendanceData = [
  { route: 'R-01', total: 52, boarded: 50, deboarded: 48, absent: 2, percentage: 96 },
  { route: 'R-02', total: 41, boarded: 39, deboarded: 39, absent: 2, percentage: 95 },
  { route: 'R-03', total: 68, boarded: 62, deboarded: 60, absent: 6, percentage: 91 },
  { route: 'R-04', total: 47, boarded: 46, deboarded: 45, absent: 1, percentage: 98 },
  { route: 'R-05', total: 58, boarded: 54, deboarded: 52, absent: 4, percentage: 93 },
  { route: 'R-06', total: 35, boarded: 34, deboarded: 34, absent: 1, percentage: 97 },
  { route: 'R-07', total: 72, boarded: 66, deboarded: 64, absent: 6, percentage: 92 },
  { route: 'R-08', total: 39, boarded: 37, deboarded: 36, absent: 2, percentage: 95 },
]

const scanLogs = [
  { id: 1, student: 'Aarav Sharma', route: 'R-01', type: 'Board', time: '7:12 AM', stop: 'Singur Market', cardId: 'BOM-001' },
  { id: 2, student: 'Kavya Joshi', route: 'R-01', type: 'Board', time: '7:15 AM', stop: 'Singur Hospital', cardId: 'BOM-010' },
  { id: 3, student: 'Vivaan Kumar', route: 'R-01', type: 'Board', time: '7:18 AM', stop: 'Singur School Gate', cardId: 'BOM-007' },
  { id: 4, student: 'Priya Gupta', route: 'R-02', type: 'Board', time: '7:20 AM', stop: 'Chandannagar Stand', cardId: 'BOM-002' },
  { id: 5, student: 'Arjun Reddy', route: 'R-03', type: 'Board', time: '7:28 AM', stop: 'Bandel Junction', cardId: 'BOM-003' },
  { id: 6, student: 'Aarav Sharma', route: 'R-01', type: 'Deboard', time: '3:48 PM', stop: 'Singur Market', cardId: 'BOM-001' },
  { id: 7, student: 'Ananya Iyer', route: 'R-04', type: 'Deboard', time: '3:50 PM', stop: 'Chinsurah Station', cardId: 'BOM-004' },
  { id: 8, student: 'Ishita Banerjee', route: 'R-06', type: 'Deboard', time: '3:55 PM', stop: 'Tarakeswar Road', cardId: 'BOM-006' },
]

const busMarkers = [
  { id: 'BUS-01', route: 'R-01', lat: '22.81°N', lng: '88.49°E', speed: '32 km/h', heading: 'School', eta: '8 min', status: 'Moving', fuel: '72%' },
  { id: 'BUS-02', route: 'R-02', lat: '22.86°N', lng: '88.36°E', speed: '28 km/h', heading: 'School', eta: '12 min', status: 'Moving', fuel: '65%' },
  { id: 'BUS-03', route: 'R-03', lat: '22.93°N', lng: '88.38°E', speed: '12 km/h', heading: 'School', eta: '22 min', status: 'Slow Traffic', fuel: '48%' },
  { id: 'BUS-04', route: 'R-04', lat: '22.90°N', lng: '88.40°E', speed: '35 km/h', heading: 'School', eta: '10 min', status: 'Moving', fuel: '80%' },
  { id: 'BUS-05', route: 'R-05', lat: '22.75°N', lng: '88.34°E', speed: '0 km/h', heading: 'Parked', eta: 'Arrived', status: 'At School', fuel: '55%' },
  { id: 'BUS-06', route: 'R-06', lat: '22.78°N', lng: '88.45°E', speed: '30 km/h', heading: 'School', eta: '15 min', status: 'Moving', fuel: '90%' },
]

const routeOptimizationData = [
  { route: 'R-03', current: '18.2 km', optimized: '14.8 km', savings: '3.4 km', timeSaved: '12 min', suggestion: 'Skip Bandel Market, use Expressway bypass' },
  { route: 'R-05', current: '15.7 km', optimized: '12.1 km', savings: '3.6 km', timeSaved: '15 min', suggestion: 'Merge Serampore stops, avoid GT Road junction' },
  { route: 'R-07', current: '20.1 km', optimized: '16.5 km', savings: '3.6 km', timeSaved: '18 min', suggestion: 'Reverse loop direction, start from Haripal end' },
]

const parentTrackingData = [
  { student: 'Aarav Sharma', class: 'X-A', route: 'R-01', bus: 'BUS-01', currentStop: 'Singur Hospital', eta: '8 min', status: 'En Route', parentNotified: true },
  { student: 'Priya Gupta', class: 'X-A', route: 'R-02', bus: 'BUS-02', currentStop: 'Chandannagar Market', eta: '12 min', status: 'En Route', parentNotified: true },
  { student: 'Arjun Reddy', class: 'IX-B', route: 'R-03', bus: 'BUS-03', currentStop: 'Bandel Junction', eta: '22 min', status: 'Delayed - Traffic', parentNotified: true },
  { student: 'Rohan Patel', class: 'VII-A', route: 'R-05', bus: 'BUS-05', currentStop: 'School Campus', eta: 'Arrived', status: 'At School', parentNotified: false },
]

const routeAttendanceChart = [
  { route: 'R-01', boarded: 50, absent: 2 },
  { route: 'R-02', boarded: 39, absent: 2 },
  { route: 'R-03', boarded: 62, absent: 6 },
  { route: 'R-04', boarded: 46, absent: 1 },
  { route: 'R-05', boarded: 54, absent: 4 },
  { route: 'R-06', boarded: 34, absent: 1 },
  { route: 'R-07', boarded: 66, absent: 6 },
  { route: 'R-08', boarded: 37, absent: 2 },
]

export default function TransportModule() {
  const { darkMode } = useAppStore()
  const [activeTab, setActiveTab] = useState('gps')
  const [searchQuery, setSearchQuery] = useState('')

  const tabs = [
    { id: 'gps', label: 'GPS Tracking', icon: MapPin },
    { id: 'routes', label: 'Route Optimization', icon: Route },
    { id: 'drivers', label: 'Driver Management', icon: Car },
    { id: 'alerts', label: 'Pickup Alerts', icon: BellRing },
    { id: 'attendance', label: 'Transport Attendance', icon: UserCheck },
    { id: 'parent', label: 'Parent Tracking', icon: Compass },
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

      {/* GPS Bus Tracking */}
      {activeTab === 'gps' && (
        <motion.div variants={itemVariants} className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-semibold text-foreground flex items-center gap-2">
              <MapPin className="w-5 h-5 text-birla-cyan" />
              GPS Bus Tracking
            </h3>
            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border text-xs font-medium hover:bg-muted transition-colors">
              <RefreshCw className="w-3.5 h-3.5" /> Refresh
            </button>
          </div>

          {/* Map Placeholder */}
          <div className="rounded-2xl border border-border bg-card overflow-hidden">
            <div className="relative h-72 sm:h-80 bg-gradient-to-br from-birla-blue/5 via-birla-cyan/5 to-birla-gold/5 dark:from-birla-blue/20 dark:via-birla-cyan/10 dark:to-birla-gold/5">
              {/* Grid lines */}
              <div className="absolute inset-0 opacity-10">
                {[...Array(8)].map((_, i) => (
                  <div key={`h-${i}`} className="absolute w-full border-t border-border" style={{ top: `${(i + 1) * 12.5}%` }} />
                ))}
                {[...Array(10)].map((_, i) => (
                  <div key={`v-${i}`} className="absolute h-full border-l border-border" style={{ left: `${(i + 1) * 10}%` }} />
                ))}
              </div>

              {/* Route Lines */}
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                <path d="M 10 60 Q 25 40 40 55 Q 55 70 70 35 Q 80 20 90 30" fill="none" stroke="#22D3EE" strokeWidth="0.5" strokeDasharray="2,1" opacity="0.6" />
                <path d="M 15 80 Q 30 65 50 70 Q 65 75 80 50" fill="none" stroke="#C8A45C" strokeWidth="0.5" strokeDasharray="2,1" opacity="0.6" />
                <path d="M 5 30 Q 20 25 35 40 Q 50 55 75 45 Q 85 40 95 25" fill="none" stroke="#10B981" strokeWidth="0.5" strokeDasharray="2,1" opacity="0.6" />
              </svg>

              {/* Bus Markers */}
              {busMarkers.map((bus, idx) => {
                const positions = [
                  { left: '12%', top: '55%' },
                  { left: '28%', top: '35%' },
                  { left: '48%', top: '45%' },
                  { left: '65%', top: '30%' },
                  { left: '82%', top: '50%' },
                  { left: '38%', top: '68%' },
                ]
                const pos = positions[idx] || { left: '50%', top: '50%' }
                return (
                  <div
                    key={bus.id}
                    className="absolute group cursor-pointer"
                    style={{ left: pos.left, top: pos.top, transform: 'translate(-50%, -50%)' }}
                  >
                    <div className={`relative flex items-center justify-center w-8 h-8 rounded-full shadow-lg ${
                      bus.status === 'Moving' ? 'bg-emerald-500' :
                      bus.status === 'Slow Traffic' ? 'bg-amber-500 animate-pulse' :
                      'bg-blue-500'
                    }`}>
                      <Bus className="w-4 h-4 text-white" />
                    </div>
                    <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-current text-emerald-500" />
                    {/* Tooltip */}
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block z-10 w-48">
                      <div className="bg-card border border-border rounded-xl p-3 shadow-xl text-xs">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-semibold text-foreground">{bus.id}</span>
                          <span className={`px-1.5 py-0.5 rounded-full text-[9px] font-medium ${
                            bus.status === 'Moving' ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' :
                            bus.status === 'Slow Traffic' ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400' :
                            'bg-blue-500/10 text-blue-600 dark:text-blue-400'
                          }`}>{bus.status}</span>
                        </div>
                        <div className="space-y-1 text-muted-foreground">
                          <p>Route: {bus.route}</p>
                          <p>Speed: {bus.speed}</p>
                          <p>ETA: {bus.eta}</p>
                          <p>Fuel: {bus.fuel}</p>
                          <p>{bus.lat}, {bus.lng}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}

              {/* School Marker */}
              <div className="absolute" style={{ left: '85%', top: '20%', transform: 'translate(-50%, -50%)' }}>
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-red-500 shadow-lg animate-pulse-glow">
                  <MapPin className="w-5 h-5 text-white" />
                </div>
                <p className="text-[9px] font-medium text-foreground mt-1 text-center whitespace-nowrap">BOMIS School</p>
              </div>

              {/* Legend */}
              <div className="absolute bottom-3 left-3 bg-card/90 backdrop-blur-sm border border-border rounded-xl p-2.5">
                <p className="text-[10px] font-semibold text-foreground mb-1.5">Legend</p>
                <div className="space-y-1">
                  <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-full bg-emerald-500" /><span className="text-[10px] text-muted-foreground">On Route</span></div>
                  <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-full bg-amber-500" /><span className="text-[10px] text-muted-foreground">Delayed</span></div>
                  <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-full bg-blue-500" /><span className="text-[10px] text-muted-foreground">At School</span></div>
                  <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-full bg-red-500" /><span className="text-[10px] text-muted-foreground">School</span></div>
                </div>
              </div>
            </div>
          </div>

          {/* Live Bus Status */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {busMarkers.map((bus) => (
              <div key={bus.id} className="rounded-xl border border-border bg-card p-4 hover:shadow-sm transition-all">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                      bus.status === 'Moving' ? 'bg-emerald-500/10 text-emerald-600' :
                      bus.status === 'Slow Traffic' ? 'bg-amber-500/10 text-amber-600' :
                      'bg-blue-500/10 text-blue-600'
                    }`}>
                      <Bus className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">{bus.id}</p>
                      <p className="text-[10px] text-muted-foreground">Route {bus.route}</p>
                    </div>
                  </div>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${
                    bus.status === 'Moving' ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' :
                    bus.status === 'Slow Traffic' ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400' :
                    'bg-blue-500/10 text-blue-600 dark:text-blue-400'
                  }`}>
                    {bus.status}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="p-2 rounded-lg bg-muted/30">
                    <p className="text-muted-foreground text-[10px]">Speed</p>
                    <p className="font-medium text-foreground">{bus.speed}</p>
                  </div>
                  <div className="p-2 rounded-lg bg-muted/30">
                    <p className="text-muted-foreground text-[10px]">ETA</p>
                    <p className="font-medium text-foreground">{bus.eta}</p>
                  </div>
                  <div className="p-2 rounded-lg bg-muted/30">
                    <p className="text-muted-foreground text-[10px]">Heading</p>
                    <p className="font-medium text-foreground">{bus.heading}</p>
                  </div>
                  <div className="p-2 rounded-lg bg-muted/30">
                    <p className="text-muted-foreground text-[10px]">Fuel</p>
                    <p className="font-medium text-foreground">{bus.fuel}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1 mt-2">
                  <Wifi className="w-3 h-3 text-emerald-500" />
                  <span className="text-[10px] text-emerald-600 dark:text-emerald-400">GPS Active</span>
                  <span className="text-[10px] text-muted-foreground ml-auto">{bus.lat}, {bus.lng}</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Route Optimization */}
      {activeTab === 'routes' && (
        <motion.div variants={itemVariants} className="space-y-4">
          <h3 className="text-base font-semibold text-foreground flex items-center gap-2">
            <Route className="w-5 h-5 text-birla-gold" />
            Route Optimization
          </h3>

          {/* Route List */}
          <div className="rounded-2xl border border-border bg-card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border bg-muted/30">
                    <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Route</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Name</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Stops</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Distance</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Time</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Students</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Driver</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Vehicle</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Status</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Optimized</th>
                  </tr>
                </thead>
                <tbody>
                  {busRoutes.map((route) => (
                    <tr key={route.id} className="border-b border-border/50 hover:bg-muted/20 transition-colors">
                      <td className="px-4 py-3 text-xs font-mono text-birla-cyan">{route.id}</td>
                      <td className="px-4 py-3 text-sm font-medium text-foreground">{route.name}</td>
                      <td className="px-4 py-3 text-sm text-foreground">{route.stops}</td>
                      <td className="px-4 py-3 text-sm text-foreground">{route.distance}</td>
                      <td className="px-4 py-3 text-sm text-foreground">{route.time}</td>
                      <td className="px-4 py-3 text-sm text-foreground">{route.students}</td>
                      <td className="px-4 py-3 text-sm text-foreground">{route.driver}</td>
                      <td className="px-4 py-3 text-xs text-muted-foreground font-mono">{route.vehicle}</td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${
                          route.status === 'On Route' ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' :
                          route.status === 'Delayed' ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400' :
                          'bg-blue-500/10 text-blue-600 dark:text-blue-400'
                        }`}>
                          {route.status}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        {route.optimized ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                        ) : (
                          <AlertTriangle className="w-4 h-4 text-amber-500" />
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Optimization Suggestions */}
          <h4 className="text-sm font-semibold text-foreground flex items-center gap-2">
            <Zap className="w-4 h-4 text-amber-500" />
            Optimization Suggestions
          </h4>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
            {routeOptimizationData.map((opt) => (
              <div key={opt.route} className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-semibold text-foreground">Route {opt.route}</span>
                  <span className="px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 text-[10px] font-medium">Can Optimize</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs mb-3">
                  <div className="p-2 rounded-lg bg-muted/30">
                    <p className="text-muted-foreground text-[10px]">Current</p>
                    <p className="font-medium text-foreground">{opt.current}</p>
                  </div>
                  <div className="p-2 rounded-lg bg-emerald-500/5">
                    <p className="text-emerald-600 dark:text-emerald-400 text-[10px]">Optimized</p>
                    <p className="font-medium text-emerald-600 dark:text-emerald-400">{opt.optimized}</p>
                  </div>
                  <div className="p-2 rounded-lg bg-muted/30">
                    <p className="text-muted-foreground text-[10px]">Distance Saved</p>
                    <p className="font-medium text-emerald-600 dark:text-emerald-400">{opt.savings}</p>
                  </div>
                  <div className="p-2 rounded-lg bg-muted/30">
                    <p className="text-muted-foreground text-[10px]">Time Saved</p>
                    <p className="font-medium text-emerald-600 dark:text-emerald-400">{opt.timeSaved}</p>
                  </div>
                </div>
                <div className="flex items-start gap-1.5">
                  <TrendingUp className="w-3 h-3 text-amber-500 mt-0.5 flex-shrink-0" />
                  <p className="text-[11px] text-muted-foreground">{opt.suggestion}</p>
                </div>
                <button className="mt-3 w-full py-1.5 rounded-lg gradient-birla text-white text-[11px] font-medium hover:opacity-90 transition-opacity">
                  Apply Optimization
                </button>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Driver Management */}
      {activeTab === 'drivers' && (
        <motion.div variants={itemVariants} className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-semibold text-foreground flex items-center gap-2">
              <Car className="w-5 h-5 text-purple-500" />
              Driver Management
            </h3>
            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg gradient-birla text-white text-xs font-medium">
              <Plus className="w-3.5 h-3.5" /> Add Driver
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {drivers.map((driver) => (
              <div key={driver.id} className="rounded-xl border border-border bg-card p-4 hover:shadow-sm transition-all">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full gradient-birla-gold flex items-center justify-center text-sm font-bold text-birla-blue">
                    {driver.name.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-foreground truncate">{driver.name}</p>
                    <p className="text-[10px] text-muted-foreground">{driver.id}</p>
                  </div>
                  <span className={`px-2 py-0.5 rounded-full text-[9px] font-medium ${
                    driver.status === 'On Duty' ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' :
                    driver.status === 'Break' ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400' :
                    'bg-red-500/10 text-red-600 dark:text-red-400'
                  }`}>
                    {driver.status}
                  </span>
                </div>
                <div className="space-y-2 text-xs">
                  <div className="flex items-center gap-2">
                    <Shield className="w-3 h-3 text-muted-foreground" />
                    <span className="text-muted-foreground">License:</span>
                    <span className="font-mono text-foreground">{driver.license}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Route className="w-3 h-3 text-muted-foreground" />
                    <span className="text-muted-foreground">Route:</span>
                    <span className="text-foreground">{driver.route}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Bus className="w-3 h-3 text-muted-foreground" />
                    <span className="text-muted-foreground">Vehicle:</span>
                    <span className="font-mono text-foreground">{driver.vehicle}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-3 h-3 text-muted-foreground" />
                    <span className="text-foreground">{driver.phone}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Clock className="w-3 h-3 text-muted-foreground" />
                      <span className="text-muted-foreground">{driver.experience}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="text-amber-500">★</span>
                      <span className="font-medium text-foreground">{driver.rating}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Pickup Alerts */}
      {activeTab === 'alerts' && (
        <motion.div variants={itemVariants} className="space-y-4">
          <h3 className="text-base font-semibold text-foreground flex items-center gap-2">
            <BellRing className="w-5 h-5 text-amber-500" />
            Student Pickup & Drop Alerts
          </h3>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
            {pickupAlerts.map((alert) => (
              <div key={alert.id} className="rounded-xl border border-border bg-card p-4 hover:shadow-sm transition-all">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                      alert.type === 'Pickup' ? 'bg-birla-cyan/10 text-birla-cyan' : 'bg-purple-500/10 text-purple-500'
                    }`}>
                      {alert.type === 'Pickup' ? <Navigation className="w-4 h-4" /> : <MapPin className="w-4 h-4" />}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">{alert.student}</p>
                      <p className="text-[10px] text-muted-foreground">Class {alert.class} &bull; Route {alert.route}</p>
                    </div>
                  </div>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${
                    alert.status === 'Completed' ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' :
                    alert.status === 'Delayed' ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400' :
                    alert.status === 'In Transit' ? 'bg-blue-500/10 text-blue-600 dark:text-blue-400' :
                    'bg-red-500/10 text-red-600 dark:text-red-400'
                  }`}>
                    {alert.status}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs mb-3">
                  <div className="p-2 rounded-lg bg-muted/30">
                    <p className="text-muted-foreground text-[10px]">Type</p>
                    <p className="font-medium text-foreground">{alert.type}</p>
                  </div>
                  <div className="p-2 rounded-lg bg-muted/30">
                    <p className="text-muted-foreground text-[10px]">Stop</p>
                    <p className="font-medium text-foreground">{alert.stop}</p>
                  </div>
                  <div className="p-2 rounded-lg bg-muted/30">
                    <p className="text-muted-foreground text-[10px]">Time</p>
                    <p className="font-medium text-foreground">{alert.time}</p>
                  </div>
                  <div className="p-2 rounded-lg bg-muted/30">
                    <p className="text-muted-foreground text-[10px]">Parent Notified</p>
                    <p className={`font-medium ${alert.notified ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'}`}>
                      {alert.notified ? 'Yes' : 'No'}
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-[11px] text-muted-foreground">
                    <Phone className="w-3 h-3" />
                    {alert.parent} &bull; {alert.parentPhone}
                  </div>
                  {!alert.notified && (
                    <button className="flex items-center gap-1 px-2 py-1 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400 text-[10px] font-medium hover:bg-amber-500/20 transition-colors">
                      <Send className="w-3 h-3" /> Notify
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Transport Attendance */}
      {activeTab === 'attendance' && (
        <motion.div variants={itemVariants} className="space-y-4">
          <h3 className="text-base font-semibold text-foreground flex items-center gap-2">
            <UserCheck className="w-5 h-5 text-emerald-500" />
            Transport Attendance
          </h3>

          {/* Attendance Chart */}
          <div className="rounded-2xl border border-border bg-card p-5">
            <p className="text-xs text-muted-foreground mb-3">Route-wise Boarding & Absent Students - Today</p>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={routeAttendanceChart}>
                  <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'} />
                  <XAxis dataKey="route" tick={{ fontSize: 10 }} stroke={darkMode ? '#64748b' : '#94a3b8'} />
                  <YAxis tick={{ fontSize: 10 }} stroke={darkMode ? '#64748b' : '#94a3b8'} />
                  <Tooltip contentStyle={tooltipStyle} />
                  <Legend iconType="circle" wrapperStyle={{ fontSize: '11px' }} />
                  <Bar dataKey="boarded" fill="#22D3EE" radius={[4, 4, 0, 0]} name="Boarded" />
                  <Bar dataKey="absent" fill="#F59E0B" radius={[4, 4, 0, 0]} name="Absent" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Attendance by Route */}
          <div className="rounded-2xl border border-border bg-card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border bg-muted/30">
                    <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Route</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Total</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Boarded</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Deboarded</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Absent</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Attendance %</th>
                  </tr>
                </thead>
                <tbody>
                  {attendanceData.map((row) => (
                    <tr key={row.route} className="border-b border-border/50 hover:bg-muted/20 transition-colors">
                      <td className="px-4 py-3 text-sm font-mono text-birla-cyan">{row.route}</td>
                      <td className="px-4 py-3 text-sm text-foreground">{row.total}</td>
                      <td className="px-4 py-3 text-sm text-emerald-600 dark:text-emerald-400">{row.boarded}</td>
                      <td className="px-4 py-3 text-sm text-blue-600 dark:text-blue-400">{row.deboarded}</td>
                      <td className="px-4 py-3 text-sm text-amber-600 dark:text-amber-400">{row.absent}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <div className="w-16 h-1.5 rounded-full bg-muted overflow-hidden">
                            <div
                              className="h-full rounded-full"
                              style={{
                                width: `${row.percentage}%`,
                                backgroundColor: row.percentage >= 95 ? '#10B981' : row.percentage >= 90 ? '#F59E0B' : '#EF4444',
                              }}
                            />
                          </div>
                          <span className="text-xs text-foreground">{row.percentage}%</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Scan Logs */}
          <h4 className="text-sm font-semibold text-foreground flex items-center gap-2">
            <Radio className="w-4 h-4 text-birla-cyan" />
            RFID Scan Logs
          </h4>
          <div className="rounded-2xl border border-border bg-card overflow-hidden max-h-72 overflow-y-auto">
            <table className="w-full">
              <thead className="sticky top-0 bg-card">
                <tr className="border-b border-border bg-muted/30">
                  <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Student</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Route</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Type</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Time</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Stop</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Card ID</th>
                </tr>
              </thead>
              <tbody>
                {scanLogs.map((log) => (
                  <tr key={log.id} className="border-b border-border/50 hover:bg-muted/20 transition-colors">
                    <td className="px-4 py-2.5 text-sm text-foreground">{log.student}</td>
                    <td className="px-4 py-2.5 text-xs font-mono text-birla-cyan">{log.route}</td>
                    <td className="px-4 py-2.5">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${
                        log.type === 'Board' ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' : 'bg-purple-500/10 text-purple-600 dark:text-purple-400'
                      }`}>{log.type}</span>
                    </td>
                    <td className="px-4 py-2.5 text-xs text-foreground">{log.time}</td>
                    <td className="px-4 py-2.5 text-xs text-foreground">{log.stop}</td>
                    <td className="px-4 py-2.5 text-xs font-mono text-muted-foreground">{log.cardId}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      )}

      {/* Parent Live Tracking */}
      {activeTab === 'parent' && (
        <motion.div variants={itemVariants} className="space-y-4">
          <h3 className="text-base font-semibold text-foreground flex items-center gap-2">
            <Compass className="w-5 h-5 text-birla-cyan" />
            Parent Live Tracking Screen
          </h3>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {parentTrackingData.map((track) => (
              <div key={track.student} className="rounded-2xl border border-border bg-card p-5 gradient-card-blue">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl gradient-birla-gold flex items-center justify-center text-lg font-bold text-birla-blue">
                    {track.student.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-semibold text-foreground">{track.student}</h4>
                    <p className="text-[11px] text-muted-foreground">Class {track.class} &bull; Route {track.route} &bull; Bus {track.bus}</p>
                  </div>
                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-medium ${
                    track.status === 'En Route' ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' :
                    track.status.includes('Delayed') ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400' :
                    'bg-blue-500/10 text-blue-600 dark:text-blue-400'
                  }`}>
                    {track.status}
                  </span>
                </div>

                {/* Mini Map Placeholder */}
                <div className="rounded-xl bg-muted/20 border border-border/50 h-24 mb-4 flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 opacity-10">
                    {[...Array(4)].map((_, i) => (
                      <div key={`mh-${i}`} className="absolute w-full border-t border-border" style={{ top: `${(i + 1) * 25}%` }} />
                    ))}
                    {[...Array(5)].map((_, i) => (
                      <div key={`mv-${i}`} className="absolute h-full border-l border-border" style={{ left: `${(i + 1) * 20}%` }} />
                    ))}
                  </div>
                  <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 50" preserveAspectRatio="none">
                    <path d="M 10 35 Q 30 20 50 30 Q 70 40 90 15" fill="none" stroke="#22D3EE" strokeWidth="1" strokeDasharray="3,2" opacity="0.7" />
                  </svg>
                  <div className="absolute" style={{ left: '15%', top: '55%' }}>
                    <div className="w-4 h-4 rounded-full bg-emerald-500 flex items-center justify-center shadow">
                      <Bus className="w-2.5 h-2.5 text-white" />
                    </div>
                  </div>
                  <div className="absolute" style={{ right: '10%', top: '25%' }}>
                    <div className="w-4 h-4 rounded-full bg-red-500 flex items-center justify-center shadow">
                      <MapPin className="w-2.5 h-2.5 text-white" />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 text-xs mb-4">
                  <div className="p-2 rounded-lg bg-muted/30 text-center">
                    <p className="text-muted-foreground text-[10px]">Current Stop</p>
                    <p className="font-medium text-foreground text-[11px]">{track.currentStop}</p>
                  </div>
                  <div className="p-2 rounded-lg bg-muted/30 text-center">
                    <p className="text-muted-foreground text-[10px]">ETA</p>
                    <p className="font-medium text-foreground text-[11px]">{track.eta}</p>
                  </div>
                  <div className="p-2 rounded-lg bg-muted/30 text-center">
                    <p className="text-muted-foreground text-[10px]">Notified</p>
                    <p className={`font-medium text-[11px] ${track.parentNotified ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'}`}>
                      {track.parentNotified ? 'Yes' : 'No'}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg gradient-birla text-white text-xs font-medium hover:opacity-90 transition-opacity">
                    <Locate className="w-3.5 h-3.5" /> Track Live
                  </button>
                  <button className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg border border-border text-xs font-medium hover:bg-muted transition-colors">
                    <Bell className="w-3.5 h-3.5" /> Alerts
                  </button>
                  <button className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg border border-border text-xs font-medium hover:bg-muted transition-colors">
                    <Phone className="w-3.5 h-3.5" /> Call
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Notification Settings */}
          <div className="rounded-2xl border border-border bg-card p-5">
            <h4 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
              <Settings className="w-4 h-4 text-muted-foreground" />
              Parent Notification Settings
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {[
                { label: 'Bus Arriving (5 min)', desc: 'Alert when bus is 5 min away', enabled: true },
                { label: 'Pickup Confirmation', desc: 'Alert when child boards the bus', enabled: true },
                { label: 'Drop Confirmation', desc: 'Alert when child deboards the bus', enabled: true },
                { label: 'Delay Notification', desc: 'Alert if bus is delayed by 10+ min', enabled: true },
                { label: 'Route Change', desc: 'Alert if route is changed', enabled: false },
                { label: 'Speed Alert', desc: 'Alert if bus exceeds speed limit', enabled: false },
              ].map((setting) => (
                <div key={setting.label} className="rounded-xl border border-border p-3 flex items-start gap-3">
                  <div className={`w-5 h-5 rounded flex items-center justify-center flex-shrink-0 mt-0.5 ${
                    setting.enabled ? 'bg-emerald-500' : 'bg-muted'
                  }`}>
                    {setting.enabled && <CheckCircle2 className="w-3.5 h-3.5 text-white" />}
                  </div>
                  <div>
                    <p className="text-xs font-medium text-foreground">{setting.label}</p>
                    <p className="text-[10px] text-muted-foreground">{setting.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  )
}
