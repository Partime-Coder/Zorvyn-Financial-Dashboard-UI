
import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { getRecentTransactions } from '../../services/dashboardServices/recentTransactionService'


const CATEGORY_COLORS = {
  Food:           { bg: 'bg-emerald-500/10', text: 'text-emerald-400' },
  Rent:           { bg: 'bg-indigo-500/10',  text: 'text-indigo-400'  },
  EMI:            { bg: 'bg-red-500/10',     text: 'text-red-400'     },
  Subscriptions:  { bg: 'bg-pink-500/10',    text: 'text-pink-400'    },
  Transport:      { bg: 'bg-amber-500/10',   text: 'text-amber-400'   },
  Utilities:      { bg: 'bg-violet-500/10',  text: 'text-violet-400'  },
  Shopping:       { bg: 'bg-cyan-500/10',    text: 'text-cyan-400'    },
  Health:         { bg: 'bg-lime-500/10',    text: 'text-lime-400'    },
  Travel:         { bg: 'bg-orange-500/10',  text: 'text-orange-400'  },
  Entertainment:  { bg: 'bg-fuchsia-500/10', text: 'text-fuchsia-400' },
  Salary:         { bg: 'bg-emerald-500/10', text: 'text-emerald-400' },
  Freelance:      { bg: 'bg-blue-500/10',    text: 'text-blue-400'    },
  Investment:     { bg: 'bg-teal-500/10',    text: 'text-teal-400'    },
  'Passive Income':{ bg: 'bg-green-500/10',  text: 'text-green-400'   },
  'Transfer In':  { bg: 'bg-sky-500/10',     text: 'text-sky-400'     },
  'Transfer Out': { bg: 'bg-gray-500/10',    text: 'text-gray-400'    },
}

const DEFAULT_COLOR = { bg: 'bg-gray-500/10', text: 'text-gray-400' }

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
  })
}

function TransactionsCard({ transactions = [] }) {
  const navigate = useNavigate()
  const recent = useMemo(() => getRecentTransactions(transactions, 6), [transactions])

  return (
    <div className='border border-secondary shadow-sm rounded-2xl p-5 flex flex-col gap-4 h-full'>

      {/* Header */}
      <div className='flex items-center justify-between'>
        <div>
          <h3 className='text-text-secondary font-semibold text-sm'>Recent transactions</h3>
          <p className='text-third text-xs mt-0.5'>Last {recent.length} entries</p>
        </div>
        <button
          onClick={() => navigate('/transactions')}
          className='text-xs text-indigo-400 hover:text-indigo-300 transition-colors'
        >
          View all →
        </button>
      </div>

      
      <div className='flex flex-col gap-1'>
        {recent.length === 0 ? (
          <div className='flex items-center justify-center h-32 text-text-secondary text-sm'>
            No transactions yet
          </div>
        ) : (
          recent.map((tx, i) => {
            const color = CATEGORY_COLORS[tx.category] || DEFAULT_COLOR
            const isIncome = tx.type === 'income'

            return (
              <div
                key={tx.id}
                className='flex items-center gap-3 py-2.5 border-b border-white/5 last:border-0 group'
              >
               
                <div className={`
                  w-8 h-8 rounded-xl flex items-center justify-center shrink-0
                  ${color.bg}
                `}>
                  <span className={`text-xs font-bold ${color.text}`}>
                    {tx.category.charAt(0)}
                  </span>
                </div>

                
                <div className='flex-1 min-w-0'>
                  <p className='text-text-primary text-xs font-medium truncate leading-tight'>
                    {tx.description}
                  </p>
                  <div className='flex items-center gap-1.5 mt-0.5'>
                    <span className={`text-[10px] font-medium ${color.text}`}>
                      {tx.category}
                    </span>
                    <span className='text-text-secondary text-[10px]'>·</span>
                    <span className='text-text-secondary text-[10px]'>
                      {formatDate(tx.date)}
                    </span>
                  </div>
                </div>

               
                <span className={`
                  text-sm font-semibold shrink-0
                  ${isIncome ? 'text-emerald-400' : 'text-red-400'}
                `}>
                  {isIncome ? '+' : '–'}₹{tx.amount.toLocaleString('en-IN')}
                </span>
              </div>
            )
          })
        )}
      </div>

    </div>
  )
}

export default TransactionsCard