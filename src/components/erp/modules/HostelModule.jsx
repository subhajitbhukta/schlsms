'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Building2, Users, Bed, Shield, Eye, Clock, CheckCircle2,
  AlertTriangle, XCircle, Search, Plus, Phone, Mail, MapPin,
  Calendar, Utensils, ClipboardList, UserCheck, DoorOpen,
  ArrowUpRight, TrendingUp, Star, MessageSquare, AlertCircle,
  UserX, UserPlus, LogIn, LogOut, Filter, Download, Settings,
  Coffee, Sun, Moon, Apple, Salad, Soup, Heart, Activity,
  Package, Wrench, FileText, IndianRupee
} from 'lucide-react'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
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
  { label: 'Rooms', value: '120', icon: DoorOpen, color: 'text-birla-cyan bg-birla-cyan/10', change: 'Across 4 floors' },
  { label: 'Capacity', value: '480', icon: Users, color: 'text-birla-gold bg-birla-gold/10', change: '4 per room' },
  { label: 'Occupied', value: '356', icon: Bed, color: 'text-emerald-500 bg-emerald-500/10', change: '74.2% occupancy' },
  { label: 'Wardens', value: '8', icon: Shield, color: 'text-purple-500 bg-purple-500/10', change: '2 per floor' },
]

const floors = [
  {
    floor: 1, name: 'Ground Floor - Junior Boys', warden: 'Mr. Debasish Chatterjee', rooms: [
      { number: 'G-01', capacity: 4, occupied: 4, students: ['Aarav Sharma', 'Vivaan Kumar', 'Aditya Singh', 'Rahul Das'], status: 'Full' },
      { number: 'G-02', capacity: 4, occupied: 3, students: ['Arjun Reddy', 'Karan Mehta', 'Prateek Joshi', '—'], status: 'Partial' },
      { number: 'G-03', capacity: 4, occupied: 4, students: ['Rohan Patel', 'Siddharth Nair', 'Vikram Malhotra', 'Amit Tiwari'], status: 'Full' },
      { number: 'G-04', capacity: 4, occupied: 2, students: ['Nikhil Rao', 'Suresh Pillai', '—', '—'], status: 'Partial' },
      { number: 'G-05', capacity: 4, occupied: 4, students: ['Devansh Gupta', 'Harsh Vardhan', 'Manish Kumar', 'Raj Verma'], status: 'Full' },
      { number: 'G-06', capacity: 4, occupied: 0, students: ['—', '—', '—', '—'], status: 'Vacant' },
    ]
  },
  {
    floor: 2, name: 'First Floor - Senior Boys', warden: 'Mr. Sujit Banerjee', rooms: [
      { number: 'F1-01', capacity: 4, occupied: 4, students: ['Sankar Ghosh', 'Debjit Roy', 'Tamal Pal', 'Anirban Das'], status: 'Full' },
      { number: 'F1-02', capacity: 4, occupied: 3, students: ['Rishav Mishra', 'Ayush Singh', 'Pranav Sharma', '—'], status: 'Partial' },
      { number: 'F1-03', capacity: 4, occupied: 4, students: ['Gaurav Jain', 'Mohit Agarwal', 'Rahul Saxena', 'Vivek Thakur'], status: 'Full' },
      { number: 'F1-04', capacity: 4, occupied: 4, students: ['Aman Verma', 'Chirag Patel', 'Dhruv Shah', 'Eshaan Khan'], status: 'Full' },
      { number: 'F1-05', capacity: 4, occupied: 1, students: ['Farhan Ali', '—', '—', '—'], status: 'Partial' },
      { number: 'F1-06', capacity: 4, occupied: 4, students: ['Gaurav Das', 'Hemant Rao', 'Ishaan Reddy', 'Jay Kumar'], status: 'Full' },
    ]
  },
  {
    floor: 3, name: 'Second Floor - Junior Girls', warden: 'Mrs. Sarmila Dey', rooms: [
      { number: 'F2-01', capacity: 4, occupied: 4, students: ['Priya Gupta', 'Kavya Joshi', 'Meera Nair', 'Sneha Dasgupta'], status: 'Full' },
      { number: 'F2-02', capacity: 4, occupied: 4, students: ['Ishita Banerjee', 'Riya Sen', 'Pallavi Mishra', 'Nisha Sharma'], status: 'Full' },
      { number: 'F2-03', capacity: 4, occupied: 3, students: ['Ananya Iyer', 'Divya Nair', 'Pooja Reddy', '—'], status: 'Partial' },
      { number: 'F2-04', capacity: 4, occupied: 4, students: ['Shreya Patel', 'Tanvi Joshi', 'Urmi Ghosh', 'Vidya Kumar'], status: 'Full' },
      { number: 'F2-05', capacity: 4, occupied: 2, students: ['Megha Singh', 'Neha Agarwal', '—', '—'], status: 'Partial' },
      { number: 'F2-06', capacity: 4, occupied: 4, students: ['Aarti Shah', 'Bhavna Rao', 'Chitra Jain', 'Deepa Verma'], status: 'Full' },
    ]
  },
  {
    floor: 4, name: 'Third Floor - Senior Girls', warden: 'Mrs. Ratna Mukherjee', rooms: [
      { number: 'F3-01', capacity: 4, occupied: 4, students: ['Sneha Kapoor', 'Ritu Sharma', 'Nandini Iyer', 'Priti Desai'], status: 'Full' },
      { number: 'F3-02', capacity: 4, occupied: 3, students: ['Kavitha Menon', 'Lata Nair', 'Meena Pillai', '—'], status: 'Partial' },
      { number: 'F3-03', capacity: 4, occupied: 4, students: ['Sunita Kumari', 'Anjali Roy', 'Barkha Jain', 'Chandni Gupta'], status: 'Full' },
      { number: 'F3-04', capacity: 4, occupied: 2, students: ['Diksha Patel', 'Esha Banerjee', '—', '—'], status: 'Partial' },
      { number: 'F3-05', capacity: 4, occupied: 4, students: ['Falguni Das', 'Gargi Sen', 'Hema Sharma', 'Indu Verma'], status: 'Full' },
      { number: 'F3-06', capacity: 4, occupied: 0, students: ['—', '—', '—', '—'], status: 'Vacant' },
    ]
  },
]

