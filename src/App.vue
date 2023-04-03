<template>
  <Navbar />
  <main class="container">
    <Modal :show="editTodoForm.show">
      <template #header>
        <h2>Edit Todo</h2>
      </template>
      <template #conten>
        <form class="edit-todo-form">
          <div><label>Todo Title</label></div>
          <input type="text"  v-model="editTodoForm.todo.title"/>
        </form>
      </template>
      <template #footer>
        <div class="edit-todo-modal-footer">
          <Btn class="edit-btn" @click="updateTodo">submit</Btn>
          <Btn class="edit-btn" type="danger" @click="editTodoForm.show = flase">close</Btn>
        </div>
      </template>
    </Modal>

    <Alert
      message="Todo Title is required"
      :show="showAlert"
      @close="showAlert = flase"
      type="danger"
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
import Btn from "./components/btn.vue";

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
      showAlert: false,
      editTodoForm:{
        show: false,
        todo: {
          id: 0,
          title: ""
        },
      },
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
        id: Math.floor(Math.random() * 1000),
      });
      console.log(this.todos);
    },
    showEditTodo(todo){
      this.editTodoForm.show = true;
      this.editTodoForm.todo = {...todo}; 
    },
    updateTodo(){
      const todo = this.todos.find((todo)=> todo.id === this.editTodoForm.todo.id);
      todo.title = this.editTodoForm.todo.title;
      this.editTodoForm.show = false;
    },
    removeTodo(id) {
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
.edit-todo-modal-footer{
  display: flex;
  justify-content: end;

}
.edit-btn{
  margin-right: 5px; 
  padding: 20px;
}
</style>
