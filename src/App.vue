<script setup>

import Header from './components/Header.vue';
import Balance from './components/Balance.vue';
import IncomeExpenses from './components/IncomeExpenses.vue';
import TransactionList from './components/TransactionList.vue';
import AddTransaction from './components/AddTransaction.vue';

import { ref } from 'vue';

const transactions = ref([
    { id: 1, text: 'Salary', amount: 5400 },
    { id: 2, text: 'Rent', amount: -400 },
    { id: 3, text: 'Books', amount: -40 },
    { id: 4, text: 'Commission', amount: 150 }
]);

</script>

<template>
  <Header />
  <div class="container">
    <Balance />
    <IncomeExpenses />
    <TransactionList :transactions="transactions" />
    <AddTransaction />
  </div>
</template>


