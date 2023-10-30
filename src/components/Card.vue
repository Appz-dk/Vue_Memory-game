<script setup lang="ts">

  const props = defineProps({
    value: {
      type: Number
    }
  })

  const isShown = false
</script>

<template>
  <div class="card">
    <div class="card-face card-front" :class="{ 'show-card': isShown}">{{ value }}</div>
    <div class="card-face card-back" :class="{ 'show-card': !isShown}">Back</div>
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
