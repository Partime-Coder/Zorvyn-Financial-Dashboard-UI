// src/services/transactionServices/transactionServices.js
import { mockTransactions } from "../../data/transactionsAPI"
import { getTransaction, setTransaction } from "../utilityServices/localStorageService"

const simulateDelay = (ms = 600) =>
  new Promise(resolve => setTimeout(resolve, ms))

const getOrSeed = () => {
  const stored = getTransaction()
  if (!stored || stored.length === 0) {
    setTransaction(mockTransactions)
    return mockTransactions
  }
  return stored
}

export const fetchTransactions = async (userId) => {
  await simulateDelay()
  const all = getOrSeed()
  return all.filter(t => t.userId === userId)
}

export const addTransactionService = async (userId, transactionData) => {
  await simulateDelay(400)
  const all = getOrSeed()
  const newTransaction = {
    id: crypto.randomUUID(),
    userId,
    ...transactionData,
    createdAt: new Date().toISOString(),
  }
  setTransaction([newTransaction, ...all])
  return newTransaction
}

export const deleteTransactionService = async (id) => {
  await simulateDelay(300)
  const all = getOrSeed()
  const updated = all.filter(t => t.id !== id)
  setTransaction(updated)
  return id
}