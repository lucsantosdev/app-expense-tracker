<script setup>
import { ref } from 'vue'
import { useToast } from 'vue-toastification'

const text = ref('')
const amount = ref('')
const transactionType = ref('expense')
const emit = defineEmits(['transactionSubmitted'])
const toast = useToast()

const onSubmit = () => {
    const trimmedText = text.value.trim()
    const parsedAmount = Number(amount.value)

    if(!trimmedText || !amount.value) {
        toast.error('Both fields are required')
        return
    }

    if (!Number.isFinite(parsedAmount) || parsedAmount <= 0) {
        toast.error('Amount must be greater than 0')
        return
    }

    const signedAmount = transactionType.value === 'expense'
        ? -Math.abs(parsedAmount)
        : Math.abs(parsedAmount)

    const transactionData = {
        text: trimmedText,
        amount: signedAmount
    }

    emit('transactionSubmitted', transactionData)

    text.value = ''
    amount.value = ''

};
</script>

<template>
    <h3>Add New Transaction</h3>
    <form id="form" @submit.prevent="onSubmit">
        <div class="form-control">
            <label for="text">Text</label>
            <input type="text" id="text" v-model="text" maxlength="60" placeholder="e.g. Groceries" />
        </div>
        <div class="form-control">
            <label>Type</label>
            <div class="type-toggle">
                <label>
                    <input type="radio" v-model="transactionType" value="expense" /> Expense
                </label>
                <label>
                    <input type="radio" v-model="transactionType" value="income" /> Income
                </label>
            </div>
        </div>
        <div class="form-control">
            <label for="amount">Amount</label>
            <input type="number" id="amount" v-model="amount" min="0.01" step="0.01" placeholder="0.00" />
        </div>
        <button class="btn">Add transaction</button>
    </form>
</template>