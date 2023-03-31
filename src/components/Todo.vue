<template>
  <div class="todo">
    <p>{{ title }}</p>
    <div>
      <button @click="$emit('remove')" class="remuve-todo-btn">&times;</button>
    </div>
  </div>
</template>
<script>
  export default{
    props:{
      title: {
        required: true,
        type: String
      },
    },
    emits: ["remove"],
  }
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
  border-radius: 50%;
  border: none;
  height: 40px;
  width: 40px;
  font-size: 30px;
  color: var(--text-color);
  background-color: var(--danger-color);
  cursor: pointer;
}
</style>
