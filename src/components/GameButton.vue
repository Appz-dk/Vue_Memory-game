<script lang="ts" setup>
  import { computed } from 'vue';

  
  // If you destructure props like const { firstGame } = defineProps({...})
  // We create a non-reactive reference to the value of firstGame at that point in time
  // and therefore Vue's reactivity will be lost.
  // Instead we can use const { firstGame } = toRefs(props) on the props given by defineProps
  const props = defineProps({
    firstGame: {
      required: true,
      type: Boolean
    }
  })

  const emit = defineEmits<{
    (event: "newGame"): void
  }>()

  const btnImgSrc = computed(() => props.firstGame ? "./images/play.svg" : "./images/restart.svg")

</script>

<template>
  <button class="restart-btn" @click="emit('newGame')">
      <img :src="btnImgSrc" />
      {{ firstGame ? "Start Game" : "Restart Game" }}
    </button>
</template> 