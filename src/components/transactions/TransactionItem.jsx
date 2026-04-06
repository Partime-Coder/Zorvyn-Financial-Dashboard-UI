
import { useState } from "react"

const CATEGORY_COLORS = {
  Food:            { bg: "bg-emerald-500/10", text: "text-emerald-400" },
  Rent:            { bg: "bg-indigo-500/10",  text: "text-indigo-400"  },
  EMI:             { bg: "bg-red-500/10",     text: "text-red-400"     },
  Subscriptions:   { bg: "bg-pink-500/10",    text: "text-pink-400"    },
  Transport:       { bg: "bg-amber-500/10",   text: "text-amber-400"   },
  Utilities:       { bg: "bg-violet-500/10",  text: "text-violet-400"  },
  Shopping:        { bg: "bg-cyan-500/10",    text: "text-cyan-400"    },
  Health:          { bg: "bg-lime-500/10",    text: "text-lime-400"    },
  Travel:          { bg: "bg-orange-500/10",  text: "text-orange-400"  },
  Entertainment:   { bg: "bg-fuchsia-500/10", text: "text-fuchsia-400" },
  Salary:          { bg: "bg-emerald-500/10", text: "text-emerald-400" },
  Freelance:       { bg: "bg-blue-500/10",    text: "text-blue-400"    },
  Investment:      { bg: "bg-teal-500/10",    text: "text-teal-400"    },
  "Passive Income":{ bg: "bg-green-500/10",   text: "text-green-400"   },
  "Transfer In":   { bg: "bg-sky-500/10",     text: "text-sky-400"     },
  "Transfer Out":  { bg: "bg-gray-500/10",    text: "text-gray-400"    },
  Education:       { bg: "bg-yellow-500/10",  text: "text-yellow-400"  },
  Refund:          { bg: "bg-green-500/10",   text: "text-green-400"   },
}

const DEFAULT_COLOR = { bg: "bg-gray-500/10", text: "text-gray-400" }

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString("en-IN", {
    day: "numeric", month: "short",
  })
}

function TransactionItem({ tx, isAdmin, onDelete }) {
  const [deleting, setDeleting] = useState(false)
  const color = CATEGORY_COLORS[tx.category] || DEFAULT_COLOR
  const isIncome = tx.type === "income"

  const handleDelete = async () => {
    setDeleting(true)
    await onDelete(tx.id)
  }

  return (
    <div className={`
      flex items-center gap-3 py-3 px-4
      border-b border-white/5 last:border-0
      group transition-colors duration-150
      hover:bg-white/2 rounded-lg
      ${deleting ? "opacity-40 pointer-events-none" : ""}
    `}>

     
      <div className={`
        w-9 h-9 rounded-xl flex items-center justify-center shrink-0
        ${color.bg}
      `}>
        <span className={`text-xs font-bold ${color.text}`}>
          {tx.category.charAt(0)}
        </span>
      </div>

      
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <p className="text-text-primary text-sm font-medium truncate">
            {tx.description}
          </p>
          {tx.recurring && (
            <span className="text-[10px] text-gray-600 shrink-0">↻</span>
          )}
        </div>
        <div className="flex items-center gap-1.5 mt-0.5">
          <span className={`text-[11px] font-medium ${color.text}`}>
            {tx.category}
          </span>
          <span className="text-gray-700 text-[11px]">·</span>
          <span className="text-text-secondary text-[11px]">
            {formatDate(tx.date)}
          </span>
          <span className="text-gray-700 text-[11px]">·</span>
          <span className={`text-[11px] capitalize ${isIncome ? "text-emerald-500" : "text-red-500"}`}>
            {tx.type}
          </span>
        </div>
      </div>

      
      <span className={`
        text-sm font-semibold shrink-0 ml-2
        ${isIncome ? "text-emerald-400" : "text-red-400"}
      `}>
        {isIncome ? "+" : "–"}₹{tx.amount.toLocaleString("en-IN")}
      </span>

      
      {isAdmin && (
        <button
          onClick={handleDelete}
          className="
            ml-2 opacity-0 group-hover:opacity-100
            w-7 h-7 rounded-lg flex items-center justify-center
            text-gray-600 hover:text-red-400 hover:bg-red-500/10
            transition-all duration-150 shrink-0
          "
          title="Delete"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
            <polyline points="3 6 5 6 21 6"/>
            <path d="M19 6l-1 14H6L5 6"/>
            <path d="M10 11v6M14 11v6"/>
            <path d="M9 6V4h6v2"/>
          </svg>
        </button>
      )}

    </div>
  )
}

export default TransactionItem