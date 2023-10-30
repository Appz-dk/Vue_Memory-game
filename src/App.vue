<script setup lang="ts">
  import { ref, watch } from "vue";
import Card from "./components/Card.vue"

  const cards = Array.from(Array(16).keys())

  // TODO: When clicking a card add that card index to currentlyShownCards
  const shownCards = ref<number[]>([])

  watch(() => shownCards.value.length, () => {
    if (shownCards.value.length === 2) {
      setTimeout(() => {
        shownCards.value = []
      }, 1500)
    }
  })

  const handleFlipCard = (value: number) => {
    if (shownCards.value.length === 2) return
    shownCards.value = [...shownCards.value, value]
    console.log(shownCards.value)
  }

</script>

<template>
    <h1>Vue Memory Game</h1>
    <section class="game-board">
      <Card 
      v-for="(card, idx) in cards" :key="`card-${idx}-${Math.ceil(Math.random() * 10000000)}`" 
      :value="card"
      :shownCards="shownCards"
      @pickCard="handleFlipCard"
      />
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
