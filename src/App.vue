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
      <AddTodoForm @submit="addTodo" />
    </section>
    <section>
      <Todo
        v-for="todo in todos"
        :key="todo.id"
        :title="todo.title"
        @remove="removeTodo(todo.id)"
        @edit="showEditTodo(todo)"
      />
    </section>
  </main>
</template>
<script>
import Alert from "./components/alert.vue";
import Navbar from "./components/NavBar.vue";
import AddTodoForm from "./components/AddTodoForm.vue";
import Todo from "./components/Todo.vue";
import Modal from "./components/Modal.vue";
import Btn from "./components/Btn.vue";
import axios from "axios";
export default {
  components: {
    Alert,
    Navbar,
    AddTodoForm,
    Todo,
    Modal,
    Btn,
  },
  data() {
    return {
      todoTitle: "",
      todos: [],
      alert: {
        show: false,
        message: "",
        type: "danger",
      },
      editTodoForm: {
        show: false,
        todo: {
          id: 0,
          title: "",
        },
      },
    };
  },
  created() {
    this.fetchTodos();
  },
  methods: {
    async fetchTodos() {
      try {
        const res = await axios.get("http://localhost:8080/todos");
        this.todos = res.data;
      } catch (e) {
        this.showAlert("Fail Connetion to Data server");
      }
    },
    showAlert(message, type = "danger") {
      this.alert.show = true;
      this.alert.message = message;
      this.alert.type = type;
    },
    async addTodo(title) {
      if (title === "") {
        this.showAlert("Todo Title is required");
        return;
      }
      try {
        const res = await axios.post("http://localhost:8080/todos", {
          title,
        });
        this.todos.push(res.data);
      } catch (e) {
        this.showAlert("Todos is not add");
      }
    },
    showEditTodo(todo) {
      this.editTodoForm.show = true;
      this.editTodoForm.todo = { ...todo };
    },
    updateTodo() {
      const todo = this.todos.find(
        (todo) => todo.id === this.editTodoForm.todo.id
      );
      todo.title = this.editTodoForm.todo.title;
      this.editTodoForm.show = false;
    },
    async removeTodo(id) {
      await axios.delete(`http://localhost:8080/todos/${id}`);
      this.todos = this.todos.filter((todo) => todo.id !== id);
    },
  },
};
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
</style>