const visitors = [
  { id: 'V-001', name: 'Mr. Rakesh Sharma', purpose: 'Parent Visit', hostStudent: 'Aarav Sharma', hostRoom: 'G-01', inTime: '10:00 AM', outTime: '12:30 PM', relation: 'Father', phone: '+91 98765 43210', approval: 'Approved' },
  { id: 'V-002', name: 'Mrs. Sunita Gupta', purpose: 'Medical Visit', hostStudent: 'Priya Gupta', hostRoom: 'F2-01', inTime: '2:00 PM', outTime: '3:15 PM', relation: 'Mother', phone: '+91 87654 32109', approval: 'Approved' },
  { id: 'V-003', name: 'Mr. Jignesh Patel', purpose: 'Personal Belongings', hostStudent: 'Rohan Patel', hostRoom: 'G-03', inTime: '4:00 PM', outTime: '—', relation: 'Father', phone: '+91 54321 09876', approval: 'Approved' },
  { id: 'V-004', name: 'Mr. Suresh Kumar', purpose: 'Fee Payment Discussion', hostStudent: 'Vivaan Kumar', hostRoom: 'G-01', inTime: '—', outTime: '—', relation: 'Uncle', phone: '+91 32109 87654', approval: 'Pending' },
  { id: 'V-005', name: 'Mrs. Ruma Banerjee', purpose: 'Weekend Pickup', hostStudent: 'Ishita Banerjee', hostRoom: 'F2-02', inTime: '5:00 PM', outTime: '5:20 PM', relation: 'Mother', phone: '+91 43210 98765', approval: 'Approved' },
  { id: 'V-006', name: 'Mr. Venkat Reddy', purpose: 'Academic Discussion', hostStudent: 'Arjun Reddy', hostRoom: 'G-02', inTime: '—', outTime: '—', relation: 'Father', phone: '+91 76543 21098', approval: 'Rejected' },
  { id: 'V-007', name: 'Dr. Meena Iyer', purpose: 'Health Checkup', hostStudent: 'Ananya Iyer', hostRoom: 'F2-03', inTime: '9:00 AM', outTime: '9:45 AM', relation: 'Aunt (Doctor)', phone: '+91 65432 10987', approval: 'Approved' },
]

const attendanceByFloor = [
  { floor: 'Ground', present: 67, absent: 5, total: 72, warden: 'Mr. Chatterjee' },
  { floor: '1st Floor', present: 78, absent: 4, total: 82, warden: 'Mr. Banerjee' },
  { floor: '2nd Floor', present: 85, absent: 2, total: 87, warden: 'Mrs. Dey' },
  { floor: '3rd Floor', present: 71, absent: 6, total: 77, warden: 'Mrs. Mukherjee' },
]

