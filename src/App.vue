<script setup lang="ts">
  import { ref, watch, type Ref } from "vue";
  import { launchConfetti } from "./utils/confetti"
  import { cardsData } from "./data/cardData";
  import Card from "./components/Card.vue"
  import GameButton from "./components/GameButton.vue";
  import { createGame } from "./helpers/createGame";

  const cards = ref(cardsData)
  const { firstGame, newGame, remainingCards, selectedCards } = createGame(cards)
  
  watch(selectedCards, (currentVal) => {
    // Track if game is over
    const gameOver = !remainingCards.value
    if (gameOver) {
      launchConfetti()
      return
    }
    // Track matches
    handleCheckMatch(currentVal, selectedCards)
  })

  const handleFlipCard = (value: string, cardPosition: number) => {
    // If game is not started yet do not allow flips
    if (firstGame.value) return
    const isValidFlip = selectedCards.value.every(c => c.cardPosition !== cardPosition)
    if (selectedCards.value.length === 2 || !isValidFlip) return
    selectedCards.value = [...selectedCards.value, { value, cardPosition }]
    cards.value[cardPosition].isVisible = true
  }

  type SelectedCard = {
    value: string;
    cardPosition: number
  }

  const handleCheckMatch = (currentCards: SelectedCard[], selectedCards: Ref<SelectedCard[]>) => {
    // Ensure 2 cards is selected
    if (currentCards.length === 2) {
      const cardsMatch = currentCards[0].value === currentCards[1].value
      if (cardsMatch) {
        // Set matched value true
        currentCards.forEach(c => cards.value[c.cardPosition].isMatched = true)
        // Reset selected cards
        selectedCards.value = []
      } else {
        // Else flip the cards after timeout
        setTimeout(() => {
          currentCards.forEach(c => cards.value[c.cardPosition].isVisible = false)
          // Reset selected cards
          selectedCards.value = []
        }, 1500)
      }
    }
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
