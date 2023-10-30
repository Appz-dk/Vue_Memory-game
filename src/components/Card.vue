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
    <div v-if="isVisible" class="card-face card-front">{{ value }}</div>
    <div v-else class="card-face card-back">Back</div>
  </div>
</template> 

<style scoped>
  .card {
    border: 3px solid #eee;
    text-align: center;
  }

  .card-face {
    width: 100%;
    height: 100%;
    cursor: pointer;
  }

  .card-front {
    background-color: bisque;
  }

  .card-back {
    background-color: blueviolet;
  }
</style>
