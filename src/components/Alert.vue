<template>
  <div v-if="show" class="alert" :style="{ backgroundColor }">
    <div>{{ message }}</div>
    <div @click="close" class="close-alert">&times;</div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
const props = defineProps({
  
    message: {
      required: true,
      type: String,
    },
    show: {
      required: true,
      type: Boolean,
    },
    type: {
      default: "danger",
      validator(value) {
        return ["danger", "warning", "info", "success", "secondary"].includes(value);
      },
    },
  
});
const emit = defineEmits(['close']);
const backgroundColor = computed(()=>{
      const options = {
        danger: "var(--danger-color)",
        info: "var(--info-color)",
        warning: "var(--warning-color)",
        success: "var(--accent-color)",
        secondary: "var(--secondary-color)",
      };
      return options[props.type];
    });
    function close(){
      emit("close");
    }
</script>

<style scoped>
.alert {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding: 0 20px 0 20px;
  border-radius: 10px;
  height: 50px;
}
.close-alert {
  font-size: 50px;
  cursor: pointer;
}
</style>
