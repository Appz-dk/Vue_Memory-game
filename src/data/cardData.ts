export type TCard = {
  value: number;
  position: number;
  isVisible: boolean
  isMatched: boolean
}


export  const cardsData: TCard[] = []

for (let i = 0; i < 8; i++) {
  cardsData.push({
    value: i,
    position: i,
    isVisible: false,
    isMatched: false
  })
}

for (let i = 0; i < 8; i++) {
  cardsData.push({
    value: i,
    position: i + 8,
    isVisible: false,
    isMatched: false
  })
}