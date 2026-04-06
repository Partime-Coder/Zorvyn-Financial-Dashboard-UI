
import { useEffect, useRef, useState } from "react"

function Dropdown({ trigger, items, align = "top" }) {
  const [isOpen, setIsOpen] = useState(false)
  const ref = useRef(null)

  
  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setIsOpen(false)
      }
    }
    document.addEventListener("mousedown", handler)
    return () => document.removeEventListener("mousedown", handler)
  }, [])

  return (
    <div ref={ref} className="relative w-full">

      <div onClick={() => setIsOpen(prev => !prev)}>
        {trigger}
      </div>

      {isOpen && (
        <div className={`
          absolute left-0 right-0 z-50
          ${align === "top" ? "bottom-full mb-2" : "top-full mt-2"}
          bg-primary border border-third rounded-xl shadow-xl
          py-1 overflow-hidden
          animate-in fade-in slide-in-from-bottom-2 duration-150
        `}>
          {items.map((item, index) => {
            if (item.type === "divider") {
              return <div key={index} className="my-1 border-t border-third" />
            }

            return (
              <button
                key={index}
                onClick={() => {
                  item.onClick?.()
                  setIsOpen(false)
                }}
                className={`
                  w-full flex items-center gap-3 px-4 py-2.5
                  text-sm transition-colors duration-150 text-left
                  ${item.danger
                    ? "text-red-500 hover:bg-red-500/10"
                    : "text-text-secondary hover:bg-white/5 hover:text-text-primary"
                  }
                `}
              >
               
                <span className="w-4 h-4 flex items-center justify-center shrink-0 text-gray-400">
                  {item.icon || null}
                </span>

                <span className="flex-1">{item.label}</span>

                {item.shortcut && (
                  <span className="text-xs text-text-secondary">{item.shortcut}</span>
                )}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default Dropdown