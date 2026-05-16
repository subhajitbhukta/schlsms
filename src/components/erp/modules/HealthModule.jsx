'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  HeartPulse, Shield, Activity, Users, Eye, Clock, CheckCircle2,
  AlertTriangle, XCircle, Search, Plus, Phone, Mail, Calendar,
  Syringe, Brain, Heart, AlertCircle, TrendingUp, Star,
  Thermometer, Pill, Stethoscope, Ambulance, Siren,
  FileText, UserCheck, ArrowUpRight, Zap, RefreshCw,
  BarChart3, Smile, Frown, Meh, Sun, Moon, Apple,
  Droplets, Wind, Baby, EyeOff, ShieldCheck, Download, MapPin
} from 'lucide-react'
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Legend, PieChart, Pie, Cell,
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis
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
  { label: 'Medical Records', value: '2,547', icon: FileText, color: 'text-birla-cyan bg-birla-cyan/10', change: 'All students covered' },
  { label: 'Vaccinated', value: '2,180', icon: Syringe, color: 'text-emerald-500 bg-emerald-500/10', change: '85.6% coverage' },
  { label: 'Counselling', value: '24', icon: Brain, color: 'text-purple-500 bg-purple-500/10', change: 'Active sessions' },
  { label: 'Emergency', value: '0', icon: Siren, color: 'text-red-500 bg-red-500/10', change: 'All clear' },
]

const medicalRecords = [
  { id: 'BOM-2025-001', name: 'Aarav Sharma', class: 'X-A', bloodGroup: 'B+', height: '165 cm', weight: '52 kg', bmi: '19.1', allergies: ['Dust', 'Pollen'], conditions: ['Mild Asthma'], medications: ['Inhaler (SOS)'], vision: '6/6', hearing: 'Normal', lastCheckup: 'Jan 2026', status: 'Healthy' },
  { id: 'BOM-2025-002', name: 'Priya Gupta', class: 'X-A', bloodGroup: 'A+', height: '158 cm', weight: '48 kg', bmi: '19.2', allergies: ['Nuts', 'Penicillin'], conditions: [], medications: [], vision: '6/9 (Corrected)', hearing: 'Normal', lastCheckup: 'Jan 2026', status: 'Healthy' },
  { id: 'BOM-2025-003', name: 'Arjun Reddy', class: 'IX-B', bloodGroup: 'O+', height: '162 cm', weight: '55 kg', bmi: '20.9', allergies: [], conditions: ['ADHD (Managed)'], medications: ['Methylphenidate 5mg'], vision: '6/6', hearing: 'Normal', lastCheckup: 'Feb 2026', status: 'Under Observation' },
  { id: 'BOM-2025-004', name: 'Ananya Iyer', class: 'VIII-A', bloodGroup: 'AB+', height: '152 cm', weight: '44 kg', bmi: '19.0', allergies: ['Lactose'], conditions: ['Lactose Intolerance'], medications: ['Lactase enzyme'], vision: '6/6', hearing: 'Normal', lastCheckup: 'Jan 2026', status: 'Healthy' },
  { id: 'BOM-2025-005', name: 'Rohan Patel', class: 'VII-A', bloodGroup: 'B-', height: '148 cm', weight: '50 kg', bmi: '22.8', allergies: [], conditions: ['Overweight'], medications: ['Diet plan'], vision: '6/9', hearing: 'Normal', lastCheckup: 'Feb 2026', status: 'Monitoring' },
  { id: 'BOM-2025-006', name: 'Ishita Banerjee', class: 'VI-B', bloodGroup: 'A-', height: '140 cm', weight: '36 kg', bmi: '18.4', allergies: ['Shellfish'], conditions: [], medications: [], vision: '6/6', hearing: 'Normal', lastCheckup: 'Jan 2026', status: 'Healthy' },
  { id: 'BOM-2025-007', name: 'Vivaan Kumar', class: 'V-A', bloodGroup: 'O-', height: '138 cm', weight: '34 kg', bmi: '17.9', allergies: ['Eggs'], conditions: ['Eczema'], medications: ['Moisturizer cream'], vision: '6/12 (Needs Correction)', hearing: 'Normal', lastCheckup: 'Jan 2026', status: 'Needs Follow-up' },
  { id: 'BOM-2025-008', name: 'Meera Nair', class: 'IV-A', bloodGroup: 'AB-', height: '132 cm', weight: '30 kg', bmi: '17.2', allergies: [], conditions: [], medications: [], vision: '6/6', hearing: 'Normal', lastCheckup: 'Jan 2026', status: 'Healthy' },
]

