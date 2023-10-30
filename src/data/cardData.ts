export type TCard = {
  value: number;
  position: number;
  isVisible: boolean
  isMatched: boolean
}


export  const cardsData: TCard[] = []

const cardPairs = 8

for (let i = 0; i < cardPairs; i++) {
  cardsData.push({
    value: i,
    position: i,
    isVisible: false,
    isMatched: false
  })
}

for (let i = 0; i < cardPairs; i++) {
  cardsData.push({
    value: i,
    position: i + cardPairs,
    isVisible: false,
    isMatched: false
  })
}