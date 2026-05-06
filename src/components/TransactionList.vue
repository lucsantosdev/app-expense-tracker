<script setup>
import { defineProps } from 'vue';

const props = defineProps({
    transactions: {
        type: Array,
        required: true
    }
});

</script>

<template>
    <h3>History</h3>
    <ul id="list" class="list">
        <!-- For testing purposes, you can add/remove transactions here 
        <li class="minus">
            Cash <span>- $400</span><button class="delete-btn">x</button>
        </li>
        <li class="plus">
            Cash <span>+ $400</span><button class="delete-btn">x</button>
        </li> -->
        <li v-for="transaction in transactions" v-bind:key="transaction.id" :class="transaction.amount < 0 ? 'minus' : 'plus'">
            {{ transaction.text }} <span>$ {{ transaction.amount }}</span><button class="delete-btn">x</button>
        </li>
    </ul>
</template>