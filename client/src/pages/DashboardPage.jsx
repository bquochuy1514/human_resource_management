import {
  Activity,
  AlertTriangle,
  Briefcase,
  Clock3,
  UserCheck,
  Users,
} from 'lucide-react'
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import {
  attendancePieData,
  departmentPerformanceData,
  employeeGrowthData,
  recentCheckins,
  leaveRequests,
  summaryCards,
} from '../data/mockData'

const colorMap = {
  blue: 'bg-blue-100 text-blue-700',
  emerald: 'bg-emerald-100 text-emerald-700',
  amber: 'bg-amber-100 text-amber-700',
  indigo: 'bg-indigo-100 text-indigo-700',
}

const pieColors = ['#2563eb', '#f97316', '#f59e0b', '#10b981']

export function DashboardPage() {
  return (
    <div className="space-y-6">
      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-600">Dashboard</p>
        <h2 className="mt-2 text-2xl font-extrabold text-slate-900 md:text-3xl">Smart HRM Command Center</h2>
        <p className="mt-2 max-w-3xl text-sm text-slate-600">
          A modern workforce overview for HR staff, managers, and employees with real-time attendance, analytics, and approval flow.
        </p>
      </section>

      <section className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        {summaryCards.map((item) => (
          <div key={item.title} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-start justify-between">
              <p className="text-sm font-medium text-slate-600">{item.title}</p>
              <div className={`rounded-xl px-2 py-1 text-xs font-semibold ${colorMap[item.tone]}`}>Live</div>
            </div>
            <p className="mt-5 text-3xl font-extrabold text-slate-900">{item.value}</p>
            <p className="mt-1 text-xs text-slate-500">{item.delta}</p>
          </div>
        ))}
      </section>

      <section className="grid grid-cols-1 gap-4 xl:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm xl:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-800">Employee Growth by Month</h3>
            <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">+18.2% YoY</span>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={employeeGrowthData}>
                <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip />
                <Line type="monotone" dataKey="employees" stroke="#1d4ed8" strokeWidth={3} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h3 className="text-base font-bold text-slate-800">Attendance Statistics</h3>
          <div className="h-60">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={attendancePieData} dataKey="value" nameKey="name" innerRadius={56} outerRadius={82} paddingAngle={2}>
                  {attendancePieData.map((entry, index) => (
                    <Cell key={entry.name} fill={pieColors[index % pieColors.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-2">
            {attendancePieData.map((item, index) => (
              <div key={item.name} className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-2 text-slate-600">
                  <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: pieColors[index] }} />
                  {item.name}
                </span>
                <span className="font-semibold text-slate-800">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-4 xl:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm xl:col-span-2">
          <h3 className="mb-4 text-base font-bold text-slate-800">Department Performance</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={departmentPerformanceData}>
                <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="department" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip />
                <Bar dataKey="score" fill="#3b82f6" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h3 className="text-base font-bold text-slate-800">Important Alerts</h3>
          <ul className="mt-4 space-y-3">
            <AlertItem icon={AlertTriangle} title="4 late arrivals" detail="Need follow-up from managers" tone="amber" />
            <AlertItem icon={Clock3} title="7 pending requests" detail="Waiting approval more than 24h" tone="red" />
            <AlertItem icon={UserCheck} title="9 OT submissions" detail="Payroll review due this Friday" tone="blue" />
          </ul>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-800">Latest Check-ins</h3>
            <Activity size={16} className="text-slate-400" />
          </div>
          <div className="space-y-3">
            {recentCheckins.map((item) => (
              <div key={`${item.employee}-${item.time}`} className="flex items-center justify-between rounded-xl border border-slate-100 px-3 py-2">
                <div>
                  <p className="text-sm font-semibold text-slate-800">{item.employee}</p>
                  <p className="text-xs text-slate-500">{item.type} check-in at {item.time}</p>
                </div>
                <StatusBadge value={item.status} />
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-800">Recent Leave Requests</h3>
            <Briefcase size={16} className="text-slate-400" />
          </div>
          <div className="space-y-3">
            {leaveRequests.map((item) => (
              <div key={item.id} className="rounded-xl border border-slate-100 p-3">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold text-slate-800">{item.employee}</p>
                  <StatusBadge value={item.status} />
                </div>
                <p className="mt-1 text-xs text-slate-500">{item.type} • {item.range}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

function AlertItem({ icon: Icon, title, detail, tone }) {
  const styleMap = {
    amber: 'bg-amber-50 text-amber-700 border-amber-200',
    red: 'bg-red-50 text-red-700 border-red-200',
    blue: 'bg-blue-50 text-blue-700 border-blue-200',
  }

  return (
    <li className={`rounded-xl border p-3 ${styleMap[tone]}`}>
      <div className="flex items-start gap-3">
        <Icon size={16} className="mt-0.5" />
        <div>
          <p className="text-sm font-semibold">{title}</p>
          <p className="text-xs opacity-90">{detail}</p>
        </div>
      </div>
    </li>
  )
}

function StatusBadge({ value }) {
  const tone = {
    Pending: 'bg-amber-100 text-amber-700',
    Approved: 'bg-emerald-100 text-emerald-700',
    Rejected: 'bg-red-100 text-red-700',
    Late: 'bg-red-100 text-red-700',
    'Early Leave': 'bg-amber-100 text-amber-700',
    OT: 'bg-indigo-100 text-indigo-700',
    'On Time': 'bg-emerald-100 text-emerald-700',
  }

  return <span className={`rounded-full px-2 py-1 text-xs font-semibold ${tone[value] || 'bg-slate-100 text-slate-700'}`}>{value}</span>
}
