<script setup>
import { computed, defineProps } from 'vue';

const emit = defineEmits(['transactionDeleted']);

const props = defineProps({
    transactions: {
        type: Array,
        required: true
    },
    hasData: {
        type: Boolean,
        default: false
    }
});

const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(Math.abs(value))
}

const formatDate = (value) => {
    const date = new Date(value)

    if (Number.isNaN(date.getTime())) {
        return 'No date'
    }

    return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
    })
}

const emptyMessage = computed(() => {
    if (!props.hasData) {
        return 'No transactions yet. Add your first one below.'
    }

    return 'No transactions match your current search/filter.'
})

const deleteTransaction = (id) => {
    emit('transactionDeleted', id);
}

</script>

<template>
    <h3>History</h3>
    <ul id="list" class="list">
        <li v-if="transactions.length === 0" class="empty-state">
            {{ emptyMessage }}
        </li>
        <li v-for="transaction in transactions" v-bind:key="transaction.id" :class="transaction.amount < 0 ? 'minus' : 'plus'">
            <div class="transaction-body">
                <strong>{{ transaction.text }}</strong>
                <small>{{ formatDate(transaction.createdAt) }}</small>
            </div>
            <span>{{ transaction.amount < 0 ? '-' : '+' }}{{ formatCurrency(transaction.amount) }}</span>
            <button
                @click="deleteTransaction(transaction.id)"
                class="delete-btn"
                :aria-label="`Delete ${transaction.text}`"
            >
                x
            </button>
        </li>
    </ul>
</template>