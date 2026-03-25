import { Search, Plus, SquarePen, Trash2, Filter } from 'lucide-react'
import { Link } from 'react-router-dom'
import { employees } from '../data/mockData'

export function EmployeesPage() {
  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-2xl font-extrabold text-slate-900">Employee Management</h2>
        <p className="mt-1 text-sm text-slate-600">Manage employee profile, department, and work status.</p>

        <div className="mt-5 grid grid-cols-1 gap-3 lg:grid-cols-3">
          <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 lg:col-span-2">
            <Search size={16} className="text-slate-400" />
            <input className="w-full bg-transparent text-sm outline-none" placeholder="Search by name or ID..." />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <select className="rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500">
              <option>All Departments</option>
              <option>Engineering</option>
              <option>HR</option>
              <option>Sales</option>
            </select>
            <select className="rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500">
              <option>All Status</option>
              <option>Active</option>
              <option>On Leave</option>
              <option>Probation</option>
            </select>
          </div>
        </div>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 px-6 py-4">
          <h3 className="text-base font-bold text-slate-800">Employee Table</h3>
          <div className="flex gap-2">
            <button className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50">
              <Filter size={16} />
              Advanced Filter
            </button>
            <button className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700">
              <Plus size={16} />
              Add Employee
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-500">
              <tr>
                <th className="px-6 py-3 font-semibold">Employee ID</th>
                <th className="px-6 py-3 font-semibold">Name</th>
                <th className="px-6 py-3 font-semibold">Department</th>
                <th className="px-6 py-3 font-semibold">Position</th>
                <th className="px-6 py-3 font-semibold">Status</th>
                <th className="px-6 py-3 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((employee) => (
                <tr key={employee.id} className="border-t border-slate-100 hover:bg-slate-50/70">
                  <td className="px-6 py-4 font-semibold text-slate-700">{employee.id}</td>
                  <td className="px-6 py-4">
                    <Link to={`/employees/${employee.id}`} className="font-semibold text-blue-700 hover:text-blue-800">
                      {employee.name}
                    </Link>
                    <p className="text-xs text-slate-500">{employee.email}</p>
                  </td>
                  <td className="px-6 py-4">{employee.department}</td>
                  <td className="px-6 py-4">{employee.position}</td>
                  <td className="px-6 py-4">
                    <StatusBadge status={employee.status} />
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button className="rounded-lg border border-slate-200 p-2 text-slate-600 hover:bg-slate-100">
                        <SquarePen size={14} />
                      </button>
                      <button className="rounded-lg border border-red-200 p-2 text-red-600 hover:bg-red-50">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h3 className="text-lg font-bold text-slate-800">Add / Edit Employee Form</h3>
        <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2">
          <input className="rounded-xl border border-slate-200 px-3 py-2 text-sm" placeholder="Full name" />
          <input className="rounded-xl border border-slate-200 px-3 py-2 text-sm" placeholder="Email" />
          <input className="rounded-xl border border-slate-200 px-3 py-2 text-sm" placeholder="Department" />
          <input className="rounded-xl border border-slate-200 px-3 py-2 text-sm" placeholder="Position" />
          <select className="rounded-xl border border-slate-200 px-3 py-2 text-sm">
            <option>Active</option>
            <option>On Leave</option>
            <option>Probation</option>
          </select>
          <div className="flex items-center justify-end gap-2">
            <button className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-medium">Cancel</button>
            <button className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-medium text-white">Save Employee</button>
          </div>
        </div>
      </section>
    </div>
  )
}

function StatusBadge({ status }) {
  const tone = {
    Active: 'bg-emerald-100 text-emerald-700',
    'On Leave': 'bg-amber-100 text-amber-700',
    Probation: 'bg-blue-100 text-blue-700',
  }

  return <span className={`rounded-full px-2 py-1 text-xs font-semibold ${tone[status] || 'bg-slate-100 text-slate-700'}`}>{status}</span>
}
