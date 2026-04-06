
import { useState, useMemo } from 'react'
import {
  AreaChart, Area, BarChart, Bar,
  XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Legend
} from 'recharts'

const VIEW_OPTIONS = [
  { key: 'balance', label: 'Balance' },
  { key: 'income', label: 'Income' },
  { key: 'expense', label: 'Expense' },
  { key: 'combined', label: 'Overview' },
]

const RANGE_OPTIONS = [
  { key: '3m', label: '3M' },
  { key: '6m', label: '6M' },
  { key: '1y', label: '1Y' },
  { key: 'all', label: 'All' },
]

const CHART_OPTIONS = [
  { key: 'area', label: 'Area' },
  { key: 'bar', label: 'Bar' },
]

const COLORS = {
  balance: '#6366f1',
  income: '#10b981',
  expense: '#ef4444',
}

function OverallTrend({ transactions = [] }) {
  const [view, setView] = useState('combined')
  const [range, setRange] = useState('6m')
  const [chartType, setChartType] = useState('area')

  const monthlyData = useMemo(() => {
    const map = {}

    transactions.forEach(tx => {
      const [y, m] = tx.date.split('-')
      const key = `${y}-${m}`
      if (!map[key]) map[key] = { month: key, income: 0, expense: 0 }
      if (tx.type === 'income') map[key].income += tx.amount
      if (tx.type === 'expense') map[key].expense += tx.amount
    })

    return Object.values(map)
      .sort((a, b) => a.month.localeCompare(b.month))
      .map(m => ({
        ...m,
        balance: m.income - m.expense,
        label: new Date(m.month + '-01')
          .toLocaleDateString('en-IN', { month: 'short', year: '2-digit' }),
      }))
  }, [transactions])

  const filteredData = useMemo(() => {
    if (range === 'all') return monthlyData
    const months = { '3m': 3, '6m': 6, '1y': 12 }[range]
    return monthlyData.slice(-months)
  }, [monthlyData, range])

  const formatY = (v) => `₹${(v / 1000).toFixed(0)}k`

  const formatTooltip = (value, name) => [
    `₹${value.toLocaleString('en-IN')}`,
    name.charAt(0).toUpperCase() + name.slice(1)
  ]

  const tooltipStyle = {
    backgroundColor: '#0f0f0f',
    border: '1px solid #2a2a2a',
    borderRadius: 10,
    padding: '10px 14px',
  }

  const renderChart = () => {
    const commonProps = {
      data: filteredData,
      margin: { top: 5, right: 10, left: 0, bottom: 0 },
    }

    const xAxis = (
      <XAxis
        dataKey="label"
        tick={{ fill: '#6b7280', fontSize: 11 }}
        axisLine={false}
        tickLine={false}
      />
    )

    const yAxis = (
      <YAxis
        tickFormatter={formatY}
        tick={{ fill: '#6b7280', fontSize: 11 }}
        axisLine={false}
        tickLine={false}
        width={48}
      />
    )

    const grid = <CartesianGrid strokeDasharray="3 3" stroke="#ffffff08" />

    const tooltip = (
      <Tooltip
        contentStyle={tooltipStyle}
        labelStyle={{ color: '#fff', marginBottom: 4 }}
        formatter={formatTooltip}
      />
    )

    if (chartType === 'bar') {
      return (
        <BarChart {...commonProps}>
          {grid}{xAxis}{yAxis}{tooltip}
          {view === 'combined' ? (
            <>
              <Legend wrapperStyle={{ color: '#6b7280', fontSize: 12 }} />
              <Bar dataKey="income" name="Income" fill={COLORS.income} radius={[4, 4, 0, 0]} maxBarSize={24} />
              <Bar dataKey="expense" name="Expense" fill={COLORS.expense} radius={[4, 4, 0, 0]} maxBarSize={24} />
            </>
          ) : (
            <Bar dataKey={view} fill={COLORS[view]} radius={[4, 4, 0, 0]} maxBarSize={32} />
          )}
        </BarChart>
      )
    }

    if (view === 'combined') {
      return (
        <AreaChart {...commonProps}>
          <defs>
            <linearGradient id="gIncome" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={COLORS.income} stopOpacity={0.2} />
              <stop offset="95%" stopColor={COLORS.income} stopOpacity={0} />
            </linearGradient>
            <linearGradient id="gExpense" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={COLORS.expense} stopOpacity={0.2} />
              <stop offset="95%" stopColor={COLORS.expense} stopOpacity={0} />
            </linearGradient>
          </defs>
          {grid}{xAxis}{yAxis}{tooltip}
          <Legend wrapperStyle={{ color: '#6b7280', fontSize: 12 }} />
          <Area type="monotone" dataKey="income" name="Income" stroke={COLORS.income} fill="url(#gIncome)" strokeWidth={2} />
          <Area type="monotone" dataKey="expense" name="Expense" stroke={COLORS.expense} fill="url(#gExpense)" strokeWidth={2} />
        </AreaChart>
      )
    }

    const color = COLORS[view]
    const gradId = `g_${view}`

    return (
      <AreaChart {...commonProps}>
        <defs>
          <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={color} stopOpacity={0.25} />
            <stop offset="95%" stopColor={color} stopOpacity={0} />
          </linearGradient>
        </defs>
        {grid}{xAxis}{yAxis}{tooltip}
        <Area type="monotone" dataKey={view} stroke={color} fill={`url(#${gradId})`} strokeWidth={2} dot={false} />
      </AreaChart>
    )
  }

  return (
    <div className='border border-secondary shadow-sm rounded-2xl p-5 flex flex-col gap-4'>

      
      <div className='flex items-center justify-between flex-wrap gap-3'>
        <div>
          <h3 className='text-text-secondary font-semibold text-sm'>Overall trend</h3>
          <p className='text-third text-xs mt-0.5'>
            {filteredData.length} months of data
          </p>
        </div>

        
        <div className='flex items-center gap-2 flex-wrap'>

          
          <div className='flex bg-secondary/40 rounded-lg p-0.5 gap-0.5'>
            {VIEW_OPTIONS.map(o => (
              <button
                key={o.key}
                onClick={() => setView(o.key)}
                className={`
        px-3 py-1.5 rounded-md text-xs font-medium transition-all duration-150
        ${view === o.key
                    ? 'bg-secondary text-text-primary'
                    : 'text-text-secondary hover:text-text-primary-primary'
                  }
      `}
              >
                {o.label}
              </button>
            ))}
          </div>

          
          <div className='w-px h-5 bg-secondary' />

         
          <div className='flex bg-secondary/40 rounded-lg p-0.5 gap-0.5'>
            {RANGE_OPTIONS.map(o => (
              <button
                key={o.key}
                onClick={() => setRange(o.key)}
                className={`
        px-3 py-1.5 rounded-md text-xs font-medium transition-all duration-150
        ${range === o.key
                    ? 'bg-secondary text-text-primary'
                    : 'text-text-secondary hover:text-text-primary-primary'
                  }
      `}
              >
                {o.label}
              </button>
            ))}
          </div>

          
          <div className='w-px h-5 bg-secondary' />

         
          <div className='flex bg-secondary rounded-lg p-0.5 gap-0.5'>
            {CHART_OPTIONS.map(o => (
              <button
                key={o.key}
                onClick={() => setChartType(o.key)}
                className={`
        px-3 py-1.5 rounded-md text-xs font-medium transition-all duration-150
        ${chartType === o.key
                    ? 'bg-secondary text-text-primary'
                    : 'text-text-secondary hover:text-text-primary-primary'
                  }
      `}
              >
                {o.label}
              </button>
            ))}
          </div>

        </div>
      </div>

      
      <ResponsiveContainer width='100%' height={220}>
        {renderChart()}
      </ResponsiveContainer>

    </div>
  )
}

export default OverallTrend