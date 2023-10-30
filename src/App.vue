<script setup lang="ts">
  import { ref, watch } from "vue";
  import { cardsData } from "./data/cardData";
  import Card from "./components/Card.vue"

  const cards = ref(cardsData)
  const selectedCards = ref<{value: number, cardPosition:number}[]>([])
  const match = ref("")

  watch(selectedCards, (currentVal) => {
    if (currentVal.length === 2) {
      // If the cards match keep them visible
      if (currentVal[0].value === currentVal[1].value) {
        match.value = "Matched!"
        selectedCards.value = []
      } else {
        match.value = "Mismatched!"
        // Else flip the cards after timeout
        setTimeout(() => {
          selectedCards.value.forEach(c => cards.value[c.cardPosition].isVisible = false)
          selectedCards.value = []
        }, 1500)
      }
    }
  })

  const handleFlipCard = (value: number, cardPosition: number) => {
    if (selectedCards.value.length === 2) return
    selectedCards.value = [...selectedCards.value, { value, cardPosition }]
    cards.value[cardPosition].isVisible = true
  }

</script>

<template>
    <h1>Vue Memory Game</h1>
    {{ match }}
    <section class="game-board">
      <Card 
      v-for="(card, idx) in cards" :key="`card-${idx}-${Math.ceil(Math.random() * 10000000)}`" 
      :value="card.value"
      :isVisible="card.isVisible"
      :cardPosition="card.position"
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
