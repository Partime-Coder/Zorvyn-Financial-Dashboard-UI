import React from 'react'

function Bottembar() {
  return (
    <footer className="w-full px-6 py-4 mt-auto  ">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
        <p className="text-sm text-text-secondary">
          © 2026 Zorvyn. All rights reserved.
        </p>

        <div className="flex items-center gap-4 text-sm text-text-secondary">
          <button className="hover:text-text-primary transition-colors">
            Privacy Policy
          </button>
          <button className="hover:text-text-primary transition-colors">
            Terms
          </button>
          <button className="hover:text-text-primary transition-colors">
            Support
          </button>
        </div>
      </div>
    </footer>
  )
}

export default Bottembar