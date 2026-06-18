
import { useState, useMemo } from 'react'
import {
  PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend,
  BarChart, Bar, XAxis, YAxis, CartesianGrid
} from 'recharts'

const CHART_OPTIONS = [
  { key: 'donut', label: 'Donut' },
  { key: 'bar', label: 'Bar' },
]

const RANGE_OPTIONS = [
  { key: '1m', label: '1M' },
  { key: '3m', label: '3M' },
  { key: '6m', label: '6M' },
  { key: 'all', label: 'All' },
]

const CATEGORY_COLORS = {
  Food: '#10b981',
  Rent: '#6366f1',
  EMI: '#ef4444',
  Subscriptions: '#ec4899',
  Transport: '#f59e0b',
  Utilities: '#8b5cf6',
  Shopping: '#06b6d4',
  Health: '#84cc16',
  Travel: '#f97316',
  Entertainment: '#e879f9',
  Investment: '#14b8a6',
  Education: '#3b82f6',
  'Transfer Out': '#6b7280',
}

const FALLBACK_COLORS = [
  '#6366f1', '#10b981', '#f59e0b', '#ef4444',
  '#8b5cf6', '#06b6d4', '#f97316', '#ec4899',
  '#84cc16', '#14b8a6', '#3b82f6', '#e879f9',
]

function getColor(category, index) {
  return CATEGORY_COLORS[category] || FALLBACK_COLORS[index % FALLBACK_COLORS.length]
}

const tooltipStyle = {
  backgroundColor: '#0f0f0f',
  border: '1px solid #2a2a2a',
  borderRadius: 10,
  padding: '10px 14px',
}


const renderCustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
  if (percent < 0.05) return null
  const RADIAN = Math.PI / 180
  const r = innerRadius + (outerRadius - innerRadius) * 0.5
  const x = cx + r * Math.cos(-midAngle * RADIAN)
  const y = cy + r * Math.sin(-midAngle * RADIAN)
  return (
    <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central" fontSize={11} fontWeight={500}>
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  )
}


const DonutCenter = ({ cx, cy, total }) => (
  <text x={cx} y={cy} textAnchor="middle" dominantBaseline="central">
    <tspan x={cx} dy="-0.5em" fill="#9ca3af" fontSize={11}>Total spent</tspan>
    <tspan x={cx} dy="1.4em" fill="white" fontSize={14} fontWeight={600}>
      ₹{(total / 1000).toFixed(0)}k
    </tspan>
  </text>
)

function InsightCard({ transactions = [] }) {
  const [chartType, setChartType] = useState('donut')
  const [range, setRange] = useState('1m')

  const filteredTransactions = useMemo(() => {
    if (range === 'all') return transactions
    const months = { '1m': 1, '3m': 3, '6m': 6 }[range]
    const cutoff = new Date()
    cutoff.setMonth(cutoff.getMonth() - months)
    return transactions.filter(tx => new Date(tx.date) >= cutoff)
  }, [transactions, range])

  const categoryData = useMemo(() => {
    const map = {}
    filteredTransactions
      .filter(tx => tx.type === 'expense')
      .forEach(tx => {
        map[tx.category] = (map[tx.category] || 0) + tx.amount
      })

    return Object.entries(map)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 8)
  }, [filteredTransactions])

  const total = useMemo(
    () => categoryData.reduce((s, d) => s + d.value, 0),
    [categoryData]
  )

  const topCategory = categoryData[0]

  const formatTooltip = (value, name) => [
    `₹${value.toLocaleString('en-IN')}`,
    name
  ]

  if (categoryData.length === 0) {
    return (
      <div className='border border-secondary rounded-2xl p-5 flex flex-col items-center justify-center h-64 gap-2'>
        <p className='text-text-secondary text-sm'>No expense data</p>
        <p className='text-text-secondary text-xs'>Try a wider date range</p>
      </div>
    )
  }

  return (
    <div className='border border-secondary rounded-2xl p-5 flex flex-col gap-4'>

      
      <div className='flex items-start justify-between flex-wrap gap-3'>
        <div>
          <h3 className='text-text-secondary font-semibold text-sm'>Spending breakdown</h3>
          {topCategory && (
            <p className='text-text-secondary text-xs mt-0.5'>
              Top category —
              <span style={{ color: getColor(topCategory.name, 0) }} className='ml-1 font-medium'>
                {topCategory.name}
              </span>
              <span className='text-text-primary ml-1'>
                ₹{topCategory.value.toLocaleString('en-IN')}
              </span>
            </p>
          )}
        </div>

        
        <div className='flex items-center gap-2 flex-wrap'>

          <div className='flex bg-white/5 rounded-lg p-0.5 gap-0.5'>
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

          <div className='w-px h-5 bg-white/10' />

          {/* Chart type */}
          <div className='flex bg-white/5 rounded-lg p-0.5 gap-0.5'>
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

      
      {chartType === 'donut' ? (
        <ResponsiveContainer width='100%' height={240}>
          <PieChart>
            <Pie
              data={categoryData}
              cx='50%'
              cy='50%'
              innerRadius={68}
              outerRadius={100}
              paddingAngle={2}
              dataKey='value'
              labelLine={false}
              label={renderCustomLabel}
            >
              {categoryData.map((entry, index) => (
                <Cell key={entry.name} fill={getColor(entry.name, index)} />
              ))}
            </Pie>
            <DonutCenter cx='50%' cy='50%' total={total} />
            <Tooltip
              contentStyle={tooltipStyle}
              labelStyle={{ color: '#fff', marginBottom: 4 }}
              formatter={formatTooltip}
            />
            <Legend
              iconType='circle'
              iconSize={8}
              formatter={(value) => (
                <span style={{ color: '#9ca3af', fontSize: 12 }}>{value}</span>
              )}
            />
          </PieChart>
        </ResponsiveContainer>
      ) : (
        <ResponsiveContainer width='100%' height={240}>
          <BarChart
            data={categoryData}
            layout='vertical'
            margin={{ top: 0, right: 16, left: 0, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray='3 3' stroke='#ffffff08' horizontal={false} />
            <XAxis
              type='number'
              tickFormatter={v => `₹${(v / 1000).toFixed(0)}k`}
              tick={{ fill: '#6b7280', fontSize: 11 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              type='category'
              dataKey='name'
              tick={{ fill: '#9ca3af', fontSize: 11 }}
              axisLine={false}
              tickLine={false}
              width={88}
            />
            <Tooltip
              contentStyle={tooltipStyle}
              labelStyle={{ color: '#fff', marginBottom: 4 }}
              formatter={formatTooltip}
              cursor={{ fill: '#ffffff08' }}
            />
            <Bar dataKey='value' radius={[0, 4, 4, 0]} maxBarSize={20}>
              {categoryData.map((entry, index) => (
                <Cell key={entry.name} fill={getColor(entry.name, index)} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      )}

     
      <div className='flex items-center justify-between pt-2 border-t border-white/5'>
        <span className='text-gray-500 text-xs'>
          {categoryData.length} categories
        </span>
        <span className='text-text-secondary text-xs'>
          Total&nbsp;
          <span className='text-text-primary font-medium'>
            ₹{total.toLocaleString('en-IN')}
          </span>
        </span>
      </div>

    </div>
  )
}

export default InsightCard