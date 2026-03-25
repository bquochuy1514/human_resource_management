import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { useState } from 'react'
import { MainLayout } from './components/layout/MainLayout'
import { DashboardPage } from './pages/DashboardPage'
import { EmployeesPage } from './pages/EmployeesPage'
import { EmployeeDetailPage } from './pages/EmployeeDetailPage'
import { AttendancePage } from './pages/AttendancePage'
import { RequestsPage } from './pages/RequestsPage'
import { PayrollPage } from './pages/PayrollPage'
import { AnalyticsPage } from './pages/AnalyticsPage'

function App() {
  const [role, setRole] = useState('admin')

  return (
    <BrowserRouter>
      <MainLayout role={role} setRole={setRole}>
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/employees" element={role === 'employee' ? <Navigate to="/" replace /> : <EmployeesPage />} />
          <Route path="/employees/:employeeId" element={role === 'employee' ? <Navigate to="/" replace /> : <EmployeeDetailPage />} />
          <Route path="/attendance" element={<AttendancePage role={role} />} />
          <Route path="/requests" element={<RequestsPage role={role} />} />
          <Route path="/analytics" element={role === 'employee' ? <Navigate to="/" replace /> : <AnalyticsPage />} />
          <Route path="/payroll" element={role === 'admin' ? <PayrollPage /> : <Navigate to="/" replace />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  )
}

export default App