const absentStudents = [
  { student: 'Rahul Das', room: 'G-01', floor: 'Ground', reason: 'Home Visit', since: 'Feb 28', expected: 'Mar 3' },
  { student: 'Nikhil Rao', room: 'G-04', floor: 'Ground', reason: 'Medical Leave', since: 'Mar 1', expected: 'Mar 5' },
  { student: 'Farhan Ali', room: 'F1-05', floor: '1st', reason: 'Family Function', since: 'Feb 27', expected: 'Mar 4' },
  { student: 'Pooja Reddy', room: 'F2-03', floor: '2nd', reason: 'Fever', since: 'Mar 1', expected: 'Mar 3' },
  { student: 'Megha Singh', room: 'F2-05', floor: '2nd', reason: 'Home Visit', since: 'Feb 28', expected: 'Mar 2' },
  { student: 'Meena Pillai', room: 'F3-02', floor: '3rd', reason: 'Medical Appointment', since: 'Mar 1', expected: 'Mar 2' },
  { student: 'Diksha Patel', room: 'F3-04', floor: '3rd', reason: 'Family Emergency', since: 'Feb 27', expected: 'Mar 6' },
  { student: 'Esha Banerjee', room: 'F3-04', floor: '3rd', reason: 'Home Visit', since: 'Mar 1', expected: 'Mar 3' },
]

const weeklyMenu = [
  { day: 'Monday', breakfast: 'Puri + Aloo Sabzi + Tea', lunch: 'Rice + Dal + Chicken Curry + Salad', snacks: 'Samosa + Tea', dinner: 'Roti + Paneer Butter Masala + Rice' },
  { day: 'Tuesday', breakfast: 'Idli + Sambhar + Chutney', lunch: 'Rice + Fish Curry + Mixed Veg + Dal', snacks: 'Bread Pakora + Tea', dinner: 'Roti + Chole + Jeera Rice + Raita' },
  { day: 'Wednesday', breakfast: 'Paratha + Curd + Pickle', lunch: 'Rice + Mutton Curry + Aloo Gobi + Dal', snacks: 'Vada + Tea', dinner: 'Roti + Egg Curry + Fried Rice' },
  { day: 'Thursday', breakfast: 'Dosa + Sambhar + Chutney', lunch: 'Rice + Chicken Biryani + Raita + Salad', snacks: 'Cutlet + Tea', dinner: 'Roti + Dal Makhani + Pulao' },
  { day: 'Friday', breakfast: 'Upma + Coconut Chutney + Tea', lunch: 'Rice + Fish Fry + Dal + Bhaja', snacks: 'Spring Roll + Tea', dinner: 'Roti + Paneer Tikka Masala + Naan' },
  { day: 'Saturday', breakfast: 'Chole Bhature + Lassi', lunch: 'Rice + Egg Curry + Mixed Veg + Dal', snacks: 'Momos + Sauce', dinner: 'Roti + Chicken Korma + Biryani' },
  { day: 'Sunday', breakfast: 'Aloo Paratha + Butter + Curd', lunch: 'Veg Thali Special (Festival Menu)', snacks: 'Cake + Ice Cream', dinner: 'Non-Veg Thali Special (Festival Menu)' },
]

const dietaryRestrictions = [
  { student: 'Aarav Sharma', room: 'G-01', restriction: 'Vegetarian', allergy: 'None', note: 'Prefers less spicy' },
  { student: 'Priya Gupta', room: 'F2-01', restriction: 'Vegetarian', allergy: 'Nuts', note: 'Strict no-nut diet' },
  { student: 'Arjun Reddy', room: 'G-02', restriction: 'Non-Vegetarian', allergy: 'Shellfish', note: 'No prawns/crab' },
  { student: 'Ananya Iyer', room: 'F2-03', restriction: 'Vegetarian', allergy: 'Lactose Intolerant', note: 'Needs soy milk alternative' },
  { student: 'Ishita Banerjee', room: 'F2-02', restriction: 'Non-Vegetarian', allergy: 'None', note: 'No pork' },
  { student: 'Farhan Ali', room: 'F1-05', restriction: 'Halal Only', allergy: 'None', note: 'Requires halal certification' },
  { student: 'Megha Singh', room: 'F2-05', restriction: 'Vegan', allergy: 'Dairy + Eggs', note: 'Strict vegan diet' },
]

