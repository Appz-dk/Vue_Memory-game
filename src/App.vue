<script setup lang="ts">
  import { computed, ref, watch } from "vue";
  import { cardsData } from "./data/cardData";
  import Card from "./components/Card.vue"

  const cards = ref(cardsData)
  const selectedCards = ref<{value: number, cardPosition:number}[]>([])
  const remainingCards = computed(() => {
    return cards.value.filter(c => !c.isMatched).length
  })

  watch(selectedCards, (currentVal) => {
    // Track if game is over
    if (!remainingCards.value) {
      // Game is over
      return
    }

    if (currentVal.length === 2) {
      // If the cards match keep them visible
      if (currentVal[0].value === currentVal[1].value) {
        currentVal.forEach(c => cards.value[c.cardPosition].isMatched = true)
        selectedCards.value = []
      } else {
        // Else flip the cards after timeout
        setTimeout(() => {
          currentVal.forEach(c => cards.value[c.cardPosition].isVisible = false)
          selectedCards.value = []
        }, 1500)
      }
    }
  })

  const handleFlipCard = (value: number, cardPosition: number) => {
    const isValidFlip = selectedCards.value.every(c => c.cardPosition !== cardPosition)
    if (selectedCards.value.length === 2 || !isValidFlip) return
    selectedCards.value = [...selectedCards.value, { value, cardPosition }]
    cards.value[cardPosition].isVisible = true
  }

  const shuffleCards = () => {
    cards.value = cards.value.sort(() => Math.random() - 0.5)
  }

  const restartGame = () => {
    shuffleCards()
    cards.value = cards.value.map((c, idx) => ({
      ...c,
      isMatched: false,
      isVisible: false,
      position: idx
    }))
  }

</script>

<template>
    <h1>Vue Memory Game</h1>
    <section class="game-board">
      <Card 
      v-for="(card, idx) in cards" :key="`card-${idx}-${Math.ceil(Math.random() * 10000000)}`" 
      :value="card.value"
      :isVisible="card.isVisible"
      :isMatched="card.isMatched"
      :cardPosition="card.position"
      @pickCard="handleFlipCard"
      />
    </section>
    <div class="game-status">
      <p v-if="remainingCards">Matches found: {{ (cards.length - remainingCards) / 2}}</p>
      <p v-else>Player wins!</p>
      <button @click="restartGame">Restart Game</button>
    </div>
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

  .game-status {
    text-align: center;
    padding-top: 1rem;
    text-transform: uppercase;
  }

  
</style>
