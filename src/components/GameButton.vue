<script lang="ts" setup>
  const { firstGame } = defineProps({
    firstGame: {
      required: true,
      type: Boolean
    }
  })

  const emit = defineEmits<{
    (event: "newGame"): void
  }>()

  const btnImgSrc = firstGame ? "/images/play.svg" : "/images/restart.svg"

</script>

<template>
  <button class="restart-btn" @click="emit('newGame')">
      <img :src="btnImgSrc" />
      {{ firstGame ? "Start Game" : "Restart Game" }}
    </button>
</template>