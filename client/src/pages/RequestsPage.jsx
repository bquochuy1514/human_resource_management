import { MessageSquareText, ThumbsDown, ThumbsUp } from 'lucide-react'
import { leaveRequests } from '../data/mockData'

export function RequestsPage({ role }) {
  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-2xl font-extrabold text-slate-900">Leave & Request Workflow</h2>
        <p className="mt-1 text-sm text-slate-600">Submit requests, review approvals, and track history.</p>
      </section>

      <section className="grid grid-cols-1 gap-4 xl:grid-cols-3">
        <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm xl:col-span-1">
          <h3 className="text-base font-bold text-slate-800">Submit Request Form</h3>
          <div className="mt-4 space-y-3 text-sm">
            <select className="w-full rounded-xl border border-slate-200 px-3 py-2">
              <option>Annual Leave</option>
              <option>Sick Leave</option>
              <option>Remote Work</option>
            </select>
            <input className="w-full rounded-xl border border-slate-200 px-3 py-2" placeholder="Date range (dd/mm - dd/mm)" />
            <textarea className="h-24 w-full rounded-xl border border-slate-200 px-3 py-2" placeholder="Reason" />
            <button className="w-full rounded-xl bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-700">Submit Request</button>
          </div>
        </article>

        <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm xl:col-span-2">
          <h3 className="text-base font-bold text-slate-800">Request List</h3>
          <div className="mt-4 overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-slate-50 text-slate-500">
                <tr>
                  <th className="px-4 py-2">ID</th>
                  <th className="px-4 py-2">Employee</th>
                  <th className="px-4 py-2">Type</th>
                  <th className="px-4 py-2">Date Range</th>
                  <th className="px-4 py-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {leaveRequests.map((request) => (
                  <tr key={request.id} className="border-t border-slate-100">
                    <td className="px-4 py-3 font-semibold text-slate-700">{request.id}</td>
                    <td className="px-4 py-3">{request.employee}</td>
                    <td className="px-4 py-3">{request.type}</td>
                    <td className="px-4 py-3">{request.range}</td>
                    <td className="px-4 py-3"><StatusBadge status={request.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </article>
      </section>

      <section className="grid grid-cols-1 gap-4 xl:grid-cols-3">
        <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm xl:col-span-2">
          <h3 className="text-base font-bold text-slate-800">Manager Approval Screen</h3>
          <div className="mt-4 space-y-3 rounded-xl border border-slate-200 p-4">
            <p className="text-sm text-slate-700"><span className="font-semibold">Request:</span> Le Bao Ngoc • Annual Leave • 27/03 - 28/03</p>
            <textarea className="h-24 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm" placeholder="Manager comment" />
            <div className="flex gap-2">
              <button className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700">
                <ThumbsUp size={14} />
                Approve
              </button>
              <button className="inline-flex items-center gap-2 rounded-xl bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700">
                <ThumbsDown size={14} />
                Reject
              </button>
            </div>
          </div>
          {role === 'employee' && <p className="mt-3 text-xs text-slate-500">Employee mode: approval action is disabled in real system.</p>}
        </article>

        <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h3 className="text-base font-bold text-slate-800">Request History Timeline</h3>
          <ul className="mt-4 space-y-3 text-sm">
            <li className="rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-emerald-700">
              <p className="font-semibold">REQ-1091 approved</p>
              <p className="text-xs">25/03 10:23 by Manager Lan</p>
            </li>
            <li className="rounded-xl border border-red-200 bg-red-50 p-3 text-red-700">
              <p className="font-semibold">REQ-1089 rejected</p>
              <p className="text-xs">24/03 15:01 by Manager Dung</p>
            </li>
            <li className="rounded-xl border border-amber-200 bg-amber-50 p-3 text-amber-700">
              <p className="flex items-center gap-2 font-semibold"><MessageSquareText size={15} /> REQ-1092 pending</p>
              <p className="text-xs">Submitted 25/03 09:12</p>
            </li>
          </ul>
        </article>
      </section>
    </div>
  )
}

function StatusBadge({ status }) {
  const tone = {
    Pending: 'bg-amber-100 text-amber-700',
    Approved: 'bg-emerald-100 text-emerald-700',
    Rejected: 'bg-red-100 text-red-700',
  }

  return <span className={`rounded-full px-2 py-1 text-xs font-semibold ${tone[status] || 'bg-slate-100 text-slate-700'}`}>{status}</span>
}