const vaccinationSchedule = [
  { vaccine: 'BCG', age: 'At Birth', completed: 2547, total: 2547, percentage: 100, drive: 'N/A', nextDue: '—' },
  { vaccine: 'OPV (0-5)', age: '0-6 months', completed: 2547, total: 2547, percentage: 100, drive: 'N/A', nextDue: '—' },
  { vaccine: 'DPT Booster-1', age: '5-6 years', completed: 2180, total: 2547, percentage: 86, drive: 'Completed', nextDue: 'Apr 2026' },
  { vaccine: 'MMR-2', age: '5-6 years', completed: 2310, total: 2547, percentage: 91, drive: 'Completed', nextDue: 'Jul 2026' },
  { vaccine: 'Tdap', age: '10-12 years', completed: 1520, total: 1890, percentage: 80, drive: 'In Progress', nextDue: 'Mar 15, 2026' },
  { vaccine: 'HPV (Girls)', age: '9-14 years', completed: 680, total: 1240, percentage: 55, drive: 'Scheduled', nextDue: 'Mar 20, 2026' },
  { vaccine: 'COVID-19 Booster', age: '12+ years', completed: 890, total: 1650, percentage: 54, drive: 'Scheduled', nextDue: 'Apr 5, 2026' },
  { vaccine: 'Typhoid Conjugate', age: 'All Students', completed: 1890, total: 2547, percentage: 74, drive: 'Upcoming', nextDue: 'Apr 2026' },
]

const upcomingDrives = [
  { id: 1, name: 'Tdap Vaccination Drive', date: 'Mar 15, 2026', target: '370 students', venue: 'School Auditorium', coordinator: 'Dr. Sunita Rao', status: 'Confirmed', pharma: 'Serum Institute' },
  { id: 2, name: 'HPV Vaccination (Girls)', date: 'Mar 20, 2026', target: '560 girls', venue: 'Medical Room', coordinator: 'Dr. Anita Deshmukh', status: 'Confirmed', pharma: 'MSD India' },
  { id: 3, name: 'COVID-19 Booster', date: 'Apr 5, 2026', target: '760 students', venue: 'School Auditorium', coordinator: 'Dr. Rajesh Menon', status: 'Planning', pharma: 'Bharat Biotech' },
  { id: 4, name: 'Typhoid Conjugate Drive', date: 'Apr 2026', target: '657 students', venue: 'TBD', coordinator: 'Dr. Sunita Rao', status: 'Planning', pharma: 'Bharat Biotech' },
]

const counsellorAppointments = [
  { id: 'APT-001', student: 'Arjun Reddy', class: 'IX-B', counsellor: 'Dr. Kavitha Menon', date: 'Mar 3, 2026', time: '10:00 AM', type: 'Academic Stress', session: '4th of 8', status: 'Scheduled' },
  { id: 'APT-002', student: 'Rohan Patel', class: 'VII-A', counsellor: 'Dr. Kavitha Menon', date: 'Mar 3, 2026', time: '11:30 AM', type: 'Self-Esteem', session: '2nd of 6', status: 'Scheduled' },
  { id: 'APT-003', student: 'Sneha Kapoor', class: 'XII-A', counsellor: 'Dr. Suresh Pillai', date: 'Mar 4, 2026', time: '9:00 AM', type: 'Career Guidance', session: '1st of 4', status: 'Scheduled' },
  { id: 'APT-004', student: 'Vivaan Kumar', class: 'V-A', counsellor: 'Dr. Suresh Pillai', date: 'Mar 4, 2026', time: '2:00 PM', type: 'Behavioral', session: '6th of 10', status: 'In Progress' },
  { id: 'APT-005', student: 'Priya Gupta', class: 'X-A', counsellor: 'Dr. Kavitha Menon', date: 'Feb 28, 2026', time: '10:00 AM', type: 'Anxiety', session: '3rd of 6', status: 'Completed' },
  { id: 'APT-006', student: 'Farhan Ali', class: 'XI-B', counsellor: 'Dr. Suresh Pillai', date: 'Feb 27, 2026', time: '11:00 AM', type: 'Social Adjustment', session: '5th of 8', status: 'Completed' },
  { id: 'APT-007', student: 'Ananya Iyer', class: 'VIII-A', counsellor: 'Dr. Kavitha Menon', date: 'Mar 5, 2026', time: '10:30 AM', type: 'Exam Anxiety', session: '1st of 4', status: 'Scheduled' },
  { id: 'APT-008', student: 'Devansh Gupta', class: 'VI-B', counsellor: 'Dr. Suresh Pillai', date: 'Mar 5, 2026', time: '3:00 PM', type: 'ADHD Support', session: '8th of 12', status: 'Scheduled' },
]

const wellnessScores = [
  { student: 'Aarav Sharma', class: 'X-A', overall: 88, mental: 85, physical: 92, social: 87, emotional: 84, academic: 90, trend: 'up' },
  { student: 'Priya Gupta', class: 'X-A', overall: 82, mental: 78, physical: 88, social: 85, emotional: 75, academic: 86, trend: 'up' },
  { student: 'Arjun Reddy', class: 'IX-B', overall: 72, mental: 65, physical: 80, social: 70, emotional: 68, academic: 78, trend: 'stable' },
  { student: 'Ananya Iyer', class: 'VIII-A', overall: 90, mental: 88, physical: 94, social: 92, emotional: 86, academic: 92, trend: 'up' },
  { student: 'Rohan Patel', class: 'VII-A', overall: 68, mental: 62, physical: 70, social: 75, emotional: 60, academic: 65, trend: 'down' },
  { student: 'Vivaan Kumar', class: 'V-A', overall: 74, mental: 70, physical: 78, social: 68, emotional: 72, academic: 76, trend: 'up' },
]

