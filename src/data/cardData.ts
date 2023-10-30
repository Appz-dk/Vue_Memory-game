export type TCard = {
  value: number;
  position: number;
  isVisible: boolean
}

export  const cardsData: TCard[] = []

for (let i = 0; i < 16; i++) {
  cardsData.push({
    value: i,
    position: i,
    isVisible: false
  })
}