const messFeedback = [
  { date: 'Mar 1, 2026', student: 'Aarav Sharma', meal: 'Lunch', rating: 4, comment: 'Chicken curry was excellent today!' },
  { date: 'Mar 1, 2026', student: 'Priya Gupta', meal: 'Breakfast', rating: 3, comment: 'Idli could be softer.' },
  { date: 'Feb 28, 2026', student: 'Arjun Reddy', meal: 'Dinner', rating: 5, comment: 'Egg curry was delicious!' },
  { date: 'Feb 28, 2026', student: 'Ananya Iyer', meal: 'Lunch', rating: 2, comment: 'Vegetarian options were limited.' },
  { date: 'Feb 27, 2026', student: 'Rohan Patel', meal: 'Snacks', rating: 4, comment: 'Samosa was hot and crispy.' },
  { date: 'Feb 27, 2026', student: 'Ishita Banerjee', meal: 'Dinner', rating: 3, comment: 'Rice was undercooked.' },
]

const inventory = [
  { id: 'INV-001', item: 'Bed Frame (Single)', category: 'Furniture', quantity: 120, condition: 'Good', lastAudit: 'Jan 2026', location: 'All Rooms', cost: '₹4,500' },
  { id: 'INV-002', item: 'Mattress (4 inch)', category: 'Furniture', quantity: 120, condition: 'Good', lastAudit: 'Jan 2026', location: 'All Rooms', cost: '₹2,800' },
  { id: 'INV-003', item: 'Study Table', category: 'Furniture', quantity: 120, condition: 'Fair', lastAudit: 'Jan 2026', location: 'All Rooms', cost: '₹3,200' },
  { id: 'INV-004', item: 'Almirah (4-door)', category: 'Furniture', quantity: 30, condition: 'Good', lastAudit: 'Jan 2026', location: 'All Rooms', cost: '₹8,500' },
  { id: 'INV-005', item: 'Ceiling Fan', category: 'Appliance', quantity: 120, condition: 'Good', lastAudit: 'Dec 2025', location: 'All Rooms', cost: '₹1,800' },
  { id: 'INV-006', item: 'Air Conditioner (1.5T)', category: 'Appliance', quantity: 60, condition: 'Good', lastAudit: 'Feb 2026', location: 'Senior Rooms', cost: '₹32,000' },
  { id: 'INV-007', item: 'Bed Sheet Set', category: 'Linen', quantity: 240, condition: 'Good', lastAudit: 'Jan 2026', location: 'Linen Store', cost: '₹650' },
  { id: 'INV-008', item: 'Pillow with Cover', category: 'Linen', quantity: 240, condition: 'Fair', lastAudit: 'Jan 2026', location: 'Linen Store', cost: '₹350' },
  { id: 'INV-009', item: 'Bucket & Mug Set', category: 'Utility', quantity: 120, condition: 'Good', lastAudit: 'Feb 2026', location: 'All Rooms', cost: '₹180' },
  { id: 'INV-010', item: 'Fire Extinguisher', category: 'Safety', quantity: 16, condition: 'Excellent', lastAudit: 'Feb 2026', location: 'Corridors', cost: '₹2,200' },
  { id: 'INV-011', item: 'First Aid Kit', category: 'Safety', quantity: 8, condition: 'Good', lastAudit: 'Mar 2026', location: 'Warden Office', cost: '₹850' },
  { id: 'INV-012', item: 'Water Purifier', category: 'Appliance', quantity: 8, condition: 'Good', lastAudit: 'Feb 2026', location: 'Each Floor', cost: '₹15,000' },
]

const floorAttendanceChart = [
  { floor: 'Ground', present: 67, absent: 5 },
  { floor: '1st', present: 78, absent: 4 },
  { floor: '2nd', present: 85, absent: 2 },
  { floor: '3rd', present: 71, absent: 6 },
]

const occupancyData = [
  { name: 'Occupied', value: 356, color: '#22D3EE' },
  { name: 'Vacant', value: 124, color: '#C8A45C' },
]

