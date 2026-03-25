import { useMemo } from 'react'
import { useParams } from 'react-router-dom'
import { CalendarDays, Mail, Phone, ShieldCheck } from 'lucide-react'
import { employees } from '../data/mockData'

export function EmployeeDetailPage() {
  const { employeeId } = useParams()
  const employee = useMemo(() => employees.find((item) => item.id === employeeId) || employees[0], [employeeId])

  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-2xl font-extrabold text-slate-900">Employee Detail</h2>
        <p className="mt-1 text-sm text-slate-600">Profile, work history, and attendance summary.</p>
      </section>

      <section className="grid grid-cols-1 gap-4 xl:grid-cols-3">
        <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">Personal Info</h3>
          <p className="mt-3 text-xl font-bold text-slate-900">{employee.name}</p>
          <p className="text-sm text-slate-500">{employee.id} • {employee.position}</p>

          <div className="mt-4 space-y-2 text-sm text-slate-600">
            <p className="flex items-center gap-2"><Mail size={14} /> {employee.email}</p>
            <p className="flex items-center gap-2"><Phone size={14} /> +84 90 123 4567</p>
            <p className="flex items-center gap-2"><ShieldCheck size={14} /> {employee.department}</p>
            <p className="flex items-center gap-2"><CalendarDays size={14} /> Joined: 02/02/2022</p>
          </div>
        </article>

        <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm xl:col-span-2">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">Work History</h3>
          <ul className="mt-4 space-y-3">
            <TimelineItem title="Promoted to Senior Frontend Engineer" time="Jan 2025" />
            <TimelineItem title="Completed Performance Review - Exceeds Expectations" time="Dec 2024" />
            <TimelineItem title="Led Attendance Portal Revamp" time="Aug 2024" />
            <TimelineItem title="Joined Engineering Department" time="Feb 2022" />
          </ul>
        </article>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">Attendance Summary</h3>
        <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-4">
          <MiniMetric label="On-time Rate" value="91%" />
          <MiniMetric label="Late Arrivals" value="2" />
          <MiniMetric label="Absences" value="1" />
          <MiniMetric label="Overtime Hours" value="14h" />
        </div>
      </section>
    </div>
  )
}

function TimelineItem({ title, time }) {
  return (
    <li className="relative rounded-xl border border-slate-200 bg-slate-50 p-3 pl-6 text-sm text-slate-700">
      <span className="absolute left-2 top-4 h-2.5 w-2.5 rounded-full bg-blue-500" />
      <p className="font-semibold text-slate-800">{title}</p>
      <p className="text-xs text-slate-500">{time}</p>
    </li>
  )
}

function MiniMetric({ label, value }) {
  return (
    <div className="rounded-xl border border-slate-200 p-3">
      <p className="text-xs text-slate-500">{label}</p>
      <p className="mt-1 text-xl font-bold text-slate-900">{value}</p>
    </div>
  )
}
