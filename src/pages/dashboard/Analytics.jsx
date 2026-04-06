import React, { useState, useMemo } from 'react'
import { useSelector } from 'react-redux'
import { TrendCard, InsightCard,} from '../../components'
import DailySpending from '../../components/cards/DailySpending'
import SimpleInsights from '../../components/cards/SimpleInsights'


const RANGE_OPTIONS = [
  { key: '1m', label: '1M' },
  { key: '3m', label: '3M' },
  { key: '6m', label: '6M' },
  { key: 'all', label: 'All' },
]

function Analytics() {
  const transactions = useSelector(state => state.transactions.items)
  const [range, setRange] = useState('3m')

  const filtered = useMemo(() => {
    if (range === 'all') return transactions

    const months = { '1m': 1, '3m': 3, '6m': 6 }[range]
    const cutoff = new Date()
    cutoff.setMonth(cutoff.getMonth() - months)

    return transactions.filter(tx => new Date(tx.date) >= cutoff)
  }, [transactions, range])

  return (
    <div className="p-5 flex flex-col gap-5">

      
      <div className="flex items-center justify-between flex-wrap gap-3">
        <h2 className="text-lg text-text-primary font-semibold">Analytics</h2>

      
        <div className="flex bg-white/5 rounded-lg p-1 gap-1">
          {RANGE_OPTIONS.map(o => (
            <button
              key={o.key}
              onClick={() => setRange(o.key)}
              className={`
                px-3 py-1.5 text-xs rounded-md transition
                ${range === o.key
                  ? 'bg-secondary text-text-primary'
                  : 'text-text-secondary hover:text-text-primary'}
              `}
            >
              {o.label}
            </button>
          ))}
        </div>
      </div>

      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

        
        <div className="flex flex-col gap-5">
          <TrendCard transactions={filtered} />
          <DailySpending transactions={filtered} />
        </div>

        
        <div className="flex flex-col gap-5">
          <InsightCard transactions={filtered} />
          <SimpleInsights transactions={filtered} />
        </div>

      </div>
    </div>
  )
}

export default Analytics