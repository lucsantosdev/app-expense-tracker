<script setup>

import Header from './components/Header.vue'
import Balance from './components/Balance.vue'
import IncomeExpenses from './components/IncomeExpenses.vue'
import TransactionList from './components/TransactionList.vue'
import AddTransaction from './components/AddTransaction.vue'

import { useToast } from 'vue-toastification'

import { ref, computed, onMounted } from 'vue'

const toast = useToast()

const transactions = ref([])
const searchTerm = ref('')
const filterType = ref('all')
const sortBy = ref('newest')

onMounted(() => {
  const savedTransactions = localStorage.getItem('transactions')
  if (!savedTransactions) {
    return
  }

  try {
    const parsedTransactions = JSON.parse(savedTransactions)
    if (!Array.isArray(parsedTransactions)) {
      return
    }

    transactions.value = parsedTransactions.map((transaction) => ({
      id: transaction.id,
      text: String(transaction.text ?? '').trim(),
      amount: Number(transaction.amount) || 0,
      createdAt: transaction.createdAt || new Date().toISOString()
    }))
  } catch {
    toast.error('Saved data is corrupted and could not be loaded')
    }
})

// Calculate total balance
const total = computed(() => {
    return transactions.value.reduce((accumulator, transaction) => {
      return accumulator + transaction.amount
    }, 0)
})

// Calculate total income
const income = computed(() => {
    return transactions.value
    .filter((transaction) => transaction.amount > 0)
    .reduce((accumulator, transaction) => {
      return accumulator + transaction.amount
    }, 0)
    .toFixed(2)
});

// Calculate total expenses
const expenses = computed(() => {
    return transactions.value
    .filter((transaction) => transaction.amount < 0)
    .reduce((accumulator, transaction) => {
      return accumulator + transaction.amount
    }, 0)
    .toFixed(2)
});

const hasTransactions = computed(() => transactions.value.length > 0)

const filteredTransactions = computed(() => {
  const normalizedSearch = searchTerm.value.trim().toLowerCase()

  let result = [...transactions.value]

  if (filterType.value === 'income') {
    result = result.filter((transaction) => transaction.amount > 0)
  }

  if (filterType.value === 'expense') {
    result = result.filter((transaction) => transaction.amount < 0)
  }

  if (normalizedSearch) {
    result = result.filter((transaction) =>
      transaction.text.toLowerCase().includes(normalizedSearch)
    )
  }

  const sorters = {
    newest: (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    oldest: (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
    highest: (a, b) => b.amount - a.amount,
    lowest: (a, b) => a.amount - b.amount
  }

  return result.sort(sorters[sortBy.value])
})

// Add new transaction
const handleTransactionSubmitted = (transactionData) => {
    const newTransaction = {
        id: generateUniqueId(),
        text: transactionData.text,
    amount: transactionData.amount,
    createdAt: new Date().toISOString()
    }
    transactions.value.push(newTransaction)

    saveTransactionsToLocalStorage()

    toast.success('Transaction added successfully')
}

// Generate unique id
const generateUniqueId = () => {
    return Math.floor(Math.random() * 1000000)
}

// Delete transaction
const handleTransactionDeleted = (id) => {
    transactions.value = transactions.value.filter(transaction => transaction.id !== id)
    saveTransactionsToLocalStorage()
    toast.success('Transaction deleted successfully')
}

const clearAllTransactions = () => {
  if (!transactions.value.length) {
    return
  }

  const confirmed = window.confirm('Clear all transactions? This action cannot be undone.')
  if (!confirmed) {
    return
  }

  transactions.value = []
  saveTransactionsToLocalStorage()
  toast.info('All transactions were removed')
}

// Save to LocalStorage
const saveTransactionsToLocalStorage = () => {
    localStorage.setItem('transactions', JSON.stringify(transactions.value))
}

</script>

<template>
  <main class="app-shell">
    <Header />
    <div class="container">
      <Balance :total="+total" :count="transactions.length" />
      <IncomeExpenses :income="+income" :expenses="+expenses" />

      <section class="controls-card">
        <h3>Find & Organize</h3>
        <div class="controls-grid">
          <div class="control">
            <label for="search">Search</label>
            <input id="search" v-model.trim="searchTerm" type="text" placeholder="Search description" />
          </div>

          <div class="control">
            <label for="filter">Filter</label>
            <select id="filter" v-model="filterType">
              <option value="all">All</option>
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
          </div>

          <div class="control">
            <label for="sort">Sort</label>
            <select id="sort" v-model="sortBy">
              <option value="newest">Newest</option>
              <option value="oldest">Oldest</option>
              <option value="highest">Highest amount</option>
              <option value="lowest">Lowest amount</option>
            </select>
          </div>
        </div>

        <button class="btn btn-secondary" :disabled="!hasTransactions" @click="clearAllTransactions">
          Clear all transactions
        </button>
      </section>

      <TransactionList
        :transactions="filteredTransactions"
        :hasData="hasTransactions"
        @transactionDeleted="handleTransactionDeleted"
      />
      <AddTransaction @transactionSubmitted="handleTransactionSubmitted"/>
    </div>
  </main>
</template>


