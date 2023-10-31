export type TCard = {
  value: string;
  position: number;
  isVisible: boolean
  isMatched: boolean
}


export  const cardsData: TCard[] = []

const cardPairs = ["bat", "candy", "cauldron", "cupcake", "ghost", "moon", "pumpkin", "witch-hat"]


for (let i = 0; i < cardPairs.length; i++) {
  cardsData.push({
    value: cardPairs[i],
    position: i,
    isVisible: false,
    isMatched: false
  })
}

for (let i = 0; i < cardPairs.length; i++) {
  cardsData.push({
    value: cardPairs[i],
    position: i + cardPairs.length,
    isVisible: false,
    isMatched: false
  })
}