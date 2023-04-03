<template>
  <Navbar/>
  <main class="container">
    <Modal :show="showEditTodoModal">
      <template #header>
        <h2>Edit Todo</h2>
      </template>
      <template #conten>
        <form>

          <div><label>Todo Title</label></div>
          <input type="text">
        </form>
      </template>
      <template #footer>
        <Btn>submit</Btn>
        <Btn type="danger" @click="showEditTodoModal=flase">close</Btn>
      </template>
    </Modal>

    <Alert
      message="Todo Title is required"
      :show="showAlert"
      @close="showAlert = flase"
      type="danger"
    />
    <section>
      <AddTodoForm @submit="addTodo"/>
    </section>
    <section>
      <Todo
        v-for="todo in todos"
        :key="todo.id"
        :title="todo.title"
        @remove="removeTodo(todo.id)"
        @edit="showEditTodoModal=true"
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
import Btn from "./components/btn.vue";

export default {
  components: {
    Alert,
    Navbar,
    AddTodoForm,
    Todo,
    Modal,
    Btn
},
  data() {
    return {
      todoTitle: "",
      todos: [],
      showAlert: false,
      showEditTodoModal: false,
    };
  },
  methods: {
    addTodo(title) {
      if (title === "") {
        this.showAlert = true;
        return;
      }
      this.todos.push({
        title,
        id: Math.floor(Math.random() *1000)
      });
      console.log(this.todos);
    },
    removeTodo(id) {
      this.todos = this.todos.filter((todo) => todo.id !== id);
    },
  },
};
</script>

<style scoped>

</style>
