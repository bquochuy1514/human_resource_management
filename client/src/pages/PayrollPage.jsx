import { salaryRows } from '../data/mockData'

function formatCurrency(value) {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND', maximumFractionDigits: 0 }).format(value)
}

export function PayrollPage() {
  const totalBase = salaryRows.reduce((acc, row) => acc + row.base, 0)
  const totalOT = salaryRows.reduce((acc, row) => acc + row.overtime, 0)
  const totalDeduction = salaryRows.reduce((acc, row) => acc + row.deductions, 0)

  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-2xl font-extrabold text-slate-900">Salary & Calculation</h2>
        <p className="mt-1 text-sm text-slate-600">Monthly salary table and compensation overview.</p>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-500">
              <tr>
                <th className="px-6 py-3 font-semibold">Employee</th>
                <th className="px-6 py-3 font-semibold">Base Salary</th>
                <th className="px-6 py-3 font-semibold">Overtime</th>
                <th className="px-6 py-3 font-semibold">Deductions</th>
                <th className="px-6 py-3 font-semibold">Net Salary</th>
              </tr>
            </thead>
            <tbody>
              {salaryRows.map((row) => (
                <tr key={row.id} className="border-t border-slate-100">
                  <td className="px-6 py-4 font-semibold text-slate-800">{row.name}</td>
                  <td className="px-6 py-4">{formatCurrency(row.base)}</td>
                  <td className="px-6 py-4 text-emerald-700">+ {formatCurrency(row.overtime)}</td>
                  <td className="px-6 py-4 text-red-700">- {formatCurrency(row.deductions)}</td>
                  <td className="px-6 py-4 font-semibold text-slate-900">{formatCurrency(row.base + row.overtime - row.deductions)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <MetricCard label="Total Base Salary" value={formatCurrency(totalBase)} />
        <MetricCard label="Total Overtime" value={formatCurrency(totalOT)} />
        <MetricCard label="Total Deductions" value={formatCurrency(totalDeduction)} />
      </section>
    </div>
  )
}

function MetricCard({ label, value }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <p className="text-sm text-slate-500">{label}</p>
      <p className="mt-1 text-2xl font-extrabold text-slate-900">{value}</p>
    </div>
  )
}
