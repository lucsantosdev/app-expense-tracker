<script setup>
import { computed, defineProps } from 'vue';

const props = defineProps({
    total: {
        type: Number,
        required: true
    },
    count: {
        type: Number,
        default: 0
    }
});

const formattedTotal = computed(() => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(props.total)
})
</script>

<template>
    <section class="balance-card">
        <h4>Your Balance</h4>
        <h1 id="balance">{{ formattedTotal }}</h1>
        <p class="balance-meta">{{ count }} total transaction{{ count === 1 ? '' : 's' }}</p>
    </section>
</template>