<template>
  <div class="todo">
    <p>{{ title }}</p>
    <div>
      <Btn circle type="danger" @click="$emit('remove')" class="remuve-todo-btn"
        >&times;
      </Btn>
    </div>
  </div>
</template>
<script>
import Btn from "./Btn.vue";
export default {
  components: {
    Btn,
  },
  props: {
    title: {
      required: true,
      type: String,
    },
  },
  emits: ["remove"],
};
</script>
<style scoped>
.todo {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: var(--accent-color);
  margin-top: 30px;
  padding: 0 20px 0 20px;
  border-radius: 10px;
}
.remuve-todo-btn {
  border: none;
  height: 40px;
  width: 40px;
  font-size: 30px;
}
</style>
