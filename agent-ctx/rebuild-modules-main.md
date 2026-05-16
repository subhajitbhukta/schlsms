# Task: Rebuild SchoolAdminDashboard and SuperAdminPanel

## Summary
Completely rewrote both `SchoolAdminDashboard.jsx` and `SuperAdminPanel.jsx` with full working forms, data visualization reports, and UDISE+ compliance (BSP ID / PEN No / Uppar ID) throughout.

## SchoolAdminDashboard.jsx
- **3 tabs**: Overview, Forms, Reports
- **Overview**: 4 gradient stat cards, Student Strength BarChart, Fee Collection AreaChart, Attendance LineChart, Admission Funnel PieChart, CBSE Assessment BarChart, NEP 2020 progress bars, Performance Indicators circular gauges, Recent Activities, Upcoming Events, Quick Actions
- **Forms (6)**: Student Registration (with BSP ID/PEN No/Uppar ID + document checkboxes), Fee Collection Entry, Attendance Marking (with BSP ID column), Circular, Event Creation, Announcement
- **Reports (10)**: Student Strength, Attendance, Fee Collection (AreaChart + PieChart), Staff (PieChart), Exam Performance (BarChart), NEP Compliance (progress bars), UDISE+ Compliance (BSP/PEN/Uppar per class with BarChart), Admission, Transport, CBSE Board Exam

## SuperAdminPanel.jsx
- **3 tabs**: Overview, Forms, Reports
- **Overview**: 3 campus cards, consolidated stats, board affiliation status, roles & permissions, fee structure table, LMS config, transport & hostel, HR summary, AI analytics predictions
- **Forms (10)**: Campus Setup, Academic Year, Board Affiliation, Role Creation (multi-select modules), Fee Structure (auto-calculated total), LMS Config, Transport Route, Hostel Room, HR Staff, Bulk BSP ID Assignment (preview table)
- **Reports (8)**: Multi-Campus Performance (grouped BarChart), Fee Collection Summary (AreaChart), Staff Distribution (PieChart + table), BSP/PEN/Uppar ID Compliance (BarChart), Board Affiliation Status, Audit Log (searchable/filterable), HR Payroll (BarChart), Academic Year Comparison (BarChart)

## Key Design Decisions
- All forms use useState with value={state} onChange={(e) => setState({...state, field: e.target.value})}
- All reports have actual mock data arrays and recharts visualizations
- BSP ID, PEN No, Uppar ID appear in student registration, attendance marking, bulk assignment, UDISE+ compliance reports
- No "UDISE+ Reporting Status" or "UDISE+ Data Management" sections
- Uses framer-motion containerVariants/itemVariants, birla design system colors, gradient classes
- Chart tooltip uses backgroundColor: darkMode ? '#1A2D4A' : '#fff', borderRadius: '12px'

## Lint Status
- Initially had ArrowDownRight not imported in SuperAdminPanel.jsx - fixed
- All lint checks pass now
