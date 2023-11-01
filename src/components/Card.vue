<script setup lang="ts">
  import { defineProps, defineEmits, computed } from 'vue';

  const {value, isVisible, cardPosition} = defineProps({
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
    }
  })

  const emit = defineEmits<{
    (event: "pickCard", value: String, cardPosition: number): void
  }>()
  
</script>

<template>
  <div class="card" :class="{ 'is-flipped': isVisible }" @click="emit('pickCard', value, cardPosition)">
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
  transition: 0.5s transform ease-in;
  transform-style: preserve-3d;
}

.card.is-flipped {
  transform: rotateY(180deg);
}

  .card-face {
    width: 100%;
    height: 100%;
    border-radius: 8px;
    cursor: pointer;
    position: absolute;
    backface-visibility: hidden;
  }

  .card-face.card-front {
    background-image: url("./images/card-bg@2x.png");
    transform: rotateY(180deg);
  } 

  .card-face.card-back {
    background-image: url("./images/card-bg-empty.png");
  }

  .checkmark {
    position: absolute;
    bottom: 8px;
    right: 8px;
    content: url("./images/checkmark.svg");
  }
</style>
