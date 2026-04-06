// src/components/transactions/TransactionForm.jsx
import { useState } from "react"
import Input from "../utilities/Input"
import Button from "../utilities/Button"
import { CATEGORIES } from "../../data/transactionsAPI"

const TYPES = ["expense", "income"]

const emptyForm = {
  description: "",
  amount: "",
  type: "expense",
  category: "Food",
  date: new Date().toISOString().slice(0, 10),
  recurring: false,
  note: "",
}

function TransactionForm({ onSubmit, onCancel, loading = false }) {
  const [form, setForm] = useState(emptyForm)
  const [errors, setErrors] = useState({})

  const set = (key, value) => {
    setForm(prev => ({ ...prev, [key]: value }))
    setErrors(prev => ({ ...prev, [key]: "" }))
  }

  const validate = () => {
    const e = {}
    if (!form.description.trim()) e.description = "Description is required"
    if (!form.amount || isNaN(form.amount) || Number(form.amount) <= 0)
      e.amount = "Enter a valid amount"
    if (!form.date) e.date = "Date is required"
    return e
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const e2 = validate()
    if (Object.keys(e2).length > 0) { setErrors(e2); return }
    await onSubmit({ ...form, amount: Number(form.amount) })
    setForm(emptyForm)
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">

      {/* Description */}
      <div>
        <Input
          label="Description"
          placeholder="e.g. Zomato — dinner"
          value={form.description}
          onChange={e => set("description", e.target.value)}
        />
        {errors.description && (
          <p className="text-red-400 text-xs mt-1 pl-1">{errors.description}</p>
        )}
      </div>

      {/* Amount + Type row */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <Input
            label="Amount (₹)"
            type="number"
            placeholder="0"
            min="0"
            value={form.amount}
            onChange={e => set("amount", e.target.value)}
          />
          {errors.amount && (
            <p className="text-red-400 text-xs mt-1 pl-1">{errors.amount}</p>
          )}
        </div>

        <div>
          <label className="inline-block mb-1 pl-1 text-sm text-text-secondary">
            Type
          </label>
          <div className="flex gap-2">
            {TYPES.map(t => (
              <button
                key={t}
                type="button"
                onClick={() => set("type", t)}
                className={`
                  flex-1 py-2 rounded-lg text-sm font-medium capitalize transition-all
                  ${form.type === t
                    ? t === "income"
                      ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/40"
                      : "bg-red-500/20 text-red-400 border border-red-500/40"
                    : "bg-white/5 text-gray-500 border border-white/10 hover:text-gray-300"
                  }
                `}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Category + Date row */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="inline-block mb-1 pl-1 text-sm text-text-secondary">
            Category
          </label>
          <select
            value={form.category}
            onChange={e => set("category", e.target.value)}
            className="w-full rounded-lg border border-third bg-primary px-4 py-2 text-sm text-text-primary"
          >
            {CATEGORIES.filter(c =>
              form.type === "income"
                ? ["Salary","Freelance","Passive Income","Refund","Transfer In"].includes(c)
                : !["Salary","Freelance","Passive Income","Refund","Transfer In"].includes(c)
            ).map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        <div>
          <Input
            label="Date"
            type="date"
            value={form.date}
            onChange={e => set("date", e.target.value)}
          />
          {errors.date && (
            <p className="text-red-400 text-xs mt-1 pl-1">{errors.date}</p>
          )}
        </div>
      </div>

      {/* Recurring toggle */}
      <label className="flex items-center gap-3 cursor-pointer select-none">
        <div
          onClick={() => set("recurring", !form.recurring)}
          className={`
            w-9 h-5 rounded-full transition-colors duration-200 relative
            ${form.recurring ? "bg-indigo-500" : "bg-white/10"}
          `}
        >
          <div className={`
            absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform duration-200
            ${form.recurring ? "translate-x-4" : "translate-x-0.5"}
          `} />
        </div>
        <span className="text-sm text-text-secondary">Recurring transaction</span>
      </label>

      {/* Note */}
      <Input
        label="Note (optional)"
        placeholder="Any additional details"
        value={form.note}
        onChange={e => set("note", e.target.value)}
      />

      {/* Actions */}
      <div className="flex gap-3 pt-1">
        <Button
          type="button"
          onClick={onCancel}
          bgColor="bg-white/5"
          textColor="text-text-secondary"
          className="flex-1 border border-white/10"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={loading}
          bgColor="bg-indigo-600"
          textColor="text-white"
          className="flex-1 disabled:opacity-50"
        >
          {loading ? "Saving..." : "Add transaction"}
        </Button>
      </div>

    </form>
  )
}

export default TransactionForm