export default function HostelModule() {
  const { darkMode } = useAppStore()
  const [activeTab, setActiveTab] = useState('rooms')
  const [selectedFloor, setSelectedFloor] = useState(0)
  const [menuDay, setMenuDay] = useState(new Date().getDay() === 0 ? 6 : new Date().getDay() - 1)

  const tabs = [
    { id: 'rooms', label: 'Room Allocation', icon: Bed },
    { id: 'visitors', label: 'Visitor Management', icon: LogIn },
    { id: 'attendance', label: 'Hostel Attendance', icon: UserCheck },
    { id: 'mess', label: 'Mess Management', icon: Utensils },
    { id: 'inventory', label: 'Inventory', icon: Package },
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

      {/* Room Allocation */}
      {activeTab === 'rooms' && (
        <motion.div variants={itemVariants} className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-semibold text-foreground flex items-center gap-2">
              <Bed className="w-5 h-5 text-birla-cyan" />
              Room Allocation
            </h3>
            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg gradient-birla text-white text-xs font-medium">
              <Plus className="w-3.5 h-3.5" /> Allocate Room
            </button>
          </div>

          {/* Floor Selector */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2">
            {floors.map((floor, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedFloor(idx)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                  selectedFloor === idx
                    ? 'gradient-birla-gold text-birla-blue shadow-md'
                    : 'border border-border text-muted-foreground hover:bg-muted'
                }`}
              >
                <Building2 className="w-3.5 h-3.5" />
                Floor {floor.floor}
              </button>
            ))}
          </div>

          {/* Floor Info */}
          <div className="rounded-2xl border border-border bg-card p-4 gradient-card-blue">
            <div className="flex items-center justify-between mb-1">
              <h4 className="text-sm font-semibold text-foreground">{floors[selectedFloor].name}</h4>
              <div className="flex items-center gap-2">
                <span className="text-[10px] text-muted-foreground">Warden: {floors[selectedFloor].warden}</span>
              </div>
            </div>
            <div className="flex items-center gap-4 text-xs">
              <span className="text-emerald-600 dark:text-emerald-400">{floors[selectedFloor].rooms.filter(r => r.status === 'Full').length} Full</span>
              <span className="text-amber-600 dark:text-amber-400">{floors[selectedFloor].rooms.filter(r => r.status === 'Partial').length} Partial</span>
              <span className="text-muted-foreground">{floors[selectedFloor].rooms.filter(r => r.status === 'Vacant').length} Vacant</span>
            </div>
          </div>

          {/* Room Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {floors[selectedFloor].rooms.map((room) => (
              <div key={room.number} className={`rounded-xl border p-3 hover:shadow-sm transition-all ${
                room.status === 'Full' ? 'border-emerald-500/30 bg-emerald-500/5' :
                room.status === 'Partial' ? 'border-amber-500/30 bg-amber-500/5' :
                'border-border bg-card'
              }`}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-foreground">{room.number}</span>
                  <span className={`px-1.5 py-0.5 rounded-full text-[8px] font-medium ${
                    room.status === 'Full' ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' :
                    room.status === 'Partial' ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400' :
                    'bg-muted text-muted-foreground'
                  }`}>{room.status}</span>
                </div>
                <div className="flex items-center gap-0.5 mb-2">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className={`w-5 h-3 rounded-sm ${i < room.occupied ? 'bg-birla-cyan/60' : 'bg-muted/40'}`} />
                  ))}
                  <span className="text-[9px] text-muted-foreground ml-1">{room.occupied}/{room.capacity}</span>
                </div>
                <div className="space-y-0.5">
                  {room.students.map((s, i) => (
                    <p key={i} className="text-[9px] text-foreground truncate">{s}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Occupancy Chart */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="rounded-2xl border border-border bg-card p-5">
              <p className="text-xs text-muted-foreground mb-3">Overall Occupancy</p>
              <div className="h-48 flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={occupancyData} cx="50%" cy="50%" innerRadius={50} outerRadius={75} dataKey="value" label={({ name, value }) => `${name}: ${value}`}>
                      {occupancyData.map((entry, idx) => (
                        <Cell key={idx} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={tooltipStyle} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div className="rounded-2xl border border-border bg-card p-5">
              <p className="text-xs text-muted-foreground mb-3">Floor-wise Attendance Today</p>
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={floorAttendanceChart}>
                    <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'} />
                    <XAxis dataKey="floor" tick={{ fontSize: 10 }} stroke={darkMode ? '#64748b' : '#94a3b8'} />
                    <YAxis tick={{ fontSize: 10 }} stroke={darkMode ? '#64748b' : '#94a3b8'} />
                    <Tooltip contentStyle={tooltipStyle} />
                    <Legend iconType="circle" wrapperStyle={{ fontSize: '11px' }} />
                    <Bar dataKey="present" fill="#22D3EE" radius={[4, 4, 0, 0]} name="Present" />
                    <Bar dataKey="absent" fill="#F59E0B" radius={[4, 4, 0, 0]} name="Absent" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Visitor Management */}
      {activeTab === 'visitors' && (
        <motion.div variants={itemVariants} className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-semibold text-foreground flex items-center gap-2">
              <LogIn className="w-5 h-5 text-birla-gold" />
              Visitor Management
            </h3>
            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg gradient-birla text-white text-xs font-medium">
              <Plus className="w-3.5 h-3.5" /> Log Visitor
            </button>
          </div>

          <div className="rounded-2xl border border-border bg-card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border bg-muted/30">
                    <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Visitor ID</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Visitor Name</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Purpose</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Host Student</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Room</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Relation</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">In Time</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Out Time</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Approval</th>
                  </tr>
                </thead>
                <tbody>
                  {visitors.map((visitor) => (
                    <tr key={visitor.id} className="border-b border-border/50 hover:bg-muted/20 transition-colors">
                      <td className="px-4 py-3 text-xs font-mono text-birla-cyan">{visitor.id}</td>
                      <td className="px-4 py-3">
                        <div>
                          <p className="text-sm font-medium text-foreground">{visitor.name}</p>
                          <p className="text-[10px] text-muted-foreground">{visitor.phone}</p>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm text-foreground">{visitor.purpose}</td>
                      <td className="px-4 py-3 text-sm text-foreground">{visitor.hostStudent}</td>
                      <td className="px-4 py-3 text-xs font-mono text-foreground">{visitor.hostRoom}</td>
                      <td className="px-4 py-3 text-sm text-foreground">{visitor.relation}</td>
                      <td className="px-4 py-3 text-xs text-foreground">{visitor.inTime}</td>
                      <td className="px-4 py-3 text-xs text-foreground">{visitor.outTime}</td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${
                          visitor.approval === 'Approved' ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' :
                          visitor.approval === 'Pending' ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400' :
                          'bg-red-500/10 text-red-600 dark:text-red-400'
                        }`}>
                          {visitor.approval}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Visitor Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { label: 'Today\'s Visitors', value: '7', icon: LogIn, color: 'text-birla-cyan bg-birla-cyan/10' },
              { label: 'Currently Inside', value: '1', icon: Eye, color: 'text-amber-500 bg-amber-500/10' },
              { label: 'Pending Approval', value: '1', icon: Clock, color: 'text-red-500 bg-red-500/10' },
              { label: 'This Month Total', value: '89', icon: Users, color: 'text-purple-500 bg-purple-500/10' },
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

      {/* Hostel Attendance */}
      {activeTab === 'attendance' && (
        <motion.div variants={itemVariants} className="space-y-4">
          <h3 className="text-base font-semibold text-foreground flex items-center gap-2">
            <UserCheck className="w-5 h-5 text-emerald-500" />
            Hostel Attendance
          </h3>

          {/* Floor Attendance */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {attendanceByFloor.map((floor) => (
              <div key={floor.floor} className="rounded-xl border border-border bg-card p-4">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-sm font-semibold text-foreground">{floor.floor} Floor</h4>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[10px] font-medium">
                    {Math.round((floor.present / floor.total) * 100)}%
                  </span>
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex-1 h-2 rounded-full bg-muted overflow-hidden">
                    <div
                      className="h-full rounded-full bg-emerald-500"
                      style={{ width: `${(floor.present / floor.total) * 100}%` }}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  <div className="p-1.5 rounded-lg bg-emerald-500/5 text-center">
                    <p className="font-semibold text-emerald-600 dark:text-emerald-400">{floor.present}</p>
                    <p className="text-[9px] text-muted-foreground">Present</p>
                  </div>
                  <div className="p-1.5 rounded-lg bg-amber-500/5 text-center">
                    <p className="font-semibold text-amber-600 dark:text-amber-400">{floor.absent}</p>
                    <p className="text-[9px] text-muted-foreground">Absent</p>
                  </div>
                  <div className="p-1.5 rounded-lg bg-muted/30 text-center">
                    <p className="font-semibold text-foreground">{floor.total}</p>
                    <p className="text-[9px] text-muted-foreground">Total</p>
                  </div>
                </div>
                <p className="text-[10px] text-muted-foreground mt-2">Warden: {floor.warden}</p>
              </div>
            ))}
          </div>

          {/* Absent Students Alert */}
          <div className="rounded-2xl border border-amber-500/20 bg-amber-500/5 p-5">
            <h4 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-500" />
              Absent Students Alert
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {absentStudents.map((abs) => (
                <div key={abs.student} className="rounded-xl border border-border bg-card p-3">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-xs font-semibold text-foreground">{abs.student}</p>
                    <span className="px-1.5 py-0.5 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 text-[8px]">Absent</span>
                  </div>
                  <div className="space-y-1 text-[10px] text-muted-foreground">
                    <p>Room: {abs.room} &bull; Floor: {abs.floor}</p>
                    <p>Reason: {abs.reason}</p>
                    <p>Since: {abs.since} &bull; Expected: {abs.expected}</p>
                  </div>
                  <button className="mt-2 w-full py-1 rounded-lg border border-amber-500/30 text-amber-600 dark:text-amber-400 text-[9px] font-medium hover:bg-amber-500/10 transition-colors">
                    Notify Parent
                  </button>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* Mess Management */}
      {activeTab === 'mess' && (
        <motion.div variants={itemVariants} className="space-y-4">
          <h3 className="text-base font-semibold text-foreground flex items-center gap-2">
            <Utensils className="w-5 h-5 text-birla-gold" />
            Mess Management
          </h3>

          {/* Weekly Menu */}
          <div className="rounded-2xl border border-border bg-card overflow-hidden">
            <div className="p-4 border-b border-border">
              <h4 className="text-sm font-semibold text-foreground mb-1">Weekly Menu</h4>
              <p className="text-[10px] text-muted-foreground">Menu for the current week (highlighted = today)</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border bg-muted/30">
                    <th className="text-left px-4 py-2.5 text-xs font-semibold text-muted-foreground">Day</th>
                    <th className="text-left px-4 py-2.5 text-xs font-semibold text-muted-foreground"><span className="flex items-center gap-1"><Coffee className="w-3 h-3" />Breakfast</span></th>
                    <th className="text-left px-4 py-2.5 text-xs font-semibold text-muted-foreground"><span className="flex items-center gap-1"><Sun className="w-3 h-3" />Lunch</span></th>
                    <th className="text-left px-4 py-2.5 text-xs font-semibold text-muted-foreground"><span className="flex items-center gap-1"><Apple className="w-3 h-3" />Snacks</span></th>
                    <th className="text-left px-4 py-2.5 text-xs font-semibold text-muted-foreground"><span className="flex items-center gap-1"><Moon className="w-3 h-3" />Dinner</span></th>
                  </tr>
                </thead>
                <tbody>
                  {weeklyMenu.map((day, idx) => (
                    <tr key={day.day} className={`border-b border-border/50 hover:bg-muted/20 transition-colors ${idx === menuDay ? 'bg-birla-cyan/5' : ''}`}>
                      <td className="px-4 py-3 text-sm font-medium text-foreground">{day.day}</td>
                      <td className="px-4 py-3 text-xs text-foreground">{day.breakfast}</td>
                      <td className="px-4 py-3 text-xs text-foreground">{day.lunch}</td>
                      <td className="px-4 py-3 text-xs text-foreground">{day.snacks}</td>
                      <td className="px-4 py-3 text-xs text-foreground">{day.dinner}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Dietary Restrictions & Feedback */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Dietary Restrictions */}
            <div className="rounded-2xl border border-border bg-card p-5">
              <h4 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                <Heart className="w-4 h-4 text-red-500" />
                Dietary Restrictions & Allergies
              </h4>
              <div className="space-y-2 max-h-72 overflow-y-auto">
                {dietaryRestrictions.map((dr) => (
                  <div key={dr.student} className="rounded-lg border border-border/50 p-3 hover:bg-muted/10 transition-colors">
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-xs font-semibold text-foreground">{dr.student}</p>
                      <span className="text-[9px] text-muted-foreground">Room: {dr.room}</span>
                    </div>
                    <div className="flex items-center gap-2 text-[10px]">
                      <span className={`px-1.5 py-0.5 rounded ${
                        dr.restriction === 'Vegetarian' ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' :
                        dr.restriction === 'Vegan' ? 'bg-green-500/10 text-green-600 dark:text-green-400' :
                        dr.restriction === 'Halal Only' ? 'bg-blue-500/10 text-blue-600 dark:text-blue-400' :
                        'bg-orange-500/10 text-orange-600 dark:text-orange-400'
                      }`}>{dr.restriction}</span>
                      {dr.allergy !== 'None' && (
                        <span className="px-1.5 py-0.5 rounded bg-red-500/10 text-red-600 dark:text-red-400">{dr.allergy}</span>
                      )}
                    </div>
                    {dr.note && <p className="text-[9px] text-muted-foreground mt-1">Note: {dr.note}</p>}
                  </div>
                ))}
              </div>
            </div>

            {/* Mess Feedback */}
            <div className="rounded-2xl border border-border bg-card p-5">
              <h4 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-birla-cyan" />
                Recent Mess Feedback
              </h4>
              <div className="space-y-2 max-h-72 overflow-y-auto">
                {messFeedback.map((fb, idx) => (
                  <div key={idx} className="rounded-lg border border-border/50 p-3 hover:bg-muted/10 transition-colors">
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-xs font-semibold text-foreground">{fb.student}</p>
                      <div className="flex items-center gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={`w-3 h-3 ${i < fb.rating ? 'text-amber-500 fill-amber-500' : 'text-muted'}`} />
                        ))}
                      </div>
                    </div>
                    <p className="text-[10px] text-muted-foreground mb-1">{fb.date} &bull; {fb.meal}</p>
                    <p className="text-[11px] text-foreground">{fb.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Mess Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { label: 'Daily Meals Served', value: '1,424', icon: Utensils, color: 'text-birla-cyan bg-birla-cyan/10' },
              { label: 'Monthly Mess Cost', value: '₹8,45,000', icon: IndianRupee, color: 'text-birla-gold bg-birla-gold/10' },
              { label: 'Avg Feedback Rating', value: '3.8/5', icon: Star, color: 'text-amber-500 bg-amber-500/10' },
              { label: 'Special Diet Students', value: '47', icon: Heart, color: 'text-red-500 bg-red-500/10' },
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

      {/* Inventory */}
      {activeTab === 'inventory' && (
        <motion.div variants={itemVariants} className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-semibold text-foreground flex items-center gap-2">
              <Package className="w-5 h-5 text-purple-500" />
              Hostel Inventory
            </h3>
            <div className="flex items-center gap-2">
              <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border text-xs font-medium hover:bg-muted transition-colors">
                <Download className="w-3.5 h-3.5" /> Export
              </button>
              <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg gradient-birla text-white text-xs font-medium">
                <Plus className="w-3.5 h-3.5" /> Add Item
              </button>
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border bg-muted/30">
                    <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Item ID</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Item Name</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Category</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Qty</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Condition</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Location</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Unit Cost</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Last Audit</th>
                  </tr>
                </thead>
                <tbody>
                  {inventory.map((item) => (
                    <tr key={item.id} className="border-b border-border/50 hover:bg-muted/20 transition-colors">
                      <td className="px-4 py-3 text-xs font-mono text-birla-cyan">{item.id}</td>
                      <td className="px-4 py-3 text-sm font-medium text-foreground">{item.item}</td>
                      <td className="px-4 py-3">
                        <span className="px-2 py-0.5 rounded-full bg-muted text-[10px] font-medium text-muted-foreground">{item.category}</span>
                      </td>
                      <td className="px-4 py-3 text-sm text-foreground">{item.quantity}</td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${
                          item.condition === 'Excellent' ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' :
                          item.condition === 'Good' ? 'bg-blue-500/10 text-blue-600 dark:text-blue-400' :
                          'bg-amber-500/10 text-amber-600 dark:text-amber-400'
                        }`}>{item.condition}</span>
                      </td>
                      <td className="px-4 py-3 text-xs text-foreground">{item.location}</td>
                      <td className="px-4 py-3 text-xs text-foreground">{item.cost}</td>
                      <td className="px-4 py-3 text-xs text-foreground">{item.lastAudit}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Inventory Summary */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { label: 'Total Items', value: '1,552', icon: Package, color: 'text-birla-cyan bg-birla-cyan/10' },
              { label: 'Good Condition', value: '1,320', icon: CheckCircle2, color: 'text-emerald-500 bg-emerald-500/10' },
              { label: 'Needs Repair', value: '188', icon: Wrench, color: 'text-amber-500 bg-amber-500/10' },
              { label: 'Total Asset Value', value: '₹42.5L', icon: IndianRupee, color: 'text-purple-500 bg-purple-500/10' },
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
    </motion.div>
  )
}
