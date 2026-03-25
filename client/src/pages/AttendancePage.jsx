import { CalendarDays, Fingerprint, LogIn, LogOut, TriangleAlert } from 'lucide-react'
import { attendanceRows } from '../data/mockData'

export function AttendancePage({ role }) {
  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-2xl font-extrabold text-slate-900">Attendance Tracking</h2>
        <p className="mt-1 text-sm text-slate-600">Daily records, exceptions, and monthly attendance calendar.</p>

        <div className="mt-4 flex flex-wrap gap-2">
          <button className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700">
            <LogIn size={16} />
            Check-in
          </button>
          <button className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-700">
            <LogOut size={16} />
            Check-out
          </button>
          {role === 'employee' && <p className="my-auto text-xs text-slate-500">Employee mode: only personal attendance actions are visible.</p>}
        </div>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-200 px-6 py-4">
          <h3 className="text-base font-bold text-slate-800">Daily Attendance Table</h3>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-500">
              <tr>
                <th className="px-6 py-3 font-semibold">Date</th>
                <th className="px-6 py-3 font-semibold">Employee</th>
                <th className="px-6 py-3 font-semibold">Check-in</th>
                <th className="px-6 py-3 font-semibold">Check-out</th>
                <th className="px-6 py-3 font-semibold">Working Hours</th>
                <th className="px-6 py-3 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody>
              {attendanceRows.map((item) => (
                <tr key={`${item.employee}-${item.date}`} className="border-t border-slate-100 hover:bg-slate-50/70">
                  <td className="px-6 py-4">{item.date}</td>
                  <td className="px-6 py-4 font-medium text-slate-700">{item.employee}</td>
                  <td className="px-6 py-4">{item.checkIn}</td>
                  <td className="px-6 py-4">{item.checkOut}</td>
                  <td className="px-6 py-4">{item.hours}</td>
                  <td className="px-6 py-4">
                    <StatusBadge status={item.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-4 xl:grid-cols-3">
        <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm xl:col-span-2">
          <h3 className="flex items-center gap-2 text-base font-bold text-slate-800">
            <CalendarDays size={16} />
            Monthly Attendance Calendar (Wireframe)
          </h3>
          <div className="mt-4 grid grid-cols-7 gap-2 text-center text-xs">
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((d) => (
              <div key={d} className="rounded-lg bg-slate-100 p-2 font-semibold text-slate-500">{d}</div>
            ))}
            {Array.from({ length: 35 }).map((_, index) => (
              <div
                key={index}
                className={`rounded-lg border p-2 ${index === 9 || index === 22 ? 'border-red-200 bg-red-50 text-red-600' : 'border-slate-200 bg-white text-slate-700'}`}
              >
                {index + 1 <= 31 ? index + 1 : ''}
              </div>
            ))}
          </div>
        </article>

        <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h3 className="text-base font-bold text-slate-800">Abnormal Cases</h3>
          <ul className="mt-3 space-y-3">
            <li className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">
              <p className="flex items-center gap-2 font-semibold"><TriangleAlert size={15} /> Tran Hoang Long</p>
              <p className="text-xs">Late check-in: 09:21</p>
            </li>
            <li className="rounded-xl border border-amber-200 bg-amber-50 p-3 text-sm text-amber-700">
              <p className="flex items-center gap-2 font-semibold"><Fingerprint size={15} /> Le Bao Ngoc</p>
              <p className="text-xs">Early leave: 16:42</p>
            </li>
          </ul>
        </article>
      </section>
    </div>
  )
}

function StatusBadge({ status }) {
  const tone = {
    Late: 'bg-red-100 text-red-700',
    'Early Leave': 'bg-amber-100 text-amber-700',
    OT: 'bg-indigo-100 text-indigo-700',
    'On Time': 'bg-emerald-100 text-emerald-700',
  }

  return <span className={`rounded-full px-2 py-1 text-xs font-semibold ${tone[status] || 'bg-slate-100 text-slate-700'}`}>{status}</span>
}
