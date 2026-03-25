export const summaryCards = [
  { title: 'Total Employees', value: 286, delta: '+14 this month', tone: 'blue' },
  { title: 'Present Today', value: 259, delta: '90.6% attendance', tone: 'emerald' },
  { title: 'Employees on Leave', value: 18, delta: '7 pending approvals', tone: 'amber' },
  { title: 'Overtime Hours', value: '142h', delta: '+8h vs last week', tone: 'indigo' },
]

export const employeeGrowthData = [
  { month: 'Jan', employees: 242 },
  { month: 'Feb', employees: 248 },
  { month: 'Mar', employees: 251 },
  { month: 'Apr', employees: 260 },
  { month: 'May', employees: 271 },
  { month: 'Jun', employees: 286 },
]

export const departmentPerformanceData = [
  { department: 'Engineering', score: 93 },
  { department: 'Sales', score: 84 },
  { department: 'Customer Ops', score: 88 },
  { department: 'Marketing', score: 86 },
  { department: 'HR', score: 90 },
]

export const attendancePieData = [
  { name: 'On Time', value: 79 },
  { name: 'Late', value: 11 },
  { name: 'Leave', value: 7 },
  { name: 'Remote', value: 3 },
]

export const employees = [
  { id: 'EMP-001', name: 'Nguyen Minh Anh', department: 'Engineering', position: 'Frontend Engineer', status: 'Active', email: 'minhanh@smarthrm.vn' },
  { id: 'EMP-002', name: 'Tran Hoang Long', department: 'Engineering', position: 'Backend Engineer', status: 'Active', email: 'hoanglong@smarthrm.vn' },
  { id: 'EMP-003', name: 'Le Bao Ngoc', department: 'HR', position: 'HR Executive', status: 'On Leave', email: 'baongoc@smarthrm.vn' },
  { id: 'EMP-004', name: 'Pham Quoc Dat', department: 'Sales', position: 'Account Manager', status: 'Probation', email: 'quocdat@smarthrm.vn' },
  { id: 'EMP-005', name: 'Vo Thu Trang', department: 'Marketing', position: 'Content Lead', status: 'Active', email: 'thutrang@smarthrm.vn' },
]

export const attendanceRows = [
  { date: '2026-03-25', employee: 'Nguyen Minh Anh', checkIn: '08:48', checkOut: '18:10', hours: '8h 52m', status: 'OT' },
  { date: '2026-03-25', employee: 'Tran Hoang Long', checkIn: '09:21', checkOut: '17:55', hours: '8h 34m', status: 'Late' },
  { date: '2026-03-25', employee: 'Le Bao Ngoc', checkIn: '08:56', checkOut: '16:42', hours: '7h 46m', status: 'Early Leave' },
  { date: '2026-03-25', employee: 'Vo Thu Trang', checkIn: '08:41', checkOut: '17:48', hours: '9h 07m', status: 'On Time' },
]

export const leaveRequests = [
  { id: 'REQ-1092', employee: 'Le Bao Ngoc', type: 'Annual Leave', range: '27/03 - 28/03', status: 'Pending', reason: 'Family matters' },
  { id: 'REQ-1091', employee: 'Pham Quoc Dat', type: 'Sick Leave', range: '25/03', status: 'Approved', reason: 'Medical checkup' },
  { id: 'REQ-1089', employee: 'Tran Hoang Long', type: 'Remote Work', range: '24/03', status: 'Rejected', reason: 'Home internet issue' },
]

export const recentCheckins = [
  { employee: 'Nguyen Minh Anh', time: '08:48', type: 'Office', status: 'On Time' },
  { employee: 'Tran Hoang Long', time: '09:21', type: 'Office', status: 'Late' },
  { employee: 'Vo Thu Trang', time: '08:41', type: 'Office', status: 'On Time' },
  { employee: 'Pham Quoc Dat', time: '08:55', type: 'Remote', status: 'On Time' },
]

export const absenceRanking = [
  { name: 'Pham Quoc Dat', absences: 7 },
  { name: 'Le Bao Ngoc', absences: 6 },
  { name: 'Tran Hoang Long', absences: 5 },
  { name: 'Vo Thu Trang', absences: 4 },
  { name: 'Nguyen Minh Anh', absences: 3 },
]

export const productivityRanking = [
  { department: 'Engineering', score: 93 },
  { department: 'HR', score: 90 },
  { department: 'Customer Ops', score: 88 },
  { department: 'Marketing', score: 86 },
  { department: 'Sales', score: 84 },
]

export const attendanceTrend = [
  { week: 'W1', onTime: 88, late: 12 },
  { week: 'W2', onTime: 90, late: 10 },
  { week: 'W3', onTime: 85, late: 15 },
  { week: 'W4', onTime: 91, late: 9 },
]

export const salaryRows = [
  { id: 'EMP-001', name: 'Nguyen Minh Anh', base: 18000000, overtime: 2400000, deductions: 700000 },
  { id: 'EMP-002', name: 'Tran Hoang Long', base: 17500000, overtime: 1800000, deductions: 650000 },
  { id: 'EMP-003', name: 'Le Bao Ngoc', base: 14000000, overtime: 800000, deductions: 420000 },
  { id: 'EMP-004', name: 'Pham Quoc Dat', base: 16000000, overtime: 1000000, deductions: 500000 },
]
