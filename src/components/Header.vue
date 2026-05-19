<script setup>
const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric'
})
</script>

<template>
    <header class="hero">
        <p class="hero-kicker">Smart Budgeting</p>
        <h2>Expense Tracker</h2>
        <p class="hero-date">{{ today }}</p>
    </header>
</template>