const mentalHealthIndicators = [
  { month: 'Sep', stress: 28, anxiety: 22, depression: 8, wellbeing: 72 },
  { month: 'Oct', stress: 32, anxiety: 25, depression: 10, wellbeing: 68 },
  { month: 'Nov', stress: 38, anxiety: 30, depression: 12, wellbeing: 62 },
  { month: 'Dec', stress: 25, anxiety: 18, depression: 6, wellbeing: 78 },
  { month: 'Jan', stress: 30, anxiety: 22, depression: 8, wellbeing: 74 },
  { month: 'Feb', stress: 35, anxiety: 28, depression: 10, wellbeing: 66 },
]

const activityTracking = [
  { day: 'Mon', sports: 320, yoga: 180, meditation: 150, outdoor: 280 },
  { day: 'Tue', sports: 290, yoga: 175, meditation: 140, outdoor: 260 },
  { day: 'Wed', sports: 340, yoga: 190, meditation: 160, outdoor: 300 },
  { day: 'Thu', sports: 280, yoga: 165, meditation: 145, outdoor: 250 },
  { day: 'Fri', sports: 350, yoga: 200, meditation: 170, outdoor: 310 },
  { day: 'Sat', sports: 400, yoga: 220, meditation: 180, outdoor: 350 },
]

const wellnessRadar = [
  { subject: 'Mental', A: 85, fullMark: 100 },
  { subject: 'Physical', A: 92, fullMark: 100 },
  { subject: 'Social', A: 87, fullMark: 100 },
  { subject: 'Emotional', A: 84, fullMark: 100 },
  { subject: 'Academic', A: 90, fullMark: 100 },
  { subject: 'Creative', A: 78, fullMark: 100 },
]

const emergencyContacts = [
  { role: 'School Nurse', name: 'Mrs. Sunita Rao', phone: '+91 98765 00001', available: '24/7' },
  { role: 'School Doctor', name: 'Dr. Rajesh Menon', phone: '+91 98765 00002', available: '8 AM - 4 PM' },
  { role: 'Chief Warden', name: 'Mr. Debasish Chatterjee', phone: '+91 98765 00003', available: '24/7' },
  { role: 'Principal', name: 'Dr. Meera Krishnan', phone: '+91 98765 00004', available: '8 AM - 5 PM' },
  { role: 'Ambulance Service', name: 'Singur Hospital', phone: '108', available: '24/7' },
  { role: 'Poison Control', name: 'National Helpline', phone: '1800-11-6117', available: '24/7' },
  { role: 'Mental Health Crisis', name: 'iCall Helpline', phone: '9152987821', available: '24/7' },
  { role: 'Nearest Hospital', name: 'Singur Block Hospital', phone: '+91 98765 00005', available: '24/7' },
]

const alertHistory = [
  { id: 'EA-001', date: 'Feb 15, 2026', type: 'Medical Emergency', student: 'Karan Mehta', class: 'IX-A', description: 'Severe allergic reaction - peanut exposure', action: 'Epinephrine administered, ambulance called, parent notified', resolvedBy: 'Mrs. Sunita Rao', resolution: 'Student stabilized, shifted to hospital', duration: '45 min' },
  { id: 'EA-002', date: 'Jan 22, 2026', type: 'Injury', student: 'Siddharth Nair', class: 'VII-A', description: 'Fractured arm during sports period', action: 'First aid applied, parent called, hospital visit arranged', resolvedBy: 'Dr. Rajesh Menon', resolution: 'Cast applied, follow-up scheduled', duration: '2 hrs' },
  { id: 'EA-003', date: 'Dec 10, 2025', type: 'Fainting', student: 'Pallavi Mishra', class: 'VI-B', description: 'Fainted during morning assembly', action: 'Moved to medical room, vitals checked, glucose given', resolvedBy: 'Mrs. Sunita Rao', resolution: 'Low blood sugar, recovered fully', duration: '30 min' },
  { id: 'EA-004', date: 'Nov 5, 2025', type: 'Asthma Attack', student: 'Aarav Sharma', class: 'X-A', description: 'Asthma attack triggered by dust during cleaning', action: 'Inhaler provided, nebulizer administered, parent notified', resolvedBy: 'Dr. Rajesh Menon', resolution: 'Stabilized within 15 minutes', duration: '20 min' },
]

