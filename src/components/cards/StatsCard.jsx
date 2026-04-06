import React from "react"

function StatsCard({ title, value, percentage, positive = true, icon }) {
  return (
    <div className="bg-primary border-2 border-secondary rounded-2xl p-5 flex flex-col gap-3">

      <div className="flex items-center justify-between">

        
        <div className={`
          w-10 h-10 rounded-xl flex items-center justify-center
          ${icon.bg} ${icon.text}
        `}>
          {icon.icon}
        </div>

        
        {percentage !== null ? (
          <span className={`
            flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-lg
            ${positive
              ? 'text-green-400 bg-green-400/10'
              : 'text-red-400 bg-red-400/10'
            }
          `}>
            {positive ? '▲' : '▼'}
            {Math.abs(percentage)}%
          </span>
        ) : (
          <span className="text-xs text-text-secondary px-2 py-1">
            —
          </span>
        )}
      </div>

      <p className="text-sm text-text-secondary">{title}</p>

      <h3 className="text-2xl font-bold text-text-primary">
        ₹{value.toLocaleString('en-IN')}
      </h3>
    </div>
  )
}

export default StatsCard