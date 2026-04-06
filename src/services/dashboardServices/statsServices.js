export function calculateDashboardStats(transactions = []) {
  const now = new Date()

  const currentMonth = now.getMonth()
  const currentYear = now.getFullYear()

  const previousDate = new Date(currentYear, currentMonth - 1)
  const previousMonth = previousDate.getMonth()
  const previousYear = previousDate.getFullYear()


  const getMonthYear = (dateStr) => {
    const [y, m] = dateStr.split('-').map(Number)
    return { year: y, month: m - 1 }
  }

  const isSameMonth = (dateStr, month, year) => {
    const d = getMonthYear(dateStr)
    return d.month === month && d.year === year
  }

  const isBeforeOrEqual = (dateStr, month, year) => {
    const d = getMonthYear(dateStr)
    return d.year < year || (d.year === year && d.month <= month)
  }

  
  const currentMonthTx = transactions.filter(tx =>
    isSameMonth(tx.date, currentMonth, currentYear)
  )

  const previousMonthTx = transactions.filter(tx =>
    isSameMonth(tx.date, previousMonth, previousYear)
  )

  const cumulativeCurrent = transactions.filter(tx =>
    isBeforeOrEqual(tx.date, currentMonth, currentYear)
  )

  const cumulativePrevious = transactions.filter(tx =>
    isBeforeOrEqual(tx.date, previousMonth, previousYear)
  )

  
  const getTotals = (list) => {
    let income = 0
    let expense = 0

    for (let tx of list) {
      if (tx.type === 'income') {
        income += tx.amount
      }

      if (tx.type === 'expense' && tx.category !== 'Investment') {
        expense += tx.amount
      }
    }

    return {
      income,
      expense,
      balance: income - expense,
    }
  }

  const currentMonthStats = getTotals(currentMonthTx)
  const previousMonthStats = getTotals(previousMonthTx)

  const currentTotal = getTotals(cumulativeCurrent)
  const previousTotal = getTotals(cumulativePrevious)

  const getChange = (current, previous) => {
    if (previous === 0) return 0

    
    if (Math.sign(current) !== Math.sign(previous)) {
      return null
    }

    return Number((((current - previous) / Math.abs(previous)) * 100).toFixed(2))
  }

  return {
    
    balance: currentTotal.balance,
    balanceChange: getChange(currentTotal.balance, previousTotal.balance),

    
    income: currentMonthStats.income,
    incomeChange: getChange(currentMonthStats.income, previousMonthStats.income),

   
    expense: currentMonthStats.expense,
    expenseChange: getChange(currentMonthStats.expense, previousMonthStats.expense),
  }
}