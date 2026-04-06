// src/pages/transactions/TransactionPage.jsx
import { useMemo, useState, useRef, useCallback } from "react"
import { useTransactions } from "../../hooks/useTransaction"
import { CATEGORIES } from "../../data/transactionsAPI"
import TransactionItem from "../../components/transactions/TransactionItem"
import TransactionForm from "../../components/transactions/TransactionForm"
import Input from "../../components/utilities/Input"

const ITEMS_PER_PAGE = 20


function groupByMonth(transactions) {
  const groups = {}
  transactions.forEach(tx => {
    const [y, m] = tx.date.split("-")
    const key = new Date(Number(y), Number(m) - 1, 1)
      .toLocaleDateString("en-IN", { month: "long", year: "numeric" })
    if (!groups[key]) groups[key] = []
    groups[key].push(tx)
  })
  
  Object.values(groups).forEach(g =>
    g.sort((a, b) => new Date(b.date) - new Date(a.date))
  )

  return Object.entries(groups).sort((a, b) => {
    const da = new Date(a[1][0].date)
    const db = new Date(b[1][0].date)
    return db - da
  })
}

function TransactionPage() {
  const { items, loading, error, uiMode, toggleMode, addTransaction, deleteTransaction } = useTransactions()

  const [search,      setSearch]      = useState("")
  const [typeFilter,  setTypeFilter]  = useState("all")
  const [catFilter,   setCatFilter]   = useState("all")
  const [showForm,    setShowForm]    = useState(false)
  const [formLoading, setFormLoading] = useState(false)
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE)

  const isAdmin = uiMode === "admin"

  
  const filtered = useMemo(() => {
    return [...items]
      .filter(tx => {
        if (typeFilter !== "all" && tx.type !== typeFilter) return false
        if (catFilter !== "all" && tx.category !== catFilter) return false
        if (search && !tx.description.toLowerCase().includes(search.toLowerCase())) return false
        return true
      })
      .sort((a, b) => new Date(b.date) - new Date(a.date))
  }, [items, typeFilter, catFilter, search])

  
  const visible = useMemo(() => filtered.slice(0, visibleCount), [filtered, visibleCount])

 
  const grouped = useMemo(() => groupByMonth(visible), [visible])

  const hasMore = visibleCount < filtered.length

 
  const observer = useRef()
  const loaderRef = useCallback(node => {
    if (loading) return
    if (observer.current) observer.current.disconnect()
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        setVisibleCount(prev => prev + ITEMS_PER_PAGE)
      }
    })
    if (node) observer.current.observe(node)
  }, [loading, hasMore])

  const handleAdd = async (data) => {
    setFormLoading(true)
    try {
      await addTransaction(data)
      setShowForm(false)
    } finally {
      setFormLoading(false)
    }
  }

  const resetFilters = () => {
    setSearch("")
    setTypeFilter("all")
    setCatFilter("all")
    setVisibleCount(ITEMS_PER_PAGE)
  }

  const hasActiveFilters = search || typeFilter !== "all" || catFilter !== "all"

  if (loading) return <TransactionPageSkeleton />
  if (error) return (
    <div className="flex items-center justify-center h-64 text-red-400 text-sm">
      {error}
    </div>
  )

  return (
    <div className="flex flex-col gap-5">

      
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-text-primary font-semibold text-lg">Transactions</h1>
          <p className="text-text-secondary text-xs mt-0.5">
            {filtered.length} of {items.length} transactions
          </p>
        </div>

        <div className="flex items-center gap-2">
          
          <button
            onClick={toggleMode}
            className={`
              flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium
              border transition-all duration-200
              ${isAdmin
                ? "bg-amber-500/10 text-amber-400 border-amber-500/30"
                : "bg-white/5 text-text-secondary border-white/10 hover:text-text-primary"
              }
            `}
          >
            <div className={`w-1.5 h-1.5 rounded-full ${isAdmin ? "bg-amber-400" : "bg-gray-500"}`} />
            {isAdmin ? "Admin mode" : "Viewer mode"}
          </button>

          
          {isAdmin && (
            <button
              onClick={() => setShowForm(true)}
              className="
                flex items-center gap-2 px-3 py-2 rounded-lg
                text-xs font-medium bg-indigo-600 hover:bg-indigo-500
                text-white transition-colors duration-150
              "
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
              </svg>
              Add transaction
            </button>
          )}
        </div>
      </div>

      
      {showForm && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: "rgba(0,0,0,0.6)" }}
          onClick={e => { if (e.target === e.currentTarget) setShowForm(false) }}
        >
          <div className="w-full max-w-md bg-primary border border-secondary rounded-2xl p-6 shadow-xl">
            <h2 className="text-text-primary font-semibold text-base mb-4">Add transaction</h2>
            <TransactionForm
              onSubmit={handleAdd}
              onCancel={() => setShowForm(false)}
              loading={formLoading}
            />
          </div>
        </div>
      )}

      
      <div className="flex flex-wrap items-center gap-3">

        
        <div className="flex-1 min-w-48 max-w-72">
          <Input
            placeholder="Search transactions..."
            value={search}
            onChange={e => { setSearch(e.target.value); setVisibleCount(ITEMS_PER_PAGE) }}
          />
        </div>

        
        <div className="flex bg-white/5 rounded-lg p-0.5 gap-0.5">
          {["all", "income", "expense"].map(t => (
            <button
              key={t}
              onClick={() => { setTypeFilter(t); setVisibleCount(ITEMS_PER_PAGE) }}
              className={`
                px-3 py-1.5 rounded-md text-xs font-medium capitalize transition-all duration-150
                ${typeFilter === t ? "bg-white/10 text-text-primary" : "text-text-secondary hover:text-text-primary"}
              `}
            >
              {t === "all" ? "All" : t}
            </button>
          ))}
        </div>

       
        <select
          value={catFilter}
          onChange={e => { setCatFilter(e.target.value); setVisibleCount(ITEMS_PER_PAGE) }}
          className="rounded-lg border border-third bg-primary px-3 py-1.5 text-xs text-text-primary"
        >
          <option value="all">All categories</option>
          {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
        </select>

        
        {hasActiveFilters && (
          <button
            onClick={resetFilters}
            className="text-xs text-indigo-400 hover:text-indigo-300 transition-colors"
          >
            Clear filters
          </button>
        )}
      </div>

      
      <div className="flex flex-col gap-4">
        {grouped.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 gap-3">
            <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="1.5" strokeLinecap="round">
                <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
            </div>
            <p className="text-text-secondary text-sm">No transactions match your filters</p>
            {hasActiveFilters && (
              <button onClick={resetFilters} className="text-xs text-indigo-400 hover:underline">
                Clear filters
              </button>
            )}
          </div>
        ) : (
          grouped.map(([monthLabel, txs]) => (
            <div key={monthLabel} className="flex flex-col gap-1">

              
              <div className="flex items-center justify-between px-1 mb-1">
                <h3 className="text-text-secondary text-xs font-semibold uppercase tracking-wider">
                  {monthLabel}
                </h3>
                <span className="text-text-secondary text-[11px]">
                  {txs.length} transactions
                </span>
              </div>

              
              <div className="border border-secondary rounded-2xl overflow-hidden">
                {txs.map(tx => (
                  <TransactionItem
                    key={tx.id}
                    tx={tx}
                    isAdmin={isAdmin}
                    onDelete={deleteTransaction}
                  />
                ))}
              </div>

            </div>
          ))
        )}
      </div>

      
      {hasMore && (
        <div ref={loaderRef} className="flex justify-center py-4">
          <div className="flex gap-1">
            {[0,1,2].map(i => (
              <div
                key={i}
                className="w-1.5 h-1.5 rounded-full bg-gray-600 animate-pulse"
                style={{ animationDelay: `${i * 0.15}s` }}
              />
            ))}
          </div>
        </div>
      )}

     
      {!hasMore && filtered.length > 0 && (
        <p className="text-center text-xs text-gray-700 py-2">
          All {filtered.length} transactions loaded
        </p>
      )}

    </div>
  )
}

function TransactionPageSkeleton() {
  return (
    <div className="flex flex-col gap-5 animate-pulse">
      <div className="flex justify-between">
        <div className="h-6 w-36 bg-white/5 rounded-lg" />
        <div className="h-8 w-28 bg-white/5 rounded-lg" />
      </div>
      <div className="flex gap-3">
        <div className="h-9 flex-1 bg-white/5 rounded-lg" />
        <div className="h-9 w-36 bg-white/5 rounded-lg" />
        <div className="h-9 w-40 bg-white/5 rounded-lg" />
      </div>
      {[...Array(3)].map((_, i) => (
        <div key={i} className="flex flex-col gap-2">
          <div className="h-4 w-24 bg-white/5 rounded" />
          <div className="border border-secondary rounded-2xl p-4 flex flex-col gap-3">
            {[...Array(4)].map((_, j) => (
              <div key={j} className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-white/5 shrink-0" />
                <div className="flex-1 flex flex-col gap-1.5">
                  <div className="h-3 w-2/3 bg-white/5 rounded" />
                  <div className="h-2.5 w-1/3 bg-white/5 rounded" />
                </div>
                <div className="h-4 w-16 bg-white/5 rounded" />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

export default TransactionPage