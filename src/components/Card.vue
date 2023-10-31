<script setup lang="ts">
  import { defineProps, defineEmits, computed } from 'vue';


  const {value, isVisible, cardPosition} = defineProps({
    value: {
      required: true,
      type: Number
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
    (event: "pickCard", value: number, cardPosition: number): void
  }>()
</script>

<template>
  <div class="card" @click="emit('pickCard', value, cardPosition)">
    <div v-if="isVisible" class="card-face card-front">
      <img :src="`./images/${value}.png`" :alt="`Image of a ${value}`"/>
      <img v-if="isMatched" class="checkmark" alt="A checkmark" />
    </div>
    <div v-else class="card-face card-back"></div>
  </div>
</template> 

<style scoped>
  .card {
    text-align: center;
  }

  .card-face {
    width: 100%;
    height: 100%;
    border-radius: 8px;
    cursor: pointer;
    position: relative;
  }

  .card-front {
    background-image: url("./images/card-bg@2x.png");
  }

  .card-back {
    background-image: url("./images/card-bg-empty.png");
  }

  .checkmark {
    position: absolute;
    bottom: 8px;
    right: 8px;
    content: url("./images/checkmark.svg");
  }
</style>
