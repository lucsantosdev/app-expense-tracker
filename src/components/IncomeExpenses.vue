<script setup>
import { computed, defineProps } from 'vue';

const props = defineProps({
    income: {
        type: Number,
        required: true
    },
    expenses: {
        type: Number,
        required: true
    }
});

const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(value)
}

const formattedIncome = computed(() => formatCurrency(props.income))
const formattedExpenses = computed(() => formatCurrency(Math.abs(props.expenses)))
</script>

<template>
    <div class="inc-exp-container">
        <div>
            <h4>Income</h4>
            <p id="money-plus" class="money plus">{{ formattedIncome }}</p>
        </div>
        <div>
            <h4>Expenses</h4>
            <p id="money-minus" class="money minus">-{{ formattedExpenses }}</p>
        </div>
    </div>
</template>