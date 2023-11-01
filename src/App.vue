<script setup lang="ts">
  import { computed, ref, watch } from "vue";
  import { launchConfetti } from "./utils/confetti"
  import { cardsData } from "./data/cardData";
  import Card from "./components/Card.vue"
import GameButton from "./components/GameButton.vue";

  const cards = ref(cardsData)
  const selectedCards = ref<{value: string, cardPosition:number}[]>([])
  const firstGame = ref(true)
  const remainingCards = computed(() => {
    return cards.value.filter(c => !c.isMatched).length
  })

  watch(selectedCards, (currentVal) => {
    // Track if game is over
    if (!remainingCards.value) {
      // Game is over
      launchConfetti()
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

  const handleFlipCard = (value: string, cardPosition: number) => {
    // If game is not started yet do not allow flips
    if (firstGame.value) return
    const isValidFlip = selectedCards.value.every(c => c.cardPosition !== cardPosition)
    if (selectedCards.value.length === 2 || !isValidFlip) return
    selectedCards.value = [...selectedCards.value, { value, cardPosition }]
    cards.value[cardPosition].isVisible = true
  }

  const shuffleCards = () => {
    cards.value = cards.value.sort(() => Math.random() - 0.5)
  }

  const newGame = () => {
    shuffleCards()
    cards.value = cards.value.map((c, idx) => ({
      ...c,
      isMatched: false,
      isVisible: false,
      position: idx
    }))
    firstGame.value = false
  }

</script>

<template>
    <h1>Vue Memory Game</h1>
    <GameButton :firstGame="firstGame" @newGame="newGame"/>
    <TransitionGroup tag="section" class="game-board" name="shuffle-cards">
      <Card 
      v-for="card in cards" :key="`card-${card.value}-${card.variant}`" 
      :value="card.value"
      :isVisible="card.isVisible"
      :isMatched="card.isMatched"
      :cardPosition="card.position"
      :firstGame="firstGame"
      @pickCard="handleFlipCard"
      />
    </TransitionGroup>
    <div class="game-status">
      <p v-if="remainingCards">Matches found: {{ (cards.length - remainingCards) / 2}}</p>
      <p v-else>Player wins!</p>
    </div>
    <p class="made-by">Made by - PFN</p>
  </template> 

<style scoped>

  h1 {
    text-align: center;
    margin-bottom: 1rem;
  }
  .game-board {
    display: grid;
    grid-template-columns: repeat(4, 120px);
    grid-template-rows: repeat(4, 120px);
    gap: .85rem;
    justify-content: center;
  }

  .game-status {
    text-align: center;
    padding-top: 1rem;
    text-transform: uppercase;
    display: grid;
    place-items: center;
    gap: 1rem;
  }

  .restart-btn {
    background-color: orange;
    font-weight: bold;
    color: inherit;
    padding: .5rem;
    border-radius: 8px;
    cursor: pointer;
    display: flex;
    gap: 8px;
    align-items: center;
    border: none;
    margin: 0 auto;
    margin-bottom: 1.25rem;
  }

  .shuffle-cards-move {
    transition: transform 0.8 ease-in;
  }

  .made-by {  
    font-size: .85rem;
    text-align: center;
    margin: .25rem;
  }
</style>
