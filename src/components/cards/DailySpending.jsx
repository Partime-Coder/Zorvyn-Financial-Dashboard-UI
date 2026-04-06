import { useMemo } from 'react'
import {
  BarChart, Bar, XAxis, YAxis,
  Tooltip, ResponsiveContainer, CartesianGrid
} from 'recharts'

function DailySpending({ transactions }) {

  const data = useMemo(() => {
    const map = {}

    transactions
      .filter(tx => tx.type === 'expense')
      .forEach(tx => {
        const day = new Date(tx.date).toLocaleDateString('en-IN', {
          day: '2-digit',
          month: 'short'
        })

        map[day] = (map[day] || 0) + tx.amount
      })

    return Object.entries(map).map(([day, amount]) => ({
      day,
      amount
    }))
  }, [transactions])

  return (
    <div className="border border-secondary rounded-2xl p-5">

      <h3 className="text-sm text-text-secondary mb-4 font-semibold">
        Daily Spending
      </h3>

      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#ffffff08" />

          <XAxis dataKey="day" />
          <YAxis />

          <Tooltip />

          <Bar dataKey="amount" fill="#6366f1" radius={[4,4,0,0]} />
        </BarChart>
      </ResponsiveContainer>

    </div>
  )
}

export default DailySpending