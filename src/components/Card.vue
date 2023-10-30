<script setup lang="ts">
  import { defineProps, defineEmits, computed } from 'vue';


  const {value, shownCards} = defineProps({
    value: {
      required: true,
      type: Number
    },
    shownCards: {
      required: true,
      type: Array
    }
  })

  const emit = defineEmits<{
    (event: "pickCard", value: number): void
  }>()

  const isShown = computed(() => {
    return shownCards.includes(value)
  })
</script>

<template>
  <div class="card" @click="emit('pickCard', value)">
    <div class="card-face card-front" :class="{ 'show-card': isShown}">{{ value }}</div>
    <div class="card-face card-back" :class="{ 'show-card': !isShown}" >Back</div>
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
    display: none;
  }

  .card-back {
    background-color: blueviolet;
    display: none;
  }

  .show-card {
    display: block;
  }
</style>
