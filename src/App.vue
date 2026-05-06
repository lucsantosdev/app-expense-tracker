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

onMounted(() => {
    const savedTransactions = JSON.parse(localStorage.getItem('transactions'))
    if (savedTransactions) {
        transactions.value = savedTransactions
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

// Add new transaction
const handleTransactionSubmitted = (transactionData) => {
    console.log('New transaction submitted:', transactionData); // For testing purposes
    const newTransaction = {
        id: generateUniqueId(),
        text: transactionData.text,
        amount: transactionData.amount
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
    console.log('Delete transaction with ID:', id); // For testing purposes
    transactions.value = transactions.value.filter(transaction => transaction.id !== id)
    saveTransactionsToLocalStorage()
    toast.success('Transaction deleted successfully')
}

// Save to LocalStorage
const saveTransactionsToLocalStorage = () => {
    localStorage.setItem('transactions', JSON.stringify(transactions.value))
}

</script>

<template>
  <Header />
  <div class="container">
    <Balance :total="+total" />
    <IncomeExpenses :income="+income" :expenses="+expenses" />
    <TransactionList :transactions="transactions" @transactionDeleted="handleTransactionDeleted" />
    <AddTransaction @transactionSubmitted="handleTransactionSubmitted"/>
  </div>
</template>


