import { computed, ref, type Ref } from "vue"
import type { TCard } from "../data/cardData"

export const createGame = (deck: Ref<TCard[]>) => {
  const selectedCards = ref<{value: string, cardPosition:number}[]>([])
  const firstGame = ref(true)

  const remainingCards = computed(() => {
    return deck.value.filter(c => !c.isMatched).length
  })


  // TODO: Could use a better shuffle method
  const shuffleCards = () => {
    deck.value = deck.value.sort(() => Math.random() - 0.5)
  }

  const newGame = () => {
    shuffleCards()
      deck.value = deck.value.map((c, idx) => ({
      ...c,
      isMatched: false,
      isVisible: false,
      position: idx
    }))
    firstGame.value = false
  }

  return {
    firstGame,
    newGame,
    remainingCards,
    selectedCards,
    shuffleCards,
  }
}