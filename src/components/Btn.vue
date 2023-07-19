<template>
  <button
    :style="{ backgroundColor }"
    @click.prevent="$emit('click')"
    :class="{ circle: applyCircleClass }"
  >
    <slot />
  </button>
</template>

<script setup>
import {computed} from 'vue';
import { useBackgroundColor, backgroungColorProps } from './composable/backgroungColor';
const props = defineProps({
  ...backgroungColorProps,
    circle: {
      default: false,
      type: Boolean,
    },
});

const emit = defineEmits(['click'])
const backgroundColor = useBackgroundColor(props);

    const applyCircleClass = computed(()=>{
      return props.circle;
    })
</script>

<style scoped>
button {
  color: var(--text-color);
  border: none;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
}
.btn:disabled{
  opacity: 80%;
}
.circle {
  border-radius: 50%;
}
</style>