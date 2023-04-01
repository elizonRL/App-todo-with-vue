<template>
  <button :style="{ backgroundColor }" @click.prevent="$emit('click')" :class="{circle: applayCircleClass}">
    <slot></slot>
  </button>
</template>
<script>
export default {
  props: {
    type: {
      default: "success",
      validator(value) {
        return ["danger", "warning", "info", "success"].includes(value);
      },
    },
    circle: {
      default: false,
      type: Boolean,
    },
  },
  computed: {
    backgroundColor() {
      const options = {
        danger: "var(--danger-color)",
        info: "var(--info-color)",
        warning: "var(--warning-color)",
        success: "var(--accent-color)",
      };
      return options[this.type];
    },
    applayCircleClass() {
      return this.circle;
    },
  },
  emit: ["click"],
};
</script>

<style scoped>
button {
  color: var(--text-color);
  border: none;
  cursor: pointer;
}
.circle {
  border-radius: 50%;
}
</style>
