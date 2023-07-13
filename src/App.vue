<template>
  <Navbar />
  <main class="container">
    <Modal :show="editTodoForm.show" @close="editTodoForm.show = flase">
      <template #header>
        <h2>Edit Todo</h2>
      </template>
      <template #conten>
        <form class="edit-todo-form">
          <div><label>Todo Title</label></div>
          <input type="text" v-model="editTodoForm.todo.title" />
        </form>
      </template>
      <template #footer>
        <div class="edit-todo-modal-footer">
          <Btn class="edit-btn" @click="updateTodo">submit</Btn>
          <Btn class="edit-btn" type="danger" @click="editTodoForm.show = flase"
            >close</Btn
          >
        </div>
      </template>
    </Modal>

    <Alert
      :message="alert.message"
      :show="alert.show"
      @close="alert.show = flase"
      :type="alert.type"
    />
    <section>
      <AddTodoForm :isLoanding="isPostingTodo" @submit="addTodo" />
    </section>
    <section>
      <Spinner v-if="isLoading" class="spinner" />
      <div v-else>
        <Todo
          v-for="todo in todos"
          :key="todo.id"
          :title="todo.title"
          @remove="removeTodo(todo.id)"
          @edit="showEditTodo(todo)"
        />
      </div>
    </section>
  </main>
</template>
<script setup>
import Alert from "./components/alert.vue";
import Navbar from "./components/NavBar.vue";
import AddTodoForm from "./components/AddTodoForm.vue";
import Todo from "./components/Todo.vue";
import Modal from "./components/Modal.vue";
import Btn from "./components/Btn.vue";
import axios from "axios";
import Spinner from "./components/Spinner.vue";
import { reactive, ref } from "vue";

  
  const todoTitle = ref("");
    const todos = ref([]);
    const alert = reactive({
        show: false,
        message: "",
        type: "danger",
      },);
    const isLoading = ref(false);
    const isPostingTodo = ref(false);
    const editTodoForm = reactive({
        show: false,
        todo: {
          id: 0,
          title: "",
        },
      },);

      function showEditTodo(todo) {
      editTodoForm.show = true;
      editTodoForm.todo = { ...todo };
    }
    function showAlert(message, type = "danger") {
      alert.show = true;
      alert.message = message;
      alert.type = type;
    }

      async function fetchTodos() {
      isLoading.value = true;
      try {
        const res = await axios.get("/api/todos");
        todos.value = res.data;
      } catch (e) {
        showAlert("Fail Connetion to Data server");
      }
      isLoading.value = false;
    }
    
   
    async function addTodo(title) {
      if (title === "") {
        showAlert("Todo Title is required");
        return;
      }
      try {
        isPostingTodo.value = true;
        const res = await axios.post("/api/todos", {
          title,
        });
        isPostingTodo.value = false;
        todos.value.push(res.data);
        showAlert("The task was successfully added", "success");
      } catch (e) {
        showAlert("Todos is not add");
      }
    }
  
    async function updateTodo() {
      const todo = todos.value.find(
        (todo) => todo.id === editTodoForm.todo.id
      );
      const {id, title} = editTodoForm.todo;
      await axios.put(
        `/api/todos/${id}`,
        {
          title
        }
      );
      editTodoForm.show = false;
    }
    async function removeTodo(id) {
      await axios.delete(`/api/todos/${id}`);
      todos.value = todos.value.filter((todo) => todo.id !== id);
    }
      fetchTodos();
  
</script>

<style scoped>
.edit-todo-form > input {
  width: 100%;
  height: 30px;
  border: solid 1px var(--accent-color);
}
.edit-todo-modal-footer {
  display: flex;
  justify-content: end;
}
.edit-btn {
  margin-right: 5px;
  padding: 20px;
}
.spinner {
  margin: auto;
  margin-top: 30px;
}
</style>
