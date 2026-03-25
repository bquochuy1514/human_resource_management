import {
  BarChart3,
  Bell,
  CalendarCheck2,
  ClipboardCheck,
  LayoutDashboard,
  Search,
  Settings,
  Users,
  Wallet,
} from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'

const baseNav = [
  { to: '/', label: 'Dashboard', icon: LayoutDashboard, roles: ['admin', 'hr', 'employee'] },
  { to: '/employees', label: 'Employees', icon: Users, roles: ['admin', 'hr'] },
  { to: '/attendance', label: 'Attendance', icon: CalendarCheck2, roles: ['admin', 'hr', 'employee'] },
  { to: '/requests', label: 'Requests', icon: ClipboardCheck, roles: ['admin', 'hr', 'employee'] },
  { to: '/analytics', label: 'Analytics', icon: BarChart3, roles: ['admin', 'hr'] },
  { to: '/payroll', label: 'Payroll', icon: Wallet, roles: ['admin'] },
]

const roleLabel = {
  admin: 'Administrator',
  hr: 'HR Staff',
  employee: 'Employee',
}

export function MainLayout({ children, role, setRole }) {
  const location = useLocation()
  const navItems = baseNav.filter((item) => item.roles.includes(role))

  return (
    <div className="flex min-h-screen bg-transparent text-slate-800">
      <aside className="hidden w-72 border-r border-slate-200/80 bg-white/95 backdrop-blur md:flex md:flex-col">
        <div className="border-b border-slate-200 px-6 py-6">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-600">Smart HRM System</p>
          <h1 className="mt-2 text-2xl font-extrabold text-slate-900">Workforce Hub</h1>
        </div>

        <nav className="flex-1 space-y-1 px-4 py-6">
          {navItems.map((item) => (
            <NavItem key={item.to} item={item} isActive={location.pathname === item.to || location.pathname.startsWith(`${item.to}/`)} />
          ))}
        </nav>

        <div className="space-y-4 border-t border-slate-200 px-5 py-5">
          <div className="rounded-2xl border border-blue-100 bg-blue-50 p-4">
            <p className="text-xs font-semibold text-blue-700">Current Role</p>
            <select
              value={role}
              onChange={(event) => setRole(event.target.value)}
              className="mt-2 w-full rounded-xl border border-blue-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="admin">Admin</option>
              <option value="hr">HR</option>
              <option value="employee">Employee</option>
            </select>
            <p className="mt-2 text-xs text-slate-500">{roleLabel[role]} mode preview for role-based UI.</p>
          </div>

          <button className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50">
            <Settings size={16} />
            Preferences
          </button>
        </div>
      </aside>

      <div className="flex min-h-screen flex-1 flex-col">
        <header className="sticky top-0 z-20 border-b border-slate-200/80 bg-white/95 px-4 py-4 backdrop-blur md:px-8">
          <div className="flex items-center justify-between gap-4">
            <div className="flex w-full max-w-xl items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2">
              <Search size={18} className="text-slate-400" />
              <input
                type="text"
                placeholder="Search employees, requests, attendance..."
                className="w-full bg-transparent text-sm outline-none"
              />
            </div>

            <div className="flex items-center gap-3">
              <button className="relative rounded-xl border border-slate-200 bg-white p-2 text-slate-600 hover:bg-slate-50">
                <Bell size={18} />
                <span className="absolute -right-1 -top-1 inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold text-white">
                  3
                </span>
              </button>
              <div className="hidden rounded-xl border border-slate-200 bg-white px-3 py-2 md:block">
                <p className="text-xs text-slate-500">Signed in as</p>
                <p className="text-sm font-semibold text-slate-800">{roleLabel[role]}</p>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 px-4 py-6 md:px-8 md:py-8">{children}</main>
      </div>
    </div>
  )
}

function NavItem({ item, isActive }) {
  const Icon = item.icon

  return (
    <Link
      to={item.to}
      className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${
        isActive
          ? 'bg-blue-600 text-white shadow-lg shadow-blue-200'
          : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
      }`}
    >
      <Icon size={18} />
      {item.label}
    </Link>
  )
}
