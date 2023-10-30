<script setup lang="ts">
  import Card from "./components/Card.vue"

  const cards = Array.from(Array(16).keys())

  console.log(cards)
</script>

<template>
    <h1>Vue Memory Game</h1>
    <section class="game-board">
      <Card v-for="(card, idx) in cards" :key="`card-${idx}`" :value="card"/>
    </section>
  </template>

<style scoped>

  h1 {
    text-align: center;
    margin-bottom: 2rem;
  }
  .game-board {
    display: grid;
    grid-template-columns: repeat(4, 100px);
    grid-template-rows: repeat(4, 100px);
    gap: 1.5rem;
    justify-content: center;
  }

  
</style>
