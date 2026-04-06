
import { useMemo } from 'react'
import { getUpcomingRecurring } from '../../services/dashboardServices/recurringTransactionService'


const CATEGORY_COLORS = {
  Rent:          { bg: 'bg-indigo-500/10',  text: 'text-indigo-400',  dot: 'bg-indigo-400'  },
  EMI:           { bg: 'bg-red-500/10',     text: 'text-red-400',     dot: 'bg-red-400'     },
  Subscriptions: { bg: 'bg-pink-500/10',    text: 'text-pink-400',    dot: 'bg-pink-400'    },
  Utilities:     { bg: 'bg-violet-500/10',  text: 'text-violet-400',  dot: 'bg-violet-400'  },
  Health:        { bg: 'bg-lime-500/10',    text: 'text-lime-400',    dot: 'bg-lime-400'    },
  Investment:    { bg: 'bg-teal-500/10',    text: 'text-teal-400',    dot: 'bg-teal-400'    },
}

const DEFAULT_COLOR = {
  bg: 'bg-gray-500/10', text: 'text-gray-400', dot: 'bg-gray-400'
}

function urgencyLabel(daysLeft) {
  if (daysLeft <= 2)  return { label: 'Due soon',  style: 'text-red-400 bg-red-500/10'    }
  if (daysLeft <= 7)  return { label: 'This week', style: 'text-amber-400 bg-amber-500/10' }
  if (daysLeft <= 14) return { label: 'Next week', style: 'text-blue-400 bg-blue-500/10'   }
  return null
}

function formatDueDate(date) {
  return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })
}

function UpcomingTransactionsCard({ transactions = [] }) {
  const upcoming = useMemo(
    () => getUpcomingRecurring(transactions).slice(0, 6),
    [transactions]
  )

  const totalDue = useMemo(
    () => upcoming.reduce((s, tx) => s + tx.amount, 0),
    [upcoming]
  )

  return (
    <div className='border border-secondary rounded-2xl p-5 flex flex-col gap-4 h-full shadow-sm'>

    
      <div className='flex items-center justify-between'>
        <div>
          <h3 className='text-text-secondary font-semibold text-sm'>Upcoming payments</h3>
          <p className='text-third text-xs mt-0.5'>
            {upcoming.length} recurring this month
          </p>
        </div>
        <div className='text-right'>
          <p className='text-text-primary text-sm font-semibold'>
            ₹{totalDue.toLocaleString('en-IN')}
          </p>
          <p className='text-third text-[10px]'>total due</p>
        </div>
      </div>

      
      <div className='flex flex-col gap-1'>
        {upcoming.length === 0 ? (
          <div className='flex items-center justify-center h-32 text-text-secondary text-sm'>
            No recurring payments found
          </div>
        ) : (
          upcoming.map(tx => {
            const color = CATEGORY_COLORS[tx.category] || DEFAULT_COLOR
            const urgency = urgencyLabel(tx.daysLeft)

            return (
              <div
                key={tx.id}
                className='flex items-center gap-3 py-2.5 border-b border-white/5 last:border-0'
              >
                {/* Icon */}
                <div className={`
                  w-8 h-8 rounded-xl flex items-center justify-center shrink-0
                  ${color.bg}
                `}>
                  <span className={`text-xs font-bold ${color.text}`}>
                    {tx.category.charAt(0)}
                  </span>
                </div>

                {/* Name + category */}
                <div className='flex-1 min-w-0'>
                  <p className='text-text-primary text-xs font-medium truncate leading-tight'>
                    {tx.description}
                  </p>
                  <div className='flex items-center gap-1.5 mt-0.5'>
                    <span className={`text-[10px] font-medium ${color.text}`}>
                      {tx.category}
                    </span>
                    {urgency && (
                      <>
                        <span className='text-gray-700 text-[10px]'>·</span>
                        <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded-full ${urgency.style}`}>
                          {urgency.label}
                        </span>
                      </>
                    )}
                  </div>
                </div>

                {/* Right side — amount + due date */}
                <div className='text-right shrink-0'>
                  <p className='text-red-400 text-sm font-semibold'>
                    ₹{tx.amount.toLocaleString('en-IN')}
                  </p>
                  <p className='text-gray-600 text-[10px]'>
                    {tx.daysLeft === 0
                      ? 'Today'
                      : tx.daysLeft === 1
                      ? 'Tomorrow'
                      : `${formatDueDate(tx.dueDate)}`
                    }
                  </p>
                </div>
              </div>
            )
          })
        )}
      </div>

      
      {upcoming.length > 0 && (
        <div className='pt-2 border-t border-white/5'>
          <div className='flex items-center justify-between mb-1.5'>
            <span className='text-third text-[10px]'>Fixed commitments</span>
            <span className='text-third text-[10px]'>
              ₹{totalDue.toLocaleString('en-IN')} / month
            </span>
          </div>
          <div className='w-full h-1 bg-white/5 rounded-full overflow-hidden'>
            <div
              className='h-full bg-indigo-500 rounded-full transition-all duration-500'
              style={{ width: '100%' }}
            />
          </div>
        </div>
      )}

    </div>
  )
}

export default UpcomingTransactionsCard