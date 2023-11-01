export type TCard = {
  value: string;
  position: number;
  isVisible: boolean
  isMatched: boolean
  variant: number
}


export const cardsData: TCard[] = []

const cardPairs = ["bat", "candy", "cauldron", "cupcake", "ghost", "moon", "pumpkin", "witch-hat"]

cardPairs.forEach((cardName, i) => {
  // Make card pairs start next to each other
  const position = i * 2

  cardsData.push({
    value: cardName,
    position: position,
    isVisible: false,
    isMatched: false,
    variant: 1
  })

  // Make 2nd card of pair visible at start of game
  cardsData.push({
    value: cardName,
    position: position + 1,
    isVisible: true,
    isMatched: false,
    variant: 2
  })
})