const emergencyProtocol = [
  { step: 1, action: 'Assess the situation & ensure safety', icon: Shield, time: 'Immediate' },
  { step: 2, action: 'Call School Nurse / Doctor', icon: Phone, time: '< 1 min' },
  { step: 3, action: 'Administer First Aid', icon: HeartPulse, time: '< 3 min' },
  { step: 4, action: 'Notify Parents/Guardians', icon: Users, time: '< 5 min' },
  { step: 5, action: 'Call Ambulance if needed (108)', icon: Ambulance, time: '< 5 min' },
  { step: 6, action: 'Document the incident', icon: FileText, time: '< 30 min' },
  { step: 7, action: 'Follow-up & report to management', icon: CheckCircle2, time: '< 24 hrs' },
]

const vaccinationChart = [
  { vaccine: 'BCG', completed: 100 },
  { vaccine: 'OPV', completed: 100 },
  { vaccine: 'DPT', completed: 86 },
  { vaccine: 'MMR-2', completed: 91 },
  { vaccine: 'Tdap', completed: 80 },
  { vaccine: 'HPV', completed: 55 },
  { vaccine: 'COVID', completed: 54 },
  { vaccine: 'Typhoid', completed: 74 },
]

export default function HealthModule() {
  const { darkMode } = useAppStore()
  const [activeTab, setActiveTab] = useState('records')
  const [searchQuery, setSearchQuery] = useState('')

  const tabs = [
    { id: 'records', label: 'Medical Records', icon: HeartPulse },
    { id: 'vaccination', label: 'Vaccination', icon: Syringe },
    { id: 'counselling', label: 'Counselling', icon: Brain },
    { id: 'wellness', label: 'Wellness Dashboard', icon: Activity },
    { id: 'emergency', label: 'Emergency Alerts', icon: Siren },
  ]

  const tooltipStyle = {
    backgroundColor: darkMode ? '#1A2D4A' : '#fff',
    border: `1px solid ${darkMode ? 'rgba(255,255,255,0.1)' : '#e2e8f0'}`,
    borderRadius: '12px',
    fontSize: '12px',
    color: darkMode ? '#e2e8f0' : '#1e293b',
  }

  const filteredRecords = medicalRecords.filter((r) =>
    r.name.toLowerCase().includes(searchQuery.toLowerCase()) || r.id.toLowerCase().includes(searchQuery.toLowerCase())
  )

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

      {/* Medical Records */}
      {activeTab === 'records' && (
        <motion.div variants={itemVariants} className="space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <h3 className="text-base font-semibold text-foreground flex items-center gap-2">
              <HeartPulse className="w-5 h-5 text-red-500" />
              Student Health Cards
            </h3>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search student..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 rounded-xl border border-input bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-birla-gold/40 focus:border-birla-gold transition-all w-64"
                />
              </div>
              <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg gradient-birla text-white text-xs font-medium">
                <Plus className="w-3.5 h-3.5" /> Add Record
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {filteredRecords.map((record) => (
              <div key={record.id} className="rounded-2xl border border-border bg-card p-4 hover:shadow-md transition-all">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl gradient-birla-gold flex items-center justify-center text-sm font-bold text-birla-blue">
                    {record.name.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-foreground truncate">{record.name}</p>
                    <p className="text-[10px] text-muted-foreground">{record.id} &bull; Class {record.class}</p>
                  </div>
                  <span className={`px-2 py-0.5 rounded-full text-[9px] font-medium ${
                    record.status === 'Healthy' ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' :
                    record.status === 'Under Observation' ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400' :
                    record.status === 'Monitoring' ? 'bg-blue-500/10 text-blue-600 dark:text-blue-400' :
                    'bg-red-500/10 text-red-600 dark:text-red-400'
                  }`}>
                    {record.status}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs mb-3">
                  <div className="p-1.5 rounded-lg bg-red-500/5">
                    <p className="text-[9px] text-muted-foreground">Blood Group</p>
                    <p className="font-bold text-red-600 dark:text-red-400">{record.bloodGroup}</p>
                  </div>
                  <div className="p-1.5 rounded-lg bg-muted/30">
                    <p className="text-[9px] text-muted-foreground">BMI</p>
                    <p className="font-medium text-foreground">{record.bmi}</p>
                  </div>
                  <div className="p-1.5 rounded-lg bg-muted/30">
                    <p className="text-[9px] text-muted-foreground">Height / Weight</p>
                    <p className="font-medium text-foreground">{record.height} / {record.weight}</p>
                  </div>
                  <div className="p-1.5 rounded-lg bg-muted/30">
                    <p className="text-[9px] text-muted-foreground">Vision</p>
                    <p className="font-medium text-foreground">{record.vision}</p>
                  </div>
                </div>

                {/* Allergies */}
                {record.allergies.length > 0 && (
                  <div className="mb-2">
                    <p className="text-[9px] text-muted-foreground mb-1">Allergies</p>
                    <div className="flex flex-wrap gap-1">
                      {record.allergies.map((a) => (
                        <span key={a} className="px-1.5 py-0.5 rounded bg-red-500/10 text-red-600 dark:text-red-400 text-[9px]">{a}</span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Conditions */}
                {record.conditions.length > 0 && (
                  <div className="mb-2">
                    <p className="text-[9px] text-muted-foreground mb-1">Conditions</p>
                    <div className="flex flex-wrap gap-1">
                      {record.conditions.map((c) => (
                        <span key={c} className="px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-600 dark:text-amber-400 text-[9px]">{c}</span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Medications */}
                {record.medications.length > 0 && (
                  <div className="mb-2">
                    <p className="text-[9px] text-muted-foreground mb-1">Medications</p>
                    <div className="flex flex-wrap gap-1">
                      {record.medications.map((m) => (
                        <span key={m} className="px-1.5 py-0.5 rounded bg-blue-500/10 text-blue-600 dark:text-blue-400 text-[9px]">{m}</span>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-between text-[9px] text-muted-foreground mt-2 pt-2 border-t border-border/50">
                  <span>Last Checkup: {record.lastCheckup}</span>
                  <span className="flex items-center gap-0.5"><Stethoscope className="w-3 h-3" />{record.hearing}</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Vaccination Tracking */}
      {activeTab === 'vaccination' && (
        <motion.div variants={itemVariants} className="space-y-4">
          <h3 className="text-base font-semibold text-foreground flex items-center gap-2">
            <Syringe className="w-5 h-5 text-emerald-500" />
            Vaccination Tracking
          </h3>

          {/* Vaccination Chart */}
          <div className="rounded-2xl border border-border bg-card p-5">
            <p className="text-xs text-muted-foreground mb-3">Vaccination Coverage by Type (%)</p>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={vaccinationChart}>
                  <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'} />
                  <XAxis dataKey="vaccine" tick={{ fontSize: 10 }} stroke={darkMode ? '#64748b' : '#94a3b8'} />
                  <YAxis tick={{ fontSize: 10 }} stroke={darkMode ? '#64748b' : '#94a3b8'} domain={[0, 100]} />
                  <Tooltip contentStyle={tooltipStyle} />
                  <Bar dataKey="completed" radius={[4, 4, 0, 0]} name="Coverage %">
                    {vaccinationChart.map((entry, idx) => (
                      <Cell key={idx} fill={entry.completed >= 90 ? '#10B981' : entry.completed >= 70 ? '#22D3EE' : '#F59E0B'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Vaccination Schedule Table */}
          <div className="rounded-2xl border border-border bg-card overflow-hidden">
            <div className="p-4 border-b border-border">
              <h4 className="text-sm font-semibold text-foreground">Vaccination Schedule</h4>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border bg-muted/30">
                    <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Vaccine</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Age Group</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Completed</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Total</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Coverage</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Drive Status</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Next Due</th>
                  </tr>
                </thead>
                <tbody>
                  {vaccinationSchedule.map((vax) => (
                    <tr key={vax.vaccine} className="border-b border-border/50 hover:bg-muted/20 transition-colors">
                      <td className="px-4 py-3 text-sm font-medium text-foreground">{vax.vaccine}</td>
                      <td className="px-4 py-3 text-xs text-muted-foreground">{vax.age}</td>
                      <td className="px-4 py-3 text-sm text-foreground">{vax.completed.toLocaleString()}</td>
                      <td className="px-4 py-3 text-sm text-foreground">{vax.total.toLocaleString()}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <div className="w-16 h-1.5 rounded-full bg-muted overflow-hidden">
                            <div
                              className="h-full rounded-full"
                              style={{
                                width: `${vax.percentage}%`,
                                backgroundColor: vax.percentage >= 90 ? '#10B981' : vax.percentage >= 70 ? '#22D3EE' : vax.percentage >= 50 ? '#F59E0B' : '#EF4444',
                              }}
                            />
                          </div>
                          <span className="text-xs text-foreground">{vax.percentage}%</span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${
                          vax.drive === 'Completed' ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' :
                          vax.drive === 'In Progress' ? 'bg-blue-500/10 text-blue-600 dark:text-blue-400' :
                          vax.drive === 'Scheduled' ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400' :
                          vax.drive === 'Upcoming' ? 'bg-purple-500/10 text-purple-600 dark:text-purple-400' :
                          'bg-muted text-muted-foreground'
                        }`}>{vax.drive}</span>
                      </td>
                      <td className="px-4 py-3 text-xs text-foreground">{vax.nextDue}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Upcoming Drives */}
          <h4 className="text-sm font-semibold text-foreground flex items-center gap-2">
            <Calendar className="w-4 h-4 text-birla-gold" />
            Upcoming Vaccination Drives
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {upcomingDrives.map((drive) => (
              <div key={drive.id} className="rounded-xl border border-border bg-card p-4 hover:shadow-sm transition-all">
                <div className="flex items-center justify-between mb-3">
                  <span className={`px-2 py-0.5 rounded-full text-[9px] font-medium ${
                    drive.status === 'Confirmed' ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' :
                    'bg-amber-500/10 text-amber-600 dark:text-amber-400'
                  }`}>{drive.status}</span>
                  <Syringe className="w-4 h-4 text-birla-cyan" />
                </div>
                <h4 className="text-xs font-semibold text-foreground mb-2">{drive.name}</h4>
                <div className="space-y-1 text-[10px] text-muted-foreground">
                  <p className="flex items-center gap-1"><Calendar className="w-3 h-3" />{drive.date}</p>
                  <p className="flex items-center gap-1"><Users className="w-3 h-3" />{drive.target}</p>
                  <p className="flex items-center gap-1"><MapPin className="w-3 h-3" />{drive.venue}</p>
                  <p className="flex items-center gap-1"><Stethoscope className="w-3 h-3" />{drive.coordinator}</p>
                  <p className="flex items-center gap-1"><Pill className="w-3 h-3" />{drive.pharma}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Counsellor Appointments */}
      {activeTab === 'counselling' && (
        <motion.div variants={itemVariants} className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-semibold text-foreground flex items-center gap-2">
              <Brain className="w-5 h-5 text-purple-500" />
              Counsellor Appointments
            </h3>
            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg gradient-birla text-white text-xs font-medium">
              <Plus className="w-3.5 h-3.5" /> Schedule Appointment
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
            {[
              { label: 'Active Cases', value: '24', icon: Brain, color: 'text-purple-500 bg-purple-500/10' },
              { label: 'Sessions This Month', value: '68', icon: Users, color: 'text-birla-cyan bg-birla-cyan/10' },
              { label: 'Counsellors', value: '2', icon: Stethoscope, color: 'text-birla-gold bg-birla-gold/10' },
              { label: 'Avg Improvement', value: '+18%', icon: TrendingUp, color: 'text-emerald-500 bg-emerald-500/10' },
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

          <div className="rounded-2xl border border-border bg-card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border bg-muted/30">
                    <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Apt ID</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Student</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Counsellor</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Date & Time</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Type</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Session</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {counsellorAppointments.map((apt) => (
                    <tr key={apt.id} className="border-b border-border/50 hover:bg-muted/20 transition-colors">
                      <td className="px-4 py-3 text-xs font-mono text-birla-cyan">{apt.id}</td>
                      <td className="px-4 py-3">
                        <p className="text-sm font-medium text-foreground">{apt.student}</p>
                        <p className="text-[10px] text-muted-foreground">Class {apt.class}</p>
                      </td>
                      <td className="px-4 py-3 text-sm text-foreground">{apt.counsellor}</td>
                      <td className="px-4 py-3">
                        <p className="text-sm text-foreground">{apt.date}</p>
                        <p className="text-[10px] text-muted-foreground">{apt.time}</p>
                      </td>
                      <td className="px-4 py-3">
                        <span className="px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 text-[10px] font-medium">{apt.type}</span>
                      </td>
                      <td className="px-4 py-3 text-xs text-foreground">{apt.session}</td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${
                          apt.status === 'Scheduled' ? 'bg-blue-500/10 text-blue-600 dark:text-blue-400' :
                          apt.status === 'In Progress' ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' :
                          'bg-muted text-muted-foreground'
                        }`}>{apt.status}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>
      )}

      {/* Wellness Dashboard */}
      {activeTab === 'wellness' && (
        <motion.div variants={itemVariants} className="space-y-4">
          <h3 className="text-base font-semibold text-foreground flex items-center gap-2">
            <Activity className="w-5 h-5 text-birla-cyan" />
            Wellness Dashboard
          </h3>

          {/* Wellness Score Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {wellnessScores.map((ws) => (
              <div key={ws.student} className="rounded-2xl border border-border bg-card p-4 hover:shadow-sm transition-all">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg gradient-birla-gold flex items-center justify-center text-xs font-bold text-birla-blue">
                      {ws.student.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">{ws.student}</p>
                      <p className="text-[10px] text-muted-foreground">Class {ws.class}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    {ws.trend === 'up' ? <TrendingUp className="w-3.5 h-3.5 text-emerald-500" /> :
                     ws.trend === 'down' ? <TrendingUp className="w-3.5 h-3.5 text-red-500 rotate-180" /> :
                     <Activity className="w-3.5 h-3.5 text-amber-500" />}
                    <span className={`text-[10px] font-medium ${
                      ws.trend === 'up' ? 'text-emerald-600 dark:text-emerald-400' :
                      ws.trend === 'down' ? 'text-red-600 dark:text-red-400' :
                      'text-amber-600 dark:text-amber-400'
                    }`}>{ws.trend}</span>
                  </div>
                </div>

                {/* Overall Score */}
                <div className="flex items-center justify-center mb-3">
                  <div className="relative w-16 h-16">
                    <svg className="w-16 h-16 -rotate-90" viewBox="0 0 64 64">
                      <circle cx="32" cy="32" r="28" fill="none" stroke="currentColor" className="text-muted/30" strokeWidth="4" />
                      <circle cx="32" cy="32" r="28" fill="none" stroke={ws.overall >= 80 ? '#10B981' : ws.overall >= 70 ? '#22D3EE' : '#F59E0B'} strokeWidth="4" strokeDasharray={`${(ws.overall / 100) * 176} 176`} strokeLinecap="round" />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-sm font-bold text-foreground">{ws.overall}</span>
                    </div>
                  </div>
                </div>

                {/* Dimension Scores */}
                <div className="grid grid-cols-5 gap-1 text-center">
                  {[
                    { label: 'M', value: ws.mental, color: ws.mental >= 80 ? 'text-emerald-500' : ws.mental >= 65 ? 'text-amber-500' : 'text-red-500' },
                    { label: 'P', value: ws.physical, color: ws.physical >= 80 ? 'text-emerald-500' : ws.physical >= 65 ? 'text-amber-500' : 'text-red-500' },
                    { label: 'S', value: ws.social, color: ws.social >= 80 ? 'text-emerald-500' : ws.social >= 65 ? 'text-amber-500' : 'text-red-500' },
                    { label: 'E', value: ws.emotional, color: ws.emotional >= 80 ? 'text-emerald-500' : ws.emotional >= 65 ? 'text-amber-500' : 'text-red-500' },
                    { label: 'A', value: ws.academic, color: ws.academic >= 80 ? 'text-emerald-500' : ws.academic >= 65 ? 'text-amber-500' : 'text-red-500' },
                  ].map((dim) => (
                    <div key={dim.label}>
                      <p className={`text-xs font-bold ${dim.color}`}>{dim.value}</p>
                      <p className="text-[8px] text-muted-foreground">{dim.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Mental Health Indicators */}
            <div className="rounded-2xl border border-border bg-card p-5">
              <p className="text-xs text-muted-foreground mb-3">Mental Health Indicators (6-Month Trend)</p>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={mentalHealthIndicators}>
                    <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'} />
                    <XAxis dataKey="month" tick={{ fontSize: 10 }} stroke={darkMode ? '#64748b' : '#94a3b8'} />
                    <YAxis tick={{ fontSize: 10 }} stroke={darkMode ? '#64748b' : '#94a3b8'} domain={[0, 100]} />
                    <Tooltip contentStyle={tooltipStyle} />
                    <Legend iconType="circle" wrapperStyle={{ fontSize: '11px' }} />
                    <Line type="monotone" dataKey="stress" stroke="#EF4444" strokeWidth={2} dot={{ r: 3 }} name="Stress %" />
                    <Line type="monotone" dataKey="anxiety" stroke="#F59E0B" strokeWidth={2} dot={{ r: 3 }} name="Anxiety %" />
                    <Line type="monotone" dataKey="wellbeing" stroke="#10B981" strokeWidth={2} dot={{ r: 3 }} name="Wellbeing %" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Activity Tracking */}
            <div className="rounded-2xl border border-border bg-card p-5">
              <p className="text-xs text-muted-foreground mb-3">Weekly Activity Participation</p>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={activityTracking}>
                    <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'} />
                    <XAxis dataKey="day" tick={{ fontSize: 10 }} stroke={darkMode ? '#64748b' : '#94a3b8'} />
                    <YAxis tick={{ fontSize: 10 }} stroke={darkMode ? '#64748b' : '#94a3b8'} />
                    <Tooltip contentStyle={tooltipStyle} />
                    <Legend iconType="circle" wrapperStyle={{ fontSize: '11px' }} />
                    <Bar dataKey="sports" fill="#22D3EE" radius={[2, 2, 0, 0]} name="Sports" />
                    <Bar dataKey="yoga" fill="#C8A45C" radius={[2, 2, 0, 0]} name="Yoga" />
                    <Bar dataKey="meditation" fill="#8B5CF6" radius={[2, 2, 0, 0]} name="Meditation" />
                    <Bar dataKey="outdoor" fill="#10B981" radius={[2, 2, 0, 0]} name="Outdoor" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Wellness Radar for Top Student */}
          <div className="rounded-2xl border border-border bg-card p-5">
            <p className="text-xs text-muted-foreground mb-3">Wellness Radar - Ananya Iyer (Highest Score: 90)</p>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={wellnessRadar}>
                  <PolarGrid stroke={darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'} />
                  <PolarAngleAxis dataKey="subject" tick={{ fontSize: 10 }} stroke={darkMode ? '#94a3b8' : '#64748b'} />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fontSize: 8 }} />
                  <Radar name="Wellness Score" dataKey="A" stroke="#22D3EE" fill="#22D3EE" fillOpacity={0.3} />
                  <Tooltip contentStyle={tooltipStyle} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </motion.div>
      )}

      {/* Emergency Alerts */}
      {activeTab === 'emergency' && (
        <motion.div variants={itemVariants} className="space-y-4">
          <h3 className="text-base font-semibold text-foreground flex items-center gap-2">
            <Siren className="w-5 h-5 text-red-500" />
            Emergency Alerts & Protocols
          </h3>

          {/* Emergency Protocol */}
          <div className="rounded-2xl border-2 border-red-500/30 bg-red-500/5 p-5">
            <h4 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
              <Shield className="w-4 h-4 text-red-500" />
              Emergency Response Protocol
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {emergencyProtocol.map((step) => {
                const Icon = step.icon
                return (
                  <div key={step.step} className="rounded-xl border border-red-500/20 bg-card p-3">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-7 h-7 rounded-full bg-red-500 flex items-center justify-center text-white text-xs font-bold">
                        {step.step}
                      </div>
                      <Icon className="w-4 h-4 text-red-500" />
                    </div>
                    <p className="text-xs font-medium text-foreground mb-1">{step.action}</p>
                    <p className="text-[10px] text-red-600 dark:text-red-400 font-medium">{step.time}</p>
                  </div>
                )
              })}
            </div>
            <div className="flex items-center gap-3 mt-4 pt-4 border-t border-red-500/20">
              <button className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-red-500 text-white text-xs font-medium hover:bg-red-600 transition-colors animate-pulse-glow">
                <Siren className="w-3.5 h-3.5" /> TRIGGER EMERGENCY ALERT
              </button>
              <p className="text-[10px] text-red-600 dark:text-red-400">This will notify all staff, wardens, and emergency contacts immediately</p>
            </div>
          </div>

          {/* Emergency Contacts */}
          <div className="rounded-2xl border border-border bg-card p-5">
            <h4 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
              <Phone className="w-4 h-4 text-birla-cyan" />
              Emergency Contact Directory
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {emergencyContacts.map((contact) => (
                <div key={contact.role} className="rounded-xl border border-border p-3 hover:shadow-sm transition-all">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded-lg bg-red-500/10 flex items-center justify-center">
                      <Phone className="w-4 h-4 text-red-500" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-foreground">{contact.role}</p>
                      <p className="text-[10px] text-muted-foreground">{contact.available}</p>
                    </div>
                  </div>
                  <p className="text-xs text-foreground">{contact.name}</p>
                  <p className="text-sm font-mono font-bold text-birla-cyan">{contact.phone}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Alert History */}
          <div className="rounded-2xl border border-border bg-card overflow-hidden">
            <div className="p-4 border-b border-border flex items-center justify-between">
              <h4 className="text-sm font-semibold text-foreground flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-amber-500" />
                Emergency Alert History
              </h4>
              <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border text-xs font-medium hover:bg-muted transition-colors">
                <Download className="w-3.5 h-3.5" /> Export Report
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border bg-muted/30">
                    <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Alert ID</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Date</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Type</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Student</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Description</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Action Taken</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Resolved By</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Duration</th>
                  </tr>
                </thead>
                <tbody>
                  {alertHistory.map((alert) => (
                    <tr key={alert.id} className="border-b border-border/50 hover:bg-muted/20 transition-colors">
                      <td className="px-4 py-3 text-xs font-mono text-birla-cyan">{alert.id}</td>
                      <td className="px-4 py-3 text-xs text-foreground">{alert.date}</td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${
                          alert.type === 'Medical Emergency' ? 'bg-red-500/10 text-red-600 dark:text-red-400' :
                          alert.type === 'Injury' ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400' :
                          alert.type === 'Asthma Attack' ? 'bg-blue-500/10 text-blue-600 dark:text-blue-400' :
                          'bg-purple-500/10 text-purple-600 dark:text-purple-400'
                        }`}>{alert.type}</span>
                      </td>
                      <td className="px-4 py-3">
                        <p className="text-sm text-foreground">{alert.student}</p>
                        <p className="text-[10px] text-muted-foreground">{alert.class}</p>
                      </td>
                      <td className="px-4 py-3 text-xs text-foreground max-w-[200px]">{alert.description}</td>
                      <td className="px-4 py-3 text-xs text-foreground max-w-[200px]">{alert.action}</td>
                      <td className="px-4 py-3 text-xs text-foreground">{alert.resolvedBy}</td>
                      <td className="px-4 py-3 text-xs font-medium text-foreground">{alert.duration}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Current Status */}
          <div className="rounded-2xl border-2 border-emerald-500/30 bg-emerald-500/5 p-5">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6 text-emerald-500" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-foreground">All Clear - No Active Emergencies</h4>
                <p className="text-xs text-muted-foreground">Last emergency was on Feb 15, 2026. All medical supplies are stocked. Next audit scheduled for Mar 15, 2026.</p>
              </div>
              <div className="ml-auto text-right">
                <p className="text-xs text-muted-foreground">Emergency Kit Status</p>
                <p className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">Fully Stocked ✓</p>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  )
}
