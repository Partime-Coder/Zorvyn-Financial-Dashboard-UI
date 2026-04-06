// src/features/transaction/transactionSlice.js
import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  items: [],
  loading: false,
  error: null,
  uiMode: "viewer",
}

const transactionSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {
    setTransactions: (state, action) => {
      state.items = action.payload
      state.loading = false
      state.error = null
    },
    setLoading: (state, action) => {
      state.loading = action.payload
    },
    setError: (state, action) => {
      state.error = action.payload
      state.loading = false
    },
    clearTransactions: (state) => {
      state.items = []
      state.error = null
    },
    addTransactionItem: (state, action) => {
      state.items.unshift(action.payload)
    },
    deleteTransactionItem: (state, action) => {
      state.items = state.items.filter(t => t.id !== action.payload)
    },
    setUiMode: (state, action) => {
      state.uiMode = action.payload
    },
  },
})

export const {
  setTransactions, setLoading, setError,
  clearTransactions, addTransactionItem,
  deleteTransactionItem, setUiMode,
} = transactionSlice.actions

export default transactionSlice.reducer