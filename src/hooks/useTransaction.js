import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
  fetchTransactions,
  addTransactionService,
  deleteTransactionService,
} from "../services/transactionServices/transactionServices"
import {
  clearTransactions, setError, setLoading,
  setTransactions, addTransactionItem,
  deleteTransactionItem, setUiMode,
} from "../features/transaction/transactionSlice"

export function useTransactions() {
  const dispatch = useDispatch()

  const userId   = useSelector(state => state.auth.user?.id)
  const items    = useSelector(state => state.transactions.items)
  const loading  = useSelector(state => state.transactions.loading)
  const error    = useSelector(state => state.transactions.error)
  const uiMode   = useSelector(state => state.transactions.uiMode)

 useEffect(() => {
  
  if (!userId) {
    dispatch(clearTransactions())
    return
  }

  const load = async () => {
    dispatch(setLoading(true))

    try {
      const data = await fetchTransactions(userId)
      dispatch(setTransactions(data))
    } catch (err) {
      dispatch(setError(err.message))
    }
  }

  load()
}, [userId, dispatch])

  const addTransaction = async (data) => {
    const saved = await addTransactionService(userId, data)
    dispatch(addTransactionItem(saved))
    return saved
  }

  const deleteTransaction = async (id) => {
    await deleteTransactionService(id)
    dispatch(deleteTransactionItem(id))
  }

  const toggleMode = () => {
    dispatch(setUiMode(uiMode === "viewer" ? "admin" : "viewer"))
  }

  return {
    items, loading, error, uiMode,
    addTransaction, deleteTransaction, toggleMode,
  }
}