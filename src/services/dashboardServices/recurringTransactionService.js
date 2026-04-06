export function getUpcomingRecurring(transactions) {
  const today = new Date()
  const currentMonth = today.getMonth()
  const currentYear = today.getFullYear()


  const recurringMap = {}

  transactions
    .filter(tx => tx.recurring && tx.type === 'expense')
    .forEach(tx => {
      const existing = recurringMap[tx.description]
      if (!existing || tx.date > existing.date) {
        recurringMap[tx.description] = tx
      }
    })

  return Object.values(recurringMap)
    .map(tx => {
  
      const originalDay = new Date(tx.date).getDate()
      const dueDate = new Date(currentYear, currentMonth, originalDay)

     
      if (dueDate < today) {
        dueDate.setMonth(dueDate.getMonth() + 1)
      }

      const daysLeft = Math.ceil((dueDate - today) / (1000 * 60 * 60 * 24))

      return {
        ...tx,
        dueDate,
        daysLeft,
      }
    })
    .sort((a, b) => a.daysLeft - b.daysLeft)
}