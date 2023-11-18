<script setup lang="ts">
  // import { toRefs } from 'vue';


  const props = defineProps({
    value: {
      required: true,
      type: String
    },
    isVisible: {
      required: true,
      type: Boolean
    },
    isMatched: {
      required: true,
      type: Boolean
    },
    cardPosition: {
      required: true,
      type: Number
    },
    firstGame: {
      required: true,
      type: Boolean,
    }
  })

  // If we want to destructure props we have to do it like this
  // Else Vue's reactivity will lost.
  // const { value, isVisible, cardPosition } = toRefs(props)
  
  const emit = defineEmits<{
    (event: "pickCard", value: string, cardPosition: number): void
  }>()
  
</script>

<template>
  <div class="card" :class="{ 'is-flipped': isVisible, 'cursor-pointer': !firstGame }" @click="emit('pickCard', value, cardPosition)">
    <div class="card-face card-front">
      <img :src="`./images/${value}.png`" :alt="`Image of a ${value}`"/>
      <img v-if="isMatched" class="checkmark" alt="A checkmark" />
    </div>
    <div class="card-face card-back"></div>
  </div>
</template> 

<style scoped>
 .card {
  position: relative;
  transition: transform 0.5s  ease-in;
  transform-style: preserve-3d;
  cursor: not-allowed;
  user-select: none;
}

.card.is-flipped {
  transform: rotateY(180deg);
}

.card.cursor-pointer {
  cursor: pointer;
}

  .card-face {
    width: 100%;
    height: 100%;
    border-radius: 8px;
    position: absolute;
    backface-visibility: hidden;
  }

  .card-face.card-front {
    background-image: url("/images/card-bg.png");
    transform: rotateY(180deg);
  } 

  .card-face.card-back {
    background-image: url("/images/card-bg-empty.png");
  }

  .checkmark {
    position: absolute;
    bottom: 8px;
    right: 8px;
    content: url("/images/checkmark.svg");
  }
</style>
