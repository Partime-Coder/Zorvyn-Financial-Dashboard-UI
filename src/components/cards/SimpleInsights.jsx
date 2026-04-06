import { useMemo } from 'react'

function SimpleInsights({ transactions }) {

  const insights = useMemo(() => {
    let income = 0
    let expense = 0

    transactions.forEach(tx => {
      if (tx.type === 'income') income += tx.amount
      else expense += tx.amount
    })

    const savings = income - expense
    const savingRate = income ? ((savings / income) * 100).toFixed(1) : 0

    return { income, expense, savings, savingRate }
  }, [transactions])

  return (
    <div className="border border-secondary rounded-2xl p-5 flex flex-col gap-2">

      <h3 className="text-sm font-semibold text-text-secondary">
        Quick Insights
      </h3>

      <p className="text-xs text-text-secondary">
        You saved{" "}
        <span className="text-text-primary font-medium">
          ₹{insights.savings.toLocaleString('en-IN')}
        </span>
      </p>

      <p className="text-xs text-text-secondary">
        Savings rate:{" "}
        <span className="text-text-primary font-medium">
          {insights.savingRate}%
        </span>
      </p>

      <p className="text-xs text-text-secondary">
        Total spent:{" "}
        <span className="text-text-primary font-medium">
          ₹{insights.expense.toLocaleString('en-IN')}
        </span>
      </p>

    </div>
  )
}

export default SimpleInsights